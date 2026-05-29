import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQ } from "@/components/FAQ";
import { AdSlot } from "@/components/AdSlot";

export const Route = createFileRoute("/youtube-to-mp3")({
  head: () => ({
    meta: [
      { title: "YouTube to MP3 Converter — 320kbps Free MP3 Downloader | GrabTube" },
      { name: "description", content: "Convert YouTube videos to MP3 free. High-quality 320kbps audio downloads, no signup, no ads in the way. Works on mobile and desktop." },
      { property: "og:title", content: "YouTube to MP3 — 320kbps Free Converter" },
      { property: "og:description", content: "Free YouTube to MP3 converter. 320kbps, unlimited, no signup." },
      { rel: "canonical", href: "/youtube-to-mp3" } as never,
    ],
  }),
  component: () => (
    <Layout>
      <Hero
        eyebrow="YouTube → MP3"
        defaultFormat="mp3"
        title={<>YouTube to <span className="text-gradient-primary">MP3</span> at 320kbps</>}
        subtitle="Pull crisp audio from any YouTube video. Perfect for music, podcasts, lectures, and audiobooks."
      />
      <AdSlot slot="4444444444" />
      <HowItWorks />
      <FAQ items={[
        { q: "What bitrate is the MP3?", a: "Up to 320kbps — the highest MP3 quality, virtually indistinguishable from source." },
        { q: "Can I download podcasts and music?", a: "Yes — anything with audio on YouTube can be saved as MP3." },
        { q: "Does it include metadata?", a: "Yes. Title and artist tags are auto-filled from the YouTube video where available." },
      ]} />
    </Layout>
  ),
});
