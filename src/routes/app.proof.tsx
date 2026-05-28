import { createFileRoute, Link } from "@tanstack/react-router";
import { Construction } from "lucide-react";
import { VerificationSurface } from "@/components/verity";

export const Route = createFileRoute("/app/proof")({
  head: () => ({ meta: [{ title: "Proof timeline · Verity" }] }),
  component: () => (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <VerificationSurface eyebrow="Batch B" title="Proof timeline">
        <div className="flex items-start gap-3">
          <Construction className="mt-0.5 h-5 w-5 text-indigo-300" />
          <div>
            <p className="text-sm text-zinc-300">
              Ledger-style verification history — every certificate, hash, and recovery, exportable
              and chain-integrity verified.
            </p>
            <Link
              to="/app/events/$eventId"
              params={{ eventId: "evt_1N7X9A2eZvKYIo2C" }}
              className="mt-3 inline-flex text-xs font-medium text-indigo-300 hover:text-indigo-200"
            >
              See a single proof record →
            </Link>
          </div>
        </div>
      </VerificationSurface>
    </div>
  ),
});
