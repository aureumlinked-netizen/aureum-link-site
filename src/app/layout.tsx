import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { DottedSurface } from "@/components/dotted-surface";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// The public address changes with the host (GitHub Pages → Cloudflare Pages → own
// domain), and it is baked into every Open Graph URL at build time. Keeping it in one
// env var means a move is a build setting, not a code edit.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://aureum-link.com/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AUREUM LINK | An idea: a verifiable treasury that starts with real gold",
  description:
    "I'm planning to buy 1 kg of gold with my own money before any token exists and build an open treasury of real assets around it. It's an idea — tell me if it's needed. Nothing is for sale.",
  openGraph: {
    title: "AUREUM LINK | An idea: a verifiable treasury that starts with real gold",
    description:
      "An idea under discussion: buy real gold first, publish every document, decide the next purchase together. No token exists, nothing is for sale.",
    type: "website",
    images: ["/logo-512.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        <div className="bg-aurora" aria-hidden="true" />
        <Providers>
          <DottedSurface className="opacity-65" />
          <div className="pointer-events-none fixed inset-0 z-[-5] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_26%),linear-gradient(180deg,rgba(4,5,11,0.2),rgba(4,5,11,0.92)_70%,rgba(4,5,11,1))]" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
