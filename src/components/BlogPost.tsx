import { Layout } from "@/components/Layout";
import { Link } from "@tanstack/react-router";
import { AdSlot } from "@/components/AdSlot";

export interface BlogSection { h: string; p: React.ReactNode }

interface Props {
  title: string;
  description: string;
  datePublished: string;
  readTime: string;
  intro: React.ReactNode;
  sections: BlogSection[];
  cta?: { to: string; label: string };
  slug: string;
}

export function BlogPost({ title, description, datePublished, readTime, intro, sections, cta, slug }: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    author: { "@type": "Organization", name: "GrabTube" },
    publisher: { "@type": "Organization", name: "GrabTube" },
    mainEntityOfPage: `https://grabtube.lovable.app/blog/${slug}`,
  };

  return (
    <Layout>
      <article className="container mx-auto px-4 pt-16 pb-12 max-w-3xl">
        <nav className="text-xs text-muted-foreground mb-4">
          <Link to="/blog" className="hover:text-foreground">← All articles</Link>
          <span className="mx-2">·</span>
          <span>{readTime}</span>
        </nav>

        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{intro}</p>

        <div className="mt-8"><AdSlot slot="7777777777" minHeight={120} /></div>

        <div className="mt-8 space-y-6">
          {sections.map((s, i) => (
            <section key={i} className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-3">{s.h}</h2>
              <div className="text-sm text-muted-foreground leading-relaxed space-y-3">{s.p}</div>
              {i === 1 && <div className="mt-6"><AdSlot slot="8888888888" minHeight={250} /></div>}
            </section>
          ))}
        </div>

        {cta && (
          <div className="mt-8 bg-primary-soft border border-primary/20 rounded-lg p-6 text-center">
            <p className="text-sm mb-3">Ready to try it?</p>
            <Link to={cta.to} className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              {cta.label}
            </Link>
          </div>
        )}

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </article>
    </Layout>
  );
}
