import { Link } from "@tanstack/react-router";
import { Youtube, Github } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/youtube-to-mp4", label: "MP4" },
  { to: "/youtube-to-mp3", label: "MP3" },
  { to: "/youtube-shorts-downloader", label: "Shorts" },
  { to: "/4k-downloader", label: "4K" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 glass border-b border-border/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="size-9 rounded-xl bg-gradient-primary grid place-items-center shadow-glow group-hover:scale-105 transition">
              <Youtube className="size-5 text-primary-foreground" />
            </span>
            <span className="font-display font-bold text-lg tracking-tight">
              Grab<span className="text-gradient-primary">Tube</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition"
                activeProps={{ className: "text-foreground bg-secondary" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border/60 mt-20 py-10">
        <div className="container mx-auto px-4 grid gap-8 md:grid-cols-3 text-sm">
          <div>
            <div className="font-display font-bold text-lg mb-2">
              Grab<span className="text-gradient-primary">Tube</span>
            </div>
            <p className="text-muted-foreground">
              The fastest free YouTube downloader. MP4, MP3, 4K, Shorts — no signup, no limits.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Tools</h4>
            <ul className="space-y-2 text-muted-foreground">
              {NAV.slice(1).map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="hover:text-foreground">{n.label} Downloader</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Only download videos you own or have rights to.</li>
              <li>Respect YouTube's Terms of Service.</li>
              <li className="flex items-center gap-2 pt-2">
                <Github className="size-4" /> Made with ♥
              </li>
            </ul>
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-8">
          © {new Date().getFullYear()} GrabTube. Not affiliated with YouTube or Google.
        </p>
      </footer>
    </div>
  );
}
