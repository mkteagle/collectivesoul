import type { Metadata } from "next";
import { Bebas_Neue, Space_Mono, Outfit } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  weight: ["300", "400", "600", "800"],
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Collective Soul | Touch and Go - 2026",
  description: "The official website of Collective Soul. New album 'Touch and Go' out now. Tour dates, music, merch, and more.",
  keywords: ["Collective Soul", "Touch and Go", "Rock Band", "2026 Tour", "Ed Roland"],
  openGraph: {
    title: "Collective Soul | Touch and Go",
    description: "New album 'Touch and Go' out now. Join the 2026 World Tour.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${bebasNeue.variable} ${spaceMono.variable} ${outfit.variable} font-sans antialiased bg-black text-white`}
      >
        {/* Halftone overlay effect */}
        <div className="halftone-overlay" />
        {children}
      </body>
    </html>
  );
}
