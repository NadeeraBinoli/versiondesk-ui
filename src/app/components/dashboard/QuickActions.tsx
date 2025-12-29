import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Plus, Upload, GitMerge, FileDown } from "lucide-react";

interface QuickAction {
  icon: React.ElementType;
  label: string;
  description: string;
  variant: "default" | "outline";
}

const actions: QuickAction[] = [
  {
    icon: Plus,
    label: "New Version",
    description: "Create a new version",
    variant: "default"
  },
  {
    icon: Upload,
    label: "Deploy Release",
    description: "Deploy to production",
    variant: "outline"
  },
  {
    icon: GitMerge,
    label: "Merge Branch",
    description: "Merge into main",
    variant: "outline"
  },
  {
    icon: FileDown,
    label: "Export Report",
    description: "Download analytics",
    variant: "outline"
  }
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader className="border-b bg-gray-50">
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.label}
                variant={action.variant}
                className="h-auto flex-col items-start gap-2 p-4"
              >
                <div className="flex items-center gap-2 w-full">
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{action.label}</span>
                </div>
                <span className="text-xs text-gray-500 text-left w-full">
                  {action.description}
                </span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
