'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function useParallaxTilt<T extends HTMLElement>(maxAngle: number = 8) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    el.style.transformStyle = 'preserve-3d';
    el.style.perspective = '1000px';

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * maxAngle;
      const rotateX = -((e.clientY - centerY) / (rect.height / 2)) * maxAngle;

      gsap.to(el, {
        rotateX,
        rotateY,
        translateZ: 20,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        translateZ: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxAngle]);

  return ref;
}
