import "server-only";
import { PrismaClient } from "../generated/postgres";
import { createPrismaStore } from "@/lib/prisma-store";
import type { Store } from "@/lib/types";

const globalPostgres = globalThis as unknown as { __haulbooksPostgres?: PrismaClient };

function client() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set.");
  if (!globalPostgres.__haulbooksPostgres) {
    globalPostgres.__haulbooksPostgres = new PrismaClient({
      datasources: { db: { url } },
    });
  }
  return globalPostgres.__haulbooksPostgres;
}

export function createPostgresStore(): Store {
  return createPrismaStore(client() as unknown as Parameters<typeof createPrismaStore>[0], "postgres");
}
