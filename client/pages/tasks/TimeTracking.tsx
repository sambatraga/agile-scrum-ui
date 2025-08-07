import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  Play,
  Pause,
  Square,
  Timer,
  Target,
  TrendingUp,
  Calendar,
  BarChart3,
  Users,
  Filter,
  Download,
  Plus,
  Edit,
} from "lucide-react";

const currentTask = {
  id: "TASK-201",
  title: "Intégration OAuth2 Google",
  project: "Authentification",
  isRunning: true,
  currentSession: "2h 15min",
  totalToday: "6h 45min",
  estimatedTime: "8h",
  storyPoints: 13,
};

const todayTimesheet = [
  {
    id: "TASK-201",
    title: "Intégration OAuth2 Google",
    project: "Authentification",
    timeSpent: "6h 45min",
    sessions: 3,
    status: "In Progress",
    efficiency: 85,
  },
  {
    id: "TASK-190",
    title: "Code review - API User Management",
    project: "Authentification",
    timeSpent: "1h 30min",
    sessions: 1,
    status: "Done",
    efficiency: 95,
  },
  {
    id: "MEETING-01",
    title: "Daily Standup",
    project: "Général",
    timeSpent: "15min",
    sessions: 1,
    status: "Done",
    efficiency: 100,
  },
];

const weeklyData = [
  {
    day: "Lundi",
    date: "12/02",
    totalTime: "8h 15min",
    productivity: 88,
    tasks: 4,
    projects: 2,
  },
  {
    day: "Mardi",
    date: "13/02",
    totalTime: "7h 45min",
    productivity: 92,
    tasks: 3,
    projects: 1,
  },
  {
    day: "Mercredi",
    date: "14/02",
    totalTime: "8h 30min",
    productivity: 85,
    tasks: 5,
    projects: 2,
  },
  {
    day: "Aujourd'hui",
    date: "15/02",
    totalTime: "8h 30min",
    productivity: 90,
    tasks: 3,
    projects: 2,
  },
];

const teamTimesheet = [
  {
    name: "Marie Dubois",
    avatar: "MD",
    todayTime: "8h 30min",
    weekTime: "33h 15min",
    productivity: 90,
    activeTask: "OAuth2 Integration",
    status: "working",
  },
  {
    name: "Pierre Martin",
    avatar: "PM",
    todayTime: "7h 45min",
    weekTime: "31h 20min",
    productivity: 88,
    activeTask: "Product Backlog Review",
    status: "break",
  },
  {
    name: "Sophie Laurent",
    avatar: "SL",
    todayTime: "8h 00min",
    weekTime: "32h 00min",
    productivity: 95,
    activeTask: "UI Design - Login Flow",
    status: "working",
  },
  {
    name: "Thomas Moreau",
    avatar: "TM",
    todayTime: "8h 15min",
    weekTime: "33h 45min",
    productivity: 92,
    activeTask: "E2E Tests",
    status: "working",
  },
];

const projectBreakdown = [
  {
    project: "Authentification",
    totalTime: "24h 30min",
    percentage: 65,
    team: ["MD", "PM", "TM"],
    tasks: 8,
  },
  {
    project: "UI Components",
    totalTime: "8h 15min",
    percentage: 22,
    team: ["SL", "MD"],
    tasks: 3,
  },
  {
    project: "DevOps",
    totalTime: "3h 45min",
    percentage: 10,
    team: ["TM"],
    tasks: 2,
  },
  {
    project: "Meetings",
    totalTime: "1h 30min",
    percentage: 3,
    team: ["MD", "PM", "SL", "TM"],
    tasks: 4,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "working":
      return "bg-green-100 text-green-800 border-green-200";
    case "break":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "offline":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function TimeTracking() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Suivi du Temps
            </h1>
            <p className="text-muted-foreground mt-1">
              Suivez le temps passé sur les tâches avec des timers et analyses
              de productivité
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 lg:mt-0">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtrer
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle Entrée
            </Button>
          </div>
        </div>

        {/* Active Timer */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="h-5 w-5 text-blue-600" />
              Timer Actif
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-blue-600 font-medium">
                    {currentTask.id}
                  </div>
                  <h3 className="font-semibold text-blue-800">
                    {currentTask.title}
                  </h3>
                  <div className="text-sm text-blue-600">
                    Projet: {currentTask.project}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-800">
                      {currentTask.currentSession}
                    </div>
                    <div className="text-xs text-blue-600">Session actuelle</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-800">
                      {currentTask.totalToday}
                    </div>
                    <div className="text-xs text-blue-600">Total aujourd'hui</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-center gap-3">
                  {currentTask.isRunning ? (
                    <Button variant="outline" className="border-blue-300">
                      <Pause className="mr-2 h-4 w-4" />
                      Pause
                    </Button>
                  ) : (
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Play className="mr-2 h-4 w-4" />
                      Reprendre
                    </Button>
                  )}
                  <Button variant="outline" className="border-blue-300">
                    <Square className="mr-2 h-4 w-4" />
                    Arrêter
                  </Button>
                  <Button variant="outline" className="border-blue-300">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-blue-700">
                    <span>Progression</span>
                    <span>
                      {currentTask.totalToday} / {currentTask.estimatedTime}
                    </span>
                  </div>
                  <Progress value={84} className="w-full" />
                  <div className="text-xs text-blue-600">
                    84% du temps estimé
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Temps Aujourd'hui
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8h 30m</div>
              <p className="text-xs text-green-600">+30min vs hier</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Productivité
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">90%</div>
              <p className="text-xs text-green-600">+5% vs moyenne</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tâches Actives
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">En cours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Temps Hebdo
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">33h 15m</div>
              <p className="text-xs text-muted-foreground">Cette semaine</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="today" className="space-y-6">
          <TabsList>
            <TabsTrigger value="today">Aujourd'hui</TabsTrigger>
            <TabsTrigger value="week">Cette Semaine</TabsTrigger>
            <TabsTrigger value="team">Équipe</TabsTrigger>
            <TabsTrigger value="projects">Projets</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Timesheet - {new Date().toLocaleDateString('fr-FR')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayTimesheet.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-mono text-muted-foreground">
                            {entry.id}
                          </span>
                          <Badge
                            variant={
                              entry.status === "Done" ? "secondary" : "default"
                            }
                          >
                            {entry.status}
                          </Badge>
                        </div>
                        <h3 className="font-medium">{entry.title}</h3>
                        <div className="text-sm text-muted-foreground">
                          {entry.project}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center text-sm">
                        <div>
                          <div className="font-bold">{entry.timeSpent}</div>
                          <div className="text-muted-foreground">Temps</div>
                        </div>
                        <div>
                          <div className="font-bold">{entry.sessions}</div>
                          <div className="text-muted-foreground">Sessions</div>
                        </div>
                        <div>
                          <div className="font-bold text-green-600">
                            {entry.efficiency}%
                          </div>
                          <div className="text-muted-foreground">Efficacité</div>
                        </div>
                      </div>

                      <div className="flex gap-2 ml-4">
                        <Button variant="ghost" size="sm">
                          <Play className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="week" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Résumé Hebdomadaire</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyData.map((day, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-center min-w-[80px]">
                          <div className="font-medium">{day.day}</div>
                          <div className="text-sm text-muted-foreground">
                            {day.date}
                          </div>
                        </div>
                        <div className="text-xl font-bold">{day.totalTime}</div>
                      </div>

                      <div className="grid grid-cols-3 gap-6 text-center text-sm">
                        <div>
                          <div className="font-bold">{day.productivity}%</div>
                          <div className="text-muted-foreground">
                            Productivité
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{day.tasks}</div>
                          <div className="text-muted-foreground">Tâches</div>
                        </div>
                        <div>
                          <div className="font-bold">{day.projects}</div>
                          <div className="text-muted-foreground">Projets</div>
                        </div>
                      </div>

                      <Progress value={day.productivity} className="w-20" />
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t">
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        33h 15m
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total semaine
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        89%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Productivité moy.
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">15</div>
                      <div className="text-sm text-muted-foreground">
                        Tâches total
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        3
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Projets actifs
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Suivi Équipe en Temps Réel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamTimesheet.map((member) => (
                    <div
                      key={member.name}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{member.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {member.activeTask}
                          </div>
                        </div>
                        <Badge className={getStatusColor(member.status)}>
                          {member.status === "working"
                            ? "Travaille"
                            : member.status === "break"
                              ? "Pause"
                              : "Hors ligne"}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-6 text-center text-sm">
                        <div>
                          <div className="font-bold">{member.todayTime}</div>
                          <div className="text-muted-foreground">
                            Aujourd'hui
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{member.weekTime}</div>
                          <div className="text-muted-foreground">
                            Cette semaine
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-green-600">
                            {member.productivity}%
                          </div>
                          <div className="text-muted-foreground">
                            Productivité
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Répartition par Projet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectBreakdown.map((project, index) => (
                    <div
                      key={index}
                      className="space-y-3 p-4 border rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{project.project}</h3>
                        <div className="text-right">
                          <div className="font-bold">{project.totalTime}</div>
                          <div className="text-sm text-muted-foreground">
                            {project.percentage}% du temps total
                          </div>
                        </div>
                      </div>

                      <Progress value={project.percentage} className="w-full" />

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Équipe:</span>
                          <div className="flex gap-1">
                            {project.team.map((member) => (
                              <Avatar key={member} className="h-6 w-6">
                                <AvatarFallback className="text-xs">
                                  {member}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                        </div>
                        <span className="text-muted-foreground">
                          {project.tasks} tâches
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
