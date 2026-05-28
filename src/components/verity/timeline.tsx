import { cn } from "@/lib/utils";
import type { TimelineEntry } from "@/lib/verity-fixtures";
import { VerifyDot, VerificationSurface } from "./primitives";

export function ProofTimeline({
  entries,
  title = "Event timeline",
  inSurface = true,
}: {
  entries: TimelineEntry[];
  title?: string;
  inSurface?: boolean;
}) {
  const list = (
    <ol className="relative space-y-3 pl-2">
      <span className="absolute left-[18px] top-2 bottom-2 w-px bg-white/5" aria-hidden />
      {entries.map((t, i) => (
        <li key={`${t.time}-${i}`} className="relative flex items-start gap-3">
          <VerifyDot tone={t.tone} className="z-10" />
          <div className="min-w-0">
            <div className="font-mono text-[11px] text-zinc-500">{t.time}</div>
            <div
              className={cn(
                "text-xs font-medium",
                t.tone === "bad" ? "text-rose-300" : "text-white",
              )}
            >
              {t.title}
            </div>
            <div className="text-[11px] text-zinc-500">{t.system}</div>
          </div>
        </li>
      ))}
    </ol>
  );

  if (!inSurface) return list;
  return <VerificationSurface title={title}>{list}</VerificationSurface>;
}
