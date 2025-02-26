import React from 'react';
import { motion } from 'framer-motion';

interface TimelineConnectorProps {
  /** Position of the connector relative to the timeline */
  position: 'left' | 'right';
  /** Whether this is an active (current) experience */
  active?: boolean;
  /** Whether to animate the connector */
  animate?: boolean;
  /** Optional color override */
  color?: string;
  /** Optional className for styling */
  className?: string;
}

/**
 * Component for rendering connection lines between timeline entries
 */
const TimelineConnector: React.FC<TimelineConnectorProps> = ({
  position,
  active = false,
  animate = true,
  color,
  className = '',
}) => {
  // Animation variants
  const lineVariants = {
    hidden: {
      opacity: 0,
      scaleY: 0,
      originY: position === 'left' ? 1 : 0,
    },
    visible: {
      opacity: 1,
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  // Dot animation variants
  const dotVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        delay: 0.2,
        ease: 'easeOut',
      },
    },
  };

  // Default colors
  const defaultColor = active ? '#3B82F6' : '#E5E7EB';
  const lineColor = color || defaultColor;

  return (
    <div
      className={`
        absolute h-full w-px
        ${position === 'left' ? 'right-0' : 'left-0'}
        ${className}
      `}
    >
      {/* Main vertical line */}
      <motion.div
        variants={animate ? lineVariants : undefined}
        initial="hidden"
        animate="visible"
        className="relative h-full w-full"
      >
        {/* Background line */}
        <div
          className="absolute inset-0 w-px"
          style={{ backgroundColor: active ? `${lineColor}20` : lineColor }}
        />

        {/* Animated fill line for active experiences */}
        {active && (
          <motion.div
            className="absolute inset-0 w-px"
            style={{ backgroundColor: lineColor }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{
              duration: 1,
              ease: 'easeInOut',
            }}
          />
        )}

        {/* Connection dots */}
        <motion.div
          variants={animate ? dotVariants : undefined}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div
            className={`
              w-3 h-3 rounded-full
              ${active ? 'ring-4 ring-opacity-30' : ''}
            `}
            style={{
              backgroundColor: lineColor,
              ringColor: lineColor,
            }}
          />
        </motion.div>
        <motion.div
          variants={animate ? dotVariants : undefined}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
        >
          <div
            className={`
              w-3 h-3 rounded-full
              ${active ? 'ring-4 ring-opacity-30' : ''}
            `}
            style={{
              backgroundColor: lineColor,
              ringColor: lineColor,
            }}
          />
        </motion.div>
      </motion.div>

      {/* Horizontal connectors */}
      <motion.div
        variants={animate ? lineVariants : undefined}
        className={`
          absolute top-0 ${position === 'left' ? 'left-0' : 'right-0'}
          w-8 h-px
        `}
        style={{ backgroundColor: lineColor }}
      />
      <motion.div
        variants={animate ? lineVariants : undefined}
        className={`
          absolute bottom-0 ${position === 'left' ? 'left-0' : 'right-0'}
          w-8 h-px
        `}
        style={{ backgroundColor: lineColor }}
      />
    </div>
  );
};

export default TimelineConnector;
