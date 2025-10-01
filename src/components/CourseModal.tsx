
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Award, CheckCircle, Calendar, BookOpen } from "lucide-react";

interface CourseDetails {
  title: string;
  duration: string;
  audience: string;
  accreditation: string;
  overview: string;
  whatYouLearn: string[];
  outcomes: string[];
  emoji: string;
  image: string;
  weeklyOutline: {
    week: number;
    title: string;
    isProject?: boolean;
  }[];
  certification: string;
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
    emoji: "📃",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop",
    weeklyOutline: [
      { week: 1, title: "Computer basics and Windows navigation" },
      { week: 2, title: "File management and system settings" },
      { week: 3, title: "Virtual PC setup and configuration", isProject: true },
      { week: 4, title: "Internet fundamentals and browser safety" },
      { week: 5, title: "Email management and online communication tools" },
      { week: 6, title: "Research assignment and professional email draft", isProject: true },
      { week: 7, title: "Microsoft Word formatting, templates, letters" },
      { week: 8, title: "Microsoft Word reports and document integration" },
      { week: 9, title: "Business letter and formatted proposal", isProject: true },
      { week: 10, title: "Microsoft Excel basics, tables, formulas" },
      { week: 11, title: "Microsoft Excel for budgets and calculations" },
      { week: 12, title: "Combined document, Excel budget and PowerPoint presentation", isProject: true }
    ],
    certification: "ICDL Foundation"
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
    emoji: "🚀",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
    weeklyOutline: [
      { week: 1, title: "Python syntax, variables, data types" },
      { week: 2, title: "Python loops, conditions, functions" },
      { week: 3, title: "Basic calculator app", isProject: true },
      { week: 4, title: "Python OOP – classes and objects" },
      { week: 5, title: "Python inheritance and modules" },
      { week: 6, title: "Banking system simulation", isProject: true },
      { week: 7, title: "Java syntax, classes, control flow" },
      { week: 8, title: "Java methods and arrays" },
      { week: 9, title: "Java console application", isProject: true },
      { week: 10, title: "Java collections, generics, streams" },
      { week: 11, title: "Java file I/O and exceptions" },
      { week: 12, title: "Inventory management system", isProject: true },
      { week: 13, title: "Data structures – arrays, linked lists" },
      { week: 14, title: "Searching and sorting algorithms" },
      { week: 15, title: "Algorithm-based challenge", isProject: true },
      { week: 16, title: "Django setup, models, views, templates" },
      { week: 17, title: "Django CRUD operations and forms" },
      { week: 18, title: "CRUD web app with Django", isProject: true },
      { week: 19, title: "SQL basics, joins, database design" },
      { week: 20, title: "Oracle SQL procedures and functions" },
      { week: 21, title: "Database for application", isProject: true },
      { week: 22, title: "Git and GitHub workflows" },
      { week: 23, title: "Collaboration and version control" },
      { week: 24, title: "Full-stack application with backend, database, frontend", isProject: true }
    ],
    certification: "Python Institute, Oracle (via Pearson VUE)"
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
    emoji: "📈",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=400&fit=crop",
    weeklyOutline: [
      { week: 1, title: "HTML structure and tags" },
      { week: 2, title: "HTML forms and tables" },
      { week: 3, title: "Portfolio landing page", isProject: true },
      { week: 4, title: "CSS basics, selectors, styling" },
      { week: 5, title: "Flexbox and Grid layouts" },
      { week: 6, title: "Responsive business website", isProject: true },
      { week: 7, title: "JavaScript syntax, variables, functions" },
      { week: 8, title: "DOM manipulation and events" },
      { week: 9, title: "Interactive webpage", isProject: true },
      { week: 10, title: "React.js basics – components, props" },
      { week: 11, title: "React state, hooks, forms" },
      { week: 12, title: "React SPA", isProject: true },
      { week: 13, title: "Node.js introduction, modules" },
      { week: 14, title: "Express.js routing and middleware" },
      { week: 15, title: "API with Express.js", isProject: true },
      { week: 16, title: "MongoDB CRUD and schemas" },
      { week: 17, title: "Mongoose integration with Express.js" },
      { week: 18, title: "MERN stack app", isProject: true },
      { week: 19, title: "WordPress setup and themes" },
      { week: 20, title: "Plugins and site management" },
      { week: 21, title: "WordPress business site", isProject: true },
      { week: 22, title: "Deployment, optimisation, hosting" },
      { week: 23, title: "Site security and performance" },
      { week: 24, title: "Full-stack e-commerce or portfolio site", isProject: true }
    ],
    certification: "MICT SETA / International Full Stack Certifications"
  },
  "Web Development for Marketers": {
    title: "Web Development for Marketers (6 or 12 Months)",
    duration: "6 or 12 Months",
    audience: "Digital Marketers, Content Creators, Brand Managers",
    accreditation: "Web Design & SEO Certification",
    overview: "Supercharge your marketing career by learning how websites are built, optimised, and maintained. This course bridges design, development, and digital strategy to empower marketers to manage or build websites that convert.",
    whatYouLearn: [
      "HTML & CSS for content layout and styling",
      "JavaScript fundamentals for interactive pages",
      "WordPress site setup and management",
      "Webflow for no-code advanced design",
      "SEO fundamentals and on-page optimisation",
      "Website performance, analytics, and CRO basics"
    ],
    outcomes: [
      "Build and customise websites without relying fully on developers",
      "Implement SEO best practices for improved ranking",
      "Launch marketing campaigns with technical confidence",
      "Advance your career as a digital marketing specialist with web skills"
    ],
    emoji: "🌐",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop",
    weeklyOutline: [
      { week: 1, title: "HTML structure for landing pages" },
      { week: 2, title: "CSS branding and layouts" },
      { week: 3, title: "Campaign landing page", isProject: true },
      { week: 4, title: "JavaScript for interactivity" },
      { week: 5, title: "Basic animations and CTAs" },
      { week: 6, title: "Interactive product page", isProject: true },
      { week: 7, title: "WordPress setup and SEO plugins" },
      { week: 8, title: "Theme customization and blog setup" },
      { week: 9, title: "Marketing blog website", isProject: true },
      { week: 10, title: "Webflow no-code design basics" },
      { week: 11, title: "Advanced Webflow features" },
      { week: 12, title: "Webflow landing page", isProject: true },
      { week: 13, title: "SEO fundamentals, keywords" },
      { week: 14, title: "On-page SEO implementation" },
      { week: 15, title: "SEO site audit", isProject: true },
      { week: 16, title: "Google Analytics setup and tracking" },
      { week: 17, title: "Conversion Rate Optimization basics" },
      { week: 18, title: "Campaign analytics report", isProject: true },
      { week: 19, title: "Advanced SEO strategies" },
      { week: 20, title: "Integrated marketing-web projects" },
      { week: 21, title: "Integrated SEO & marketing strategy", isProject: true },
      { week: 22, title: "Performance optimisation and CRO" },
      { week: 23, title: "Final revisions and portfolio prep" },
      { week: 24, title: "Marketing website with SEO, analytics, CRO", isProject: true }
    ],
    certification: "Google SEO, ICDL Web, Webflow University"
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
    emoji: "🔧",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop",
    weeklyOutline: [
      { week: 1, title: "Hardware and components" },
      { week: 2, title: "PC assembly and configuration" },
      { week: 3, title: "Computer lab setup", isProject: true },
      { week: 4, title: "OS installation and virtualisation" },
      { week: 5, title: "Software configuration and troubleshooting" },
      { week: 6, title: "OS deployment for SME", isProject: true },
      { week: 7, title: "Networking concepts, cabling, TCP/IP" },
      { week: 8, title: "WLAN setup and security" },
      { week: 9, title: "Small office network design", isProject: true },
      { week: 10, title: "Help desk operations, ticketing" },
      { week: 11, title: "Customer service in IT" },
      { week: 12, title: "Troubleshooting simulation", isProject: true }
    ],
    certification: "CompTIA A+, N+"
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
    emoji: "📆",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop",
    weeklyOutline: [
      { week: 1, title: "Product management basics, Agile" },
      { week: 2, title: "Scrum framework and ceremonies" },
      { week: 3, title: "Agile project plan draft", isProject: true },
      { week: 4, title: "Market research, user personas" },
      { week: 5, title: "MVP planning and validation" },
      { week: 6, title: "MVP canvas development", isProject: true },
      { week: 7, title: "Roadmapping and backlog grooming" },
      { week: 8, title: "Sprint planning and execution" },
      { week: 9, title: "Product roadmap build", isProject: true },
      { week: 10, title: "Metrics, OKRs, growth experiments" },
      { week: 11, title: "Leadership and stakeholder management" },
      { week: 12, title: "Product strategy presentation with prototype", isProject: true }
    ],
    certification: "PMI, Scrum Alliance"
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
    emoji: "🧒",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop",
    weeklyOutline: [
      { week: 1, title: "Scratch basics – sprites and movement" },
      { week: 2, title: "Scratch storytelling projects" },
      { week: 3, title: "Animated story", isProject: true },
      { week: 4, title: "Scratch game design – loops, logic" },
      { week: 5, title: "Game interactivity and challenges" },
      { week: 6, title: "Basic interactive game", isProject: true },
      { week: 7, title: "Python basics with visual tools" },
      { week: 8, title: "Simple Python programs for kids" },
      { week: 9, title: "Math quiz app", isProject: true },
      { week: 10, title: "HTML basics – structure and tags" },
      { week: 11, title: "CSS styling for kids' websites" },
      { week: 12, title: "Personal portfolio website", isProject: true }
    ],
    certification: "ICDL Foundation"
  },
  "Data Analyst Program": {
    title: "Data Analyst Program (5-Month Evening)",
    duration: "5 Months (Mon-Fri, 1 Hour)",
    audience: "Career Changers, Working Professionals",
    accreditation: "Data Analytics Certification",
    overview: "Master the art of data-driven decision making. This evening program teaches you to collect, clean, analyze, and visualize data to drive business decisions. Perfect for professionals looking to transition into analytics roles.",
    whatYouLearn: [
      "Excel & Google Sheets advanced functions and dashboards",
      "SQL for database querying and analysis",
      "Python programming with Pandas for data manipulation",
      "Data visualization with Power BI/Tableau",
      "Statistical analysis and hypothesis testing",
      "Predictive analytics and regression modeling"
    ],
    outcomes: [
      "Build professional data dashboards",
      "Analyze complex datasets with confidence",
      "Present data-driven insights to stakeholders",
      "Career transition to Data Analyst roles"
    ],
    emoji: "📊",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    weeklyOutline: [
      { week: 1, title: "Introduction to Data Analytics, Types of Data, Intro to Excel & Google Sheets" },
      { week: 1, title: "Clean and summarize a small dataset using Excel functions", isProject: true },
      { week: 2, title: "Descriptive Statistics (mean, median, variance), Data Types & Distributions" },
      { week: 2, title: "Generate summary statistics report from a dataset", isProject: true },
      { week: 3, title: "Data Visualization Basics – Charts, Graphs, Dashboards (Excel/Sheets)" },
      { week: 3, title: "Build a mini dashboard with 3 visualizations", isProject: true },
      { week: 4, title: "Intro to Databases, SQL Basics (SELECT, WHERE, ORDER BY)" },
      { week: 4, title: "Write SQL queries to answer business questions", isProject: true },
      { week: 5, title: "SQL Joins, Aggregations, GROUP BY, HAVING" },
      { week: 5, title: "Build a report combining multiple tables", isProject: true },
      { week: 6, title: "Python for Data Analysis (Jupyter Notebooks, Pandas Basics)" },
      { week: 6, title: "Clean a messy dataset with Pandas", isProject: true },
      { week: 7, title: "Data Wrangling: Missing Values, Outliers, Data Types" },
      { week: 7, title: "Transform raw dataset into a clean format", isProject: true },
      { week: 8, title: "Exploratory Data Analysis (EDA), Correlation" },
      { week: 8, title: "Visualize and interpret trends", isProject: true },
      { week: 9, title: "Intro to Data Visualization with Matplotlib/Seaborn" },
      { week: 9, title: "Create multi-plot analysis in Python", isProject: true },
      { week: 10, title: "Intro to Business Intelligence Tools (Power BI/Tableau)" },
      { week: 10, title: "Build a basic interactive dashboard", isProject: true },
      { week: 11, title: "Introduction to Probability & Hypothesis Testing" },
      { week: 11, title: "Perform a t-test and interpret results", isProject: true },
      { week: 12, title: "Intro to Regression (Simple & Multiple)" },
      { week: 12, title: "Build a simple regression model", isProject: true },
      { week: 13, title: "Time Series Basics" },
      { week: 13, title: "Plot and analyze time series trends", isProject: true },
      { week: 14, title: "Intro to Predictive Analytics (classification overview)" },
      { week: 14, title: "Build a simple classifier in Python", isProject: true },
      { week: 15, title: "Data Storytelling & Presentations" },
      { week: 15, title: "Create a data story using visualizations", isProject: true },
      { week: 16, title: "Capstone: Work on a real-world dataset" },
      { week: 17, title: "Capstone: Work on a real-world dataset" },
      { week: 18, title: "Capstone: Work on a real-world dataset" },
      { week: 19, title: "Capstone: Deliver a full report + dashboard", isProject: true },
      { week: 20, title: "Presentations & Career Prep (Resume, LinkedIn, Interview Qs)" },
      { week: 20, title: "Present final project", isProject: true }
    ],
    certification: "Data Analytics Professional Certificate"
  },
  "Social Media Management for Marketers": {
    title: "Social Media Management for Marketers (5-Month Evening)",
    duration: "5 Months (Mon-Fri, 1 Hour)",
    audience: "Career Changers, Marketing Professionals",
    accreditation: "Social Media Marketing Certification",
    overview: "Become a social media expert. Learn to run campaigns, grow audiences, and measure impact across all major platforms. Master content creation, paid advertising, and analytics.",
    whatYouLearn: [
      "Social media strategy and content planning",
      "Professional copywriting for each platform",
      "Graphics and video creation with Canva and CapCut",
      "Paid advertising on Facebook, Instagram, and TikTok",
      "Community management and brand voice",
      "Analytics, KPIs, and ROI tracking"
    ],
    outcomes: [
      "Launch and manage professional social campaigns",
      "Create engaging content that converts",
      "Master paid social advertising",
      "Career transition to Social Media Manager roles"
    ],
    emoji: "📱",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop",
    weeklyOutline: [
      { week: 1, title: "Intro to Social Media Strategy, Platforms & Algorithms" },
      { week: 1, title: "Build a simple strategy doc for a hypothetical brand", isProject: true },
      { week: 2, title: "Content Strategy & Calendar Planning" },
      { week: 2, title: "Create a 1-week content calendar", isProject: true },
      { week: 3, title: "Copywriting for Social Media" },
      { week: 3, title: "Write 5 platform-specific posts", isProject: true },
      { week: 4, title: "Graphics & Video Creation (Canva, CapCut)" },
      { week: 4, title: "Create a branded post (image + video)", isProject: true },
      { week: 5, title: "Paid Ads Overview (Facebook/Instagram)" },
      { week: 5, title: "Build a mock ad campaign", isProject: true },
      { week: 6, title: "TikTok & Reels Strategy" },
      { week: 6, title: "Create a short-form video concept", isProject: true },
      { week: 7, title: "Community Management, Engagement & Brand Voice" },
      { week: 7, title: "Draft response templates for common scenarios", isProject: true },
      { week: 8, title: "Analytics & KPIs (Reach, Engagement, CTR)" },
      { week: 8, title: "Analyze a sample campaign report", isProject: true },
      { week: 9, title: "Influencer Marketing Basics" },
      { week: 9, title: "Propose an influencer partnership plan", isProject: true },
      { week: 10, title: "Social Media Automation Tools (Buffer, Hootsuite)" },
      { week: 10, title: "Schedule a week's worth of posts", isProject: true },
      { week: 11, title: "Social Listening & Crisis Management" },
      { week: 11, title: "Write a crisis response plan", isProject: true },
      { week: 12, title: "Competitive Analysis" },
      { week: 12, title: "Research and analyze competitors' strategies", isProject: true },
      { week: 13, title: "Introduction to SEO for Social" },
      { week: 13, title: "Optimize posts for discovery", isProject: true },
      { week: 14, title: "Storytelling for Brands" },
      { week: 14, title: "Create a mini-brand story campaign", isProject: true },
      { week: 15, title: "Social Media Funnel & Lead Generation" },
      { week: 15, title: "Build a lead-gen campaign flow", isProject: true },
      { week: 16, title: "Capstone: Full campaign for a brand" },
      { week: 17, title: "Capstone: Full campaign for a brand" },
      { week: 18, title: "Capstone: Full campaign for a brand" },
      { week: 19, title: "Capstone: Strategy doc, posts, ads, report", isProject: true },
      { week: 20, title: "Final Presentations & Career Coaching" },
      { week: 20, title: "Present strategy and performance report", isProject: true }
    ],
    certification: "Social Media Marketing Professional Certificate"
  },
  "Full-Stack Web Development (MERN)": {
    title: "Full-Stack Web Development MERN (5-Month Evening)",
    duration: "5 Months (Mon-Fri, 1 Hour)",
    audience: "Career Changers, Aspiring Developers",
    accreditation: "Full-Stack Development Certification",
    overview: "Build modern web applications from scratch. Master the MERN stack (MongoDB, Express, React, Node.js) and learn to create full-featured web applications. Perfect for career changers entering web development.",
    whatYouLearn: [
      "HTML5, CSS3, and responsive design",
      "JavaScript fundamentals and ES6+",
      "React.js for building interactive UIs",
      "Node.js and Express for backend APIs",
      "MongoDB database design and operations",
      "Full-stack deployment and best practices"
    ],
    outcomes: [
      "Build and deploy full-stack web applications",
      "Create responsive, modern user interfaces",
      "Develop RESTful APIs and databases",
      "Career transition to Web Developer roles"
    ],
    emoji: "💻",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop",
    weeklyOutline: [
      { week: 1, title: "HTML5, CSS3 Basics" },
      { week: 1, title: "Build a personal webpage", isProject: true },
      { week: 2, title: "Responsive Design & Flex/Grid" },
      { week: 2, title: "Build a responsive landing page", isProject: true },
      { week: 3, title: "JavaScript Basics (variables, loops, functions)" },
      { week: 3, title: "Interactive page with DOM manipulation", isProject: true },
      { week: 4, title: "Events, Forms & Validation" },
      { week: 4, title: "Build a signup form with validation", isProject: true },
      { week: 5, title: "Intro to Git & GitHub" },
      { week: 5, title: "Push your project to GitHub", isProject: true },
      { week: 6, title: "React Basics (Components, Props, JSX)" },
      { week: 6, title: "Build a component-based UI", isProject: true },
      { week: 7, title: "React State, Events, Hooks" },
      { week: 7, title: "Build a counter/todo app", isProject: true },
      { week: 8, title: "APIs & Fetch" },
      { week: 8, title: "Display data from an API", isProject: true },
      { week: 9, title: "React Router & SPA Concepts" },
      { week: 9, title: "Build a multi-page app", isProject: true },
      { week: 10, title: "Node.js & Express Basics" },
      { week: 10, title: "Create a simple REST API", isProject: true },
      { week: 11, title: "MongoDB & CRUD Operations" },
      { week: 11, title: "Store and retrieve data", isProject: true },
      { week: 12, title: "Authentication & Authorization" },
      { week: 12, title: "Add login/register feature", isProject: true },
      { week: 13, title: "Deployment (Vercel, Render, Netlify)" },
      { week: 13, title: "Deploy a live app", isProject: true },
      { week: 14, title: "Testing Basics (Jest)" },
      { week: 14, title: "Write simple unit tests", isProject: true },
      { week: 15, title: "Performance & Security Best Practices" },
      { week: 15, title: "Optimize app performance", isProject: true },
      { week: 16, title: "Capstone: Full-stack web app" },
      { week: 17, title: "Capstone: Full-stack web app" },
      { week: 18, title: "Capstone: Full-stack web app" },
      { week: 19, title: "Capstone: Fully functional deployed project", isProject: true },
      { week: 20, title: "Final Demo & Portfolio Setup" },
      { week: 20, title: "Present and publish project", isProject: true }
    ],
    certification: "Full-Stack Web Development Professional Certificate"
  },
  "Digital Marketing & SEO": {
    title: "Digital Marketing & SEO (5-Month Evening)",
    duration: "5 Months (Mon-Fri, 1 Hour)",
    audience: "Career Changers, Marketing Professionals",
    accreditation: "Google Digital Marketing & SEO Certification",
    overview: "Master the digital marketing landscape. Learn SEO, PPC, email marketing, analytics, and conversion optimization. Build complete multi-channel marketing campaigns.",
    whatYouLearn: [
      "SEO fundamentals and keyword research",
      "Google Ads and PPC campaign management",
      "Content marketing and strategy",
      "Email marketing and automation",
      "Google Analytics and data-driven decisions",
      "Conversion rate optimization techniques"
    ],
    outcomes: [
      "Launch and manage digital marketing campaigns",
      "Drive organic traffic through SEO",
      "Create ROI-positive paid campaigns",
      "Career transition to Digital Marketing roles"
    ],
    emoji: "🚀",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    weeklyOutline: [
      { week: 1, title: "Intro to Digital Marketing & Buyer Journey" },
      { week: 1, title: "Build a basic marketing persona", isProject: true },
      { week: 2, title: "Content Marketing Basics" },
      { week: 2, title: "Create a content plan", isProject: true },
      { week: 3, title: "SEO Fundamentals (on-page, off-page)" },
      { week: 3, title: "Optimize a blog post", isProject: true },
      { week: 4, title: "Keyword Research & Tools (Ahrefs, SEMrush)" },
      { week: 4, title: "Build a keyword strategy", isProject: true },
      { week: 5, title: "Google Analytics & Search Console" },
      { week: 5, title: "Analyze site performance", isProject: true },
      { week: 6, title: "PPC Campaign Basics (Google Ads)" },
      { week: 6, title: "Build a sample search campaign", isProject: true },
      { week: 7, title: "Social Media Ads & Targeting" },
      { week: 7, title: "Design an ad set", isProject: true },
      { week: 8, title: "Email Marketing & Automation" },
      { week: 8, title: "Create an email sequence", isProject: true },
      { week: 9, title: "A/B Testing & Conversion Optimization" },
      { week: 9, title: "Design a split test plan", isProject: true },
      { week: 10, title: "Influencer & Affiliate Marketing" },
      { week: 10, title: "Propose a collaboration", isProject: true },
      { week: 11, title: "E-commerce Marketing" },
      { week: 11, title: "Create product launch strategy", isProject: true },
      { week: 12, title: "Local SEO & Google Business Profile" },
      { week: 12, title: "Optimize a local listing", isProject: true },
      { week: 13, title: "Analytics Deep Dive & Reporting" },
      { week: 13, title: "Create a KPI dashboard", isProject: true },
      { week: 14, title: "Budgeting & ROI Tracking" },
      { week: 14, title: "Build a campaign budget", isProject: true },
      { week: 15, title: "Digital PR & Brand Awareness" },
      { week: 15, title: "Write a press release", isProject: true },
      { week: 16, title: "Capstone: Multi-channel campaign" },
      { week: 17, title: "Capstone: Multi-channel campaign" },
      { week: 18, title: "Capstone: Multi-channel campaign" },
      { week: 19, title: "Capstone: Full strategy doc + ad mockups", isProject: true },
      { week: 20, title: "Final Pitch & Career Coaching" },
      { week: 20, title: "Present strategy to panel", isProject: true }
    ],
    certification: "Google Digital Marketing & E-Commerce Certificate"
  },
  "Project Management (Agile & Scrum)": {
    title: "Project Management - Agile & Scrum (5-Month Evening)",
    duration: "5 Months (Mon-Fri, 1 Hour)",
    audience: "Career Changers, Team Leaders",
    accreditation: "PMP & Scrum Master Certification Track",
    overview: "Lead projects with confidence. Master Agile methodologies, Scrum ceremonies, and project management best practices. Learn to manage teams and deliver projects on time and within budget.",
    whatYouLearn: [
      "Project management fundamentals and lifecycle",
      "Agile and Scrum methodologies",
      "Risk management and mitigation strategies",
      "Stakeholder communication and management",
      "Project management tools (Jira, Trello, MS Project)",
      "Team leadership and conflict resolution"
    ],
    outcomes: [
      "Prepare for PMP and Scrum Master certifications",
      "Lead Agile projects and teams",
      "Manage complex projects from start to finish",
      "Career transition to Project Manager roles"
    ],
    emoji: "📋",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    weeklyOutline: [
      { week: 1, title: "PM Basics, Life Cycle, Roles" },
      { week: 1, title: "Build a project charter", isProject: true },
      { week: 2, title: "Scope, Schedule, Budget Planning" },
      { week: 2, title: "Create a Gantt chart", isProject: true },
      { week: 3, title: "Agile Fundamentals & Scrum Ceremonies" },
      { week: 3, title: "Run a mock sprint", isProject: true },
      { week: 4, title: "Kanban & Lean Principles" },
      { week: 4, title: "Build a Kanban board", isProject: true },
      { week: 5, title: "Risk Management & Mitigation" },
      { week: 5, title: "Create risk register", isProject: true },
      { week: 6, title: "Stakeholder Analysis & Communication" },
      { week: 6, title: "Build communication plan", isProject: true },
      { week: 7, title: "Tools: Jira, Trello, MS Project" },
      { week: 7, title: "Manage a project board", isProject: true },
      { week: 8, title: "Quality Management & Testing" },
      { week: 8, title: "Create quality checklist", isProject: true },
      { week: 9, title: "Change Management & Documentation" },
      { week: 9, title: "Build change request form", isProject: true },
      { week: 10, title: "Resource Allocation & Team Building" },
      { week: 10, title: "Create resource plan", isProject: true },
      { week: 11, title: "Conflict Resolution & Soft Skills" },
      { week: 11, title: "Draft resolution scenarios", isProject: true },
      { week: 12, title: "Procurement & Vendor Management" },
      { week: 12, title: "Create RFP document", isProject: true },
      { week: 13, title: "Agile Estimation (Story Points)" },
      { week: 13, title: "Estimate backlog items", isProject: true },
      { week: 14, title: "Reporting & Metrics (Velocity, Burndown)" },
      { week: 14, title: "Generate sample reports", isProject: true },
      { week: 15, title: "Project Closure & Lessons Learned" },
      { week: 15, title: "Create closure report", isProject: true },
      { week: 16, title: "Capstone: Manage a mock project" },
      { week: 17, title: "Capstone: Manage a mock project" },
      { week: 18, title: "Capstone: Manage a mock project" },
      { week: 19, title: "Capstone: Deliver full project plan & reports", isProject: true },
      { week: 20, title: "Final Presentation & Career Guidance" },
      { week: 20, title: "Present project outcome", isProject: true }
    ],
    certification: "PMP Exam Prep & Scrum Master Certification Track"
  },
  "Business Analysis & Process Improvement": {
    title: "Business Analysis & Process Improvement (5-Month Evening)",
    duration: "5 Months (Mon-Fri, 1 Hour)",
    audience: "Career Changers, Business Professionals",
    accreditation: "Business Analysis Professional Certification",
    overview: "Bridge business and technology. Learn requirements gathering, process mapping, data modeling, and business optimization. Master tools and techniques to improve organizational efficiency.",
    whatYouLearn: [
      "Business analysis fundamentals and SDLC",
      "Requirements gathering techniques and documentation",
      "Process mapping and flowchart creation",
      "Data modeling and ER diagrams",
      "Lean and Six Sigma methodologies",
      "Stakeholder management and communication"
    ],
    outcomes: [
      "Prepare for Business Analysis certifications",
      "Lead process improvement initiatives",
      "Bridge communication between business and IT",
      "Career transition to Business Analyst roles"
    ],
    emoji: "📈",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&h=400&fit=crop",
    weeklyOutline: [
      { week: 1, title: "Intro to BA Role & SDLC" },
      { week: 1, title: "Create a stakeholder map", isProject: true },
      { week: 2, title: "Requirements Gathering Techniques" },
      { week: 2, title: "Conduct mock stakeholder interview", isProject: true },
      { week: 3, title: "Use Cases & User Stories" },
      { week: 3, title: "Write user stories", isProject: true },
      { week: 4, title: "Process Mapping & Flowcharts" },
      { week: 4, title: "Build a process diagram", isProject: true },
      { week: 5, title: "Data Modeling & ER Diagrams" },
      { week: 5, title: "Design a data model", isProject: true },
      { week: 6, title: "Functional vs. Non-Functional Requirements" },
      { week: 6, title: "Write requirement specs", isProject: true },
      { week: 7, title: "Tools: Lucidchart, Draw.io, Excel" },
      { week: 7, title: "Produce diagrams in tools", isProject: true },
      { week: 8, title: "Wireframes & Prototypes" },
      { week: 8, title: "Create low-fidelity mockups", isProject: true },
      { week: 9, title: "Gap Analysis & Root Cause Analysis" },
      { week: 9, title: "Perform root cause analysis", isProject: true },
      { week: 10, title: "Lean & Six Sigma Basics" },
      { week: 10, title: "Suggest process improvements", isProject: true },
      { week: 11, title: "Cost-Benefit & Feasibility Analysis" },
      { week: 11, title: "Build a business case", isProject: true },
      { week: 12, title: "Testing & UAT Planning" },
      { week: 12, title: "Write a UAT plan", isProject: true },
      { week: 13, title: "Documentation & BRD" },
      { week: 13, title: "Create BRD for a sample project", isProject: true },
      { week: 14, title: "Communication & Presentation Skills" },
      { week: 14, title: "Present requirements to a mock team", isProject: true },
      { week: 15, title: "Agile BA (Backlog Grooming, Refinement)" },
      { week: 15, title: "Facilitate mock backlog grooming", isProject: true },
      { week: 16, title: "Capstone: Analyze a business case end-to-end" },
      { week: 17, title: "Capstone: Analyze a business case end-to-end" },
      { week: 18, title: "Capstone: Analyze a business case end-to-end" },
      { week: 19, title: "Capstone: Deliver BRD, process maps, recommendations", isProject: true },
      { week: 20, title: "Final Presentation & Career Prep" },
      { week: 20, title: "Present analysis to panel", isProject: true }
    ],
    certification: "Business Analysis Professional Certification (IIBA)"
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
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 mb-4">
            {course.emoji} {course.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-8">
          {/* Course Image */}
          <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-100">
            <img 
              src={course.image} 
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>

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

          {/* Weekly Course Outline */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-emerald-500" />
              <h3 className="text-lg font-semibold text-gray-900">Weekly Course Outline</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {course.weeklyOutline.map((week, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg border ${
                    week.isProject 
                      ? 'bg-emerald-50 border-emerald-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {week.isProject ? (
                      <BookOpen className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-medium flex-shrink-0">
                        {week.week}
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          Week {week.week}
                        </span>
                        {week.isProject && (
                          <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700 border-emerald-200">
                            Project
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-700">{week.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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

          {/* Certification */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-5 w-5 text-emerald-600" />
              <h3 className="font-semibold text-emerald-900">Certification</h3>
            </div>
            <p className="text-emerald-800">{course.certification}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
