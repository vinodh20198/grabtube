import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Downloader } from "@/components/Downloader";

export const Route = createFileRoute("/shorts/$id")({
  head: () => ({
    meta: [
      { title: "Download YouTube Short — GrabTube" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ShortsPage,
});

function ShortsPage() {
  const { id } = Route.useParams();
  const initial = `https://www.youtube.com/shorts/${id}`;
  return (
    <Layout>
      <section className="container mx-auto px-4 pt-16 pb-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Fetching your Short…</h1>
        <p className="mt-3 text-muted-foreground">GT shortcut detected.</p>
        <div className="mt-8">
          <Downloader defaultFormat="shorts" initialUrl={initial} autoFetch />
        </div>
      </section>
    </Layout>
  );
}
