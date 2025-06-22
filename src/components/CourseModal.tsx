
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Award, CheckCircle } from "lucide-react";

interface CourseDetails {
  title: string;
  duration: string;
  audience: string;
  accreditation: string;
  overview: string;
  whatYouLearn: string[];
  outcomes: string[];
  emoji: string;
}

const courseDetails: Record<string, CourseDetails> = {
  "Introduction to Tech": {
    title: "Intro to Tech (ICDL Accredited)",
    duration: "3 Months",
    audience: "Beginners, Career Explorers",
    accreditation: "ICDL Certification",
    overview: "Start your tech journey with confidence. This foundational course introduces students to essential computer skills, helping them understand how technology works in everyday life and business. From navigating a computer to mastering Microsoft Office, this course builds the confidence needed to explore future paths in tech.",
    whatYouLearn: [
      "Digital literacy: Computer & Online Essentials",
      "Productivity skills with Word, Excel, and PowerPoint",
      "Cybersecurity awareness and digital hygiene",
      "Online communication tools (Zoom, Email, Google Apps)",
      "Career exploration: roles in the tech industry"
    ],
    outcomes: [
      "ICDL Certification",
      "Proficiency in common workplace tools",
      "Readiness to advance into specialized tech fields"
    ],
    emoji: "📃"
  },
  "Software Engineering": {
    title: "Software Engineering (6 or 12 Months)",
    duration: "6 or 12 Months",
    audience: "Aspiring Developers",
    accreditation: "Python, Java (Oracle)",
    overview: "Build apps. Solve problems. Get hired. This comprehensive course walks you through the foundations of computer science, modern software development, and practical programming using globally in-demand languages.",
    whatYouLearn: [
      "Programming in Python and Java",
      "Backend development with Django & Spring Boot",
      "Data structures, algorithms & problem-solving",
      "SQL & relational databases (Oracle)",
      "Version control using Git & GitHub"
    ],
    outcomes: [
      "Complete a capstone full-stack project",
      "Build a portfolio to showcase during job interviews",
      "Ready to apply for internships or junior developer roles"
    ],
    emoji: "🚀"
  },
  "Web Development": {
    title: "Web Development (6 or 12 Months)",
    duration: "6 or 12 Months",
    audience: "Future Web Developers",
    accreditation: "Full Stack Web Certification",
    overview: "Design websites that don't just look good but work like a charm. Learn the full stack of modern web technologies to build responsive websites, web apps, and e-commerce platforms from scratch.",
    whatYouLearn: [
      "HTML, CSS, and JavaScript",
      "React.js, Node.js & Express.js",
      "MongoDB databases",
      "API development and RESTful services",
      "WordPress development for business sites"
    ],
    outcomes: [
      "Deploy real-world websites and applications",
      "Build and manage online platforms for clients or businesses",
      "Stand out as a junior frontend or full-stack developer"
    ],
    emoji: "📈"
  },
  "IT Support": {
    title: "IT Support (6 Months)",
    duration: "6 Months",
    audience: "Tech Support Starters",
    accreditation: "A+ & N+",
    overview: "Be the go-to problem solver. This course prepares students to handle real-world hardware, software, and networking issues. Learn to troubleshoot with confidence and support users across any industry.",
    whatYouLearn: [
      "IT hardware and OS fundamentals",
      "Network setup and basic security (LAN, WLAN)",
      "IT help desk practices & customer service",
      "Using diagnostic and ticketing tools",
      "Intro to cloud platforms (Google Workspace, Microsoft 365)"
    ],
    outcomes: [
      "A+ and N+ certifications",
      "Hands-on troubleshooting ability",
      "Job readiness for IT support and help desk roles"
    ],
    emoji: "🔧"
  },
  "Product Manager/Owner": {
    title: "Product Manager/Owner (6 Months)",
    duration: "6 Months",
    audience: "Future Tech Leaders",
    accreditation: "PMP or Scrum Product Owner Track",
    overview: "Turn vision into value. Learn how to lead teams and launch products that solve real problems. This course blends business strategy with agile methodologies, perfect for future product owners or tech entrepreneurs.",
    whatYouLearn: [
      "Agile, Scrum & Product Lifecycle Frameworks",
      "Market research & MVP planning",
      "Roadmapping, sprint planning & stakeholder management",
      "Product metrics & iteration",
      "Communication, team dynamics, and leadership"
    ],
    outcomes: [
      "Prepare for PMP or Scrum Product Owner certification",
      "Lead product strategy from concept to launch",
      "Qualify for roles in product management, tech startups, or consulting"
    ],
    emoji: "📆"
  },
  "CodeStars (Under 18)": {
    title: "CodeStars (Youth Program)",
    duration: "3 or 6 Months",
    audience: "Ages 8–17 (Beginners and Explorers)",
    accreditation: "ICDL (Introductory)",
    overview: "Make learning fun and futuristic. CodeStars is a youth-focused program that builds digital confidence in kids and teens. Through guided play and structured lessons, students learn to create with code, solve problems, and explore tech pathways early.",
    whatYouLearn: [
      "Introduction to Scratch & game creation",
      "Python basics through visual tools",
      "HTML/CSS: Building your first web page",
      "Cyber hygiene and internet safety",
      "Digital presentations & teamwork"
    ],
    outcomes: [
      "ICDL Foundation digital badge",
      "Interactive games, websites & projects",
      "Tech confidence and early career exposure"
    ],
    emoji: "🧒"
  }
};

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
}

export const CourseModal = ({ isOpen, onClose, courseTitle }: CourseModalProps) => {
  const course = courseDetails[courseTitle];

  if (!course) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 mb-4">
            {course.emoji} {course.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Course Info */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-emerald-500" />
              <div>
                <div className="font-medium text-gray-900">Duration</div>
                <div className="text-gray-600">{course.duration}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-emerald-500" />
              <div>
                <div className="font-medium text-gray-900">Audience</div>
                <div className="text-gray-600">{course.audience}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-emerald-500" />
              <div>
                <div className="font-medium text-gray-900">Accreditation</div>
                <div className="text-gray-600">{course.accreditation}</div>
              </div>
            </div>
          </div>

          {/* Course Overview */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Course Overview</h3>
            <p className="text-gray-700 leading-relaxed">{course.overview}</p>
          </div>

          {/* What You'll Learn */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">What You'll Learn:</h3>
            <ul className="space-y-2">
              {course.whatYouLearn.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Outcomes */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Outcomes:</h3>
            <div className="space-y-2">
              {course.outcomes.map((outcome, index) => (
                <Badge key={index} variant="secondary" className="mr-2 mb-2">
                  {outcome}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
