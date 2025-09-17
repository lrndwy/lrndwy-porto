import { memo, useMemo } from "react";
import * as si from "simple-icons";

type StackIconProps = {
  name: string;
};

const cache = new Map<string, { path: string; title: string } | null>();

function resolveIcon(slug: string) {
  if (cache.has(slug)) return cache.get(slug)!;
  const exportName = ("si" + slug.charAt(0).toUpperCase() + slug.slice(1)) as keyof typeof si;
  const icon = si[exportName] as unknown as { path: string; title: string } | undefined;
  const data = icon ? { path: icon.path, title: icon.title } : null;
  cache.set(slug, data);
  return data;
}

function Icon({ name, title }: { name: string; title: string }) {
  const aliases: Record<string, string> = {
    "node.js": "nodedotjs",
    nodejs: "nodedotjs",
    golang: "go",
    js: "javascript",
    ts: "typescript",
  };

  const raw = name.toLowerCase().trim();
  const slug = aliases[raw] ?? raw.replace(/\s+/g, "").replace(/\./g, "dot");
  const data = resolveIcon(slug);
  if (!data) {
    return (
      <svg width={28} height={28} viewBox="0 0 24 24" aria-hidden className="text-foreground">
        <circle cx="12" cy="12" r="10" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg
      width={28}
      height={28}
      viewBox="0 0 24 24"
      role="img"
      aria-label={data.title}
      xmlns="http://www.w3.org/2000/svg"
      className="text-foreground"
    >
      <path d={data.path} fill="currentColor" />
    </svg>
  );
}

export const StackIcon = memo(function StackIcon({ name }: StackIconProps) {
  const key = useMemo(() => name.toLowerCase().trim(), [name]);
  return (
    <div className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-border/50">
      <Icon name={key} title={name} />
    </div>
  );
});

export default StackIcon;
