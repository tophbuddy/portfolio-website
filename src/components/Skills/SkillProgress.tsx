import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Skill } from '../../types/Skill';
import { getSkillIcon } from '../../data/skillIcons';
import { getSkillLevelProgress, formatYearsOfExperience } from '../../data/skillLevels';
import ProgressBar from '../ui/ProgressBar';

interface SkillProgressProps {
  /** Skill data */
  skill: Skill;
  /** Optional CSS classes */
  className?: string;
  /** Whether to show the years of experience */
  showYears?: boolean;
  /** Whether to show the skill level */
  showLevel?: boolean;
  /** Whether to animate on scroll */
  animateOnScroll?: boolean;
}

/**
 * SkillProgress component displays a skill with its icon, name, and progress bar
 */
const SkillProgress: React.FC<SkillProgressProps> = ({
  skill,
  className = '',
  showYears = true,
  showLevel = true,
  animateOnScroll = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const iconInfo = getSkillIcon(skill.id);
  const progress = getSkillLevelProgress(skill.level);

  // Animation variants
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial={animateOnScroll ? 'hidden' : 'visible'}
      animate={animateOnScroll ? (isInView ? 'visible' : 'hidden') : 'visible'}
      transition={{ duration: 0.5 }}
      className={`flex flex-col space-y-2 ${className}`}
    >
      {/* Skill header with icon and name */}
      <div className="flex items-center space-x-3">
        {iconInfo?.icon && (
          <div
            className="w-6 h-6 flex items-center justify-center rounded"
            style={{
              color: iconInfo.color.light,
              backgroundColor: iconInfo.background?.light,
            }}
          >
            <iconInfo.icon className="w-4 h-4" />
          </div>
        )}
        <span className="font-medium text-gray-900 dark:text-gray-100">
          {skill.name}
        </span>
      </div>

      {/* Progress bar */}
      <ProgressBar
        value={progress}
        color={iconInfo?.color}
        height={6}
        animateOnScroll={animateOnScroll}
        secondaryLabel={
          showLevel
            ? skill.level.charAt(0).toUpperCase() + skill.level.slice(1)
            : undefined
        }
      />

      {/* Additional info */}
      {(showYears || skill.description) && (
        <div className="flex justify-between items-center text-sm">
          {skill.description && (
            <span className="text-gray-600 dark:text-gray-400">
              {skill.description}
            </span>
          )}
          {showYears && (
            <span className="text-gray-500 dark:text-gray-400 ml-auto">
              {formatYearsOfExperience(skill.yearsOfExperience)}
            </span>
          )}
        </div>
      )}

      {/* Certifications */}
      {skill.certifications && skill.certifications.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {skill.certifications.map((cert, index) => (
            <a
              key={index}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:opacity-90 transition-opacity"
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
};

export default SkillProgress;
