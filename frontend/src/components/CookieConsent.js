import { useState, useEffect } from "react";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      // Small delay for better UX - let page load first
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("cookie_consent", JSON.stringify({
      accepted: true,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  const handleDeny = () => {
    localStorage.setItem("cookie_consent", JSON.stringify({
      accepted: false,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity duration-300"
      />
      
      {/* Cookie Banner */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-[101] p-4 md:p-6 animate-slide-up"
        data-testid="cookie-consent-banner"
      >
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#11161F] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4">
                {/* Cookie Icon */}
                <div className="hidden sm:flex w-12 h-12 rounded-xl bg-[#00677F]/10 items-center justify-center flex-shrink-0">
                  <Cookie className="w-6 h-6 text-[#00677F]" />
                </div>
                
                {/* Text Content */}
                <div className="flex-1">
                  <h3 className="text-white text-lg font-semibold mb-2 flex items-center gap-2">
                    <Cookie className="w-5 h-5 text-[#00677F] sm:hidden" />
                    We Use Cookies
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    We use cookies to enhance your browsing experience and analyze our traffic. 
                    By clicking "Accept All", you consent to our use of cookies.
                  </p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-5">
                <Button
                  onClick={handleAcceptAll}
                  className="flex-1 bg-[#00677F] hover:bg-[#135163] text-white rounded-xl h-11 font-medium shadow-lg shadow-[#00677F]/20"
                  data-testid="cookie-accept-all-btn"
                >
                  Accept All
                </Button>
                <Button
                  onClick={handleDeny}
                  variant="outline"
                  className="flex-1 border-white/10 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl h-11 font-medium"
                  data-testid="cookie-deny-btn"
                >
                  Deny
                </Button>
              </div>
              
              {/* Privacy Policy Link */}
              <p className="text-center text-slate-500 text-xs mt-4">
                Learn more in our{" "}
                <a href="#" className="text-[#00677F] hover:underline">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieConsent;
