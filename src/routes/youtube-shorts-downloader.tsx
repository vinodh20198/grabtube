import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/ToolPage";

const PIC = (id: number) => `https://picsum.photos/seed/shorts-${id}/800/500`;

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
    <ToolPage
      category="Shorts"
      title="YouTube Shorts downloader: save vertical videos with no watermark"
      intro="Grab any YouTube Short straight to your camera roll — clean MP4, vertical HD, zero watermark, completely free."
      format="shorts"
      hero={`https://picsum.photos/seed/shorts-hero/1200/675`}
      body={[
        { h: "Why people download Shorts", p: "Creators want backups of their own content. Editors want raw clips to remix and repost (with permission). Casual viewers want to send funny moments to friends who don't have the app. All valid — and all faster when you can skip screen recording." },
        { h: "Why no watermark matters", p: "Screen recording leaves a YouTube watermark and UI overlays. A real downloader pulls the raw MP4 the way YouTube stores it: clean, vertical, full quality. Perfect for archiving or remixing." },
        { h: "Step-by-step on iPhone & Android", p: "On iPhone, paste the Short link in Safari, tap the download button, then save to Files or Photos. On Android, downloads land directly in your gallery. No app install required on either platform." },
        { h: "A word on reposting", p: "Downloading isn't a license to republish. If you're reposting a Short to your own account, get permission and credit the original creator. Repeated unauthorized reposts can get your account banned." },
      ]}
      faqs={[
        { q: "Will the download have a watermark?", a: "No. Shorts are saved as clean MP4 with no overlay." },
        { q: "Can I repost downloaded Shorts?", a: "Only if you own the content or have the creator's permission. Respect copyright." },
        { q: "Does it work on iPhone?", a: "Yes — paste the link in Safari and tap download. The file saves to Files or Photos." },
      ]}
      related={[
        { category: "Video", title: "YouTube to MP4: the complete free converter guide", image: PIC(1), href: "/youtube-to-mp4", meta: "7 min read" },
        { category: "Audio", title: "YouTube to MP3 at 320kbps: the complete guide", image: PIC(2), href: "/youtube-to-mp3", meta: "8 min read" },
        { category: "4K", title: "Download YouTube videos in 4K without losing quality", image: PIC(3), href: "/4k-downloader", meta: "12 min read" },
        { category: "Tips", title: "Best vertical video editors for remixing Shorts", image: PIC(4), href: "/", meta: "5 min read" },
        { category: "Guide", title: "How TikTok and Shorts downloads differ", image: PIC(5), href: "/", meta: "4 min read" },
      ]}
    />
  ),
});
