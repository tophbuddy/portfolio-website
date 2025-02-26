import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExperienceEntry } from '../../types/Experience';
import { ExperienceCategory } from '../../types/ExperienceCategory';
import { filterExperiencesByCategory, getSortedCategories } from '../../utils/categoryUtils';
import FilterBar from './FilterBar';

interface TimelineContainerProps {
  /** List of experience entries to display */
  experiences: ExperienceEntry[];
  /** Optional className for container styling */
  className?: string;
  /** Whether to show category filters */
  showFilters?: boolean;
  /** Whether to animate entries */
  animate?: boolean;
}

/**
 * Container component for the experience timeline
 * Handles layout, filtering, and animations
 */
const TimelineContainer: React.FC<TimelineContainerProps> = ({
  experiences,
  className = '',
  showFilters = true,
  animate = true,
}) => {
  // State for active category filters
  const [activeCategories, setActiveCategories] = useState<ExperienceCategory[]>(
    getSortedCategories()
  );

  // Filter experiences based on active categories
  const filteredExperiences = filterExperiencesByCategory(
    experiences,
    activeCategories
  );

  // Toggle category filter
  const toggleCategory = (category: ExperienceCategory) => {
    setActiveCategories(prev => {
      if (prev.includes(category)) {
        // Don't allow deselecting if it's the last category
        if (prev.length === 1) return prev;
        return prev.filter(c => c !== category);
      }
      return [...prev, category];
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {/* Category Filters */}
      {showFilters && (
        <FilterBar
          activeCategories={activeCategories}
          onToggleCategory={toggleCategory}
          className="mb-8"
        />
      )}

      {/* Timeline Content */}
      <motion.div
        variants={animate ? containerVariants : undefined}
        initial={animate ? 'hidden' : undefined}
        animate={animate ? 'visible' : undefined}
        className="relative"
      >
        {/* Timeline Line */}
        <div
          className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700"
          style={{ left: '50%' }}
        />

        {/* Timeline Entries */}
        <AnimatePresence mode="wait">
          <div className="relative space-y-8">
            {filteredExperiences.map(experience => (
              <motion.div
                key={experience.id}
                initial={animate ? { opacity: 0, y: 20 } : undefined}
                animate={animate ? { opacity: 1, y: 0 } : undefined}
                exit={animate ? { opacity: 0, y: -20 } : undefined}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {/* Entry content will be rendered by child components */}
                {experience.company} - {experience.title}
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredExperiences.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No experiences found for the selected categories.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TimelineContainer;
