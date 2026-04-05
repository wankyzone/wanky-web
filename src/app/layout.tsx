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
            { name: "Platform", href: "/platform" },
            { name: "Infrastructure", href: "/systems" },
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
          Talk
        </Link>
      </div>
    </header>
  );
}

function Footer() {
  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "OS Platform", href: "/platform" },
        { name: "ERS Engine", href: "/platform" },
        { name: "Infrastructure", href: "/systems" },
        { name: "Plans", href: "/pricing" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "Principles", href: "/principles" },
        { name: "Roadmap", href: "/platform" },
        { name: "Brand Assets", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#" },
        { name: "GitHub Library", href: "https://github.com/your-username" }, // REPLACE
        { name: "Audit Guide", href: "#" },
      ],
    },
  ];

  return (
    <footer className="mt-40 border-t border-slate-100 bg-slate-50/50">
      <div className="mx-auto max-w-6xl px-6 py-20 grid grid-cols-2 md:grid-cols-5 gap-12">
        
        {/* Logo & Callout */}
        <div className="col-span-2 md:col-span-2 pr-10">
            <Link href="/" className="flex items-center gap-2 group mb-6">
                <WankyMark size={24} />
                <span className="text-sm font-bold tracking-tighter uppercase">Wanky</span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-500 mb-8 max-w-xs">
                Engineering the infrastructure for businesses that operate in the high-stakes physical world. Lagos // Global.
            </p>
        </div>

        {/* Directory Links */}
        {footerSections.map(section => (
            <div key={section.title}>
                <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">{section.title}</h5>
                <ul className="space-y-4">
                    {section.links.map(link => (
                        <li key={link.name}>
                            <Link href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} className="text-sm text-slate-600 hover:text-black transition-colors">
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        ))}
      </div>

      {/* Legal Bar */}
      <div className="border-t border-slate-100 bg-white">
          <div className="mx-auto max-w-6xl px-6 py-6 text-center text-[10px] font-medium tracking-wide text-slate-400">
             © {new Date().getFullYear()} Wanky Software. all rights reserved.
          </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased selection:bg-[#FF4D94] selection:text-white`}>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}