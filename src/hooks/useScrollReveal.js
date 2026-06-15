// Intersection Observer hook for scroll-triggered reveal animations
import { useEffect, useRef, useState } from 'react';

/**
 * @param {IntersectionObserverInit} options
 * @returns {{ ref: React.RefObject, isVisible: boolean }}
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el); // Fire once
        }
      },
      { threshold: 0.15, ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}