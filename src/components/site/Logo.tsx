import { ShieldCheck } from "lucide-react";

export function Logo({
  className = "",
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`} aria-label="RevTether">
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500/15 ring-1 ring-emerald-400/40">
        <ShieldCheck className="h-4 w-4 text-emerald-300" />
      </span>
      {showWordmark && (
        <span className="text-[15px] font-semibold tracking-tight text-white">RevTether</span>
      )}
    </span>
  );
}
