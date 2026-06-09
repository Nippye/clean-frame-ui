import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-28 text-center lg:px-10 lg:py-36">
      <h2 className="mx-auto max-w-[20ch] text-[36px] font-semibold tracking-[-0.01em] text-white sm:text-[44px]">
        Verify your revenue flow.
      </h2>
      <div className="mt-9 flex justify-center">
        <Button className="h-11 rounded-md bg-primary px-5 text-sm font-medium text-white hover:bg-primary/90">
          Start free trial <ArrowRight className="ml-1.5 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
