import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  Target,
  Users,
  Activity,
  AlertTriangle,
  CheckCircle,
  Download,
  Filter,
} from "lucide-react";

export default function Analytics() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Analyses & Reporting
            </h1>
            <p className="text-muted-foreground mt-1">
              Analysez les performances de vos équipes et projets avec des
              métriques agiles avancées
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 lg:mt-0">
            <Select defaultValue="current-sprint">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-sprint">Sprint actuel</SelectItem>
                <SelectItem value="last-sprint">Sprint précédent</SelectItem>
                <SelectItem value="last-3-sprints">
                  3 derniers sprints
                </SelectItem>
                <SelectItem value="quarter">Ce trimestre</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtres
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
          </div>
        </div>

        {/* Métriques Principales */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Vélocité Équipe
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-green-600">+12% vs sprint précédent</p>
              <div className="text-xs text-muted-foreground mt-1">
                Story points par sprint
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lead Time</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5.2</div>
              <p className="text-xs text-red-600">+0.8 jours vs précédent</p>
              <div className="text-xs text-muted-foreground mt-1">
                Jours moyens par story
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Taux de Réussite
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-green-600">+5% vs sprint précédent</p>
              <div className="text-xs text-muted-foreground mt-1">
                Stories terminées dans les temps
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Qualité</CardTitle>
              <Target className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.1%</div>
              <p className="text-xs text-green-600">-0.5% vs précédent</p>
              <div className="text-xs text-muted-foreground mt-1">
                Taux de défauts
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="velocity" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="velocity">Vélocité</TabsTrigger>
            <TabsTrigger value="burndown">Burndown</TabsTrigger>
            <TabsTrigger value="cycle-time">Cycle Time</TabsTrigger>
            <TabsTrigger value="quality">Qualité</TabsTrigger>
            <TabsTrigger value="team">Équipe</TabsTrigger>
          </TabsList>

          {/* Onglet Vélocité */}
          <TabsContent value="velocity" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Évolution de la Vélocité</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Story points par sprint sur les 6 derniers sprints
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { sprint: "Sprint 7", velocity: 35, trend: "up" },
                      { sprint: "Sprint 8", velocity: 38, trend: "up" },
                      { sprint: "Sprint 9", velocity: 32, trend: "down" },
                      { sprint: "Sprint 10", velocity: 41, trend: "up" },
                      { sprint: "Sprint 11", velocity: 37, trend: "down" },
                      { sprint: "Sprint 12", velocity: 42, trend: "up" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-20 text-sm font-medium">
                          {item.sprint}
                        </div>
                        <div className="flex-1">
                          <Progress value={(item.velocity / 50) * 100} />
                        </div>
                        <div className="w-12 text-sm font-bold">
                          {item.velocity}
                        </div>
                        <div className="w-6">
                          {item.trend === "up" ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">
                        Analyse IA
                      </span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Vélocité stable avec tendance haussière. L'équipe gagne en
                      maturité. Objectif recommandé pour le prochain sprint: 45
                      SP.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Prédictions Vélocité</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Estimation IA pour les prochains sprints
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        sprint: "Sprint 13",
                        predicted: 45,
                        confidence: 85,
                        type: "predicted",
                      },
                      {
                        sprint: "Sprint 14",
                        predicted: 47,
                        confidence: 78,
                        type: "predicted",
                      },
                      {
                        sprint: "Sprint 15",
                        predicted: 44,
                        confidence: 72,
                        type: "predicted",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
                      >
                        <div>
                          <div className="font-medium">{item.sprint}</div>
                          <div className="text-sm text-muted-foreground">
                            {item.predicted} story points prédits
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">
                            {item.confidence}% confiance
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 text-xs text-muted-foreground">
                    * Prédictions basées sur l'historique des 6 derniers sprints
                    et les facteurs contextuels
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Onglet Burndown */}
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
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          28
                        </div>
                        <div className="text-sm text-muted-foreground">
                          SP terminés
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          14
                        </div>
                        <div className="text-sm text-muted-foreground">
                          SP restants
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {[
                        { day: "Jour 1", ideal: 42, actual: 42 },
                        { day: "Jour 2", ideal: 39, actual: 38 },
                        { day: "Jour 3", ideal: 36, actual: 35 },
                        { day: "Jour 4", ideal: 33, actual: 32 },
                        { day: "Jour 5", ideal: 30, actual: 28 },
                        { day: "Jour 6", ideal: 27, actual: 24 },
                        { day: "Jour 7", ideal: 24, actual: 20 },
                        { day: "Jour 8", ideal: 21, actual: 14 },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="w-16 text-sm">{item.day}</div>
                          <div className="flex-1 flex gap-2">
                            <div className="flex-1">
                              <div className="text-xs text-gray-600 mb-1">
                                Idéal: {item.ideal} SP
                              </div>
                              <Progress
                                value={((42 - item.ideal) / 42) * 100}
                                className="h-2"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="text-xs text-primary mb-1">
                                Réel: {item.actual} SP
                              </div>
                              <Progress
                                value={((42 - item.actual) / 42) * 100}
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
                  <CardTitle>Analyse de Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">
                        Avance sur planning
                      </span>
                    </div>
                    <p className="text-sm text-green-700">
                      L'équipe est en avance de 7 SP par rapport à la
                      trajectoire idéale.
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="text-sm font-medium text-blue-800 mb-1">
                      Projection fin de sprint
                    </div>
                    <p className="text-sm text-blue-700">
                      À ce rythme, l'équipe terminera avec 2-3 jours d'avance.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Facteurs de performance:</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>• Moins d'impediments</span>
                        <span className="text-green-600">+2 SP</span>
                      </div>
                      <div className="flex justify-between">
                        <span>• Meilleure estimation</span>
                        <span className="text-green-600">+3 SP</span>
                      </div>
                      <div className="flex justify-between">
                        <span>• Scope réduit</span>
                        <span className="text-blue-600">+2 SP</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Onglet Cycle Time */}
          <TabsContent value="cycle-time" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Cycle Time par Étape</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Temps moyen passé dans chaque statut
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { stage: "To Do", time: 0.5, color: "bg-gray-500" },
                      { stage: "In Progress", time: 2.8, color: "bg-blue-500" },
                      {
                        stage: "Code Review",
                        time: 1.2,
                        color: "bg-orange-500",
                      },
                      { stage: "Testing", time: 0.7, color: "bg-purple-500" },
                      { stage: "Done", time: 0, color: "bg-green-500" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-24 text-sm font-medium">
                          {item.stage}
                        </div>
                        <div className="flex-1">
                          <Progress
                            value={(item.time / 3) * 100}
                            className="h-3"
                          />
                        </div>
                        <div className="w-16 text-sm font-bold">
                          {item.time}j
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-800">
                        Goulot d'étranglement détecté
                      </span>
                    </div>
                    <p className="text-sm text-orange-700">
                      Le développement prend 54% du cycle total. Considérez une
                      décomposition plus fine des tâches.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribution Cycle Time</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Répartition des stories par durée de cycle
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { range: "0-2 jours", count: 8, percentage: 32 },
                      { range: "3-5 jours", count: 12, percentage: 48 },
                      { range: "6-8 jours", count: 4, percentage: 16 },
                      { range: "9+ jours", count: 1, percentage: 4 },
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{item.range}</span>
                          <span>
                            {item.count} stories ({item.percentage}%)
                          </span>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold">5.2</div>
                      <div className="text-xs text-muted-foreground">
                        Cycle time moyen
                      </div>
                    </div>
                    <div>
                      <div className="text-xl font-bold">4.1</div>
                      <div className="text-xs text-muted-foreground">
                        Cycle time médian
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Onglet Qualité */}
          <TabsContent value="quality" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Taux de Défauts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-green-600">
                      2.1%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Stories avec défauts post-livraison
                    </div>
                    <Badge variant="outline" className="text-green-600">
                      -0.5% vs sprint précédent
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Couverture Tests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-blue-600">87%</div>
                    <div className="text-sm text-muted-foreground">
                      Code couvert par les tests
                    </div>
                    <Badge variant="outline" className="text-blue-600">
                      +3% vs sprint précédent
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Code Review</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-purple-600">
                      1.2j
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Temps moyen de review
                    </div>
                    <Badge variant="outline" className="text-red-600">
                      +0.3j vs sprint précédent
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Analyse Qualité Détaillée</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="space-y-3">
                    <h4 className="font-medium">Types de Défauts</h4>
                    {[
                      { type: "Bugs fonctionnels", count: 3, severity: "high" },
                      { type: "Problèmes UI/UX", count: 2, severity: "medium" },
                      {
                        type: "Problèmes performance",
                        count: 1,
                        severity: "low",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm">{item.type}</span>
                        <Badge
                          variant={
                            item.severity === "high"
                              ? "destructive"
                              : item.severity === "medium"
                                ? "default"
                                : "outline"
                          }
                        >
                          {item.count}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Actions d'Amélioration</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Augmenter les tests E2E</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Formation sur les bonnes pratiques</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="h-4 w-4 text-orange-600 mt-0.5" />
                        <span>Optimiser le processus de review</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Équipe */}
          <TabsContent value="team" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Performance par Membre</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Marie Dubois",
                        role: "Dev Senior",
                        completed: 12,
                        velocity: 8.5,
                        quality: 95,
                      },
                      {
                        name: "Pierre Martin",
                        role: "Dev",
                        completed: 10,
                        velocity: 7.2,
                        quality: 88,
                      },
                      {
                        name: "Sophie Laurent",
                        role: "Designer",
                        completed: 8,
                        velocity: 6.8,
                        quality: 92,
                      },
                      {
                        name: "Thomas Moreau",
                        role: "Tester",
                        completed: 14,
                        velocity: 9.1,
                        quality: 97,
                      },
                    ].map((member, index) => (
                      <div
                        key={index}
                        className="p-3 border rounded-lg space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {member.role}
                            </div>
                          </div>
                          <Badge variant="outline">
                            {member.completed} tâches
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">
                              Vélocité
                            </div>
                            <div className="font-medium">
                              {member.velocity} SP/j
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Qualité</div>
                            <div className="font-medium">{member.quality}%</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Satisfaction Équipe</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      8.2/10
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Score de satisfaction moyen
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { category: "Charge de travail", score: 7.8 },
                      { category: "Clarté objectifs", score: 8.5 },
                      { category: "Collaboration", score: 8.9 },
                      { category: "Outils/Processus", score: 7.6 },
                    ].map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{item.category}</span>
                          <span className="font-medium">{item.score}/10</span>
                        </div>
                        <Progress value={item.score * 10} className="h-2" />
                      </div>
                    ))}
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="text-sm font-medium text-green-800 mb-1">
                      Points Forts
                    </div>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Excellente collaboration équipe</li>
                      <li>• Objectifs clairs et partagés</li>
                      <li>• Bonne ambiance de travail</li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <div className="text-sm font-medium text-orange-800 mb-1">
                      Axes d'Amélioration
                    </div>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• Optimiser les outils de développement</li>
                      <li>• Équilibrer la charge de travail</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
