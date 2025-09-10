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
import SprintBacklog from "./pages/sprints/SprintBacklog";
import SprintExecution from "./pages/sprints/SprintExecution";
import SprintReview from "./pages/sprints/SprintReview";
import KanbanBoard from "./pages/tasks/KanbanBoard";
import TimeTracking from "./pages/tasks/TimeTracking";
import SprintTasks from "./pages/tasks/SprintTasks";
import EisenhowerMatrix from "./pages/productivity/EisenhowerMatrix";
import PomodoroTimer from "./pages/productivity/PomodoroTimer";
import TeamManagement from "./pages/team/TeamManagement";
import Notifications from "./pages/notifications/Notifications";
import Settings from "./pages/settings/Settings";

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
  Settings as SettingsIcon,
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
          <Route path="/team" element={<TeamManagement />} />

          {/* Backlog */}
          <Route path="/backlog" element={<ProductBacklog />} />
          <Route path="/sprint-backlog" element={<SprintBacklog />} />

          {/* Sprints */}
          <Route path="/sprints/planning" element={<SprintPlanning />} />
          <Route path="/sprints/execution" element={<SprintExecution />} />
          <Route path="/sprints/review" element={<SprintReview />} />

          {/* Tasks */}
          <Route path="/tasks/kanban" element={<KanbanBoard />} />
          <Route path="/tasks/time" element={<TimeTracking />} />

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
          <Route path="/notifications" element={<Notifications />} />

          {/* Settings */}
          <Route path="/settings" element={<Settings />} />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
