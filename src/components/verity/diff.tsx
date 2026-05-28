import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VerificationRow, Tone } from "@/lib/verity-fixtures";
import { CorrectnessBadge, SystemIcon, VerifyDot, VerificationSurface } from "./primitives";

/* ------------------------------------------------------------------ */
/* ExpectedState / ActualState — single state cell                     */
/* ------------------------------------------------------------------ */

export function StateCell({
  tone,
  title,
  sub,
  emphasizeMismatch,
}: {
  tone: Tone;
  title: string;
  sub: string;
  emphasizeMismatch?: boolean;
}) {
  return (
    <div className="flex items-start gap-2">
      <VerifyDot tone={tone} />
      <div className="min-w-0">
        <div
          className={cn(
            "text-sm font-medium",
            emphasizeMismatch && tone === "bad" ? "text-rose-300" : "text-white",
          )}
        >
          {title}
        </div>
        <div className="text-xs text-zinc-500">{sub}</div>
      </div>
    </div>
  );
}

export const ExpectedState = (p: { tone: Tone; title: string; sub: string }) => (
  <StateCell {...p} />
);
export const ActualState = (p: { tone: Tone; title: string; sub: string }) => (
  <StateCell {...p} emphasizeMismatch />
);

/* ------------------------------------------------------------------ */
/* VerificationDiff                                                   */
/* ------------------------------------------------------------------ */

export function VerificationDiff({
  rows,
  title = "Expected vs Actual",
}: {
  rows: VerificationRow[];
  title?: string;
}) {
  const mismatches = rows.filter((r) => r.expectedTone !== r.actualTone || r.actualTone === "bad").length;
  return (
    <VerificationSurface
      title={
        <span className="flex items-center gap-2">
          {title}
          <span className="text-xs font-normal text-indigo-300">
            {mismatches} {mismatches === 1 ? "mismatch" : "mismatches"}
          </span>
        </span>
      }
      bodyClassName="p-0"
    >
      <div className="hidden grid-cols-[1.3fr_1.1fr_1.1fr_80px] gap-3 px-4 py-2 text-[10px] font-medium uppercase tracking-wider text-zinc-500 md:grid">
        <span>System / Check</span>
        <span className="flex items-center gap-1">
          Expected <Info className="h-2.5 w-2.5" />
        </span>
        <span className="flex items-center gap-1">
          Actual <Info className="h-2.5 w-2.5" />
        </span>
        <span className="text-right">Status</span>
      </div>
      <div className="divide-y divide-white/5">
        {rows.map((r) => {
          const isMatch = r.expectedTone === r.actualTone && r.actualTone !== "bad";
          return (
            <div
              key={r.name}
              className="grid grid-cols-1 items-center gap-3 px-4 py-3 md:grid-cols-[1.3fr_1.1fr_1.1fr_80px]"
            >
              <div className="flex items-center gap-3">
                <SystemIcon system={r.system} />
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-white">{r.name}</div>
                  <div className="truncate text-xs text-zinc-500">{r.check}</div>
                </div>
              </div>
              <ExpectedState tone={r.expectedTone} title={r.expectedTitle} sub={r.expectedSub} />
              <ActualState tone={r.actualTone} title={r.actualTitle} sub={r.actualSub} />
              <div className="md:text-right">
                <CorrectnessBadge status={isMatch ? "Match" : "Mismatch"} />
              </div>
            </div>
          );
        })}
      </div>
    </VerificationSurface>
  );
}

/* ------------------------------------------------------------------ */
/* DivergencePanel                                                    */
/* ------------------------------------------------------------------ */

export function DivergencePanel({ rows }: { rows: VerificationRow[] }) {
  const divergent = rows.filter((r) => r.actualTone === "bad");
  if (divergent.length === 0) return null;
  return (
    <VerificationSurface
      eyebrow="Divergence"
      title={`${divergent.length} ${divergent.length === 1 ? "system is" : "systems are"} out of sync`}
      bodyClassName="p-0"
    >
      <ul className="divide-y divide-white/5">
        {divergent.map((r) => (
          <li
            key={r.name}
            className="flex items-start gap-3 px-4 py-3"
          >
            <SystemIcon system={r.system} />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-white">{r.name}</span>
                <span className="font-mono text-[11px] text-zinc-500">{r.check}</span>
              </div>
              <div className="mt-1 text-xs text-zinc-400">
                Expected{" "}
                <span className="font-mono text-zinc-200">{r.expectedTitle}</span>, observed{" "}
                <span className="font-mono text-rose-300">{r.actualTitle}</span>.
              </div>
            </div>
            <CorrectnessBadge status="Divergent" />
          </li>
        ))}
      </ul>
    </VerificationSurface>
  );
}
