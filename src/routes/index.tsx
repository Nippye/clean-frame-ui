import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { LogoStrip } from "@/components/site/LogoStrip";
import { FeatureGrid } from "@/components/site/FeatureGrid";
import { CtaBanner } from "@/components/site/CtaBanner";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <LogoStrip />
      <FeatureGrid />
      <CtaBanner />
    </main>
  );
}
