import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Activity,
  AlertOctagon,
  ScrollText,
  Wand2,
  ListChecks,
  Plug,
  ShieldCheck,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const groups = [
  {
    label: "Workflow",
    items: [
      { title: "Dashboard", url: "/app", icon: LayoutDashboard, match: "exact" as const },
      { title: "Events", url: "/app/events", icon: Activity },
      { title: "Incidents", url: "/app/incidents", icon: AlertOctagon },
    ],
  },
  {
    label: "Trust",
    items: [
      { title: "Proof timeline", url: "/app/proof", icon: ScrollText, comingSoon: true },
      { title: "Recovery", url: "/app/recovery", icon: Wand2 },
      { title: "Verification rules", url: "/app/rules", icon: ListChecks, comingSoon: true },
    ],
  },
  {
    label: "Surfaces",
    items: [{ title: "Connectors", url: "/app/connectors", icon: Plug, comingSoon: true }],
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  const isActive = (url: string, match?: "exact") =>
    match === "exact" ? pathname === url : pathname === url || pathname.startsWith(url + "/");

  return (
    <Sidebar collapsible="icon" className="border-r border-white/5">
      <SidebarHeader className="border-b border-white/5">
        <Link
          to="/app"
          className="flex items-center gap-2 px-1.5 py-1.5"
          aria-label="RevTether"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-500/20 ring-1 ring-indigo-400/40">
            <ShieldCheck className="h-4 w-4 text-indigo-300" />
          </span>
          {!collapsed && (
            <span className="text-sm font-semibold tracking-tight text-white">RevTether</span>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            {!collapsed && (
              <SidebarGroupLabel className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                {group.label}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.url, item.match)}
                      tooltip={item.title}
                    >
                      <Link to={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span className="flex-1">{item.title}</span>
                        {!collapsed && "comingSoon" in item && item.comingSoon && (
                          <span
                            aria-label="Coming soon"
                            className="rounded-full border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-zinc-400"
                          >
                            Soon
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
