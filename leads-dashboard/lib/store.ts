import "server-only";
import { sharedMemoryStore } from "@/lib/memory-store";
import type { Store, StoreKind } from "@/lib/types";

export function getStoreKind(): StoreKind {
  if (process.env.DEMO_MODE === "1") return "demo";
  const url = process.env.DATABASE_URL ?? "";
  if (url.startsWith("postgres://") || url.startsWith("postgresql://")) return "postgres";
  if (url.startsWith("file:")) return "sqlite";
  return "demo";
}

const globalForStore = globalThis as unknown as { __haulbooksStore?: { kind: StoreKind; store: Store } };

export async function getStore(): Promise<Store> {
  const kind = getStoreKind();
  if (globalForStore.__haulbooksStore?.kind === kind) return globalForStore.__haulbooksStore.store;

  let store: Store;
  if (kind === "demo") {
    store = sharedMemoryStore();
  } else if (kind === "sqlite") {
    const { createSqliteStore } = await import("@/lib/sqlite-store");
    store = createSqliteStore();
  } else {
    const { createPostgresStore } = await import("@/lib/postgres-store");
    store = createPostgresStore();
  }

  globalForStore.__haulbooksStore = { kind, store };
  return store;
}
