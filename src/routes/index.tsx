import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { ProductShot } from "@/components/site/ProductShot";
import { FindingExample } from "@/components/site/FindingExample";
import { SilentFailures } from "@/components/site/SilentFailures";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Security } from "@/components/site/Security";
import { CtaBanner } from "@/components/site/CtaBanner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RevTether — Revenue Integrity Platform" },
      {
        name: "description",
        content:
          "Know when revenue breaks. Before finance does. Continuously verify payments, billing, webhooks, and downstream systems.",
      },
      { property: "og:title", content: "RevTether — Revenue Integrity Platform" },
      {
        property: "og:description",
        content:
          "Continuously verify payments, billing, webhooks, and downstream systems.",
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
      <ProductShot />
      <FindingExample />
      <SilentFailures />
      <HowItWorks />
      <Security />
      <CtaBanner />
    </main>
  );
}
