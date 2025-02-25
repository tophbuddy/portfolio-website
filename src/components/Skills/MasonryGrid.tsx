import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Skill } from '../../types/Skill';
import { getSkillIcon } from '../../data/skillIcons';
import { getSkillLevelProgress, formatYearsOfExperience } from '../../data/skillLevels';

interface MasonryGridProps {
  /** List of skills to display */
  skills: Skill[];
  /** Number of columns on mobile (default: 1) */
  mobileColumns?: number;
  /** Number of columns on tablet (default: 2) */
  tabletColumns?: number;
  /** Number of columns on desktop (default: 3) */
  desktopColumns?: number;
  /** Gap between items in pixels (default: 16) */
  gap?: number;
  /** Optional CSS classes */
  className?: string;
  /** Whether to show skill levels */
  showLevels?: boolean;
  /** Whether to animate items */
  animate?: boolean;
  /** Optional filter function */
  filter?: (skill: Skill) => boolean;
  /** Optional click handler */
  onSkillClick?: (skill: Skill) => void;
}

/**
 * MasonryGrid displays skills in a responsive masonry layout
 */
const MasonryGrid: React.FC<MasonryGridProps> = ({
  skills,
  mobileColumns = 1,
  tabletColumns = 2,
  desktopColumns = 3,
  gap = 16,
  className = '',
  showLevels = true,
  animate = true,
  filter,
  onSkillClick,
}) => {
  // Filter skills if filter function is provided
  const displaySkills = filter ? skills.filter(filter) : skills;
  
  // State for column count based on screen size
  const [columns, setColumns] = useState(mobileColumns);
  
  // Ref for container width
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Intersection observer for animation
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Update columns based on screen size
  useEffect(() => {
    const updateColumns = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.offsetWidth;
      if (width >= 1024) {
        setColumns(desktopColumns);
      } else if (width >= 640) {
        setColumns(tabletColumns);
      } else {
        setColumns(mobileColumns);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, [mobileColumns, tabletColumns, desktopColumns]);

  // Distribute items into columns
  const getColumnItems = () => {
    const columnHeights = Array(columns).fill(0);
    const columnItems: Skill[][] = Array(columns).fill(null).map(() => []);

    displaySkills.forEach((skill) => {
      // Find the shortest column
      const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
      columnItems[shortestColumn].push(skill);
      // Update column height (simplified estimation)
      columnHeights[shortestColumn] += 1;
    });

    return columnItems;
  };

  return (
    <div
      ref={containerRef}
      className={`w-full ${className}`}
    >
      <div
        ref={ref}
        className="flex gap-4"
        style={{ gap }}
      >
        {getColumnItems().map((column, columnIndex) => (
          <div
            key={columnIndex}
            className="flex-1 flex flex-col"
            style={{ gap }}
          >
            <AnimatePresence>
              {column.map((skill, index) => {
                const iconInfo = getSkillIcon(skill.id);
                const Icon = iconInfo?.icon;
                const progress = showLevels ? getSkillLevelProgress(skill.level) : null;

                if (!Icon) return null;

                return (
                  <motion.div
                    key={skill.id}
                    className={`
                      relative group
                      bg-white dark:bg-gray-800
                      rounded-xl p-6
                      shadow-sm hover:shadow-lg
                      transition-shadow duration-300
                      ${onSkillClick ? 'cursor-pointer' : ''}
                    `}
                    initial={animate ? { opacity: 0, y: 20 } : false}
                    animate={
                      animate && inView
                        ? { opacity: 1, y: 0 }
                        : false
                    }
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                    }}
                    onClick={() => onSkillClick?.(skill)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Header */}
                    <div className="flex items-center space-x-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{
                          backgroundColor: iconInfo.color.light + '10',
                          color: iconInfo.color.light,
                        }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {skill.name}
                        </h3>
                        {skill.yearsOfExperience && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatYearsOfExperience(skill.yearsOfExperience)}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    {skill.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        {skill.description}
                      </p>
                    )}

                    {/* Progress bar */}
                    {progress !== null && (
                      <div className="relative h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className="absolute top-0 left-0 h-full rounded-full"
                          style={{
                            backgroundColor: iconInfo.color.light,
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    )}

                    {/* Certifications */}
                    {skill.certifications && skill.certifications.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {skill.certifications.map((cert, certIndex) => (
                          <a
                            key={certIndex}
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:opacity-90 transition-opacity"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg
                              className="w-3 h-3 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {cert.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasonryGrid;
