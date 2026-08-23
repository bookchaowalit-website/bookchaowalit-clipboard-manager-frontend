import type { Metadata } from "next";
import { Karla, Courier_Prime } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
});

const courier = Courier_Prime({
  variable: "--font-courier",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Local Dispatch — Clipboard archive",
  description: "Local-only clipboard history snippets stored in localStorage.",
  keywords: ["clipboard","history","snippets","localStorage"],
  authors: [{ name: "Bookchaowalit", url: "https://bookchaowalit.com" }],
  creator: "Bookchaowalit",
  publisher: "Bookchaowalit",
  metadataBase: new URL("https://clipboard-manager.bookchaowalit.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Local Dispatch — Clipboard archive",
    description: "Local-only clipboard history snippets stored in localStorage.",
    siteName: "Bookchaowalit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Local Dispatch — Clipboard archive",
    description: "Local-only clipboard history snippets stored in localStorage.",
    creator: "@bookchaowalit",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${karla.variable} ${courier.variable}`}>
        <Analytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
