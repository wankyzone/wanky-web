import { WankyMark } from "@/components/WankyMark";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Wanky — Software for High-Stakes Operations",
  description:
    "We engineer internal tools, admin engines, and automated workflows for modern businesses.",
  icons: {
    icon: "/favicon.ico",
  },
};

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 group">
          <WankyMark size={28} />
          <span className="text-sm font-bold tracking-tighter uppercase group-hover:text-slate-600 transition-colors">
            Wanky
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { name: "Systems", href: "/systems" },
            { name: "Projects", href: "/projects" },
            { name: "Pricing", href: "/pricing" },
            { name: "Principles", href: "/principles" },
          ].map((item) => (
            <Link 
              key={item.name}
              href={item.href} 
              className="text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-black transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <Link
            className="rounded-full bg-black px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white transition-all hover:bg-zinc-800 active:scale-95"
            href="/contact"
          >
            Inquire
          </Link>
        </nav>

        {/* Mobile Contact Button only */}
        <Link
          className="md:hidden rounded-full bg-black px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white"
          href="/contact"
        >
          Talk to us
        </Link>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 opacity-50 grayscale">
            <WankyMark size={20} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Wanky Software</span>
          </div>
          
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <Link href="/systems" className="hover:text-black transition-colors">Systems</Link>
            <Link href="/projects" className="hover:text-black transition-colors">Portfolio</Link>
            <a href="mailto:hello@wankysoftware.com" className="hover:text-black transition-colors">Contact</a>
          </div>

          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
            © {new Date().getFullYear()} — Built for Operations
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased selection:bg-black selection:text-white`}>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}