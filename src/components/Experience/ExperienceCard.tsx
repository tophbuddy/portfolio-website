import React from 'react';
import { motion } from 'framer-motion';
import { ExperienceEntry } from '../../types/Experience';
import { getCategoryMetadata } from '../../utils/categoryUtils';
import { formatDateRange, calculateDuration } from '../../utils/dateFormatting';

interface ExperienceCardProps {
  /** Experience entry to display */
  experience: ExperienceEntry;
  /** Whether the card appears on the left or right of the timeline */
  position: 'left' | 'right';
  /** Whether to show detailed information */
  detailed?: boolean;
  /** Optional click handler */
  onClick?: () => void;
  /** Optional className for styling */
  className?: string;
}

/**
 * Card component for displaying an experience entry in the timeline
 */
const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  position,
  detailed = true,
  onClick,
  className = '',
}) => {
  const categoryMetadata = experience.category 
    ? getCategoryMetadata(experience.category)
    : null;

  const dateRange = formatDateRange(experience.startDate, experience.endDate);
  const duration = calculateDuration(experience.startDate, experience.endDate);

  // Animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      x: position === 'left' ? -20 : 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      className={`
        relative w-full md:w-[calc(50%-2rem)] ${position === 'right' ? 'md:ml-auto' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {/* Timeline Dot */}
      <div
        className={`
          hidden md:block absolute top-6 ${position === 'left' ? 'right-[-2.5rem]' : 'left-[-2.5rem]'}
          w-4 h-4 rounded-full border-2 border-white dark:border-gray-900
          transform -translate-x-1/2
        `}
        style={{
          backgroundColor: categoryMetadata?.color || '#6B7280',
        }}
      />

      {/* Card Content */}
      <div
        className={`
          bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md
          transition-shadow duration-300 overflow-hidden
          ${onClick ? 'cursor-pointer' : ''}
        `}
      >
        {/* Header */}
        <div className="p-6 pb-4">
          {/* Company and Title */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {experience.title}
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-300">
                {experience.company}
              </p>
            </div>
            {experience.logoUrl && (
              <img
                src={experience.logoUrl}
                alt={`${experience.company} logo`}
                className="w-12 h-12 object-contain"
              />
            )}
          </div>

          {/* Category and Location */}
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
            {categoryMetadata && (
              <span
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: `${categoryMetadata.color}20`,
                  color: categoryMetadata.color,
                }}
              >
                {categoryMetadata.label}
              </span>
            )}
            <span className="text-gray-500 dark:text-gray-400">
              {experience.location}
            </span>
          </div>

          {/* Dates */}
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>{dateRange}</span>
            <span>•</span>
            <span>{duration}</span>
          </div>
        </div>

        {/* Details */}
        {detailed && (
          <>
            {/* Summary */}
            {experience.summary && (
              <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-300">
                  {experience.summary}
                </p>
              </div>
            )}

            {/* Achievements */}
            {experience.achievements.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Key Achievements
                </h4>
                <ul className="space-y-2">
                  {experience.achievements.map((achievement, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 flex-shrink-0" />
                      <span>{achievement.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            {experience.technologies.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <span
                      key={tech.id}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
