import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth, API } from "@/App";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  LayoutDashboard, User, GraduationCap, FileText, DollarSign, CheckCircle2,
  LogOut, Plus, Clock, AlertCircle, ChevronRight, Calendar, Upload,
  MessageCircle, Sparkles, X
} from "lucide-react";
import AIChat from "@/components/AIChat";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token, logout } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewAppModal, setShowNewAppModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [creatingApp, setCreatingApp] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    fetchApplications();
    if (location.state?.newUser) {
      toast.success(`Welcome, ${user?.first_name}! Let's start your application.`);
      setShowNewAppModal(true);
      if (location.state?.program) {
        setSelectedProgram(location.state.program);
      }
    }
  }, []);

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
    if (!selectedProgram) {
      toast.error("Please select a program");
      return;
    }

    setCreatingApp(true);
    try {
      const response = await axios.post(
        `${API}/applications`,
        { program_type: selectedProgram === "ot" ? "Occupational Therapy" : "Nursing" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Application created successfully!");
      setShowNewAppModal(false);
      navigate(`/application/${response.data.id}`);
    } catch (error) {
      console.error("Error creating application:", error);
      toast.error(error.response?.data?.detail || "Failed to create application");
    } finally {
      setCreatingApp(false);
    }
  };

  const activeApp = applications.find(a => a.status !== "submitted");
  const submittedApps = applications.filter(a => a.status === "submitted");

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
          <div className="flex items-center gap-3">
            <img 
              src="https://customer-assets.emergentagent.com/job_be4bb2aa-ca20-4b1a-9d54-431ad1ac86d0/artifacts/7kvxdoxy_primary.filled.whouter.pms315.png" 
              alt="USA.edu Logo" 
              className="h-10 w-auto"
            />
            <span className="font-['Outfit'] font-bold text-xl text-white">USA.edu Portal</span>
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
          {/* Progress Card */}
          <div className="glass-card rounded-2xl p-6" data-testid="progress-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 text-sm font-medium">Application Progress</h3>
              <LayoutDashboard className="w-5 h-5 text-[#00B4D8]" />
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 progress-ring">
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    fill="none"
                    stroke="#1A2E45"
                    strokeWidth="6"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    fill="none"
                    stroke="#00F5FF"
                    strokeWidth="6"
                    strokeDasharray={`${(activeApp?.progress || 0) * 2.26} 226`}
                    strokeLinecap="round"
                    className="progress-ring__circle"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-2xl font-['Outfit'] font-bold text-white">
                  {activeApp?.progress || 0}%
                </span>
              </div>
              <div>
                <p className="text-white font-semibold text-lg">
                  {activeApp ? `Step ${activeApp.current_step} of 6` : "Not Started"}
                </p>
                <p className="text-slate-500 text-sm">
                  {activeApp?.status === "submitted" ? "Submitted" : "In Progress"}
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
            {activeApp ? (
              <>
                <p className="text-3xl font-['Outfit'] font-bold text-white mb-1">
                  {activeApp.documents?.filter(d => d.status === "uploaded").length || 0}/5
                </p>
                <p className="text-slate-400">Documents Uploaded</p>
                <div className="mt-3">
                  <Progress 
                    value={(activeApp.documents?.filter(d => d.status === "uploaded").length || 0) * 20} 
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
        {activeApp ? (
          <div className="glass-card rounded-2xl p-8 mb-8" data-testid="active-application-card">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#00B4D8]/20 text-[#00B4D8]">
                    Active Application
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#7B68EE]/20 text-[#7B68EE]">
                    {activeApp.program_selection?.program_type || "Program"}
                  </span>
                </div>
                <h2 className="font-['Outfit'] text-2xl font-bold text-white mb-1">
                  {activeApp.program_selection?.program_type || "Healthcare"} Program Application
                </h2>
                <p className="text-slate-400">
                  Started {new Date(activeApp.created_at).toLocaleDateString()}
                </p>
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
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { step: 1, label: "Personal", icon: User },
                { step: 2, label: "Academic", icon: GraduationCap },
                { step: 3, label: "Program", icon: LayoutDashboard },
                { step: 4, label: "Documents", icon: Upload },
                { step: 5, label: "Financial", icon: DollarSign },
                { step: 6, label: "Review", icon: CheckCircle2 }
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
        ) : (
          /* No Application - Create New */
          <div className="glass-card rounded-2xl p-8 text-center" data-testid="no-application-card">
            <div className="w-20 h-20 rounded-2xl bg-[#00B4D8]/10 flex items-center justify-center mx-auto mb-6">
              <Plus className="w-10 h-10 text-[#00B4D8]" />
            </div>
            <h2 className="font-['Outfit'] text-2xl font-bold text-white mb-2">
              Start Your Application
            </h2>
            <p className="text-slate-400 mb-6 max-w-md mx-auto">
              Begin your journey to becoming a healthcare professional at USA.edu
            </p>
            <Button
              onClick={() => setShowNewAppModal(true)}
              className="bg-[#00B4D8] hover:bg-[#0096B4] text-white rounded-full px-8 py-6 shadow-[0_0_20px_rgba(0,180,216,0.3)] hover:shadow-[0_0_30px_rgba(0,180,216,0.5)] transition-all"
              data-testid="start-new-application-btn"
            >
              <Plus className="w-5 h-5 mr-2" />
              Start New Application
            </Button>
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
      </div>

      {/* New Application Modal */}
      {showNewAppModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="glass-card rounded-3xl p-8 max-w-lg w-full animate-slide-up" data-testid="new-app-modal">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-['Outfit'] text-2xl font-bold text-white">
                Select Your Program
              </h2>
              <button
                onClick={() => setShowNewAppModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
                data-testid="close-modal-btn"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              {[
                { id: "ot", name: "Occupational Therapy", icon: GraduationCap, color: "#00B4D8" },
                { id: "nursing", name: "Nursing", icon: User, color: "#7B68EE" }
              ].map((program) => (
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
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${program.color}20` }}
                    >
                      <program.icon className="w-6 h-6" style={{ color: program.color }} />
                    </div>
                    <div>
                      <p className="text-white font-medium">{program.name}</p>
                      <p className="text-slate-500 text-sm">Masters & Doctorate Programs</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            <Button
              onClick={createApplication}
              disabled={!selectedProgram || creatingApp}
              className="w-full bg-[#00B4D8] hover:bg-[#0096B4] text-white rounded-xl h-12 shadow-[0_0_20px_rgba(0,180,216,0.3)] disabled:opacity-50"
              data-testid="create-application-btn"
            >
              {creatingApp ? "Creating..." : "Create Application"}
            </Button>
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
