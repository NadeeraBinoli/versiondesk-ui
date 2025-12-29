import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { GitBranch, Rocket, CheckCircle2, Users, AlertTriangle } from "lucide-react";

interface Activity {
  id: string;
  type: "branch" | "release" | "approval" | "team" | "alert";
  title: string;
  description: string;
  time: string;
  user?: string;
}

const activities: Activity[] = [
  {
    id: "1",
    type: "release",
    title: "Version v2.4.1 deployed to production",
    description: "Successfully deployed with 24 changes",
    time: "2 hours ago",
    user: "Sarah Chen"
  },
  {
    id: "2",
    type: "approval",
    title: "Release approved for deployment",
    description: "v2.4.2 approved by QA team",
    time: "4 hours ago",
    user: "Mike Johnson"
  },
  {
    id: "3",
    type: "branch",
    title: "New branch created",
    description: "feature/user-authentication",
    time: "6 hours ago",
    user: "Emma Wilson"
  },
  {
    id: "4",
    type: "team",
    title: "New team member added",
    description: "Alex Kim joined as Developer",
    time: "Yesterday",
    user: "Admin"
  },
  {
    id: "5",
    type: "alert",
    title: "Build warning detected",
    description: "Non-critical warning in staging environment",
    time: "Yesterday",
    user: "System"
  }
];

const activityIcons = {
  branch: { icon: GitBranch, className: "bg-purple-100 text-purple-600" },
  release: { icon: Rocket, className: "bg-blue-100 text-blue-600" },
  approval: { icon: CheckCircle2, className: "bg-green-100 text-green-600" },
  team: { icon: Users, className: "bg-orange-100 text-orange-600" },
  alert: { icon: AlertTriangle, className: "bg-yellow-100 text-yellow-600" }
};

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader className="border-b bg-gray-50">
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y max-h-[500px] overflow-y-auto">
          {activities.map((activity) => {
            const { icon: Icon, className } = activityIcons[activity.type];
            return (
              <div
                key={activity.id}
                className="p-4 hover:bg-gray-50 transition-colors"
                role="listitem"
              >
                <div className="flex gap-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${className}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 mb-1">{activity.title}</p>
                    <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      {activity.user && <span>{activity.user}</span>}
                      <span>•</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
