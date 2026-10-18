import type { Metadata } from "next";
import { Suspense } from "react";
import { DemoDashboard } from "@/components/demo-dashboard";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Interactive Trucking Dashboard Demo",
  description:
    "Click through a sample HaulBooks dashboard: cost per mile, fuel receipts, IFTA readiness, trucks, and reports. Demo data only. 7-day trial, card required.",
  path: "/demo",
});

function DemoFallback() {
  return <div className="mx-auto h-[40rem] max-w-6xl px-4 pt-6 sm:px-6" aria-hidden="true" />;
}

export default function DemoPage() {
  return (
    <div className="pb-16 lg:pb-8">
      <div className="mx-auto max-w-6xl px-5 pt-10 sm:px-6 sm:pt-12">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-400">Interactive demo</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Learn the trucking dashboard in one minute
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          Home, receipts, fuel and IFTA, trucks, and reports. The numbers are sample data. Nothing is saved.
        </p>
      </div>
      <Suspense fallback={<DemoFallback />}>
        <DemoDashboard />
      </Suspense>
    </div>
  );
}
