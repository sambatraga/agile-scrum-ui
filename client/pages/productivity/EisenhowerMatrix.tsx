import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Target,
  Brain,
  Clock,
  AlertTriangle,
  CheckCircle,
  Plus,
  Filter,
  Lightbulb,
  TrendingUp,
  Calendar,
  User,
} from "lucide-react";

const matrixData = {
  urgent_important: {
    title: "URGENT + IMPORTANT",
    subtitle: "À faire immédiatement",
    color: "red",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-700",
    icon: AlertTriangle,
    count: 3,
    tasks: [
      {
        id: "T-401",
        title: "Bug critique en production",
        description: "L'authentification ne fonctionne plus",
        assignee: "Marie D.",
        deadline: "Aujourd'hui 18h",
        priority: "Critical",
        timeEstimate: "2h",
      },
      {
        id: "T-402",
        title: "Demo client demain",
        description: "Préparer la présentation du MVP",
        assignee: "Pierre M.",
        deadline: "Demain 14h",
        priority: "High",
        timeEstimate: "4h",
      },
      {
        id: "T-403",
        title: "Incident sécurité",
        description: "Violation détectée dans les logs",
        assignee: "Thomas M.",
        deadline: "Aujourd'hui 20h",
        priority: "Critical",
        timeEstimate: "3h",
      },
    ],
  },
  important_only: {
    title: "IMPORTANT SEULEMENT",
    subtitle: "À planifier",
    color: "orange",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-700",
    icon: Target,
    count: 7,
    tasks: [
      {
        id: "T-501",
        title: "Refactoring architecture API",
        description: "Améliorer la performance et maintenabilité",
        assignee: "Marie D.",
        deadline: "Semaine prochaine",
        priority: "High",
        timeEstimate: "16h",
      },
      {
        id: "T-502",
        title: "Formation équipe React 18",
        description: "Mise à niveau sur les nouvelles features",
        assignee: "Sophie L.",
        deadline: "Dans 2 semaines",
        priority: "Medium",
        timeEstimate: "8h",
      },
      {
        id: "T-503",
        title: "Stratégie tests automatisés",
        description: "Définir l'approche testing globale",
        assignee: "Thomas M.",
        deadline: "Fin du mois",
        priority: "High",
        timeEstimate: "12h",
      },
    ],
  },
  urgent_only: {
    title: "URGENT SEULEMENT",
    subtitle: "À déléguer ou dire non",
    color: "yellow",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    textColor: "text-yellow-700",
    icon: Clock,
    count: 4,
    tasks: [
      {
        id: "T-601",
        title: "Réunion non planifiée",
        description: "Appel inattendu avec le management",
        assignee: "Pierre M.",
        deadline: "Dans 1h",
        priority: "Medium",
        timeEstimate: "1h",
      },
      {
        id: "T-602",
        title: "Email urgent marketing",
        description: "Révision copy pour newsletter",
        assignee: "Sophie L.",
        deadline: "Fin de journée",
        priority: "Low",
        timeEstimate: "30min",
      },
      {
        id: "T-603",
        title: "Demande info commerciale",
        description: "Réponse rapide pour prospect",
        assignee: null,
        deadline: "Dans 2h",
        priority: "Medium",
        timeEstimate: "15min",
      },
    ],
  },
  neither: {
    title: "NI URGENT NI IMPORTANT",
    subtitle: "À éliminer ou reporter",
    color: "green",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-700",
    icon: CheckCircle,
    count: 2,
    tasks: [
      {
        id: "T-701",
        title: "Lecture article technique",
        description: "Nouvel article sur GraphQL",
        assignee: "Julie P.",
        deadline: "Quand possible",
        priority: "Low",
        timeEstimate: "45min",
      },
      {
        id: "T-702",
        title: "Veille technologique",
        description: "Explorer nouveaux frameworks",
        assignee: null,
        deadline: "Pas de deadline",
        priority: "Low",
        timeEstimate: "2h",
      },
    ],
  },
};

export default function EisenhowerMatrix() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Matrice d'Eisenhower
            </h1>
            <p className="text-muted-foreground mt-1">
              Priorisez vos tâches par urgence et importance avec l'aide de l'IA
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 lg:mt-0">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtrer
            </Button>
            <Button variant="outline">
              <Brain className="mr-2 h-4 w-4" />
              Suggestions IA
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle Tâche
            </Button>
          </div>
        </div>

        {/* IA Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Analyse IA de Productivité
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    Recommandation
                  </span>
                </div>
                <p className="text-sm text-blue-700">
                  Vous avez 3 tâches critiques. Concentrez-vous sur le quadrant
                  rouge en priorité.
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">
                    Tendance
                  </span>
                </div>
                <p className="text-sm text-orange-700">
                  +40% de tâches urgentes cette semaine. Planifiez mieux vos
                  importantes.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    Optimisation
                  </span>
                </div>
                <p className="text-sm text-green-700">
                  Déléguez 2 tâches du quadrant jaune pour gagner 1h30 de focus.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Eisenhower Matrix */}
        <div className="grid grid-cols-2 gap-6 min-h-[600px]">
          {Object.entries(matrixData).map(([key, quadrant]) => {
            const Icon = quadrant.icon;
            return (
              <Card
                key={key}
                className={`${quadrant.bgColor} border-2 ${quadrant.borderColor}`}
              >
                <CardHeader className="pb-3">
                  <CardTitle
                    className={`text-sm font-bold ${quadrant.textColor} flex items-center justify-between`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {quadrant.title}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {quadrant.count}
                    </Badge>
                  </CardTitle>
                  <p className={`text-xs ${quadrant.textColor}/80`}>
                    {quadrant.subtitle}
                  </p>
                </CardHeader>

                <CardContent className="space-y-3">
                  {quadrant.tasks.map((task) => (
                    <Card
                      key={task.id}
                      className="bg-white/80 hover:bg-white transition-colors"
                    >
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-xs font-mono text-muted-foreground">
                            {task.id}
                          </span>
                          <Badge
                            variant={
                              task.priority === "Critical"
                                ? "destructive"
                                : task.priority === "High"
                                  ? "default"
                                  : task.priority === "Medium"
                                    ? "secondary"
                                    : "outline"
                            }
                            className="text-xs"
                          >
                            {task.priority}
                          </Badge>
                        </div>

                        <h4 className="text-sm font-medium mb-1">
                          {task.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-3">
                          {task.description}
                        </p>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{task.deadline}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{task.timeEstimate}</span>
                            </div>
                          </div>

                          {task.assignee && (
                            <div className="flex items-center gap-1 text-xs">
                              <User className="h-3 w-3" />
                              <span>Assigné à {task.assignee}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Add Task Button */}
                  <Button
                    variant="ghost"
                    className="w-full border-2 border-dashed border-muted-foreground/25 h-16 bg-white/50"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter une tâche
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Statistics */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Distribution des Tâches</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Urgent + Important</span>
                  <span className="text-sm font-medium">3 tâches (19%)</span>
                </div>
                <Progress value={19} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm">Important seulement</span>
                  <span className="text-sm font-medium">7 tâches (44%)</span>
                </div>
                <Progress value={44} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm">Urgent seulement</span>
                  <span className="text-sm font-medium">4 tâches (25%)</span>
                </div>
                <Progress value={25} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm">Ni urgent ni important</span>
                  <span className="text-sm font-medium">2 tâches (12%)</span>
                </div>
                <Progress value={12} className="h-2" />
              </div>

              <Separator />

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  <strong>Conseil IA:</strong> Votre répartition est
                  déséquilibrée. Planifiez plus de tâches importantes pour
                  éviter les urgences.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions Recommandées</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-red-800">
                      Faire maintenant
                    </div>
                    <div className="text-xs text-red-700">
                      Traitez les 3 tâches critiques avant toute autre activité
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <Calendar className="h-4 w-4 text-orange-600 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-orange-800">
                      Planifier
                    </div>
                    <div className="text-xs text-orange-700">
                      Bloquez 16h cette semaine pour le refactoring API
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <User className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-yellow-800">
                      Déléguer
                    </div>
                    <div className="text-xs text-yellow-700">
                      Assignez l'email marketing à un junior
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-green-800">
                      Éliminer
                    </div>
                    <div className="text-xs text-green-700">
                      Reportez la veille techno à la semaine prochaine
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
