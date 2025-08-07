import { useState, useRef, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Brain,
  Send,
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Target,
  Zap,
  BookOpen,
  BarChart3,
  MessageSquare,
  Sparkles,
  Settings,
  RefreshCw
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface Insight {
  id: string;
  type: 'suggestion' | 'warning' | 'achievement' | 'optimization';
  title: string;
  description: string;
  actionable: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
}

const mockInsights: Insight[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Sprint en retard',
    description: 'Le sprint actuel risque de ne pas être terminé à temps. 3 user stories sont encore en cours.',
    actionable: true,
    priority: 'high',
    category: 'Sprint Management'
  },
  {
    id: '2',
    type: 'suggestion',
    title: 'Optimisation des story points',
    description: 'Vos estimations sont souvent sous-évaluées de 20%. Considérez d\'ajuster votre méthode d\'estimation.',
    actionable: true,
    priority: 'medium',
    category: 'Estimation'
  },
  {
    id: '3',
    type: 'achievement',
    title: 'Vélocité en amélioration',
    description: 'Votre équipe a augmenté sa vélocité de 15% par rapport au sprint précédent. Excellent travail !',
    actionable: false,
    priority: 'low',
    category: 'Performance'
  },
  {
    id: '4',
    type: 'optimization',
    title: 'Répartition des tâches',
    description: 'Sophie Chen a une charge de travail 30% supérieure à la moyenne de l\'équipe.',
    actionable: true,
    priority: 'medium',
    category: 'Workload'
  }
];

const mockSuggestions = [
  "Comment améliorer la vélocité de mon équipe ?",
  "Quelles sont les meilleures pratiques pour les daily standups ?",
  "Comment résoudre les blocages récurrents ?",
  "Aidez-moi à prioriser le backlog produit",
  "Suggestions pour la prochaine rétrospective"
];

const insightIcons = {
  suggestion: <Lightbulb className="h-5 w-5 text-yellow-500" />,
  warning: <AlertTriangle className="h-5 w-5 text-red-500" />,
  achievement: <CheckCircle className="h-5 w-5 text-green-500" />,
  optimization: <TrendingUp className="h-5 w-5 text-blue-500" />
};

const insightColors = {
  suggestion: 'border-l-yellow-500 bg-yellow-50',
  warning: 'border-l-red-500 bg-red-50',
  achievement: 'border-l-green-500 bg-green-50',
  optimization: 'border-l-blue-500 bg-blue-50'
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-orange-100 text-orange-800',
  high: 'bg-red-100 text-red-800'
};

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Bonjour ! Je suis votre assistant IA pour la gestion de projet SCRUM. Je peux vous aider à analyser vos données, optimiser vos processus et répondre à vos questions sur la méthodologie Agile. Comment puis-je vous aider aujourd\'hui ?',
      timestamp: new Date(),
      suggestions: mockSuggestions.slice(0, 3)
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [insights, setInsights] = useState<Insight[]>(mockInsights);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getAIResponse(inputValue),
        timestamp: new Date(),
        suggestions: mockSuggestions.slice(Math.floor(Math.random() * 3), Math.floor(Math.random() * 3) + 3)
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes('vélocité') || input.includes('velocity')) {
      return 'Pour améliorer la vélocité de votre équipe, je recommande :\n\n1. **Analyser les blocages** : Identifiez les obstacles récurrents lors des daily standups\n2. **Affiner les estimations** : Utilisez la planification poker pour des estimations plus précises\n3. **Réduire le work in progress** : Limitez le nombre de tâches en cours simultanément\n4. **Automatiser les tâches répétitives** : Mettez en place des outils CI/CD\n\nVotre vélocité actuelle est de 42 story points par sprint. L\'objectif serait d\'atteindre 48-50 points d\'ici 2 sprints.';
    }

    if (input.includes('daily') || input.includes('standup')) {
      return 'Voici les meilleures pratiques pour vos daily standups :\n\n✅ **Durée limitée** : Maximum 15 minutes\n✅ **Questions claires** : Que j\'ai fait hier, que je vais faire aujourd\'hui, quels blocages\n✅ **Focus sur l\'équipe** : Évitez les rapports individuels au Scrum Master\n✅ **Résolution de problèmes** : Planifiez des discussions détaillées après le standup\n\nJe remarque que vos standups durent en moyenne 22 minutes. Essayez de raccourcir en reportant les discussions techniques.';
    }

    if (input.includes('blocage') || input.includes('blocker')) {
      return 'Pour résoudre les blocages récurrents, voici mon analyse :\n\n**Blocages identifiés dans votre projet :**\n• Attente de validation UX (35% des cas)\n• Dépendances techniques externes (28% des cas)\n• Clarification des requirements (22% des cas)\n\n**Solutions recommandées :**\n1. Créer un "Definition of Ready" plus strict\n2. Planifier les validations UX en amont\n3. Identifier les dépendances lors du sprint planning\n4. Mettre en place un board des blocages visible';
    }

    return 'Merci pour votre question ! Je vais analyser les données de votre projet pour vous fournir des recommandations personnalisées. En attendant, je peux vous aider avec :\n\n• Analyse de la vélocité et des métriques\n• Optimisation des processus SCRUM\n• Identification des goulots d\'étranglement\n• Suggestions d\'amélioration pour les sprints\n\nN\'hésitez pas à me poser des questions plus spécifiques !';
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const InsightCard = ({ insight }: { insight: Insight }) => (
    <Card className={`border-l-4 ${insightColors[insight.type]}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {insightIcons[insight.type]}
            <CardTitle className="text-sm">{insight.title}</CardTitle>
          </div>
          <Badge className={priorityColors[insight.priority]} variant="secondary">
            {insight.priority === 'low' ? 'Faible' : insight.priority === 'medium' ? 'Moyenne' : 'Haute'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {insight.category}
          </Badge>
          {insight.actionable && (
            <Button size="sm" variant="outline">
              <Zap className="h-3 w-3 mr-1" />
              Action
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <MainLayout>
      <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Assistant IA</h1>
          <p className="text-muted-foreground">
            Votre conseiller intelligent pour la gestion de projet Agile
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Paramètres
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{insights.length}</p>
                <p className="text-sm text-muted-foreground">Insights Actifs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Sparkles className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {insights.filter(i => i.type === 'suggestion').length}
                </p>
                <p className="text-sm text-muted-foreground">Suggestions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {insights.filter(i => i.type === 'warning').length}
                </p>
                <p className="text-sm text-muted-foreground">Alertes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{messages.length - 1}</p>
                <p className="text-sm text-muted-foreground">Conversations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="chat" className="space-y-4">
        <TabsList>
          <TabsTrigger value="chat">
            <MessageSquare className="h-4 w-4 mr-2" />
            Chat IA
          </TabsTrigger>
          <TabsTrigger value="insights">
            <Brain className="h-4 w-4 mr-2" />
            Insights
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Conversation avec l'IA
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-0">
                  <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          {message.type === 'ai' && (
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-purple-100 text-purple-600">
                                <Brain className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.type === 'user'
                                ? 'bg-primary text-primary-foreground ml-auto'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm whitespace-pre-line">{message.content}</p>
                            <p className="text-xs opacity-70 mt-2">
                              {message.timestamp.toLocaleTimeString('fr-FR', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                            {message.suggestions && (
                              <div className="mt-3 space-y-1">
                                <p className="text-xs font-medium">Suggestions :</p>
                                {message.suggestions.map((suggestion, index) => (
                                  <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    className="text-xs h-7 mr-1 mb-1"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                  >
                                    {suggestion}
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                          {message.type === 'user' && (
                            <Avatar className="w-8 h-8">
                              <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-purple-100 text-purple-600">
                              <Brain className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="bg-muted p-3 rounded-lg">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                  <Separator />
                  <div className="p-4">
                    <div className="flex gap-2">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Posez votre question sur la gestion de projet..."
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        disabled={isTyping}
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isTyping}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Suggestions Rapides</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {mockSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-left h-auto p-2"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <Lightbulb className="h-3 w-3 mr-2 shrink-0" />
                      <span className="text-xs">{suggestion}</span>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Métriques Clés</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Vélocité moyenne</span>
                    <span className="font-medium">42 SP</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Taux de réussite sprint</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Blocages résolus</span>
                    <span className="font-medium">12/15</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Satisfaction équipe</span>
                    <span className="font-medium">8.2/10</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="insights">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {insights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Prédictions IA</CardTitle>
                <CardDescription>Analyses prédictives basées sur vos données</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-l-blue-500">
                  <h4 className="font-medium">Sprint suivant</h4>
                  <p className="text-sm text-muted-foreground">
                    Probabilité de réussite: <strong>92%</strong><br />
                    Vélocité prévue: <strong>45-48 SP</strong>
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-l-green-500">
                  <h4 className="font-medium">Livraison projet</h4>
                  <p className="text-sm text-muted-foreground">
                    Date prévue: <strong>15 juin 2024</strong><br />
                    Confiance: <strong>87%</strong>
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-l-orange-500">
                  <h4 className="font-medium">Charge équipe</h4>
                  <p className="text-sm text-muted-foreground">
                    Risque de surcharge: <strong>Moyen</strong><br />
                    Action recommandée: <strong>Rééquilibrage</strong>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommandations</CardTitle>
                <CardDescription>Actions prioritaires suggérées par l'IA</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Planifier une session d'estimation</p>
                    <p className="text-xs text-muted-foreground">Améliorer la précision des story points</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Users className="h-5 w-5 text-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Réorganiser les équipes</p>
                    <p className="text-xs text-muted-foreground">Optimiser la répartition des compétences</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Clock className="h-5 w-5 text-orange-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Réviser les daily standups</p>
                    <p className="text-xs text-muted-foreground">Réduire la durée moyenne de 7 minutes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      </div>
    </MainLayout>
  );
}
