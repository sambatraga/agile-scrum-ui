import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Flag,
  Target,
  Users,
  Star,
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  GitBranch
} from "lucide-react";

interface UserStory {
  id: string;
  title: string;
  description: string;
  acceptanceCriteria: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  storyPoints: number;
  status: 'backlog' | 'ready' | 'in-progress' | 'done';
  assignee?: {
    id: string;
    name: string;
    avatar: string;
  };
  epic?: string;
  tags: string[];
  businessValue: number;
  effort: number;
  createdAt: string;
  updatedAt: string;
}

interface Epic {
  id: string;
  title: string;
  description: string;
  color: string;
  progress: number;
  stories: string[];
}

const mockEpics: Epic[] = [
  {
    id: '1',
    title: 'Authentification Utilisateur',
    description: 'Système complet d\'authentification et gestion des comptes utilisateurs',
    color: 'bg-blue-500',
    progress: 75,
    stories: ['1', '2', '3']
  },
  {
    id: '2',
    title: 'Commerce Électronique',
    description: 'Fonctionnalités de vente en ligne avec panier et paiement',
    color: 'bg-green-500',
    progress: 45,
    stories: ['4', '5', '6', '7']
  },
  {
    id: '3',
    title: 'Analytics et Reporting',
    description: 'Tableaux de bord et analyses des performances',
    color: 'bg-purple-500',
    progress: 20,
    stories: ['8', '9']
  }
];

const mockUserStories: UserStory[] = [
  {
    id: '1',
    title: 'Connexion par email et mot de passe',
    description: 'En tant qu\'utilisateur, je veux me connecter avec mon email et mot de passe pour accéder à mon compte.',
    acceptanceCriteria: [
      'L\'utilisateur peut saisir son email et mot de passe',
      'Le système valide les informations d\'identification',
      'L\'utilisateur est redirigé vers le tableau de bord après connexion',
      'Un message d\'erreur s\'affiche en cas d\'échec'
    ],
    priority: 'high',
    storyPoints: 5,
    status: 'done',
    assignee: { id: '1', name: 'Sophie Chen', avatar: '' },
    epic: '1',
    tags: ['authentication', 'security'],
    businessValue: 8,
    effort: 5,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: '2',
    title: 'Réinitialisation de mot de passe',
    description: 'En tant qu\'utilisateur, je veux pouvoir réinitialiser mon mot de passe si je l\'oublie.',
    acceptanceCriteria: [
      'L\'utilisateur peut demander une réinitialisation par email',
      'Un lien sécurisé est envoyé par email',
      'L\'utilisateur peut définir un nouveau mot de passe',
      'Le lien expire après 24 heures'
    ],
    priority: 'medium',
    storyPoints: 8,
    status: 'in-progress',
    assignee: { id: '2', name: 'Jean Martin', avatar: '' },
    epic: '1',
    tags: ['authentication', 'email'],
    businessValue: 6,
    effort: 8,
    createdAt: '2024-01-16',
    updatedAt: '2024-01-22'
  },
  {
    id: '3',
    title: 'Authentification à deux facteurs',
    description: 'En tant qu\'utilisateur, je veux activer l\'authentification à deux facteurs pour sécuriser mon compte.',
    acceptanceCriteria: [
      'L\'utilisateur peut activer 2FA dans les paramètres',
      'Support des applications authenticator (Google, Authy)',
      'Codes de récupération générés et affichés',
      'Validation 2FA requise à chaque connexion'
    ],
    priority: 'medium',
    storyPoints: 13,
    status: 'ready',
    epic: '1',
    tags: ['security', '2fa'],
    businessValue: 7,
    effort: 13,
    createdAt: '2024-01-17',
    updatedAt: '2024-01-17'
  },
  {
    id: '4',
    title: 'Ajout de produits au panier',
    description: 'En tant que client, je veux ajouter des produits à mon panier pour préparer ma commande.',
    acceptanceCriteria: [
      'Bouton "Ajouter au panier" visible sur chaque produit',
      'Quantité modifiable avant ajout',
      'Confirmation visuelle d\'ajout au panier',
      'Compteur de produits mis à jour'
    ],
    priority: 'critical',
    storyPoints: 3,
    status: 'backlog',
    epic: '2',
    tags: ['ecommerce', 'shopping'],
    businessValue: 9,
    effort: 3,
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18'
  },
  {
    id: '5',
    title: 'Processus de commande',
    description: 'En tant que client, je veux finaliser ma commande avec les informations de livraison et paiement.',
    acceptanceCriteria: [
      'Formulaire d\'adresse de livraison',
      'Sélection du mode de livraison',
      'Intégration de paiement sécurisé',
      'Confirmation de commande par email'
    ],
    priority: 'critical',
    storyPoints: 21,
    status: 'backlog',
    epic: '2',
    tags: ['ecommerce', 'payment'],
    businessValue: 10,
    effort: 21,
    createdAt: '2024-01-19',
    updatedAt: '2024-01-19'
  }
];

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

const statusColors = {
  backlog: 'bg-gray-100 text-gray-800',
  ready: 'bg-blue-100 text-blue-800',
  'in-progress': 'bg-yellow-100 text-yellow-800',
  done: 'bg-green-100 text-green-800'
};

const statusLabels = {
  backlog: 'Backlog',
  ready: 'Prêt',
  'in-progress': 'En Cours',
  done: 'Terminé'
};

export default function ProductBacklog() {
  const [userStories, setUserStories] = useState<UserStory[]>(mockUserStories);
  const [epics, setEpics] = useState<Epic[]>(mockEpics);
  const [selectedEpic, setSelectedEpic] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [expandedEpics, setExpandedEpics] = useState<Set<string>>(new Set(['1', '2', '3']));

  const filteredStories = userStories.filter(story => {
    if (selectedEpic === 'all') return true;
    if (selectedEpic === 'no-epic') return !story.epic;
    return story.epic === selectedEpic;
  });

  const toggleEpic = (epicId: string) => {
    const newExpanded = new Set(expandedEpics);
    if (newExpanded.has(epicId)) {
      newExpanded.delete(epicId);
    } else {
      newExpanded.add(epicId);
    }
    setExpandedEpics(newExpanded);
  };

  const UserStoryCard = ({ story }: { story: UserStory }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-sm font-medium mb-1">{story.title}</CardTitle>
            <CardDescription className="text-xs line-clamp-2">
              {story.description}
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-1">
          {story.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs">
          <Badge className={priorityColors[story.priority]}>
            {priorityLabels[story.priority]}
          </Badge>
          <Badge className={statusColors[story.status]}>
            {statusLabels[story.status]}
          </Badge>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            <span>{story.storyPoints} pts</span>
          </div>
          <div className="flex items-center gap-1">
            <Target className="h-3 w-3" />
            <span>Valeur: {story.businessValue}/10</span>
          </div>
        </div>

        {story.assignee && (
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={story.assignee.avatar} />
              <AvatarFallback className="text-xs">
                {story.assignee.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">{story.assignee.name}</span>
          </div>
        )}

        <div className="flex gap-1 pt-2">
          <Button variant="outline" size="sm" className="flex-1 text-xs">
            <Edit className="h-3 w-3 mr-1" />
            Éditer
          </Button>
          <Button variant="outline" size="sm" className="flex-1 text-xs">
            <Eye className="h-3 w-3 mr-1" />
            Détails
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const EpicSection = ({ epic }: { epic: Epic }) => {
    const epicStories = userStories.filter(story => story.epic === epic.id);
    const isExpanded = expandedEpics.has(epic.id);

    return (
      <div className="space-y-3">
        <Card>
          <CardHeader
            className="cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => toggleEpic(epic.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                <div className={`w-3 h-3 rounded-full ${epic.color}`} />
                <div>
                  <CardTitle className="text-base">{epic.title}</CardTitle>
                  <CardDescription className="text-sm">{epic.description}</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{epicStories.length} stories</span>
                <span>{epic.progress}% terminé</span>
              </div>
            </div>
          </CardHeader>
        </Card>

        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ml-6">
            {epicStories.map(story => (
              <UserStoryCard key={story.id} story={story} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Product Backlog</h1>
          <p className="text-muted-foreground">
            Gérez vos epics, user stories et priorités
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Nouvel Epic
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Créer un nouvel Epic</DialogTitle>
                <DialogDescription>
                  Organisez vos user stories par thème fonctionnel
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="epic-title">Titre de l'Epic</Label>
                  <Input id="epic-title" placeholder="Ex: Authentification Utilisateur" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="epic-description">Description</Label>
                  <Textarea
                    id="epic-description"
                    placeholder="Décrivez l'objectif de cet epic..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Couleur</Label>
                  <div className="flex gap-2">
                    {['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-red-500'].map(color => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-full ${color} border-2 border-transparent hover:border-gray-300`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={() => setIsCreateDialogOpen(false)}>
                    Créer l'Epic
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle Story
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                <p className="text-2xl font-bold">
                  {userStories.filter(s => s.status === 'done').length}
                </p>
                <p className="text-sm text-muted-foreground">Terminées</p>
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
                  {userStories.reduce((acc, story) => acc + story.storyPoints, 0)}
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
                <GitBranch className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{epics.length}</p>
                <p className="text-sm text-muted-foreground">Epics</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedEpic} onValueChange={setSelectedEpic}>
        <TabsList>
          <TabsTrigger value="all">Toutes les Stories</TabsTrigger>
          {epics.map(epic => (
            <TabsTrigger key={epic.id} value={epic.id}>
              <div className={`w-2 h-2 rounded-full ${epic.color} mr-2`} />
              {epic.title}
            </TabsTrigger>
          ))}
          <TabsTrigger value="no-epic">Sans Epic</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-6">
            {epics.map(epic => (
              <EpicSection key={epic.id} epic={epic} />
            ))}

            {userStories.filter(s => !s.epic).length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-muted-foreground">Stories sans Epic</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {userStories.filter(s => !s.epic).map(story => (
                    <UserStoryCard key={story.id} story={story} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        {epics.map(epic => (
          <TabsContent key={epic.id} value={epic.id} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {userStories.filter(s => s.epic === epic.id).map(story => (
                <UserStoryCard key={story.id} story={story} />
              ))}
            </div>
          </TabsContent>
        ))}

        <TabsContent value="no-epic" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {userStories.filter(s => !s.epic).map(story => (
              <UserStoryCard key={story.id} story={story} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
