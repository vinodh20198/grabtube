import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQ } from "@/components/FAQ";
import { AdSlot } from "@/components/AdSlot";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GrabTube — Free YouTube Downloader (MP4, MP3, 4K, Shorts)" },
      { name: "description", content: "Free online YouTube downloader. Convert and download YouTube videos to MP4, MP3, 4K and Shorts in seconds. No signup, no limits, works on any device." },
      { property: "og:title", content: "GrabTube — Free YouTube Downloader" },
      { property: "og:description", content: "Fastest free YouTube downloader. MP4, MP3, 4K, Shorts." },
    ],
  }),
  component: Home,
});

const FAQS = [
  { q: "Is GrabTube really free?", a: "Yes. Every download is free with no signup, no software install, and no daily limits." },
  { q: "Which formats and qualities are supported?", a: "MP4 from 144p to 8K, MP3 audio up to 320kbps, plus WEBM and M4A. We also support YouTube Shorts and live recordings." },
  { q: "Do I need to install anything?", a: "No. GrabTube runs entirely in your browser — works on iPhone, Android, Windows, Mac, and Linux." },
  { q: "Is it safe to use?", a: "Yes. We don't track users, store videos, or require accounts. Downloads happen securely over HTTPS." },
  { q: "Can I download YouTube playlists?", a: "Yes — paste any playlist URL and pick which videos to grab." },
  { q: "Is downloading YouTube videos legal?", a: "Downloading content you own or that's in the public domain is generally fine. Always respect copyright and YouTube's Terms of Service." },
];

function Home() {
  return (
    <Layout>
      <Hero
        title={
          <>
            Download <span className="text-gradient-primary">YouTube</span> videos in one click
          </>
        }
        subtitle="The fastest free YouTube to MP4 & MP3 converter. HD, 4K, Shorts — all formats, no limits, no signup."
      />
      <AdSlot slot="1111111111" />
      <Features />
      <HowItWorks />
      <AdSlot slot="2222222222" />
      <FAQ items={FAQS} />
    </Layout>
  );
}
