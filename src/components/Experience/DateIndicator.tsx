import React from 'react';
import { motion } from 'framer-motion';
import { formatDate } from '../../utils/dateFormatting';

interface DateIndicatorProps {
  /** Date to display */
  date: string | 'Present';
  /** Position of the indicator relative to the timeline */
  position: 'left' | 'right';
  /** Whether this is a start or end date */
  type: 'start' | 'end';
  /** Whether this represents the current date */
  isCurrent?: boolean;
  /** Whether to show the indicator */
  visible?: boolean;
  /** Optional className for styling */
  className?: string;
}

/**
 * Component for displaying date indicators along the timeline
 */
const DateIndicator: React.FC<DateIndicatorProps> = ({
  date,
  position,
  type,
  isCurrent = false,
  visible = true,
  className = '',
}) => {
  // Format the date unless it's 'Present'
  const formattedDate = date === 'Present' ? date : formatDate(date);

  // Animation variants
  const containerVariants = {
    hidden: {
      opacity: 0,
      x: position === 'left' ? 20 : -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  // Don't render if not visible
  if (!visible) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`
        absolute ${position}-full ${type === 'start' ? 'top-0' : 'bottom-0'}
        transform ${position === 'left' ? '-translate-x-full' : 'translate-x-full'}
        px-4 py-1
        ${className}
      `}
    >
      {/* Date Display */}
      <div
        className={`
          relative flex items-center
          ${position === 'left' ? 'justify-end' : 'justify-start'}
          group
        `}
      >
        {/* Connector Line */}
        <div
          className={`
            absolute top-1/2 transform -translate-y-1/2
            ${position === 'left' ? 'right-0 translate-x-2' : 'left-0 -translate-x-2'}
            w-2 h-px bg-gray-300 dark:bg-gray-600
            group-hover:w-3 transition-all duration-200
          `}
        />

        {/* Date Text */}
        <span
          className={`
            text-sm font-medium
            ${isCurrent ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}
            group-hover:text-gray-900 dark:group-hover:text-gray-200
            transition-colors duration-200
          `}
        >
          {formattedDate}
          {isCurrent && (
            <span className="ml-2 inline-flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
          )}
        </span>
      </div>
    </motion.div>
  );
};

export default DateIndicator;
