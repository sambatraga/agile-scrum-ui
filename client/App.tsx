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
          <Route
            path="/sprints/planning"
            element={
              <PlaceholderPage
                title="Sprint Planning"
                description="Plan sprints with goal setting, story selection, and planning poker."
                icon={Target}
              />
            }
          />
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
          <Route
            path="/tasks/kanban"
            element={
              <PlaceholderPage
                title="Kanban Board"
                description="Manage tasks across To Do, In Progress, Code Review, Testing, and Done columns."
                icon={CheckSquare}
              />
            }
          />
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
            element={
              <PlaceholderPage
                title="Eisenhower Matrix"
                description="Organize tasks by urgency and importance with AI suggestions."
                icon={Target}
              />
            }
          />
          <Route
            path="/productivity/pomodoro"
            element={
              <PlaceholderPage
                title="Pomodoro Timer"
                description="Boost productivity with focused work sessions and break reminders."
                icon={Zap}
              />
            }
          />

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
