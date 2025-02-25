import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  /** Number of projects to load initially */
  initialLoadCount?: number;
  /** Number of projects to load per batch */
  loadMoreCount?: number;
  /** Optional CSS classes */
  className?: string;
}

/**
 * ProjectGrid component displays projects in a responsive grid layout
 * with filtering capabilities, load more functionality, and smooth animations.
 */
const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  showFeatured = false,
  category,
  technology,
  initialLoadCount = 6,
  loadMoreCount = 6,
  className = '',
}) => {
  // State for visible project count
  const [visibleCount, setVisibleCount] = useState(initialLoadCount);
  const [isLoading, setIsLoading] = useState(false);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(initialLoadCount);
  }, [showFeatured, category, technology, initialLoadCount]);

  // Filter projects based on props
  const filteredProjects = projects.filter(project => {
    if (showFeatured && !project.featured) return false;
    if (category && project.category !== category) return false;
    if (technology && !project.technologies.some(tech => tech.name === technology)) {
      return false;
    }
    return true;
  });

  // Split into featured and regular projects
  const featuredProjects = filteredProjects.filter(project => project.featured);
  const regularProjects = filteredProjects.filter(project => !project.featured);

  // Determine visible projects
  const visibleProjects = [
    ...featuredProjects,
    ...regularProjects.slice(0, visibleCount - featuredProjects.length),
  ];

  // Handle load more
  const handleLoadMore = async () => {
    setIsLoading(true);
    // Simulate network delay for smooth animation
    await new Promise(resolve => setTimeout(resolve, 500));
    setVisibleCount(prev => prev + loadMoreCount);
    setIsLoading(false);
  };

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

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <div className={className}>
      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        role="grid"
        aria-label="Project grid"
      >
        <AnimatePresence mode="wait">
          {visibleProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
              }}
              className={
                project.featured
                  ? 'sm:col-span-2 lg:col-span-3 xl:col-span-2'
                  : ''
              }
            >
              <ProjectCard
                project={project}
                featured={project.featured}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

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

      {/* Load more button */}
      {visibleProjects.length < filteredProjects.length && (
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            onClick={handleLoadMore}
            disabled={isLoading}
            className={`
              px-6 py-3 rounded-lg
              bg-primary-500 hover:bg-primary-600
              text-white font-medium
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center gap-2
            `}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {isLoading ? (
              <>
                <svg
                  className="w-5 h-5 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Loading...
              </>
            ) : (
              <>
                Load More
                <span className="text-sm opacity-75">
                  ({filteredProjects.length - visibleProjects.length} remaining)
                </span>
              </>
            )}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectGrid;
