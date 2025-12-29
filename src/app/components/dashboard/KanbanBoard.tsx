import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  GripVertical,
  AlertCircle,
  Flag,
  User,
  Hash,
  Clock,
  CheckCircle2,
  Filter,
  Plus,
  Search
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type ColumnId = "todo" | "in-progress" | "review" | "done";

interface Task {
  id: string;
  title: string;
  inquiryId: string;
  assignedDev: {
    name: string;
    initials: string;
    avatar?: string;
  };
  priority: "high" | "medium" | "low";
  estimatedHours: number;
  tags: string[];
  columnId: ColumnId;
}

interface Column {
  id: ColumnId;
  title: string;
  color: string;
  icon: any;
}

const COLUMNS: Column[] = [
  {
    id: "todo",
    title: "To-Do",
    color: "bg-gray-100 border-gray-300",
    icon: Clock
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "bg-blue-100 border-blue-300",
    icon: AlertCircle
  },
  {
    id: "review",
    title: "Ready for Review",
    color: "bg-amber-100 border-amber-300",
    icon: Flag
  },
  {
    id: "done",
    title: "Done",
    color: "bg-green-100 border-green-300",
    icon: CheckCircle2
  }
];

const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Implement OAuth 2.0 authentication",
    inquiryId: "INQ-1234",
    assignedDev: { name: "Sarah Mitchell", initials: "SM" },
    priority: "high",
    estimatedHours: 16,
    tags: ["Backend", "Security"],
    columnId: "in-progress"
  },
  {
    id: "2",
    title: "Add dark mode to mobile app",
    inquiryId: "INQ-1198",
    assignedDev: { name: "John Davis", initials: "JD" },
    priority: "medium",
    estimatedHours: 8,
    tags: ["Frontend", "UI/UX"],
    columnId: "review"
  },
  {
    id: "3",
    title: "Export reports to PDF format",
    inquiryId: "INQ-1245",
    assignedDev: { name: "Alex Kim", initials: "AK" },
    priority: "high",
    estimatedHours: 12,
    tags: ["Backend", "Feature"],
    columnId: "todo"
  },
  {
    id: "4",
    title: "Improve search functionality",
    inquiryId: "INQ-1250",
    assignedDev: { name: "Emily Chen", initials: "EC" },
    priority: "medium",
    estimatedHours: 10,
    tags: ["Backend", "Performance"],
    columnId: "in-progress"
  },
  {
    id: "5",
    title: "Fix mobile responsive issues",
    inquiryId: "INQ-1189",
    assignedDev: { name: "Ryan White", initials: "RW" },
    priority: "low",
    estimatedHours: 6,
    tags: ["Frontend", "Bug"],
    columnId: "done"
  },
  {
    id: "6",
    title: "Add email notifications",
    inquiryId: "INQ-1256",
    assignedDev: { name: "Lisa Morgan", initials: "LM" },
    priority: "medium",
    estimatedHours: 14,
    tags: ["Backend", "Feature"],
    columnId: "todo"
  },
  {
    id: "7",
    title: "Update API documentation",
    inquiryId: "INQ-1201",
    assignedDev: { name: "Tom Chen", initials: "TC" },
    priority: "low",
    estimatedHours: 4,
    tags: ["Documentation"],
    columnId: "review"
  },
  {
    id: "8",
    title: "Optimize database queries",
    inquiryId: "INQ-1267",
    assignedDev: { name: "Sarah Mitchell", initials: "SM" },
    priority: "high",
    estimatedHours: 20,
    tags: ["Backend", "Performance"],
    columnId: "todo"
  }
];

const priorityConfig = {
  high: {
    label: "High",
    color: "bg-red-100 text-red-800 border-red-300",
    dotColor: "bg-red-500"
  },
  medium: {
    label: "Medium",
    color: "bg-amber-100 text-amber-800 border-amber-300",
    dotColor: "bg-amber-500"
  },
  low: {
    label: "Low",
    color: "bg-blue-100 text-blue-800 border-blue-300",
    dotColor: "bg-blue-500"
  }
};

interface TaskCardProps {
  task: Task;
  onMove: (taskId: string, toColumn: ColumnId) => void;
}

const TaskCard = ({ task, onMove }: TaskCardProps) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id, columnId: task.columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }), [task.id, task.columnId]);

  const priorityInfo = priorityConfig[task.priority];

  return (
    <div
      ref={preview}
      className={`
        group bg-white rounded-lg border-2 shadow-sm transition-all duration-200
        ${isDragging
          ? "opacity-40 scale-95 rotate-2 border-blue-400 shadow-lg"
          : "opacity-100 scale-100 border-gray-200 hover:border-blue-300 hover:shadow-md"
        }
        cursor-move
      `}
    >
      <div className="p-4">
        {/* Drag Handle & Priority */}
        <div className="flex items-start gap-2 mb-3">
          <div
            ref={drag}
            className="mt-1 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 transition-colors"
            title="Drag to move task"
          >
            <GripVertical className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h4 className="font-semibold text-gray-900 text-sm leading-snug">
                {task.title}
              </h4>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full border text-xs font-medium whitespace-nowrap ${priorityInfo.color}`}>
                <div className={`h-2 w-2 rounded-full ${priorityInfo.dotColor}`} />
                {priorityInfo.label}
              </div>
            </div>

            {/* Inquiry ID */}
            <div className="flex items-center gap-1 text-xs text-gray-600 mb-3">
              <Hash className="h-3 w-3" />
              <span className="font-mono">{task.inquiryId}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {task.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Bottom Row: Assigned Dev & Estimated Hours */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6 border border-gray-200">
                  <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                    {task.assignedDev.initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-600">{task.assignedDev.name}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                <span>{task.estimatedHours}h</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Effect Indicator */}
      <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-b-lg" />
    </div>
  );
};

interface ColumnProps {
  column: Column;
  tasks: Task[];
  onDrop: (taskId: string, toColumn: ColumnId) => void;
}

const KanbanColumn = ({ column, tasks, onDrop }: ColumnProps) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item: { id: string; columnId: ColumnId }) => {
      if (item.columnId !== column.id) {
        onDrop(item.id, column.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }), [column.id, onDrop]);

  const ColumnIcon = column.icon;
  const isActive = isOver && canDrop;

  return (
    <div className="flex flex-col h-full">
      {/* Column Header */}
      <div className={`rounded-t-lg border-2 border-b-0 p-4 ${column.color}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ColumnIcon className="h-5 w-5 text-gray-700" />
            <h3 className="font-semibold text-gray-900">{column.title}</h3>
          </div>
          <Badge variant="secondary" className="bg-white/70">
            {tasks.length}
          </Badge>
        </div>
      </div>

      {/* Drop Zone */}
      <div
        ref={drop}
        className={`
          flex-1 border-2 rounded-b-lg p-3 min-h-[500px] transition-all duration-200
          ${isActive
            ? "border-blue-500 bg-blue-50 border-dashed scale-[1.02]"
            : canDrop
            ? "border-blue-300 bg-blue-50/50 border-dashed"
            : "border-gray-200 bg-gray-50/50"
          }
        `}
      >
        {/* Drop Zone Indicator */}
        {isActive && (
          <div className="mb-4 p-4 bg-blue-100 border-2 border-blue-400 border-dashed rounded-lg text-center">
            <p className="text-blue-700 font-medium text-sm">Drop task here</p>
          </div>
        )}

        {/* Tasks */}
        <div className="space-y-3">
          {tasks.length === 0 && !isActive ? (
            <div className="text-center py-12 text-gray-400">
              <ColumnIcon className="h-12 w-12 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No tasks</p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard key={task.id} task={task} onMove={onDrop} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState<string>("all");

  const handleTaskMove = (taskId: string, toColumn: ColumnId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, columnId: toColumn } : task
      )
    );

    // Visual feedback: success indicator could be added here
  };

  // Filter tasks based on search and priority
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.inquiryId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignedDev.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority;

    return matchesSearch && matchesPriority;
  });

  const getColumnTasks = (columnId: ColumnId) => {
    return filteredTasks.filter((task) => task.columnId === columnId);
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.columnId === "done").length;
  const completionRate = Math.round((completedTasks / totalTasks) * 100);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-20">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-gray-900 mb-1">Task Board</h1>
                <p className="text-gray-600">Drag and drop tasks to update their status</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </div>

            {/* Search and Stats Bar */}
            <div className="flex items-center gap-4">
              <div className="flex-1 relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search tasks, inquiry ID, or developer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Priority Filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Priority:</span>
                <div className="flex gap-1">
                  {["all", "high", "medium", "low"].map((priority) => (
                    <button
                      key={priority}
                      onClick={() => setFilterPriority(priority)}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        filterPriority === priority
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-md">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-semibold text-gray-900">{totalTasks}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 rounded-md">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-green-700 font-semibold">{completionRate}%</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Kanban Board */}
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1600px] mx-auto">
            {COLUMNS.map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                tasks={getColumnTasks(column.id)}
                onDrop={handleTaskMove}
              />
            ))}
          </div>

          {/* Instructions Card */}
          <Card className="mt-6 max-w-2xl mx-auto bg-blue-50 border-blue-200">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <GripVertical className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">How to use the Kanban Board</h4>
                  <p className="text-sm text-blue-800">
                    Click and hold the <GripVertical className="inline h-4 w-4" /> grip icon on any task card, 
                    then drag it to a different column to update its status. The columns will highlight when 
                    you can drop a task. Release to move the task to the new column.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </DndProvider>
  );
}
