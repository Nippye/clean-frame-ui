import { Check } from "lucide-react";

const findings = [
  { action: "Customer charged", failure: "provisioning failed" },
  { action: "Upgrade completed", failure: "access unchanged" },
  { action: "Refund issued", failure: "analytics missing" },
  { action: "Trial converted", failure: "attribution lost" },
  { action: "Finance discovers it", failure: "weeks late" },
];

export function RevenueFailures() {
  return (
    <section className="mx-auto max-w-[720px] px-6 py-24 text-center lg:px-10 lg:py-28">
      <h2 className="text-[28px] font-semibold tracking-[-0.01em] text-white sm:text-[36px]">
        Most revenue failures{" "}
        <span className="text-primary">don&apos;t look like outages.</span>
      </h2>

      <p className="mx-auto mt-6 max-w-[52ch] text-[15px] leading-relaxed text-zinc-400">
        No alarms. No incidents. No pages.
        <br />
        Just small failures that quietly spread between systems.
      </p>

      <div className="mt-14 space-y-0 border-t border-white/[0.06]">
        {findings.map(({ action, failure }) => (
          <div
            key={action}
            className="flex items-center gap-4 border-b border-white/[0.06] px-2 py-4 text-left sm:px-4 sm:py-5"
          >
            <Check className="h-4 w-4 shrink-0 text-zinc-500" strokeWidth={2} />
            <span className="text-[15px] text-zinc-300">
              {action},{" "}
              <span className="text-zinc-500">{failure}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
