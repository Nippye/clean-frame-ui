import { createFileRoute } from "@tanstack/react-router";
import { Construction } from "lucide-react";
import { VerificationSurface } from "@/components/verity";

export const Route = createFileRoute("/app/connectors")({
  head: () => ({ meta: [{ title: "Connectors · Verity" }] }),
  component: () => (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <VerificationSurface eyebrow="Batch B" title="Verification surfaces">
        <div className="flex items-start gap-3">
          <Construction className="mt-0.5 h-5 w-5 text-indigo-300" />
          <p className="text-sm text-zinc-300">
            Stripe, HubSpot, Salesforce, Auth0, Firebase, Postgres — every connector is a
            verification surface with coverage %, last verified, and 24h mismatches.
          </p>
        </div>
      </VerificationSurface>
    </div>
  ),
});
