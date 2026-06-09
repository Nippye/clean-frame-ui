const rows: Array<[string, React.ReactNode]> = [
  ["Expected event", "Invoice paid"],
  ["Actual downstream result", <span className="text-rose-300">Customer record missing</span>],
  ["Affected system", "HubSpot"],
  ["Revenue at risk", <span className="font-mono">$1,200.00</span>],
  ["Detected", "2 minutes ago"],
];

export function FindingExample() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[820px]">
        <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
          Finding · F-1042
        </div>
        <h2 className="mt-3 text-[32px] font-semibold tracking-[-0.01em] text-white sm:text-[40px]">
          Revenue issues, documented as evidence.
        </h2>

        <dl className="mt-10 divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {rows.map(([label, value], i) => (
            <div key={i} className="grid grid-cols-1 gap-2 py-4 sm:grid-cols-[240px_1fr] sm:gap-6">
              <dt className="text-[13px] uppercase tracking-[0.12em] text-zinc-500">{label}</dt>
              <dd className="text-[15px] text-white">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
