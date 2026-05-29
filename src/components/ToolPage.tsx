import { Layout } from "@/components/Layout";
import { Downloader } from "@/components/Downloader";
import { AdSlot } from "@/components/AdSlot";

interface Props {
  title: string;
  subtitle: string;
  intro: string;
  body: { h: string; p: string }[];
  faqs: { q: string; a: string }[];
  format: "mp4" | "mp3" | "4k" | "shorts";
}

export function ToolPage({ title, subtitle, intro, body, faqs, format }: Props) {
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
      <section className="container mx-auto px-4 pt-16 pb-12 text-center">
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-3 text-muted-foreground">{subtitle}</p>
        <div className="mt-8">
          <Downloader defaultFormat={format} />
        </div>
      </section>

      <div className="container mx-auto px-4">
        <AdSlot slot="4444444444" minHeight={120} />
      </div>

      <article className="container mx-auto px-4 mt-8 max-w-3xl">
        <div className="bg-card border border-border rounded-lg p-6 sm:p-8">
          <p className="text-base leading-relaxed text-muted-foreground">{intro}</p>
        </div>

        <div className="mt-6 space-y-6">
          {body.map((b, i) => (
            <section key={i} className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-2">{b.h}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.p}</p>
              {i === 1 && <div className="mt-6"><AdSlot slot="5555555555" minHeight={250} /></div>}
            </section>
          ))}
        </div>

        <section className="mt-6 bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-primary" /> Frequently Asked Questions
          </h2>
          <div className="divide-y divide-border">
            {faqs.map((f, i) => (
              <details key={i} className="py-3 group">
                <summary className="text-sm font-medium cursor-pointer list-none flex justify-between items-center">
                  {f.q}
                  <span className="text-muted-foreground group-open:rotate-180 transition text-xs">▾</span>
                </summary>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </article>

      <div className="container mx-auto px-4 mt-10">
        <AdSlot slot="6666666666" minHeight={120} />
      </div>
    </Layout>
  );
}
