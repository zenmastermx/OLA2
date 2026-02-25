import { useState, useEffect } from "react";
import { Mail, RefreshCw, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const VerificationModal = ({ 
  isOpen, 
  email, 
  firstName, 
  verificationToken, 
  onVerified, 
  onClose,
  canClose = false 
}) => {
  const [checking, setChecking] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [currentToken, setCurrentToken] = useState(verificationToken);

  // Poll for verification status
  useEffect(() => {
    if (!isOpen) return;

    const checkVerification = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(`${API_URL}/api/auth/check-verification`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.email_verified) {
            toast.success("Email verified successfully!");
            onVerified?.();
          }
        }
      } catch (err) {
        console.error("Error checking verification:", err);
      }
    };

    // Check immediately
    checkVerification();

    // Then poll every 3 seconds
    const interval = setInterval(checkVerification, 3000);

    return () => clearInterval(interval);
  }, [isOpen, onVerified]);

  // Cooldown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const openMockEmail = () => {
    const params = new URLSearchParams({
      token: currentToken,
      email: email,
      firstName: firstName
    });
    
    const mockEmailUrl = `${window.location.origin}/mock-email?${params.toString()}`;
    window.open(mockEmailUrl, "_blank", "width=900,height=800");
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    
    setResending(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/auth/resend-verification`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setCurrentToken(data.verification_token);
        setCooldown(60);
        toast.success("New verification email sent!");
        
        // Open mock email with new token
        setTimeout(() => {
          const params = new URLSearchParams({
            token: data.verification_token,
            email: email,
            firstName: firstName
          });
          const mockEmailUrl = `${window.location.origin}/mock-email?${params.toString()}`;
          window.open(mockEmailUrl, "_blank", "width=900,height=800");
        }, 500);
      } else {
        toast.error("Failed to resend verification email");
      }
    } catch (err) {
      toast.error("Failed to resend verification email");
    } finally {
      setResending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={canClose ? onClose : undefined}
      />
      
      {/* Modal */}
      <div className="relative bg-[#11161F] border border-white/10 rounded-2xl p-8 max-w-md mx-4 animate-[fadeSlideUp_0.4s_ease-out] shadow-2xl">
        {canClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="text-center">
          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-[#00B4D8]/10 flex items-center justify-center mx-auto mb-6 relative">
            <Mail className="w-10 h-10 text-[#00B4D8]" />
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center animate-bounce">
              <span className="text-white text-xs font-bold">1</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-white mb-3">
            Verify Your Email Address
          </h2>

          {/* Email display */}
          <div className="bg-black/20 rounded-lg px-4 py-2 mb-4 inline-block">
            <span className="text-[#00B4D8] font-medium">{email}</span>
          </div>

          {/* Description */}
          <p className="text-slate-400 mb-6">
            We've sent a verification email to your inbox. Please click the link in the email to verify your account and continue.
          </p>

          {/* Important notice */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-6">
            <p className="text-amber-400 text-sm">
              <strong>Note:</strong> You must verify your email before you can start your application.
            </p>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <Button
              onClick={openMockEmail}
              className="w-full h-12 bg-[#00B4D8] hover:bg-[#0096B4] text-white rounded-xl font-medium shadow-[0_0_20px_rgba(0,180,216,0.3)] hover:shadow-[0_0_30px_rgba(0,180,216,0.5)] transition-all"
              data-testid="open-mock-email-btn"
            >
              <Mail className="w-5 h-5 mr-2" />
              Open Verification Email
            </Button>

            <Button
              onClick={handleResend}
              disabled={cooldown > 0 || resending}
              variant="outline"
              className="w-full h-12 bg-transparent border-white/10 hover:border-white/20 text-slate-300 hover:text-white rounded-xl font-medium transition-all"
              data-testid="resend-verification-btn"
            >
              {resending ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : cooldown > 0 ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Resend in {cooldown}s
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Resend Verification Email
                </>
              )}
            </Button>
          </div>

          {/* Help text */}
          <p className="text-slate-500 text-sm mt-6">
            Didn't receive the email? Check your spam folder or click resend above.
          </p>

          {/* Checking indicator */}
          <div className="flex items-center justify-center gap-2 mt-4 text-slate-500 text-sm">
            <div className="w-2 h-2 rounded-full bg-[#00B4D8] animate-pulse" />
            Waiting for verification...
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;
