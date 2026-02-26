import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth, useTheme } from "@/App";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Loader2, Sun, Moon } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.detail || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-[#0A0E14]' : 'bg-gray-50'}`}>
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 animate-slide-up">
          {/* Back button and Theme Toggle */}
          <div className="flex items-center justify-between">
            <Link 
              to="/"
              className={`inline-flex items-center gap-2 transition-colors ${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              data-testid="back-to-home-link"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
              data-testid="theme-toggle-btn"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={theme === 'dark' 
                ? "https://customer-assets.emergentagent.com/job_be4bb2aa-ca20-4b1a-9d54-431ad1ac86d0/artifacts/ie0vbsv3_primary.Horiz.2line.knockedout.whouter.pms315%2Bwhite.png"
                : "https://customer-assets.emergentagent.com/job_student-journey-17/artifacts/lcfdritp_primary.Horiz.2line.knockedout.pms315.png"
              }
              alt="University of St. Augustine for Health Sciences" 
              className="h-12 w-auto"
            />
          </div>

          {/* Header */}
          <div>
            <h2 className={`font-['Outfit'] text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Welcome Back</h2>
            <p className={`mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>Sign in to continue your application</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className={theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}>Email Address</Label>
              <div className="relative">
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-slate-500' : 'text-gray-400'}`} />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`pl-12 h-14 rounded-xl focus:border-[#00677F] focus:ring-1 focus:ring-[#00677F] ${
                    theme === 'dark' 
                      ? 'bg-black/20 border-white/10 text-white placeholder:text-slate-600' 
                      : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'
                  }`}
                  data-testid="login-email-input"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className={theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}>Password</Label>
              <div className="relative">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-slate-500' : 'text-gray-400'}`} />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`pl-12 pr-12 h-14 rounded-xl focus:border-[#00677F] focus:ring-1 focus:ring-[#00677F] ${
                    theme === 'dark' 
                      ? 'bg-black/20 border-white/10 text-white placeholder:text-slate-600' 
                      : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'
                  }`}
                  data-testid="login-password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${theme === 'dark' ? 'text-slate-500 hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}
                  data-testid="toggle-password-visibility"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-[#00677F] hover:bg-[#135163] text-white rounded-xl text-lg font-medium shadow-[0_0_20px_rgba(0,180,216,0.3)] hover:shadow-[0_0_30px_rgba(0,180,216,0.5)] transition-all"
              data-testid="login-submit-btn"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Register link */}
          <p className={`text-center ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
            Don't have an account?{" "}
            <Link 
              to="/register" 
              className="text-[#00677F] hover:text-[#135163] font-medium transition-colors"
              data-testid="register-link"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Visual */}
      <div className={`hidden lg:flex flex-1 items-center justify-center p-12 relative overflow-hidden ${theme === 'dark' ? '' : 'bg-gradient-to-br from-[#E0F7FA] to-[#B2EBF2]'}`}>
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-br from-[#002855]/50 to-[#0A0E14]' : ''}`} />
        <div className={`absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-[100px] ${theme === 'dark' ? 'bg-[#00677F]/10' : 'bg-[#00677F]/20'}`} />
        <div className={`absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full blur-[100px] ${theme === 'dark' ? 'bg-[#7B68EE]/10' : 'bg-[#7B68EE]/15'}`} />
        
        <div className="relative z-10 text-center max-w-lg">
          <img 
            src="https://customer-assets.emergentagent.com/job_be4bb2aa-ca20-4b1a-9d54-431ad1ac86d0/artifacts/7kvxdoxy_primary.filled.whouter.pms315.png" 
            alt="USA.edu Logo" 
            className="h-24 w-auto mx-auto mb-8"
          />
          <h2 className={`font-['Outfit'] text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#002855]'}`}>
            University of St. Augustine
          </h2>
          <p className={`text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-[#004D6E]'}`}>
            For Health Sciences
          </p>
          <div className="mt-12 flex justify-center gap-8">
            <div className="text-center">
              <p className="text-3xl font-['Outfit'] font-bold text-[#00677F]">15K+</p>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-[#004D6E]'}`}>Students</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-['Outfit'] font-bold text-[#00677F]">5</p>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-[#004D6E]'}`}>Campuses</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-['Outfit'] font-bold text-[#00677F]">95%</p>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-[#004D6E]'}`}>Employment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
