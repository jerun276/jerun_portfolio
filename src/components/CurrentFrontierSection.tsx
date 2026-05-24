'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sectionContent } from '@/data';
import { useParallaxTilt } from '@/hooks/useParallaxTilt';
import { useGlowFollow } from '@/hooks/useGlowFollow';

gsap.registerPlugin(ScrollTrigger);

function BentoCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const tiltRef = useParallaxTilt<HTMLDivElement>(8);
  const glowRef = useGlowFollow<HTMLDivElement>();

  return (
    <div
      ref={(el) => {
        (tiltRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        (glowRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }}
      className={className}
    >
      {children}
    </div>
  );
}

export default function CurrentFrontierSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);

  const frontierData = sectionContent.currentFrontier;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Kinetic header: font-weight morph 100→700
      if (headerRef.current) {
        const chars = headerRef.current.querySelectorAll('.split-char');
        gsap.set(chars, { opacity: 0, fontWeight: 100 });

        gsap.to(chars, {
          opacity: 1,
          fontWeight: 700,
          duration: 0.8,
          stagger: 0.03,
          ease: "power2.inOut",
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

      // Floating orbs
      if (orbsRef.current) {
        const orbs = orbsRef.current.querySelectorAll('.floating-orb');
        gsap.set(orbs, { opacity: 0, scale: 0.5 });

        gsap.to(orbs, {
          opacity: 1, scale: 1, duration: 2, stagger: 0.3, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true }
        });

        orbs.forEach((orb, index) => {
          gsap.to(orb, { y: -20, duration: 3 + index * 0.5, ease: "power2.inOut", yoyo: true, repeat: -1 });
          gsap.to(orb, { x: 15, duration: 4 + index * 0.3, ease: "power2.inOut", yoyo: true, repeat: -1, delay: index * 0.2 });
        });
      }

      // Bento cards stagger
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.bento-item');
        gsap.fromTo(cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.7, stagger: 0.1, ease: "back.out(1.7)",
            scrollTrigger: { trigger: gridRef.current, start: "top 80%", once: true }
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

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden"
    >
      {/* Floating Background Orbs */}
      <div ref={orbsRef} className="absolute inset-0 overflow-hidden">
        <div className="floating-orb absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
        <div className="floating-orb absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
        <div className="floating-orb absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10 px-5 md:px-20 py-20">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 ref={headerRef} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6" aria-label="Current Frontier">
            {splitTitle("Current Frontier", "Frontier")}
          </h2>
          <p ref={descRef} className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {frontierData.description}
          </p>
        </div>

        {/* Bento Grid */}
        <div ref={gridRef} className="bento-grid max-w-7xl mx-auto">

          {/* Role Card - 2x2 */}
          <BentoCard className="bento-item bento-span-2-col bento-span-2-row bg-white/5 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-purple-400/30 transition-all duration-300">
            <div className="h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {frontierData.currentRole.title}
                </h3>
                <p className="text-lg text-purple-400 mb-2">{frontierData.currentRole.company}</p>
                <p className="text-gray-400 text-sm mb-6">{frontierData.currentRole.period}</p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {frontierData.currentRole.description}
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Key Projects</h4>
                <div className="space-y-2">
                  {frontierData.currentRole.keyProjects.map((project, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                      <span className="text-gray-300 text-sm">{project}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Tech Cards - 1x1 each */}
          {frontierData.currentTech.slice(0, 6).map((tech, index) => (
            <BentoCard
              key={`tech-${index}`}
              className="bento-item bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-400/10 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">{tech.slice(0, 2).toUpperCase()}</span>
              </div>
              <h4 className="text-white font-semibold group-hover:text-purple-300 transition-colors duration-300">{tech}</h4>
            </BentoCard>
          ))}

          {/* Focus Cards */}
          {frontierData.focus.map((focus, index) => {
            const isWide = index === 0;
            return (
              <BentoCard
                key={`focus-${index}`}
                className={`bento-item ${isWide ? 'bento-span-2-col' : ''} bg-gray-900/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 flex flex-col justify-center hover:border-cyan-400/50 transition-all duration-300 group`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">{focus}</h4>
                    <p className="text-gray-400 text-sm mt-1">Pushing boundaries in {focus.toLowerCase()}</p>
                  </div>
                </div>
              </BentoCard>
            );
          })}

          {/* Impact Cards */}
          {frontierData.currentRole.impact.map((item, index) => (
            <BentoCard
              key={`impact-${index}`}
              className="bento-item bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-2xl p-5 flex items-start gap-4"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-sm">{index + 1}</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
            </BentoCard>
          ))}
        </div>

        {/* CTA */}
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
