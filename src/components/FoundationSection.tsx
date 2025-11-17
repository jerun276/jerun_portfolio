'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { education, sectionContent } from '@/data';
import { techStack } from '@/data/personal';
import Tilt from 'react-parallax-tilt';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function FoundationSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const educationCardRef = useRef<HTMLDivElement>(null);
  const techCardRef = useRef<HTMLDivElement>(null);
  const toolsCardRef = useRef<HTMLDivElement>(null);
  const projectsCardRef = useRef<HTMLDivElement>(null);
  const foundationData = sectionContent.foundation;
  const myEducation = education[0]; // Get first education entry

  // GSAP ScrollTrigger Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([headerRef.current, educationCardRef.current, techCardRef.current, toolsCardRef.current, projectsCardRef.current], {
        opacity: 0,
        y: 60
      });

      // Header animation
      gsap.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Education card animation
      gsap.to(educationCardRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: educationCardRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Tech stack card animation with stagger
      gsap.to(techCardRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: techCardRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Tools card animation
      gsap.to(toolsCardRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: toolsCardRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Projects card animation
      gsap.to(projectsCardRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: projectsCardRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate tech stack items individually
      if (techCardRef.current) {
        const techItems = techCardRef.current.querySelectorAll('.tech-item');
        gsap.fromTo(techItems, 
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: techCardRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Animate tools items individually
      if (toolsCardRef.current) {
        const toolItems = toolsCardRef.current.querySelectorAll('.tech-item');
        gsap.fromTo(toolItems, 
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: toolsCardRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll visibility detection
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const inView = rect.top < windowHeight && rect.bottom > 0;
      setIsVisible(inView);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center px-5 md:px-20 pt-8 pb-32">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            The <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Foundation</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {foundationData.description}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Education Card */}
          <div ref={educationCardRef}>
            <Tilt
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              scale={1.02}
              transitionSpeed={1000}
              glareEnable={true}
              glareMaxOpacity={0.2}
              className="tilt-card"
            >
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:bg-gray-800/50 transition-all duration-300">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">{myEducation.degree}</h3>
              <p className="text-xl text-purple-400 mb-2">{myEducation.field}</p>
              <p className="text-gray-300 mb-1">{myEducation.institution}</p>
              <p className="text-gray-400 text-sm">{myEducation.location} • {myEducation.startDate} - {myEducation.endDate}</p>
              {myEducation.gpa && (
                <p className="text-gray-300 mt-2">GPA: <span className="text-green-400 font-semibold">{myEducation.gpa}</span></p>
              )}
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-3">Key Achievements</h4>
              <ul className="space-y-2">
                {myEducation.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Relevant Coursework</h4>
              <div className="flex flex-wrap gap-2">
                {myEducation.relevantCourses.map((course, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-800 border border-gray-600 rounded-full text-sm text-gray-300"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
            </div>
          </Tilt>
          </div>

          {/* Skills & Technologies */}
          <div className="space-y-8">
            
            {/* Core Technologies */}
            <div ref={techCardRef}>
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                scale={1.01}
                transitionSpeed={800}
              glareEnable={true}
              glareMaxOpacity={0.15}
            >
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:bg-gray-800/50 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-6">Core Technologies</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-3">Frontend</h4>
                  <div className="space-y-2">
                    {techStack.frontend.slice(0, 6).map((tech, index) => (
                      <div key={index} className="tech-item flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        <span className="text-gray-300">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-pink-400 mb-3">Backend</h4>
                  <div className="space-y-2">
                    {techStack.backend.slice(0, 6).map((tech, index) => (
                      <div key={index} className="tech-item flex items-center gap-2">
                        <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                        <span className="text-gray-300">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              </div>
            </Tilt>
            </div>

            {/* Tools & Development Environment */}
            <div ref={toolsCardRef}>
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                scale={1.01}
                transitionSpeed={800}
                glareEnable={true}
                glareMaxOpacity={0.15}
              >
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:bg-gray-800/50 transition-all duration-300">
                  <h3 className="text-2xl font-bold text-white mb-6">Tools & Development Environment</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {techStack.tools.map((tool, index) => (
                      <div key={index} className="tech-item flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-gray-300">{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Tilt>
            </div>

          </div>
        </div>

        {/* Academic Projects - Full Width */}
        <div ref={projectsCardRef} className="mt-12">
        {myEducation.projects && (
          <Tilt
            tiltMaxAngleX={8}
            tiltMaxAngleY={8}
            scale={1.01}
            transitionSpeed={600}
            glareEnable={true}
            glareMaxOpacity={0.1}
          >
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:bg-gray-800/50 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-6">Academic Projects</h3>
            <div className="space-y-3">
              {myEducation.projects.map((project, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                  <span className="text-gray-300">{project}</span>
                </div>
              ))}
            </div>
            </div>
          </Tilt>
        )}
        </div>
      </div>
    </section>
  );
}
