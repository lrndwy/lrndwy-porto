"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";

export function NavThemeToggle() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (enabled) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [enabled]);

  return (
    <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
      <Switch checked={enabled} onCheckedChange={setEnabled} aria-label="Toggle dark mode" />
    </div>
  );
}

export default NavThemeToggle;
