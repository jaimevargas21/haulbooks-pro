import type { MetadataRoute } from "next";
import { posts } from "@/lib/blog";
import { site } from "@/lib/site";

const paths = [
  "",
  "/product",
  "/ifta",
  "/pricing",
  "/fuel-cards",
  "/for-accountants",
  "/blog",
  "/privacy",
  "/terms",
  "/refunds",
  "/subprocessors",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-21");
  return [
    ...paths.map((path) => ({
      url: `${site.url}${path}`,
      lastModified,
    })),
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
    })),
  ];
}
