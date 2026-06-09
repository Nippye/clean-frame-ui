const logos = [
  "OpenDialog",
  "Superhuman",
  "Pika",
  "ramp",
  "Clay",
  "Vanta",
];

export function LogoStrip() {
  return (
    <section className="border-y border-white/5 bg-[oklch(0.145_0.012_265)]">
      <div className="mx-auto max-w-[1280px] px-6 py-8 lg:px-10">
        <div className="mb-5 text-center text-[10px] font-semibold tracking-[0.18em] text-zinc-500">
          TRUSTED BY FAST-GROWING SAAS COMPANIES
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-zinc-400 sm:gap-x-16">
          {logos.map((name) => (
            <span
              key={name}
              className="text-lg font-semibold tracking-tight opacity-80"
              style={{ fontFamily: name === "ramp" ? "ui-serif, Georgia, serif" : undefined }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
