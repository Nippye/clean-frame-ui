import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Activity,
  AlertOctagon,
  LayoutDashboard,
  Plug,
  ScrollText,
  Wand2,
  ListChecks,
  Hash,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { events } from "@/lib/verity-fixtures";

type Ctx = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const CommandPaletteContext = React.createContext<Ctx | null>(null);

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);

  const go = (path: string) => {
    setOpen(false);
    navigate({ to: path });
  };

  return (
    <CommandPaletteContext.Provider value={{ open, setOpen }}>
      {children}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search events, hashes, recoveries…" />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="Navigate">
            <CommandItem onSelect={() => go("/app")}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem onSelect={() => go("/app/events")}>
              <Activity className="mr-2 h-4 w-4" />
              <span>Events</span>
            </CommandItem>
            <CommandItem onSelect={() => go("/app/incidents")}>
              <AlertOctagon className="mr-2 h-4 w-4" />
              <span>Incidents</span>
            </CommandItem>
            <CommandItem onSelect={() => go("/app/proof")}>
              <ScrollText className="mr-2 h-4 w-4" />
              <span>Proof timeline</span>
            </CommandItem>
            <CommandItem onSelect={() => go("/app/recovery")}>
              <Wand2 className="mr-2 h-4 w-4" />
              <span>Recovery center</span>
            </CommandItem>
            <CommandItem onSelect={() => go("/app/rules")}>
              <ListChecks className="mr-2 h-4 w-4" />
              <span>Verification rules</span>
            </CommandItem>
            <CommandItem onSelect={() => go("/app/connectors")}>
              <Plug className="mr-2 h-4 w-4" />
              <span>Connectors</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Events">
            {events.map((e) => (
              <CommandItem
                key={e.id}
                value={`${e.type} ${e.id} ${e.customer}`}
                onSelect={() => go(`/app/events/${e.id}`)}
              >
                <Activity className="mr-2 h-4 w-4" />
                <div className="flex min-w-0 flex-col">
                  <span className="truncate font-mono text-xs">{e.type}</span>
                  <span className="truncate text-[11px] text-zinc-500">{e.id}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Proof records">
            {events.map((e) => (
              <CommandItem
                key={`hash-${e.id}`}
                value={`${e.verificationId} ${e.hash}`}
                onSelect={() => go(`/app/events/${e.id}`)}
              >
                <Hash className="mr-2 h-4 w-4" />
                <div className="flex min-w-0 flex-col">
                  <span className="truncate font-mono text-xs">{e.verificationId}</span>
                  <span className="truncate font-mono text-[11px] text-zinc-500">{e.hash}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </CommandPaletteContext.Provider>
  );
}

export function useCommandPalette() {
  const ctx = React.useContext(CommandPaletteContext);
  if (!ctx) throw new Error("useCommandPalette must be used inside CommandPaletteProvider");
  return ctx;
}
