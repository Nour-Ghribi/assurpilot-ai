import {
  LayoutDashboard,
  Users,
  Lightbulb,
  MessageSquare,
  FileText,
  FolderSearch,
  Target,
  Bot,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Clients", url: "/clients", icon: Users },
  { title: "Recommendations", url: "/recommendations", icon: Lightbulb },
  { title: "Chatbot RAG", url: "/chatbot", icon: MessageSquare },
  { title: "Pitch Generator", url: "/pitch", icon: FileText },
  { title: "Documents / RAG", url: "/documents", icon: FolderSearch },
  { title: "Opportunities", url: "/opportunities", icon: Target },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarContent className="bg-sidebar pt-4">
        <div className={`flex items-center gap-2 px-4 mb-6 ${collapsed ? "justify-center" : ""}`}>
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-sm font-bold text-sidebar-primary-foreground tracking-tight">
                AssurPilot AI
              </h1>
              <p className="text-[10px] text-sidebar-foreground/60">Intelligent Sales Assistant</p>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const active = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={active}>
                      <NavLink
                        to={item.url}
                        className="flex items-center gap-3 text-sidebar-foreground hover:text-sidebar-primary-foreground transition-colors"
                      >
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span className="text-sm">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}