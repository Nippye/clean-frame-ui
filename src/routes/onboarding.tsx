import { createFileRoute, Link } from "@tanstack/react-router";
import * as React from "react";
import {
  ArrowRight,
  Check,
  HelpCircle,
  Lock,
  Workflow,
  Search,
  ShieldCheck,
  Quote,
} from "lucide-react";
import { Logo } from "@/components/site/Logo";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Connect your revenue stack — RevTether" },
      {
        name: "description",
        content:
          "Step 1 of RevTether onboarding. Connect the billing, CRM, and analytics systems that power your revenue workflows.",
      },
    ],
  }),
  component: OnboardingPage,
});

/* ---------------- Brand badges (Simple Icons) ---------------- */

import {
  siStripe,
  siShopify,
  siPaypal,
  siHubspot,
  siGoogleanalytics,
  siMixpanel,
} from "simple-icons/icons";

type SimpleIcon = { path: string; hex: string; title: string };

function BrandBadge({ icon }: { icon: SimpleIcon }) {
  return (
    <div
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-[oklch(0.16_0.012_265)]"
      aria-label={icon.title}
    >
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7"
        fill={`#${icon.hex}`}
      >
        <title>{icon.title}</title>
        <path d={icon.path} />
      </svg>
    </div>
  );
}

const StripeLogo = () => <BrandBadge icon={siStripe} />;
const ShopifyLogo = () => <BrandBadge icon={siShopify} />;
const PayPalLogo = () => <BrandBadge icon={siPaypal} />;
const ChargebeeLogo = () => <BrandBadge icon={siChargebee} />;
const HubSpotLogo = () => <BrandBadge icon={siHubspot} />;
const SalesforceLogo = () => <BrandBadge icon={siSalesforce} />;
const PipedriveLogo = () => <BrandBadge icon={siPipedrive} />;
const SegmentLogo = () => <BrandBadge icon={siSegment} />;
const GA4Logo = () => <BrandBadge icon={siGoogleanalytics} />;
const MixpanelLogo = () => <BrandBadge icon={siMixpanel} />;
const MoreLogo = () => (
  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-dashed border-white/15 text-[18px] font-semibold text-zinc-400">
    +
  </div>
);

/* ---------------- Small components ---------------- */

type Integration = {
  id: string;
  name: string;
  desc: string;
  logo: React.ReactNode;
  recommended?: boolean;
  disabled?: boolean;
};

function IntegrationCard({
  item,
  selected,
  onToggle,
}: {
  item: Integration;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={item.disabled}
      className={`group relative flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all ${
        selected
          ? "border-emerald-500/60 bg-emerald-500/[0.04] shadow-[0_0_0_1px_rgba(16,185,129,0.25)]"
          : "border-white/[0.07] bg-[oklch(0.17_0.012_265)] hover:border-white/15 hover:bg-[oklch(0.19_0.012_265)]"
      } ${item.disabled ? "cursor-default opacity-60" : "cursor-pointer"}`}
    >
      {item.logo}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <div className="text-[14px] font-medium text-white">{item.name}</div>
          {item.recommended && (
            <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-medium text-emerald-400">
              Recommended
            </span>
          )}
        </div>
        <div className="mt-1 text-[12.5px] leading-snug text-zinc-500">
          {item.desc}
        </div>
      </div>
      <div
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
          selected
            ? "border-emerald-500 bg-emerald-500 text-black"
            : "border-white/15 bg-transparent"
        }`}
      >
        {selected && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
      </div>
    </button>
  );
}

function GroupHeader({
  index,
  title,
  count,
  selectedCount,
}: {
  index: number;
  title: string;
  count: number;
  selectedCount: number;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-[11px] font-medium text-zinc-400">
          {index}
        </div>
        <div className="text-[13px] font-semibold text-white">{title}</div>
        <div className="text-[12px] text-zinc-500">{count} integrations</div>
      </div>
      <div className="text-[12px] text-zinc-500">
        {selectedCount} selected
      </div>
    </div>
  );
}

function Step({
  n,
  label,
  state,
}: {
  n: number;
  label: string;
  state: "done" | "active" | "todo";
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold ${
          state === "active"
            ? "bg-emerald-500 text-black"
            : state === "done"
              ? "border border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
              : "border border-white/10 bg-white/[0.02] text-zinc-500"
        }`}
      >
        {state === "done" ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : n}
      </div>
      <div
        className={`truncate text-[13px] ${
          state === "active"
            ? "font-medium text-white"
            : state === "done"
              ? "text-zinc-300"
              : "text-zinc-500"
        }`}
      >
        {label}
      </div>
    </div>
  );
}

function StackRow({ logos, names }: { logos: React.ReactNode[]; names: string[] }) {
  return (
    <div className="rounded-lg border border-white/[0.06] bg-[oklch(0.16_0.012_265)] p-3">
      <div className="flex items-center gap-2">
        {logos.map((l, i) => (
          <React.Fragment key={i}>
            <div className="scale-[0.72]">{l}</div>
            {i < logos.length - 1 && (
              <ArrowRight className="h-3 w-3 text-zinc-600" />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-2 text-[11.5px] leading-snug text-zinc-500">
        {names.join(" → ")}
      </div>
    </div>
  );
}

/* ---------------- Page ---------------- */

const billing: Integration[] = [
  { id: "stripe", name: "Stripe", desc: "Payments, invoices, subscriptions", logo: <StripeLogo />, recommended: true },
  { id: "shopify", name: "Shopify", desc: "Orders, checkouts, refunds", logo: <ShopifyLogo /> },
  { id: "paypal", name: "PayPal", desc: "Payments and payouts", logo: <PayPalLogo /> },
  { id: "chargebee", name: "Chargebee", desc: "Subscription billing", logo: <ChargebeeLogo /> },
];
const crm: Integration[] = [
  { id: "hubspot", name: "HubSpot", desc: "Contacts, deals, pipelines", logo: <HubSpotLogo />, recommended: true },
  { id: "salesforce", name: "Salesforce", desc: "Accounts, opportunities", logo: <SalesforceLogo /> },
  { id: "pipedrive", name: "Pipedrive", desc: "Sales pipeline & deals", logo: <PipedriveLogo /> },
  { id: "more-crm", name: "More CRMs", desc: "Zoho, Close, Attio & others", logo: <MoreLogo />, disabled: true },
];
const analytics: Integration[] = [
  { id: "segment", name: "Segment", desc: "Customer data platform", logo: <SegmentLogo /> },
  { id: "ga4", name: "Google Analytics 4", desc: "Web & product analytics", logo: <GA4Logo /> },
  { id: "mixpanel", name: "Mixpanel", desc: "Product analytics events", logo: <MixpanelLogo /> },
  { id: "more-analytics", name: "More tools", desc: "Amplitude, PostHog & others", logo: <MoreLogo />, disabled: true },
];

function OnboardingPage() {
  const [selected, setSelected] = React.useState<Set<string>>(
    new Set(["stripe", "hubspot", "segment"]),
  );
  const toggle = (id: string) =>
    setSelected((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  const count = (group: Integration[]) =>
    group.filter((g) => selected.has(g.id)).length;
  const totalSelected = selected.size;

  return (
    <main className="min-h-screen bg-background text-foreground" style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}>
      {/* Top navbar */}
      <header className="border-b border-white/[0.06]">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 lg:px-10">
          <Link to="/" className="flex items-center"><Logo /></Link>
          <button className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.02] px-3 py-1.5 text-[12.5px] text-zinc-300 hover:bg-white/[0.05]">
            <HelpCircle className="h-3.5 w-3.5" /> Need help?
          </button>
        </div>
      </header>

      {/* Progress */}
      <div className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-[1280px] px-6 py-5 lg:px-10">
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-5">
            <Step n={1} label="Connect systems" state="active" />
            <Step n={2} label="Configure events" state="todo" />
            <Step n={3} label="Connect channel" state="todo" />
            <Step n={4} label="Run verification" state="todo" />
            <Step n={5} label="See your first finding" state="todo" />
          </div>
          <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/[0.05]">
            <div className="h-full w-1/5 rounded-full bg-emerald-500" />
          </div>
        </div>
      </div>

      {/* Body */}
      <section className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-6 pb-24 pt-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12 lg:px-10">
        {/* LEFT */}
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-400">
            Step 1 of 5
          </div>
          <h1 className="mt-3 text-[40px] font-semibold leading-[1.05] tracking-[-0.025em] text-white">
            Connect your revenue stack<span className="text-emerald-400">.</span>
          </h1>
          <p className="mt-3 max-w-[560px] text-[14.5px] leading-relaxed text-zinc-400">
            Connect the systems that power your revenue workflows. We'll monitor how events flow across your stack.
          </p>

          <div className="mt-10 space-y-10">
            <div>
              <GroupHeader index={1} title="Billing & Payments" count={billing.length} selectedCount={count(billing)} />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {billing.map((i) => (
                  <IntegrationCard key={i.id} item={i} selected={selected.has(i.id)} onToggle={() => toggle(i.id)} />
                ))}
              </div>
            </div>

            <div>
              <GroupHeader index={2} title="CRM" count={crm.length} selectedCount={count(crm)} />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {crm.map((i) => (
                  <IntegrationCard key={i.id} item={i} selected={selected.has(i.id)} onToggle={() => toggle(i.id)} />
                ))}
              </div>
            </div>

            <div>
              <GroupHeader index={3} title="Analytics & Data" count={analytics.length} selectedCount={count(analytics)} />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {analytics.map((i) => (
                  <IntegrationCard key={i.id} item={i} selected={selected.has(i.id)} onToggle={() => toggle(i.id)} />
                ))}
              </div>
            </div>
          </div>

          {/* Continue */}
          <div className="mt-12 rounded-xl border border-white/[0.07] bg-[oklch(0.17_0.012_265)] p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-[13px] font-medium text-white">
                  {totalSelected} {totalSelected === 1 ? "integration" : "integrations"} selected
                </div>
                <div className="mt-1 inline-flex items-center gap-1.5 text-[12px] text-zinc-500">
                  <Lock className="h-3 w-3" /> All connections are read-only. We never modify your data.
                </div>
              </div>
              <button
                disabled={totalSelected === 0}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-500 px-5 py-2.5 text-[14px] font-semibold text-black transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-xl border border-white/[0.07] bg-[oklch(0.17_0.012_265)] p-5">
            <div className="text-[13px] font-semibold text-white">What happens next?</div>
            <div className="mt-4 space-y-4">
              {[
                { Icon: Workflow, t: "We'll map your event flow", d: "Trace invoice.paid, checkout.completed and more across your stack." },
                { Icon: Search, t: "We'll find what's missing", d: "Surface CRM updates, ledger writes and webhooks that never landed." },
                { Icon: ShieldCheck, t: "You'll protect revenue", d: "Get evidence-grade findings before customers feel the impact." },
              ].map(({ Icon, t, d }) => (
                <div key={t} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-emerald-500/30 bg-emerald-500/5">
                    <Icon className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-[13px] font-medium text-white">{t}</div>
                    <div className="mt-0.5 text-[12px] leading-snug text-zinc-500">{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-white/[0.07] bg-[oklch(0.17_0.012_265)] p-5">
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
              Popular stacks connected by RevTether
            </div>
            <div className="mt-4 space-y-2.5">
              <StackRow
                logos={[<StripeLogo />, <HubSpotLogo />, <SegmentLogo />, <GA4Logo />]}
                names={["Stripe", "HubSpot", "Segment", "GA4"]}
              />
              <StackRow
                logos={[<ShopifyLogo />, <HubSpotLogo />, <SalesforceLogo />, <SegmentLogo />]}
                names={["Shopify", "HubSpot", "Salesforce", "Segment"]}
              />
              <StackRow
                logos={[<StripeLogo />, <HubSpotLogo />, <SegmentLogo />, <MixpanelLogo />]}
                names={["Stripe", "HubSpot", "Segment", "Mixpanel"]}
              />
            </div>
          </div>

          <div className="rounded-xl border border-white/[0.07] bg-[oklch(0.17_0.012_265)] p-5">
            <Quote className="h-4 w-4 text-emerald-400" />
            <p className="mt-3 text-[13px] leading-relaxed text-zinc-300">
              "RevTether caught $42k in silent CRM drift in our first week. It's now the first thing we check when revenue numbers look off."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-500/10 text-[12px] font-semibold text-emerald-300">
                MR
              </div>
              <div>
                <div className="text-[12.5px] font-medium text-white">Maya Reyes</div>
                <div className="text-[11.5px] text-zinc-500">Head of RevOps, Northwind</div>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
