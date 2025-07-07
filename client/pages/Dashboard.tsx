import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  CheckCircle,
  Clock,
  Users,
  Target,
  TrendingUp,
  Calendar,
  AlertCircle,
  Brain,
  Zap,
  Timer,
  BookOpen,
  Activity,
} from "lucide-react";

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Dashboard GPAS
            </h1>
            <p className="text-muted-foreground mt-1">
              Système de Gestion de Projet AGILE/SCRUM avec Eisenhower et
              Pomodoro IA
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 lg:mt-0">
            <Button variant="outline">
              <Timer className="mr-2 h-4 w-4" />
              Pomodoro
            </Button>
            <Button>
              <Target className="mr-2 h-4 w-4" />
              Nouveau Projet
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Projets Actifs
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">+2 ce mois</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Vélocité Équipe
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">
                Story points/sprint
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                User Stories
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">84 terminées</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Équipe</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">3 équipes SCRUM</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Productivité
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">
                Efficacité globale
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sprint Actuel et Matrice Eisenhower */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Sprint Actuel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Sprint Actuel
                <Badge variant="secondary">Sprint 12</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>Progression Sprint</span>
                <span>24/32 tâches terminées</span>
              </div>
              <Progress value={75} className="w-full" />

              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">3</div>
                  <div className="text-xs text-muted-foreground">
                    Jours restants
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">28</div>
                  <div className="text-xs text-muted-foreground">
                    Story points
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">75%</div>
                  <div className="text-xs text-muted-foreground">Complété</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>To Do</span>
                  <span className="text-muted-foreground">8 tâches</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>In Progress</span>
                  <span className="text-blue-600">5 tâches</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Code Review</span>
                  <span className="text-orange-600">3 tâches</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Done</span>
                  <span className="text-green-600">24 tâches</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Matrice Eisenhower */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Matrice Eisenhower
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 h-48">
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3">
                  <div className="text-xs font-semibold text-red-700 mb-2">
                    URGENT + IMPORTANT
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs bg-red-100 p-1 rounded">
                      Bug critique production
                    </div>
                    <div className="text-xs bg-red-100 p-1 rounded">
                      Demo client demain
                    </div>
                  </div>
                  <div className="text-xs text-red-600 mt-2">3 tâches</div>
                </div>

                <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-3">
                  <div className="text-xs font-semibold text-orange-700 mb-2">
                    IMPORTANT SEULEMENT
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs bg-orange-100 p-1 rounded">
                      Refactoring API
                    </div>
                    <div className="text-xs bg-orange-100 p-1 rounded">
                      Formation équipe
                    </div>
                  </div>
                  <div className="text-xs text-orange-600 mt-2">7 tâches</div>
                </div>

                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-3">
                  <div className="text-xs font-semibold text-yellow-700 mb-2">
                    URGENT SEULEMENT
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs bg-yellow-100 p-1 rounded">
                      Réunion imprévue
                    </div>
                    <div className="text-xs bg-yellow-100 p-1 rounded">
                      Email urgent
                    </div>
                  </div>
                  <div className="text-xs text-yellow-600 mt-2">4 tâches</div>
                </div>

                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3">
                  <div className="text-xs font-semibold text-green-700 mb-2">
                    NI URGENT NI IMPORTANT
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs bg-green-100 p-1 rounded">
                      Lecture tech
                    </div>
                    <div className="text-xs bg-green-100 p-1 rounded">
                      Veille techno
                    </div>
                  </div>
                  <div className="text-xs text-green-600 mt-2">2 tâches</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pomodoro Timer et Quick Actions */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Pomodoro Timer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Pomodoro Timer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">25:00</div>
                <div className="text-sm text-muted-foreground">
                  Session de travail
                </div>
              </div>

              <div className="flex justify-center space-x-2">
                <Button size="sm">
                  <Timer className="mr-2 h-4 w-4" />
                  Démarrer
                </Button>
                <Button variant="outline" size="sm">
                  Pause
                </Button>
                <Button variant="outline" size="sm">
                  Reset
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center text-sm">
                <div>
                  <div className="font-semibold">Sessions Aujourd'hui</div>
                  <div className="text-2xl font-bold text-green-600">6</div>
                </div>
                <div>
                  <div className="font-semibold">Temps Focalisé</div>
                  <div className="text-2xl font-bold text-blue-600">2h30</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* IA Assistant et Recommandations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Assistant IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="text-sm font-medium text-blue-800 mb-1">
                  Recommandation
                </div>
                <div className="text-sm text-blue-700">
                  La vélocité de l'équipe a augmenté de 15%. Considérez
                  augmenter la capacité du prochain sprint.
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <div className="text-sm font-medium text-orange-800 mb-1">
                  Alerte Prédictive
                </div>
                <div className="text-sm text-orange-700">
                  Risque de retard détecté sur "API Payment" (72% de
                  probabilité).
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <Brain className="mr-2 h-4 w-4" />
                Voir toutes les recommandations
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Activité Équipe et Événements */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Activité Équipe */}
          <Card>
            <CardHeader>
              <CardTitle>Activité Équipe</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Marie Dubois",
                    action: "a terminé",
                    target: "User Story: Authentification OAuth",
                    time: "Il y a 1h",
                    type: "completed",
                  },
                  {
                    name: "Pierre Martin",
                    action: "a démarré",
                    target: "Intégration API Paiement",
                    time: "Il y a 2h",
                    type: "started",
                  },
                  {
                    name: "Sophie Laurent",
                    action: "a reviewé",
                    target: "Components UI Mobile",
                    time: "Il y a 3h",
                    type: "reviewed",
                  },
                  {
                    name: "Thomas Moreau",
                    action: "a bloqué",
                    target: "Tests automatisés",
                    time: "Il y a 4h",
                    type: "blocked",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div
                      className={`h-2 w-2 rounded-full mt-2 ${
                        activity.type === "completed"
                          ? "bg-green-500"
                          : activity.type === "started"
                            ? "bg-blue-500"
                            : activity.type === "reviewed"
                              ? "bg-purple-500"
                              : "bg-red-500"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.name}</span>{" "}
                        {activity.action}{" "}
                        <span className="text-muted-foreground">
                          {activity.target}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cérémonies SCRUM */}
          <Card>
            <CardHeader>
              <CardTitle>Cérémonies SCRUM</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    event: "Daily Standup",
                    time: "9:00",
                    date: "Aujourd'hui",
                    type: "standup",
                    status: "À venir",
                  },
                  {
                    event: "Sprint Review",
                    time: "14:00",
                    date: "Vendredi",
                    type: "review",
                    status: "Planifié",
                  },
                  {
                    event: "Sprint Planning",
                    time: "10:00",
                    date: "Lundi",
                    type: "planning",
                    status: "Planifié",
                  },
                  {
                    event: "Rétrospective",
                    time: "16:00",
                    date: "Vendredi",
                    type: "retro",
                    status: "Planifié",
                  },
                ].map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div>
                      <p className="text-sm font-medium">{event.event}</p>
                      <p className="text-xs text-muted-foreground">
                        {event.date} à {event.time}
                      </p>
                    </div>
                    <Badge
                      variant={
                        event.status === "À venir" ? "default" : "outline"
                      }
                    >
                      {event.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
