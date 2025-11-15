'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sectionContent } from '@/data';
import Tilt from 'react-parallax-tilt';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function AscentSection() {
  const [activeProject, setActiveProject] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const ascentData = sectionContent.ascent;

  // GSAP ScrollTrigger Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([headerRef.current, timelineRef.current, projectsRef.current, achievementsRef.current, skillsRef.current, ctaRef.current], {
        opacity: 0,
        y: 80
      });

      // Header animation
      gsap.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Timeline progress bar animation
      gsap.to(timelineRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate timeline progress bar fill
      if (timelineRef.current) {
        const progressBar = timelineRef.current.querySelector('.progress-bar');
        if (progressBar) {
          gsap.fromTo(progressBar,
            { width: '0%' },
            {
              width: '100%',
              duration: 2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: timelineRef.current,
                start: "top 70%",
                end: "bottom 30%",
                scrub: 1
              }
            }
          );
        }
      }

      // Projects section animation
      gsap.to(projectsRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate project cards with stagger
      if (projectsRef.current) {
        const projectCards = projectsRef.current.querySelectorAll('.project-card');
        gsap.fromTo(projectCards,
          { 
            opacity: 0, 
            y: 60,
            rotationX: -15,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: projectsRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Achievements animation with slide from left
      gsap.fromTo(achievementsRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: achievementsRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Skills animation with slide from right
      gsap.fromTo(skillsRef.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate achievement and skill items
      if (achievementsRef.current) {
        const achievementItems = achievementsRef.current.querySelectorAll('.achievement-item');
        gsap.fromTo(achievementItems,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: achievementsRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      if (skillsRef.current) {
        const skillItems = skillsRef.current.querySelectorAll('.skill-item');
        gsap.fromTo(skillItems,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: skillsRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // CTA animation with bounce
      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-triggered animations for progress tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const inView = rect.top < windowHeight && rect.bottom > 0;
      setIsVisible(inView);
      
      // Calculate scroll progress for timeline
      const scrolled = Math.max(0, windowHeight - rect.top);
      const total = windowHeight + rect.height;
      const progress = Math.min(scrolled / total, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate projects
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % ascentData.majorProjects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [ascentData.majorProjects.length]);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-b from-black via-gray-900/50 to-black overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 px-5 md:px-20 py-20">
        
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            The <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Ascent</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {ascentData.description}
          </p>
        </div>

        {/* Timeline Progress Bar */}
        <div ref={timelineRef} className="flex justify-center mb-16">
          <div className="w-full max-w-4xl">
            <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="progress-bar absolute top-0 left-0 h-full bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 transition-all duration-1000 ease-out"
                style={{ width: `${scrollProgress * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-4 text-sm text-gray-400">
              <span>Journey Start</span>
              <span>Current Progress</span>
              <span>Peak Achievement</span>
            </div>
          </div>
        </div>

        {/* Major Projects Showcase */}
        <div ref={projectsRef} className="mb-4">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Major Projects</h3>
          
          {/* Project Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {ascentData.majorProjects.map((project, index) => (
              <Tilt
                key={index}
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                scale={activeProject === index ? 1.05 : 1.02}
                transitionSpeed={600}
                glareEnable={true}
                glareMaxOpacity={0.2}
              >
                <div 
                  className={`project-card relative bg-gray-900/60 backdrop-blur-sm border rounded-2xl p-6 h-80 cursor-pointer transition-all duration-500 ${
                    activeProject === index 
                      ? 'border-purple-400 shadow-lg shadow-purple-400/20 transform scale-105' 
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                  onClick={() => setActiveProject(index)}
                >
                  {/* Project Header */}
                  <div className="mb-4">
                    <h4 className="text-xl font-bold text-white mb-2">{project.name}</h4>
                    <p className="text-purple-400 font-medium text-sm">{project.tech}</p>
                  </div>

                  {/* Project Description */}
                  <div className="mb-6">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Impact Metric */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-3 border border-purple-400/30">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                        <span className="text-white font-semibold text-sm">{project.impact}</span>
                      </div>
                    </div>
                  </div>

                  {/* Active Indicator */}
                  {activeProject === index && (
                    <div className="absolute top-4 right-4">
                      <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              </Tilt>
            ))}
          </div>

          {/* Project Navigation */}
          <div className="flex justify-center gap-3">
            {ascentData.majorProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveProject(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeProject === index 
                    ? 'bg-purple-400 scale-125' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          
          {/* Key Achievements */}
          <div ref={achievementsRef}>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">Key Achievements</h3>
            <div className="space-y-4">
              {ascentData.achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className="achievement-item flex items-start gap-4 p-4 bg-gray-900/40 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-gray-600 transition-all duration-300"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{achievement}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Advanced Skills */}
          <div ref={skillsRef}>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">Advanced Skills</h3>
            <div className="grid grid-cols-2 gap-4">
              {ascentData.advancedSkills.map((skill, index) => (
                <div 
                  key={index}
                  className="skill-item bg-gray-900/40 backdrop-blur-sm border border-gray-700 rounded-xl p-4 text-center hover:border-purple-400/50 transition-all duration-300 hover:scale-105"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <span className="text-gray-300 font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center pt-20">
          <div ref={ctaRef}>
            <div className="w-8 h-12 border-2 border-purple-400 rounded-full flex justify-center items-start pt-2 mx-auto">
              <div className="w-1 h-3 bg-purple-400 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
