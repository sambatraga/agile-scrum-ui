import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import {
  Users,
  Plus,
  UserPlus,
  Calendar,
  Clock,
  Target,
  AlertCircle,
  CheckCircle,
  Star,
  Settings,
  Bell,
  Shield,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  UserCheck,
  UserX,
  Briefcase,
  Mail
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  skills: string[];
  availability: 'disponible' | 'occupe' | 'conges' | 'indisponible';
  projectAssignments: ProjectAssignment[];
  lastActive: string;
  joinDate: string;
}

interface ProjectAssignment {
  projectId: string;
  projectName: string;
  role: string;
  startDate: string;
  endDate?: string;
  workloadPercentage: number;
  permissions: string[];
}

interface Role {
  id: string;
  name: string;
  permissions: string[];
  color: string;
}

const predefinedRoles: Role[] = [
  {
    id: 'product-owner',
    name: 'Product Owner',
    permissions: ['view_backlog', 'edit_backlog', 'create_user_stories', 'prioritize_backlog', 'manage_releases'],
    color: 'bg-purple-100 text-purple-800'
  },
  {
    id: 'scrum-master',
    name: 'Scrum Master',
    permissions: ['manage_sprints', 'facilitate_ceremonies', 'remove_impediments', 'coach_team', 'track_metrics'],
    color: 'bg-blue-100 text-blue-800'
  },
  {
    id: 'developer',
    name: 'Développeur',
    permissions: ['view_tasks', 'edit_tasks', 'create_tasks', 'estimate_tasks', 'update_progress'],
    color: 'bg-green-100 text-green-800'
  },
  {
    id: 'designer',
    name: 'Designer UX/UI',
    permissions: ['view_tasks', 'edit_design_tasks', 'create_mockups', 'user_research', 'prototyping'],
    color: 'bg-pink-100 text-pink-800'
  },
  {
    id: 'qa-tester',
    name: 'QA Tester',
    permissions: ['view_tasks', 'create_test_cases', 'execute_tests', 'report_bugs', 'validate_features'],
    color: 'bg-orange-100 text-orange-800'
  },
  {
    id: 'stakeholder',
    name: 'Stakeholder',
    permissions: ['view_progress', 'view_reports', 'provide_feedback', 'approve_releases'],
    color: 'bg-gray-100 text-gray-800'
  }
];

const availabilityColors = {
  disponible: 'bg-green-100 text-green-800',
  occupe: 'bg-yellow-100 text-yellow-800',
  conges: 'bg-blue-100 text-blue-800',
  indisponible: 'bg-red-100 text-red-800'
};

const availabilityLabels = {
  disponible: 'Disponible',
  occupe: 'Occupé',
  conges: 'En Congés',
  indisponible: 'Indisponible'
};

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Marie Dubois',
    email: 'marie.dubois@gpas.com',
    avatar: 'MD',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    availability: 'disponible',
    projectAssignments: [
      {
        projectId: '1',
        projectName: 'Plateforme E-commerce',
        role: 'developer',
        startDate: '2024-01-15',
        workloadPercentage: 80,
        permissions: ['view_tasks', 'edit_tasks', 'create_tasks', 'estimate_tasks', 'update_progress']
      }
    ],
    lastActive: 'Il y a 5 min',
    joinDate: '2023-06-15'
  },
  {
    id: '2',
    name: 'Pierre Lambert',
    email: 'pierre.lambert@gpas.com',
    avatar: 'PL',
    skills: ['Product Management', 'SCRUM', 'Analytics', 'UX'],
    availability: 'occupe',
    projectAssignments: [
      {
        projectId: '1',
        projectName: 'Plateforme E-commerce',
        role: 'product-owner',
        startDate: '2024-01-10',
        workloadPercentage: 60,
        permissions: ['view_backlog', 'edit_backlog', 'create_user_stories', 'prioritize_backlog', 'manage_releases']
      },
      {
        projectId: '2',
        projectName: 'Application Mobile Banking',
        role: 'product-owner',
        startDate: '2024-02-15',
        workloadPercentage: 40,
        permissions: ['view_backlog', 'edit_backlog', 'create_user_stories', 'prioritize_backlog', 'manage_releases']
      }
    ],
    lastActive: 'Il y a 1h',
    joinDate: '2023-03-10'
  },
  {
    id: '3',
    name: 'Sophie Chen',
    email: 'sophie.chen@gpas.com',
    avatar: 'SC',
    skills: ['Figma', 'Adobe Creative', 'Prototyping', 'User Research'],
    availability: 'disponible',
    projectAssignments: [
      {
        projectId: '1',
        projectName: 'Plateforme E-commerce',
        role: 'designer',
        startDate: '2024-01-20',
        workloadPercentage: 70,
        permissions: ['view_tasks', 'edit_design_tasks', 'create_mockups', 'user_research', 'prototyping']
      }
    ],
    lastActive: 'Il y a 15 min',
    joinDate: '2023-08-20'
  },
  {
    id: '4',
    name: 'Jean Martin',
    email: 'jean.martin@gpas.com',
    avatar: 'JM',
    skills: ['SCRUM', 'Agile Coaching', 'Facilitation', 'Metrics'],
    availability: 'disponible',
    projectAssignments: [
      {
        projectId: '1',
        projectName: 'Plateforme E-commerce',
        role: 'scrum-master',
        startDate: '2024-01-10',
        workloadPercentage: 50,
        permissions: ['manage_sprints', 'facilitate_ceremonies', 'remove_impediments', 'coach_team', 'track_metrics']
      }
    ],
    lastActive: 'Il y a 30 min',
    joinDate: '2023-05-01'
  },
  {
    id: '5',
    name: 'Thomas Blanc',
    email: 'thomas.blanc@gpas.com',
    avatar: 'TB',
    skills: ['Test Automation', 'Cypress', 'Jest', 'Manual Testing'],
    availability: 'conges',
    projectAssignments: [],
    lastActive: 'Il y a 3 jours',
    joinDate: '2023-09-10'
  },
  {
    id: '6',
    name: 'Emma Wilson',
    email: 'emma.wilson@gpas.com',
    avatar: 'EW',
    skills: ['React Native', 'Flutter', 'iOS', 'Android'],
    availability: 'disponible',
    projectAssignments: [
      {
        projectId: '2',
        projectName: 'Application Mobile Banking',
        role: 'developer',
        startDate: '2024-02-20',
        workloadPercentage: 90,
        permissions: ['view_tasks', 'edit_tasks', 'create_tasks', 'estimate_tasks', 'update_progress']
      }
    ],
    lastActive: 'Il y a 2h',
    joinDate: '2023-11-15'
  }
];

const mockProjects = [
  { id: '1', name: 'Plateforme E-commerce' },
  { id: '2', name: 'Application Mobile Banking' },
  { id: '3', name: 'Système CRM' },
  { id: '4', name: 'Site Web Vitrine' }
];

export default function TeamManagement() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [removeAssignmentId, setRemoveAssignmentId] = useState<string | null>(null);
  const [assignmentForm, setAssignmentForm] = useState({
    memberId: '',
    projectId: '',
    role: '',
    startDate: '',
    endDate: '',
    workloadPercentage: 50
  });

  const calculateTotalWorkload = (memberId: string) => {
    const member = teamMembers.find(m => m.id === memberId);
    if (!member) return 0;
    return member.projectAssignments.reduce((total, assignment) => total + assignment.workloadPercentage, 0);
  };

  const canAssignToProject = (memberId: string) => {
    const member = teamMembers.find(m => m.id === memberId);
    if (!member) return false;
    
    // Maximum 5 projects per user
    if (member.projectAssignments.length >= 5) return false;
    
    // Check if total workload would exceed 100%
    const currentWorkload = calculateTotalWorkload(memberId);
    return currentWorkload + assignmentForm.workloadPercentage <= 100;
  };

  const handleAssignMember = () => {
    if (!assignmentForm.memberId || !assignmentForm.projectId || !assignmentForm.role || !assignmentForm.startDate) {
      toast({
        title: "Erreur",
        description: "Tous les champs obligatoires doivent être remplis",
        variant: "destructive"
      });
      return;
    }

    if (!canAssignToProject(assignmentForm.memberId)) {
      toast({
        title: "Assignation impossible",
        description: "L'utilisateur a atteint la limite de 5 projets ou la charge de travail dépasserait 100%",
        variant: "destructive"
      });
      return;
    }

    const selectedRole = predefinedRoles.find(r => r.id === assignmentForm.role);
    const selectedProject = mockProjects.find(p => p.id === assignmentForm.projectId);
    
    if (!selectedRole || !selectedProject) return;

    const newAssignment: ProjectAssignment = {
      projectId: assignmentForm.projectId,
      projectName: selectedProject.name,
      role: assignmentForm.role,
      startDate: assignmentForm.startDate,
      endDate: assignmentForm.endDate || undefined,
      workloadPercentage: assignmentForm.workloadPercentage,
      permissions: selectedRole.permissions
    };

    setTeamMembers(prev => prev.map(member => 
      member.id === assignmentForm.memberId
        ? { ...member, projectAssignments: [...member.projectAssignments, newAssignment] }
        : member
    ));

    // Notification automatique
    const memberName = teamMembers.find(m => m.id === assignmentForm.memberId)?.name;
    toast({
      title: "Assignation réussie",
      description: `${memberName} a été assigné(e) au projet ${selectedProject.name}. Une notification a été envoyée.`
    });

    setIsAssignDialogOpen(false);
    setAssignmentForm({
      memberId: '', projectId: '', role: '', startDate: '', endDate: '', workloadPercentage: 50
    });
  };

  const handleRemoveAssignment = () => {
    if (!removeAssignmentId || !selectedMember) return;

    const [memberId, projectId] = removeAssignmentId.split('-');
    
    setTeamMembers(prev => prev.map(member => 
      member.id === memberId
        ? { 
            ...member, 
            projectAssignments: member.projectAssignments.filter(a => a.projectId !== projectId)
          }
        : member
    ));

    toast({
      title: "Assignation supprimée",
      description: "Le membre a été retiré du projet. Une notification a été envoyée."
    });

    setRemoveAssignmentId(null);
    setSelectedMember(null);
  };

  const TeamMemberCard = ({ member }: { member: TeamMember }) => {
    const totalWorkload = calculateTotalWorkload(member.id);
    const canAddProject = member.projectAssignments.length < 5 && totalWorkload < 100;

    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="text-sm font-medium">
                  {member.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.email}</p>
                <Badge className={availabilityColors[member.availability]} variant="secondary">
                  {availabilityLabels[member.availability]}
                </Badge>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSelectedMember(member)}>
                  <Eye className="h-4 w-4 mr-2" />
                  Voir détails
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Mail className="h-4 w-4 mr-2" />
                  Contacter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Charge de travail</span>
              <span>{totalWorkload}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${totalWorkload > 80 ? 'bg-red-500' : totalWorkload > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                style={{ width: `${Math.min(totalWorkload, 100)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Projets assignés</span>
              <Badge variant="outline">{member.projectAssignments.length}/5</Badge>
            </div>
            {member.projectAssignments.length > 0 ? (
              <div className="space-y-2">
                {member.projectAssignments.map((assignment) => {
                  const role = predefinedRoles.find(r => r.id === assignment.role);
                  return (
                    <div key={`${assignment.projectId}-${assignment.role}`} className="flex justify-between items-center p-2 bg-muted rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{assignment.projectName}</p>
                        <div className="flex items-center gap-2">
                          {role && (
                            <Badge className={role.color} variant="secondary">
                              {role.name}
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {assignment.workloadPercentage}%
                          </span>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setSelectedMember(member);
                          setRemoveAssignmentId(`${member.id}-${assignment.projectId}`);
                        }}
                      >
                        <UserX className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-2">
                Aucun projet assigné
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-1">
            {member.skills.slice(0, 3).map(skill => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
            {member.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{member.skills.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              disabled={!canAddProject || member.availability === 'conges'}
              onClick={() => {
                setAssignmentForm(prev => ({ ...prev, memberId: member.id }));
                setIsAssignDialogOpen(true);
              }}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Assigner
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Planning
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const availableMembers = teamMembers.filter(m => m.availability === 'disponible');
  const busyMembers = teamMembers.filter(m => m.availability === 'occupe');
  const unavailableMembers = teamMembers.filter(m => ['conges', 'indisponible'].includes(m.availability));

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Gestion d'Équipe</h1>
            <p className="text-muted-foreground">
              Assignation des membres, rôles et gestion des disponibilités
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Assigner à un Projet
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Assigner un membre à un projet</DialogTitle>
                  <DialogDescription>
                    Maximum 5 projets par utilisateur. La charge totale ne peut dépasser 100%.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="member">Membre d'équipe *</Label>
                    <Select 
                      value={assignmentForm.memberId}
                      onValueChange={(value) => setAssignmentForm(prev => ({ ...prev, memberId: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un membre" />
                      </SelectTrigger>
                      <SelectContent>
                        {teamMembers
                          .filter(m => m.availability !== 'conges')
                          .map(member => {
                            const workload = calculateTotalWorkload(member.id);
                            const projectCount = member.projectAssignments.length;
                            return (
                              <SelectItem 
                                key={member.id} 
                                value={member.id}
                                disabled={projectCount >= 5 || workload >= 100}
                              >
                                {member.name} ({workload}% - {projectCount}/5 projets)
                              </SelectItem>
                            );
                          })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project">Projet *</Label>
                    <Select 
                      value={assignmentForm.projectId}
                      onValueChange={(value) => setAssignmentForm(prev => ({ ...prev, projectId: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un projet" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockProjects.map(project => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Rôle *</Label>
                    <Select 
                      value={assignmentForm.role}
                      onValueChange={(value) => setAssignmentForm(prev => ({ ...prev, role: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un rôle" />
                      </SelectTrigger>
                      <SelectContent>
                        {predefinedRoles.map(role => (
                          <SelectItem key={role.id} value={role.id}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-date">Date de début *</Label>
                      <Input 
                        id="start-date" 
                        type="date"
                        value={assignmentForm.startDate}
                        onChange={(e) => setAssignmentForm(prev => ({ ...prev, startDate: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-date">Date de fin</Label>
                      <Input 
                        id="end-date" 
                        type="date"
                        value={assignmentForm.endDate}
                        onChange={(e) => setAssignmentForm(prev => ({ ...prev, endDate: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="workload">Charge de travail (%)</Label>
                    <Input 
                      id="workload" 
                      type="number" 
                      min="10" 
                      max="100" 
                      step="10"
                      value={assignmentForm.workloadPercentage}
                      onChange={(e) => setAssignmentForm(prev => ({ ...prev, workloadPercentage: parseInt(e.target.value) || 50 }))}
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
                      Annuler
                    </Button>
                    <Button onClick={handleAssignMember}>
                      Assigner et Notifier
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{teamMembers.length}</p>
                  <p className="text-sm text-muted-foreground">Membres Total</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <UserCheck className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{availableMembers.length}</p>
                  <p className="text-sm text-muted-foreground">Disponibles</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{busyMembers.length}</p>
                  <p className="text-sm text-muted-foreground">Occupés</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Briefcase className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {teamMembers.reduce((total, member) => total + member.projectAssignments.length, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Assignations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Tous ({teamMembers.length})</TabsTrigger>
            <TabsTrigger value="available">Disponibles ({availableMembers.length})</TabsTrigger>
            <TabsTrigger value="busy">Occupés ({busyMembers.length})</TabsTrigger>
            <TabsTrigger value="unavailable">Indisponibles ({unavailableMembers.length})</TabsTrigger>
            <TabsTrigger value="roles">Rôles & Permissions</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="available">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {availableMembers.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="busy">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {busyMembers.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="unavailable">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {unavailableMembers.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="roles">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {predefinedRoles.map((role) => (
                <Card key={role.id}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-lg">
                        <Shield className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{role.name}</CardTitle>
                        <Badge className={role.color} variant="secondary">
                          {role.permissions.length} permissions
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Permissions :</h4>
                      <div className="grid grid-cols-1 gap-1">
                        {role.permissions.map(permission => (
                          <div key={permission} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span className="capitalize">
                              {permission.replace(/_/g, ' ')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Remove Assignment Dialog */}
        <AlertDialog open={!!removeAssignmentId} onOpenChange={() => setRemoveAssignmentId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Retirer l'assignation</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir retirer ce membre du projet ? 
                Une notification sera automatiquement envoyée.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={handleRemoveAssignment}>
                Retirer et Notifier
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </MainLayout>
  );
}
