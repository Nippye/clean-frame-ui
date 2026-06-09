import { ArrowRight } from "lucide-react";

export function ProductShot() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[920px] overflow-hidden rounded-xl border border-white/[0.08] bg-[oklch(0.19_0.012_265)] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
              Investigation
            </div>
            <div className="font-mono text-[13px] text-zinc-300">#1042</div>
          </div>
          <div className="rounded-md border border-rose-500/30 bg-rose-500/[0.08] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-rose-300">
            Open
          </div>
        </div>

        <div className="px-6 py-7 sm:px-10 sm:py-9">
          <h3 className="text-[20px] font-semibold tracking-tight text-white">
            Stripe invoice paid · CRM contact missing
          </h3>
          <div className="mt-2 text-sm text-zinc-500">
            Detected 2 minutes ago · evt_1N7X9A2eZvKYIo2C
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">
                Expected
              </div>
              <div className="mt-2 text-[15px] text-white">CRM contact created</div>
              <div className="mt-1 text-[13px] text-zinc-500">HubSpot · within 30s of invoice.paid</div>
            </div>
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">
                Actual
              </div>
              <div className="mt-2 text-[15px] text-rose-300">No customer record found</div>
              <div className="mt-1 text-[13px] text-zinc-500">HubSpot API · 404 on lookup</div>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap items-end justify-between gap-4 border-t border-white/[0.06] pt-6">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">
                Revenue at risk
              </div>
              <div className="mt-1 font-mono text-2xl font-semibold tracking-tight text-white">
                $1,200.00
              </div>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 rounded-md border border-white/15 px-4 py-2 text-sm font-medium text-white hover:bg-white/5"
            >
              View investigation <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
