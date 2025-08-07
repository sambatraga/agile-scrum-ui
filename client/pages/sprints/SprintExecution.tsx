import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Timer,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Users,
  BarChart3,
  Calendar,
  Zap,
  Flag,
  MessageSquare,
} from "lucide-react";

const sprintData = {
  number: 12,
  daysTotal: 10,
  daysElapsed: 7,
  daysRemaining: 3,
  storyPointsTotal: 42,
  storyPointsCompleted: 28,
  storyPointsRemaining: 14,
  velocityExpected: 4.2,
  velocityActual: 4.0,
};

const burndownData = [
  { day: 1, ideal: 42, actual: 42 },
  { day: 2, ideal: 38, actual: 40 },
  { day: 3, ideal: 34, actual: 36 },
  { day: 4, ideal: 30, actual: 32 },
  { day: 5, ideal: 26, actual: 30 },
  { day: 6, ideal: 22, actual: 26 },
  { day: 7, ideal: 18, actual: 14 },
  { day: 8, ideal: 14, actual: null },
  { day: 9, ideal: 10, actual: null },
  { day: 10, ideal: 6, actual: null },
];

const impediments = [
  {
    id: 1,
    title: "Problème d'accès à l'API externe",
    description: "L'API OAuth2 de Google ne répond pas correctement",
    reportedBy: "Marie D.",
    reportedAt: "Il y a 2h",
    status: "En cours",
    severity: "High",
    assignedTo: "Pierre M.",
  },
  {
    id: 2,
    title: "Serveur de test indisponible",
    description: "Impossible de déployer sur l'environnement de staging",
    reportedBy: "Thomas M.",
    reportedAt: "Il y a 6h",
    status: "Résolu",
    severity: "Medium",
    assignedTo: "DevOps",
  },
  {
    id: 3,
    title: "Clarification des critères d'acceptation",
    description: "User story US-202 nécessite des précisions",
    reportedBy: "Sophie L.",
    reportedAt: "Hier",
    status: "En cours",
    severity: "Low",
    assignedTo: "Pierre M.",
  },
];

const dailyProgress = [
  {
    date: "2024-02-12",
    tasksCompleted: 5,
    storyPointsCompleted: 8,
    teamFocus: 85,
    impedimentsCount: 1,
  },
  {
    date: "2024-02-11",
    tasksCompleted: 3,
    storyPointsCompleted: 5,
    teamFocus: 92,
    impedimentsCount: 0,
  },
  {
    date: "2024-02-10",
    tasksCompleted: 4,
    storyPointsCompleted: 6,
    teamFocus: 88,
    impedimentsCount: 1,
  },
];

const teamVelocity = [
  { member: "Marie D.", completed: 8, target: 8, efficiency: 100 },
  { member: "Pierre M.", completed: 6, target: 7, efficiency: 86 },
  { member: "Sophie L.", completed: 5, target: 6, efficiency: 83 },
  { member: "Thomas M.", completed: 9, target: 8, efficiency: 113 },
  { member: "Julie P.", completed: 0, target: 0, efficiency: 0 },
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "High":
      return "bg-red-100 text-red-800 border-red-200";
    case "Medium":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "Low":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Résolu":
      return "bg-green-100 text-green-800 border-green-200";
    case "En cours":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function SprintExecution() {
  const progressPercentage = Math.round(
    (sprintData.storyPointsCompleted / sprintData.storyPointsTotal) * 100
  );
  const timeElapsedPercentage = Math.round(
    (sprintData.daysElapsed / sprintData.daysTotal) * 100
  );
  const isAhead = progressPercentage > timeElapsedPercentage;

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Exécution Sprint
            </h1>
            <p className="text-muted-foreground mt-1">
              Suivez le progrès du sprint avec burndown charts et gestion des
              impediments
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 lg:mt-0">
            <Button variant="outline">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Signaler Impediment
            </Button>
            <Button variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              Daily Standup
            </Button>
            <Button>
              <BarChart3 className="mr-2 h-4 w-4" />
              Rapport Sprint
            </Button>
          </div>
        </div>

        {/* Sprint Status Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Jours Restants
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {sprintData.daysRemaining}
              </div>
              <p className="text-xs text-muted-foreground">
                sur {sprintData.daysTotal} jours
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progression</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {progressPercentage}%
              </div>
              <p className="text-xs text-green-600">
                {isAhead ? "En avance" : "En retard"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vélocité</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {sprintData.velocityActual}
              </div>
              <p className="text-xs text-muted-foreground">
                SP/jour (cible: {sprintData.velocityExpected})
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Impediments</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {impediments.filter((i) => i.status === "En cours").length}
              </div>
              <p className="text-xs text-muted-foreground">Actifs</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="burndown" className="space-y-6">
          <TabsList>
            <TabsTrigger value="burndown">Burndown Chart</TabsTrigger>
            <TabsTrigger value="impediments">Impediments</TabsTrigger>
            <TabsTrigger value="team">Performance Équipe</TabsTrigger>
            <TabsTrigger value="daily">Suivi Quotidien</TabsTrigger>
          </TabsList>

          <TabsContent value="burndown" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Burndown Chart - Sprint 12</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Progression idéale vs réelle
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-xl font-bold text-primary">
                          {sprintData.storyPointsCompleted}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          SP terminés
                        </div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-orange-600">
                          {sprintData.storyPointsRemaining}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          SP restants
                        </div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-green-600">
                          {progressPercentage}%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Complété
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {burndownData.slice(0, 7).map((point, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="w-12 text-sm">Jour {point.day}</div>
                          <div className="flex-1 flex gap-2">
                            <div className="flex-1">
                              <div className="text-xs text-gray-600 mb-1">
                                Idéal: {point.ideal} SP
                              </div>
                              <Progress
                                value={((42 - point.ideal) / 42) * 100}
                                className="h-2"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="text-xs text-primary mb-1">
                                Réel: {point.actual} SP
                              </div>
                              <Progress
                                value={((42 - point.actual) / 42) * 100}
                                className="h-2"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Analyse Prédictive</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">
                        Avance sur planning
                      </span>
                    </div>
                    <p className="text-sm text-green-700">
                      L'équipe est en avance de 4 SP par rapport à la
                      trajectoire idéale.
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="text-sm font-medium text-blue-800 mb-1">
                      Projection fin de sprint
                    </div>
                    <p className="text-sm text-blue-700">
                      À ce rythme, l'équipe terminera avec 1-2 jours d'avance
                      sur l'objectif.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Facteurs de performance:</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>• Vélocité équipe</span>
                        <span className="text-green-600">+15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>• Résolution impediments</span>
                        <span className="text-green-600">Rapide</span>
                      </div>
                      <div className="flex justify-between">
                        <span>• Focus équipe</span>
                        <span className="text-blue-600">88%</span>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Voir Analyse Complète
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="impediments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Gestion des Impediments
                  <Button>
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Nouveau Impediment
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {impediments.map((impediment) => (
                    <div
                      key={impediment.id}
                      className="border rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium">{impediment.title}</h3>
                            <Badge className={getSeverityColor(impediment.severity)}>
                              {impediment.severity}
                            </Badge>
                            <Badge className={getStatusColor(impediment.status)}>
                              {impediment.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {impediment.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Signalé par {impediment.reportedBy}</span>
                            <span>{impediment.reportedAt}</span>
                            <span>Assigné à {impediment.assignedTo}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Mettre à jour
                        </Button>
                        {impediment.status === "En cours" && (
                          <Button variant="outline" size="sm">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Marquer résolu
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance de l'Équipe</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamVelocity.map((member) => (
                    <div
                      key={member.member}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {member.member.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.member}</div>
                          <div className="text-sm text-muted-foreground">
                            {member.completed}/{member.target} SP
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-lg font-bold ${
                            member.efficiency >= 100
                              ? "text-green-600"
                              : member.efficiency >= 80
                                ? "text-blue-600"
                                : "text-orange-600"
                          }`}
                        >
                          {member.efficiency}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Efficacité
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="daily" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Suivi Quotidien</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dailyProgress.map((day, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="font-medium">{day.date}</div>
                          <div className="text-xs text-muted-foreground">
                            Jour {index + 1}
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-6 text-sm">
                          <div>
                            <div className="font-medium">
                              {day.tasksCompleted}
                            </div>
                            <div className="text-muted-foreground">Tâches</div>
                          </div>
                          <div>
                            <div className="font-medium">
                              {day.storyPointsCompleted}
                            </div>
                            <div className="text-muted-foreground">SP</div>
                          </div>
                          <div>
                            <div className="font-medium">{day.teamFocus}%</div>
                            <div className="text-muted-foreground">Focus</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {day.impedimentsCount > 0 && (
                          <Badge variant="destructive">
                            {day.impedimentsCount} impediment
                          </Badge>
                        )}
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-3 w-3" />
                        </Button>
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
