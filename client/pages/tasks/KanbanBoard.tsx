import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  CheckSquare,
  Clock,
  User,
  AlertCircle,
  Plus,
  Filter,
  Search,
  MoreHorizontal,
  Calendar,
  Bug,
  Feature,
  Task,
  Eye,
} from "lucide-react";

const columns = [
  { id: "todo", title: "To Do", color: "bg-slate-100", count: 8 },
  { id: "inprogress", title: "In Progress", color: "bg-blue-100", count: 5 },
  { id: "review", title: "Code Review", color: "bg-orange-100", count: 3 },
  { id: "testing", title: "Testing", color: "bg-purple-100", count: 4 },
  { id: "done", title: "Done", color: "bg-green-100", count: 12 },
];

const tasks = {
  todo: [
    {
      id: "TASK-301",
      title: "Implémenter validation formulaire inscription",
      type: "feature",
      priority: "High",
      assignee: "MD",
      storyPoints: 5,
      labels: ["Frontend", "Validation"],
      description: "Ajouter la validation côté client avec Zod",
    },
    {
      id: "TASK-302",
      title: "Configurer pipeline CI/CD",
      type: "task",
      priority: "Medium",
      assignee: null,
      storyPoints: 8,
      labels: ["DevOps", "Infrastructure"],
      description: "Mettre en place les tests automatisés",
    },
    {
      id: "TASK-303",
      title: "Documentation API authentification",
      type: "task",
      priority: "Low",
      assignee: "SL",
      storyPoints: 3,
      labels: ["Documentation"],
      description: "Documenter les endpoints OAuth2",
    },
  ],
  inprogress: [
    {
      id: "TASK-201",
      title: "Intégration OAuth2 Google",
      type: "feature",
      priority: "High",
      assignee: "PM",
      storyPoints: 13,
      labels: ["Backend", "Auth"],
      description: "Intégrer Google OAuth2 pour l'authentification",
      timeSpent: "4h 30min",
      progress: 65,
    },
    {
      id: "TASK-202",
      title: "Design système de notifications",
      type: "feature",
      priority: "Medium",
      assignee: "SL",
      storyPoints: 8,
      labels: ["UI/UX", "Design"],
      description: "Créer les mockups pour les notifications",
      timeSpent: "2h 15min",
      progress: 40,
    },
  ],
  review: [
    {
      id: "TASK-151",
      title: "API gestion des rôles utilisateurs",
      type: "feature",
      priority: "High",
      assignee: "MD",
      storyPoints: 8,
      labels: ["Backend", "API"],
      description: "Endpoints CRUD pour les rôles",
      reviewers: ["PM", "TM"],
    },
    {
      id: "TASK-152",
      title: "Fix bug pagination utilisateurs",
      type: "bug",
      priority: "Medium",
      assignee: "JP",
      storyPoints: 2,
      labels: ["Bug", "Backend"],
      description: "Corriger l'offset de pagination",
      reviewers: ["MD"],
    },
  ],
  testing: [
    {
      id: "TASK-101",
      title: "Tests E2E flux d'inscription",
      type: "task",
      priority: "High",
      assignee: "TM",
      storyPoints: 5,
      labels: ["Testing", "E2E"],
      description: "Tests Cypress pour l'inscription complète",
      testCoverage: 85,
    },
    {
      id: "TASK-102",
      title: "Validation sécurité API",
      type: "task",
      priority: "High",
      assignee: "TM",
      storyPoints: 8,
      labels: ["Security", "Testing"],
      description: "Audit sécurité des endpoints critiques",
      testCoverage: 92,
    },
  ],
  done: [
    {
      id: "TASK-001",
      title: "Setup base de données utilisateurs",
      type: "task",
      priority: "High",
      assignee: "PM",
      storyPoints: 5,
      labels: ["Database", "Setup"],
      description: "Configuration PostgreSQL avec Prisma",
      completedAt: "2024-02-10",
    },
    {
      id: "TASK-002",
      title: "Composants UI de base",
      type: "feature",
      priority: "Medium",
      assignee: "SL",
      storyPoints: 8,
      labels: ["Frontend", "UI"],
      description: "Button, Input, Card avec Tailwind",
      completedAt: "2024-02-08",
    },
  ],
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "bug":
      return <Bug className="h-3 w-3 text-red-500" />;
    case "feature":
      return <Feature className="h-3 w-3 text-blue-500" />;
    default:
      return <Task className="h-3 w-3 text-gray-500" />;
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

export default function KanbanBoard() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Kanban Board</h1>
            <p className="text-muted-foreground mt-1">
              Gérez vos tâches en cours avec le tableau Kanban SCRUM
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 lg:mt-0">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filtrer
            </Button>
            <Button variant="outline" size="sm">
              <Search className="mr-2 h-4 w-4" />
              Rechercher
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle Tâche
            </Button>
          </div>
        </div>

        {/* Sprint Info */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <h3 className="font-semibold">
                    Sprint 12 - Authentification
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    3 jours restants • 28/42 story points
                  </p>
                </div>
                <Badge variant="secondary">En cours</Badge>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">
                    Progression
                  </div>
                  <div className="font-semibold">67%</div>
                </div>
                <Progress value={67} className="w-24" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Kanban Columns */}
        <div className="grid grid-cols-5 gap-4 min-h-[600px]">
          {columns.map((column) => (
            <div key={column.id} className="space-y-3">
              {/* Column Header */}
              <div className={`${column.color} rounded-lg p-3`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">{column.title}</h3>
                  <Badge variant="outline" className="text-xs">
                    {column.count}
                  </Badge>
                </div>
              </div>

              {/* Tasks */}
              <div className="space-y-3">
                {tasks[column.id as keyof typeof tasks]?.map((task) => (
                  <Card
                    key={task.id}
                    className="hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <CardContent className="p-3">
                      {/* Task Header */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1">
                          {getTypeIcon(task.type)}
                          <span className="text-xs font-mono text-muted-foreground">
                            {task.id}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                        >
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>

                      {/* Task Title */}
                      <h4 className="text-sm font-medium mb-2 line-clamp-2">
                        {task.title}
                      </h4>

                      {/* Task Description */}
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {task.description}
                      </p>

                      {/* Labels */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {task.labels.map((label) => (
                          <Badge
                            key={label}
                            variant="outline"
                            className="text-xs px-1 py-0"
                          >
                            {label}
                          </Badge>
                        ))}
                      </div>

                      {/* Progress Bar (for In Progress) */}
                      {"progress" in task && (
                        <div className="mb-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progression</span>
                            <span>{task.progress}%</span>
                          </div>
                          <Progress value={task.progress} className="h-1" />
                        </div>
                      )}

                      {/* Test Coverage (for Testing) */}
                      {"testCoverage" in task && (
                        <div className="mb-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Couverture tests</span>
                            <span>{task.testCoverage}%</span>
                          </div>
                          <Progress value={task.testCoverage} className="h-1" />
                        </div>
                      )}

                      {/* Reviewers (for Code Review) */}
                      {"reviewers" in task && (
                        <div className="mb-3">
                          <div className="text-xs text-muted-foreground mb-1">
                            Reviewers:
                          </div>
                          <div className="flex gap-1">
                            {task.reviewers.map((reviewer) => (
                              <Avatar key={reviewer} className="h-5 w-5">
                                <AvatarFallback className="text-xs">
                                  {reviewer}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Time Spent (for In Progress) */}
                      {"timeSpent" in task && (
                        <div className="flex items-center gap-1 mb-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {task.timeSpent}
                          </span>
                        </div>
                      )}

                      {/* Completed Date (for Done) */}
                      {"completedAt" in task && (
                        <div className="flex items-center gap-1 mb-2">
                          <Calendar className="h-3 w-3 text-green-600" />
                          <span className="text-xs text-green-600">
                            Terminé le {task.completedAt}
                          </span>
                        </div>
                      )}

                      {/* Task Footer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={getPriorityColor(task.priority)}
                            className="text-xs"
                          >
                            {task.priority}
                          </Badge>
                          <span className="text-xs font-semibold">
                            {task.storyPoints} SP
                          </span>
                        </div>

                        {task.assignee && (
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {task.assignee}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Add Task Button */}
                <Button
                  variant="ghost"
                  className="w-full border-2 border-dashed border-muted-foreground/25 h-20"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une tâche
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-600">8</div>
                <div className="text-sm text-muted-foreground">À faire</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">5</div>
                <div className="text-sm text-muted-foreground">En cours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">3</div>
                <div className="text-sm text-muted-foreground">En review</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">4</div>
                <div className="text-sm text-muted-foreground">En test</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">12</div>
                <div className="text-sm text-muted-foreground">Terminé</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
