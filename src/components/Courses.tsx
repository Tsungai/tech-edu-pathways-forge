import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Award, MapPin } from "lucide-react";
import { CourseModal } from "./CourseModal";
import { useState } from "react";
import { useGeolocation } from "@/hooks/useGeolocation";
import { convertPrice } from "@/utils/currency";

export const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const { country, currency, loading } = useGeolocation();

  const getDisplayPrice = (price: string) => {
    return convertPrice(price, currency);
  };

  const getCountryFlag = (countryCode: string) => {
    const flags: { [key: string]: string } = {
      'ZA': '🇿🇦',
      'ZW': '🇿🇼'
    };
    return flags[countryCode] || '🌍';
  };

  const regularCourses = [
    {
      title: "Introduction to Tech",
      duration: "3 Months",
      level: "Beginner",
      students: "125",
      price: "R5,399/month",
      upfront: "R15,000",
      description: "Perfect entry point into the tech industry covering fundamentals and career paths.",
      skills: ["ICDL Certification", "Tech Fundamentals", "Career Planning"],
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "Software Engineering",
      duration: "6-12 Months",
      level: "Intermediate",
      students: "85",
      price: "R3,625.50/month",
      upfront: "R19,995",
      description: "Comprehensive programming course covering multiple languages and frameworks.",
      skills: ["Python & Django", "Java Spring Boot", "Oracle Database"],
      color: "bg-emerald-50 border-emerald-200"
    },
    {
      title: "Web Development",
      duration: "6-12 Months",
      level: "Intermediate",
      students: "95",
      price: "R3,625.50/month",
      upfront: "R19,995",
      description: "Full-stack web development from frontend to backend technologies.",
      skills: ["HTML/CSS/JavaScript", "React & Node.js", "MongoDB"],
      color: "bg-purple-50 border-purple-200"
    },
    {
      title: "Web Development for Marketers",
      duration: "6-12 Months",
      level: "Intermediate",
      students: "42",
      price: "R3,625.50/month",
      upfront: "R19,995",
      description: "Bridge design, development, and digital strategy for marketing professionals.",
      skills: ["WordPress & Webflow", "SEO Optimization", "Marketing Analytics"],
      color: "bg-indigo-50 border-indigo-200"
    },
    {
      title: "IT Support",
      duration: "6 Months",
      level: "Beginner",
      students: "60",
      price: "R2,550.05/month",
      upfront: "R14,000",
      description: "Essential IT support skills for help desk and technical support roles.",
      skills: ["A+ Certification", "Network+", "Troubleshooting"],
      color: "bg-orange-50 border-orange-200"
    },
    {
      title: "Product Manager/Owner",
      duration: "6 Months",
      level: "Advanced",
      students: "40",
      price: "R5,599/month",
      upfront: "R30,000",
      description: "Learn to manage products from conception to launch with industry methodologies.",
      skills: ["PMP Certification", "Agile Methodologies", "Product Strategy"],
      color: "bg-rose-50 border-rose-200"
    },
    {
      title: "CodeStars (Under 18)",
      duration: "3 Months",
      level: "Beginner",
      students: "150",
      price: "R1,000/month",
      upfront: "R2,500",
      description: "Designed for young minds to explore tech careers early.",
      skills: ["ICDL Certification", "Programming Basics", "Digital Literacy"],
      color: "bg-green-50 border-green-200"
    }
  ];

  const eveningPrograms = [
    {
      title: "Data Analyst Program",
      duration: "6 Months",
      level: "Career Change",
      students: "NEW",
      price: "R24,000",
      upfront: "R24,000",
      description: "Evening program (Mon-Fri, 1hr). Learn to collect, clean, analyze, and visualize data to drive business decisions.",
      skills: ["Python & Pandas", "SQL & Databases", "Power BI/Tableau", "Statistics"],
      color: "bg-gradient-to-br from-violet-50 to-purple-50 border-violet-300",
      isEvening: true
    },
    {
      title: "Social Media Management for Marketers",
      duration: "6 Months",
      level: "Career Change",
      students: "NEW",
      price: "R24,000",
      upfront: "R24,000",
      description: "Evening program (Mon-Fri, 1hr). Master social media strategy, content creation, paid ads, and analytics.",
      skills: ["Content Strategy", "Paid Ads", "Analytics", "Canva & Video"],
      color: "bg-gradient-to-br from-pink-50 to-rose-50 border-pink-300",
      isEvening: true
    },
    {
      title: "Full-Stack Web Development (MERN)",
      duration: "6 Months",
      level: "Career Change",
      students: "NEW",
      price: "R24,000",
      upfront: "R24,000",
      description: "Evening program (Mon-Fri, 1hr). Build modern web applications with React, Node.js, Express, and MongoDB.",
      skills: ["React.js", "Node.js & Express", "MongoDB", "Deployment"],
      color: "bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-300",
      isEvening: true
    },
    {
      title: "Digital Marketing & SEO",
      duration: "6 Months",
      level: "Career Change",
      students: "NEW",
      price: "R24,000",
      upfront: "R24,000",
      description: "Evening program (Mon-Fri, 1hr). Master SEO, PPC, email marketing, analytics, and conversion optimization.",
      skills: ["SEO & Keywords", "Google Ads", "Analytics", "Content Marketing"],
      color: "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-300",
      isEvening: true
    },
    {
      title: "Project Management (Agile & Scrum)",
      duration: "6 Months",
      level: "Career Change",
      students: "NEW",
      price: "R24,000",
      upfront: "R24,000",
      description: "Evening program (Mon-Fri, 1hr). Learn Agile, Scrum, Kanban, risk management, and project leadership.",
      skills: ["Agile & Scrum", "Jira & Tools", "Risk Management", "Stakeholder Mgmt"],
      color: "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-300",
      isEvening: true
    },
    {
      title: "Business Analysis & Process Improvement",
      duration: "6 Months",
      level: "Career Change",
      students: "NEW",
      price: "R24,000",
      upfront: "R24,000",
      description: "Evening program (Mon-Fri, 1hr). Master requirements gathering, process mapping, and business optimization.",
      skills: ["Requirements Gathering", "Process Mapping", "Data Modeling", "Lean & Six Sigma"],
      color: "bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-300",
      isEvening: true
    }
  ];

  return (
    <section id="courses" className="py-20 bg-accent">
      <div className="max-w-7xl mx-auto px-6">
        {/* Location Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <MapPin className="h-5 w-5 text-primary" />
          {loading ? (
            <span className="text-sm text-muted-foreground">Detecting location...</span>
          ) : (
            <span className="text-sm text-muted-foreground">
              {getCountryFlag(country)} Prices shown in {currency}
            </span>
          )}
        </div>

        {/* Evening Programs Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground text-sm font-bold mb-4">
              🌙 NEW: EVENING PROGRAMS FOR CAREER CHANGERS
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              6-Month Evening Programs
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Perfect for working professionals. Mon-Fri, 1 hour per day. Transform your career 
              with our intensive evening programs designed for career changers.
            </p>
            <div className="mt-4 space-y-2">
              <div className="text-2xl font-bold text-secondary">
                {getDisplayPrice("R4,000")}/month for 6 months
              </div>
              <div className="text-lg text-muted-foreground">
                or {getDisplayPrice("R24,000")} upfront
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {eveningPrograms.map((course, index) => (
              <div 
                key={index}
                className={`relative p-6 rounded-2xl border-2 ${course.color} hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground text-xs font-bold">
                    {course.students}
                  </span>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-foreground mb-2 pr-16">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {course.level}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      🌙 Evening
                    </Badge>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {course.description}
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {course.duration} • Mon-Fri, 1hr
                  </div>

                  <div>
                    <div className="flex items-center gap-1 mb-2">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-foreground text-sm">Skills:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {course.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 space-y-1">
                    <div className="text-2xl font-bold text-secondary">
                      {getDisplayPrice("R4,000")}/month
                    </div>
                    <div className="text-sm text-muted-foreground">
                      for 6 months or {getDisplayPrice("R24,000")} upfront
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button className="w-full bg-gradient-to-r from-secondary to-secondary/80">
                    Enroll Now
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setSelectedCourse(course.title)}
                  >
                    View Syllabus
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regular Courses Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Full-Time Course Catalog
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive tech courses designed to take you from beginner to job-ready professional.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {regularCourses.map((course, index) => (
            <div 
              key={index}
              className={`p-8 rounded-2xl border-2 ${course.color} hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {course.title}
                  </h3>
                  <Badge variant="secondary" className="mb-3">
                    {course.level}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {getDisplayPrice(course.price)}/month
                  </div>
                  <div className="text-sm text-muted-foreground">
                    for 6 months or {getDisplayPrice(course.upfront)} upfront
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {course.description}
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.students} enrolled
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1 mb-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">What you'll learn:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {course.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1">
                  Enroll Now
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setSelectedCourse(course.title)}
                >
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {currency === 'USD' && (
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground/70">
            * Prices converted from ZAR at rate of $1 = R17.5
          </p>
        </div>
      )}

      <CourseModal
        isOpen={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
        courseTitle={selectedCourse || ""}
      />
    </section>
  );
};
