
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Instructors = () => {
  const instructors = [
    {
      name: "Alexis Shumba",
      title: "Senior Software Engineer",
      experience: "10+ years",
      specialties: ["Python", "Java", "Backend Systems"],
      description: "Alexis is a passionate software engineer with over 10 years of experience in Python and Java development. She specialises in backend systems and loves mentoring students to build real-world applications that solve community problems. When she's not coding, she enjoys writing tech blogs and running community coding bootcamps.",
      image: "/placeholder.svg",
      initials: "AS"
    },
    {
      name: "Kurai Chikwangwani",
      title: "Full-Stack Developer & Marketing Strategist",
      experience: "8+ years",
      specialties: ["WordPress", "SEO", "Full-Stack Development"],
      description: "Kurai is a full-stack web developer and digital marketing strategist with a strong focus on WordPress and SEO. With 8 years in the tech and marketing industry, he bridges the gap between design, development, and sales, empowering students to build websites that convert. Outside of work, he mentors high school robotics clubs.",
      image: "/placeholder.svg",
      initials: "KC"
    },
    {
      name: "Liam Wiggins",
      title: "IT Infrastructure & Support Expert",
      experience: "500+ students trained",
      specialties: ["A+ Certified", "Network+", "AWS Cloud"],
      description: "Liam is an IT infrastructure and support expert with certifications in A+, N+, and AWS Cloud Practitioner. He has trained over 500 students in IT support and networking and is known for simplifying complex concepts. Liam enjoys building gaming PCs and volunteering at local computer literacy workshops.",
      image: "/placeholder.svg",
      initials: "LW"
    },
    {
      name: "Chiedza Kehle",
      title: "UX Designer & Project Management Specialist",
      experience: "7+ years",
      specialties: ["UX/UI Design", "Agile", "Scrum Master"],
      description: "Chiedza is a user experience designer and certified project management professional with over 7 years of experience leading cross-functional teams. She specializes in human-centered design and Agile methodologies, helping students master both the creative and organizational sides of tech. When not teaching, she mentors women in tech and designs accessible digital products.",
      image: "/placeholder.svg",
      initials: "CK"
    }
  ];

  return (
    <section id="instructors" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            👨‍🏫 Meet Our Instructors
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn from industry experts who bring real-world experience and passion 
            for teaching to every class.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {instructors.map((instructor, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 border-2">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <Avatar className="h-24 w-24 mx-auto mb-4 ring-4 ring-primary/10">
                    <AvatarImage src={instructor.image} alt={instructor.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                      {instructor.initials}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-2xl font-bold text-foreground mb-1">
                    {instructor.name}
                  </h3>
                  <p className="text-primary font-medium mb-2">
                    {instructor.title}
                  </p>
                  <Badge variant="secondary" className="mb-4">
                    {instructor.experience}
                  </Badge>
                </div>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {instructor.specialties.map((specialty, specialtyIndex) => (
                      <Badge key={specialtyIndex} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed text-sm">
                  {instructor.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
