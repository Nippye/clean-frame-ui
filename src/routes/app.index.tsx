import { createFileRoute, Link } from "@tanstack/react-router";
import * as React from "react";
import {
  X,
  ArrowUpRight,
  Check,
  Play,
  FileText,
  Plus,
  ChevronRight,
} from "lucide-react";
import { events, type SystemKey } from "@/lib/verity-fixtures";
import { systemLabel } from "@/components/verity";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Revenue Integrity · RevTether" },
      {
        name: "description",
        content:
          "Is revenue breaking right now? Expected vs actual outcomes across every connected system.",
      },
    ],
  }),
  component: DashboardPage,
});

const VERIFIED_DAYS = 287;

function DashboardPage() {
  const divergent = events
    .filter((e) => e.certificateStatus === "Divergent")
    .sort((a, b) => b.revenueAtRisk - a.revenueAtRisk);
  const top = divergent[0];
  const totalAtRisk = divergent.reduce((s, e) => s + e.revenueAtRisk, 0);

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10">
      <Header
        atRisk={totalAtRisk}
        divergences={divergent.length}
      />

      {top && <ExpectedVsActualHero event={top} />}

      <section className="mb-14 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <ActiveIncidents events={divergent} />
        <ImpactBySystem events={divergent} />
      </section>

      <PotentialImpact events={divergent} />

      <CorrectnessTimeline />

      <RecentEvidence />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Header — single subline + quiet quick actions                       */
/* ------------------------------------------------------------------ */

function Header({ atRisk, divergences }: { atRisk: number; divergences: number }) {
  return (
    <header className="mb-12 flex items-end justify-between gap-6">
      <div className="min-w-0">
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
          Production
        </div>
        <h1 className="mt-1.5 text-[26px] font-semibold tracking-tight text-white">
          Revenue Integrity
        </h1>
        <p className="mt-2 text-[13px] tabular-nums text-zinc-400">
          <span className="text-rose-300">${atRisk.toLocaleString("en-US")}</span> at risk
          <span className="px-2 text-zinc-600">·</span>
          {divergences} active {divergences === 1 ? "divergence" : "divergences"}
          <span className="px-2 text-zinc-600">·</span>
          <span className="text-zinc-500">{VERIFIED_DAYS} days verified</span>
        </p>
      </div>
      <div className="hidden items-center gap-1.5 md:flex">
        <QuickAction icon={Play} label="Run audit" />
        <QuickAction icon={FileText} label="Report" />
        <QuickAction icon={Plus} label="Add system" />
      </div>
    </header>
  );
}

function QuickAction({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[12px] font-medium text-zinc-400 transition-colors hover:bg-white/[0.04] hover:text-zinc-200">
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* HERO — Expected vs Actual (the moat)                                */
/* ------------------------------------------------------------------ */

function ExpectedVsActualHero({ event }: { event: (typeof events)[number] }) {
  const customer = event.customer.split(" ·")[0];
  return (
    <section className="mb-14">
      <div className="mb-3 flex items-end justify-between">
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
          Highest impact incident
        </div>
        <Link
          to="/app/incidents"
          className="text-[11px] text-zinc-500 transition-colors hover:text-zinc-300"
        >
          All incidents →
        </Link>
      </div>

      <div className="rounded-xl bg-[oklch(0.18_0.012_265)] p-8">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[12px]">
          <span className="inline-flex items-center gap-1.5 text-rose-300">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
            Mismatch detected
          </span>
          <span className="text-zinc-600">·</span>
          <span className="font-mono text-zinc-300">{event.type}</span>
          <span className="text-zinc-600">·</span>
          <span className="text-zinc-400">{event.source} → {customer}</span>
        </div>

        <div className="mt-4 flex flex-wrap items-end gap-x-8 gap-y-3">
          <div>
            <div className="text-[40px] font-semibold leading-none tracking-tight text-rose-300 tabular-nums">
              ${event.revenueAtRisk.toLocaleString("en-US")}
            </div>
            <div className="mt-2 text-[13px] text-zinc-500">revenue at risk on this event</div>
          </div>
          <div className="text-[12px] leading-relaxed text-zinc-500">
            <div>
              Detected in <span className="text-zinc-300 tabular-nums">2m 14s</span>
            </div>
            <div>
              Issue active for <span className="text-zinc-300 tabular-nums">17m</span>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-3 md:grid-cols-2">
          <div>
            <div className="mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
              Expected
            </div>
            <ul className="space-y-2.5">
              {event.rows.slice(1).map((r) => (
                <li
                  key={`exp-${r.system}`}
                  className="flex items-start gap-2.5 text-[13.5px] text-zinc-300"
                >
                  <Check className="mt-[3px] h-3.5 w-3.5 shrink-0 text-emerald-400/80" />
                  <span>{expectedLabel(r.system, r.check)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
              Actual
            </div>
            <ul className="space-y-2.5">
              {event.rows.slice(1).map((r) => {
                const bad = r.actualTone === "bad";
                return (
                  <li
                    key={`act-${r.system}`}
                    className={`flex items-start gap-2.5 text-[13.5px] ${
                      bad ? "text-rose-300" : "text-zinc-300"
                    }`}
                  >
                    {bad ? (
                      <X className="mt-[3px] h-3.5 w-3.5 shrink-0 text-rose-400" />
                    ) : (
                      <Check className="mt-[3px] h-3.5 w-3.5 shrink-0 text-emerald-400/80" />
                    )}
                    <span>
                      {bad
                        ? actualBadLabel(r.system, r.check)
                        : expectedLabel(r.system, r.check)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Link
            to="/app/events/$eventId"
            params={{ eventId: event.id }}
            className="inline-flex items-center gap-1.5 rounded-md bg-white/[0.06] px-4 py-2 text-[13px] font-medium text-zinc-100 transition-colors hover:bg-white/[0.1]"
          >
            Investigate <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function expectedLabel(system: SystemKey, check: string) {
  return `${systemLabel(system)} · ${check}`;
}
function actualBadLabel(system: SystemKey, check: string) {
  const verbs: Partial<Record<SystemKey, string>> = {
    hubspot: "missing update",
    entitlements: "not granted",
    sendgrid: "delivery failed",
    postgres: "stale",
    salesforce: "missing update",
    auth0: "access not granted",
    firebase: "stale",
  };
  return `${systemLabel(system)} · ${verbs[system] ?? "mismatch"}`;
}

function incidentReason(system: SystemKey) {
  const reasons: Partial<Record<SystemKey, string>> = {
    hubspot: "CRM record missing",
    salesforce: "CRM record missing",
    entitlements: "Entitlement not granted",
    auth0: "Access not granted",
    sendgrid: "Onboarding email not sent",
    postgres: "Ledger row stale",
    firebase: "Profile not synced",
  };
  return reasons[system] ?? "Downstream system out of sync";
}

/* ------------------------------------------------------------------ */
/* Active incidents — compact list                                     */
/* ------------------------------------------------------------------ */

function ActiveIncidents({ events: list }: { events: typeof events }) {
  const ages = ["17m ago", "42m ago", "1h ago", "3h ago"];
  return (
    <section>
      <SectionHeader title="Active incidents" trailing={<Link to="/app/incidents" className="text-[11px] text-zinc-500 hover:text-zinc-300">View all →</Link>} />
      <ul className="mt-4 divide-y divide-white/[0.04]">
        {list.slice(0, 4).map((e, i) => {
          const customer = e.customer.split(" ·")[0];
          const failedSystem = e.rows.find((r) => r.actualTone === "bad");
          return (
            <li key={e.id}>
              <Link
                to="/app/events/$eventId"
                params={{ eventId: e.id }}
                className="group flex items-center gap-4 py-3.5 transition-colors hover:bg-white/[0.02]"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400/80" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] text-zinc-100">
                    {e.source} → {failedSystem ? systemLabel(failedSystem.system) : "downstream"}
                  </div>
                  <div className="truncate text-[11.5px] text-zinc-500">
                    {failedSystem ? incidentReason(failedSystem.system) : "Downstream system out of sync"}
                    <span className="px-1.5 text-zinc-700">·</span>
                    {customer}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[13px] tabular-nums text-zinc-200">
                    ${e.revenueAtRisk.toLocaleString("en-US")}
                  </div>
                  <div className="text-[11px] text-zinc-500">{ages[i] ?? "—"}</div>
                </div>
                <ChevronRight className="h-4 w-4 text-zinc-700 transition-colors group-hover:text-zinc-400" />
              </Link>
            </li>
          );
        })}
        {list.length === 0 && (
          <li className="py-10 text-center text-sm text-zinc-500">No active incidents.</li>
        )}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Impact by system — horizontal bars                                  */
/* ------------------------------------------------------------------ */

function ImpactBySystem({ events: list }: { events: typeof events }) {
  // Aggregate at-risk $ per failing system
  const byKey = new Map<SystemKey, number>();
  for (const e of list) {
    const failing = e.rows.filter((r) => r.actualTone === "bad");
    if (failing.length === 0) continue;
    const share = e.revenueAtRisk / failing.length;
    for (const r of failing) {
      byKey.set(r.system, (byKey.get(r.system) ?? 0) + share);
    }
  }
  const rows = Array.from(byKey.entries())
    .map(([key, value]) => ({ key, value }))
    .sort((a, b) => b.value - a.value);
  const max = Math.max(1, ...rows.map((r) => r.value));

  return (
    <section>
      <SectionHeader title="Impact by system" trailing={<span className="text-[11px] text-zinc-500">$ at risk</span>} />
      <ul className="mt-4 space-y-4">
        {rows.map((r) => (
          <li key={r.key}>
            <div className="mb-1.5 flex items-baseline justify-between text-[12.5px]">
              <span className="text-zinc-300">{systemLabel(r.key)}</span>
              <span className="font-mono tabular-nums text-zinc-400">
                ${Math.round(r.value).toLocaleString("en-US")}
              </span>
            </div>
            <div className="h-[6px] w-full overflow-hidden rounded-full bg-white/[0.04]">
              <div
                className="h-full rounded-full bg-rose-400/70"
                style={{ width: `${(r.value / max) * 100}%` }}
              />
            </div>
          </li>
        ))}
        {rows.length === 0 && (
          <li className="py-6 text-center text-sm text-zinc-500">No system impact detected.</li>
        )}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Potential impact — derived from active incidents                    */
/* ------------------------------------------------------------------ */

function PotentialImpact({ events: list }: { events: typeof events }) {
  // Aggregate by failing system family
  const counts = { crm: 0, entitlement: 0, email: 0, ledger: 0 };
  let financeDelta = 0;
  for (const e of list) {
    for (const r of e.rows.filter((x) => x.actualTone === "bad")) {
      if (r.system === "hubspot" || r.system === "salesforce") counts.crm += 1;
      else if (r.system === "entitlements" || r.system === "auth0") counts.entitlement += 1;
      else if (r.system === "sendgrid") counts.email += 1;
      else if (r.system === "postgres" || r.system === "firebase") {
        counts.ledger += 1;
        financeDelta += e.revenueAtRisk;
      }
    }
  }

  const items: string[] = [];
  if (counts.email > 0)
    items.push(`${counts.email} ${counts.email === 1 ? "customer" : "customers"} may not receive onboarding emails`);
  if (counts.entitlement > 0)
    items.push(`${counts.entitlement} upgraded ${counts.entitlement === 1 ? "customer lacks entitlements" : "customers lack entitlements"}`);
  if (counts.crm > 0)
    items.push(`${counts.crm} ${counts.crm === 1 ? "deal is" : "deals are"} missing from the CRM pipeline`);
  if (financeDelta > 0)
    items.push(`Finance reconciliation may be off by $${financeDelta.toLocaleString("en-US")}`);

  if (items.length === 0) return null;

  return (
    <section className="mb-14">
      <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
        Potential impact
      </div>
      <ul className="mt-3 space-y-2">
        {items.map((t) => (
          <li
            key={t}
            className="flex items-start gap-3 text-[13.5px] text-zinc-300"
          >
            <span className="mt-[9px] h-[3px] w-[3px] shrink-0 rounded-full bg-zinc-500" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Correctness timeline — 30-day verified vs divergent                 */
/* ------------------------------------------------------------------ */

function CorrectnessTimeline() {
  // Deterministic mock series — 30 days, mostly verified
  const days = React.useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => {
      const seed = (i * 9301 + 49297) % 233280;
      const rnd = seed / 233280;
      const total = 800 + Math.round(rnd * 600);
      const divergent =
        i === 22 ? 18 : i === 27 ? 9 : i === 29 ? 3 : Math.round(rnd * 2);
      return { total, divergent };
    });
  }, []);
  const maxTotal = Math.max(...days.map((d) => d.total));

  return (
    <section className="mb-14">
      <SectionHeader
        title="Correctness timeline"
        trailing={<span className="text-[11px] text-zinc-500">Last 30 days</span>}
      />
      <div className="mt-5 flex items-end gap-[3px]" style={{ height: 80 }}>
        {days.map((d, i) => {
          const h = (d.total / maxTotal) * 80;
          const divH = (d.divergent / d.total) * h;
          return (
            <div
              key={i}
              className="group relative flex-1"
              style={{ height: 80 }}
              title={`${d.total} verified · ${d.divergent} divergent`}
            >
              <div
                className="absolute bottom-0 w-full rounded-sm bg-white/[0.06] transition-colors group-hover:bg-white/[0.1]"
                style={{ height: h }}
              />
              {d.divergent > 0 && (
                <div
                  className="absolute bottom-0 w-full rounded-sm bg-rose-400/70"
                  style={{ height: Math.max(divH, 2) }}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-500">
        <span>30 days ago</span>
        <div className="flex items-center gap-4">
          <LegendDot color="bg-white/[0.2]" label="Verified" />
          <LegendDot color="bg-rose-400/70" label="Divergent" />
        </div>
        <span>Today</span>
      </div>
    </section>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-1.5 w-1.5 rounded-full ${color}`} />
      {label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Recent verification evidence — quiet table                          */
/* ------------------------------------------------------------------ */

function RecentEvidence() {
  return (
    <section>
      <SectionHeader
        title="Recent verification evidence"
        trailing={
          <Link to="/app/events" className="text-[11px] text-zinc-500 hover:text-zinc-300">
            All evidence →
          </Link>
        }
      />
      <ul className="mt-3 divide-y divide-white/[0.04]">
        {events.slice(0, 8).map((e) => {
          const divergent = e.certificateStatus === "Divergent";
          const verified = e.certificateStatus === "Verified";
          return (
            <li key={e.id}>
              <Link
                to="/app/events/$eventId"
                params={{ eventId: e.id }}
                className="group grid grid-cols-[16px_1fr_auto_auto] items-center gap-4 py-3 transition-colors hover:bg-white/[0.02]"
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    divergent
                      ? "bg-rose-400/80"
                      : verified
                        ? "bg-emerald-400/70"
                        : "bg-zinc-500"
                  }`}
                />
                <div className="min-w-0">
                  <div className="truncate font-mono text-[12.5px] text-zinc-200">{e.type}</div>
                  <div className="truncate text-[11px] text-zinc-500">{e.customer}</div>
                </div>
                <div className="font-mono text-[11px] tabular-nums text-zinc-500">
                  {e.systemsChecked - e.divergenceCount}/{e.systemsChecked} systems
                </div>
                <div className="font-mono text-[11px] tabular-nums text-zinc-500">
                  {e.receivedAtIso.slice(11, 19)}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

function SectionHeader({
  title,
  trailing,
}: {
  title: string;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between border-b border-white/[0.04] pb-2">
      <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
        {title}
      </div>
      {trailing}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Post-onboarding report card — single quiet line                     */
/* ------------------------------------------------------------------ */

function ReportCard() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    try {
      const onboarded = localStorage.getItem("rt_onboarded") === "1";
      const dismissed = localStorage.getItem("rt_report_card_dismissed") === "1";
      setVisible(onboarded && !dismissed);
    } catch {
      /* noop */
    }
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    try {
      localStorage.setItem("rt_report_card_dismissed", "1");
    } catch {
      /* noop */
    }
    setVisible(false);
  };

  return (
    <div className="mb-8 flex items-center justify-between gap-4 rounded-md bg-white/[0.03] px-4 py-2.5 text-[12.5px]">
      <div className="flex flex-wrap items-baseline gap-x-3 text-zinc-400">
        <span className="inline-flex items-center gap-1.5 text-emerald-400/90">
          <Check className="h-3.5 w-3.5" /> Monitoring active
        </span>
        <span className="text-zinc-600">·</span>
        <span>
          First scan complete —{" "}
          <span className="font-mono tabular-nums text-zinc-200">847</span> events,{" "}
          <span className="font-mono tabular-nums text-rose-300">3</span> mismatches,{" "}
          <span className="font-mono tabular-nums text-rose-300">$4,180</span> at risk.
        </span>
      </div>
      <div className="flex items-center gap-1">
        <Link
          to="/app/incidents"
          className="text-[12px] font-medium text-zinc-300 transition-colors hover:text-white"
        >
          View report →
        </Link>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="rounded-md p-1 text-zinc-500 transition-colors hover:bg-white/[0.04] hover:text-zinc-300"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
