import { Copy, ShieldCheck, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { CorrectnessBadge } from "./primitives";

export type CertificateProps = {
  verificationId: string;
  timestamp: string;
  systemsChecked: number;
  divergenceCount: number;
  verifier: string;
  hash: string;
  status: "Verified" | "Divergent" | "Pending";
  variant?: "full" | "compact";
  className?: string;
};

const sealStyles = {
  Verified: "bg-emerald-500/10 ring-emerald-500/30 text-emerald-300",
  Divergent: "bg-rose-500/10 ring-rose-500/30 text-rose-300",
  Pending: "bg-zinc-500/10 ring-zinc-500/30 text-zinc-300",
};

export function CorrectnessCertificate({
  verificationId,
  timestamp,
  systemsChecked,
  divergenceCount,
  verifier,
  hash,
  status,
  variant = "full",
  className,
}: CertificateProps) {
  if (variant === "compact") {
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-md border border-white/10 bg-[oklch(0.205_0.013_265)] px-3 py-2",
          className,
        )}
      >
        <ShieldCheck className="h-4 w-4 text-indigo-300" />
        <div className="min-w-0 flex-1">
          <div className="font-mono text-[11px] text-zinc-200 truncate">{verificationId}</div>
          <div className="text-[10px] text-zinc-500">{timestamp}</div>
        </div>
        <CorrectnessBadge status={status} />
      </div>
    );
  }

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-lg border border-white/10 bg-[oklch(0.195_0.013_265)]",
        "[background-image:linear-gradient(135deg,oklch(0.21_0.018_265)_0%,oklch(0.185_0.013_265)_100%)]",
        className,
      )}
    >
      {/* Seal */}
      <div
        className={cn(
          "absolute right-5 top-5 flex h-16 w-16 items-center justify-center rounded-full ring-2",
          sealStyles[status],
        )}
      >
        <div className="text-center">
          <ShieldCheck className="mx-auto h-5 w-5" />
          <div className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.12em]">
            {status === "Verified" ? "Sealed" : status === "Divergent" ? "Flagged" : "Open"}
          </div>
        </div>
      </div>

      <div className="border-b border-white/5 px-5 py-4">
        <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-indigo-300">
          Correctness Certificate
        </div>
        <div className="mt-1 font-mono text-sm text-white">{verificationId}</div>
        <div className="mt-0.5 text-[11px] text-zinc-500">Issued {timestamp}</div>
      </div>

      <dl className="grid grid-cols-2 gap-x-6 gap-y-3 px-5 py-4 text-[11px] sm:grid-cols-4">
        <CertField label="Systems checked" value={String(systemsChecked)} />
        <CertField
          label="Divergences"
          value={String(divergenceCount)}
          tone={divergenceCount > 0 ? "bad" : "ok"}
        />
        <CertField label="Verifier" value={verifier} />
        <CertField label="Status" value={status} tone={status === "Verified" ? "ok" : status === "Divergent" ? "bad" : "neutral"} />
      </dl>

      <div className="flex items-center justify-between gap-3 border-t border-white/5 px-5 py-3">
        <div className="min-w-0">
          <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500">
            Verification hash
          </div>
          <div className="mt-0.5 flex items-center gap-2">
            <code className="truncate font-mono text-[12px] text-zinc-200">{hash}</code>
            <button
              className="text-zinc-500 transition-colors hover:text-zinc-200"
              aria-label="Copy hash"
            >
              <Copy className="h-3 w-3" />
            </button>
          </div>
        </div>
        <a
          href="#"
          className="inline-flex shrink-0 items-center gap-1 text-[11px] text-indigo-300 hover:text-indigo-200"
        >
          View full proof <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </article>
  );
}

function CertField({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string;
  tone?: "ok" | "bad" | "neutral";
}) {
  const valueTone =
    tone === "ok" ? "text-emerald-300" : tone === "bad" ? "text-rose-300" : "text-zinc-200";
  return (
    <div>
      <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500">{label}</dt>
      <dd className={cn("mt-0.5 font-mono text-[12px]", valueTone)}>{value}</dd>
    </div>
  );
}
