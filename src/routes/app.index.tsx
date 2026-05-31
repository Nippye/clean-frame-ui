import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import {
  VerificationMetric,
  IntegrityMetric,
  ReliabilityMetric,
  CertificateMetric,
  VerificationSurface,
  CorrectnessBadge,
  CorrectnessCertificate,
} from "@/components/verity";
import { verificationFeed, trustKpis } from "@/lib/verity-fixtures";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Operational trust overview · Verity" },
      {
        name: "description",
        content:
          "Live operational correctness across every connector — verified events, divergences prevented, recovered revenue.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 py-8 lg:px-10">
      <div className="mb-6">
        <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-indigo-300">
          Operational trust overview
        </div>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">
          Every event, verified end-to-end.
        </h1>
        <p className="mt-1 text-sm text-zinc-400">Production · last 24 hours</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <VerificationMetric
          label="Verified today"
          value={trustKpis.verifiedToday.value}
          delta={trustKpis.verifiedToday.delta}
          sub={trustKpis.verifiedToday.sub}
          valueClassName="font-mono"
        />
        <IntegrityMetric
          label="Divergences prevented"
          value={trustKpis.divergencesPrevented.value}
          delta={trustKpis.divergencesPrevented.delta}
          sub={trustKpis.divergencesPrevented.sub}
          tone="negative"
          className="border-rose-500/20 bg-rose-500/[0.04]"
          valueClassName="text-rose-200"
        />
        <ReliabilityMetric
          label="Recovered revenue"
          value={trustKpis.recoveredRevenue.value}
          delta={trustKpis.recoveredRevenue.delta}
          sub={trustKpis.recoveredRevenue.sub}
          valueClassName="font-mono text-emerald-100"
        />
        <CertificateMetric
          label="Certified events"
          value={trustKpis.certifiedEvents.value}
          delta={trustKpis.certifiedEvents.delta}
          sub={trustKpis.certifiedEvents.sub}
          valueClassName="font-mono"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
        <VerificationSurface
          eyebrow="Stream"
          title="Verification feed"
          bodyClassName="p-0"
          trailing={
            <Link
              to="/app/events"
              className="text-[11px] text-indigo-300 hover:text-indigo-200"
            >
              View all
            </Link>
          }
        >
          <ul className="divide-y divide-white/5">
            {verificationFeed.map((e) => (
              <li key={e.id}>
                <Link
                  to="/app/events/$eventId"
                  params={{ eventId: "evt_mock_123" }}
                  className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/[0.02]"
                >
                  <CorrectnessBadge status={e.status} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-mono text-sm text-white">{e.type}</div>
                    <div className="truncate text-[11px] text-zinc-500">
                      {e.customer} · {e.receivedAt}
                    </div>
                  </div>
                  <div className="hidden text-right sm:block">
                    <div className="font-mono text-[11px] text-zinc-300">{e.id}</div>
                    <div className="text-[11px] text-zinc-500">
                      {e.amount ? `${e.amount} · ` : ""}
                      {e.systemsChecked} systems
                      {e.divergenceCount > 0 ? ` · ${e.divergenceCount} divergent` : ""}
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-zinc-600 transition-colors group-hover:text-zinc-300" />
                </Link>
              </li>
            ))}
          </ul>
        </VerificationSurface>

        <div className="space-y-4">
          <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-500">
            Featured certificate
          </div>
          <CorrectnessCertificate
            verificationId="ver_01J7XMOCK00000000123"
            timestamp="May 31, 2026 at 09:14:02 UTC"
            systemsChecked={6}
            divergenceCount={0}
            verifier="Verity Engine v2.4.1"
            hash="9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
            status="Verified"
          />
          <VerificationSurface eyebrow="Open the workflow" title="Inspect a verification">
            <p className="text-xs text-zinc-400">
              Every event in the feed opens the full Expected vs Actual diff, divergence summary,
              proof timeline, and recovery plan — the same primitive language across the product.
            </p>
            <Link
              to="/app/events/$eventId"
              params={{ eventId: "evt_mock_123" }}
              className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-indigo-300 hover:text-indigo-200"
            >
              Open invoice.payment_succeeded <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </VerificationSurface>
        </div>
      </div>
    </div>
  );
}
