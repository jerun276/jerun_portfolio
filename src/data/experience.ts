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
    id: "unicom-tic-developer",
    title: "TIC Developer",
    company: "Unicom",
    location: "Jaffna, Northern Province, Sri Lanka",
    type: "work",
    startDate: "2025-04",
    current: true,
    description: "Developing innovative technology solutions and contributing to cutting-edge projects in telecommunications and information technology sector.",
    achievements: [
      "Contributing to enterprise-level software development projects",
      "Implementing modern development practices and methodologies",
      "Collaborating with cross-functional teams on technology initiatives",
      "Gaining hands-on experience in professional software development"
    ],
    technologies: ["Flutter", "React.js", "Node.js", "Express.js", "SQLite", "Mobile Development"],
    skills: ["Software Development", "Mobile App Development", "Team Collaboration", "Problem Solving"],
    website: "https://unicom.lk"
  },
  
  {
    id: "aiesec-member",
    title: "Member",
    company: "AIESEC in SLIIT",
    location: "Sri Lanka",
    type: "volunteer",
    startDate: "2025-02",
    current: true,
    description: "Active member of AIESEC, the world's largest youth-led organization. Participating in leadership development programs, cultural exchange initiatives, and community impact projects.",
    achievements: [
      "Participating in leadership development workshops and training",
      "Contributing to community service and social impact projects",
      "Developing cross-cultural communication and teamwork skills",
      "Networking with international students and professionals"
    ],
    technologies: ["Project Management Tools", "Communication Platforms", "Digital Marketing"],
    skills: ["Leadership", "Cross-Cultural Communication", "Project Management", "Community Service"]
  },
  
  
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
    id: "sliit-btech",
    degree: "Bachelor's Degree",
    field: "Computer Software Engineering",
    institution: "Sri Lanka Institute of Information Technology (SLIIT)",
    location: "Colombo, Sri Lanka",
    startDate: "2024-07",
    endDate: "2028-07",
    achievements: [
      "Currently pursuing degree in Computer Software Engineering",
      "Active participant in university tech communities",
      "Member of AIESEC in SLIIT chapter",
      "Published research on AI-powered smart homes with Tesla coil wireless energy"
    ],
    relevantCourses: [
      "Software Engineering Principles",
      "Data Structures & Algorithms",
      "Mobile Application Development",
      "Web Development Technologies",
      "Database Management Systems",
      "Artificial Intelligence & Machine Learning",
      "Computer Networks",
      "Human-Computer Interaction"
    ],
    projects: [
      "AI-powered Smart Home System",
      "Spark Movie Ticket Booking System",
      "School Management System"
    ]
  },
  {
    id: "icbt-diploma",
    degree: "Diploma of Education",
    field: "Information Technology",
    institution: "ICBT Campus",
    location: "Sri Lanka",
    startDate: "2023-07",
    endDate: "2024-12",
    achievements: [
      "Completed comprehensive IT education program",
      "Gained foundation in educational technology strategies",
      "Developed skills in digital learning methodologies",
      "Prepared for advanced software engineering studies"
    ],
    relevantCourses: [
      "Information Technology Fundamentals",
      "Educational Technology",
      "Digital Learning Strategies",
      "Computer Programming Basics",
      "Database Fundamentals",
      "Web Technologies Introduction"
    ]
  },
  {
    id: "jaffna-hindu-college",
    degree: "Advanced Level",
    field: "Business/Commerce, Accounting, ICT",
    institution: "Jaffna Hindu College",
    location: "Jaffna, Northern Province, Sri Lanka",
    startDate: "2020-01",
    endDate: "2022-12",
    achievements: [
      "Completed Advanced Level studies with focus on ICT",
      "Strong foundation in business and accounting principles",
      "Early exposure to information and communication technology",
      "Prepared for higher education in technology field"
    ],
    relevantCourses: [
      "Information & Communication Technology",
      "Business Studies",
      "Accounting",
      "Economics",
      "Mathematics"
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
    id: "supervised-ml",
    name: "Supervised Machine Learning: Regression and Classification",
    issuer: "Coursera/Stanford University",
    date: "2024-06",
    skills: ["Machine Learning", "Regression Analysis", "Classification Algorithms", "Python"]
  },
  {
    id: "english-fluency-b2",
    name: "English Fluency Equivalent to CEFR Level B2",
    issuer: "Language Assessment Authority",
    date: "2024-03",
    skills: ["English Communication", "Professional Writing", "Technical Documentation"]
  },
  {
    id: "career-skills-software-dev",
    name: "Introduction to Career Skills in Software Development",
    issuer: "Professional Development Institute",
    date: "2024-01",
    skills: ["Software Development", "Career Planning", "Professional Skills", "Industry Best Practices"]
  },
  {
    id: "programming-foundations",
    name: "Programming Foundations: Fundamentals",
    issuer: "LinkedIn Learning",
    date: "2023-12",
    skills: ["Programming Fundamentals", "Problem Solving", "Algorithm Design", "Code Structure"]
  },
  {
    id: "web-design-beginners",
    name: "Web Design for Beginners",
    issuer: "Online Learning Platform",
    date: "2023-10",
    skills: ["Web Design", "UI/UX Principles", "HTML/CSS", "Responsive Design"]
  },
  {
    id: "google-digital-marketing",
    name: "Digital Marketing and E-commerce Certification",
    issuer: "Google",
    date: "2024-02",
    skills: ["Digital Marketing", "E-commerce", "SEO", "Social Media Marketing", "Analytics"]
  }
];

// Helper functions
export const getCurrentExperiences = () => experiences.filter(exp => exp.current);
export const getWorkExperience = () => experiences.filter(exp => exp.type === 'work');
export const getFreelanceExperience = () => experiences.filter(exp => exp.type === 'freelance');
