import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "@/App";
import { Button } from "@/components/ui/button";
import { ChevronRight, Sparkles, FileCheck, Headphones, GraduationCap, Stethoscope, MapPin, ArrowRight, BookOpen, Award, Sun, Moon } from "lucide-react";
import CookieConsent from "@/components/CookieConsent";

const LandingPage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [selectedProgram, setSelectedProgram] = useState(null);

  const programs = [
    {
      id: "ot",
      name: "Occupational Therapy",
      icon: GraduationCap,
      description: "Transform lives through therapeutic interventions",
      degrees: ["MOT - Master's", "OTD - Doctorate"],
      color: "#00677F"
    },
    {
      id: "nursing",
      name: "Nursing",
      icon: Stethoscope,
      description: "Lead the future of patient care",
      degrees: ["MSN - Master's", "DNP - Doctorate"],
      color: "#7B68EE"
    },
    {
      id: "education",
      name: "Education",
      icon: BookOpen,
      description: "Shape tomorrow's healthcare educators",
      degrees: ["EdD - Doctorate", "MS - Master's"],
      color: "#F59E0B"
    },
    {
      id: "certificates",
      name: "Certificates",
      icon: Award,
      description: "Advance your skills with specialized training",
      degrees: ["Professional", "Advanced"],
      color: "#10B981"
    }
  ];

  const features = [
    {
      icon: Sparkles,
      title: "AI-Assisted Journey",
      description: "Get personalized guidance from our AI assistant throughout your application"
    },
    {
      icon: FileCheck,
      title: "Live Application Tracking",
      description: "Monitor your progress in real-time with our interactive dashboard"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Access help anytime through our intelligent support system"
    }
  ];

  const campuses = ["Austin", "Dallas", "Miami", "San Marcos", "St. Augustine"];

  return (
    <div className={`min-h-screen overflow-x-hidden ${theme === 'dark' ? 'bg-[#0A0E14] text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b ${theme === 'dark' ? 'bg-[#0A0E14]/80 border-white/5' : 'bg-white/80 border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src={theme === 'dark' 
                ? "https://customer-assets.emergentagent.com/job_be4bb2aa-ca20-4b1a-9d54-431ad1ac86d0/artifacts/ie0vbsv3_primary.Horiz.2line.knockedout.whouter.pms315%2Bwhite.png"
                : "https://customer-assets.emergentagent.com/job_student-journey-17/artifacts/lcfdritp_primary.Horiz.2line.knockedout.pms315.png"
              }
              alt="University of St. Augustine for Health Sciences" 
              className="h-10 w-auto"
            />
          </div>
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
              data-testid="theme-toggle-btn"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link to="/login">
              <Button variant="ghost" className={`${theme === 'dark' ? 'text-slate-300 hover:text-white hover:bg-white/5' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`} data-testid="nav-login-btn">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-[#00677F] hover:bg-[#135163] text-white rounded-full px-6 shadow-[0_0_20px_rgba(0,180,216,0.3)] hover:shadow-[0_0_30px_rgba(0,180,216,0.5)] transition-all" data-testid="nav-apply-btn">
                Apply Now
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        {/* Background effects */}
        <div className={`absolute inset-0 ${theme === 'dark' ? 'gradient-radial opacity-50' : 'bg-gradient-to-br from-[#E0F7FA]/30 to-transparent'}`} />
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[100px] ${theme === 'dark' ? 'bg-[#00677F]/10' : 'bg-[#00677F]/15'}`} />
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[100px] ${theme === 'dark' ? 'bg-[#7B68EE]/10' : 'bg-[#7B68EE]/10'}`} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-slide-up">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm ${theme === 'dark' ? 'bg-[#00677F]/10 border border-[#00677F]/30 text-[#00677F]' : 'bg-[#00677F]/10 border border-[#00677F]/30 text-[#135163]'}`}>
              <Sparkles className="w-4 h-4" />
              <span>Applications Open for 2026</span>
            </div>
            
            <h1 className={`font-['Montserrat'] text-5xl lg:text-7xl font-bold leading-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Your Journey to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00677F] to-[#135163]">
                Healthcare Excellence
              </span>
            </h1>
            
            <p className={`text-xl max-w-xl leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
              Join the University of St. Augustine for Health Sciences and transform your passion into a rewarding healthcare career.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => navigate("/register")}
                className="bg-[#00677F] hover:bg-[#135163] text-white rounded-full px-8 py-6 text-lg shadow-[0_0_30px_rgba(0,180,216,0.4)] hover:shadow-[0_0_40px_rgba(0,180,216,0.6)] transition-all hover:scale-105"
                data-testid="hero-start-application-btn"
              >
                Start Your Application
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            
            {/* Stats */}
            <div className="flex gap-12 pt-8">
              <div>
                <p className="text-3xl font-['Montserrat'] font-bold text-[#00677F]">15K+</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-gray-500'}`}>Alumni Worldwide</p>
              </div>
              <div>
                <p className="text-3xl font-['Montserrat'] font-bold text-[#00677F]">95%</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-gray-500'}`}>Employment Rate</p>
              </div>
              <div>
                <p className="text-3xl font-['Montserrat'] font-bold text-[#00677F]">5</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-gray-500'}`}>Campus Locations</p>
              </div>
            </div>
          </div>
          
          {/* Hero Image/Visual */}
          <div className="relative hidden lg:block">
            <div className={`absolute inset-0 z-10 ${theme === 'dark' ? 'bg-gradient-to-t from-[#0A0E14] via-transparent to-transparent' : 'bg-gradient-to-t from-gray-50 via-transparent to-transparent'}`} />
            <div className="glass-card rounded-3xl overflow-hidden animate-float">
              <img 
                src="https://customer-assets.emergentagent.com/job_be4bb2aa-ca20-4b1a-9d54-431ad1ac86d0/artifacts/1nfqifog_usahs-innovation-advantage-main-page.webp"
                alt="USA.edu Campus"
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Program Selection */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`font-['Montserrat'] text-4xl lg:text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Choose Your Path
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
              Select your program of interest to begin your application journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program) => (
              <div
                key={program.id}
                onClick={() => setSelectedProgram(program.id)}
                className={`glass-card rounded-3xl p-6 cursor-pointer card-lift ${
                  selectedProgram === program.id ? 'border-[#00677F] shadow-[0_0_30px_rgba(0,180,216,0.2)]' : ''
                }`}
                data-testid={`program-card-${program.id}`}
              >
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `${program.color}20` }}
                >
                  <program.icon className="w-7 h-7" style={{ color: program.color }} />
                </div>
                <h3 className={`font-['Montserrat'] text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{program.name}</h3>
                <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>{program.description}</p>
                <div className="flex flex-wrap gap-2">
                  {program.degrees.map((degree) => (
                    <span 
                      key={degree}
                      className={`px-2 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-white/5 border border-white/10 text-white' : 'bg-gray-100 border border-gray-200 text-gray-700'}`}
                    >
                      {degree}
                    </span>
                  ))}
                </div>
                {selectedProgram === program.id && (
                  <div className="mt-5">
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/register", { state: { program: program.id } });
                      }}
                      className="w-full bg-[#00677F] hover:bg-[#135163] text-white rounded-full text-sm py-2"
                      data-testid={`apply-${program.id}-btn`}
                    >
                      Apply Now
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 relative">
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-b from-transparent via-[#002855]/20 to-transparent' : 'bg-gradient-to-b from-transparent via-[#E0F7FA]/30 to-transparent'}`} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className={`font-['Montserrat'] text-4xl lg:text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              A Smarter Application Experience
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
              Our cutting-edge portal makes applying simple, transparent, and stress-free
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="glass-card rounded-3xl p-8 card-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
                data-testid={`feature-card-${index}`}
              >
                <div className="w-14 h-14 rounded-2xl bg-[#00677F]/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-[#00677F]" />
                </div>
                <h3 className={`font-['Montserrat'] text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
                <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Locations */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className={`font-['Montserrat'] text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Our Campuses</h2>
            <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>World-class facilities across the United States</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {campuses.map((campus) => (
              <div 
                key={campus}
                className={`glass-card rounded-full px-6 py-3 flex items-center gap-2 hover:border-[#00677F]/50 transition-colors cursor-pointer ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                data-testid={`campus-${campus.toLowerCase().replace(' ', '-')}`}
              >
                <MapPin className="w-4 h-4 text-[#00677F]" />
                <span>{campus}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-r from-[#002855]/50 via-[#0A0E14] to-[#002855]/50' : 'bg-gradient-to-r from-[#E0F7FA]/50 via-white to-[#E0F7FA]/50'}`} />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className={`font-['Montserrat'] text-4xl lg:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Ready to Begin Your Journey?
          </h2>
          <p className={`text-lg mb-8 max-w-2xl mx-auto ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
            Join thousands of students who have launched their healthcare careers at USA.edu
          </p>
          <Button 
            onClick={() => navigate("/register")}
            className="bg-[#00677F] hover:bg-[#135163] text-white rounded-full px-10 py-6 text-lg shadow-[0_0_30px_rgba(0,180,216,0.4)] hover:shadow-[0_0_40px_rgba(0,180,216,0.6)] transition-all hover:scale-105"
            data-testid="cta-apply-btn"
          >
            Start Your Application
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 border-t ${theme === 'dark' ? 'border-white/5' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="https://customer-assets.emergentagent.com/job_be4bb2aa-ca20-4b1a-9d54-431ad1ac86d0/artifacts/7kvxdoxy_primary.filled.whouter.pms315.png" 
                alt="USA.edu Logo" 
                className="h-8 w-auto"
              />
              <span className={`font-['Montserrat'] font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>University of St. Augustine</span>
            </div>
            <p className={`text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-gray-500'}`}>
              © 2026 University of St. Augustine for Health Sciences. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
