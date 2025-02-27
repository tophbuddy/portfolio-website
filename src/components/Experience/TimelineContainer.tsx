import { type ReactElement, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface TimelineContainerProps {
  /** Child elements to render */
  children: ReactNode;
  /** Optional className for container styling */
  className?: string;
}

/**
 * Container component for the experience timeline
 * Handles layout and animations
 */
export default function TimelineContainer({
  children,
  className = '',
}: TimelineContainerProps): ReactElement {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}
