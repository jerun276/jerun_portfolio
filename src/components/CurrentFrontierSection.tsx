'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sectionContent } from '@/data';
import Tilt from 'react-parallax-tilt';

gsap.registerPlugin(ScrollTrigger);

export default function CurrentFrontierSection() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);
  const headerInnerRef = useRef<HTMLDivElement>(null);

  const frontierData = sectionContent.currentFrontier;
  const tabs = ['Current Role', 'Tech Stack', 'Focus Areas'];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([headerRef.current, tabsRef.current, contentRef.current], {
        opacity: 0,
        y: 80
      });

      // Orbs: use GSAP for parallax instead of scroll state
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
            toggleActions: "play none none reverse"
          }
        });

        // Parallax via ScrollTrigger scrub (no setState)
        orbs.forEach((orb, index) => {
          gsap.to(orb, {
            yPercent: -(10 + index * 15),
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          });

          // Floating animation
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

      // Header animation
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 100, rotationX: -20, transformPerspective: 1000 },
        {
          opacity: 1, y: 0, rotationX: 0,
          duration: 1.5, ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Tabs animation
      gsap.to(tabsRef.current, {
        opacity: 1, y: 0, duration: 1, ease: "power2.out",
        scrollTrigger: {
          trigger: tabsRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      if (tabsRef.current) {
        const tabButtons = tabsRef.current.querySelectorAll('.tab-button');
        gsap.fromTo(tabButtons,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.6, stagger: 0.1, ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: tabsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Content area
      gsap.to(contentRef.current, {
        opacity: 1, y: 0, duration: 1.2, ease: "power2.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Initial content cards
      setTimeout(() => {
        const cards = contentRef.current?.querySelectorAll('.content-card');
        if (cards) {
          gsap.fromTo(cards,
            { opacity: 0, y: 50, rotationY: -10, scale: 0.95 },
            { opacity: 1, y: 0, rotationY: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.7)" }
          );
        }
      }, 100);

    }, sectionRef);

    // Mouse-follow 3D on header (using quickTo, no setState)
    let handleMouseMove: ((e: MouseEvent) => void) | null = null;
    if (headerInnerRef.current) {
      const xTo = gsap.quickTo(headerInnerRef.current, "rotateY", { duration: 0.6, ease: "power2.out" });
      const yTo = gsap.quickTo(headerInnerRef.current, "rotateX", { duration: 0.6, ease: "power2.out" });

      handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        xTo(x * 3);
        yTo(-y * 3);
      };

      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      ctx.revert();
      if (handleMouseMove) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Animate content cards on tab change
  useEffect(() => {
    const cards = contentRef.current?.querySelectorAll('.content-card');
    if (cards && cards.length > 0) {
      gsap.fromTo(cards,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [activeTab]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 overflow-hidden"
    >
      {/* Floating Background Orbs */}
      <div ref={orbsRef} className="absolute inset-0 overflow-hidden">
        <div className="floating-orb absolute top-1/4 left-1/4 w-96 h-96 bg-linear-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
        <div className="floating-orb absolute bottom-1/4 right-1/4 w-80 h-80 bg-linear-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
        <div className="floating-orb absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-linear-to-r from-green-500/20 to-teal-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern - parallax via ScrollTrigger */}
      <div className="absolute inset-0 opacity-10 grid-pattern">
        <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-size-[50px_50px]"></div>
      </div>

      <div className="relative z-10 px-5 md:px-20 py-20">

        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-20">
          <div ref={headerInnerRef} style={{ perspective: 1000 }}>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Current <span className="bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Frontier</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {frontierData.description}
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div ref={tabsRef} className="flex justify-center mb-16 px-4">
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-2 w-full max-w-2xl">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`tab-button px-4 sm:px-6 py-3 rounded-xl transition-all duration-300 text-sm sm:text-base flex-1 ${
                    activeTab === index
                      ? 'bg-linear-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
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
                    <div>
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {frontierData.currentRole.title}
                      </h3>
                      <p className="text-xl text-purple-400 mb-4">{frontierData.currentRole.company}</p>
                      <p className="text-gray-400 mb-6">{frontierData.currentRole.period}</p>
                      <p className="text-gray-300 leading-relaxed mb-8">
                        {frontierData.currentRole.description}
                      </p>
                      <div className="mb-8">
                        <h4 className="text-xl font-semibold text-white mb-4">Key Projects</h4>
                        <div className="space-y-3">
                          {frontierData.currentRole.keyProjects.map((project, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-linear-to-r from-purple-400 to-pink-400 rounded-full"></div>
                              <span className="text-gray-300">{project}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h4 className="text-xl font-semibold text-white mb-6">Impact & Achievements</h4>
                      {frontierData.currentRole.impact.map((item, index) => (
                        <div
                          key={index}
                          className="bg-linear-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-400/20"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-8 h-8 bg-linear-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center shrink-0">
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
                  const progressValues = [85, 80, 90, 80, 80, 90, 80, 70, 80, 80, 85, 90, 84, 86, 94];
                  const progress = progressValues[index % progressValues.length];

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
                      <div className="content-card bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-center hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-400/20 transition-all duration-300 group">
                        <div className="w-16 h-16 bg-linear-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white font-bold text-lg">{tech.slice(0, 2).toUpperCase()}</span>
                        </div>
                        <h4 className="text-white font-semibold mb-3 group-hover:text-purple-300 transition-colors duration-300">{tech}</h4>
                        <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                          <div
                            className="bg-linear-to-r from-purple-400 to-pink-400 h-2 rounded-full"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
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
                    <div className="content-card bg-gray-900/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 h-64 flex flex-col justify-center items-center text-center hover:border-cyan-400/50 transition-all duration-300">
                      <div className="w-20 h-20 bg-linear-to-r from-cyan-400 to-blue-400 rounded-2xl flex items-center justify-center mb-6">
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
          <p className="text-xl text-gray-300 mb-8">Interested in collaborating on cutting-edge projects?</p>
          <div className="w-8 h-12 border-2 border-cyan-400 rounded-full flex justify-center items-start pt-2 mx-auto">
            <div className="w-1 h-3 bg-cyan-400 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
