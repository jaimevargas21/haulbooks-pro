import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/sign-in", destination: "/signin", permanent: true },
      { source: "/support", destination: "/contact", permanent: true },
      { source: "/start", destination: "/signup", permanent: false },
    ];
  },
};

export default nextConfig;
