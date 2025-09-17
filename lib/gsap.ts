"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

let pluginsRegistered = false;

export function registerGsapPlugins(): void {
  if (typeof window === "undefined") return;
  if (!pluginsRegistered) {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    pluginsRegistered = true;
  }
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger, ScrollToPlugin };
