import type { Metadata } from "next";
import "./globals.css";
import { Open_Sans } from "next/font/google"; // Import Open Sans font

// Configure the Open Sans font
const openSans = Open_Sans({
  subsets: ["latin"], // Specify the subset
  weight: ["400", "600", "700"], // Specify the font weights you need
  display: "swap", // Use "swap" for better performance
});

export const metadata: Metadata = {
  title: "PokeDex - Flight",
  description: "A simple PokeDex app built with Next.js and TypeScript",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
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
        className={`antialiased bg-white ${openSans.className} tracking-[-0.02em]`}
      >
        {children}
      </body>
    </html>
  );
}
