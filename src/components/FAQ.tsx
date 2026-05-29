interface QA { q: string; a: string }

export function FAQ({ items, title = "Frequently asked questions" }: { items: QA[]; title?: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };

  return (
    <section className="container mx-auto px-4 py-16 max-w-3xl">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">{title}</h2>
      <div className="space-y-3">
        {items.map((i, idx) => (
          <details
            key={idx}
            className="group glass rounded-xl p-5 cursor-pointer open:shadow-card"
          >
            <summary className="font-semibold list-none flex justify-between items-center">
              {i.q}
              <span className="text-primary group-open:rotate-45 transition text-2xl leading-none">+</span>
            </summary>
            <p className="mt-3 text-muted-foreground leading-relaxed">{i.a}</p>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}
