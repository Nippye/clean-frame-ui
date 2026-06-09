const items = [
  {
    title: "Missing payouts",
    body: "Revenue settled incorrectly, delayed, or never received.",
  },
  {
    title: "Broken webhooks",
    body: "Critical events fail silently between systems.",
  },
  {
    title: "Reconciliation gaps",
    body: "Expected records don't match actual records.",
  },
];

export function SilentFailures() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24 lg:px-10 lg:py-32">
      <h2 className="max-w-[20ch] text-[32px] font-semibold tracking-[-0.01em] text-white sm:text-[40px]">
        Revenue issues rarely announce themselves.
      </h2>

      <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.04] sm:grid-cols-3">
        {items.map((it) => (
          <div key={it.title} className="bg-[oklch(0.18_0.012_265)] p-7">
            <div className="text-[17px] font-semibold text-white">{it.title}</div>
            <p className="mt-2 text-[14px] leading-relaxed text-zinc-400">{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
