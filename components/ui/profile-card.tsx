"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Clock, Plus, Copy, Zap } from "lucide-react";
import { contact } from "@/lib/content";

interface ComponentProps {
  name?: string;
  role?: string;
  email?: string;
  avatarSrc?: string;
  statusText?: string;
  statusColor?: string;
  glowText?: string;
  className?: string;
}

export default function Component({
  name = "Hafiz Agha",
  role = "Full‑Stack Developer",
  email = contact.email,
  avatarSrc = "https://images.unsplash.com/photo-1531123414780-f7423b6f52b9?q=80&w=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wyMDkyMnwwfDF8c2VhcmNofDF8fGdyZWVuJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzAwMDAwMDAw",
  statusText = "Available for work",
  statusColor = "bg-emerald-500",
  glowText = "Currently High on Creativity",
  className,
}: ComponentProps) {
  const [copied, setCopied] = useState(false);

  const timeText = useMemo(() => {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, "0");
    const hour12 = ((h + 11) % 12) + 1;
    const ampm = h >= 12 ? "PM" : "AM";
    return `${hour12}:${m}${ampm}`;
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const handleHireMe = () => {
    const phoneNumber = contact.phone.replace(/\s/g, '').replace('+', '');
    const message = encodeURIComponent(`Halo! Saya tertarik untuk berdiskusi tentang proyek yang bisa dikerjakan.`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn("relative w-xl", className)}
    >
      {/* Dark mode glow effect */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-10 top-[72%] rounded-[28px] bg-emerald-400/90 blur-0 shadow-[0_40px_80px_-16px_rgba(52,211,153,0.8)] z-0 dark:block hidden" />

      {/* Light mode subtle glow effect */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-10 top-[72%] rounded-[28px] bg-emerald-500/20 blur-sm shadow-[0_20px_40px_-8px_rgba(16,185,129,0.3)] z-0 dark:hidden block" />

      {/* Dark mode glow text */}
      <div className="absolute inset-x-0 -bottom-10 mx-auto w-full z-0 dark:block hidden">
        <div className="flex items-center justify-center gap-2 bg-transparent py-3 text-center text-sm font-medium text-black">
          <Zap className="h-4 w-4" /> {glowText}
        </div>
      </div>

      {/* Light mode glow text */}
      <div className="absolute inset-x-0 -bottom-10 mx-auto w-full z-0 dark:hidden block">
        <div className="flex items-center justify-center gap-2 bg-transparent py-3 text-center text-sm font-medium text-emerald-600">
          <Zap className="h-4 w-4" /> {glowText}
        </div>
      </div>

      <Card className="relative z-10 mx-auto w-full max-w-3xl overflow-visible rounded-[28px] border-0 bg-card text-card-foreground shadow-2xl dark:bg-[radial-gradient(120%_120%_at_30%_10%,#0b1510_0%,#0b1210_60%,#0b0b0c_100%)] dark:text-white">
        <CardContent className="p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className={cn("inline-block h-2.5 w-2.5 rounded-full animate-pulse", statusColor, "dark:bg-emerald-500 bg-emerald-600")} />
              <span className="select-none">{statusText}</span>
            </div>
            <div className="flex items-center gap-2 opacity-80">
              <Clock className="h-4 w-4" />
              <span className="tabular-nums">{timeText}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-border dark:ring-white/10">
              <Image
                src={avatarSrc}
                alt={`${name} avatar`}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-xl font-semibold tracking-tight sm:text-2xl">
                {name}
              </h3>
              <p className="mt-0.5 text-sm text-muted-foreground">{role}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Button
              variant="secondary"
              onClick={handleHireMe}
              className="h-12 justify-start gap-3 rounded-2xl bg-secondary/50 text-secondary-foreground hover:bg-secondary/70 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
            >
              <Plus className="h-4 w-4" /> Hire Me
            </Button>

            <Button
              variant="secondary"
              onClick={handleCopy}
              className="h-12 justify-start gap-3 rounded-2xl bg-secondary/50 text-secondary-foreground hover:bg-secondary/70 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
            >
              <Copy className="h-4 w-4" /> {copied ? "Copied" : "Copy Email"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
