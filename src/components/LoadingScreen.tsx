'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onLoadComplete: () => void;
  progress: number;
}

export default function LoadingScreen({ onLoadComplete, progress }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [displayProgress, setDisplayProgress] = useState(0);

  // ECG heartbeat path
  const ecgPath = "M0,50 L60,50 L70,50 L75,20 L80,80 L85,10 L90,90 L95,30 L100,50 L110,50 L170,50 L180,50 L185,20 L190,80 L195,10 L200,90 L205,30 L210,50 L220,50 L280,50 L290,50 L295,20 L300,80 L305,10 L310,90 L315,30 L320,50 L330,50 L400,50";

  useEffect(() => {
    gsap.to({ value: displayProgress }, {
      value: progress,
      duration: 0.8,
      ease: "power2.out",
      onUpdate: function () {
        setDisplayProgress(Math.round(this.targets()[0].value));
      }
    });
  }, [progress]);

  useEffect(() => {
    if (!svgPathRef.current) return;

    const path = svgPathRef.current;
    const pathLength = path.getTotalLength();

    // Set up the path for drawing animation
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    const tl = gsap.timeline();

    // Draw the ECG line
    tl.to(path, {
      strokeDashoffset: 0,
      duration: 2.4,
      ease: "power1.inOut",
    });

    // Reveal text midway through ECG draw
    tl.fromTo(textRef.current,
      { opacity: 0, clipPath: "inset(0 100% 0 0)" },
      { opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power2.out" },
      0.8
    );

    // Subtitle fade in shortly after text starts
    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      1.6
    );

    // Glow pulse on the line
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.6,
        scale: 1.1,
        duration: 1,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      });
    }

    return () => { tl.kill(); };
  }, []);

  // Exit animation
  useEffect(() => {
    if (progress >= 100) {
      const exitTl = gsap.timeline({ delay: 0.5, onComplete: onLoadComplete });

      exitTl.to(textRef.current, {
        y: -20, opacity: 0, duration: 0.5, ease: "power2.in"
      });

      exitTl.to(subtitleRef.current, {
        y: -10, opacity: 0, duration: 0.4, ease: "power2.in"
      }, "-=0.3");

      exitTl.to(svgPathRef.current, {
        opacity: 0, duration: 0.4, ease: "power2.in"
      }, "-=0.3");

      exitTl.to(containerRef.current, {
        opacity: 0, duration: 0.8, ease: "power2.inOut"
      }, "-=0.2");
    }
  }, [progress, onLoadComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Subtle radial glow behind the ECG */}
      <div
        ref={glowRef}
        className="absolute w-[600px] h-[200px] bg-linear-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-full blur-3xl opacity-30"
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">

        {/* ECG SVG Line */}
        <div className="relative w-[320px] sm:w-[400px] h-[100px] mb-8">
          <svg
            viewBox="0 0 400 100"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              ref={svgPathRef}
              d={ecgPath}
              fill="none"
              stroke="url(#ecg-gradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="ecg-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Title - reveals as line draws */}
        <div ref={textRef} className="text-center mb-2 opacity-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            The Life Line
          </h1>
        </div>

        {/* Subtitle */}
        <p ref={subtitleRef} className="text-gray-500 text-sm tracking-[0.3em] uppercase opacity-0">
          Jerun Kingston
        </p>

        {/* Progress number */}
        <p className="mt-10 text-gray-600 text-xs font-mono">
          {displayProgress}%
        </p>
      </div>
    </div>
  );
}
