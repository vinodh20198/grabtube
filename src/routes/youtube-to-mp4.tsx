import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/ToolPage";

export const Route = createFileRoute("/youtube-to-mp4")({
  head: () => ({
    meta: [
      { title: "YouTube to MP4 — Free HD Video Downloader | GrabTube" },
      { name: "description", content: "Convert YouTube videos to MP4 free. Download in 720p, 1080p, 2K, 4K and 8K. No signup, unlimited." },
      { property: "og:title", content: "YouTube to MP4 — Free HD Downloader" },
      { property: "og:description", content: "Fastest free YouTube to MP4 converter." },
      { rel: "canonical", href: "/youtube-to-mp4" } as never,
    ],
  }),
  component: () => (
    <ToolPage
      title="YouTube to MP4"
      subtitle="Free. No signup. Download MP4 in seconds."
      format="mp4"
      intro="GrabTube's YouTube to MP4 converter lets you save any YouTube video as a clean MP4 file. Pick quality from 360p up to 8K, paste the link, and download — directly from your browser, with no installs and no account."
      body={[
        { h: "Why MP4?", p: "MP4 is supported by virtually every device and player. It compresses cleanly while preserving original audio, which makes it the default choice for offline YouTube videos in 2026." },
        { h: "Picking the right quality", p: "For phones, 720p is plenty. For laptops and TVs, 1080p is the sweet spot. Choose 4K or 8K only when the source supports it and you have the storage and screen to appreciate it." },
        { h: "How to download a YouTube video as MP4", p: "Copy the YouTube URL, paste it into the box above, select MP4, then press Download. Your file is ready in seconds — no watermark, no signup, no software." },
      ]}
      faqs={[
        { q: "What MP4 qualities can I download?", a: "Any quality the source video offers: 360p, 480p, 720p, 1080p, 2K, 4K, and 8K when available." },
        { q: "Does the MP4 keep the original audio?", a: "Yes — original AAC audio is preserved, so quality matches YouTube exactly." },
        { q: "Does it work on iPhone and Android?", a: "Yes. On iPhone, downloads save to Files or Photos. On Android, they land in your gallery or Downloads." },
      ]}
    />
  ),
});
