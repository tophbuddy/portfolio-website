import React from 'react';
import { motion } from 'framer-motion';
import { Category } from '../../types/Category';

interface CategoryFilterProps {
  /** List of categories */
  categories: Category[];
  /** Currently selected category ID */
  selectedCategoryId: string | null;
  /** Callback when category is selected */
  onCategorySelect: (categoryId: string | null) => void;
  /** Optional CSS classes */
  className?: string;
}

/**
 * CategoryFilter displays a list of filterable categories with animations
 */
const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategoryId,
  onCategorySelect,
  className = '',
}) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {/* All Categories Option */}
      <motion.button
        className={`
          px-4 py-2 rounded-full text-sm font-medium
          transition-colors duration-200
          ${selectedCategoryId === null
            ? 'bg-primary-500 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }
        `}
        onClick={() => onCategorySelect(null)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        layout
      >
        All
      </motion.button>

      {/* Category Buttons */}
      {categories.map((category) => (
        <motion.button
          key={category.id}
          className={`
            px-4 py-2 rounded-full text-sm font-medium
            transition-colors duration-200
            ${selectedCategoryId === category.id
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }
          `}
          onClick={() => onCategorySelect(category.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          layout
        >
          <span className="flex items-center space-x-2">
            {category.icon && (
              <span className="text-lg" role="img" aria-label={category.name}>
                {category.icon}
              </span>
            )}
            <span>{category.name}</span>
            {category.count !== undefined && (
              <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-gray-200 dark:bg-gray-700">
                {category.count}
              </span>
            )}
          </span>
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryFilter;
