
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type AnimationType = 'fade' | 'slide' | 'scale';

interface AnimatedTransitionProps {
  children: React.ReactNode;
  type?: AnimationType;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
  duration?: number;
  once?: boolean;
}

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({
  children,
  type = 'fade',
  direction = 'up',
  delay = 0,
  className = '',
  duration = 300,
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !hasAnimated)) {
          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, delay);
        } else if (!once && !entry.isIntersecting) {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay, once, hasAnimated]);

  const getAnimationClass = () => {
    if (!isVisible) {
      return '';
    }

    switch (type) {
      case 'fade':
        return 'animate-fade-in';
      case 'scale':
        return 'animate-scale-in';
      case 'slide':
        switch (direction) {
          case 'up':
            return 'animate-slide-up';
          case 'down':
            return 'animate-slide-down';
          case 'left':
            return 'animate-slide-in';
          case 'right':
            return 'animate-slide-out';
          default:
            return 'animate-slide-up';
        }
      default:
        return 'animate-fade-in';
    }
  };

  const getInitialStyles = () => {
    if (isVisible) {
      return {};
    }

    const baseStyles = {
      opacity: 0,
      transition: `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
    };

    switch (type) {
      case 'fade':
        return {
          ...baseStyles,
        };
      case 'scale':
        return {
          ...baseStyles,
          transform: 'scale(0.95)',
        };
      case 'slide':
        switch (direction) {
          case 'up':
            return {
              ...baseStyles,
              transform: 'translateY(20px)',
            };
          case 'down':
            return {
              ...baseStyles,
              transform: 'translateY(-20px)',
            };
          case 'left':
            return {
              ...baseStyles,
              transform: 'translateX(20px)',
            };
          case 'right':
            return {
              ...baseStyles,
              transform: 'translateX(-20px)',
            };
          default:
            return baseStyles;
        }
      default:
        return baseStyles;
    }
  };

  return (
    <div
      ref={ref}
      className={cn(className, getAnimationClass())}
      style={{
        ...getInitialStyles(),
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : undefined,
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedTransition;
