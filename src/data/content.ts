// Content for different sections - Easy to update text content
export const heroContent = {
  animatedTexts: [
    "Jerun Kingston",
    "a Developer", 
    "a Designer",
    "a Creator",
    "an Innovator", 
    "a Problem Solver",
    "a Tech Enthusiast"
  ],
  
  scrollText: "Scroll to explore my journey"
};

export const sectionContent = {
  foundation: {
    title: "The Foundation",
    subtitle: "Building the groundwork for a career in technology",
    description: "My journey began with a passion for problem-solving and creating digital solutions. Through formal education and self-directed learning, I built a strong foundation in computer science principles and modern web technologies.",
    
    highlights: [
      {
        title: "Education",
        content: "Bachelor of Technology in Computer Science with focus on web technologies and software engineering principles."
      },
      {
        title: "Core Skills",
        content: "Mastered fundamental programming concepts, data structures, algorithms, and modern development practices."
      },
      {
        title: "Early Achievements", 
        content: "Academic excellence, hackathon victories, and first steps into the professional development world."
      }
    ]
  },
  
  earlyDiscoveries: {
    title: "Early Discoveries",
    subtitle: "First steps into the professional world",
    description: "The transition from academic learning to real-world application brought valuable insights and rapid growth. Each opportunity taught me new skills and shaped my approach to software development.",
    
    experiences: [
      {
        title: "First Internship",
        company: "Tech Startup Inc.",
        period: "Summer 2022",
        description: "Developed responsive web applications using React and learned the importance of clean, maintainable code in a fast-paced startup environment.",
        skills: ["React", "JavaScript", "CSS", "Git", "Agile Methodology"],
        impact: "Built features used by 1000+ users"
      },
      {
        title: "Freelance Projects", 
        company: "Various Clients",
        period: "2022-2023",
        description: "Built custom websites for small businesses, gaining experience in client communication, project management, and diverse technology stacks.",
        skills: ["WordPress", "PHP", "MySQL", "Client Relations", "Project Management"],
        impact: "Delivered 8 successful projects"
      },
      {
        title: "Open Source Contributor",
        company: "GitHub Community", 
        period: "2023",
        description: "Contributed to popular open-source projects, learning collaborative development practices and code review processes.",
        skills: ["Open Source", "Code Review", "Documentation", "Community Building"],
        impact: "20+ merged pull requests"
      }
    ]
  },
  
  ascent: {
    title: "The Ascent",
    subtitle: "Growth through challenges and leadership",
    description: "As my skills matured, I took on more complex projects and leadership responsibilities. This period was marked by significant technical growth and the development of my professional identity.",
    
    majorProjects: [
      {
        name: "E-Commerce Platform",
        tech: "Next.js, Stripe, PostgreSQL",
        impact: "Increased client sales by 150%",
        description: "Full-featured e-commerce solution with payment processing, inventory management, and analytics."
      },
      {
        name: "Real-time Chat App", 
        tech: "Socket.io, Node.js, Redis",
        impact: "10k+ active users",
        description: "Scalable chat application with real-time messaging and video call capabilities."
      },
      {
        name: "AI-Powered Dashboard",
        tech: "Python, TensorFlow, React", 
        impact: "Reduced analysis time by 80%",
        description: "Intelligent analytics dashboard with machine learning insights and data visualization."
      }
    ],
    
    achievements: [
      "Led development team of 5 engineers",
      "Architected scalable microservices handling 1M+ requests/day", 
      "Mentored 10+ junior developers",
      "Spoke at 3 international conferences",
      "Established CI/CD pipelines reducing deployment time by 80%"
    ],
    
    advancedSkills: [
      "System Architecture", "Team Leadership", "DevOps", "Cloud Computing",
      "Machine Learning", "Performance Optimization", "Security", "Agile/Scrum"
    ]
  },
  
  currentFrontier: {
    title: "Current Frontier", 
    subtitle: "Leading innovation in modern web development",
    description: "Today, I'm at the forefront of web technology, working on cutting-edge projects and pushing the boundaries of what's possible with modern development tools and practices.",
    
    currentRole: {
      title: "Senior Full Stack Developer",
      company: "Innovation Labs",
      period: "2024 - Present",
      description: "Leading the development of next-generation web applications using cutting-edge technologies. Responsible for architecture decisions, code reviews, and team leadership.",
      
      keyProjects: [
        "AI-driven user personalization system",
        "Real-time collaborative editing platform", 
        "Microservices architecture migration",
        "Performance optimization initiatives"
      ],
      
      impact: [
        "Architected systems handling 1M+ requests/day",
        "Implemented AI features improving user engagement by 40%",
        "Reduced application load time by 60%",
        "Led team of 5 developers to deliver 12 major features"
      ]
    },
    
    currentTech: [
      "Next.js 14", "React 18", "TypeScript", "Node.js", "Python",
      "GraphQL", "PostgreSQL", "MongoDB", "Redis", "Docker", 
      "Kubernetes", "AWS", "Vercel", "Supabase", "OpenAI API"
    ],
    
    focus: [
      "AI Integration", "Performance Optimization", "Developer Experience",
      "Team Leadership", "Scalable Architecture", "Modern DevOps"
    ]
  },
  
  connect: {
    title: "Let's Connect",
    subtitle: "Ready to build something amazing together",
    description: "I'm always excited to discuss new opportunities, innovative projects, or just have a conversation about technology and development.",
    
    cta: "Whether you're looking for a developer, consultant, or collaborator, I'd love to hear from you!",
    
    contactMethods: [
      {
        type: "email",
        label: "Email",
        value: "jerun@example.com",
        url: "mailto:jerun@example.com"
      },
      {
        type: "phone", 
        label: "Phone",
        value: "+1 (555) 123-4567",
        url: "tel:+15551234567"
      },
      {
        type: "location",
        label: "Location", 
        value: "San Francisco, CA",
        url: "https://maps.google.com/?q=San+Francisco,+CA"
      }
    ],
    
    footer: "© 2024 Jerun Kingston. Built with Next.js & GSAP."
  }
};

// Testimonials (if you want to add them later)
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating?: number;
}

export const testimonials: Testimonial[] = [
  // Add testimonials here when you get them
];

// Blog posts (if you want to add a blog section later)
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  publishDate: string;
  tags: string[];
  readTime: string;
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  // Add blog posts here if you want to include them
];
