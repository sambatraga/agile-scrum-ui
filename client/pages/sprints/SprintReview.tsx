import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
  TrendingDown,
  Users,
  Star,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  BarChart3,
  Award,
  AlertTriangle,
  Download,
} from "lucide-react";

const sprintSummary = {
  number: 12,
  goal: "Implémenter le système d'authentification complet avec OAuth2",
  plannedStoryPoints: 42,
  completedStoryPoints: 38,
  plannedStories: 5,
  completedStories: 4,
  velocity: 38,
  previousVelocity: 35,
  startDate: "2024-02-01",
  endDate: "2024-02-15",
};

const completedStories = [
  {
    id: "US-201",
    title: "En tant qu'utilisateur, je veux me connecter avec OAuth2",
    storyPoints: 8,
    completedDate: "2024-02-10",
    assignee: "Marie D.",
    demo: true,
    feedback: "Excellent travail, interface fluide",
    rating: 5,
  },
  {
    id: "US-203",
    title: "En tant qu'utilisateur, je veux récupérer mon mot de passe",
    storyPoints: 5,
    completedDate: "2024-02-12",
    assignee: "Sophie L.",
    demo: true,
    feedback: "Fonctionnalité claire et sécurisée",
    rating: 4,
  },
  {
    id: "US-204",
    title: "En tant qu'utilisateur, je veux activer la 2FA",
    storyPoints: 8,
    completedDate: "2024-02-14",
    assignee: "Thomas M.",
    demo: true,
    feedback: "Interface intuitive, bon travail",
    rating: 5,
  },
  {
    id: "US-206",
    title: "En tant qu'admin, je veux configurer les paramètres OAuth",
    storyPoints: 13,
    completedDate: "2024-02-15",
    assignee: "Pierre M.",
    demo: true,
    feedback: "Fonctionnalité puissante et bien documentée",
    rating: 4,
  },
];

const incompleteStories = [
  {
    id: "US-202",
    title: "En tant qu'admin, je veux gérer les rôles utilisateurs",
    storyPoints: 13,
    progress: 75,
    reason: "Complexité sous-estimée, nécessite refactoring",
    assignee: "Pierre M.",
  },
];

const retrospectiveItems = [
  {
    category: "What went well",
    items: [
      "Excellente collaboration équipe",
      "Résolution rapide des impediments",
      "Amélioration de la vélocité (+8%)",
      "Qualité du code maintenue",
    ],
    emoji: "👍",
    color: "green",
  },
  {
    category: "What could be improved",
    items: [
      "Estimation des tâches complexes",
      "Communication avec les stakeholders",
      "Tests automatisés insuffisants",
      "Documentation technique",
    ],
    emoji: "⚠️",
    color: "orange",
  },
  {
    category: "Action items",
    items: [
      "Formation sur les techniques d'estimation",
      "Mettre en place des reviews de conception",
      "Augmenter la couverture de tests à 90%",
      "Templates de documentation standardisés",
    ],
    emoji: "🎯",
    color: "blue",
  },
];

const teamFeedback = [
  {
    name: "Marie Dubois",
    avatar: "MD",
    satisfaction: 9,
    feedback: "Sprint très productif, bonne dynamique d'équipe",
    highlights: ["Collaboration", "Vélocité"],
  },
  {
    name: "Pierre Martin",
    avatar: "PM",
    satisfaction: 8,
    feedback: "Objectifs atteints, quelques défis techniques intéressants",
    highlights: ["Innovation", "Problem solving"],
  },
  {
    name: "Sophie Laurent",
    avatar: "SL",
    satisfaction: 9,
    feedback: "Très satisfaite du design system mis en place",
    highlights: ["Design", "User Experience"],
  },
  {
    name: "Thomas Moreau",
    avatar: "TM",
    satisfaction: 8,
    feedback: "Tests bien intégrés, qualité en amélioration",
    highlights: ["Quality", "Testing"],
  },
];

const metrics = [
  {
    label: "Vélocité Sprint",
    value: sprintSummary.velocity,
    previous: sprintSummary.previousVelocity,
    unit: "SP",
    trend: "up",
  },
  {
    label: "Taux de Réussite",
    value: Math.round((sprintSummary.completedStories / sprintSummary.plannedStories) * 100),
    previous: 85,
    unit: "%",
    trend: "down",
  },
  {
    label: "Satisfaction Équipe",
    value: Math.round(teamFeedback.reduce((acc, m) => acc + m.satisfaction, 0) / teamFeedback.length),
    previous: 8,
    unit: "/10",
    trend: "up",
  },
];

export default function SprintReview() {
  const completionRate = Math.round(
    (sprintSummary.completedStoryPoints / sprintSummary.plannedStoryPoints) * 100
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Sprint Review & Rétrospective
            </h1>
            <p className="text-muted-foreground mt-1">
              Bilan du sprint avec demo, feedback et actions d'amélioration
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 lg:mt-0">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exporter Rapport
            </Button>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Planifier Prochain Sprint
            </Button>
          </div>
        </div>

        {/* Sprint Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Sprint {sprintSummary.number} - Authentification</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Terminé
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Objectif Sprint</h3>
                  <p className="text-sm text-muted-foreground">
                    {sprintSummary.goal}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Période</div>
                    <div className="font-medium">
                      {sprintSummary.startDate} - {sprintSummary.endDate}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Durée</div>
                    <div className="font-medium">2 semaines</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {sprintSummary.completedStoryPoints}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      SP complétés
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {sprintSummary.completedStories}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Stories livrées
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {completionRate}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Taux de réussite
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progression Sprint</span>
                    <span>
                      {sprintSummary.completedStoryPoints}/
                      {sprintSummary.plannedStoryPoints} SP
                    </span>
                  </div>
                  <Progress value={completionRate} className="w-full" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-3">
          {metrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {metric.label}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">
                        {metric.value}
                        {metric.unit}
                      </span>
                      {metric.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Précédent: {metric.previous}
                      {metric.unit}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="demo" className="space-y-6">
          <TabsList>
            <TabsTrigger value="demo">Sprint Demo</TabsTrigger>
            <TabsTrigger value="retrospective">Rétrospective</TabsTrigger>
            <TabsTrigger value="metrics">Métriques</TabsTrigger>
            <TabsTrigger value="feedback">Feedback Équipe</TabsTrigger>
          </TabsList>

          <TabsContent value="demo" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Stories Complétées ({completedStories.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {completedStories.map((story) => (
                      <div
                        key={story.id}
                        className="border rounded-lg p-4 space-y-3"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm font-mono text-muted-foreground">
                                {story.id}
                              </span>
                              <Badge variant="outline">
                                {story.storyPoints} SP
                              </Badge>
                              {story.demo && (
                                <Badge className="bg-blue-100 text-blue-800">
                                  Demo ✓
                                </Badge>
                              )}
                            </div>
                            <h3 className="font-medium mb-1">{story.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>Assigné à {story.assignee}</span>
                              <span>Terminé le {story.completedDate}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < story.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <div className="text-sm font-medium text-green-800 mb-1">
                            Feedback PO
                          </div>
                          <p className="text-sm text-green-700">
                            {story.feedback}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {incompleteStories.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      Stories Non Terminées ({incompleteStories.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {incompleteStories.map((story) => (
                        <div
                          key={story.id}
                          className="border rounded-lg p-4 space-y-3"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm font-mono text-muted-foreground">
                                  {story.id}
                                </span>
                                <Badge variant="outline">
                                  {story.storyPoints} SP
                                </Badge>
                                <Badge className="bg-orange-100 text-orange-800">
                                  {story.progress}% complété
                                </Badge>
                              </div>
                              <h3 className="font-medium mb-1">{story.title}</h3>
                              <div className="text-sm text-muted-foreground">
                                Assigné à {story.assignee}
                              </div>
                            </div>
                          </div>
                          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                            <div className="text-sm font-medium text-orange-800 mb-1">
                              Raison du report
                            </div>
                            <p className="text-sm text-orange-700">
                              {story.reason}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="retrospective" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {retrospectiveItems.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <span className="text-lg">{category.emoji}</span>
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="text-sm p-2 rounded-lg bg-muted/30"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Actions pour le Prochain Sprint</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {retrospectiveItems[2].items.map((action, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <span className="text-sm">{action}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Sprint 13</Badge>
                        <Button variant="ghost" size="sm">
                          <Users className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Évolution de la Vélocité</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { sprint: "Sprint 8", velocity: 32 },
                      { sprint: "Sprint 9", velocity: 29 },
                      { sprint: "Sprint 10", velocity: 35 },
                      { sprint: "Sprint 11", velocity: 35 },
                      { sprint: "Sprint 12", velocity: 38 },
                    ].map((data, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-20 text-sm font-medium">
                          {data.sprint}
                        </div>
                        <div className="flex-1">
                          <Progress value={(data.velocity / 50) * 100} />
                        </div>
                        <div className="w-12 text-sm font-bold">
                          {data.velocity}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Qualité du Sprint</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">0</div>
                      <div className="text-sm text-muted-foreground">Bugs critiques</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">94%</div>
                      <div className="text-sm text-muted-foreground">Couverture tests</div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Code Review</span>
                      <span className="text-green-600">100%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tests Automatisés</span>
                      <span className="text-green-600">✓</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Documentation</span>
                      <span className="text-green-600">✓</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {teamFeedback.map((member) => (
                <Card key={member.name}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{member.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-medium">{member.name}</h3>
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-muted-foreground">
                            Satisfaction:
                          </span>
                          <span className="font-bold text-green-600">
                            {member.satisfaction}/10
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {member.feedback}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {member.highlights.map((highlight) => (
                        <Badge key={highlight} variant="outline" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  Reconnaissances du Sprint
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium text-yellow-800">
                        MVP du Sprint
                      </span>
                    </div>
                    <p className="text-sm text-yellow-700">
                      <strong>Thomas Moreau</strong> pour l'excellence dans
                      l'implémentation des tests et la qualité du code.
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800">
                        Meilleure Collaboration
                      </span>
                    </div>
                    <p className="text-sm text-blue-700">
                      <strong>Marie & Sophie</strong> pour la collaboration
                      excellente entre développement et design.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
