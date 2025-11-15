// Projects Data - Easy to update when you add new projects
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: 'web' | 'mobile' | 'fullstack' | 'frontend' | 'backend' | 'other';
  status: 'completed' | 'in-progress' | 'planned';
  featured: boolean;
  
  // Links
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  
  // Media
  images: string[];
  video?: string;
  
  // Metrics/Impact
  impact?: string[];
  metrics?: {
    users?: string;
    performance?: string;
    growth?: string;
    other?: string;
  };
  
  // Timeline
  startDate: string;
  endDate?: string;
  duration?: string;
  
  // Team
  teamSize?: number;
  role?: string;
}

export const projects: Project[] = [
  {
    id: "foodie-delivery-app",
    title: "Foodie - Food Delivery Platform",
    description: "Full-stack food delivery application with real-time order tracking and payment integration",
    longDescription: "Developed a comprehensive food delivery platform similar to DoorDash. Features include restaurant listings, real-time order tracking, secure payment processing, and an admin dashboard for restaurant management.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Stripe", "Google Maps API"],
    category: "fullstack",
    status: "completed",
    featured: true,
    
    liveUrl: "https://foodie-delivery-demo.netlify.app",
    githubUrl: "https://github.com/jerunkingston/foodie-delivery",
    
    images: ["/projects/foodie/hero.jpg", "/projects/foodie/dashboard.jpg"],
    
    impact: [
      "Served 500+ test orders during demo phase",
      "Achieved 2-second average page load time",
      "Implemented real-time tracking reducing customer inquiries by 60%"
    ],
    
    metrics: {
      users: "200+ demo users",
      performance: "95 Lighthouse score",
      growth: "Featured on university showcase"
    },
    
    startDate: "2023-03",
    endDate: "2023-08",
    duration: "5 months",
    teamSize: 1,
    role: "Solo Developer"
  },
  
  {
    id: "task-manager-pro",
    title: "TaskManager Pro",
    description: "Collaborative task management application with team features and real-time updates",
    longDescription: "Built a comprehensive task management tool for teams with features like project boards, real-time collaboration, file attachments, and progress tracking. Includes user authentication, role-based permissions, and email notifications.",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "Tailwind CSS"],
    category: "fullstack",
    status: "completed",
    featured: true,
    
    liveUrl: "https://taskmanager-pro-demo.vercel.app",
    githubUrl: "https://github.com/jerunkingston/taskmanager-pro",
    
    images: ["/projects/taskmanager/dashboard.jpg", "/projects/taskmanager/board.jpg"],
    
    impact: [
      "Used by 3 local businesses for project management",
      "Improved team productivity by 40% in beta testing",
      "Zero security incidents with 500+ user accounts"
    ],
    
    metrics: {
      users: "50+ active teams",
      performance: "96 Lighthouse score",
      growth: "Featured in local tech meetup"
    },
    
    startDate: "2023-09",
    endDate: "2024-01",
    duration: "4 months",
    teamSize: 1,
    role: "Solo Developer"
  },
  
  {
    id: "weather-app",
    title: "WeatherWise - Weather App",
    description: "Beautiful weather application with location-based forecasts and interactive maps",
    longDescription: "Developed a modern weather application that provides detailed weather forecasts, interactive maps, and location-based alerts. Features include 7-day forecasts, weather maps, favorite locations, and push notifications for severe weather.",
    technologies: ["React", "OpenWeather API", "Mapbox", "Chart.js", "PWA", "CSS3"],
    category: "frontend",
    status: "completed",
    featured: false,
    
    liveUrl: "https://weatherwise-app.netlify.app",
    githubUrl: "https://github.com/jerunkingston/weather-app",
    
    images: ["/projects/weather/main.jpg", "/projects/weather/map.jpg"],
    
    impact: [
      "1000+ downloads in first month",
      "4.8/5 rating from beta users",
      "Featured on university project showcase"
    ],
    
    metrics: {
      users: "1000+ downloads",
      performance: "94 Lighthouse score"
    },
    
    startDate: "2022-11",
    endDate: "2023-01",
    duration: "3 months",
    teamSize: 1,
    role: "Frontend Developer"
  },
  
  {
    id: "portfolio-website",
    title: "Animated Portfolio Website",
    description: "Interactive portfolio with advanced animations and scroll-based storytelling",
    technologies: ["Next.js", "GSAP", "Tailwind CSS", "TypeScript"],
    category: "frontend",
    status: "in-progress",
    featured: false,
    
    githubUrl: "https://github.com/jerunkingston/portfolio-v2",
    
    images: ["/projects/portfolio/hero.jpg"],
    
    startDate: "2024-11",
    duration: "2 weeks",
    teamSize: 1,
    role: "Solo Developer"
  }
];

// Filter functions for easy data access
export const getFeaturedProjects = () => projects.filter(p => p.featured);
export const getProjectsByCategory = (category: Project['category']) => 
  projects.filter(p => p.category === category);
export const getCompletedProjects = () => projects.filter(p => p.status === 'completed');
