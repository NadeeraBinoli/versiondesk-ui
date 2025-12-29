import { useState } from "react";
import {
  LogOut,
  User,
  Settings,
  Bell,
  ChevronDown,
  Package,
  LayoutDashboard,
  ClipboardList,
  GitBranch,
  FileText,
  MessageSquare,
  Menu,
  X
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface NavigationBarProps {
  userRole: string;
  userEmail: string;
  onLogout: () => void;
  onNavigate?: (view: string) => void;
  currentView?: string;
  showNavigation?: boolean;
}

const roleConfig = {
  client: {
    name: "Client",
    color: "bg-purple-600",
    icon: User
  },
  "project-manager": {
    name: "Project Manager",
    color: "bg-blue-600",
    icon: ClipboardList
  },
  "software-engineer": {
    name: "Software Engineer",
    color: "bg-green-600",
    icon: GitBranch
  },
  admin: {
    name: "Administrator",
    color: "bg-red-600",
    icon: Settings
  }
};

const navigationItems = {
  client: [
    { id: "dashboard", label: "My Inquiries", icon: MessageSquare },
    { id: "submit", label: "Submit Inquiry", icon: FileText }
  ],
  "project-manager": [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "converter", label: "Convert Inquiry", icon: FileText },
    { id: "versions", label: "Version Management", icon: Package }
  ],
  "software-engineer": [
    { id: "kanban", label: "Kanban Board", icon: ClipboardList },
    { id: "tasks", label: "My Tasks", icon: FileText }
  ],
  admin: [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "versions", label: "Versions", icon: Package },
    { id: "users", label: "Users", icon: User }
  ]
};

export function NavigationBar({
  userRole,
  userEmail,
  onLogout,
  onNavigate,
  currentView = "dashboard",
  showNavigation = true
}: NavigationBarProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const config = roleConfig[userRole as keyof typeof roleConfig] || roleConfig.client;
  const RoleIcon = config.icon;
  const navItems = navigationItems[userRole as keyof typeof navigationItems] || [];

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    onLogout();
  };

  const handleNavigation = (viewId: string) => {
    if (onNavigate) {
      onNavigate(viewId);
    }
    setIsMobileMenuOpen(false);
  };

  // Get user initials from email
  const userInitials = userEmail
    .split("@")[0]
    .split(".")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-900">VersionDesk</h1>
                <p className="text-xs text-gray-600 hidden sm:block">{config.name} Portal</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            {showNavigation && navItems.length > 0 && (
              <div className="hidden md:flex items-center gap-1 ml-8">
                {navItems.map((item) => {
                  const ItemIcon = item.icon;
                  const isActive = currentView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigation(item.id)}
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                        ${isActive
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "text-gray-700 hover:bg-gray-100"
                        }
                      `}
                    >
                      <ItemIcon className="h-4 w-4" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Side - Notifications & User Menu */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

            {/* User Menu - Desktop */}
            <div className="hidden sm:block relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Avatar className={`h-8 w-8 ${config.color}`}>
                  <AvatarFallback className="text-white text-sm">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left hidden lg:block">
                  <p className="text-sm font-medium text-gray-900">{userEmail.split("@")[0]}</p>
                  <p className="text-xs text-gray-600">{config.name}</p>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-600 transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsUserMenuOpen(false)}
                  ></div>

                  {/* Menu */}
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <Avatar className={`h-10 w-10 ${config.color}`}>
                          <AvatarFallback className="text-white">
                            {userInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {userEmail}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <RoleIcon className="h-3 w-3 text-gray-500" />
                            <p className="text-xs text-gray-600">{config.name}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                        <User className="h-4 w-4 text-gray-500" />
                        My Profile
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                        <Settings className="h-4 w-4 text-gray-500" />
                        Settings
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                        <Bell className="h-4 w-4 text-gray-500" />
                        Notifications
                        <Badge className="ml-auto bg-red-100 text-red-800 border-red-300">
                          3
                        </Badge>
                      </button>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-200 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Log Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Mobile User Avatar */}
            <div className="sm:hidden">
              <Avatar className={`h-8 w-8 ${config.color}`}>
                <AvatarFallback className="text-white text-sm">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 animate-in slide-in-from-top duration-200">
            {/* Mobile Navigation */}
            {showNavigation && navItems.length > 0 && (
              <div className="space-y-1 mb-4">
                <p className="px-4 text-xs font-semibold text-gray-500 uppercase mb-2">
                  Navigation
                </p>
                {navItems.map((item) => {
                  const ItemIcon = item.icon;
                  const isActive = currentView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigation(item.id)}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all
                        ${isActive
                          ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                          : "text-gray-700 hover:bg-gray-100 border-l-4 border-transparent"
                        }
                      `}
                    >
                      <ItemIcon className="h-5 w-5" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Mobile User Menu */}
            <div className="border-t border-gray-200 pt-4 space-y-1">
              <p className="px-4 text-xs font-semibold text-gray-500 uppercase mb-2">
                Account
              </p>
              
              {/* User Info */}
              <div className="px-4 py-2 bg-gray-50 rounded-lg mx-4 mb-2">
                <div className="flex items-center gap-3">
                  <Avatar className={`h-10 w-10 ${config.color}`}>
                    <AvatarFallback className="text-white">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{userEmail}</p>
                    <p className="text-xs text-gray-600">{config.name}</p>
                  </div>
                </div>
              </div>

              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                <User className="h-5 w-5 text-gray-500" />
                My Profile
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                <Settings className="h-5 w-5 text-gray-500" />
                Settings
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                <Bell className="h-5 w-5 text-gray-500" />
                Notifications
                <Badge className="ml-auto bg-red-100 text-red-800 border-red-300">3</Badge>
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-700 hover:bg-red-50 transition-colors border-t border-gray-200 mt-2 pt-4"
              >
                <LogOut className="h-5 w-5" />
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
