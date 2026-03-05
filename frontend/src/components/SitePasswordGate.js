import { useState, useEffect } from "react";
import { Lock, Eye, EyeOff, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const SITE_USERNAME = "oladesign!";
const SITE_PASSWORD = "Ola2.0usa26!";
const AUTH_KEY = "site_access_granted";

const SitePasswordGate = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if user has already authenticated
    const authStatus = localStorage.getItem(AUTH_KEY);
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate a brief delay for better UX
    setTimeout(() => {
      if (username === SITE_USERNAME && password === SITE_PASSWORD) {
        localStorage.setItem(AUTH_KEY, "true");
        setIsAuthenticated(true);
        toast.success("Access granted!");
      } else {
        toast.error("Invalid credentials. Please try again.");
        setPassword("");
      }
      setIsSubmitting(false);
    }, 500);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0E14] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#00677F] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If authenticated, show the app
  if (isAuthenticated) {
    return children;
  }

  // Show password gate
  return (
    <div className="min-h-screen bg-[#0A0E14] flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00677F]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#135163]/10 rounded-full blur-3xl" />
      </div>

      {/* Password Gate Card */}
      <div className="relative w-full max-w-md">
        <div className="backdrop-blur-xl bg-[#11161F]/90 border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-[#00677F]/10 border border-[#00677F]/20 flex items-center justify-center">
              <Lock className="w-8 h-8 text-[#00677F]" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Protected Access</h1>
            <p className="text-slate-400 text-sm">
              This site requires authentication to access.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="pl-12 h-12 bg-black/30 border-white/10 text-white placeholder:text-slate-600 rounded-xl focus:border-[#00677F] focus:ring-1 focus:ring-[#00677F]"
                  data-testid="site-gate-username"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="pl-12 pr-12 h-12 bg-black/30 border-white/10 text-white placeholder:text-slate-600 rounded-xl focus:border-[#00677F] focus:ring-1 focus:ring-[#00677F]"
                  data-testid="site-gate-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-[#00677F] hover:bg-[#135163] text-white rounded-xl font-medium shadow-lg shadow-[#00677F]/20 transition-all duration-300"
              data-testid="site-gate-submit"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying...
                </div>
              ) : (
                "Access Site"
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-slate-600 text-xs mt-6">
            OLA 2.0 Design Preview
          </p>
        </div>
      </div>
    </div>
  );
};

export default SitePasswordGate;
