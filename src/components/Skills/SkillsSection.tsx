import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skill } from '../../types/Skill';
import { Category } from '../../types/Category';
import CategoryFilter from './CategoryFilter';
import MasonryGrid from './MasonryGrid';
import TechnologyGrid from './TechnologyGrid';
import AnimatedSkillBar from './AnimatedSkillBar';
import InteractiveIconGrid from './InteractiveIconGrid';

interface SkillsSectionProps {
  /** List of all skills */
  skills: Skill[];
  /** List of skill categories */
  categories: Category[];
  /** Optional default selected category */
  defaultCategoryId?: string;
  /** Optional CSS classes */
  className?: string;
}

/**
 * SkillsSection displays a responsive grid of skills with filtering and animations
 */
const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  categories,
  defaultCategoryId,
  className = '',
}) => {
  // State
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    defaultCategoryId || null
  );
  const [isCompactView, setIsCompactView] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  // Filter skills by category
  const filteredSkills = selectedCategoryId
    ? skills.filter((skill) => skill.categoryId === selectedCategoryId)
    : skills;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 sm:px-0">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Skills & Technologies
        </h2>
        
        {/* View toggle */}
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => setIsCompactView(false)}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              !isCompactView
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-900 dark:text-primary-100'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            Detailed
          </button>
          <button
            onClick={() => setIsCompactView(true)}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              isCompactView
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-900 dark:text-primary-100'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            Compact
          </button>
        </div>
      </div>

      {/* Category filter */}
      <div className="overflow-x-auto pb-2 px-4 sm:px-0 -mx-4 sm:mx-0">
        <CategoryFilter
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onCategorySelect={setSelectedCategoryId}
          className="min-w-max"
        />
      </div>

      {/* Skills grid */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {isCompactView ? (
            // Compact view
            <motion.div
              key="compact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="px-4 sm:px-0"
            >
              <InteractiveIconGrid
                skills={filteredSkills}
                mobileColumns={3}
                tabletColumns={4}
                desktopColumns={6}
                showTooltips
                showConnections
                onSkillClick={setSelectedSkill}
              />
            </motion.div>
          ) : (
            // Detailed view
            <motion.div
              key="detailed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8 px-4 sm:px-0"
            >
              {/* Featured skills */}
              <div className="space-y-4">
                {filteredSkills
                  .filter((skill) => skill.featured)
                  .map((skill) => (
                    <AnimatedSkillBar
                      key={skill.id}
                      value={skill.level === 'expert' ? 95 : skill.level === 'advanced' ? 80 : 65}
                      label={skill.name}
                      secondaryLabel={`${skill.yearsOfExperience}+ years`}
                      showShine
                      showPulse={skill.level === 'expert'}
                    />
                  ))}
              </div>

              {/* Other skills */}
              <MasonryGrid
                items={filteredSkills.filter((skill) => !skill.featured)}
                columns={{ default: 1, sm: 2, lg: 3 }}
                className="gap-4"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skill details modal */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
              onClick={() => setSelectedSkill(null)}
            >
              <div
                className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-lg w-full space-y-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold">{selectedSkill.name}</h3>
                {selectedSkill.description && (
                  <p className="text-gray-600 dark:text-gray-300">
                    {selectedSkill.description}
                  </p>
                )}
                <div className="flex justify-end">
                  <button
                    onClick={() => setSelectedSkill(null)}
                    className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default SkillsSection;
