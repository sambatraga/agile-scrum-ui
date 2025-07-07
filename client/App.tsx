import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import Projects from "./pages/projects/Projects";
import ProductBacklog from "./pages/backlog/ProductBacklog";
import AIAssistant from "./pages/ai/AIAssistant";
import Analytics from "./pages/analytics/Analytics";
import NotFound from "./pages/NotFound";

// Import des nouvelles pages
import SprintPlanning from "./pages/sprints/SprintPlanning";
import KanbanBoard from "./pages/tasks/KanbanBoard";
import EisenhowerMatrix from "./pages/productivity/EisenhowerMatrix";
import PomodoroTimer from "./pages/productivity/PomodoroTimer";

// Placeholder imports for other modules
import { PlaceholderPage } from "./components/PlaceholderPage";
import {
  Users,
  Calendar,
  Timer,
  CheckSquare,
  Target,
  Clock,
  Zap,
  Bell,
  Settings,
} from "lucide-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main Dashboard */}
          <Route path="/" element={<Dashboard />} />

          {/* Authentication */}
          <Route path="/auth/login" element={<Login />} />

          {/* Projects */}
          <Route path="/projects" element={<Projects />} />

          {/* Team */}
          <Route
            path="/team"
            element={
              <PlaceholderPage
                title="Team Management"
                description="Manage team members, roles, and availability status."
                icon={Users}
              />
            }
          />

          {/* Backlog */}
          <Route path="/backlog" element={<ProductBacklog />} />
          <Route
            path="/sprint-backlog"
            element={
              <PlaceholderPage
                title="Sprint Backlog"
                description="Select user stories for sprints and manage sprint capacity."
                icon={Calendar}
              />
            }
          />

          {/* Sprints */}
          <Route path="/sprints/planning" element={<SprintPlanning />} />
          <Route
            path="/sprints/execution"
            element={
              <PlaceholderPage
                title="Sprint Execution"
                description="Track sprint progress with burndown charts and impediment management."
                icon={Timer}
              />
            }
          />
          <Route
            path="/sprints/review"
            element={
              <PlaceholderPage
                title="Sprint Review"
                description="Conduct sprint reviews, retrospectives, and velocity reporting."
                icon={CheckSquare}
              />
            }
          />

          {/* Tasks */}
          <Route path="/tasks/kanban" element={<KanbanBoard />} />
          <Route
            path="/tasks/time"
            element={
              <PlaceholderPage
                title="Time Tracking"
                description="Track time spent on tasks with timers and productivity analytics."
                icon={Clock}
              />
            }
          />

          {/* Productivity */}
          <Route
            path="/productivity/eisenhower"
            element={<EisenhowerMatrix />}
          />
          <Route path="/productivity/pomodoro" element={<PomodoroTimer />} />

          {/* AI Assistant */}
          <Route path="/ai" element={<AIAssistant />} />

          {/* Analytics */}
          <Route path="/analytics" element={<Analytics />} />

          {/* Notifications */}
          <Route
            path="/notifications"
            element={
              <PlaceholderPage
                title="Notification Center"
                description="Manage alerts, urgent notifications, and communication preferences."
                icon={Bell}
              />
            }
          />

          {/* Settings */}
          <Route
            path="/settings"
            element={
              <PlaceholderPage
                title="System Settings"
                description="Configure Scrum settings, user roles, security, and system preferences."
                icon={Settings}
              />
            }
          />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
