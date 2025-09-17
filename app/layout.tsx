import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/ui/smooth-scroll-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Hafiz Agha Al-Baith — Portfolio",
    template: "%s — Hafiz Agha Al-Baith",
  },
  description:
    "Full‑stack developer & cybersecurity student. Python, JavaScript/TypeScript, Golang. Projects, experience, and contact.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Hafiz Agha Al-Baith — Portfolio",
    description:
      "Full‑stack developer & cybersecurity student. Python, JavaScript/TypeScript, Golang.",
    type: "website",
    url: "/",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "Hafiz Agha Al-Baith — Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hafiz Agha Al-Baith — Portfolio",
    description:
      "Full‑stack developer & cybersecurity student. Python, JavaScript/TypeScript, Golang.",
    images: ["/og.svg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
