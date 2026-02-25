import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/App";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Loader2, Check, Phone, X } from "lucide-react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Consent agreement state
  const [consentAgreed, setConsentAgreed] = useState(null); // null = not selected, true = agree, false = disagree
  const [showDisagreeModal, setShowDisagreeModal] = useState(false);

  // Phone number formatting
  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const passwordChecks = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "Contains a number", valid: /\d/.test(password) },
    { label: "Contains uppercase", valid: /[A-Z]/.test(password) },
  ];

  const handleConsentChange = (agreed) => {
    setConsentAgreed(agreed);
    if (!agreed) {
      setShowDisagreeModal(true);
    }
  };

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

    if (consentAgreed !== true) {
      toast.error("Please agree to the consent terms to create an account");
      return;
    }

    setLoading(true);
    try {
      await register(email, password, firstName, lastName, {
        consent_call: true,
        consent_text: true,
        consent_email: true,
        phone: phone
      });
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
      {/* Disagree Modal */}
      {showDisagreeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowDisagreeModal(false)} />
          <div className="relative bg-[#11161F] border border-white/10 rounded-2xl p-8 max-w-md mx-4 animate-slide-up">
            <button
              onClick={() => setShowDisagreeModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#FF9800]/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-[#FF9800]" />
              </div>
              <h3 className="text-white text-xl font-semibold mb-3">Complete Your Application by Phone</h3>
              <p className="text-slate-400 mb-6">
                Please call us to complete the application process:
              </p>
              <a 
                href="tel:855-481-9203"
                className="inline-block text-2xl font-bold text-[#00B4D8] hover:text-[#00F5FF] transition-colors mb-6"
              >
                855-481-9203
              </a>
              <p className="text-slate-500 text-sm">
                Our enrollment advisors are available to assist you.
              </p>
            </div>
          </div>
        </div>
      )}

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
              <Label htmlFor="phone" className="text-slate-300">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(000) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                  className="pl-12 h-12 bg-black/20 border-white/10 focus:border-[#00F5FF] focus:ring-1 focus:ring-[#00F5FF] text-white placeholder:text-slate-600 rounded-xl"
                  data-testid="register-phone-input"
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

            {/* Consent Agreement */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3 pb-2 border-b border-white/[0.05]">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Consent Agreement</span>
              </div>
              
              <div className="space-y-3">
                {/* I Agree Card */}
                <button
                  type="button"
                  onClick={() => {
                    if (firstName && lastName && email && phone && password && confirmPassword && password === confirmPassword) {
                      handleConsentChange(true);
                    } else {
                      toast.error("Please fill in all fields correctly before agreeing");
                    }
                  }}
                  className={`w-full p-4 rounded-xl border transform transition-all duration-500 ease-out ${
                    consentAgreed === true
                      ? "border-[#28A745]/50 bg-[#0d2818] scale-[1.02] shadow-[0_0_20px_rgba(40,167,69,0.2)]"
                      : (!firstName || !lastName || !email || !phone || !password || !confirmPassword || password !== confirmPassword)
                        ? "border-white/[0.05] bg-black/10 opacity-50"
                        : "border-white/[0.08] bg-black/20 hover:border-white/20 hover:scale-[1.01]"
                  }`}
                  data-testid="consent-agree-btn"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                        consentAgreed === true ? "bg-[#28A745]/20 scale-110" : "bg-slate-700/50"
                      }`}>
                        <Check className={`w-5 h-5 transition-all duration-500 ${consentAgreed === true ? "text-[#28A745]" : "text-slate-400"}`} />
                      </div>
                      <div className="text-left">
                        <h4 className={`font-medium transition-colors duration-500 ${consentAgreed === true ? "text-[#28A745]" : "text-white"}`}>
                          I Agree
                        </h4>
                        <p className="text-slate-400 text-sm">
                          Receive calls, texts, and emails from enrollment advisors
                        </p>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                      consentAgreed === true ? "border-[#28A745] bg-[#28A745] scale-110" : "border-slate-500"
                    }`}>
                      {consentAgreed === true && <Check className="w-4 h-4 text-white animate-[scale-in_0.3s_ease-out]" />}
                    </div>
                  </div>
                </button>

                {/* I Do Not Agree Card */}
                <button
                  type="button"
                  onClick={() => handleConsentChange(false)}
                  className={`w-full p-4 rounded-xl border transform transition-all duration-500 ease-out ${
                    consentAgreed === false
                      ? "border-[#00B4D8]/50 bg-[#0a1a20] scale-[1.02] shadow-[0_0_20px_rgba(0,180,216,0.2)]"
                      : "border-white/[0.08] bg-black/20 hover:border-white/20 hover:scale-[1.01]"
                  }`}
                  data-testid="consent-disagree-btn"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                        consentAgreed === false ? "bg-[#00B4D8]/20 scale-110" : "bg-slate-700/50"
                      }`}>
                        <Phone className={`w-5 h-5 transition-all duration-500 ${consentAgreed === false ? "text-[#00B4D8]" : "text-slate-400"}`} />
                      </div>
                      <div className="text-left">
                        <h4 className={`font-medium transition-colors duration-500 ${consentAgreed === false ? "text-[#00B4D8]" : "text-white"}`}>
                          I Do Not Agree
                        </h4>
                        <p className="text-slate-400 text-sm">
                          Complete application by phone instead
                        </p>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                      consentAgreed === false ? "border-[#00B4D8] bg-[#00B4D8] scale-110" : "border-slate-500"
                    }`}>
                      {consentAgreed === false && <Check className="w-4 h-4 text-white animate-[scale-in_0.3s_ease-out]" />}
                    </div>
                  </div>
                </button>
              </div>
              
              <p className="text-slate-500 text-xs leading-relaxed">
                By clicking "I Agree", I consent to the University of St. Augustine for Health Sciences using automated technology and/or pre-recorded means to email, text, and/or call me at the phone number above regarding educational services. I understand that my consent is not a required condition to purchase a good or service. I am providing an e-signature confirming my consent and my agreement to USAHS'{" "}
                <a href="#" className="text-[#00B4D8] hover:underline">Privacy Policy</a> and{" "}
                <a href="#" className="text-[#00B4D8] hover:underline">Terms of Use</a>. Msg and data rates may apply.
              </p>
              
              <p className="text-slate-600 text-xs">
                You can update these preferences at any time in your account settings.
              </p>
            </div>

            {consentAgreed === true && (
              <div className="animate-[fadeSlideUp_0.4s_ease-out]">
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
              </div>
            )}
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
