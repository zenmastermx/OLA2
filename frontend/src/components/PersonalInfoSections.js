import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Phone, User, Shield, Heart, Flag, Briefcase, Users, Check, ChevronRight, Plus, Trash2
} from "lucide-react";

// Phone number formatting function
const formatPhoneNumber = (value) => {
  if (!value) return value;
  
  // Remove all non-digit characters
  const phoneNumber = value.replace(/\D/g, '');
  
  // Get the length of the phone number
  const phoneNumberLength = phoneNumber.length;
  
  // Format based on length
  if (phoneNumberLength < 4) {
    return phoneNumber;
  }
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};

const PersonalInfoSections = ({ personalInfo, setPersonalInfo, onSectionComplete }) => {
  const [activeSubSection, setActiveSubSection] = useState(0);

  const subSections = [
    { id: 0, label: "Contact Information", icon: Phone },
    { id: 1, label: "Judicial Background", icon: Shield },
    { id: 2, label: "Emergency Contact", icon: Heart },
    { id: 3, label: "Citizenship & Identification", icon: Flag },
    { id: 4, label: "US Military Background", icon: Shield },
    { id: 5, label: "Work Experience", icon: Briefcase },
    { id: 6, label: "Demographic Information", icon: Users },
  ];

  const isSubSectionComplete = (sectionId) => {
    switch (sectionId) {
      case 0:
        return !!(personalInfo.first_name && personalInfo.last_name && personalInfo.email);
      case 1:
        return personalInfo.judicial_agreement != null && personalInfo.judicial_agreement !== "";
      case 2:
        return !!(personalInfo.emergency_first_name && personalInfo.emergency_phone);
      case 3:
        return !!(personalInfo.date_of_birth && personalInfo.gender);
      case 4:
        return personalInfo.veteran_benefits != null && personalInfo.veteran_benefits !== "";
      case 5:
        return personalInfo.years_work_experience != null && personalInfo.years_work_experience !== "";
      case 6:
        return personalInfo.ethnicity != null && personalInfo.ethnicity !== "";
      default:
        return false;
    }
  };

  const renderSubSection = () => {
    switch (activeSubSection) {
      case 0:
        return (
          <div className="space-y-8" data-testid="subsection-contact">
            {/* Section Header */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#00677F] to-[#7B68EE] rounded-full" />
              <h3 className="text-2xl font-light text-white tracking-tight">Contact Information</h3>
              <p className="text-slate-500 text-sm mt-1">Let us know how to reach you</p>
            </div>

            {/* WHO YOU ARE - Glass Card */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 space-y-5 hover:border-[#00677F]/20 transition-colors duration-500">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#00677F]/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-[#00677F]" />
                </div>
                <h4 className="text-xs font-medium uppercase tracking-wider text-slate-500">Who You Are</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    First Name <span className="text-[#A1D8E0]">*</span>
                  </Label>
                  <Input
                    value={personalInfo.first_name || ""}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, first_name: e.target.value })}
                    className="h-12 bg-black/30 border-white/[0.08] focus:border-[#A1D8E0] focus:ring-2 focus:ring-[#A1D8E0]/20 text-white rounded-full px-5 transition-all duration-300 placeholder:text-slate-600"
                    placeholder="Enter first name"
                    data-testid="contact-firstname"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">Middle Name</Label>
                  <Input
                    value={personalInfo.middle_name || ""}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, middle_name: e.target.value })}
                    className="h-12 bg-black/30 border-white/[0.08] focus:border-[#A1D8E0] focus:ring-2 focus:ring-[#A1D8E0]/20 text-white rounded-full px-5 transition-all duration-300 placeholder:text-slate-600"
                    placeholder="Optional"
                    data-testid="contact-middlename"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Last Name <span className="text-[#A1D8E0]">*</span>
                  </Label>
                  <Input
                    value={personalInfo.last_name || ""}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, last_name: e.target.value })}
                    className="h-12 bg-black/30 border-white/[0.08] focus:border-[#A1D8E0] focus:ring-2 focus:ring-[#A1D8E0]/20 text-white rounded-full px-5 transition-all duration-300 placeholder:text-slate-600"
                    placeholder="Enter last name"
                    data-testid="contact-lastname"
                  />
                </div>
              </div>
              
              <div className="max-w-xs">
                <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">Preferred Name</Label>
                <p className="text-slate-600 text-xs mb-2">What should we call you?</p>
                <Input
                  value={personalInfo.preferred_name || ""}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, preferred_name: e.target.value })}
                  className="h-12 bg-black/30 border-white/[0.08] focus:border-[#A1D8E0] focus:ring-2 focus:ring-[#A1D8E0]/20 text-white rounded-full px-5 transition-all duration-300 placeholder:text-slate-600"
                  placeholder="Nickname or preferred name"
                  data-testid="contact-preferredname"
                />
              </div>
            </div>

            {/* HOW TO REACH YOU - Glass Card */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 space-y-5 hover:border-[#7B68EE]/20 transition-colors duration-500">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#7B68EE]/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-[#7B68EE]" />
                </div>
                <h4 className="text-xs font-medium uppercase tracking-wider text-slate-500">How to Reach You</h4>
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Email Address <span className="text-[#A1D8E0]">*</span>
                </Label>
                <p className="text-slate-600 text-xs">We'll send application updates here</p>
                <Input
                  type="email"
                  value={personalInfo.email || ""}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                  className="h-12 bg-black/30 border-white/[0.08] focus:border-[#A1D8E0] focus:ring-2 focus:ring-[#A1D8E0]/20 text-white rounded-full px-5 transition-all duration-300 placeholder:text-slate-600 max-w-md"
                  placeholder="you@example.com"
                  data-testid="contact-email"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                <div className="space-y-2">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Phone Number <span className="text-[#A1D8E0]">*</span>
                  </Label>
                  <Input
                    type="tel"
                    inputMode="numeric"
                    value={formatPhoneNumber(personalInfo.phone) || ""}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, phone: formatPhoneNumber(e.target.value) })}
                    placeholder="(000) 000-0000"
                    className="h-12 bg-black/30 border-white/[0.08] focus:border-[#A1D8E0] focus:ring-2 focus:ring-[#A1D8E0]/20 text-white rounded-full px-5 transition-all duration-300 placeholder:text-slate-600"
                    data-testid="contact-phone"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">Mobile Phone</Label>
                  <Input
                    type="tel"
                    inputMode="numeric"
                    value={formatPhoneNumber(personalInfo.alternate_phone) || ""}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, alternate_phone: formatPhoneNumber(e.target.value) })}
                    placeholder="(000) 000-0000"
                    className="h-12 bg-black/30 border-white/[0.08] focus:border-[#A1D8E0] focus:ring-2 focus:ring-[#A1D8E0]/20 text-white rounded-full px-5 transition-all duration-300 placeholder:text-slate-600"
                    data-testid="contact-altphone"
                  />
                </div>
              </div>
            </div>

            {/* WHERE YOU LIVE - Glass Card */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 space-y-5 hover:border-[#739600]/20 transition-colors duration-500">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#739600]/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#739600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="text-xs font-medium uppercase tracking-wider text-slate-500">Where You Live</h4>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">Street Address</Label>
                <Input
                  value={personalInfo.address || ""}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                  className="h-12 bg-black/30 border-white/[0.08] focus:border-[#A1D8E0] focus:ring-2 focus:ring-[#A1D8E0]/20 text-white rounded-full px-5 transition-all duration-300 placeholder:text-slate-600"
                  placeholder="123 Main Street, Apt 4B"
                  data-testid="contact-address"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2 col-span-2 md:col-span-1">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">City</Label>
                  <Input
                    value={personalInfo.city || ""}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, city: e.target.value })}
                    className="h-12 bg-black/30 border-white/[0.08] focus:border-[#A1D8E0] focus:ring-2 focus:ring-[#A1D8E0]/20 text-white rounded-full px-5 transition-all duration-300 placeholder:text-slate-600"
                    placeholder="City"
                    data-testid="contact-city"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">State</Label>
                  <Input
                    value={personalInfo.state || ""}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, state: e.target.value })}
                    className="h-12 bg-black/30 border-white/[0.08] focus:border-[#A1D8E0] focus:ring-2 focus:ring-[#A1D8E0]/20 text-white rounded-full px-5 transition-all duration-300 placeholder:text-slate-600"
                    placeholder="FL"
                    data-testid="contact-state"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">ZIP Code</Label>
                  <Input
                    inputMode="numeric"
                    value={personalInfo.zip_code || ""}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, zip_code: e.target.value })}
                    className="h-12 bg-black/30 border-white/[0.08] focus:border-[#A1D8E0] focus:ring-2 focus:ring-[#A1D8E0]/20 text-white rounded-full px-5 transition-all duration-300 placeholder:text-slate-600"
                    placeholder="32084"
                    data-testid="contact-zip"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">Country</Label>
                  <Input
                    value={personalInfo.country || "United States"}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, country: e.target.value })}
                    className="h-12 bg-black/30 border-white/[0.08] focus:border-[#A1D8E0] focus:ring-2 focus:ring-[#A1D8E0]/20 text-white rounded-full px-5 transition-all duration-300 placeholder:text-slate-600"
                    data-testid="contact-country"
                  />
                </div>
              </div>
            </div>

            {/* Completion Indicator */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#00677F]/5 border border-[#00677F]/10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#A1D8E0] animate-pulse" />
                <span className="text-sm text-slate-400">
                  {personalInfo.first_name && personalInfo.last_name && personalInfo.email && personalInfo.phone
                    ? "All required fields completed"
                    : "Complete required fields to continue"}
                </span>
              </div>
              <span className="text-xs font-medium text-[#A1D8E0]">
                {[personalInfo.first_name, personalInfo.last_name, personalInfo.email, personalInfo.phone].filter(Boolean).length}/4 required
              </span>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-8" data-testid="subsection-judicial">
            {/* Section Header */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#FF6B35] to-[#FF8C5A] rounded-full" />
              <h3 className="text-2xl font-light text-white tracking-tight">Judicial Background</h3>
              <p className="text-slate-500 text-sm mt-1">Required background check disclosure</p>
            </div>

            {/* Background Check Agreement - Glass Card */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 space-y-5 hover:border-[#FF6B35]/20 transition-colors duration-500">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#FF6B35]/10 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-[#FF6B35]" />
                </div>
                <h4 className="text-xs font-medium uppercase tracking-wider text-slate-500">Background Check Agreement</h4>
              </div>
              
              <div className="p-4 rounded-xl bg-[#FF6B35]/5 border border-[#FF6B35]/10">
                <p className="text-slate-300 text-sm leading-relaxed">
                  All applicants are required to complete a criminal background check as part of the admission process. 
                  Clinical affiliates may require additional background checks prior to clinical placement. 
                  Certain criminal convictions may affect eligibility for licensure in your chosen field.
                </p>
              </div>
              
              <RadioGroup
                value={personalInfo.judicial_agreement}
                onValueChange={(value) => setPersonalInfo({ ...personalInfo, judicial_agreement: value })}
                className="space-y-3"
              >
                <div className={`flex items-center space-x-3 p-4 rounded-full border transition-all duration-300 cursor-pointer ${
                  personalInfo.judicial_agreement === "agree" 
                    ? "border-[#739600]/50 bg-[#739600]/10" 
                    : "border-white/[0.08] bg-black/30 hover:border-[#00677F]/30"
                }`}>
                  <RadioGroupItem value="agree" id="agree" className="border-[#00677F]" />
                  <Label htmlFor="agree" className="text-white cursor-pointer flex-1 text-sm">
                    I Agree - I understand and consent to the background check requirements
                  </Label>
                  {personalInfo.judicial_agreement === "agree" && <Check className="w-4 h-4 text-[#739600]" />}
                </div>
                <div className={`flex items-center space-x-3 p-4 rounded-full border transition-all duration-300 cursor-pointer ${
                  personalInfo.judicial_agreement === "disagree" 
                    ? "border-[#FF6B35]/50 bg-[#FF6B35]/10" 
                    : "border-white/[0.08] bg-black/30 hover:border-[#00677F]/30"
                }`}>
                  <RadioGroupItem value="disagree" id="disagree" className="border-[#00677F]" />
                  <Label htmlFor="disagree" className="text-white cursor-pointer flex-1 text-sm">
                    I Do Not Agree
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Criminal History - Glass Card */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 space-y-5 hover:border-[#7B68EE]/20 transition-colors duration-500">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#7B68EE]/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#7B68EE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h4 className="text-xs font-medium uppercase tracking-wider text-slate-500">Criminal History Disclosure</h4>
              </div>

              <div className="space-y-3">
                <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Have you ever been convicted of a felony? <span className="text-[#A1D8E0]">*</span>
                </Label>
                <RadioGroup
                  value={personalInfo.felony_conviction}
                  onValueChange={(value) => setPersonalInfo({ ...personalInfo, felony_conviction: value })}
                  className="flex gap-4"
                >
                  <div className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all duration-300 cursor-pointer ${
                    personalInfo.felony_conviction === "yes" 
                      ? "border-[#A1D8E0]/50 bg-[#A1D8E0]/10" 
                      : "border-white/[0.08] bg-black/30 hover:border-white/20"
                  }`}>
                    <RadioGroupItem value="yes" id="felony-yes" />
                    <Label htmlFor="felony-yes" className="text-white cursor-pointer">Yes</Label>
                  </div>
                  <div className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all duration-300 cursor-pointer ${
                    personalInfo.felony_conviction === "no" 
                      ? "border-[#A1D8E0]/50 bg-[#A1D8E0]/10" 
                      : "border-white/[0.08] bg-black/30 hover:border-white/20"
                  }`}>
                    <RadioGroupItem value="no" id="felony-no" />
                    <Label htmlFor="felony-no" className="text-white cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              {personalInfo.felony_conviction === "yes" && (
                <div className="space-y-2 pt-2 animate-in slide-in-from-top-2 duration-300">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Please explain the circumstances
                  </Label>
                  <p className="text-slate-600 text-xs">This information will be reviewed confidentially</p>
                  <Textarea
                    value={personalInfo.felony_explanation || ""}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, felony_explanation: e.target.value })}
                    placeholder="Provide details about the conviction..."
                    className="min-h-[120px] bg-black/30 border-white/[0.08] focus:border-[#A1D8E0] focus:ring-2 focus:ring-[#A1D8E0]/20 text-white rounded-2xl resize-none transition-all duration-300 placeholder:text-slate-600"
                    data-testid="felony-explanation"
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8" data-testid="subsection-emergency">
            {/* Section Header */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#E91E63] to-[#F48FB1] rounded-full" />
              <h3 className="text-2xl font-light text-white tracking-tight">Emergency Contact</h3>
              <p className="text-slate-500 text-sm mt-1">Someone we can reach in case of emergency</p>
            </div>

            {/* Contact Person - Glass Card */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 space-y-5 hover:border-[#E91E63]/20 transition-colors duration-500">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#E91E63]/10 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-[#E91E63]" />
                </div>
                <h4 className="text-xs font-medium uppercase tracking-wider text-slate-500">Contact Person</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    First Name <span className="text-[#A1D8E0]">*</span>
                  </Label>
                  <Input
                    value={personalInfo.emergency_first_name || ""}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, emergency_first_name: e.target.value })}
                    className="h-12 bg-black/30 border-white/[0.08] focus:border-[#A1D8E0] focus:ring-2 focus:ring-[#A1D8E0]/20 text-white rounded-full px-5 transition-all duration-300 placeholder:text-slate-600"
                    placeholder="Contact's first name"
                    data-testid="emergency-firstname"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Last Name <span className="text-[#A1D8E0]">*</span>
                  </Label>
                  <Input
                    value={personalInfo.emergency_last_name || ""}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, emergency_last_name: e.target.value })}
                    className="h-12 bg-black/30 border-white/[0.08] focus:border-[#A1D8E0] focus:ring-2 focus:ring-[#A1D8E0]/20 text-white rounded-full px-5 transition-all duration-300 placeholder:text-slate-600"
                    placeholder="Contact's last name"
                    data-testid="emergency-lastname"
                  />
                </div>
              </div>

              <div className="space-y-2 max-w-xs">
                <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Relationship <span className="text-[#A1D8E0]">*</span>
                </Label>
                <Select
                  value={personalInfo.emergency_relationship || ""}
                  onValueChange={(value) => setPersonalInfo({ ...personalInfo, emergency_relationship: value })}
                >
                  <SelectTrigger className="h-12 bg-black/30 border-white/[0.08] text-white rounded-full px-5 focus:border-[#A1D8E0] focus:ring-2 focus:ring-[#A1D8E0]/20" data-testid="emergency-relationship">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#11161F] border-white/10 rounded-xl">
                    <SelectItem value="spouse">Spouse / Partner</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="sibling">Sibling</SelectItem>
                    <SelectItem value="child">Child</SelectItem>
                    <SelectItem value="friend">Friend</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Contact Details - Glass Card */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 space-y-5 hover:border-[#00677F]/20 transition-colors duration-500">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#00677F]/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-[#00677F]" />
                </div>
                <h4 className="text-xs font-medium uppercase tracking-wider text-slate-500">Contact Details</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Phone Number <span className="text-[#A1D8E0]">*</span>
                  </Label>
                  <Input
                    type="tel"
                    inputMode="numeric"
                    value={formatPhoneNumber(personalInfo.emergency_phone) || ""}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, emergency_phone: formatPhoneNumber(e.target.value) })}
                    placeholder="(000) 000-0000"
                    className="h-12 bg-black/30 border-white/[0.08] focus:border-[#A1D8E0] focus:ring-2 focus:ring-[#A1D8E0]/20 text-white rounded-full px-5 transition-all duration-300 placeholder:text-slate-600"
                    data-testid="emergency-phone"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">Email Address</Label>
                  <Input
                    type="email"
                    value={personalInfo.emergency_email || ""}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, emergency_email: e.target.value })}
                    placeholder="contact@email.com"
                    className="h-12 bg-black/30 border-white/[0.08] focus:border-[#A1D8E0] focus:ring-2 focus:ring-[#A1D8E0]/20 text-white rounded-full px-5 transition-all duration-300 placeholder:text-slate-600"
                    data-testid="emergency-email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">Address</Label>
                <p className="text-slate-600 text-xs">Optional - helpful if they live nearby</p>
                <Input
                  value={personalInfo.emergency_address || ""}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, emergency_address: e.target.value })}
                  placeholder="Street Address, City, State ZIP"
                  className="h-12 bg-black/30 border-white/[0.08] focus:border-[#A1D8E0] focus:ring-2 focus:ring-[#A1D8E0]/20 text-white rounded-full px-5 transition-all duration-300 placeholder:text-slate-600"
                  data-testid="emergency-address"
                />
              </div>
            </div>

            {/* Completion Indicator */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#E91E63]/5 border border-[#E91E63]/10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#E91E63] animate-pulse" />
                <span className="text-sm text-slate-400">
                  {personalInfo.emergency_first_name && personalInfo.emergency_phone
                    ? "Emergency contact information complete"
                    : "Please provide emergency contact details"}
                </span>
              </div>
              <span className="text-xs font-medium text-[#E91E63]">
                {[personalInfo.emergency_first_name, personalInfo.emergency_last_name, personalInfo.emergency_phone, personalInfo.emergency_relationship].filter(Boolean).length}/4 required
              </span>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8" data-testid="subsection-citizenship">
            {/* Section Header */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#3F51B5] to-[#7986CB] rounded-full" />
              <h3 className="text-2xl font-light text-white tracking-tight">Citizenship & Identification</h3>
              <p className="text-slate-500 text-sm mt-1">Identity verification and residency information</p>
            </div>

            {/* Personal Details - Glass Card */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 space-y-5 hover:border-[#3F51B5]/20 transition-colors duration-500">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#3F51B5]/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-[#3F51B5]" />
                </div>
                <h4 className="text-xs font-medium uppercase tracking-wider text-slate-500">Personal Details</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Date of Birth <span className="text-[#A1D8E0]">*</span>
                  </Label>
                  <Input
                    type="date"
                    value={personalInfo.date_of_birth || ""}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, date_of_birth: e.target.value })}
                    className="h-12 bg-black/30 border-white/[0.08] focus:border-[#A1D8E0] focus:ring-2 focus:ring-[#A1D8E0]/20 text-white rounded-full px-5 transition-all duration-300"
                    data-testid="citizenship-dob"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    What pronouns do you use? <span className="text-[#A1D8E0]">*</span>
                  </Label>
                  <RadioGroup
                    value={personalInfo.gender || ""}
                    onValueChange={(value) => setPersonalInfo({ ...personalInfo, gender: value })}
                    className="flex flex-wrap gap-3 items-center"
                  >
                    {[
                      { value: "he_him", label: "He / Him" },
                      { value: "she_her", label: "She / Her" },
                      { value: "they_them", label: "They / Them" },
                      { value: "prefer_not_to_say", label: "Prefer not to say" }
                    ].map((option) => (
                      <div key={option.value} className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-300 cursor-pointer ${
                        personalInfo.gender === option.value 
                          ? "border-[#A1D8E0]/50 bg-[#A1D8E0]/10" 
                          : "border-white/[0.08] bg-black/30 hover:border-white/20"
                      }`}>
                        <RadioGroupItem value={option.value} id={`pronoun-${option.value}`} />
                        <Label htmlFor={`pronoun-${option.value}`} className="text-white cursor-pointer text-sm">{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">Marital Status</Label>
                <RadioGroup
                  value={personalInfo.marital_status || ""}
                  onValueChange={(value) => setPersonalInfo({ ...personalInfo, marital_status: value })}
                  className="flex gap-3"
                >
                  {[
                    { value: "single", label: "Single" },
                    { value: "married", label: "Married" },
                    { value: "widowed", label: "Widowed" },
                    { value: "divorced", label: "Divorced" }
                  ].map((option) => (
                    <div key={option.value} className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-300 cursor-pointer ${
                      personalInfo.marital_status === option.value 
                        ? "border-[#A1D8E0]/50 bg-[#A1D8E0]/10" 
                        : "border-white/[0.08] bg-black/30 hover:border-white/20"
                    }`}>
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="text-white cursor-pointer text-sm">{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>

            {/* Citizenship Status - Glass Card */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 space-y-5 hover:border-[#00677F]/20 transition-colors duration-500">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#00677F]/10 flex items-center justify-center">
                  <Flag className="w-4 h-4 text-[#00677F]" />
                </div>
                <h4 className="text-xs font-medium uppercase tracking-wider text-slate-500">Citizenship Status</h4>
              </div>
              
              <div className="space-y-3">
                <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Are you a U.S. Citizen? <span className="text-[#A1D8E0]">*</span>
                </Label>
                <RadioGroup
                  value={personalInfo.us_citizen || ""}
                  onValueChange={(value) => setPersonalInfo({ ...personalInfo, us_citizen: value })}
                  className="flex gap-4"
                >
                  {[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }].map((option) => (
                    <div key={option.value} className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all duration-300 cursor-pointer ${
                      personalInfo.us_citizen === option.value 
                        ? "border-[#A1D8E0]/50 bg-[#A1D8E0]/10" 
                        : "border-white/[0.08] bg-black/30 hover:border-white/20"
                    }`}>
                      <RadioGroupItem value={option.value} id={`citizen-${option.value}`} />
                      <Label htmlFor={`citizen-${option.value}`} className="text-white cursor-pointer">{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">Residency Status</Label>
                  <Select
                    value={personalInfo.residency_status || ""}
                    onValueChange={(value) => setPersonalInfo({ ...personalInfo, residency_status: value })}
                  >
                    <SelectTrigger className="h-12 bg-black/30 border-white/[0.08] text-white rounded-full px-5 focus:border-[#A1D8E0] focus:ring-2 focus:ring-[#A1D8E0]/20" data-testid="residency-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#11161F] border-white/10 rounded-xl">
                      <SelectItem value="us_citizen">U.S. Citizen</SelectItem>
                      <SelectItem value="permanent_resident">Permanent Resident</SelectItem>
                      <SelectItem value="non_resident_alien">Non-Resident Alien</SelectItem>
                      <SelectItem value="refugee">Refugee/Asylee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">Country of Citizenship</Label>
                  <Select
                    value={personalInfo.country_of_citizenship || ""}
                    onValueChange={(value) => setPersonalInfo({ ...personalInfo, country_of_citizenship: value })}
                  >
                    <SelectTrigger className="h-12 bg-black/30 border-white/[0.08] text-white rounded-full px-5 focus:border-[#A1D8E0] focus:ring-2 focus:ring-[#A1D8E0]/20" data-testid="country-citizenship">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#11161F] border-white/10 rounded-xl">
                      <SelectItem value="united_states">United States</SelectItem>
                      <SelectItem value="canada">Canada</SelectItem>
                      <SelectItem value="mexico">Mexico</SelectItem>
                      <SelectItem value="united_kingdom">United Kingdom</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {personalInfo.us_citizen === "no" && (
                <div className="space-y-3 pt-2 animate-in slide-in-from-top-2 duration-300">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">Do you have a U.S. Visa?</Label>
                  <RadioGroup
                    value={personalInfo.us_visa || ""}
                    onValueChange={(value) => setPersonalInfo({ ...personalInfo, us_visa: value })}
                    className="flex gap-4"
                  >
                    {[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }].map((option) => (
                      <div key={option.value} className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all duration-300 cursor-pointer ${
                        personalInfo.us_visa === option.value 
                          ? "border-[#A1D8E0]/50 bg-[#A1D8E0]/10" 
                          : "border-white/[0.08] bg-black/30 hover:border-white/20"
                      }`}>
                        <RadioGroupItem value={option.value} id={`visa-${option.value}`} />
                        <Label htmlFor={`visa-${option.value}`} className="text-white cursor-pointer">{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
            </div>

            {/* Identification Numbers - Glass Card */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 space-y-5 hover:border-[#7B68EE]/20 transition-colors duration-500">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#7B68EE]/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#7B68EE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <h4 className="text-xs font-medium uppercase tracking-wider text-slate-500">Identification Numbers</h4>
              </div>
              
              <div className="p-4 rounded-xl bg-[#7B68EE]/5 border border-[#7B68EE]/10">
                <p className="text-slate-400 text-xs">
                  Your SSN/ITIN is encrypted and stored securely. This information is required for financial aid processing.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">Social Security Number (SSN)</Label>
                  <Input
                    type="password"
                    value={personalInfo.ssn || ""}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, ssn: e.target.value })}
                    placeholder="•••-••-••••"
                    className="h-12 bg-black/30 border-white/[0.08] focus:border-[#A1D8E0] focus:ring-2 focus:ring-[#A1D8E0]/20 text-white rounded-full px-5 transition-all duration-300 placeholder:text-slate-600"
                    data-testid="citizenship-ssn"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">ITIN (if applicable)</Label>
                  <Input
                    value={personalInfo.itin || ""}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, itin: e.target.value })}
                    placeholder="000-00-0000"
                    className="h-12 bg-black/30 border-white/[0.08] focus:border-[#A1D8E0] focus:ring-2 focus:ring-[#A1D8E0]/20 text-white rounded-full px-5 transition-all duration-300 placeholder:text-slate-600"
                    data-testid="citizenship-itin"
                  />
                </div>
              </div>
            </div>

            {/* Funding Options - Glass Card */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 space-y-5 hover:border-[#739600]/20 transition-colors duration-500">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#739600]/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#739600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xs font-medium uppercase tracking-wider text-slate-500">Funding Options</h4>
              </div>
              
              <p className="text-slate-500 text-sm">Select all options you're interested in exploring</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { id: "federal_loans", label: "Federal Loans", desc: "Government-backed student loans" },
                  { id: "private_loans", label: "Private Loans", desc: "Bank or credit union loans" },
                  { id: "self_pay", label: "Self-Pay", desc: "Pay out of pocket or installments" },
                  { id: "veteran_benefits", label: "Veteran Benefits", desc: "VA education benefits" },
                  { id: "outside_scholarships", label: "Outside Scholarships", desc: "External scholarship programs" },
                ].map((option) => (
                  <div 
                    key={option.id} 
                    className={`flex items-start space-x-3 p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                      (personalInfo.funding_options || []).includes(option.id)
                        ? "border-[#739600]/50 bg-[#739600]/10"
                        : "border-white/[0.08] bg-black/30 hover:border-white/20"
                    }`}
                    onClick={() => {
                      const current = personalInfo.funding_options || [];
                      if (current.includes(option.id)) {
                        setPersonalInfo({ ...personalInfo, funding_options: current.filter(f => f !== option.id) });
                      } else {
                        setPersonalInfo({ ...personalInfo, funding_options: [...current, option.id] });
                      }
                    }}
                  >
                    <Checkbox
                      id={option.id}
                      checked={(personalInfo.funding_options || []).includes(option.id)}
                      onCheckedChange={(checked) => {
                        const current = personalInfo.funding_options || [];
                        if (checked) {
                          setPersonalInfo({ ...personalInfo, funding_options: [...current, option.id] });
                        } else {
                          setPersonalInfo({ ...personalInfo, funding_options: current.filter(f => f !== option.id) });
                        }
                      }}
                      className="border-[#739600] mt-0.5"
                    />
                    <div>
                      <Label htmlFor={option.id} className="text-white text-sm cursor-pointer font-medium">{option.label}</Label>
                      <p className="text-slate-500 text-xs mt-0.5">{option.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8" data-testid="subsection-military">
            {/* Section Header */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#4CAF50] to-[#81C784] rounded-full" />
              <h3 className="text-2xl font-light text-white tracking-tight">US Military Background</h3>
              <p className="text-slate-500 text-sm mt-1">Veteran status and military service information</p>
            </div>

            {/* Veteran Benefits - Glass Card */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 space-y-5 hover:border-[#4CAF50]/20 transition-colors duration-500">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#4CAF50]/10 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-[#4CAF50]" />
                </div>
                <h4 className="text-xs font-medium uppercase tracking-wider text-slate-500">Veteran Benefits</h4>
              </div>
              
              <div className="space-y-3">
                <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Will you be using veteran benefits to fund your education? <span className="text-[#A1D8E0]">*</span>
                </Label>
                <RadioGroup
                  value={personalInfo.veteran_benefits || ""}
                  onValueChange={(value) => setPersonalInfo({ ...personalInfo, veteran_benefits: value })}
                  className="flex gap-4"
                >
                  {[{ value: "yes", label: "Yes, I qualify for VA benefits" }, { value: "no", label: "No" }].map((option) => (
                    <div key={option.value} className={`flex items-center space-x-2 px-5 py-3 rounded-full border transition-all duration-300 cursor-pointer ${
                      personalInfo.veteran_benefits === option.value 
                        ? "border-[#4CAF50]/50 bg-[#4CAF50]/10" 
                        : "border-white/[0.08] bg-black/30 hover:border-white/20"
                    }`}>
                      <RadioGroupItem value={option.value} id={`vet-benefits-${option.value}`} />
                      <Label htmlFor={`vet-benefits-${option.value}`} className="text-white cursor-pointer text-sm">{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Are you actively serving in the U.S. military? <span className="text-[#A1D8E0]">*</span>
                </Label>
                <RadioGroup
                  value={personalInfo.active_military || ""}
                  onValueChange={(value) => setPersonalInfo({ ...personalInfo, active_military: value })}
                  className="flex gap-4"
                >
                  {[{ value: "yes", label: "Yes, currently serving" }, { value: "no", label: "No" }].map((option) => (
                    <div key={option.value} className={`flex items-center space-x-2 px-5 py-3 rounded-full border transition-all duration-300 cursor-pointer ${
                      personalInfo.active_military === option.value 
                        ? "border-[#4CAF50]/50 bg-[#4CAF50]/10" 
                        : "border-white/[0.08] bg-black/30 hover:border-white/20"
                    }`}>
                      <RadioGroupItem value={option.value} id={`active-mil-${option.value}`} />
                      <Label htmlFor={`active-mil-${option.value}`} className="text-white cursor-pointer text-sm">{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {(personalInfo.veteran_benefits === "yes" || personalInfo.active_military === "yes") && (
                <div className="space-y-2 pt-2 animate-in slide-in-from-top-2 duration-300">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">Branch of Service</Label>
                  <Select
                    value={personalInfo.military_branch || ""}
                    onValueChange={(value) => setPersonalInfo({ ...personalInfo, military_branch: value })}
                  >
                    <SelectTrigger className="h-12 bg-black/30 border-white/[0.08] text-white rounded-full px-5 focus:border-[#A1D8E0] focus:ring-2 focus:ring-[#A1D8E0]/20 max-w-xs" data-testid="military-branch">
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#11161F] border-white/10 rounded-xl">
                      <SelectItem value="army">Army</SelectItem>
                      <SelectItem value="navy">Navy</SelectItem>
                      <SelectItem value="air_force">Air Force</SelectItem>
                      <SelectItem value="marines">Marines</SelectItem>
                      <SelectItem value="coast_guard">Coast Guard</SelectItem>
                      <SelectItem value="space_force">Space Force</SelectItem>
                      <SelectItem value="national_guard">National Guard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {personalInfo.active_military === "yes" && (
                <div className="p-4 rounded-xl bg-[#4CAF50]/10 border border-[#4CAF50]/20 animate-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#4CAF50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-[#4CAF50] text-sm font-medium">
                      Thank you for your service!
                    </p>
                  </div>
                  <p className="text-slate-400 text-sm mt-2">
                    Our admissions team will contact you about military-friendly scheduling options and benefits.
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8" data-testid="subsection-work">
            {/* Section Header */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#FF9800] to-[#FFB74D] rounded-full" />
              <h3 className="text-2xl font-light text-white tracking-tight">Work Experience</h3>
              <p className="text-slate-500 text-sm mt-1">Your professional background and employment history</p>
            </div>

            {/* Experience Summary - Glass Card */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 space-y-5 hover:border-[#FF9800]/20 transition-colors duration-500">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#FF9800]/10 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-[#FF9800]" />
                </div>
                <h4 className="text-xs font-medium uppercase tracking-wider text-slate-500">Experience Summary</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Years of Work Experience <span className="text-[#A1D8E0]">*</span>
                  </Label>
                  <Select
                    value={personalInfo.years_work_experience || ""}
                    onValueChange={(value) => setPersonalInfo({ ...personalInfo, years_work_experience: value })}
                  >
                    <SelectTrigger className="h-12 bg-black/30 border-white/[0.08] text-white rounded-full px-5 focus:border-[#A1D8E0] focus:ring-2 focus:ring-[#A1D8E0]/20" data-testid="work-years">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#11161F] border-white/10 rounded-xl">
                      <SelectItem value="0">No experience</SelectItem>
                      <SelectItem value="1-2">1-2 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="6-10">6-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">Current Job Title</Label>
                  <Input
                    value={personalInfo.current_job_title || ""}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, current_job_title: e.target.value })}
                    placeholder="e.g., Registered Nurse, Physical Therapist"
                    className="h-12 bg-black/30 border-white/[0.08] focus:border-[#A1D8E0] focus:ring-2 focus:ring-[#A1D8E0]/20 text-white rounded-full px-5 transition-all duration-300 placeholder:text-slate-600"
                    data-testid="work-title"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Do you have OTA (Occupational Therapy Assistant) experience?
                </Label>
                <RadioGroup
                  value={personalInfo.ota_experience || ""}
                  onValueChange={(value) => setPersonalInfo({ ...personalInfo, ota_experience: value })}
                  className="flex gap-4"
                >
                  {[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }].map((option) => (
                    <div key={option.value} className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all duration-300 cursor-pointer ${
                      personalInfo.ota_experience === option.value 
                        ? "border-[#FF9800]/50 bg-[#FF9800]/10" 
                        : "border-white/[0.08] bg-black/30 hover:border-white/20"
                    }`}>
                      <RadioGroupItem value={option.value} id={`ota-${option.value}`} />
                      <Label htmlFor={`ota-${option.value}`} className="text-white cursor-pointer">{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>

            {/* Employment History - Glass Card */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 space-y-5 hover:border-[#00677F]/20 transition-colors duration-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#00677F]/10 flex items-center justify-center">
                    <Users className="w-4 h-4 text-[#00677F]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-medium uppercase tracking-wider text-slate-500">Employment History</h4>
                    <p className="text-slate-600 text-xs mt-0.5">Add your previous employers</p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const employers = personalInfo.employers || [];
                    setPersonalInfo({
                      ...personalInfo,
                      employers: [...employers, { id: Date.now(), name: "", title: "", start: "", end: "", current: false }]
                    });
                  }}
                  className="border-[#00677F]/50 text-[#00677F] hover:bg-[#00677F]/10 rounded-full px-4"
                  data-testid="add-employer-btn"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Employer
                </Button>
              </div>

              {(personalInfo.employers || []).length === 0 ? (
                <div className="text-center py-8 border border-dashed border-white/10 rounded-xl">
                  <Briefcase className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500 text-sm">No employers added yet</p>
                  <p className="text-slate-600 text-xs mt-1">Click "Add Employer" to start building your work history</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {(personalInfo.employers || []).map((employer, index) => (
                    <div key={employer.id} className="p-5 rounded-xl bg-black/20 border border-white/[0.05] space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[#00677F]/20 flex items-center justify-center text-xs text-[#00677F]">{index + 1}</span>
                          Employer {index + 1}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const employers = personalInfo.employers.filter(e => e.id !== employer.id);
                            setPersonalInfo({ ...personalInfo, employers });
                          }}
                          className="text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-full h-8 w-8 p-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          placeholder="Company / Employer Name"
                          value={employer.name}
                          onChange={(e) => {
                            const employers = personalInfo.employers.map(emp =>
                              emp.id === employer.id ? { ...emp, name: e.target.value } : emp
                            );
                            setPersonalInfo({ ...personalInfo, employers });
                          }}
                          className="h-11 bg-black/30 border-white/[0.08] text-white rounded-full px-5 focus:border-[#A1D8E0] focus:ring-2 focus:ring-[#A1D8E0]/20 placeholder:text-slate-600"
                        />
                        <Input
                          placeholder="Your Job Title"
                          value={employer.title}
                          onChange={(e) => {
                            const employers = personalInfo.employers.map(emp =>
                              emp.id === employer.id ? { ...emp, title: e.target.value } : emp
                            );
                            setPersonalInfo({ ...personalInfo, employers });
                          }}
                          className="h-11 bg-black/30 border-white/[0.08] text-white rounded-full px-5 focus:border-[#A1D8E0] focus:ring-2 focus:ring-[#A1D8E0]/20 placeholder:text-slate-600"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <Label className="text-xs text-slate-500">Start Date</Label>
                          <Input
                            type="month"
                            value={employer.start}
                            onChange={(e) => {
                              const employers = personalInfo.employers.map(emp =>
                                emp.id === employer.id ? { ...emp, start: e.target.value } : emp
                              );
                              setPersonalInfo({ ...personalInfo, employers });
                            }}
                            className="h-11 bg-black/30 border-white/[0.08] text-white rounded-full px-5 focus:border-[#A1D8E0] focus:ring-2 focus:ring-[#A1D8E0]/20"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-slate-500">End Date</Label>
                          <Input
                            type="month"
                            value={employer.end}
                            disabled={employer.current}
                            onChange={(e) => {
                              const employers = personalInfo.employers.map(emp =>
                                emp.id === employer.id ? { ...emp, end: e.target.value } : emp
                              );
                              setPersonalInfo({ ...personalInfo, employers });
                            }}
                            className="h-11 bg-black/30 border-white/[0.08] text-white rounded-full px-5 focus:border-[#A1D8E0] focus:ring-2 focus:ring-[#A1D8E0]/20 disabled:opacity-50"
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 pt-1">
                        <Checkbox
                          id={`current-${employer.id}`}
                          checked={employer.current}
                          onCheckedChange={(checked) => {
                            const employers = personalInfo.employers.map(emp =>
                              emp.id === employer.id ? { ...emp, current: checked, end: checked ? "" : emp.end } : emp
                            );
                            setPersonalInfo({ ...personalInfo, employers });
                          }}
                          className="border-[#00677F]"
                        />
                        <Label htmlFor={`current-${employer.id}`} className="text-slate-400 text-sm cursor-pointer">I currently work here</Label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-8" data-testid="subsection-demographic">
            {/* Section Header */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#9C27B0] to-[#CE93D8] rounded-full" />
              <h3 className="text-2xl font-light text-white tracking-tight">Demographic Information</h3>
              <p className="text-slate-500 text-sm mt-1">Optional information for statistical purposes</p>
            </div>

            {/* Notice */}
            <div className="p-4 rounded-xl bg-[#9C27B0]/5 border border-[#9C27B0]/10">
              <p className="text-slate-400 text-sm">
                This information is collected for statistical purposes only and will not affect your application decision.
              </p>
            </div>

            {/* Ethnicity & Race - Glass Card */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 space-y-5 hover:border-[#9C27B0]/20 transition-colors duration-500">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#9C27B0]/10 flex items-center justify-center">
                  <Users className="w-4 h-4 text-[#9C27B0]" />
                </div>
                <h4 className="text-xs font-medium uppercase tracking-wider text-slate-500">Ethnicity & Race</h4>
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">Ethnicity</Label>
                <Select
                  value={personalInfo.ethnicity || ""}
                  onValueChange={(value) => setPersonalInfo({ ...personalInfo, ethnicity: value })}
                >
                  <SelectTrigger className="h-12 bg-black/30 border-white/[0.08] text-white rounded-full px-5 focus:border-[#A1D8E0] focus:ring-2 focus:ring-[#A1D8E0]/20 max-w-md" data-testid="demographic-ethnicity">
                    <SelectValue placeholder="Select ethnicity" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#11161F] border-white/10 rounded-xl">
                    <SelectItem value="hispanic">Hispanic or Latino</SelectItem>
                    <SelectItem value="not_hispanic">Not Hispanic or Latino</SelectItem>
                    <SelectItem value="prefer_not">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">Race (Select all that apply)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: "american_indian", label: "American Indian or Alaska Native" },
                    { id: "asian", label: "Asian" },
                    { id: "black", label: "Black or African American" },
                    { id: "pacific_islander", label: "Native Hawaiian or Pacific Islander" },
                    { id: "white", label: "White" },
                    { id: "two_or_more", label: "Two or More Races" },
                    { id: "prefer_not_race", label: "Prefer not to say" },
                  ].map((option) => (
                    <div 
                      key={option.id} 
                      className={`flex items-center space-x-3 p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                        (personalInfo.race || []).includes(option.id)
                          ? "border-[#9C27B0]/50 bg-[#9C27B0]/10"
                          : "border-white/[0.08] bg-black/30 hover:border-white/20"
                      }`}
                      onClick={() => {
                        const current = personalInfo.race || [];
                        if (current.includes(option.id)) {
                          setPersonalInfo({ ...personalInfo, race: current.filter(r => r !== option.id) });
                        } else {
                          setPersonalInfo({ ...personalInfo, race: [...current, option.id] });
                        }
                      }}
                    >
                      <Checkbox
                        id={option.id}
                        checked={(personalInfo.race || []).includes(option.id)}
                        onCheckedChange={(checked) => {
                          const current = personalInfo.race || [];
                          if (checked) {
                            setPersonalInfo({ ...personalInfo, race: [...current, option.id] });
                          } else {
                            setPersonalInfo({ ...personalInfo, race: current.filter(r => r !== option.id) });
                          }
                        }}
                        className="border-[#9C27B0]"
                      />
                      <Label htmlFor={option.id} className="text-white text-sm cursor-pointer">{option.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* How did you hear about us - Glass Card */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 space-y-5 hover:border-[#00677F]/20 transition-colors duration-500">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#00677F]/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#00677F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xs font-medium uppercase tracking-wider text-slate-500">Referral Source</h4>
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">How did you hear about us?</Label>
                <p className="text-slate-600 text-xs">Help us understand how you found our program</p>
                <Select
                  value={personalInfo.referral_source || ""}
                  onValueChange={(value) => setPersonalInfo({ ...personalInfo, referral_source: value })}
                >
                  <SelectTrigger className="h-12 bg-black/30 border-white/[0.08] text-white rounded-full px-5 focus:border-[#A1D8E0] focus:ring-2 focus:ring-[#A1D8E0]/20 max-w-md" data-testid="demographic-referral">
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#11161F] border-white/10 rounded-xl">
                    <SelectItem value="search_engine">Search Engine (Google, Bing)</SelectItem>
                    <SelectItem value="social_media">Social Media</SelectItem>
                    <SelectItem value="friend_family">Friend or Family</SelectItem>
                    <SelectItem value="employer">Employer</SelectItem>
                    <SelectItem value="college_fair">College Fair</SelectItem>
                    <SelectItem value="advertisement">Advertisement</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Section Complete Indicator */}
            <div className="flex items-center justify-center p-6 rounded-xl bg-gradient-to-r from-[#9C27B0]/10 to-[#00677F]/10 border border-white/[0.05]">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#739600]/20 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-[#739600]" />
                </div>
                <p className="text-white font-medium">You're almost done!</p>
                <p className="text-slate-500 text-sm mt-1">Click "Section Complete" to finish Personal Information</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sub-section Navigation */}
      <div className="lg:w-64 flex-shrink-0">
        <div className="glass-card rounded-xl p-2 space-y-1">
          {subSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSubSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                activeSubSection === section.id
                  ? "bg-[#00677F]/20 text-white border-l-2 border-[#A1D8E0]"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
              data-testid={`subsection-nav-${section.id}`}
            >
              <section.icon className={`w-4 h-4 ${
                activeSubSection === section.id 
                  ? "text-[#A1D8E0]" 
                  : isSubSectionComplete(section.id) 
                    ? "text-[#739600]" 
                    : ""
              }`} />
              <span className={`text-sm font-medium flex-1 ${
                isSubSectionComplete(section.id) && activeSubSection !== section.id
                  ? "text-[#739600]" 
                  : ""
              }`}>{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sub-section Content */}
      <div className="flex-1">
        {renderSubSection()}
        
        {/* Sub-section Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
          <Button
            onClick={() => { setActiveSubSection(Math.max(0, activeSubSection - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            disabled={activeSubSection === 0}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/5 rounded-full px-6"
            data-testid="prev-subsection-btn"
          >
            Previous Section
          </Button>
          
          {activeSubSection < 6 ? (
            <Button
              onClick={() => { setActiveSubSection(activeSubSection + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="bg-[#00677F] hover:bg-[#135163] text-white rounded-full px-6"
              data-testid="next-subsection-btn"
            >
              Next Section
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={() => onSectionComplete && onSectionComplete()}
              className="bg-[#739600] hover:bg-[#218838] text-white rounded-full px-6"
              data-testid="complete-personal-btn"
            >
              <Check className="w-4 h-4 mr-2" />
              Section Complete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSections;
