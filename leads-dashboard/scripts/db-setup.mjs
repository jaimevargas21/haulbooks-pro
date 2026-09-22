import { execFileSync } from "node:child_process";
import path from "node:path";

const prisma = path.join("node_modules", ".bin", "prisma");
const env = { ...process.env, PRISMA_SEED_TARGET: "sqlite", DEMO_MODE: "0" };

execFileSync(prisma, ["db", "push", "--schema=prisma/schema.prisma", "--skip-generate"], {
  stdio: "inherit",
  env,
});
execFileSync(prisma, ["db", "seed"], { stdio: "inherit", env });
