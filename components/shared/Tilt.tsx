"use client";

import { useRef } from "react";

type TiltProps = {
  children: React.ReactNode;
  intensity?: number; // 0-1
  className?: string;
};

export function Tilt({ children, intensity = 0.12, className }: TiltProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `rotateX(${(-py * 10) * intensity}deg) rotateY(${(px * 10) * intensity}deg) translateZ(0)`;
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "rotateX(0deg) rotateY(0deg)";
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: "transform 200ms ease" }}
    >
      {children}
    </div>
  );
}

export default Tilt;
