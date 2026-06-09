import { CreditCard, ArrowUpCircle, RotateCcw, BarChart3, Calendar } from "lucide-react";

const items = [
  { icon: CreditCard, label: "Customers are charged but provisioning fails" },
  { icon: ArrowUpCircle, label: "Upgrades don't update access" },
  { icon: RotateCcw, label: "Refunds never reach downstream systems" },
  { icon: BarChart3, label: "Analytics misses trial conversions" },
  { icon: Calendar, label: "Finance finds the problem weeks later" },
];

export function RevenueFailures() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-24 lg:px-10 lg:py-28">
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] px-6 py-16 sm:px-12 sm:py-20">
        <h2 className="text-center text-[28px] font-semibold tracking-[-0.01em] text-white sm:text-[36px]">
          Most revenue failures <span className="text-primary">don't look like outages.</span>
        </h2>
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-primary/25 bg-primary/[0.08]">
                <Icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
              </div>
              <p className="mt-5 max-w-[15ch] text-[13.5px] leading-relaxed text-zinc-300">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
