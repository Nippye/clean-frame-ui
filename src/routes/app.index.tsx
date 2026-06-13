import { createFileRoute, Link } from "@tanstack/react-router";
import * as React from "react";
import {
  ChevronRight,
  X,
  ArrowUpRight,
  AlertTriangle,
} from "lucide-react";
import { VerificationSurface } from "@/components/verity";
import { events, trustKpis } from "@/lib/verity-fixtures";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Revenue Integrity · RevTether" },
      {
        name: "description",
        content:
          "Revenue at risk, active divergences, and recovered revenue across every connected system.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const divergent = events
    .filter((e) => e.certificateStatus === "Divergent")
    .sort((a, b) => b.revenueAtRisk - a.revenueAtRisk);
  const top = divergent[0];
  const totalAtRisk = divergent.reduce((s, e) => s + e.revenueAtRisk, 0);

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10">
      <ReportCard />

      <header className="mb-10">
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
          Production · Last 24 hours
        </div>
        <h1 className="mt-1.5 text-[22px] font-semibold tracking-tight text-white">
          Revenue Integrity
        </h1>
        <p className="mt-1 text-[13px] text-zinc-500">
          {divergent.length} unresolved {divergent.length === 1 ? "divergence" : "divergences"}
          {" · "}
          <span className="text-zinc-400">
            ${totalAtRisk.toLocaleString("en-US")} at risk
          </span>
        </p>
      </header>

      {/* Quiet KPI row — neutral chrome, single red number for the one thing that matters */}
      <section className="mb-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.04] md:grid-cols-3">
        <Kpi
          label="Revenue at risk"
          value={`$${totalAtRisk.toLocaleString("en-US")}`}
          sub="Across active divergences"
          accent
        />
        <Kpi
          label="Active divergences"
          value={String(divergent.length)}
          sub={trustKpis.divergencesPrevented.sub}
        />
        <Kpi
          label="Recovered revenue"
          value={trustKpis.recoveredRevenue.value}
          sub={trustKpis.recoveredRevenue.sub}
        />
      </section>

      {/* Signature visualization — Expected Revenue Flow */}
      <section className="mb-12">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-500">
              Expected revenue flow
            </div>
            <h2 className="mt-1 text-[15px] font-medium tracking-tight text-zinc-200">
              Stripe → CRM → Entitlements → Finance
            </h2>
          </div>
          <span className="text-[11px] text-zinc-500">Live · synced 4s ago</span>
        </div>
        <FlowDiagram />
      </section>

      {/* Highest impact divergence */}
      {top && (
        <section className="mb-12">
          <div className="mb-3 flex items-end justify-between">
            <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-500">
              Highest impact divergence
            </div>
            <Link
              to="/app/incidents"
              className="text-[11px] text-zinc-500 hover:text-zinc-300"
            >
              All incidents →
            </Link>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-[oklch(0.18_0.012_265)]">
            <div className="grid grid-cols-1 gap-6 p-5 md:grid-cols-[1fr_auto] md:items-center">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                  <span className="inline-flex items-center gap-1 text-rose-300/90">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                    Divergent
                  </span>
                  <span>·</span>
                  <span className="font-mono text-zinc-400">{top.type}</span>
                  <span>·</span>
                  <span>{top.source}</span>
                </div>
                <p className="mt-2.5 text-[16px] leading-snug text-zinc-100">
                  Invoice paid in Stripe, but{" "}
                  <span className="text-white">{top.divergenceCount} downstream systems</span>{" "}
                  never updated for {top.customer.split(" ·")[0]}.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4">
                  <Field label="Customer" value={top.customer.split(" ·")[0]} />
                  <Field
                    label="Revenue at risk"
                    value={`$${top.revenueAtRisk.toLocaleString("en-US")}`}
                  />
                  <Field
                    label="Divergences"
                    value={`${top.divergenceCount} of ${top.systemsChecked}`}
                  />
                  <Field label="Detected" value="2m ago" />
                </div>
              </div>
              <Link
                to="/app/events/$eventId"
                params={{ eventId: top.id }}
                className="inline-flex items-center justify-center gap-1.5 self-stretch rounded-md border border-white/10 bg-white/[0.03] px-4 py-2 text-[13px] font-medium text-zinc-200 transition-colors hover:bg-white/[0.06] md:self-auto"
              >
                Investigate <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Recent divergences */}
      <section>
        <VerificationSurface
          eyebrow="Recent"
          title="Divergences"
          bodyClassName="p-0"
          trailing={
            <Link
              to="/app/events"
              className="text-[11px] text-zinc-500 hover:text-zinc-300"
            >
              View all events
            </Link>
          }
        >
          <div className="hidden grid-cols-[1fr_180px_140px_140px_24px] gap-3 border-b border-white/5 px-4 py-2.5 text-[10px] font-medium uppercase tracking-wider text-zinc-500 md:grid">
            <span>Event / Customer</span>
            <span>Source</span>
            <span>Divergences</span>
            <span className="text-right">Revenue at risk</span>
            <span />
          </div>
          <ul className="divide-y divide-white/5">
            {divergent.map((e) => (
              <li key={e.id}>
                <Link
                  to="/app/events/$eventId"
                  params={{ eventId: e.id }}
                  className="group grid grid-cols-1 items-center gap-3 px-4 py-3 transition-colors hover:bg-white/[0.02] md:grid-cols-[1fr_180px_140px_140px_24px]"
                >
                  <div className="min-w-0">
                    <div className="truncate font-mono text-[13px] text-zinc-100">{e.type}</div>
                    <div className="truncate text-[11px] text-zinc-500">{e.customer}</div>
                  </div>
                  <div className="text-[12px] text-zinc-400">{e.source}</div>
                  <div className="flex items-center gap-1.5 text-[12px] text-zinc-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-400/80" />
                    <span className="font-mono tabular-nums">
                      {e.divergenceCount}/{e.systemsChecked}
                    </span>
                  </div>
                  <div className="text-right font-mono text-[13px] tabular-nums text-zinc-200">
                    ${e.revenueAtRisk.toLocaleString("en-US")}
                  </div>
                  <ChevronRight className="hidden h-4 w-4 text-zinc-600 transition-colors group-hover:text-zinc-400 md:block" />
                </Link>
              </li>
            ))}
            {divergent.length === 0 && (
              <li className="px-4 py-10 text-center text-sm text-zinc-500">
                No divergences. Every system is in sync.
              </li>
            )}
          </ul>
        </VerificationSurface>
      </section>
    </div>
  );
}

function Kpi({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div className="bg-[oklch(0.16_0.012_265)] p-5">
      <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-500">
        {label}
      </div>
      <div
        className={`mt-2.5 text-[30px] font-semibold leading-none tabular-nums ${
          accent ? "text-rose-300" : "text-white"
        }`}
      >
        {value}
      </div>
      <div className="mt-2 text-[11px] text-zinc-500">{sub}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500">
        {label}
      </div>
      <div className="mt-1 font-mono text-[13px] tabular-nums text-zinc-200">{value}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Signature visualization: Expected Revenue Flow                      */
/* Stripe → CRM → Entitlements → Finance, with a broken edge highlighted */
/* ------------------------------------------------------------------ */

function FlowDiagram() {
  const nodes = [
    { key: "stripe", label: "Stripe", sub: "Source", state: "ok" as const },
    { key: "crm", label: "HubSpot CRM", sub: "Subscription stage", state: "bad" as const },
    { key: "entitlements", label: "Entitlements", sub: "Access level", state: "bad" as const },
    { key: "finance", label: "QuickBooks", sub: "Ledger entry", state: "ok" as const },
  ];

  return (
    <div className="rounded-lg border border-white/[0.06] bg-[oklch(0.16_0.012_265)] p-6">
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-3">
        {nodes.map((n, i) => (
          <React.Fragment key={n.key}>
            <FlowNode {...n} />
            {i < nodes.length - 1 && (
              <FlowEdge
                broken={
                  // edge between Stripe→CRM is broken because CRM is bad
                  nodes[i + 1].state === "bad" && nodes[i].state === "ok" ||
                  (nodes[i].state === "bad" && nodes[i + 1].state === "bad")
                }
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-white/[0.04] pt-4 text-[11px] text-zinc-500">
        <div className="flex items-center gap-4">
          <LegendDot tone="ok" label="In sync" />
          <LegendDot tone="bad" label="Drift detected" />
        </div>
        <span>3 of 4 systems verified</span>
      </div>
    </div>
  );
}

function FlowNode({
  label,
  sub,
  state,
}: {
  label: string;
  sub: string;
  state: "ok" | "bad";
}) {
  const isBad = state === "bad";
  return (
    <div
      className={`rounded-md border px-3 py-3 text-center transition-colors ${
        isBad
          ? "border-rose-500/30 bg-rose-500/[0.04]"
          : "border-white/[0.08] bg-white/[0.02]"
      }`}
    >
      <div className="flex items-center justify-center gap-1.5">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            isBad ? "bg-rose-400" : "bg-emerald-400/80"
          }`}
        />
        <span className="text-[13px] font-medium text-zinc-100">{label}</span>
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-zinc-500">
        {sub}
      </div>
      {isBad && (
        <div className="mt-2 inline-flex items-center gap-1 text-[10px] text-rose-300/90">
          <AlertTriangle className="h-3 w-3" /> Mismatch
        </div>
      )}
    </div>
  );
}

function FlowEdge({ broken }: { broken: boolean }) {
  return (
    <div className="flex items-center" aria-hidden="true">
      <div
        className={`h-px w-8 ${
          broken
            ? "bg-[repeating-linear-gradient(90deg,oklch(0.7_0.18_22/0.6)_0_4px,transparent_4px_8px)]"
            : "bg-white/15"
        }`}
      />
    </div>
  );
}

function LegendDot({ tone, label }: { tone: "ok" | "bad"; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          tone === "ok" ? "bg-emerald-400/80" : "bg-rose-400"
        }`}
      />
      {label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Post-onboarding report card — quiet, executive                      */
/* ------------------------------------------------------------------ */

function ReportCard() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    try {
      const onboarded = localStorage.getItem("rt_onboarded") === "1";
      const dismissed = localStorage.getItem("rt_report_card_dismissed") === "1";
      setVisible(onboarded && !dismissed);
    } catch {}
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    try {
      localStorage.setItem("rt_report_card_dismissed", "1");
    } catch {}
    setVisible(false);
  };

  return (
    <div className="mb-8 rounded-lg border border-white/[0.06] bg-[oklch(0.18_0.012_265)] p-5">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
            Revenue Integrity Report
          </div>
          <div className="mt-3 flex flex-wrap items-baseline gap-x-8 gap-y-2 text-[13px] text-zinc-400">
            <Stat value="847" label="events verified" />
            <Stat value="3" label="divergences detected" tone="bad" />
            <Stat value="$4,180" label="at risk" tone="bad" />
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Link
            to="/app/incidents"
            className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[12.5px] font-medium text-zinc-200 transition-colors hover:bg-white/[0.06]"
          >
            View report <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400" />
          </Link>
          <button
            onClick={dismiss}
            aria-label="Dismiss"
            className="rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-white/[0.04] hover:text-zinc-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({
  value,
  label,
  tone,
}: {
  value: string;
  label: string;
  tone?: "bad";
}) {
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span
        className={`font-mono text-[18px] font-semibold tabular-nums ${
          tone === "bad" ? "text-rose-300" : "text-white"
        }`}
      >
        {value}
      </span>
      <span className="text-zinc-500">{label}</span>
    </span>
  );
}
