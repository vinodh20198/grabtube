import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQ } from "@/components/FAQ";
import { AdSlot } from "@/components/AdSlot";

export const Route = createFileRoute("/youtube-to-mp4")({
  head: () => ({
    meta: [
      { title: "YouTube to MP4 Converter — Free HD & 1080p Downloader | GrabTube" },
      { name: "description", content: "Convert YouTube videos to MP4 free. Download in 720p, 1080p, 2K, 4K, and 8K. No signup, unlimited conversions, instant downloads." },
      { property: "og:title", content: "YouTube to MP4 — Free HD Downloader" },
      { property: "og:description", content: "Fastest YouTube to MP4 converter. Free, unlimited, all qualities." },
      { rel: "canonical", href: "/youtube-to-mp4" } as never,
    ],
  }),
  component: () => (
    <Layout>
      <Hero
        eyebrow="YouTube → MP4"
        defaultFormat="mp4"
        title={<>YouTube to <span className="text-gradient-primary">MP4</span> in seconds</>}
        subtitle="Free YouTube to MP4 converter. Pick any quality from 360p to 8K and save videos straight to your device."
      />
      <AdSlot slot="3333333333" />
      <HowItWorks />
      <FAQ items={[
        { q: "What MP4 qualities can I download?", a: "Anything available on the source video: 360p, 480p, 720p HD, 1080p Full HD, 2K, 4K, even 8K when available." },
        { q: "Does the MP4 keep original audio?", a: "Yes — we mux original AAC audio into the MP4 so quality is identical to YouTube." },
        { q: "Is there a file size limit?", a: "No. Long videos and 4K files download just as easily as short clips." },
      ]} />
    </Layout>
  ),
});
