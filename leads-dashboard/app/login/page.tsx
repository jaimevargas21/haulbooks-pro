import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, readSession, safeNextPath, sessionSecret } from "@/lib/session";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const jar = await cookies();
  if (await readSession(jar.get(SESSION_COOKIE)?.value)) redirect("/");

  const params = await searchParams;
  const nextPath = safeNextPath(params.next);
  const missingSecret = !sessionSecret();
  const missingPassword = !process.env.DASHBOARD_PASSWORD;

  return (
    <main className="grid min-h-screen place-items-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-line bg-navy-800 p-6 shadow-2xl md:p-8">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-amber-500 font-semibold text-navy-900">HB</span>
          <div>
            <p className="text-sm text-muted">HaulBooks Pro</p>
            <h1 className="text-xl font-semibold">Leads & support</h1>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted">Private dashboard for Jaime Vargas. There is no public signup.</p>
        {missingSecret || missingPassword ? (
          <p className="mt-4 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-amber-400">
            {missingPassword ? "Set DASHBOARD_PASSWORD. " : ""}
            {missingSecret ? "Set SESSION_SECRET to at least 16 characters. " : ""}
            Then restart or redeploy.
          </p>
        ) : (
          <form className="mt-6 space-y-4" action="/api/auth/login" method="post">
            <input type="hidden" name="next" value={nextPath} />
            <label className="block text-sm" htmlFor="password">
              Password
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 w-full rounded-xl border border-line bg-navy-950 px-3 py-2.5 outline-none focus:ring-2 focus:ring-amber-500"
              />
            </label>
            {params.error === "1" ? <p className="text-sm text-bad">That password did not match.</p> : null}
            {params.error === "rate" ? <p className="text-sm text-bad">Too many tries. Wait a few minutes and try again.</p> : null}
            <button type="submit" className="w-full rounded-full bg-amber-500 py-2.5 font-semibold text-navy-900">
              Sign in
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
