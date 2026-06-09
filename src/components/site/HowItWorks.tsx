import { MoreHorizontal } from "lucide-react";
import {
  SiStripe,
  SiHubspot,
  SiSalesforce,
  SiShopify,
  SiPaypal,
  SiGoogleanalytics,
} from "react-icons/si";
import type { ReactNode } from "react";

/* ---------- System tiles ---------- */

function Tile({
  children,
  bg,
  ring,
  size = 52,
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

const StripeTile = ({ size = 44 }: { size?: number }) => (
  <Tile bg="bg-[#635bff]" ring="" size={size}>
    <SiStripe className="h-5 w-5 text-white" />
  </Tile>
);

const ShopifyBrandTile = ({ size = 44 }: { size?: number }) => (
  <Tile bg="bg-[#95bf47]" ring="" size={size}>
    <SiShopify className="h-5 w-5 text-white" />
  </Tile>
);

const PaypalBrandTile = ({ size = 44 }: { size?: number }) => (
  <Tile bg="bg-[#003087]" ring="" size={size}>
    <SiPaypal className="h-5 w-5 text-white" />
  </Tile>
);

const HubSpotTile = () => (
  <Tile bg="bg-[#ff7a59]/15" ring="ring-1 ring-[#ff7a59]/30">
    <SiHubspot className="h-6 w-6 text-[#ff7a59]" />
  </Tile>
);

const SegmentLogo = ({ className = "h-6 w-6" }: { className?: string }) => (
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
    <SiSalesforce className="h-7 w-7 text-[#00a1e0]" />
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

/* ---------- Vertical dashed connector (inside verification card) ---------- */

function VArrow() {
  return (
    <div className="flex flex-col items-center" aria-hidden>
      <div
        className="h-6 w-px"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, oklch(0.7 0.18 145 / 0.55) 50%, transparent 50%)",
          backgroundSize: "1px 6px",
        }}
      />
      <svg width="10" height="8" viewBox="0 0 10 8" className="text-primary/70">
        <path d="M5 7L1 2h8z" fill="currentColor" />
      </svg>
    </div>
  );
}

/* ---------- Horizontal dashed arrow (between outer cards) ---------- */

function ArrowDashed() {
  return (
    <div className="hidden items-center justify-center self-center lg:flex" aria-hidden>
      <div className="flex w-full items-center">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
        <div
          className="h-px flex-1"
          style={{
            backgroundImage:
              "linear-gradient(to right, oklch(0.7 0.18 145 / 0.6) 50%, transparent 50%)",
            backgroundSize: "6px 1px",
          }}
        />
        <svg width="10" height="10" viewBox="0 0 10 10" className="shrink-0 text-primary/80">
          <path d="M1 5h7M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
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

      <h3 className="text-center text-[20px] font-semibold text-white">
        Verification across systems
      </h3>
      <p className="mx-auto mt-2 max-w-[320px] text-center text-[13.5px] leading-relaxed text-zinc-400">
        RevTether checks that every event reached and updated each connected system as expected.
      </p>

      {/* Sources */}
      <div className="mt-7 text-center text-[10.5px] font-medium uppercase tracking-[0.18em] text-zinc-500">
        Sources
      </div>
      <div className="mt-3 flex items-center justify-center gap-5">
        <div className="flex flex-col items-center gap-2">
          <StripeTile />
          <span className="text-[12px] text-zinc-300">Stripe</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <ShopifyBrandTile />
          <span className="text-[12px] text-zinc-300">Shopify</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <PaypalBrandTile />
          <span className="text-[12px] text-zinc-300">PayPal</span>
        </div>
      </div>

      {/* down */}
      <div className="mt-4 flex justify-center">
        <VArrow />
      </div>

      {/* hub */}
      <div className="mt-3 flex justify-center">
        <div className="relative">
          <span className="absolute inset-0 -z-10 animate-pulse rounded-full bg-primary/20 blur-md" />
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-primary/60 bg-background text-[15px] font-bold text-primary ring-4 ring-primary/10">
            R
          </div>
        </div>
      </div>

      {/* down */}
      <div className="mt-3 flex justify-center">
        <VArrow />
      </div>

      {/* Destinations */}
      <div className="mt-4 text-center text-[10.5px] font-medium uppercase tracking-[0.18em] text-zinc-500">
        Destinations
      </div>
      <div className="mt-3 grid grid-cols-4 gap-3">
        <div className="flex flex-col items-center gap-2">
          <HubSpotTile />
          <span className="text-[12px] text-zinc-300">HubSpot</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <SalesforceTile />
          <span className="text-[12px] text-zinc-300">Salesforce</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <SegmentTile />
          <span className="text-[12px] text-zinc-300">Segment</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <GATile />
          <span className="text-[12px] text-zinc-300">GA4</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Side card (step 1) ---------- */

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
    <div className="relative h-full rounded-2xl border border-white/[0.07] bg-white/[0.015] p-6">
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
        <StepNum n={step} />
      </div>
      <div className="mt-3 flex h-[84px] items-center justify-center">{icon}</div>
      <h3 className="mt-3 text-center text-[16px] font-semibold text-white">{title}</h3>
      <p className="mx-auto mt-2 max-w-[220px] text-center text-[13px] leading-relaxed text-zinc-400">
        {body}
      </p>
    </div>
  );
}

/* ---------- Finding card (step 3) ---------- */

function FindingCard() {
  const rows: Array<[string, ReactNode]> = [
    ["Expected", <span className="text-zinc-200">HubSpot contact created</span>],
    ["Actual", <span className="text-rose-300">No contact record found</span>],
    [
      "Revenue at risk",
      <span className="font-mono text-zinc-200">$1,200 / mo</span>,
    ],
    ["Detected", <span className="text-zinc-300">2 min after payment</span>],
  ];
  return (
    <div className="relative h-full rounded-2xl border border-white/[0.07] bg-white/[0.015] p-6">
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
        <StepNum n={3} />
      </div>
      <div className="mt-3 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-rose-400 shadow-[0_0_10px_2px_rgb(244_63_94_/_0.55)]" />
        <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">
          Finding · F-1042
        </span>
      </div>
      <h3 className="mt-1.5 text-[16px] font-semibold text-white">CRM update missing</h3>

      <dl className="mt-4 divide-y divide-white/[0.06] border-t border-white/[0.06]">
        {rows.map(([label, value], i) => (
          <div key={i} className="grid grid-cols-[110px_1fr] gap-3 py-2.5">
            <dt className="text-[10.5px] uppercase tracking-[0.14em] text-zinc-500">{label}</dt>
            <dd className="text-[13px] leading-snug">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ---------- Logo strip ---------- */

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
    <section className="mx-auto max-w-[1280px] px-6 py-12 lg:px-10 lg:py-16">
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

      <div className="mt-10 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[0.75fr_24px_1.4fr_24px_0.95fr] lg:gap-3">
        <SideCard
          step={1}
          title="Revenue event occurs"
          body="We capture and normalize critical events from your billing and payment systems."
          icon={
            <div className="flex items-center gap-2.5">
              <StripeTile size={40} />
              <ShopifyBrandTile size={40} />
            </div>
          }
        />

        <ArrowDashed />

        <VerificationCard />

        <ArrowDashed />

        <FindingCard />
      </div>

      <div className="mt-10 text-center">
        <p className="text-[14px] text-zinc-500">Works with the systems you already use.</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          <LogoStripItem icon={<SiStripe className="h-4 w-4" />} label="Stripe" />
          <LogoStripItem icon={<SiPaypal className="h-4 w-4" />} label="PayPal" />
          <LogoStripItem icon={<SiHubspot className="h-4 w-4" />} label="HubSpot" />
          <LogoStripItem icon={<SiSalesforce className="h-4 w-4" />} label="Salesforce" />
          <LogoStripItem icon={<SiShopify className="h-4 w-4" />} label="Shopify" />
          <LogoStripItem icon={<SegmentLogo className="h-4 w-4" />} label="Segment" />
          <LogoStripItem icon={<SiGoogleanalytics className="h-4 w-4" />} label="Google Analytics" />
          <LogoStripItem icon={<MoreHorizontal className="h-4 w-4" />} label="& more" />
        </div>
      </div>
    </section>
  );
}
