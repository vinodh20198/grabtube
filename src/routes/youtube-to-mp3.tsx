import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/ToolPage";

const PIC = (id: number) => `https://picsum.photos/seed/mp3-${id}/800/500`;

export const Route = createFileRoute("/youtube-to-mp3")({
  head: () => ({
    meta: [
      { title: "YouTube to MP3 Converter — 320kbps Free MP3 Downloader | GrabTube" },
      { name: "description", content: "Convert YouTube videos to MP3 free. High-quality 320kbps audio downloads, no signup. Works on mobile and desktop." },
      { property: "og:title", content: "YouTube to MP3 — 320kbps Free Converter" },
      { property: "og:description", content: "Free YouTube to MP3 converter. 320kbps, unlimited, no signup." },
      { rel: "canonical", href: "/youtube-to-mp3" } as never,
    ],
  }),
  component: () => (
    <ToolPage
      category="Audio Converter"
      title="YouTube to MP3 at 320kbps: free, fast, and audiophile-clean"
      intro="Pull crisp 320kbps audio from any YouTube video — music, podcasts, lectures, audiobooks — in seconds. No registration, no software, no quality compromise."
      format="mp3"
      hero={`https://picsum.photos/seed/mp3-hero/1200/675`}
      body={[
        { h: "Why 320kbps is the right MP3 bitrate", p: "320kbps is the maximum bitrate the MP3 format supports and is virtually indistinguishable from the original source for almost all listeners. Lower bitrates like 128kbps strip away high-end detail in cymbals, vocals, and ambient noise — fine for podcasts, painful for music." },
        { h: "Music vs podcasts vs lectures", p: "For music, always go 320kbps. For podcasts and lectures, 128–192kbps is usually enough and saves storage. Audiobooks sit somewhere in the middle — 192kbps preserves voice clarity without bloating file sizes." },
        { h: "How to convert YouTube to MP3", p: "Copy the video URL, paste it above, select MP3, choose your bitrate, hit download. The MP3 lands in your Downloads folder with title and artist metadata already filled in from YouTube." },
        { h: "Legality and copyright", p: "Converting copyrighted music for personal offline listening sits in a gray area in most countries. Distributing or monetizing those files does not — that's piracy. Always respect creators and prefer official sources when available." },
      ]}
      faqs={[
        { q: "What bitrate is the MP3?", a: "Up to 320kbps — the highest MP3 quality, virtually indistinguishable from source." },
        { q: "Can I download podcasts and music?", a: "Yes — anything with audio on YouTube can be saved as MP3." },
        { q: "Does it include metadata?", a: "Yes. Title and artist tags are auto-filled from the YouTube video where available." },
      ]}
      related={[
        { category: "Video", title: "YouTube to MP4: the complete free converter guide", image: PIC(1), href: "/youtube-to-mp4", meta: "7 min read" },
        { category: "4K", title: "Download YouTube videos in 4K without losing quality", image: PIC(2), href: "/4k-downloader", meta: "12 min read" },
        { category: "Shorts", title: "YouTube Shorts: download with no watermark", image: PIC(3), href: "/youtube-shorts-downloader", meta: "5 min read" },
        { category: "Tips", title: "The fastest way to rip podcasts to MP3 on iPhone", image: PIC(4), href: "/", meta: "4 min read" },
        { category: "Guide", title: "Best free music players for offline MP3 libraries", image: PIC(5), href: "/", meta: "6 min read" },
      ]}
    />
  ),
});
