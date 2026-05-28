import { Play, ShieldCheck, GitBranch, Clock3, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RecoveryStep } from "@/lib/verity-fixtures";
import { Button } from "@/components/ui/button";
import { SystemIcon, VerificationSurface, systemLabel } from "./primitives";

const radiusStyles = {
  Low: "text-emerald-300",
  Medium: "text-amber-300",
  High: "text-rose-300",
};

export function RecoveryAction({ step }: { step: RecoveryStep }) {
  return (
    <div className="flex flex-col gap-3 rounded-md border border-white/5 bg-[oklch(0.19_0.012_265)] p-4 md:flex-row md:items-center">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <SystemIcon system={step.system} />
        <div className="min-w-0">
          <div className="text-sm font-medium text-white">{step.title}</div>
          <div className="mt-0.5 text-xs text-zinc-400">{step.description}</div>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-zinc-500">
            <MetaItem
              icon={<ShieldCheck className="h-3 w-3" />}
              label="Confidence"
              value={
                <span
                  className={cn(
                    step.confidence >= 95
                      ? "text-emerald-300"
                      : step.confidence >= 85
                        ? "text-amber-300"
                        : "text-rose-300",
                  )}
                >
                  {step.confidence}%
                </span>
              }
            />
            <MetaItem
              icon={<GitBranch className="h-3 w-3" />}
              label="Blast radius"
              value={<span className={radiusStyles[step.blastRadius]}>{step.blastRadius}</span>}
            />
            <MetaItem
              icon={<RotateCcw className="h-3 w-3" />}
              label="Rollback"
              value={
                <span className={step.rollback ? "text-emerald-300" : "text-zinc-300"}>
                  {step.rollback ? "Available" : "Manual"}
                </span>
              }
            />
            <MetaItem
              icon={<Clock3 className="h-3 w-3" />}
              label="Est."
              value={<span className="text-zinc-300">{step.estimate}</span>}
            />
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-500">{systemLabel(step.system)}</span>
          </div>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2 md:flex-col md:items-stretch">
        <Button
          variant="outline"
          className="h-8 rounded-md border-white/15 bg-transparent px-3 text-xs text-white hover:bg-white/5"
        >
          Preview
        </Button>
        <Button className="h-8 rounded-md bg-primary px-3 text-xs text-white hover:bg-primary/90">
          <Play className="mr-1 h-3 w-3 fill-current" /> Execute
        </Button>
      </div>
    </div>
  );
}

function MetaItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="text-zinc-600">{icon}</span>
      <span className="text-zinc-500">{label}:</span>
      <span className="font-medium">{value}</span>
    </span>
  );
}

export function RecoveryPlan({ steps }: { steps: RecoveryStep[] }) {
  if (steps.length === 0) {
    return (
      <VerificationSurface title="Recovery plan">
        <div className="py-4 text-center text-sm text-zinc-500">
          No recovery required — all systems are in sync.
        </div>
      </VerificationSurface>
    );
  }

  const aggregate = Math.round(steps.reduce((a, s) => a + s.confidence, 0) / steps.length);
  const allRollback = steps.every((s) => s.rollback);
  const radius =
    steps.find((s) => s.blastRadius === "High")?.blastRadius ??
    steps.find((s) => s.blastRadius === "Medium")?.blastRadius ??
    "Low";

  return (
    <VerificationSurface
      eyebrow="Recovery"
      title={`${steps.length}-step recovery plan`}
      trailing={
        <div className="hidden items-center gap-4 text-[11px] sm:flex">
          <span className="text-zinc-500">
            Confidence{" "}
            <span
              className={cn(
                aggregate >= 95
                  ? "text-emerald-300"
                  : aggregate >= 85
                    ? "text-amber-300"
                    : "text-rose-300",
                "font-medium",
              )}
            >
              {aggregate}%
            </span>
          </span>
          <span className="text-zinc-500">
            Blast radius{" "}
            <span className={cn(radiusStyles[radius], "font-medium")}>{radius}</span>
          </span>
          <span className="text-zinc-500">
            Rollback{" "}
            <span className={cn(allRollback ? "text-emerald-300" : "text-zinc-300", "font-medium")}>
              {allRollback ? "Yes" : "Partial"}
            </span>
          </span>
        </div>
      }
      bodyClassName="space-y-2 p-4"
      footer={
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] text-zinc-500">
            Approval required before execution · Every action emits a proof record.
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="h-8 rounded-md border-white/15 bg-transparent px-3 text-xs text-white hover:bg-white/5"
            >
              Preview all
            </Button>
            <Button className="h-8 rounded-md bg-primary px-3 text-xs text-white hover:bg-primary/90">
              Execute plan
            </Button>
          </div>
        </div>
      }
    >
      {steps.map((s) => (
        <RecoveryAction key={s.id} step={s} />
      ))}
    </VerificationSurface>
  );
}
