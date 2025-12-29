import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface Stat {
  label: string;
  value: string;
  change: number;
  trend: "up" | "down" | "neutral";
  description: string;
}

const stats: Stat[] = [
  {
    label: "Active Versions",
    value: "24",
    change: 12,
    trend: "up",
    description: "Across all projects"
  },
  {
    label: "Pending Releases",
    value: "7",
    change: -3,
    trend: "down",
    description: "Ready to deploy"
  },
  {
    label: "Team Members",
    value: "18",
    change: 0,
    trend: "neutral",
    description: "Active contributors"
  },
  {
    label: "Success Rate",
    value: "98.5%",
    change: 2.3,
    trend: "up",
    description: "Deployment success"
  }
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-3">
              <p className="text-sm text-gray-600">{stat.label}</p>
              {stat.trend === "up" && (
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-xs font-medium">+{stat.change}%</span>
                </div>
              )}
              {stat.trend === "down" && (
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingDown className="h-4 w-4" />
                  <span className="text-xs font-medium">{stat.change}%</span>
                </div>
              )}
              {stat.trend === "neutral" && (
                <div className="flex items-center gap-1 text-gray-400">
                  <Minus className="h-4 w-4" />
                  <span className="text-xs font-medium">—</span>
                </div>
              )}
            </div>
            <p className="text-3xl font-semibold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
