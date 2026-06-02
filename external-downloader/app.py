"""
GrabTube self-hosted downloader API (yt-dlp based).
Deploy to Render / Railway / Fly.io / any Docker host.

Endpoint: GET /info?url=<youtube_url>
Auth:     optional Bearer token via API_TOKEN env var
"""
import os
import re
from typing import Optional

from fastapi import FastAPI, HTTPException, Header, Query
from fastapi.middleware.cors import CORSMiddleware
from yt_dlp import YoutubeDL

API_TOKEN = os.environ.get("API_TOKEN")  # optional shared secret

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


def check_auth(authorization: Optional[str]) -> None:
    if not API_TOKEN:
        return
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Unauthorized")
    if authorization.split(" ", 1)[1].strip() != API_TOKEN:
        raise HTTPException(status_code=401, detail="Unauthorized")


@app.get("/")
def root():
    return {"ok": True, "service": "grabtube-downloader"}


@app.get("/info")
def info(
    url: str = Query(..., min_length=5, max_length=500),
    authorization: Optional[str] = Header(default=None),
):
    check_auth(authorization)

    # Normalize "GT shortcut" hosts → real YouTube hosts.
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
        # Bypass "Sign in to confirm you're not a bot" on datacenter IPs
        # by using player clients that don't require web cookies.
        "extractor_args": {
            "youtube": {
                "player_client": ["tv", "ios", "web_safari", "mweb"],
            }
        },
    }

    try:
        with YoutubeDL(ydl_opts) as ydl:
            data = ydl.extract_info(normalized, download=False)
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Extractor error: {str(e)[:200]}")


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
            entry["quality"] = f.get("format_note") or f.get("height") and f"{f['height']}p" or ""
            entry["qualityLabel"] = entry["quality"]
            entry["height"] = f.get("height")
            videos.append(entry)
        elif has_audio:
            entry["quality"] = f.get("format_note") or (f.get("abr") and f"{int(f['abr'])}kbps") or ""
            entry["qualityLabel"] = f"{int(f['abr'])} kbps" if f.get("abr") else entry["quality"]
            entry["bitrate"] = f.get("abr")
            audios.append(entry)

    # Prefer progressive (audio+video) MP4 streams first, then by height desc
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
