import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "";

const ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly" as const },
  { path: "/youtube-to-mp4", priority: "0.9", changefreq: "weekly" as const },
  { path: "/youtube-to-mp3", priority: "0.9", changefreq: "weekly" as const },
  { path: "/youtube-shorts-downloader", priority: "0.8", changefreq: "weekly" as const },
  { path: "/4k-downloader", priority: "0.8", changefreq: "weekly" as const },
  { path: "/blog", priority: "0.7", changefreq: "weekly" as const },
  { path: "/blog/youtube-to-mp4", priority: "0.6", changefreq: "monthly" as const },
  { path: "/blog/youtube-to-mp3", priority: "0.6", changefreq: "monthly" as const },
  { path: "/blog/where-do-youtube-downloads-go", priority: "0.6", changefreq: "monthly" as const },
  { path: "/blog/is-downloading-youtube-videos-illegal", priority: "0.6", changefreq: "monthly" as const },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = ROUTES.map(
          (r) =>
            `  <url>\n    <loc>${BASE_URL}${r.path}</loc>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
        ).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
