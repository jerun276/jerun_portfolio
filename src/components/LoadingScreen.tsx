'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onLoadComplete: () => void;
  progress: number;
}

export default function LoadingScreen({ onLoadComplete, progress }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lifeLineRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    // Animate progress counter
    gsap.to({ value: displayProgress }, {
      value: progress,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: function() {
        setDisplayProgress(Math.round(this.targets()[0].value));
      }
    });

    // Animate life line progress
    if (lifeLineRef.current) {
      gsap.to(lifeLineRef.current, {
        scaleX: progress / 100,
        duration: 0.8,
        ease: "power2.out"
      });
    }
  }, [progress, displayProgress]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initial animation setup
    const tl = gsap.timeline();
    
    // Animate logo entrance
    if (logoRef.current) {
      tl.from(logoRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)"
      });
    }
    
    // Animate life line container
    if (lifeLineRef.current?.parentElement) {
      tl.from(lifeLineRef.current.parentElement, {
        scaleX: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5");
    }
    
    // Animate progress text
    if (progressTextRef.current) {
      tl.from(progressTextRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.3");
    }

    // Particle animation
    const particles = particlesRef.current?.children;
    if (particles) {
      Array.from(particles).forEach((particle, index) => {
        gsap.set(particle, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: Math.random() * 0.5 + 0.5,
        });
        
        gsap.to(particle, {
          y: "-=100",
          opacity: 0.3,
          duration: Math.random() * 3 + 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 2
        });
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      // Exit animation
      const exitTl = gsap.timeline({
        onComplete: onLoadComplete
      });

      if (progressTextRef.current) {
        exitTl.to(progressTextRef.current, {
          scale: 1.2,
          duration: 0.3,
          ease: "power2.out"
        });
      }
      
      if (lifeLineRef.current) {
        exitTl.to(lifeLineRef.current, {
          scaleX: 1,
          duration: 0.5,
          ease: "power2.out"
        }, "-=0.2");
      }
      
      const elementsToFade = [logoRef.current, progressTextRef.current].filter(Boolean);
      if (elementsToFade.length > 0) {
        exitTl.to(elementsToFade, {
          y: -50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.in",
          stagger: 0.1
        }, "+=0.3");
      }
      
      if (lifeLineRef.current?.parentElement) {
        exitTl.to(lifeLineRef.current.parentElement, {
          scaleX: 0,
          duration: 0.6,
          ease: "power2.in"
        }, "-=0.4");
      }
      
      if (containerRef.current) {
        exitTl.to(containerRef.current, {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut"
        }, "-=0.5");
      }
    }
  }, [progress, onLoadComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 rounded-full opacity-20"
          />
        ))}
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Logo/Brand */}
        <div ref={logoRef} className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            The Life Line
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Jerun Kingston</p>
        </div>

        {/* Life Line Progress Indicator */}
        <div className="relative flex flex-col items-center">
          {/* Life Line Container */}
          <div className="relative w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
            {/* Animated Life Line Fill */}
            <div 
              ref={lifeLineRef}
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 rounded-full origin-left transform scale-x-0"
              style={{ width: '100%' }}
            />
            
            {/* Glowing Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-400/20 rounded-full animate-pulse" />
          </div>

          {/* Progress Nodes */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50" />
          <div className="absolute left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-pink-400 rounded-full shadow-lg shadow-pink-400/50" />
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50" />
          <div className="absolute left-3/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-pink-400 rounded-full shadow-lg shadow-pink-400/50" />
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50" />
        </div>

        {/* Progress Text */}
        <div ref={progressTextRef} className="text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            {displayProgress}%
          </div>
          <p className="text-gray-400 mt-1 text-sm">Loading your journey...</p>
        </div>
      </div>

      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>
    </div>
  );
}
