import { useEffect, useState, useRef, RefObject } from 'react';

interface ScrollAnimationOptions {
  /** Threshold for when the animation should trigger (0-1) */
  threshold?: number;
  /** Root margin for intersection observer */
  rootMargin?: string;
  /** Whether to only trigger once */
  once?: boolean;
  /** Delay before animation starts (ms) */
  delay?: number;
  /** Duration of the animation (ms) */
  duration?: number;
  /** Custom animation timing function */
  easing?: string;
  /** Direction of the animation */
  direction?: 'up' | 'down' | 'left' | 'right';
  /** Distance to animate (px) */
  distance?: number;
}

interface ScrollAnimationResult {
  /** Ref to attach to the element */
  ref: RefObject<any>;
  /** Whether the element is in view */
  inView: boolean;
  /** Whether the animation has played */
  hasAnimated: boolean;
  /** CSS styles for the animation */
  style: React.CSSProperties;
}

const defaultOptions: ScrollAnimationOptions = {
  threshold: 0.1,
  rootMargin: '0px',
  once: true,
  delay: 0,
  duration: 600,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  direction: 'up',
  distance: 50,
};

/**
 * Hook for adding scroll-triggered animations to elements
 */
export function useScrollAnimation(options: ScrollAnimationOptions = {}): ScrollAnimationResult {
  const mergedOptions = { ...defaultOptions, ...options };
  const elementRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Create intersection observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        
        if (isIntersecting) {
          setInView(true);
          if (mergedOptions.once) {
            setHasAnimated(true);
            observer.unobserve(element);
          }
        } else {
          if (!mergedOptions.once) {
            setInView(false);
          }
        }
      },
      {
        threshold: mergedOptions.threshold,
        rootMargin: mergedOptions.rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [mergedOptions.threshold, mergedOptions.rootMargin, mergedOptions.once]);

  // Calculate transform based on direction
  const getInitialTransform = () => {
    switch (mergedOptions.direction) {
      case 'up':
        return `translateY(${mergedOptions.distance}px)`;
      case 'down':
        return `translateY(-${mergedOptions.distance}px)`;
      case 'left':
        return `translateX(${mergedOptions.distance}px)`;
      case 'right':
        return `translateX(-${mergedOptions.distance}px)`;
      default:
        return 'none';
    }
  };

  // Generate animation styles
  const style: React.CSSProperties = {
    opacity: inView || hasAnimated ? 1 : 0,
    transform: inView || hasAnimated ? 'none' : getInitialTransform(),
    transition: `opacity ${mergedOptions.duration}ms ${mergedOptions.easing} ${mergedOptions.delay}ms, transform ${mergedOptions.duration}ms ${mergedOptions.easing} ${mergedOptions.delay}ms`,
    willChange: 'opacity, transform',
  };

  return {
    ref: elementRef,
    inView,
    hasAnimated,
    style,
  };
}

// Export types
export type { ScrollAnimationOptions, ScrollAnimationResult };
