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
    <section ref={sectionRef} className="relative z-0 h-screen flex items-center justify-center mb-16">
      <div className="px-5 md:px-20 w-full">
        {/* Main Hero Content - 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center max-w-7xl mx-auto">
          
          {/* Left Column - Profile Photo */}
          <div className="flex justify-center">
            <div ref={profileRef} className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 p-1 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                <img 
                  src="/jerun_prifile.png" 
                  alt="Jerun Kingston"
                  className="w-full h-full object-cover rounded-full bg-gray-900"
                />
              </div>
              {/* Animated ring */}
              <div className="absolute inset-0 rounded-full border-2 border-purple-400/30 animate-ping"></div>
              {/* Floating elements */}
              <div className="floating-element absolute -top-4 -right-4 w-8 h-8 bg-purple-400 rounded-full"></div>
              <div className="floating-element absolute -bottom-6 -left-6 w-6 h-6 bg-pink-400 rounded-full"></div>
              <div className="floating-element absolute top-1/2 -left-8 w-4 h-4 bg-cyan-400 rounded-full"></div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 text-center">
            {/* Hero Text with Typewriter Animation */}
            <div ref={textRef} className="mb-8">
              <div className="flex items-center justify-center gap-4 mb-6 text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-normal">
                <span>I'm</span>
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent min-h-[1.5em] flex items-baseline">
                  {displayedText}
                  <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
                </span>
              </div>
            </div>

            {/* Subtitle */}
            <div ref={subtitleRef} className="mb-8">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-300 mb-4">
                {personalInfo.title}
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                {personalInfo.tagline}
              </p>
            </div>

            {/* Tech Stack */}
            <div ref={techStackRef} className="flex flex-wrap justify-center gap-3 mb-8">
              {techStack.featured.map((tech) => (
                <span 
                  key={tech}
                  className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-full text-sm font-medium hover:bg-gray-800 hover:border-purple-400/50 transition-all duration-300 cursor-pointer"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-400/30 transition-all duration-300">
                View My Work
              </button>
              <button className="px-8 py-3 border border-gray-700 text-gray-300 font-semibold rounded-full hover:border-purple-400/50 hover:text-white transition-all duration-300">
                Get In Touch
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div ref={scrollIndicatorRef} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-12 border-2 border-gray-300 rounded-full flex justify-center items-start pt-2">
              <div className="w-1 h-3 bg-white rounded-full animate-bounce"></div>
            </div>
            <p className="text-sm text-gray-400">Scroll to explore</p>
          </div>
        </div>
      </div>
    </section>
  );
}
