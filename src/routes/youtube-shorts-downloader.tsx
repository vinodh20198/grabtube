import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { FAQ } from "@/components/FAQ";
import { AdSlot } from "@/components/AdSlot";

export const Route = createFileRoute("/youtube-shorts-downloader")({
  head: () => ({
    meta: [
      { title: "YouTube Shorts Downloader — Save Shorts Without Watermark | GrabTube" },
      { name: "description", content: "Download YouTube Shorts free, no watermark. Save vertical Shorts to your phone in MP4 — fast, unlimited, no signup." },
      { property: "og:title", content: "YouTube Shorts Downloader — No Watermark" },
      { property: "og:description", content: "Save YouTube Shorts in HD, no watermark, free." },
      { rel: "canonical", href: "/youtube-shorts-downloader" } as never,
    ],
  }),
  component: () => (
    <Layout>
      <Hero
        eyebrow="Shorts Downloader"
        defaultFormat="shorts"
        title={<>YouTube <span className="text-gradient-primary">Shorts</span>, no watermark</>}
        subtitle="Save any YouTube Short directly to your camera roll in vertical HD MP4."
      />
      <AdSlot slot="5555555555" />
      <FAQ items={[
        { q: "Will the download have a watermark?", a: "No. Shorts are saved as clean MP4 with no overlay." },
        { q: "Can I repost downloaded Shorts?", a: "Only if you own the content or have the creator's permission. Respect copyright." },
        { q: "Does it work on iPhone?", a: "Yes — paste the link in Safari and tap download. The file saves to Files or Photos." },
      ]} />
    </Layout>
  ),
});
