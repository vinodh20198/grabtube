"""
GrabTube self-hosted downloader API (yt-dlp based).

Endpoint: GET /info?url=<youtube_url>
Auth:     optional Bearer token via API_TOKEN env var

To bypass YouTube's "Sign in to confirm you're not a bot" check on
datacenter IPs (Render/Railway/Fly/etc.), set ONE of these env vars:

  YT_COOKIES         = full Netscape-format cookies.txt CONTENT
  YT_COOKIES_B64     = same content, base64-encoded (easier to paste)
  YT_COOKIES_FILE    = path to an existing cookies.txt inside the container

Export cookies from a logged-in browser using the "Get cookies.txt LOCALLY"
extension, paste the file's contents into the YT_COOKIES env var on Render.
"""
import base64
import os
import re
import tempfile
from typing import Optional

from fastapi import FastAPI, HTTPException, Header, Query
from fastapi.middleware.cors import CORSMiddleware
from yt_dlp import YoutubeDL

API_TOKEN = os.environ.get("API_TOKEN")

app = FastAPI(title="GrabTube Downloader API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "OPTIONS"],
    allow_headers=["*"],
)

YOUTUBE_RE = re.compile(
    r"^(https?://)?(www\.)?(m\.)?(youtube\.com|youtu\.be|youtube-nocookie\.com)/",
    re.IGNORECASE,
)


def _resolve_cookiefile() -> Optional[str]:
    """Materialize cookies from env vars into a temp file, return the path."""
    existing = os.environ.get("YT_COOKIES_FILE")
    if existing and os.path.isfile(existing):
        return existing

    raw = os.environ.get("YT_COOKIES")
    b64 = os.environ.get("YT_COOKIES_B64")
    content: Optional[str] = None
    if raw:
        content = raw
    elif b64:
        try:
            content = base64.b64decode(b64).decode("utf-8", errors="ignore")
        except Exception:
            content = None

    if not content:
        return None

    path = "/tmp/yt_cookies.txt"
    try:
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        return path
    except Exception:
        return None


COOKIEFILE = _resolve_cookiefile()


def check_auth(authorization: Optional[str]) -> None:
    if not API_TOKEN:
        return
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Unauthorized")
    if authorization.split(" ", 1)[1].strip() != API_TOKEN:
        raise HTTPException(status_code=401, detail="Unauthorized")


@app.get("/")
def root():
    return {
        "ok": True,
        "service": "grabtube-downloader",
        "cookies_loaded": bool(COOKIEFILE),
    }


@app.get("/info")
def info(
    url: str = Query(..., min_length=5, max_length=500),
    authorization: Optional[str] = Header(default=None),
):
    check_auth(authorization)

    normalized = re.sub(r"^(https?://)?(www\.)?gtyoutube\.com", "https://www.youtube.com", url.strip(), flags=re.IGNORECASE)
    normalized = re.sub(r"^(https?://)?(www\.)?gtyoutu\.be", "https://youtu.be", normalized, flags=re.IGNORECASE)

    if not YOUTUBE_RE.match(normalized):
        raise HTTPException(status_code=400, detail="Invalid YouTube URL")

    ydl_opts = {
        "quiet": True,
        "no_warnings": True,
        "skip_download": True,
        "noplaylist": True,
        "format": "bestvideo*+bestaudio/best",
        # tv_embedded + tv are the most resilient clients on datacenter IPs
        # right now; web/android require PO tokens.
        "extractor_args": {
            "youtube": {
                "player_client": ["tv_embedded", "tv", "web_safari", "mweb", "ios"],
            }
        },
        "http_headers": {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                          "AppleWebKit/605.1.15 (KHTML, like Gecko) "
                          "Version/17.0 Safari/605.1.15",
        },
    }
    if COOKIEFILE:
        ydl_opts["cookiefile"] = COOKIEFILE

    try:
        with YoutubeDL(ydl_opts) as ydl:
            data = ydl.extract_info(normalized, download=False)
    except Exception as e:
        msg = str(e)
        if "Sign in to confirm" in msg or "bot" in msg.lower():
            raise HTTPException(
                status_code=502,
                detail="YouTube is blocking this server's IP. Add YT_COOKIES env var on Render with a logged-in cookies.txt.",
            )
        raise HTTPException(status_code=502, detail=f"Extractor error: {msg[:200]}")

    formats = data.get("formats") or []
    videos, audios = [], []

    for f in formats:
        if not f.get("url"):
            continue
        vcodec = f.get("vcodec") or "none"
        acodec = f.get("acodec") or "none"
        has_video = vcodec != "none"
        has_audio = acodec != "none"
        entry = {
            "itag": f.get("format_id"),
            "ext": f.get("ext"),
            "url": f["url"],
            "filesize": f.get("filesize") or f.get("filesize_approx"),
            "hasAudio": has_audio,
            "hasVideo": has_video,
        }
        if has_video:
            entry["quality"] = f.get("format_note") or (f.get("height") and f"{f['height']}p") or ""
            entry["qualityLabel"] = entry["quality"]
            entry["height"] = f.get("height")
            videos.append(entry)
        elif has_audio:
            entry["quality"] = f.get("format_note") or (f.get("abr") and f"{int(f['abr'])}kbps") or ""
            entry["qualityLabel"] = f"{int(f['abr'])} kbps" if f.get("abr") else entry["quality"]
            entry["bitrate"] = f.get("abr")
            audios.append(entry)

    videos.sort(key=lambda v: (not v.get("hasAudio"), -(v.get("height") or 0)))
    audios.sort(key=lambda a: -(a.get("bitrate") or 0))

    return {
        "ok": True,
        "title": data.get("title"),
        "thumbnail": (data.get("thumbnail")
                      or (data.get("thumbnails") or [{}])[-1].get("url")),
        "lengthSeconds": data.get("duration"),
        "videoFormats": videos,
        "audioFormats": audios,
    }
