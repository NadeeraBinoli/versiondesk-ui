import { useState } from "react";
import { Login } from "./components/auth/Login";
import { ClientDashboard } from "./components/dashboard/ClientDashboard";
import { ProjectManagerDashboard } from "./components/dashboard/ProjectManagerDashboard";
import { InquiryToTaskConverter } from "./components/dashboard/InquiryToTaskConverter";
import { VersionManagement } from "./components/dashboard/VersionManagement";
import { KanbanBoard } from "./components/dashboard/KanbanBoard";
import { VoiceAssistant } from "./components/voice/VoiceAssistant";
import { Header } from "./components/dashboard/Header";
import { Sidebar } from "./components/dashboard/Sidebar";
import { StatsCards } from "./components/dashboard/StatsCards";
import { VersionsList } from "./components/dashboard/VersionsList";
import { ActivityFeed } from "./components/dashboard/ActivityFeed";
import { DeploymentChart } from "./components/dashboard/DeploymentChart";
import { QuickActions } from "./components/dashboard/QuickActions";
import { TeamMembers } from "./components/dashboard/TeamMembers";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [currentView, setCurrentView] = useState<"dashboard" | "kanban" | "converter" | "versions">("dashboard");

  const handleLogin = (email: string, role: string) => {
    setUserEmail(email);
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
    setUserRole("");
    setCurrentView("dashboard");
  };

  const handleNavigation = (view: string) => {
    setCurrentView(view as any);
  };

  // Show login screen if not logged in
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // Show client dashboard for client role
  if (userRole === "client") {
    return (
      <>
        <ClientDashboard userEmail={userEmail} onLogout={handleLogout} />
        <VoiceAssistant />
      </>
    );
  }

  // Show project manager dashboard for project manager role
  if (userRole === "project-manager") {
    // Allow navigation to different views
    if (currentView === "converter") {
      return (
        <>
          <InquiryToTaskConverter userEmail={userEmail} onLogout={handleLogout} onNavigate={handleNavigation} currentView={currentView} />
          <VoiceAssistant />
        </>
      );
    }
    if (currentView === "versions") {
      return (
        <>
          <VersionManagement userEmail={userEmail} onLogout={handleLogout} onNavigate={handleNavigation} currentView={currentView} />
          <VoiceAssistant />
        </>
      );
    }
    return (
      <>
        <ProjectManagerDashboard userEmail={userEmail} onLogout={handleLogout} onNavigate={handleNavigation} currentView={currentView} />
        <VoiceAssistant />
      </>
    );
  }

  // Show Kanban board for software engineers by default
  if (userRole === "software-engineer") {
    return (
      <>
        <KanbanBoard userEmail={userEmail} onLogout={handleLogout} />
        <VoiceAssistant />
      </>
    );
  }

  // Show main dashboard or version management for admin role
  if (currentView === "versions") {
    return (
      <>
        <VersionManagement />
        <VoiceAssistant />
      </>
    );
  }

  // Show main dashboard for admin role
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6" role="main">
          {/* Page Title */}
          <div className="mb-6">
            <h2 className="text-gray-900 mb-2">Dashboard</h2>
            <p className="text-gray-600">
              Welcome back! Here's what's happening with your projects today.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="mb-6">
            <StatsCards />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <VersionsList />
            </div>
            <div>
              <QuickActions />
            </div>
          </div>

          {/* Charts and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <DeploymentChart />
            </div>
            <div>
              <TeamMembers />
            </div>
          </div>

          {/* Activity Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ActivityFeed />
            </div>
          </div>
        </main>
      </div>
      <VoiceAssistant />
    </div>
  );
}