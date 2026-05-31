import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Activity, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  RecoveryPlan,
  VerificationSurface,
  PageHeader,
  TrustMetric,
} from "@/components/verity";
import { Button } from "@/components/ui/button";
import { events, type RecoveryStep } from "@/lib/verity-fixtures";

export const Route = createFileRoute("/app/recovery")({
  head: () => ({
    meta: [
      { title: "Recovery center · Verity" },
      {
        name: "description",
        content:
          "Active mitigations across ledger drifts — confidence-scored, blast-radius bounded, with automated rollback.",
      },
    ],
  }),
  component: RecoveryPage,
});

function RecoveryPage() {
  const plans = events.filter((e) => e.recovery.length > 0);

  const allSteps: RecoveryStep[] = plans.flatMap((p) => p.recovery);
  const totalSteps = allSteps.length;
  const avgConfidence = totalSteps
    ? Math.round(allSteps.reduce((a, s) => a + s.confidence, 0) / totalSteps)
    : 0;
  const rollbackCount = allSteps.filter((s) => s.rollback).length;
  const rollbackPct = totalSteps ? Math.round((rollbackCount / totalSteps) * 100) : 0;

  const [simulating, setSimulating] = React.useState(false);
  const handleSimulate = () => {
    if (simulating) return;
    setSimulating(true);
    window.setTimeout(() => setSimulating(false), 2400);
  };

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-8 lg:px-10">
      <PageHeader
        title="Recovery center"
        meta={
          <>
            <span className="font-medium text-amber-300">{plans.length} active mitigations</span>
            <span>·</span>
            <span>{totalSteps} steps queued</span>
            <span>·</span>
            <span>Approval required before execution</span>
          </>
        }
        actions={
          <Button
            onClick={handleSimulate}
            disabled={simulating}
            className={cn(
              "h-9 rounded-md px-3 text-xs font-medium text-white transition-all",
              "border ring-offset-0",
              simulating
                ? "border-amber-400/60 bg-amber-500/15 text-amber-200 animate-pulse [box-shadow:0_0_0_4px_oklch(0.7_0.18_70/_0.12)]"
                : "border-white/15 bg-transparent hover:border-amber-400/50 hover:bg-amber-500/10 hover:text-amber-200",
            )}
            aria-busy={simulating}
          >
            {simulating ? (
              <>
                <Activity className="mr-1.5 h-3.5 w-3.5 animate-pulse" />
                Re-syncing ledger…
              </>
            ) : (
              <>
                <Zap className="mr-1.5 h-3.5 w-3.5" />
                Simulate gateway outage re-sync
              </>
            )}
          </Button>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <TrustMetric
          label="Steps queued"
          value={String(totalSteps)}
          sub={`Across ${plans.length} incidents`}
          valueClassName="font-mono"
        />
        <TrustMetric
          label="Aggregate confidence"
          value={`${avgConfidence}%`}
          delta={avgConfidence >= 95 ? "High" : avgConfidence >= 85 ? "Medium" : "Low"}
          tone={avgConfidence >= 95 ? "positive" : avgConfidence >= 85 ? "neutral" : "negative"}
          sub="Weighted across all queued steps"
          valueClassName="font-mono"
        />
        <TrustMetric
          label="Automated rollback"
          value={`${rollbackPct}%`}
          delta={`${rollbackCount}/${totalSteps} reversible`}
          tone="positive"
          sub="Safe to execute"
          valueClassName="font-mono"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-5">
          {plans.length === 0 ? (
            <VerificationSurface eyebrow="Recovery" title="Nothing to recover">
              <p className="text-sm text-zinc-400">
                All connected systems are in sync. Recovery actions appear here as divergences are
                detected.
              </p>
            </VerificationSurface>
          ) : (
            plans.map((p) => (
              <div key={p.id} className="space-y-2">
                <div className="flex flex-wrap items-baseline gap-2 px-1 text-[11px] text-zinc-500">
                  <span className="font-mono text-zinc-300">{p.type}</span>
                  <span>·</span>
                  <span>{p.customer}</span>
                  <span>·</span>
                  <span className="font-mono">{p.id}</span>
                </div>
                <RecoveryPlan steps={p.recovery} />
              </div>
            ))
          )}
        </div>

        <div className="space-y-5">
          <VerificationSurface eyebrow="Controls" title="Recovery primitives">
            <ul className="space-y-3 text-xs text-zinc-400">
              <li>
                <div className="text-zinc-200">Confidence score</div>
                <div>Engine-derived probability the action restores ledger correctness without
                side effects.</div>
              </li>
              <li>
                <div className="text-zinc-200">Blast radius</div>
                <div>Customer-, account-, or org-level scope of the mutation if it runs.</div>
              </li>
              <li>
                <div className="text-zinc-200">Automated rollback</div>
                <div>Whether Verity has captured enough state to revert the action atomically.</div>
              </li>
            </ul>
          </VerificationSurface>

          <VerificationSurface eyebrow="Safety" title="Execution policy">
            <p className="text-xs text-zinc-400">
              Every executed step opens an idempotent transaction keyed on the originating event
              ID, emits a proof record, and is replayable from the proof timeline.
            </p>
          </VerificationSurface>
        </div>
      </div>
    </div>
  );
}
