import { Layout } from "@/components/Layout";
import { Downloader } from "@/components/Downloader";
import { AdSlot } from "@/components/AdSlot";
import { ArticleCard, SectionHeader, type Article } from "@/components/ArticleCard";

interface Props {
  category: string;
  title: string;
  intro: string;
  body: { h: string; p: string }[];
  faqs: { q: string; a: string }[];
  format: "mp4" | "mp3" | "4k" | "shorts";
  hero: string;
  related: Article[];
}

export function ToolPage({ category, title, intro, body, faqs, format, hero, related }: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-4">
        <AdSlot slot="7777777777" label="Sponsored" minHeight={90} />
      </div>

      <div className="container mx-auto px-4 py-6 grid gap-8 lg:grid-cols-[1fr_320px]">
        <article className="min-w-0">
          <span className="text-xs uppercase tracking-wider text-primary font-bold">{category}</span>
          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-ink mt-2 leading-tight">{title}</h1>
          <p className="text-lg text-muted-foreground mt-3 leading-relaxed">{intro}</p>
          <p className="text-xs text-muted-foreground mt-3 pb-4 border-b border-border">
            By GrabTube Editorial · Updated {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · 6 min read
          </p>

          <div className="my-6">
            <img src={hero} alt="" className="w-full aspect-[16/9] object-cover" />
          </div>

          <div className="my-6">
            <Downloader defaultFormat={format} />
          </div>

          <AdSlot slot="8888888888" minHeight={250} />

          <div className="prose-content space-y-6 mt-6">
            {body.map((b, i) => (
              <section key={i}>
                <h2 className="font-serif font-bold text-2xl text-ink mb-2">{b.h}</h2>
                <p className="text-[15px] leading-[1.75] text-foreground">{b.p}</p>
                {i === 1 && <div className="my-6"><AdSlot slot="9999999999" minHeight={250} /></div>}
              </section>
            ))}
          </div>

          <section className="mt-10">
            <SectionHeader title="Frequently Asked" />
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <details key={i} className="border border-border p-4 group">
                  <summary className="font-serif font-bold text-base cursor-pointer list-none flex justify-between">
                    {f.q}<span className="text-primary group-open:rotate-45 transition">+</span>
                  </summary>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

          <section className="mt-10">
            <SectionHeader title="Related Guides" />
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {related.map((a, i) => <ArticleCard key={i} a={a} size="md" />)}
            </div>
          </section>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-4 lg:self-start">
          <AdSlot slot="1010101010" label="Sponsored" minHeight={250} />
          <div>
            <SectionHeader title="Trending Now" />
            <div className="divide-y divide-border">
              {related.slice(0, 5).map((a, i) => <ArticleCard key={i} a={a} size="row" />)}
            </div>
          </div>
          <AdSlot slot="1212121212" label="Advertisement" minHeight={600} />
        </aside>
      </div>

      <div className="container mx-auto px-4 pb-6">
        <AdSlot slot="1313131313" label="Sponsored" minHeight={90} />
      </div>
    </Layout>
  );
}
