import type { Metadata } from "next";

const shareAlt = "HaulBooks Pro — know your cost per mile and walk into IFTA ready";

/** Unique title, description, and canonical for a public route. */
export function pageMetadata({
  title,
  description,
  path,
  absolute = false,
  index = true,
}: {
  title: string;
  description: string;
  path: string;
  absolute?: boolean;
  index?: boolean;
}): Metadata {
  const fullTitle = absolute ? title : `${title} · HaulBooks Pro`;
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    robots: index ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      images: [{ url: "/images/og-share.png", width: 1280, height: 720, alt: shareAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/images/og-share.png"],
    },
  };
}
