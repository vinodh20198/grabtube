import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Download, Sun } from "lucide-react";

const NAV = [
  { to: "/", label: "How to use" },
  { to: "/youtube-to-mp4", label: "YouTube to MP4" },
  { to: "/youtube-to-mp3", label: "YouTube to MP3" },
  { to: "/youtube-shorts-downloader", label: "Shorts" },
  { to: "/4k-downloader", label: "4K" },
];

export const ADSENSE_CLIENT = "ca-pub-8950040060205447";

export function Layout({ children }: { children: React.ReactNode }) {
  // Inject AdSense script once on the client to avoid SSR/hydration mismatch.
  useEffect(() => {
    if (document.querySelector('script[data-adsense="true"]')) return;
    const s = document.createElement("script");
    s.async = true;
    s.crossOrigin = "anonymous";
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
    s.dataset.adsense = "true";
    document.head.appendChild(s);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="size-8 rounded-md bg-primary grid place-items-center">
              <Download className="size-4 text-primary-foreground" />
            </span>
            <span className="font-semibold text-lg">GrabTube</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="hidden sm:flex items-center gap-1">
            <button className="size-9 grid place-items-center border border-border rounded-md hover:bg-muted" aria-label="Theme">
              <Sun className="size-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-8 text-sm text-muted-foreground flex flex-col sm:flex-row gap-4 items-center justify-between">
          <p>© {new Date().getFullYear()} GrabTube. Not affiliated with YouTube.</p>
          <nav className="flex gap-4">
            {NAV.slice(1).map((n) => (
              <Link key={n.to} to={n.to} className="hover:text-foreground">{n.label}</Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
