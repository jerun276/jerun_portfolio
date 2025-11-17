'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sectionContent, personalInfo } from '@/data';
import Tilt from 'react-parallax-tilt';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function ConnectSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredContact, setHoveredContact] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contactMethodsRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLDivElement>(null);
  const socialLinksRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const backgroundOrbsRef = useRef<HTMLDivElement>(null);
  
  const connectData = sectionContent.connect;

  // Visibility detection
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

  // GSAP ScrollTrigger Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([headerRef.current, contactMethodsRef.current, ctaButtonRef.current, footerRef.current], {
        opacity: 0,
        y: 80
      });

      // Animate background orbs
      if (backgroundOrbsRef.current) {
        const orbs = backgroundOrbsRef.current.querySelectorAll('.floating-orb');
        gsap.set(orbs, { opacity: 0, scale: 0.3, rotation: 0 });
        
        gsap.to(orbs, {
          opacity: 1,
          scale: 1,
          rotation: 360,
          duration: 3,
          stagger: 0.4,
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
            y: -30,
            duration: 4 + index * 0.5,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1
          });
          
          gsap.to(orb, {
            x: 20,
            duration: 5 + index * 0.3,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 0.3
          });

          gsap.to(orb, {
            rotation: 360,
            duration: 8 + index * 2,
            ease: "none",
            repeat: -1
          });
        });
      }

      // Header animation with dramatic entrance
      gsap.fromTo(headerRef.current,
        { 
          opacity: 0, 
          y: 120,
          scale: 0.8,
          rotationX: -30
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Contact methods with stagger and 3D effects
      gsap.to(contactMethodsRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contactMethodsRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate individual contact cards
      if (contactMethodsRef.current) {
        const contactCards = contactMethodsRef.current.querySelectorAll('.contact-card');
        gsap.fromTo(contactCards,
          { 
            opacity: 0, 
            y: 80,
            rotationY: -20,
            scale: 0.8
          },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            scale: 1,
            duration: 1,
            stagger: 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: contactMethodsRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // CTA button with bounce and glow effect
      gsap.fromTo(ctaButtonRef.current,
        { 
          opacity: 0, 
          y: 60,
          scale: 0.7,
          rotationZ: -10
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationZ: 0,
          duration: 1.2,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: ctaButtonRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Social links - no animations, just visible
      if (socialLinksRef.current) {
        gsap.set(socialLinksRef.current, { opacity: 1 });
        const socialIcons = socialLinksRef.current.querySelectorAll('.social-icon');
        gsap.set(socialIcons, { opacity: 1, scale: 1, rotation: 0 });
      }

      // Footer with elegant fade
      gsap.fromTo(footerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mouse tracking for micro-interactions
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: ((e.clientY - rect.top) / rect.height) * 2 - 1
      });
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const getFloatingStyle = (intensity: number = 1) => ({
    transform: `translateX(${mousePosition.x * 10 * intensity}px) translateY(${mousePosition.y * 10 * intensity}px)`,
  });

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-b from-black via-gray-900/30 to-black flex items-center justify-center px-5 md:px-20 py-20 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div ref={backgroundOrbsRef} className="absolute inset-0">
        <div 
          className="floating-orb absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          style={getFloatingStyle(0.3)}
        ></div>
        <div 
          className="floating-orb absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"
          style={getFloatingStyle(-0.4)}
        ></div>
        <div 
          className="floating-orb absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-full blur-3xl"
          style={getFloatingStyle(0.2)}
        ></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        
        {/* Section Header */}
        <div ref={headerRef} className="mb-16">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            {connectData.title.split(' ')[0]} <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">{connectData.title.split(' ')[1]}</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            {connectData.description}
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {connectData.cta}
          </p>
        </div>

        {/* Contact Methods */}
        <div ref={contactMethodsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {connectData.contactMethods.map((method, index) => (
            <Tilt
              key={index}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              scale={hoveredContact === index ? 1.08 : 1.03}
              transitionSpeed={400}
              glareEnable={true}
              glareMaxOpacity={0.2}
            >
              <a
                href={method.url}
                target={method.type === 'email' ? '_self' : '_blank'}
                rel={method.type === 'email' ? '' : 'noopener noreferrer'}
                className="contact-card block"
                onMouseEnter={() => setHoveredContact(index)}
                onMouseLeave={() => setHoveredContact(null)}
              >
                <div className={`bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 h-48 flex flex-col items-center justify-center text-center hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-400/20 transition-all duration-300 group ${
                  hoveredContact === index ? 'border-purple-400/70 shadow-lg shadow-purple-400/30' : ''
                }`}>
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${
                    method.type === 'email' ? 'bg-gradient-to-r from-purple-400 to-pink-400' :
                    method.type === 'phone' ? 'bg-gradient-to-r from-green-400 to-teal-400' :
                    'bg-gradient-to-r from-cyan-400 to-blue-400'
                  } ${hoveredContact === index ? 'scale-110 rotate-12' : 'group-hover:scale-105'}`}>
                    {method.type === 'email' ? (
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    ) : method.type === 'phone' ? (
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    ) : (
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>

                  {/* Label */}
                  <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-purple-300 transition-colors duration-300">
                    {method.label}
                  </h3>

                  {/* Value */}
                  <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                    {method.value}
                  </p>

                  {/* Hover Effect */}
                  {hoveredContact === index && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl pointer-events-none"></div>
                  )}
                </div>
              </a>
            </Tilt>
          ))}
        </div>

        {/* Main CTA Button */}
        <div ref={ctaButtonRef} className="mb-16">
          <Tilt
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            scale={1.05}
            transitionSpeed={600}
            glareEnable={true}
            glareMaxOpacity={0.3}
          >
            <a
              href={personalInfo.social.email}
              className="inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white font-bold text-lg px-12 py-4 rounded-2xl hover:shadow-lg hover:shadow-purple-400/30 transition-all duration-300 group relative overflow-hidden"
            >
              <span className="relative z-10">Start a Conversation</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Animated sparkles */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full animate-ping"></div>
                <div className="absolute bottom-3 right-6 w-1 h-1 bg-white rounded-full animate-ping delay-150"></div>
                <div className="absolute top-1/2 right-4 w-1 h-1 bg-white rounded-full animate-ping delay-300"></div>
              </div>
            </a>
          </Tilt>
        </div>

        {/* Social Links */}
        <div ref={socialLinksRef} className="flex justify-center gap-6 mb-16">
          {[
            { name: 'GitHub', url: personalInfo.social.github },
            { name: 'LinkedIn', url: personalInfo.social.linkedin },
            { name: 'Facebook', url: personalInfo.social.facebook },
            { name: 'Instagram', url: personalInfo.social.instagram }
          ].map((social, index) => (
            <Tilt
              key={social.name}
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              scale={1.1}
              transitionSpeed={400}
              glareEnable={true}
              glareMaxOpacity={0.2}
            >
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon w-12 h-12 bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-xl flex items-center justify-center hover:border-purple-400/50 hover:bg-purple-500/10 transition-all duration-300 group"
                data-social={social.name}
              >
                {social.name === 'GitHub' ? (
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                ) : social.name === 'LinkedIn' ? (
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                ) : social.name === 'Facebook' ? (
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                ) : social.name === 'Instagram' ? (
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                ) : null}
              </a>
            </Tilt>
          ))}
        </div>

        {/* Footer */}
        <div ref={footerRef} className="text-center">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8"></div>
          <p className="text-gray-500 text-sm">
            {connectData.footer}
          </p>
        </div>

      </div>
    </section>
  );
}
