import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const steps = [
  { n: "01", title: "Connect", body: "Read-only access to Stripe, Shopify, PayPal, and more." },
  { n: "02", title: "Verify", body: "Validate historical and real-time event flow." },
  { n: "03", title: "Monitor", body: "Continuously check for divergence and failures." },
  { n: "04", title: "Act", body: "Investigate findings before they impact finance." },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24 lg:px-10 lg:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="max-w-[20ch] text-[32px] font-semibold tracking-[-0.01em] text-white sm:text-[40px]">
          How it works.
        </h2>
        <Link
          to="/how-it-works"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-300 hover:text-white"
        >
          See the full walkthrough <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {steps.map((s) => (
          <div key={s.n} className="border-t border-white/[0.08] pt-5">
            <div className="font-mono text-[11px] tracking-wider text-zinc-500">{s.n}</div>
            <div className="mt-3 text-[17px] font-semibold text-white">{s.title}</div>
            <p className="mt-2 text-[14px] leading-relaxed text-zinc-400">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
