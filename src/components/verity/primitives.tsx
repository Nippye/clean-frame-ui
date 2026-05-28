import * as React from "react";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  XCircle,
  Clock,
  CreditCard,
  Database,
  Mail,
  KeyRound,
  Sparkles,
  Cloud,
  Flame,
  Shield,
  Building2,
} from "lucide-react";
import type { SystemKey, Tone } from "@/lib/verity-fixtures";

/* ------------------------------------------------------------------ */
/* VerificationSurface — universal panel shell                         */
/* ------------------------------------------------------------------ */

type SurfaceProps = Omit<React.HTMLAttributes<HTMLDivElement>, "title"> & {
  variant?: "default" | "inset" | "ledger";
  title?: React.ReactNode;
  eyebrow?: React.ReactNode;
  trailing?: React.ReactNode;
  footer?: React.ReactNode;
  bodyClassName?: string;
};

export function VerificationSurface({
  variant = "default",
  title,
  eyebrow,
  trailing,
  footer,
  bodyClassName,
  className,
  children,
  ...rest
}: SurfaceProps) {
  return (
    <section
      {...rest}
      className={cn(
        "rounded-lg border border-white/5 bg-[oklch(0.205_0.013_265)]",
        variant === "inset" && "bg-[oklch(0.18_0.012_265)]",
        variant === "ledger" && "bg-[oklch(0.175_0.012_265)]",
        className,
      )}
    >
      {(title || eyebrow || trailing) && (
        <header className="flex items-center justify-between gap-3 border-b border-white/5 px-4 py-3">
          <div className="min-w-0">
            {eyebrow && (
              <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                {eyebrow}
              </div>
            )}
            {title && <div className="text-sm font-medium text-white">{title}</div>}
          </div>
          {trailing && <div className="flex items-center gap-2">{trailing}</div>}
        </header>
      )}
      <div className={cn("p-4", bodyClassName)}>{children}</div>
      {footer && <footer className="border-t border-white/5 px-4 py-3">{footer}</footer>}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Tone helpers, dots, badges                                         */
/* ------------------------------------------------------------------ */

const toneRing: Record<Tone, string> = {
  ok: "bg-emerald-500/15 ring-1 ring-emerald-500/30 text-emerald-400",
  bad: "bg-rose-500/15 ring-1 ring-rose-500/30 text-rose-400",
  pending: "bg-zinc-500/15 ring-1 ring-zinc-500/30 text-zinc-400",
};

export function VerifyDot({ tone, className }: { tone: Tone; className?: string }) {
  const Icon = tone === "ok" ? CheckCircle2 : tone === "bad" ? XCircle : Clock;
  return (
    <span
      className={cn(
        "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
        toneRing[tone],
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5" />
    </span>
  );
}

export function CorrectnessBadge({
  status,
  className,
}: {
  status: "Match" | "Mismatch" | "Pending" | "Verified" | "Divergent";
  className?: string;
}) {
  const tone: Tone =
    status === "Match" || status === "Verified"
      ? "ok"
      : status === "Mismatch" || status === "Divergent"
        ? "bad"
        : "pending";
  const styles: Record<Tone, string> = {
    ok: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    bad: "border-rose-500/40 bg-rose-500/10 text-rose-300",
    pending: "border-zinc-500/40 bg-zinc-500/10 text-zinc-300",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-medium",
        styles[tone],
        className,
      )}
    >
      {status}
    </span>
  );
}

export function ImpactBadge({ impact }: { impact: "HIGH" | "MEDIUM" | "LOW" }) {
  const styles = {
    HIGH: "border-rose-500/40 bg-rose-500/10 text-rose-300",
    MEDIUM: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    LOW: "border-zinc-500/40 bg-zinc-500/10 text-zinc-300",
  }[impact];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold tracking-wider",
        styles,
      )}
    >
      {impact} IMPACT
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* SystemIcon                                                         */
/* ------------------------------------------------------------------ */

const systemMeta: Record<SystemKey, { Icon: React.ComponentType<{ className?: string }>; tone: string; label: string }> = {
  stripe: { Icon: CreditCard, tone: "text-indigo-300", label: "Stripe" },
  hubspot: { Icon: Sparkles, tone: "text-orange-300", label: "HubSpot" },
  salesforce: { Icon: Cloud, tone: "text-sky-300", label: "Salesforce" },
  auth0: { Icon: Shield, tone: "text-amber-300", label: "Auth0" },
  firebase: { Icon: Flame, tone: "text-yellow-300", label: "Firebase" },
  postgres: { Icon: Database, tone: "text-emerald-300", label: "Postgres" },
  sendgrid: { Icon: Mail, tone: "text-fuchsia-300", label: "SendGrid" },
  entitlements: { Icon: KeyRound, tone: "text-sky-300", label: "Entitlements" },
};

export function SystemIcon({ system, className }: { system: SystemKey; className?: string }) {
  const meta = systemMeta[system] ?? { Icon: Building2, tone: "text-zinc-300", label: system };
  const { Icon, tone } = meta;
  return (
    <span
      className={cn(
        "flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/5 ring-1 ring-white/10",
        className,
      )}
    >
      <Icon className={cn("h-4 w-4", tone)} />
    </span>
  );
}

export function systemLabel(system: SystemKey) {
  return systemMeta[system]?.label ?? system;
}
