import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, AlertTriangle } from "lucide-react";
import { Logo } from "@/components/site/Logo";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — RevTether" },
      {
        name: "description",
        content:
          "Create your RevTether workspace. Connect Stripe and run your first revenue integrity audit in minutes.",
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

function AuthPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="w-full border-b border-white/[0.04]">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 lg:px-10">
          <Link to="/"><Logo /></Link>
          <Link to="/" className="text-[13px] text-zinc-400 hover:text-white">
            Back to home
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-10 lg:py-24">
        {/* LEFT */}
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
            Revenue Integrity Platform
          </div>
          <h1 className="mt-3 text-[36px] font-semibold tracking-[-0.02em] text-white sm:text-[44px]">
            Verify your revenue stack.
          </h1>
          <p className="mt-3 max-w-[440px] text-[15px] leading-relaxed text-zinc-400">
            Connect Stripe and run your first revenue integrity audit in minutes.
          </p>

          <div className="mt-8 max-w-[440px] rounded-xl border border-white/[0.07] bg-[oklch(0.19_0.012_265)] p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
            <div className="text-[15px] font-medium text-white">Create your workspace</div>

            <div className="mt-5 space-y-2.5">
              <button className="flex w-full items-center justify-center gap-2.5 rounded-md border border-white/10 bg-white/[0.02] px-4 py-2.5 text-[13.5px] font-medium text-white transition-colors hover:bg-white/[0.05]">
                <GoogleIcon /> Continue with Google
              </button>
              <button className="flex w-full items-center justify-center gap-2.5 rounded-md border border-white/10 bg-white/[0.02] px-4 py-2.5 text-[13.5px] font-medium text-white transition-colors hover:bg-white/[0.05]">
                <MicrosoftIcon /> Continue with Microsoft
              </button>
            </div>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/[0.06]" />
              <div className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">or</div>
              <div className="h-px flex-1 bg-white/[0.06]" />
            </div>

            <label className="block">
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                Work email
              </span>
              <input
                type="email"
                placeholder="you@company.com"
                className="mt-1.5 w-full rounded-md border border-white/10 bg-[oklch(0.16_0.01_265)] px-3 py-2.5 text-[14px] text-white placeholder:text-zinc-600 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </label>

            <button className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-primary px-4 py-2.5 text-[13.5px] font-semibold text-primary-foreground transition-colors hover:brightness-110">
              Continue <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <ul className="mt-6 flex max-w-[440px] flex-col gap-2 text-[13px] text-zinc-400 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
            {[
              "No credit card required",
              "Read-only integrations",
              "Workspace ready in under 2 minutes",
            ].map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-400" /> {t}
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="lg:pl-4">
          <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[oklch(0.19_0.012_265)] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                Revenue integrity audit
              </div>
              <div className="font-mono text-[11px] text-zinc-500">live</div>
            </div>

            <div className="divide-y divide-white/[0.05]">
              <StatusRow tone="ok" label="Stripe connected" meta="acct_1NfX…2eZv" />
              <StatusRow tone="ok" label="12,482 events scanned" meta="last 24h" />
              <StatusRow tone="warn" label="1 issue detected" meta="open" />
            </div>

            <div className="px-5 py-5">
              <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">
                Finding · F-1042
              </div>
              <div className="mt-1.5 text-[15px] font-medium text-white">
                CRM update missing
              </div>
              <div className="mt-4 grid grid-cols-2 gap-5">
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                    Expected
                  </div>
                  <div className="mt-1 text-[13px] text-white">HubSpot contact created</div>
                </div>
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                    Actual
                  </div>
                  <div className="mt-1 text-[13px] text-rose-300">No contact record found</div>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
                <div className="text-[11px] text-zinc-500">Detected 2 minutes ago</div>
                <div className="font-mono text-[11px] text-zinc-500">evt_1N7X9A…</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function StatusRow({
  tone,
  label,
  meta,
}: {
  tone: "ok" | "warn";
  label: string;
  meta: string;
}) {
  const Icon = tone === "ok" ? Check : AlertTriangle;
  const color = tone === "ok" ? "text-emerald-400" : "text-amber-400";
  return (
    <div className="flex items-center justify-between px-5 py-3">
      <div className="inline-flex items-center gap-2.5">
        <Icon className={`h-3.5 w-3.5 ${color}`} />
        <span className="text-[13.5px] text-white">{label}</span>
      </div>
      <span className="font-mono text-[11px] text-zinc-500">{meta}</span>
    </div>
  );
}
