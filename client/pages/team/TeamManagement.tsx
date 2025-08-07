import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Plus,
  Filter,
  Search,
  Mail,
  Phone,
  Calendar,
  Clock,
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Star,
  Settings,
} from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Marie Dubois",
    email: "marie.dubois@gpas.com",
    role: "Développeur Senior",
    status: "Disponible",
    avatar: "MD",
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    currentSprint: {
      taskCount: 8,
      completedTasks: 6,
      storyPoints: 21,
      completedPoints: 16,
    },
    productivity: 92,
    lastActive: "Il y a 5 min",
  },
  {
    id: 2,
    name: "Pierre Martin",
    email: "pierre.martin@gpas.com",
    role: "Product Owner",
    status: "En réunion",
    avatar: "PM",
    skills: ["Product Management", "SCRUM", "Analytics", "UX"],
    currentSprint: {
      taskCount: 5,
      completedTasks: 4,
      storyPoints: 15,
      completedPoints: 12,
    },
    productivity: 88,
    lastActive: "Il y a 1h",
  },
  {
    id: 3,
    name: "Sophie Laurent",
    email: "sophie.laurent@gpas.com",
    role: "UX/UI Designer",
    status: "Disponible",
    avatar: "SL",
    skills: ["Figma", "Adobe Creative", "Prototyping", "User Research"],
    currentSprint: {
      taskCount: 6,
      completedTasks: 5,
      storyPoints: 18,
      completedPoints: 15,
    },
    productivity: 85,
    lastActive: "Il y a 15 min",
  },
  {
    id: 4,
    name: "Thomas Moreau",
    email: "thomas.moreau@gpas.com",
    role: "QA Tester",
    status: "Disponible",
    avatar: "TM",
    skills: ["Test Automation", "Cypress", "Jest", "Manual Testing"],
    currentSprint: {
      taskCount: 12,
      completedTasks: 10,
      storyPoints: 24,
      completedPoints: 20,
    },
    productivity: 95,
    lastActive: "Il y a 10 min",
  },
  {
    id: 5,
    name: "Julie Petit",
    email: "julie.petit@gpas.com",
    role: "Développeur",
    status: "Congés",
    avatar: "JP",
    skills: ["Vue.js", "Python", "Docker", "AWS"],
    currentSprint: {
      taskCount: 0,
      completedTasks: 0,
      storyPoints: 0,
      completedPoints: 0,
    },
    productivity: 0,
    lastActive: "Il y a 3 jours",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Disponible":
      return "bg-green-100 text-green-800 border-green-200";
    case "En réunion":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "Congés":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function TeamManagement() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Gestion d'Équipe
            </h1>
            <p className="text-muted-foreground mt-1">
              Gérez les membres de votre équipe, leurs rôles et leur
              disponibilité
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
              Ajouter Membre
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Membres Actifs
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-green-600">1 en congés</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Productivité Moyenne
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">90%</div>
              <p className="text-xs text-green-600">+5% ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tâches en Cours
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">31</div>
              <p className="text-xs text-muted-foreground">25 terminées</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Charge de Travail
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78SP</div>
              <p className="text-xs text-muted-foreground">Sprint actuel</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="members" className="space-y-6">
          <TabsList>
            <TabsTrigger value="members">Membres</TabsTrigger>
            <TabsTrigger value="roles">Rôles & Permissions</TabsTrigger>
            <TabsTrigger value="availability">Disponibilité</TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="space-y-6">
            {/* Team Members Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <Card key={member.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{member.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {member.role}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(member.status)}>
                        {member.status}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Contact Info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        <span className="truncate">{member.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{member.lastActive}</span>
                      </div>
                    </div>

                    {/* Current Sprint Progress */}
                    {member.status !== "Congés" && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Sprint Actuel</span>
                          <span>
                            {member.currentSprint.completedTasks}/
                            {member.currentSprint.taskCount} tâches
                          </span>
                        </div>
                        <Progress
                          value={
                            (member.currentSprint.completedTasks /
                              member.currentSprint.taskCount) *
                            100
                          }
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>
                            {member.currentSprint.completedPoints}/
                            {member.currentSprint.storyPoints} SP
                          </span>
                          <span>{member.productivity}% productivité</span>
                        </div>
                      </div>
                    )}

                    {/* Skills */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Compétences</h4>
                      <div className="flex flex-wrap gap-1">
                        {member.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Mail className="mr-1 h-3 w-3" />
                        Contact
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="roles" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Rôles SCRUM</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      role: "Product Owner",
                      count: 1,
                      permissions: [
                        "Gestion Product Backlog",
                        "Définition critères acceptation",
                        "Priorisation features",
                      ],
                    },
                    {
                      role: "Scrum Master",
                      count: 0,
                      permissions: [
                        "Animation cérémonies",
                        "Gestion impediments",
                        "Coaching équipe",
                      ],
                    },
                    {
                      role: "Développeur",
                      count: 2,
                      permissions: [
                        "Développement features",
                        "Code review",
                        "Estimation tâches",
                      ],
                    },
                    {
                      role: "Designer",
                      count: 1,
                      permissions: [
                        "Design UI/UX",
                        "Prototypage",
                        "Tests utilisateurs",
                      ],
                    },
                    {
                      role: "QA Tester",
                      count: 1,
                      permissions: [
                        "Tests manuels/automatisés",
                        "Validation qualité",
                        "Reporting bugs",
                      ],
                    },
                  ].map((roleInfo) => (
                    <div
                      key={roleInfo.role}
                      className="flex items-start justify-between p-3 border rounded-lg"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{roleInfo.role}</h4>
                          <Badge variant="outline">{roleInfo.count}</Badge>
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {roleInfo.permissions.map((permission) => (
                            <li key={permission} className="flex items-center gap-1">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                              {permission}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Gestion des Permissions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-blue-800">
                          Permissions Admin
                        </h4>
                        <p className="text-sm text-blue-600">
                          Accès complet à tous les modules
                        </p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        1 utilisateur
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-green-800">
                          Permissions Équipe
                        </h4>
                        <p className="text-sm text-green-600">
                          Accès projets assignés et outils productivité
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        4 utilisateurs
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">
                          Permissions Lecture
                        </h4>
                        <p className="text-sm text-gray-600">
                          Consultation uniquement
                        </p>
                      </div>
                      <Badge className="bg-gray-100 text-gray-800">
                        0 utilisateur
                      </Badge>
                    </div>
                  </div>

                  <Button className="w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Configurer Permissions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="availability" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Disponibilité Cette Semaine</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {member.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {member.role}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          {member.status === "Congés" ? (
                            <Badge className="bg-red-100 text-red-800">
                              Congés
                            </Badge>
                          ) : (
                            <div className="space-y-1">
                              <div className="text-sm font-medium">40h/40h</div>
                              <Progress value={100} className="w-20 h-2" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Planification Future</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <Calendar className="h-4 w-4 text-orange-600" />
                      <div className="flex-1">
                        <div className="font-medium text-orange-800">
                          Julie Petit - Retour de congés
                        </div>
                        <div className="text-sm text-orange-600">
                          Lundi 19 Février 2024
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <Star className="h-4 w-4 text-blue-600" />
                      <div className="flex-1">
                        <div className="font-medium text-blue-800">
                          Formation SCRUM Master
                        </div>
                        <div className="text-sm text-blue-600">
                          Thomas Moreau - 25-26 Février
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <Plus className="h-4 w-4 text-green-600" />
                      <div className="flex-1">
                        <div className="font-medium text-green-800">
                          Nouveau développeur
                        </div>
                        <div className="text-sm text-green-600">
                          Arrivée prévue Mars 2024
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Calendar className="mr-2 h-4 w-4" />
                    Voir Planning Complet
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
