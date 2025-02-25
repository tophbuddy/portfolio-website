import React from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface AnimatedSkillBarProps {
  /** Value of the skill (0-100) */
  value: number;
  /** Label for the skill */
  label: string;
  /** Secondary label (e.g., years of experience) */
  secondaryLabel?: string;
  /** Color theme for the bar */
  color?: {
    light: string;
    dark: string;
  };
  /** Height of the bar in pixels */
  height?: number;
  /** Optional CSS classes */
  className?: string;
  /** Animation delay in seconds */
  delay?: number;
  /** Whether to show the shine effect */
  showShine?: boolean;
  /** Whether to show the pulse effect */
  showPulse?: boolean;
}

/**
 * AnimatedSkillBar displays a skill level with advanced animations
 */
const AnimatedSkillBar: React.FC<AnimatedSkillBarProps> = ({
  value,
  label,
  secondaryLabel,
  color = { light: '#3B82F6', dark: '#60A5FA' },
  height = 8,
  className = '',
  delay = 0,
  showShine = true,
  showPulse = true,
}) => {
  const controls = useAnimation();
  const barRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(barRef, { once: true, margin: '-50px' });

  // Clamp value between 0 and 100
  const clampedValue = Math.min(Math.max(value, 0), 100);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  // Animation variants
  const barVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: `${clampedValue}%`,
      opacity: 1,
      transition: {
        duration: 1,
        delay,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const labelVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay + 0.2,
      },
    },
  };

  const shineVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: {
      x: '200%',
      opacity: [0, 1, 0],
      transition: {
        duration: 1.5,
        delay: delay + 1,
        ease: 'easeOut',
        repeat: Infinity,
        repeatDelay: 3,
      },
    },
  };

  const pulseVariants = {
    hidden: { scale: 1, opacity: 0.5 },
    visible: {
      scale: [1, 1.02, 1],
      opacity: [0.5, 0.7, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const
      },
    },
  };

  return (
    <div className={`space-y-2 ${className}`} ref={barRef}>
      {/* Labels */}
      <motion.div
        className="flex justify-between items-center text-sm"
        variants={labelVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <span className="font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
        {secondaryLabel && (
          <span className="text-gray-500 dark:text-gray-400">
            {secondaryLabel}
          </span>
        )}
      </motion.div>

      {/* Progress bar container */}
      <div
        className="relative bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
        style={{ height }}
      >
        {/* Main progress bar */}
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{
            backgroundColor: color.light,
          }}
          variants={barVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Shine effect */}
          {showShine && (
            <motion.div
              className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              variants={shineVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            />
          )}
        </motion.div>

        {/* Pulse effect */}
        {showPulse && clampedValue > 80 && (
          <motion.div
            className="absolute top-0 left-0 h-full rounded-full"
            style={{
              width: `${clampedValue}%`,
              backgroundColor: color.light,
              originX: 1,
            }}
            variants={pulseVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          />
        )}
      </div>

      {/* Percentage indicator */}
      <motion.div
        className="text-right text-sm text-gray-500 dark:text-gray-400"
        variants={labelVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {clampedValue}%
      </motion.div>
    </div>
  );
};

export default AnimatedSkillBar;
