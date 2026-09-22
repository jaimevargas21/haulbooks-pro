import { connection } from "next/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Shell } from "@/components/shell";
import { SESSION_COOKIE, readSession } from "@/lib/session";
import { getStoreKind } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await connection();
  const jar = await cookies();
  const signedIn = await readSession(jar.get(SESSION_COOKIE)?.value);
  if (!signedIn) redirect("/login");
  return <Shell mode={getStoreKind()}>{children}</Shell>;
}
