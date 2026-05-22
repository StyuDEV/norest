import type { Metadata } from "next";
import {
  Geist,
  Instrument_Serif,
} from "next/font/google";
import { Anton, Manrope, Caveat, Bodoni_Moda } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: "700",
});

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni-moda",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "NOREST",
  description:
    "Paris Est, vingtième arrondissement. Deux gamins, deux trajectoires, la même faim. L'histoire de NOREST.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${instrumentSerif.variable} ${anton.variable} ${manrope.variable} ${caveat.variable} ${bodoniModa.variable} h-full antialiased`}
    >
      <head>
        <meta name="theme-color" content="#1a1410" />
      </head>
      <body>{children}</body>
    </html>
  );
}
