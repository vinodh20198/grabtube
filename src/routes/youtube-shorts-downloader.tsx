import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/ToolPage";

export const Route = createFileRoute("/youtube-shorts-downloader")({
  head: () => ({
    meta: [
      { title: "YouTube Shorts Downloader — No Watermark | GrabTube" },
      { name: "description", content: "Download YouTube Shorts free, no watermark. Save vertical Shorts in HD MP4 to any device." },
      { property: "og:title", content: "YouTube Shorts Downloader — No Watermark" },
      { property: "og:description", content: "Save YouTube Shorts in HD, no watermark, free." },
      { rel: "canonical", href: "/youtube-shorts-downloader" } as never,
    ],
  }),
  component: () => (
    <ToolPage
      title="YouTube Shorts Downloader"
      subtitle="Free. No signup. No watermark."
      format="shorts"
      intro="Save any YouTube Short directly to your device as a clean vertical MP4 — no watermark, no signup, no installs. Works on iPhone, Android, and desktop."
      body={[
        { h: "Why no-watermark matters", p: "Screen recording leaves YouTube's UI and a watermark behind. A proper downloader pulls the original MP4 the way YouTube stores it: clean, vertical, full quality." },
        { h: "Step-by-step on mobile", p: "On iPhone, paste the Short link in Safari, tap Download, then save to Files or Photos. On Android, files land directly in your gallery or Downloads folder." },
        { h: "A word on reposting", p: "Downloading isn't a license to republish. If you plan to repost, get permission from the original creator and credit them clearly." },
      ]}
      faqs={[
        { q: "Will the download have a watermark?", a: "No. Shorts download as clean MP4 with no overlay." },
        { q: "Can I repost downloaded Shorts?", a: "Only with the creator's permission. Always respect copyright." },
        { q: "Does it work on iPhone?", a: "Yes — paste the link in Safari, tap Download, and save to Files or Photos." },
      ]}
    />
  ),
});
