import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../../types/Skill';
import { getSkillIcon } from '../../data/skillIcons';
import { getSkillLevelProgress } from '../../data/skillLevels';

interface TechnologyGridProps {
  /** List of skills to display */
  skills: Skill[];
  /** Number of columns on mobile (default: 3) */
  mobileColumns?: number;
  /** Number of columns on tablet (default: 4) */
  tabletColumns?: number;
  /** Number of columns on desktop (default: 6) */
  desktopColumns?: number;
  /** Optional CSS classes */
  className?: string;
  /** Whether to show skill levels */
  showLevels?: boolean;
  /** Whether to show tooltips */
  showTooltips?: boolean;
  /** Whether to animate icons */
  animate?: boolean;
  /** Optional filter function */
  filter?: (skill: Skill) => boolean;
  /** Optional click handler */
  onSkillClick?: (skill: Skill) => void;
}

/**
 * TechnologyGrid displays a responsive grid of technology icons
 */
const TechnologyGrid: React.FC<TechnologyGridProps> = ({
  skills,
  mobileColumns = 3,
  tabletColumns = 4,
  desktopColumns = 6,
  className = '',
  showLevels = true,
  showTooltips = true,
  animate = true,
  filter,
  onSkillClick,
}) => {
  // Filter skills if filter function is provided
  const displaySkills = filter ? skills.filter(filter) : skills;

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
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
    <motion.div
      className={`grid gap-4 ${className}`}
      style={{
        gridTemplateColumns: `repeat(${mobileColumns}, minmax(0, 1fr))`,
      }}
      variants={containerVariants}
      initial={animate ? 'hidden' : 'visible'}
      whileInView="visible"
      viewport={{ once: true }}
    >
      {displaySkills.map((skill) => {
        const iconInfo = getSkillIcon(skill.id);
        const Icon = iconInfo?.icon;
        const progress = showLevels ? getSkillLevelProgress(skill.level) : null;

        if (!Icon) return null;

        return (
          <motion.div
            key={skill.id}
            className={`
              relative group aspect-square
              ${onSkillClick ? 'cursor-pointer' : ''}
            `}
            variants={itemVariants}
            onClick={() => onSkillClick?.(skill)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Icon Container */}
            <div
              className={`
                relative w-full h-full rounded-xl p-4
                bg-white dark:bg-gray-800
                shadow-sm hover:shadow-md
                transition-shadow duration-300
                flex items-center justify-center
                overflow-hidden
              `}
            >
              {/* Background Glow */}
              <div
                className="absolute inset-0 opacity-10 blur-xl transition-opacity duration-300 group-hover:opacity-20"
                style={{
                  backgroundColor: iconInfo.color.light,
                }}
              />

              {/* Icon */}
              <Icon
                className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-110"
                style={{
                  color: iconInfo.color.light,
                }}
              />

              {/* Progress Indicator */}
              {progress !== null && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 dark:bg-gray-700">
                  <div
                    className="h-full transition-all duration-300"
                    style={{
                      width: `${progress}%`,
                      backgroundColor: iconInfo.color.light,
                    }}
                  />
                </div>
              )}
            </div>

            {/* Tooltip */}
            {showTooltips && (
              <div
                className={`
                  absolute -top-10 left-1/2 -translate-x-1/2
                  px-2 py-1 rounded bg-gray-900 text-white
                  text-sm font-medium whitespace-nowrap
                  opacity-0 group-hover:opacity-100
                  transform group-hover:-translate-y-1
                  transition-all duration-300
                  pointer-events-none
                  z-10
                `}
              >
                {skill.name}
                {progress !== null && ` • ${skill.level}`}
                <div
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2
                    border-4 border-transparent
                    border-t-gray-900"
                />
              </div>
            )}
          </motion.div>
        );
      })}

      {/* Responsive Styles */}
      <style jsx>{`
        @media (min-width: 640px) {
          .grid {
            grid-template-columns: repeat(${tabletColumns}, minmax(0, 1fr));
          }
        }
        @media (min-width: 1024px) {
          .grid {
            grid-template-columns: repeat(${desktopColumns}, minmax(0, 1fr));
          }
        }
      `}</style>
    </motion.div>
  );
};

export default TechnologyGrid;
