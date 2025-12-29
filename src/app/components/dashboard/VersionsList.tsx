import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MoreVertical, Calendar, User, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface Version {
  id: string;
  name: string;
  version: string;
  status: "deployed" | "in-progress" | "scheduled";
  date: string;
  author: string;
  changes: number;
}

const versions: Version[] = [
  {
    id: "1",
    name: "Production Release",
    version: "v2.4.1",
    status: "deployed",
    date: "2 hours ago",
    author: "Sarah Chen",
    changes: 24
  },
  {
    id: "2",
    name: "Feature: User Dashboard",
    version: "v2.5.0-beta",
    status: "in-progress",
    date: "In development",
    author: "Mike Johnson",
    changes: 18
  },
  {
    id: "3",
    name: "Bug Fixes & Performance",
    version: "v2.4.2",
    status: "scheduled",
    date: "Tomorrow, 2:00 PM",
    author: "Emma Wilson",
    changes: 12
  },
  {
    id: "4",
    name: "API Integration Update",
    version: "v2.6.0",
    status: "in-progress",
    date: "In development",
    author: "Alex Kim",
    changes: 31
  }
];

const statusConfig = {
  deployed: {
    icon: CheckCircle2,
    label: "Deployed",
    className: "bg-green-50 text-green-700 border-green-200"
  },
  "in-progress": {
    icon: Clock,
    label: "In Progress",
    className: "bg-blue-50 text-blue-700 border-blue-200"
  },
  scheduled: {
    icon: Calendar,
    label: "Scheduled",
    className: "bg-orange-50 text-orange-700 border-orange-200"
  }
};

export function VersionsList() {
  return (
    <Card>
      <CardHeader className="border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <CardTitle>Recent Versions</CardTitle>
          <Button variant="outline" size="sm">View All</Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {versions.map((version) => {
            const StatusIcon = statusConfig[version.status].icon;
            return (
              <div
                key={version.id}
                className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                role="article"
                aria-label={`Version ${version.version}: ${version.name}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-gray-900">{version.name}</h3>
                      <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        {version.version}
                      </span>
                      <Badge
                        variant="outline"
                        className={statusConfig[version.status].className}
                      >
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusConfig[version.status].label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {version.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {version.date}
                      </span>
                      <span>{version.changes} changes</span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="h-8 w-8 rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center" aria-label="More options">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Version</DropdownMenuItem>
                      <DropdownMenuItem>Compare Changes</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}