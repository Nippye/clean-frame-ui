import { createFileRoute } from "@tanstack/react-router";
import { Banknote, Boxes, CreditCard } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions — RevTether" },
      {
        name: "description",
        content:
          "Continuous revenue reconciliation for FinTech, SaaS billing, and marketplace teams — catch silent ledger drift before customers and finance do.",
      },
      { property: "og:title", content: "Solutions — RevTether" },
      {
        property: "og:description",
        content:
          "FinTech, SaaS billing, and marketplaces — every team where every event is revenue.",
      },
    ],
  }),
  component: SolutionsPage,
});

type Solution = {
  icon: typeof Banknote;
  eyebrow: string;
  title: string;
  body: string;
  catches: string[];
  findings: { label: string; meta: string }[];
};

const solutions: Solution[] = [
  {
    icon: Banknote,
    eyebrow: "FinTech & payments",
    title: "Drift between processor, ledger, and core banking.",
    body: "Reconcile every authorization, capture, and settlement across the systems that move money.",
    catches: [
      "Captured charges missing from the internal ledger",
      "Reversed authorizations still reserving balance",
      "Settlement files disagreeing with processor totals",
    ],
    findings: [
      { label: "Charge captured · ledger entry missing", meta: "$12,400 · 3h ago" },
      { label: "Settlement total mismatch", meta: "$842 delta · today" },
    ],
  },
  {
    icon: CreditCard,
    eyebrow: "SaaS billing",
    title: "Invoice paid, entitlement never granted.",
    body: "Verify that every successful payment results in the right subscription state, seats, and feature flags downstream.",
    catches: [
      "Invoice paid · entitlement service silent",
      "Subscription cancelled in Stripe · still active in product",
      "Plan upgrade billed · seats not provisioned",
    ],
    findings: [
      { label: "Invoice paid · entitlement missing", meta: "Acme Co. · 1h ago" },
      { label: "Subscription state divergence", meta: "14 accounts · today" },
    ],
  },
  {
    icon: Boxes,
    eyebrow: "Marketplaces",
    title: "Split payments, payouts, and seller balances.",
    body: "Hold the full chain accountable: buyer charge, platform fee, seller credit, and scheduled payout.",
    catches: [
      "Seller balance ≠ sum of completed orders",
      "Payouts initiated against reversed charges",
      "Platform fee under- or over-applied",
    ],
    findings: [
      { label: "Seller balance drift", meta: "Seller #4821 · $318" },
      { label: "Payout against reversed charge", meta: "blocked · today" },
    ],
  },
];

const roles = [
  { label: "CFO", body: "Numbers that match across processor, ledger, and ERP — every close." },
  { label: "CTO", body: "Continuous proof the integration layer is doing what it's paid to do." },
  { label: "Platform Eng", body: "Findings with expected vs actual and the exact event that diverged." },
];

function SolutionsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="mx-auto max-w-[1200px] px-6 pb-12 pt-20 text-center lg:px-10 lg:pt-28">
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
          Solutions
        </div>
        <h1 className="mx-auto mt-7 max-w-[22ch] text-[44px] font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-[56px]">
          Built for teams where every event is revenue.
        </h1>
        <p className="mx-auto mt-6 max-w-[40rem] text-[17px] leading-relaxed text-zinc-400">
          Three shapes of the same problem — silent divergence between systems
          that everyone assumed were in sync.
        </p>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-12 lg:px-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {solutions.map((s) => {
            const Icon = s.icon;
            return (
              <article
                key={s.eyebrow}
                className="flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7"
              >
                <Icon className="h-5 w-5 text-primary" />
                <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  {s.eyebrow}
                </div>
                <h2 className="mt-3 text-[20px] font-semibold leading-snug tracking-[-0.01em] text-white">
                  {s.title}
                </h2>
                <p className="mt-3 text-[13.5px] leading-relaxed text-zinc-400">
                  {s.body}
                </p>

                <ul className="mt-6 space-y-2">
                  {s.catches.map((c) => (
                    <li
                      key={c}
                      className="flex gap-2.5 text-[13px] leading-relaxed text-zinc-300"
                    >
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary" />
                      {c}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 space-y-2 border-t border-white/[0.06] pt-5">
                  <div className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                    Sample findings
                  </div>
                  {s.findings.map((f) => (
                    <div
                      key={f.label}
                      className="flex items-center justify-between gap-3 rounded-md border border-white/[0.06] bg-background/60 px-3 py-2"
                    >
                      <span className="text-[12.5px] text-zinc-200">{f.label}</span>
                      <span className="text-[11px] text-zinc-500">{f.meta}</span>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-12 lg:px-10">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-3">
          {[
            { stat: "< 1 day", label: "to first verified finding" },
            { stat: "90 days", label: "of history replayed on connect" },
            { stat: "100%", label: "of events reconciled, not sampled" },
          ].map((m) => (
            <div key={m.label} className="bg-background p-8 text-center">
              <div className="text-[34px] font-semibold tracking-[-0.02em] text-white">
                {m.stat}
              </div>
              <div className="mt-2 text-[13px] text-zinc-400">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 py-12 lg:px-10">
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
          Who it's for
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {roles.map((r) => (
            <div key={r.label} className="border-t border-white/[0.08] pt-5">
              <div className="text-[15px] font-semibold text-white">{r.label}</div>
              <p className="mt-2 text-[13.5px] leading-relaxed text-zinc-400">
                {r.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </main>
  );
}
