import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink, TrialNote } from "@/components/ui";
import { getPost, posts } from "@/lib/blog";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Blog" };
  return { title: post.title, description: post.description };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-14 sm:px-6 sm:py-20">
      <p className="text-sm">
        <Link href="/blog" className="text-amber-300 underline">
          Blog
        </Link>
      </p>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight">{post.title}</h1>
      <p className="mt-3 text-sm text-muted">
        {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      </p>
      <div className="mt-8 space-y-8">
        {post.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-display text-2xl font-bold">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-3 text-sm leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
      <p className="mt-8 text-xs leading-relaxed text-muted">{site.notAdvice}</p>
      <p className="mt-4 text-sm text-muted">
        Related:{" "}
        {post.related.map((link, index) => (
          <span key={link.href}>
            {index > 0 ? " · " : null}
            <Link href={link.href} className="text-amber-300 underline">
              {link.label}
            </Link>
          </span>
        ))}
      </p>
      <div className="mt-10 rounded-3xl border border-amber-400/40 bg-navy-900 p-6">
        <h2 className="font-display text-2xl font-bold">Put the next quarter in the app</h2>
        <p className="mt-2 text-sm text-muted">Seven days free. Card required. Cancel before day 8.</p>
        <div className="mt-5">
          <ButtonLink href="/signup">Start free trial</ButtonLink>
        </div>
        <TrialNote className="mt-3" />
      </div>
    </article>
  );
}
