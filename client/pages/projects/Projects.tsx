import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Calendar,
  Users,
  Target,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
  MoreVertical,
  FolderOpen,
  GitBranch,
  FileText
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed';
  progress: number;
  startDate: string;
  endDate: string;
  teamMembers: Array<{
    id: string;
    name: string;
    avatar: string;
    role: string;
  }>;
  sprintCount: number;
  totalTasks: number;
  completedTasks: number;
  budget: number;
  spentBudget: number;
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Plateforme E-commerce',
    description: 'Développement d\'une plateforme de vente en ligne avec intégration de paiement et gestion d\'inventaire.',
    status: 'active',
    progress: 68,
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    teamMembers: [
      { id: '1', name: 'Marie Dubois', avatar: '', role: 'Product Owner' },
      { id: '2', name: 'Jean Martin', avatar: '', role: 'Scrum Master' },
      { id: '3', name: 'Sophie Chen', avatar: '', role: 'Développeur' },
      { id: '4', name: 'Lucas Roy', avatar: '', role: 'Designer' }
    ],
    sprintCount: 12,
    totalTasks: 156,
    completedTasks: 106,
    budget: 150000,
    spentBudget: 95000
  },
  {
    id: '2',
    name: 'Application Mobile Banking',
    description: 'Application mobile sécurisée pour les services bancaires avec authentification biométrique.',
    status: 'planning',
    progress: 15,
    startDate: '2024-03-01',
    endDate: '2024-12-31',
    teamMembers: [
      { id: '5', name: 'Pierre Lambert', avatar: '', role: 'Product Owner' },
      { id: '6', name: 'Emma Wilson', avatar: '', role: 'Développeur Mobile' }
    ],
    sprintCount: 0,
    totalTasks: 89,
    completedTasks: 8,
    budget: 200000,
    spentBudget: 25000
  },
  {
    id: '3',
    name: 'Système CRM',
    description: 'Système de gestion de la relation client avec automatisation des ventes et marketing.',
    status: 'completed',
    progress: 100,
    startDate: '2023-08-01',
    endDate: '2024-01-31',
    teamMembers: [
      { id: '7', name: 'Paul Leroy', avatar: '', role: 'Product Owner' },
      { id: '8', name: 'Julie Simon', avatar: '', role: 'Analyste' },
      { id: '9', name: 'Marc Petit', avatar: '', role: 'Développeur' }
    ],
    sprintCount: 18,
    totalTasks: 203,
    completedTasks: 203,
    budget: 120000,
    spentBudget: 118500
  }
];

const statusColors = {
  planning: 'bg-blue-100 text-blue-800',
  active: 'bg-green-100 text-green-800',
  'on-hold': 'bg-yellow-100 text-yellow-800',
  completed: 'bg-gray-100 text-gray-800'
};

const statusLabels = {
  planning: 'Planification',
  active: 'Actif',
  'on-hold': 'En Pause',
  completed: 'Terminé'
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('all');

  const filteredProjects = projects.filter(project => {
    if (selectedTab === 'all') return true;
    return project.status === selectedTab;
  });

  const ProjectCard = ({ project }: { project: Project }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg mb-1">{project.name}</CardTitle>
            <CardDescription className="text-sm line-clamp-2">
              {project.description}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={statusColors[project.status]}>
              {statusLabels[project.status]}
            </Badge>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Progression</span>
            <span>{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{new Date(project.startDate).toLocaleDateString('fr-FR')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span>{new Date(project.endDate).toLocaleDateString('fr-FR')}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
            <span>{project.completedTasks}/{project.totalTasks} tâches</span>
          </div>
          <div className="flex items-center gap-2">
            <GitBranch className="h-4 w-4 text-muted-foreground" />
            <span>{project.sprintCount} sprints</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {project.teamMembers.slice(0, 4).map((member, index) => (
              <Avatar key={member.id} className="w-8 h-8 border-2 border-background">
                <AvatarImage src={member.avatar} />
                <AvatarFallback className="text-xs">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            ))}
            {project.teamMembers.length > 4 && (
              <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
                +{project.teamMembers.length - 4}
              </div>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            Budget: {(project.spentBudget / 1000).toFixed(0)}k€ / {(project.budget / 1000).toFixed(0)}k€
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Settings className="h-4 w-4 mr-2" />
            Configurer
          </Button>
          <Button size="sm" className="flex-1">
            <FolderOpen className="h-4 w-4 mr-2" />
            Ouvrir
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Projets</h1>
          <p className="text-muted-foreground">
            Gérez vos projets, équipes et livrables
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouveau Projet
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Créer un nouveau projet</DialogTitle>
              <DialogDescription>
                Configurez les détails de base de votre nouveau projet
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom du projet</Label>
                <Input id="name" placeholder="Ex: Application Mobile" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez brièvement les objectifs du projet..."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Date de début</Label>
                  <Input id="start-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">Date de fin</Label>
                  <Input id="end-date" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Budget (€)</Label>
                <Input id="budget" type="number" placeholder="150000" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>
                  Créer le Projet
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FolderOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{projects.length}</p>
                <p className="text-sm text-muted-foreground">Projets Total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {projects.filter(p => p.status === 'active').length}
                </p>
                <p className="text-sm text-muted-foreground">Projets Actifs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {new Set(projects.flatMap(p => p.teamMembers.map(m => m.id))).size}
                </p>
                <p className="text-sm text-muted-foreground">Membres d'Équipe</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length)}%
                </p>
                <p className="text-sm text-muted-foreground">Progression Moyenne</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">Tous les Projets</TabsTrigger>
          <TabsTrigger value="active">Actifs</TabsTrigger>
          <TabsTrigger value="planning">Planification</TabsTrigger>
          <TabsTrigger value="completed">Terminés</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <Card className="p-12 text-center">
              <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Aucun projet trouvé</h3>
              <p className="text-muted-foreground mb-4">
                Aucun projet ne correspond aux critères sélectionnés.
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Créer un Projet
              </Button>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
