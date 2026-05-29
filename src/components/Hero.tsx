import { Downloader } from "./Downloader";

interface Props {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle: string;
  defaultFormat?: "mp4" | "mp3" | "4k" | "shorts";
}

export function Hero({ eyebrow = "Free YouTube Downloader", title, subtitle, defaultFormat }: Props) {
  return (
    <section className="container mx-auto px-4 pt-16 pb-12 sm:pt-24 sm:pb-16 text-center">
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium text-accent mb-6">
        <span className="size-1.5 rounded-full bg-accent animate-pulse" /> {eyebrow}
      </span>
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-[1.05]">
        {title}
      </h1>
      <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
      <div className="mt-10">
        <Downloader defaultFormat={defaultFormat} />
      </div>
    </section>
  );
}
