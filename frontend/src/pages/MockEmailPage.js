import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const MockEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const firstName = searchParams.get("firstName");

  const handleVerify = async () => {
    if (!token) {
      setError("Invalid verification link");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/verify-email/${token}`);
      const data = await response.json();
      
      if (response.ok && data.success) {
        setVerified(true);
        // Close this window after 3 seconds
        setTimeout(() => {
          window.close();
        }, 3000);
      } else {
        setError(data.detail || "Verification failed");
      }
    } catch (err) {
      setError("Failed to verify email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (verified) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center animate-[fadeSlideUp_0.5s_ease-out]">
          <div className="w-20 h-20 rounded-full bg-[#28A745]/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[#28A745]" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Email Verified!</h1>
          <p className="text-slate-400 mb-6">
            Your email has been successfully verified. This window will close automatically.
          </p>
          <p className="text-slate-500 text-sm">
            You can now return to your application portal.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950">
      {/* Email Client Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-blue-500 flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-slate-700 dark:text-slate-200">Mock Email Client</span>
            <span className="text-xs bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 px-2 py-1 rounded-full">
              Development Mode
            </span>
          </div>
          <span className="text-sm text-slate-500">Inbox</span>
        </div>
      </div>

      {/* Email Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
          {/* Email Header */}
          <div className="border-b border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#002855] flex items-center justify-center">
                  <span className="text-white font-bold text-lg">USA</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white">
                    University of St. Augustine for Health Sciences
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    noreply@usa.edu
                  </p>
                </div>
              </div>
              <span className="text-sm text-slate-400">Just now</span>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                <span className="text-slate-400">To:</span> {email || "student@example.com"}
              </p>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
                Verify Your Email Address
              </h2>
            </div>
          </div>

          {/* Email Body */}
          <div className="p-8">
            {/* Logo */}
            <div className="text-center mb-8">
              <img 
                src="https://customer-assets.emergentagent.com/job_student-journey-17/artifacts/lcfdritp_primary.Horiz.2line.knockedout.pms315.png"
                alt="University of St. Augustine for Health Sciences"
                className="h-16 mx-auto"
              />
            </div>

            {/* Content */}
            <div className="max-w-lg mx-auto text-center">
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
                Welcome to Your Application Portal!
              </h1>
              
              <p className="text-slate-600 dark:text-slate-300 mb-2">
                Hi {firstName || "there"},
              </p>
              
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Thank you for creating an account with the University of St. Augustine for Health Sciences. 
                To complete your registration and access your application, please verify your email address 
                by clicking the button below.
              </p>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                  <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                </div>
              )}

              <Button
                onClick={handleVerify}
                disabled={loading}
                className="px-8 py-6 bg-[#00B4D8] hover:bg-[#0096B4] text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                data-testid="verify-email-btn"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Verify Email Address
                  </span>
                )}
              </Button>

              <p className="text-slate-500 dark:text-slate-400 text-sm mt-6">
                This verification link will expire in 24 hours.
              </p>

              <div className="border-t border-slate-200 dark:border-slate-700 mt-8 pt-8">
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
                  If the button above doesn't work, copy and paste this link into your browser:
                </p>
                <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-3 break-all">
                  <code className="text-xs text-[#00B4D8]">
                    {window.location.origin}/verify-email?token={token}
                  </code>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 dark:border-slate-700 mt-8 pt-8 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">
                If you didn't create an account, you can safely ignore this email.
              </p>
              <p className="text-slate-400 dark:text-slate-500 text-xs">
                © 2026 University of St. Augustine for Health Sciences. All rights reserved.
              </p>
              <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">
                1 University Boulevard, St. Augustine, FL 32086
              </p>
            </div>
          </div>
        </div>

        {/* Development Notice */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-4 py-2 rounded-full text-sm">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            This is a mock email for development. In production, this would be sent via email service.
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockEmailPage;
