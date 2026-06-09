import {
  Rocket,
  User,
  LineChart,
  Calendar,
  Landmark,
  Database,
  Zap,
  CircleDollarSign,
} from "lucide-react";
import type { ReactNode } from "react";

function StripeMark() {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-[18px] font-bold italic text-black">
      S
    </div>
  );
}

function HubSpotMark() {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/[0.04]">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#ff7a59" strokeWidth="2">
        <circle cx="17" cy="14" r="4" />
        <circle cx="6" cy="6" r="2" />
        <circle cx="6" cy="18" r="2" />
        <line x1="8" y1="7" x2="14" y2="12" />
        <line x1="8" y1="17" x2="14" y2="15" />
        <line x1="17" y1="10" x2="17" y2="6" />
      </svg>
    </div>
  );
}

function IconTile({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/[0.04] text-zinc-400">
      {children}
    </div>
  );
}

type NodeProps = {
  n: string;
  icon: ReactNode;
  title: string;
  detail: string;
  dim?: boolean;
};

function Node({ n, icon, title, detail, dim = false }: NodeProps) {
  return (
    <div
      className={`flex items-center gap-4 rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 transition-opacity ${
        dim ? "opacity-25" : ""
      }`}
    >
      <span className="font-mono text-[11px] tabular-nums text-zinc-500">{n}</span>
      {icon}
      <div className="min-w-0">
        <div className="text-[15px] font-semibold text-zinc-100">{title}</div>
        <div className="text-[13px] text-zinc-500">{detail}</div>
      </div>
    </div>
  );
}

function Connector({ dim = false }: { dim?: boolean }) {
  return (
    <div className="flex h-6 items-center justify-center" aria-hidden>
      <div className={`h-full w-px ${dim ? "bg-white/[0.05]" : "bg-white/[0.12]"}`} />
    </div>
  );
}

function FieldCol({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
        {label}
      </div>
      <div className="mt-2 text-[15px] text-zinc-100">{value}</div>
    </div>
  );
}

function ImpactItem({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 text-primary">{icon}</span>
      <span className="text-[14px] leading-snug text-zinc-200">{children}</span>
    </div>
  );
}

export function RevenueFailures() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 pt-8 pb-12 lg:px-10 lg:pt-10 lg:pb-14">
      <div className="mx-auto max-w-[900px] text-center">
        <h2 className="text-[32px] font-semibold tracking-[-0.02em] text-white sm:text-[40px]">
          Most revenue failures{" "}
          <span className="text-primary">don&apos;t look like outages.</span>
        </h2>
      </div>

      <div className="relative mx-auto mt-16 max-w-[760px]">
        {/* Upstream */}
        <div className="mx-auto max-w-[620px]">

          <Node
            n="01"
            icon={<StripeMark />}
            title="Payment succeeds"
            detail="Stripe charge captured · $1,200"
          />
          <Connector />
          <Node
            n="02"
            icon={<HubSpotMark />}
            title="CRM update missing"
            detail="HubSpot contact never created"
          />
        </div>

        <Connector />

        {/* Detection card */}
        <div className="rounded-2xl border border-primary/50 bg-primary/[0.04] p-7 ring-1 ring-primary/20 sm:p-8">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
              Detected by RevTether
            </span>
          </div>

          {/* Headline */}
          <h3 className="mt-5 text-[28px] font-semibold tracking-[-0.02em] text-white sm:text-[32px]">
            CRM update missing
          </h3>

          {/* Expected / Actual / Detected */}
          <div className="mt-6 grid grid-cols-1 gap-y-5 sm:grid-cols-3 sm:divide-x sm:divide-white/[0.06] sm:gap-y-0">
            <div className="sm:pr-6"><FieldCol label="Expected" value="HubSpot contact created" /></div>
            <div className="sm:px-6"><FieldCol label="Actual" value="No contact record found" /></div>
            <div className="sm:pl-6"><FieldCol label="Detected" value="2 minutes after payment" /></div>
          </div>

          {/* Divider */}
          <div className="my-7 h-px w-full bg-white/[0.06]" aria-hidden />

          {/* Potential downstream impact */}
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-400">
            Potential downstream <span className="text-primary underline underline-offset-4">impact</span>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <ImpactItem icon={<User className="h-4 w-4" />}>Onboarding never triggered</ImpactItem>
            <ImpactItem icon={<LineChart className="h-4 w-4" />}>Customer never activated</ImpactItem>
            <ImpactItem icon={<Calendar className="h-4 w-4" />}>
              Finance discovers issue<br />23 days later
            </ImpactItem>
          </div>

          {/* Divider */}
          <div className="my-6 h-px w-full bg-white/[0.06]" aria-hidden />

          {/* Metadata row */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[12px] text-zinc-400">
            <span className="inline-flex items-center gap-2">
              <Database className="h-3.5 w-3.5 text-zinc-500" />
              <span className="text-zinc-500">Affected system:</span>
              <span className="text-zinc-200">HubSpot</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <Zap className="h-3.5 w-3.5 text-zinc-500" />
              <span className="text-zinc-500">Event:</span>
              <span className="text-zinc-200">invoice.paid</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <CircleDollarSign className="h-3.5 w-3.5 text-zinc-500" />
              <span className="text-zinc-500">Revenue at risk:</span>
              <span className="text-zinc-200">$1,200/mo</span>
            </span>
          </div>
        </div>

        <Connector dim />

        {/* Downstream with bracket */}
        <div className="relative mx-auto max-w-[620px]">
          {/* Dashed bracket on the left */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-28 top-0 hidden h-full w-24 sm:block"
          >
            <div className="absolute left-[88px] top-0 h-full border-l border-dashed border-white/20" />
            <div className="absolute left-[88px] top-0 h-px w-3 bg-white/20" />
            <div className="absolute bottom-0 left-[88px] h-px w-3 bg-white/20" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 pr-3 text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-zinc-500">
              Without<br />detection —<br />what would<br />have happened
            </div>
          </div>

          <Node
            n="03"
            icon={<IconTile><Rocket className="h-4 w-4" /></IconTile>}
            title="Onboarding never triggered"
            detail="Welcome sequence not sent"
            dim
          />
          <Connector dim />
          <Node
            n="04"
            icon={<IconTile><User className="h-4 w-4" /></IconTile>}
            title="Customer never activates"
            detail="Account sits idle"
            dim
          />
          <Connector dim />
          <Node
            n="05"
            icon={<IconTile><Landmark className="h-4 w-4" /></IconTile>}
            title="Finance discovers it 23 days later"
            detail="Surfaces at month-end reconciliation"
            dim
          />
        </div>
      </div>
    </section>
  );
}
