import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSidebar } from "./SidebarContext";
import {
  LayoutDashboard,
  FolderOpen,
  Users,
  BookOpen,
  Timer,
  CheckSquare,
  BarChart3,
  Brain,
  Bell,
  Settings,
  Calendar,
  Target,
  Clock,
  Zap,
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Projets",
    href: "/projects",
    icon: FolderOpen,
  },
  {
    title: "Equipe",
    href: "/team",
    icon: Users,
  },
  {
    title: "Backlog",
    href: "/backlog",
    icon: BookOpen,
  },
  {
    title: "Sprint",
    href: "/sprint-backlog",
    icon: Calendar,
  },
  {
    title: "Planning Sprint",
    href: "/sprints/planning",
    icon: Target,
  },
  {
    title: "Sprint Execution",
    href: "/sprints/execution",
    icon: Timer,
  },
  {
    title: "Sprint Review",
    href: "/sprints/review",
    icon: CheckSquare,
  },
  {
    title: "Tableau",
    href: "/tasks/kanban",
    icon: CheckSquare,
  },
  {
    title: "Time Tracking",
    href: "/tasks/time",
    icon: Clock,
  },
  {
    title: "Matrice d'Eisenhower",
    href: "/productivity/eisenhower",
    icon: Target,
  },
  {
    title: "Pomodoro ",
    href: "/productivity/pomodoro",
    icon: Zap,
  },
  {
    title: "AI Assistant",
    href: "/ai",
    icon: Brain,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const location = useLocation();
  const { isOpen } = useSidebar();

  return (
    <div
      className={cn(
        "flex h-full flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out overflow-hidden",
        isOpen ? "w-64" : "w-0 lg:w-16"
      )}
    >
      {/* Logo */}
      <div className={cn(
        "flex h-16 items-center border-b border-sidebar-border transition-all duration-300",
        isOpen ? "px-6" : "px-2 justify-center"
      )}>
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-sm font-bold text-white">G</span>
          </div>
          {isOpen && (
            <div>
              <h1 className="text-lg font-semibold text-sidebar-foreground">
                GPAS
              </h1>
              <p className="text-xs text-sidebar-foreground/60">
                Agile Project Management
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className={cn(
        "flex-1 space-y-1 py-4 transition-all duration-300",
        isOpen ? "px-3" : "px-2"
      )}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center rounded-lg py-2.5 text-sm font-medium transition-colors",
                isOpen ? "space-x-3 px-3" : "justify-center px-2",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
              )}
              title={!isOpen ? item.title : undefined}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {isOpen && <span>{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className={cn(
        "border-t border-sidebar-border p-4 transition-all duration-300",
        !isOpen && "px-2"
      )}>
        <div className={cn(
          "flex items-center",
          isOpen ? "space-x-3" : "justify-center"
        )}>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex-shrink-0"></div>
          {isOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                John Doe
              </p>
              <p className="text-xs text-sidebar-foreground/60 truncate">
                Product Owner
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
