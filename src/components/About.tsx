
import { Users, Target, Award } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Bridging the Gap in Tech Education
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Founded in 2021 by Shumba and Peach, Code and Cloud Academy was created to address 
                the critical need for practical, affordable tech education in South Africa.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We focus on creating career paths that are not publicly known and provide 
                opportunities for practical learning, real-life problem solving, and guidance 
                for realistic workforce integration.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-accent border border-primary/20">
                <Users className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Shumba - Co-Founder</h3>
                <p className="text-muted-foreground text-sm">
                  15 years of experience in software engineering and edtech industries
                </p>
              </div>
              <div className="p-6 rounded-xl bg-accent border border-secondary/20">
                <Target className="h-8 w-8 text-secondary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Peach - Co-Founder</h3>
                <p className="text-muted-foreground text-sm">
                  10 years of experience in community-based projects and marketing
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-foreground">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To offer world-class education that meets the learning objectives needed 
                for our students to succeed in the tech industry, with a focus on practical 
                application and real-world experience.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl blur-3xl"></div>
            <img 
              src="/lovable-uploads/c0965d8f-4187-42f2-8d93-3892a27405c1.png" 
              alt="Students learning in classroom"
              className="relative z-10 rounded-3xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Students Trained</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">85%</div>
            <div className="text-muted-foreground">Job Placement Rate</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">6+</div>
            <div className="text-muted-foreground">Industry Partners</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Online Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};
