import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  PageHeader,
  EventMetadata,
  VerificationDiff,
  DivergencePanel,
  RevenueImpact,
  ProofTimeline,
  CorrectnessCertificate,
  RecoveryPlan,
} from "@/components/verity";
import { getEvent } from "@/lib/verity-fixtures";

export const Route = createFileRoute("/app/events/$eventId")({
  loader: ({ params }) => {
    const event = getEvent(params.eventId);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.event.type} · Event · Verity`
          : "Event · Verity",
      },
      {
        name: "description",
        content: "Expected vs Actual verification, divergence detection, proof record, and recovery plan for a single operational event.",
      },
    ],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-md px-6 py-16 text-center">
      <h1 className="text-xl font-semibold text-white">Event not found</h1>
      <p className="mt-2 text-sm text-zinc-400">
        We couldn&rsquo;t locate that verification record.
      </p>
      <Link to="/app" className="mt-4 inline-flex text-sm text-indigo-300 hover:text-indigo-200">
        Back to dashboard
      </Link>
    </div>
  ),
  component: EventDetailPage,
});

function EventDetailPage() {
  const { event } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-8 lg:px-10">
      <PageHeader
        backTo="/app"
        backLabel="Back to dashboard"
        impact={event.impact}
        title={event.type}
        statusLabel={event.certificateStatus}
        meta={
          <>
            <span>{event.receivedAt}</span>
            <span className="font-mono">{event.id}</span>
            <span>·</span>
            <span>{event.environment}</span>
            <span>·</span>
            <span>{event.customer}</span>
          </>
        }
        actions={
          <Button
            variant="outline"
            className="h-8 rounded-md border-white/15 bg-transparent px-3 text-xs text-white hover:bg-white/5"
          >
            View in {event.source} <ExternalLink className="ml-1 h-3 w-3" />
          </Button>
        }
      />

      <div className="space-y-5">
        <EventMetadata
          items={[
            { label: "Event type", value: event.type, mono: true },
            { label: "Source", value: event.source },
            { label: "Customer", value: event.customer, mono: true },
            { label: "Amount", value: event.amount },
            { label: "Environment", value: event.environment },
            { label: "Received", value: event.receivedAt },
          ]}
        />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-5">
            <VerificationDiff rows={event.rows} />
            <DivergencePanel rows={event.rows} />
            <RevenueImpact atRisk={event.revenueAtRisk} recovered={0} />
            <RecoveryPlan steps={event.recovery} />
          </div>
          <div className="space-y-5">
            <CorrectnessCertificate
              verificationId={event.verificationId}
              timestamp={event.receivedAt}
              systemsChecked={event.systemsChecked}
              divergenceCount={event.divergenceCount}
              verifier={event.verifier}
              hash={event.hash}
              status={event.certificateStatus}
            />
            <ProofTimeline entries={event.timeline} />
          </div>
        </div>
      </div>
    </div>
  );
}
