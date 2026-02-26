import { useState, useEffect } from "react";
import { Cookie, X, Shield, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

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
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  const handleDeny = () => {
    localStorage.setItem("cookie_consent", JSON.stringify({
      essential: true, // Essential cookies are always needed
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem("cookie_consent", JSON.stringify({
      essential: true,
      analytics: false,
      marketing: false,
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
        onClick={() => {}} // Prevent closing by clicking backdrop
      />
      
      {/* Cookie Banner */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-[101] p-4 md:p-6 animate-slide-up"
        data-testid="cookie-consent-banner"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#11161F] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
            {/* Main Content */}
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
                    We Value Your Privacy
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                    By clicking "Accept All", you consent to our use of cookies. 
                    You can also choose to accept only essential cookies or customize your preferences.
                  </p>
                  
                  {/* Details Toggle */}
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="text-[#00677F] hover:text-[#A1D8E0] text-sm font-medium mt-3 flex items-center gap-1 transition-colors"
                    data-testid="cookie-details-toggle"
                  >
                    <Settings className="w-4 h-4" />
                    {showDetails ? "Hide Details" : "Cookie Details"}
                  </button>
                  
                  {/* Expandable Details */}
                  {showDetails && (
                    <div className="mt-4 space-y-3 pt-4 border-t border-white/10 animate-slide-up">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#739600]/10 flex items-center justify-center flex-shrink-0">
                          <Shield className="w-4 h-4 text-[#739600]" />
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">Essential Cookies</p>
                          <p className="text-slate-500 text-xs">Required for the website to function. Cannot be disabled.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#7B68EE]/10 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-[#7B68EE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">Analytics Cookies</p>
                          <p className="text-slate-500 text-xs">Help us understand how visitors interact with our website.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#FF9800]/10 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-[#FF9800]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">Marketing Cookies</p>
                          <p className="text-slate-500 text-xs">Used to deliver personalized advertisements.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-white/5">
                <Button
                  onClick={handleAcceptAll}
                  className="flex-1 bg-[#00677F] hover:bg-[#135163] text-white rounded-xl h-11 font-medium shadow-lg shadow-[#00677F]/20"
                  data-testid="cookie-accept-all-btn"
                >
                  Accept All Cookies
                </Button>
                <Button
                  onClick={handleAcceptEssential}
                  variant="outline"
                  className="flex-1 border-white/10 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl h-11 font-medium"
                  data-testid="cookie-accept-essential-btn"
                >
                  Essential Only
                </Button>
                <Button
                  onClick={handleDeny}
                  variant="ghost"
                  className="flex-1 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl h-11 font-medium"
                  data-testid="cookie-deny-btn"
                >
                  Deny All
                </Button>
              </div>
              
              {/* Privacy Policy Link */}
              <p className="text-center text-slate-500 text-xs mt-4">
                By using our site, you agree to our{" "}
                <a href="#" className="text-[#00677F] hover:underline">Privacy Policy</a>
                {" "}and{" "}
                <a href="#" className="text-[#00677F] hover:underline">Cookie Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieConsent;
