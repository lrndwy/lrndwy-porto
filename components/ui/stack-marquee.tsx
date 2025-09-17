"use client";

import { useMemo } from "react";
import { StackIcon } from "@/components/shared/StackIcon";

type StackMarqueeProps = {
  items: string[];
  speed?: number; // lebih besar = lebih cepat (durasi lebih pendek)
};

export function StackMarquee({ items, speed = 70 }: StackMarqueeProps) {
  const base = useMemo(() => (items?.length ? items : []), [items]);
  // Gandakan 2x saja untuk loop mulus dan lebih ringan
  const content = useMemo(() => [...base, ...base], [base]);
  // Durasi proporsional terhadap jumlah item; lebih sedikit item → durasi lebih pendek
  const durationSec = Math.max(12, Math.round((content.length * 80) / speed));

  return (
    <div className="relative w-full overflow-hidden py-2">
      {/* gradient fade kiri/kanan */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />

      <div
        className="flex items-center gap-12 will-change-transform [animation-name:stack-marquee-scroll] [animation-timing-function:linear] [animation-iteration-count:infinite]"
        style={{ animationDuration: `${durationSec}s` }}
        aria-label="stack-marquee"
      >
        {content.map((name, idx) => (
          <div key={`${name}-${idx}`} className="shrink-0 px-2">
            <StackIcon name={name} />
          </div>
        ))}
        {/* spacer tambahan agar tidak tampak terlalu padat saat loop */}
        <div className="w-16 shrink-0" />
      </div>

      <style jsx>{`
        @keyframes stack-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          div[aria-label="stack-marquee"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
