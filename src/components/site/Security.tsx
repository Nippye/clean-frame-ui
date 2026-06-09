import { Check } from "lucide-react";

const items = [
  "Read-only access",
  "Encrypted data flow",
  "Complete audit trail",
  "SOC 2 readiness",
];

export function Security() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20 lg:px-10">
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-y border-white/[0.06] py-6">
        {items.map((it) => (
          <div key={it} className="inline-flex items-center gap-2 text-[13px] text-zinc-300">
            <Check className="h-4 w-4 text-emerald-400" />
            {it}
          </div>
        ))}
      </div>
    </section>
  );
}
