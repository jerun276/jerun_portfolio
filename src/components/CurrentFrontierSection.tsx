'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sectionContent } from '@/data';
import Tilt from 'react-parallax-tilt';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function CurrentFrontierSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);
  
  const frontierData = sectionContent.currentFrontier;
  const tabs = ['Current Role', 'Tech Stack', 'Focus Areas'];

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if section is in view
      const inView = rect.top < windowHeight && rect.bottom > 0;
      setIsVisible(inView);
      
      // Calculate scroll offset for parallax
      if (inView) {
        const scrolled = window.scrollY;
        setScrollY(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse tracking for 3D effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // GSAP ScrollTrigger Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([headerRef.current, tabsRef.current, contentRef.current], {
        opacity: 0,
        y: 80
      });

      // Animate floating orbs
      if (orbsRef.current) {
        const orbs = orbsRef.current.querySelectorAll('.floating-orb');
        gsap.set(orbs, { opacity: 0, scale: 0.5 });
        
        gsap.to(orbs, {
          opacity: 1,
          scale: 1,
          duration: 2,
          stagger: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        });

        // Continuous floating animation for orbs
        orbs.forEach((orb, index) => {
          gsap.to(orb, {
            y: -20,
            duration: 3 + index * 0.5,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1
          });
          
          gsap.to(orb, {
            x: 15,
            duration: 4 + index * 0.3,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 0.2
          });
        });
      }

      // Header animation with 3D perspective
      gsap.fromTo(headerRef.current,
        { 
          opacity: 0, 
          y: 100,
          rotationX: -20,
          transformPerspective: 1000
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Tabs animation with stagger
      gsap.to(tabsRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: tabsRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate individual tab buttons
      if (tabsRef.current) {
        const tabButtons = tabsRef.current.querySelectorAll('.tab-button');
        gsap.fromTo(tabButtons,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: tabsRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Content area animation
      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate content cards when they appear
      const animateContentCards = () => {
        const cards = contentRef.current?.querySelectorAll('.content-card');
        if (cards) {
          gsap.fromTo(cards,
            { 
              opacity: 0, 
              y: 50,
              rotationY: -10,
              scale: 0.95
            },
            {
              opacity: 1,
              y: 0,
              rotationY: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: "back.out(1.7)"
            }
          );
        }
      };

      // Initial animation for visible cards
      setTimeout(animateContentCards, 100);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate content cards when tab changes
  useEffect(() => {
    const cards = contentRef.current?.querySelectorAll('.content-card');
    if (cards && isVisible) {
      gsap.fromTo(cards,
        { 
          opacity: 0, 
          y: 30,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        }
      );
    }
  }, [activeTab, isVisible]);

  // Removed auto-rotate to prevent layout shifts due to different content heights

  const getParallaxStyle = (speed: number) => ({
    transform: `translateY(${scrollY * speed}px) translateZ(0)`,
  });

  const get3DTransform = (intensity: number = 1) => ({
    transform: `perspective(1000px) rotateX(${mousePosition.y * 5 * intensity}deg) rotateY(${mousePosition.x * 5 * intensity}deg) translateZ(0)`,
  });

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden"
    >
      {/* Floating Background Orbs */}
      <div ref={orbsRef} className="absolute inset-0 overflow-hidden">
        <div 
          className="floating-orb absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          style={getParallaxStyle(-0.1)}
        ></div>
        <div 
          className="floating-orb absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
          style={getParallaxStyle(-0.3)}
        ></div>
        <div 
          className="floating-orb absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-full blur-3xl"
          style={getParallaxStyle(-0.5)}
        ></div>
      </div>

      {/* Floating Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={getParallaxStyle(-0.1)}
      >
        <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10 px-5 md:px-20 py-20">
        
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-20">
          <div
            style={get3DTransform(0.2)}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Current <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Frontier</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {frontierData.description}
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div ref={tabsRef} className="flex justify-center mb-16">
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-2">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`tab-button px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === index
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div ref={contentRef} className="max-w-7xl mx-auto min-h-[600px]">
          
          {/* Current Role */}
          {activeTab === 0 && (
            <div className="min-h-[500px]">
              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                scale={1.02}
                transitionSpeed={1000}
                glareEnable={true}
                glareMaxOpacity={0.1}
              >
                <div className="content-card bg-gray-900/40 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 md:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Role Details */}
                    <div>
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {frontierData.currentRole.title}
                      </h3>
                      <p className="text-xl text-purple-400 mb-4">{frontierData.currentRole.company}</p>
                      <p className="text-gray-400 mb-6">{frontierData.currentRole.period}</p>
                      
                      <p className="text-gray-300 leading-relaxed mb-8">
                        {frontierData.currentRole.description}
                      </p>

                      {/* Key Projects */}
                      <div className="mb-8">
                        <h4 className="text-xl font-semibold text-white mb-4">Key Projects</h4>
                        <div className="space-y-3">
                          {frontierData.currentRole.keyProjects.map((project, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                              <span className="text-gray-300">{project}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Impact Metrics */}
                    <div className="space-y-6">
                      <h4 className="text-xl font-semibold text-white mb-6">Impact & Achievements</h4>
                      {frontierData.currentRole.impact.map((item, index) => (
                        <div 
                          key={index}
                          className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-400/20"
                          style={{ 
                            ...get3DTransform(0.1),
                            transitionDelay: `${index * 100}ms` 
                          }}
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-sm">{index + 1}</span>
                            </div>
                            <p className="text-gray-300 leading-relaxed">{item}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Tilt>
            </div>
          )}

          {/* Tech Stack */}
          {activeTab === 1 && (
            <div className="min-h-[500px]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {frontierData.currentTech.map((tech, index) => {
                  // Fixed progress values to prevent glitching
                  const progressValues = [85, 92, 78, 88, 95, 82, 90, 87, 93, 80, 89, 91, 84, 86, 94];
                  const progress = progressValues[index % progressValues.length];
                  
                  // Tech icons mapping
                  const getIconForTech = (techName: string) => {
                    const icons: { [key: string]: string } = {
                      'Next.js': '⚡',
                      'React': '⚛️',
                      'TypeScript': '🔷',
                      'Node.js': '🟢',
                      'Python': '🐍',
                      'GraphQL': '🔺',
                      'PostgreSQL': '🐘',
                      'MongoDB': '🍃',
                      'Redis': '🔴',
                      'Docker': '🐳',
                      'Kubernetes': '☸️',
                      'AWS': '☁️',
                      'Vercel': '▲',
                      'Supabase': '⚡',
                      'OpenAI': '🤖'
                    };
                    return icons[techName] || '💻';
                  };

                  return (
                    <Tilt
                      key={index}
                      tiltMaxAngleX={12}
                      tiltMaxAngleY={12}
                      scale={1.03}
                      transitionSpeed={600}
                      glareEnable={true}
                      glareMaxOpacity={0.15}
                    >
                      <div 
                        className="content-card bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-center hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-400/20 transition-all duration-300 group"
                        style={{ 
                          transitionDelay: `${index * 50}ms` 
                        }}
                      >
                        {/* Tech Icon */}
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white font-bold text-lg">{tech.slice(0, 2).toUpperCase()}</span>
                        </div>
                        
                        {/* Tech Name */}
                        <h4 className="text-white font-semibold mb-3 group-hover:text-purple-300 transition-colors duration-300">{tech}</h4>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                          <div 
                            className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        
                        {/* Progress Percentage */}
                        <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                          {progress}% proficiency
                        </div>
                      </div>
                    </Tilt>
                  );
                })}
              </div>
            </div>
          )}

          {/* Focus Areas */}
          {activeTab === 2 && (
            <div className="min-h-[500px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {frontierData.focus.map((focus, index) => (
                  <Tilt
                    key={index}
                    tiltMaxAngleX={10}
                    tiltMaxAngleY={10}
                    scale={1.03}
                    transitionSpeed={800}
                    glareEnable={true}
                    glareMaxOpacity={0.15}
                  >
                    <div 
                      className="content-card bg-gray-900/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 h-64 flex flex-col justify-center items-center text-center hover:border-cyan-400/50 transition-all duration-300"
                      style={{ 
                        ...get3DTransform(0.2),
                        transitionDelay: `${index * 150}ms` 
                      }}
                    >
                      <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-2xl flex items-center justify-center mb-6">
                        <span className="text-white font-bold text-2xl">{index + 1}</span>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-4">{focus}</h4>
                      <p className="text-gray-300 text-sm">
                        Pushing boundaries in {focus.toLowerCase()} to create innovative solutions.
                      </p>
                    </div>
                  </Tilt>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div 
            className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={get3DTransform(0.1)}
          >
            <p className="text-xl text-gray-300 mb-8">Interested in collaborating on cutting-edge projects?</p>
            <div className="w-8 h-12 border-2 border-cyan-400 rounded-full flex justify-center items-start pt-2 mx-auto">
              <div className="w-1 h-3 bg-cyan-400 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
