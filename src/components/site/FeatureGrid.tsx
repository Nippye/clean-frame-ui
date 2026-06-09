import {
  CheckCircle2, XCircle, ArrowRight, ShieldCheck, AlertTriangle, Zap,
  CreditCard, Sparkles, Cloud, KeyRound, Database, Plus, Box,
} from "lucide-react";

function Column({
  title,
  description,
  children,
}: {
  title: React.ReactNode;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-[19px] font-semibold leading-tight text-white">{title}</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">{description}</p>
      </div>
      {children}
    </div>
  );
}

function Pill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-xs text-zinc-200">
      {icon}
      {label}
    </div>
  );
}

function Step({ icon, label, danger, warn, ok, accent }: {
  icon: React.ReactNode; label: string; danger?: boolean; warn?: boolean; ok?: boolean; accent?: boolean;
}) {
  const tone = danger
    ? "bg-rose-500/15 ring-rose-500/30 text-rose-300"
    : warn
    ? "bg-amber-500/15 ring-amber-500/30 text-amber-300"
    : ok
    ? "bg-emerald-500/15 ring-emerald-500/30 text-emerald-300"
    : accent
    ? "bg-indigo-500/15 ring-indigo-500/40 text-indigo-300"
    : "bg-white/5 ring-white/10 text-zinc-300";
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={`flex h-12 w-12 items-center justify-center rounded-full ring-1 ${tone}`}>
        {icon}
      </div>
      <span className="text-[11px] text-zinc-400">{label}</span>
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex items-center text-zinc-600">
      <span className="h-px w-3 bg-zinc-700" />
      <ArrowRight className="h-3 w-3" />
    </div>
  );
}

export function FeatureGrid() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <Column
          title={<>Why logs<br />aren't enough</>}
          description="Logs show you what happened. RevTether tells you if it was correct."
        >
          <ul className="space-y-2.5 text-[13px]">
            <li className="flex items-center gap-2 text-zinc-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Payments succeed but access fails
            </li>
            <li className="flex items-center gap-2 text-zinc-200">
              <XCircle className="h-4 w-4 text-rose-400" />
              Workflows break silently
            </li>
            <li className="flex items-center gap-2 text-zinc-200">
              <XCircle className="h-4 w-4 text-rose-400" />
              Revenue leaks without alerts
            </li>
          </ul>
        </Column>

        <Column
          title={<>Continuous verification<br />across every system</>}
          description="RevTether verifies the state of every system touched by a financial event."
        >
          <div className="grid grid-cols-2 gap-2">
            <Pill icon={<CreditCard className="h-3.5 w-3.5 text-indigo-300" />} label="Stripe" />
            <Pill icon={<Sparkles className="h-3.5 w-3.5 text-orange-300" />} label="HubSpot" />
            <Pill icon={<Cloud className="h-3.5 w-3.5 text-sky-300" />} label="Salesforce" />
            <Pill icon={<KeyRound className="h-3.5 w-3.5 text-zinc-300" />} label="Auth0" />
            <Pill icon={<Database className="h-3.5 w-3.5 text-emerald-300" />} label="Database" />
            <Pill icon={<Plus className="h-3.5 w-3.5 text-zinc-400" />} label="More" />
          </div>
        </Column>

        <Column
          title="The correctness graph"
          description="Every verification creates an auditable record. Complete proof. Every time."
        >
          <div className="flex items-end justify-between gap-1">
            <Step icon={<Box className="h-5 w-5" />} label="Event" accent />
            <Arrow />
            <Step icon={<CheckCircle2 className="h-5 w-5" />} label="Verification" ok />
            <Arrow />
            <Step icon={<AlertTriangle className="h-5 w-5" />} label="Divergence" danger />
            <Arrow />
            <Step icon={<ShieldCheck className="h-5 w-5" />} label="Proof" />
          </div>
        </Column>

        <Column
          title={<>Auto-recover.<br />Then verify again.</>}
          description="Detect, repair, and re-verify failures without manual intervention."
        >
          <div className="flex items-end justify-between gap-1">
            <Step icon={<AlertTriangle className="h-5 w-5" />} label="Detect" danger />
            <Arrow />
            <Step icon={<Zap className="h-5 w-5 fill-current" />} label="Recover" warn />
            <Arrow />
            <Step icon={<CheckCircle2 className="h-5 w-5" />} label="Verify" ok />
          </div>
        </Column>
      </div>
    </section>
  );
}
