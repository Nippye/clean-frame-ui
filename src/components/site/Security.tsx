import { Bell, DollarSign, Shield, TrendingUp } from "lucide-react";

const items = [
  {
    icon: Bell,
    title: "Catch failures earlier",
    body: "Detect issues minutes or hours after they happen — not weeks later in reconciliation.",
  },
  {
    icon: DollarSign,
    title: "Reduce manual work",
    body: "Eliminate spreadsheet reconciliation and repetitive investigation.",
  },
  {
    icon: Shield,
    title: "Protect customer trust",
    body: "Ensure customers get what they paid for, every time.",
  },
  {
    icon: TrendingUp,
    title: "Protect revenue",
    body: "Stop silent leakage from broken workflows and missed updates.",
  },
];

export function OperatorVisibility() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-20">
      <h2 className="text-center text-[28px] font-semibold tracking-[-0.01em] text-white sm:text-[36px]">
        From silent drift to <span className="text-primary">operator visibility</span>
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/25 bg-primary/[0.08]">
              <Icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
            </div>
            <h3 className="mt-5 text-[15px] font-semibold text-white">{title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
