import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { Plus, Timer, User, ChevronRight, ChevronLeft, PlayCircle, Pause, ListChecks } from "lucide-react";

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

const TEAM = ["Alice", "Bob", "Charlie", "Diana"];

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

  const sprint = useMemo(() => sprints.find((s) => s.id === sprintId) || null, [sprints, sprintId]);
  const sprintStories = useMemo(() => {
    if (!sprint) return [];
    return userStories.filter((s) => sprint.userStories.includes(s.id));
  }, [sprint, userStories]);

  useEffect(() => {
    if (sprintStories.length > 0 && !selectedStoryId) {
      setSelectedStoryId(sprintStories[0].id);
    }
  }, [sprintStories, selectedStoryId]);

  const selectedStory = sprintStories.find((s) => s.id === selectedStoryId) || null;

  // Intelligent assignment suggestion based on current load
  const recommendAssignee = () => {
    if (!sprint) return TEAM[0];
    const load = new Map<string, number>();
    TEAM.forEach((m) => load.set(m, 0));
    sprint.tasks.forEach((t) => {
      if (t.assignee) load.set(t.assignee, (load.get(t.assignee) || 0) + (t.estimatedHours || 0));
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
      toast({ title: "Titre requis", description: "La tâche doit avoir un titre", variant: "destructive" });
      return;
    }
    if (form.estimatedHours <= 0) {
      toast({ title: "Estimation invalide", description: "Doit être > 0", variant: "destructive" });
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
        const devTasks = (sprint.tasks || []).filter((t) => t.userStoryId === selectedStory.id && t.type === "Development");
        newTask.dependencies = devTasks.map((t) => t.id);
      }

      tasksToCreate.push(newTask);
    }

    const updated = sprints.map((sp) => (sp.id === sprint.id ? { ...sp, tasks: [...(sp.tasks || []), ...tasksToCreate] } : sp));
    setSprints(updated);
    setIsCreateOpen(false);

    if (parts > 1) {
      toast({ title: "Tâches créées (décomposition)", description: `${parts} sous-tâches de ≤ 8h` });
    } else {
      toast({ title: "Tâche créée", description: `${form.title} (${form.estimatedHours}h)` });
    }

    setForm({ title: "", description: "", type: "Development", estimatedHours: 1, assignee: recommendAssignee() });
    setSelectedDeps([]);
  };

  const logTime = (taskId: string, hours: number, note?: string) => {
    if (!sprint) return;
    const updated = sprints.map((sp) => {
      if (sp.id !== sprint.id) return sp;
      const nextTasks = sp.tasks.map((t) => (t.id === taskId ? { ...t, actualHours: (t.actualHours || 0) + hours } : t));
      return { ...sp, tasks: nextTasks };
    });
    setSprints(updated);
    const entry: WorkLogEntry = { id: `${Date.now()}`, taskId, user: form.assignee || TEAM[0], hours, note, date: new Date().toISOString().split("T")[0] };
    setWorkLogs((prev) => [entry, ...prev]);
  };

  const formatUserStory = (story: UserStory) => `que ${story.asA}, je veux ${story.iWant}`;

  if (!sprint) {
    return (
      <MainLayout>
        <div className="p-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Sprint introuvable. Retour au backlog.</p>
              <Button className="mt-3" onClick={() => navigate("/backlog")}>Retour</Button>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  const capacityUsed = sprint.tasks.reduce((sum, t) => sum + t.estimatedHours, 0);
  const capacityProgress = Math.min(100, Math.round((capacityUsed / sprint.capacity) * 100));

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
            <p className="text-muted-foreground">{sprint.name} — {sprint.startDate} → {sprint.endDate}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate("/backlog")}><ChevronLeft className="h-4 w-4 mr-2"/>Retour</Button>
            <Button onClick={() => navigate("/sprints/execution")}><PlayCircle className="h-4 w-4 mr-2"/>Démarrer le sprint</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-4">
          {/* Left: sprint stories */}
          <div className="lg:col-span-3 space-y-3">
            <Card>
              <CardHeader>
                <CardTitle>Stories du sprint</CardTitle>
                <CardDescription>{sprintStories.length} stories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {sprintStories.map((story) => {
                  const sp = storyProgress(story.id);
                  return (
                    <div key={story.id} className={`p-3 rounded border ${selectedStoryId === story.id ? "bg-muted" : "bg-background"}`}>
                      <div className="flex justify-between items-start">
                        <button className="text-left" onClick={() => setSelectedStoryId(story.id)}>
                          <div className="font-medium">{story.storyPoints} SP · {formatUserStory(story)}</div>
                          <div className="text-xs text-muted-foreground">{sp.done}/{sp.total} tâches</div>
                        </button>
                        <Dialog open={isCreateOpen && selectedStoryId === story.id} onOpenChange={(o)=>{ setIsCreateOpen(o); if(!o){ setForm((f)=>({...f, title:"", description:"", estimatedHours:1, type:"Development"})); setSelectedDeps([]);} }}>
                          <DialogTrigger asChild>
                            <Button size="sm"><Plus className="h-4 w-4 mr-1"/> Ajouter tâche</Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Nouvelle tâche</DialogTitle>
                              <DialogDescription>
                                Types: Development, Testing, Design, Analysis, Documentation. Estimation ≤ 8h sinon décomposition automatique.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Titre</Label>
                                  <Input value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} placeholder="Nom de la tâche" />
                                </div>
                                <div className="space-y-2">
                                  <Label>Type</Label>
                                  <Select value={form.type} onValueChange={(v)=>setForm({...form, type: v as Task["type"]})}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Development">Development</SelectItem>
                                      <SelectItem value="Testing">Testing</SelectItem>
                                      <SelectItem value="Design">Design</SelectItem>
                                      <SelectItem value="Analysis">Analysis</SelectItem>
                                      <SelectItem value="Documentation">Documentation</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})} rows={4} />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Estimation (heures)</Label>
                                  <Input type="number" min={0.25} step={0.25} value={form.estimatedHours} onChange={(e)=>setForm({...form, estimatedHours: Number(e.target.value)})} />
                                  {form.estimatedHours > 8 && (
                                    <p className="text-xs text-orange-600">Cette tâche sera automatiquement décomposée en sous-tâches de 8h maximum.</p>
                                  )}
                                </div>
                                <div className="space-y-2">
                                  <Label>Assignation (suggestion)</Label>
                                  <Select value={form.assignee} onValueChange={(v)=>setForm({...form, assignee:v})}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                      {TEAM.map((m)=> <SelectItem key={m} value={m}>{m}</SelectItem>)}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>Dépendances (manuel)</Label>
                                <div className="max-h-40 overflow-auto border rounded p-2">
                                  {(sprint.tasks || []).filter((t)=> !selectedStory || t.userStoryId===selectedStory.id).map((t)=> (
                                    <label key={t.id} className="flex items-center gap-2 py-1">
                                      <input type="checkbox" className="rounded" checked={selectedDeps.includes(t.id)} onChange={(e)=>{
                                        if(e.target.checked) setSelectedDeps((prev)=> [...prev, t.id]);
                                        else setSelectedDeps((prev)=> prev.filter((id)=> id!==t.id));
                                      }} />
                                      <span className="text-sm">{t.title} · {t.type}</span>
                                    </label>
                                  ))}
                                  {(sprint.tasks || []).filter((t)=> !selectedStory || t.userStoryId===selectedStory.id).length===0 && (
                                    <p className="text-xs text-muted-foreground">Aucune tâche existante pour lier.</p>
                                  )}
                                </div>
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={()=>setIsCreateOpen(false)}>Annuler</Button>
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
                  <p className="text-sm text-muted-foreground">Aucune story dans ce sprint.</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Center: tasks table */}
          <div className="lg:col-span-6 space-y-3">
            <Card>
              <CardHeader>
                <CardTitle>Tâches</CardTitle>
                <CardDescription>Story sélectionnée: {selectedStory ? formatUserStory(selectedStory) : "—"}</CardDescription>
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
                    {(sprint.tasks || []).filter((t)=>!selectedStory || t.userStoryId===selectedStory.id).map((t)=>{
                      const st = userStories.find((s)=>s.id===t.userStoryId);
                      return (
                        <TableRow key={t.id}>
                          <TableCell className="max-w-[240px] truncate">{st ? formatUserStory(st) : t.userStoryId}</TableCell>
                          <TableCell className="max-w-[260px] truncate">{t.title}</TableCell>
                          <TableCell>{t.type}</TableCell>
                          <TableCell>{t.estimatedHours}h</TableCell>
                          <TableCell>{t.actualHours}h</TableCell>
                          <TableCell>{t.assignee || "—"}</TableCell>
                          <TableCell>
                            <Badge variant={t.status === "Done" ? "default" : t.status === "In Progress" ? "secondary" : "outline"}>{t.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <Dialog open={logTaskId===t.id} onOpenChange={(o)=>{setLogTaskId(o? t.id : null); setLogForm({hours:1, note:""});}}>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline"><Timer className="h-4 w-4 mr-1"/>Log Time</Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Ajouter un Work Log</DialogTitle>
                                  <DialogDescription>Déclarez du temps passé sur la tâche.</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-3">
                                  <div className="space-y-1">
                                    <Label>Heures</Label>
                                    <Input type="number" min={0.25} step={0.25} value={logForm.hours} onChange={(e)=> setLogForm({...logForm, hours: Number(e.target.value)})} />
                                  </div>
                                  <div className="space-y-1">
                                    <Label>Note</Label>
                                    <Textarea value={logForm.note} onChange={(e)=> setLogForm({...logForm, note: e.target.value})} />
                                  </div>
                                  <div className="flex justify-end gap-2">
                                    <Button variant="outline" onClick={()=>setLogTaskId(null)}>Annuler</Button>
                                    <Button onClick={()=>{ if(logTaskId){ logTime(logTaskId, logForm.hours, logForm.note); setLogTaskId(null); toast({ title: "Temps enregistré", description: `${logForm.hours}h ajout��es`}); } }}>Enregistrer</Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {(sprint.tasks || []).filter((t)=>!selectedStory || t.userStoryId===selectedStory.id).length===0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center text-muted-foreground">Aucune tâche pour la story sélectionnée.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Right: capacity & tips */}
          <div className="lg:col-span-3 space-y-3">
            <Card>
              <CardHeader>
                <CardTitle>Capacité</CardTitle>
                <CardDescription>{capacityUsed} / {sprint.capacity} heures planifiées</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={capacityProgress} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rappels & Règles</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>• Estimation ≤ 8h, sinon décomposition automatique.</p>
                <p>• Dépendances: Testing dépend des tâches Development de la même story.</p>
                <p>• Priorité héritée de la user story.</p>
                <p>• Logs par pas de 0,25h.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Work Log</CardTitle>
                <CardDescription>Dernières entrées</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {workLogs.slice(0,8).map((w)=>{
                  const task = sprint.tasks.find((t)=>t.id===w.taskId);
                  return (
                    <div key={w.id} className="p-2 border rounded">
                      <div className="flex justify-between"><span className="font-medium">{w.user}</span><span>{w.date}</span></div>
                      <div>{w.hours}h · {task?.title || w.taskId}</div>
                      {w.note && <div className="text-muted-foreground">{w.note}</div>}
                    </div>
                  );
                })}
                {workLogs.length===0 && <p className="text-muted-foreground">Aucun log.</p>}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
