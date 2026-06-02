import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Clipboard, Download, Loader2, Info, Music, Video, X } from "lucide-react";
import { fetchDownloadOptions, type DownloadResult } from "@/lib/download.functions";

type Format = "mp4" | "mp3" | "4k" | "shorts";

function formatBytes(bytes?: string) {
  if (!bytes) return "";
  const n = Number(bytes);
  if (!Number.isFinite(n) || n <= 0) return "";
  const units = ["B", "KB", "MB", "GB"];
  let i = 0;
  let v = n;
  while (v >= 1024 && i < units.length - 1) { v /= 1024; i++; }
  return `${v.toFixed(v >= 10 ? 0 : 1)} ${units[i]}`;
}

// "GT" shortcut: rewrite gtyoutube.com / gtyoutu.be to real YouTube hosts so
// users can prefix any YouTube URL with "gt" for a faster grab.
export function normalizeYoutubeUrl(input: string): string {
  const s = input.trim();
  if (!s) return s;
  return s
    .replace(/^(https?:\/\/)?(www\.)?gtyoutube\.com/i, "https://www.youtube.com")
    .replace(/^(https?:\/\/)?(www\.)?gtyoutu\.be/i, "https://youtu.be");
}

export function Downloader({
  defaultFormat = "mp4" as Format,
  initialUrl,
  autoFetch,
}: {
  defaultFormat?: Format;
  initialUrl?: string;
  autoFetch?: boolean;
}) {
  const [url, setUrl] = useState(initialUrl ? normalizeYoutubeUrl(initialUrl) : "");
  const [format, setFormat] = useState<Format>(defaultFormat);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DownloadResult | null>(null);
  const autoFiredRef = useRef(false);

  const fetchFn = useServerFn(fetchDownloadOptions);

  async function paste() {
    try {
      const txt = await navigator.clipboard.readText();
      if (txt) setUrl(txt);
    } catch { /* permissions */ }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const normalized = normalizeYoutubeUrl(url);
    if (normalized !== url) setUrl(normalized);
    await runFetch(normalized);
  }

  async function runFetch(rawUrl: string) {
    const trimmed = normalizeYoutubeUrl(rawUrl);
    if (!trimmed) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetchFn({ data: { url: trimmed } });
      if (!res.ok) {
        setError(res.error || "Could not fetch video.");
      } else {
        setResult(res);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!autoFetch || autoFiredRef.current) return;
    if (!initialUrl) return;
    autoFiredRef.current = true;
    runFetch(initialUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFetch, initialUrl]);

      if (!res.ok) {
        setError(res.error || "Could not fetch video.");
      } else {
        setResult(res);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const formats: { id: Format; label: string }[] = [
    { id: "mp4", label: "MP4" },
    { id: "mp3", label: "MP3" },
    { id: "4k", label: "4K" },
    { id: "shorts", label: "Shorts" },
  ];

  const showAudioFirst = format === "mp3";
  const videoList = result?.videoFormats ?? [];
  const audioList = result?.audioFormats ?? [];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={onSubmit} className="bg-card border border-border rounded-lg p-2 flex flex-col sm:flex-row items-stretch gap-2 shadow-sm">
        <input
          type="url"
          inputMode="url"
          placeholder="Paste your YouTube video link"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          maxLength={500}
          className="flex-1 h-11 px-3 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          aria-label="YouTube URL"
        />
        <button
          type="button"
          onClick={paste}
          className="h-11 px-4 rounded-md bg-primary-soft text-primary text-sm font-medium flex items-center justify-center gap-1.5 hover:opacity-90"
        >
          <Clipboard className="size-4" /> Paste
        </button>
        <button
          type="submit"
          disabled={loading}
          className="h-11 px-5 rounded-md bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-1.5 hover:opacity-95 disabled:opacity-60"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}
          {loading ? "Fetching" : "Download"}
        </button>
      </form>

      <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
        {formats.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFormat(f.id)}
            className={`px-3 py-1 text-xs rounded-full border transition ${
              format === f.id
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <p className="mt-4 text-xs text-muted-foreground text-center flex items-center justify-center gap-1.5">
        <Info className="size-3.5" /> Copyrighted content is not available for download with this tool.
      </p>

      {error && (
        <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/5 text-destructive text-sm px-3 py-2 flex items-start gap-2">
          <X className="size-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {result?.ok && (
        <div className="mt-6 bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-4 flex gap-4 items-start border-b border-border">
            {result.thumbnail && (
              <img
                src={result.thumbnail}
                alt={result.title}
                className="w-32 h-20 object-cover rounded-md bg-muted shrink-0"
                loading="lazy"
              />
            )}
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-foreground line-clamp-2">{result.title}</h3>
              {result.lengthSeconds ? (
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.floor(result.lengthSeconds / 60)}:{String(result.lengthSeconds % 60).padStart(2, "0")} min
                </p>
              ) : null}
            </div>
          </div>

          <div className={`grid ${showAudioFirst ? "" : ""} sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border`}>
            <FormatList
              icon={<Video className="size-4" />}
              title="Video"
              items={videoList}
              empty="No video formats available."
              filename={result.title || "video"}
            />
            <FormatList
              icon={<Music className="size-4" />}
              title="Audio"
              items={audioList}
              empty="No audio formats available."
              filename={result.title || "audio"}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function FormatList({
  icon, title, items, empty, filename,
}: {
  icon: React.ReactNode;
  title: string;
  items: { itag: string | number; quality: string; qualityLabel?: string; extension: string; url: string; contentLength?: string }[];
  empty: string;
  filename: string;
}) {
  return (
    <div className="p-4">
      <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1.5 mb-3">
        {icon} {title}
      </h4>
      {items.length === 0 ? (
        <p className="text-xs text-muted-foreground">{empty}</p>
      ) : (
        <ul className="space-y-2">
          {items.slice(0, 8).map((f) => (
            <li key={`${f.itag}-${f.quality}`} className="flex items-center justify-between gap-2">
              <div className="text-sm text-foreground">
                <span className="font-medium">{f.qualityLabel || f.quality}</span>
                <span className="text-xs text-muted-foreground ml-2 uppercase">{f.extension}</span>
                {f.contentLength && (
                  <span className="text-xs text-muted-foreground ml-2">{formatBytes(f.contentLength)}</span>
                )}
              </div>
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                download={`${filename}.${f.extension}`}
                className="text-xs font-semibold px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:opacity-95 inline-flex items-center gap-1"
              >
                <Download className="size-3.5" /> Download
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
