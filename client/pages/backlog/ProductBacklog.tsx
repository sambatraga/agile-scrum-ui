import { useState, useCallback, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
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
  Settings,
  ChevronDown,
  ChevronUp,
  FolderOpen,
  Filter,
  X,
} from "lucide-react";

interface UserStory {
  id: string;
  projectId: string; // Relation avec le projet
  asA: string; // "En tant que [qui]"
  iWant: string; // "je veux [quoi]"
  soThat: string; // "pour [pourquoi]"
  acceptanceCriteria: string[];
  priority: "High" | "Medium" | "Low";
  priorityOrder: number; // Ordre numérique pour le tri
  storyPoints: 1 | 2 | 3 | 5 | 8 | 13 | 21;
  status: "Draft" | "Ready" | "In Progress" | "Done" | "Rejected";
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
  status: "Todo" | "In Progress" | "Done";
  assignee?: string;
  type: "Development" | "Testing" | "Design" | "Analysis" | "Documentation";
  priority: "High" | "Medium" | "Low";
  dependencies: string[];
  blocked?: boolean;
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: "planifie" | "en-cours" | "suspendu" | "termine" | "archive";
}

interface Sprint {
  id: string;
  projectId: string; // Relation avec le projet
  name: string;
  startDate: string;
  endDate: string;
  duration: number; // en semaines
  status: "Planning" | "Active" | "Completed";
  userStories: string[];
  tasks: Task[];
  capacity: number; // heures disponibles
  velocity: number; // story points complétés
  locked: boolean; // fig�� après démarrage
  goal?: string;
}

const fibonacciPoints = [1, 2, 3, 5, 8, 13, 21];

const priorityColors = {
  High: "bg-red-100 text-red-800",
  Medium: "bg-orange-100 text-orange-800",
  Low: "bg-blue-100 text-blue-800",
};

const statusColors = {
  Draft: "bg-gray-100 text-gray-800",
  Ready: "bg-blue-100 text-blue-800",
  "In Progress": "bg-yellow-100 text-yellow-800",
  Done: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Plateforme E-commerce",
    description: "Développement d'une plateforme de vente en ligne",
    status: "en-cours",
  },
  {
    id: "2",
    name: "Application Mobile Banking",
    description: "Application mobile sécurisée pour les services bancaires",
    status: "planifie",
  },
  {
    id: "3",
    name: "Système CRM",
    description: "Système de gestion de la relation client",
    status: "termine",
  },
];

const mockUserStories: UserStory[] = [
  {
    id: "1",
    projectId: "1", // Plateforme E-commerce
    asA: "utilisateur",
    iWant: "me connecter avec mon email et mot de passe",
    soThat: "accéder à mon compte sécurisé",
    acceptanceCriteria: [
      "L'utilisateur peut saisir son email et mot de passe",
      "Le système valide les informations d'identification",
      "L'utilisateur est redirigé vers le tableau de bord après connexion",
      "Un message d'erreur s'affiche en cas d'échec",
    ],
    priority: "High",
    priorityOrder: 1,
    storyPoints: 5,
    status: "Ready",
    businessValue: 9,
    tags: ["authentication", "security"],
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    order: 1,
  },
  {
    id: "2",
    projectId: "1", // Plateforme E-commerce
    asA: "utilisateur",
    iWant: "réinitialiser mon mot de passe",
    soThat: "récupérer l'accès à mon compte si je l'oublie",
    acceptanceCriteria: [
      "L'utilisateur peut demander une réinitialisation par email",
      "Un lien sécurisé est envoyé par email",
      "L'utilisateur peut définir un nouveau mot de passe",
      "Le lien expire après 24 heures",
    ],
    priority: "Medium",
    priorityOrder: 5,
    storyPoints: 8,
    status: "Draft",
    businessValue: 7,
    tags: ["authentication", "email"],
    createdAt: "2024-01-16",
    updatedAt: "2024-01-22",
    order: 2,
  },
  {
    id: "3",
    projectId: "1", // Plateforme E-commerce
    asA: "client",
    iWant: "ajouter des produits à mon panier",
    soThat: "préparer ma commande avant l'achat",
    acceptanceCriteria: [
      'Bouton "Ajouter au panier" visible sur chaque produit',
      "Quantité modifiable avant ajout",
      "Confirmation visuelle d'ajout au panier",
      "Compteur de produits mis à jour",
    ],
    priority: "High",
    priorityOrder: 2,
    storyPoints: 3,
    status: "In Progress",
    businessValue: 8,
    tags: ["ecommerce", "shopping"],
    createdAt: "2024-01-18",
    updatedAt: "2024-01-18",
    order: 3,
  },
  {
    id: "4",
    projectId: "1", // Plateforme E-commerce
    asA: "client",
    iWant: "finaliser ma commande avec paiement",
    soThat: "acheter les produits de mon panier",
    acceptanceCriteria: [
      "Formulaire d'adresse de livraison",
      "Sélection du mode de livraison",
      "Intégration de paiement sécurisé",
      "Confirmation de commande par email",
    ],
    priority: "High",
    priorityOrder: 3,
    storyPoints: 13,
    status: "Ready",
    businessValue: 10,
    tags: ["ecommerce", "payment"],
    createdAt: "2024-01-19",
    updatedAt: "2024-01-19",
    order: 4,
  },
  {
    id: "5",
    projectId: "2", // Application Mobile Banking
    asA: "utilisateur mobile",
    iWant: "me connecter avec mon empreinte digitale",
    soThat: "accéder rapidement et sécurisément à mon compte",
    acceptanceCriteria: [
      "Interface de connexion biométrique",
      "Fallback vers PIN en cas d'échec",
      "Stockage sécurisé des données biométriques",
      "Compatibilité iOS et Android",
    ],
    priority: "High",
    priorityOrder: 1,
    storyPoints: 8,
    status: "Ready",
    businessValue: 9,
    tags: ["mobile", "security", "biometric"],
    createdAt: "2024-01-20",
    updatedAt: "2024-01-20",
    order: 1,
  },
  {
    id: "6",
    projectId: "3", // Système CRM
    asA: "commercial",
    iWant: "voir la liste de mes prospects",
    soThat: "organiser mes actions de prospection",
    acceptanceCriteria: [
      "Liste filtrée des prospects assignés",
      "Statut de chaque prospect visible",
      "Actions rapides (appel, email, rendez-vous)",
      "Historique des interactions",
    ],
    priority: "High",
    priorityOrder: 1,
    storyPoints: 5,
    status: "Done",
    businessValue: 8,
    tags: ["crm", "sales", "prospect"],
    createdAt: "2024-01-10",
    updatedAt: "2024-01-25",
    order: 1,
  },
];

const mockSprints: Sprint[] = [
  {
    id: "1",
    projectId: "1", // Plateforme E-commerce
    name: "Sprint 1 - Authentification",
    startDate: "2024-01-15",
    endDate: "2024-01-29",
    duration: 2,
    status: "Completed",
    userStories: ["1"],
    tasks: [],
    capacity: 80,
    velocity: 5,
    locked: true,
  },
  {
    id: "2",
    projectId: "1", // Plateforme E-commerce
    name: "Sprint 2 - E-commerce Core",
    startDate: "2024-01-30",
    endDate: "2024-02-13",
    duration: 2,
    status: "Active",
    userStories: ["3"],
    tasks: [],
    capacity: 80,
    velocity: 0,
    locked: true,
  },
];

export default function ProductBacklog() {
  const [projects] = useState<Project[]>(mockProjects);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    mockProjects[0]?.id || "",
  );
  const [userStories, setUserStories] = useState<UserStory[]>(mockUserStories);
  const [sprints, setSprints] = useState<Sprint[]>(mockSprints);
  const [isCreateStoryOpen, setIsCreateStoryOpen] = useState(false);
  const [isCreateSprintOpen, setIsCreateSprintOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<UserStory | null>(null);
  const [deleteStoryId, setDeleteStoryId] = useState<string | null>(null);
  const [draggedStory, setDraggedStory] = useState<string | null>(null);

  // UX improvements
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedSprints, setExpandedSprints] = useState<Set<string>>(
    new Set(),
  );
  const [expandedCriteria, setExpandedCriteria] = useState<Set<string>>(
    new Set(),
  );

  const itemsPerPage = 6;

  const [storyForm, setStoryForm] = useState({
    asA: "",
    iWant: "",
    soThat: "",
    acceptanceCriteria: [""],
    priority: "Medium" as "High" | "Medium" | "Low",
    storyPoints: 3 as 1 | 2 | 3 | 5 | 8 | 13 | 21,
    businessValue: 5,
    tags: "",
  });
  const [sprintForm, setSprintForm] = useState({
    name: "",
    startDate: "",
    duration: 2,
    capacity: 80,
    selectedStories: [] as string[],
  });

  // Filtrer les user stories par projet sélectionné et tags
  const projectUserStories = userStories.filter((story) => {
    if (story.projectId !== selectedProjectId) return false;
    if (selectedTags.length === 0) return true;
    return selectedTags.some((tag) => story.tags.includes(tag));
  });

  // Tri des user stories par priorité puis par ordre
  const sortedStories = projectUserStories.sort((a, b) => {
    if (a.priorityOrder !== b.priorityOrder) {
      return a.priorityOrder - b.priorityOrder;
    }
    return a.order - b.order;
  });

  // Pagination
  const totalPages = Math.ceil(sortedStories.length / itemsPerPage);
  const paginatedStories = sortedStories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Get all available tags for filtering
  const availableTags = [
    ...new Set(projectUserStories.flatMap((story) => story.tags)),
  ].sort();

  // Calcul de la vélocité sur les 3 derniers sprints du projet sélectionné
  const calculateAverageVelocity = () => {
    const projectSprints = sprints.filter(
      (s) => s.projectId === selectedProjectId,
    );
    const completedSprints = projectSprints.filter(
      (s) => s.status === "Completed",
    );
    if (completedSprints.length === 0) return 0;

    const recentSprints = completedSprints.slice(-3);
    const totalVelocity = recentSprints.reduce(
      (sum, sprint) => sum + sprint.velocity,
      0,
    );
    return Math.round(totalVelocity / recentSprints.length);
  };

  const handleCreateStory = () => {
    if (!storyForm.asA || !storyForm.iWant || !storyForm.soThat) {
      toast({
        title: "Format requis",
        description: "Veuillez remplir tous les champs du format standard",
        variant: "destructive",
      });
      return;
    }

    if (!selectedProjectId) {
      toast({
        title: "Projet requis",
        description: "Veuillez sélectionner un projet",
        variant: "destructive",
      });
      return;
    }

    const newStory: UserStory = {
      id: Date.now().toString(),
      projectId: selectedProjectId,
      asA: storyForm.asA,
      iWant: storyForm.iWant,
      soThat: storyForm.soThat,
      acceptanceCriteria: storyForm.acceptanceCriteria.filter((c) => c.trim()),
      priority: storyForm.priority,
      priorityOrder:
        storyForm.priority === "High"
          ? 1
          : storyForm.priority === "Medium"
            ? 5
            : 8,
      storyPoints: storyForm.storyPoints,
      status: "Draft",
      businessValue: storyForm.businessValue,
      tags: storyForm.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      order: projectUserStories.length + 1,
    };

    setUserStories((prev) => [...prev, newStory]);
    setIsCreateStoryOpen(false);
    setStoryForm({
      asA: "",
      iWant: "",
      soThat: "",
      acceptanceCriteria: [""],
      priority: "Medium",
      storyPoints: 3,
      businessValue: 5,
      tags: "",
    });

    toast({
      title: "User Story créée",
      description: "La user story a été ajoutée au backlog",
    });
  };

  const handleCreateSprint = () => {
    if (
      !sprintForm.name ||
      !sprintForm.startDate ||
      sprintForm.selectedStories.length === 0
    ) {
      toast({
        title: "Informations manquantes",
        description:
          "Veuillez remplir tous les champs et sélectionner au moins une story",
        variant: "destructive",
      });
      return;
    }

    if (!selectedProjectId) {
      toast({
        title: "Projet requis",
        description: "Veuillez sélectionner un projet",
        variant: "destructive",
      });
      return;
    }

    const startDate = new Date(sprintForm.startDate);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + sprintForm.duration * 7);

    const newSprint: Sprint = {
      id: Date.now().toString(),
      projectId: selectedProjectId,
      name: sprintForm.name,
      startDate: sprintForm.startDate,
      endDate: endDate.toISOString().split("T")[0],
      duration: sprintForm.duration,
      status: "Planning",
      userStories: sprintForm.selectedStories,
      tasks: [],
      capacity: sprintForm.capacity,
      velocity: 0,
      locked: false,
    };

    setSprints((prev) => [...prev, newSprint]);

    // Mettre à jour le statut des stories sélectionnées
    setUserStories((prev) =>
      prev.map((story) =>
        sprintForm.selectedStories.includes(story.id)
          ? { ...story, status: "Ready" as const }
          : story,
      ),
    );

    setIsCreateSprintOpen(false);
    setSprintForm({
      name: "",
      startDate: "",
      duration: 2,
      capacity: 80,
      selectedStories: [],
    });

    toast({
      title: "Sprint créé",
      description: `${sprintForm.selectedStories.length} user stories assignées au sprint`,
    });
  };

  const changeStoryStatus = (
    storyId: string,
    newStatus: UserStory["status"],
  ) => {
    setUserStories((prev) =>
      prev.map((story) =>
        story.id === storyId
          ? {
              ...story,
              status: newStatus,
              updatedAt: new Date().toISOString().split("T")[0],
            }
          : story,
      ),
    );
  };

  const moveStory = useCallback(
    (storyId: string, direction: "up" | "down") => {
      const currentProjectStories = [...sortedStories];
      const storyIndex = currentProjectStories.findIndex(
        (s) => s.id === storyId,
      );

      if (storyIndex === -1) return;

      const newIndex = direction === "up" ? storyIndex - 1 : storyIndex + 1;
      if (newIndex < 0 || newIndex >= currentProjectStories.length) return;

      // Swap the stories in the array
      const [movedStory] = currentProjectStories.splice(storyIndex, 1);
      currentProjectStories.splice(newIndex, 0, movedStory);

      // Update the order property for all affected stories
      const updatedStories = currentProjectStories.map((story, index) => ({
        ...story,
        order: index + 1,
        updatedAt: new Date().toISOString().split("T")[0],
      }));

      // Update the global state
      setUserStories((prev) =>
        prev.map((story) => {
          const updatedStory = updatedStories.find((us) => us.id === story.id);
          return updatedStory || story;
        }),
      );

      toast({
        title: "Story réorganisée",
        description: `La story a été déplacée vers le ${direction === "up" ? "haut" : "bas"}`,
      });
    },
    [sortedStories],
  );

  const handleDragStart = (e: React.DragEvent, storyId: string) => {
    setDraggedStory(storyId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetStoryId: string) => {
    e.preventDefault();

    if (!draggedStory || draggedStory === targetStoryId) {
      setDraggedStory(null);
      return;
    }

    const currentProjectStories = [...sortedStories];
    const draggedIndex = currentProjectStories.findIndex(
      (s) => s.id === draggedStory,
    );
    const targetIndex = currentProjectStories.findIndex(
      (s) => s.id === targetStoryId,
    );

    if (draggedIndex === -1 || targetIndex === -1) {
      setDraggedStory(null);
      return;
    }

    // Move the dragged item to the target position
    const [draggedItem] = currentProjectStories.splice(draggedIndex, 1);
    currentProjectStories.splice(targetIndex, 0, draggedItem);

    // Recalculate orders for all project stories
    const updatedStories = currentProjectStories.map((story, index) => ({
      ...story,
      order: index + 1,
      updatedAt: new Date().toISOString().split("T")[0],
    }));

    // Update the global state
    setUserStories((prev) =>
      prev.map((story) => {
        const updatedStory = updatedStories.find((us) => us.id === story.id);
        return updatedStory || story;
      }),
    );

    setDraggedStory(null);

    toast({
      title: "Story réorganisée",
      description: "L'ordre des stories a été mis à jour par glisser-déposer",
    });
  };

  const formatUserStory = (story: UserStory) => {
    return `En tant que ${story.asA}, je veux ${story.iWant} pour ${story.soThat}`;
  };

  const toggleSprintExpansion = (sprintId: string) => {
    setExpandedSprints((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sprintId)) {
        newSet.delete(sprintId);
      } else {
        newSet.add(sprintId);
      }
      return newSet;
    });
  };

  const toggleCriteriaExpansion = (storyId: string) => {
    setExpandedCriteria((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(storyId)) {
        newSet.delete(storyId);
      } else {
        newSet.add(storyId);
      }
      return newSet;
    });
  };

  const toggleTagFilter = (tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
    setCurrentPage(1); // Reset to first page when filtering
  };

  const clearTagFilters = () => {
    setSelectedTags([]);
    setCurrentPage(1);
  };

  const UserStoryCard = ({
    story,
    showDragHandle = true,
  }: {
    story: UserStory;
    showDragHandle?: boolean;
  }) => (
    <Card
      className={`hover:shadow-md transition-shadow ${draggedStory === story.id ? "opacity-50" : ""}`}
      draggable={showDragHandle}
      onDragStart={(e) => showDragHandle && handleDragStart(e, story.id)}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, story.id)}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-2 flex-1">
            {showDragHandle && (
              <div className="flex flex-col gap-1 mt-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-gray-100"
                  onClick={() => moveStory(story.id, "up")}
                  title="Déplacer vers le haut"
                >
                  <ArrowUp className="h-3 w-3" />
                </Button>
                <GripVertical
                  className="h-4 w-4 text-muted-foreground cursor-move"
                  title="Glisser-déposer pour réorganiser"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-gray-100"
                  onClick={() => moveStory(story.id, "down")}
                  title="Déplacer vers le bas"
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
                {story.tags.map((tag) => (
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
              {story.status !== "Ready" && (
                <DropdownMenuItem
                  onClick={() => changeStoryStatus(story.id, "Ready")}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Marquer prêt
                </DropdownMenuItem>
              )}
              {story.status !== "In Progress" && (
                <DropdownMenuItem
                  onClick={() => changeStoryStatus(story.id, "In Progress")}
                >
                  <PlayCircle className="h-4 w-4 mr-2" />
                  En cours
                </DropdownMenuItem>
              )}
              {story.status !== "Done" && (
                <DropdownMenuItem
                  onClick={() => changeStoryStatus(story.id, "Done")}
                >
                  <Square className="h-4 w-4 mr-2" />
                  Terminé
                </DropdownMenuItem>
              )}
              {story.status !== "Rejected" && (
                <DropdownMenuItem
                  onClick={() => changeStoryStatus(story.id, "Rejected")}
                >
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
          <Badge className={statusColors[story.status]}>{story.status}</Badge>
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
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-xs font-medium justify-start"
              >
                <ChevronDown className="h-3 w-3 mr-1" />
                Critères d'acceptation ({story.acceptanceCriteria.length})
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <ul className="text-xs text-muted-foreground space-y-1 pl-2 border-l-2 border-blue-200">
                {story.acceptanceCriteria.map((criteria, index) => (
                  <li key={index} className="flex items-start gap-1">
                    <span className="text-blue-500">•</span>
                    <span>{criteria}</span>
                  </li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  );

  const SprintCard = ({ sprint }: { sprint: Sprint }) => {
    // Filter stories by selected tags
    const allSprintStories = userStories.filter((s) =>
      sprint.userStories.includes(s.id),
    );
    const sprintStories = allSprintStories.filter((story) => {
      if (selectedTags.length === 0) return true;
      return selectedTags.some((tag) => story.tags.includes(tag));
    });

    const totalPoints = sprintStories.reduce(
      (sum, story) => sum + story.storyPoints,
      0,
    );
    const completedPoints = sprintStories
      .filter((s) => s.status === "Done")
      .reduce((sum, story) => sum + story.storyPoints, 0);

    const isExpanded = expandedSprints.has(sprint.id);

    return (
      <Card className="mb-4">
        <CardHeader
          className="cursor-pointer"
          onClick={() => toggleSprintExpansion(sprint.id)}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronUp className="h-4 w-4" />
                )}
              </Button>
              <div>
                <CardTitle className="text-lg">{sprint.name}</CardTitle>
                <CardDescription>
                  {sprint.startDate} - {sprint.endDate} ({sprint.duration}{" "}
                  semaines)
                  {selectedTags.length > 0 && (
                    <span className="ml-2 text-blue-600">
                      • {sprintStories.length}/{allSprintStories.length} stories
                      (filtrées)
                    </span>
                  )}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant={sprint.status === "Active" ? "default" : "secondary"}
              >
                {sprint.status}
              </Badge>
              {sprint.locked && (
                <Badge variant="outline" className="text-orange-600">
                  Figé
                </Badge>
              )}
              {selectedTags.length > 0 && (
                <Badge variant="outline" className="text-blue-600">
                  Filtré
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{sprintStories.length}</p>
              <p className="text-sm text-muted-foreground">
                Stories{selectedTags.length > 0 ? " (filtrées)" : ""}
              </p>
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
              <p className="text-2xl font-bold">
                {completedPoints}/{totalPoints}
              </p>
              <p className="text-sm text-muted-foreground">Progression</p>
            </div>
          </div>

          {isExpanded && sprintStories.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">
                Stories assignées:
                {selectedTags.length > 0 && (
                  <span className="ml-2 text-sm font-normal text-blue-600">
                    (Filtrées par: {selectedTags.join(", ")})
                  </span>
                )}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {sprintStories.map((story) => (
                  <UserStoryCard
                    key={story.id}
                    story={story}
                    showDragHandle={false}
                  />
                ))}
              </div>
            </div>
          )}

          {isExpanded &&
            sprintStories.length === 0 &&
            selectedTags.length > 0 && (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground">
                  Aucune story ne correspond aux tags sélectionnés dans ce
                  sprint.
                </p>
              </div>
            )}
        </CardContent>
      </Card>
    );
  };

  const averageVelocity = calculateAverageVelocity();
  const readyStories = projectUserStories.filter((s) => s.status === "Ready");
  const projectSprints = sprints.filter(
    (s) => s.projectId === selectedProjectId,
  );
  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="space-y-4">
          {/* Project Selector - Prominent position */}
          <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg border">
            <FolderOpen className="h-5 w-5 text-blue-600" />
            <Label htmlFor="project-select" className="text-sm font-medium">
              Projet actuel:
            </Label>
            <Select
              value={selectedProjectId}
              onValueChange={setSelectedProjectId}
            >
              <SelectTrigger className="w-80">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    <div className="flex items-center gap-2">
                      <FolderOpen className="h-4 w-4" />
                      <span>{project.name}</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {project.status}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Product & Sprint Backlog</h1>
              <p className="text-muted-foreground">
                {selectedProject ? `${selectedProject.description} - ` : ""}
                Gestion des user stories format standard et planification des
                sprints
              </p>
            </div>
            <div className="flex gap-2">
              <Dialog
                open={isCreateStoryOpen}
                onOpenChange={setIsCreateStoryOpen}
              >
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
                      Format standard: "En tant que [qui], je veux [quoi] pour
                      [pourquoi]"
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
                          onChange={(e) =>
                            setStoryForm((prev) => ({
                              ...prev,
                              asA: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="i-want">Je veux... *</Label>
                        <Input
                          id="i-want"
                          placeholder="Ex: me connecter, consulter mes commandes..."
                          value={storyForm.iWant}
                          onChange={(e) =>
                            setStoryForm((prev) => ({
                              ...prev,
                              iWant: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="so-that">Pour... *</Label>
                        <Input
                          id="so-that"
                          placeholder="Ex: accéder à mon compte, suivre mes achats..."
                          value={storyForm.soThat}
                          onChange={(e) =>
                            setStoryForm((prev) => ({
                              ...prev,
                              soThat: e.target.value,
                            }))
                          }
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
                              const newCriteria = [
                                ...storyForm.acceptanceCriteria,
                              ];
                              newCriteria[index] = e.target.value;
                              setStoryForm((prev) => ({
                                ...prev,
                                acceptanceCriteria: newCriteria,
                              }));
                            }}
                          />
                          {index ===
                            storyForm.acceptanceCriteria.length - 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() =>
                                setStoryForm((prev) => ({
                                  ...prev,
                                  acceptanceCriteria: [
                                    ...prev.acceptanceCriteria,
                                    "",
                                  ],
                                }))
                              }
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
                          onValueChange={(value: "High" | "Medium" | "Low") =>
                            setStoryForm((prev) => ({
                              ...prev,
                              priority: value,
                            }))
                          }
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
                        <Label htmlFor="story-points">
                          Story Points (Fibonacci)
                        </Label>
                        <Select
                          value={storyForm.storyPoints.toString()}
                          onValueChange={(value) =>
                            setStoryForm((prev) => ({
                              ...prev,
                              storyPoints: parseInt(value) as any,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {fibonacciPoints.map((point) => (
                              <SelectItem key={point} value={point.toString()}>
                                {point} point{point > 1 ? "s" : ""}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="business-value">
                          Valeur métier (1-10)
                        </Label>
                        <Input
                          id="business-value"
                          type="number"
                          min="1"
                          max="10"
                          value={storyForm.businessValue}
                          onChange={(e) =>
                            setStoryForm((prev) => ({
                              ...prev,
                              businessValue: Math.max(
                                1,
                                Math.min(10, parseInt(e.target.value) || 5),
                              ),
                            }))
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tags">
                        Tags (séparés par des virgules)
                      </Label>
                      <Input
                        id="tags"
                        placeholder="Ex: authentication, security, ui..."
                        value={storyForm.tags}
                        onChange={(e) =>
                          setStoryForm((prev) => ({
                            ...prev,
                            tags: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setIsCreateStoryOpen(false)}
                      >
                        Annuler
                      </Button>
                      <Button onClick={handleCreateStory}>
                        Créer la User Story
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog
                open={isCreateSprintOpen}
                onOpenChange={setIsCreateSprintOpen}
              >
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
                      Durée: 1-4 semaines. Vélocité moyenne: {averageVelocity}{" "}
                      points
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
                          onChange={(e) =>
                            setSprintForm((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="start-date">Date de début *</Label>
                        <Input
                          id="start-date"
                          type="date"
                          value={sprintForm.startDate}
                          onChange={(e) =>
                            setSprintForm((prev) => ({
                              ...prev,
                              startDate: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="duration">Durée (semaines)</Label>
                        <Select
                          value={sprintForm.duration.toString()}
                          onValueChange={(value) =>
                            setSprintForm((prev) => ({
                              ...prev,
                              duration: parseInt(value),
                            }))
                          }
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
                          onChange={(e) =>
                            setSprintForm((prev) => ({
                              ...prev,
                              capacity: parseInt(e.target.value) || 80,
                            }))
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Sélectionner les User Stories</Label>
                      <div className="max-h-60 overflow-y-auto border rounded-lg p-2">
                        {readyStories.map((story) => (
                          <div
                            key={story.id}
                            className="flex items-center space-x-2 p-2 hover:bg-muted rounded"
                          >
                            <input
                              type="checkbox"
                              id={`story-${story.id}`}
                              checked={sprintForm.selectedStories.includes(
                                story.id,
                              )}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSprintForm((prev) => ({
                                    ...prev,
                                    selectedStories: [
                                      ...prev.selectedStories,
                                      story.id,
                                    ],
                                  }));
                                } else {
                                  setSprintForm((prev) => ({
                                    ...prev,
                                    selectedStories:
                                      prev.selectedStories.filter(
                                        (id) => id !== story.id,
                                      ),
                                  }));
                                }
                              }}
                              className="rounded"
                            />
                            <label
                              htmlFor={`story-${story.id}`}
                              className="flex-1 text-sm cursor-pointer"
                            >
                              <span className="font-medium">
                                {story.storyPoints} pts
                              </span>{" "}
                              - {formatUserStory(story)}
                            </label>
                          </div>
                        ))}
                        {readyStories.length === 0 && (
                          <p className="text-sm text-muted-foreground text-center py-4">
                            Aucune user story prête. Marquez des stories comme
                            "Ready" d'abord.
                          </p>
                        )}
                      </div>
                      {sprintForm.selectedStories.length > 0 && (
                        <p className="text-sm text-muted-foreground">
                          {sprintForm.selectedStories.length} stories
                          sélectionnées (
                          {readyStories
                            .filter((s) =>
                              sprintForm.selectedStories.includes(s.id),
                            )
                            .reduce((sum, s) => sum + s.storyPoints, 0)}{" "}
                          points total)
                        </p>
                      )}
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setIsCreateSprintOpen(false)}
                      >
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {projectUserStories.length}
                  </p>
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
                    {projectUserStories.reduce(
                      (sum, s) => sum + s.storyPoints,
                      0,
                    )}
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
                  <p className="text-2xl font-bold">{projectSprints.length}</p>
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

        {/* Tag Filtering */}
        {availableTags.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <CardTitle className="text-sm">Filtrer par tags</CardTitle>
                </div>
                {selectedTags.length > 0 && (
                  <Button variant="outline" size="sm" onClick={clearTagFilters}>
                    <X className="h-3 w-3 mr-1" />
                    Effacer ({selectedTags.length})
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleTagFilter(tag)}
                    className="h-7 text-xs"
                  >
                    {tag}
                    {selectedTags.includes(tag) && (
                      <X className="h-3 w-3 ml-1" />
                    )}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="product-backlog" className="space-y-4">
          <TabsList>
            <TabsTrigger value="product-backlog">Product Backlog</TabsTrigger>
            <TabsTrigger value="sprint-backlog">Sprint Backlog</TabsTrigger>
            <TabsTrigger value="velocity">Vélocité & Métriques</TabsTrigger>
          </TabsList>

          <TabsContent value="product-backlog">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  Product Backlog -{" "}
                  {selectedTags.length > 0
                    ? `Filtré par ${selectedTags.length} tag(s)`
                    : "Toutes les stories"}
                </h2>
                <div className="flex items-center gap-4">
                  <p className="text-sm text-muted-foreground">
                    {sortedStories.length} stories total
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Drag & drop ou flèches pour réorganiser
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {paginatedStories.map((story) => (
                    <UserStoryCard key={story.id} story={story} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (currentPage > 1)
                                setCurrentPage(currentPage - 1);
                            }}
                            className={
                              currentPage === 1
                                ? "pointer-events-none opacity-50"
                                : ""
                            }
                          />
                        </PaginationItem>

                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1,
                        ).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href="#"
                              isActive={currentPage === page}
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(page);
                              }}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (currentPage < totalPages)
                                setCurrentPage(currentPage + 1);
                            }}
                            className={
                              currentPage === totalPages
                                ? "pointer-events-none opacity-50"
                                : ""
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </div>

              {projectUserStories.length === 0 && (
                <Card className="p-12 text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {selectedTags.length > 0
                      ? "Aucune story pour les tags sélectionnés"
                      : "Aucune User Story"}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {selectedTags.length > 0
                      ? "Essayez de modifier vos filtres ou créez une nouvelle story."
                      : "Créez votre première user story au format standard."}
                  </p>
                  {selectedTags.length > 0 ? (
                    <Button variant="outline" onClick={clearTagFilters}>
                      <X className="h-4 w-4 mr-2" />
                      Effacer les filtres
                    </Button>
                  ) : (
                    <Button onClick={() => setIsCreateStoryOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Créer une User Story
                    </Button>
                  )}
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="sprint-backlog">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  Sprint Backlog -{" "}
                  {selectedTags.length > 0
                    ? `Filtré par ${selectedTags.length} tag(s)`
                    : "Tous les sprints"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Les sprints sont figés après démarrage
                </p>
              </div>

              {projectSprints.map((sprint) => {
                // Filter sprint stories by selected tags
                const filteredSprintStories = userStories.filter((s) => {
                  if (!sprint.userStories.includes(s.id)) return false;
                  if (selectedTags.length === 0) return true;
                  return selectedTags.some((tag) => s.tags.includes(tag));
                });

                // Only show sprint if it has stories matching the filter or no filter is applied
                if (
                  selectedTags.length > 0 &&
                  filteredSprintStories.length === 0
                ) {
                  return null;
                }

                return <SprintCard key={sprint.id} sprint={sprint} />;
              })}

              {projectSprints.length === 0 && (
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

              {selectedTags.length > 0 &&
                projectSprints.every((sprint) => {
                  const filteredSprintStories = userStories.filter((s) => {
                    if (!sprint.userStories.includes(s.id)) return false;
                    return selectedTags.some((tag) => s.tags.includes(tag));
                  });
                  return filteredSprintStories.length === 0;
                }) &&
                projectSprints.length > 0 && (
                  <Card className="p-12 text-center">
                    <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Aucun sprint avec les tags sélectionnés
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Aucun sprint ne contient de stories avec les tags
                      actuellement filtrés.
                    </p>
                    <Button variant="outline" onClick={clearTagFilters}>
                      <X className="h-4 w-4 mr-2" />
                      Effacer les filtres
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
                    {projectSprints
                      .filter((s) => s.status === "Completed")
                      .slice(-3)
                      .map((sprint) => (
                        <div
                          key={sprint.id}
                          className="flex justify-between items-center p-2 bg-muted rounded"
                        >
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
                      const count = projectUserStories.filter(
                        (s) => s.status === status,
                      ).length;
                      const percentage =
                        projectUserStories.length > 0
                          ? Math.round(
                              (count / projectUserStories.length) * 100,
                            )
                          : 0;
                      return (
                        <div
                          key={status}
                          className="flex justify-between items-center"
                        >
                          <div className="flex items-center gap-2">
                            <Badge className={color}>{status}</Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{count} stories</span>
                            <span className="text-sm text-muted-foreground">
                              ({percentage}%)
                            </span>
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
        <Dialog
          open={!!selectedStory}
          onOpenChange={() => setSelectedStory(null)}
        >
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
                      {selectedStory.acceptanceCriteria.map(
                        (criteria, index) => (
                          <li key={index}>{criteria}</li>
                        ),
                      )}
                    </ul>
                  </div>

                  {selectedStory.tags.length > 0 && (
                    <div>
                      <Label>Tags</Label>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {selectedStory.tags.map((tag) => (
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
        <AlertDialog
          open={!!deleteStoryId}
          onOpenChange={() => setDeleteStoryId(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Supprimer la User Story</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir supprimer cette user story ? Cette
                action est irréversible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (deleteStoryId) {
                    setUserStories((prev) =>
                      prev.filter((s) => s.id !== deleteStoryId),
                    );
                    setDeleteStoryId(null);
                    toast({
                      title: "User Story supprimée",
                      description: "La user story a été supprimée du backlog",
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
