import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpDown, ChevronRight } from "lucide-react";
import {
  DivergencePanel,
  RevenueImpact,
  VerificationSurface,
  CorrectnessBadge,
  ImpactBadge,
  PageHeader,
} from "@/components/verity";
import { events } from "@/lib/verity-fixtures";

export const Route = createFileRoute("/app/incidents")({
  head: () => ({
    meta: [
      { title: "Incidents · Ledger drift · RevTether" },
      {
        name: "description",
        content:
          "Active ledger drifts across connected systems — divergences, revenue at risk, and full audit chain.",
      },
    ],
  }),
  component: IncidentsPage,
});

const severityRank = { HIGH: 0, MEDIUM: 1, LOW: 2 } as const;

function IncidentsPage() {
  const incidents = events
    .filter((e) => e.certificateStatus === "Divergent")
    .sort((a, b) => {
      const sev = severityRank[a.impact] - severityRank[b.impact];
      if (sev !== 0) return sev;
      return b.revenueAtRisk - a.revenueAtRisk;
    });

  const totalAtRisk = incidents.reduce((sum, e) => sum + e.revenueAtRisk, 0);
  const totalDivergences = incidents.reduce((sum, e) => sum + e.divergenceCount, 0);

  // Aggregate divergent rows from the top-severity incident for the panel.
  const topIncident = incidents[0];
  const aggregatedRows = topIncident?.rows ?? [];

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-8 lg:px-10">
      <PageHeader
        title="Active ledger drifts"
        meta={
          <>
            <span className="font-medium text-rose-300">{incidents.length} open</span>
            <span>·</span>
            <span>Production</span>
            <span>·</span>
            <span>{totalDivergences} divergences across {incidents.length} incidents</span>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-5">
          <VerificationSurface
            eyebrow="Ledger"
            title="Drift inventory"
            trailing={
              <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500">
                <ArrowUpDown className="h-3 w-3" />
                Severity, then revenue at risk
              </span>
            }
            bodyClassName="p-0"
          >
            <div className="hidden grid-cols-[80px_1fr_140px_120px_140px_24px] gap-3 border-b border-white/5 px-4 py-2 text-[10px] font-medium uppercase tracking-wider text-zinc-500 md:grid">
              <span>Severity</span>
              <span>Event / Customer</span>
              <span>Source</span>
              <span>Divergences</span>
              <span className="text-right">Revenue at risk</span>
              <span />
            </div>
            <ul className="divide-y divide-white/5">
              {incidents.map((e) => (
                <li key={e.id}>
                  <Link
                    to="/app/events/$eventId"
                    params={{ eventId: e.id }}
                    className="group grid grid-cols-1 items-center gap-3 px-4 py-3 transition-colors hover:bg-white/[0.02] md:grid-cols-[80px_1fr_140px_120px_140px_24px]"
                  >
                    <div>
                      <ImpactBadge impact={e.impact} />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate font-mono text-sm text-white">{e.type}</div>
                      <div className="truncate text-[11px] text-zinc-500">
                        {e.customer} · {e.receivedAt}
                      </div>
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
              {incidents.length === 0 && (
                <li className="px-4 py-10 text-center text-sm text-zinc-500">
                  No active drifts. All ledgers are in sync.
                </li>
              )}
            </ul>
          </VerificationSurface>

          {aggregatedRows.length > 0 && <DivergencePanel rows={aggregatedRows} />}
        </div>

        <div className="space-y-5">
          <RevenueImpact atRisk={totalAtRisk} recovered={0} />
          <VerificationSurface eyebrow="Triage" title="Investigation guidance">
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <span className="font-mono text-zinc-300">1.</span> Open the highest-severity event
                to compare Expected vs Actual ledger state.
              </li>
              <li>
                <span className="font-mono text-zinc-300">2.</span> Confirm divergence scope and
                blast radius before approving recovery.
              </li>
              <li>
                <span className="font-mono text-zinc-300">3.</span> Execute the recovery plan —
                every action emits a sealed proof record.
              </li>
            </ul>
            {topIncident && (
              <Link
                to="/app/events/$eventId"
                params={{ eventId: topIncident.id }}
                className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-indigo-300 hover:text-indigo-200"
              >
                Open top incident <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </VerificationSurface>
        </div>
      </div>
    </div>
  );
}
