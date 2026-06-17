import { ArrowRight, Check, Zap, BarChart3, Clock, AlertCircle, ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Hero() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 pt-12 pb-6 lg:px-10 lg:pt-16 lg:pb-10">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        {/* Left: text */}
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
            <ShieldCheck className="h-3.5 w-3.5" />
            Revenue Integrity Platform
          </div>
          <h1 className="mt-6 text-[44px] font-bold leading-[1.02] tracking-[-0.02em] text-white sm:text-[56px] lg:text-[68px]">
            Know when<br />
            <span className="text-primary">revenue breaks.</span><br />
            <span className="text-zinc-500">Before finance does.</span>
          </h1>
          <p className="mt-7 max-w-[34rem] text-[15.5px] leading-relaxed text-zinc-400">
            RevTether verifies that payments, upgrades, cancellations, refunds, and trial
            conversions propagate correctly across CRM, provisioning, analytics, and finance
            systems.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to="/auth"
              className="inline-flex h-11 items-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[0_0_0_1px_oklch(0.76_0.18_155_/_0.4),0_8px_24px_-8px_oklch(0.76_0.18_155_/_0.6)] transition hover:brightness-110"
            >
              Verify Revenue Flow <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
            <Link
              to="/onboarding"
              className="inline-flex h-11 items-center rounded-md border border-white/15 bg-transparent px-5 text-sm font-medium text-white hover:bg-white/5"
            >
              See Demo
            </Link>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-zinc-400">
            {["No credit card", "Read-only access", "Connects in 2 min"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-primary" /> {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right: investigation card */}
        <InvestigationCard />
      </div>
    </section>
  );
}

function InvestigationCard() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-[oklch(0.17_0.009_250)] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
      {/* title bar */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
          INVESTIGATION <span className="text-zinc-600">— revtether.io</span>
        </div>
        <div className="rounded-md border border-rose-500/30 bg-rose-500/[0.12] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-300">
          Revenue Leak
        </div>
      </div>

      <div className="px-6 py-6 sm:px-7 sm:py-7">
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-500/15 ring-1 ring-rose-500/30">
            <AlertCircle className="h-4 w-4 text-rose-400" />
          </div>
          <h3 className="text-[20px] font-semibold leading-[1.35] tracking-tight text-white sm:text-[22px]">
            Customer paid.<br />
            Onboarding never happened.<br />
            Finance won't know for <span className="text-rose-400">23 days</span>.
          </h3>
        </div>

        <div className="mt-6 space-y-2.5">
          <Row
            icon={<Zap className="h-4 w-4 text-violet-300" />}
            tint="bg-violet-500/10 ring-violet-500/20"
            label="What happened"
            value={
              <>
                Invoice paid <span className="text-zinc-500">→</span> CRM sync failed{" "}
                <span className="text-zinc-500">→</span> no onboarding triggered
              </>
            }
          />
          <Row
            icon={<BarChart3 className="h-4 w-4 text-rose-300" />}
            tint="bg-rose-500/10 ring-rose-500/20"
            label="Impact"
            value="Customer churned — never experienced the product"
          />
          <Row
            icon={<Clock className="h-4 w-4 text-amber-300" />}
            tint="bg-amber-500/10 ring-amber-500/20"
            label="Discovery"
            value="Finance will notice at month-end reconciliation. 23 days from now."
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-5">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-zinc-400">
            <span><span className="font-semibold text-white">$1,200/mo</span> at risk</span>
            <span className="text-zinc-600">•</span>
            <span>Broken: <span className="text-zinc-200">Stripe → CRM</span></span>
            <span className="text-zinc-600">•</span>
            <span>23 days unnoticed</span>
          </div>
          <Link
            to="/app/incidents"
            className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-white/[0.03] px-3 py-1.5 text-[12px] font-medium text-white hover:bg-white/[0.07]"
          >
            Investigate <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Row({
  icon,
  tint,
  label,
  value,
}: {
  icon: React.ReactNode;
  tint: string;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-white/[0.05] bg-white/[0.015] px-3.5 py-3">
      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ring-1 ${tint}`}>
        {icon}
      </div>
      <div className="grid min-w-0 flex-1 grid-cols-[120px_1fr] gap-3">
        <div className="text-[12.5px] font-medium text-white">{label}</div>
        <div className="text-[12.5px] leading-relaxed text-zinc-400">{value}</div>
      </div>
    </div>
  );
}

// Kept for /how-it-works route (no-op stub if unused there)
export { Hero as default };
