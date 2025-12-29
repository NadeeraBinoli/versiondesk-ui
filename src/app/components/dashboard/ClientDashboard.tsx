import { useState } from "react";
import {
  MessageSquare,
  Send,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Filter,
  Search,
  Flag,
  User,
  X
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { NavigationBar } from "../navigation/NavigationBar";

interface Inquiry {
  id: string;
  inquiryId: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in-progress" | "completed" | "rejected";
  dateSubmitted: string;
  lastUpdated: string;
}

const mockInquiries: Inquiry[] = [
  {
    id: "1",
    inquiryId: "INQ-001",
    title: "Add dark mode to mobile app",
    description: "It would be great to have a dark mode option for better viewing at night.",
    priority: "medium",
    status: "completed",
    dateSubmitted: "2024-01-15",
    lastUpdated: "2024-02-10"
  },
  {
    id: "2",
    inquiryId: "INQ-002",
    title: "Export reports to PDF format",
    description: "Need ability to export monthly reports as PDF files for sharing with team.",
    priority: "high",
    status: "in-progress",
    dateSubmitted: "2024-02-01",
    lastUpdated: "2024-02-15"
  },
  {
    id: "3",
    inquiryId: "INQ-003",
    title: "Improve search functionality",
    description: "Search is sometimes slow and doesn't find all relevant results.",
    priority: "medium",
    status: "in-progress",
    dateSubmitted: "2024-02-10",
    lastUpdated: "2024-02-15"
  },
  {
    id: "4",
    inquiryId: "INQ-004",
    title: "Email notifications for updates",
    description: "Would like to receive email notifications when there are important updates.",
    priority: "low",
    status: "pending",
    dateSubmitted: "2024-02-18",
    lastUpdated: "2024-02-18"
  }
];

const statusConfig = {
  pending: {
    label: "Pending Review",
    color: "text-amber-700 bg-amber-50 border-amber-200",
    icon: Clock,
    iconColor: "text-amber-600"
  },
  "in-progress": {
    label: "In Progress",
    color: "text-blue-700 bg-blue-50 border-blue-200",
    icon: AlertCircle,
    iconColor: "text-blue-600"
  },
  completed: {
    label: "Completed",
    color: "text-green-700 bg-green-50 border-green-200",
    icon: CheckCircle2,
    iconColor: "text-green-600"
  },
  rejected: {
    label: "Rejected",
    color: "text-red-700 bg-red-50 border-red-200",
    icon: Flag,
    iconColor: "text-red-600"
  }
};

export function ClientDashboard({ userEmail, onLogout }: { userEmail: string; onLogout: () => void }) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(mockInquiries);
  const [showModal, setShowModal] = useState(false);
  const [newInquiry, setNewInquiry] = useState({ title: "", description: "" });
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const validateForm = () => {
    const newErrors: { title?: string; description?: string } = {};

    if (!newInquiry.title.trim()) {
      newErrors.title = "Please enter a title for your inquiry";
    }

    if (!newInquiry.description.trim()) {
      newErrors.description = "Please provide some details about your inquiry";
    } else if (newInquiry.description.trim().length < 10) {
      newErrors.description = "Please provide more details (at least 10 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitInquiry = () => {
    if (validateForm()) {
      const inquiry: Inquiry = {
        id: Date.now().toString(),
        inquiryId: `INQ-${Date.now().toString().slice(-3)}`,
        title: newInquiry.title,
        description: newInquiry.description,
        priority: "medium",
        status: "pending",
        dateSubmitted: new Date().toISOString().split("T")[0],
        lastUpdated: new Date().toISOString().split("T")[0]
      };

      setInquiries([inquiry, ...inquiries]);
      setNewInquiry({ title: "", description: "" });
      setShowModal(false);
      setErrors({});
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setNewInquiry({ title: "", description: "" });
    setErrors({});
  };

  const pendingCount = inquiries.filter(i => i.status === "pending").length;
  const inProgressCount = inquiries.filter(i => i.status === "in-progress").length;
  const completedCount = inquiries.filter(i => i.status === "completed").length;
  const rejectedCount = inquiries.filter(i => i.status === "rejected").length;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <NavigationBar
        userRole="client"
        userEmail={userEmail}
        onLogout={onLogout}
        showNavigation={false}
      />

      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900 mb-1">My Inquiries</h1>
              <p className="text-gray-600">Track your feature requests and feedback</p>
            </div>
            <Button onClick={() => setShowModal(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Submit New Inquiry
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        {/* Status Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-amber-700 mb-1">Pending Review</p>
                  <p className="text-3xl font-bold text-amber-900">{pendingCount}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700 mb-1">In Progress</p>
                  <p className="text-3xl font-bold text-blue-900">{inProgressCount}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700 mb-1">Completed</p>
                  <p className="text-3xl font-bold text-green-900">{completedCount}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-gradient-to-br from-red-50 to-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-700 mb-1">Rejected</p>
                  <p className="text-3xl font-bold text-red-900">{rejectedCount}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                  <Flag className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inquiries List */}
        <div className="space-y-4">
          {inquiries.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">No inquiries yet</p>
                <p className="text-sm text-gray-500 mb-4">
                  Submit your first inquiry to get started!
                </p>
                <Button onClick={() => setShowModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Submit New Inquiry
                </Button>
              </CardContent>
            </Card>
          ) : (
            inquiries.map((inquiry) => {
              const config = statusConfig[inquiry.status];
              const StatusIcon = config.icon;

              return (
                <Card key={inquiry.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{inquiry.title}</CardTitle>
                        <CardDescription>{inquiry.description}</CardDescription>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium whitespace-nowrap ${config.color}`}>
                        <StatusIcon className={`h-4 w-4 ${config.iconColor}`} />
                        {config.label}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 mb-1">Date Submitted</p>
                        <p className="text-gray-900 font-medium">
                          {new Date(inquiry.dateSubmitted).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Last Updated</p>
                        <p className="text-gray-900 font-medium">
                          {new Date(inquiry.lastUpdated).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Priority</p>
                        <Badge
                          className={`text-sm font-medium ${
                            inquiry.priority === "high"
                              ? "bg-red-500 text-white"
                              : inquiry.priority === "medium"
                              ? "bg-yellow-500 text-black"
                              : "bg-green-500 text-white"
                          }`}
                        >
                          {inquiry.priority ? inquiry.priority.charAt(0).toUpperCase() + inquiry.priority.slice(1) : "Medium"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </main>

      {/* Submit Inquiry Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCancel();
          }}
        >
          <Card className="w-full max-w-2xl shadow-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Submit New Inquiry</CardTitle>
                  <CardDescription>
                    Tell us about a feature you'd like to see or feedback you have
                  </CardDescription>
                </div>
                <button
                  onClick={handleCancel}
                  className="h-8 w-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="inquiry-title">
                    What would you like to request? <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="inquiry-title"
                    placeholder="e.g., Add export to Excel feature"
                    value={newInquiry.title}
                    onChange={(e) => {
                      setNewInquiry({ ...newInquiry, title: e.target.value });
                      if (errors.title) setErrors({ ...errors, title: undefined });
                    }}
                    className={errors.title ? "border-red-500" : ""}
                    aria-invalid={errors.title ? "true" : "false"}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.title}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inquiry-description">
                    Please provide more details <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="inquiry-description"
                    placeholder="Describe your request in detail. How would this help you?"
                    value={newInquiry.description}
                    onChange={(e) => {
                      setNewInquiry({ ...newInquiry, description: e.target.value });
                      if (errors.description) setErrors({ ...errors, description: undefined });
                    }}
                    className={errors.description ? "border-red-500 min-h-[120px]" : "min-h-[120px]"}
                    aria-invalid={errors.description ? "true" : "false"}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <strong>What happens next?</strong> Our team will review your inquiry and update you on its status. 
                    You'll be notified when it's included in an upcoming version.
                  </p>
                </div>

                <div className="flex gap-3 justify-end pt-4">
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmitInquiry} className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Submit Inquiry
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}