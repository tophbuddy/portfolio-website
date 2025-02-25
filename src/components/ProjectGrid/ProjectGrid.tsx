import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../../types/Project';
import ProjectCard from '../ProjectCard/ProjectCard';

interface ProjectGridProps {
  /** Array of projects to display */
  projects: Project[];
  /** Optional filter for featured projects */
  showFeatured?: boolean;
  /** Optional category filter */
  category?: string;
  /** Optional technology filter */
  technology?: string;
  /** Optional CSS classes */
  className?: string;
}

/**
 * ProjectGrid component displays projects in a responsive grid layout
 * with filtering capabilities and smooth animations.
 */
const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  showFeatured = false,
  category,
  technology,
  className = '',
}) => {
  // Filter projects based on props
  const filteredProjects = projects.filter(project => {
    if (showFeatured && !project.featured) return false;
    if (category && project.category !== category) return false;
    if (technology && !project.technologies.some(tech => tech.name === technology)) {
      return false;
    }
    return true;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className={`
        grid grid-cols-1 gap-6
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        ${className}
      `}
      variants={containerVariants}
      initial="hidden"
      animate="show"
      role="grid"
      aria-label="Project grid"
    >
      {/* Featured projects - shown first and span 2 columns */}
      {filteredProjects
        .filter(project => project.featured)
        .map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            featured={true}
            className="sm:col-span-2 lg:col-span-3 xl:col-span-2"
          />
        ))}

      {/* Regular projects */}
      {filteredProjects
        .filter(project => !project.featured)
        .map(project => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}

      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <motion.div
          className="
            col-span-full
            flex flex-col items-center justify-center
            p-8 text-center
            bg-gray-50 dark:bg-gray-900
            rounded-lg
          "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <svg
            className="w-16 h-16 mb-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            No projects found
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Try adjusting your filters or check back later for new projects.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProjectGrid;
