import { Clipboard, MousePointerClick, Download } from "lucide-react";

const STEPS = [
  { icon: Clipboard, title: "Copy the link", desc: "Open YouTube and copy any video, Shorts, or playlist URL." },
  { icon: MousePointerClick, title: "Paste & pick format", desc: "Drop it in the box above and choose MP4, MP3, or 4K." },
  { icon: Download, title: "Download instantly", desc: "Your file is ready in seconds — straight to your device." },
];

export function HowItWorks() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
        Three steps. Zero friction.
      </h2>
      <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
        {STEPS.map((s, i) => (
          <div key={i} className="glass rounded-2xl p-6 relative">
            <div className="size-12 rounded-xl bg-gradient-primary grid place-items-center shadow-glow mb-4">
              <s.icon className="size-6 text-primary-foreground" />
            </div>
            <div className="absolute top-6 right-6 font-display text-5xl font-bold text-muted-foreground/20">
              0{i + 1}
            </div>
            <h3 className="font-bold text-lg mb-2">{s.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
