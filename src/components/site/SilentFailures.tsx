const upstream = [
  { n: "01", title: "Payment succeeds", detail: "Stripe charge captured · $1,200" },
  { n: "02", title: "CRM update missing", detail: "HubSpot contact never created" },
];

const downstream = [
  { n: "03", title: "Onboarding never triggered", detail: "Welcome sequence not sent" },
  { n: "04", title: "Customer never activates", detail: "Account sits idle" },
  { n: "05", title: "Finance discovers it 23 days later", detail: "Surfaced at month-end reconciliation" },
];

function Connector({ dim = false }: { dim?: boolean }) {
  return (
    <div
      aria-hidden
      className={`mx-auto h-6 w-px ${dim ? "bg-white/[0.04]" : "bg-white/[0.10]"}`}
    />
  );
}

function Node({
  n,
  title,
  detail,
  dim = false,
}: {
  n: string;
  title: string;
  detail: string;
  dim?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border border-white/[0.08] bg-white/[0.02] px-5 py-4 text-left transition-opacity ${
        dim ? "opacity-40" : ""
      }`}
    >
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[11px] tabular-nums text-zinc-500">{n}</span>
        <span className="text-[15px] font-medium text-zinc-100">{title}</span>
      </div>
      <p className="mt-1 pl-[26px] text-[13px] text-zinc-500">{detail}</p>
    </div>
  );
}

export function RevenueFailures() {
  return (
    <section className="mx-auto max-w-[560px] px-6 py-24 lg:px-10 lg:py-28">
      <h2 className="text-center text-[28px] font-semibold tracking-[-0.01em] text-white sm:text-[36px]">
        Most revenue failures{" "}
        <span className="text-primary">don&apos;t look like outages.</span>
      </h2>

      <div className="mt-14">
        {upstream.map((node, i) => (
          <div key={node.n}>
            <Node {...node} />
            {i < upstream.length - 1 && <Connector />}
          </div>
        ))}

        <Connector />

        {/* Detection marker */}
        <div className="rounded-lg border border-primary/40 bg-primary/[0.06] px-5 py-4 text-left ring-1 ring-primary/20">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary">
              RevTether detected the break here
            </span>
          </div>
          <p className="mt-2 pl-[18px] text-[13px] text-zinc-400">
            2 minutes after payment · before downstream systems drifted
          </p>
        </div>

        <Connector dim />

        <p className="mb-3 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-600">
          Without detection — what would have happened
        </p>

        {downstream.map((node, i) => (
          <div key={node.n}>
            <Node {...node} dim />
            {i < downstream.length - 1 && <Connector dim />}
          </div>
        ))}
      </div>
    </section>
  );
}
