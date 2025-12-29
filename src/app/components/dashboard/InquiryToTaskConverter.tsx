import { useState } from "react";
import {
  ArrowRight,
  Link2,
  MessageSquare,
  User,
  Calendar,
  Flag,
  Clock,
  Tag,
  Users,
  CheckCircle2,
  AlertCircle,
  FileText,
  Hash,
  ArrowLeft,
  Sparkles
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface Inquiry {
  id: string;
  inquiryId: string;
  client: {
    name: string;
    company: string;
    email: string;
  };
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  dateSubmitted: string;
  category: string;
  estimatedImpact: string;
}

interface TaskForm {
  title: string;
  description: string;
  assignedTo: string;
  priority: "high" | "medium" | "low";
  estimatedHours: string;
  dueDate: string;
  tags: string[];
  status: "todo" | "in-progress" | "review" | "done";
}

const mockInquiry: Inquiry = {
  id: "1",
  inquiryId: "INQ-1267",
  client: {
    name: "Sarah Johnson",
    company: "Acme Corporation",
    email: "sarah.johnson@acme.com"
  },
  title: "Add bulk export functionality for reports",
  description: "Our team needs the ability to export multiple reports at once in various formats (PDF, Excel, CSV). Currently, we have to export each report individually which is very time-consuming when dealing with monthly reporting. We typically need to export 20-30 reports at the end of each month. This feature would save us several hours of manual work.",
  priority: "high",
  dateSubmitted: "2024-02-20",
  category: "Feature Request",
  estimatedImpact: "High - affects 50+ users daily"
};

const priorityConfig = {
  high: { label: "High", color: "bg-red-100 text-red-800 border-red-300" },
  medium: { label: "Medium", color: "bg-amber-100 text-amber-800 border-amber-300" },
  low: { label: "Low", color: "bg-blue-100 text-blue-800 border-blue-300" }
};

const teamMembers = [
  { id: "1", name: "Sarah Mitchell", initials: "SM", role: "Backend Developer" },
  { id: "2", name: "John Davis", initials: "JD", role: "Full Stack Developer" },
  { id: "3", name: "Alex Kim", initials: "AK", role: "Frontend Developer" },
  { id: "4", name: "Emily Chen", initials: "EC", role: "Backend Developer" },
  { id: "5", name: "Ryan White", initials: "RW", role: "DevOps Engineer" }
];

const suggestedTags = ["Backend", "Frontend", "Feature", "Bug Fix", "UI/UX", "Performance", "Security", "API"];

export function InquiryToTaskConverter() {
  const [inquiry] = useState<Inquiry>(mockInquiry);
  const [showSuccess, setShowSuccess] = useState(false);
  const [taskForm, setTaskForm] = useState<TaskForm>({
    title: inquiry.title,
    description: "",
    assignedTo: "",
    priority: inquiry.priority,
    estimatedHours: "",
    dueDate: "",
    tags: [],
    status: "todo"
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof TaskForm, value: any) => {
    setTaskForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const toggleTag = (tag: string) => {
    setTaskForm(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const autoFillFromInquiry = () => {
    setTaskForm(prev => ({
      ...prev,
      description: `Client Request: ${inquiry.description}\n\nImplementation Notes:\n- `,
      tags: ["Feature", "Backend"]
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!taskForm.title.trim()) {
      newErrors.title = "Task title is required";
    }
    if (!taskForm.description.trim()) {
      newErrors.description = "Task description is required";
    }
    if (!taskForm.assignedTo) {
      newErrors.assignedTo = "Please assign the task to a developer";
    }
    if (!taskForm.estimatedHours || parseInt(taskForm.estimatedHours) <= 0) {
      newErrors.estimatedHours = "Please provide valid estimated hours";
    }
    if (!taskForm.dueDate) {
      newErrors.dueDate = "Please set a due date";
    }
    if (taskForm.tags.length === 0) {
      newErrors.tags = "Please select at least one tag";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateTask = () => {
    if (validateForm()) {
      setShowSuccess(true);
      // In a real app, this would create the task via API
      setTimeout(() => {
        setShowSuccess(false);
        // Navigate back or reset form
      }, 3000);
    }
  };

  const selectedMember = teamMembers.find(m => m.id === taskForm.assignedTo);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-gray-900">Convert Inquiry to Task</h1>
                <p className="text-sm text-gray-600">Create a development task from client inquiry</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800 border-green-300">
              <Link2 className="h-3 w-3 mr-1" />
              Traceability Enabled
            </Badge>
          </div>
        </div>
      </header>

      <main className="p-6">
        {/* Connection Visualization */}
        <div className="max-w-7xl mx-auto mb-6">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
            <CardContent className="py-4">
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border-2 border-blue-300">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-gray-900">Client Inquiry</span>
                  <Badge className="bg-blue-600 text-white font-mono">{inquiry.inquiryId}</Badge>
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-1 w-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded"></div>
                  <ArrowRight className="h-6 w-6 text-purple-600 animate-pulse" />
                  <div className="h-1 w-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded"></div>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border-2 border-purple-300">
                  <FileText className="h-5 w-5 text-purple-600" />
                  <span className="font-semibold text-gray-900">Development Task</span>
                  <Badge className="bg-purple-600 text-white font-mono">TASK-{inquiry.inquiryId.split('-')[1]}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content: Split View */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT SIDE: Inquiry Details */}
          <div className="space-y-4">
            <Card className="border-l-4 border-l-blue-600">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                      Client Inquiry Details
                    </CardTitle>
                    <CardDescription>Original request from client</CardDescription>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-300 font-mono">
                    <Hash className="h-3 w-3 mr-1" />
                    {inquiry.inquiryId}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Client Information */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10 bg-blue-600">
                      <AvatarFallback className="text-white">
                        {inquiry.client.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{inquiry.client.name}</p>
                      <p className="text-sm text-gray-600">{inquiry.client.company}</p>
                      <p className="text-sm text-gray-500">{inquiry.client.email}</p>
                    </div>
                  </div>
                </div>

                {/* Inquiry Title */}
                <div>
                  <Label className="text-xs text-gray-500 uppercase mb-2 block">Request Title</Label>
                  <h3 className="font-semibold text-gray-900">{inquiry.title}</h3>
                </div>

                {/* Inquiry Description */}
                <div>
                  <Label className="text-xs text-gray-500 uppercase mb-2 block">Description</Label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                      {inquiry.description}
                    </p>
                  </div>
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-gray-500 uppercase mb-2 block">Priority</Label>
                    <Badge className={`${priorityConfig[inquiry.priority].color} border`}>
                      <Flag className="h-3 w-3 mr-1" />
                      {priorityConfig[inquiry.priority].label}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 uppercase mb-2 block">Category</Label>
                    <Badge variant="outline">
                      <Tag className="h-3 w-3 mr-1" />
                      {inquiry.category}
                    </Badge>
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-gray-500 uppercase mb-2 block">Date Submitted</Label>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Calendar className="h-4 w-4" />
                    {new Date(inquiry.dateSubmitted).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-gray-500 uppercase mb-2 block">Estimated Impact</Label>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Users className="h-4 w-4" />
                    {inquiry.estimatedImpact}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Traceability Note */}
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                    <Link2 className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 mb-1">Traceability Maintained</h4>
                    <p className="text-sm text-green-800">
                      The task will be automatically linked to inquiry <span className="font-mono font-bold">{inquiry.inquiryId}</span>.
                      This ensures full traceability from client request to implementation.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT SIDE: Task Creation Form */}
          <div className="space-y-4">
            <Card className="border-l-4 border-l-purple-600">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-purple-600" />
                      Create Development Task
                    </CardTitle>
                    <CardDescription>Convert inquiry into actionable task</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={autoFillFromInquiry}
                    className="border-purple-300 text-purple-700 hover:bg-purple-50"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Auto-fill
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Task ID Preview */}
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-xs text-purple-700 uppercase mb-1 block">Task ID (Auto-generated)</Label>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-purple-600 text-white font-mono">
                          TASK-{inquiry.inquiryId.split('-')[1]}
                        </Badge>
                        <ArrowLeft className="h-4 w-4 text-purple-400" />
                        <span className="text-sm text-purple-700">Linked to {inquiry.inquiryId}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Task Title */}
                <div>
                  <Label htmlFor="task-title">
                    Task Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="task-title"
                    value={taskForm.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter task title"
                    className={errors.title ? "border-red-500" : ""}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.title}
                    </p>
                  )}
                </div>

                {/* Task Description */}
                <div>
                  <Label htmlFor="task-description">
                    Task Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="task-description"
                    value={taskForm.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe the implementation details..."
                    className={`min-h-[120px] ${errors.description ? "border-red-500" : ""}`}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Assign To */}
                <div>
                  <Label htmlFor="assign-to">
                    Assign To <span className="text-red-500">*</span>
                  </Label>
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    {teamMembers.map((member) => (
                      <button
                        key={member.id}
                        type="button"
                        onClick={() => handleInputChange("assignedTo", member.id)}
                        className={`
                          p-3 rounded-lg border-2 text-left transition-all flex items-center gap-3
                          ${taskForm.assignedTo === member.id
                            ? "border-purple-600 bg-purple-50"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                          }
                        `}
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm">{member.name}</p>
                          <p className="text-xs text-gray-500">{member.role}</p>
                        </div>
                        {taskForm.assignedTo === member.id && (
                          <CheckCircle2 className="h-5 w-5 text-purple-600" />
                        )}
                      </button>
                    ))}
                  </div>
                  {errors.assignedTo && (
                    <p className="text-sm text-red-600 flex items-center gap-1 mt-2">
                      <AlertCircle className="h-3 w-3" />
                      {errors.assignedTo}
                    </p>
                  )}
                </div>

                {/* Priority & Estimated Hours */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="priority">
                      Priority <span className="text-red-500">*</span>
                    </Label>
                    <select
                      id="priority"
                      value={taskForm.priority}
                      onChange={(e) => handleInputChange("priority", e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="high">High Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="low">Low Priority</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="estimated-hours">
                      Estimated Hours <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="estimated-hours"
                      type="number"
                      min="1"
                      value={taskForm.estimatedHours}
                      onChange={(e) => handleInputChange("estimatedHours", e.target.value)}
                      placeholder="e.g., 16"
                      className={errors.estimatedHours ? "border-red-500" : ""}
                    />
                    {errors.estimatedHours && (
                      <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.estimatedHours}
                      </p>
                    )}
                  </div>
                </div>

                {/* Due Date */}
                <div>
                  <Label htmlFor="due-date">
                    Due Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="due-date"
                    type="date"
                    value={taskForm.dueDate}
                    onChange={(e) => handleInputChange("dueDate", e.target.value)}
                    className={errors.dueDate ? "border-red-500" : ""}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {errors.dueDate && (
                    <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.dueDate}
                    </p>
                  )}
                </div>

                {/* Tags */}
                <div>
                  <Label>
                    Tags <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {suggestedTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`
                          px-3 py-1.5 rounded-full text-sm font-medium transition-all border-2
                          ${taskForm.tags.includes(tag)
                            ? "bg-purple-600 text-white border-purple-600"
                            : "bg-white text-gray-700 border-gray-300 hover:border-purple-300"
                          }
                        `}
                      >
                        {tag}
                        {taskForm.tags.includes(tag) && (
                          <CheckCircle2 className="inline h-3 w-3 ml-1" />
                        )}
                      </button>
                    ))}
                  </div>
                  {errors.tags && (
                    <p className="text-sm text-red-600 flex items-center gap-1 mt-2">
                      <AlertCircle className="h-3 w-3" />
                      {errors.tags}
                    </p>
                  )}
                </div>

                {/* Initial Status */}
                <div>
                  <Label htmlFor="status">Initial Status</Label>
                  <select
                    id="status"
                    value={taskForm.status}
                    onChange={(e) => handleInputChange("status", e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="todo">To-Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="review">Ready for Review</option>
                    <option value="done">Done</option>
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1">
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCreateTask}
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Create Task
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Success Modal */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-300">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Task Created Successfully!</h3>
                  <p className="text-gray-600 mb-4">
                    Task <span className="font-mono font-bold">TASK-{inquiry.inquiryId.split('-')[1]}</span> has been created
                    and linked to inquiry <span className="font-mono font-bold">{inquiry.inquiryId}</span>
                  </p>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
                    <p className="text-sm text-green-800">
                      <strong>Assigned to:</strong> {selectedMember?.name}
                    </p>
                    <p className="text-sm text-green-800">
                      <strong>Status:</strong> {taskForm.status === "todo" ? "To-Do" : taskForm.status}
                    </p>
                  </div>
                  <Button className="w-full">
                    View Task on Kanban Board
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
