import type { Metadata, Viewport } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
