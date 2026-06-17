import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function CtaBanner() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-10 lg:px-10 lg:py-14">
      <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-[oklch(0.22_0.06_155)] via-[oklch(0.18_0.04_160)] to-[oklch(0.16_0.02_165)] px-8 py-14 sm:px-14 sm:py-16">
        {/* decorative dots */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(oklch(0.86 0.18 155 / 0.55) 1px, transparent 1.2px)",
            backgroundSize: "14px 14px",
            maskImage: "radial-gradient(circle at 80% 50%, black 0%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(circle at 80% 50%, black 0%, transparent 70%)",
          }}
        />
        <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="text-[30px] font-semibold leading-[1.15] tracking-[-0.01em] text-white sm:text-[40px]">
              Your billing stack is<br />
              <span className="text-primary">silently losing money.</span>
            </h2>
            <p className="mt-5 max-w-[44ch] text-[14px] leading-relaxed text-zinc-300/90">
              Every month, metering-to-billing gaps compound. Finance masks the loss as expected churn. Engineering doesn't know where to look.
            </p>
            <p className="mt-3 max-w-[44ch] text-[14px] leading-relaxed text-zinc-300/90">
              RevTether finds the gaps, quantifies the impact, and recovers the revenue — before your next close.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 lg:items-center">
            <Link
              to="/auth"
              className="inline-flex h-11 items-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[0_0_0_1px_oklch(0.86_0.18_155_/_0.4),0_10px_30px_-10px_oklch(0.76_0.18_155_/_0.7)] hover:brightness-110"
            >
              Find My Revenue Leaks <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
            <span className="text-[12px] text-zinc-400">SOC 2 compliant. Read-only access. Results in 24 hours.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
