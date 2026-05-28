import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import {
  VerificationSurface,
  CorrectnessBadge,
} from "@/components/verity";
import { events } from "@/lib/verity-fixtures";

export const Route = createFileRoute("/app/events/")({
  head: () => ({
    meta: [{ title: "Events · Verity" }],
  }),
  component: EventsListPage,
});

function EventsListPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 py-8 lg:px-10">
      <div className="mb-6">
        <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-indigo-300">
          Verification stream
        </div>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">Events</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Every event Verity verified, with its certificate status and divergence count.
        </p>
      </div>

      <VerificationSurface
        eyebrow="All connectors"
        title={`${events.length} events`}
        bodyClassName="p-0"
      >
        <ul className="divide-y divide-white/5">
          {events.map((e) => (
            <li key={e.id}>
              <Link
                to="/app/events/$eventId"
                params={{ eventId: e.id }}
                className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-white/[0.02]"
              >
                <CorrectnessBadge status={e.certificateStatus} />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-mono text-sm text-white">{e.type}</div>
                  <div className="truncate text-[11px] text-zinc-500">
                    {e.customer} · {e.receivedAt}
                  </div>
                </div>
                <div className="hidden text-right md:block">
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
    </div>
  );
}
