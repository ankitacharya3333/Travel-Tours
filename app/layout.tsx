import type { Metadata } from "next";
import { Suspense } from "react";
import { Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-editorial",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://himalayantrails.com"),
  title: {
    default: "Himalayan Trails — Nepal Trekking, Expeditions & Cultural Journeys",
    template: "%s | Himalayan Trails Nepal",
  },
  description:
    "Authentic, responsibly guided trekking journeys and cultural expeditions across the Nepal Himalayas. Everest, Annapurna, Langtang, Mustang, and beyond.",
  keywords: [
    "Nepal trekking",
    "Himalayan Trails",
    "Everest Base Camp trek",
    "Annapurna Sanctuary",
    "Langtang Valley",
    "Responsible tourism Nepal",
    "Kathmandu cultural tours",
  ],
  authors: [{ name: "Himalayan Trails Nepal" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://himalayantrails.com",
    siteName: "Himalayan Trails",
    title: "Himalayan Trails — Nepal Trekking, Expeditions & Cultural Journeys",
    description:
      "Authentic, responsibly guided trekking journeys and cultural expeditions across the Nepal Himalayas.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakartaSans.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#fbf9f5] text-[#1c2621]">
        <Suspense fallback={<div className="h-16 bg-[#fbf9f5]" />}>
          <Header />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
