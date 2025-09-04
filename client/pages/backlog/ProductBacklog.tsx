import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  BookOpen,
  Star,
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  GripVertical,
  PlayCircle,
  Pause,
  Square,
  XCircle,
  Flag,
  Timer,
  Target,
  Users,
  Calendar,
  TrendingUp,
  Settings
} from "lucide-react";

interface UserStory {
  id: string;
  asA: string; // "En tant que [qui]"
  iWant: string; // "je veux [quoi]"
  soThat: string; // "pour [pourquoi]"
  acceptanceCriteria: string[];
  priority: 'High' | 'Medium' | 'Low';
  priorityOrder: number; // Ordre numérique pour le tri
  storyPoints: 1 | 2 | 3 | 5 | 8 | 13 | 21;
  status: 'Draft' | 'Ready' | 'In Progress' | 'Done' | 'Rejected';
  businessValue: number; // 1-10
  tags: string[];
  createdAt: string;
  updatedAt: string;
  order: number; // Pour le drag & drop
}

interface Task {
  id: string;
  userStoryId: string;
  title: string;
  description: string;
  estimatedHours: number;
  actualHours: number;
  status: 'Todo' | 'In Progress' | 'Done';
  assignee?: string;
}

interface Sprint {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  duration: number; // en semaines
  status: 'Planning' | 'Active' | 'Completed';
  userStories: string[];
  tasks: Task[];
  capacity: number; // heures disponibles
  velocity: number; // story points complétés
  locked: boolean; // figé après démarrage
}

const fibonacciPoints = [1, 2, 3, 5, 8, 13, 21];

const priorityColors = {
  High: 'bg-red-100 text-red-800',
  Medium: 'bg-orange-100 text-orange-800',
  Low: 'bg-blue-100 text-blue-800'
};

const statusColors = {
  Draft: 'bg-gray-100 text-gray-800',
  Ready: 'bg-blue-100 text-blue-800',
  'In Progress': 'bg-yellow-100 text-yellow-800',
  Done: 'bg-green-100 text-green-800',
  Rejected: 'bg-red-100 text-red-800'
};

const mockUserStories: UserStory[] = [
  {
    id: '1',
    asA: 'utilisateur',
    iWant: 'me connecter avec mon email et mot de passe',
    soThat: 'accéder à mon compte sécurisé',
    acceptanceCriteria: [
      'L\'utilisateur peut saisir son email et mot de passe',
      'Le système valide les informations d\'identification',
      'L\'utilisateur est redirigé vers le tableau de bord après connexion',
      'Un message d\'erreur s\'affiche en cas d\'��chec'
    ],
    priority: 'High',
    priorityOrder: 1,
    storyPoints: 5,
    status: 'Ready',
    businessValue: 9,
    tags: ['authentication', 'security'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
    order: 1
  },
  {
    id: '2',
    asA: 'utilisateur',
    iWant: 'réinitialiser mon mot de passe',
    soThat: 'récupérer l\'accès à mon compte si je l\'oublie',
    acceptanceCriteria: [
      'L\'utilisateur peut demander une réinitialisation par email',
      'Un lien sécurisé est envoyé par email',
      'L\'utilisateur peut définir un nouveau mot de passe',
      'Le lien expire après 24 heures'
    ],
    priority: 'Medium',
    priorityOrder: 5,
    storyPoints: 8,
    status: 'Draft',
    businessValue: 7,
    tags: ['authentication', 'email'],
    createdAt: '2024-01-16',
    updatedAt: '2024-01-22',
    order: 2
  },
  {
    id: '3',
    asA: 'client',
    iWant: 'ajouter des produits à mon panier',
    soThat: 'préparer ma commande avant l\'achat',
    acceptanceCriteria: [
      'Bouton "Ajouter au panier" visible sur chaque produit',
      'Quantité modifiable avant ajout',
      'Confirmation visuelle d\'ajout au panier',
      'Compteur de produits mis à jour'
    ],
    priority: 'High',
    priorityOrder: 2,
    storyPoints: 3,
    status: 'In Progress',
    businessValue: 8,
    tags: ['ecommerce', 'shopping'],
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18',
    order: 3
  },
  {
    id: '4',
    asA: 'client',
    iWant: 'finaliser ma commande avec paiement',
    soThat: 'acheter les produits de mon panier',
    acceptanceCriteria: [
      'Formulaire d\'adresse de livraison',
      'Sélection du mode de livraison',
      'Intégration de paiement sécurisé',
      'Confirmation de commande par email'
    ],
    priority: 'High',
    priorityOrder: 3,
    storyPoints: 13,
    status: 'Ready',
    businessValue: 10,
    tags: ['ecommerce', 'payment'],
    createdAt: '2024-01-19',
    updatedAt: '2024-01-19',
    order: 4
  },
  {
    id: '5',
    asA: 'administrateur',
    iWant: 'voir les statistiques de vente',
    soThat: 'analyser les performances du site',
    acceptanceCriteria: [
      'Dashboard avec graphiques de vente',
      'Filtrage par période',
      'Export des données en CSV',
      'Alertes pour les baisses de performance'
    ],
    priority: 'Low',
    priorityOrder: 8,
    storyPoints: 21,
    status: 'Draft',
    businessValue: 6,
    tags: ['analytics', 'admin'],
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20',
    order: 5
  }
];

const mockSprints: Sprint[] = [
  {
    id: '1',
    name: 'Sprint 1 - Authentification',
    startDate: '2024-01-15',
    endDate: '2024-01-29',
    duration: 2,
    status: 'Completed',
    userStories: ['1'],
    tasks: [],
    capacity: 80,
    velocity: 5,
    locked: true
  },
  {
    id: '2',
    name: 'Sprint 2 - E-commerce Core',
    startDate: '2024-01-30',
    endDate: '2024-02-13',
    duration: 2,
    status: 'Active',
    userStories: ['3'],
    tasks: [],
    capacity: 80,
    velocity: 0,
    locked: true
  }
];

export default function ProductBacklog() {
  const [userStories, setUserStories] = useState<UserStory[]>(mockUserStories);
  const [sprints, setSprints] = useState<Sprint[]>(mockSprints);
  const [isCreateStoryOpen, setIsCreateStoryOpen] = useState(false);
  const [isCreateSprintOpen, setIsCreateSprintOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<UserStory | null>(null);
  const [deleteStoryId, setDeleteStoryId] = useState<string | null>(null);
  const [storyForm, setStoryForm] = useState({
    asA: '',
    iWant: '',
    soThat: '',
    acceptanceCriteria: [''],
    priority: 'Medium' as 'High' | 'Medium' | 'Low',
    storyPoints: 3 as 1 | 2 | 3 | 5 | 8 | 13 | 21,
    businessValue: 5,
    tags: ''
  });
  const [sprintForm, setSprintForm] = useState({
    name: '',
    startDate: '',
    duration: 2,
    capacity: 80,
    selectedStories: [] as string[]
  });

  // Tri des user stories par priorité puis par ordre
  const sortedStories = userStories
    .sort((a, b) => {
      if (a.priorityOrder !== b.priorityOrder) {
        return a.priorityOrder - b.priorityOrder;
      }
      return a.order - b.order;
    });

  // Calcul de la vélocité sur les 3 derniers sprints
  const calculateAverageVelocity = () => {
    const completedSprints = sprints.filter(s => s.status === 'Completed');
    if (completedSprints.length === 0) return 0;
    
    const recentSprints = completedSprints.slice(-3);
    const totalVelocity = recentSprints.reduce((sum, sprint) => sum + sprint.velocity, 0);
    return Math.round(totalVelocity / recentSprints.length);
  };

  const handleCreateStory = () => {
    if (!storyForm.asA || !storyForm.iWant || !storyForm.soThat) {
      toast({
        title: "Format requis",
        description: "Veuillez remplir tous les champs du format standard",
        variant: "destructive"
      });
      return;
    }

    const newStory: UserStory = {
      id: Date.now().toString(),
      asA: storyForm.asA,
      iWant: storyForm.iWant,
      soThat: storyForm.soThat,
      acceptanceCriteria: storyForm.acceptanceCriteria.filter(c => c.trim()),
      priority: storyForm.priority,
      priorityOrder: storyForm.priority === 'High' ? 1 : storyForm.priority === 'Medium' ? 5 : 8,
      storyPoints: storyForm.storyPoints,
      status: 'Draft',
      businessValue: storyForm.businessValue,
      tags: storyForm.tags.split(',').map(t => t.trim()).filter(Boolean),
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      order: userStories.length + 1
    };

    setUserStories(prev => [...prev, newStory]);
    setIsCreateStoryOpen(false);
    setStoryForm({
      asA: '', iWant: '', soThat: '', acceptanceCriteria: [''],
      priority: 'Medium', storyPoints: 3, businessValue: 5, tags: ''
    });

    toast({
      title: "User Story créée",
      description: "La user story a été ajoutée au backlog"
    });
  };

  const handleCreateSprint = () => {
    if (!sprintForm.name || !sprintForm.startDate || sprintForm.selectedStories.length === 0) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs et sélectionner au moins une story",
        variant: "destructive"
      });
      return;
    }

    const startDate = new Date(sprintForm.startDate);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + (sprintForm.duration * 7));

    const newSprint: Sprint = {
      id: Date.now().toString(),
      name: sprintForm.name,
      startDate: sprintForm.startDate,
      endDate: endDate.toISOString().split('T')[0],
      duration: sprintForm.duration,
      status: 'Planning',
      userStories: sprintForm.selectedStories,
      tasks: [],
      capacity: sprintForm.capacity,
      velocity: 0,
      locked: false
    };

    setSprints(prev => [...prev, newSprint]);
    
    // Mettre à jour le statut des stories sélectionnées
    setUserStories(prev => prev.map(story => 
      sprintForm.selectedStories.includes(story.id)
        ? { ...story, status: 'Ready' as const }
        : story
    ));

    setIsCreateSprintOpen(false);
    setSprintForm({
      name: '', startDate: '', duration: 2, capacity: 80, selectedStories: []
    });

    toast({
      title: "Sprint créé",
      description: `${sprintForm.selectedStories.length} user stories assignées au sprint`
    });
  };

  const changeStoryStatus = (storyId: string, newStatus: UserStory['status']) => {
    setUserStories(prev => prev.map(story => 
      story.id === storyId 
        ? { ...story, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] }
        : story
    ));
  };

  const moveStory = (storyId: string, direction: 'up' | 'down') => {
    const storyIndex = sortedStories.findIndex(s => s.id === storyId);
    if (storyIndex === -1) return;
    
    const newIndex = direction === 'up' ? storyIndex - 1 : storyIndex + 1;
    if (newIndex < 0 || newIndex >= sortedStories.length) return;

    const newOrder = sortedStories[newIndex].order;
    const currentOrder = sortedStories[storyIndex].order;

    setUserStories(prev => prev.map(story => {
      if (story.id === storyId) {
        return { ...story, order: newOrder };
      }
      if (story.id === sortedStories[newIndex].id) {
        return { ...story, order: currentOrder };
      }
      return story;
    }));
  };

  const formatUserStory = (story: UserStory) => {
    return `En tant que ${story.asA}, je veux ${story.iWant} pour ${story.soThat}`;
  };

  const UserStoryCard = ({ story, showDragHandle = true }: { story: UserStory, showDragHandle?: boolean }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-2 flex-1">
            {showDragHandle && (
              <div className="flex flex-col gap-1 mt-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0"
                  onClick={() => moveStory(story.id, 'up')}
                >
                  <ArrowUp className="h-3 w-3" />
                </Button>
                <GripVertical className="h-4 w-4 text-muted-foreground" />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0"
                  onClick={() => moveStory(story.id, 'down')}
                >
                  <ArrowDown className="h-3 w-3" />
                </Button>
              </div>
            )}
            <div className="flex-1">
              <div className="text-sm font-medium mb-2">
                {formatUserStory(story)}
              </div>
              <div className="flex flex-wrap gap-1 mb-2">
                {story.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSelectedStory(story)}>
                <Eye className="h-4 w-4 mr-2" />
                Voir détails
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {story.status !== 'Ready' && (
                <DropdownMenuItem onClick={() => changeStoryStatus(story.id, 'Ready')}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Marquer prêt
                </DropdownMenuItem>
              )}
              {story.status !== 'In Progress' && (
                <DropdownMenuItem onClick={() => changeStoryStatus(story.id, 'In Progress')}>
                  <PlayCircle className="h-4 w-4 mr-2" />
                  En cours
                </DropdownMenuItem>
              )}
              {story.status !== 'Done' && (
                <DropdownMenuItem onClick={() => changeStoryStatus(story.id, 'Done')}>
                  <Square className="h-4 w-4 mr-2" />
                  Terminé
                </DropdownMenuItem>
              )}
              {story.status !== 'Rejected' && (
                <DropdownMenuItem onClick={() => changeStoryStatus(story.id, 'Rejected')}>
                  <XCircle className="h-4 w-4 mr-2" />
                  Rejeter
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-600"
                onClick={() => setDeleteStoryId(story.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge className={priorityColors[story.priority]}>
            {story.priority}
          </Badge>
          <Badge className={statusColors[story.status]}>
            {story.status}
          </Badge>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>{story.storyPoints} pts</span>
          </div>
          <div className="flex items-center gap-1">
            <Target className="h-4 w-4 text-blue-500" />
            <span>Valeur: {story.businessValue}/10</span>
          </div>
        </div>

        {story.acceptanceCriteria.length > 0 && (
          <div>
            <p className="text-xs font-medium mb-1">Critères d'acceptation:</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              {story.acceptanceCriteria.slice(0, 2).map((criteria, index) => (
                <li key={index} className="flex items-start gap-1">
                  <span>•</span>
                  <span className="line-clamp-1">{criteria}</span>
                </li>
              ))}
              {story.acceptanceCriteria.length > 2 && (
                <li className="text-blue-600">+{story.acceptanceCriteria.length - 2} autres...</li>
              )}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const SprintCard = ({ sprint }: { sprint: Sprint }) => {
    const sprintStories = userStories.filter(s => sprint.userStories.includes(s.id));
    const totalPoints = sprintStories.reduce((sum, story) => sum + story.storyPoints, 0);
    const completedPoints = sprintStories
      .filter(s => s.status === 'Done')
      .reduce((sum, story) => sum + story.storyPoints, 0);

    return (
      <Card className="mb-4">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{sprint.name}</CardTitle>
              <CardDescription>
                {sprint.startDate} - {sprint.endDate} ({sprint.duration} semaines)
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={sprint.status === 'Active' ? 'default' : 'secondary'}>
                {sprint.status}
              </Badge>
              {sprint.locked && (
                <Badge variant="outline" className="text-orange-600">
                  Figé
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{sprintStories.length}</p>
              <p className="text-sm text-muted-foreground">Stories</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{totalPoints}</p>
              <p className="text-sm text-muted-foreground">Story Points</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{sprint.capacity}h</p>
              <p className="text-sm text-muted-foreground">Capacité</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{completedPoints}/{totalPoints}</p>
              <p className="text-sm text-muted-foreground">Progression</p>
            </div>
          </div>
          
          {sprintStories.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Stories assignées:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {sprintStories.map(story => (
                  <UserStoryCard key={story.id} story={story} showDragHandle={false} />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const averageVelocity = calculateAverageVelocity();
  const readyStories = userStories.filter(s => s.status === 'Ready');

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Product & Sprint Backlog</h1>
            <p className="text-muted-foreground">
              Gestion des user stories format standard et planification des sprints
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isCreateStoryOpen} onOpenChange={setIsCreateStoryOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvelle User Story
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Créer une User Story</DialogTitle>
                  <DialogDescription>
                    Format standard: "En tant que [qui], je veux [quoi] pour [pourquoi]"
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="as-a">En tant que... *</Label>
                      <Input
                        id="as-a"
                        placeholder="Ex: utilisateur, administrateur, client..."
                        value={storyForm.asA}
                        onChange={(e) => setStoryForm(prev => ({ ...prev, asA: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="i-want">Je veux... *</Label>
                      <Input
                        id="i-want"
                        placeholder="Ex: me connecter, consulter mes commandes..."
                        value={storyForm.iWant}
                        onChange={(e) => setStoryForm(prev => ({ ...prev, iWant: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="so-that">Pour... *</Label>
                      <Input
                        id="so-that"
                        placeholder="Ex: accéder à mon compte, suivre mes achats..."
                        value={storyForm.soThat}
                        onChange={(e) => setStoryForm(prev => ({ ...prev, soThat: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Critères d'acceptation</Label>
                    {storyForm.acceptanceCriteria.map((criteria, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder="Critère d'acceptation..."
                          value={criteria}
                          onChange={(e) => {
                            const newCriteria = [...storyForm.acceptanceCriteria];
                            newCriteria[index] = e.target.value;
                            setStoryForm(prev => ({ ...prev, acceptanceCriteria: newCriteria }));
                          }}
                        />
                        {index === storyForm.acceptanceCriteria.length - 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setStoryForm(prev => ({ 
                              ...prev, 
                              acceptanceCriteria: [...prev.acceptanceCriteria, ''] 
                            }))}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priorité</Label>
                      <Select 
                        value={storyForm.priority}
                        onValueChange={(value: 'High' | 'Medium' | 'Low') => 
                          setStoryForm(prev => ({ ...prev, priority: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="story-points">Story Points (Fibonacci)</Label>
                      <Select 
                        value={storyForm.storyPoints.toString()}
                        onValueChange={(value) => 
                          setStoryForm(prev => ({ ...prev, storyPoints: parseInt(value) as any }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fibonacciPoints.map(point => (
                            <SelectItem key={point} value={point.toString()}>
                              {point} point{point > 1 ? 's' : ''}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="business-value">Valeur métier (1-10)</Label>
                      <Input
                        id="business-value"
                        type="number"
                        min="1"
                        max="10"
                        value={storyForm.businessValue}
                        onChange={(e) => setStoryForm(prev => ({ 
                          ...prev, 
                          businessValue: Math.max(1, Math.min(10, parseInt(e.target.value) || 5))
                        }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
                    <Input
                      id="tags"
                      placeholder="Ex: authentication, security, ui..."
                      value={storyForm.tags}
                      onChange={(e) => setStoryForm(prev => ({ ...prev, tags: e.target.value }))}
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => setIsCreateStoryOpen(false)}>
                      Annuler
                    </Button>
                    <Button onClick={handleCreateStory}>
                      Créer la User Story
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isCreateSprintOpen} onOpenChange={setIsCreateSprintOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Nouveau Sprint
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Créer un Sprint</DialogTitle>
                  <DialogDescription>
                    Durée: 1-4 semaines. Vélocité moyenne: {averageVelocity} points
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sprint-name">Nom du Sprint *</Label>
                      <Input
                        id="sprint-name"
                        placeholder="Ex: Sprint 3 - Paiements"
                        value={sprintForm.name}
                        onChange={(e) => setSprintForm(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="start-date">Date de début *</Label>
                      <Input
                        id="start-date"
                        type="date"
                        value={sprintForm.startDate}
                        onChange={(e) => setSprintForm(prev => ({ ...prev, startDate: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Durée (semaines)</Label>
                      <Select 
                        value={sprintForm.duration.toString()}
                        onValueChange={(value) => 
                          setSprintForm(prev => ({ ...prev, duration: parseInt(value) }))}
                      >
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
                    <div className="space-y-2">
                      <Label htmlFor="capacity">Capacité (heures)</Label>
                      <Input
                        id="capacity"
                        type="number"
                        min="20"
                        max="200"
                        value={sprintForm.capacity}
                        onChange={(e) => setSprintForm(prev => ({ 
                          ...prev, 
                          capacity: parseInt(e.target.value) || 80
                        }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Sélectionner les User Stories</Label>
                    <div className="max-h-60 overflow-y-auto border rounded-lg p-2">
                      {readyStories.map(story => (
                        <div key={story.id} className="flex items-center space-x-2 p-2 hover:bg-muted rounded">
                          <input
                            type="checkbox"
                            id={`story-${story.id}`}
                            checked={sprintForm.selectedStories.includes(story.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSprintForm(prev => ({ 
                                  ...prev, 
                                  selectedStories: [...prev.selectedStories, story.id] 
                                }));
                              } else {
                                setSprintForm(prev => ({ 
                                  ...prev, 
                                  selectedStories: prev.selectedStories.filter(id => id !== story.id) 
                                }));
                              }
                            }}
                            className="rounded"
                          />
                          <label htmlFor={`story-${story.id}`} className="flex-1 text-sm cursor-pointer">
                            <span className="font-medium">{story.storyPoints} pts</span> - {formatUserStory(story)}
                          </label>
                        </div>
                      ))}
                      {readyStories.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          Aucune user story prête. Marquez des stories comme "Ready" d'abord.
                        </p>
                      )}
                    </div>
                    {sprintForm.selectedStories.length > 0 && (
                      <p className="text-sm text-muted-foreground">
                        {sprintForm.selectedStories.length} stories sélectionnées 
                        ({readyStories.filter(s => sprintForm.selectedStories.includes(s.id))
                          .reduce((sum, s) => sum + s.storyPoints, 0)} points total)
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => setIsCreateSprintOpen(false)}>
                      Annuler
                    </Button>
                    <Button onClick={handleCreateSprint}>
                      Créer le Sprint
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{userStories.length}</p>
                  <p className="text-sm text-muted-foreground">User Stories</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{readyStories.length}</p>
                  <p className="text-sm text-muted-foreground">Prêtes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {userStories.reduce((sum, s) => sum + s.storyPoints, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Story Points</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{sprints.length}</p>
                  <p className="text-sm text-muted-foreground">Sprints</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{averageVelocity}</p>
                  <p className="text-sm text-muted-foreground">Vélocité Moy.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="product-backlog" className="space-y-4">
          <TabsList>
            <TabsTrigger value="product-backlog">Product Backlog</TabsTrigger>
            <TabsTrigger value="sprint-backlog">Sprint Backlog</TabsTrigger>
            <TabsTrigger value="velocity">Vélocité & Métriques</TabsTrigger>
          </TabsList>

          <TabsContent value="product-backlog">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Product Backlog - Triées par priorité</h2>
                <p className="text-sm text-muted-foreground">
                  Drag & drop ou utilisez les flèches pour réorganiser
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {sortedStories.map(story => (
                  <UserStoryCard key={story.id} story={story} />
                ))}
              </div>

              {userStories.length === 0 && (
                <Card className="p-12 text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Aucune User Story</h3>
                  <p className="text-muted-foreground mb-4">
                    Créez votre première user story au format standard.
                  </p>
                  <Button onClick={() => setIsCreateStoryOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Créer une User Story
                  </Button>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="sprint-backlog">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Sprint Backlog</h2>
                <p className="text-sm text-muted-foreground">
                  Les sprints sont figés après démarrage
                </p>
              </div>
              
              {sprints.map(sprint => (
                <SprintCard key={sprint.id} sprint={sprint} />
              ))}

              {sprints.length === 0 && (
                <Card className="p-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Aucun Sprint</h3>
                  <p className="text-muted-foreground mb-4">
                    Créez votre premier sprint à partir du product backlog.
                  </p>
                  <Button onClick={() => setIsCreateSprintOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Créer un Sprint
                  </Button>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="velocity">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Vélocité des Sprints</CardTitle>
                  <CardDescription>
                    Calcul automatique sur les 3 derniers sprints
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sprints.filter(s => s.status === 'Completed').slice(-3).map(sprint => (
                      <div key={sprint.id} className="flex justify-between items-center p-2 bg-muted rounded">
                        <span className="font-medium">{sprint.name}</span>
                        <span>{sprint.velocity} points</span>
                      </div>
                    ))}
                    <div className="border-t pt-2">
                      <div className="flex justify-between items-center font-semibold">
                        <span>Vélocité moyenne</span>
                        <span>{averageVelocity} points</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Répartition par Statut</CardTitle>
                  <CardDescription>
                    Statuts: Draft, Ready, In Progress, Done, Rejected
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(statusColors).map(([status, color]) => {
                      const count = userStories.filter(s => s.status === status).length;
                      const percentage = userStories.length > 0 ? Math.round((count / userStories.length) * 100) : 0;
                      return (
                        <div key={status} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Badge className={color}>{status}</Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{count} stories</span>
                            <span className="text-sm text-muted-foreground">({percentage}%)</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Story Details Dialog */}
        <Dialog open={!!selectedStory} onOpenChange={() => setSelectedStory(null)}>
          <DialogContent className="max-w-2xl">
            {selectedStory && (
              <>
                <DialogHeader>
                  <DialogTitle>Détails de la User Story</DialogTitle>
                  <DialogDescription>
                    {formatUserStory(selectedStory)}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Priorité</Label>
                      <Badge className={priorityColors[selectedStory.priority]}>
                        {selectedStory.priority}
                      </Badge>
                    </div>
                    <div>
                      <Label>Statut</Label>
                      <Badge className={statusColors[selectedStory.status]}>
                        {selectedStory.status}
                      </Badge>
                    </div>
                    <div>
                      <Label>Story Points</Label>
                      <p>{selectedStory.storyPoints} points</p>
                    </div>
                    <div>
                      <Label>Valeur métier</Label>
                      <p>{selectedStory.businessValue}/10</p>
                    </div>
                  </div>

                  <div>
                    <Label>Critères d'acceptation</Label>
                    <ul className="list-disc list-inside space-y-1 text-sm mt-2">
                      {selectedStory.acceptanceCriteria.map((criteria, index) => (
                        <li key={index}>{criteria}</li>
                      ))}
                    </ul>
                  </div>

                  {selectedStory.tags.length > 0 && (
                    <div>
                      <Label>Tags</Label>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {selectedStory.tags.map(tag => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Story Dialog */}
        <AlertDialog open={!!deleteStoryId} onOpenChange={() => setDeleteStoryId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Supprimer la User Story</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir supprimer cette user story ? 
                Cette action est irréversible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (deleteStoryId) {
                    setUserStories(prev => prev.filter(s => s.id !== deleteStoryId));
                    setDeleteStoryId(null);
                    toast({
                      title: "User Story supprimée",
                      description: "La user story a été supprimée du backlog"
                    });
                  }
                }}
                className="bg-red-600 hover:bg-red-700"
              >
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </MainLayout>
  );
}
