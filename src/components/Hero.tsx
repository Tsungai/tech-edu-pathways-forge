import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Users, Zap } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjEzODU5IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <Code className="h-8 w-8 text-emerald-400" />
          <span className="text-2xl font-bold text-white">Code and Cloud Academy</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#courses" className="text-gray-300 hover:text-emerald-400 transition-colors">Courses</a>
          <a href="#about" className="text-gray-300 hover:text-emerald-400 transition-colors">About</a>
          <a href="#pricing" className="text-gray-300 hover:text-emerald-400 transition-colors">Pricing</a>
          <Button variant="outline" className="border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-slate-900">
            Contact
          </Button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-block px-4 py-2 rounded-full bg-emerald-400/10 text-emerald-400 text-sm font-medium">
                Shaping the Future of Tech Education
              </span>
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                Build Your Tech Career
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                  From Zero to Hero
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Certified courses, practical training, and real-world experience. 
                Join Code and Cloud Academy and transform your future with industry-relevant skills 
                at affordable rates.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 text-lg">
                Start Learning Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg">
                View Courses
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Users className="h-8 w-8 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-gray-400">Students Enrolled</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Code className="h-8 w-8 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold text-white">5+</div>
                <div className="text-gray-400">Tech Courses</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Zap className="h-8 w-8 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold text-white">85%</div>
                <div className="text-gray-400">Job Placement</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-3xl blur-3xl"></div>
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
