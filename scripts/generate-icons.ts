/*
  Script: generate static SVG icons from simple-icons into public/icons
  Usage: npx ts-node scripts/generate-icons.ts
*/

import { promises as fs } from "fs";
import path from "path";
import * as si from "simple-icons";

const OUTPUT_DIR = path.join(process.cwd(), "public", "icons");

const names = [
  "python",
  "javascript",
  "typescript",
  "nodedotjs",
  "react",
  "docker",
  "supabase",
  "git",
  "linux",
  "go",
];

function getIcon(slug: string) {
  const exportName = ("si" + slug.charAt(0).toUpperCase() + slug.slice(1)) as keyof typeof si;
  return si[exportName] as unknown as { path: string; hex: string; title: string } | undefined;
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  for (const slug of names) {
    const icon = getIcon(slug);
    if (!icon) continue;
    const svg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="#${icon.hex}"><title>${icon.title}</title><path d="${icon.path}"/></svg>\n`;
    await fs.writeFile(path.join(OUTPUT_DIR, `${slug}.svg`), svg, "utf8");
  }
  console.log(`Saved icons to ${OUTPUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
