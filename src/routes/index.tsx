import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Downloader } from "@/components/Downloader";
import { AdSlot } from "@/components/AdSlot";
import { CheckCircle2, Smartphone, Zap, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YouTube Video Downloader — Free YT Download (MP4, MP3, 4K) | GrabTube" },
      { name: "description", content: "Free YT downloader for YouTube video download in MP4, MP3, 4K, and Shorts. Fast, unlimited, no signup, works on any device." },
      { property: "og:title", content: "GrabTube — Free YouTube Video Downloader" },
      { property: "og:description", content: "YT video downloader: free YouTube download in MP4, MP3, and 4K." },
    ],
  }),
  component: Home,
});

const FAQS = [
  { q: "1. Where are downloads saved?", a: "Files are saved to your browser's default download folder — on desktop, that's usually the Downloads folder; on mobile, it goes to Files (iOS) or your gallery (Android)." },
  { q: "2. How do I download YouTube videos in MP3?", a: "Paste the YouTube link, select MP3 from the format options, then click Download. The audio file is ready in seconds." },
  { q: "3. How long does it take to download a video?", a: "Most videos convert in a few seconds. Long videos or 4K files can take up to a minute depending on length and your connection." },
  { q: "4. Is it safe to download YouTube videos with GrabTube?", a: "Yes. GrabTube doesn't require signup, doesn't store your downloads, and runs entirely over HTTPS. Always respect copyright when downloading." },
];

const FEATURES = [
  { icon: Zap, t: "Fast conversion", d: "Most videos process in seconds, not minutes." },
  { icon: ShieldCheck, t: "Safe & private", d: "No accounts, no tracking, no stored files." },
  { icon: Smartphone, t: "Any device", d: "Works on phone, tablet, laptop, or desktop." },
  { icon: CheckCircle2, t: "Multiple formats", d: "MP4, MP3, 4K, Shorts — pick what fits you." },
];

function Home() {
  return (
    <Layout>
      {/* Hero */}
      <section className="container mx-auto px-4 pt-16 pb-12 text-center">
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">YouTube Video Downloader</h1>
        <p className="mt-3 text-muted-foreground">Free. No signup. Download now.</p>
        <div className="mt-8">
          <Downloader />
        </div>
      </section>

      {/* Top leaderboard ad */}
      <div className="container mx-auto px-4">
        <AdSlot slot="1111111111" minHeight={120} />
      </div>

      {/* GT shortcut */}
      <section className="container mx-auto px-4 mt-6">
        <div className="max-w-5xl mx-auto bg-card border border-border rounded-lg p-5 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-primary" /> The "GT" shortcut — fastest way to download
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Add <code className="px-1.5 py-0.5 rounded bg-muted text-foreground font-mono text-xs">gt</code> before <strong>youtube</strong> in any video URL and hit Enter. We instantly load the video and show your MP4, MP3, and 4K options.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 text-sm">
            <div className="bg-muted/50 border border-border rounded-md p-3 font-mono text-xs break-all">
              <div className="text-muted-foreground mb-1 font-sans">Before</div>
              youtube.com/watch?v=8KvjkdhuLk
            </div>
            <div className="bg-primary-soft border border-primary/20 rounded-md p-3 font-mono text-xs break-all">
              <div className="text-primary mb-1 font-sans">After</div>
              <strong>gt</strong>youtube.com/watch?v=8KvjkdhuLk
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Works with <code className="font-mono">/watch?v=…</code>, <code className="font-mono">/shorts/…</code>, and <code className="font-mono">gtyoutu.be/…</code> short links.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-2">
        <div className="max-w-5xl mx-auto bg-primary-soft text-primary border border-primary/20 rounded-md px-4 py-3 text-sm">
          – GrabTube is a free, web-based YouTube downloader and is not affiliated with any software or paid products.
        </div>
      </div>

      {/* Two-column content */}
      <section className="container mx-auto px-4 mt-10 grid gap-6 lg:grid-cols-2 max-w-5xl">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-primary" /> Best YouTube Downloader
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            GrabTube is one of the best YouTube video downloaders for MP3 and MP4 formats. It offers a free, easy-to-use tool that lets you save videos (up to 8K), Shorts, and audio from YouTube with just one click. Whether you want a high-resolution video, a quick Shorts clip, or just the audio track from a music video, GrabTube makes the process fast and simple. Paste the YouTube link, pick the quality, and download it directly to your device.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-primary" /> Frequently Asked Questions
          </h2>
          <div className="divide-y divide-border">
            {FAQS.map((f, i) => (
              <details key={i} className="py-3 group">
                <summary className="text-sm font-medium cursor-pointer list-none flex justify-between items-center">
                  {f.q}
                  <span className="text-muted-foreground group-open:rotate-180 transition text-xs">▾</span>
                </summary>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Mid ad */}
      <div className="container mx-auto px-4 mt-8">
        <AdSlot slot="2222222222" minHeight={250} />
      </div>

      {/* Features */}
      <section className="container mx-auto px-4 mt-10 max-w-5xl">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-primary" /> GrabTube Features
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-4">
              <f.icon className="size-5 text-primary mb-2" />
              <h3 className="text-sm font-semibold">{f.t}</h3>
              <p className="text-xs text-muted-foreground mt-1">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to use */}
      <section className="container mx-auto px-4 mt-10 max-w-5xl">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-primary" /> How to use
        </h2>
        <ol className="grid gap-3 sm:grid-cols-3">
          {[
            "Copy the YouTube video URL from your browser or the YouTube app.",
            "Paste the link into the input field above and pick your format.",
            "Click Download — your file will be saved to your device.",
          ].map((step, i) => (
            <li key={i} className="bg-card border border-border rounded-lg p-4 text-sm">
              <span className="inline-flex size-6 rounded-full bg-primary text-primary-foreground items-center justify-center text-xs font-semibold mr-2">{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      {/* Footer ad */}
      <div className="container mx-auto px-4 mt-10">
        <AdSlot slot="3333333333" minHeight={120} />
      </div>
    </Layout>
  );
}
