import logoAsset from "@/assets/revtether-logo.png.asset.json";

export function Logo({
  className = "",
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={`inline-flex items-center ${className}`} aria-label="RevTether">
      <img
        src={logoAsset.url}
        alt="RevTether"
        className={showWordmark ? "h-7 w-auto" : "h-7 w-7 object-cover object-left"}
        style={showWordmark ? undefined : { aspectRatio: "1 / 1" }}
      />
    </span>
  );
}
