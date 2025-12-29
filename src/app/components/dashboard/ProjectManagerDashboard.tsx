import { useState } from "react";
import {
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertTriangle,
  TrendingUp,
  Users,
  Package,
  Calendar,
  Filter,
  Search,
  ChevronRight,
  Flag,
  User,
  ArrowUpRight,
  Bell,
  ListTodo,
  AlertCircle,
  FolderKanban,
  FileText,
  MoreVertical,
  ArrowRight,
  UserPlus,
  Send
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { NavigationBar } from "../navigation/NavigationBar";

interface Project {
  id: string;
  name: string;
  status: "on-track" | "at-risk" | "delayed";
  progress: number;
  team: string[];
  dueDate: string;
  tasksTotal: number;
  tasksCompleted: number;
}

interface ClientInquiry {
  id: string;
  client: string;
  title: string;
  priority: "high" | "medium" | "low";
  dateReceived: string;
  needsReview: boolean;
}

interface Task {
  id: string;
  title: string;
  project: string;
  priority: "high" | "medium" | "low";
  estimatedHours: number;
  skills: string[];
}

interface VersionStatus {
  version: string;
  status: "development" | "testing" | "staging" | "production";
  releaseDate: string;
  features: number;
  bugs: number;
  progress: number;
}

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Mobile App Redesign",
    status: "on-track",
    progress: 75,
    team: ["JD", "SM", "AK"],
    dueDate: "2024-03-15",
    tasksTotal: 24,
    tasksCompleted: 18
  },
  {
    id: "2",
    name: "API Integration v3",
    status: "at-risk",
    progress: 45,
    team: ["RW", "LM"],
    dueDate: "2024-03-01",
    tasksTotal: 16,
    tasksCompleted: 7
  },
  {
    id: "3",
    name: "Dashboard Analytics",
    status: "on-track",
    progress: 90,
    team: ["EM", "JD", "TC"],
    dueDate: "2024-02-28",
    tasksTotal: 12,
    tasksCompleted: 11
  },
  {
    id: "4",
    name: "Security Audit",
    status: "delayed",
    progress: 30,
    team: ["RW"],
    dueDate: "2024-02-20",
    tasksTotal: 8,
    tasksCompleted: 2
  }
];

const mockInquiries: ClientInquiry[] = [
  {
    id: "1",
    client: "Acme Corp",
    title: "Add bulk export functionality",
    priority: "high",
    dateReceived: "2024-02-22",
    needsReview: true
  },
  {
    id: "2",
    client: "TechStart Inc",
    title: "Custom branding options",
    priority: "medium",
    dateReceived: "2024-02-21",
    needsReview: true
  },
  {
    id: "3",
    client: "Global Systems",
    title: "Multi-language support",
    priority: "high",
    dateReceived: "2024-02-20",
    needsReview: true
  },
  {
    id: "4",
    client: "DataFlow Ltd",
    title: "Improve loading times",
    priority: "medium",
    dateReceived: "2024-02-19",
    needsReview: false
  }
];

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Implement OAuth 2.0 authentication",
    project: "API Integration v3",
    priority: "high",
    estimatedHours: 16,
    skills: ["Backend", "Security"]
  },
  {
    id: "2",
    title: "Design data export UI",
    project: "Mobile App Redesign",
    priority: "high",
    estimatedHours: 8,
    skills: ["UI/UX", "Frontend"]
  },
  {
    id: "3",
    title: "Write API documentation",
    project: "API Integration v3",
    priority: "medium",
    estimatedHours: 12,
    skills: ["Technical Writing"]
  },
  {
    id: "4",
    title: "Set up automated testing",
    project: "Dashboard Analytics",
    priority: "medium",
    estimatedHours: 20,
    skills: ["QA", "DevOps"]
  }
];

const mockVersions: VersionStatus[] = [
  {
    version: "v2.4.0",
    status: "development",
    releaseDate: "2024-03-15",
    features: 12,
    bugs: 3,
    progress: 65
  },
  {
    version: "v2.3.1",
    status: "testing",
    releaseDate: "2024-02-28",
    features: 5,
    bugs: 8,
    progress: 85
  },
  {
    version: "v2.3.0",
    status: "production",
    releaseDate: "2024-02-10",
    features: 15,
    bugs: 0,
    progress: 100
  }
];

const statusColors = {
  "on-track": "bg-green-100 text-green-800 border-green-200",
  "at-risk": "bg-amber-100 text-amber-800 border-amber-200",
  "delayed": "bg-red-100 text-red-800 border-red-200"
};

const priorityColors = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-amber-100 text-amber-800 border-amber-200",
  low: "bg-blue-100 text-blue-800 border-blue-200"
};

const versionStatusColors = {
  development: "bg-blue-100 text-blue-800",
  testing: "bg-amber-100 text-amber-800",
  staging: "bg-purple-100 text-purple-800",
  production: "bg-green-100 text-green-800"
};

export function ProjectManagerDashboard({
  userEmail,
  onLogout,
  onNavigate,
  currentView = "dashboard"
}: {
  userEmail: string;
  onLogout: () => void;
  onNavigate?: (view: string) => void;
  currentView?: string;
}) {
  const [projects] = useState<Project[]>(mockProjects);
  const [inquiries] = useState<ClientInquiry[]>(mockInquiries);
  const [tasks] = useState<Task[]>(mockTasks);
  const [versions] = useState<VersionStatus[]>(mockVersions);

  const needsReviewCount = inquiries.filter(i => i.needsReview).length;
  const unassignedTasksCount = tasks.length;
  const atRiskProjects = projects.filter(p => p.status === "at-risk" || p.status === "delayed").length;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <NavigationBar
        userRole="project-manager"
        userEmail={userEmail}
        onLogout={onLogout}
        onNavigate={onNavigate}
        currentView={currentView}
        showNavigation={true}
      />

      {/* Header with Notifications */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900 mb-1">Project Manager Dashboard</h1>
              <p className="text-gray-600">Overview of all projects, tasks, and client requests</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="h-5 w-5 text-gray-600" />
                {(needsReviewCount + unassignedTasksCount) > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                )}
              </button>
              <Avatar>
                <AvatarFallback className="bg-blue-600 text-white">PM</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        {/* Alert Cards for Urgent Items */}
        {(needsReviewCount > 0 || unassignedTasksCount > 0 || atRiskProjects > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {needsReviewCount > 0 && (
              <Card className="border-l-4 border-l-blue-600 bg-blue-50">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-700 mb-1">Inquiries Need Review</p>
                      <p className="text-2xl font-bold text-blue-900">{needsReviewCount}</p>
                    </div>
                    <MessageSquare className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            )}

            {unassignedTasksCount > 0 && (
              <Card className="border-l-4 border-l-amber-600 bg-amber-50">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-amber-700 mb-1">Tasks Awaiting Assignment</p>
                      <p className="text-2xl font-bold text-amber-900">{unassignedTasksCount}</p>
                    </div>
                    <ListTodo className="h-8 w-8 text-amber-600" />
                  </div>
                </CardContent>
              </Card>
            )}

            {atRiskProjects > 0 && (
              <Card className="border-l-4 border-l-red-600 bg-red-50">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-red-700 mb-1">Projects At Risk</p>
                      <p className="text-2xl font-bold text-red-900">{atRiskProjects}</p>
                    </div>
                    <AlertCircle className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Active Projects - Takes 2 columns */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FolderKanban className="h-5 w-5 text-blue-600" />
                      Active Projects
                    </CardTitle>
                    <CardDescription>Monitor progress and identify issues</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{project.name}</h3>
                            <Badge className={`${statusColors[project.status]} border`}>
                              {project.status === "on-track" && "On Track"}
                              {project.status === "at-risk" && "At Risk"}
                              {project.status === "delayed" && "Delayed"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Due {new Date(project.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                            </span>
                            <span>
                              {project.tasksCompleted}/{project.tasksTotal} tasks
                            </span>
                          </div>
                        </div>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <MoreVertical className="h-5 w-5 text-gray-400" />
                        </button>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium text-gray-900">{project.progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all ${
                              project.status === "on-track" ? "bg-green-600" :
                              project.status === "at-risk" ? "bg-amber-600" :
                              "bg-red-600"
                            }`}
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Team Members */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          <div className="flex -space-x-2">
                            {project.team.map((member, idx) => (
                              <Avatar key={idx} className="h-7 w-7 border-2 border-white">
                                <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                                  {member}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          View Details
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Version Status - Takes 1 column */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-blue-600" />
                  Version Status
                </CardTitle>
                <CardDescription>Current release pipeline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {versions.map((version) => (
                    <div key={version.version} className="pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">{version.version}</span>
                        <Badge className={versionStatusColors[version.status]}>
                          {version.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <div className="flex items-center justify-between mb-1">
                          <span>Release: {new Date(version.releaseDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3 text-green-600" />
                            {version.features} features
                          </span>
                          {version.bugs > 0 && (
                            <span className="flex items-center gap-1">
                              <AlertCircle className="h-3 w-3 text-red-600" />
                              {version.bugs} bugs
                            </span>
                          )}
                        </div>
                      </div>
                      {version.status !== "production" && (
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 transition-all"
                            style={{ width: `${version.progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Assign Team Member
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FolderKanban className="h-4 w-4 mr-2" />
                  Create New Project
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Send className="h-4 w-4 mr-2" />
                  Send Update to Client
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section: Inquiries and Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Client Inquiries */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    Client Inquiries
                    {needsReviewCount > 0 && (
                      <Badge className="bg-red-100 text-red-800">{needsReviewCount} new</Badge>
                    )}
                  </CardTitle>
                  <CardDescription>Review and assign incoming requests</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {inquiries.slice(0, 4).map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className={`p-3 border rounded-lg ${inquiry.needsReview ? "border-blue-300 bg-blue-50" : "border-gray-200"}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">{inquiry.client}</span>
                          <Badge className={`${priorityColors[inquiry.priority]} border text-xs`}>
                            {inquiry.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700">{inquiry.title}</p>
                      </div>
                      {inquiry.needsReview && (
                        <span className="flex items-center gap-1 text-xs text-blue-700 font-medium whitespace-nowrap ml-2">
                          <Clock className="h-3 w-3" />
                          Review
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Received {new Date(inquiry.dateReceived).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          Review
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          Convert to Task
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tasks Awaiting Assignment */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <ListTodo className="h-5 w-5 text-blue-600" />
                    Tasks Awaiting Assignment
                    {unassignedTasksCount > 0 && (
                      <Badge className="bg-amber-100 text-amber-800">{unassignedTasksCount}</Badge>
                    )}
                  </CardTitle>
                  <CardDescription>Assign to team members</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900 text-sm">{task.title}</span>
                          <Badge className={`${priorityColors[task.priority]} border text-xs`}>
                            {task.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{task.project}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {task.estimatedHours}h
                          </span>
                          <span className="flex gap-1 flex-wrap">
                            {task.skills.map((skill, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-gray-100 rounded text-gray-700">
                                {skill}
                              </span>
                            ))}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button size="sm" className="h-7 text-xs">
                        <UserPlus className="h-3 w-3 mr-1" />
                        Assign
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}