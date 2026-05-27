import { ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

const links = ["Product", "Solutions", "Resources", "Company"];

export function Navbar() {
  return (
    <header className="w-full">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-10">
        <div className="flex items-center gap-10">
          <Logo />
          <ul className="hidden items-center gap-7 text-sm text-zinc-300 lg:flex">
            {links.map((l) => (
              <li key={l}>
                <a href="#" className="flex items-center gap-1 hover:text-white">
                  {l}
                  <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                </a>
              </li>
            ))}
            <li>
              <a href="#" className="hover:text-white">Pricing</a>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="hidden text-sm text-zinc-300 hover:text-white sm:inline">
            Log in
          </a>
          <Button
            variant="outline"
            className="hidden h-9 rounded-md border-white/15 bg-transparent px-4 text-sm font-medium text-white hover:bg-white/5 sm:inline-flex"
          >
            Book a demo
          </Button>
          <Button className="h-9 rounded-md bg-primary px-4 text-sm font-medium text-white hover:bg-primary/90">
            Start free trial
          </Button>
        </div>
      </nav>
    </header>
  );
}
