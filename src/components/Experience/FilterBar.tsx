import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExperienceCategory } from '../../types/ExperienceCategory';
import { getCategoryMetadata } from '../../utils/categoryUtils';

interface FilterBarProps {
  /** Currently active categories */
  activeCategories: ExperienceCategory[];
  /** Callback when a category is toggled */
  onToggleCategory: (category: ExperienceCategory) => void;
  /** Optional className for styling */
  className?: string;
}

/**
 * Component for filtering experiences by category
 */
const FilterBar: React.FC<FilterBarProps> = ({
  activeCategories,
  onToggleCategory,
  className = '',
}) => {
  const allCategories = Object.values(ExperienceCategory);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`
        bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4
        ${className}
      `}
    >
      <div className="flex flex-col space-y-4">
        {/* Title */}
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Filter by Experience Type
        </h3>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          <AnimatePresence mode="wait">
            {allCategories.map((category) => {
              const metadata = getCategoryMetadata(category);
              const isActive = activeCategories.includes(category);
              const isDisabled = activeCategories.length === 1 && isActive;

              return (
                <motion.button
                  key={category}
                  variants={itemVariants}
                  onClick={() => !isDisabled && onToggleCategory(category)}
                  disabled={isDisabled}
                  className={`
                    inline-flex items-center px-3 py-1.5 rounded-full text-sm
                    font-medium transition-all duration-200
                    ${
                      isActive
                        ? 'ring-2 ring-offset-2 dark:ring-offset-gray-800'
                        : 'opacity-70 hover:opacity-100'
                    }
                    ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                  `}
                  style={{
                    backgroundColor: isActive ? metadata.color : `${metadata.color}20`,
                    color: isActive ? '#ffffff' : metadata.color,
                    ringColor: metadata.color,
                  }}
                >
                  {/* Icon */}
                  <span className="mr-1.5">{metadata.icon}</span>

                  {/* Label */}
                  <span>{metadata.label}</span>

                  {/* Count Badge */}
                  {isActive && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-2 bg-white bg-opacity-20 px-1.5 py-0.5 rounded-full text-xs"
                    >
                      Active
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Active Filters Summary */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {activeCategories.length === allCategories.length ? (
            'Showing all experience types'
          ) : (
            `Showing ${activeCategories.length} of ${allCategories.length} types`
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBar;
