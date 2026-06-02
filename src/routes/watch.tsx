import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Layout } from "@/components/Layout";
import { Downloader } from "@/components/Downloader";

const search = z.object({
  v: z.string().optional(),
});

export const Route = createFileRoute("/watch")({
  validateSearch: (s) => search.parse(s),
  head: () => ({
    meta: [
      { title: "Download YouTube Video — GrabTube" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WatchPage,
});

function WatchPage() {
  const { v } = Route.useSearch();
  const initial = v ? `https://www.youtube.com/watch?v=${v}` : undefined;
  return (
    <Layout>
      <section className="container mx-auto px-4 pt-16 pb-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          {initial ? "Fetching your video…" : "Paste a YouTube link"}
        </h1>
        <p className="mt-3 text-muted-foreground">
          GT shortcut detected — your download options will appear below.
        </p>
        <div className="mt-8">
          <Downloader initialUrl={initial} autoFetch={!!initial} />
        </div>
      </section>
    </Layout>
  );
}
