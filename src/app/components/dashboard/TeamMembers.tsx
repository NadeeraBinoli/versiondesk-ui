import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Plus } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: "active" | "away" | "offline";
  tasks: number;
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Lead Developer",
    avatar: "SC",
    status: "active",
    tasks: 8
  },
  {
    id: "2",
    name: "Mike Johnson",
    role: "DevOps Engineer",
    avatar: "MJ",
    status: "active",
    tasks: 5
  },
  {
    id: "3",
    name: "Emma Wilson",
    role: "QA Engineer",
    avatar: "EW",
    status: "away",
    tasks: 3
  },
  {
    id: "4",
    name: "Alex Kim",
    role: "Developer",
    avatar: "AK",
    status: "active",
    tasks: 6
  }
];

const statusColors = {
  active: "bg-green-500",
  away: "bg-yellow-500",
  offline: "bg-gray-400"
};

export function TeamMembers() {
  return (
    <Card>
      <CardHeader className="border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <CardTitle>Team Members</CardTitle>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add Member
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="p-4 hover:bg-gray-50 transition-colors"
              role="listitem"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-medium">
                    {member.avatar}
                  </div>
                  <div
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                      statusColors[member.status]
                    }`}
                    aria-label={`Status: ${member.status}`}
                  ></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
                <Badge variant="outline" className="bg-gray-50">
                  {member.tasks} tasks
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
