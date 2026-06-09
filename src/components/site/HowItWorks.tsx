import {
  AlertTriangle,
  Clock,
  Target,
  Shield,
  MoreHorizontal,
} from "lucide-react";
import type { ReactNode } from "react";

/* ---------- Brand icons ---------- */

function StripeIcon() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#3b3fe4]">
      <span className="text-xl font-bold italic text-white">S</span>
    </div>
  );
}

function ShopifyTile() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#95bf47]">
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="#1a1a1a">
        <path d="M15.5 4.5c-.3 0-.6.1-.9.2-.4-1.1-1.2-2.2-2.6-2.2-.1 0-.2 0-.3.1C11.3 2 10.8 1.8 10.3 1.8 7.5 1.8 6.2 5.3 5.8 7.1l-2 .6c-.6.2-.6.2-.7.8L1.5 21.6l11 2.1V4.5h3zm-3 1.4v1c-.7.2-1.4.5-2.2.8 0-1 .2-1.9.5-2.6.3.2.6.5.8.8h.9zm-3.2-2.4c.2 0 .4.1.5.2-.5.4-.9 1-1.2 1.7-.3.7-.5 1.7-.6 2.7-.6.2-1.2.4-1.7.5.4-1.5 1.3-5.1 3-5.1z"/>
      </svg>
    </div>
  );
}

function HubSpotIcon() {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#ff7a59]/15 ring-1 ring-[#ff7a59]/30">
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="#ff7a59" strokeWidth="2">
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

function SegmentIcon() {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#5aa9ff]/15 ring-1 ring-[#5aa9ff]/30">
      <span className="text-2xl font-black text-[#5aa9ff]">▌</span>
    </div>
  );
}

function GAIcon() {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#f9ab00]/10 ring-1 ring-[#f9ab00]/30">
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="#f9ab00">
        <rect x="3" y="14" width="4" height="7" rx="1" />
        <rect x="10" y="9" width="4" height="12" rx="1" />
        <rect x="17" y="4" width="4" height="17" rx="1" />
      </svg>
    </div>
  );
}

function SalesforceIcon() {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#00a1e0]/15 ring-1 ring-[#00a1e0]/30">
      <svg viewBox="0 0 32 24" className="h-6 w-7" fill="#00a1e0">
        <path d="M12 4c1.4-1.5 3.4-2.4 5.6-2.4 2.9 0 5.4 1.6 6.7 4 .9-.4 1.9-.6 2.9-.6 3.8 0 6.8 3.1 6.8 6.9s-3.1 6.9-6.8 6.9c-.5 0-.9 0-1.3-.1-1.2 2.1-3.4 3.5-6 3.5-1.1 0-2.1-.2-3-.7-1.2 2.7-3.9 4.6-7.1 4.6-3.3 0-6.2-2.1-7.3-5-.7.2-1.4.3-2.2.3C2 21.4-1 18.4-1 14.6s3-6.8 6.8-6.8c.4 0 .8 0 1.2.1C8.4 5.1 11.1 3 14.3 3c1.5 0 2.9.4 4 1.1L12 4z"/>
      </svg>
    </div>
  );
}

function ShopifyIcon() {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#95bf47]/15 ring-1 ring-[#95bf47]/30">
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="#95bf47">
        <path d="M15.5 4.5c-.3 0-.6.1-.9.2-.4-1.1-1.2-2.2-2.6-2.2-.1 0-.2 0-.3.1C11.3 2 10.8 1.8 10.3 1.8 7.5 1.8 6.2 5.3 5.8 7.1l-2 .6c-.6.2-.6.2-.7.8L1.5 21.6l11 2.1V4.5h3z"/>
      </svg>
    </div>
  );
}

function MoreIcon() {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/[0.04] ring-1 ring-white/10">
      <MoreHorizontal className="h-6 w-6 text-zinc-400" />
    </div>
  );
}

function StepNum({ n }: { n: number; tone?: "default" | "primary" | "rose" }) {
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

/* ---------- Bottom feature row ---------- */

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

/* ---------- Center verification card ---------- */

function VerificationCard() {
  return (
    <div className="relative rounded-2xl border border-primary/40 bg-primary/[0.03] p-8 ring-1 ring-primary/20 shadow-[0_0_60px_-20px_oklch(0.7_0.18_145/0.35)]">
      {/* Step number tab */}
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
        <StepNum n={2} />
      </div>

      <h3 className="text-center text-[20px] font-semibold text-white">Verification across systems</h3>
      <p className="mx-auto mt-2 max-w-[300px] text-center text-[13.5px] leading-relaxed text-zinc-400">
        RevTether checks that the event reached and updated each connected system as expected.
      </p>

      {/* Top row systems */}
      <div className="mt-8 grid grid-cols-3 gap-6">
        <div className="flex flex-col items-center gap-2">
          <HubSpotIcon />
          <span className="text-[12.5px] text-zinc-300">HubSpot</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <SegmentIcon />
          <span className="text-[12.5px] text-zinc-300">Segment</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <GAIcon />
          <span className="text-[12.5px] text-zinc-300">Google Analytics</span>
        </div>
      </div>

      {/* Hub connector */}
      <div className="relative my-5 flex items-center justify-center">
        {/* horizontal dashed line */}
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

      {/* Bottom row systems */}
      <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col items-center gap-2">
          <SalesforceIcon />
          <span className="text-[12.5px] text-zinc-300">Salesforce</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <ShopifyIcon />
          <span className="text-[12.5px] text-zinc-300">Shopify</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <MoreIcon />
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
              <StripeIcon />
              <ShopifyTile />
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

      {/* Feature row */}
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

      {/* Logo strip */}
      <div className="mt-10 text-center">
        <p className="text-[14px] text-zinc-500">Works with the systems you already use.</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          <LogoStripItem icon={<span className="font-bold italic">S</span>} label="Stripe" />
          <LogoStripItem
            icon={
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="17" cy="14" r="4" />
                <circle cx="6" cy="6" r="2" />
                <circle cx="6" cy="18" r="2" />
                <line x1="8" y1="7" x2="14" y2="12" />
                <line x1="8" y1="17" x2="14" y2="15" />
              </svg>
            }
            label="HubSpot"
          />
          <LogoStripItem
            icon={
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M20 14c0-1.5-1-2.7-2.4-3 .2-.5.4-1 .4-1.6 0-2.2-1.8-4-4-4-1.3 0-2.5.6-3.2 1.6C10.1 6.4 9.1 6 8 6c-2.2 0-4 1.8-4 4 0 .2 0 .4.1.6C2.8 11 2 12.2 2 13.5 2 15.4 3.6 17 5.5 17h12c1.4 0 2.5-1.1 2.5-2.5z" />
              </svg>
            }
            label="Salesforce"
          />
          <LogoStripItem
            icon={
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M15.5 4.5c-.3 0-.6.1-.9.2-.4-1.1-1.2-2.2-2.6-2.2-2.8 0-4.1 3.5-4.5 5.3l-2 .6c-.6.2-.6.2-.7.8L1.5 21.6l11 2.1V4.5h3z"/>
              </svg>
            }
            label="Shopify"
          />
          <LogoStripItem
            icon={
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 8h12M8 16h12" strokeLinecap="round" />
              </svg>
            }
            label="Segment"
          />
          <LogoStripItem
            icon={
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <rect x="3" y="14" width="4" height="7" rx="1" />
                <rect x="10" y="9" width="4" height="12" rx="1" />
                <rect x="17" y="4" width="4" height="17" rx="1" />
              </svg>
            }
            label="Google Analytics"
          />
          <LogoStripItem icon={<MoreHorizontal className="h-4 w-4" />} label="& more" />
        </div>
      </div>
    </section>
  );
}
