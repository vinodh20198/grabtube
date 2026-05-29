import { useEffect } from "react";

interface Props {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
}

// Replace this with your AdSense publisher ID after approval.
export const ADSENSE_CLIENT = "ca-pub-XXXXXXXXXXXXXXXX";

export function AdSlot({ slot, format = "auto", className }: Props) {
  useEffect(() => {
    try {
      // @ts-expect-error adsbygoogle injected by AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* noop in dev */
    }
  }, []);

  return (
    <div className={`my-8 mx-auto w-full max-w-3xl text-center ${className ?? ""}`}>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
        Advertisement
      </p>
      <ins
        className="adsbygoogle block"
        style={{ display: "block", minHeight: 90 }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
