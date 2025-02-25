import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skill } from '../../types/Skill';
import { Category } from '../../types/Category';
import CategoryFilter from './CategoryFilter';
import MasonryGrid from './MasonryGrid';
import TechnologyGrid from './TechnologyGrid';
import SkillProgress from './SkillProgress';

interface SkillsSectionProps {
  /** List of all skills */
  skills: Skill[];
  /** List of skill categories */
  categories: Category[];
  /** Default selected category ID */
  defaultCategoryId?: string | null;
  /** Whether to use masonry layout */
  useMasonryLayout?: boolean;
  /** Whether to show detailed progress */
  showDetailedProgress?: boolean;
  /** Optional CSS classes */
  className?: string;
}

/**
 * SkillsSection component that displays filterable skills with animations
 */
const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  categories,
  defaultCategoryId = null,
  useMasonryLayout = false,
  showDetailedProgress = false,
  className = '',
}) => {
  // State for selected category
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(defaultCategoryId);
  const [isCompact, setIsCompact] = useState(false);

  // Calculate category counts
  const categoriesWithCounts = useMemo(() => {
    const counts = new Map<string, number>();
    skills.forEach(skill => {
      if (skill.categoryId) {
        counts.set(skill.categoryId, (counts.get(skill.categoryId) || 0) + 1);
      }
    });

    return categories.map(category => ({
      ...category,
      count: counts.get(category.id) || 0,
    }));
  }, [categories, skills]);

  // Filter skills based on selected category
  const filteredSkills = useMemo(() => {
    if (!selectedCategoryId) return skills;
    return skills.filter(skill => skill.categoryId === selectedCategoryId);
  }, [selectedCategoryId, skills]);

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.section
      className={`space-y-8 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header with filters and view toggles */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <CategoryFilter
          categories={categoriesWithCounts}
          selectedCategoryId={selectedCategoryId}
          onCategorySelect={setSelectedCategoryId}
          className="flex-grow"
        />

        {/* View toggles */}
        <div className="flex gap-2">
          <button
            onClick={() => setIsCompact(!isCompact)}
            className={`
              px-3 py-1.5 rounded-lg text-sm font-medium
              transition-colors duration-200
              ${isCompact
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }
            `}
          >
            <span className="flex items-center gap-2">
              {isCompact ? (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  Compact
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2zM5 21a1 1 0 01-1-1v-2a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5z" />
                  </svg>
                  Detailed
                </>
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Skills grid with animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedCategoryId}-${isCompact}-${useMasonryLayout}`}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {isCompact ? (
            <TechnologyGrid
              skills={filteredSkills}
              showLevels={true}
              showTooltips={true}
              animate={true}
              mobileColumns={3}
              tabletColumns={4}
              desktopColumns={6}
            />
          ) : useMasonryLayout ? (
            <MasonryGrid
              skills={filteredSkills}
              showLevels={showDetailedProgress}
              animate={true}
              mobileColumns={1}
              tabletColumns={2}
              desktopColumns={3}
              gap={16}
            />
          ) : (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSkills.map(skill => (
                <SkillProgress
                  key={skill.id}
                  skill={skill}
                  showYears={showDetailedProgress}
                  showLevel={showDetailedProgress}
                  animateOnScroll={true}
                />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Empty state */}
      {filteredSkills.length === 0 && (
        <motion.div
          className="text-center py-12"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <p className="text-gray-500 dark:text-gray-400">
            No skills found in this category.
          </p>
        </motion.div>
      )}
    </motion.section>
  );
};

export default SkillsSection;
