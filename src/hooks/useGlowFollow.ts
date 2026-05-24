'use client';

import { useEffect, useRef } from 'react';

export function useGlowFollow<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    el.style.position = 'relative';
    el.style.overflow = 'hidden';

    const glow = document.createElement('div');
    glow.style.cssText = `
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 1;
      border-radius: inherit;
    `;
    el.appendChild(glow);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glow.style.background = `radial-gradient(200px circle at ${x}px ${y}px, rgba(168, 85, 247, 0.15), transparent 70%)`;
      glow.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      glow.style.opacity = '0';
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      if (glow.parentNode) glow.parentNode.removeChild(glow);
    };
  }, []);

  return ref;
}
