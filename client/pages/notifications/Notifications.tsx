import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Bell,
  Settings,
  Filter,
  MailOpen,
  CheckCheck,
  AlertTriangle,
  Calendar,
  MessageSquare,
  Target,
  Users,
  Clock,
  Zap,
  Mail,
  Smartphone,
  Volume2,
  VolumeX,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "urgent",
    title: "Impediment critique signalé",
    message: "Thomas Moreau a signalé un problème bloquant sur l'API OAuth2",
    timestamp: "Il y a 5 min",
    read: false,
    actionRequired: true,
    avatar: "TM",
    category: "impediment",
  },
  {
    id: 2,
    type: "info",
    title: "Sprint Review programmée",
    message: "Sprint Review 12 programmée pour demain 14h00 en salle de conférence",
    timestamp: "Il y a 15 min",
    read: false,
    actionRequired: false,
    avatar: "PM",
    category: "meeting",
  },
  {
    id: 3,
    type: "success",
    title: "User Story terminée",
    message: "Marie Dubois a marqué US-201 'OAuth2 Login' comme terminée",
    timestamp: "Il y a 1h",
    read: true,
    actionRequired: false,
    avatar: "MD",
    category: "task",
  },
  {
    id: 4,
    type: "warning",
    title: "Burndown en retard",
    message: "Le sprint actuel est 15% en retard par rapport à la vélocité prévue",
    timestamp: "Il y a 2h",
    read: false,
    actionRequired: true,
    avatar: null,
    category: "analytics",
  },
  {
    id: 5,
    type: "info",
    title: "Code Review demandée",
    message: "Sophie Laurent demande une review sur la PR #125 - Login UI Components",
    timestamp: "Il y a 3h",
    read: true,
    actionRequired: true,
    avatar: "SL",
    category: "review",
  },
  {
    id: 6,
    type: "info",
    title: "Daily Standup rappel",
    message: "Daily Standup dans 15 minutes en salle de réunion",
    timestamp: "Hier 8h45",
    read: true,
    actionRequired: false,
    avatar: null,
    category: "meeting",
  },
];

const notificationSettings = [
  {
    category: "Sprint & Planification",
    settings: [
      { name: "Nouveau sprint créé", email: true, push: true, inApp: true },
      { name: "Sprint terminé", email: true, push: false, inApp: true },
      { name: "Planning poker démarré", email: false, push: true, inApp: true },
      { name: "Objectif sprint modifié", email: true, push: true, inApp: true },
    ],
  },
  {
    category: "Tâches & User Stories",
    settings: [
      { name: "Tâche assignée", email: true, push: true, inApp: true },
      { name: "Tâche terminée", email: false, push: false, inApp: true },
      { name: "User story bloquée", email: true, push: true, inApp: true },
      { name: "Date limite approche", email: true, push: true, inApp: true },
    ],
  },
  {
    category: "Équipe & Collaboration",
    settings: [
      { name: "Code review demandée", email: true, push: true, inApp: true },
      { name: "Nouveau membre équipe", email: true, push: false, inApp: true },
      { name: "Membre hors ligne", email: false, push: false, inApp: true },
      { name: "Message dans chat", email: false, push: true, inApp: true },
    ],
  },
  {
    category: "Métriques & Alertes",
    settings: [
      { name: "Vélocité en baisse", email: true, push: true, inApp: true },
      { name: "Burndown en retard", email: true, push: true, inApp: true },
      { name: "Qualité code dégradée", email: true, push: false, inApp: true },
      { name: "Impediment signalé", email: true, push: true, inApp: true },
    ],
  },
];

const getNotificationIcon = (category: string) => {
  switch (category) {
    case "impediment":
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    case "meeting":
      return <Calendar className="h-4 w-4 text-blue-500" />;
    case "task":
      return <Target className="h-4 w-4 text-green-500" />;
    case "review":
      return <MessageSquare className="h-4 w-4 text-purple-500" />;
    case "analytics":
      return <TrendingUp className="h-4 w-4 text-orange-500" />;
    default:
      return <Bell className="h-4 w-4 text-gray-500" />;
  }
};

const getNotificationColor = (type: string, read: boolean) => {
  const baseClasses = read ? "bg-gray-50" : "bg-white border-l-4";

  switch (type) {
    case "urgent":
      return `${baseClasses} ${!read ? "border-l-red-500" : ""}`;
    case "warning":
      return `${baseClasses} ${!read ? "border-l-orange-500" : ""}`;
    case "success":
      return `${baseClasses} ${!read ? "border-l-green-500" : ""}`;
    default:
      return `${baseClasses} ${!read ? "border-l-blue-500" : ""}`;
  }
};

export default function Notifications() {
  const unreadCount = notifications.filter(n => !n.read).length;
  const urgentCount = notifications.filter(n => n.type === "urgent" && !n.read).length;

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Centre de Notifications
            </h1>
            <p className="text-muted-foreground mt-1">
              Gérez vos alertes, notifications urgentes et préf��rences de communication
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 lg:mt-0">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtrer
            </Button>
            <Button variant="outline">
              <CheckCheck className="mr-2 h-4 w-4" />
              Tout marquer lu
            </Button>
            <Button>
              <Settings className="mr-2 h-4 w-4" />
              Paramètres
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">{unreadCount}</div>
                  <div className="text-sm text-muted-foreground">Non lues</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <div className="text-2xl font-bold text-red-600">{urgentCount}</div>
                  <div className="text-sm text-muted-foreground">Urgentes</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold">
                    {notifications.filter(n => n.actionRequired && !n.read).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Actions requises</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">
                    {notifications.filter(n => n.timestamp.includes("min")).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Récentes</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">
              Toutes ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread">
              Non lues ({unreadCount})
            </TabsTrigger>
            <TabsTrigger value="urgent">
              Urgentes ({urgentCount})
            </TabsTrigger>
            <TabsTrigger value="settings">
              Paramètres
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={getNotificationColor(notification.type, notification.read)}
              >
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.category)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-medium ${!notification.read ? "text-gray-900" : "text-gray-600"}`}>
                              {notification.title}
                            </h3>
                            {notification.type === "urgent" && (
                              <Badge variant="destructive" className="text-xs">
                                Urgent
                              </Badge>
                            )}
                            {notification.actionRequired && (
                              <Badge variant="outline" className="text-xs">
                                Action requise
                              </Badge>
                            )}
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            )}
                          </div>
                          <p className={`text-sm mb-2 ${!notification.read ? "text-gray-700" : "text-gray-500"}`}>
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{notification.timestamp}</span>
                            {notification.avatar && (
                              <div className="flex items-center gap-1">
                                <Avatar className="h-4 w-4">
                                  <AvatarFallback className="text-xs">
                                    {notification.avatar}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{notification.avatar}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2 ml-4">
                          {notification.actionRequired && (
                            <Button size="sm" variant="outline">
                              Voir
                            </Button>
                          )}
                          <Button size="sm" variant="ghost">
                            {notification.read ? (
                              <MarkAsUnread className="h-3 w-3" />
                            ) : (
                              <CheckCheck className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            {notifications
              .filter(n => !n.read)
              .map((notification) => (
                <Card
                  key={notification.id}
                  className={getNotificationColor(notification.type, false)}
                >
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.category)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{notification.title}</h3>
                          {notification.type === "urgent" && (
                            <Badge variant="destructive" className="text-xs">
                              Urgent
                            </Badge>
                          )}
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                          {notification.message}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {notification.timestamp}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="urgent" className="space-y-4">
            {notifications
              .filter(n => n.type === "urgent")
              .map((notification) => (
                <Card
                  key={notification.id}
                  className="border-l-4 border-l-red-500 bg-red-50"
                >
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-red-900">
                            {notification.title}
                          </h3>
                          <Badge variant="destructive" className="text-xs">
                            Urgent
                          </Badge>
                        </div>
                        <p className="text-sm text-red-800 mb-2">
                          {notification.message}
                        </p>
                        <span className="text-xs text-red-600">
                          {notification.timestamp}
                        </span>
                      </div>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        Traiter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Préférences de Notification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {notificationSettings.map((category, index) => (
                  <div key={index} className="space-y-4">
                    <h3 className="font-medium text-lg">{category.category}</h3>
                    <div className="space-y-3">
                      {category.settings.map((setting, settingIndex) => (
                        <div
                          key={settingIndex}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <span className="text-sm font-medium">
                            {setting.name}
                          </span>
                          <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <Switch checked={setting.email} />
                            </div>
                            <div className="flex items-center gap-2">
                              <Smartphone className="h-4 w-4 text-muted-foreground" />
                              <Switch checked={setting.push} />
                            </div>
                            <div className="flex items-center gap-2">
                              <Bell className="h-4 w-4 text-muted-foreground" />
                              <Switch checked={setting.inApp} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Paramètres Généraux</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Mode Ne Pas Déranger</div>
                    <div className="text-sm text-muted-foreground">
                      Désactiver toutes les notifications non critiques
                    </div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Sons des notifications</div>
                    <div className="text-sm text-muted-foreground">
                      Jouer un son pour les nouvelles notifications
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Résumé quotidien</div>
                    <div className="text-sm text-muted-foreground">
                      Recevoir un résumé des notifications à 18h00
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Notifications d'équipe</div>
                    <div className="text-sm text-muted-foreground">
                      Être notifié des activités de tous les membres
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
