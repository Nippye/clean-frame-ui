import { createFileRoute, Link } from "@tanstack/react-router";
import { Construction } from "lucide-react";
import { VerificationSurface } from "@/components/verity";

function ComingSoon({ title, blurb }: { title: string; blurb: string }) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <VerificationSurface eyebrow="Batch B" title={title}>
        <div className="flex items-start gap-3">
          <Construction className="mt-0.5 h-5 w-5 text-indigo-300" />
          <div>
            <p className="text-sm text-zinc-300">{blurb}</p>
            <p className="mt-2 text-xs text-zinc-500">
              The primitives are ready — this page is queued for the next batch.
            </p>
            <Link
              to="/app/events/$eventId"
              params={{ eventId: "evt_1N7X9A2eZvKYIo2C" }}
              className="mt-3 inline-flex text-xs font-medium text-indigo-300 hover:text-indigo-200"
            >
              See the canonical Event Detail page →
            </Link>
          </div>
        </div>
      </VerificationSurface>
    </div>
  );
}

export const Route = createFileRoute("/app/incidents")({
  head: () => ({ meta: [{ title: "Incidents · Verity" }] }),
  component: () => (
    <ComingSoon
      title="Incident command center"
      blurb="Aggregated divergences, revenue exposure, multi-step recovery orchestration, and audit chain — composed from the same verification primitives."
    />
  ),
});
