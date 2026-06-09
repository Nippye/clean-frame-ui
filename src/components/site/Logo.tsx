export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden>
        <path
          d="M16 2.5L28 9v14l-12 6.5L4 23V9l12-6.5z"
          stroke="oklch(0.82 0.18 155)"
          strokeWidth="2"
          fill="oklch(0.82 0.18 155 / 0.12)"
        />
        <path
          d="M10.5 16.5l3.8 3.8L21.5 13"
          stroke="oklch(0.86 0.18 155)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span className="text-[19px] font-semibold tracking-tight text-white">RevTether</span>
    </div>
  );
}
