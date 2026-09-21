import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "IFTA checklists, trucking books, and cost per mile for owner-operators and small fleets.",
};

export default function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 sm:py-20">
      <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Blog</h1>
      <p className="mt-4 text-muted">
        Practical notes for owner-operators and small fleets. Not tax advice.
      </p>
      <ul className="mt-10 space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <article className="rounded-2xl border border-line bg-navy-900/50 p-6">
              <p className="text-xs text-muted">
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold">
                <Link href={`/blog/${post.slug}`} className="hover:text-amber-300">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{post.description}</p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
