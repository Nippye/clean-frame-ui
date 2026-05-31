import * as React from "react";
import { cn } from "@/lib/utils";
import { ShieldCheck, AlertOctagon, CircleDollarSign, BadgeCheck } from "lucide-react";

type TrustMetricProps = {
  label: string;
  value: string;
  delta?: string;
  sub?: string;
  icon?: React.ReactNode;
  tone?: "neutral" | "positive" | "negative";
  className?: string;
  valueClassName?: string;
};

export function TrustMetric({
  label,
  value,
  delta,
  sub,
  icon,
  tone = "neutral",
  className,
  valueClassName,
}: TrustMetricProps) {
  const deltaTone =
    tone === "positive"
      ? "text-emerald-300"
      : tone === "negative"
        ? "text-rose-300"
        : "text-zinc-400";
  return (
    <div
      className={cn(
        "rounded-lg border border-white/5 bg-[oklch(0.205_0.013_265)] p-4",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500">
          {label}
        </span>
        {icon && <span className="text-zinc-500">{icon}</span>}
      </div>
      <div className={cn("mt-2 text-2xl font-semibold tabular-nums text-white", valueClassName)}>{value}</div>
      <div className="mt-1 flex items-center gap-2 text-[11px]">
        {delta && <span className={cn("font-medium", deltaTone)}>{delta}</span>}
        {sub && <span className="text-zinc-500">{sub}</span>}
      </div>
    </div>
  );
}

export const VerificationMetric = (p: Omit<TrustMetricProps, "icon">) => (
  <TrustMetric {...p} icon={<ShieldCheck className="h-3.5 w-3.5" />} tone={p.tone ?? "positive"} />
);
export const IntegrityMetric = (p: Omit<TrustMetricProps, "icon">) => (
  <TrustMetric {...p} icon={<AlertOctagon className="h-3.5 w-3.5" />} tone={p.tone ?? "positive"} />
);
export const ReliabilityMetric = (p: Omit<TrustMetricProps, "icon">) => (
  <TrustMetric {...p} icon={<CircleDollarSign className="h-3.5 w-3.5" />} tone={p.tone ?? "positive"} />
);
export const CertificateMetric = (p: Omit<TrustMetricProps, "icon">) => (
  <TrustMetric {...p} icon={<BadgeCheck className="h-3.5 w-3.5" />} tone={p.tone ?? "positive"} />
);
