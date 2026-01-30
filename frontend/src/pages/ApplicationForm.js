import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth, API } from "@/App";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  User, GraduationCap, LayoutDashboard, Upload, CheckCircle2,
  ArrowLeft, ArrowRight, Save, Loader2, FileText, X, Check, Sparkles,
  AlertCircle, ChevronDown
} from "lucide-react";
import AIChat from "@/components/AIChat";
import PersonalInfoSections from "@/components/PersonalInfoSections";
import AcademicHistorySections from "@/components/AcademicHistorySections";
import EmploymentHistorySections from "@/components/EmploymentHistorySections";

const ApplicationForm = () => {
  const navigate = useNavigate();
  const { appId, step: urlStep } = useParams();
  const { token } = useAuth();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentStep, setCurrentStep] = useState(parseInt(urlStep) || 1);
  const [showChat, setShowChat] = useState(false);
  const [programs, setPrograms] = useState(null);
  const [expandedTranscript, setExpandedTranscript] = useState(false);

  // Form state
  const [personalInfo, setPersonalInfo] = useState({});
  const [academicHistory, setAcademicHistory] = useState({});
  const [programSelection, setProgramSelection] = useState({});
  const [financialAid, setFinancialAid] = useState({});
  const [employmentHistory, setEmploymentHistory] = useState({});

  const steps = [
    { step: 1, label: "Personal Information", icon: User },
    { step: 2, label: "Academic History", icon: GraduationCap },
    { step: 3, label: "Employment History", icon: LayoutDashboard },
    { step: 4, label: "Documents Required", icon: Upload },
    { step: 5, label: "Review & Submit", icon: CheckCircle2 }
  ];

  useEffect(() => {
    fetchApplication();
    fetchPrograms();
  }, [appId]);

  useEffect(() => {
    if (urlStep) {
      setCurrentStep(parseInt(urlStep));
    }
  }, [urlStep]);

  const fetchApplication = async () => {
    try {
      const response = await axios.get(`${API}/applications/${appId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplication(response.data);
      setPersonalInfo(response.data.personal_info || {});
      setAcademicHistory(response.data.academic_history || {});
      setProgramSelection(response.data.program_selection || {});
      setFinancialAid(response.data.financial_aid || {});
      setEmploymentHistory(response.data.employment_history || {});
      if (!urlStep) {
        setCurrentStep(response.data.current_step || 1);
      }
    } catch (error) {
      console.error("Error fetching application:", error);
      toast.error("Failed to load application");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const fetchPrograms = async () => {
    try {
      const response = await axios.get(`${API}/programs`);
      setPrograms(response.data);
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };

  const saveProgress = async (nextStep = null) => {
    setSaving(true);
    try {
      const updateData = {
        personal_info: personalInfo,
        academic_history: academicHistory,
        program_selection: programSelection,
        financial_aid: financialAid,
        employment_history: employmentHistory,
        current_step: nextStep || currentStep
      };

      const response = await axios.put(
        `${API}/applications/${appId}`,
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplication(response.data);
      toast.success("Progress saved");
      return true;
    } catch (error) {
      console.error("Error saving:", error);
      toast.error("Failed to save progress");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleNext = async () => {
    const saved = await saveProgress(currentStep + 1);
    if (saved && currentStep < 6) {
      setCurrentStep(currentStep + 1);
      navigate(`/application/${appId}/${currentStep + 1}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStepChange = async (targetStep) => {
    const saved = await saveProgress(targetStep);
    if (saved) {
      setCurrentStep(targetStep);
      navigate(`/application/${appId}/${targetStep}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      navigate(`/application/${appId}/${currentStep - 1}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      await axios.post(
        `${API}/applications/${appId}/submit`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Application submitted successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting:", error);
      toast.error(error.response?.data?.detail || "Failed to submit application");
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (docId, file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        `${API}/applications/${appId}/documents/${docId}/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );
      toast.success("Document uploaded successfully");
      fetchApplication();
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload document");
    }
  };

  const handleMultipleFileUpload = async (docId, files) => {
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        
        await axios.post(
          `${API}/applications/${appId}/documents/${docId}/upload-transcript`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data"
            }
          }
        );
      }
      toast.success(`${files.length} transcript${files.length > 1 ? 's' : ''} uploaded successfully`);
      fetchApplication();
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload transcripts");
    }
  };

  const handleRemoveTranscriptFile = async (docId, fileIndex) => {
    try {
      await axios.delete(
        `${API}/applications/${appId}/documents/${docId}/transcript/${fileIndex}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      toast.success("Transcript removed");
      fetchApplication();
    } catch (error) {
      console.error("Remove error:", error);
      toast.error("Failed to remove transcript");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0E14] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#00B4D8] animate-spin" />
      </div>
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoSections 
            personalInfo={personalInfo} 
            setPersonalInfo={setPersonalInfo}
            onSectionComplete={() => handleStepChange(2)}
          />
        );

      case 2:
        return (
          <AcademicHistorySections 
            academicHistory={academicHistory} 
            setAcademicHistory={setAcademicHistory}
            onSectionComplete={() => handleStepChange(3)}
          />
        );

      case 3:
        return (
          <EmploymentHistorySections 
            employmentHistory={employmentHistory} 
            setEmploymentHistory={setEmploymentHistory}
            onSectionComplete={() => handleStepChange(4)}
          />
        );

      case 4:
        return (
          <div className="space-y-8" data-testid="step-4-documents">
            {/* Section Header */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#9C27B0] to-[#E91E63] rounded-full" />
              <h3 className="text-2xl font-light text-white tracking-tight">Documents Required</h3>
              <p className="text-slate-500 text-sm mt-1">Upload all required documents for your application</p>
            </div>

            {/* Requirements Notice - Glass Card */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 hover:border-[#FF6B35]/20 transition-colors duration-500">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#FF6B35]/10 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-[#FF6B35]" />
                </div>
                <div className="space-y-2">
                  <p className="text-white font-medium">Document Requirements</p>
                  <p className="text-slate-400 text-sm">
                    Upload clear, legible copies of all required documents. Accepted formats: PDF, DOC, DOCX, JPG, PNG
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {["PDF", "DOC", "DOCX", "JPG", "PNG"].map(format => (
                      <span key={format} className="px-2 py-1 rounded-full bg-white/5 text-slate-500 text-xs">
                        {format}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Upload Progress Summary */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 hover:border-[#00B4D8]/20 transition-colors duration-500">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#00B4D8]/10 flex items-center justify-center">
                    <Upload className="w-4 h-4 text-[#00B4D8]" />
                  </div>
                  <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Upload Progress</span>
                </div>
                <span className="text-white font-medium">
                  {application?.documents?.filter(d => d.status === "uploaded").length || 0} / {application?.documents?.length || 5} uploaded
                </span>
              </div>
              <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#00B4D8] to-[#00F5FF] rounded-full transition-all duration-500"
                  style={{ width: `${((application?.documents?.filter(d => d.status === "uploaded").length || 0) / (application?.documents?.length || 5)) * 100}%` }}
                />
              </div>
            </div>

            {/* Documents List */}
            <div className="space-y-4">
              {application?.documents?.map((doc, index) => (
                <div
                  key={doc.id}
                  className={`backdrop-blur-xl bg-white/[0.02] border rounded-2xl p-5 transition-all duration-500 ${
                    doc.status === "uploaded"
                      ? "border-[#28A745]/30 hover:border-[#28A745]/50"
                      : "border-white/[0.05] hover:border-[#00B4D8]/30"
                  }`}
                  data-testid={`document-${doc.type}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                        doc.status === "uploaded" 
                          ? "bg-[#28A745]/20" 
                          : "bg-white/5"
                      }`}>
                        {doc.status === "uploaded" ? (
                          <Check className="w-7 h-7 text-[#28A745]" />
                        ) : (
                          <FileText className="w-7 h-7 text-slate-500" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          {doc.type === "transcript" && doc.files && doc.files.length > 0 ? (
                            <button
                              onClick={() => setExpandedTranscript(!expandedTranscript)}
                              className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
                            >
                              <p className="text-white font-medium">{doc.name}</p>
                              <span className="text-slate-400">•</span>
                              <span className="text-[#00B4D8] font-medium">
                                Total: {doc.files.length}
                              </span>
                              <ChevronDown className={`w-4 h-4 text-[#00B4D8] transition-transform duration-300 ${expandedTranscript ? 'rotate-180' : ''}`} />
                            </button>
                          ) : (
                            <p className="text-white font-medium">{doc.name}</p>
                          )}
                          {doc.status !== "uploaded" && (
                            <span className="px-2 py-0.5 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] text-xs">Required</span>
                          )}
                        </div>
                        <p className="text-slate-500 text-sm mt-1">
                          {doc.type === "transcript" ? (
                            doc.files && doc.files.length > 0 
                              ? "Click to view and manage transcripts"
                              : "Upload transcripts from all schools attended"
                          ) : (
                            doc.status === "uploaded"
                              ? `Uploaded ${new Date(doc.uploaded_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                              : "No file uploaded yet"
                          )}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {doc.type === "transcript" && (
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            multiple
                            onChange={(e) => {
                              if (e.target.files?.length > 0) {
                                handleMultipleFileUpload(doc.id, Array.from(e.target.files));
                              }
                            }}
                            data-testid={`upload-${doc.type}`}
                          />
                          <span className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                            doc.status === "uploaded"
                              ? "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                              : "bg-[#00B4D8] hover:bg-[#0096B4] text-white shadow-[0_0_15px_rgba(0,180,216,0.3)]"
                          }`}>
                            <Upload className="w-4 h-4" />
                            {doc.status === "uploaded" ? "Add More" : "Upload"}
                          </span>
                        </label>
                      )}
                      {doc.type !== "transcript" && (
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleFileUpload(doc.id, e.target.files[0]);
                              }
                            }}
                            data-testid={`upload-${doc.type}`}
                          />
                          <span className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                            doc.status === "uploaded"
                              ? "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                              : "bg-[#00B4D8] hover:bg-[#0096B4] text-white shadow-[0_0_15px_rgba(0,180,216,0.3)]"
                          }`}>
                            <Upload className="w-4 h-4" />
                            {doc.status === "uploaded" ? "Replace" : "Upload"}
                          </span>
                        </label>
                      )}
                    </div>
                  </div>
                  
                  {/* Expandable transcript files list */}
                  {doc.type === "transcript" && doc.files && doc.files.length > 0 && expandedTranscript && (
                    <div className="mt-4 pt-4 border-t border-white/[0.05] space-y-2 animate-in slide-in-from-top-2 duration-300">
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-3">Uploaded Transcripts ({doc.files.length})</p>
                      {doc.files.map((file, fileIndex) => (
                        <div key={fileIndex} className="flex items-center justify-between py-3 px-4 rounded-xl bg-white/[0.02] border border-white/[0.03] hover:border-white/[0.08] transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#28A745]/10 flex items-center justify-center">
                              <FileText className="w-4 h-4 text-[#28A745]" />
                            </div>
                            <div>
                              <span className="text-white text-sm font-medium">{file.name}</span>
                              <p className="text-slate-500 text-xs">
                                Uploaded {new Date(file.uploaded_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveTranscriptFile(doc.id, fileIndex)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors text-sm"
                            data-testid={`remove-transcript-${fileIndex}`}
                          >
                            <X className="w-3.5 h-3.5" />
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Disclosure Notice - Glass Card */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 hover:border-[#7B68EE]/20 transition-colors duration-500">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#7B68EE]/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-[#7B68EE]" />
                </div>
                <div className="space-y-3">
                  <p className="text-white font-medium">Important Disclosure</p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    By submitting these documents, you certify that all information provided is true and accurate to the best of your knowledge. 
                    Falsification of any document may result in rejection of your application or dismissal from the program.
                  </p>
                  <p className="text-slate-500 text-xs">
                    All documents are encrypted and stored securely in compliance with FERPA regulations.
                  </p>
                </div>
              </div>
            </div>

            {/* Completion Status */}
            {application?.documents?.every(d => d.status === "uploaded") && (
              <div className="flex items-center justify-center p-6 rounded-xl bg-gradient-to-r from-[#28A745]/10 to-[#00B4D8]/10 border border-[#28A745]/20 animate-in fade-in duration-500">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[#28A745]/20 flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6 text-[#28A745]" />
                  </div>
                  <p className="text-white font-medium">All Documents Uploaded!</p>
                  <p className="text-slate-500 text-sm mt-1">You're ready to proceed to the final review step</p>
                </div>
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-8" data-testid="step-5-review">
            {/* Section Header */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#28A745] to-[#00B4D8] rounded-full" />
              <h3 className="text-2xl font-light text-white tracking-tight">Review & Submit</h3>
              <p className="text-slate-500 text-sm mt-1">Review your application before final submission</p>
            </div>

            {/* Completion Status - Glass Card */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 hover:border-[#00B4D8]/20 transition-colors duration-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#00B4D8]/10 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-[#00B4D8]" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider">Application Progress</p>
                    <p className="text-2xl font-light text-white">{application?.progress || 0}% <span className="text-sm text-slate-500">Complete</span></p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-slate-500 text-xs uppercase tracking-wider">Status</p>
                  <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${
                    application?.status === "submitted" 
                      ? "bg-[#28A745]/20 text-[#28A745]" 
                      : "bg-[#FF9800]/20 text-[#FF9800]"
                  }`}>
                    {application?.status === "submitted" ? "Submitted" : "In Progress"}
                  </span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4 pt-4 border-t border-white/[0.05]">
                <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#00B4D8] to-[#28A745] rounded-full transition-all duration-500"
                    style={{ width: `${application?.progress || 0}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Summary Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Info Card */}
              <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 hover:border-[#00B4D8]/20 transition-colors duration-500 group">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#00B4D8]/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-[#00B4D8]" />
                    </div>
                    <h4 className="text-white font-medium">Personal Information</h4>
                  </div>
                  <button 
                    onClick={() => { setCurrentStep(1); navigate(`/application/${appId}/1`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 text-[#00B4D8] hover:bg-[#00B4D8]/10 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-white/[0.03]">
                    <span className="text-slate-500 text-sm">Name</span>
                    <span className="text-white text-sm">{personalInfo.first_name} {personalInfo.last_name}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/[0.03]">
                    <span className="text-slate-500 text-sm">Email</span>
                    <span className="text-slate-300 text-sm">{personalInfo.email || "Not provided"}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/[0.03]">
                    <span className="text-slate-500 text-sm">Phone</span>
                    <span className="text-slate-300 text-sm">{personalInfo.phone || "Not provided"}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-slate-500 text-sm">Location</span>
                    <span className="text-slate-300 text-sm">
                      {personalInfo.city && personalInfo.state ? `${personalInfo.city}, ${personalInfo.state}` : "Not provided"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Academic History Card */}
              <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 hover:border-[#7B68EE]/20 transition-colors duration-500 group">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#7B68EE]/10 flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-[#7B68EE]" />
                    </div>
                    <h4 className="text-white font-medium">Academic History</h4>
                  </div>
                  <button 
                    onClick={() => { setCurrentStep(2); navigate(`/application/${appId}/2`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 text-[#7B68EE] hover:bg-[#7B68EE]/10 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-white/[0.03]">
                    <span className="text-slate-500 text-sm">Highest Degree</span>
                    <span className="text-white text-sm capitalize">{academicHistory.highest_degree?.replace('_', ' ') || "Not provided"}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/[0.03]">
                    <span className="text-slate-500 text-sm">Institutions</span>
                    <span className="text-slate-300 text-sm">{(academicHistory.institutions || []).length} listed</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/[0.03]">
                    <span className="text-slate-500 text-sm">Prior Application</span>
                    <span className="text-slate-300 text-sm capitalize">{academicHistory.prior_application || "Not specified"}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-slate-500 text-sm">TOEFL</span>
                    <span className="text-slate-300 text-sm">{academicHistory.toefl_total ? `Score: ${academicHistory.toefl_total}` : "Not required"}</span>
                  </div>
                </div>
              </div>

              {/* Employment History Card */}
              <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 hover:border-[#FF9800]/20 transition-colors duration-500 group">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FF9800]/10 flex items-center justify-center">
                      <LayoutDashboard className="w-5 h-5 text-[#FF9800]" />
                    </div>
                    <h4 className="text-white font-medium">Employment History</h4>
                  </div>
                  <button 
                    onClick={() => { setCurrentStep(3); navigate(`/application/${appId}/3`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 text-[#FF9800] hover:bg-[#FF9800]/10 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-white/[0.03]">
                    <span className="text-slate-500 text-sm">Verifications</span>
                    <span className="text-white text-sm">{(employmentHistory.verifications || []).length} submitted</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/[0.03]">
                    <span className="text-slate-500 text-sm">Confirmed</span>
                    <span className="text-slate-300 text-sm">
                      {(employmentHistory.verifications || []).filter(v => v.date_confirmed).length} of {(employmentHistory.verifications || []).length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-slate-500 text-sm">Total Hours</span>
                    <span className={`text-sm font-medium ${
                      (employmentHistory.verifications || []).reduce((sum, v) => sum + (parseInt(v.hours_worked) || 0), 0) >= 2080
                        ? "text-[#28A745]"
                        : "text-[#FF6B35]"
                    }`}>
                      {(employmentHistory.verifications || []).reduce((sum, v) => sum + (parseInt(v.hours_worked) || 0), 0).toLocaleString()} / 2,080
                    </span>
                  </div>
                </div>
              </div>

              {/* Documents Card */}
              <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 hover:border-[#E91E63]/20 transition-colors duration-500 group">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E91E63]/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#E91E63]" />
                    </div>
                    <h4 className="text-white font-medium">Documents Required</h4>
                  </div>
                  <button 
                    onClick={() => { setCurrentStep(4); navigate(`/application/${appId}/4`); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 text-[#E91E63] hover:bg-[#E91E63]/10 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 border-b border-white/[0.03]">
                    <span className="text-slate-500 text-sm">Uploaded</span>
                    <span className="text-white text-sm">
                      {application?.documents?.filter(d => d.status === "uploaded").length || 0} of {application?.documents?.length || 5}
                    </span>
                  </div>
                  <div className="space-y-2 pt-2">
                    {application?.documents?.map((doc) => (
                      <div key={doc.id} className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          doc.status === "uploaded" ? "bg-[#28A745]/20" : "bg-white/5"
                        }`}>
                          {doc.status === "uploaded" ? (
                            <Check className="w-3 h-3 text-[#28A745]" />
                          ) : (
                            <X className="w-3 h-3 text-slate-500" />
                          )}
                        </div>
                        <span className={`text-sm ${doc.status === "uploaded" ? "text-slate-300" : "text-slate-500"}`}>
                          {doc.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Program Selection Summary */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 hover:border-[#00B4D8]/20 transition-colors duration-500">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#00B4D8]/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-[#00B4D8]" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Selected Program</h4>
                  <p className="text-slate-500 text-xs">Your chosen degree program</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-black/20 border border-white/[0.03]">
                  <p className="text-slate-600 text-xs uppercase tracking-wider mb-1">Program</p>
                  <p className="text-white font-medium">{programSelection.program_type || "OT"}</p>
                </div>
                <div className="p-4 rounded-xl bg-black/20 border border-white/[0.03]">
                  <p className="text-slate-600 text-xs uppercase tracking-wider mb-1">Degree</p>
                  <p className="text-white font-medium">{programSelection.degree_type || "Not selected"}</p>
                </div>
                <div className="p-4 rounded-xl bg-black/20 border border-white/[0.03]">
                  <p className="text-slate-600 text-xs uppercase tracking-wider mb-1">Campus</p>
                  <p className="text-white font-medium capitalize">{programSelection.campus?.replace('_', ' ') || "Not selected"}</p>
                </div>
                <div className="p-4 rounded-xl bg-black/20 border border-white/[0.03]">
                  <p className="text-slate-600 text-xs uppercase tracking-wider mb-1">Start Term</p>
                  <p className="text-white font-medium">{programSelection.start_term || "Not selected"}</p>
                </div>
              </div>
            </div>

            {/* Certification & Agreement */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 hover:border-[#7B68EE]/20 transition-colors duration-500">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#7B68EE]/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <AlertCircle className="w-5 h-5 text-[#7B68EE]" />
                </div>
                <div className="space-y-3">
                  <h4 className="text-white font-medium">Certification & Agreement</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    By clicking "Submit Application," I certify that all information provided in this application is true, 
                    accurate, and complete to the best of my knowledge. I understand that any falsification, misrepresentation, 
                    or omission of information may result in denial of admission or dismissal from the program.
                  </p>
                  <p className="text-slate-500 text-xs">
                    I authorize the University of St. Augustine for Health Sciences to verify all information provided 
                    and to contact references as needed.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Section */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-[#00B4D8]/10 to-[#7B68EE]/10 border border-[#00B4D8]/20 rounded-2xl p-10 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00B4D8]/20 to-[#7B68EE]/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-[#00B4D8]" />
              </div>
              <h3 className="font-['Outfit'] text-3xl font-light text-white mb-3">
                Ready to Submit?
              </h3>
              <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                Please review all information carefully. Once submitted, you will not be able to make changes to your application. 
                Our admissions team will review your application and contact you within 2-3 business days.
              </p>
              
              <Button
                onClick={handleSubmit}
                disabled={saving}
                className="bg-gradient-to-r from-[#00B4D8] to-[#7B68EE] hover:opacity-90 text-white rounded-full px-14 py-7 text-lg shadow-[0_0_40px_rgba(0,180,216,0.4)] hover:shadow-[0_0_60px_rgba(0,180,216,0.5)] transition-all duration-300"
                data-testid="submit-application-btn"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <Check className="w-6 h-6 mr-3" />
                    Submit Application
                  </>
                )}
              </Button>
              
              <p className="text-slate-600 text-xs mt-6">
                By submitting, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E14]">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-40 bg-[#0A0E14]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            data-testid="back-to-dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>
          
          <div className="text-center">
            <p className="text-white font-['Outfit'] font-semibold">Application</p>
            <p className="text-slate-500 text-sm">{application?.program_selection?.program_type || "Program"}</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Ask Journey Button */}
            <Button
              onClick={() => setShowChat(true)}
              className="bg-gradient-to-r from-[#00B4D8]/20 to-[#7B68EE]/20 border border-[#00B4D8]/30 text-white hover:border-[#00F5FF] hover:bg-[#00B4D8]/30 rounded-full px-4 py-2 flex items-center gap-2 transition-all"
              data-testid="ask-journey-btn"
            >
              <Sparkles className="w-4 h-4 text-[#00F5FF]" />
              <span className="hidden sm:inline">Ask Journey</span>
            </Button>
            
            <Button
              onClick={() => saveProgress()}
              disabled={saving}
              variant="ghost"
              className="text-[#00B4D8] hover:text-[#00F5FF] hover:bg-[#00B4D8]/10"
              data-testid="save-progress-btn"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              <span className="hidden sm:inline ml-2">Save</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="bg-[#11161F] border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-sm">Step {currentStep} of 5</span>
            <span className="text-[#00F5FF] text-sm font-medium">{application?.progress || 0}% Complete</span>
          </div>
          <Progress value={(currentStep / 5) * 100} className="h-2 bg-slate-800" />
        </div>
      </div>

      {/* Step Navigation */}
      <div className="bg-[#0A0E14] border-b border-white/5 overflow-x-auto">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex gap-2 min-w-max">
            {steps.map(({ step, label, icon: Icon }) => (
              <button
                key={step}
                onClick={() => {
                  setCurrentStep(step);
                  navigate(`/application/${appId}/${step}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  step === currentStep
                    ? "bg-[#00B4D8] text-white"
                    : step < currentStep
                    ? "bg-[#28A745]/20 text-[#28A745]"
                    : "bg-white/5 text-slate-500"
                }`}
                data-testid={`step-nav-${step}`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">{label}</span>
                <span className="md:hidden">{step}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="font-['Outfit'] text-2xl lg:text-3xl font-bold text-white mb-2">
            {steps[currentStep - 1]?.label}
          </h1>
          <p className="text-slate-400">
            {currentStep === 1 && "Tell us about yourself"}
            {currentStep === 2 && "Share your educational background"}
            {currentStep === 3 && "Tell us about your work experience"}
            {currentStep === 4 && "Upload required documents"}
            {currentStep === 5 && "Review and submit your application"}
          </p>
        </div>

        {renderStepContent()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-12 pt-8 border-t border-white/10">
          <Button
            onClick={handleBack}
            disabled={currentStep === 1}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/5 rounded-full px-6"
            data-testid="prev-step-btn"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          {currentStep < 5 ? (
            <Button
              onClick={handleNext}
              disabled={saving}
              className="bg-[#00B4D8] hover:bg-[#0096B4] text-white rounded-full px-6"
              data-testid="next-step-btn"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          ) : null}
        </div>
      </div>

      {showChat && <AIChat onClose={() => setShowChat(false)} />}
    </div>
  );
};

export default ApplicationForm;
