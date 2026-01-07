import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjEzODU5IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <Code className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-primary-foreground">TechEdu Academy</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#courses" className="text-muted-foreground hover:text-primary transition-colors">Courses</a>
          <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a>
          <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a>
          <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
          <Link to="/auth">
            <Button className="bg-primary hover:bg-primary/90">
              Login
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Shaping the Future of Tech Education
              </span>
              <h1 className="text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
                Build Your Tech Career
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  From Zero to Hero
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Certified courses, practical training, and real-world experience. 
                Join TechEdu Academy and transform your future with industry-relevant skills 
                at affordable rates.
              </p>
            </div>
            
            {/* Enrollment CTA Banner */}
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 rounded-xl p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-primary font-semibold text-sm sm:text-base">
                    🚀 Enrollment for next cohort closes on 20 February 2026
                  </p>
                  <p className="text-muted-foreground text-sm">
                    First cohort of 2026 starts on 22 February 2026
                  </p>
                </div>
                <a href="#contact">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 whitespace-nowrap">
                    Enroll Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#courses">
                <Button size="lg" variant="secondary" className="px-8 py-4 text-lg w-full sm:w-auto">
                  View Courses
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary-foreground">500+</div>
                <div className="text-muted-foreground">Students Enrolled</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Code className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary-foreground">13+</div>
                <div className="text-muted-foreground">Tech Courses</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary-foreground">85%</div>
                <div className="text-muted-foreground">Job Placement</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
            <img 
              src="/lovable-uploads/ab94cf0a-1876-4cf5-8a6a-9a602c2588af.png" 
              alt="Students collaborating on tech projects"
              className="relative z-10 rounded-3xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
