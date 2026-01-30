import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Briefcase, Check, Plus, Trash2, Info, Mail, Phone, Building, Calendar, Clock, User, X, Send
} from "lucide-react";

const EmploymentHistorySections = ({ employmentHistory, setEmploymentHistory, onSectionComplete }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newVerification, setNewVerification] = useState({
    verifier_first_name: "",
    verifier_last_name: "",
    verifier_email: "",
    verifier_phone: "",
    employer_name: "",
    employer_address: "",
    job_title: "",
    start_date: "",
    end_date: "",
    hours_worked: "",
  });

  const addVerification = () => {
    const verifications = employmentHistory.verifications || [];
    setEmploymentHistory({
      ...employmentHistory,
      verifications: [
        ...verifications,
        {
          id: Date.now(),
          ...newVerification,
          request_stage: "Pending",
          date_requested: new Date().toISOString().split('T')[0],
          date_confirmed: null
        }
      ]
    });
    setNewVerification({
      verifier_first_name: "",
      verifier_last_name: "",
      verifier_email: "",
      verifier_phone: "",
      employer_name: "",
      employer_address: "",
      job_title: "",
      start_date: "",
      end_date: "",
      hours_worked: "",
    });
    setShowAddForm(false);
  };

  const removeVerification = (id) => {
    const verifications = (employmentHistory.verifications || []).filter(v => v.id !== id);
    setEmploymentHistory({ ...employmentHistory, verifications });
  };

  const totalConfirmedHours = (employmentHistory.verifications || [])
    .filter(v => v.date_confirmed)
    .reduce((sum, v) => sum + (parseInt(v.hours_worked) || 0), 0);

  return (
    <div className="space-y-8" data-testid="subsection-employment-verification">
      {/* Section Header */}
      <div className="relative">
        <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#FF6B35] to-[#FF9800] rounded-full" />
        <h3 className="text-2xl font-light text-white tracking-tight">Employment Verification</h3>
        <p className="text-slate-500 text-sm mt-1">Verify your clinical work experience hours</p>
      </div>

      {/* Requirements Info - Glass Card */}
      <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 space-y-4 hover:border-[#FF6B35]/20 transition-colors duration-500">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#FF6B35]/10 flex items-center justify-center">
            <Info className="w-4 h-4 text-[#FF6B35]" />
          </div>
          <h4 className="text-xs font-medium uppercase tracking-wider text-slate-500">Requirements</h4>
        </div>
        
        <div className="p-4 rounded-xl bg-[#FF6B35]/5 border border-[#FF6B35]/10">
          <p className="text-slate-300 text-sm">
            Applicants must submit proof of employment as an occupational therapy assistant in a clinical setting for at least{" "}
            <strong className="text-white">2,080 hours</strong> (equivalent to 1 year full-time).
          </p>
          <p className="text-slate-500 text-xs mt-2">
            Validation must come directly from your supervising clinician or HR representative.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-white text-sm font-medium">Steps to verify employment:</p>
          <ol className="list-none space-y-2 ml-2">
            {[
              "Click \"Add Employer Verification\"",
              "Complete the Employment Verification form",
              "Click \"Submit Request\"",
              "Check back to see if requests have been confirmed"
            ].map((step, index) => (
              <li key={index} className="flex items-center gap-3 text-slate-400 text-sm">
                <span className="w-6 h-6 rounded-full bg-[#00B4D8]/10 flex items-center justify-center text-xs text-[#00B4D8] font-medium">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Hours Summary - Glass Card */}
      <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 hover:border-[#00B4D8]/20 transition-colors duration-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#00B4D8]/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-[#00B4D8]" />
            </div>
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wider">Total Hours Confirmed</p>
              <p className="text-3xl font-light text-white">
                {totalConfirmedHours.toLocaleString()} <span className="text-sm text-[#00B4D8]">/ 2,080</span>
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-slate-500 text-xs uppercase tracking-wider">Employers Confirmed</p>
            <p className="text-2xl font-light text-white">
              {(employmentHistory.verifications || []).filter(v => v.date_confirmed).length}{" "}
              <span className="text-sm text-slate-500">/ {(employmentHistory.verifications || []).length || 0}</span>
            </p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4 pt-4 border-t border-white/[0.05]">
          <div className="h-2 bg-black/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#00B4D8] to-[#00F5FF] rounded-full transition-all duration-500"
              style={{ width: `${Math.min((totalConfirmedHours / 2080) * 100, 100)}%` }}
            />
          </div>
          <p className="text-slate-500 text-xs mt-2 text-right">
            {Math.round((totalConfirmedHours / 2080) * 100)}% complete
          </p>
        </div>
      </div>

      {/* Add Button */}
      <div className="flex items-center gap-4">
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-[#00B4D8] hover:bg-[#0096B4] text-white rounded-full px-6 shadow-[0_0_20px_rgba(0,180,216,0.3)]"
          data-testid="add-employer-verification-btn"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Employer Verification
        </Button>
      </div>

      {/* Add Verification Form - Modal Style */}
      {showAddForm && (
        <div className="backdrop-blur-xl bg-white/[0.02] border border-[#00B4D8]/30 rounded-2xl p-6 space-y-6 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#00B4D8]/10 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-[#00B4D8]" />
              </div>
              <div>
                <h4 className="text-white font-medium">Add Employment Verification</h4>
                <p className="text-slate-500 text-xs">Fill in the details below</p>
              </div>
            </div>
            <button 
              onClick={() => setShowAddForm(false)}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Verifier Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b border-white/[0.05]">
              <User className="w-4 h-4 text-[#7B68EE]" />
              <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Verifier Information</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  First Name <span className="text-[#00F5FF]">*</span>
                </Label>
                <Input
                  value={newVerification.verifier_first_name}
                  onChange={(e) => setNewVerification({ ...newVerification, verifier_first_name: e.target.value })}
                  placeholder="Supervisor's first name"
                  className="h-12 bg-black/30 border-white/[0.08] focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20 text-white rounded-full px-5 transition-all duration-300 placeholder:text-slate-600"
                  data-testid="verifier-firstname"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Last Name <span className="text-[#00F5FF]">*</span>
                </Label>
                <Input
                  value={newVerification.verifier_last_name}
                  onChange={(e) => setNewVerification({ ...newVerification, verifier_last_name: e.target.value })}
                  placeholder="Supervisor's last name"
                  className="h-12 bg-black/30 border-white/[0.08] focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20 text-white rounded-full px-5 transition-all duration-300 placeholder:text-slate-600"
                  data-testid="verifier-lastname"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Email <span className="text-[#00F5FF]">*</span>
                </Label>
                <Input
                  type="email"
                  value={newVerification.verifier_email}
                  onChange={(e) => setNewVerification({ ...newVerification, verifier_email: e.target.value })}
                  placeholder="email@employer.com"
                  className="h-12 bg-black/30 border-white/[0.08] focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20 text-white rounded-full px-5 transition-all duration-300 placeholder:text-slate-600"
                  data-testid="verifier-email"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">Phone</Label>
                <Input
                  type="tel"
                  value={newVerification.verifier_phone}
                  onChange={(e) => setNewVerification({ ...newVerification, verifier_phone: e.target.value })}
                  placeholder="(000) 000-0000"
                  className="h-12 bg-black/30 border-white/[0.08] focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20 text-white rounded-full px-5 transition-all duration-300 placeholder:text-slate-600"
                  data-testid="verifier-phone"
                />
              </div>
            </div>
          </div>

          {/* Employer Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b border-white/[0.05]">
              <Building className="w-4 h-4 text-[#FF9800]" />
              <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Employer Information</span>
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Employer Name <span className="text-[#00F5FF]">*</span>
              </Label>
              <Input
                value={newVerification.employer_name}
                onChange={(e) => setNewVerification({ ...newVerification, employer_name: e.target.value })}
                placeholder="Hospital / Clinic Name"
                className="h-12 bg-black/30 border-white/[0.08] focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20 text-white rounded-full px-5 transition-all duration-300 placeholder:text-slate-600"
                data-testid="employer-name"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">Employer Address</Label>
              <Input
                value={newVerification.employer_address}
                onChange={(e) => setNewVerification({ ...newVerification, employer_address: e.target.value })}
                placeholder="Street, City, State ZIP"
                className="h-12 bg-black/30 border-white/[0.08] focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20 text-white rounded-full px-5 transition-all duration-300 placeholder:text-slate-600"
                data-testid="employer-address"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Your Job Title <span className="text-[#00F5FF]">*</span>
              </Label>
              <Input
                value={newVerification.job_title}
                onChange={(e) => setNewVerification({ ...newVerification, job_title: e.target.value })}
                placeholder="e.g., Occupational Therapy Assistant"
                className="h-12 bg-black/30 border-white/[0.08] focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20 text-white rounded-full px-5 transition-all duration-300 placeholder:text-slate-600"
                data-testid="job-title"
              />
            </div>
          </div>

          {/* Employment Dates */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b border-white/[0.05]">
              <Calendar className="w-4 h-4 text-[#28A745]" />
              <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Employment Details</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Start Date <span className="text-[#00F5FF]">*</span>
                </Label>
                <Input
                  type="date"
                  value={newVerification.start_date}
                  onChange={(e) => setNewVerification({ ...newVerification, start_date: e.target.value })}
                  className="h-12 bg-black/30 border-white/[0.08] focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20 text-white rounded-full px-5 transition-all duration-300"
                  data-testid="employment-start"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">End Date</Label>
                <Input
                  type="date"
                  value={newVerification.end_date}
                  onChange={(e) => setNewVerification({ ...newVerification, end_date: e.target.value })}
                  className="h-12 bg-black/30 border-white/[0.08] focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20 text-white rounded-full px-5 transition-all duration-300"
                  data-testid="employment-end"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Total Hours <span className="text-[#00F5FF]">*</span>
                </Label>
                <Input
                  type="number"
                  value={newVerification.hours_worked}
                  onChange={(e) => setNewVerification({ ...newVerification, hours_worked: e.target.value })}
                  placeholder="e.g., 2080"
                  className="h-12 bg-black/30 border-white/[0.08] focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20 text-white rounded-full px-5 transition-all duration-300 placeholder:text-slate-600"
                  data-testid="hours-worked"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.05]">
            <Button
              variant="outline"
              onClick={() => setShowAddForm(false)}
              className="border-white/20 text-white hover:bg-white/5 rounded-full px-6"
            >
              Cancel
            </Button>
            <Button
              onClick={addVerification}
              disabled={!newVerification.verifier_first_name || !newVerification.verifier_last_name || !newVerification.employer_name || !newVerification.job_title}
              className="bg-[#28A745] hover:bg-[#218838] text-white rounded-full px-6 shadow-[0_0_15px_rgba(40,167,69,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="submit-verification-btn"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Request
            </Button>
          </div>
        </div>
      )}

      {/* Verifications List */}
      {(employmentHistory.verifications || []).length === 0 ? (
        <div className="backdrop-blur-xl bg-white/[0.02] border border-dashed border-white/10 rounded-2xl p-12 text-center">
          <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 text-sm">No employment verifications added yet</p>
          <p className="text-slate-600 text-xs mt-1">Click "Add Employer Verification" to begin</p>
        </div>
      ) : (
        <div className="space-y-4">
          {(employmentHistory.verifications || []).map((verification, index) => (
            <div key={verification.id} className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 hover:border-[#00B4D8]/20 transition-colors duration-500">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    verification.date_confirmed 
                      ? "bg-[#28A745]/20" 
                      : "bg-[#FF6B35]/20"
                  }`}>
                    {verification.date_confirmed ? (
                      <Check className="w-6 h-6 text-[#28A745]" />
                    ) : (
                      <Clock className="w-6 h-6 text-[#FF6B35]" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{verification.employer_name}</h4>
                    <p className="text-slate-400 text-sm">{verification.job_title}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {verification.verifier_first_name} {verification.verifier_last_name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {verification.hours_worked} hours
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                    verification.date_confirmed 
                      ? "bg-[#28A745]/20 text-[#28A745]" 
                      : "bg-[#FF6B35]/20 text-[#FF6B35]"
                  }`}>
                    {verification.request_stage}
                  </span>
                  <button 
                    onClick={() => removeVerification(verification.id)}
                    className="w-8 h-8 rounded-full bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-white/[0.05] text-xs">
                <div>
                  <p className="text-slate-600 uppercase tracking-wider">Start Date</p>
                  <p className="text-slate-300 mt-1">{verification.start_date || "N/A"}</p>
                </div>
                <div>
                  <p className="text-slate-600 uppercase tracking-wider">End Date</p>
                  <p className="text-slate-300 mt-1">{verification.end_date || "Present"}</p>
                </div>
                <div>
                  <p className="text-slate-600 uppercase tracking-wider">Date Requested</p>
                  <p className="text-slate-300 mt-1">{verification.date_requested}</p>
                </div>
                <div>
                  <p className="text-slate-600 uppercase tracking-wider">Date Confirmed</p>
                  <p className="text-slate-300 mt-1">{verification.date_confirmed || "Pending"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmploymentHistorySections;
