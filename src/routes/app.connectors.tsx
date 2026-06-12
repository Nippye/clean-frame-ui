import { createFileRoute, Link } from "@tanstack/react-router";
import { Plug } from "lucide-react";

export const Route = createFileRoute("/app/connectors")({
  head: () => ({ meta: [{ title: "Connectors · RevTether" }] }),
  component: ConnectorsComingSoon,
});

function ConnectorsComingSoon() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-24 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] ring-1 ring-indigo-400/20">
        <Plug className="h-5 w-5 text-indigo-300" />
      </div>
      <h1 className="mt-5 text-xl font-semibold tracking-tight text-white">Connectors</h1>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        Stripe, HubSpot, Salesforce, Auth0, Firebase, Postgres — every connector is a
        verification surface with coverage %, last verified, and 24h mismatches.
      </p>
      <span className="mt-5 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-zinc-300">
        Coming soon
      </span>
      <Link
        to="/app"
        className="mt-6 text-xs font-medium text-indigo-300 hover:text-indigo-200"
      >
        ← Back to dashboard
      </Link>
    </div>
  );
}
