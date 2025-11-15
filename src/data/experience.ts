// Work Experience & Education Data
export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'work' | 'education' | 'freelance' | 'volunteer';
  startDate: string;
  endDate?: string; // undefined means current
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  skills: string[];
  website?: string;
}

export const experiences: Experience[] = [
  {
    id: "senior-fullstack-dev",
    title: "Senior Full Stack Developer",
    company: "TechFlow Solutions",
    location: "San Francisco, CA",
    type: "work",
    startDate: "2023-08",
    current: true,
    description: "Leading the development of enterprise-grade web applications serving 100k+ users. Responsible for technical architecture, code quality, and mentoring a team of junior developers.",
    achievements: [
      "Architected scalable microservices handling 500k+ daily requests",
      "Implemented real-time features reducing user wait time by 75%",
      "Led migration to TypeScript improving code quality by 40%",
      "Mentored 4 junior developers, 3 received promotions",
      "Reduced deployment time from 45min to 8min with CI/CD optimization"
    ],
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker"],
    skills: ["Team Leadership", "System Architecture", "Performance Optimization", "Mentoring"],
    website: "https://techflowsolutions.com"
  },
  
  {
    id: "freelance-consultant",
    title: "Freelance Web Developer",
    company: "Self-Employed",
    location: "Remote",
    type: "freelance",
    startDate: "2022-06",
    endDate: "2023-07",
    current: false,
    description: "Built custom web solutions for small to medium businesses. Specialized in e-commerce platforms, business websites, and web applications with focus on performance and user experience.",
    achievements: [
      "Completed 12 successful projects with 100% client satisfaction",
      "Increased client website traffic by average of 150%",
      "Built e-commerce solutions generating $50k+ in client revenue",
      "Established repeat business with 6 long-term clients",
      "Delivered projects 20% faster than industry average"
    ],
    technologies: ["React", "Next.js", "WordPress", "Shopify", "Node.js", "MongoDB", "Stripe"],
    skills: ["Client Communication", "Project Management", "E-commerce Development"]
  },
  
  {
    id: "frontend-developer",
    title: "Junior Frontend Developer",
    company: "Digital Innovations Co.",
    location: "Austin, TX",
    type: "work",
    startDate: "2021-09",
    endDate: "2022-05",
    current: false,
    description: "Developed responsive web interfaces and collaborated with senior developers to build user-friendly applications. Focused on learning modern frontend technologies and best practices.",
    achievements: [
      "Built 15+ responsive web components used across 3 products",
      "Improved website loading speed by 30% through optimization",
      "Collaborated with design team to implement pixel-perfect UIs",
      "Completed React certification and advanced JavaScript training"
    ],
    technologies: ["React", "JavaScript", "CSS3", "HTML5", "Git", "Figma"],
    skills: ["Frontend Development", "Responsive Design", "Team Collaboration"],
    website: "https://digitalinnovations.com"
  },
  
  {
    id: "first-internship",
    title: "Software Development Intern",
    company: "StartupLab",
    location: "Remote",
    type: "work",
    startDate: "2021-06",
    endDate: "2021-08",
    current: false,
    description: "First professional software development experience in a fast-paced startup environment. Worked on frontend features and learned industry best practices for web development.",
    achievements: [
      "Developed 5 user interface components used in production",
      "Fixed 20+ bugs improving overall application stability",
      "Learned React, Git workflows, and Agile development practices",
      "Received 'Outstanding Intern' recognition from team lead"
    ],
    technologies: ["React", "JavaScript", "CSS3", "Git", "HTML5"],
    skills: ["Web Development", "Problem Solving", "Team Collaboration"]
  }
];

// Education Data
export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements: string[];
  relevantCourses: string[];
  projects?: string[];
}

export const education: Education[] = [
  {
    id: "btech-cs",
    degree: "Bachelor of Science",
    field: "Computer Science",
    institution: "California State University",
    location: "San Francisco, CA",
    startDate: "2017-09",
    endDate: "2021-05",
    gpa: "3.7/4.0",
    achievements: [
      "Dean's List for Academic Excellence (4 semesters)",
      "Winner - Annual Coding Competition 2020",
      "CS Student Association - Secretary (2019-2020)",
      "Volunteer Coding Instructor for local high school students"
    ],
    relevantCourses: [
      "Data Structures & Algorithms",
      "Web Development Fundamentals",
      "Database Management Systems",
      "Software Engineering Principles",
      "Computer Networks",
      "Human-Computer Interaction"
    ],
    projects: [
      "Student Grade Management System (Java)",
      "Personal Finance Tracker (React)",
      "Campus Food Delivery App (MERN Stack)"
    ]
  }
];

// Certifications
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
  skills: string[];
}

export const certifications: Certification[] = [
  {
    id: "aws-solutions-architect",
    name: "AWS Solutions Architect Associate",
    issuer: "Amazon Web Services",
    date: "2024-03",
    credentialId: "AWS-SAA-123456",
    url: "https://aws.amazon.com/certification/",
    skills: ["Cloud Architecture", "AWS Services", "System Design"]
  },
  {
    id: "react-advanced",
    name: "Advanced React Development",
    issuer: "Meta",
    date: "2023-11",
    skills: ["React", "Performance Optimization", "Testing"]
  }
];

// Helper functions
export const getCurrentExperiences = () => experiences.filter(exp => exp.current);
export const getWorkExperience = () => experiences.filter(exp => exp.type === 'work');
export const getFreelanceExperience = () => experiences.filter(exp => exp.type === 'freelance');
