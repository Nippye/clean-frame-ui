import { createFileRoute } from "@tanstack/react-router";
import { Construction } from "lucide-react";
import { VerificationSurface } from "@/components/verity";

export const Route = createFileRoute("/app/rules")({
  head: () => ({ meta: [{ title: "Verification rules · RevTether" }] }),
  component: () => (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <VerificationSurface eyebrow="Batch B" title="Verification rules">
        <div className="flex items-start gap-3">
          <Construction className="mt-0.5 h-5 w-5 text-indigo-300" />
          <p className="text-sm text-zinc-300">
            Author trigger events, expected state per system, validation conditions, failure
            thresholds, and recovery mapping — with a dry-run plan against recent events.
          </p>
        </div>
      </VerificationSurface>
    </div>
  ),
});
