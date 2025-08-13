import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
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
  FileText,
  Edit,
  Archive,
  ArchiveRestore,
  Trash2,
  Eye,
  Pause,
  Play,
  Flag
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planifie' | 'en-cours' | 'suspendu' | 'termine' | 'archive';
  progress: number;
  startDate: string;
  endDate?: string;
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
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  metadata: {
    client?: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    technology: string[];
    category: string;
  };
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Plateforme E-commerce',
    description: 'Développement d\'une plateforme de vente en ligne avec intégration de paiement et gestion d\'inventaire.',
    status: 'en-cours',
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
    spentBudget: 95000,
    createdBy: 'user1',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-22',
    metadata: {
      client: 'TechCorp SARL',
      priority: 'high',
      technology: ['React', 'Node.js', 'PostgreSQL'],
      category: 'Web Application'
    }
  },
  {
    id: '2',
    name: 'Application Mobile Banking',
    description: 'Application mobile sécurisée pour les services bancaires avec authentification biométrique.',
    status: 'planifie',
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
    spentBudget: 25000,
    createdBy: 'user2',
    createdAt: '2024-02-15',
    updatedAt: '2024-02-20',
    metadata: {
      client: 'Banque Nationale',
      priority: 'critical',
      technology: ['React Native', 'Firebase', 'Node.js'],
      category: 'Mobile Application'
    }
  },
  {
    id: '3',
    name: 'Système CRM',
    description: 'Système de gestion de la relation client avec automatisation des ventes et marketing.',
    status: 'termine',
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
    spentBudget: 118500,
    createdBy: 'user1',
    createdAt: '2023-07-20',
    updatedAt: '2024-01-31',
    metadata: {
      client: 'Sales Solutions Inc',
      priority: 'medium',
      technology: ['Vue.js', 'Laravel', 'MySQL'],
      category: 'Business Software'
    }
  },
  {
    id: '4',
    name: 'Site Web Vitrine',
    description: 'Site web corporate avec gestion de contenu et optimisation SEO.',
    status: 'suspendu',
    progress: 45,
    startDate: '2024-01-01',
    endDate: '2024-04-01',
    teamMembers: [
      { id: '10', name: 'Alice Moreau', avatar: '', role: 'Web Designer' },
      { id: '11', name: 'Thomas Blanc', avatar: '', role: 'Développeur Frontend' }
    ],
    sprintCount: 6,
    totalTasks: 67,
    completedTasks: 30,
    budget: 45000,
    spentBudget: 28000,
    createdBy: 'user3',
    createdAt: '2023-12-15',
    updatedAt: '2024-02-10',
    metadata: {
      client: 'Marketing Pro',
      priority: 'low',
      technology: ['WordPress', 'PHP', 'MySQL'],
      category: 'Website'
    }
  },
  {
    id: '5',
    name: 'API Gateway Legacy',
    description: 'Ancien projet d\'API gateway maintenant archivé pour référence.',
    status: 'archive',
    progress: 80,
    startDate: '2023-01-01',
    endDate: '2023-08-01',
    teamMembers: [
      { id: '12', name: 'David Rousseau', avatar: '', role: 'Architecte' }
    ],
    sprintCount: 15,
    totalTasks: 145,
    completedTasks: 116,
    budget: 80000,
    spentBudget: 75000,
    createdBy: 'admin',
    createdAt: '2022-12-01',
    updatedAt: '2023-08-15',
    metadata: {
      client: 'Internal',
      priority: 'medium',
      technology: ['Node.js', 'Docker', 'Kubernetes'],
      category: 'Infrastructure'
    }
  }
];

const statusColors = {
  planifie: 'bg-blue-100 text-blue-800',
  'en-cours': 'bg-green-100 text-green-800',
  suspendu: 'bg-yellow-100 text-yellow-800',
  termine: 'bg-purple-100 text-purple-800',
  archive: 'bg-gray-100 text-gray-800'
};

const statusLabels = {
  planifie: 'Planifié',
  'en-cours': 'En Cours',
  suspendu: 'Suspendu',
  termine: 'Terminé',
  archive: 'Archivé'
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-blue-100 text-blue-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800'
};

const priorityLabels = {
  low: 'Faible',
  medium: 'Moyenne',
  high: 'Haute',
  critical: 'Critique'
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: '',
    client: '',
    priority: 'medium' as const,
    technology: '',
    category: ''
  });

  const currentUser = 'user1'; // Simulation utilisateur connecté
  const isAdmin = currentUser === 'admin';

  const filteredProjects = projects.filter(project => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'active') return project.status === 'en-cours';
    if (selectedTab === 'archived') return project.status === 'archive';
    return project.status === selectedTab;
  });

  const validateProjectName = (name: string, excludeId?: string) => {
    return !projects.some(p => p.name.toLowerCase() === name.toLowerCase() && p.id !== excludeId);
  };

  const handleCreateProject = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom du projet est obligatoire",
        variant: "destructive"
      });
      return;
    }

    if (!formData.startDate) {
      toast({
        title: "Erreur",
        description: "La date de début est obligatoire",
        variant: "destructive"
      });
      return;
    }

    if (!validateProjectName(formData.name)) {
      toast({
        title: "Erreur",
        description: "Un projet avec ce nom existe déjà dans l'organisation",
        variant: "destructive"
      });
      return;
    }

    const newProject: Project = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      status: 'planifie',
      progress: 0,
      startDate: formData.startDate,
      endDate: formData.endDate,
      teamMembers: [],
      sprintCount: 0,
      totalTasks: 0,
      completedTasks: 0,
      budget: parseInt(formData.budget) || 0,
      spentBudget: 0,
      createdBy: currentUser,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      metadata: {
        client: formData.client,
        priority: formData.priority,
        technology: formData.technology.split(',').map(t => t.trim()).filter(Boolean),
        category: formData.category
      }
    };

    setProjects(prev => [...prev, newProject]);
    setIsCreateDialogOpen(false);
    setFormData({
      name: '', description: '', startDate: '', endDate: '', budget: '',
      client: '', priority: 'medium', technology: '', category: ''
    });

    toast({
      title: "Succès",
      description: "Projet créé avec succès"
    });
  };

  const handleEditProject = () => {
    if (!selectedProject) return;

    if (!formData.name.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom du projet est obligatoire",
        variant: "destructive"
      });
      return;
    }

    if (!formData.startDate) {
      toast({
        title: "Erreur",
        description: "La date de début est obligatoire",
        variant: "destructive"
      });
      return;
    }

    if (!validateProjectName(formData.name, selectedProject.id)) {
      toast({
        title: "Erreur",
        description: "Un projet avec ce nom existe déjà dans l'organisation",
        variant: "destructive"
      });
      return;
    }

    setProjects(prev => prev.map(p =>
      p.id === selectedProject.id
        ? {
            ...p,
            name: formData.name,
            description: formData.description,
            startDate: formData.startDate,
            endDate: formData.endDate,
            budget: parseInt(formData.budget) || p.budget,
            updatedAt: new Date().toISOString().split('T')[0],
            metadata: {
              ...p.metadata,
              client: formData.client,
              priority: formData.priority,
              technology: formData.technology.split(',').map(t => t.trim()).filter(Boolean),
              category: formData.category
            }
          }
        : p
    ));

    setIsEditDialogOpen(false);
    setSelectedProject(null);

    toast({
      title: "Succès",
      description: "Projet modifié avec succès"
    });
  };

  const openEditDialog = (project: Project) => {
    setSelectedProject(project);
    setFormData({
      name: project.name,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate || '',
      budget: project.budget.toString(),
      client: project.metadata.client || '',
      priority: project.metadata.priority,
      technology: project.metadata.technology.join(', '),
      category: project.metadata.category
    });
    setIsEditDialogOpen(true);
  };

  const changeProjectStatus = (projectId: string, newStatus: Project['status']) => {
    setProjects(prev => prev.map(p =>
      p.id === projectId
        ? { ...p, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] }
        : p
    ));

    toast({
      title: "Statut modifié",
      description: `Projet ${statusLabels[newStatus].toLowerCase()}`
    });
  };

  const canDeleteProject = (project: Project) => {
    return isAdmin || project.createdBy === currentUser;
  };

  const handleDeleteProject = () => {
    if (!deleteProjectId) return;

    setProjects(prev => prev.filter(p => p.id !== deleteProjectId));
    setDeleteProjectId(null);

    toast({
      title: "Projet supprimé",
      description: "Le projet a été supprimé définitivement"
    });
  };

  const ProjectCard = ({ project }: { project: Project }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-lg">{project.name}</CardTitle>
              <Badge className={priorityColors[project.metadata.priority]} variant="secondary">
                {priorityLabels[project.metadata.priority]}
              </Badge>
            </div>
            <CardDescription className="text-sm line-clamp-2">
              {project.description}
            </CardDescription>
            {project.metadata.client && (
              <p className="text-xs text-muted-foreground mt-1">
                Client: {project.metadata.client}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Badge className={statusColors[project.status]}>
              {statusLabels[project.status]}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => openEditDialog(project)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Eye className="h-4 w-4 mr-2" />
                  Voir détails
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                {project.status !== 'suspendu' && project.status !== 'termine' && project.status !== 'archive' && (
                  <DropdownMenuItem onClick={() => changeProjectStatus(project.id, 'suspendu')}>
                    <Pause className="h-4 w-4 mr-2" />
                    Suspendre
                  </DropdownMenuItem>
                )}

                {project.status === 'suspendu' && (
                  <DropdownMenuItem onClick={() => changeProjectStatus(project.id, 'en-cours')}>
                    <Play className="h-4 w-4 mr-2" />
                    Reprendre
                  </DropdownMenuItem>
                )}

                {project.status === 'en-cours' && (
                  <DropdownMenuItem onClick={() => changeProjectStatus(project.id, 'termine')}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Marquer terminé
                  </DropdownMenuItem>
                )}

                {project.status === 'termine' && (
                  <DropdownMenuItem onClick={() => changeProjectStatus(project.id, 'archive')}>
                    <Archive className="h-4 w-4 mr-2" />
                    Archiver
                  </DropdownMenuItem>
                )}

                {project.status === 'archive' && (
                  <DropdownMenuItem onClick={() => changeProjectStatus(project.id, 'planifie')}>
                    <ArchiveRestore className="h-4 w-4 mr-2" />
                    Restaurer
                  </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />
                {canDeleteProject(project) && (
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => setDeleteProjectId(project.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Supprimer
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
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
            <span>{project.endDate ? new Date(project.endDate).toLocaleDateString('fr-FR') : 'Non définie'}</span>
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

        {project.metadata.technology.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {project.metadata.technology.slice(0, 3).map(tech => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.metadata.technology.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{project.metadata.technology.length - 3}
              </Badge>
            )}
          </div>
        )}

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
            {(project.spentBudget / 1000).toFixed(0)}k€ / {(project.budget / 1000).toFixed(0)}k€
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={() => openEditDialog(project)}>
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
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Projets</h1>
            <p className="text-muted-foreground">
              Gérez vos projets avec métadonnées, archivage et contrôle d'accès
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nouveau Projet
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Créer un nouveau projet</DialogTitle>
                <DialogDescription>
                  Configurez les détails et métadonnées de votre nouveau projet
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom du projet *</Label>
                    <Input
                      id="name"
                      placeholder="Ex: Application Mobile"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client">Client</Label>
                    <Input
                      id="client"
                      placeholder="Nom du client"
                      value={formData.client}
                      onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Décrivez brièvement les objectifs du projet..."
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Date de début *</Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">Date de fin</Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget (€)</Label>
                    <Input
                      id="budget"
                      type="number"
                      placeholder="150000"
                      value={formData.budget}
                      onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priorité</Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value: 'low' | 'medium' | 'high' | 'critical') =>
                        setFormData(prev => ({ ...prev, priority: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Faible</SelectItem>
                        <SelectItem value="medium">Moyenne</SelectItem>
                        <SelectItem value="high">Haute</SelectItem>
                        <SelectItem value="critical">Critique</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie</Label>
                    <Input
                      id="category"
                      placeholder="Ex: Web Application"
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="technology">Technologies</Label>
                    <Input
                      id="technology"
                      placeholder="React, Node.js, PostgreSQL..."
                      value={formData.technology}
                      onChange={(e) => setFormData(prev => ({ ...prev, technology: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleCreateProject}>
                    Créer le Projet
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FolderOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{projects.length}</p>
                  <p className="text-sm text-muted-foreground">Total</p>
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
                    {projects.filter(p => p.status === 'en-cours').length}
                  </p>
                  <p className="text-sm text-muted-foreground">En Cours</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {projects.filter(p => p.status === 'planifie').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Planifiés</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {projects.filter(p => p.status === 'termine').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Terminés</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Archive className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {projects.filter(p => p.status === 'archive').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Archivés</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="active">Actifs</TabsTrigger>
            <TabsTrigger value="planifie">Planifiés</TabsTrigger>
            <TabsTrigger value="suspendu">Suspendus</TabsTrigger>
            <TabsTrigger value="termine">Terminés</TabsTrigger>
            <TabsTrigger value="archived">Archivés</TabsTrigger>
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

        {/* Edit Project Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Modifier le projet</DialogTitle>
              <DialogDescription>
                Modifiez les détails et métadonnées du projet
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nom du projet *</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-client">Client</Label>
                  <Input
                    id="edit-client"
                    value={formData.client}
                    onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-start-date">Date de début *</Label>
                  <Input
                    id="edit-start-date"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-end-date">Date de fin</Label>
                  <Input
                    id="edit-end-date"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-budget">Budget (€)</Label>
                  <Input
                    id="edit-budget"
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-priority">Priorité</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value: 'low' | 'medium' | 'high' | 'critical') =>
                      setFormData(prev => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Faible</SelectItem>
                      <SelectItem value="medium">Moyenne</SelectItem>
                      <SelectItem value="high">Haute</SelectItem>
                      <SelectItem value="critical">Critique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Catégorie</Label>
                  <Input
                    id="edit-category"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-technology">Technologies</Label>
                  <Input
                    id="edit-technology"
                    value={formData.technology}
                    onChange={(e) => setFormData(prev => ({ ...prev, technology: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleEditProject}>
                  Sauvegarder
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteProjectId} onOpenChange={() => setDeleteProjectId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Supprimer le projet</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir supprimer ce projet ? Cette action est irréversible.
                Seuls les créateurs et administrateurs peuvent supprimer un projet.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteProject} className="bg-red-600 hover:bg-red-700">
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </MainLayout>
  );
}
