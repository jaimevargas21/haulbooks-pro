import { redirect } from "next/navigation";

export default async function StartPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; interval?: string }>;
}) {
  const params = await searchParams;
  const query = new URLSearchParams();
  if (params.plan) query.set("plan", params.plan);
  if (params.interval) query.set("interval", params.interval);
  const suffix = query.toString();
  redirect(suffix ? `/signup?${suffix}` : "/signup");
}
