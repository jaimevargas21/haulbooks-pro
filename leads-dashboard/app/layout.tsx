import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Leads & support",
    template: "%s · HaulBooks Leads",
  },
  description: "Private leads and support dashboard for HaulBooks Pro.",
  robots: { index: false, follow: false },
  applicationName: "HaulBooks Leads",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sans.variable} antialiased`}>{children}</body>
    </html>
  );
}
