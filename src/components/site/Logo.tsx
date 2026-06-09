export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden>
        <path
          d="M16 2.5L28 9v14l-12 6.5L4 23V9l12-6.5z"
          stroke="hsl(231 90% 65%)"
          strokeWidth="2"
          fill="hsl(231 90% 65% / 0.15)"
        />
        <path
          d="M10.5 16.5l3.8 3.8L21.5 13"
          stroke="hsl(231 90% 70%)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span className="text-[22px] font-semibold tracking-tight text-white">RevTether</span>
    </div>
  );
}
