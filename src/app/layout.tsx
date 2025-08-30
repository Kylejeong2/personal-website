import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kyle Jeong",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:," />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
          <header style={{ marginBottom: "0" }}>
            <nav className="nav-menu" style={{ marginBottom: "5px" }}>
              <Link href="/">Home</Link>
              <Link href="/blog">Blog</Link>
            </nav>
            <hr style={{ margin: "0 0 10px 0" }} />
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
