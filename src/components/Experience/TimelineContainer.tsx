import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExperienceEntry } from '../../types/Experience';
import { ExperienceCategory } from '../../types/ExperienceCategory';
import { filterExperiencesByCategory, getSortedCategories } from '../../utils/categoryUtils';
import FilterBar from './FilterBar';
import ExperienceCard from './ExperienceCard';
import TimelineConnector from './TimelineConnector';
import { useMediaQuery } from '../../hooks/useMediaQuery';

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
  const isMobile = useMediaQuery('(max-width: 768px)');
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
          className="mb-8 sticky top-0 z-10 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80"
        />
      )}

      {/* Timeline Content */}
      <motion.div
        variants={animate ? containerVariants : undefined}
        initial={animate ? 'hidden' : undefined}
        animate={animate ? 'visible' : undefined}
        className="relative"
      >
        {/* Timeline Line - Hidden on mobile */}
        <div
          className={`
            absolute left-0 w-px bg-gray-200 dark:bg-gray-700
            ${isMobile ? 'left-4' : 'left-1/2'}
            top-0 bottom-0
          `}
        />

        {/* Timeline Entries */}
        <AnimatePresence mode="wait">
          <div className="relative space-y-8">
            {filteredExperiences.map((experience, index) => {
              const position = isMobile ? 'right' : index % 2 === 0 ? 'left' : 'right';
              const isLast = index === filteredExperiences.length - 1;

              return (
                <div key={experience.id} className="relative">
                  {/* Experience Card */}
                  <ExperienceCard
                    experience={experience}
                    position={position}
                    className={`
                      ${isMobile ? 'ml-8' : ''}
                      ${position === 'right' ? 'md:ml-[calc(50%+2rem)]' : 'md:mr-[calc(50%+2rem)]'}
                    `}
                  />

                  {/* Timeline Connector */}
                  {!isLast && (
                    <TimelineConnector
                      position={position}
                      active={experience.endDate === 'Present'}
                      className={`
                        ${isMobile ? 'left-4' : position === 'left' ? 'right-1/2' : 'left-1/2'}
                      `}
                    />
                  )}
                </div>
              );
            })}
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
