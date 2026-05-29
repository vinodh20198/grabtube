import { useState } from "react";
import { Download, Loader2, Link2, Sparkles } from "lucide-react";

type Format = "mp4" | "mp3" | "4k" | "shorts";

interface Props {
  defaultFormat?: Format;
  compact?: boolean;
}

const FORMATS: { id: Format; label: string; hint: string }[] = [
  { id: "mp4", label: "MP4 Video", hint: "HD up to 1080p" },
  { id: "mp3", label: "MP3 Audio", hint: "320kbps" },
  { id: "4k", label: "4K / 8K", hint: "Ultra HD" },
  { id: "shorts", label: "Shorts", hint: "Vertical" },
];

export function Downloader({ defaultFormat = "mp4" }: Props) {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState<Format>(defaultFormat);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setMessage(null);
    // Hook your download API here (e.g. RapidAPI youtube-mp36, yt-api).
    // Example shape: POST /api/public/resolve { url, format }
    setTimeout(() => {
      setLoading(false);
      setMessage(
        "Demo mode — connect a download API (RapidAPI 'yt-api' works great) to enable real downloads."
      );
    }, 900);
  }

  return (
    <div className="glass rounded-2xl p-6 sm:p-8 shadow-card w-full max-w-3xl mx-auto">
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="relative">
          <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
          <input
            type="url"
            inputMode="url"
            placeholder="Paste any YouTube link here…"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full h-14 sm:h-16 rounded-xl bg-input border border-border pl-12 pr-4 text-base outline-none focus:ring-2 focus:ring-ring transition"
            aria-label="YouTube video URL"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {FORMATS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFormat(f.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition border ${
                format === f.id
                  ? "bg-gradient-primary text-primary-foreground border-transparent shadow-glow"
                  : "bg-secondary text-secondary-foreground border-border hover:border-primary/40"
              }`}
            >
              {f.label}
              <span className="ml-2 text-xs opacity-70">{f.hint}</span>
            </button>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 rounded-xl bg-gradient-primary text-primary-foreground font-semibold text-lg flex items-center justify-center gap-2 shadow-glow hover:opacity-95 transition disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="size-5 animate-spin" /> Fetching…
            </>
          ) : (
            <>
              <Download className="size-5" /> Download {format.toUpperCase()}
            </>
          )}
        </button>

        {message && (
          <p className="text-sm text-accent flex items-center gap-2">
            <Sparkles className="size-4" /> {message}
          </p>
        )}
        <p className="text-xs text-muted-foreground text-center">
          Free · No registration · Unlimited downloads
        </p>
      </form>
    </div>
  );
}
