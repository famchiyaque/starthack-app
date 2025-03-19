
import { useEffect, useRef } from 'react';

// Observe element and trigger animation when visible
export const useIntersectionObserver = (
  options = { threshold: 0.1, rootMargin: '0px' }
) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observerRef.current?.unobserve(entry.target);
      }
    }, options);

    observerRef.current.observe(elementRef.current);

    return () => {
      if (observerRef.current && elementRef.current) {
        observerRef.current.unobserve(elementRef.current);
      }
    };
  }, [options]);

  return elementRef;
};

// Staggered animation for multiple elements
export const useStaggeredAnimation = (
  selector: string,
  delay = 100,
  options = { threshold: 0.1, rootMargin: '0px' }
) => {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(selector);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-fade-in');
          }, index * delay);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [selector, delay, options]);

  return containerRef;
};

// Parallax scroll effect
export const useParallax = (speed = 0.5) => {
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const element = elementRef.current;
      if (element) {
        element.style.transform = `translateY(${scrollPos * speed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return elementRef;
};
