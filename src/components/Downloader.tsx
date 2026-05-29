import { useState } from "react";
import { Download, Loader2 } from "lucide-react";

type Format = "mp4" | "mp3" | "4k" | "shorts";

const FORMATS: { id: Format; label: string }[] = [
  { id: "mp4", label: "MP4 1080p" },
  { id: "mp3", label: "MP3 320kbps" },
  { id: "4k", label: "4K / 8K" },
  { id: "shorts", label: "Shorts" },
];

export function Downloader({ defaultFormat = "mp4" as Format, compact = false }) {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState<Format>(defaultFormat);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setMessage(null);
    setTimeout(() => {
      setLoading(false);
      setMessage("Demo mode — connect a download API (e.g. RapidAPI 'yt-api') to enable real downloads.");
    }, 800);
  }

  return (
    <div className={`bg-card border-2 border-primary ${compact ? "p-4" : "p-5 sm:p-6"}`}>
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-primary text-primary-foreground text-[10px] font-bold uppercase px-2 py-0.5">Tool</span>
        <h3 className="font-serif font-bold text-lg">YouTube Downloader</h3>
      </div>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          type="url"
          inputMode="url"
          placeholder="Paste YouTube link here…"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full h-11 border border-border bg-input px-3 text-sm outline-none focus:border-primary"
          aria-label="YouTube URL"
        />
        <div className="flex flex-wrap gap-1.5">
          {FORMATS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFormat(f.id)}
              className={`px-3 py-1.5 text-xs font-medium border transition ${
                format === f.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:border-primary"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-60"
        >
          {loading ? <><Loader2 className="size-4 animate-spin" /> Fetching…</> : <><Download className="size-4" /> Download {format.toUpperCase()}</>}
        </button>
        {message && <p className="text-xs text-primary">{message}</p>}
        <p className="text-[11px] text-muted-foreground text-center">Free · No registration · Unlimited</p>
      </form>
    </div>
  );
}
