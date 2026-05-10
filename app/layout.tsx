import type { Metadata } from "next";
import { Fraunces, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const title = "Haichen Duan — Builder. Creator. AI-Native.";
const description =
  "Personal portfolio of Haichen Duan — Wirtschaftsinformatik @ TUM, building thoughtful things with AI.";

export const metadata: Metadata = {
  metadataBase: new URL("https://joanduan.dev"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://joanduan.dev",
    siteName: "Haichen Duan",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
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
      className={`${fraunces.variable} ${inter.variable} ${geistMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
