import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { blogPosts, getBlogPost } from "@/lib/blog-posts";

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: "Article not found — Wanky Technologies" };
  }

  return {
    title: post.seoTitle ?? `${post.title} — Wanky Technologies`,
    description: post.excerpt,
    authors: [{ name: post.author }],
    ...(post.socialSharingTitle && {
      openGraph: {
        title: post.socialSharingTitle,
        description: post.socialSharingDescription ?? post.excerpt,
        type: "article" as const,
        ...(post.heroImage && {
          images: [
            {
              url: post.heroImage.src,
              alt: post.heroImage.alt,
            },
          ],
        }),
      },
      twitter: {
        card: post.heroImage ? ("summary_large_image" as const) : ("summary" as const),
        title: post.socialSharingTitle,
        description: post.socialSharingDescription ?? post.excerpt,
        ...(post.heroImage && {
          images: [
            {
              url: post.heroImage.src,
              alt: post.heroImage.alt,
            },
          ],
        }),
      },
    }),
  };
}

export default async function BlogArticlePage({
  params,
}: BlogArticlePageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <article className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 transition hover:text-black"
        >
          <ArrowLeft size={16} /> Back to the blog
        </Link>

        <header className="mt-12 border-b border-zinc-200 pb-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            <span className="text-[#D92D78]">{post.category}</span>
            <span>{post.status}</span>
          </div>
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-zinc-600">{post.excerpt}</p>
          <dl className="mt-7 grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-zinc-500">Publication date</dt>
              <dd className="mt-1">{post.dateLabel}</dd>
            </div>
            <div>
              <dt className="font-semibold text-zinc-500">Author</dt>
              <dd className="mt-1">{post.author}</dd>
            </div>
            {post.updateNumber && (
              <div>
                <dt className="font-semibold text-zinc-500">Weekly update number</dt>
                <dd className="mt-1">{post.updateNumber}</dd>
              </div>
            )}
          </dl>
        </header>

        {post.heroImage && (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl bg-zinc-100">
            <Image
              src={post.heroImage.src}
              alt={post.heroImage.alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}

        {post.intro && (
          <div className="mt-8 space-y-4 leading-8 text-zinc-700">
            {post.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        )}

        <div className="divide-y divide-zinc-100">
          {post.sections.map((section) => (
            <section key={section.heading} className="py-8 first:pt-8">
              <h2 className="text-2xl font-bold tracking-tight">
                {section.heading}
              </h2>
              {section.paragraphs.length > 0 && (
                <div className="mt-4 space-y-4 leading-8 text-zinc-700">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              )}
              {section.bullets && (
                <ul className="mt-5 list-disc space-y-2 pl-5 leading-7 text-zinc-700">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
              {section.links && (
                <ul className="mt-5 list-disc space-y-2 pl-5 leading-7 text-zinc-700">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <strong>{link.label}</strong> {link.description}:{" "}
                      <a
                        href={link.href}
                        className="text-[#D92D78] underline underline-offset-4"
                      >
                        {link.href}
                      </a>{" "}
                      {link.note}
                    </li>
                  ))}
                </ul>
              )}
              {section.closingStatement && (
                <p className="mt-5 font-bold leading-8 text-zinc-950">
                  {section.closingStatement}
                </p>
              )}
            </section>
          ))}
        </div>

        <footer className="mt-8 border-t border-zinc-200 pt-6">
          <Link
            href="/blog"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold transition hover:text-[#D92D78]"
          >
            <ArrowLeft size={16} /> All articles
          </Link>
        </footer>
      </article>
    </main>
  );
}