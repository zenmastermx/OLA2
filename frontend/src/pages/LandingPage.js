import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Sparkles, FileCheck, Headphones, GraduationCap, Stethoscope, MapPin, ArrowRight } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();
  const [selectedProgram, setSelectedProgram] = useState(null);

  const programs = [
    {
      id: "ot",
      name: "Occupational Therapy",
      icon: GraduationCap,
      description: "Transform lives through therapeutic interventions",
      degrees: ["MOT - Master's", "OTD - Doctorate"],
      color: "#00B4D8"
    },
    {
      id: "nursing",
      name: "Nursing",
      icon: Stethoscope,
      description: "Lead the future of patient care",
      degrees: ["MSN - Master's", "DNP - Doctorate"],
      color: "#7B68EE"
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
    <div className="min-h-screen bg-[#0A0E14] text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0E14]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00B4D8] to-[#002855] flex items-center justify-center">
              <span className="text-white font-bold text-lg font-['Outfit']">U</span>
            </div>
            <span className="font-['Outfit'] font-bold text-xl tracking-tight">USA.edu</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/5" data-testid="nav-login-btn">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-[#00B4D8] hover:bg-[#0096B4] text-white rounded-full px-6 shadow-[0_0_20px_rgba(0,180,216,0.3)] hover:shadow-[0_0_30px_rgba(0,180,216,0.5)] transition-all" data-testid="nav-apply-btn">
                Apply Now
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        {/* Background effects */}
        <div className="absolute inset-0 gradient-radial opacity-50" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00B4D8]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7B68EE]/10 rounded-full blur-[100px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00B4D8]/10 border border-[#00B4D8]/30 text-[#00B4D8] text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Applications Open for 2026</span>
            </div>
            
            <h1 className="font-['Outfit'] text-5xl lg:text-7xl font-bold leading-tight">
              Your Journey to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4D8] to-[#00F5FF]">
                Healthcare Excellence
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 max-w-xl leading-relaxed">
              Join the University of St. Augustine for Health Sciences and transform your passion into a rewarding healthcare career.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => navigate("/register")}
                className="bg-[#00B4D8] hover:bg-[#0096B4] text-white rounded-full px-8 py-6 text-lg shadow-[0_0_30px_rgba(0,180,216,0.4)] hover:shadow-[0_0_40px_rgba(0,180,216,0.6)] transition-all hover:scale-105"
                data-testid="hero-start-application-btn"
              >
                Start Your Application
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5 rounded-full px-8 py-6 text-lg"
                data-testid="hero-explore-btn"
              >
                Explore Programs
              </Button>
            </div>
            
            {/* Stats */}
            <div className="flex gap-12 pt-8">
              <div>
                <p className="text-3xl font-['Outfit'] font-bold text-[#00F5FF]">15K+</p>
                <p className="text-slate-500 text-sm">Alumni Worldwide</p>
              </div>
              <div>
                <p className="text-3xl font-['Outfit'] font-bold text-[#00F5FF]">95%</p>
                <p className="text-slate-500 text-sm">Employment Rate</p>
              </div>
              <div>
                <p className="text-3xl font-['Outfit'] font-bold text-[#00F5FF]">5</p>
                <p className="text-slate-500 text-sm">Campus Locations</p>
              </div>
            </div>
          </div>
          
          {/* Hero Image/Visual */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E14] via-transparent to-transparent z-10" />
            <div className="glass-card rounded-3xl overflow-hidden animate-float">
              <img 
                src="https://images.unsplash.com/photo-1529431801612-df968fb9eb9c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTJ8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwYXJjaGl0ZWN0dXJlJTIwbmlnaHR8ZW58MHx8fHwxNzY5NjM4Mjg4fDA&ixlib=rb-4.1.0&q=85"
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
            <h2 className="font-['Outfit'] text-4xl lg:text-5xl font-bold mb-4">
              Choose Your Path
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Select your program of interest to begin your application journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {programs.map((program) => (
              <div
                key={program.id}
                onClick={() => setSelectedProgram(program.id)}
                className={`glass-card rounded-3xl p-8 cursor-pointer card-lift ${
                  selectedProgram === program.id ? 'border-[#00F5FF] shadow-[0_0_30px_rgba(0,245,255,0.2)]' : ''
                }`}
                data-testid={`program-card-${program.id}`}
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: `${program.color}20` }}
                >
                  <program.icon className="w-8 h-8" style={{ color: program.color }} />
                </div>
                <h3 className="font-['Outfit'] text-2xl font-bold mb-2">{program.name}</h3>
                <p className="text-slate-400 mb-6">{program.description}</p>
                <div className="flex flex-wrap gap-2">
                  {program.degrees.map((degree) => (
                    <span 
                      key={degree}
                      className="px-3 py-1 rounded-full text-sm bg-white/5 border border-white/10"
                    >
                      {degree}
                    </span>
                  ))}
                </div>
                {selectedProgram === program.id && (
                  <div className="mt-6">
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/register", { state: { program: program.id } });
                      }}
                      className="w-full bg-[#00B4D8] hover:bg-[#0096B4] text-white rounded-full"
                      data-testid={`apply-${program.id}-btn`}
                    >
                      Apply for {program.name}
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#002855]/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-['Outfit'] text-4xl lg:text-5xl font-bold mb-4">
              A Smarter Application Experience
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
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
                <div className="w-14 h-14 rounded-2xl bg-[#00B4D8]/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-[#00B4D8]" />
                </div>
                <h3 className="font-['Outfit'] text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Locations */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-['Outfit'] text-4xl font-bold mb-4">Our Campuses</h2>
            <p className="text-slate-400">World-class facilities across the United States</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {campuses.map((campus) => (
              <div 
                key={campus}
                className="glass-card rounded-full px-6 py-3 flex items-center gap-2 hover:border-[#00F5FF]/50 transition-colors cursor-pointer"
                data-testid={`campus-${campus.toLowerCase().replace(' ', '-')}`}
              >
                <MapPin className="w-4 h-4 text-[#00B4D8]" />
                <span>{campus}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#002855]/50 via-[#0A0E14] to-[#002855]/50" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-['Outfit'] text-4xl lg:text-5xl font-bold mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of students who have launched their healthcare careers at USA.edu
          </p>
          <Button 
            onClick={() => navigate("/register")}
            className="bg-[#00B4D8] hover:bg-[#0096B4] text-white rounded-full px-10 py-6 text-lg shadow-[0_0_30px_rgba(0,180,216,0.4)] hover:shadow-[0_0_40px_rgba(0,180,216,0.6)] transition-all hover:scale-105"
            data-testid="cta-apply-btn"
          >
            Start Your Application
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00B4D8] to-[#002855] flex items-center justify-center">
                <span className="text-white font-bold text-sm font-['Outfit']">U</span>
              </div>
              <span className="font-['Outfit'] font-semibold">University of St. Augustine</span>
            </div>
            <p className="text-slate-500 text-sm">
              © 2026 University of St. Augustine for Health Sciences. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
