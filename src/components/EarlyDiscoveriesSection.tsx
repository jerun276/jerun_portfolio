'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experiences, sectionContent } from '@/data';
import Tilt from 'react-parallax-tilt';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function EarlyDiscoveriesSection() {
  const [activeRole, setActiveRole] = useState(0);
  const [backgroundGradient, setBackgroundGradient] = useState('from-purple-900/20 to-pink-900/20');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const roleCardsRef = useRef<HTMLDivElement>(null);
  const keyInsightsRef = useRef<HTMLDivElement>(null);
  
  const sectionData = sectionContent.earlyDiscoveries;
  const earlyRoles = sectionData.experiences; // Use experiences from content data

  // Background color shifts based on active role
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
    setBackgroundGradient(gradients[activeRole]);
  }, [activeRole]);

  // GSAP ScrollTrigger Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([headerRef.current, roleCardsRef.current, keyInsightsRef.current], {
        opacity: 0,
        y: 80
      });

      // Header animation with fade and slide
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

      // Role cards animation with stagger
      gsap.to(roleCardsRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: roleCardsRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate individual role cards with stagger
      if (roleCardsRef.current) {
        const cards = roleCardsRef.current.querySelectorAll('.role-card');
        gsap.fromTo(cards,
          { 
            opacity: 0, 
            y: 60,
            rotationY: -15,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: roleCardsRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Key insights animation
      gsap.to(keyInsightsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: keyInsightsRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate insight items individually
      if (keyInsightsRef.current) {
        const insights = keyInsightsRef.current.querySelectorAll('.insight-item');
        gsap.fromTo(insights,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: keyInsightsRef.current,
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
    <section ref={sectionRef} className={`relative min-h-screen flex items-center justify-center px-5 md:px-20 py-20 transition-all duration-1000 bg-gradient-to-br ${backgroundGradient}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_white_1px,_transparent_1px)] bg-[length:50px_50px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            Early <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Discoveries</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {sectionData.description}
          </p>
        </div>

        {/* Role Cards Grid */}
        <div ref={roleCardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {earlyRoles.map((role, index) => (
            <Tilt
              key={index}
              tiltMaxAngleX={12}
              tiltMaxAngleY={12}
              scale={activeRole === index ? 1.05 : 1.02}
              transitionSpeed={600}
              glareEnable={true}
              glareMaxOpacity={0.2}
            >
              <div 
                className={`role-card relative bg-gray-900/60 backdrop-blur-sm border rounded-2xl p-6 h-80 cursor-pointer transition-all duration-500 ${
                  activeRole === index 
                    ? 'border-purple-400 shadow-lg shadow-purple-400/20' 
                    : 'border-gray-700 hover:border-gray-600'
                }`}
                onClick={() => setActiveRole(index)}
              >
                {/* Role Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-2">{role.title}</h3>
                  <p className="text-purple-400 font-medium">{role.company}</p>
                  <p className="text-gray-400 text-sm">{role.period}</p>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {role.description}
                  </p>
                </div>

                {/* Impact */}
                <div className="mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm font-medium">
                      {role.impact}
                    </p>
                  </div>
                </div>

                {/* Skills */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex flex-wrap gap-2">
                    {role.skills.slice(0, 3).map((skill: any, skillIndex: any) => (
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

                {/* Active Indicator */}
                {activeRole === index && (
                  <div className="absolute top-4 right-4">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            </Tilt>
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
