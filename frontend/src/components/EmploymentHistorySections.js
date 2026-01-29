import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  FileText, Briefcase, Check, ChevronRight, Plus, Trash2, Info
} from "lucide-react";

const EmploymentHistorySections = ({ employmentHistory, setEmploymentHistory }) => {
  const [activeSubSection, setActiveSubSection] = useState(0);
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

  const subSections = [
    { id: 0, label: "Documents Required", icon: FileText },
    { id: 1, label: "Employment Verification", icon: Briefcase },
  ];

  const isSubSectionComplete = (sectionId) => {
    switch (sectionId) {
      case 0:
        return true; // Info only section
      case 1:
        const verifications = employmentHistory.verifications || [];
        return verifications.length > 0;
      default:
        return false;
    }
  };

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

  const renderSubSection = () => {
    switch (activeSubSection) {
      case 0:
        return (
          <div className="space-y-6" data-testid="subsection-docs-required">
            <h3 className="text-xl font-semibold text-white mb-4">Documents Required</h3>
            
            <div className="glass-card rounded-xl p-6 border-[#00B4D8]/30 bg-[#00B4D8]/5">
              <h4 className="text-white font-medium mb-4">Required Documents for Your Application</h4>
              <p className="text-slate-400 text-sm mb-4">
                The following documents are required to complete your application. Please ensure all documents 
                are submitted before your application deadline.
              </p>
              
              <ul className="space-y-3 text-slate-300 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#28A745] mt-0.5 flex-shrink-0" />
                  <span><strong>Official Transcripts</strong> - From all post-secondary institutions attended</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#28A745] mt-0.5 flex-shrink-0" />
                  <span><strong>Employment Verification</strong> - Proof of 2,080 hours as an OTA in a clinical setting</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#28A745] mt-0.5 flex-shrink-0" />
                  <span><strong>Resume/CV</strong> - Current resume highlighting relevant experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#28A745] mt-0.5 flex-shrink-0" />
                  <span><strong>Personal Statement</strong> - Essay describing your goals and qualifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#28A745] mt-0.5 flex-shrink-0" />
                  <span><strong>Letters of Recommendation</strong> - Professional references</span>
                </li>
              </ul>
            </div>

            <div className="glass-card rounded-xl p-4 border-[#FF6B35]/30 bg-[#FF6B35]/5">
              <p className="text-[#FF6B35] text-sm">
                <strong>Important:</strong> All documents must be submitted by the application deadline. 
                Incomplete applications may not be reviewed.
              </p>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6" data-testid="subsection-employment-verification">
            <h3 className="text-xl font-semibold text-white mb-4">Employment Verification</h3>
            
            <div className="glass-card rounded-xl p-6 border-[#00B4D8]/30 bg-[#00B4D8]/5">
              <p className="text-slate-300 text-sm mb-4">
                Applicants for your selected program are required to submit proof that they were employed as an 
                occupational therapy assistant in a clinical setting for at least <strong className="text-white">2,080 hours</strong> (The 
                equivalent of one (1) year full-time). We require that validation of these hours comes directly 
                from the supervising clinician or a Human Resource Representative. Our university offers a simple 
                online method for obtaining such validation. If you completed hours at more than one facility, 
                please submit one request for each facility using the Add Employer Information Request button below.
              </p>
              
              <div className="space-y-2 text-slate-400 text-sm">
                <p className="font-medium text-white">Steps:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Click "Add Employer Verification."</li>
                  <li>Complete the Employment Verification form.</li>
                  <li>Click "Submit Request."</li>
                  <li>Check back on your application to see if the request(s) have been confirmed by the facility and/or confirmed by the University.</li>
                </ol>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-[#00B4D8] hover:bg-[#0096B4] text-white"
                data-testid="add-employer-verification-btn"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Employer Verification
              </Button>
              <span className="text-slate-400 text-sm">
                Total Employments Confirmed: <span className="text-[#00B4D8]">
                  {(employmentHistory.verifications || []).filter(v => v.date_confirmed).length}
                </span> / <span className="text-[#FF6B35]">1</span>
              </span>
            </div>

            {/* Add Verification Form */}
            {showAddForm && (
              <div className="glass-card rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-medium">Add Employment Verification</h4>
                  <button 
                    onClick={() => setShowAddForm(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Verifier First Name *</Label>
                    <Input
                      value={newVerification.verifier_first_name}
                      onChange={(e) => setNewVerification({ ...newVerification, verifier_first_name: e.target.value })}
                      placeholder="First Name"
                      className="h-10 bg-black/20 border-white/10 text-white rounded-lg"
                      data-testid="verifier-firstname"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Verifier Last Name *</Label>
                    <Input
                      value={newVerification.verifier_last_name}
                      onChange={(e) => setNewVerification({ ...newVerification, verifier_last_name: e.target.value })}
                      placeholder="Last Name"
                      className="h-10 bg-black/20 border-white/10 text-white rounded-lg"
                      data-testid="verifier-lastname"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Verifier Email *</Label>
                    <Input
                      type="email"
                      value={newVerification.verifier_email}
                      onChange={(e) => setNewVerification({ ...newVerification, verifier_email: e.target.value })}
                      placeholder="email@employer.com"
                      className="h-10 bg-black/20 border-white/10 text-white rounded-lg"
                      data-testid="verifier-email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Verifier Phone</Label>
                    <Input
                      type="tel"
                      value={newVerification.verifier_phone}
                      onChange={(e) => setNewVerification({ ...newVerification, verifier_phone: e.target.value })}
                      placeholder="(000) 000-0000"
                      className="h-10 bg-black/20 border-white/10 text-white rounded-lg"
                      data-testid="verifier-phone"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">Employer Name *</Label>
                  <Input
                    value={newVerification.employer_name}
                    onChange={(e) => setNewVerification({ ...newVerification, employer_name: e.target.value })}
                    placeholder="Hospital/Clinic Name"
                    className="h-10 bg-black/20 border-white/10 text-white rounded-lg"
                    data-testid="employer-name"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">Employer Address</Label>
                  <Input
                    value={newVerification.employer_address}
                    onChange={(e) => setNewVerification({ ...newVerification, employer_address: e.target.value })}
                    placeholder="Street, City, State ZIP"
                    className="h-10 bg-black/20 border-white/10 text-white rounded-lg"
                    data-testid="employer-address"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">Your Job Title *</Label>
                  <Input
                    value={newVerification.job_title}
                    onChange={(e) => setNewVerification({ ...newVerification, job_title: e.target.value })}
                    placeholder="e.g., Occupational Therapy Assistant"
                    className="h-10 bg-black/20 border-white/10 text-white rounded-lg"
                    data-testid="job-title"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Employment Start Date *</Label>
                    <Input
                      type="date"
                      value={newVerification.start_date}
                      onChange={(e) => setNewVerification({ ...newVerification, start_date: e.target.value })}
                      className="h-10 bg-black/20 border-white/10 text-white rounded-lg"
                      data-testid="employment-start"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Employment End Date</Label>
                    <Input
                      type="date"
                      value={newVerification.end_date}
                      onChange={(e) => setNewVerification({ ...newVerification, end_date: e.target.value })}
                      className="h-10 bg-black/20 border-white/10 text-white rounded-lg"
                      data-testid="employment-end"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Total Hours Worked *</Label>
                    <Input
                      type="number"
                      value={newVerification.hours_worked}
                      onChange={(e) => setNewVerification({ ...newVerification, hours_worked: e.target.value })}
                      placeholder="e.g., 2080"
                      className="h-10 bg-black/20 border-white/10 text-white rounded-lg"
                      data-testid="hours-worked"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                    className="border-white/20 text-white hover:bg-white/5"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={addVerification}
                    disabled={!newVerification.verifier_first_name || !newVerification.verifier_last_name || !newVerification.employer_name}
                    className="bg-[#28A745] hover:bg-[#218838] text-white"
                    data-testid="submit-verification-btn"
                  >
                    Submit Request
                  </Button>
                </div>
              </div>
            )}

            {/* Verifications Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-2 text-slate-400 font-normal">Verifier First Name</th>
                    <th className="text-left py-3 px-2 text-slate-400 font-normal">Verifier Last Name</th>
                    <th className="text-left py-3 px-2 text-slate-400 font-normal">Request Stage</th>
                    <th className="text-left py-3 px-2 text-slate-400 font-normal">Employment Start Date</th>
                    <th className="text-left py-3 px-2 text-slate-400 font-normal">End Date</th>
                    <th className="text-left py-3 px-2 text-slate-400 font-normal">Date Requested</th>
                    <th className="text-left py-3 px-2 text-slate-400 font-normal">Date Confirmed</th>
                    <th className="text-left py-3 px-2 text-slate-400 font-normal">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {(employmentHistory.verifications || []).map((verification) => (
                    <tr key={verification.id} className="border-b border-white/5">
                      <td className="py-3 px-2 text-white">{verification.verifier_first_name}</td>
                      <td className="py-3 px-2 text-white">{verification.verifier_last_name}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          verification.request_stage === "Confirmed" 
                            ? "bg-[#28A745]/20 text-[#28A745]" 
                            : "bg-[#FF6B35]/20 text-[#FF6B35]"
                        }`}>
                          {verification.request_stage}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-white">{verification.start_date}</td>
                      <td className="py-3 px-2 text-white">{verification.end_date || "Present"}</td>
                      <td className="py-3 px-2 text-white">{verification.date_requested}</td>
                      <td className="py-3 px-2 text-white">{verification.date_confirmed || "-"}</td>
                      <td className="py-3 px-2">
                        <button 
                          onClick={() => removeVerification(verification.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {(!employmentHistory.verifications || employmentHistory.verifications.length === 0) && (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-500 italic">
                        No employment verifications added yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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
                  ? "bg-[#00B4D8]/20 text-white border-l-2 border-[#00F5FF]"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
              data-testid={`employment-subsection-nav-${section.id}`}
            >
              <section.icon className={`w-4 h-4 ${activeSubSection === section.id ? "text-[#00F5FF]" : ""}`} />
              <span className="text-sm font-medium flex-1">{section.label}</span>
              {isSubSectionComplete(section.id) && (
                <Check className="w-4 h-4 text-[#28A745]" />
              )}
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
            onClick={() => setActiveSubSection(Math.max(0, activeSubSection - 1))}
            disabled={activeSubSection === 0}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/5 rounded-full px-6"
            data-testid="employment-prev-subsection-btn"
          >
            Previous Section
          </Button>
          
          {activeSubSection < 1 ? (
            <Button
              onClick={() => setActiveSubSection(activeSubSection + 1)}
              className="bg-[#00B4D8] hover:bg-[#0096B4] text-white rounded-full px-6"
              data-testid="employment-next-subsection-btn"
            >
              Next Section
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              className="bg-[#28A745] hover:bg-[#218838] text-white rounded-full px-6"
              data-testid="employment-complete-btn"
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

export default EmploymentHistorySections;
