import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Target,
  Calendar,
  Users,
  Clock,
  TrendingUp,
  Plus,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function SprintPlanning() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Sprint Planning
            </h1>
            <p className="text-muted-foreground mt-1">
              Planifiez votre prochain sprint avec objectifs et sélection de
              user stories
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 lg:mt-0">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Sprint Précédent
            </Button>
            <Button>
              <Target className="mr-2 h-4 w-4" />
              Créer Sprint
            </Button>
          </div>
        </div>

        {/* Sprint Info et Objectif */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Informations Sprint
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Numéro Sprint</label>
                  <Input value="Sprint 13" readOnly />
                </div>
                <div>
                  <label className="text-sm font-medium">Durée</label>
                  <Input value="2 semaines" readOnly />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Date Début</label>
                  <Input type="date" value="2024-02-15" />
                </div>
                <div>
                  <label className="text-sm font-medium">Date Fin</label>
                  <Input type="date" value="2024-02-29" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Objectif Sprint (Sprint Goal)
                </label>
                <Textarea
                  placeholder="Décrivez l'objectif principal de ce sprint..."
                  value="Implémenter le système d'authentification complet avec OAuth2 et gestion des rôles utilisateurs"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Capacité et Vélocité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-primary">42</div>
                  <div className="text-sm text-muted-foreground">
                    Vélocité moyenne
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">45</div>
                  <div className="text-sm text-muted-foreground">
                    Capacité équipe
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Marie Dubois (Dev)</span>
                  <span className="text-muted-foreground">8 story points</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Pierre Martin (Dev)</span>
                  <span className="text-muted-foreground">10 story points</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Sophie Laurent (Designer)</span>
                  <span className="text-muted-foreground">6 story points</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Thomas Moreau (Tester)</span>
                  <span className="text-muted-foreground">8 story points</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Julie Petit (Dev)</span>
                  <span className="text-muted-foreground">9 story points</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Buffer (10%)</span>
                  <span className="text-muted-foreground">4 story points</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sélection User Stories */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Product Backlog */}
          <Card>
            <CardHeader>
              <CardTitle>Product Backlog</CardTitle>
              <p className="text-sm text-muted-foreground">
                Sélectionnez les user stories pour le sprint
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    id: "US-201",
                    title:
                      "En tant qu'utilisateur, je veux me connecter avec OAuth2",
                    priority: "High",
                    points: 8,
                    status: "Ready",
                  },
                  {
                    id: "US-202",
                    title:
                      "En tant qu'admin, je veux gérer les rôles utilisateurs",
                    priority: "High",
                    points: 13,
                    status: "Ready",
                  },
                  {
                    id: "US-203",
                    title:
                      "En tant qu'utilisateur, je veux récupérer mon mot de passe",
                    priority: "Medium",
                    points: 5,
                    status: "Ready",
                  },
                  {
                    id: "US-204",
                    title: "En tant qu'utilisateur, je veux activer la 2FA",
                    priority: "Medium",
                    points: 8,
                    status: "Draft",
                  },
                  {
                    id: "US-205",
                    title:
                      "En tant qu'admin, je veux voir l'historique des connexions",
                    priority: "Low",
                    points: 5,
                    status: "Ready",
                  },
                ].map((story) => (
                  <div
                    key={story.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-muted-foreground">
                          {story.id}
                        </span>
                        <Badge
                          variant={
                            story.priority === "High"
                              ? "destructive"
                              : story.priority === "Medium"
                                ? "default"
                                : "outline"
                          }
                        >
                          {story.priority}
                        </Badge>
                        <Badge
                          variant={
                            story.status === "Ready" ? "secondary" : "outline"
                          }
                        >
                          {story.status}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium">{story.title}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">
                        {story.points} SP
                      </span>
                      <Button size="sm" variant="ghost">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sprint Backlog */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Sprint Backlog
                <Badge variant="secondary">34/45 SP</Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                User stories sélectionnées pour le sprint
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                {[
                  {
                    id: "US-201",
                    title:
                      "En tant qu'utilisateur, je veux me connecter avec OAuth2",
                    points: 8,
                    assignee: "Marie D.",
                  },
                  {
                    id: "US-202",
                    title:
                      "En tant qu'admin, je veux gérer les rôles utilisateurs",
                    points: 13,
                    assignee: "Pierre M.",
                  },
                  {
                    id: "US-203",
                    title:
                      "En tant qu'utilisateur, je veux récupérer mon mot de passe",
                    points: 5,
                    assignee: "Sophie L.",
                  },
                  {
                    id: "US-205",
                    title:
                      "En tant qu'admin, je veux voir l'historique des connexions",
                    points: 5,
                    assignee: "Thomas M.",
                  },
                ].map((story) => (
                  <div
                    key={story.id}
                    className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-muted-foreground">
                          {story.id}
                        </span>
                        <span className="text-xs text-blue-600">
                          Assigné à {story.assignee}
                        </span>
                      </div>
                      <p className="text-sm font-medium">{story.title}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">
                        {story.points} SP
                      </span>
                      <Button size="sm" variant="ghost">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progression de capacité</span>
                  <span>34/45 story points</span>
                </div>
                <Progress value={76} className="w-full" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Capacité restante: 11 SP</span>
                  <span>76% utilisé</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Planning Poker et Definition of Done */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Planning Poker
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <h3 className="font-medium mb-2">
                  Story en cours d'estimation:
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  US-204: En tant qu'utilisateur, je veux activer la 2FA
                </p>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 5, 8, 13, 21, "?"].map((point) => (
                  <Button
                    key={point}
                    variant="outline"
                    className="h-12 font-bold"
                  >
                    {point}
                  </Button>
                ))}
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Votes équipe:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span>Marie D.</span>
                    <Badge variant="outline">8</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Pierre M.</span>
                    <Badge variant="outline">5</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Sophie L.</span>
                    <Badge variant="outline">8</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Thomas M.</span>
                    <Badge variant="outline">8</Badge>
                  </div>
                </div>
              </div>

              <Button className="w-full">
                <CheckCircle className="mr-2 h-4 w-4" />
                Révéler et Consensus
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Definition of Done
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="code-review" checked readOnly />
                  <label htmlFor="code-review" className="text-sm">
                    Code reviewé par 2 développeurs
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="unit-tests" checked readOnly />
                  <label htmlFor="unit-tests" className="text-sm">
                    Tests unitaires écrits et passants (&gt;80% couverture)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="integration-tests"
                    checked
                    readOnly
                  />
                  <label htmlFor="integration-tests" className="text-sm">
                    Tests d'intégration passants
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="documentation" checked readOnly />
                  <label htmlFor="documentation" className="text-sm">
                    Documentation API mise à jour
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="acceptance-criteria"
                    checked
                    readOnly
                  />
                  <label htmlFor="acceptance-criteria" className="text-sm">
                    Critères d'acceptation validés par PO
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="deployment" />
                  <label htmlFor="deployment" className="text-sm">
                    Déployé en environnement de test
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="security" />
                  <label htmlFor="security" className="text-sm">
                    Analyse sécurité effectuée
                  </label>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-800">
                    Attention
                  </span>
                </div>
                <p className="text-sm text-orange-700">
                  Toutes les conditions DoD doivent être remplies avant de
                  marquer une story comme "Done".
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Sprint Planning prêt ?</h3>
                <p className="text-sm text-muted-foreground">
                  Vérifiez que l'objectif, la capacité et les user stories sont
                  validés
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">Sauvegarder Brouillon</Button>
                <Button>
                  <Target className="mr-2 h-4 w-4" />
                  Démarrer Sprint
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
