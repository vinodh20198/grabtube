import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { FAQ } from "@/components/FAQ";
import { AdSlot } from "@/components/AdSlot";

export const Route = createFileRoute("/4k-downloader")({
  head: () => ({
    meta: [
      { title: "4K YouTube Downloader — Free Ultra HD & 8K Video Downloads | GrabTube" },
      { name: "description", content: "Download YouTube videos in 4K and 8K Ultra HD free. Crystal-clear quality, no signup, no software install required." },
      { property: "og:title", content: "4K YouTube Downloader — Free Ultra HD" },
      { property: "og:description", content: "Free 4K and 8K YouTube downloader. No software, no signup." },
      { rel: "canonical", href: "/4k-downloader" } as never,
    ],
  }),
  component: () => (
    <Layout>
      <Hero
        eyebrow="4K & 8K Downloader"
        defaultFormat="4k"
        title={<>Download in <span className="text-gradient-primary">4K & 8K</span></>}
        subtitle="Ultra HD YouTube downloads, free and unlimited. No installs, no accounts — just paste and grab."
      />
      <AdSlot slot="6666666666" />
      <FAQ items={[
        { q: "How big are 4K files?", a: "Usually 300MB–2GB depending on length. 8K can be much larger — make sure you have storage." },
        { q: "Do I need a special player?", a: "Most modern phones, browsers, and TVs play 4K MP4 natively. VLC works everywhere as a fallback." },
        { q: "Why is 4K not available on every video?", a: "Only videos the creator uploaded in 4K+ can be downloaded at that quality." },
      ]} />
    </Layout>
  ),
});
