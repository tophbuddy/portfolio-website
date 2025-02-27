import { type ReactElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExperienceCategory } from '../../types/ExperienceCategory';
import { getCategoryMetadata } from '../../utils/categoryUtils';

interface FilterBarProps {
  /** List of available categories */
  categories: ExperienceCategory[];
  /** Currently selected category */
  selectedCategory: ExperienceCategory | null;
  /** Callback when a category is selected */
  onFilter: (category: ExperienceCategory | null) => void;
  /** Optional className for styling */
  className?: string;
}

/**
 * Component for filtering experiences by category
 */
export default function FilterBar({
  categories,
  selectedCategory,
  onFilter,
  className = '',
}: FilterBarProps): ReactElement {
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

  const handleClick = (category: ExperienceCategory) => {
    if (selectedCategory === category) {
      onFilter(null);
    } else {
      onFilter(category);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 ${className}`}
    >
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {categories.map((category) => {
            const metadata = getCategoryMetadata(category);
            const isSelected = selectedCategory === category;

            return (
              <motion.button
                key={category}
                variants={itemVariants}
                onClick={() => handleClick(category)}
                className={`
                  px-4 py-2 rounded-lg font-medium transition-all duration-normal
                  ${isSelected
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }
                `}
              >
                <span className="flex items-center gap-2">
                  <span className="text-sm">{metadata.label}</span>
                  {metadata.icon && (
                    <span className="w-4 h-4" style={{ color: metadata.color }}>
                      {metadata.icon}
                    </span>
                  )}
                </span>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
