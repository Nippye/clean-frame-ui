import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

const linksWithMenu = ["Product", "Solutions", "Resources"];

export function Navbar() {
  return (
    <header className="w-full border-b border-white/[0.04]">
      <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 lg:px-10">
        <div className="flex items-center gap-10">
          <Link to="/"><Logo /></Link>
          <ul className="hidden items-center gap-7 text-[13.5px] text-zinc-300 lg:flex">
            {linksWithMenu.slice(0, 1).map((l) => (
              <li key={l}>
                <a href="#" className="inline-flex items-center gap-1 hover:text-white">
                  {l} <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                </a>
              </li>
            ))}
            <li><a href="#" className="hover:text-white">Integrations</a></li>
            {linksWithMenu.slice(1).map((l) => (
              <li key={l}>
                <a href="#" className="inline-flex items-center gap-1 hover:text-white">
                  {l} <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                </a>
              </li>
            ))}
            <li><a href="#" className="hover:text-white">Pricing</a></li>
          </ul>
        </div>
        <div className="flex items-center gap-5">
          <a href="#" className="hidden text-[13.5px] text-zinc-300 hover:text-white sm:inline">
            Log in
          </a>
          <a
            href="#"
            className="inline-flex h-9 items-center rounded-md bg-primary px-3.5 text-[13px] font-semibold text-primary-foreground transition-colors hover:brightness-110"
          >
            Verify Revenue Flow <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </a>
        </div>
      </nav>
    </header>
  );
}
