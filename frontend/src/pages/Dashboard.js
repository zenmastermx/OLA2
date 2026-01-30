import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth, API } from "@/App";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  LayoutDashboard, User, GraduationCap, FileText, DollarSign, CheckCircle2,
  LogOut, Plus, Clock, AlertCircle, ChevronRight, Calendar, Upload,
  MessageCircle, Sparkles, X, Phone, Mail, Video, CalendarDays, MapPin, BookOpen
} from "lucide-react";
import AIChat from "@/components/AIChat";

// Program pathways data
const PROGRAM_PATHWAYS = {
  ot: {
    name: "Occupational Therapy",
    color: "#00B4D8",
    programs: [
      { id: "mot", name: "Master of Occupational Therapy" },
      { id: "mot_ota", name: "Master of Occupational Therapy (OTA Entry)" },
      { id: "flex_mot", name: "Flex Master of Occupational Therapy" },
      { id: "flex_mot_ota", name: "Flex Master of Occupational Therapy (OTA Entry)" },
      { id: "hybrid_mot", name: "Hybrid Immersion Master of Occupational Therapy" },
      { id: "hybrid_mot_ota", name: "Hybrid Immersion Master of Occupational Therapy (OTA Entry)" },
      { id: "otd", name: "Doctor of Occupational Therapy" },
      { id: "flex_otd", name: "Flex Doctor of Occupational Therapy" },
      { id: "hybrid_otd", name: "Hybrid Immersion Doctor of Occupational Therapy" },
      { id: "ppotd", name: "Post Professional Doctor of Occupational Therapy" },
    ]
  },
  nursing: {
    name: "Nursing",
    color: "#7B68EE",
    programs: [
      { id: "msn_fnp", name: "MSN - Family Nurse Practitioner" },
      { id: "msn_ne", name: "MSN - Nurse Executive" },
      { id: "msn_pmhnp", name: "MSN - Psychiatric Mental Health Nurse Practitioner" },
      { id: "rn_msn_fnp", name: "RN to MSN - Family Nurse Practitioner" },
      { id: "rn_msn_pmhnp", name: "RN to MSN - Psychiatric Mental Health Nurse Practitioner" },
      { id: "bsn_dnp_ne", name: "BSN to DNP - Nurse Executive" },
      { id: "bsn_dnp_fnp", name: "BSN to DNP - Family Nurse Practitioner" },
      { id: "bsn_dnp_pmhnp", name: "BSN to DNP - Psychiatric Mental Health Nurse Practitioner" },
      { id: "msn_dnp", name: "MSN to DNP" },
    ]
  },
  education: {
    name: "Education",
    color: "#FF9800",
    programs: [
      { id: "edd", name: "Doctor of Education" },
      { id: "edd_el", name: "EdD - Executive Leadership" },
      { id: "edd_tl", name: "EdD - Teaching and Learning" },
      { id: "edd_ne", name: "EdD - Nursing Education" },
      { id: "edd_at", name: "EdD - Athletic Training" },
    ]
  },
  certificates: {
    name: "Certificates",
    color: "#28A745",
    programs: [
      { id: "cert_fnp", name: "Certificate - Family Nurse Practitioner" },
      { id: "cert_ne", name: "Certificate - Nursing Executive" },
      { id: "cert_bi", name: "Graduate Certificate in Business Intelligence" },
      { id: "cert_el", name: "Graduate Certificate in Executive Leadership" },
      { id: "cert_ipe", name: "Graduate Certificate in Interprofessional Education (IPE)" },
    ]
  }
};

const START_TERMS = [
  { id: "summer_2026", name: "Summer 2026 (May 11)" },
  { id: "fall_2026", name: "Fall 2026 (September 8)" },
  { id: "spring_2027", name: "Spring 2027 (January 11)" },
];

const CAMPUSES = [
  { id: "miami", name: "Miami, FL" },
  { id: "st_augustine", name: "St. Augustine, FL" },
  { id: "austin", name: "Austin, TX" },
  { id: "dallas", name: "Dallas, TX" },
  { id: "san_marcos", name: "San Marcos, CA" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token, logout } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewAppModal, setShowNewAppModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedStartTerm, setSelectedStartTerm] = useState(null);
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [selectedCampus2, setSelectedCampus2] = useState(null);
  const [creatingApp, setCreatingApp] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [advisor, setAdvisor] = useState(null);
  const [modalStep, setModalStep] = useState(1);

  useEffect(() => {
    fetchApplications();
    fetchAdvisor();
    if (location.state?.newUser) {
      toast.success(`Welcome, ${user?.first_name}! Let's start your application.`);
      setShowNewAppModal(true);
      if (location.state?.program) {
        setSelectedCategory(location.state.program);
      }
    }
  }, []);

  const fetchAdvisor = async () => {
    try {
      const response = await axios.get(`${API}/auth/advisor`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAdvisor(response.data);
    } catch (error) {
      console.error("Error fetching advisor:", error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${API}/applications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const createApplication = async () => {
    if (!selectedProgram || !selectedStartTerm || !selectedCampus) {
      toast.error("Please complete all required selections");
      return;
    }

    setCreatingApp(true);
    try {
      // Find the program details
      const categoryData = PROGRAM_PATHWAYS[selectedCategory];
      const programData = categoryData?.programs.find(p => p.id === selectedProgram);
      
      const response = await axios.post(
        `${API}/applications`,
        { 
          program_type: categoryData?.name || "Occupational Therapy",
          program_pathway: programData?.name || selectedProgram,
          start_term: START_TERMS.find(t => t.id === selectedStartTerm)?.name || selectedStartTerm,
          primary_campus: CAMPUSES.find(c => c.id === selectedCampus)?.name || selectedCampus,
          secondary_campus: selectedCampus2 ? CAMPUSES.find(c => c.id === selectedCampus2)?.name : null
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Application created successfully!");
      setShowNewAppModal(false);
      resetModalState();
      navigate(`/application/${response.data.id}`);
    } catch (error) {
      console.error("Error creating application:", error);
      toast.error("Failed to create application");
    } finally {
      setCreatingApp(false);
    }
  };

  const resetModalState = () => {
    setSelectedCategory(null);
    setSelectedProgram(null);
    setSelectedStartTerm(null);
    setSelectedCampus(null);
    setSelectedCampus2(null);
    setModalStep(1);
  };

  const closeModal = () => {
    setShowNewAppModal(false);
    resetModalState();
  };

  const activeApp = applications.find(a => a.status !== "submitted");
  const submittedApps = applications.filter(a => a.status === "submitted");
  
  // For stats display: use active app if exists, otherwise most recent submitted app
  const displayApp = activeApp || (submittedApps.length > 0 ? submittedApps[0] : null);

  const getDeadline = () => {
    const now = new Date();
    const deadlines = [
      { term: "Spring 2026", date: new Date("2025-11-15") },
      { term: "Summer 2026", date: new Date("2026-02-15") },
      { term: "Fall 2026", date: new Date("2026-05-15") }
    ];
    return deadlines.find(d => d.date > now) || deadlines[deadlines.length - 1];
  };

  const deadline = getDeadline();
  const daysUntilDeadline = Math.ceil((deadline.date - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-[#0A0E14]">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-40 bg-[#0A0E14]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="https://customer-assets.emergentagent.com/job_be4bb2aa-ca20-4b1a-9d54-431ad1ac86d0/artifacts/ie0vbsv3_primary.Horiz.2line.knockedout.whouter.pms315%2Bwhite.png" 
              alt="University of St. Augustine for Health Sciences" 
              className="h-14 w-auto"
            />
          </div>
          
          <div className="flex items-center gap-4">
            {/* Ask Journey Button */}
            <Button
              onClick={() => setShowChat(true)}
              className="bg-gradient-to-r from-[#00B4D8]/20 to-[#7B68EE]/20 border border-[#00B4D8]/30 text-white hover:border-[#00F5FF] hover:bg-[#00B4D8]/30 rounded-full px-4 py-2 flex items-center gap-2 transition-all"
              data-testid="ask-journey-btn"
            >
              <Sparkles className="w-4 h-4 text-[#00F5FF]" />
              <span className="hidden sm:inline">Ask Journey</span>
            </Button>
            
            <div className="text-right hidden sm:block">
              <p className="text-white font-medium">{user?.first_name} {user?.last_name}</p>
              <p className="text-slate-500 text-sm">{user?.email}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00B4D8] to-[#7B68EE] flex items-center justify-center">
              <span className="text-white font-bold">{user?.first_name?.[0]}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="text-slate-400 hover:text-white hover:bg-white/5"
              data-testid="logout-btn"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="font-['Outfit'] text-3xl lg:text-4xl font-bold text-white mb-2">
            Welcome back, {user?.first_name}!
          </h1>
          <p className="text-slate-400">
            {activeApp ? "Continue your application journey" : "Start your application to USA.edu"}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Application Progress Card */}
          <div className="glass-card rounded-2xl p-6" data-testid="progress-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 text-sm font-medium">Application Progress</h3>
              <Clock className="w-5 h-5 text-[#00F5FF]" />
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20">
                <svg className="transform -rotate-90 w-20 h-20">
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    fill="none"
                    stroke="#1E293B"
                    strokeWidth="6"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    fill="none"
                    stroke={displayApp?.status === "submitted" ? "#28A745" : "#00F5FF"}
                    strokeWidth="6"
                    strokeDasharray={`${(displayApp?.progress || 0) * 2.26} 226`}
                    strokeLinecap="round"
                    className="progress-ring__circle"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-2xl font-['Outfit'] font-bold text-white">
                  {displayApp?.progress || 0}%
                </span>
              </div>
              <div>
                <p className="text-white font-semibold text-lg">
                  {displayApp?.status === "submitted" 
                    ? "Complete" 
                    : displayApp 
                      ? `Step ${displayApp.current_step} of 5` 
                      : "No Application"}
                </p>
                <p className="text-slate-500 text-sm">
                  {displayApp?.status === "submitted" ? "Submitted" : displayApp ? "In Progress" : "Start one above"}
                </p>
              </div>
            </div>
          </div>

          {/* Deadline Card */}
          <div className="glass-card rounded-2xl p-6" data-testid="deadline-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 text-sm font-medium">Next Deadline</h3>
              <Calendar className="w-5 h-5 text-[#FF6B35]" />
            </div>
            <p className="text-3xl font-['Outfit'] font-bold text-white mb-1">
              {daysUntilDeadline} Days
            </p>
            <p className="text-slate-400">{deadline.term} Application</p>
            <p className="text-slate-500 text-sm mt-2">
              Due: {deadline.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          {/* Documents Card */}
          <div className="glass-card rounded-2xl p-6" data-testid="documents-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 text-sm font-medium">Documents</h3>
              <FileText className="w-5 h-5 text-[#28A745]" />
            </div>
            {displayApp ? (
              <>
                <p className="text-3xl font-['Outfit'] font-bold text-white mb-1">
                  {displayApp.documents?.filter(d => d.status === "uploaded").length || 0}/5
                </p>
                <p className="text-slate-400">Documents Uploaded</p>
                <div className="mt-3">
                  <Progress 
                    value={(displayApp.documents?.filter(d => d.status === "uploaded").length || 0) * 20} 
                    className="h-2 bg-slate-800"
                  />
                </div>
              </>
            ) : (
              <>
                <p className="text-3xl font-['Outfit'] font-bold text-white mb-1">0/5</p>
                <p className="text-slate-400">Documents Uploaded</p>
              </>
            )}
          </div>
        </div>

        {/* Active Application */}
        {activeApp && (
          <div className="glass-card rounded-2xl p-8 mb-8" data-testid="active-application-card">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#00B4D8]/20 text-[#00B4D8]">
                    Active Application
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#7B68EE]/20 text-[#7B68EE]">
                    {activeApp.program_selection?.program_type || "Program"}
                  </span>
                </div>
                <h2 className="font-['Outfit'] text-2xl font-bold text-white mb-2">
                  {activeApp.program_selection?.program_pathway || activeApp.program_selection?.program_type || "Healthcare"} 
                </h2>
                
                {/* Program Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                  {activeApp.program_selection?.start_term && (
                    <div className="p-3 rounded-xl bg-white/5 border border-white/[0.05]">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-3.5 h-3.5 text-[#FF9800]" />
                        <span className="text-slate-500 text-xs uppercase tracking-wider">Start Term</span>
                      </div>
                      <p className="text-white text-sm font-medium">{activeApp.program_selection.start_term}</p>
                    </div>
                  )}
                  {activeApp.program_selection?.campus && (
                    <div className="p-3 rounded-xl bg-white/5 border border-white/[0.05]">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-3.5 h-3.5 text-[#00B4D8]" />
                        <span className="text-slate-500 text-xs uppercase tracking-wider">Campus</span>
                      </div>
                      <p className="text-white text-sm font-medium">{activeApp.program_selection.campus}</p>
                    </div>
                  )}
                  {activeApp.program_selection?.secondary_campus && (
                    <div className="p-3 rounded-xl bg-white/5 border border-white/[0.05]">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-3.5 h-3.5 text-[#7B68EE]" />
                        <span className="text-slate-500 text-xs uppercase tracking-wider">Backup</span>
                      </div>
                      <p className="text-white text-sm font-medium">{activeApp.program_selection.secondary_campus}</p>
                    </div>
                  )}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/[0.05]">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-slate-500 text-xs uppercase tracking-wider">Started</span>
                    </div>
                    <p className="text-white text-sm font-medium">{new Date(activeApp.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>
              </div>
              
              <Button
                onClick={() => navigate(`/application/${activeApp.id}`)}
                className="bg-[#00B4D8] hover:bg-[#0096B4] text-white rounded-full px-8 py-6 shadow-[0_0_20px_rgba(0,180,216,0.3)] hover:shadow-[0_0_30px_rgba(0,180,216,0.5)] transition-all"
                data-testid="continue-application-btn"
              >
                Continue Application
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* Application Steps */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { step: 1, label: "Personal", icon: User },
                { step: 2, label: "Academic History", icon: GraduationCap },
                { step: 3, label: "Employment History", icon: LayoutDashboard },
                { step: 4, label: "Documents Required", icon: Upload },
                { step: 5, label: "Review", icon: CheckCircle2 }
              ].map(({ step, label, icon: Icon }) => (
                <div
                  key={step}
                  className={`p-4 rounded-xl border transition-colors cursor-pointer ${
                    step < activeApp.current_step
                      ? "bg-[#28A745]/10 border-[#28A745]/30"
                      : step === activeApp.current_step
                      ? "bg-[#00B4D8]/10 border-[#00B4D8]/50"
                      : "bg-white/5 border-white/10"
                  }`}
                  onClick={() => navigate(`/application/${activeApp.id}/${step}`)}
                  data-testid={`step-${step}-nav`}
                >
                  <Icon className={`w-5 h-5 mb-2 ${
                    step < activeApp.current_step
                      ? "text-[#28A745]"
                      : step === activeApp.current_step
                      ? "text-[#00B4D8]"
                      : "text-slate-500"
                  }`} />
                  <p className={`text-sm font-medium ${
                    step <= activeApp.current_step ? "text-white" : "text-slate-500"
                  }`}>
                    {label}
                  </p>
                  {step < activeApp.current_step && (
                    <CheckCircle2 className="w-4 h-4 text-[#28A745] mt-1" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submitted Applications */}
        {submittedApps.length > 0 && (
          <div className="mt-8">
            <h3 className="font-['Outfit'] text-xl font-bold text-white mb-4">
              Submitted Applications
            </h3>
            <div className="space-y-4">
              {submittedApps.map((app) => (
                <div 
                  key={app.id}
                  className="glass-card rounded-xl p-6 flex items-center justify-between"
                  data-testid={`submitted-app-${app.id}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#28A745]/20 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-[#28A745]" />
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {app.program_selection?.program_type || "Healthcare"} - {app.program_selection?.program_level || "Program"}
                      </p>
                      <p className="text-slate-500 text-sm">
                        Submitted {new Date(app.submitted_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className="px-4 py-2 rounded-full text-sm font-medium bg-[#28A745]/20 text-[#28A745]">
                    Under Review
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enrollment Advisor Card - At Bottom */}
        {advisor && (
          <div className="glass-card rounded-2xl p-6 mt-8" data-testid="enrollment-advisor-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 text-sm font-medium">Your Enrollment Advisor</h3>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#28A745]/20 text-[#28A745]">
                Assigned
              </span>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              {/* Advisor Info */}
              <div className="flex items-center gap-4 flex-1">
                <img 
                  src={advisor.avatar_url} 
                  alt={advisor.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#00B4D8]/30"
                  data-testid="advisor-avatar"
                />
                <div>
                  <h4 className="text-white font-semibold text-lg" data-testid="advisor-name">
                    {advisor.name}
                  </h4>
                  <p className="text-[#00B4D8] text-sm">{advisor.title}</p>
                  <p className="text-slate-500 text-sm">
                    {displayApp?.program_selection?.program_type 
                      ? `${displayApp.program_selection.program_type} Programs` 
                      : advisor.specialization}
                  </p>
                </div>
              </div>
              
              {/* Contact Actions */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={advisor.calendly_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00B4D8]/50 text-white text-sm font-medium transition-all"
                  data-testid="schedule-appointment-btn"
                >
                  <CalendarDays className="w-4 h-4 text-[#00B4D8]" />
                  Schedule Appointment
                </a>
                
                <a
                  href={`mailto:${advisor.email}?subject=Application Inquiry - ${user?.first_name} ${user?.last_name}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#7B68EE]/50 text-white text-sm font-medium transition-all"
                  data-testid="email-advisor-btn"
                >
                  <Mail className="w-4 h-4 text-[#7B68EE]" />
                  Send Email
                </a>
                
                <a
                  href={`sms:${advisor.phone}?body=Hi ${advisor.name.split(' ')[0]}, I'm ${user?.first_name} ${user?.last_name} and I have a question about my application.`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#28A745]/50 text-white text-sm font-medium transition-all"
                  data-testid="text-advisor-btn"
                >
                  <MessageCircle className="w-4 h-4 text-[#28A745]" />
                  Send Text
                </a>
                
                <a
                  href={`tel:${advisor.phone}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FF6B35]/50 text-white text-sm font-medium transition-all"
                  data-testid="call-advisor-btn"
                >
                  <Phone className="w-4 h-4 text-[#FF6B35]" />
                  Call
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* New Application Modal */}
      {showNewAppModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="glass-card rounded-3xl p-8 max-w-2xl w-full animate-slide-up my-8" data-testid="new-app-modal">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-['Outfit'] text-2xl font-bold text-white">
                  {modalStep === 1 && "Select Your Program"}
                  {modalStep === 2 && "Select Your Pathway"}
                  {modalStep === 3 && "Select Term & Campus"}
                </h2>
                <p className="text-slate-500 text-sm mt-1">Step {modalStep} of 3</p>
              </div>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-white transition-colors"
                data-testid="close-modal-btn"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Progress Indicator */}
            <div className="flex gap-2 mb-8">
              {[1, 2, 3].map((step) => (
                <div 
                  key={step}
                  className={`h-1 flex-1 rounded-full transition-all ${
                    step <= modalStep ? "bg-[#00B4D8]" : "bg-white/10"
                  }`}
                />
              ))}
            </div>
            
            {/* Step 1: Program Category */}
            {modalStep === 1 && (
              <div className="space-y-4 mb-6">
                {Object.entries(PROGRAM_PATHWAYS).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedCategory(key);
                      setSelectedProgram(null);
                    }}
                    className={`w-full p-4 rounded-xl border text-left transition-all ${
                      selectedCategory === key
                        ? "border-[#00F5FF] bg-[#00F5FF]/10"
                        : "border-white/10 bg-white/5 hover:border-white/30"
                    }`}
                    data-testid={`select-category-${key}`}
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: `${category.color}20` }}
                      >
                        {key === "ot" && <GraduationCap className="w-6 h-6" style={{ color: category.color }} />}
                        {key === "nursing" && <User className="w-6 h-6" style={{ color: category.color }} />}
                        {key === "education" && <BookOpen className="w-6 h-6" style={{ color: category.color }} />}
                        {key === "certificates" && <FileText className="w-6 h-6" style={{ color: category.color }} />}
                      </div>
                      <div>
                        <p className="text-white font-medium">{category.name}</p>
                        <p className="text-slate-500 text-sm">{category.programs.length} programs available</p>
                      </div>
                      {selectedCategory === key && (
                        <CheckCircle2 className="w-5 h-5 text-[#00F5FF] ml-auto" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Step 2: Specific Program Pathway */}
            {modalStep === 2 && selectedCategory && (
              <div className="space-y-3 mb-6 max-h-[400px] overflow-y-auto pr-2">
                <p className="text-slate-400 text-sm mb-4">
                  Select your specific pathway within {PROGRAM_PATHWAYS[selectedCategory].name}:
                </p>
                {PROGRAM_PATHWAYS[selectedCategory].programs.map((program) => (
                  <button
                    key={program.id}
                    onClick={() => setSelectedProgram(program.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all ${
                      selectedProgram === program.id
                        ? "border-[#00F5FF] bg-[#00F5FF]/10"
                        : "border-white/10 bg-white/5 hover:border-white/30"
                    }`}
                    data-testid={`select-program-${program.id}`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-white text-sm font-medium">{program.name}</p>
                      {selectedProgram === program.id && (
                        <CheckCircle2 className="w-5 h-5 text-[#00F5FF]" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Step 3: Start Term & Campus */}
            {modalStep === 3 && (
              <div className="space-y-6 mb-6">
                {/* Selected Program Summary */}
                <div className="p-4 rounded-xl bg-[#00B4D8]/10 border border-[#00B4D8]/20">
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Selected Program</p>
                  <p className="text-white font-medium">
                    {PROGRAM_PATHWAYS[selectedCategory]?.programs.find(p => p.id === selectedProgram)?.name}
                  </p>
                </div>

                {/* Start Term Selection */}
                <div className="space-y-3">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#FF9800]" />
                    Intended Start Term <span className="text-[#00F5FF]">*</span>
                  </Label>
                  <Select value={selectedStartTerm || ""} onValueChange={setSelectedStartTerm}>
                    <SelectTrigger className="h-12 bg-black/30 border-white/[0.08] text-white rounded-xl px-4 focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20" data-testid="select-start-term">
                      <SelectValue placeholder="Select your start term" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#11161F] border-white/10 rounded-xl">
                      {START_TERMS.map((term) => (
                        <SelectItem key={term.id} value={term.id}>{term.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Primary Campus Selection */}
                <div className="space-y-3">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#00B4D8]" />
                    Primary Campus <span className="text-[#00F5FF]">*</span>
                  </Label>
                  <Select value={selectedCampus || ""} onValueChange={setSelectedCampus}>
                    <SelectTrigger className="h-12 bg-black/30 border-white/[0.08] text-white rounded-xl px-4 focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20" data-testid="select-campus">
                      <SelectValue placeholder="Select your preferred campus" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#11161F] border-white/10 rounded-xl">
                      {CAMPUSES.map((campus) => (
                        <SelectItem key={campus.id} value={campus.id}>{campus.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Secondary Campus Selection */}
                <div className="space-y-3">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#7B68EE]" />
                    Secondary Campus (Backup Option)
                  </Label>
                  <p className="text-slate-600 text-xs -mt-1">In case your first choice reaches capacity</p>
                  <Select value={selectedCampus2 || ""} onValueChange={setSelectedCampus2}>
                    <SelectTrigger className="h-12 bg-black/30 border-white/[0.08] text-white rounded-xl px-4 focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20" data-testid="select-campus-2">
                      <SelectValue placeholder="Select a backup campus (optional)" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#11161F] border-white/10 rounded-xl">
                      {CAMPUSES.filter(c => c.id !== selectedCampus).map((campus) => (
                        <SelectItem key={campus.id} value={campus.id}>{campus.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            
            {/* Navigation Buttons */}
            <div className="flex gap-3">
              {modalStep > 1 && (
                <Button
                  onClick={() => setModalStep(modalStep - 1)}
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/5 rounded-xl h-12"
                >
                  Back
                </Button>
              )}
              
              {modalStep < 3 ? (
                <Button
                  onClick={() => setModalStep(modalStep + 1)}
                  disabled={
                    (modalStep === 1 && !selectedCategory) ||
                    (modalStep === 2 && !selectedProgram)
                  }
                  className="flex-1 bg-[#00B4D8] hover:bg-[#0096B4] text-white rounded-xl h-12 shadow-[0_0_20px_rgba(0,180,216,0.3)] disabled:opacity-50"
                >
                  Continue
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={createApplication}
                  disabled={!selectedStartTerm || !selectedCampus || creatingApp}
                  className="flex-1 bg-[#28A745] hover:bg-[#218838] text-white rounded-xl h-12 shadow-[0_0_20px_rgba(40,167,69,0.3)] disabled:opacity-50"
                  data-testid="create-application-btn"
                >
                  {creatingApp ? "Creating..." : "Create Application"}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* AI Chat Modal */}
      {showChat && (
        <AIChat onClose={() => setShowChat(false)} />
      )}
    </div>
  );
};

export default Dashboard;
