import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PokeDex - Flight",
  description: "A simple PokeDex app built with Next.js and TypeScript",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  themeColor: "#ffffff",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
  },
  twitter: {
    card: "summary_large_image",
    title: "PokeDex - Flight",
    description: "A simple PokeDex app built with Next.js and TypeScript",
    images: [
      {
        url: "https://pokeapi.co/static/pokeapi_256.3b2e1d4.png",
        alt: "PokeDex - Flight",
      },
    ],
  },
  openGraph: {
    title: "PokeDex - Flight",
    description: "A simple PokeDex app built with Next.js and TypeScript",
    siteName: "PokeDex - Flight",
    images: [
      {
        url: "https://pokeapi.co/static/pokeapi_256.3b2e1d4.png",
        alt: "PokeDex - Flight",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-white`}
      >
        {children}
      </body>
    </html>
  );
}
