import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";

export const POSTS = [
  {
    slug: "youtube-to-mp4",
    title: "How to Convert YouTube to MP4 (2026 Guide)",
    excerpt: "Step-by-step guide to saving any YouTube video as an MP4 file — free, no software install, works on every device.",
  },
  {
    slug: "youtube-to-mp3",
    title: "YouTube to MP3: The Complete 320kbps Conversion Guide",
    excerpt: "Why 320kbps matters, how to extract audio from YouTube, and what to do with the file once you have it.",
  },
  {
    slug: "where-do-youtube-downloads-go",
    title: "Where Do YouTube Downloads Go on iPhone, Android & Desktop?",
    excerpt: "A clear breakdown of where downloaded YouTube videos actually save on every major device — and how to find them.",
  },
  {
    slug: "is-downloading-youtube-videos-illegal",
    title: "Is Downloading YouTube Videos Illegal? What 2026 Actually Says",
    excerpt: "The honest, non-legalese answer to whether saving YouTube videos is allowed — and the rules that genuinely matter.",
  },
];

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "GrabTube Blog — YouTube Downloader Guides & Tips" },
      { name: "description", content: "Guides on YouTube video download, format choices, device tips, and legality of downloading videos." },
      { property: "og:title", content: "GrabTube Blog" },
      { property: "og:description", content: "Honest guides about downloading YouTube videos." },
    ],
  }),
  component: BlogLayout,
});

function BlogLayout() {
  const matches = useMatches();
  const isIndex = matches[matches.length - 1]?.routeId === "/blog";
  if (!isIndex) return <Outlet />;

  return (
    <Layout>
      <section className="container mx-auto px-4 pt-16 pb-12 max-w-3xl">
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">The GrabTube Blog</h1>
        <p className="mt-3 text-muted-foreground">Plain-English guides on YouTube downloads, formats, and what's actually legal.</p>

        <div className="mt-10 grid gap-4">
          {POSTS.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="block bg-card border border-border rounded-lg p-6 hover:border-primary transition"
            >
              <h2 className="text-lg font-semibold">{p.title}</h2>
              <p className="text-sm text-muted-foreground mt-2">{p.excerpt}</p>
              <span className="inline-block mt-3 text-xs text-primary">Read article →</span>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
