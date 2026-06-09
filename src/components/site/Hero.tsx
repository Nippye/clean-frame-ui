import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  ArrowLeft,
  Info,
  ExternalLink,
  MoreVertical,
  CreditCard,
  Database,
  Mail,
  KeyRound,
  Sparkles,
  Play,
  XCircle,
  LayoutGrid,
  FileText,
  Box,
  GitBranch,
  Shield,
  Bell,
  BarChart3,
  PieChart,
  Settings,
  Copy,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function VerifyDot({ tone }: { tone: "ok" | "bad" }) {
  return tone === "ok" ? (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-500/30">
      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
    </span>
  ) : (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-rose-500/15 ring-1 ring-rose-500/30">
      <XCircle className="h-3.5 w-3.5 text-rose-400" />
    </span>
  );
}

type Row = {
  icon: React.ReactNode;
  name: string;
  sub: string;
  expectedTone: "ok" | "bad";
  expectedTitle: string;
  expectedSub: string;
  actualTone: "ok" | "bad";
  actualTitle: string;
  actualSub: string;
  status: "Match" | "Mismatch";
};

const rows: Row[] = [
  {
    icon: <CreditCard className="h-4 w-4 text-indigo-300" />,
    name: "Stripe Payment",
    sub: "Payment Intent",
    expectedTone: "ok",
    expectedTitle: "Succeeded",
    expectedSub: "Amount: $1,200.00 USD",
    actualTone: "ok",
    actualTitle: "Succeeded",
    actualSub: "Amount: $1,200.00 USD",
    status: "Match",
  },
  {
    icon: <Sparkles className="h-4 w-4 text-orange-300" />,
    name: "CRM (HubSpot)",
    sub: "Subscription Stage",
    expectedTone: "ok",
    expectedTitle: "Customer",
    expectedSub: "Stage: Paid",
    actualTone: "bad",
    actualTitle: "Trial",
    actualSub: "Stage: Trial",
    status: "Mismatch",
  },
  {
    icon: <KeyRound className="h-4 w-4 text-sky-300" />,
    name: "Entitlements (API)",
    sub: "Access Level",
    expectedTone: "ok",
    expectedTitle: "Active",
    expectedSub: "Plan: Pro",
    actualTone: "bad",
    actualTitle: "Inactive",
    actualSub: "Plan: Pro",
    status: "Mismatch",
  },
  {
    icon: <Database className="h-4 w-4 text-emerald-300" />,
    name: "Database (Users)",
    sub: "Subscription Status",
    expectedTone: "ok",
    expectedTitle: "active",
    expectedSub: "Renews: Jun 12, 2026",
    actualTone: "ok",
    actualTitle: "active",
    actualSub: "Renews: Jun 12, 2026",
    status: "Match",
  },
  {
    icon: <Mail className="h-4 w-4 text-fuchsia-300" />,
    name: "Welcome Email",
    sub: "Customer Onboarding",
    expectedTone: "ok",
    expectedTitle: "Sent",
    expectedSub: "Template: welcome_pro",
    actualTone: "bad",
    actualTitle: "Failed",
    actualSub: "Error: SMTP 550",
    status: "Mismatch",
  },
];

const timeline = [
  { time: "10:42:31", title: "Payment succeeded", sub: "Stripe", tone: "ok" as const },
  { time: "10:42:32", title: "CRM update failed", sub: "HubSpot", tone: "bad" as const },
  { time: "10:42:33", title: "Entitlement not activated", sub: "API", tone: "bad" as const },
  { time: "10:42:34", title: "Email delivery failed", sub: "SendGrid", tone: "bad" as const },
  { time: "10:42:40", title: "Verification complete", sub: "RevTether", tone: "ok" as const },
];

const sideIcons = [
  { I: LayoutGrid }, { I: Box }, { I: FileText, active: true },
  { I: Database }, { I: GitBranch }, { I: Shield },
  { I: Bell }, { I: BarChart3 }, { I: PieChart }, { I: Settings },
];

export function DashboardMockup() {
  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-[oklch(0.18_0.012_265)] ring-1 ring-white/10 shadow-2xl">
      <div className="flex">
        <aside className="hidden w-12 shrink-0 flex-col items-center gap-1 border-r border-white/5 bg-[oklch(0.165_0.012_265)] py-4 md:flex">
          <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-md bg-indigo-500/20 ring-1 ring-indigo-400/40">
            <ShieldCheck className="h-4 w-4 text-indigo-300" />
          </div>
          {sideIcons.map(({ I, active }, i) => (
            <button
              key={i}
              className={`flex h-8 w-8 items-center justify-center rounded-md ${
                active ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <I className="h-4 w-4" />
            </button>
          ))}
        </aside>

        <div className="min-w-0 flex-1 p-4 sm:p-5">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <button className="mb-2 inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200">
                <ArrowLeft className="h-3.5 w-3.5" /> Back to incidents
              </button>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="rounded-md border-rose-500/40 bg-rose-500/10 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-rose-300 hover:bg-rose-500/10">
                  HIGH IMPACT
                </Badge>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <h3 className="font-mono text-lg font-semibold text-white sm:text-xl">
                  payment_intent.succeeded
                </h3>
                <Badge className="rounded-md border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300 hover:bg-emerald-500/10">
                  Succeeded
                </Badge>
              </div>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-zinc-500">
                <span>May 12, 2026 at 10:42:31 AM</span>
                <span className="font-mono">evt_1N7X9A2eZvKYIo2C</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="text-right">
                <div className="flex items-center justify-end gap-1 text-[11px] text-zinc-400">
                  Revenue at risk <Info className="h-3 w-3" />
                </div>
                <div className="mt-0.5 text-xl font-semibold text-rose-400">$18,240</div>
              </div>
              <Button
                variant="outline"
                className="h-8 rounded-md border-white/15 bg-transparent px-3 text-xs text-white hover:bg-white/5"
              >
                View in Stripe <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
              <button className="text-zinc-400 hover:text-white">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_240px]">
            <div className="space-y-4">
              <div className="rounded-lg border border-white/5 bg-[oklch(0.205_0.013_265)]">
                <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-white">
                    Expected vs Actual
                    <span className="text-xs font-normal text-indigo-300">3 mismatches</span>
                  </div>
                </div>
                <div className="hidden grid-cols-[1.3fr_1.1fr_1.1fr_80px] gap-3 px-4 py-2 text-[10px] font-medium uppercase tracking-wider text-zinc-500 md:grid">
                  <span>System / Check</span>
                  <span className="flex items-center gap-1">Expected <Info className="h-2.5 w-2.5" /></span>
                  <span className="flex items-center gap-1">Actual <Info className="h-2.5 w-2.5" /></span>
                  <span className="text-right">Status</span>
                </div>
                <div className="divide-y divide-white/5">
                  {rows.map((r) => (
                    <div
                      key={r.name}
                      className="grid grid-cols-1 items-center gap-3 px-4 py-3 md:grid-cols-[1.3fr_1.1fr_1.1fr_80px]"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white/5 ring-1 ring-white/10">
                          {r.icon}
                        </span>
                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium text-white">{r.name}</div>
                          <div className="truncate text-xs text-zinc-500">{r.sub}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <VerifyDot tone={r.expectedTone} />
                        <div>
                          <div className="text-sm font-medium text-white">{r.expectedTitle}</div>
                          <div className="text-xs text-zinc-500">{r.expectedSub}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <VerifyDot tone={r.actualTone} />
                        <div>
                          <div className={`text-sm font-medium ${r.actualTone === "bad" ? "text-rose-300" : "text-white"}`}>
                            {r.actualTitle}
                          </div>
                          <div className="text-xs text-zinc-500">{r.actualSub}</div>
                        </div>
                      </div>
                      <div className="md:text-right">
                        <Badge
                          variant="outline"
                          className={`rounded-md px-2 py-0.5 text-[10px] font-medium ${
                            r.status === "Match"
                              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                              : "border-rose-500/40 bg-rose-500/10 text-rose-300"
                          }`}
                        >
                          {r.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-white/5 bg-[oklch(0.205_0.013_265)] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-sm font-medium text-white">
                      <Sparkles className="h-4 w-4 text-indigo-300" />
                      Recovery recommendation
                    </div>
                    <p className="mt-1 text-xs text-zinc-400">
                      Replay onboarding workflow and sync subscription to CRM.
                    </p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-zinc-500">
                      <span>Estimated time: <span className="text-zinc-300">23s</span></span>
                      <span>Success probability: <span className="text-emerald-400">98%</span></span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      className="h-8 rounded-md border-white/15 bg-transparent px-3 text-xs text-white hover:bg-white/5"
                    >
                      Preview recovery
                    </Button>
                    <Button className="h-8 rounded-md bg-primary px-3 text-xs text-white hover:bg-primary/90">
                      <Play className="mr-1 h-3 w-3 fill-current" /> Execute recovery
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border border-white/5 bg-[oklch(0.205_0.013_265)] p-4">
                <div className="mb-3 text-sm font-medium text-white">Event timeline</div>
                <ul className="space-y-2.5">
                  {timeline.map((t) => (
                    <li key={t.time} className="flex items-start gap-2.5">
                      <span className={`mt-0.5 flex h-4 w-4 items-center justify-center rounded-full ${
                        t.tone === "ok" ? "bg-emerald-500/15 ring-1 ring-emerald-500/30" : "bg-rose-500/15 ring-1 ring-rose-500/30"
                      }`}>
                        {t.tone === "ok"
                          ? <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                          : <XCircle className="h-3 w-3 text-rose-400" />}
                      </span>
                      <div className="min-w-0">
                        <div className="text-[11px] text-zinc-500">{t.time}</div>
                        <div className={`text-xs font-medium ${t.tone === "bad" ? "text-rose-300" : "text-white"}`}>
                          {t.title}
                        </div>
                        <div className="text-[11px] text-zinc-500">{t.sub}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-white/5 bg-[oklch(0.205_0.013_265)] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-sm font-medium text-white">Proof record</div>
                  <a href="#" className="inline-flex items-center gap-1 text-[11px] text-indigo-300 hover:text-indigo-200">
                    View full proof <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <dl className="space-y-2 text-[11px]">
                  {[
                    ["Verification ID", "ver_01J7X9A2EWK1Q2CA887"],
                    ["Verified At", "May 12, 2026 at 10:42:40 AM"],
                    ["Verifier", "RevTether Engine v2.4.1"],
                    ["Hash", "a3f2b6...9d7c1e"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-start justify-between gap-3">
                      <dt className="text-zinc-500">{k}</dt>
                      <dd className="flex items-center gap-1 font-mono text-zinc-200">
                        <span className="truncate">{v}</span>
                        {k === "Hash" && <Copy className="h-3 w-3 text-zinc-500" />}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="mx-auto flex max-w-[1200px] flex-col items-center justify-center px-6 pb-4 pt-20 text-center lg:px-10 lg:pt-28">
      <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
        Revenue Integrity Platform
      </div>
      <h1 className="mt-8 max-w-[18ch] text-[44px] font-bold leading-[1.02] tracking-[-0.02em] text-white sm:text-[56px] lg:text-[68px]">
        Know when revenue breaks.
        <br />
        <span className="text-zinc-400">Before finance does.</span>
      </h1>
      <p className="mt-7 max-w-[34rem] text-[17px] leading-relaxed text-zinc-400 sm:text-[18px]">
        Continuously verify payments, billing, webhooks, and downstream systems.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Button className="h-11 rounded-md bg-primary px-5 text-sm font-medium text-white hover:bg-primary/90">
          Verify Revenue Flow <ArrowRight className="ml-1.5 h-4 w-4" />
        </Button>
        <Link
          to="/how-it-works"
          className="inline-flex h-11 items-center rounded-md border border-white/15 bg-transparent px-5 text-sm font-medium text-white hover:bg-white/5"
        >
          See Demo
        </Link>
      </div>
    </section>
  );
}
