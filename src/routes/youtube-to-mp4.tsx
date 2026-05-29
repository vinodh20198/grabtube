import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/ToolPage";

const PIC = (id: number) => `https://picsum.photos/seed/mp4-${id}/800/500`;

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
    <ToolPage
      category="Downloader"
      title="YouTube to MP4: the complete free converter guide"
      intro="Save any YouTube video as a clean MP4 file — from 360p preview clips to 8K masterpieces — directly from your browser, with no installs and no signup."
      format="mp4"
      hero={`https://picsum.photos/seed/mp4-hero/1200/675`}
      body={[
        { h: "Why MP4 is still the king of video formats", p: "MP4 is supported by virtually every device, browser, and player on earth. It compresses cleanly while preserving original audio, which is why it remains the default for YouTube downloads in 2026. Whether you're archiving a tutorial or saving a music video to play offline, MP4 strikes the best balance between quality, file size, and compatibility." },
        { h: "Picking the right quality", p: "Higher isn't always better. For phone playback, 720p saves storage without visible quality loss. 1080p is the sweet spot for laptops and TVs. Jump to 2K, 4K, or 8K only when the source actually offers it and you have the screen to appreciate it — and the storage to spare." },
        { h: "How to download a YouTube video as MP4", p: "Copy the YouTube URL from the share button. Paste it into the downloader above. Choose MP4 and the quality you want. Press download — your file is ready in seconds. No accounts, no software, no watermark." },
        { h: "Troubleshooting failed downloads", p: "If a download fails, the video may be age-restricted, region-locked, or removed. Try refreshing the page, double-checking the URL is public, or selecting a lower quality. Long videos (over an hour) at 4K can take longer to convert — give it a minute." },
      ]}
      faqs={[
        { q: "What MP4 qualities can I download?", a: "Anything available on the source video: 360p, 480p, 720p HD, 1080p Full HD, 2K, 4K, even 8K when available." },
        { q: "Does the MP4 keep original audio?", a: "Yes — we mux original AAC audio into the MP4 so quality is identical to YouTube." },
        { q: "Is there a file size limit?", a: "No. Long videos and 4K files download just as easily as short clips." },
        { q: "Does it work on iPhone?", a: "Yes. Use Safari, paste the link, tap download — the file saves to Files or Photos." },
      ]}
      related={[
        { category: "Audio", title: "YouTube to MP3 at 320kbps: the complete guide", image: PIC(1), href: "/youtube-to-mp3", meta: "8 min read" },
        { category: "4K", title: "Download YouTube videos in 4K without losing quality", image: PIC(2), href: "/4k-downloader", meta: "12 min read" },
        { category: "Shorts", title: "YouTube Shorts: download with no watermark", image: PIC(3), href: "/youtube-shorts-downloader", meta: "5 min read" },
        { category: "Tips", title: "MP4 vs WEBM vs M4A — which format wins?", image: PIC(4), href: "/", meta: "4 min read" },
        { category: "Guide", title: "Save entire YouTube playlists in one click", image: PIC(5), href: "/", meta: "6 min read" },
      ]}
    />
  ),
});
