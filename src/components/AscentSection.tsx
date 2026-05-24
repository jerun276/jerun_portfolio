'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sectionContent } from '@/data';
import { useGlowFollow } from '@/hooks/useGlowFollow';
import { useParallaxTilt } from '@/hooks/useParallaxTilt';

gsap.registerPlugin(ScrollTrigger);

function BentoCard({ children, className = '', span = '' }: { children: React.ReactNode; className?: string; span?: string }) {
  const tiltRef = useParallaxTilt<HTMLDivElement>(10);
  const glowRef = useGlowFollow<HTMLDivElement>();

  return (
    <div
      ref={(el) => {
        (tiltRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        (glowRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }}
      className={`${span} ${className}`}
    >
      {children}
    </div>
  );
}

export default function AscentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const ascentData = sectionContent.ascent;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Kinetic header: characters slide from varying Y offsets
      if (headerRef.current) {
        const chars = headerRef.current.querySelectorAll('.split-char');
        chars.forEach((char, i) => {
          const randomY = (Math.random() - 0.5) * 100;
          gsap.set(char, { opacity: 0, y: randomY });
        });

        gsap.to(chars, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.02,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            once: true,
          }
        });
      }

      gsap.fromTo(descRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: descRef.current, start: "top 85%", once: true }
        }
      );

      // Timeline progress bar
      if (timelineRef.current) {
        const progressBar = timelineRef.current.querySelector('.progress-bar');
        gsap.fromTo(timelineRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: timelineRef.current, start: "top 85%", once: true }
          }
        );

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
              }
            }
          );
        }
      }

      // Horizontal pinned scroll for bento grid (desktop only)
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (panelRef.current && horizontalRef.current) {
          const panelWidth = panelRef.current.scrollWidth;
          const viewportWidth = window.innerWidth;
          const scrollDistance = panelWidth - viewportWidth + 100;

          gsap.to(panelRef.current, {
            x: -scrollDistance,
            ease: "none",
            scrollTrigger: {
              trigger: horizontalRef.current,
              start: "top top",
              end: `+=${scrollDistance}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
            }
          });
        }
      });

      // Mobile: just stagger cards in
      mm.add("(max-width: 1023px)", () => {
        if (panelRef.current) {
          const cards = panelRef.current.querySelectorAll('.bento-card');
          gsap.fromTo(cards,
            { opacity: 0, y: 60, scale: 0.9 },
            {
              opacity: 1, y: 0, scale: 1,
              duration: 0.8, stagger: 0.15, ease: "back.out(1.7)",
              scrollTrigger: { trigger: panelRef.current, start: "top 80%", once: true }
            }
          );
        }
      });

      // Achievements slide from left
      gsap.fromTo(achievementsRef.current,
        { opacity: 0, x: -80 },
        {
          opacity: 1, x: 0, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: achievementsRef.current, start: "top 85%", once: true }
        }
      );

      if (achievementsRef.current) {
        const items = achievementsRef.current.querySelectorAll('.achievement-item');
        gsap.fromTo(items,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
            scrollTrigger: { trigger: achievementsRef.current, start: "top 80%", once: true }
          }
        );
      }

      // Skills slide from right
      gsap.fromTo(skillsRef.current,
        { opacity: 0, x: 80 },
        {
          opacity: 1, x: 0, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: skillsRef.current, start: "top 85%", once: true }
        }
      );

      if (skillsRef.current) {
        const items = skillsRef.current.querySelectorAll('.skill-item');
        gsap.fromTo(items,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: "back.out(1.7)",
            scrollTrigger: { trigger: skillsRef.current, start: "top 80%", once: true }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const splitTitle = (text: string, highlight: string) => {
    const parts = text.split(highlight);
    return (
      <>
        {parts[0].split('').map((char, i) => (
          <span key={`pre-${i}`} className="split-char inline-block">
            {char === ' ' ? ' ' : char}
          </span>
        ))}
        <span className="gradient-text-animated">
          {highlight.split('').map((char, i) => (
            <span key={`hl-${i}`} className="split-char inline-block">
              {char === ' ' ? ' ' : char}
            </span>
          ))}
        </span>
        {parts[1]?.split('').map((char, i) => (
          <span key={`post-${i}`} className="split-char inline-block">
            {char === ' ' ? ' ' : char}
          </span>
        ))}
      </>
    );
  };

  // Determine which projects are "featured" (first 2)
  const featuredIndices = [0, 1];

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-black via-gray-900/50 to-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 px-5 md:px-20 py-20">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 ref={headerRef} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6" aria-label="The Ascent">
            {splitTitle("The Ascent", "Ascent")}
          </h2>
          <p ref={descRef} className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {ascentData.description}
          </p>
        </div>

        {/* Timeline Progress Bar */}
        <div ref={timelineRef} className="flex justify-center mb-16">
          <div className="w-full max-w-4xl">
            <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="progress-bar absolute top-0 left-0 h-full bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400"></div>
            </div>
            <div className="flex justify-between mt-4 text-sm text-gray-400">
              <span>Journey Start</span>
              <span>Current Progress</span>
              <span>Peak Achievement</span>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Bento Grid */}
      <div ref={horizontalRef} className="relative">
        <div className="px-5 md:px-20 mb-8">
          <h3 className="text-3xl md:text-4xl font-bold text-white">Major Projects</h3>
        </div>

        {/* Desktop: horizontal scroll panel */}
        <div ref={panelRef} className="flex gap-6 px-5 md:px-20 pb-20 lg:flex-nowrap flex-wrap">
          {ascentData.majorProjects.map((project, index) => {
            const isFeatured = featuredIndices.includes(index);
            return (
              <BentoCard
                key={index}
                className={`bento-card shrink-0 bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden transition-all duration-500 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-400/20 ${
                  isFeatured ? 'w-full lg:w-[450px] lg:min-h-[420px]' : 'w-full lg:w-[350px] lg:min-h-[380px]'
                }`}
              >
                {/* Project Image */}
                <div className={`relative bg-gradient-to-br from-purple-500/20 to-pink-500/20 ${isFeatured ? 'h-56' : 'h-44'}`}>
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-6xl text-white/20">{project.name.charAt(0)}</div>
                    </div>
                  )}

                  {/* GitHub Link */}
                  {project.githubUrl && (
                    <div className="absolute top-4 right-4">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors duration-300"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="text-xl font-bold text-white mb-2">{project.name}</h4>
                    <p className="text-purple-400 font-medium text-sm">{project.tech}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">{project.description}</p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-3 border border-purple-400/30">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                      <span className="text-white font-semibold text-sm">{project.impact}</span>
                    </div>
                  </div>
                </div>
              </BentoCard>
            );
          })}
        </div>
      </div>

      {/* Achievements & Skills */}
      <div className="relative z-10 px-5 md:px-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div ref={achievementsRef}>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">Key Achievements</h3>
            <div className="space-y-4">
              {ascentData.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="achievement-item flex items-start gap-4 p-4 bg-gray-900/40 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-gray-600 transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{achievement}</p>
                </div>
              ))}
            </div>
          </div>

          <div ref={skillsRef}>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">Advanced Skills</h3>
            <div className="grid grid-cols-2 gap-4">
              {ascentData.advancedSkills.map((skill, index) => (
                <div
                  key={index}
                  className="skill-item bg-gray-900/40 backdrop-blur-sm border border-gray-700 rounded-xl p-4 text-center hover:border-purple-400/50 transition-all duration-300 hover:scale-105"
                >
                  <span className="text-gray-300 font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
