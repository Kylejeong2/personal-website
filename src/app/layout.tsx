import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

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
