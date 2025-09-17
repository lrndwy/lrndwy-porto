"use client";

import { Section } from "@/components/shared/Section";
import * as React from "react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { projects, experiences, education, stacks, profile, contact } from "@/lib/content";
import { NavThemeToggle } from "@/components/shared/NavThemeToggle";
import { GlowCard } from "@/components/ui/spotlight-card";
import { Timeline } from "@/components/ui/timeline";
import { SocialCard } from "@/components/ui/social-card";
import { ProjectCards } from "@/components/ui/animated-project-cards";
import { StackMarquee } from "@/components/ui/stack-marquee";
import { FolderProjectIcon } from "@/components/shared/FolderProjectIcon";
import CursorWanderCard from "@/components/ui/cursor-wander-card";
import ProfileCard from "@/components/ui/profile-card";
import FlipLinks from "@/components/ui/flip-links";
import { VelocityScroll } from "@/components/ui/scroll-based-velocity";
import TetrisLoading from "@/components/ui/tetris-loader";
import MenuBar from "@/components/ui/glow-menu";
import { Home as HomeIcon, Layers, Rocket, Briefcase, Trophy, GraduationCap, Phone } from "lucide-react";

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [overlayVisible, setOverlayVisible] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);
  React.useEffect(() => {
    if (!isLoading) {
      const h = setTimeout(() => setOverlayVisible(false), 550);
      return () => clearTimeout(h);
    } else {
      setOverlayVisible(true);
    }
  }, [isLoading]);
  return (
    <div className="min-h-screen px-6 py-16 md:px-8">
      {overlayVisible ? (
        <div className={`fixed inset-0 z-50 grid place-items-center bg-background transition-opacity duration-500 ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center transition-transform duration-500 ease-out will-change-transform">
            <TetrisLoading size="lg" speed="normal" />
          </div>
        </div>
      ) : null}
      <div className={`mx-auto w-full max-w-3xl text-center space-y-20 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <header className="flex items-center justify-between">
          <div />
          <NavThemeToggle />
        </header>

        <Section id="hero" className="space-y-6">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="text-left space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                {profile.name}
              </h1>
              <p className="text-emerald-300/90 text-lg">
                {profile.title}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {profile.summary}
              </p>
              <div className="flex items-center gap-3">
                <a href="/cv.pdf" download="Hafiz_Agha_CV.pdf">
                  <RainbowButton className="rounded-md">Download CV</RainbowButton>
                </a>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <CursorWanderCard className="max-w-full" width={380} height={240} cardholderName="HAFIZ AGHA" avatarSrc="/hafiz.jpeg" />
            </div>
          </div>
        </Section>

        <Section id="stack" className="space-y-6">
          <StackMarquee items={stacks} speed={70} />
        </Section>


        <Section id="projects" className="space-y-6">
          <h2 className="text-4xl font-semibold text-left">Proyek Terbaru</h2>
          <ProjectCards
            projects={projects.slice(0, 3).map((p, i) => ({
              id: `${i}`,
              title: p.title,
              pricePerHour: "",
              status: "Paid",
              categories: p.tags ?? [],
              description: p.description,
              location: p.githubUrl ?? p.link ?? "https://github.com/",
              timeAgo: i === 0 ? "2h ago" : i === 1 ? "5h ago" : "1d ago",
              // Ikon monokrom adaptif (tanpa latar berwarna)
              logoColor: "bg-transparent border border-border",
              logoIcon: (
                <FolderProjectIcon className="w-5 h-5 text-foreground" />
              ),
            }))}
          />
        </Section>

        <Section id="experience" className="space-y-2">
          <h2 className="text-4xl font-semibold text-left">Pengalaman</h2>
          <div className="w-full">
            <Timeline
              data={experiences.map((e) => ({
                title: e.period,
                content: (
                  <div className="space-y-2 w-full max-w-4xl">
                    <h3 className="text-lg font-semibold text-foreground">{e.role}</h3>
                    <p className="text-sm font-medium text-muted-foreground">{e.company}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{e.summary}</p>
                  </div>
                )
              }))}
            />
          </div>
        </Section>

        <Section id="velocity" className="space-y-0">
          <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">

              <VelocityScroll
                text="HAFIZ AGHA · FULL‑STACK · CYBERSECURITY · HAFIZ AGHA · FULL‑STACK · CYBERSECURITY"
                default_velocity={2}
                className="font-display text-center text-4xl md:text-8xl font-bold tracking-[-0.02em] text-foreground/90"
              />

          </div>
        </Section>

        <Section id="achievements" className="space-y-6">
          <h2 className="text-4xl font-semibold text-left">Lomba & Prestasi</h2>
          <div className="grid sm:grid-cols-3 gap-4 items-stretch">
            <GlowCard glowColor="green" customSize className="text-left h-full">
              <div className="space-y-2">
                <h3 className="text-base font-semibold">Cyber Hunt 2024 — CYBER SPECTERS</h3>
                <p className="text-sm text-muted-foreground">Menyelesaikan tantangan forensik dan eksploitasi secara cepat dan akurat; menonjolkan ketelitian analisis keamanan.</p>
              </div>
            </GlowCard>
            <GlowCard glowColor="blue" customSize className="text-left h-full">
              <div className="space-y-2">
                <h3 className="text-base font-semibold">Garuda Hacks 4.0 — Universitas Tarumanegara</h3>
                <p className="text-sm text-muted-foreground">Hackathon: membangun prototipe solusi web dalam waktu singkat lewat kolaborasi tim dan eksekusi cepat.</p>
              </div>
            </GlowCard>
            <GlowCard glowColor="purple" customSize className="text-left h-full">
              <div className="space-y-2">
                <h3 className="text-base font-semibold">LKS CTF — SMK 22 Jakarta Timur</h3>
                <p className="text-sm text-muted-foreground">Kompetisi Capture The Flag: fokus enumerasi, reversing, dan web exploitation untuk menyelesaikan challenge.</p>
              </div>
            </GlowCard>
          </div>
        </Section>

        <Section id="education" className="space-y-6">
          <h2 className="text-4xl font-semibold text-left">Pendidikan</h2>
          <div className="w-full">
            <SocialCard
              author={{
                name: profile.name,
                username: (new URL((contact.website ?? "https://hexanest.id"))).hostname.replace("www.", ""),
                avatar: "/hafiz.jpeg",
                timeAgo: "recent",
              }}
              content={{
                text: education
                  .map((ed) => `${ed.school} — ${ed.program} (${ed.period})`)
                  .join("\n"),
              }}
              engagement={{ likes: 24, comments: 3, shares: 2, isLiked: false, isBookmarked: false }}
              onLike={() => {}}
              onComment={() => {}}
              onShare={() => {}}
              onBookmark={() => {}}
              onMore={() => {}}
              className="text-left"
            />
          </div>
        </Section>

        <Section id="profile-card" className="space-y-6">
          <ProfileCard className="w-full" avatarSrc="/hafiz.jpeg" />
        </Section>


        <footer className="mt-20">
          <FlipLinks />
        </footer>
      </div>
      {/* Floating Glow Menu Navigation */}
      <div className="fixed bottom-3 left-1/2 z-40 -translate-x-1/2 w-full max-w-4xl px-3">
        <MenuBar
          items={[
            { icon: HomeIcon, label: 'Home', href: '#hero', gradient: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)', iconColor: 'text-blue-500' },
            { icon: Layers, label: 'Stack', href: '#stack', gradient: 'radial-gradient(circle, rgba(45,212,191,0.15) 0%, rgba(16,185,129,0.06) 50%, rgba(13,148,136,0) 100%)', iconColor: 'text-teal-500' },
            { icon: Rocket, label: 'Projects', href: '#projects', gradient: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(99,102,241,0.06) 50%, rgba(29,78,216,0) 100%)', iconColor: 'text-indigo-500' },
            { icon: Briefcase, label: 'Experience', href: '#experience', gradient: 'radial-gradient(circle, rgba(234,179,8,0.15) 0%, rgba(245,158,11,0.06) 50%, rgba(202,138,4,0) 100%)', iconColor: 'text-yellow-500' },
            { icon: Trophy, label: 'Awards', href: '#achievements', gradient: 'radial-gradient(circle, rgba(250,204,21,0.15) 0%, rgba(245,158,11,0.06) 50%, rgba(202,138,4,0) 100%)', iconColor: 'text-amber-500' },
            { icon: GraduationCap, label: 'Education', href: '#education', gradient: 'radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)', iconColor: 'text-green-500' },
            { icon: Phone, label: 'Contact', href: '#contact', gradient: 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, rgba(219,39,119,0.06) 50%, rgba(190,24,93,0) 100%)', iconColor: 'text-pink-500' },
          ]}
          className="mx-auto w-fit"
        />
      </div>
    </div>
  );
}
