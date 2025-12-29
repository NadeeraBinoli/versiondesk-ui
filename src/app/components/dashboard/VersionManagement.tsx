import { useState } from "react";
import {
  Package,
  ChevronDown,
  ChevronUp,
  Calendar,
  CheckCircle2,
  Clock,
  GitBranch,
  Tag,
  MessageSquare,
  FileText,
  Users,
  Link2,
  Download,
  Eye,
  TrendingUp,
  AlertCircle,
  Sparkles,
  Hash,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface Inquiry {
  id: string;
  inquiryId: string;
  title: string;
  client: string;
  priority: "high" | "medium" | "low";
}

interface Task {
  id: string;
  taskId: string;
  title: string;
  assignedTo: string;
  status: "completed" | "in-progress";
  linkedInquiry?: string;
}

interface Version {
  version: string;
  releaseDate: string;
  status: "production" | "staging" | "testing" | "development";
  type: "major" | "minor" | "patch";
  inquiries: Inquiry[];
  tasks: Task[];
  downloads: number;
  bugFixes: number;
  features: number;
  improvements: number;
  releaseNotes: string;
}

const mockVersions: Version[] = [
  {
    version: "v2.4.0",
    releaseDate: "2024-03-15",
    status: "development",
    type: "minor",
    inquiries: [
      {
        id: "1",
        inquiryId: "INQ-1267",
        title: "Add bulk export functionality for reports",
        client: "Acme Corp",
        priority: "high"
      },
      {
        id: "2",
        inquiryId: "INQ-1256",
        title: "Add email notifications",
        client: "TechStart Inc",
        priority: "medium"
      },
      {
        id: "3",
        inquiryId: "INQ-1250",
        title: "Improve search functionality",
        client: "Global Systems",
        priority: "medium"
      }
    ],
    tasks: [
      {
        id: "1",
        taskId: "TASK-1267",
        title: "Implement bulk export API",
        assignedTo: "Sarah Mitchell",
        status: "in-progress",
        linkedInquiry: "INQ-1267"
      },
      {
        id: "2",
        taskId: "TASK-1256",
        title: "Build email notification service",
        assignedTo: "John Davis",
        status: "in-progress",
        linkedInquiry: "INQ-1256"
      },
      {
        id: "3",
        taskId: "TASK-1250",
        title: "Optimize search algorithm",
        assignedTo: "Emily Chen",
        status: "in-progress",
        linkedInquiry: "INQ-1250"
      }
    ],
    downloads: 0,
    bugFixes: 3,
    features: 3,
    improvements: 2,
    releaseNotes: "Major feature release with bulk export, email notifications, and improved search."
  },
  {
    version: "v2.3.1",
    releaseDate: "2024-02-28",
    status: "testing",
    type: "patch",
    inquiries: [
      {
        id: "4",
        inquiryId: "INQ-1189",
        title: "Fix mobile responsive issues",
        client: "DataFlow Ltd",
        priority: "high"
      }
    ],
    tasks: [
      {
        id: "4",
        taskId: "TASK-1189",
        title: "Fix mobile layout bugs",
        assignedTo: "Ryan White",
        status: "completed",
        linkedInquiry: "INQ-1189"
      }
    ],
    downloads: 125,
    bugFixes: 8,
    features: 0,
    improvements: 5,
    releaseNotes: "Critical bug fixes for mobile responsiveness and performance improvements."
  },
  {
    version: "v2.3.0",
    releaseDate: "2024-02-10",
    status: "production",
    type: "minor",
    inquiries: [
      {
        id: "5",
        inquiryId: "INQ-1198",
        title: "Add dark mode to mobile app",
        client: "Acme Corp",
        priority: "medium"
      },
      {
        id: "6",
        inquiryId: "INQ-1201",
        title: "Export reports to PDF format",
        client: "TechStart Inc",
        priority: "high"
      },
      {
        id: "7",
        inquiryId: "INQ-1190",
        title: "Multi-language support",
        client: "Global Systems",
        priority: "medium"
      }
    ],
    tasks: [
      {
        id: "5",
        taskId: "TASK-1198",
        title: "Implement dark mode theme",
        assignedTo: "John Davis",
        status: "completed",
        linkedInquiry: "INQ-1198"
      },
      {
        id: "6",
        taskId: "TASK-1201",
        title: "Add PDF export library",
        assignedTo: "Alex Kim",
        status: "completed",
        linkedInquiry: "INQ-1201"
      },
      {
        id: "7",
        taskId: "TASK-1190",
        title: "Implement i18n framework",
        assignedTo: "Emily Chen",
        status: "completed",
        linkedInquiry: "INQ-1190"
      }
    ],
    downloads: 1847,
    bugFixes: 5,
    features: 15,
    improvements: 8,
    releaseNotes: "Feature-rich release with dark mode, PDF exports, and internationalization."
  },
  {
    version: "v2.2.0",
    releaseDate: "2024-01-15",
    status: "production",
    type: "minor",
    inquiries: [
      {
        id: "8",
        inquiryId: "INQ-1167",
        title: "Add team collaboration features",
        client: "DataFlow Ltd",
        priority: "high"
      },
      {
        id: "9",
        inquiryId: "INQ-1145",
        title: "Improve data visualization charts",
        client: "Acme Corp",
        priority: "medium"
      }
    ],
    tasks: [
      {
        id: "8",
        taskId: "TASK-1167",
        title: "Build real-time collaboration",
        assignedTo: "Sarah Mitchell",
        status: "completed",
        linkedInquiry: "INQ-1167"
      },
      {
        id: "9",
        taskId: "TASK-1145",
        title: "Integrate Recharts library",
        assignedTo: "Tom Chen",
        status: "completed",
        linkedInquiry: "INQ-1145"
      }
    ],
    downloads: 2341,
    bugFixes: 12,
    features: 8,
    improvements: 10,
    releaseNotes: "Enhanced collaboration tools and improved data visualization capabilities."
  }
];

const statusConfig = {
  production: {
    label: "Production",
    color: "bg-green-100 text-green-800 border-green-300",
    icon: CheckCircle2,
    dotColor: "bg-green-500"
  },
  staging: {
    label: "Staging",
    color: "bg-purple-100 text-purple-800 border-purple-300",
    icon: GitBranch,
    dotColor: "bg-purple-500"
  },
  testing: {
    label: "Testing",
    color: "bg-amber-100 text-amber-800 border-amber-300",
    icon: AlertCircle,
    dotColor: "bg-amber-500"
  },
  development: {
    label: "Development",
    color: "bg-blue-100 text-blue-800 border-blue-300",
    icon: Clock,
    dotColor: "bg-blue-500"
  }
};

const priorityConfig = {
  high: { color: "bg-red-100 text-red-800 border-red-200" },
  medium: { color: "bg-amber-100 text-amber-800 border-amber-200" },
  low: { color: "bg-blue-100 text-blue-800 border-blue-200" }
};

export function VersionManagement() {
  const [expandedVersions, setExpandedVersions] = useState<Set<string>>(new Set(["v2.4.0"]));
  const [selectedInquiry, setSelectedInquiry] = useState<string | null>(null);

  const toggleVersion = (version: string) => {
    const newExpanded = new Set(expandedVersions);
    if (newExpanded.has(version)) {
      newExpanded.delete(version);
    } else {
      newExpanded.add(version);
    }
    setExpandedVersions(newExpanded);
  };

  const handleInquiryHover = (inquiryId: string | null) => {
    setSelectedInquiry(inquiryId);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900 mb-1">Version Management</h1>
              <p className="text-gray-600">Track software versions and feature traceability</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-green-100 text-green-800 border-green-300">
                <Link2 className="h-3 w-3 mr-1" />
                Full Traceability
              </Badge>
              <Button>
                <Package className="h-4 w-4 mr-2" />
                Create New Version
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        {/* Current Version Highlight */}
        <Card className="mb-6 border-2 border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Current Development Version</CardTitle>
                  <CardDescription className="text-base">In active development</CardDescription>
                </div>
              </div>
              <Badge className="text-lg px-4 py-2 bg-blue-600 text-white border-0">
                v2.4.0
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
                <Sparkles className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{mockVersions[0].features}</p>
                <p className="text-sm text-gray-600">New Features</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                <CheckCircle2 className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{mockVersions[0].bugFixes}</p>
                <p className="text-sm text-gray-600">Bug Fixes</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-purple-200">
                <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{mockVersions[0].improvements}</p>
                <p className="text-sm text-gray-600">Improvements</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                <Calendar className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                <p className="text-sm font-bold text-gray-900">
                  {new Date(mockVersions[0].releaseDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </p>
                <p className="text-sm text-gray-600">Target Release</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Traceability Legend */}
        <Card className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Link2 className="h-5 w-5 text-purple-600" />
                <span className="font-semibold text-gray-900">Traceability Map:</span>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-blue-600" />
                  <span className="text-gray-700">Client Inquiry</span>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-purple-600" />
                  <span className="text-gray-700">Development Task</span>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-green-600" />
                  <span className="text-gray-700">Version Release</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Version Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500"></div>

          {/* Version Cards */}
          <div className="space-y-6">
            {mockVersions.map((version, index) => {
              const isExpanded = expandedVersions.has(version.version);
              const statusInfo = statusConfig[version.status];
              const StatusIcon = statusInfo.icon;

              return (
                <div key={version.version} className="relative pl-20">
                  {/* Timeline Node */}
                  <div className="absolute left-0 top-6 flex items-center">
                    <div className={`h-16 w-16 rounded-full ${statusInfo.color} border-4 border-white shadow-lg flex items-center justify-center`}>
                      <StatusIcon className="h-7 w-7" />
                    </div>
                  </div>

                  <Card className={`${isExpanded ? "shadow-xl border-2 border-blue-300" : "shadow-md hover:shadow-lg"} transition-all`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-xl">{version.version}</CardTitle>
                            <Badge className={`${statusInfo.color} border`}>
                              {statusInfo.label}
                            </Badge>
                            <Badge variant="outline" className="capitalize">
                              {version.type} Release
                            </Badge>
                          </div>
                          <CardDescription>{version.releaseNotes}</CardDescription>
                          <div className="flex items-center gap-4 mt-3 text-sm">
                            <div className="flex items-center gap-1 text-gray-600">
                              <Calendar className="h-4 w-4" />
                              {new Date(version.releaseDate).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric"
                              })}
                            </div>
                            {version.downloads > 0 && (
                              <div className="flex items-center gap-1 text-gray-600">
                                <Download className="h-4 w-4" />
                                {version.downloads.toLocaleString()} downloads
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleVersion(version.version)}
                          >
                            {isExpanded ? (
                              <>
                                <ChevronUp className="h-4 w-4 mr-2" />
                                Collapse
                              </>
                            ) : (
                              <>
                                <ChevronDown className="h-4 w-4 mr-2" />
                                Expand
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <CardContent>
                        {/* Stats Row */}
                        <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">{version.features}</p>
                            <p className="text-sm text-gray-600">Features</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-red-600">{version.bugFixes}</p>
                            <p className="text-sm text-gray-600">Bug Fixes</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">{version.improvements}</p>
                            <p className="text-sm text-gray-600">Improvements</p>
                          </div>
                        </div>

                        {/* Traceability Mapping */}
                        <div className="space-y-6">
                          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                            <Link2 className="h-5 w-5 text-purple-600" />
                            Inquiry → Task Traceability
                          </h4>

                          {/* Inquiry-Task Pairs */}
                          {version.inquiries.map((inquiry) => {
                            const linkedTask = version.tasks.find(t => t.linkedInquiry === inquiry.inquiryId);
                            const isHighlighted = selectedInquiry === inquiry.inquiryId;

                            return (
                              <div
                                key={inquiry.id}
                                className={`relative p-4 rounded-lg border-2 transition-all ${
                                  isHighlighted
                                    ? "border-purple-400 bg-purple-50 shadow-md"
                                    : "border-gray-200 bg-white hover:border-gray-300"
                                }`}
                              >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  {/* Inquiry Card */}
                                  <div
                                    className={`p-4 rounded-lg border-2 transition-all ${
                                      isHighlighted
                                        ? "border-blue-400 bg-blue-50"
                                        : "border-blue-200 bg-blue-50/50"
                                    }`}
                                    onMouseEnter={() => handleInquiryHover(inquiry.inquiryId)}
                                    onMouseLeave={() => handleInquiryHover(null)}
                                  >
                                    <div className="flex items-start gap-3 mb-3">
                                      <MessageSquare className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                                          <Badge className="bg-blue-600 text-white font-mono text-xs">
                                            <Hash className="h-3 w-3 mr-1" />
                                            {inquiry.inquiryId}
                                          </Badge>
                                          <Badge className={`${priorityConfig[inquiry.priority].color} border text-xs`}>
                                            {inquiry.priority}
                                          </Badge>
                                        </div>
                                        <p className="font-medium text-gray-900 text-sm mb-2">{inquiry.title}</p>
                                        <div className="flex items-center gap-2 text-xs text-gray-600">
                                          <Users className="h-3 w-3" />
                                          <span>{inquiry.client}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Connection Arrow */}
                                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center z-10">
                                    <div className={`h-12 w-12 rounded-full ${isHighlighted ? "bg-purple-500" : "bg-gray-300"} flex items-center justify-center border-4 border-white shadow-lg transition-all`}>
                                      <ArrowRight className={`h-6 w-6 ${isHighlighted ? "text-white" : "text-gray-600"}`} />
                                    </div>
                                  </div>

                                  {/* Task Card */}
                                  {linkedTask ? (
                                    <div
                                      className={`p-4 rounded-lg border-2 transition-all ${
                                        isHighlighted
                                          ? "border-purple-400 bg-purple-50"
                                          : "border-purple-200 bg-purple-50/50"
                                      }`}
                                      onMouseEnter={() => handleInquiryHover(inquiry.inquiryId)}
                                      onMouseLeave={() => handleInquiryHover(null)}
                                    >
                                      <div className="flex items-start gap-3 mb-3">
                                        <FileText className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                                            <Badge className="bg-purple-600 text-white font-mono text-xs">
                                              <Hash className="h-3 w-3 mr-1" />
                                              {linkedTask.taskId}
                                            </Badge>
                                            <Badge className={`${
                                              linkedTask.status === "completed"
                                                ? "bg-green-100 text-green-800 border-green-300"
                                                : "bg-amber-100 text-amber-800 border-amber-300"
                                            } border text-xs`}>
                                              {linkedTask.status === "completed" ? (
                                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                              ) : (
                                                <Clock className="h-3 w-3 mr-1" />
                                              )}
                                              {linkedTask.status}
                                            </Badge>
                                          </div>
                                          <p className="font-medium text-gray-900 text-sm mb-2">{linkedTask.title}</p>
                                          <div className="flex items-center gap-2">
                                            <Avatar className="h-5 w-5">
                                              <AvatarFallback className="text-xs bg-purple-100 text-purple-700">
                                                {linkedTask.assignedTo.split(' ').map(n => n[0]).join('')}
                                              </AvatarFallback>
                                            </Avatar>
                                            <span className="text-xs text-gray-600">{linkedTask.assignedTo}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="p-4 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
                                      <p className="text-sm text-gray-500">No linked task</p>
                                    </div>
                                  )}
                                </div>

                                {/* Linking Indicator */}
                                {linkedTask && (
                                  <div className="mt-3 pt-3 border-t border-gray-200 flex items-center gap-2 text-xs text-gray-600">
                                    <Link2 className="h-3 w-3 text-green-600" />
                                    <span>
                                      <span className="font-mono font-semibold">{inquiry.inquiryId}</span>
                                      {" → "}
                                      <span className="font-mono font-semibold">{linkedTask.taskId}</span>
                                      {" → "}
                                      <span className="font-mono font-semibold">{version.version}</span>
                                    </span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary Statistics */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Traceability Summary</CardTitle>
            <CardDescription>Overall system metrics across all versions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <MessageSquare className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">
                  {mockVersions.reduce((sum, v) => sum + v.inquiries.length, 0)}
                </p>
                <p className="text-sm text-gray-600">Total Inquiries</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                <FileText className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">
                  {mockVersions.reduce((sum, v) => sum + v.tasks.length, 0)}
                </p>
                <p className="text-sm text-gray-600">Total Tasks</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <Package className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{mockVersions.length}</p>
                <p className="text-sm text-gray-600">Versions</p>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-lg border border-amber-200">
                <Link2 className="h-6 w-6 text-amber-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">100%</p>
                <p className="text-sm text-gray-600">Traceability</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
