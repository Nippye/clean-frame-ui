import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";

import { RevenueFailures } from "@/components/site/SilentFailures";
import { HowItWorks } from "@/components/site/HowItWorks";
import { OperatorVisibility } from "@/components/site/Security";
import { CtaBanner } from "@/components/site/CtaBanner";
import { ClosingStatement, Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RevTether — Stop Losing 3–9% of Revenue to Billing Gaps" },
      {
        name: "description",
        content:
          "Usage-based SaaS companies lose 3–9% of revenue through metering-to-billing gaps. RevTether finds the leaks, quantifies the loss, and recovers the money automatically.",
      },
      { property: "og:title", content: "RevTether — Stop Losing 3–9% of Revenue to Billing Gaps" },
      {
        property: "og:description",
        content:
          "Find, quantify, and recover the 3–9% of revenue your billing stack silently drops.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <RevenueFailures />
      <HowItWorks />
      <OperatorVisibility />
      <CtaBanner />
      <ClosingStatement />
      <Footer />
    </main>
  );
}
