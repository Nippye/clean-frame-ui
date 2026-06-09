import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  Lock,
  CreditCard,
  Clock,
  Shield,
  UserPlus,
  UserX,
  Check,
  X,
} from "lucide-react";
import { Logo } from "@/components/site/Logo";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — RevTether" },
      {
        name: "description",
        content:
          "Create your RevTether workspace. Connect your billing, CRM, and analytics systems to discover revenue integrity issues in minutes.",
      },
    ],
  }),
  component: AuthPage,
});

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.31 0-6-2.74-6-6.1s2.69-6.1 6-6.1c1.88 0 3.14.8 3.86 1.49l2.63-2.53C16.84 3.4 14.62 2.4 12 2.4 6.86 2.4 2.7 6.56 2.7 11.7s4.16 9.3 9.3 9.3c5.37 0 8.93-3.77 8.93-9.08 0-.61-.07-1.08-.15-1.72H12z" />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#F25022" d="M3 3h8.5v8.5H3z" />
      <path fill="#7FBA00" d="M12.5 3H21v8.5h-8.5z" />
      <path fill="#00A4EF" d="M3 12.5h8.5V21H3z" />
      <path fill="#FFB900" d="M12.5 12.5H21V21h-8.5z" />
    </svg>
  );
}

function StripeBadge() {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[#635BFF] font-semibold text-white">
      S
    </div>
  );
}
function HubSpotBadge() {
  return (
    <svg viewBox="0 0 24 24" className="h-11 w-11" aria-hidden="true">
      <circle cx="18" cy="6" r="2.2" fill="#FF7A59" />
      <circle cx="18" cy="18" r="2.2" fill="#FF7A59" />
      <circle cx="6" cy="12" r="2.2" fill="#FF7A59" />
      <circle cx="18" cy="12" r="3.4" fill="none" stroke="#FF7A59" strokeWidth="1.4" />
      <path d="M8 12h6.5M16.5 7.5l-2 3M16.5 16.5l-2-3" stroke="#FF7A59" strokeWidth="1.4" />
    </svg>
  );
}
function SegmentBadge() {
  return (
    <svg viewBox="0 0 24 24" className="h-11 w-11" aria-hidden="true" fill="none" stroke="#49B881" strokeWidth="2" strokeLinecap="round">
      <path d="M4 9h11" />
      <path d="M9 15h11" />
      <circle cx="18" cy="9" r="1" fill="#49B881" />
      <circle cx="6" cy="15" r="1" fill="#49B881" />
    </svg>
  );
}
function GA4Badge() {
  return (
    <svg viewBox="0 0 24 24" className="h-11 w-11" aria-hidden="true">
      <rect x="16" y="4" width="4" height="16" rx="2" fill="#F9AB00" />
      <rect x="10" y="10" width="4" height="10" rx="2" fill="#F9AB00" />
      <circle cx="6" cy="18" r="2" fill="#E37400" />
    </svg>
  );
}

type SystemCardProps = {
  icon: React.ReactNode;
  name: string;
  role: string;
  status: "ok" | "err";
  statusLabel: React.ReactNode;
  time: string;
  highlight?: boolean;
};

function SystemCard({ icon, name, role, status, statusLabel, time, highlight }: SystemCardProps) {
  return (
    <div
      className={`flex flex-col items-center text-center ${
        highlight ? "rounded-lg border border-rose-500/60 p-3" : "p-3"
      }`}
    >
      {icon}
      <div className="mt-2.5 text-[14px] font-medium text-white">{name}</div>
      <div className="text-[12px] text-zinc-500">{role}</div>
      <div className="mt-4 flex h-7 w-7 items-center justify-center rounded-full bg-[oklch(0.22_0.02_265)]">
        {status === "ok" ? (
          <Check className="h-3.5 w-3.5 text-emerald-400" strokeWidth={3} />
        ) : (
          <X className="h-3.5 w-3.5 text-rose-400" strokeWidth={3} />
        )}
      </div>
      <div className="mt-2 text-[12px] leading-tight text-white">{statusLabel}</div>
      <div className="mt-3 text-[11px] text-zinc-500">{time}</div>
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex items-center justify-center pt-8 text-zinc-600">
      <ArrowRight className="h-4 w-4" />
    </div>
  );
}

function AuthPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="w-full">
        <div className="mx-auto flex max-w-[1280px] items-center gap-8 px-6 py-5 lg:px-10">
          <Link to="/" className="flex items-center"><Logo /></Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[13px] text-zinc-400 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Home
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-6 pb-20 pt-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16 lg:px-10">
        {/* LEFT COLUMN */}
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-400">
            Revenue Integrity Platform
          </div>
          <h1 className="mt-5 text-[52px] font-semibold leading-[1.05] tracking-[-0.025em] text-white">
            Verify your<br />revenue stack<span className="text-emerald-400">.</span>
          </h1>
          <p className="mt-5 max-w-[440px] text-[15px] leading-relaxed text-zinc-400">
            Connect your billing, CRM, and analytics systems and discover revenue integrity issues in minutes.
          </p>

          {/* Auth card */}
          <div className="mt-8 max-w-[480px] rounded-xl border border-white/[0.07] bg-[oklch(0.17_0.012_265)] p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
            <div className="text-[17px] font-semibold text-white">Create your workspace</div>
            <div className="mt-1 text-[13px] text-zinc-500">Get started in under 2 minutes.</div>

            <div className="mt-5 space-y-2.5">
              <button className="flex w-full items-center justify-center gap-2.5 rounded-md border border-white/10 bg-white/[0.02] px-4 py-2.5 text-[13.5px] font-medium text-white transition-colors hover:bg-white/[0.05]">
                <GoogleIcon /> Continue with Google
              </button>
              <button className="flex w-full items-center justify-center gap-2.5 rounded-md border border-white/10 bg-white/[0.02] px-4 py-2.5 text-[13.5px] font-medium text-white transition-colors hover:bg-white/[0.05]">
                <MicrosoftIcon /> Continue with Microsoft
              </button>
            </div>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/[0.08]" />
              <div className="text-[11px] tracking-[0.18em] text-zinc-500">OR</div>
              <div className="h-px flex-1 bg-white/[0.08]" />
            </div>

            <div>
              <label className="block text-[13px] text-zinc-300">Work email</label>
              <div className="relative mt-2">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="w-full rounded-md border border-white/10 bg-[oklch(0.14_0.01_265)] py-2.5 pl-9 pr-3 text-[14px] text-white placeholder:text-zinc-600 focus:border-emerald-500/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-emerald-500 px-4 py-2.5 text-[14px] font-semibold text-black transition-colors hover:bg-emerald-400">
              Continue with email <ArrowRight className="h-4 w-4" />
            </button>
            <div className="mt-2.5 text-center text-[12px] text-zinc-500">
              We'll send you a magic link to sign in.
            </div>
          </div>

          {/* What happens next */}
          <div className="mt-10 max-w-[560px]">
            <div className="text-[14px] font-semibold text-white">What happens next</div>
            <div className="mt-4 grid grid-cols-3 gap-6">
              {[
                { n: 1, t: "Create workspace", d: "Set up your team and workspace" },
                { n: 2, t: "Connect systems", d: "Connect your revenue stack in minutes" },
                { n: 3, t: "Verify event flow", d: "Connect your revenue and surface issues" },
              ].map((s) => (
                <div key={s.n} className="relative">
                  <div className="flex items-center gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full border border-white/15 text-[11px] text-white">
                      {s.n}
                    </div>
                  </div>
                  <div className="mt-2 text-[12.5px] font-medium text-white">{s.t}</div>
                  <div className="mt-1 text-[11.5px] leading-snug text-zinc-500">{s.d}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-6">
              {[
                { Icon: CreditCard, t: "No credit card", d: "required" },
                { Icon: Lock, t: "Read-only access", d: "to your systems" },
                { Icon: Clock, t: "Average setup", d: "time: 2 minutes" },
              ].map(({ Icon, t, d }) => (
                <div key={t} className="flex items-start gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-emerald-500/30 bg-emerald-500/5">
                    <Icon className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="text-[12px] leading-snug text-white">
                    {t}<br /><span className="text-zinc-500">{d}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 inline-flex items-center gap-1.5 text-[12px] text-zinc-500">
              <Lock className="h-3 w-3" /> Your data is encrypted and never shared.
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:pt-2">
          <div className="text-[18px] font-semibold text-white">See how RevTether works</div>
          <p className="mt-2 max-w-[520px] text-[13.5px] leading-relaxed text-zinc-400">
            We monitor critical revenue events as they move across your systems and alert you the moment something breaks.
          </p>

          {/* Event flow card */}
          <div className="mt-5 rounded-xl border border-white/[0.07] bg-[oklch(0.17_0.012_265)] p-5">
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                Example: invoice.paid event
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live monitoring
              </div>
            </div>

            <div className="mt-5 grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-start">
              <SystemCard icon={<StripeBadge />} name="Stripe" role="Source" status="ok" statusLabel={<>Event<br />captured</> as unknown as string} time="10:21:04 AM" />
              <Arrow />
              <SystemCard icon={<HubSpotBadge />} name="HubSpot" role="CRM" status="err" statusLabel={<>Update<br />missing</> as unknown as string} time="10:21:06 AM" highlight />
              <Arrow />
              <SystemCard icon={<SegmentBadge />} name="Segment" role="CDP" status="ok" statusLabel={<>Event<br />received</> as unknown as string} time="10:21:07 AM" />
              <Arrow />
              <SystemCard icon={<GA4Badge />} name="Google Analytics 4" role="Analytics" status="ok" statusLabel={<>Event<br />received</> as unknown as string} time="10:21:08 AM" />
            </div>
          </div>

          {/* Finding card */}
          <div className="mt-4 rounded-xl border border-white/[0.07] bg-[oklch(0.17_0.012_265)] p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-400">
                  Finding detected
                </div>
                <div className="mt-2 text-[22px] font-semibold tracking-[-0.01em] text-white">
                  CRM update missing
                </div>
              </div>
              <div className="rounded-full border border-rose-500/30 bg-rose-500/10 px-2.5 py-1 text-[11px] text-rose-300">
                Revenue at risk
              </div>
            </div>

            <div className="mt-5 grid grid-cols-4 gap-5">
              <div>
                <div className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                  Expected
                </div>
                <div className="mt-2 text-[13.5px] leading-tight text-white">
                  HubSpot contact created
                </div>
                <div className="mt-4 flex h-8 w-8 items-center justify-center rounded-md border border-emerald-500/30 bg-emerald-500/5">
                  <UserPlus className="h-4 w-4 text-emerald-400" />
                </div>
              </div>
              <div>
                <div className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                  Actual
                </div>
                <div className="mt-2 text-[13.5px] leading-tight text-white">
                  No contact record found
                </div>
                <div className="mt-4 flex h-8 w-8 items-center justify-center rounded-md border border-rose-500/30 bg-rose-500/5">
                  <UserX className="h-4 w-4 text-rose-400" />
                </div>
              </div>
              <div>
                <div className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                  Revenue at risk
                </div>
                <div className="mt-2 text-[18px] font-semibold text-rose-400">$1,200 / mo</div>
                <div className="mt-2 text-[12px] text-zinc-500">Potential monthly impact</div>
              </div>
              <div>
                <div className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                  Detected
                </div>
                <div className="mt-2 inline-flex items-start gap-1.5 text-[13.5px] leading-tight text-white">
                  <Clock className="mt-0.5 h-3.5 w-3.5 text-zinc-400" />
                  2 minutes after payment
                </div>
              </div>
            </div>
          </div>

          {/* Footer card */}
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/[0.07] bg-[oklch(0.17_0.012_265)] px-5 py-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-emerald-500/30 bg-emerald-500/5">
              <Shield className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-[13px] leading-snug text-zinc-300">
              RevTether checks every critical revenue event across all connected systems so you can fix issues before revenue is lost.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
