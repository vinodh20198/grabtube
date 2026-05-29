import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/ToolPage";

const PIC = (id: number) => `https://picsum.photos/seed/uhd-${id}/800/500`;

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
    <ToolPage
      category="Ultra HD"
      title="Download YouTube videos in 4K & 8K — without losing a single pixel"
      intro="From bitrate basics to codec choices, here's how to grab Ultra HD YouTube videos the right way in 2026 — on any device, completely free."
      format="4k"
      hero={`https://picsum.photos/seed/uhd-hero/1200/675`}
      body={[
        { h: "What 4K actually means on YouTube", p: "4K (or 2160p) is 3840 × 2160 pixels — four times the detail of 1080p Full HD. YouTube encodes 4K in either VP9 or AV1, which makes files smaller but harder for older devices to play. 8K (4320p) is rarer and supported only on flagship displays." },
        { h: "Storage and bandwidth realities", p: "A 10-minute 4K video is roughly 300–500MB. A full one-hour vlog can hit 2GB. 8K can double or triple those numbers. Plug in to power and use Wi-Fi for anything over 30 minutes." },
        { h: "Playback on phones, TVs, and laptops", p: "Modern iPhones and Pixels play 4K MP4 natively. Smart TVs and Apple TV handle it via USB or AirPlay. For older laptops, VLC is the safest fallback — it plays everything." },
        { h: "Why some videos only offer 1080p", p: "If a 4K option isn't available, the creator simply didn't upload at that resolution. No downloader can invent pixels that don't exist in the source." },
      ]}
      faqs={[
        { q: "How big are 4K files?", a: "Usually 300MB–2GB depending on length. 8K can be much larger — make sure you have storage." },
        { q: "Do I need a special player?", a: "Most modern phones, browsers, and TVs play 4K MP4 natively. VLC works everywhere as a fallback." },
        { q: "Why is 4K not available on every video?", a: "Only videos the creator uploaded in 4K+ can be downloaded at that quality." },
      ]}
      related={[
        { category: "Video", title: "YouTube to MP4: the complete free converter guide", image: PIC(1), href: "/youtube-to-mp4", meta: "7 min read" },
        { category: "Audio", title: "YouTube to MP3 at 320kbps: the complete guide", image: PIC(2), href: "/youtube-to-mp3", meta: "8 min read" },
        { category: "Shorts", title: "YouTube Shorts: download with no watermark", image: PIC(3), href: "/youtube-shorts-downloader", meta: "5 min read" },
        { category: "Tips", title: "VP9 vs AV1: which codec should you choose?", image: PIC(4), href: "/", meta: "6 min read" },
        { category: "Guide", title: "Best free 4K media players in 2026", image: PIC(5), href: "/", meta: "5 min read" },
      ]}
    />
  ),
});
