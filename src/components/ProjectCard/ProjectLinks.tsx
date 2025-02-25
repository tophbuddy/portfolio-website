import React from 'react';
import { motion } from 'framer-motion';
import { ProjectLink } from '../../types/Project';

interface ProjectLinksProps {
  /** Array of project links */
  links: ProjectLink[];
  /** Whether this is a featured card */
  featured?: boolean;
  /** Optional CSS classes */
  className?: string;
}

/**
 * ProjectLinks component displays GitHub, live demo, and other project links
 * with icons and hover effects.
 */
const ProjectLinks: React.FC<ProjectLinksProps> = ({
  links,
  featured = false,
  className = '',
}) => {
  // Link type icons mapping
  const linkIcons: Record<ProjectLink['type'], React.ReactNode> = {
    github: (
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
    demo: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    ),
    docs: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    other: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
        />
      </svg>
    ),
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className={`flex flex-wrap gap-3 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {links.map((link, index) => (
        <motion.a
          key={`${link.type}-${index}`}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            inline-flex items-center gap-2 px-4 py-2 rounded-lg
            bg-gray-100 dark:bg-gray-800
            text-gray-700 dark:text-gray-300
            hover:bg-gray-200 dark:hover:bg-gray-700
            transition-colors duration-200
            ${featured ? 'text-base' : 'text-sm'}
          `}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={link.label}
        >
          {/* Icon */}
          {link.icon ? (
            <img
              src={link.icon}
              alt=""
              className="w-5 h-5"
              aria-hidden="true"
            />
          ) : (
            linkIcons[link.type]
          )}

          {/* Label */}
          <span className="font-medium">{link.label}</span>
        </motion.a>
      ))}
    </motion.div>
  );
};

export default ProjectLinks;
