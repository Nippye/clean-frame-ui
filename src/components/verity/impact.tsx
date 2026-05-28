import { TrendingDown, TrendingUp, ShieldCheck, CircleDollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { VerificationSurface } from "./primitives";

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function RevenueImpact({
  atRisk,
  recovered = 0,
  exposure,
}: {
  atRisk: number;
  recovered?: number;
  exposure?: number;
}) {
  const net = exposure ?? Math.max(atRisk - recovered, 0);
  return (
    <VerificationSurface
      eyebrow="Financial impact"
      title="Revenue exposure"
      bodyClassName="grid grid-cols-3 gap-0 p-0"
    >
      <ImpactCell
        label="At risk"
        value={fmt(atRisk)}
        icon={<CircleDollarSign className="h-3.5 w-3.5" />}
        tone="bad"
      />
      <ImpactCell
        label="Auto-recovered"
        value={fmt(recovered)}
        icon={<ShieldCheck className="h-3.5 w-3.5" />}
        tone="ok"
        divider
      />
      <ImpactCell
        label="Net exposure"
        value={fmt(net)}
        icon={net > 0 ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
        tone={net > 0 ? "bad" : "ok"}
        divider
      />
    </VerificationSurface>
  );
}

function ImpactCell({
  label,
  value,
  icon,
  tone,
  divider,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  tone: "ok" | "bad" | "neutral";
  divider?: boolean;
}) {
  const valueTone =
    tone === "ok" ? "text-emerald-300" : tone === "bad" ? "text-rose-300" : "text-white";
  return (
    <div className={cn("flex flex-col gap-1 p-4", divider && "border-l border-white/5")}>
      <div className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500">
        <span className="text-zinc-600">{icon}</span> {label}
      </div>
      <div className={cn("text-xl font-semibold tabular-nums", valueTone)}>{value}</div>
    </div>
  );
}
