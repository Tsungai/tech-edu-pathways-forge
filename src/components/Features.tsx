
import { CheckCircle, Clock, DollarSign, Award, Users, Laptop } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: <DollarSign className="h-8 w-8 text-primary" />,
      title: "Affordable Education",
      description: "Flexible payment options with monthly installments starting from R1,507.50"
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Industry Certifications",
      description: "Gain recognized certifications from Oracle, AWS, Google, and Microsoft"
    },
    {
      icon: <Laptop className="h-8 w-8 text-primary" />,
      title: "100% Online Learning",
      description: "Learn from anywhere with our comprehensive online platform and resources"
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Expert Instructors",
      description: "Learn from industry professionals with 15+ years of experience"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: "Practical Projects",
      description: "Work on real-world projects that prepare you for the job market"
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Flexible Schedule",
      description: "Study at your own pace with weekly live sessions and recorded content"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Why Choose TechEdu Academy?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We bridge the gap between education and employment with practical, 
            industry-focused training that gets results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-8 rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
