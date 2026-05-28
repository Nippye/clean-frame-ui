import { createFileRoute } from "@tanstack/react-router";
import { Construction } from "lucide-react";
import { VerificationSurface } from "@/components/verity";

export const Route = createFileRoute("/app/recovery")({
  head: () => ({ meta: [{ title: "Recovery center · Verity" }] }),
  component: () => (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <VerificationSurface eyebrow="Batch B" title="Recovery center">
        <div className="flex items-start gap-3">
          <Construction className="mt-0.5 h-5 w-5 text-indigo-300" />
          <p className="text-sm text-zinc-300">
            Pending recoveries with confidence, blast radius, rollback availability, and approval
            workflow — every action emits a proof record.
          </p>
        </div>
      </VerificationSurface>
    </div>
  ),
});
