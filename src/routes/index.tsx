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
      { title: "RevTether — Revenue Integrity Platform" },
      {
        name: "description",
        content:
          "Know when revenue breaks. Before finance does. RevTether verifies that payments, upgrades, refunds, and trial conversions propagate correctly across CRM, provisioning, analytics, and finance systems.",
      },
      { property: "og:title", content: "RevTether — Revenue Integrity Platform" },
      {
        property: "og:description",
        content:
          "Catch silent revenue failures before finance discovers them.",
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
