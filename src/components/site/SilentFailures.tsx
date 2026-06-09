const upstream = [
  { n: "01", title: "Payment succeeds", detail: "Stripe charge captured · $1,200" },
  { n: "02", title: "CRM update missing", detail: "HubSpot contact never created" },
];

const downstream = [
  { n: "03", title: "Onboarding never triggered", detail: "Welcome sequence not sent" },
  { n: "04", title: "Customer never activates", detail: "Account sits idle" },
  { n: "05", title: "Finance discovers it 23 days later", detail: "Surfaced at month-end reconciliation" },
];

const impact = [
  "Onboarding never triggered",
  "Customer never activated",
  "Finance discovers issue 23 days later",
];

function Connector({ dim = false }: { dim?: boolean }) {
  return (
    <div
      aria-hidden
      className={`mx-auto h-6 w-px ${dim ? "bg-white/[0.03]" : "bg-white/[0.10]"}`}
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
        dim ? "opacity-25" : ""
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

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500">
        {label}
      </div>
      <div className="mt-1.5 text-[14px] text-zinc-200">{value}</div>
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

        {/* Detection card — investigation artifact, breaks out of column */}
        <div className="-mx-8 rounded-xl border border-primary/40 bg-primary/[0.04] p-6 text-left ring-1 ring-primary/15 sm:p-8 lg:-mx-16">
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
              Detected by RevTether
            </span>
          </div>

          {/* Headline */}
          <h3 className="mt-4 text-[20px] font-semibold tracking-[-0.01em] text-white sm:text-[22px]">
            CRM update missing
          </h3>

          {/* Expected / Actual grid */}
          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
            <Field label="Expected" value="HubSpot contact created" />
            <Field label="Actual" value="No contact record found" />
          </div>

          <div className="mt-5">
            <Field label="Detected" value="2 minutes after payment" />
          </div>

          {/* Divider */}
          <div className="my-7 h-px w-full bg-primary/15" aria-hidden />

          {/* Counterfactual cascade */}
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
            Without detection
          </div>
          <ul className="mt-4 space-y-3">
            {impact.map((line) => (
              <li key={line} className="text-[14px] text-zinc-300">
                {line}
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="my-7 h-px w-full bg-primary/15" aria-hidden />

          {/* Metadata row */}
          <div className="font-mono text-[11px] text-zinc-500">
            <span>Affected system: </span>
            <span className="text-zinc-400">HubSpot</span>
            <span className="mx-2 text-zinc-700">·</span>
            <span>Event: </span>
            <span className="text-zinc-400">invoice.paid</span>
            <span className="mx-2 text-zinc-700">·</span>
            <span>Revenue at risk: </span>
            <span className="text-zinc-400">$1,200/mo</span>
          </div>
        </div>

        <Connector dim />

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
