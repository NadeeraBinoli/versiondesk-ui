import { useState, useEffect } from "react";
import {
  Mic,
  MicOff,
  Volume2,
  CheckCircle2,
  XCircle,
  Loader2,
  Sparkles,
  User,
  FileText,
  Package,
  MessageSquare,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  Zap,
  Send,
  X,
  ChevronRight,
  Clock,
  Users,
  ShieldCheck
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";

type VoiceState = "idle" | "listening" | "processing" | "executing" | "success" | "error";

interface VoiceCommand {
  id: string;
  text: string;
  category: "assignment" | "approval" | "query" | "navigation" | "update";
  confidence: number;
  timestamp: number;
}

interface ExecutionStep {
  id: string;
  text: string;
  status: "pending" | "executing" | "completed" | "failed";
  icon: any;
}

const suggestedCommands = [
  { text: "Assign inquiry INQ-1267 to Sarah Mitchell", icon: User, category: "assignment" },
  { text: "Approve version 2.3.1 for production", icon: ShieldCheck, category: "approval" },
  { text: "Show all high priority inquiries", icon: MessageSquare, category: "query" },
  { text: "Create task from inquiry INQ-1256", icon: FileText, category: "assignment" },
  { text: "Navigate to Kanban board", icon: Package, category: "navigation" },
  { text: "Update task TASK-1189 status to completed", icon: CheckCircle2, category: "update" }
];

const mockCommands: Record<string, { steps: Omit<ExecutionStep, "status">[]; result: string }> = {
  "assign inquiry": {
    steps: [
      { id: "1", text: "Locating inquiry INQ-1267", icon: MessageSquare },
      { id: "2", text: "Verifying developer availability", icon: Users },
      { id: "3", text: "Assigning to Sarah Mitchell", icon: User },
      { id: "4", text: "Sending notification", icon: Send }
    ],
    result: "Successfully assigned inquiry INQ-1267 to Sarah Mitchell"
  },
  "approve version": {
    steps: [
      { id: "1", text: "Validating version 2.3.1", icon: Package },
      { id: "2", text: "Checking test results", icon: CheckCircle2 },
      { id: "3", text: "Updating deployment pipeline", icon: RefreshCw },
      { id: "4", text: "Notifying team members", icon: Users }
    ],
    result: "Version 2.3.1 approved and queued for production deployment"
  },
  "show all high priority": {
    steps: [
      { id: "1", text: "Searching inquiry database", icon: MessageSquare },
      { id: "2", text: "Filtering by priority level", icon: Zap },
      { id: "3", text: "Sorting by date", icon: Clock }
    ],
    result: "Found 8 high priority inquiries"
  },
  "create task": {
    steps: [
      { id: "1", text: "Loading inquiry INQ-1256", icon: MessageSquare },
      { id: "2", text: "Generating task details", icon: Sparkles },
      { id: "3", text: "Creating task TASK-1256", icon: FileText },
      { id: "4", text: "Linking to inquiry", icon: ArrowRight }
    ],
    result: "Task TASK-1256 created and linked to inquiry INQ-1256"
  },
  "navigate to kanban": {
    steps: [
      { id: "1", text: "Loading Kanban board", icon: Package },
      { id: "2", text: "Fetching latest tasks", icon: RefreshCw }
    ],
    result: "Navigating to Kanban board"
  },
  "update task": {
    steps: [
      { id: "1", text: "Locating task TASK-1189", icon: FileText },
      { id: "2", text: "Updating status to completed", icon: CheckCircle2 },
      { id: "3", text: "Updating team dashboard", icon: RefreshCw }
    ],
    result: "Task TASK-1189 marked as completed"
  }
};

export function VoiceAssistant() {
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [isOpen, setIsOpen] = useState(false);
  const [currentCommand, setCurrentCommand] = useState<VoiceCommand | null>(null);
  const [transcriptText, setTranscriptText] = useState("");
  const [executionSteps, setExecutionSteps] = useState<ExecutionStep[]>([]);
  const [resultMessage, setResultMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [waveformBars, setWaveformBars] = useState<number[]>(Array(12).fill(0));

  // Simulate waveform animation during listening
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (voiceState === "listening") {
      interval = setInterval(() => {
        setWaveformBars(Array(12).fill(0).map(() => Math.random() * 100));
      }, 100);
    } else {
      setWaveformBars(Array(12).fill(0));
    }
    return () => clearInterval(interval);
  }, [voiceState]);

  const startListening = () => {
    setIsOpen(true);
    setVoiceState("listening");
    setTranscriptText("");
    setCurrentCommand(null);
    setResultMessage("");
    setShowConfirmation(false);

    // Simulate speech recognition
    setTimeout(() => {
      simulateTranscription();
    }, 2000);
  };

  const stopListening = () => {
    setVoiceState("idle");
    setTranscriptText("");
  };

  const simulateTranscription = () => {
    const commands = [
      "Assign inquiry INQ-1267 to Sarah Mitchell",
      "Approve version 2.3.1 for production",
      "Show all high priority inquiries",
      "Create task from inquiry INQ-1256",
      "Update task TASK-1189 status to completed"
    ];
    
    const randomCommand = commands[Math.floor(Math.random() * commands.length)];
    const words = randomCommand.split(" ");
    
    let currentText = "";
    words.forEach((word, index) => {
      setTimeout(() => {
        currentText += (index > 0 ? " " : "") + word;
        setTranscriptText(currentText);
        
        if (index === words.length - 1) {
          setTimeout(() => {
            processCommand(currentText);
          }, 500);
        }
      }, index * 150);
    });
  };

  const processCommand = (text: string) => {
    setVoiceState("processing");
    
    setTimeout(() => {
      const command: VoiceCommand = {
        id: Date.now().toString(),
        text: text,
        category: determineCategory(text),
        confidence: 0.85 + Math.random() * 0.15,
        timestamp: Date.now()
      };
      
      setCurrentCommand(command);
      setShowConfirmation(true);
      setVoiceState("idle");
    }, 1500);
  };

  const determineCategory = (text: string): VoiceCommand["category"] => {
    const lower = text.toLowerCase();
    if (lower.includes("assign")) return "assignment";
    if (lower.includes("approve")) return "approval";
    if (lower.includes("show") || lower.includes("find")) return "query";
    if (lower.includes("navigate") || lower.includes("go to")) return "navigation";
    if (lower.includes("update") || lower.includes("change")) return "update";
    return "query";
  };

  const executeCommand = () => {
    if (!currentCommand) return;
    
    setShowConfirmation(false);
    setVoiceState("executing");
    
    // Determine which command steps to use
    let commandSteps: Omit<ExecutionStep, "status">[] = [];
    let result = "";
    
    const text = currentCommand.text.toLowerCase();
    if (text.includes("assign inquiry")) {
      commandSteps = mockCommands["assign inquiry"].steps;
      result = mockCommands["assign inquiry"].result;
    } else if (text.includes("approve version")) {
      commandSteps = mockCommands["approve version"].steps;
      result = mockCommands["approve version"].result;
    } else if (text.includes("show all high priority")) {
      commandSteps = mockCommands["show all high priority"].steps;
      result = mockCommands["show all high priority"].result;
    } else if (text.includes("create task")) {
      commandSteps = mockCommands["create task"].steps;
      result = mockCommands["create task"].result;
    } else if (text.includes("navigate")) {
      commandSteps = mockCommands["navigate to kanban"].steps;
      result = mockCommands["navigate to kanban"].result;
    } else if (text.includes("update task")) {
      commandSteps = mockCommands["update task"].steps;
      result = mockCommands["update task"].result;
    }
    
    const stepsWithStatus: ExecutionStep[] = commandSteps.map(step => ({
      ...step,
      status: "pending" as const
    }));
    
    setExecutionSteps(stepsWithStatus);
    
    // Execute steps sequentially
    stepsWithStatus.forEach((step, index) => {
      setTimeout(() => {
        setExecutionSteps(prev => 
          prev.map((s, i) => 
            i === index ? { ...s, status: "executing" as const } : s
          )
        );
        
        setTimeout(() => {
          setExecutionSteps(prev => 
            prev.map((s, i) => 
              i === index ? { ...s, status: "completed" as const } : s
            )
          );
          
          if (index === stepsWithStatus.length - 1) {
            setTimeout(() => {
              setVoiceState("success");
              setResultMessage(result);
              
              setTimeout(() => {
                setIsOpen(false);
                setVoiceState("idle");
                setExecutionSteps([]);
                setCurrentCommand(null);
              }, 3000);
            }, 500);
          }
        }, 800);
      }, index * 1300);
    });
  };

  const cancelCommand = () => {
    setShowConfirmation(false);
    setCurrentCommand(null);
    setVoiceState("idle");
  };

  const closeAssistant = () => {
    setIsOpen(false);
    setVoiceState("idle");
    setTranscriptText("");
    setCurrentCommand(null);
    setExecutionSteps([]);
    setShowConfirmation(false);
  };

  const useSuggestedCommand = (command: string) => {
    setTranscriptText(command);
    processCommand(command);
  };

  return (
    <>
      {/* Floating Microphone Button */}
      <button
        onClick={voiceState === "listening" ? stopListening : startListening}
        className={`
          fixed bottom-8 right-8 z-50
          h-16 w-16 rounded-full shadow-2xl
          flex items-center justify-center
          transition-all duration-300 transform
          ${voiceState === "listening" 
            ? "bg-red-600 hover:bg-red-700 scale-110 animate-pulse" 
            : voiceState === "processing"
            ? "bg-purple-600 animate-spin"
            : voiceState === "executing"
            ? "bg-blue-600 animate-pulse"
            : voiceState === "success"
            ? "bg-green-600"
            : "bg-blue-600 hover:bg-blue-700 hover:scale-110"
          }
          ${isOpen ? "ring-4 ring-blue-300 ring-opacity-50" : ""}
        `}
        aria-label={voiceState === "listening" ? "Stop listening" : "Start voice command"}
      >
        {voiceState === "listening" ? (
          <MicOff className="h-8 w-8 text-white" />
        ) : voiceState === "processing" ? (
          <Loader2 className="h-8 w-8 text-white" />
        ) : voiceState === "executing" ? (
          <RefreshCw className="h-8 w-8 text-white" />
        ) : voiceState === "success" ? (
          <CheckCircle2 className="h-8 w-8 text-white" />
        ) : (
          <Mic className="h-8 w-8 text-white" />
        )}
      </button>

      {/* Listening Indicator Ring */}
      {voiceState === "listening" && (
        <div className="fixed bottom-8 right-8 z-40 h-16 w-16">
          <div className="absolute inset-0 rounded-full bg-red-400 opacity-25 animate-ping"></div>
          <div className="absolute inset-0 rounded-full bg-red-400 opacity-25 animate-ping" style={{ animationDelay: "0.5s" }}></div>
        </div>
      )}

      {/* Voice Assistant Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <Card className="w-full max-w-2xl shadow-2xl animate-in zoom-in duration-300">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Volume2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Voice Assistant</h3>
                    <p className="text-sm text-gray-600">
                      {voiceState === "listening" && "Listening..."}
                      {voiceState === "processing" && "Processing command..."}
                      {voiceState === "executing" && "Executing command..."}
                      {voiceState === "success" && "Command completed!"}
                      {voiceState === "idle" && "Ready for commands"}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={closeAssistant}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Waveform Visualization */}
              {voiceState === "listening" && (
                <div className="mb-6 p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border-2 border-red-200">
                  <div className="flex items-end justify-center gap-1 h-24">
                    {waveformBars.map((height, index) => (
                      <div
                        key={index}
                        className="w-3 bg-gradient-to-t from-red-500 to-pink-500 rounded-full transition-all duration-100"
                        style={{ height: `${Math.max(height, 10)}%` }}
                      ></div>
                    ))}
                  </div>
                  <p className="text-center text-red-700 font-medium mt-4">
                    <Mic className="inline h-4 w-4 mr-2 animate-pulse" />
                    Listening to your command...
                  </p>
                </div>
              )}

              {/* Processing Indicator */}
              {voiceState === "processing" && (
                <div className="mb-6 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border-2 border-purple-200">
                  <div className="flex items-center justify-center gap-3">
                    <Loader2 className="h-8 w-8 text-purple-600 animate-spin" />
                    <div>
                      <p className="font-semibold text-gray-900">Analyzing command...</p>
                      <p className="text-sm text-gray-600">Using natural language processing</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Transcript Display */}
              {transcriptText && voiceState !== "executing" && voiceState !== "success" && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">Transcript:</p>
                      <p className="text-gray-900 font-medium">{transcriptText}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Command Confirmation */}
              {showConfirmation && currentCommand && (
                <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-300 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2">Command Recognized</h4>
                      <p className="text-gray-700 mb-3">{currentCommand.text}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <Badge className="bg-blue-600 text-white">
                          {(currentCommand.confidence * 100).toFixed(0)}% Confidence
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {currentCommand.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      onClick={executeCommand}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Execute Command
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={cancelCommand}
                      className="flex-1"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* Execution Steps */}
              {voiceState === "executing" && executionSteps.length > 0 && (
                <div className="mb-6 space-y-3">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
                    <RefreshCw className="h-5 w-5 text-blue-600" />
                    Executing Command
                  </h4>
                  {executionSteps.map((step, index) => {
                    const StepIcon = step.icon;
                    return (
                      <div
                        key={step.id}
                        className={`
                          flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-300
                          ${step.status === "executing" 
                            ? "bg-blue-50 border-blue-300 animate-pulse" 
                            : step.status === "completed"
                            ? "bg-green-50 border-green-300"
                            : "bg-gray-50 border-gray-200"
                          }
                        `}
                      >
                        <div className={`
                          h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0
                          ${step.status === "executing"
                            ? "bg-blue-600"
                            : step.status === "completed"
                            ? "bg-green-600"
                            : "bg-gray-300"
                          }
                        `}>
                          {step.status === "executing" ? (
                            <Loader2 className="h-4 w-4 text-white animate-spin" />
                          ) : step.status === "completed" ? (
                            <CheckCircle2 className="h-4 w-4 text-white" />
                          ) : (
                            <StepIcon className="h-4 w-4 text-white" />
                          )}
                        </div>
                        <span className={`
                          text-sm font-medium flex-1
                          ${step.status === "completed" ? "text-green-900" : "text-gray-900"}
                        `}>
                          {step.text}
                        </span>
                        {step.status === "executing" && (
                          <ChevronRight className="h-5 w-5 text-blue-600 animate-bounce" />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Success Message */}
              {voiceState === "success" && resultMessage && (
                <div className="mb-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-300 animate-in fade-in zoom-in duration-300">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-green-900 mb-2">Success!</h4>
                      <p className="text-green-800">{resultMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Suggested Commands */}
              {voiceState === "idle" && !showConfirmation && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-600" />
                    Try these commands:
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {suggestedCommands.map((cmd, index) => {
                      const CmdIcon = cmd.icon;
                      return (
                        <button
                          key={index}
                          onClick={() => useSuggestedCommand(cmd.text)}
                          className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-300 transition-all text-left group"
                        >
                          <div className="h-8 w-8 rounded-full bg-blue-100 group-hover:bg-blue-600 flex items-center justify-center flex-shrink-0 transition-colors">
                            <CmdIcon className="h-4 w-4 text-blue-600 group-hover:text-white transition-colors" />
                          </div>
                          <span className="text-sm text-gray-700 group-hover:text-blue-900 flex-1">
                            "{cmd.text}"
                          </span>
                          <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Help Text */}
              {voiceState === "idle" && !showConfirmation && (
                <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-xs text-purple-800 text-center">
                    <Mic className="inline h-3 w-3 mr-1" />
                    Click the microphone button or select a suggested command to get started
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
