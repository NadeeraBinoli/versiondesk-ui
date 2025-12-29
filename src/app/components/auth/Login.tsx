import { useState } from "react";
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface LoginProps {
  onLogin: (email: string, role: string) => void;
}

type Role = "client" | "project-manager" | "software-engineer" | "admin";

interface RoleOption {
  id: Role;
  label: string;
  description: string;
  icon: string;
}

const roles: RoleOption[] = [
  {
    id: "client",
    label: "Client",
    description: "View releases and updates",
    icon: "👤"
  },
  {
    id: "project-manager",
    label: "Project Manager",
    description: "Manage projects and teams",
    icon: "📊"
  },
  {
    id: "software-engineer",
    label: "Software Engineer",
    description: "Develop and deploy versions",
    icon: "💻"
  },
  {
    id: "admin",
    label: "Admin",
    description: "Full system access",
    icon: "⚙️"
  }
];

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; role?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string; role?: string } = {};

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Role validation
    if (!selectedRole) {
      newErrors.role = "Please select your role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        onLogin(email, selectedRole!);
      }, 1000);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (errors.email) {
      setErrors({ ...errors, email: undefined });
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (errors.password) {
      setErrors({ ...errors, password: undefined });
    }
  };

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    if (errors.role) {
      setErrors({ ...errors, role: undefined });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 mb-4 shadow-lg">
            <span className="text-2xl font-bold text-white">V</span>
          </div>
          <h1 className="text-gray-900 mb-2">Welcome to VersionDesk</h1>
          <p className="text-gray-600">Sign in to manage your software releases</p>
        </div>

        <Card className="shadow-xl border-gray-200">
          <CardHeader className="space-y-1">
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  autoComplete="email"
                />
                {errors.email && (
                  <div id="email-error" className="flex items-center gap-2 text-sm text-red-600" role="alert">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                    onClick={() => {/* Forgot password handler */}}
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    className={errors.password ? "border-red-500 focus-visible:ring-red-500 pr-10" : "pr-10"}
                    aria-invalid={errors.password ? "true" : "false"}
                    aria-describedby={errors.password ? "password-error" : undefined}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <div id="password-error" className="flex items-center gap-2 text-sm text-red-600" role="alert">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.password}</span>
                  </div>
                )}
              </div>

              {/* Role Selection */}
              <div className="space-y-3">
                <Label>Select Your Role</Label>
                <div className="grid grid-cols-2 gap-3">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => handleRoleSelect(role.id)}
                      className={`
                        relative p-4 rounded-lg border-2 text-left transition-all
                        ${selectedRole === role.id
                          ? "border-blue-600 bg-blue-50 shadow-sm"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                        }
                      `}
                      aria-pressed={selectedRole === role.id}
                      aria-label={`Select ${role.label} role`}
                    >
                      {selectedRole === role.id && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle2 className="h-4 w-4 text-blue-600" />
                        </div>
                      )}
                      <div className="text-2xl mb-2">{role.icon}</div>
                      <div className="font-medium text-gray-900 text-sm mb-1">{role.label}</div>
                      <div className="text-xs text-gray-500">{role.description}</div>
                    </button>
                  ))}
                </div>
                {errors.role && (
                  <div className="flex items-center gap-2 text-sm text-red-600" role="alert">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.role}</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></div>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>

              {/* Demo Credentials */}
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-900 font-medium mb-1">Demo Credentials:</p>
                <p className="text-xs text-blue-700">Email: demo@versiondesk.com</p>
                <p className="text-xs text-blue-700">Password: demo123</p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <button className="text-blue-600 hover:text-blue-700 hover:underline font-medium">
            Contact your administrator
          </button>
        </p>
      </div>
    </div>
  );
}
