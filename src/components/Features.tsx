import { Zap, Shield, Globe, Infinity as InfinityIcon, Smartphone, Film } from "lucide-react";

const FEATURES = [
  { icon: Zap, title: "Lightning fast", desc: "Optimized servers convert videos in seconds, not minutes." },
  { icon: Shield, title: "Safe & private", desc: "No tracking, no logs. We never store your downloads." },
  { icon: InfinityIcon, title: "No limits", desc: "Download as many videos as you want, completely free." },
  { icon: Film, title: "Up to 8K quality", desc: "From 144p to crystal-clear 8K, including 60fps." },
  { icon: Smartphone, title: "Any device", desc: "Works on iPhone, Android, Windows, Mac, Linux — no app needed." },
  { icon: Globe, title: "All formats", desc: "MP4, MP3, WEBM, M4A — pick the format that fits you." },
];

export function Features() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3">
        Built to be the <span className="text-gradient-primary">best</span> on the web
      </h2>
      <p className="text-center text-muted-foreground max-w-xl mx-auto mb-12">
        Everything competitors charge for — free, faster, and without the ads burying the download button.
      </p>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {FEATURES.map((f, i) => (
          <div key={i} className="glass rounded-2xl p-6 hover:border-primary/40 transition">
            <f.icon className="size-7 text-accent mb-4" />
            <h3 className="font-bold mb-1">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
