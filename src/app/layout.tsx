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
  keywords: ["Collective Soul", "Touch and Go", "Rock Band", "2026 Tour", "Ed Roland", "Here To Eternity", "Shine", "December", "The World I Know"],
  authors: [{ name: "Collective Soul" }],
  creator: "Collective Soul",
  publisher: "Collective Soul",
  metadataBase: new URL("https://collectivesoul.com"),
  openGraph: {
    title: "Collective Soul | Touch and Go - 2026",
    description: "New album 'Touch and Go' out now. Join the 2026 World Tour. Ed Roland, Dean Roland, Will Turpin, Jesse Triplett, and Johnny Rabb.",
    type: "website",
    siteName: "Collective Soul",
    locale: "en_US",
    images: [
      {
        url: "/promo/touch-and-go.png",
        width: 1200,
        height: 1200,
        alt: "Collective Soul - Touch and Go Album Art",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Collective Soul | Touch and Go - 2026",
    description: "New album 'Touch and Go' out now. Join the 2026 World Tour.",
    images: ["/promo/touch-and-go.png"],
    creator: "@collectivesoul",
    site: "@collectivesoul",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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
