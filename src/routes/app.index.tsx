import { createFileRoute, Link } from "@tanstack/react-router";
import {
  VerificationMetric,
  IntegrityMetric,
  ReliabilityMetric,
  CertificateMetric,
  VerificationSurface,
  CorrectnessBadge,
  CorrectnessCertificate,
} from "@/components/verity";
import { events, trustKpis } from "@/lib/verity-fixtures";
import { ChevronRight } from "lucide-react";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Operational trust overview · Verity" },
      {
        name: "description",
        content: "Live operational correctness across every connector — verified events, divergences prevented, recovered revenue.",
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
        <p className="mt-1 text-sm text-zinc-400">
          Production · last 24 hours
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <VerificationMetric
          label="Verified today"
          value={trustKpis.verifiedToday.value}
          delta={trustKpis.verifiedToday.delta}
          sub={trustKpis.verifiedToday.sub}
        />
        <IntegrityMetric
          label="Divergences prevented"
          value={trustKpis.divergencesPrevented.value}
          delta={trustKpis.divergencesPrevented.delta}
          sub={trustKpis.divergencesPrevented.sub}
        />
        <ReliabilityMetric
          label="Recovered revenue"
          value={trustKpis.recoveredRevenue.value}
          delta={trustKpis.recoveredRevenue.delta}
          sub={trustKpis.recoveredRevenue.sub}
        />
        <CertificateMetric
          label="Certified events"
          value={trustKpis.certifiedEvents.value}
          delta={trustKpis.certifiedEvents.delta}
          sub={trustKpis.certifiedEvents.sub}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <VerificationSurface
          eyebrow="Stream"
          title="Recent verifications"
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
            {events.map((e) => (
              <li key={e.id}>
                <Link
                  to="/app/events/$eventId"
                  params={{ eventId: e.id }}
                  className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/[0.02]"
                >
                  <CorrectnessBadge
                    status={e.certificateStatus}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-mono text-sm text-white">{e.type}</div>
                    <div className="truncate text-[11px] text-zinc-500">
                      {e.customer} · {e.receivedAt}
                    </div>
                  </div>
                  <div className="hidden text-right sm:block">
                    <div className="font-mono text-[11px] text-zinc-300">{e.id}</div>
                    <div className="text-[11px] text-zinc-500">
                      {e.systemsChecked} systems · {e.divergenceCount} divergences
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-zinc-600" />
                </Link>
              </li>
            ))}
          </ul>
        </VerificationSurface>

        <div className="space-y-4">
          <CorrectnessCertificate
            verificationId={events[0].verificationId}
            timestamp={events[0].receivedAt}
            systemsChecked={events[0].systemsChecked}
            divergenceCount={events[0].divergenceCount}
            verifier={events[0].verifier}
            hash={events[0].hash}
            status={events[0].certificateStatus}
          />
          <VerificationSurface eyebrow="Open the workflow" title="Inspect a verification">
            <p className="text-xs text-zinc-400">
              Every event below opens the full Expected vs Actual diff, divergence summary, proof
              timeline, and recovery plan — the same primitive language across the product.
            </p>
            <Link
              to="/app/events/$eventId"
              params={{ eventId: events[0].id }}
              className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-indigo-300 hover:text-indigo-200"
            >
              Open {events[0].type} <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </VerificationSurface>
        </div>
      </div>
    </div>
  );
}
