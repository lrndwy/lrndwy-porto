"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import React from "react";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-blue-300" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 bg-muted/70 backdrop-blur-sm px-4 py-3 text-left transform-gpu origin-center transition-[transform,opacity,box-shadow] duration-300 ease-out will-change-transform after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] hover:border-white/20 hover:bg-muted [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
    >
      <div>
        <span className="relative inline-block rounded-full bg-blue-800 p-1">
          {icon}
        </span>
        <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-normal break-words text-left text-lg">{description}</p>
      <p className="text-left text-muted-foreground">{date}</p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const hoverTimerRef = React.useRef<number | null>(null);
  const defaultCards = [
    {
      className:
        "[grid-area:stack] before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className:
        "[grid-area:stack] translate-x-24 translate-y-16 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className: "[grid-area:stack] translate-x-48 translate-y-32",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="relative grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {displayCards.map((cardProps, index) => {
        const isFocused = hoveredIndex === index;
        const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

        const focusClasses = isFocused
          ? cn(
              // Straighten and lift above others with extra gap below
              "relative z-50 -translate-y-8 scale-[1.1] skew-y-0 drop-shadow-2xl cursor-default"
            )
          : "";

        const dimmedClasses = isDimmed ? "opacity-40 saturate-75 scale-[0.98]" : "";

        const onEnter = () => {
          if (hoverTimerRef.current) window.clearTimeout(hoverTimerRef.current);
          hoverTimerRef.current = window.setTimeout(() => setHoveredIndex(index), 60);
        };

        const onLeave = () => {
          if (hoverTimerRef.current) window.clearTimeout(hoverTimerRef.current);
          hoverTimerRef.current = window.setTimeout(() => {
            setHoveredIndex((prev) => (prev === index ? null : prev));
          }, 60);
        };

        return (
          <div
            key={index}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="contents"
          >
            <DisplayCard
              {...cardProps}
              className={cn(
                cardProps.className,
                // use easing to smooth transitions
                "ease-[cubic-bezier(0.22,1,0.36,1)]",
                focusClasses,
                dimmedClasses
              )}
            />
          </div>
        );
      })}
    </div>
  );
}
