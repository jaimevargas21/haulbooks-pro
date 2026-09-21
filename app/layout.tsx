import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import { AdsTag } from "@/components/ads-tag";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { logoImage, shareImage } from "@/lib/brand";
import { signInLink } from "@/lib/checkout";
import { site } from "@/lib/site";
import "./globals.css";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "HaulBooks Pro — Trucking bookkeeping & IFTA prep",
    template: "%s · HaulBooks Pro",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "trucking bookkeeping",
    "IFTA prep",
    "owner operator accounting",
    "fuel receipt scanning",
    "small fleet bookkeeping",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: "HaulBooks Pro — Trucking bookkeeping & IFTA prep",
    description: site.description,
    ...(shareImage() ? { images: [{ url: shareImage()!, alt: "HaulBooks Pro" }] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "HaulBooks Pro — Trucking bookkeeping & IFTA prep",
    description: site.description,
    ...(shareImage() ? { images: [shareImage()!] } : {}),
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const signIn = signInLink();

  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="min-h-screen bg-navy-950 font-sans text-ink antialiased">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-amber-500 focus:px-4 focus:py-2 focus:text-navy-950"
        >
          Skip to content
        </a>
        <SiteHeader signInHref={signIn.href} logoSrc={logoImage()} />
        <main id="content">{children}</main>
        <SiteFooter />
        <AdsTag />
      </body>
    </html>
  );
}
