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

      // Animate timeline progress bar fill with smooth scrub
      if (timelineRef.current) {
        const progressBar = timelineRef.current.querySelector('.progress-bar');
        if (progressBar) {
          gsap.fromTo(progressBar,
            { width: '0%' },
            {
              width: '100%',
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
                onUpdate: (self) => {
                  // Update progress bar smoothly based on scroll progress
                  const progress = self.progress;
                  gsap.set(progressBar, { width: `${progress * 100}%` });
                }
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
                className="progress-bar absolute top-0 left-0 h-full bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400"
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
                  className={`project-card relative bg-gray-900/60 backdrop-blur-sm border rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
                    activeProject === index 
                      ? 'border-purple-400 shadow-lg shadow-purple-400/20 transform scale-105' 
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                  onClick={() => setActiveProject(index)}
                >
                  {/* Project Image */}
                  <div className="relative h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to gradient background if image fails to load
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-6xl text-white/20">
                          {project.name.charAt(0)}
                        </div>
                      </div>
                    )}
                    
                    {/* Project Links Overlay */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors duration-300"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </a>
                      )}
                      {/* {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors duration-300"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )} */}
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    {/* Project Header */}
                    <div className="mb-4">
                      <h4 className="text-xl font-bold text-white mb-2">{project.name}</h4>
                      <p className="text-purple-400 font-medium text-sm">{project.tech}</p>
                    </div>

                    {/* Project Description */}
                    <div className="mb-4">
                      <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Impact Metric */}
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-3 border border-purple-400/30">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                        <span className="text-white font-semibold text-sm">{project.impact}</span>
                      </div>
                    </div>
                  </div>

                  {/* Active Indicator */}
                  {activeProject === index && (
                    <div className="absolute top-4 left-4">
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
