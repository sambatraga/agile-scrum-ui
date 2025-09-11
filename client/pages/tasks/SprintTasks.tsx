import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
import {
  Plus,
  Timer,
  User,
  ChevronRight,
  ChevronLeft,
  PlayCircle,
  Pause,
  ListChecks,
} from "lucide-react";

interface UserStory {
  id: string;
  projectId: string;
  asA: string;
  iWant: string;
  soThat: string;
  acceptanceCriteria: string[];
  priority: "High" | "Medium" | "Low";
  priorityOrder: number;
  storyPoints: 1 | 2 | 3 | 5 | 8 | 13 | 21;
  status: "Draft" | "Ready" | "In Progress" | "Done" | "Rejected";
  businessValue: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  order: number;
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

interface Sprint {
  id: string;
  projectId: string;
  name: string;
  startDate: string;
  endDate: string;
  duration: number;
  status: "Planning" | "Active" | "Completed";
  userStories: string[];
  tasks: Task[];
  capacity: number;
  velocity: number;
  locked: boolean;
  goal?: string;
}

interface WorkLogEntry {
  id: string;
  taskId: string;
  user: string;
  hours: number;
  note?: string;
  date: string;
}

const TEAM = ["Alice", "Bob", "Charlie", "Diana", "Eve"];

const priorityColors = {
  High: "bg-red-100 text-red-800",
  Medium: "bg-orange-100 text-orange-800",
  Low: "bg-blue-100 text-blue-800",
};

export default function SprintTasks() {
  const { sprintId } = useParams<{ sprintId: string }>();
  const navigate = useNavigate();

  const [userStories, setUserStories] = useState<UserStory[]>([]);
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [workLogs, setWorkLogs] = useState<WorkLogEntry[]>(() => {
    try {
      const raw = localStorage.getItem("tasks_worklogs");
      return raw ? (JSON.parse(raw) as WorkLogEntry[]) : [];
    } catch {
      return [];
    }
  });
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [logTaskId, setLogTaskId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const us = localStorage.getItem("backlog_userStories");
      const sp = localStorage.getItem("backlog_sprints");
      setUserStories(us ? JSON.parse(us) : []);
      setSprints(sp ? JSON.parse(sp) : []);
    } catch {
      setUserStories([]);
      setSprints([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("backlog_sprints", JSON.stringify(sprints));
    } catch {}
  }, [sprints]);

  useEffect(() => {
    try {
      localStorage.setItem("tasks_worklogs", JSON.stringify(workLogs));
    } catch {}
  }, [workLogs]);

  const sprint = useMemo(
    () => sprints.find((s) => s.id === sprintId) || null,
    [sprints, sprintId],
  );

  // Seed demo data (tasks and work logs) if empty to showcase UI
  useEffect(() => {
    if (!sprint) return;
    let updated = false;
    if (!sprint.tasks || sprint.tasks.length === 0) {
      const storyForTasks = sprint.userStories[0] || null;
      const chooseStory = storyForTasks || userStories[0]?.id || "";
      const chosenStory =
        userStories.find((s) => s.id === chooseStory) || userStories[0];
      const basePriority = chosenStory?.priority || "Medium";
      const seed: Task[] = [
        {
          id: `seed-${sprint.id}-1`,
          userStoryId: chooseStory,
          title: "Dev task 1",
          description: "Implement login form",
          estimatedHours: 3,
          actualHours: 1,
          status: "Todo",
          assignee: "Alice",
          type: "Development",
          priority: basePriority,
          dependencies: [],
        },
        {
          id: `seed-${sprint.id}-2`,
          userStoryId: chooseStory,
          title: "Test task",
          description: "Write tests",
          estimatedHours: 2,
          actualHours: 0,
          status: "In Progress",
          assignee: "Bob",
          type: "Testing",
          priority: basePriority,
          dependencies: ["seed-" + sprint.id + "-1"],
        },
        {
          id: `seed-${sprint.id}-3`,
          userStoryId: chooseStory,
          title: "Design task",
          description: "Refine UI",
          estimatedHours: 3,
          actualHours: 1,
          status: "In Progress",
          assignee: "Charlie",
          type: "Design",
          priority: basePriority,
          dependencies: [],
        },
        {
          id: `seed-${sprint.id}-4`,
          userStoryId: chooseStory,
          title: "Analysis task",
          description: "API analysis",
          estimatedHours: 3,
          actualHours: 1,
          status: "Testing",
          assignee: "Eve",
          type: "Analysis",
          priority: basePriority,
          dependencies: [],
        },
        {
          id: `seed-${sprint.id}-5`,
          userStoryId: chooseStory,
          title: "Doc task",
          description: "Write docs",
          estimatedHours: 2,
          actualHours: 2,
          status: "Done",
          assignee: undefined,
          type: "Documentation",
          priority: basePriority,
          dependencies: [],
        },
      ];
      const next = sprints.map((sp) =>
        sp.id === sprint.id ? { ...sp, tasks: seed } : sp,
      );
      setSprints(next);
      updated = true;
    }
    if (workLogs.length === 0) {
      const wl = [
        {
          id: `wl-${sprint.id}-1`,
          taskId: `seed-${sprint.id}-1`,
          user: "Eve",
          hours: 1,
          note: "Dev task 1",
          date: new Date().toISOString().split("T")[0],
        },
        {
          id: `wl-${sprint.id}-2`,
          taskId: `seed-${sprint.id}-2`,
          user: "Bob",
          hours: 3,
          note: "Test task",
          date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
        },
        {
          id: `wl-${sprint.id}-3`,
          taskId: `seed-${sprint.id}-3`,
          user: "Charlie",
          hours: 1,
          note: "Analysis task",
          date: new Date(Date.now() - 2 * 86400000).toISOString().split("T")[0],
        },
        {
          id: `wl-${sprint.id}-4`,
          taskId: `seed-${sprint.id}-5`,
          user: "Eve",
          hours: 2,
          note: "Doc task",
          date: new Date(Date.now() - 3 * 86400000).toISOString().split("T")[0],
        },
      ];
      setWorkLogs(wl);
      updated = true;
    }
    if (updated) {
      toast({
        title: "Données démo",
        description:
          "Données statiques chargées pour les graphiques et tableaux",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sprintId, sprint?.id]);
  const sprintStories = useMemo(() => {
    if (!sprint) return [];
    return userStories.filter((s) => sprint.userStories.includes(s.id));
  }, [sprint, userStories]);

  useEffect(() => {
    if (sprintStories.length > 0 && !selectedStoryId) {
      setSelectedStoryId(sprintStories[0].id);
    }
  }, [sprintStories, selectedStoryId]);

  const selectedStory =
    sprintStories.find((s) => s.id === selectedStoryId) || null;

  // Intelligent assignment suggestion based on current load
  const recommendAssignee = () => {
    if (!sprint) return TEAM[0];
    const load = new Map<string, number>();
    TEAM.forEach((m) => load.set(m, 0));
    sprint.tasks.forEach((t) => {
      if (t.assignee)
        load.set(
          t.assignee,
          (load.get(t.assignee) || 0) + (t.estimatedHours || 0),
        );
    });
    const sorted = Array.from(load.entries()).sort((a, b) => a[1] - b[1]);
    return sorted[0]?.[0] || TEAM[0];
  };

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "Development" as Task["type"],
    estimatedHours: 1,
    assignee: "",
  });
  const [selectedDeps, setSelectedDeps] = useState<string[]>([]);
  const [logForm, setLogForm] = useState({ hours: 1, note: "" });

  useEffect(() => {
    setForm((f) => ({ ...f, assignee: recommendAssignee() }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sprintId, sprints.length]);

  const createTasks = () => {
    if (!sprint || !selectedStory) return;
    if (!form.title.trim()) {
      toast({
        title: "Titre requis",
        description: "La tâche doit avoir un titre",
        variant: "destructive",
      });
      return;
    }
    if (form.estimatedHours <= 0) {
      toast({
        title: "Estimation invalide",
        description: "Doit être > 0",
        variant: "destructive",
      });
      return;
    }

    const tasksToCreate: Task[] = [];
    const total = form.estimatedHours;
    const parts = Math.ceil(total / 8);
    const perPart = Math.min(8, total);

    for (let i = 0; i < parts; i++) {
      const hours = i === parts - 1 ? total - 8 * (parts - 1) : perPart;
      const newTask: Task = {
        id: `${Date.now()}-${i}`,
        userStoryId: selectedStory.id,
        title: parts > 1 ? `${form.title} (Part ${i + 1})` : form.title,
        description: form.description,
        estimatedHours: hours,
        actualHours: 0,
        status: "Todo",
        assignee: form.assignee || recommendAssignee(),
        type: form.type,
        priority: selectedStory.priority,
        dependencies: [...selectedDeps],
      };

      // Automatic dependencies: testing depends on development tasks of the same story
      if (newTask.type === "Testing") {
        const devTasks = (sprint.tasks || []).filter(
          (t) => t.userStoryId === selectedStory.id && t.type === "Development",
        );
        newTask.dependencies = devTasks.map((t) => t.id);
      }

      tasksToCreate.push(newTask);
    }

    const updated = sprints.map((sp) =>
      sp.id === sprint.id
        ? { ...sp, tasks: [...(sp.tasks || []), ...tasksToCreate] }
        : sp,
    );
    setSprints(updated);
    setIsCreateOpen(false);

    if (parts > 1) {
      toast({
        title: "Tâches créées (décomposition)",
        description: `${parts} sous-tâches de ≤ 8h`,
      });
    } else {
      toast({
        title: "Tâche créée",
        description: `${form.title} (${form.estimatedHours}h)`,
      });
    }

    setForm({
      title: "",
      description: "",
      type: "Development",
      estimatedHours: 1,
      assignee: recommendAssignee(),
    });
    setSelectedDeps([]);
  };

  const logTime = (taskId: string, hours: number, note?: string) => {
    if (!sprint) return;
    const updated = sprints.map((sp) => {
      if (sp.id !== sprint.id) return sp;
      const nextTasks = sp.tasks.map((t) =>
        t.id === taskId
          ? { ...t, actualHours: (t.actualHours || 0) + hours }
          : t,
      );
      return { ...sp, tasks: nextTasks };
    });
    setSprints(updated);
    const entry: WorkLogEntry = {
      id: `${Date.now()}`,
      taskId,
      user: form.assignee || TEAM[0],
      hours,
      note,
      date: new Date().toISOString().split("T")[0],
    };
    setWorkLogs((prev) => [entry, ...prev]);
  };

  const formatUserStory = (story: UserStory) =>
    `que ${story.asA}, je veux ${story.iWant}`;

  if (!sprint) {
    return (
      <MainLayout>
        <div className="p-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                Sprint introuvable. Retour au backlog.
              </p>
              <Button className="mt-3" onClick={() => navigate("/backlog")}>
                Retour
              </Button>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  const capacityUsed = sprint.tasks.reduce(
    (sum, t) => sum + t.estimatedHours,
    0,
  );
  const capacityProgress = Math.min(
    100,
    Math.round((capacityUsed / sprint.capacity) * 100),
  );

  // top KPIs
  const totalStoryPoints = sprintStories.reduce(
    (sum, s) => sum + s.storyPoints,
    0,
  );
  const totalLogged = sprint.tasks.reduce(
    (sum, t) => sum + (t.actualHours || 0),
    0,
  );

  // static chart data to demo
  const dailyHours = [
    { day: "Mon", Estimated: 2, Logged: 1 },
    { day: "Tue", Estimated: 6, Logged: 4 },
    { day: "Wed", Estimated: 8, Logged: 7 },
    { day: "Thu", Estimated: 5, Logged: 3 },
    { day: "Fri", Estimated: 4, Logged: 2 },
  ];

  const storyProgress = (storyId: string) => {
    const tasks = sprint.tasks.filter((t) => t.userStoryId === storyId);
    const done = tasks.filter((t) => t.status === "Done").length;
    return { done, total: tasks.length };
  };

  return (
    <MainLayout>
      <div className="space-y-6 p-0 md:p-4">
        <div className="flex items-center justify-between px-4">
          <div>
            <h1 className="text-2xl font-bold">Sprint Backlog & Tâches</h1>
            <p className="text-muted-foreground">
              {sprint.name} — {sprint.startDate} → {sprint.endDate}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate("/backlog")}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            <Button onClick={() => navigate("/sprints/execution")}>
              <PlayCircle className="h-4 w-4 mr-2" />
              Démarrer le sprint
            </Button>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
          <Card>
            <CardHeader>
              <CardTitle>80 h capacité</CardTitle>
              <CardDescription>Charge planifiée</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={capacityProgress} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{totalStoryPoints} story points</CardTitle>
              <CardDescription>Vélocité prévue</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={Math.min(100, (totalStoryPoints / 40) * 100)} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{totalLogged} h</CardTitle>
              <CardDescription>
                / {sprint.capacity} h / {sprint.capacity - totalLogged}{" "}
                restantes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress
                value={Math.min(100, (totalLogged / sprint.capacity) * 100)}
              />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-4">
          {/* Left: sprint stories */}
          <div className="lg:col-span-3 space-y-3">
            <Card>
              <CardHeader>
                <CardTitle>Stories du sprint</CardTitle>
                <CardDescription>
                  {sprintStories.length} stories
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {sprintStories.map((story) => {
                  const sp = storyProgress(story.id);
                  return (
                    <div
                      key={story.id}
                      className={`p-3 rounded border ${selectedStoryId === story.id ? "bg-muted" : "bg-background"}`}
                    >
                      <div className="flex justify-between items-start">
                        <button
                          className="text-left"
                          onClick={() => setSelectedStoryId(story.id)}
                        >
                          <div className="font-medium">
                            {story.storyPoints} SP · {formatUserStory(story)}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] ${priorityColors[story.priority]}`}
                            >
                              {story.priority}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Valeur {story.businessValue}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {sp.done}/{sp.total} tâches
                          </div>
                        </button>
                        <Dialog
                          open={isCreateOpen && selectedStoryId === story.id}
                          onOpenChange={(o) => {
                            setIsCreateOpen(o);
                            if (!o) {
                              setForm((f) => ({
                                ...f,
                                title: "",
                                description: "",
                                estimatedHours: 1,
                                type: "Development",
                              }));
                              setSelectedDeps([]);
                            }
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button size="sm">
                              <Plus className="h-4 w-4 mr-1" /> Ajouter tâche
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Nouvelle tâche</DialogTitle>
                              <DialogDescription>
                                Types: Development, Testing, Design, Analysis,
                                Documentation. Estimation ≤ 8h sinon
                                décomposition automatique.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Titre</Label>
                                  <Input
                                    value={form.title}
                                    onChange={(e) =>
                                      setForm({
                                        ...form,
                                        title: e.target.value,
                                      })
                                    }
                                    placeholder="Nom de la tâche"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Type</Label>
                                  <Select
                                    value={form.type}
                                    onValueChange={(v) =>
                                      setForm({
                                        ...form,
                                        type: v as Task["type"],
                                      })
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Development">
                                        Development
                                      </SelectItem>
                                      <SelectItem value="Testing">
                                        Testing
                                      </SelectItem>
                                      <SelectItem value="Design">
                                        Design
                                      </SelectItem>
                                      <SelectItem value="Analysis">
                                        Analysis
                                      </SelectItem>
                                      <SelectItem value="Documentation">
                                        Documentation
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                  value={form.description}
                                  onChange={(e) =>
                                    setForm({
                                      ...form,
                                      description: e.target.value,
                                    })
                                  }
                                  rows={4}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Estimation (heures)</Label>
                                  <Input
                                    type="number"
                                    min={0.25}
                                    step={0.25}
                                    value={form.estimatedHours}
                                    onChange={(e) =>
                                      setForm({
                                        ...form,
                                        estimatedHours: Number(e.target.value),
                                      })
                                    }
                                  />
                                  {form.estimatedHours > 8 && (
                                    <p className="text-xs text-orange-600">
                                      Cette tâche sera automatiquement
                                      décomposée en sous-tâches de 8h maximum.
                                    </p>
                                  )}
                                </div>
                                <div className="space-y-2">
                                  <Label>Assignation (suggestion)</Label>
                                  <Select
                                    value={form.assignee}
                                    onValueChange={(v) =>
                                      setForm({ ...form, assignee: v })
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {TEAM.map((m) => (
                                        <SelectItem key={m} value={m}>
                                          {m}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>Dépendances (manuel)</Label>
                                <div className="max-h-40 overflow-auto border rounded p-2">
                                  {(sprint.tasks || [])
                                    .filter(
                                      (t) =>
                                        !selectedStory ||
                                        t.userStoryId === selectedStory.id,
                                    )
                                    .map((t) => (
                                      <label
                                        key={t.id}
                                        className="flex items-center gap-2 py-1"
                                      >
                                        <input
                                          type="checkbox"
                                          className="rounded"
                                          checked={selectedDeps.includes(t.id)}
                                          onChange={(e) => {
                                            if (e.target.checked)
                                              setSelectedDeps((prev) => [
                                                ...prev,
                                                t.id,
                                              ]);
                                            else
                                              setSelectedDeps((prev) =>
                                                prev.filter(
                                                  (id) => id !== t.id,
                                                ),
                                              );
                                          }}
                                        />
                                        <span className="text-sm">
                                          {t.title} · {t.type}
                                        </span>
                                      </label>
                                    ))}
                                  {(sprint.tasks || []).filter(
                                    (t) =>
                                      !selectedStory ||
                                      t.userStoryId === selectedStory.id,
                                  ).length === 0 && (
                                    <p className="text-xs text-muted-foreground">
                                      Aucune tâche existante pour lier.
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  onClick={() => setIsCreateOpen(false)}
                                >
                                  Annuler
                                </Button>
                                <Button onClick={createTasks}>Créer</Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  );
                })}
                {sprintStories.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Aucune story dans ce sprint.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Center: tasks table */}
          <div className="lg:col-span-6 space-y-3">
            <Card>
              <CardHeader>
                <CardTitle>Tâches</CardTitle>
                <CardDescription>
                  Story sélectionnée:{" "}
                  {selectedStory ? formatUserStory(selectedStory) : "—"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Story</TableHead>
                      <TableHead>Tâche</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Estimée</TableHead>
                      <TableHead>Effectuée</TableHead>
                      <TableHead>Assigné</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(sprint.tasks || [])
                      .filter(
                        (t) =>
                          !selectedStory || t.userStoryId === selectedStory.id,
                      )
                      .map((t) => {
                        const st = userStories.find(
                          (s) => s.id === t.userStoryId,
                        );
                        return (
                          <TableRow key={t.id}>
                            <TableCell className="max-w-[240px] truncate">
                              {st ? formatUserStory(st) : t.userStoryId}
                            </TableCell>
                            <TableCell className="max-w-[260px] truncate">
                              {t.title}
                            </TableCell>
                            <TableCell>{t.type}</TableCell>
                            <TableCell>{t.estimatedHours}h</TableCell>
                            <TableCell>{t.actualHours}h</TableCell>
                            <TableCell>{t.assignee || "—"}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  t.status === "Done"
                                    ? "default"
                                    : t.status === "In Progress"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {t.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Dialog
                                open={logTaskId === t.id}
                                onOpenChange={(o) => {
                                  setLogTaskId(o ? t.id : null);
                                  setLogForm({ hours: 1, note: "" });
                                }}
                              >
                                <DialogTrigger asChild>
                                  <Button size="sm" variant="outline">
                                    <Timer className="h-4 w-4 mr-1" />
                                    Log Time
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>
                                      Ajouter un Work Log
                                    </DialogTitle>
                                    <DialogDescription>
                                      Déclarez du temps passé sur la tâche.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-3">
                                    <div className="space-y-1">
                                      <Label>Heures</Label>
                                      <Input
                                        type="number"
                                        min={0.25}
                                        step={0.25}
                                        value={logForm.hours}
                                        onChange={(e) =>
                                          setLogForm({
                                            ...logForm,
                                            hours: Number(e.target.value),
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <Label>Note</Label>
                                      <Textarea
                                        value={logForm.note}
                                        onChange={(e) =>
                                          setLogForm({
                                            ...logForm,
                                            note: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="flex justify-end gap-2">
                                      <Button
                                        variant="outline"
                                        onClick={() => setLogTaskId(null)}
                                      >
                                        Annuler
                                      </Button>
                                      <Button
                                        onClick={() => {
                                          if (logTaskId) {
                                            logTime(
                                              logTaskId,
                                              logForm.hours,
                                              logForm.note,
                                            );
                                            setLogTaskId(null);
                                            toast({
                                              title: "Temps enregistré",
                                              description: `${logForm.hours}h ajout��es`,
                                            });
                                          }
                                        }}
                                      >
                                        Enregistrer
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {(sprint.tasks || []).filter(
                      (t) =>
                        !selectedStory || t.userStoryId === selectedStory.id,
                    ).length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          className="text-center text-muted-foreground"
                        >
                          Aucune tâche pour la story sélectionnée.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <div className="text-xs text-right text-muted-foreground mt-2">
                  Historique vélocité
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: logs & charts */}
          <div className="lg:col-span-3 space-y-3">
            <Card>
              <CardHeader>
                <CardTitle>Work Log</CardTitle>
                <CardDescription>Dernières entrées</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {workLogs.slice(0, 8).map((w) => {
                  const task = sprint.tasks.find((t) => t.id === w.taskId);
                  return (
                    <div key={w.id} className="p-2 border rounded">
                      <div className="flex justify-between">
                        <span className="font-medium">{w.user}</span>
                        <span>{w.date}</span>
                      </div>
                      <div>
                        {w.hours}h · {task?.title || w.taskId}
                      </div>
                      {w.note && (
                        <div className="text-muted-foreground">{w.note}</div>
                      )}
                    </div>
                  );
                })}
                {workLogs.length === 0 && (
                  <p className="text-muted-foreground">Aucun log.</p>
                )}
                <div className="pt-2">
                  <Button size="sm" variant="outline">
                    <Timer className="h-4 w-4 mr-1" /> Log time
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Daily Hours Over Capacity</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    Estimated: {
                      label: "Estimée",
                      color: "hsl(var(--primary))",
                    },
                    Logged: { label: "Loggée", color: "hsl(var(--chart-2))" },
                  }}
                  className="h-48"
                >
                  <BarChart data={dailyHours}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      allowDecimals={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar
                      dataKey="Estimated"
                      fill="var(--color-Estimated)"
                      radius={4}
                    />
                    <Bar
                      dataKey="Logged"
                      fill="var(--color-Logged)"
                      radius={4}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Efficacité</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                {[
                  { user: "Alice", eff: 75 },
                  { user: "Bob", eff: 100 },
                  { user: "Charlie", eff: 40 },
                  { user: "Diana", eff: 50 },
                ].map((e) => (
                  <div key={e.user} className="flex items-center gap-2">
                    <div className="w-16 text-muted-foreground">{e.user}</div>
                    <div className="flex-1">
                      <Progress value={e.eff} />
                    </div>
                    <div className="w-12 text-right">{e.eff}%</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
