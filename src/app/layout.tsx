import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import Script from "next/script";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CursorProvider from "@/components/CursorProvider";
import NoiseOverlay from "@/components/NoiseOverlay";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Life Line - Jerun Kingston",
  description: "An animated portfolio showcasing the professional journey of Jerun Kingston through interactive storytelling and advanced web animations.",
  keywords: ["portfolio", "web developer", "animation", "GSAP", "Next.js", "Jerun Kingston"],
  authors: [{ name: "Jerun Kingston" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.ico", sizes: "16x16" },
    ],
    apple: [
      { url: "/favicon.ico", sizes: "180x180" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/favicon.ico",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TRPJXQE609"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TRPJXQE609');
          `}
        </Script>
      </head>
      <body className="antialiased">
        <SmoothScrollProvider>
          <CursorProvider />
          <NoiseOverlay />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
