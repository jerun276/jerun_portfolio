'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { personalInfo, techStack, heroContent } from '@/data';

export default function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentText = heroContent.animatedTexts[currentTextIndex];
    let timeoutId: NodeJS.Timeout;

    if (isTyping) {
      // Typing effect
      if (displayedText.length < currentText.length) {
        timeoutId = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        }, 100); // Type each letter every 100ms
      } else {
        // Finished typing, wait then start erasing
        timeoutId = setTimeout(() => {
          setIsTyping(false);
        }, 2000); // Wait 2 seconds before erasing
      }
    } else {
      // Erasing effect
      if (displayedText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 50); // Erase faster than typing
      } else {
        // Finished erasing, move to next text
        setCurrentTextIndex((prev) => (prev + 1) % heroContent.animatedTexts.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [currentTextIndex, displayedText, isTyping]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  // GSAP Animation Timeline
  useEffect(() => {
    const tl = gsap.timeline({ paused: true });
    
    // Set initial states
    gsap.set([profileRef.current, textRef.current, subtitleRef.current, techStackRef.current, buttonsRef.current, scrollIndicatorRef.current], {
      opacity: 0,
      y: 50
    });

    // Profile photo animation
    tl.to(profileRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    })
    // Text animation with stagger
    .to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5")
    // Subtitle animation
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    // Tech stack with stagger effect
    .to(techStackRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "back.out(1.7)"
    }, "-=0.3")
    // Buttons animation
    .to(buttonsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.2")
    // Scroll indicator
    .to(scrollIndicatorRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out"
    }, "-=0.1");

    // Play animation on mount
    tl.play();

    // Floating elements animation
    if (profileRef.current) {
      const floatingElements = profileRef.current.querySelectorAll('.floating-element');
      gsap.to(floatingElements, {
        y: -10,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3
      });
    }

    return () => {
      tl.kill();
    };
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
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <section ref={sectionRef} className="relative z-0 min-h-screen flex items-center justify-center mb-8 pt-1 md:pt-1">
      <div className="px-5 md:px-20 w-full">
        {/* Main Hero Content - Mobile First Layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
          
          {/* Profile Photo - First on mobile */}
          <div className="flex justify-center order-1 lg:order-1">
            <div ref={profileRef} className="relative">
              <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 p-1 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                <img 
                  src="/jerun_prifile.png" 
                  alt="Jerun Kingston"
                  className="w-full h-full object-cover rounded-full bg-gray-900"
                />
              </div>
              {/* Animated ring */}
              <div className="absolute inset-0 rounded-full border-2 border-purple-400/30 animate-ping"></div>
              {/* Floating elements - responsive sizes */}
              <div className="floating-element absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-purple-400 rounded-full"></div>
              <div className="floating-element absolute -bottom-3 -left-3 sm:-bottom-6 sm:-left-6 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 bg-pink-400 rounded-full"></div>
              <div className="floating-element absolute top-1/2 -left-4 sm:-left-6 md:-left-8 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-cyan-400 rounded-full"></div>
            </div>
          </div>

          {/* Content - Second on mobile */}
          <div className="lg:col-span-2 text-center order-2 lg:order-2">
            {/* Hero Text with Typewriter Animation */}
            <div ref={textRef} className="mb-6 lg:mb-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-baseline justify-center gap-1 sm:gap-4 mb-4 sm:mb-6">
                <span className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">I'm</span>
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent text-3xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight min-h-[1.2em] sm:min-h-[1.5em] flex items-baseline">
                  {displayedText}
                  <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
                </span>
              </div>
            </div>

            {/* Subtitle */}
            <div ref={subtitleRef} className="mb-6 lg:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-300 mb-3 sm:mb-4">
                {personalInfo.title}
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto px-4 sm:px-0">
                {personalInfo.tagline}
              </p>
            </div>

            {/* Tech Stack */}
            <div ref={techStackRef} className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 lg:mb-8 px-4 sm:px-0">
              {techStack.featured.map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-900 border border-gray-700 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-800 hover:border-purple-400/50 transition-all duration-300 cursor-pointer"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <button 
                onClick={() => {
                  const ascentSection = document.getElementById('ascent');
                  if (ascentSection) {
                    ascentSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-400/30 hover:scale-105 transition-all duration-300 text-sm sm:text-base cursor-pointer"
              >
                View My Work
              </button>
              <button 
                onClick={() => {
                  const connectSection = document.getElementById('connect');
                  if (connectSection) {
                    connectSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-6 sm:px-8 py-2.5 sm:py-3 border border-gray-700 text-gray-300 font-semibold rounded-full hover:border-purple-400/50 hover:text-white hover:scale-105 transition-all duration-300 text-sm sm:text-base cursor-pointer"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div ref={scrollIndicatorRef} className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 sm:gap-4">
            <div className="w-6 h-10 sm:w-8 sm:h-12 border-2 border-gray-300 rounded-full flex justify-center items-start pt-1.5 sm:pt-2">
              <div className="w-0.5 h-2 sm:w-1 sm:h-3 bg-white rounded-full animate-bounce"></div>
            </div>
            <p className="text-xs sm:text-sm text-gray-400">Scroll to explore</p>
          </div>
        </div>
      </div>
    </section>
  );
}
