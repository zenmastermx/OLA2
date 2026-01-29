import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  BookOpen, GraduationCap, FileText, Clock, AlertCircle, Check, ChevronRight, Plus, Trash2, Info
} from "lucide-react";

const AcademicHistorySections = ({ academicHistory, setAcademicHistory }) => {
  const [activeSubSection, setActiveSubSection] = useState(0);

  const subSections = [
    { id: 0, label: "Prerequisite Requirements", icon: BookOpen },
    { id: 1, label: "Education", icon: GraduationCap },
    { id: 2, label: "Test Information", icon: FileText },
    { id: 3, label: "Prior Application", icon: Clock },
    { id: 4, label: "Academic Background", icon: AlertCircle },
  ];

  const prerequisiteCourses = [
    { id: "anatomy", name: "Human Anatomy and Physiology with Lab", maxCredits: 8.0, required: true },
    { id: "growth", name: "Human Growth and Dev over Lifespan", maxCredits: 3.0, required: true },
    { id: "medical_term", name: "Medical Terminology", maxCredits: 1.0, required: true },
    { id: "statistics", name: "Statistics", maxCredits: 3.0, required: true },
    { id: "sociology", name: "Sociology or Anthropology", maxCredits: 3.0, required: true },
    { id: "psychology", name: "Abnormal Psychology", maxCredits: 3.0, required: true },
  ];

  const isSubSectionComplete = (sectionId) => {
    switch (sectionId) {
      case 0:
        const courses = academicHistory.prerequisites || {};
        return Object.keys(courses).length > 0;
      case 1:
        return academicHistory.highest_degree !== undefined;
      case 2:
        return academicHistory.toefl_required !== undefined;
      case 3:
        return academicHistory.prior_application !== undefined;
      case 4:
        return academicHistory.academic_probation !== undefined;
      default:
        return false;
    }
  };

  const updatePrerequisite = (courseId, field, value) => {
    const prereqs = academicHistory.prerequisites || {};
    const course = prereqs[courseId] || {};
    setAcademicHistory({
      ...academicHistory,
      prerequisites: {
        ...prereqs,
        [courseId]: { ...course, [field]: value }
      }
    });
  };

  const renderSubSection = () => {
    switch (activeSubSection) {
      case 0:
        return (
          <div className="space-y-6" data-testid="subsection-prerequisites">
            <h3 className="text-xl font-semibold text-white mb-2">My Prerequisites</h3>
            
            <div className="glass-card rounded-xl p-4 border-[#00B4D8]/30 bg-[#00B4D8]/5">
              <p className="text-sm text-slate-300 mb-2">
                Click "Add Prerequisite." Total number of credits will auto-calculate in semester hours.
              </p>
              <p className="text-sm text-slate-400">
                Not sure if your course meets the requirement? <span className="text-[#00B4D8] cursor-pointer hover:underline">Check Course Equivalency →</span>
              </p>
              <p className="text-xs text-slate-500 mt-2">Note: All calculations are in Semester hours.</p>
              <p className="text-xs text-slate-500">Labs are required for the Anatomy and Physiology requirement.</p>
            </div>

            <div className="glass-card rounded-xl p-4 border-[#FF6B35]/30 bg-[#FF6B35]/5">
              <p className="text-[#FF6B35] text-sm font-medium">
                *All post-secondary official transcripts must be submitted, regardless of whether you believe they contain applicable courses.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Total Semester Credits Needed for Admission:</span>
                <span className="text-[#00B4D8]">0.0 / 21.0</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Min Completed Semester Credits Needed to Apply:</span>
                <span className="text-[#00B4D8]">0.0 / 10.0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Status:</span>
                <span className="text-slate-300">Not Started</span>
              </div>
            </div>

            <div className="space-y-4">
              {prerequisiteCourses.map((course) => (
                <div key={course.id} className="glass-card rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h4 className="text-white font-medium">{course.name}</h4>
                      <Info className="w-4 h-4 text-slate-500" />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-[#00B4D8]/50 text-[#00B4D8] hover:bg-[#00B4D8]/10"
                      data-testid={`add-prereq-${course.id}`}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Prerequisite
                    </Button>
                  </div>
                  <p className="text-slate-400 text-sm mb-4">
                    Max Credits Applied to Total (Does not include Labs or other Recommended Courses): 0.0 / {course.maxCredits}
                  </p>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-2 text-slate-400 font-normal">Course Name & Number</th>
                          <th className="text-left py-2 text-slate-400 font-normal">Completed?</th>
                          <th className="text-left py-2 text-slate-400 font-normal">Grade Earned</th>
                          <th className="text-left py-2 text-slate-400 font-normal">Institution</th>
                          <th className="text-left py-2 text-slate-400 font-normal">Semester Credits</th>
                          <th className="text-left py-2 text-slate-400 font-normal">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(academicHistory.prerequisites?.[course.id]?.courses || []).map((c, idx) => (
                          <tr key={idx} className="border-b border-white/5">
                            <td className="py-2 text-white">{c.name}</td>
                            <td className="py-2 text-white">{c.completed ? "Yes" : "No"}</td>
                            <td className="py-2 text-white">{c.grade}</td>
                            <td className="py-2 text-white">{c.institution}</td>
                            <td className="py-2 text-white">{c.credits}</td>
                            <td className="py-2">
                              <button className="text-red-400 hover:text-red-300">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {(!academicHistory.prerequisites?.[course.id]?.courses || academicHistory.prerequisites[course.id].courses.length === 0) && (
                          <tr>
                            <td colSpan={6} className="py-4 text-center text-slate-500 italic">
                              No courses added yet
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6" data-testid="subsection-education">
            <h3 className="text-xl font-semibold text-white mb-4">Education</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-slate-300 flex items-center gap-1">
                  Have you earned an advance degree (beyond high school)? *
                  <Info className="w-4 h-4 text-slate-500" />
                </Label>
                <Select
                  value={academicHistory.advanced_degree || ""}
                  onValueChange={(value) => setAcademicHistory({ ...academicHistory, advanced_degree: value })}
                >
                  <SelectTrigger className="h-12 bg-black/20 border-white/10 text-white rounded-xl" data-testid="education-advanced-degree">
                    <SelectValue placeholder="- Select -" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#11161F] border-white/10">
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300 flex items-center gap-1">
                  Highest Degree (Earned or In Progress) *
                  <Info className="w-4 h-4 text-slate-500" />
                </Label>
                <Select
                  value={academicHistory.highest_degree || ""}
                  onValueChange={(value) => setAcademicHistory({ ...academicHistory, highest_degree: value })}
                >
                  <SelectTrigger className="h-12 bg-black/20 border-white/10 text-white rounded-xl" data-testid="education-highest-degree">
                    <SelectValue placeholder="- Select -" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#11161F] border-white/10">
                    <SelectItem value="high_school">High School Diploma/GED</SelectItem>
                    <SelectItem value="associates">Associate's Degree</SelectItem>
                    <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                    <SelectItem value="masters">Master's Degree</SelectItem>
                    <SelectItem value="doctorate">Doctorate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-white font-medium mb-2">Institution</h4>
                <p className="text-slate-400 text-sm mb-4">
                  Please list <strong>all</strong> post-secondary institutions you have attended or are currently attending.
                  You are required to submit an official transcript for each institution listed in your application.
                </p>
                <div className="text-slate-400 text-sm space-y-1 mb-4">
                  <p>Make sure to:</p>
                  <ul className="list-disc list-inside ml-2 space-y-1">
                    <li>Include every college or university you've attended, even if you transferred credits or did not complete a degree.</li>
                    <li>List institutions in chronological order (first to most recent).</li>
                    <li>Have your official transcripts sent directly to the University's Admissions Office from each institution.</li>
                  </ul>
                </div>
                <p className="text-slate-500 text-sm italic mb-4">
                  Failure to list all institutions or submit required transcripts may delay the review of your application.
                </p>
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-slate-300">Institutions *</Label>
              </div>

              {/* Institutions List */}
              <div className="space-y-3">
                {(academicHistory.institutions || []).map((inst, index) => (
                  <div key={inst.id || index} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          const institutions = academicHistory.institutions.filter((_, i) => i !== index);
                          setAcademicHistory({ ...academicHistory, institutions });
                        }}
                        className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/30"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <span className="text-white">{inst.name} - {inst.date}</span>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                type="button"
                onClick={() => {
                  const institutions = academicHistory.institutions || [];
                  setAcademicHistory({
                    ...academicHistory,
                    institutions: [...institutions, { id: Date.now(), name: "", date: "", degree: "" }]
                  });
                }}
                className="bg-[#00B4D8] hover:bg-[#0096B4] text-white"
                data-testid="add-institution-btn"
              >
                Add an Institution
              </Button>

              <div className="glass-card rounded-xl p-4 border-[#00B4D8]/30 bg-[#00B4D8]/5">
                <p className="text-slate-300 text-sm">
                  Once the required information is completed, please make sure to click on the save button.
                </p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6" data-testid="subsection-test">
            <h3 className="text-xl font-semibold text-white mb-4">Test Information</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-medium mb-2">TOEFL</h4>
                <p className="text-slate-400 text-sm mb-4">
                  The TOEFL exam is only required if you are a non-native English speaker and have not completed a degree in English. 
                  To determine whether an English proficiency exam is required, please speak with your enrollment advisor.
                </p>
                <p className="text-slate-400 text-sm mb-4">
                  If applicable, please self-report your TOEFL test scores below. For admissions purposes, an official TOEFL score 
                  report must also be sent directly <a href="https://www.ets.org" target="_blank" rel="noopener noreferrer" className="text-[#00B4D8] hover:underline">www.ets.org</a>
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Test was/will be taken on:</Label>
                <Input
                  type="date"
                  value={academicHistory.toefl_date || ""}
                  onChange={(e) => setAcademicHistory({ ...academicHistory, toefl_date: e.target.value })}
                  className="h-12 bg-black/20 border-white/10 focus:border-[#00F5FF] text-white rounded-xl max-w-xs"
                  data-testid="toefl-date"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300 flex items-center gap-1">
                    Total
                    <Info className="w-4 h-4 text-slate-500" />
                  </Label>
                  <Input
                    type="number"
                    value={academicHistory.toefl_total || ""}
                    onChange={(e) => setAcademicHistory({ ...academicHistory, toefl_total: e.target.value })}
                    placeholder="Total"
                    className="h-12 bg-black/20 border-white/10 focus:border-[#00F5FF] text-white rounded-xl"
                    data-testid="toefl-total"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300 flex items-center gap-1">
                    Reading
                    <Info className="w-4 h-4 text-slate-500" />
                  </Label>
                  <Input
                    type="number"
                    value={academicHistory.toefl_reading || ""}
                    onChange={(e) => setAcademicHistory({ ...academicHistory, toefl_reading: e.target.value })}
                    placeholder="Reading"
                    className="h-12 bg-black/20 border-white/10 focus:border-[#00F5FF] text-white rounded-xl"
                    data-testid="toefl-reading"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300 flex items-center gap-1">
                    Writing
                    <Info className="w-4 h-4 text-slate-500" />
                  </Label>
                  <Input
                    type="number"
                    value={academicHistory.toefl_writing || ""}
                    onChange={(e) => setAcademicHistory({ ...academicHistory, toefl_writing: e.target.value })}
                    placeholder="Writing"
                    className="h-12 bg-black/20 border-white/10 focus:border-[#00F5FF] text-white rounded-xl"
                    data-testid="toefl-writing"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300 flex items-center gap-1">
                    Speaking
                    <Info className="w-4 h-4 text-slate-500" />
                  </Label>
                  <Input
                    type="number"
                    value={academicHistory.toefl_speaking || ""}
                    onChange={(e) => setAcademicHistory({ ...academicHistory, toefl_speaking: e.target.value })}
                    placeholder="Speaking"
                    className="h-12 bg-black/20 border-white/10 focus:border-[#00F5FF] text-white rounded-xl"
                    data-testid="toefl-speaking"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300 flex items-center gap-1">
                    Listening
                    <Info className="w-4 h-4 text-slate-500" />
                  </Label>
                  <Input
                    type="number"
                    value={academicHistory.toefl_listening || ""}
                    onChange={(e) => setAcademicHistory({ ...academicHistory, toefl_listening: e.target.value })}
                    placeholder="Listening"
                    className="h-12 bg-black/20 border-white/10 focus:border-[#00F5FF] text-white rounded-xl"
                    data-testid="toefl-listening"
                  />
                </div>
              </div>

              <div className="glass-card rounded-xl p-4 border-[#00B4D8]/30 bg-[#00B4D8]/5 mt-6">
                <p className="text-slate-300 text-sm">
                  Once the required information is completed, please make sure to click on the save button.
                </p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6" data-testid="subsection-prior">
            <h3 className="text-xl font-semibold text-white mb-4">Prior Application</h3>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-slate-300">Have you ever applied to the University of St. Augustine? *</Label>
                <RadioGroup
                  value={academicHistory.prior_application || ""}
                  onValueChange={(value) => setAcademicHistory({ ...academicHistory, prior_application: value })}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-3 p-3 rounded-xl border border-white/10 bg-white/5 hover:border-[#00B4D8]/50 transition-colors">
                    <RadioGroupItem value="yes" id="prior-yes" className="border-[#00B4D8]" />
                    <Label htmlFor="prior-yes" className="text-white cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-xl border border-white/10 bg-white/5 hover:border-[#00B4D8]/50 transition-colors">
                    <RadioGroupItem value="no" id="prior-no" className="border-[#00B4D8]" />
                    <Label htmlFor="prior-no" className="text-white cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              {academicHistory.prior_application === "yes" && (
                <div className="space-y-2">
                  <Label className="text-slate-300 flex items-center gap-1">
                    Prior Application Date
                    <Info className="w-4 h-4 text-slate-500" />
                  </Label>
                  <Input
                    type="date"
                    value={academicHistory.prior_application_date || ""}
                    onChange={(e) => setAcademicHistory({ ...academicHistory, prior_application_date: e.target.value })}
                    className="h-12 bg-black/20 border-white/10 focus:border-[#00F5FF] text-white rounded-xl max-w-xs"
                    data-testid="prior-app-date"
                  />
                </div>
              )}

              <div className="space-y-4">
                <Label className="text-slate-300">Have you previously enrolled in an Occupational Therapy program? *</Label>
                <RadioGroup
                  value={academicHistory.prior_ot_enrollment || ""}
                  onValueChange={(value) => setAcademicHistory({ ...academicHistory, prior_ot_enrollment: value })}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-3 p-3 rounded-xl border border-white/10 bg-white/5 hover:border-[#00B4D8]/50 transition-colors">
                    <RadioGroupItem value="yes" id="ot-enroll-yes" className="border-[#00B4D8]" />
                    <Label htmlFor="ot-enroll-yes" className="text-white cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-xl border border-white/10 bg-white/5 hover:border-[#00B4D8]/50 transition-colors">
                    <RadioGroupItem value="no" id="ot-enroll-no" className="border-[#00B4D8]" />
                    <Label htmlFor="ot-enroll-no" className="text-white cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="glass-card rounded-xl p-4 border-[#00B4D8]/30 bg-[#00B4D8]/5">
                <p className="text-slate-300 text-sm">
                  Once the required information is completed, please make sure to click on the save button.
                </p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6" data-testid="subsection-academic-bg">
            <h3 className="text-xl font-semibold text-white mb-4">Academic Background</h3>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-slate-300">
                  Have you ever been placed on academic probation, suspended, or dismissed from an educational institution? *
                </Label>
                <RadioGroup
                  value={academicHistory.academic_probation || ""}
                  onValueChange={(value) => setAcademicHistory({ ...academicHistory, academic_probation: value })}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-3 p-3 rounded-xl border border-white/10 bg-white/5 hover:border-[#00B4D8]/50 transition-colors">
                    <RadioGroupItem value="yes" id="probation-yes" className="border-[#00B4D8]" />
                    <Label htmlFor="probation-yes" className="text-white cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-xl border border-white/10 bg-white/5 hover:border-[#00B4D8]/50 transition-colors">
                    <RadioGroupItem value="no" id="probation-no" className="border-[#00B4D8]" />
                    <Label htmlFor="probation-no" className="text-white cursor-pointer">No</Label>
                  </div>
                </RadioGroup>
              </div>

              {academicHistory.academic_probation === "yes" && (
                <div className="space-y-2">
                  <Label className="text-slate-300">Please explain the circumstances</Label>
                  <textarea
                    value={academicHistory.probation_explanation || ""}
                    onChange={(e) => setAcademicHistory({ ...academicHistory, probation_explanation: e.target.value })}
                    placeholder="Provide details about the academic probation, suspension, or dismissal..."
                    className="w-full min-h-[100px] p-3 bg-black/20 border border-white/10 focus:border-[#00F5FF] text-white rounded-xl resize-none"
                    data-testid="probation-explanation"
                  />
                </div>
              )}

              <div className="glass-card rounded-xl p-4 border-[#00B4D8]/30 bg-[#00B4D8]/5">
                <p className="text-slate-300 text-sm">
                  Once the required information is completed, please make sure to click on the save button.
                </p>
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
                  ? "bg-[#00B4D8]/20 text-white border-l-2 border-[#00F5FF]"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
              data-testid={`academic-subsection-nav-${section.id}`}
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
            data-testid="academic-prev-subsection-btn"
          >
            Previous Section
          </Button>
          
          {activeSubSection < 4 ? (
            <Button
              onClick={() => setActiveSubSection(activeSubSection + 1)}
              className="bg-[#00B4D8] hover:bg-[#0096B4] text-white rounded-full px-6"
              data-testid="academic-next-subsection-btn"
            >
              Next Section
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              className="bg-[#28A745] hover:bg-[#218838] text-white rounded-full px-6"
              data-testid="academic-complete-btn"
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

export default AcademicHistorySections;
