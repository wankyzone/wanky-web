import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Wanky — Cloud-first internal systems",
  description:
    "Wanky builds internal systems and cloud software for modern businesses. Admin dashboards, internal tools, and automation systems.",
  icons: {
    icon: "/favicon.ico",
  },
};

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-wanky-border bg-wanky-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-wanky-pink shadow-sm" aria-hidden />
          <span className="text-sm font-semibold tracking-tight">Wanky</span>
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link className="text-wanky-muted hover:text-wanky-text" href="/systems">
            Systems
          </Link>
          <Link className="text-wanky-muted hover:text-wanky-text" href="/pricing">
            Pricing
          </Link>
          <Link className="text-wanky-muted hover:text-wanky-text" href="/principles">
            Principles
          </Link>
          <Link
            className="rounded-xl bg-white px-4 py-2 font-medium text-wanky-text shadow-sm ring-1 ring-wanky-border hover:shadow"
            href="/contact"
          >
            Talk to us
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-wanky-border">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-wanky-muted">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Wanky Cloud Ltd</p>
          <p>Built by Wanky</p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
