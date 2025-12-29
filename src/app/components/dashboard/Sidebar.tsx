import { 
  LayoutDashboard, 
  Package, 
  Rocket, 
  GitBranch, 
  Users, 
  BarChart3,
  FileText,
  Settings
} from "lucide-react";
import { cn } from "../ui/utils";

interface NavItem {
  label: string;
  icon: React.ElementType;
  active?: boolean;
  count?: number;
}

const mainNavItems: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Versions", icon: Package },
  { label: "Releases", icon: Rocket, count: 2 },
  { label: "Branches", icon: GitBranch },
  { label: "Team", icon: Users },
  { label: "Analytics", icon: BarChart3 },
];

const secondaryNavItems: NavItem[] = [
  { label: "Documentation", icon: FileText },
  { label: "Settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r bg-gray-50 flex flex-col" role="navigation" aria-label="Main navigation">
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <button
              key={item.label}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left",
                item.active
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              )}
              aria-current={item.active ? "page" : undefined}
            >
              <item.icon className="h-5 w-5" />
              <span className="flex-1">{item.label}</span>
              {item.count && (
                <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-xs">
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="space-y-1">
            {secondaryNavItems.map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-left"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Project Selector */}
      <div className="border-t bg-white p-4">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-semibold">
            P
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 truncate">Project Alpha</p>
            <p className="text-sm text-gray-500 truncate">12 versions</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
