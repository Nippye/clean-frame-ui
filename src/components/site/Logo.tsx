import logoAsset from "@/assets/revtether-logo.png.asset.json";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="RevTether"
      className={`h-7 w-auto ${className}`}
    />
  );
}
