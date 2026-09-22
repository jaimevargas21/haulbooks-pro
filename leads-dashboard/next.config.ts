import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // This repo also has a lockfile at the marketing-site root. Trace files from
  // this app so a Vercel project with Root Directory `leads-dashboard` bundles it.
  outputFileTracingRoot: process.cwd(),
  serverExternalPackages: ["@prisma/client", "prisma"],
};

export default nextConfig;
