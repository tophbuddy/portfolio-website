import React from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

interface ProgressBarProps {
  /** Progress value (0-100) */
  value: number;
  /** Optional maximum value (default: 100) */
  max?: number;
  /** Optional label to display */
  label?: string;
  /** Optional secondary label (e.g., percentage) */
  secondaryLabel?: string;
  /** Color theme */
  color?: {
    light: string;
    dark: string;
  };
  /** Optional height in pixels (default: 8) */
  height?: number;
  /** Optional CSS classes */
  className?: string;
  /** Whether to show the progress value */
  showValue?: boolean;
  /** Animation duration in seconds */
  animationDuration?: number;
  /** Whether to animate on scroll into view */
  animateOnScroll?: boolean;
  /** Optional background color */
  backgroundColor?: string;
  /** Optional custom animation variants */
  customVariants?: Variants;
}

/**
 * Animated progress bar component with scroll-based triggering
 */
const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  secondaryLabel,
  color = {
    light: '#3B82F6', // blue-500
    dark: '#60A5FA', // blue-400
  },
  height = 8,
  className = '',
  showValue = false,
  animationDuration = 1,
  animateOnScroll = true,
  backgroundColor = 'rgba(0, 0, 0, 0.1)',
  customVariants,
}) => {
  // Calculate progress percentage
  const progress = Math.min(100, Math.max(0, (value / max) * 100));

  // Set up intersection observer for scroll-based animation
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Animation controls
  const controls = useAnimation();

  // Default animation variants
  const variants: Variants = customVariants || {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: `${progress}%`,
      opacity: 1,
      transition: {
        duration: animationDuration,
        ease: 'easeOut',
      },
    },
  };

  // Start animation when in view
  useEffect(() => {
    if (inView || !animateOnScroll) {
      controls.start('visible');
    }
  }, [controls, inView, animateOnScroll]);

  return (
    <div
      ref={ref}
      className={`w-full ${className}`}
    >
      {/* Labels */}
      {(label || secondaryLabel || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {label}
            </span>
          )}
          {(secondaryLabel || showValue) && (
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {secondaryLabel || `${Math.round(progress)}%`}
            </span>
          )}
        </div>
      )}

      {/* Progress bar container */}
      <div
        className="relative rounded-full overflow-hidden"
        style={{ height, backgroundColor }}
      >
        {/* Animated progress bar */}
        <motion.div
          initial={animateOnScroll ? 'hidden' : 'visible'}
          animate={controls}
          variants={variants}
          className="absolute top-0 left-0 h-full rounded-full"
          style={{
            backgroundColor: color.light,
          }}
        >
          {/* Optional gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent"
            style={{
              opacity: 0.1,
            }}
          />

          {/* Optional shine effect */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
            style={{
              opacity: 0.1,
              transform: 'skewX(-20deg)',
              width: '200%',
              animation: 'shine 2s infinite',
            }}
          />
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes shine {
          from {
            transform: translateX(-100%) skewX(-20deg);
          }
          to {
            transform: translateX(100%) skewX(-20deg);
          }
        }
      `}</style>
    </div>
  );
};

export default ProgressBar;
