import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const paths = ["", "/pricing", "/fuel-cards", "/privacy", "/terms", "/refunds", "/subprocessors", "/support"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-21");
  return paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified,
  }));
}
