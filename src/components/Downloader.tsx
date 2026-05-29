import { useState } from "react";
import { Clipboard, Download, Loader2, Info } from "lucide-react";

type Format = "mp4" | "mp3" | "4k" | "shorts";

export function Downloader({ defaultFormat = "mp4" as Format }) {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState<Format>(defaultFormat);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function paste() {
    try {
      const txt = await navigator.clipboard.readText();
      if (txt) setUrl(txt);
    } catch { /* permissions */ }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setMessage(null);
    setTimeout(() => {
      setLoading(false);
      setMessage("Demo mode — connect a download API (e.g. RapidAPI 'yt-api') to enable real downloads.");
    }, 700);
  }

  const formats: { id: Format; label: string }[] = [
    { id: "mp4", label: "MP4" },
    { id: "mp3", label: "MP3" },
    { id: "4k", label: "4K" },
    { id: "shorts", label: "Shorts" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={onSubmit} className="bg-card border border-border rounded-lg p-2 flex flex-col sm:flex-row items-stretch gap-2 shadow-sm">
        <input
          type="url"
          inputMode="url"
          placeholder="Paste your YouTube video link"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
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
      {message && <p className="mt-2 text-xs text-primary text-center">{message}</p>}
    </div>
  );
}
