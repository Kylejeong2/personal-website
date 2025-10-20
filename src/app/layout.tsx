import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Kyle Jeong",
    template: "%s | Kyle Jeong",
  },
  description: "Software engineer and builder. Working on browser infrastructure at Browserbase. Sharing thoughts on AI, startups, and building products.",
  keywords: ["Kyle Jeong", "software engineer", "developer", "AI", "startups", "tech", "Browserbase", "web development"],
  authors: [{ name: "Kyle Jeong" }],
  creator: "Kyle Jeong",
  publisher: "Kyle Jeong",
  metadataBase: new URL('https://kylejeong.com'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Kyle Jeong",
    title: "Kyle Jeong",
    description: "Engineer and builder. Working on browser infrastructure at Browserbase.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:," />
      </head>
      <body>
        <div className="main-container">
          <header style={{ margin: "0 auto", marginBottom: "0" }}>
            <nav className="nav-menu" style={{ marginBottom: "5px" }}>
              <Link href="/">Home</Link>
              <Link href="/blog">Blog</Link>
            </nav>
            <hr />
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
