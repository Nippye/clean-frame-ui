import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Navbar() {
  return (
    <header className="w-full border-b border-white/[0.04]">
      <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 lg:px-10">
        <div className="flex items-center gap-10">
          <Link to="/"><Logo /></Link>
          <ul className="hidden items-center gap-7 text-[13.5px] text-zinc-300 lg:flex">
            <li>
              <Link to="/how-it-works" className="hover:text-white">How It Works</Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-5">
          <Link to="/auth" className="hidden text-[13.5px] text-zinc-300 hover:text-white sm:inline">
            Log in
          </Link>
          <Link
            to="/auth"
            className="inline-flex h-9 items-center rounded-md bg-primary px-3.5 text-[13px] font-semibold text-primary-foreground transition-colors hover:brightness-110"
          >
            Verify Revenue Flow <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
