import { createFileRoute, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import {
  ArrowRight,
  Check,
  HelpCircle,
  CreditCard,
  UserCheck,
  Wallet,
  KeyRound,
  AlertTriangle,
  Slack,
  Mail,
  Bell,
  Loader2,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/site/Logo";
import { siStripe, siHubspot } from "simple-icons/icons";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Get started — RevTether" },
      {
        name: "description",
        content:
          "Connect Stripe, auto-verify your revenue workflows, and see your first mismatch in under a minute.",
      },
    ],
  }),
  component: OnboardingPage,
});

type SimpleIcon = { path: string; hex: string; title: string };

function BrandMark({ icon, size = 28 }: { icon: SimpleIcon; size?: number }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: size, height: size }}
      fill={`#${icon.hex}`}
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
}

function TextMark({ label, bg, size = 28 }: { label: string; bg: string; size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-md text-[12px] font-semibold text-white"
      style={{ width: size, height: size, background: bg }}
    >
      {label}
    </div>
  );
}

const STEPS = [
  { id: 1, label: "Connect" },
  { id: 2, label: "Systems" },
  { id: 3, label: "Verify" },
  { id: 4, label: "Scan" },
  { id: 5, label: "Results" },
  { id: 6, label: "Live" },
] as const;

type StepId = (typeof STEPS)[number]["id"];

function Stepper({ current }: { current: StepId }) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {STEPS.map((s, i) => {
        const done = s.id < current;
        const active = s.id === current;
        return (
          <React.Fragment key={s.id}>
            <div className="flex items-center gap-2">
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold transition-colors ${
                  active
                    ? "bg-emerald-500 text-black"
                    : done
                      ? "border border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                      : "border border-white/15 bg-transparent text-zinc-600"
                }`}
              >
                {done ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
              </div>
              <span
                className={`hidden text-[12px] sm:inline ${
                  active
                    ? "font-medium text-white"
                    : done
                      ? "text-zinc-400"
                      : "text-zinc-600"
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="h-px w-4 bg-white/10 sm:w-6" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function StepShell({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="animate-fade-in">
      <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-400">
        {eyebrow}
      </div>
      <h1 className="mt-3 text-[36px] font-semibold leading-[1.06] tracking-[-0.025em] text-white sm:text-[40px]">
        {title}
      </h1>
      {sub && (
        <p className="mt-3 max-w-[600px] text-[14.5px] leading-relaxed text-zinc-400">
          {sub}
        </p>
      )}
      <div className="mt-10">{children}</div>
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  disabled,
  loading,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-500 px-5 py-2.5 text-[14px] font-semibold text-black transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}

function Card({
  selected,
  onClick,
  disabled,
  children,
}: {
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`group flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all ${
        selected
          ? "border-emerald-500/60 bg-emerald-500/[0.04] shadow-[0_0_0_1px_rgba(16,185,129,0.25)]"
          : "border-white/[0.07] bg-[oklch(0.17_0.012_265)] hover:border-white/15 hover:bg-[oklch(0.19_0.012_265)]"
      } ${disabled ? "cursor-default opacity-60" : "cursor-pointer"}`}
    >
      {children}
    </button>
  );
}

/* ---------------- Step 1: Connect ---------------- */

function StepConnect({ onAdvance }: { onAdvance: () => void }) {
  const [phase, setPhase] = React.useState<"idle" | "connecting" | "done">("idle");

  React.useEffect(() => {
    if (phase !== "done") return;
    const t = setTimeout(onAdvance, 1200);
    return () => clearTimeout(t);
  }, [phase, onAdvance]);

  const connect = () => {
    setPhase("connecting");
    setTimeout(() => setPhase("done"), 800);
  };

  return (
    <StepShell
      eyebrow="Step 1 of 6"
      title={
        <>
          Connect Stripe<span className="text-emerald-400">.</span>
        </>
      }
      sub="We'll read your last 30 days of revenue events. Read-only — we never modify your data."
    >
      <div className="rounded-xl border border-white/[0.07] bg-[oklch(0.17_0.012_265)] p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/[0.06] bg-[oklch(0.16_0.012_265)]">
            <BrandMark icon={siStripe} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[15px] font-medium text-white">Stripe</div>
            <div className="text-[12.5px] text-zinc-500">
              Payments, invoices, subscriptions
            </div>
          </div>
          {phase === "idle" && (
            <PrimaryButton onClick={connect}>
              Connect Stripe <ArrowRight className="h-4 w-4" />
            </PrimaryButton>
          )}
          {phase === "connecting" && (
            <PrimaryButton loading disabled>
              Connecting…
            </PrimaryButton>
          )}
          {phase === "done" && (
            <div className="inline-flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-[13px] font-medium text-emerald-400">
              <Check className="h-4 w-4" strokeWidth={3} /> Connected
            </div>
          )}
        </div>

        {phase === "done" && (
          <div className="mt-6 animate-fade-in border-t border-white/[0.06] pt-6">
            <div className="text-[32px] font-semibold tabular-nums tracking-tight text-white">
              847 <span className="text-zinc-500">events detected</span>
            </div>
            <div className="mt-2 text-[12.5px] text-zinc-500">
              Last 30 days · 612 charges · 184 invoices · 51 subscription updates
            </div>
          </div>
        )}
      </div>
    </StepShell>
  );
}

/* ---------------- Step 2: Systems ---------------- */

type SystemId = "hubspot" | "salesforce" | "segment";

function StepSystems({ onAdvance }: { onAdvance: () => void }) {
  const [selected, setSelected] = React.useState<Set<SystemId>>(
    new Set(["hubspot"]),
  );
  const toggle = (id: SystemId) =>
    setSelected((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  return (
    <StepShell
      eyebrow="Step 2 of 6"
      title={
        <>
          Detected from your environment<span className="text-emerald-400">.</span>
        </>
      }
      sub="We saw outbound traffic to HubSpot. Add more downstream systems if you want them monitored."
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Card selected={selected.has("hubspot")} onClick={() => toggle("hubspot")}>
          <BrandMark icon={siHubspot} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <div className="text-[14px] font-medium text-white">HubSpot</div>
              <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-medium text-emerald-400">
                Detected
              </span>
            </div>
            <div className="mt-1 text-[12.5px] text-zinc-500">CRM · deals & contacts</div>
          </div>
          <div className="flex h-5 w-5 items-center justify-center rounded-md border border-emerald-500 bg-emerald-500 text-black">
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </div>
        </Card>

        <Card selected={selected.has("salesforce")} onClick={() => toggle("salesforce")}>
          <TextMark label="SF" bg="#00A1E0" />
          <div className="min-w-0 flex-1">
            <div className="text-[14px] font-medium text-white">Salesforce</div>
            <div className="mt-1 text-[12.5px] text-zinc-500">CRM · accounts & opportunities</div>
          </div>
          <div
            className={`flex h-5 w-5 items-center justify-center rounded-md border ${
              selected.has("salesforce")
                ? "border-emerald-500 bg-emerald-500 text-black"
                : "border-white/15"
            }`}
          >
            {selected.has("salesforce") && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
          </div>
        </Card>

        <Card selected={selected.has("segment")} onClick={() => toggle("segment")}>
          <TextMark label="Sg" bg="#49B881" />
          <div className="min-w-0 flex-1">
            <div className="text-[14px] font-medium text-white">Segment</div>
            <div className="mt-1 text-[12.5px] text-zinc-500">Customer data platform</div>
          </div>
          <div
            className={`flex h-5 w-5 items-center justify-center rounded-md border ${
              selected.has("segment")
                ? "border-emerald-500 bg-emerald-500 text-black"
                : "border-white/15"
            }`}
          >
            {selected.has("segment") && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
          </div>
        </Card>
      </div>

      <div className="mt-8 flex items-center justify-end">
        <PrimaryButton onClick={onAdvance} disabled={selected.size === 0}>
          Continue <ArrowRight className="h-4 w-4" />
        </PrimaryButton>
      </div>
    </StepShell>
  );
}

/* ---------------- Step 3: Verify ---------------- */

function StepVerify({ onAdvance }: { onAdvance: () => void }) {
  const checks = [
    {
      icon: CreditCard,
      title: "Payment → Record",
      desc: "Every Stripe charge lands in your CRM as a deal or contact update.",
    },
    {
      icon: KeyRound,
      title: "Payment → Access",
      desc: "Every successful payment grants the right product entitlement.",
    },
    {
      icon: Wallet,
      title: "Payment → Finance",
      desc: "Every invoice.paid is reflected in your finance system within SLA.",
    },
    {
      icon: UserCheck,
      title: "Subscription → Entitlements",
      desc: "Plan upgrades, downgrades, and cancels stay in sync with app access.",
    },
  ];
  return (
    <StepShell
      eyebrow="Step 3 of 6"
      title={
        <>
          Four checks, ready to run<span className="text-emerald-400">.</span>
        </>
      }
      sub="We generated these verification rules from your stack. No configuration required."
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {checks.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-[oklch(0.17_0.012_265)] p-4"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-emerald-500/30 bg-emerald-500/5">
              <Icon className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <div className="text-[14px] font-medium text-white">{title}</div>
                <Check className="h-3.5 w-3.5 text-emerald-400" strokeWidth={3} />
              </div>
              <div className="mt-1 text-[12.5px] leading-snug text-zinc-500">{desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="text-[12.5px] text-zinc-500">Zero configuration required.</div>
        <PrimaryButton onClick={onAdvance}>
          Start verification <ArrowRight className="h-4 w-4" />
        </PrimaryButton>
      </div>
    </StepShell>
  );
}

/* ---------------- Step 4: Scan ---------------- */

const SCAN_LINES = [
  "Reading 847 Stripe events…",
  "Cross-checking HubSpot deals…",
  "Validating entitlements…",
  "Reconciling ledger writes…",
];

function StepScan({ onAdvance }: { onAdvance: () => void }) {
  const [progress, setProgress] = React.useState(0);
  const [lineIdx, setLineIdx] = React.useState(0);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    const start = Date.now();
    const duration = 3000;
    const tick = setInterval(() => {
      const p = Math.min(100, ((Date.now() - start) / duration) * 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(tick);
        setDone(true);
      }
    }, 60);
    const lineInt = setInterval(() => {
      setLineIdx((i) => (i + 1) % SCAN_LINES.length);
    }, 750);
    return () => {
      clearInterval(tick);
      clearInterval(lineInt);
    };
  }, []);

  React.useEffect(() => {
    if (!done) return;
    const t = setTimeout(onAdvance, 900);
    return () => clearTimeout(t);
  }, [done, onAdvance]);

  return (
    <StepShell
      eyebrow="Step 4 of 6"
      title={
        done ? (
          <span className="animate-fade-in">
            3 mismatches found —{" "}
            <span className="text-rose-300">$4,180 at risk</span>
          </span>
        ) : (
          <>
            Scanning your revenue events
            <span className="text-emerald-400">…</span>
          </>
        )
      }
      sub={
        done
          ? "Reconciliation complete. Here's what we found across the last 30 days."
          : "Replaying every event end-to-end across your stack."
      }
    >
      <div className="rounded-xl border border-white/[0.07] bg-[oklch(0.17_0.012_265)] p-6">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.05]">
          <div
            className="h-full rounded-full bg-emerald-500 transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-4 flex items-center gap-2 text-[13px] text-zinc-400">
          {done ? (
            <>
              <Check className="h-4 w-4 text-emerald-400" strokeWidth={3} />
              Scan complete
            </>
          ) : (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin text-emerald-400" />
              <span className="animate-fade-in" key={lineIdx}>
                {SCAN_LINES[lineIdx]}
              </span>
            </>
          )}
        </div>
      </div>
    </StepShell>
  );
}

/* ---------------- Step 5: Results ---------------- */

function StepResults({ onAdvance }: { onAdvance: () => void }) {
  const kpis = [
    { label: "Events", value: "847" },
    { label: "Verified flows", value: "21" },
    { label: "Mismatches", value: "3", tone: "bad" as const },
    { label: "At risk", value: "$4,180", tone: "bad" as const },
  ];

  return (
    <StepShell
      eyebrow="Step 5 of 6"
      title={
        <>
          Here's the drift we caught<span className="text-emerald-400">.</span>
        </>
      }
      sub="Three silent failures your dashboards never showed you."
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-xl border border-white/[0.07] bg-[oklch(0.17_0.012_265)] p-4"
          >
            <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-500">
              {k.label}
            </div>
            <div
              className={`mt-2 text-[22px] font-semibold tabular-nums ${
                k.tone === "bad" ? "text-rose-300" : "text-white"
              }`}
            >
              {k.value}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-white/[0.07] bg-[oklch(0.17_0.012_265)] p-5">
          <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">
            Expected
          </div>
          <div className="mt-3 space-y-2 font-mono text-[12px]">
            <Row tone="ok" k="stripe.invoice.paid" v="cus_O9k · $1,240" />
            <Row tone="ok" k="hubspot.deal.stage" v="Closed Won" />
            <Row tone="ok" k="app.entitlement" v="pro · granted" />
          </div>
        </div>
        <div className="rounded-xl border border-rose-500/20 bg-rose-500/[0.03] p-5">
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-rose-300">
            <AlertTriangle className="h-3.5 w-3.5" /> Actual
          </div>
          <div className="mt-3 space-y-2 font-mono text-[12px]">
            <Row tone="ok" k="stripe.invoice.paid" v="cus_O9k · $1,240" />
            <Row tone="bad" k="hubspot.deal.stage" v="— never updated" />
            <Row tone="bad" k="app.entitlement" v="free · drift" />
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <StoryRow text="Customer paid. Onboarding never happened. Finance won't know for 23 days." />
        <StoryRow text="Subscription upgraded in Stripe. Entitlement never granted in app." />
      </div>

      <div className="mt-8 flex items-center justify-end">
        <PrimaryButton onClick={onAdvance}>
          Set up monitoring <ArrowRight className="h-4 w-4" />
        </PrimaryButton>
      </div>
    </StepShell>
  );
}

function Row({ tone, k, v }: { tone: "ok" | "bad"; k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-zinc-500">{k}</span>
      <span className={tone === "bad" ? "text-rose-300" : "text-zinc-200"}>{v}</span>
    </div>
  );
}

function StoryRow({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-white/[0.05] bg-white/[0.015] p-3">
      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-300" />
      <div className="text-[13px] leading-relaxed text-zinc-300">{text}</div>
    </div>
  );
}

/* ---------------- Step 6: Monitoring ---------------- */

type Channel = "slack" | "email" | "both";

function StepMonitoring({ onLaunch }: { onLaunch: () => void }) {
  const [channel, setChannel] = React.useState<Channel>("slack");

  return (
    <StepShell
      eyebrow="Step 6 of 6"
      title={
        <>
          How would you like to be notified<span className="text-emerald-400">?</span>
        </>
      }
      sub="We'll send you a single, evidence-grade alert the moment drift happens."
    >
      <div className="grid grid-cols-3 gap-3">
        <ChannelCard
          active={channel === "slack"}
          onClick={() => setChannel("slack")}
          icon={<Slack className="h-4 w-4" />}
          label="Slack"
          sub="#revenue-alerts"
        />
        <ChannelCard
          active={channel === "email"}
          onClick={() => setChannel("email")}
          icon={<Mail className="h-4 w-4" />}
          label="Email"
          sub="On-call rotation"
        />
        <ChannelCard
          active={channel === "both"}
          onClick={() => setChannel("both")}
          icon={<Bell className="h-4 w-4" />}
          label="Both"
          sub="Maximum coverage"
        />
      </div>

      <div className="mt-5 rounded-xl border border-white/[0.07] bg-[oklch(0.17_0.012_265)] p-5">
        <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">
          Live preview
        </div>
        <div className="mt-3 animate-fade-in" key={channel}>
          {channel === "email" ? (
            <EmailPreview />
          ) : channel === "both" ? (
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <SlackPreview />
              <EmailPreview />
            </div>
          ) : (
            <SlackPreview />
          )}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-end">
        <PrimaryButton onClick={onLaunch}>
          Launch RevTether <Sparkles className="h-4 w-4" />
        </PrimaryButton>
      </div>
    </StepShell>
  );
}

function ChannelCard({
  active,
  onClick,
  icon,
  label,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  sub: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all ${
        active
          ? "border-emerald-500/60 bg-emerald-500/[0.04] shadow-[0_0_0_1px_rgba(16,185,129,0.25)]"
          : "border-white/[0.07] bg-[oklch(0.17_0.012_265)] hover:border-white/15"
      }`}
    >
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-md ${
          active
            ? "bg-emerald-500/15 text-emerald-300"
            : "border border-white/10 bg-white/[0.02] text-zinc-400"
        }`}
      >
        {icon}
      </div>
      <div className="text-[14px] font-medium text-white">{label}</div>
      <div className="text-[12px] text-zinc-500">{sub}</div>
    </button>
  );
}

function SlackPreview() {
  return (
    <div className="rounded-lg border border-white/[0.06] bg-[oklch(0.13_0.01_265)] p-4">
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded bg-emerald-500/15 text-emerald-300">
          <Slack className="h-3.5 w-3.5" />
        </div>
        <div className="text-[12.5px] font-semibold text-white">RevTether</div>
        <div className="text-[11px] text-zinc-500">APP · 12:04 PM</div>
      </div>
      <div className="mt-2 border-l-2 border-rose-400/60 pl-3">
        <div className="text-[13px] font-medium text-white">
          Mismatch detected · $1,240 at risk
        </div>
        <div className="mt-1 text-[12px] text-zinc-400">
          <span className="text-emerald-300">stripe.invoice.paid</span> →{" "}
          <span className="text-rose-300">hubspot.deal.stage never updated</span>
        </div>
        <div className="mt-2 text-[11px] text-zinc-500">
          customer · cus_O9k · evt_3PqK… · 23s ago
        </div>
      </div>
    </div>
  );
}

function EmailPreview() {
  return (
    <div className="rounded-lg border border-white/[0.06] bg-[oklch(0.13_0.01_265)] p-4">
      <div className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">From</div>
      <div className="text-[12.5px] text-zinc-200">alerts@revtether.org</div>
      <div className="mt-2 text-[11px] uppercase tracking-[0.14em] text-zinc-500">Subject</div>
      <div className="text-[13px] font-medium text-white">
        [RevTether] Mismatch · $1,240 at risk
      </div>
      <div className="mt-3 border-t border-white/[0.05] pt-3 text-[12px] leading-relaxed text-zinc-400">
        A Stripe invoice was paid but the corresponding HubSpot deal was never moved
        to Closed Won. Customer <span className="text-zinc-200">cus_O9k</span> may not
        be onboarded.
      </div>
    </div>
  );
}

/* ---------------- Page ---------------- */

function OnboardingPage() {
  const [step, setStep] = React.useState<StepId>(1);
  const navigate = useNavigate();

  const advance = React.useCallback(() => {
    setStep((s) => (s < 6 ? ((s + 1) as StepId) : s));
  }, []);

  const launch = () => {
    toast.success("RevTether is now monitoring your revenue systems.");
    navigate({ to: "/app" });
  };

  return (
    <main
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "Inter, ui-sans-serif, system-ui" }}
    >
      <header className="border-b border-white/[0.06]">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-4 lg:px-10">
          <Logo />
          <button className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.02] px-3 py-1.5 text-[12.5px] text-zinc-300 hover:bg-white/[0.05]">
            <HelpCircle className="h-3.5 w-3.5" /> Need help?
          </button>
        </div>
      </header>

      <div className="border-b border-white/[0.06]">
        <div className="mx-auto flex max-w-[1100px] items-center justify-center px-6 py-5 lg:px-10">
          <Stepper current={step} />
        </div>
      </div>

      <section className="mx-auto max-w-[1100px] px-6 pb-24 pt-12 lg:px-10">
        {step === 1 && <StepConnect key="1" onAdvance={advance} />}
        {step === 2 && <StepSystems key="2" onAdvance={advance} />}
        {step === 3 && <StepVerify key="3" onAdvance={advance} />}
        {step === 4 && <StepScan key="4" onAdvance={advance} />}
        {step === 5 && <StepResults key="5" onAdvance={advance} />}
        {step === 6 && <StepMonitoring key="6" onLaunch={launch} />}
      </section>
    </main>
  );
}
