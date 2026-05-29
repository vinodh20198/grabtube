import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  url: z.string().trim().min(5).max(500),
});

function extractVideoId(input: string): string | null {
  const trimmed = input.trim();
  // Bare 11-char ID
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
      // /shorts/ID, /embed/ID, /v/ID, /live/ID
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

export const fetchDownloadOptions = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }): Promise<DownloadResult> => {
    const videoId = extractVideoId(data.url);
    if (!videoId) {
      return { ok: false, error: "Invalid YouTube URL. Paste a full video link." };
    }

    const apiKey = process.env.RAPIDAPI_KEY;
    if (!apiKey) {
      return { ok: false, error: "Server is not configured. Missing RAPIDAPI_KEY." };
    }

    try {
      const apiUrl = `https://youtube-media-downloader.p.rapidapi.com/v2/video/details?videoId=${encodeURIComponent(videoId)}`;
      const res = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": "youtube-media-downloader.p.rapidapi.com",
        },
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("RapidAPI error", res.status, text.slice(0, 200));
        return { ok: false, error: `Provider error (${res.status}). Try again in a moment.` };
      }

      const json: any = await res.json();
      if (json?.status === false || json?.errorId) {
        return { ok: false, error: json?.reason || "Video not available." };
      }

      const videos: any[] = json?.videos?.items ?? [];
      const audios: any[] = json?.audios?.items ?? [];

      const videoFormats: DownloadFormat[] = videos
        .filter((v) => v?.url)
        .map((v) => ({
          itag: v.id ?? v.itag ?? "",
          mimeType: v.mimeType ?? `video/${v.extension ?? "mp4"}`,
          quality: v.quality ?? v.qualityLabel ?? "",
          qualityLabel: v.qualityLabel ?? v.quality,
          hasAudio: !!v.hasAudio,
          hasVideo: true,
          contentLength: v.size ? String(v.size) : undefined,
          url: v.url,
          extension: v.extension ?? "mp4",
        }));

      const audioFormats: DownloadFormat[] = audios
        .filter((a) => a?.url)
        .map((a) => ({
          itag: a.id ?? a.itag ?? "",
          mimeType: a.mimeType ?? `audio/${a.extension ?? "mp3"}`,
          quality: a.quality ?? `${a.bitrate ?? ""}kbps`,
          qualityLabel: a.bitrate ? `${a.bitrate} kbps` : undefined,
          hasAudio: true,
          hasVideo: false,
          contentLength: a.size ? String(a.size) : undefined,
          url: a.url,
          extension: a.extension ?? "mp3",
        }));

      return {
        ok: true,
        title: json?.title ?? "YouTube Video",
        thumbnail: json?.thumbnails?.[json.thumbnails.length - 1]?.url,
        lengthSeconds: json?.lengthSeconds,
        videoFormats,
        audioFormats,
      };
    } catch (err) {
      console.error("fetchDownloadOptions failed", err);
      return { ok: false, error: "Network error contacting the provider." };
    }
  });
