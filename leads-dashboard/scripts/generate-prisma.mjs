import { execFileSync } from "node:child_process";
import path from "node:path";

const prisma = path.join("node_modules", ".bin", "prisma");

execFileSync(prisma, ["generate", "--schema=prisma/schema.prisma"], {
  stdio: "inherit",
});

execFileSync(prisma, ["generate", "--schema=prisma/schema.postgres.prisma"], {
  stdio: "inherit",
  env: {
    ...process.env,
    DATABASE_URL: "postgresql://user:pass@localhost:5432/haulbooks_leads",
  },
});
