import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/App";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Loader2, Check } from "lucide-react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordChecks = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "Contains a number", valid: /\d/.test(password) },
    { label: "Contains uppercase", valid: /[A-Z]/.test(password) },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!firstName || !lastName || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    try {
      await register(email, password, firstName, lastName);
      toast.success("Account created successfully!");
      navigate("/dashboard", { state: { newUser: true, program: location.state?.program } });
    } catch (error) {
      console.error("Register error:", error);
      toast.error(error.response?.data?.detail || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E14] flex">
      {/* Left side - Visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#002855]/50 to-[#0A0E14]" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#00B4D8]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#7B68EE]/10 rounded-full blur-[100px]" />
        
        <div className="relative z-10 max-w-lg">
          <h2 className="font-['Outfit'] text-5xl font-bold mb-6 leading-tight">
            Begin Your Healthcare Career Journey
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Create your account to start your application to the University of St. Augustine for Health Sciences.
          </p>
          
          <div className="space-y-4">
            {[
              "AI-powered application assistance",
              "Real-time progress tracking",
              "Secure document uploads",
              "24/7 support access"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#00B4D8]/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-[#00B4D8]" />
                </div>
                <span className="text-slate-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md space-y-6 animate-slide-up py-8">
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
          <div className="flex items-center">
            <img 
              src="https://customer-assets.emergentagent.com/job_be4bb2aa-ca20-4b1a-9d54-431ad1ac86d0/artifacts/ie0vbsv3_primary.Horiz.2line.knockedout.whouter.pms315%2Bwhite.png" 
              alt="University of St. Augustine for Health Sciences" 
              className="h-12 w-auto"
            />
          </div>

          {/* Header */}
          <div>
            <h2 className="font-['Outfit'] text-3xl font-bold">Create Account</h2>
            <p className="text-slate-400 mt-2">Start your application journey today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-slate-300">First Name</Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="pl-12 h-12 bg-black/20 border-white/10 focus:border-[#00F5FF] focus:ring-1 focus:ring-[#00F5FF] text-white placeholder:text-slate-600 rounded-xl"
                    data-testid="register-firstname-input"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-slate-300">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="h-12 bg-black/20 border-white/10 focus:border-[#00F5FF] focus:ring-1 focus:ring-[#00F5FF] text-white placeholder:text-slate-600 rounded-xl"
                  data-testid="register-lastname-input"
                />
              </div>
            </div>

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
                  className="pl-12 h-12 bg-black/20 border-white/10 focus:border-[#00F5FF] focus:ring-1 focus:ring-[#00F5FF] text-white placeholder:text-slate-600 rounded-xl"
                  data-testid="register-email-input"
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
                  className="pl-12 pr-12 h-12 bg-black/20 border-white/10 focus:border-[#00F5FF] focus:ring-1 focus:ring-[#00F5FF] text-white placeholder:text-slate-600 rounded-xl"
                  data-testid="register-password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password strength indicators */}
              {password && (
                <div className="space-y-2 mt-3">
                  {passwordChecks.map((check, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${check.valid ? 'bg-[#28A745]' : 'bg-slate-700'}`}>
                        {check.valid && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className={check.valid ? 'text-[#28A745]' : 'text-slate-500'}>{check.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-300">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-12 h-12 bg-black/20 border-white/10 focus:border-[#00F5FF] focus:ring-1 focus:ring-[#00F5FF] text-white placeholder:text-slate-600 rounded-xl"
                  data-testid="register-confirm-password-input"
                />
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-red-400 text-sm mt-1">Passwords do not match</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-[#00B4D8] hover:bg-[#0096B4] text-white rounded-xl text-lg font-medium shadow-[0_0_20px_rgba(0,180,216,0.3)] hover:shadow-[0_0_30px_rgba(0,180,216,0.5)] transition-all mt-4"
              data-testid="register-submit-btn"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          {/* Login link */}
          <p className="text-center text-slate-400">
            Already have an account?{" "}
            <Link 
              to="/login" 
              className="text-[#00B4D8] hover:text-[#00F5FF] font-medium transition-colors"
              data-testid="login-link"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
