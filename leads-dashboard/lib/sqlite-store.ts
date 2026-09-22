import "server-only";
import { PrismaClient } from "../generated/sqlite";
import { createPrismaStore } from "@/lib/prisma-store";
import type { Store } from "@/lib/types";

const globalSqlite = globalThis as unknown as { __haulbooksSqlite?: PrismaClient };

function client() {
  if (!globalSqlite.__haulbooksSqlite) {
    globalSqlite.__haulbooksSqlite = new PrismaClient();
  }
  return globalSqlite.__haulbooksSqlite;
}

export function createSqliteStore(): Store {
  return createPrismaStore(client(), "sqlite");
}
