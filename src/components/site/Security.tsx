import { Bell, DollarSign, Lock, Shield, TrendingUp } from "lucide-react";

const items = [
  {
    icon: DollarSign,
    title: "Recover lost revenue",
    body: "Find and fix the metering-to-billing gaps that silently drain 3–9% of your ARR.",
  },
  {
    icon: TrendingUp,
    title: "11x ROI on average",
    body: "Customers recover $40K+/year in leaked revenue. The tool pays for itself in the first audit.",
  },
  {
    icon: Bell,
    title: "Automated, not manual",
    body: "No more two-week engineering sprints chasing phantom database mismatches. Recovery runs continuously.",
  },
  {
    icon: Shield,
    title: "Bridges eng & finance",
    body: "Revenue leakage falls between teams. RevTether gives both sides a shared, auditable view.",
  },
];

export function OperatorVisibility() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-10 lg:px-10 lg:py-12">
      <h2 className="text-center text-[28px] font-semibold tracking-[-0.01em] text-white sm:text-[36px]">
        Not another dashboard. <span className="text-primary">A revenue recovery engine.</span>
      </h2>
      <p className="mx-auto mt-4 max-w-[36rem] text-center text-[14px] leading-relaxed text-zinc-400">
        RevTether doesn't just show you the problem — it fixes it. Automated reconciliation and corrected invoicing, end to end.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/25 bg-primary/[0.08]">
              <Icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
            </div>
            <h3 className="mt-5 text-[15px] font-semibold text-white">{title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">{body}</p>
          </div>
        ))}
      </div>

      {/* Trust & security strip */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[13px] text-zinc-400">
        <span className="inline-flex items-center gap-2">
          <Lock className="h-3.5 w-3.5 text-primary" />
          SOC 2 Type II compliant
        </span>
        <span className="text-zinc-600">|</span>
        <span className="inline-flex items-center gap-2">
          <Shield className="h-3.5 w-3.5 text-primary" />
          Read-only API access — we never modify your data
        </span>
        <span className="text-zinc-600">|</span>
        <span className="inline-flex items-center gap-2">
          <Lock className="h-3.5 w-3.5 text-primary" />
          Data encrypted at rest & in transit
        </span>
      </div>
    </section>
  );
}
