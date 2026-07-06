import type { Metadata } from "next";
import { Orbitron, Space_Grotesk } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "TailCheck",
  description: "Aircraft tracking dashboard"
};

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body"
});

const displayFont = Orbitron({
  subsets: ["latin"],
  variable: "--font-display"
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}