import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  url: z.string().trim().min(5).max(500),
});

function extractVideoId(input: string): string | null {
  const trimmed = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  try {
    const u = new URL(trimmed);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      const id = u.pathname.slice(1).split("/")[0];
      return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
    }
    if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
      const v = u.searchParams.get("v");
      if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
      const parts = u.pathname.split("/").filter(Boolean);
      const idx = parts.findIndex((p) => ["shorts", "embed", "v", "live"].includes(p));
      if (idx !== -1 && parts[idx + 1] && /^[a-zA-Z0-9_-]{11}$/.test(parts[idx + 1])) {
        return parts[idx + 1];
      }
    }
  } catch { /* not a url */ }
  return null;
}

export type DownloadFormat = {
  itag: number | string;
  mimeType: string;
  quality: string;
  qualityLabel?: string;
  hasAudio: boolean;
  hasVideo: boolean;
  contentLength?: string;
  url: string;
  extension: string;
};

export type DownloadResult = {
  ok: boolean;
  error?: string;
  title?: string;
  thumbnail?: string;
  lengthSeconds?: number;
  videoFormats?: DownloadFormat[];
  audioFormats?: DownloadFormat[];
};

// ---------- Self-hosted yt-dlp backend (primary) ----------
async function fetchFromSelfHosted(url: string): Promise<DownloadResult | null> {
  const base = process.env.DOWNLOADER_API_URL;
  if (!base) return null;
  const token = process.env.DOWNLOADER_API_TOKEN;

  try {
    const endpoint = `${base.replace(/\/$/, "")}/info?url=${encodeURIComponent(url)}`;
    const res = await fetch(endpoint, {
      method: "GET",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("Self-hosted API error", res.status, text.slice(0, 200));
      return { ok: false, error: `Downloader error (${res.status}). ${res.status === 502 ? "Video could not be processed." : "Try again."}` };
    }

    const json: any = await res.json();
    const videoFormats: DownloadFormat[] = (json.videoFormats ?? []).map((v: any) => ({
      itag: v.itag ?? "",
      mimeType: `video/${v.ext ?? "mp4"}`,
      quality: v.quality ?? "",
      qualityLabel: v.qualityLabel,
      hasAudio: !!v.hasAudio,
      hasVideo: true,
      contentLength: v.filesize ? String(v.filesize) : undefined,
      url: v.url,
      extension: v.ext ?? "mp4",
    }));
    const audioFormats: DownloadFormat[] = (json.audioFormats ?? []).map((a: any) => ({
      itag: a.itag ?? "",
      mimeType: `audio/${a.ext ?? "mp3"}`,
      quality: a.quality ?? "",
      qualityLabel: a.qualityLabel,
      hasAudio: true,
      hasVideo: false,
      contentLength: a.filesize ? String(a.filesize) : undefined,
      url: a.url,
      extension: a.ext ?? "mp3",
    }));

    return {
      ok: true,
      title: json.title,
      thumbnail: json.thumbnail,
      lengthSeconds: json.lengthSeconds,
      videoFormats,
      audioFormats,
    };
  } catch (err) {
    console.error("Self-hosted downloader failed", err);
    return { ok: false, error: "Could not reach the downloader server." };
  }
}

// ---------- RapidAPI fallback ----------
async function fetchFromRapidApi(url: string): Promise<DownloadResult> {
  const videoId = extractVideoId(url);
  if (!videoId) return { ok: false, error: "Invalid YouTube URL. Paste a full video link." };

  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) return { ok: false, error: "No downloader backend configured." };

  try {
    const apiUrl = `https://youtube-media-downloader.p.rapidapi.com/v2/video/details?videoId=${encodeURIComponent(videoId)}`;
    const res = await fetch(apiUrl, {
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "youtube-media-downloader.p.rapidapi.com",
      },
    });

    if (!res.ok) {
      return { ok: false, error: `Provider error (${res.status}).` };
    }
    const json: any = await res.json();
    if (json?.status === false || json?.errorId) {
      return { ok: false, error: json?.reason || "Video not available." };
    }

    const videos: any[] = json?.videos?.items ?? [];
    const audios: any[] = json?.audios?.items ?? [];

    return {
      ok: true,
      title: json?.title ?? "YouTube Video",
      thumbnail: json?.thumbnails?.[json.thumbnails.length - 1]?.url,
      lengthSeconds: json?.lengthSeconds,
      videoFormats: videos.filter((v) => v?.url).map((v) => ({
        itag: v.id ?? "", mimeType: v.mimeType ?? "video/mp4",
        quality: v.quality ?? "", qualityLabel: v.qualityLabel ?? v.quality,
        hasAudio: !!v.hasAudio, hasVideo: true,
        contentLength: v.size ? String(v.size) : undefined,
        url: v.url, extension: v.extension ?? "mp4",
      })),
      audioFormats: audios.filter((a) => a?.url).map((a) => ({
        itag: a.id ?? "", mimeType: a.mimeType ?? "audio/mp3",
        quality: a.quality ?? "",
        qualityLabel: a.bitrate ? `${a.bitrate} kbps` : undefined,
        hasAudio: true, hasVideo: false,
        contentLength: a.size ? String(a.size) : undefined,
        url: a.url, extension: a.extension ?? "mp3",
      })),
    };
  } catch (err) {
    console.error("RapidAPI fallback failed", err);
    return { ok: false, error: "Network error contacting the provider." };
  }
}

export const fetchDownloadOptions = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }): Promise<DownloadResult> => {
    // Prefer self-hosted yt-dlp if configured; fall back to RapidAPI.
    const selfHosted = await fetchFromSelfHosted(data.url);
    if (selfHosted) return selfHosted;
    return fetchFromRapidApi(data.url);
  });
