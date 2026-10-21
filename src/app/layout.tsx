import { WankyMark } from "@/components/WankyMark";
import NewsletterSignup from "@/components/NewsletterSignup";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://wanky-web.vercel.app"),
  title: "Wanky Technologies — Software, Products & Infrastructure",
  description: "Wanky Technologies builds software products, operational systems, and infrastructure.",
  icons: {
    icon: "/favicon.ico", // Ensure you've uploaded the favicon.io assets
  },
};

// --- NAVIGATION COMPONENT ---
function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 group">
          <WankyMark size={28} />
          <span className="text-sm font-bold tracking-tighter uppercase group-hover:text-[#FF4D94] transition-colors">
            Wanky
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/platform" className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-black transition-colors">
            Platform
          </Link>
          <div className="group relative">
            <button type="button" className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-black transition-colors" aria-haspopup="true">
              Solutions <span aria-hidden="true" className="text-[10px]">⌄</span>
            </button>
            <div className="invisible absolute left-0 top-full z-50 w-60 translate-y-2 pt-3 opacity-0 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <div className="rounded-2xl border border-slate-100 bg-white p-2 shadow-xl">
                <Link href="/ai" className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#D92D78]">Wanky AI</Link>
                <Link href="/contact" className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#D92D78]">Wanky Protect</Link>
                <Link href="/contact" className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#D92D78]">Software &amp; Engineering</Link>
              </div>
            </div>
          </div>
          <Link href="/systems" className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-black transition-colors">
            Infrastructure
          </Link>
          <Link href="/blog" className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-black transition-colors">
            Blog
          </Link>
          <Link className="rounded-full bg-black px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white transition-all hover:bg-[#FF4D94] active:scale-95 shadow-lg shadow-black/5" href="/get-started">
            Get Started
          </Link>
        </nav>

        {/* Compact mobile navigation */}
        <div className="md:hidden flex items-center gap-3">
          <Link href="/platform" className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Platform</Link>
          <Link href="/blog" className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Blog</Link>
          <Link className="rounded-full bg-black px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white" href="/get-started">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

// --- FOOTER COMPONENT ---
function Footer() {
  const socials = [
  { icon: <FaTwitter size={18} />, href: "https://x.com/Wanky328178", label: "X" },
  { icon: <MessageCircle size={18} />, href: "https://threads.com/@founder.wanky", label: "Threads" },
  { icon: <FaFacebook size={18} />, href: "https://facebook.com/isaacessoh.dev", label: "Facebook" },
  { icon: <FaInstagram size={18} />, href: "https://instagram.com/founder.wanky", label: "Instagram" },
  { icon: <FaGithub size={18} />, href: "https://github.com/wankyzone", label: "GitHub" },
];

  const sections = [
    {
      title: "Product",
      links: [
        { name: "OS Platform", href: "/platform" },
        { name: "Wanky Classroom", href: "/classroom" },
        { name: "ERS Engine", href: "/platform" },
        { name: "Infrastructure", href: "/systems" },
        { name: "Pricing Plans", href: "/pricing" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "Wanky AI", href: "/ai" },
        { name: "Principles", href: "/principles" },
        { name: "Roadmap", href: "/platform" },
        { name: "Get Started", href: "/get-started" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "/blog" },
        { name: "Get Started", href: "/get-started" },
        { name: "GitHub Library", href: "https://github.com/wankyzone" },
        { name: "Pricing", href: "/pricing" },
      ],
    },
  ];

  return (
    <footer className="mt-40 border-t border-slate-100 bg-slate-50/50">
      <NewsletterSignup />
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 lg:gap-20">
          
          {/* Brand Info & Social Icons */}
          <div className="col-span-2 pr-10">
            <Link href="/" className="flex items-center gap-2 group mb-6">
              <WankyMark size={24} />
              <span className="text-sm font-bold tracking-tighter uppercase">Wanky</span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-500 mb-8 max-w-xs">
              Building software products, operational systems, and infrastructure. Lagos, Nigeria.
            </p>
            
            <div className="flex gap-5 text-slate-400">
              {socials.map((social) => (
                <a 
                  key={social.label} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#FF4D94] transition-colors duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* SaaS Directory Columns */}
          {sections.map((section) => (
            <div key={section.title}>
              <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">
                {section.title}
              </h5>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-slate-600 hover:text-black transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-medium tracking-wide text-slate-400 uppercase">
          <span>© {new Date().getFullYear()} Wanky Technologies. All rights reserved.</span>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-black transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-black transition-colors">Terms</Link>
            <Link href="#" className="hover:text-black transition-colors">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- ROOT LAYOUT ---
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