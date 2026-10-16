import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog — Wanky Technologies",
  description:
    "Engineering notes and company updates from Wanky Technologies.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <section className="border-b border-zinc-100">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D92D78]">
            Wanky Technologies
          </p>
          <h1 className="mt-5 text-5xl font-bold leading-tight tracking-tight sm:text-7xl">
            Notes from the work.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
            Engineering progress and product updates, shared with care about
            what is known, what is still underway, and what remains to be
            confirmed.
          </p>
        </div>
      </section>

      <section
        aria-label="Articles"
        className="mx-auto max-w-6xl px-6 py-14 sm:py-20"
      >
        <div className="divide-y divide-zinc-200">
          {blogPosts.map((post) => (
            <article key={post.slug} className="py-8 first:pt-0 last:pb-0">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                <span className="text-[#D92D78]">{post.category}</span>
                <span>{post.dateLabel}</span>
                <span>{post.status}</span>
              </div>
              <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight sm:text-3xl">
                <Link
                  href={`/blog/${post.slug}`}
                  className="transition hover:text-[#D92D78]"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-4 max-w-3xl leading-7 text-zinc-600">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold transition hover:text-[#D92D78]"
              >
                Read article <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}