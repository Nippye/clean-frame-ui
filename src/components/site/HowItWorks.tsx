import { ArrowRight, AlertTriangle } from "lucide-react";

function StepNum({ n }: { n: number }) {
  return (
    <div className="mb-6 inline-flex h-7 w-7 items-center justify-center rounded-full border border-primary/40 text-[12px] font-semibold text-primary">
      {n}
    </div>
  );
}

function Arrow() {
  return (
    <div className="hidden items-center justify-center text-primary/50 lg:flex">
      <ArrowRight className="h-5 w-5" strokeDasharray="3 3" />
    </div>
  );
}

function LogoTile({ children, bg }: { children: React.ReactNode; bg: string }) {
  return (
    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${bg}`}>
      {children}
    </div>
  );
}

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-20">
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] px-6 py-16 sm:px-12 sm:py-20">
        <h2 className="text-center text-[28px] font-semibold tracking-[-0.01em] text-white sm:text-[36px]">
          RevTether <span className="text-primary">checks the chain</span> after every critical revenue event.
        </h2>

        <div className="mt-14 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1fr_24px_1fr_24px_1fr]">
          {/* Step 1 */}
          <div className="rounded-xl border border-white/[0.08] bg-[oklch(0.17_0.009_250)] p-7">
            <StepNum n={1} />
            <div className="flex items-center gap-3">
              <LogoTile bg="bg-[#635bff]/15 ring-1 ring-[#635bff]/30">
                <span className="text-xl font-bold text-white">S</span>
              </LogoTile>
              <LogoTile bg="bg-[#95bf47]/15 ring-1 ring-[#95bf47]/30">
                <span className="text-xl font-bold text-[#95bf47]">🛍</span>
              </LogoTile>
            </div>
            <h3 className="mt-6 text-[17px] font-semibold text-white">Billing event received</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-zinc-400">
              We capture and normalize critical revenue events from your billing and payment systems.
            </p>
          </div>

          <Arrow />

          {/* Step 2 */}
          <div className="rounded-xl border border-white/[0.08] bg-[oklch(0.17_0.009_250)] p-7">
            <StepNum n={2} />
            <div className="flex items-center gap-3">
              <LogoTile bg="bg-[#ff7a59]/15 ring-1 ring-[#ff7a59]/30">
                <span className="text-lg font-bold text-[#ff7a59]">H</span>
              </LogoTile>
              <LogoTile bg="bg-white/[0.05] ring-1 ring-white/15">
                <span className="text-lg font-bold text-white">◫</span>
              </LogoTile>
              <LogoTile bg="bg-[#0a7cff]/15 ring-1 ring-[#0a7cff]/30">
                <span className="text-lg font-bold text-[#5aa9ff]">▌</span>
              </LogoTile>
            </div>
            <h3 className="mt-6 text-[17px] font-semibold text-white">Downstream state verified</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-zinc-400">
              RevTether checks that the event reached and updated each connected system as expected.
            </p>
          </div>

          <Arrow />

          {/* Step 3 */}
          <div className="rounded-xl border border-white/[0.08] bg-[oklch(0.17_0.009_250)] p-7">
            <StepNum n={3} />
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/15 ring-1 ring-rose-500/30">
              <AlertTriangle className="h-6 w-6 text-rose-400" strokeWidth={2} />
            </div>
            <h3 className="mt-6 text-[17px] font-semibold text-white">
              Mismatch surfaced with proof trail
            </h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-zinc-400">
              If something breaks, we alert you with context, impact, and everything your team needs to investigate.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
