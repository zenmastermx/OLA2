import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  FileText, 
  Send, 
  CheckCircle2,
  X,
  Lightbulb,
  AlertCircle,
  Clock,
  BookOpen
} from "lucide-react";

// Step-specific onboarding content
const stepOnboardingContent = {
  1: {
    icon: User,
    iconColor: "#00677F",
    title: "Personal Information",
    subtitle: "Tell us about yourself",
    tips: [
      "Fill out your legal name as it appears on official documents",
      "Provide accurate contact information - we'll use this to reach you",
      "Your address will be used for sending important materials",
      "All fields marked with * are required"
    ],
    reminder: "Your progress is automatically saved as you complete each section."
  },
  2: {
    icon: GraduationCap,
    iconColor: "#7B68EE",
    title: "Academic History",
    subtitle: "Share your educational background",
    tips: [
      "Add all colleges/universities you've attended",
      "Include your prerequisites and track completion status",
      "TOEFL scores are required for international students",
      "Check Course Equivalency if unsure about prerequisites"
    ],
    reminder: "All post-secondary official transcripts must be submitted, regardless of whether they contain applicable courses."
  },
  3: {
    icon: Briefcase,
    iconColor: "#DC5034",
    title: "Employment History",
    subtitle: "Share your work experience",
    tips: [
      "List your most recent employment first",
      "Include healthcare-related experience if applicable",
      "Volunteer work and internships count too!",
      "Provide supervisor contact info for verification"
    ],
    reminder: "Employment history helps us understand your background and commitment to healthcare."
  },
  4: {
    icon: FileText,
    iconColor: "#739600",
    title: "Documents Required",
    subtitle: "Upload your supporting documents",
    tips: [
      "Upload unofficial transcripts from each institution",
      "Accepted formats: PDF, JPG, PNG (max 10MB each)",
      "You can upload multiple files per document type",
      "Ensure documents are clear and readable"
    ],
    reminder: "Official transcripts will be requested in the next step."
  },
  5: {
    icon: Send,
    iconColor: "#00677F",
    title: "Request Official Transcripts",
    subtitle: "Verify your transcript requests",
    tips: [
      "Request official transcripts directly from each institution",
      "Mark each institution as 'Requested' after you've ordered",
      "Enter the date you submitted each request",
      "Transcripts should be sent directly to USA.edu"
    ],
    reminder: "Processing times vary by institution. Request early to avoid delays!"
  },
  6: {
    icon: CheckCircle2,
    iconColor: "#739600",
    title: "Review & Submit",
    subtitle: "Final review before submission",
    tips: [
      "Review all sections for accuracy",
      "Ensure all required documents are uploaded",
      "Verify transcript requests are marked complete",
      "Once submitted, changes cannot be made"
    ],
    reminder: "Take your time to review everything carefully before submitting."
  }
};

const StepOnboardingModal = ({ isOpen, step, appId, onComplete }) => {
  const content = stepOnboardingContent[step];
  
  if (!isOpen || !content) return null;

  const handleComplete = () => {
    // Store completion for this specific step
    if (appId) {
      localStorage.setItem(`step_onboarding_${appId}_${step}`, "true");
    }
    onComplete?.();
  };

  const Icon = content.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleComplete} />
      
      {/* Modal */}
      <div className="relative bg-[#11161F] border border-white/10 rounded-2xl max-w-md w-full mx-4 overflow-hidden shadow-2xl animate-[fadeSlideUp_0.4s_ease-out]">
        {/* Close button */}
        <button
          onClick={handleComplete}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with icon */}
        <div className="p-6 pb-0">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{ backgroundColor: `${content.iconColor}15` }}
          >
            <Icon className="w-7 h-7" style={{ color: content.iconColor }} />
          </div>
          
          <h2 className="text-xl font-bold text-white mb-1">{content.title}</h2>
          <p className="text-slate-400 text-sm">{content.subtitle}</p>
        </div>

        {/* Tips section */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-[#C9DD03]" />
            <span className="text-sm font-medium text-[#C9DD03]">Quick Tips</span>
          </div>
          
          <ul className="space-y-2.5">
            {content.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-[#739600] mt-0.5 flex-shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>

          {/* Reminder box */}
          <div className="mt-4 p-3 rounded-xl bg-[#00677F]/10 border border-[#00677F]/20">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-[#00677F] mt-0.5 flex-shrink-0" />
              <p className="text-xs text-slate-300">{content.reminder}</p>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="p-6 pt-0">
          <Button
            onClick={handleComplete}
            className="w-full h-11 rounded-xl font-medium transition-all"
            style={{ 
              backgroundColor: content.iconColor,
              color: 'white'
            }}
          >
            Got it, let's go!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepOnboardingModal;
