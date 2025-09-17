"use client";

import { useEffect, type ReactNode } from "react";

// Smooth scrolling provider using the lightweight "smooth-scroll" library
// Falls back to native CSS smooth scrolling when the lib is unavailable
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    let destroy: (() => void) | undefined;
    (async () => {
      try {
        // dynamic import to avoid hard dependency during build
        const mod = await import("smooth-scroll");
        const SmoothScroll = mod.default || mod;
        const instance = new SmoothScroll('a[href*="#"]', {
          speed: 600,
          speedAsDuration: true,
          updateURL: false,
          clip: true,
          easing: "easeInOutCubic",
        });
        destroy = () => {
          try { instance.destroy(); } catch {}
        };
      } catch {
        // library not installed: rely on CSS scroll-behavior
      }
    })();
    return () => { destroy?.(); };
  }, []);

  return <>{children}</>;
}
