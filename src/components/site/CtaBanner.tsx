import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 pb-12 lg:px-10">
      <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-indigo-500/20 bg-indigo-500/[0.07] px-6 py-5 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-500/15 ring-1 ring-indigo-500/30">
            <ShieldCheck className="h-5 w-5 text-indigo-300" />
          </div>
          <div>
            <div className="text-base font-semibold text-white">Start catching revenue leaks today</div>
            <p className="text-xs text-zinc-400">No credit card required. 14-day free trial. Cancel anytime.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button className="h-10 rounded-md bg-primary px-4 text-sm font-medium text-white hover:bg-primary/90">
            Start free trial
          </Button>
          <Button
            variant="outline"
            className="h-10 rounded-md border-white/15 bg-transparent px-4 text-sm font-medium text-white hover:bg-white/5"
          >
            Book a demo
          </Button>
        </div>
      </div>
    </section>
  );
}
