import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/ToolPage";

export const Route = createFileRoute("/youtube-to-mp3")({
  head: () => ({
    meta: [
      { title: "YouTube to MP3 — Free 320kbps Audio Downloader | GrabTube" },
      { name: "description", content: "Convert YouTube videos to MP3 free. 320kbps high-quality audio, no signup, works on any device." },
      { property: "og:title", content: "YouTube to MP3 — Free Audio Converter" },
      { property: "og:description", content: "Free YouTube to MP3 converter at 320kbps." },
      { rel: "canonical", href: "/youtube-to-mp3" } as never,
    ],
  }),
  component: () => (
    <ToolPage
      title="YouTube to MP3"
      subtitle="Free. No signup. 320kbps audio downloads."
      format="mp3"
      intro="Convert any YouTube video into a high-quality MP3 file. Perfect for music, podcasts, lectures, and audiobooks — paste the link, pick your bitrate, and download."
      body={[
        { h: "Why 320kbps?", p: "320kbps is the highest bitrate MP3 supports and is virtually indistinguishable from the original source for most listeners. Lower bitrates strip away detail in cymbals, vocals, and ambient sound." },
        { h: "Music vs podcasts", p: "Use 320kbps for music to preserve every detail. For spoken-word podcasts or lectures, 128–192kbps is more than enough and saves storage." },
        { h: "How to convert YouTube to MP3", p: "Copy the YouTube URL, paste it above, select MP3, and press Download. Your audio file lands in your downloads in seconds, with title and artist tags auto-filled." },
      ]}
      faqs={[
        { q: "What bitrate are the MP3 files?", a: "Up to 320kbps — the highest MP3 quality, near-indistinguishable from the source." },
        { q: "Can I download podcasts and music?", a: "Yes — anything with audio on YouTube can be saved as MP3." },
        { q: "Does it include metadata?", a: "Yes. Title and artist tags are auto-filled from the YouTube video where possible." },
      ]}
    />
  ),
});
