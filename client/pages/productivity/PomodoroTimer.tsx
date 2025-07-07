import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Settings,
  TrendingUp,
  Clock,
  Coffee,
  Target,
  Volume2,
  VolumeX,
  Bell,
  Calendar,
  Activity,
  Award,
} from "lucide-react";
import { useState } from "react";

export default function PomodoroTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentSession, setCurrentSession] = useState("work"); // "work", "shortBreak", "longBreak"
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [sessionCount, setSessionCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoStartBreaks, setAutoStartBreaks] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getSessionInfo = () => {
    switch (currentSession) {
      case "work":
        return {
          title: "Session de Travail",
          color: "text-primary",
          bgColor: "bg-primary/10",
          icon: Timer,
          duration: 25 * 60,
        };
      case "shortBreak":
        return {
          title: "Pause Courte",
          color: "text-green-600",
          bgColor: "bg-green-100",
          icon: Coffee,
          duration: 5 * 60,
        };
      case "longBreak":
        return {
          title: "Pause Longue",
          color: "text-blue-600",
          bgColor: "bg-blue-100",
          icon: Coffee,
          duration: 15 * 60,
        };
    }
  };

  const sessionInfo = getSessionInfo();
  const Icon = sessionInfo.icon;
  const progress =
    ((sessionInfo.duration - timeLeft) / sessionInfo.duration) * 100;

  const todayStats = {
    completedSessions: 6,
    focusTime: "2h 30min",
    tasksCompleted: 4,
    productivity: 87,
  };

  const weekStats = {
    totalSessions: 28,
    totalFocusTime: "11h 40min",
    averageProductivity: 83,
    streak: 5,
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Technique Pomodoro
            </h1>
            <p className="text-muted-foreground mt-1">
              Boostez votre productivité avec des sessions de travail focalisé
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 lg:mt-0">
            <Button variant="outline">
              <TrendingUp className="mr-2 h-4 w-4" />
              Statistiques
            </Button>
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Paramètres
            </Button>
          </div>
        </div>

        {/* Timer Principal */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className={sessionInfo.bgColor}>
              <CardContent className="pt-8 pb-8">
                <div className="text-center space-y-6">
                  {/* Session Type */}
                  <div className="flex items-center justify-center gap-2">
                    <Icon className={`h-6 w-6 ${sessionInfo.color}`} />
                    <h2
                      className={`text-xl font-semibold ${sessionInfo.color}`}
                    >
                      {sessionInfo.title}
                    </h2>
                    <Badge variant="outline">Session {sessionCount + 1}</Badge>
                  </div>

                  {/* Timer Display */}
                  <div className="space-y-4">
                    <div className={`text-6xl font-bold ${sessionInfo.color}`}>
                      {formatTime(timeLeft)}
                    </div>
                    <Progress value={progress} className="w-full h-3" />
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      size="lg"
                      onClick={() => setIsRunning(!isRunning)}
                      className="w-24"
                    >
                      {isRunning ? (
                        <>
                          <Pause className="mr-2 h-5 w-5" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-5 w-5" />
                          Start
                        </>
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        setTimeLeft(sessionInfo.duration);
                        setIsRunning(false);
                      }}
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reset
                    </Button>
                  </div>

                  {/* Session Progress */}
                  <div className="flex items-center justify-center gap-2">
                    {[1, 2, 3, 4].map((session) => (
                      <div
                        key={session}
                        className={`w-3 h-3 rounded-full ${
                          session <= sessionCount
                            ? "bg-primary"
                            : "bg-muted-foreground/20"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">
                      {sessionCount}/4 sessions avant pause longue
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tâche Actuelle */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Tâche Actuelle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="text-sm font-medium text-blue-800 mb-1">
                  TASK-201
                </div>
                <div className="text-sm text-blue-700">
                  Intégration OAuth2 Google
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Temps estimé:</span>
                  <span className="font-medium">4 sessions</span>
                </div>
                <div className="flex justify-between">
                  <span>Sessions complétées:</span>
                  <span className="font-medium">2/4</span>
                </div>
                <div className="flex justify-between">
                  <span>Progression:</span>
                  <span className="font-medium text-green-600">50%</span>
                </div>
              </div>

              <Separator />

              <Button variant="outline" className="w-full">
                <Clock className="mr-2 h-4 w-4" />
                Changer de tâche
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Statistiques et Configuration */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Statistiques Aujourd'hui */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Aujourd'hui
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {todayStats.completedSessions}
                  </div>
                  <div className="text-sm text-muted-foreground">Sessions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {todayStats.focusTime}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Temps focus
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {todayStats.tasksCompleted}
                  </div>
                  <div className="text-sm text-muted-foreground">Tâches</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {todayStats.productivity}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Productivité
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Objectif quotidien</span>
                  <span>8 sessions</span>
                </div>
                <Progress value={(todayStats.completedSessions / 8) * 100} />
                <div className="text-xs text-muted-foreground">
                  {8 - todayStats.completedSessions} sessions restantes
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">
                    Session de travail
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <Slider
                      defaultValue={[25]}
                      max={50}
                      min={15}
                      step={5}
                      className="flex-1"
                    />
                    <span className="text-sm w-12">25 min</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Pause courte</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Slider
                      defaultValue={[5]}
                      max={15}
                      min={3}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-sm w-12">5 min</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Pause longue</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Slider
                      defaultValue={[15]}
                      max={30}
                      min={10}
                      step={5}
                      className="flex-1"
                    />
                    <span className="text-sm w-12">15 min</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {soundEnabled ? (
                      <Volume2 className="h-4 w-4" />
                    ) : (
                      <VolumeX className="h-4 w-4" />
                    )}
                    <span className="text-sm">Notifications sonores</span>
                  </div>
                  <Switch
                    checked={soundEnabled}
                    onCheckedChange={setSoundEnabled}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    <span className="text-sm">Démarrage auto des pauses</span>
                  </div>
                  <Switch
                    checked={autoStartBreaks}
                    onCheckedChange={setAutoStartBreaks}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistiques Hebdomadaires */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Cette Semaine
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 lg:grid-cols-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  {weekStats.totalSessions}
                </div>
                <div className="text-sm text-muted-foreground">
                  Sessions totales
                </div>
                <div className="text-xs text-green-600 mt-1">
                  +12% vs semaine dernière
                </div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {weekStats.totalFocusTime}
                </div>
                <div className="text-sm text-muted-foreground">
                  Temps focus total
                </div>
                <div className="text-xs text-green-600 mt-1">
                  +8% vs semaine dernière
                </div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {weekStats.averageProductivity}%
                </div>
                <div className="text-sm text-muted-foreground">
                  Productivité moyenne
                </div>
                <div className="text-xs text-green-600 mt-1">
                  +5% vs semaine dernière
                </div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Award className="h-6 w-6 text-orange-500" />
                  <span className="text-3xl font-bold text-orange-600">
                    {weekStats.streak}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Jours consécutifs
                </div>
                <div className="text-xs text-orange-600 mt-1">
                  Record personnel!
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
