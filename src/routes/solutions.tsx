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
          "Automated revenue recovery for usage-based SaaS — find and fix the metering-to-billing gaps that silently drain 3–9% of your ARR.",
      },
      { property: "og:title", content: "Solutions — RevTether" },
      {
        property: "og:description",
        content:
          "Stop losing 3–9% of revenue to metering-to-billing gaps. RevTether recovers it automatically.",
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
    eyebrow: "Usage-based SaaS",
    title: "4,218 calls metered. 3,891 billed. $2,740 lost.",
    body: "Reconcile every metered event against every invoice line item. Find the gaps. Recover the revenue. Automatically.",
    catches: [
      "Metered usage events dropped before reaching billing",
      "Usage aggregation rounding errors compounding monthly",
      "Plan upgrade billed · usage tier not updated",
    ],
    findings: [
      { label: "Metering gap · under-billed", meta: "$2,740/mo · recovered" },
      { label: "Aggregation drift", meta: "23 accounts · auto-fixed" },
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
  { label: "CFO", body: "Know exactly how much revenue your billing stack drops — and see it recovered before month-end." },
  { label: "CTO", body: "Stop burning engineering sprints on manual reconciliation. RevTether automates the fix." },
  { label: "Platform Eng", body: "Exact diffs between metered usage and billed amounts, down to the event that diverged." },
];

function SolutionsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="mx-auto max-w-[1200px] px-6 pb-12 pt-20 text-center lg:px-10 lg:pt-28">
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
          Solutions
        </div>
        <h1 className="mx-auto mt-7 max-w-[24ch] text-[44px] font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-[56px]">
          Revenue recovery for every billing model.
        </h1>
        <p className="mx-auto mt-6 max-w-[40rem] text-[17px] leading-relaxed text-zinc-400">
          Three shapes of the same problem — metering, billing, and settlement
          systems that silently disagree, costing you money every month.
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
            { stat: "< 24 hrs", label: "to first recovered dollars" },
            { stat: "11x", label: "average return on investment" },
            { stat: "3–9%", label: "of ARR recovered on average" },
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
