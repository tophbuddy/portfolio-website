import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../../types/Project';

interface ProjectContentProps {
  /** Project data */
  project: Pick<Project, 'title' | 'summary' | 'description' | 'status'>;
  /** Whether this is a featured card */
  featured?: boolean;
  /** Optional CSS classes */
  className?: string;
}

/**
 * ProjectContent component displays the title, summary, and description of a project
 * with animated reveal effects and responsive typography.
 */
const ProjectContent: React.FC<ProjectContentProps> = ({
  project: { title, summary, description, status },
  featured = false,
  className = '',
}) => {
  return (
    <motion.div
      className={`space-y-3 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Status Badge */}
      {status !== 'completed' && (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-800 dark:text-primary-100">
          {status === 'in-progress' ? 'In Progress' : 'Planned'}
        </span>
      )}

      {/* Title */}
      <motion.h3
        className={`font-bold text-gray-900 dark:text-white ${
          featured ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'
        }`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        {title}
      </motion.h3>

      {/* Summary */}
      <motion.p
        className={`text-gray-600 dark:text-gray-300 ${
          featured ? 'text-lg' : 'text-base'
        }`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        {summary}
      </motion.p>

      {/* Description - Only shown for featured cards */}
      {featured && description && (
        <motion.div
          className="prose dark:prose-invert mt-4 text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.5 }}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </motion.div>
  );
};

export default ProjectContent;
