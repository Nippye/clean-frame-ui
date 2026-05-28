import { ArrowLeft, MoreVertical } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { CorrectnessBadge, ImpactBadge } from "./primitives";

type PageHeaderProps = {
  backTo?: string;
  backLabel?: string;
  impact?: "HIGH" | "MEDIUM" | "LOW";
  title: React.ReactNode;
  statusLabel?: "Match" | "Mismatch" | "Pending" | "Verified" | "Divergent";
  meta?: React.ReactNode;
  actions?: React.ReactNode;
};

export function PageHeader({
  backTo,
  backLabel = "Back",
  impact,
  title,
  statusLabel,
  meta,
  actions,
}: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div className="min-w-0">
        {backTo && (
          <Link
            to={backTo}
            className="mb-2 inline-flex items-center gap-1.5 text-xs text-zinc-400 transition-colors hover:text-zinc-200"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> {backLabel}
          </Link>
        )}
        {impact && (
          <div className="mb-2">
            <ImpactBadge impact={impact} />
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="font-mono text-xl font-semibold text-white sm:text-2xl">{title}</h1>
          {statusLabel && <CorrectnessBadge status={statusLabel} />}
        </div>
        {meta && (
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-zinc-500">
            {meta}
          </div>
        )}
      </div>
      <div className="flex items-start gap-2">
        {actions}
        <button className="text-zinc-400 transition-colors hover:text-white" aria-label="More">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function EventMetadata({
  items,
}: {
  items: { label: string; value: React.ReactNode; mono?: boolean }[];
}) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-3 rounded-lg border border-white/5 bg-[oklch(0.195_0.013_265)] px-4 py-4 sm:grid-cols-3 lg:grid-cols-6">
      {items.map((i) => (
        <div key={i.label}>
          <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500">
            {i.label}
          </dt>
          <dd
            className={
              "mt-0.5 truncate text-sm text-zinc-200 " + (i.mono ? "font-mono text-[13px]" : "")
            }
          >
            {i.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
