import { Link } from "@tanstack/react-router";

export interface Article {
  category: string;
  title: string;
  excerpt?: string;
  image: string;
  href: string;
  meta?: string;
}

export function ArticleCard({ a, size = "md" }: { a: Article; size?: "lg" | "md" | "sm" | "row" }) {
  if (size === "row") {
    return (
      <Link to={a.href as never} className="group flex gap-3 py-3 border-b border-border last:border-0">
        <img src={a.image} alt="" loading="lazy" className="size-20 object-cover shrink-0" />
        <div className="flex-1 min-w-0">
          <span className="text-[10px] uppercase tracking-wider text-primary font-bold">{a.category}</span>
          <h4 className="font-serif font-bold text-sm leading-snug text-ink group-hover:text-primary mt-0.5 line-clamp-3">{a.title}</h4>
          {a.meta && <p className="text-[11px] text-muted-foreground mt-1">{a.meta}</p>}
        </div>
      </Link>
    );
  }

  if (size === "lg") {
    return (
      <Link to={a.href as never} className="group block">
        <div className="aspect-[16/10] overflow-hidden bg-muted">
          <img src={a.image} alt="" loading="lazy" className="size-full object-cover group-hover:scale-105 transition duration-500" />
        </div>
        <span className="text-[11px] uppercase tracking-wider text-primary font-bold mt-3 inline-block">{a.category}</span>
        <h3 className="font-serif font-bold text-2xl sm:text-3xl leading-tight text-ink group-hover:text-primary mt-1">{a.title}</h3>
        {a.excerpt && <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-3">{a.excerpt}</p>}
        {a.meta && <p className="text-[11px] text-muted-foreground mt-2">{a.meta}</p>}
      </Link>
    );
  }

  return (
    <Link to={a.href as never} className="group block">
      <div className="aspect-[16/10] overflow-hidden bg-muted">
        <img src={a.image} alt="" loading="lazy" className="size-full object-cover group-hover:scale-105 transition duration-500" />
      </div>
      <span className="text-[10px] uppercase tracking-wider text-primary font-bold mt-2 inline-block">{a.category}</span>
      <h3 className={`font-serif font-bold leading-snug text-ink group-hover:text-primary mt-1 ${size === "sm" ? "text-sm" : "text-base"}`}>
        {a.title}
      </h3>
      {a.meta && <p className="text-[11px] text-muted-foreground mt-1">{a.meta}</p>}
    </Link>
  );
}

export function SectionHeader({ title, kicker }: { title: string; kicker?: string }) {
  return (
    <div className="flex items-end justify-between mb-4 border-b-2 border-ink pb-2">
      <h2 className="section-rule font-serif text-xl sm:text-2xl font-bold text-ink uppercase tracking-tight">
        {title}
      </h2>
      {kicker && <span className="text-xs text-muted-foreground">{kicker}</span>}
    </div>
  );
}
