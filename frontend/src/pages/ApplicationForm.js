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
  User, GraduationCap, LayoutDashboard, Upload, DollarSign, CheckCircle2,
  ArrowLeft, ArrowRight, Save, Loader2, FileText, X, Check, Sparkles,
  MapPin, Calendar, AlertCircle
} from "lucide-react";
import AIChat from "@/components/AIChat";

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

  // Form state
  const [personalInfo, setPersonalInfo] = useState({});
  const [academicHistory, setAcademicHistory] = useState({});
  const [programSelection, setProgramSelection] = useState({});
  const [financialAid, setFinancialAid] = useState({});

  const steps = [
    { step: 1, label: "Personal Information", icon: User },
    { step: 2, label: "Academic History", icon: GraduationCap },
    { step: 3, label: "Program Selection", icon: LayoutDashboard },
    { step: 4, label: "Documents", icon: Upload },
    { step: 5, label: "Financial Aid", icon: DollarSign },
    { step: 6, label: "Review & Submit", icon: CheckCircle2 }
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
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      navigate(`/application/${appId}/${currentStep - 1}`);
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
          <div className="space-y-6" data-testid="step-1-personal">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-slate-300">First Name *</Label>
                <Input
                  value={personalInfo.first_name || ""}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, first_name: e.target.value })}
                  className="h-12 bg-black/20 border-white/10 focus:border-[#00F5FF] text-white rounded-xl"
                  data-testid="personal-firstname"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Last Name *</Label>
                <Input
                  value={personalInfo.last_name || ""}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, last_name: e.target.value })}
                  className="h-12 bg-black/20 border-white/10 focus:border-[#00F5FF] text-white rounded-xl"
                  data-testid="personal-lastname"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-slate-300">Email Address *</Label>
              <Input
                type="email"
                value={personalInfo.email || ""}
                onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                className="h-12 bg-black/20 border-white/10 focus:border-[#00F5FF] text-white rounded-xl"
                data-testid="personal-email"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-slate-300">Phone Number</Label>
                <Input
                  type="tel"
                  value={personalInfo.phone || ""}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                  className="h-12 bg-black/20 border-white/10 focus:border-[#00F5FF] text-white rounded-xl"
                  data-testid="personal-phone"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Date of Birth</Label>
                <Input
                  type="date"
                  value={personalInfo.date_of_birth || ""}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, date_of_birth: e.target.value })}
                  className="h-12 bg-black/20 border-white/10 focus:border-[#00F5FF] text-white rounded-xl"
                  data-testid="personal-dob"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Street Address</Label>
              <Input
                value={personalInfo.address || ""}
                onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                className="h-12 bg-black/20 border-white/10 focus:border-[#00F5FF] text-white rounded-xl"
                data-testid="personal-address"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">City</Label>
                <Input
                  value={personalInfo.city || ""}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, city: e.target.value })}
                  className="h-12 bg-black/20 border-white/10 focus:border-[#00F5FF] text-white rounded-xl"
                  data-testid="personal-city"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">State</Label>
                <Input
                  value={personalInfo.state || ""}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, state: e.target.value })}
                  className="h-12 bg-black/20 border-white/10 focus:border-[#00F5FF] text-white rounded-xl"
                  data-testid="personal-state"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">ZIP Code</Label>
                <Input
                  value={personalInfo.zip_code || ""}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, zip_code: e.target.value })}
                  className="h-12 bg-black/20 border-white/10 focus:border-[#00F5FF] text-white rounded-xl"
                  data-testid="personal-zip"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Country</Label>
                <Input
                  value={personalInfo.country || "United States"}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, country: e.target.value })}
                  className="h-12 bg-black/20 border-white/10 focus:border-[#00F5FF] text-white rounded-xl"
                  data-testid="personal-country"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6" data-testid="step-2-academic">
            <div className="space-y-2">
              <Label className="text-slate-300">Institution Name *</Label>
              <Input
                value={academicHistory.institution_name || ""}
                onChange={(e) => setAcademicHistory({ ...academicHistory, institution_name: e.target.value })}
                placeholder="e.g., University of Florida"
                className="h-12 bg-black/20 border-white/10 focus:border-[#00F5FF] text-white rounded-xl"
                data-testid="academic-institution"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-slate-300">Degree Type *</Label>
                <Select
                  value={academicHistory.degree_type || ""}
                  onValueChange={(value) => setAcademicHistory({ ...academicHistory, degree_type: value })}
                >
                  <SelectTrigger className="h-12 bg-black/20 border-white/10 text-white rounded-xl" data-testid="academic-degree-type">
                    <SelectValue placeholder="Select degree type" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#11161F] border-white/10">
                    <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                    <SelectItem value="masters">Master's Degree</SelectItem>
                    <SelectItem value="associates">Associate's Degree</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Major/Field of Study</Label>
                <Input
                  value={academicHistory.major || ""}
                  onChange={(e) => setAcademicHistory({ ...academicHistory, major: e.target.value })}
                  placeholder="e.g., Biology, Health Sciences"
                  className="h-12 bg-black/20 border-white/10 focus:border-[#00F5FF] text-white rounded-xl"
                  data-testid="academic-major"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-slate-300">GPA (4.0 Scale)</Label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4"
                  value={academicHistory.gpa || ""}
                  onChange={(e) => setAcademicHistory({ ...academicHistory, gpa: parseFloat(e.target.value) })}
                  placeholder="e.g., 3.5"
                  className="h-12 bg-black/20 border-white/10 focus:border-[#00F5FF] text-white rounded-xl"
                  data-testid="academic-gpa"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Graduation Date</Label>
                <Input
                  type="month"
                  value={academicHistory.graduation_date || ""}
                  onChange={(e) => setAcademicHistory({ ...academicHistory, graduation_date: e.target.value })}
                  className="h-12 bg-black/20 border-white/10 focus:border-[#00F5FF] text-white rounded-xl"
                  data-testid="academic-graduation"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8" data-testid="step-3-program">
            {/* Program Type */}
            <div>
              <Label className="text-slate-300 mb-4 block">Program Type *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: "Occupational Therapy", name: "Occupational Therapy", icon: GraduationCap, color: "#00B4D8" },
                  { id: "Nursing", name: "Nursing", icon: User, color: "#7B68EE" }
                ].map((program) => (
                  <button
                    key={program.id}
                    type="button"
                    onClick={() => setProgramSelection({ ...programSelection, program_type: program.id })}
                    className={`p-6 rounded-xl border text-left transition-all ${
                      programSelection.program_type === program.id
                        ? "border-[#00F5FF] bg-[#00F5FF]/10"
                        : "border-white/10 bg-white/5 hover:border-white/30"
                    }`}
                    data-testid={`program-type-${program.id.toLowerCase().replace(' ', '-')}`}
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: `${program.color}20` }}
                      >
                        <program.icon className="w-6 h-6" style={{ color: program.color }} />
                      </div>
                      <p className="text-white font-medium text-lg">{program.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Program Level */}
            <div>
              <Label className="text-slate-300 mb-4 block">Program Level *</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {(programSelection.program_type === "Occupational Therapy" 
                  ? [{ code: "MOT", name: "Master's" }, { code: "OTD", name: "Doctorate" }]
                  : [{ code: "MSN", name: "Master's" }, { code: "DNP", name: "Doctorate" }]
                ).map((level) => (
                  <button
                    key={level.code}
                    type="button"
                    onClick={() => setProgramSelection({ ...programSelection, program_level: level.code })}
                    className={`p-4 rounded-xl border text-center transition-all ${
                      programSelection.program_level === level.code
                        ? "border-[#00F5FF] bg-[#00F5FF]/10"
                        : "border-white/10 bg-white/5 hover:border-white/30"
                    }`}
                    data-testid={`program-level-${level.code}`}
                  >
                    <p className="text-white font-bold text-xl">{level.code}</p>
                    <p className="text-slate-400 text-sm">{level.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Campus */}
            <div>
              <Label className="text-slate-300 mb-4 block">Preferred Campus *</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {["Austin", "Dallas", "Miami", "San Marcos", "St. Augustine"].map((campus) => (
                  <button
                    key={campus}
                    type="button"
                    onClick={() => setProgramSelection({ ...programSelection, campus })}
                    className={`p-4 rounded-xl border transition-all ${
                      programSelection.campus === campus
                        ? "border-[#00F5FF] bg-[#00F5FF]/10"
                        : "border-white/10 bg-white/5 hover:border-white/30"
                    }`}
                    data-testid={`campus-${campus.toLowerCase().replace(' ', '-')}`}
                  >
                    <MapPin className={`w-5 h-5 mx-auto mb-2 ${
                      programSelection.campus === campus ? "text-[#00F5FF]" : "text-slate-400"
                    }`} />
                    <p className="text-white text-sm font-medium">{campus}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Start Term */}
            <div>
              <Label className="text-slate-300 mb-4 block">Start Term *</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {programs?.start_terms?.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setProgramSelection({ ...programSelection, start_term: term })}
                    className={`p-4 rounded-xl border transition-all ${
                      programSelection.start_term === term
                        ? "border-[#00F5FF] bg-[#00F5FF]/10"
                        : "border-white/10 bg-white/5 hover:border-white/30"
                    }`}
                    data-testid={`term-${term.toLowerCase().replace(' ', '-')}`}
                  >
                    <Calendar className={`w-5 h-5 mx-auto mb-2 ${
                      programSelection.start_term === term ? "text-[#00F5FF]" : "text-slate-400"
                    }`} />
                    <p className="text-white text-sm font-medium">{term}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Full-time toggle */}
            <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5">
              <div>
                <p className="text-white font-medium">Full-Time Enrollment</p>
                <p className="text-slate-400 text-sm">I plan to enroll as a full-time student</p>
              </div>
              <Switch
                checked={programSelection.full_time !== false}
                onCheckedChange={(checked) => setProgramSelection({ ...programSelection, full_time: checked })}
                data-testid="fulltime-switch"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6" data-testid="step-4-documents">
            <div className="glass-card rounded-xl p-4 border-[#FF6B35]/30 bg-[#FF6B35]/5">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#FF6B35] mt-0.5" />
                <div>
                  <p className="text-white font-medium">Document Requirements</p>
                  <p className="text-slate-400 text-sm">
                    Upload clear, legible copies of all required documents. Accepted formats: PDF, DOC, DOCX, JPG, PNG
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {application?.documents?.map((doc) => (
                <div
                  key={doc.id}
                  className={`p-4 rounded-xl border transition-all ${
                    doc.status === "uploaded"
                      ? "border-[#28A745]/30 bg-[#28A745]/5"
                      : "border-white/10 bg-white/5"
                  }`}
                  data-testid={`document-${doc.type}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        doc.status === "uploaded" ? "bg-[#28A745]/20" : "bg-white/10"
                      }`}>
                        {doc.status === "uploaded" ? (
                          <Check className="w-6 h-6 text-[#28A745]" />
                        ) : (
                          <FileText className="w-6 h-6 text-slate-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium">{doc.name}</p>
                        <p className="text-slate-500 text-sm">
                          {doc.status === "uploaded"
                            ? `Uploaded ${new Date(doc.uploaded_at).toLocaleDateString()}`
                            : "Required"
                          }
                        </p>
                      </div>
                    </div>
                    
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
                      <span className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        doc.status === "uploaded"
                          ? "bg-white/10 text-slate-300 hover:bg-white/20"
                          : "bg-[#00B4D8] text-white hover:bg-[#0096B4]"
                      }`}>
                        {doc.status === "uploaded" ? "Replace" : "Upload"}
                      </span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6" data-testid="step-5-financial">
            <div className="p-6 rounded-xl border border-white/10 bg-white/5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white font-medium">FAFSA Application</p>
                  <p className="text-slate-400 text-sm">Have you completed your FAFSA application?</p>
                </div>
                <Switch
                  checked={financialAid.fafsa_completed || false}
                  onCheckedChange={(checked) => setFinancialAid({ ...financialAid, fafsa_completed: checked })}
                  data-testid="fafsa-switch"
                />
              </div>
              {!financialAid.fafsa_completed && (
                <a 
                  href="https://studentaid.gov/h/apply-for-aid/fafsa" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#00B4D8] hover:text-[#00F5FF] text-sm"
                >
                  Apply for FAFSA →
                </a>
              )}
            </div>

            <div className="p-6 rounded-xl border border-white/10 bg-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Scholarship Interest</p>
                  <p className="text-slate-400 text-sm">Would you like information about scholarships?</p>
                </div>
                <Switch
                  checked={financialAid.scholarship_interest || false}
                  onCheckedChange={(checked) => setFinancialAid({ ...financialAid, scholarship_interest: checked })}
                  data-testid="scholarship-switch"
                />
              </div>
            </div>

            <div className="p-6 rounded-xl border border-white/10 bg-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Payment Plan Interest</p>
                  <p className="text-slate-400 text-sm">Interested in monthly payment plans?</p>
                </div>
                <Switch
                  checked={financialAid.payment_plan_interest || false}
                  onCheckedChange={(checked) => setFinancialAid({ ...financialAid, payment_plan_interest: checked })}
                  data-testid="payment-plan-switch"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Additional Comments</Label>
              <Textarea
                value={financialAid.comments || ""}
                onChange={(e) => setFinancialAid({ ...financialAid, comments: e.target.value })}
                placeholder="Any questions or additional information about financial aid..."
                className="min-h-[100px] bg-black/20 border-white/10 focus:border-[#00F5FF] text-white rounded-xl resize-none"
                data-testid="financial-comments"
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-8" data-testid="step-6-review">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Info */}
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <User className="w-5 h-5 text-[#00B4D8]" />
                    Personal Information
                  </h3>
                  <button 
                    onClick={() => { setCurrentStep(1); navigate(`/application/${appId}/1`); }}
                    className="text-[#00B4D8] text-sm hover:text-[#00F5FF]"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-slate-300">{personalInfo.first_name} {personalInfo.last_name}</p>
                  <p className="text-slate-400">{personalInfo.email}</p>
                  <p className="text-slate-400">{personalInfo.phone}</p>
                  <p className="text-slate-400">{personalInfo.city}, {personalInfo.state}</p>
                </div>
              </div>

              {/* Academic */}
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-[#00B4D8]" />
                    Academic History
                  </h3>
                  <button 
                    onClick={() => { setCurrentStep(2); navigate(`/application/${appId}/2`); }}
                    className="text-[#00B4D8] text-sm hover:text-[#00F5FF]"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-slate-300">{academicHistory.institution_name}</p>
                  <p className="text-slate-400">{academicHistory.degree_type} in {academicHistory.major}</p>
                  <p className="text-slate-400">GPA: {academicHistory.gpa}</p>
                </div>
              </div>

              {/* Program */}
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <LayoutDashboard className="w-5 h-5 text-[#00B4D8]" />
                    Program Selection
                  </h3>
                  <button 
                    onClick={() => { setCurrentStep(3); navigate(`/application/${appId}/3`); }}
                    className="text-[#00B4D8] text-sm hover:text-[#00F5FF]"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-slate-300">{programSelection.program_type} - {programSelection.program_level}</p>
                  <p className="text-slate-400">Campus: {programSelection.campus}</p>
                  <p className="text-slate-400">Start: {programSelection.start_term}</p>
                </div>
              </div>

              {/* Documents */}
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#00B4D8]" />
                    Documents
                  </h3>
                  <button 
                    onClick={() => { setCurrentStep(4); navigate(`/application/${appId}/4`); }}
                    className="text-[#00B4D8] text-sm hover:text-[#00F5FF]"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-slate-300">
                    {application?.documents?.filter(d => d.status === "uploaded").length} of {application?.documents?.length} uploaded
                  </p>
                  {application?.documents?.map((doc) => (
                    <div key={doc.id} className="flex items-center gap-2">
                      {doc.status === "uploaded" ? (
                        <Check className="w-4 h-4 text-[#28A745]" />
                      ) : (
                        <X className="w-4 h-4 text-slate-500" />
                      )}
                      <span className={doc.status === "uploaded" ? "text-slate-300" : "text-slate-500"}>
                        {doc.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Section */}
            <div className="glass-card rounded-xl p-8 text-center border-[#00B4D8]/30">
              <CheckCircle2 className="w-16 h-16 text-[#00B4D8] mx-auto mb-4" />
              <h3 className="font-['Outfit'] text-2xl font-bold text-white mb-2">
                Ready to Submit?
              </h3>
              <p className="text-slate-400 mb-6 max-w-md mx-auto">
                Please review all information carefully. Once submitted, you cannot make changes to your application.
              </p>
              <Button
                onClick={handleSubmit}
                disabled={saving}
                className="bg-gradient-to-r from-[#00B4D8] to-[#7B68EE] hover:opacity-90 text-white rounded-full px-12 py-6 text-lg shadow-[0_0_30px_rgba(0,180,216,0.4)] transition-all"
                data-testid="submit-application-btn"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Submit Application
                  </>
                )}
              </Button>
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
            <span className="text-slate-400 text-sm">Step {currentStep} of 6</span>
            <span className="text-[#00F5FF] text-sm font-medium">{application?.progress || 0}% Complete</span>
          </div>
          <Progress value={(currentStep / 6) * 100} className="h-2 bg-slate-800" />
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
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="font-['Outfit'] text-2xl lg:text-3xl font-bold text-white mb-2">
            {steps[currentStep - 1]?.label}
          </h1>
          <p className="text-slate-400">
            {currentStep === 1 && "Tell us about yourself"}
            {currentStep === 2 && "Share your educational background"}
            {currentStep === 3 && "Select your desired program and campus"}
            {currentStep === 4 && "Upload required documents"}
            {currentStep === 5 && "Financial aid and scholarship information"}
            {currentStep === 6 && "Review and submit your application"}
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
          
          {currentStep < 6 ? (
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
