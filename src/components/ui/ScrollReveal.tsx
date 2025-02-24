import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, type Transition, type TargetAndTransition } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  /** Custom CSS classes to apply to the container */
  className?: string;
  /** Animation variants for different states (hidden, visible) */
  variants?: {
    hidden: TargetAndTransition;
    visible: TargetAndTransition;
  };
  /** Viewport threshold for triggering animation (0 to 1) */
  threshold?: number;
  /** Animation delay in seconds */
  delay?: number;
  /** Whether to animate only once or every time element comes into view */
  once?: boolean;
  /** Amount of viewport margin to consider for triggering (e.g., "100px") */
  margin?: string;
}

/**
 * ScrollReveal component that animates its children when they enter the viewport.
 * 
 * @component
 * @example
 * ```tsx
 * <ScrollReveal>
 *   <div>This content will animate when scrolled into view</div>
 * </ScrollReveal>
 * ```
 * 
 * @param props - Component props
 * @param props.children - Content to be animated
 * @param props.className - Optional CSS classes
 * @param props.variants - Custom animation variants
 * @param props.threshold - Viewport intersection threshold (0-1)
 * @param props.delay - Animation delay in seconds
 * @param props.once - Whether to animate only once
 * @param props.margin - Viewport margin for early triggering
 * 
 * @returns A motion component that animates its children on scroll
 * 
 * @throws {Error} If invalid threshold value is provided (must be between 0 and 1)
 */
const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  },
  threshold = 0.2,
  delay = 0,
  once = true,
  margin = '0px',
}) => {
  // Validate threshold
  if (threshold < 0 || threshold > 1) {
    throw new Error('Threshold must be between 0 and 1');
  }

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    margin,
    amount: threshold,
  });
  const controls = useAnimation();

  /**
   * Handles the animation sequence when element comes into view.
   * 
   * @returns {Promise<void>} A promise that resolves when the animation is complete
   */
  const handleViewportEntry = async (): Promise<void> => {
    if (isInView) {
      await controls.start('visible');
    } else if (!once) {
      await controls.start('hidden');
    }
  };

  // Effect to trigger animation when element comes into view
  useEffect(() => {
    handleViewportEntry();
  }, [isInView]);

  // Define transition with delay
  const transition: Transition = {
    delay,
    ...(variants.visible.transition as Transition || {}),
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
