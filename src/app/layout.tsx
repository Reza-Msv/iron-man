import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Iron Man — Mark LXXXV | Engineered by Reza Msv",
  description:
    "Interactive Iron Man nanotech suit experience, Stark Industries armory, arc reactor telemetry, and technological innovations engineered by Reza Msv.",
  keywords: [
    "Iron Man",
    "Tony Stark",
    "Reza Msv",
    "Stark Industries",
    "Mark LXXXV",
    "Nanotech Armor",
    "Next.js",
  ],
  authors: [{ name: "Reza Msv" }],
  creator: "Reza Msv",
  openGraph: {
    title: "Iron Man — Mark LXXXV | Engineered by Reza Msv",
    description:
      "Interactive Iron Man nanotech suit experience, Stark Industries armory, and arc reactor telemetry.",
    siteName: "Stark Industries — Reza Msv",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full bg-background text-foreground grain">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
