'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sectionContent } from '@/data';
import { useParallaxTilt } from '@/hooks/useParallaxTilt';
import { useGlowFollow } from '@/hooks/useGlowFollow';

gsap.registerPlugin(ScrollTrigger);

function TiltCard({ children, className = '', active = false }: { children: React.ReactNode; className?: string; active?: boolean }) {
  const tiltRef = useParallaxTilt<HTMLDivElement>(12);
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

export default function EarlyDiscoveriesSection() {
  const [activeRole, setActiveRole] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const roleCardsRef = useRef<HTMLDivElement>(null);
  const keyInsightsRef = useRef<HTMLDivElement>(null);

  const sectionData = sectionContent.earlyDiscoveries;
  const earlyRoles = sectionData.experiences;

  const gradients = [
    'from-purple-900/30 via-blue-900/20 to-cyan-900/30',
    'from-pink-900/30 via-purple-900/20 to-indigo-900/30',
    'from-cyan-900/30 via-teal-900/20 to-green-900/30'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRole((prev) => (prev + 1) % earlyRoles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [earlyRoles.length]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Kinetic header: characters scale from 0 with elastic ease, random stagger
      if (headerRef.current) {
        const chars = headerRef.current.querySelectorAll('.split-char');
        gsap.set(chars, { opacity: 0, scale: 0 });

        const indices = Array.from({ length: chars.length }, (_, i) => i);
        // Shuffle for random stagger
        for (let i = indices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [indices[i], indices[j]] = [indices[j], indices[i]];
        }

        indices.forEach((charIndex, order) => {
          gsap.to(chars[charIndex], {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: order * 0.03,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              once: true,
            }
          });
        });
      }

      gsap.fromTo(descRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: descRef.current, start: "top 85%", once: true }
        }
      );

      // Role cards stagger
      if (roleCardsRef.current) {
        const cards = roleCardsRef.current.querySelectorAll('.role-card');
        gsap.fromTo(cards,
          { opacity: 0, y: 60, rotateY: -15, scale: 0.9 },
          {
            opacity: 1, y: 0, rotateY: 0, scale: 1,
            duration: 0.8, stagger: 0.2, ease: "back.out(1.7)",
            scrollTrigger: { trigger: roleCardsRef.current, start: "top 80%", once: true }
          }
        );
      }

      // Key insights
      if (keyInsightsRef.current) {
        gsap.fromTo(keyInsightsRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: keyInsightsRef.current, start: "top 85%", once: true }
          }
        );

        const insights = keyInsightsRef.current.querySelectorAll('.insight-item');
        gsap.fromTo(insights,
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: "power2.out",
            scrollTrigger: { trigger: keyInsightsRef.current, start: "top 80%", once: true }
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
    <section ref={sectionRef} className={`relative min-h-screen flex items-center justify-center px-5 md:px-20 py-20 transition-all duration-1000 bg-gradient-to-br ${gradients[activeRole]}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_white_1px,_transparent_1px)] bg-[length:50px_50px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 ref={headerRef} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6" aria-label="Early Discoveries">
            {splitTitle("Early Discoveries", "Discoveries")}
          </h2>
          <p ref={descRef} className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {sectionData.description}
          </p>
        </div>

        {/* Role Cards Grid */}
        <div ref={roleCardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {earlyRoles.map((role, index) => (
            <TiltCard
              key={index}
              active={activeRole === index}
              className={`role-card relative bg-gray-900/60 backdrop-blur-sm border rounded-2xl p-6 h-80 cursor-pointer transition-all duration-500 ${
                activeRole === index
                  ? 'border-purple-400 shadow-lg shadow-purple-400/20'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div onClick={() => setActiveRole(index)} className="h-full">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-2">{role.title}</h3>
                  <p className="text-purple-400 font-medium">{role.company}</p>
                  <p className="text-gray-400 text-sm">{role.period}</p>
                </div>

                <div className="mb-4">
                  <p className="text-gray-300 text-sm leading-relaxed">{role.description}</p>
                </div>

                <div className="mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 shrink-0"></div>
                    <p className="text-gray-300 text-sm font-medium">{role.impact}</p>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex flex-wrap gap-2">
                    {role.skills.slice(0, 3).map((skill: string, skillIndex: number) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-gray-800/80 border border-gray-600 rounded-md text-xs text-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                    {role.skills.length > 3 && (
                      <span className="px-2 py-1 bg-gray-800/80 border border-gray-600 rounded-md text-xs text-gray-400">
                        +{role.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {activeRole === index && (
                  <div className="absolute top-4 right-4">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Role Navigation Dots */}
        <div className="flex justify-center gap-3 mb-12">
          {earlyRoles.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveRole(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeRole === index
                  ? 'bg-purple-400 scale-125'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Key Insights */}
        <div ref={keyInsightsRef} className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">Key Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="insight-item bg-gray-900/40 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Real-World Application</h4>
              <p className="text-gray-300 text-sm">Bridging the gap between academic knowledge and practical implementation in professional environments.</p>
            </div>
            <div className="insight-item bg-gray-900/40 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Collaborative Development</h4>
              <p className="text-gray-300 text-sm">Learning to work effectively in teams, communicate with stakeholders, and contribute to larger codebases.</p>
            </div>
            <div className="insight-item bg-gray-900/40 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Continuous Learning</h4>
              <p className="text-gray-300 text-sm">Embracing new technologies and methodologies while building a foundation for lifelong learning in tech.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
