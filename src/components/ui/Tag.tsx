import React from 'react';
import { motion } from 'framer-motion';

export interface TagProps {
  /** Label text for the tag */
  label: string;
  /** Optional color scheme */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'default';
  /** Optional size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Optional icon component */
  icon?: React.ReactNode;
  /** Optional tooltip text */
  tooltip?: string;
  /** Optional click handler */
  onClick?: () => void;
  /** Optional CSS classes */
  className?: string;
}

/**
 * Tag component for displaying labels, categories, or status indicators
 * with customizable colors, sizes, and hover effects.
 */
const Tag: React.FC<TagProps> = ({
  label,
  color = 'default',
  size = 'md',
  icon,
  tooltip,
  onClick,
  className = '',
}) => {
  // Color schemes mapping
  const colorSchemes = {
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-800 dark:text-primary-100',
    secondary: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-800 dark:text-secondary-100',
    success: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100',
    error: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100',
  };

  // Size variants mapping
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  // Interactive states
  const interactiveClasses = onClick
    ? 'cursor-pointer hover:ring-2 hover:ring-offset-2 dark:hover:ring-offset-gray-900 hover:ring-current transition-shadow'
    : '';

  return (
    <motion.span
      className={`
        inline-flex items-center gap-1 font-medium rounded-full
        ${colorSchemes[color]}
        ${sizeClasses[size]}
        ${interactiveClasses}
        ${className}
      `}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={onClick ? { scale: 1.05 } : undefined}
      whileTap={onClick ? { scale: 0.95 } : undefined}
      onClick={onClick}
      title={tooltip}
      role={onClick ? 'button' : 'status'}
      tabIndex={onClick ? 0 : undefined}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {label}
    </motion.span>
  );
};

export default Tag;
