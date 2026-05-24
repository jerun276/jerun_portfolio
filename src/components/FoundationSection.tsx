'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { education, sectionContent } from '@/data';
import { techStack } from '@/data/personal';
import { useParallaxTilt } from '@/hooks/useParallaxTilt';
import { useGlowFollow } from '@/hooks/useGlowFollow';

gsap.registerPlugin(ScrollTrigger);

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const tiltRef = useParallaxTilt<HTMLDivElement>(8);
  const glowRef = useGlowFollow<HTMLDivElement>();

  return (
    <div ref={(el) => {
      (tiltRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      (glowRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    }} className={className}>
      {children}
    </div>
  );
}

export default function FoundationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const educationCardRef = useRef<HTMLDivElement>(null);
  const techCardRef = useRef<HTMLDivElement>(null);
  const toolsCardRef = useRef<HTMLDivElement>(null);
  const projectsCardRef = useRef<HTMLDivElement>(null);
  const foundationData = sectionContent.foundation;
  const myEducation = education[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Kinetic header: characters fade up with slight rotation
      if (headerRef.current) {
        const chars = headerRef.current.querySelectorAll('.split-char');
        gsap.set(chars, { opacity: 0, y: 30, rotateZ: 5 });

        gsap.to(chars, {
          opacity: 1,
          y: 0,
          rotateZ: 0,
          duration: 0.6,
          stagger: 0.03,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            once: true,
          }
        });
      }

      // Description fade
      gsap.fromTo(descRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: descRef.current, start: "top 85%", once: true }
        }
      );

      // Cards stagger
      const cards = [educationCardRef.current, techCardRef.current, toolsCardRef.current, projectsCardRef.current];
      gsap.set(cards, { opacity: 0, y: 60 });

      cards.forEach((card, i) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          }
        });
      });

      // Tech items stagger
      if (techCardRef.current) {
        const techItems = techCardRef.current.querySelectorAll('.tech-item');
        gsap.fromTo(techItems,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1, scale: 1, duration: 0.4, stagger: 0.05, ease: "back.out(1.7)",
            scrollTrigger: { trigger: techCardRef.current, start: "top 80%", once: true }
          }
        );
      }

      if (toolsCardRef.current) {
        const toolItems = toolsCardRef.current.querySelectorAll('.tech-item');
        gsap.fromTo(toolItems,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1, scale: 1, duration: 0.4, stagger: 0.05, ease: "back.out(1.7)",
            scrollTrigger: { trigger: toolsCardRef.current, start: "top 80%", once: true }
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
            {char === ' ' ? ' ' : char}
          </span>
        ))}
        <span className="gradient-text-animated">
          {highlight.split('').map((char, i) => (
            <span key={`hl-${i}`} className="split-char inline-block">
              {char === ' ' ? ' ' : char}
            </span>
          ))}
        </span>
        {parts[1]?.split('').map((char, i) => (
          <span key={`post-${i}`} className="split-char inline-block">
            {char === ' ' ? ' ' : char}
          </span>
        ))}
      </>
    );
  };

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center px-5 md:px-20 pt-8 pb-32">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 ref={headerRef} className="text-4xl md:text-6xl font-bold mb-6" aria-label="The Foundation">
            {splitTitle("The Foundation", "Foundation")}
          </h2>
          <p ref={descRef} className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {foundationData.description}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Education Card */}
          <div ref={educationCardRef}>
            <TiltCard className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:bg-gray-800/50 transition-all duration-300">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{myEducation.degree}</h3>
                <p className="text-xl text-purple-400 mb-2">{myEducation.field}</p>
                <p className="text-gray-300 mb-1">{myEducation.institution}</p>
                <p className="text-gray-400 text-sm">{myEducation.location} &bull; {myEducation.startDate} - {myEducation.endDate}</p>
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
            </TiltCard>
          </div>

          {/* Skills & Technologies */}
          <div className="space-y-8">
            <div ref={techCardRef}>
              <TiltCard className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:bg-gray-800/50 transition-all duration-300">
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
              </TiltCard>
            </div>

            <div ref={toolsCardRef}>
              <TiltCard className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:bg-gray-800/50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-6">Tools & Development Environment</h3>
                <div className="grid grid-cols-2 gap-3">
                  {techStack.tools.map((tool, index) => (
                    <div key={index} className="tech-item flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-300">{tool}</span>
                    </div>
                  ))}
                </div>
              </TiltCard>
            </div>
          </div>
        </div>

        {/* Academic Projects */}
        {myEducation.projects && (
          <div ref={projectsCardRef} className="mt-12">
            <TiltCard className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:bg-gray-800/50 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-6">Academic Projects</h3>
              <div className="space-y-3">
                {myEducation.projects.map((project, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                    <span className="text-gray-300">{project}</span>
                  </div>
                ))}
              </div>
            </TiltCard>
          </div>
        )}
      </div>
    </section>
  );
}
