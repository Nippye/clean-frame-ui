import { ShieldCheck } from "lucide-react";
import { Logo } from "./Logo";

export function ClosingStatement() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 pb-6 pt-2 text-center lg:px-10">
      <ShieldCheck className="mx-auto h-4 w-4 text-zinc-500" />
      <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">
        Built for teams who run revenue across{" "}
        <span className="text-primary">too many systems</span> to trust any single dashboard.
      </p>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-2 text-[12px] leading-relaxed text-zinc-500">
            Revenue integrity for<br />modern SaaS systems.
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-x-7 gap-y-3 text-[13px] text-zinc-400">
          {["How It Works", "Pricing", "Security", "Privacy", "Terms", "Contact"].map((l) => (
            <a key={l} href="#" className="hover:text-white">{l}</a>
          ))}
        </nav>
        <div className="text-[12px] text-zinc-500">© 2026 RevTether</div>
      </div>
    </footer>
  );
}
