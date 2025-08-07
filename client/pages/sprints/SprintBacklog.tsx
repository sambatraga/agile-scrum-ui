import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Target,
  TrendingUp,
  Clock,
  Users,
  Plus,
  Filter,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Zap,
} from "lucide-react";

const sprintInfo = {
  number: 12,
  goal: "Implémenter le système d'authentification complet avec OAuth2",
  startDate: "2024-02-01",
  endDate: "2024-02-15",
  daysRemaining: 3,
  capacity: 45,
  committed: 42,
  completed: 28,
};

const sprintBacklog = [
  {
    id: "US-201",
    title: "En tant qu'utilisateur, je veux me connecter avec OAuth2",
    priority: "High",
    storyPoints: 8,
    status: "Done",
    assignee: "Marie D.",
    tasks: [
      { id: "T-401", title: "Setup OAuth2 provider", status: "Done", hours: 4 },
      { id: "T-402", title: "Implement login flow", status: "Done", hours: 6 },
      { id: "T-403", title: "Add error handling", status: "Done", hours: 2 },
    ],
  },
  {
    id: "US-202",
    title: "En tant qu'admin, je veux gérer les rôles utilisateurs",
    priority: "High",
    storyPoints: 13,
    status: "In Progress",
    assignee: "Pierre M.",
    tasks: [
      { id: "T-404", title: "Design role management UI", status: "Done", hours: 8 },
      { id: "T-405", title: "Implement CRUD operations", status: "In Progress", hours: 10 },
      { id: "T-406", title: "Add permission matrix", status: "To Do", hours: 6 },
    ],
  },
  {
    id: "US-203",
    title: "En tant qu'utilisateur, je veux récupérer mon mot de passe",
    priority: "Medium",
    storyPoints: 5,
    status: "Done",
    assignee: "Sophie L.",
    tasks: [
      { id: "T-407", title: "Password reset email template", status: "Done", hours: 3 },
      { id: "T-408", title: "Reset password API", status: "Done", hours: 4 },
      { id: "T-409", title: "Frontend reset form", status: "Done", hours: 3 },
    ],
  },
  {
    id: "US-204",
    title: "En tant qu'utilisateur, je veux activer la 2FA",
    priority: "Medium",
    storyPoints: 8,
    status: "In Progress",
    assignee: "Thomas M.",
    tasks: [
      { id: "T-410", title: "Research 2FA solutions", status: "Done", hours: 4 },
      { id: "T-411", title: "Implement TOTP", status: "In Progress", hours: 8 },
      { id: "T-412", title: "QR code generation", status: "To Do", hours: 4 },
    ],
  },
  {
    id: "US-205",
    title: "En tant qu'admin, je veux voir l'historique des connexions",
    priority: "Low",
    storyPoints: 8,
    status: "To Do",
    assignee: "Julie P.",
    tasks: [
      { id: "T-413", title: "Database schema for logs", status: "To Do", hours: 3 },
      { id: "T-414", title: "Login tracking system", status: "To Do", hours: 6 },
      { id: "T-415", title: "Admin dashboard view", status: "To Do", hours: 5 },
    ],
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Done":
      return "bg-green-100 text-green-800 border-green-200";
    case "In Progress":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "To Do":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "destructive";
    case "Medium":
      return "default";
    case "Low":
      return "outline";
    default:
      return "outline";
  }
};

export default function SprintBacklog() {
  const completionPercentage = Math.round((sprintInfo.completed / sprintInfo.committed) * 100);
  const capacityUsage = Math.round((sprintInfo.committed / sprintInfo.capacity) * 100);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sprint Backlog</h1>
            <p className="text-muted-foreground mt-1">
              Gérez les user stories sélectionnées pour le sprint actuel
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 lg:mt-0">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtrer
            </Button>
            <Button variant="outline">
              <BarChart3 className="mr-2 h-4 w-4" />
              Burndown
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter Tâche
            </Button>
          </div>
        </div>

        {/* Sprint Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Sprint {sprintInfo.number} - Authentification</span>
              <Badge variant="secondary">En cours</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Objectif Sprint</h3>
                  <p className="text-sm text-muted-foreground">{sprintInfo.goal}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Date début</div>
                    <div className="font-medium">{sprintInfo.startDate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Date fin</div>
                    <div className="font-medium">{sprintInfo.endDate}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      {sprintInfo.daysRemaining}
                    </div>
                    <div className="text-sm text-muted-foreground">Jours restants</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {sprintInfo.committed}
                    </div>
                    <div className="text-sm text-muted-foreground">SP engagés</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {completionPercentage}%
                    </div>
                    <div className="text-sm text-muted-foreground">Complété</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progression Sprint</span>
                    <span>{sprintInfo.completed}/{sprintInfo.committed} SP</span>
                  </div>
                  <Progress value={completionPercentage} className="w-full" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Capacité utilisée</span>
                    <span>{sprintInfo.committed}/{sprintInfo.capacity} SP</span>
                  </div>
                  <Progress value={capacityUsage} className="w-full" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sprint Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">User Stories</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sprintBacklog.length}</div>
              <p className="text-xs text-muted-foreground">
                2 terminées, 2 en cours
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vélocité</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-green-600">+5 vs sprint précédent</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Équipe</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Membres actifs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Burndown</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Avance</div>
              <p className="text-xs text-green-600">7 SP d'avance</p>
            </CardContent>
          </Card>
        </div>

        {/* Sprint Backlog Items */}
        <Card>
          <CardHeader>
            <CardTitle>User Stories du Sprint</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {sprintBacklog.map((story) => (
                <div key={story.id} className="border rounded-lg p-4">
                  {/* Story Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-mono text-muted-foreground">
                          {story.id}
                        </span>
                        <Badge variant={getPriorityColor(story.priority)}>
                          {story.priority}
                        </Badge>
                        <Badge className={getStatusColor(story.status)}>
                          {story.status}
                        </Badge>
                      </div>
                      <h3 className="font-medium mb-1">{story.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          <span>{story.storyPoints} SP</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Avatar className="h-4 w-4">
                            <AvatarFallback className="text-xs">
                              {story.assignee.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span>{story.assignee}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tasks Breakdown */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Tâches:</h4>
                    <div className="grid gap-2">
                      {story.tasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              {task.status === "Done" && (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              )}
                              {task.status === "In Progress" && (
                                <Zap className="h-4 w-4 text-blue-600" />
                              )}
                              {task.status === "To Do" && (
                                <div className="h-4 w-4 rounded-full border-2 border-gray-400" />
                              )}
                              <span className="text-sm font-mono text-muted-foreground">
                                {task.id}
                              </span>
                            </div>
                            <span className="text-sm">{task.title}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="text-xs">
                              {task.hours}h
                            </Badge>
                            <Badge className={getStatusColor(task.status)}>
                              {task.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Progress Summary */}
                  <Separator className="my-4" />
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span>
                        {story.tasks.filter(t => t.status === "Done").length}/
                        {story.tasks.length} tâches terminées
                      </span>
                      <span>
                        {story.tasks.reduce((acc, t) => 
                          t.status === "Done" ? acc + t.hours : acc, 0
                        )}/
                        {story.tasks.reduce((acc, t) => acc + t.hours, 0)}h
                      </span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Voir détails
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sprint Actions */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Actions Sprint</h3>
                <p className="text-sm text-muted-foreground">
                  Gérez les actions et ajustements du sprint
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Daily Standup
                </Button>
                <Button variant="outline">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Signaler Impediment
                </Button>
                <Button>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Voir Burndown
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
