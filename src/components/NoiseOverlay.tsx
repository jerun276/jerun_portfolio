'use client';

import { useEffect, useRef } from 'react';

export default function NoiseOverlay() {
  const seedRef = useRef(0);
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationId: number;
    let lastTime = 0;

    const animate = (time: number) => {
      if (time - lastTime > 100) {
        seedRef.current = (seedRef.current + 1) % 100;
        if (turbulenceRef.current) {
          turbulenceRef.current.setAttribute('seed', String(seedRef.current));
        }
        lastTime = time;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.04]"
      aria-hidden="true"
      style={{ willChange: 'transform' }}
    >
      <svg className="hidden">
        <filter id="noise-filter">
          <feTurbulence
            ref={turbulenceRef}
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="4"
            seed="0"
            stitchTiles="stitch"
          />
        </filter>
      </svg>
      <div className="w-full h-full" style={{ filter: 'url(#noise-filter)' }} />
    </div>
  );
}
