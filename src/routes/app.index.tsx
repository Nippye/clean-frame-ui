import { createFileRoute, Link } from "@tanstack/react-router";
import * as React from "react";
import {
  ChevronRight,
  Check,
  X,
  FileText,
  Share2,
  AlertOctagon,
  CircleDollarSign,
  ShieldCheck,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import {
  VerificationSurface,
  CorrectnessBadge,
  ImpactBadge,
} from "@/components/verity";
import { events, trustKpis } from "@/lib/verity-fixtures";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Revenue integrity overview · RevTether" },
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
        <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-rose-300">
          Revenue integrity · Production
        </div>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">
          Is money slipping between your systems right now?
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Last 24 hours · {divergent.length} unresolved {divergent.length === 1 ? "drift" : "drifts"}
        </p>
      </header>

      {/* Top row — 3 business KPIs */}
      <section className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-3">
        <HeroKpi
          tone="bad"
          label="Revenue at risk"
          value={`$${totalAtRisk.toLocaleString("en-US")}`}
          sub="Across active divergences"
          icon={<CircleDollarSign className="h-4 w-4" />}
        />
        <HeroKpi
          tone="bad"
          label="Critical divergences"
          value={String(divergent.length)}
          sub={trustKpis.divergencesPrevented.sub}
          icon={<AlertOctagon className="h-4 w-4" />}
        />
        <HeroKpi
          tone="ok"
          label="Recovered revenue"
          value={trustKpis.recoveredRevenue.value}
          sub={trustKpis.recoveredRevenue.sub}
          icon={<ShieldCheck className="h-4 w-4" />}
        />
      </section>

      {/* Hero — most important issue */}
      {top && (
        <section className="mb-12">
          <div className="mb-3 flex items-end justify-between">
            <div>
              <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-500">
                Most important issue
              </div>
              <h2 className="mt-1 text-base font-semibold tracking-tight text-white">
                The drift costing you the most, right now.
              </h2>
            </div>
            <Link
              to="/app/incidents"
              className="text-[11px] font-medium text-zinc-400 hover:text-zinc-200"
            >
              All incidents →
            </Link>
          </div>
          <div className="overflow-hidden rounded-xl border border-rose-500/20 bg-gradient-to-br from-rose-500/[0.06] via-[oklch(0.18_0.012_265)] to-[oklch(0.18_0.012_265)]">
            <div className="h-0.5 w-full bg-gradient-to-r from-rose-500/70 via-rose-400/40 to-transparent" />
            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <ImpactBadge impact={top.impact} />
                  <span className="font-mono text-[12px] text-rose-200">{top.type}</span>
                  <span className="text-[11px] text-zinc-500">·</span>
                  <span className="text-[11px] text-zinc-400">{top.source}</span>
                </div>
                <p className="mt-3 text-[17px] font-medium leading-snug text-white">
                  Invoice paid in Stripe, but{" "}
                  <span className="text-rose-300">{top.divergenceCount} downstream systems</span>{" "}
                  never updated for {top.customer.split(" ·")[0]}.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <MiniStat label="Customer" value={top.customer.split(" ·")[0]} />
                  <MiniStat
                    label="Revenue at risk"
                    value={`$${top.revenueAtRisk.toLocaleString("en-US")}`}
                    tone="bad"
                  />
                  <MiniStat
                    label="Divergences"
                    value={`${top.divergenceCount}/${top.systemsChecked}`}
                    tone="bad"
                  />
                  <MiniStat
                    label="Detected"
                    value="2m ago"
                    icon={<Clock className="h-3 w-3" />}
                  />
                </div>
              </div>
              <Link
                to="/app/events/$eventId"
                params={{ eventId: top.id }}
                className="inline-flex items-center justify-center gap-1.5 self-stretch rounded-md bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-400 md:self-auto"
              >
                Investigate <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Recent divergences */}
      <section>
        <VerificationSurface
          eyebrow="Triage queue"
          title="Recent divergences"
          bodyClassName="p-0"
          trailing={
            <Link
              to="/app/events"
              className="text-[11px] text-zinc-400 hover:text-zinc-200"
            >
              View all events
            </Link>
          }
        >
          <div className="hidden grid-cols-[80px_1fr_160px_120px_140px_24px] gap-3 border-b border-white/5 px-4 py-2 text-[10px] font-medium uppercase tracking-wider text-zinc-500 md:grid">
            <span>Severity</span>
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
                  className="group grid grid-cols-1 items-center gap-3 px-4 py-3 transition-colors hover:bg-white/[0.02] md:grid-cols-[80px_1fr_160px_120px_140px_24px]"
                >
                  <ImpactBadge impact={e.impact} />
                  <div className="min-w-0">
                    <div className="truncate font-mono text-sm text-white">{e.type}</div>
                    <div className="truncate text-[11px] text-zinc-500">{e.customer}</div>
                  </div>
                  <div className="text-xs text-zinc-300">{e.source}</div>
                  <div className="flex items-center gap-2">
                    <CorrectnessBadge status="Divergent" />
                    <span className="font-mono text-[11px] text-rose-300">
                      {e.divergenceCount}/{e.systemsChecked}
                    </span>
                  </div>
                  <div className="text-right font-mono text-sm tabular-nums text-rose-200">
                    ${e.revenueAtRisk.toLocaleString("en-US")}
                  </div>
                  <ChevronRight className="hidden h-4 w-4 text-zinc-600 transition-colors group-hover:text-zinc-300 md:block" />
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

function HeroKpi({
  label,
  value,
  sub,
  icon,
  tone,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  tone: "bad" | "ok" | "neutral";
}) {
  const accent =
    tone === "bad"
      ? "border-rose-500/20 bg-rose-500/[0.04]"
      : tone === "ok"
        ? "border-emerald-500/20 bg-emerald-500/[0.04]"
        : "border-white/5 bg-[oklch(0.205_0.013_265)]";
  const valueTone =
    tone === "bad" ? "text-rose-200" : tone === "ok" ? "text-emerald-200" : "text-white";
  const iconTone =
    tone === "bad" ? "text-rose-300" : tone === "ok" ? "text-emerald-300" : "text-zinc-400";
  return (
    <div className={`rounded-xl border p-5 ${accent}`}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-400">
          {label}
        </span>
        <span className={iconTone}>{icon}</span>
      </div>
      <div className={`mt-3 text-[34px] font-semibold leading-none tabular-nums ${valueTone}`}>
        {value}
      </div>
      <div className="mt-2 text-[11px] text-zinc-500">{sub}</div>
    </div>
  );
}

function MiniStat({
  label,
  value,
  tone,
  icon,
}: {
  label: string;
  value: string;
  tone?: "bad";
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500">
        {label}
      </div>
      <div
        className={`mt-1 inline-flex items-center gap-1 font-mono text-sm tabular-nums ${
          tone === "bad" ? "text-rose-200" : "text-white"
        }`}
      >
        {icon}
        {value}
      </div>
    </div>
  );
}

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

  const summary =
    "RevTether — Revenue Integrity Report\n\n847 events analyzed\n21 verified flows\n3 mismatches detected\n$4,180 at risk";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      toast.success("Summary copied to clipboard.");
    } catch {
      toast.error("Couldn't copy summary.");
    }
  };

  const stats = [
    { label: "Events analyzed", value: "847" },
    { label: "Verified flows", value: "21" },
    { label: "Mismatches", value: "3", tone: "bad" as const },
    { label: "At risk", value: "$4,180", tone: "bad" as const },
  ];

  return (
    <div className="mb-8 overflow-hidden rounded-xl border border-emerald-500/20 bg-[oklch(0.18_0.012_265)]">
      <div className="h-0.5 w-full bg-gradient-to-r from-emerald-500/60 via-emerald-400/40 to-transparent" />
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-emerald-300">
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5" strokeWidth={3} /> Monitoring active
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5" strokeWidth={3} /> First scan complete
              </span>
            </div>
            <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
              Revenue integrity report ready
            </div>
            <h2 className="mt-1 text-lg font-semibold tracking-tight text-white">
              Your first reconciliation is ready to share.
            </h2>
          </div>
          <button
            onClick={dismiss}
            aria-label="Dismiss"
            className="rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-white/[0.04] hover:text-zinc-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-white/[0.06] bg-[oklch(0.16_0.012_265)] p-3"
            >
              <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                {s.label}
              </div>
              <div
                className={`mt-1 text-[18px] font-semibold tabular-nums ${
                  s.tone === "bad" ? "text-rose-300" : "text-white"
                }`}
              >
                {s.value}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            onClick={() => toast.info("PDF export is rolling out next week.")}
            className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500 px-3 py-1.5 text-[12.5px] font-semibold text-black transition-colors hover:bg-emerald-400"
          >
            <FileText className="h-3.5 w-3.5" /> Download PDF
          </button>
          <button
            onClick={copy}
            className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.02] px-3 py-1.5 text-[12.5px] font-medium text-zinc-200 transition-colors hover:bg-white/[0.05]"
          >
            <Share2 className="h-3.5 w-3.5" /> Share summary
          </button>
        </div>
      </div>
    </div>
  );
}
