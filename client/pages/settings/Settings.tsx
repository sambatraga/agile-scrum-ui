import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Settings as SettingsIcon,
  Users,
  Shield,
  Clock,
  Target,
  Palette,
  Database,
  Bell,
  Download,
  Upload,
  Trash2,
  Save,
  RefreshCw,
  Key,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

export default function Settings() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Paramètres Système
            </h1>
            <p className="text-muted-foreground mt-1">
              Configurez les paramètres SCRUM, rôles utilisateurs, sécurité et préférences système
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 lg:mt-0">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Importer Config
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Sauvegarder
            </Button>
          </div>
        </div>

        <Tabs defaultValue="scrum" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="scrum">SCRUM</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="security">Sécurité</TabsTrigger>
            <TabsTrigger value="appearance">Apparence</TabsTrigger>
            <TabsTrigger value="integrations">Intégrations</TabsTrigger>
            <TabsTrigger value="backup">Sauvegarde</TabsTrigger>
            <TabsTrigger value="system">Système</TabsTrigger>
          </TabsList>

          <TabsContent value="scrum" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Configuration Sprint
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Durée Sprint (semaines)</label>
                      <Select defaultValue="2">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 semaine</SelectItem>
                          <SelectItem value="2">2 semaines</SelectItem>
                          <SelectItem value="3">3 semaines</SelectItem>
                          <SelectItem value="4">4 semaines</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Vélocité cible par défaut</label>
                      <Input type="number" defaultValue="40" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Definition of Done par défaut</label>
                    <Textarea
                      defaultValue="- Code reviewé par 2 d��veloppeurs&#10;- Tests unitaires passants (>80% couverture)&#10;- Tests d'intégration passants&#10;- Documentation mise à jour&#10;- Critères d'acceptation validés par PO"
                      rows={5}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Sprint auto-démarrage</div>
                      <div className="text-sm text-muted-foreground">
                        Démarrer automatiquement le prochain sprint après review
                      </div>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Planning Poker obligatoire</div>
                      <div className="text-sm text-muted-foreground">
                        Exiger une estimation par planning poker
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Cérémonies SCRUM
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Daily Standup</div>
                        <div className="text-sm text-muted-foreground">9h00 - 15min</div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Sprint Planning</div>
                        <div className="text-sm text-muted-foreground">Lundi 10h00 - 4h</div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Sprint Review</div>
                        <div className="text-sm text-muted-foreground">Vendredi 14h00 - 2h</div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Rétrospective</div>
                        <div className="text-sm text-muted-foreground">Vendredi 16h00 - 1h</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Rappels automatiques</div>
                      <div className="text-sm text-muted-foreground">
                        Envoyer des rappels 15min avant
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Métriques et Reporting</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 lg:grid-cols-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Burndown automatique</div>
                      <div className="text-sm text-muted-foreground">
                        Générer le burndown quotidiennement
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Métriques temps réel</div>
                      <div className="text-sm text-muted-foreground">
                        Mise à jour continue des KPI
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Rapport hebdomadaire</div>
                      <div className="text-sm text-muted-foreground">
                        Envoi automatique le vendredi
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Gestion des Rôles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { role: "Admin", count: 1, permissions: "Accès complet" },
                    { role: "Product Owner", count: 1, permissions: "Backlog, Planning" },
                    { role: "Scrum Master", count: 0, permissions: "Ceremonies, Team" },
                    { role: "Developer", count: 3, permissions: "Development, Tasks" },
                    { role: "Tester", count: 1, permissions: "Testing, Quality" },
                    { role: "Stakeholder", count: 0, permissions: "Lecture seule" },
                  ].map((roleInfo) => (
                    <div
                      key={roleInfo.role}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{roleInfo.role}</div>
                        <div className="text-sm text-muted-foreground">
                          {roleInfo.permissions}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{roleInfo.count} utilisateurs</Badge>
                        <Button variant="ghost" size="sm">
                          <SettingsIcon className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Paramètres Utilisateur</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Auto-assignation</div>
                      <div className="text-sm text-muted-foreground">
                        Permettre l'auto-assignation des tâches
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Limite projets par utilisateur</div>
                      <div className="text-sm text-muted-foreground">
                        Maximum 5 projets actifs
                      </div>
                    </div>
                    <Input type="number" defaultValue="5" className="w-20" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Session timeout</div>
                      <div className="text-sm text-muted-foreground">
                        Durée de session en heures
                      </div>
                    </div>
                    <Select defaultValue="24">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8">8 heures</SelectItem>
                        <SelectItem value="24">24 heures</SelectItem>
                        <SelectItem value="168">7 jours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Profils publics</div>
                      <div className="text-sm text-muted-foreground">
                        Rendre les profils visibles à l'équipe
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Authentification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">2FA obligatoire</div>
                      <div className="text-sm text-muted-foreground">
                        Exiger la double authentification
                      </div>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">SSO avec OAuth2</div>
                      <div className="text-sm text-muted-foreground">
                        Connexion via Google, Microsoft
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Politique mot de passe</label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Faible (6+ caractères)</SelectItem>
                        <SelectItem value="medium">Moyenne (8+ caractères + complexité)</SelectItem>
                        <SelectItem value="high">Forte (12+ caractères + symboles)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Tentatives de connexion max</label>
                    <Input type="number" defaultValue="5" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    Audit et Logs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Audit trail complet</div>
                      <div className="text-sm text-muted-foreground">
                        Enregistrer toutes les actions utilisateurs
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Rétention des logs (jours)</label>
                    <Select defaultValue="730">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="90">90 jours</SelectItem>
                        <SelectItem value="365">1 an</SelectItem>
                        <SelectItem value="730">2 ans</SelectItem>
                        <SelectItem value="2555">7 ans</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Alertes sécurité</div>
                      <div className="text-sm text-muted-foreground">
                        Notifier les tentatives de connexion suspectes
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Conformité RGPD</div>
                      <div className="text-sm text-muted-foreground">
                        Activer les contrôles RGPD
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Chiffrement et Sécurité</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Chiffrement AES-256</div>
                      <div className="text-sm text-muted-foreground">
                        Données au repos et en transit
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Activé
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Sauvegarde quotidienne</div>
                      <div className="text-sm text-muted-foreground">
                        Backup automatique chiffré
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Activé
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Thème et Couleurs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Thème par défaut</label>
                    <Select defaultValue="light">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Clair</SelectItem>
                        <SelectItem value="dark">Sombre</SelectItem>
                        <SelectItem value="system">Système</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Couleur primaire</label>
                    <div className="flex gap-2 mt-2">
                      {["blue", "purple", "green", "orange", "red"].map((color) => (
                        <div
                          key={color}
                          className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                            color === "blue" ? "border-gray-900" : "border-gray-300"
                          } bg-${color}-500`}
                        ></div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Mode compact</div>
                      <div className="text-sm text-muted-foreground">
                        Interface plus dense
                      </div>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Animations</div>
                      <div className="text-sm text-muted-foreground">
                        Activer les transitions et animations
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Personnalisation Dashboard</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Widgets personnalisés</div>
                      <div className="text-sm text-muted-foreground">
                        Permettre la personnalisation des widgets
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Layout adaptatif</div>
                      <div className="text-sm text-muted-foreground">
                        Ajustement automatique selon l'écran
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Widgets par défaut</label>
                    <div className="space-y-2 mt-2">
                      {["Sprint actuel", "Vélocité", "Burndown", "Équipe", "Notifications"].map((widget) => (
                        <div key={widget} className="flex items-center justify-between">
                          <span className="text-sm">{widget}</span>
                          <Switch defaultChecked={widget !== "Notifications"} />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Intégrations Externes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Slack", status: "connected", description: "Notifications équipe" },
                    { name: "JIRA", status: "disconnected", description: "Synchronisation tickets" },
                    { name: "GitHub", status: "connected", description: "Gestion code source" },
                    { name: "Azure DevOps", status: "disconnected", description: "CI/CD pipeline" },
                  ].map((integration) => (
                    <div
                      key={integration.name}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{integration.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {integration.description}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={integration.status === "connected" ? "secondary" : "outline"}
                          className={
                            integration.status === "connected"
                              ? "bg-green-100 text-green-800"
                              : ""
                          }
                        >
                          {integration.status === "connected" ? "Connecté" : "Déconnecté"}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          {integration.status === "connected" ? "Config" : "Connecter"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>API et Webhooks</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">API REST activée</div>
                      <div className="text-sm text-muted-foreground">
                        Permettre l'accès via API
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Rate limiting (req/min)</label>
                    <Input type="number" defaultValue="1000" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Webhooks sortants</div>
                      <div className="text-sm text-muted-foreground">
                        Notifications vers services externes
                      </div>
                    </div>
                    <Switch />
                  </div>

                  <Button variant="outline" className="w-full">
                    <Key className="mr-2 h-4 w-4" />
                    Générer clé API
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="backup" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Sauvegarde Automatique
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Backup quotidien</div>
                      <div className="text-sm text-muted-foreground">
                        Sauvegarde automatique à 2h00
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Rétention (jours)</label>
                    <Select defaultValue="30">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 jours</SelectItem>
                        <SelectItem value="30">30 jours</SelectItem>
                        <SelectItem value="90">90 jours</SelectItem>
                        <SelectItem value="365">1 an</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Backup chiffré</div>
                      <div className="text-sm text-muted-foreground">
                        Chiffrement AES-256 des sauvegardes
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger Backup Manuel
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Restauration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-800">
                        Attention
                      </span>
                    </div>
                    <p className="text-sm text-orange-700">
                      La restauration remplacera toutes les données actuelles.
                      Créez un backup avant de procéder.
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Sélectionner un backup</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir un backup..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024-02-15">15/02/2024 - 02:00</SelectItem>
                        <SelectItem value="2024-02-14">14/02/2024 - 02:00</SelectItem>
                        <SelectItem value="2024-02-13">13/02/2024 - 02:00</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Restaurer depuis fichier
                  </Button>

                  <Button variant="destructive" className="w-full">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Restaurer Backup
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Informations Système</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Version GPAS</span>
                    <span className="text-sm font-medium">v2.1.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Base de données</span>
                    <span className="text-sm font-medium">PostgreSQL 15.2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Utilisateurs actifs</span>
                    <span className="text-sm font-medium">5 / 50</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Espace utilisé</span>
                    <span className="text-sm font-medium">2.4 GB / 100 GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Dernier backup</span>
                    <span className="text-sm font-medium">Aujourd'hui 02:00</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Maintenance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Vider le cache
                  </Button>

                  <Button variant="outline" className="w-full">
                    <Database className="mr-2 h-4 w-4" />
                    Optimiser BDD
                  </Button>

                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Exporter logs système
                  </Button>

                  <Separator />

                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="text-sm font-medium text-red-800">
                        Zone dangereuse
                      </span>
                    </div>
                    <Button variant="destructive" className="w-full">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Réinitialiser système
                    </Button>
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
