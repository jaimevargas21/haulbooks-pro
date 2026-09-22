import { execFileSync } from "node:child_process";
import path from "node:path";

const url = process.env.DATABASE_URL ?? "";
if (!url.startsWith("postgres://") && !url.startsWith("postgresql://")) {
  console.error("Set DATABASE_URL to a postgresql:// Neon connection string, then run this again.");
  process.exit(1);
}

const prisma = path.join("node_modules", ".bin", "prisma");
const env = { ...process.env, PRISMA_SEED_TARGET: "postgres", DEMO_MODE: "0" };

execFileSync(prisma, ["db", "push", "--schema=prisma/schema.postgres.prisma"], {
  stdio: "inherit",
  env,
});
execFileSync(prisma, ["db", "seed"], { stdio: "inherit", env });
