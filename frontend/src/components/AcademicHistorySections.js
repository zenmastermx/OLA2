import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen, GraduationCap, FileText, Clock, AlertCircle, Check, ChevronRight, Plus, Trash2, Info, Building, Calendar
} from "lucide-react";

const AcademicHistorySections = ({ academicHistory, setAcademicHistory }) => {
  const [activeSubSection, setActiveSubSection] = useState(0);
  const [addingPrereqFor, setAddingPrereqFor] = useState(null);
  const [newCourse, setNewCourse] = useState({
    name: "",
    completed: false,
    grade: "",
    institution: "",
    credits: ""
  });

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
        return academicHistory.highest_degree != null && academicHistory.highest_degree !== "";
      case 2:
        return (academicHistory.toefl_required != null) || !!(academicHistory.toefl_date);
      case 3:
        return academicHistory.prior_application != null && academicHistory.prior_application !== "";
      case 4:
        return academicHistory.academic_probation != null && academicHistory.academic_probation !== "";
      default:
        return false;
    }
  };

  const renderSubSection = () => {
    switch (activeSubSection) {
      case 0:
        return (
          <div className="space-y-8" data-testid="subsection-prerequisites">
            {/* Section Header */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#00B4D8] to-[#7B68EE] rounded-full" />
              <h3 className="text-2xl font-light text-white tracking-tight">My Prerequisites</h3>
              <p className="text-slate-500 text-sm mt-1">Track your prerequisite course requirements</p>
            </div>

            {/* Instructions - Glass Card */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 space-y-4 hover:border-[#00B4D8]/20 transition-colors duration-500">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#00B4D8]/10 flex items-center justify-center">
                  <Info className="w-4 h-4 text-[#00B4D8]" />
                </div>
                <h4 className="text-xs font-medium uppercase tracking-wider text-slate-500">Instructions</h4>
              </div>
              
              <p className="text-sm text-slate-300">
                Click "Add Prerequisite." Total number of credits will auto-calculate in semester hours.
              </p>
              <p className="text-sm text-slate-400">
                Not sure if your course meets the requirement? <span className="text-[#00B4D8] cursor-pointer hover:underline">Check Course Equivalency →</span>
              </p>
              <div className="text-xs text-slate-500 space-y-1 pt-2 border-t border-white/5">
                <p>• All calculations are in Semester hours.</p>
                <p>• Labs are required for the Anatomy and Physiology requirement.</p>
              </div>
            </div>

            {/* Important Notice */}
            <div className="p-4 rounded-xl bg-[#FF6B35]/5 border border-[#FF6B35]/20">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#FF6B35] mt-0.5" />
                <p className="text-[#FF6B35] text-sm">
                  *All post-secondary official transcripts must be submitted, regardless of whether you believe they contain applicable courses.
                </p>
              </div>
            </div>

            {/* Credit Summary - Glass Card */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 hover:border-[#7B68EE]/20 transition-colors duration-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#7B68EE]/10 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-[#7B68EE]" />
                </div>
                <h4 className="text-xs font-medium uppercase tracking-wider text-slate-500">Credit Summary</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-black/20 border border-white/[0.05]">
                  <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Total Credits Needed</p>
                  <p className="text-2xl font-light text-white">0.0 <span className="text-sm text-[#00B4D8]">/ 21.0</span></p>
                </div>
                <div className="p-4 rounded-xl bg-black/20 border border-white/[0.05]">
                  <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Min to Apply</p>
                  <p className="text-2xl font-light text-white">0.0 <span className="text-sm text-[#00B4D8]">/ 10.0</span></p>
                </div>
                <div className="p-4 rounded-xl bg-black/20 border border-white/[0.05]">
                  <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Status</p>
                  <p className="text-lg font-light text-slate-400">Not Started</p>
                </div>
              </div>
            </div>

            {/* Prerequisite Courses */}
            <div className="space-y-4">
              {prerequisiteCourses.map((course) => (
                <div key={course.id} className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 hover:border-[#00B4D8]/20 transition-colors duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#00F5FF]" />
                      <h4 className="text-white font-medium">{course.name}</h4>
                      <Info className="w-4 h-4 text-slate-500 cursor-help" />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-[#00B4D8]/50 text-[#00B4D8] hover:bg-[#00B4D8]/10 rounded-full px-4"
                      data-testid={`add-prereq-${course.id}`}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Prerequisite
                    </Button>
                  </div>
                  
                  <p className="text-slate-500 text-sm mb-4">
                    Max Credits Applied to Total: <span className="text-[#00B4D8]">0.0 / {course.maxCredits}</span>
                  </p>
                  
                  <div className="overflow-x-auto rounded-xl border border-white/[0.05]">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/[0.05] bg-black/20">
                          <th className="text-left py-3 px-4 text-xs font-medium uppercase tracking-wider text-slate-500">Course Name</th>
                          <th className="text-left py-3 px-4 text-xs font-medium uppercase tracking-wider text-slate-500">Completed?</th>
                          <th className="text-left py-3 px-4 text-xs font-medium uppercase tracking-wider text-slate-500">Grade</th>
                          <th className="text-left py-3 px-4 text-xs font-medium uppercase tracking-wider text-slate-500">Institution</th>
                          <th className="text-left py-3 px-4 text-xs font-medium uppercase tracking-wider text-slate-500">Credits</th>
                          <th className="text-left py-3 px-4 text-xs font-medium uppercase tracking-wider text-slate-500">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(academicHistory.prerequisites?.[course.id]?.courses || []).map((c, idx) => (
                          <tr key={idx} className="border-b border-white/[0.03]">
                            <td className="py-3 px-4 text-white">{c.name}</td>
                            <td className="py-3 px-4 text-white">{c.completed ? "Yes" : "No"}</td>
                            <td className="py-3 px-4 text-white">{c.grade}</td>
                            <td className="py-3 px-4 text-white">{c.institution}</td>
                            <td className="py-3 px-4 text-white">{c.credits}</td>
                            <td className="py-3 px-4">
                              <button className="text-red-400 hover:text-red-300 p-1 rounded-full hover:bg-red-400/10 transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {(!academicHistory.prerequisites?.[course.id]?.courses || academicHistory.prerequisites[course.id].courses.length === 0) && (
                          <tr>
                            <td colSpan={6} className="py-6 text-center text-slate-600 italic">
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
          <div className="space-y-8" data-testid="subsection-education">
            {/* Section Header */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#7B68EE] to-[#9C27B0] rounded-full" />
              <h3 className="text-2xl font-light text-white tracking-tight">Education</h3>
              <p className="text-slate-500 text-sm mt-1">Your educational background and institutions</p>
            </div>

            {/* Degree Information - Glass Card */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 space-y-5 hover:border-[#7B68EE]/20 transition-colors duration-500">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#7B68EE]/10 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-[#7B68EE]" />
                </div>
                <h4 className="text-xs font-medium uppercase tracking-wider text-slate-500">Degree Information</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    Advanced Degree Earned? <span className="text-[#00F5FF]">*</span>
                    <Info className="w-3.5 h-3.5 text-slate-600" />
                  </Label>
                  <Select
                    value={academicHistory.advanced_degree || ""}
                    onValueChange={(value) => setAcademicHistory({ ...academicHistory, advanced_degree: value })}
                  >
                    <SelectTrigger className="h-12 bg-black/30 border-white/[0.08] text-white rounded-full px-5 focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20" data-testid="education-advanced-degree">
                      <SelectValue placeholder="- Select -" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#11161F] border-white/10 rounded-xl">
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    Highest Degree <span className="text-[#00F5FF]">*</span>
                    <Info className="w-3.5 h-3.5 text-slate-600" />
                  </Label>
                  <Select
                    value={academicHistory.highest_degree || ""}
                    onValueChange={(value) => setAcademicHistory({ ...academicHistory, highest_degree: value })}
                  >
                    <SelectTrigger className="h-12 bg-black/30 border-white/[0.08] text-white rounded-full px-5 focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20" data-testid="education-highest-degree">
                      <SelectValue placeholder="- Select -" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#11161F] border-white/10 rounded-xl">
                      <SelectItem value="high_school">High School Diploma/GED</SelectItem>
                      <SelectItem value="associates">Associate's Degree</SelectItem>
                      <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                      <SelectItem value="masters">Master's Degree</SelectItem>
                      <SelectItem value="doctorate">Doctorate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Institutions - Glass Card */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 space-y-5 hover:border-[#00B4D8]/20 transition-colors duration-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#00B4D8]/10 flex items-center justify-center">
                    <Building className="w-4 h-4 text-[#00B4D8]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-medium uppercase tracking-wider text-slate-500">Institutions</h4>
                    <p className="text-slate-600 text-xs mt-0.5">List all post-secondary institutions attended</p>
                  </div>
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
                  className="bg-[#00B4D8] hover:bg-[#0096B4] text-white rounded-full px-4"
                  data-testid="add-institution-btn"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Institution
                </Button>
              </div>

              <div className="p-4 rounded-xl bg-[#00B4D8]/5 border border-[#00B4D8]/10">
                <p className="text-slate-400 text-sm">
                  Please list <strong className="text-white">all</strong> post-secondary institutions you have attended. 
                  Official transcripts are required from each institution.
                </p>
                <ul className="list-disc list-inside mt-3 space-y-1 text-slate-500 text-xs">
                  <li>Include every college or university, even if you transferred or didn't complete a degree</li>
                  <li>List institutions in chronological order (first to most recent)</li>
                  <li>Have official transcripts sent directly to our Admissions Office</li>
                </ul>
              </div>

              {/* Institutions List */}
              {(academicHistory.institutions || []).length === 0 ? (
                <div className="text-center py-8 border border-dashed border-white/10 rounded-xl">
                  <Building className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500 text-sm">No institutions added yet</p>
                  <p className="text-slate-600 text-xs mt-1">Click "Add Institution" to begin</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {(academicHistory.institutions || []).map((inst, index) => (
                    <div key={inst.id || index} className="p-4 rounded-xl bg-black/20 border border-white/[0.05] space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[#00B4D8]/20 flex items-center justify-center text-xs text-[#00B4D8]">{index + 1}</span>
                          Institution {index + 1}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const institutions = academicHistory.institutions.filter((_, i) => i !== index);
                            setAcademicHistory({ ...academicHistory, institutions });
                          }}
                          className="text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-full h-8 w-8 p-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input
                          placeholder="Institution Name"
                          value={inst.name}
                          onChange={(e) => {
                            const institutions = academicHistory.institutions.map((item, i) =>
                              i === index ? { ...item, name: e.target.value } : item
                            );
                            setAcademicHistory({ ...academicHistory, institutions });
                          }}
                          className="h-11 bg-black/30 border-white/[0.08] text-white rounded-full px-5 focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20 placeholder:text-slate-600"
                        />
                        <Input
                          type="month"
                          placeholder="Graduation Date"
                          value={inst.date}
                          onChange={(e) => {
                            const institutions = academicHistory.institutions.map((item, i) =>
                              i === index ? { ...item, date: e.target.value } : item
                            );
                            setAcademicHistory({ ...academicHistory, institutions });
                          }}
                          className="h-11 bg-black/30 border-white/[0.08] text-white rounded-full px-5 focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20"
                        />
                        <Input
                          placeholder="Degree Earned"
                          value={inst.degree}
                          onChange={(e) => {
                            const institutions = academicHistory.institutions.map((item, i) =>
                              i === index ? { ...item, degree: e.target.value } : item
                            );
                            setAcademicHistory({ ...academicHistory, institutions });
                          }}
                          className="h-11 bg-black/30 border-white/[0.08] text-white rounded-full px-5 focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20 placeholder:text-slate-600"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8" data-testid="subsection-test">
            {/* Section Header */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#FF9800] to-[#FFB74D] rounded-full" />
              <h3 className="text-2xl font-light text-white tracking-tight">Test Information</h3>
              <p className="text-slate-500 text-sm mt-1">English proficiency exam scores (if applicable)</p>
            </div>

            {/* TOEFL Information - Glass Card */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 space-y-5 hover:border-[#FF9800]/20 transition-colors duration-500">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#FF9800]/10 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-[#FF9800]" />
                </div>
                <h4 className="text-xs font-medium uppercase tracking-wider text-slate-500">TOEFL Exam</h4>
              </div>
              
              <div className="p-4 rounded-xl bg-[#FF9800]/5 border border-[#FF9800]/10">
                <p className="text-slate-400 text-sm">
                  The TOEFL exam is only required if you are a non-native English speaker and have not completed a degree in English. 
                  Contact your enrollment advisor to confirm if you need to submit TOEFL scores.
                </p>
                <p className="text-slate-500 text-xs mt-2">
                  Official TOEFL scores must be sent directly from <a href="https://www.ets.org" target="_blank" rel="noopener noreferrer" className="text-[#00B4D8] hover:underline">www.ets.org</a>
                </p>
              </div>

              <div className="space-y-2 max-w-xs">
                <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">Test Date</Label>
                <Input
                  type="date"
                  value={academicHistory.toefl_date || ""}
                  onChange={(e) => setAcademicHistory({ ...academicHistory, toefl_date: e.target.value })}
                  className="h-12 bg-black/30 border-white/[0.08] focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20 text-white rounded-full px-5 transition-all duration-300"
                  data-testid="toefl-date"
                />
              </div>
            </div>

            {/* TOEFL Scores - Glass Card */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 space-y-5 hover:border-[#00B4D8]/20 transition-colors duration-500">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#00B4D8]/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="text-xs font-medium uppercase tracking-wider text-slate-500">Self-Reported Scores</h4>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    Total <Info className="w-3 h-3 text-slate-600" />
                  </Label>
                  <Input
                    type="number"
                    value={academicHistory.toefl_total || ""}
                    onChange={(e) => setAcademicHistory({ ...academicHistory, toefl_total: e.target.value })}
                    placeholder="0"
                    className="h-12 bg-black/30 border-white/[0.08] focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20 text-white rounded-full px-5 text-center transition-all duration-300"
                    data-testid="toefl-total"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">Reading</Label>
                  <Input
                    type="number"
                    value={academicHistory.toefl_reading || ""}
                    onChange={(e) => setAcademicHistory({ ...academicHistory, toefl_reading: e.target.value })}
                    placeholder="0"
                    className="h-12 bg-black/30 border-white/[0.08] focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20 text-white rounded-full px-5 text-center transition-all duration-300"
                    data-testid="toefl-reading"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">Writing</Label>
                  <Input
                    type="number"
                    value={academicHistory.toefl_writing || ""}
                    onChange={(e) => setAcademicHistory({ ...academicHistory, toefl_writing: e.target.value })}
                    placeholder="0"
                    className="h-12 bg-black/30 border-white/[0.08] focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20 text-white rounded-full px-5 text-center transition-all duration-300"
                    data-testid="toefl-writing"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">Speaking</Label>
                  <Input
                    type="number"
                    value={academicHistory.toefl_speaking || ""}
                    onChange={(e) => setAcademicHistory({ ...academicHistory, toefl_speaking: e.target.value })}
                    placeholder="0"
                    className="h-12 bg-black/30 border-white/[0.08] focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20 text-white rounded-full px-5 text-center transition-all duration-300"
                    data-testid="toefl-speaking"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">Listening</Label>
                  <Input
                    type="number"
                    value={academicHistory.toefl_listening || ""}
                    onChange={(e) => setAcademicHistory({ ...academicHistory, toefl_listening: e.target.value })}
                    placeholder="0"
                    className="h-12 bg-black/30 border-white/[0.08] focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20 text-white rounded-full px-5 text-center transition-all duration-300"
                    data-testid="toefl-listening"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8" data-testid="subsection-prior">
            {/* Section Header */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#9C27B0] to-[#CE93D8] rounded-full" />
              <h3 className="text-2xl font-light text-white tracking-tight">Prior Application</h3>
              <p className="text-slate-500 text-sm mt-1">Previous applications and enrollment history</p>
            </div>

            {/* Prior USA Application - Glass Card */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 space-y-5 hover:border-[#9C27B0]/20 transition-colors duration-500">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#9C27B0]/10 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-[#9C27B0]" />
                </div>
                <h4 className="text-xs font-medium uppercase tracking-wider text-slate-500">Prior Application to USA</h4>
              </div>
              
              <div className="space-y-3">
                <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Have you ever applied to the University of St. Augustine? <span className="text-[#00F5FF]">*</span>
                </Label>
                <RadioGroup
                  value={academicHistory.prior_application || ""}
                  onValueChange={(value) => setAcademicHistory({ ...academicHistory, prior_application: value })}
                  className="flex gap-4"
                >
                  {[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }].map((option) => (
                    <div key={option.value} className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all duration-300 cursor-pointer ${
                      academicHistory.prior_application === option.value 
                        ? "border-[#9C27B0]/50 bg-[#9C27B0]/10" 
                        : "border-white/[0.08] bg-black/30 hover:border-white/20"
                    }`}>
                      <RadioGroupItem value={option.value} id={`prior-${option.value}`} />
                      <Label htmlFor={`prior-${option.value}`} className="text-white cursor-pointer">{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {academicHistory.prior_application === "yes" && (
                <div className="space-y-2 pt-2 animate-in slide-in-from-top-2 duration-300 max-w-xs">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    Prior Application Date <Info className="w-3 h-3 text-slate-600" />
                  </Label>
                  <Input
                    type="date"
                    value={academicHistory.prior_application_date || ""}
                    onChange={(e) => setAcademicHistory({ ...academicHistory, prior_application_date: e.target.value })}
                    className="h-12 bg-black/30 border-white/[0.08] focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20 text-white rounded-full px-5 transition-all duration-300"
                    data-testid="prior-app-date"
                  />
                </div>
              )}
            </div>

            {/* Prior OT Enrollment - Glass Card */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 space-y-5 hover:border-[#00B4D8]/20 transition-colors duration-500">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#00B4D8]/10 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-[#00B4D8]" />
                </div>
                <h4 className="text-xs font-medium uppercase tracking-wider text-slate-500">Prior OT Enrollment</h4>
              </div>
              
              <div className="space-y-3">
                <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Have you previously enrolled in an Occupational Therapy program? <span className="text-[#00F5FF]">*</span>
                </Label>
                <RadioGroup
                  value={academicHistory.prior_ot_enrollment || ""}
                  onValueChange={(value) => setAcademicHistory({ ...academicHistory, prior_ot_enrollment: value })}
                  className="flex gap-4"
                >
                  {[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }].map((option) => (
                    <div key={option.value} className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all duration-300 cursor-pointer ${
                      academicHistory.prior_ot_enrollment === option.value 
                        ? "border-[#00B4D8]/50 bg-[#00B4D8]/10" 
                        : "border-white/[0.08] bg-black/30 hover:border-white/20"
                    }`}>
                      <RadioGroupItem value={option.value} id={`ot-enroll-${option.value}`} />
                      <Label htmlFor={`ot-enroll-${option.value}`} className="text-white cursor-pointer">{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8" data-testid="subsection-academic-bg">
            {/* Section Header */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#E91E63] to-[#F48FB1] rounded-full" />
              <h3 className="text-2xl font-light text-white tracking-tight">Academic Background</h3>
              <p className="text-slate-500 text-sm mt-1">Academic standing history</p>
            </div>

            {/* Academic Probation - Glass Card */}
            <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 space-y-5 hover:border-[#E91E63]/20 transition-colors duration-500">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#E91E63]/10 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-[#E91E63]" />
                </div>
                <h4 className="text-xs font-medium uppercase tracking-wider text-slate-500">Academic Standing</h4>
              </div>
              
              <div className="space-y-3">
                <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Have you ever been placed on academic probation, suspended, or dismissed? <span className="text-[#00F5FF]">*</span>
                </Label>
                <RadioGroup
                  value={academicHistory.academic_probation || ""}
                  onValueChange={(value) => setAcademicHistory({ ...academicHistory, academic_probation: value })}
                  className="flex gap-4"
                >
                  {[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }].map((option) => (
                    <div key={option.value} className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all duration-300 cursor-pointer ${
                      academicHistory.academic_probation === option.value 
                        ? "border-[#E91E63]/50 bg-[#E91E63]/10" 
                        : "border-white/[0.08] bg-black/30 hover:border-white/20"
                    }`}>
                      <RadioGroupItem value={option.value} id={`probation-${option.value}`} />
                      <Label htmlFor={`probation-${option.value}`} className="text-white cursor-pointer">{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {academicHistory.academic_probation === "yes" && (
                <div className="space-y-2 pt-2 animate-in slide-in-from-top-2 duration-300">
                  <Label className="text-xs font-medium uppercase tracking-wider text-slate-400">Please explain the circumstances</Label>
                  <p className="text-slate-600 text-xs">This information will be reviewed confidentially</p>
                  <Textarea
                    value={academicHistory.probation_explanation || ""}
                    onChange={(e) => setAcademicHistory({ ...academicHistory, probation_explanation: e.target.value })}
                    placeholder="Provide details about the academic probation, suspension, or dismissal..."
                    className="min-h-[120px] bg-black/30 border-white/[0.08] focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20 text-white rounded-2xl resize-none transition-all duration-300 placeholder:text-slate-600"
                    data-testid="probation-explanation"
                  />
                </div>
              )}
            </div>

            {/* Section Complete Indicator */}
            <div className="flex items-center justify-center p-6 rounded-xl bg-gradient-to-r from-[#E91E63]/10 to-[#00B4D8]/10 border border-white/[0.05]">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#28A745]/20 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-[#28A745]" />
                </div>
                <p className="text-white font-medium">You're almost done with Academic History!</p>
                <p className="text-slate-500 text-sm mt-1">Click "Section Complete" to proceed to the next step</p>
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
      <div className="lg:w-72 flex-shrink-0">
        <div className="backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-2xl p-3 space-y-1">
          {subSections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => setActiveSubSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                activeSubSection === section.id
                  ? "bg-[#00B4D8]/10 text-white border-l-2 border-[#00F5FF]"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
              data-testid={`academic-subsection-nav-${section.id}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                activeSubSection === section.id 
                  ? "bg-[#00F5FF]/20" 
                  : isSubSectionComplete(section.id)
                    ? "bg-[#28A745]/20"
                    : "bg-white/5"
              }`}>
                <section.icon className={`w-4 h-4 ${
                  activeSubSection === section.id 
                    ? "text-[#00F5FF]" 
                    : isSubSectionComplete(section.id)
                      ? "text-[#28A745]"
                      : "text-slate-500"
                }`} />
              </div>
              <span className={`text-sm font-medium flex-1 ${
                isSubSectionComplete(section.id) && activeSubSection !== section.id
                  ? "text-[#28A745]" 
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
        <div className="flex justify-between mt-8 pt-6 border-t border-white/[0.05]">
          <Button
            onClick={() => setActiveSubSection(Math.max(0, activeSubSection - 1))}
            disabled={activeSubSection === 0}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/5 rounded-full px-6 disabled:opacity-30"
            data-testid="academic-prev-subsection-btn"
          >
            Previous Section
          </Button>
          
          {activeSubSection < 4 ? (
            <Button
              onClick={() => setActiveSubSection(activeSubSection + 1)}
              className="bg-[#00B4D8] hover:bg-[#0096B4] text-white rounded-full px-6 shadow-[0_0_20px_rgba(0,180,216,0.3)]"
              data-testid="academic-next-subsection-btn"
            >
              Next Section
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              className="bg-[#28A745] hover:bg-[#218838] text-white rounded-full px-6 shadow-[0_0_20px_rgba(40,167,69,0.3)]"
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
