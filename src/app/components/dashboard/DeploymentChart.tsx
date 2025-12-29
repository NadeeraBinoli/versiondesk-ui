import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", successful: 12, failed: 1 },
  { name: "Tue", successful: 15, failed: 0 },
  { name: "Wed", successful: 18, failed: 2 },
  { name: "Thu", successful: 14, failed: 1 },
  { name: "Fri", successful: 20, failed: 0 },
  { name: "Sat", successful: 8, failed: 0 },
  { name: "Sun", successful: 10, failed: 1 }
];

export function DeploymentChart() {
  return (
    <Card>
      <CardHeader className="border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <CardTitle>Deployment Activity</CardTitle>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="text-gray-600">Successful</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <span className="text-gray-600">Failed</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="successGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="failGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="name" 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Area
              type="monotone"
              dataKey="successful"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#successGradient)"
              name="Successful"
            />
            <Area
              type="monotone"
              dataKey="failed"
              stroke="#ef4444"
              strokeWidth={2}
              fill="url(#failGradient)"
              name="Failed"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
