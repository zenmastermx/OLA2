import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/App";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Loader2 } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
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
    <div className="min-h-screen bg-[#0A0E14] flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 animate-slide-up">
          {/* Back button */}
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            data-testid="back-to-home-link"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src="https://customer-assets.emergentagent.com/job_be4bb2aa-ca20-4b1a-9d54-431ad1ac86d0/artifacts/7kvxdoxy_primary.filled.whouter.pms315.png" 
              alt="USA.edu Logo" 
              className="h-12 w-auto"
            />
            <div>
              <h1 className="font-['Outfit'] text-2xl font-bold">USA.edu</h1>
              <p className="text-slate-500 text-sm">Application Portal</p>
            </div>
          </div>

          {/* Header */}
          <div>
            <h2 className="font-['Outfit'] text-3xl font-bold">Welcome Back</h2>
            <p className="text-slate-400 mt-2">Sign in to continue your application</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-14 bg-black/20 border-white/10 focus:border-[#00F5FF] focus:ring-1 focus:ring-[#00F5FF] text-white placeholder:text-slate-600 rounded-xl"
                  data-testid="login-email-input"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 h-14 bg-black/20 border-white/10 focus:border-[#00F5FF] focus:ring-1 focus:ring-[#00F5FF] text-white placeholder:text-slate-600 rounded-xl"
                  data-testid="login-password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                  data-testid="toggle-password-visibility"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-[#00B4D8] hover:bg-[#0096B4] text-white rounded-xl text-lg font-medium shadow-[0_0_20px_rgba(0,180,216,0.3)] hover:shadow-[0_0_30px_rgba(0,180,216,0.5)] transition-all"
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
          <p className="text-center text-slate-400">
            Don't have an account?{" "}
            <Link 
              to="/register" 
              className="text-[#00B4D8] hover:text-[#00F5FF] font-medium transition-colors"
              data-testid="register-link"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#002855]/50 to-[#0A0E14]" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#00B4D8]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#7B68EE]/10 rounded-full blur-[100px]" />
        
        <div className="relative z-10 text-center max-w-lg">
          <img 
            src="https://customer-assets.emergentagent.com/job_be4bb2aa-ca20-4b1a-9d54-431ad1ac86d0/artifacts/7kvxdoxy_primary.filled.whouter.pms315.png" 
            alt="USA.edu Logo" 
            className="h-24 w-auto mx-auto mb-8"
          />
          <h2 className="font-['Outfit'] text-4xl font-bold mb-4">
            University of St. Augustine
          </h2>
          <p className="text-slate-400 text-lg">
            For Health Sciences
          </p>
          <div className="mt-12 flex justify-center gap-8">
            <div className="text-center">
              <p className="text-3xl font-['Outfit'] font-bold text-[#00F5FF]">15K+</p>
              <p className="text-slate-500 text-sm">Students</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-['Outfit'] font-bold text-[#00F5FF]">5</p>
              <p className="text-slate-500 text-sm">Campuses</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-['Outfit'] font-bold text-[#00F5FF]">95%</p>
              <p className="text-slate-500 text-sm">Employment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
