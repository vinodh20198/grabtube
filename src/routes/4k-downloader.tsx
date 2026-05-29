import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/ToolPage";

export const Route = createFileRoute("/4k-downloader")({
  head: () => ({
    meta: [
      { title: "4K YouTube Downloader — Free Ultra HD & 8K | GrabTube" },
      { name: "description", content: "Download YouTube videos in 4K and 8K Ultra HD free. Crystal-clear quality, no signup, no software install." },
      { property: "og:title", content: "4K YouTube Downloader — Free Ultra HD" },
      { property: "og:description", content: "Free 4K and 8K YouTube downloader." },
      { rel: "canonical", href: "/4k-downloader" } as never,
    ],
  }),
  component: () => (
    <ToolPage
      title="4K YouTube Downloader"
      subtitle="Free. No signup. Ultra HD downloads."
      format="4k"
      intro="Download YouTube videos in 4K (2160p) and 8K (4320p) when the source supports it. No installs, no signup — just paste a link and grab the highest quality available."
      body={[
        { h: "What 4K really means", p: "4K is 3840 × 2160 pixels — four times the detail of 1080p. YouTube encodes 4K in VP9 or AV1, which keeps file sizes smaller but needs a modern device for smooth playback. 8K is rarer and best on flagship displays." },
        { h: "Storage and bandwidth", p: "A 10-minute 4K video is roughly 300–500MB; a one-hour vlog can hit 2GB. 8K can double or triple that. Plug in to power and use Wi-Fi for anything long." },
        { h: "Why some videos only offer 1080p", p: "If 4K isn't an option, the creator simply didn't upload at that resolution. No downloader can invent pixels that aren't in the source." },
      ]}
      faqs={[
        { q: "How big are 4K files?", a: "Usually 300MB–2GB depending on length. 8K can be much larger — make sure you have storage." },
        { q: "Do I need a special player?", a: "Most modern phones, browsers, and TVs play 4K MP4 natively. VLC works everywhere as a fallback." },
        { q: "Why is 4K not available on every video?", a: "Only videos the creator uploaded in 4K or higher can be downloaded at that quality." },
      ]}
    />
  ),
});
