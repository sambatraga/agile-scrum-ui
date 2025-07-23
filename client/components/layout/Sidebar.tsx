import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
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
    title: "Eisenhower Matrix",
    href: "/productivity/eisenhower",
    icon: Target,
  },
  {
    title: "Pomodoro Timer",
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

  return (
    <div className="flex h-full w-64 flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-sm font-bold text-white">G</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-sidebar-foreground">
              GPAS
            </h1>
            <p className="text-xs text-sidebar-foreground/60">
              Agile Project Management
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent"></div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              John Doe
            </p>
            <p className="text-xs text-sidebar-foreground/60 truncate">
              Product Owner
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
