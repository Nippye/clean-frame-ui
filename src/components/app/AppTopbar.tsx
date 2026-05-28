import { ChevronRight, Search, Globe } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useCommandPalette } from "./CommandPalette";

function Breadcrumbs() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const parts = pathname.replace(/^\//, "").split("/").filter(Boolean);
  // /app/events/evt_xxx → [app, events, evt_xxx]
  const labels: Record<string, string> = {
    app: "Verity",
    events: "Events",
    incidents: "Incidents",
    proof: "Proof timeline",
    recovery: "Recovery",
    rules: "Verification rules",
    connectors: "Connectors",
  };
  const crumbs = parts.map((p, i) => {
    const path = "/" + parts.slice(0, i + 1).join("/");
    const label = labels[p] ?? p;
    const isMono = p.startsWith("evt_") || p.startsWith("ver_");
    return { path, label, isMono, isLast: i === parts.length - 1 };
  });

  return (
    <nav className="hidden items-center gap-1 text-xs text-zinc-400 sm:flex">
      {crumbs.map((c, i) => (
        <span key={c.path} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="h-3 w-3 text-zinc-600" />}
          {c.isLast ? (
            <span className={c.isMono ? "font-mono text-zinc-200" : "text-zinc-200"}>
              {c.label}
            </span>
          ) : (
            <Link to={c.path} className="hover:text-zinc-200">
              {c.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}

export function AppTopbar() {
  const { setOpen } = useCommandPalette();
  return (
    <header className="sticky top-0 z-30 flex h-12 items-center gap-3 border-b border-white/5 bg-[oklch(0.16_0.012_265)]/90 px-3 backdrop-blur">
      <SidebarTrigger className="text-zinc-400 hover:text-white" />
      <Breadcrumbs />
      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={() => setOpen(true)}
          className="hidden items-center gap-2 rounded-md border border-white/10 bg-white/[0.02] px-2.5 py-1.5 text-xs text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-200 sm:inline-flex"
        >
          <Search className="h-3.5 w-3.5" />
          <span>Search events, hashes…</span>
          <kbd className="ml-2 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
            ⌘K
          </kbd>
        </button>
        <button className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.02] px-2.5 py-1.5 text-xs text-zinc-300 transition-colors hover:bg-white/5">
          <Globe className="h-3.5 w-3.5 text-emerald-400" />
          Production
        </button>
      </div>
    </header>
  );
}
