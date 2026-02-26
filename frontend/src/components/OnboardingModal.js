import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Save, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  X,
  CheckCircle
} from "lucide-react";

const OnboardingModal = ({ isOpen, onComplete, appId }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleComplete = () => {
    // Store completion per application ID
    if (appId) {
      localStorage.setItem(`onboarding_completed_${appId}`, "true");
    }
    onComplete?.();
  };

  const handleSkip = () => {
    // Store completion per application ID
    if (appId) {
      localStorage.setItem(`onboarding_completed_${appId}`, "true");
    }
    onComplete?.();
  };

  const steps = [
    {
      icon: LayoutDashboard,
      iconColor: "#00677F",
      iconBg: "bg-[#00677F]/10",
      title: "Welcome to Your Application!",
      subtitle: "Let's show you around",
      content: (
        <>
          <p className="text-slate-300 mb-4">
            Your <span className="text-[#00677F] font-semibold">Dashboard</span> is your home base. 
            From there you can:
          </p>
          <ul className="space-y-3 text-slate-400">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#739600] mt-0.5 flex-shrink-0" />
              <span>Track your application progress</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#739600] mt-0.5 flex-shrink-0" />
              <span>View upcoming deadlines</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#739600] mt-0.5 flex-shrink-0" />
              <span>Contact your enrollment advisor</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#739600] mt-0.5 flex-shrink-0" />
              <span>Manage your documents</span>
            </li>
          </ul>
        </>
      )
    },
    {
      icon: Save,
      iconColor: "#739600",
      iconBg: "bg-[#739600]/10",
      title: "Your Progress is Auto-Saved",
      subtitle: "Pick up where you left off",
      content: (
        <>
          <p className="text-slate-300 mb-4">
            Don't worry about losing your work! Your application 
            <span className="text-[#739600] font-semibold"> saves automatically</span> as you fill out each section.
          </p>
          <div className="bg-[#739600]/10 border border-[#739600]/20 rounded-xl p-4 mb-4">
            <p className="text-[#739600] text-sm font-medium mb-2">Pro Tips:</p>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#739600]">•</span>
                <span>Use the navigation on the left to jump between sections</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#739600]">•</span>
                <span>Green checkmarks indicate completed sections</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#739600]">•</span>
                <span>You can return anytime from your Dashboard</span>
              </li>
            </ul>
          </div>
          <p className="text-slate-400 text-sm">
            Click <span className="text-white font-medium">"Dashboard"</span> in the top left to return to your Dashboard at any time.
          </p>
        </>
      )
    },
    {
      icon: Sparkles,
      iconColor: "#7B68EE",
      iconBg: "bg-[#7B68EE]/10",
      title: "Meet Journey, Your AI Assistant",
      subtitle: "Get help anytime you need it",
      content: (
        <>
          <p className="text-slate-300 mb-4">
            <span className="text-[#7B68EE] font-semibold">Journey</span> is your personal AI assistant, 
            ready to help you throughout your application process.
          </p>
          <div className="bg-gradient-to-r from-[#7B68EE]/10 to-[#00677F]/10 border border-[#7B68EE]/20 rounded-xl p-4 mb-4">
            <p className="text-white text-sm font-medium mb-3">Ask Journey about:</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <Sparkles className="w-4 h-4 text-[#7B68EE]" />
                <span>Program requirements</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Sparkles className="w-4 h-4 text-[#7B68EE]" />
                <span>Application tips</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Sparkles className="w-4 h-4 text-[#7B68EE]" />
                <span>Document help</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Sparkles className="w-4 h-4 text-[#7B68EE]" />
                <span>Deadlines & dates</span>
              </div>
            </div>
          </div>
          <p className="text-slate-400 text-sm">
            Look for the <span className="text-[#7B68EE] font-medium">"Ask Journey"</span> button 
            in the top right corner of your screen.
          </p>
        </>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 200);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 200);
    }
  };

  if (!isOpen) return null;

  const step = steps[currentStep];
  const Icon = step.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      {/* Modal */}
      <div className="relative bg-[#11161F] border border-white/10 rounded-2xl max-w-lg w-full mx-4 overflow-hidden shadow-2xl">
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/5">
          <div 
            className="h-full bg-gradient-to-r from-[#00677F] to-[#7B68EE] transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors text-sm flex items-center gap-1"
        >
          Skip tour
          <X className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className={`p-8 pt-12 transition-opacity duration-200 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          {/* Icon */}
          <div className={`w-16 h-16 rounded-2xl ${step.iconBg} flex items-center justify-center mx-auto mb-6`}>
            <Icon className="w-8 h-8" style={{ color: step.iconColor }} />
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">{step.title}</h2>
            <p className="text-slate-400">{step.subtitle}</p>
          </div>

          {/* Step content */}
          <div className="mb-8">
            {step.content}
          </div>

          {/* Step indicators */}
          <div className="flex justify-center gap-2 mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStep 
                    ? 'w-8 bg-[#00677F]' 
                    : index < currentStep 
                      ? 'w-2 bg-[#739600]' 
                      : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-3">
            {currentStep > 0 && (
              <Button
                onClick={handleBack}
                variant="outline"
                className="flex-1 h-12 bg-transparent border-white/10 hover:border-white/20 text-slate-300 hover:text-white rounded-xl"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              className={`flex-1 h-12 rounded-xl font-medium transition-all ${
                currentStep === steps.length - 1
                  ? 'bg-gradient-to-r from-[#00677F] to-[#7B68EE] hover:opacity-90 text-white shadow-[0_0_20px_rgba(0,180,216,0.3)]'
                  : 'bg-[#00677F] hover:bg-[#135163] text-white'
              }`}
            >
              {currentStep === steps.length - 1 ? (
                <>
                  Get Started
                  <CheckCircle className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
