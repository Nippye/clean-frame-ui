import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/integrations")({
  head: () => ({
    meta: [
      { title: "Integrations — RevTether" },
      {
        name: "description",
        content:
          "Read-only connectors for the systems your revenue flows through — Stripe, Adyen, Postgres, Snowflake, Salesforce, NetSuite and more.",
      },
      { property: "og:title", content: "Integrations — RevTether" },
      {
        property: "og:description",
        content:
          "Every processor, database, and downstream system that touches revenue — verified continuously.",
      },
    ],
  }),
  component: IntegrationsPage,
});

type Status = "Live" | "Beta" | "Roadmap";
type Item = { name: string; role: string; status: Status };

const processors: Item[] = [
  { name: "Stripe", role: "Payments, subscriptions, invoices", status: "Live" },
  { name: "Adyen", role: "Card and APM acquiring", status: "Beta" },
  { name: "Braintree", role: "PayPal-owned processor", status: "Beta" },
  { name: "Paddle", role: "Merchant of record billing", status: "Roadmap" },
  { name: "Chargebee", role: "Subscription management", status: "Roadmap" },
  { name: "Recurly", role: "Recurring billing", status: "Roadmap" },
];

const databases: Item[] = [
  { name: "PostgreSQL", role: "Primary application database", status: "Live" },
  { name: "MySQL", role: "Primary application database", status: "Beta" },
  { name: "Snowflake", role: "Warehouse reconciliation", status: "Beta" },
  { name: "BigQuery", role: "Warehouse reconciliation", status: "Roadmap" },
  { name: "Redshift", role: "Warehouse reconciliation", status: "Roadmap" },
];

const downstream: Item[] = [
  { name: "Salesforce", role: "CRM contact and opportunity state", status: "Live" },
  { name: "HubSpot", role: "CRM contact and lifecycle state", status: "Beta" },
  { name: "NetSuite", role: "ERP revenue recognition", status: "Beta" },
  { name: "QuickBooks", role: "Bookkeeping and invoicing", status: "Roadmap" },
  { name: "Segment", role: "Customer data pipeline", status: "Roadmap" },
  { name: "Custom webhooks", role: "Internal entitlement services", status: "Live" },
];

function badgeClass(status: Status) {
  if (status === "Live") return "border-primary/40 bg-primary/10 text-primary";
  if (status === "Beta") return "border-white/20 bg-white/[0.04] text-zinc-200";
  return "border-white/10 bg-transparent text-zinc-500";
}

function Grid({ items }: { items: Item[] }) {
  return (
    <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it) => (
        <li
          key={it.name}
          className="flex items-start justify-between gap-4 bg-background p-5"
        >
          <div>
            <div className="text-[15px] font-semibold text-white">{it.name}</div>
            <div className="mt-1.5 text-[13px] leading-relaxed text-zinc-400">
              {it.role}
            </div>
          </div>
          <span
            className={`shrink-0 rounded-full border px-2 py-0.5 text-[10.5px] font-medium uppercase tracking-wider ${badgeClass(
              it.status
            )}`}
          >
            {it.status}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Section({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: Item[];
}) {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-12 lg:px-10">
      <div className="mb-7 flex items-end justify-between gap-6">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            {eyebrow}
          </div>
          <h2 className="mt-3 text-[26px] font-semibold tracking-[-0.01em] text-white sm:text-[30px]">
            {title}
          </h2>
        </div>
      </div>
      <Grid items={items} />
    </section>
  );
}

function IntegrationsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="mx-auto max-w-[1200px] px-6 pb-12 pt-20 text-center lg:px-10 lg:pt-28">
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
          Integrations
        </div>
        <h1 className="mx-auto mt-7 max-w-[22ch] text-[44px] font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-[56px]">
          Every system your revenue touches.
        </h1>
        <p className="mx-auto mt-6 max-w-[40rem] text-[17px] leading-relaxed text-zinc-400">
          Read-only connectors across processors, databases, and downstream
          systems. No webhooks to forward. No events to replay.
        </p>
      </section>

      <Section eyebrow="01 · Payment processors" title="Where revenue originates." items={processors} />
      <Section eyebrow="02 · Databases & warehouses" title="Where state is supposed to land." items={databases} />
      <Section eyebrow="03 · Downstream systems" title="Where customers actually live." items={downstream} />

      <section className="mx-auto max-w-[1200px] px-6 py-16 lg:px-10">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 sm:p-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="text-[24px] font-semibold tracking-[-0.01em] text-white sm:text-[28px]">
                Don't see yours?
              </h2>
              <p className="mt-3 max-w-[52ch] text-[14px] leading-relaxed text-zinc-400">
                Custom connectors take a working day to scaffold against any
                REST, GraphQL, or SQL-reachable source. If it has an audit
                trail, RevTether can reconcile against it.
              </p>
            </div>
            <div className="lg:justify-self-end">
              <Link
                to="/auth"
                className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-[13px] font-semibold text-primary-foreground hover:brightness-110"
              >
                Request a connector <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </main>
  );
}
