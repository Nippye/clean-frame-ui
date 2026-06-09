import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { DashboardMockup } from "@/components/site/Hero";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { LogoStrip } from "@/components/site/LogoStrip";
import { CtaBanner } from "@/components/site/CtaBanner";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How it works — RevTether" },
      {
        name: "description",
        content:
          "Walk through the RevTether onboarding: connect Stripe, run the initial scan, surface divergences, and investigate findings.",
      },
      { property: "og:title", content: "How it works — RevTether" },
      {
        property: "og:description",
        content:
          "Environment selection, Stripe connection, initial scan, divergence, investigation, and dashboard.",
      },
    ],
  }),
  component: HowItWorksPage,
});

const stages = [
  {
    n: "01",
    title: "Environment selection",
    body: "Start in a sandboxed environment. Verify the integration against test data before touching production.",
  },
  {
    n: "02",
    title: "Connect Stripe",
    body: "Authorize read-only access in under a minute. No webhooks to configure, no events to forward.",
  },
  {
    n: "03",
    title: "Initial scan",
    body: "RevTether replays your last 90 days of events and reconciles them against downstream systems.",
  },
  {
    n: "04",
    title: "First divergence",
    body: "Surface the first concrete mismatch — invoice paid, contact missing, entitlement not granted.",
  },
  {
    n: "05",
    title: "Investigation",
    body: "Open the finding. Expected vs Actual, affected systems, revenue at risk, and a recovery path.",
  },
  {
    n: "06",
    title: "Operate",
    body: "Continuous verification runs against new events. Findings flow into the same investigation surface.",
  },
];

function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="mx-auto max-w-[1200px] px-6 pb-12 pt-20 text-center lg:px-10 lg:pt-28">
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
          Interactive Demo
        </div>
        <h1 className="mx-auto mt-7 max-w-[20ch] text-[44px] font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-[56px]">
          How RevTether works.
        </h1>
        <p className="mx-auto mt-6 max-w-[36rem] text-[17px] leading-relaxed text-zinc-400">
          From a clean environment to your first verified finding — in six steps.
        </p>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-16 lg:px-10">
        <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stages.map((s) => (
            <li key={s.n} className="border-t border-white/[0.08] pt-5">
              <div className="font-mono text-[11px] tracking-wider text-zinc-500">{s.n}</div>
              <div className="mt-3 text-[18px] font-semibold text-white">{s.title}</div>
              <p className="mt-2 text-[14px] leading-relaxed text-zinc-400">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10">
        <div className="mb-6 text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Investigation surface
          </div>
          <h2 className="mt-3 text-[28px] font-semibold tracking-[-0.01em] text-white sm:text-[36px]">
            What every finding looks like.
          </h2>
        </div>
        <DashboardMockup />
      </section>

      <LogoStrip />
      <FeatureGrid />
      <CtaBanner />
    </main>
  );
}
