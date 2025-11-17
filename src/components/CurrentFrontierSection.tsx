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
        <div ref={tabsRef} className="flex justify-center mb-16 px-4">
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-2 w-full max-w-2xl">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`tab-button px-4 sm:px-6 py-3 rounded-xl transition-all duration-300 text-sm sm:text-base flex-1 ${
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
                          {tech === 'Next.js' ? (
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474s.012 1.0884.108 1.7476c.652 4.506 3.8591 8.2919 8.2087 9.6945.7789.2511 1.6.4223 2.5337.5255.3636.04 1.9354.04 2.299 0 1.6117-.1783 2.9772-.577 4.3237-1.2643.2065-.1056.2464-.1337.2183-.1573-.0188-.0139-.8987-1.1938-1.9543-2.62l-1.919-2.592-2.4047-3.5583c-1.3231-1.9564-2.4117-3.556-2.4211-3.556-.0094-.0026-.0187 1.5787-.0235 3.509-.0067 3.3802-.0093 3.5162-.0516 3.596-.061.115-.108.1618-.2064.2134-.075.0374-.1408.0445-.5429.0445h-.4570l-.0649-.0562c-.0649-.0562-.1846-.1618-.1846-.1618l-.0422-.0562-.0093-4.703L7.2024 8.8882c.0516-.0328.1295-.0516.1847-.0516.0516 0 .1295.0188.1847.0516l4.4978 6.7439 2.4211 3.6157L16.5 19.7l.0422-.0562c.0516-.0562.1295-.1618.1847-.1618.0516 0 .1295.0188.1847.0516l4.4978 6.7439 2.4211 3.6157.0516.0562c.0516.0562.1295.1618.1847.1618.0516 0 .1295-.0188.1847-.0516l4.4978-6.7439c1.3231-1.9564 2.4117-3.556 2.4211-3.556.0094.0026.0187-1.5787.0235-3.509.0067-3.3802.0093-3.5162.0516-3.596.061-.115.108-.1618.2064-.2134.075-.0374.1408-.0445.5429-.0445h.4570l.0649.0562c.0649.0562.1846.1618.1846.1618l.0422.0562.0093 4.703-.0093 4.7056c-.0516.0328-.1295.0516-.1847.0516-.0516 0-.1295-.0188-.1847-.0516L11.5725 0z"/>
                            </svg>
                          ) : tech === 'React' ? (
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.47 0-.92.014-1.36.034.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.36.034.47 0 .92-.014 1.36-.034-.44.572-.895 1.095-1.36 1.56-.465-.467-.92-.992-1.36-1.56z"/>
                            </svg>
                          ) : tech === 'TypeScript' ? (
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
                            </svg>
                          ) : tech === 'Node.js' ? (
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/>
                            </svg>
                          ) : (
                            <span className="text-white font-bold text-lg">{tech.slice(0, 2).toUpperCase()}</span>
                          )}
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
