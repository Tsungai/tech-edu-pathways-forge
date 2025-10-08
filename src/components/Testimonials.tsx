import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quote } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Lutho Mazikwana",
      role: "IT Support",
      testimonial: "The IT Support program gave me hands-on experience with real-world troubleshooting scenarios. The instructors were patient and made complex networking concepts easy to understand. I'm now confidently supporting a team of 50+ users.",
      image: "/placeholder.svg",
      initials: "LM"
    },
    {
      name: "Whitney Matikiti",
      role: "Project Management",
      testimonial: "Learning Agile and Scrum methodologies through TechEdu transformed my career. The practical projects and certification prep helped me land my dream role as a Project Coordinator. The skills I gained here are invaluable.",
      image: "/placeholder.svg",
      initials: "WM"
    },
    {
      name: "Liam Wiggins",
      role: "Software Engineer",
      testimonial: "From zero coding experience to building full-stack applications - TechEdu made it possible. The curriculum is well-structured, and the mentorship from industry professionals helped me secure my first software engineering position.",
      image: "/placeholder.svg",
      initials: "LW"
    },
    {
      name: "Nothando Nxele",
      role: "Business Analyst",
      testimonial: "The Business Analysis course taught me how to bridge the gap between business needs and technical solutions. The real-world case studies and tools I learned have been crucial in my role analyzing and improving business processes.",
      image: "/placeholder.svg",
      initials: "NN"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            💬 Student Success Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear from our graduates who transformed their careers through our programs
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 border-2">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <Avatar className="h-16 w-16 ring-4 ring-primary/10">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {testimonial.name}
                    </h3>
                    <Badge variant="secondary" className="mb-2">
                      {testimonial.role}
                    </Badge>
                  </div>
                  <Quote className="w-8 h-8 text-primary/20" />
                </div>

                <p className="text-muted-foreground leading-relaxed italic">
                  "{testimonial.testimonial}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
