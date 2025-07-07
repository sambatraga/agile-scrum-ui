import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Search,
  Filter,
  Calendar,
  Users,
  BarChart3,
  TrendingUp,
} from "lucide-react";

const projects = [
  {
    id: 1,
    name: "E-commerce Platform",
    status: "Ongoing",
    startDate: "2024-01-15",
    progress: 75,
    team: 8,
    sprints: 5,
    stories: 32,
  },
  {
    id: 2,
    name: "Mobile App Redesign",
    status: "Planned",
    startDate: "2024-02-01",
    progress: 25,
    team: 6,
    sprints: 3,
    stories: 18,
  },
  {
    id: 3,
    name: "Data Analytics Dashboard",
    status: "Ongoing",
    startDate: "2023-11-20",
    progress: 90,
    team: 4,
    sprints: 8,
    stories: 45,
  },
  {
    id: 4,
    name: "Customer Portal",
    status: "Completed",
    startDate: "2023-08-10",
    progress: 100,
    team: 5,
    sprints: 6,
    stories: 28,
  },
];

const stats = [
  {
    title: "Active Projects",
    value: "3",
    change: "+2 from last month",
    icon: BarChart3,
  },
  {
    title: "Team Members",
    value: "23",
    change: "+5 from last month",
    icon: Users,
  },
  {
    title: "Completed Stories",
    value: "123",
    change: "+18 this sprint",
    icon: TrendingUp,
  },
  {
    title: "Sprint Velocity",
    value: "42",
    change: "+8% improvement",
    icon: Calendar,
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case "Planned":
      return "bg-warning text-warning-foreground";
    case "Ongoing":
      return "bg-info text-info-foreground";
    case "Completed":
      return "bg-success text-success-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your projects.
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Projects Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Projects Overview</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects..."
                    className="pl-8 w-[200px]"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[120px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="planned">Planned</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold">{project.name}</h3>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <span>Started: {project.startDate}</span>
                      <span>{project.team} team members</span>
                      <span>{project.sprints} sprints</span>
                      <span>{project.stories} stories</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right min-w-[100px]">
                      <div className="text-sm font-medium">
                        {project.progress}% Complete
                      </div>
                      <Progress
                        value={project.progress}
                        className="w-20 mt-1"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
