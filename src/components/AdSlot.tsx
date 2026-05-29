import { useEffect, useState } from "react";

interface Props {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
  label?: string;
  minHeight?: number;
}

export const ADSENSE_CLIENT = "ca-pub-XXXXXXXXXXXXXXXX";

export function AdSlot({ slot, format = "auto", className, label = "Advertisement", minHeight = 100 }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    try {
      // @ts-expect-error adsbygoogle injected by AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch { /* noop */ }
  }, []);

  return (
    <div className={`ad-frame my-6 mx-auto w-full max-w-3xl text-center p-2 ${className ?? ""}`}>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
      {mounted ? (
        <ins
          className="adsbygoogle block"
          style={{ display: "block", minHeight }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : (
        <div style={{ minHeight }} className="grid place-items-center text-xs text-muted-foreground">
          Ad space
        </div>
      )}
    </div>
  );
}
