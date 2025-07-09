import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Award } from "lucide-react";
import { CourseModal } from "./CourseModal";
import { useState } from "react";

export const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const courses = [
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

  return (
    <section id="courses" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Course Catalog
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive range of tech courses designed to take you 
            from beginner to job-ready professional.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {courses.map((course, index) => (
            <div 
              key={index}
              className={`p-8 rounded-2xl border-2 ${course.color} hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  <Badge variant="secondary" className="mb-3">
                    {course.level}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-600">
                    {course.price}
                  </div>
                  <div className="text-sm text-gray-600">
                    or {course.upfront} upfront
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {course.description}
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-4 text-sm text-gray-600">
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
                    <Award className="h-4 w-4 text-gray-600" />
                    <span className="font-medium text-gray-700">What you'll learn:</span>
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
                <Button className="flex-1 bg-emerald-500 hover:bg-emerald-600">
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

      <CourseModal
        isOpen={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
        courseTitle={selectedCourse || ""}
      />
    </section>
  );
};
