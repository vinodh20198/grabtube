import { createFileRoute, notFound } from "@tanstack/react-router";
import { BlogPost } from "@/components/BlogPost";
import { POST_CONTENT } from "@/lib/blog-content";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = POST_CONTENT[params.slug];
    if (!post) return { meta: [{ title: "Article not found — GrabTube" }] };
    return {
      meta: [
        { title: `${post.title} | GrabTube` },
        { name: "description", content: post.description },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        { property: "og:type", content: "article" },
        { rel: "canonical", href: `https://grabtube.lovable.app/blog/${params.slug}` } as never,
      ],
    };
  },
  loader: ({ params }) => {
    if (!POST_CONTENT[params.slug]) throw notFound();
    return { slug: params.slug };
  },
  component: PostPage,
});

function PostPage() {
  const { slug } = Route.useParams();
  const post = POST_CONTENT[slug];
  if (!post) return null;
  return (
    <BlogPost
      slug={slug}
      title={post.title}
      description={post.description}
      datePublished={post.datePublished}
      readTime={post.readTime}
      intro={post.intro}
      sections={post.sections}
      cta={post.cta}
    />
  );
}
