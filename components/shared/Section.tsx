"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsapPlugins, prefersReducedMotion } from "@/lib/gsap";

type SectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
  y?: number;
  opacity?: number;
  parallax?: boolean;
};

export function Section({ id, className, children, y = 24, opacity = 0, parallax = true }: SectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    registerGsapPlugins();
    if (prefersReducedMotion()) return;
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const items = Array.from(element.children);
      gsap.fromTo(
        items.length ? items : element,
        { y, opacity },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          stagger: items.length ? 0.08 : 0,
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            once: true,
          } as ScrollTrigger.Vars,
        }
      );

      if (parallax) {
        gsap.to(element, {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          } as ScrollTrigger.Vars,
        });
      }
    }, element);

    return () => ctx.revert();
  }, [y, opacity, parallax]);

  return (
    <section id={id} ref={ref} className={className}>
      {children}
    </section>
  );
}

export default Section;
