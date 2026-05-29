import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Downloader } from "@/components/Downloader";
import { AdSlot } from "@/components/AdSlot";
import { ArticleCard, SectionHeader, type Article } from "@/components/ArticleCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GrabTube Daily — YouTube Downloads, Guides & Tools" },
      { name: "description", content: "Your daily portal for free YouTube downloaders, MP4 & MP3 converters, 4K/Shorts tools, and how-to guides. Free, fast, no signup." },
      { property: "og:title", content: "GrabTube Daily — YouTube Downloads & Guides" },
      { property: "og:description", content: "Free YouTube downloader portal with daily tutorials and tools." },
    ],
  }),
  component: Home,
});

const PIC = (id: number, w = 800, h = 500) => `https://picsum.photos/seed/grabtube-${id}/${w}/${h}`;

const LEAD: Article = {
  category: "Editor's Pick",
  title: "How to download YouTube videos in 4K without losing a single pixel of quality",
  excerpt: "From bitrate basics to codec choices, here's the complete 2026 guide to grabbing Ultra HD YouTube videos the right way — on any device, completely free.",
  image: PIC(1, 1200, 720),
  href: "/4k-downloader",
  meta: "12 min read · Updated today",
};

const TOP_STORIES: Article[] = [
  { category: "Tutorial", title: "YouTube to MP3 at 320kbps: the audiophile setup that costs nothing", image: PIC(2), href: "/youtube-to-mp3", meta: "8 min read" },
  { category: "Guide", title: "Shorts without watermark: 3 methods that actually work in 2026", image: PIC(3), href: "/youtube-shorts-downloader", meta: "5 min read" },
  { category: "Tools", title: "MP4 vs WEBM vs M4A — which format should you pick?", image: PIC(4), href: "/youtube-to-mp4", meta: "4 min read" },
  { category: "How-To", title: "Save entire YouTube playlists in one click (legally)", image: PIC(5), href: "/", meta: "6 min read" },
];

const TRENDING: Article[] = [
  { category: "Trending", title: "Why your YouTube downloads look blurry — and the 2-minute fix", image: PIC(10, 200, 200), href: "/", meta: "Trending #1" },
  { category: "Trending", title: "The fastest way to convert long videos to MP3 on iPhone", image: PIC(11, 200, 200), href: "/", meta: "Trending #2" },
  { category: "Trending", title: "Downloading copyrighted music: what you can (and can't) do", image: PIC(12, 200, 200), href: "/", meta: "Trending #3" },
  { category: "Trending", title: "Best free desktop tools when the browser isn't enough", image: PIC(13, 200, 200), href: "/", meta: "Trending #4" },
  { category: "Trending", title: "YouTube live streams: capture and save while broadcasting", image: PIC(14, 200, 200), href: "/", meta: "Trending #5" },
];

const GUIDES: Article[] = Array.from({ length: 6 }).map((_, i) => ({
  category: ["Tutorial", "Guide", "Tips", "How-To"][i % 4],
  title: [
    "Convert YouTube to MP4 on Android without ads",
    "Batch download channels with these 4 free tools",
    "The cleanest way to rip audio from podcasts",
    "Embedding YouTube videos offline in Keynote",
    "Backing up your favorite music videos — a checklist",
    "Why bitrate matters more than file size",
  ][i],
  image: PIC(20 + i),
  href: "/",
  meta: `${3 + i} min read`,
}));

function Home() {
  return (
    <Layout>
      {/* Leaderboard ad below masthead — prime AdSense placement */}
      <div className="container mx-auto px-4 pt-4">
        <AdSlot slot="1111111111" label="Sponsored" minHeight={90} />
      </div>

      <div className="container mx-auto px-4 py-6 grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* MAIN COLUMN */}
        <div className="min-w-0">
          {/* Hero: lead story + top stories grid */}
          <section className="grid gap-6 md:grid-cols-[2fr_1fr] mb-8 pb-8 border-b border-border">
            <ArticleCard a={LEAD} size="lg" />
            <div className="divide-y divide-border">
              {TOP_STORIES.slice(0, 4).map((a, i) => (
                <ArticleCard key={i} a={a} size="row" />
              ))}
            </div>
          </section>

          {/* In-article ad */}
          <AdSlot slot="2222222222" minHeight={250} />

          {/* Guides grid */}
          <section className="mb-10">
            <SectionHeader title="Latest Guides" kicker="Updated daily" />
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {GUIDES.map((a, i) => (
                <ArticleCard key={i} a={a} size="md" />
              ))}
            </div>
          </section>

          {/* Mid-content ad */}
          <AdSlot slot="3333333333" minHeight={250} />

          {/* Editor picks / features */}
          <section className="mb-10">
            <SectionHeader title="Most Popular Tools" />
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
              {TOP_STORIES.map((a, i) => (
                <ArticleCard key={i} a={a} size="sm" />
              ))}
            </div>
          </section>

          {/* FAQ-style block as content for AdSense */}
          <section className="bg-secondary p-6">
            <SectionHeader title="Quick Answers" />
            <div className="grid gap-4 sm:grid-cols-2 text-sm">
              {[
                ["Is GrabTube free?", "Yes — every tool on the site is free with no signup or daily limits."],
                ["Which formats are supported?", "MP4 (144p–8K), MP3 up to 320kbps, WEBM, M4A, plus Shorts."],
                ["Do I need to install anything?", "No. Everything runs in your browser on any device."],
                ["Is it safe and legal?", "We don't track or store videos. Always respect copyright and YouTube's ToS."],
              ].map(([q, a]) => (
                <div key={q}>
                  <h4 className="font-serif font-bold text-base text-ink mb-1">{q}</h4>
                  <p className="text-muted-foreground">{a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* SIDEBAR */}
        <aside className="space-y-6 lg:sticky lg:top-4 lg:self-start">
          <Downloader compact />

          <AdSlot slot="4444444444" label="Sponsored" minHeight={250} />

          <div>
            <SectionHeader title="Trending Now" />
            <div className="divide-y divide-border">
              {TRENDING.map((a, i) => (
                <ArticleCard key={i} a={a} size="row" />
              ))}
            </div>
          </div>

          <AdSlot slot="5555555555" label="Advertisement" minHeight={600} />

          <div className="bg-ink text-white p-5">
            <h4 className="font-serif font-bold text-lg mb-2">Daily newsletter</h4>
            <p className="text-xs text-white/70 mb-3">The week's best YouTube tools and tricks, in your inbox every Friday.</p>
            <input className="w-full h-10 px-3 text-sm text-ink bg-white outline-none mb-2" placeholder="you@email.com" />
            <button className="w-full h-10 bg-primary font-bold text-sm uppercase">Subscribe</button>
          </div>
        </aside>
      </div>

      {/* Footer leaderboard */}
      <div className="container mx-auto px-4 pb-6">
        <AdSlot slot="6666666666" label="Sponsored" minHeight={90} />
      </div>
    </Layout>
  );
}
