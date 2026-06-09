import { AlertTriangle, Clock, Target, Shield, MoreHorizontal } from "lucide-react";
import {
  SiStripe,
  SiHubspot,
  SiSalesforce,
  SiShopify,
  
  SiGoogleanalytics,
} from "react-icons/si";
import type { ReactNode } from "react";

/* ---------- System tiles ---------- */

function Tile({
  children,
  bg,
  ring,
  size = 56,
}: {
  children: ReactNode;
  bg: string;
  ring: string;
  size?: number;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl ${bg} ${ring}`}
      style={{ height: size, width: size }}
    >
      {children}
    </div>
  );
}

const StripeTile = () => (
  <Tile bg="bg-[#635bff]" ring="" size={48}>
    <SiStripe className="h-6 w-6 text-white" />
  </Tile>
);

const ShopifyBrandTile = () => (
  <Tile bg="bg-[#95bf47]" ring="" size={48}>
    <SiShopify className="h-6 w-6 text-white" />
  </Tile>
);

const HubSpotTile = () => (
  <Tile bg="bg-[#ff7a59]/15" ring="ring-1 ring-[#ff7a59]/30">
    <SiHubspot className="h-7 w-7 text-[#ff7a59]" />
  </Tile>
);

const SegmentLogo = ({ className = "h-7 w-7" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M16.4 12.7H1.6a1.2 1.2 0 110-2.4h14.8a1.2 1.2 0 110 2.4zM22.4 7.1h-13a1.2 1.2 0 010-2.4h13a1.2 1.2 0 010 2.4zM14.6 18.3h-13a1.2 1.2 0 010-2.4h13a1.2 1.2 0 010 2.4z" />
    <circle cx="20.5" cy="17.1" r="1.5" />
    <circle cx="3.5" cy="6.9" r="1.5" />
  </svg>
);
const SegmentTile = () => (
  <Tile bg="bg-[#52bd95]/15" ring="ring-1 ring-[#52bd95]/30">
    <SegmentLogo className="h-6 w-6 text-[#52bd95]" />
  </Tile>
);

const GATile = () => (
  <Tile bg="bg-[#f9ab00]/10" ring="ring-1 ring-[#f9ab00]/30">
    <SiGoogleanalytics className="h-6 w-6 text-[#f9ab00]" />
  </Tile>
);

const SalesforceTile = () => (
  <Tile bg="bg-[#00a1e0]/15" ring="ring-1 ring-[#00a1e0]/30">
    <SiSalesforce className="h-8 w-8 text-[#00a1e0]" />
  </Tile>
);

const ShopifyTile = () => (
  <Tile bg="bg-[#95bf47]/15" ring="ring-1 ring-[#95bf47]/30">
    <SiShopify className="h-7 w-7 text-[#95bf47]" />
  </Tile>
);

const MoreTile = () => (
  <Tile bg="bg-white/[0.04]" ring="ring-1 ring-white/10">
    <MoreHorizontal className="h-6 w-6 text-zinc-400" />
  </Tile>
);

/* ---------- Step number badge ---------- */

function StepNum({ n }: { n: number }) {
  return (
    <div className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-primary/50 bg-background text-[12px] font-semibold text-primary">
      {n}
    </div>
  );
}

function ArrowDashed() {
  return (
    <div className="hidden flex-1 items-center justify-center px-2 lg:flex" aria-hidden>
      <div className="flex w-full items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        <div
          className="h-px flex-1"
          style={{
            backgroundImage:
              "linear-gradient(to right, oklch(0.7 0.18 145 / 0.5) 50%, transparent 50%)",
            backgroundSize: "8px 1px",
          }}
        />
        <span className="h-2 w-2 rounded-full border border-white/40" />
        <svg width="10" height="10" viewBox="0 0 10 10" className="text-white/40">
          <path d="M1 5h7M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
      </div>
    </div>
  );
}

/* ---------- Center verification card ---------- */

function VerificationCard() {
  return (
    <div className="relative rounded-2xl border border-primary/40 bg-primary/[0.03] p-8 ring-1 ring-primary/20 shadow-[0_0_60px_-20px_oklch(0.7_0.18_145/0.35)]">
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
        <StepNum n={2} />
      </div>

      <h3 className="text-center text-[20px] font-semibold text-white">Verification across systems</h3>
      <p className="mx-auto mt-2 max-w-[300px] text-center text-[13.5px] leading-relaxed text-zinc-400">
        RevTether checks that the event reached and updated each connected system as expected.
      </p>

      <div className="mt-8 grid grid-cols-3 gap-6">
        <div className="flex flex-col items-center gap-2">
          <HubSpotTile />
          <span className="text-[12.5px] text-zinc-300">HubSpot</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <SegmentTile />
          <span className="text-[12.5px] text-zinc-300">Segment</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <GATile />
          <span className="text-[12.5px] text-zinc-300">Google Analytics</span>
        </div>
      </div>

      <div className="relative my-5 flex items-center justify-center">
        <div
          className="absolute left-8 right-8 top-1/2 h-px -translate-y-1/2"
          style={{
            backgroundImage:
              "linear-gradient(to right, oklch(0.7 0.18 145 / 0.4) 50%, transparent 50%)",
            backgroundSize: "6px 1px",
          }}
          aria-hidden
        />
        <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-primary/60 bg-background text-[14px] font-bold text-primary">
          R
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col items-center gap-2">
          <SalesforceTile />
          <span className="text-[12.5px] text-zinc-300">Salesforce</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <ShopifyTile />
          <span className="text-[12.5px] text-zinc-300">Shopify</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <MoreTile />
          <span className="text-[12.5px] text-zinc-400">&amp; more</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Side cards ---------- */

function SideCard({
  step,
  title,
  body,
  icon,
}: {
  step: number;
  title: string;
  body: string;
  icon: ReactNode;
}) {
  return (
    <div className="relative h-full rounded-2xl border border-white/[0.07] bg-white/[0.015] p-8">
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
        <StepNum n={step} />
      </div>
      <div className="mt-4 flex h-[120px] items-center justify-center">{icon}</div>
      <h3 className="mt-4 text-center text-[18px] font-semibold text-white">{title}</h3>
      <p className="mx-auto mt-3 max-w-[260px] text-center text-[13.5px] leading-relaxed text-zinc-400">
        {body}
      </p>
    </div>
  );
}

/* ---------- Feature row ---------- */

function FeatureItem({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full ring-1 ring-primary/30 text-primary">
        {icon}
      </div>
      <div>
        <div className="text-[15px] font-semibold text-white">{title}</div>
        <p className="mt-1 text-[13.5px] leading-relaxed text-zinc-400">{children}</p>
      </div>
    </div>
  );
}

function LogoStripItem({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-zinc-400">
      <span className="text-zinc-500">{icon}</span>
      <span className="text-[14px]">{label}</span>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[820px] text-center">
        <h2 className="text-[32px] font-semibold tracking-[-0.02em] text-white sm:text-[44px] sm:leading-[1.1]">
          RevTether <span className="text-primary">checks the chain</span>
          <br />
          after every critical revenue event.
        </h2>
        <p className="mt-5 text-[15px] text-zinc-400">
          From capture to verification to investigation—automatically.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1fr_28px_1.15fr_28px_1fr] lg:gap-3">
        <SideCard
          step={1}
          title="Revenue event occurs"
          body="We capture and normalize critical revenue events from your billing and payment systems."
          icon={
            <div className="flex items-center gap-3">
              <StripeTile />
              <ShopifyBrandTile />
            </div>
          }
        />

        <ArrowDashed />

        <VerificationCard />

        <ArrowDashed />

        <SideCard
          step={3}
          title="Break detected"
          body="If something breaks, we alert you with context, impact, and everything your team needs to investigate."
          icon={
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-rose-500/15 ring-1 ring-rose-500/40">
              <AlertTriangle className="h-7 w-7 text-rose-400" strokeWidth={2} />
            </div>
          }
        />
      </div>

      <div className="mt-10 rounded-2xl border border-white/[0.07] bg-white/[0.015] px-8 py-7">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <FeatureItem icon={<Clock className="h-5 w-5" />} title="Real-time detection">
            Catches issues within minutes, not weeks.
          </FeatureItem>
          <FeatureItem icon={<Target className="h-5 w-5" />} title="Complete visibility">
            See the full propagation path across all systems.
          </FeatureItem>
          <FeatureItem icon={<Shield className="h-5 w-5" />} title="Protect revenue">
            Prevent leakage and fix issues before customers are impacted.
          </FeatureItem>
        </div>
      </div>

      <div className="mt-10 text-center">
        <p className="text-[14px] text-zinc-500">Works with the systems you already use.</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          <LogoStripItem icon={<SiStripe className="h-4 w-4" />} label="Stripe" />
          <LogoStripItem icon={<SiHubspot className="h-4 w-4" />} label="HubSpot" />
          <LogoStripItem icon={<SiSalesforce className="h-4 w-4" />} label="Salesforce" />
          <LogoStripItem icon={<SiShopify className="h-4 w-4" />} label="Shopify" />
          <LogoStripItem icon={<SiSegment className="h-4 w-4" />} label="Segment" />
          <LogoStripItem icon={<SiGoogleanalytics className="h-4 w-4" />} label="Google Analytics" />
          <LogoStripItem icon={<MoreHorizontal className="h-4 w-4" />} label="& more" />
        </div>
      </div>
    </section>
  );
}
