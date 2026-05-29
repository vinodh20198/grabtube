import { Link } from "@tanstack/react-router";
import { Search, Menu } from "lucide-react";

const TOP_NAV = [
  { to: "/", label: "Home" },
  { to: "/youtube-to-mp4", label: "MP4 Download" },
  { to: "/youtube-to-mp3", label: "MP3 Convert" },
  { to: "/youtube-shorts-downloader", label: "Shorts" },
  { to: "/4k-downloader", label: "4K / 8K" },
];

const SECTIONS = ["News", "Tutorials", "Tools", "Music", "Movies", "Tech", "How-To", "Reviews", "Trending"];

const TICKER = [
  "How to download YouTube 4K videos without losing quality",
  "Top 10 free YouTube to MP3 converters in 2026",
  "YouTube Shorts: download tricks every creator should know",
  "Is downloading YouTube videos legal? A simple guide",
  "Best bitrate settings when converting YouTube to MP3",
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top utility bar */}
      <div className="bg-ink text-white text-xs">
        <div className="container mx-auto px-4 h-8 flex items-center justify-between">
          <span className="opacity-80">{new Date().toUTCString().slice(0, 16)} · Free YouTube Downloader Portal</span>
          <span className="hidden sm:inline opacity-60">EN</span>
        </div>
      </div>

      {/* Masthead */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-baseline gap-1">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-primary tracking-tight">GrabTube</span>
            <span className="font-serif text-xs text-muted-foreground hidden sm:inline">Daily</span>
          </Link>
          <div className="hidden md:flex flex-1 max-w-md relative">
            <input
              placeholder="Search downloads, guides, tools…"
              className="w-full h-10 rounded-sm border border-border bg-input px-3 pr-10 text-sm outline-none focus:border-primary"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          </div>
          <button className="md:hidden p-2 border border-border rounded-sm" aria-label="Menu">
            <Menu className="size-5" />
          </button>
        </div>

        {/* Primary nav */}
        <nav className="border-t border-border bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 flex items-center gap-1 overflow-x-auto">
            {TOP_NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="px-3 py-2.5 text-sm font-medium whitespace-nowrap hover:bg-white/10"
                activeProps={{ className: "bg-white/15" }}
              >
                {n.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Section bar */}
        <div className="border-b border-border bg-secondary">
          <div className="container mx-auto px-4 flex items-center gap-4 overflow-x-auto text-xs uppercase tracking-wide text-muted-foreground py-2">
            {SECTIONS.map((s) => (
              <span key={s} className="whitespace-nowrap hover:text-primary cursor-pointer">{s}</span>
            ))}
          </div>
        </div>
      </header>

      {/* Breaking ticker */}
      <div className="bg-card border-b border-border overflow-hidden">
        <div className="container mx-auto px-4 flex items-center gap-3">
          <span className="bg-primary text-primary-foreground text-xs font-bold uppercase px-2 py-1 my-2 shrink-0">
            Trending
          </span>
          <div className="relative overflow-hidden flex-1 py-2">
            <div className="ticker-track flex gap-10 whitespace-nowrap text-sm">
              {[...TICKER, ...TICKER].map((t, i) => (
                <span key={i} className="text-foreground">› {t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-secondary mt-12">
        <div className="container mx-auto px-4 py-8 grid gap-8 md:grid-cols-4 text-sm">
          <div>
            <div className="font-serif text-2xl font-bold text-primary mb-2">GrabTube</div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Your daily portal for free YouTube downloads, guides, and tools. Free forever, no signup required.
            </p>
          </div>
          {[
            { h: "Downloaders", l: TOP_NAV.slice(1) },
            { h: "Sections", l: SECTIONS.slice(0, 5).map((s) => ({ to: "/", label: s })) },
          ].map((col) => (
            <div key={col.h}>
              <h4 className="font-bold uppercase text-xs tracking-wider mb-3 text-ink">{col.h}</h4>
              <ul className="space-y-1.5 text-muted-foreground">
                {col.l.map((it) => (
                  <li key={it.label}>
                    <Link to={it.to} className="hover:text-primary">{it.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="font-bold uppercase text-xs tracking-wider mb-3 text-ink">Legal</h4>
            <ul className="space-y-1.5 text-muted-foreground text-xs">
              <li>Only download content you own or have rights to.</li>
              <li>Respect YouTube's Terms of Service.</li>
              <li>Not affiliated with YouTube or Google.</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} GrabTube. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
