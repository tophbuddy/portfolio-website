import React from 'react';
import { motion } from 'framer-motion';
import { Tag } from '../ui';
import { Technology } from '../../types/Project';

interface TechStackProps {
  /** List of technologies */
  technologies: Technology[];
  /** Whether this is a featured card */
  featured?: boolean;
  /** Optional CSS classes */
  className?: string;
  /** Optional click handler for tech tags */
  onTechClick?: (tech: Technology) => void;
}

/**
 * TechStack component displays a list of technology tags used in a project
 * with animated reveals and interactive features.
 */
const TechStack: React.FC<TechStackProps> = ({
  technologies,
  featured = false,
  className = '',
  onTechClick,
}) => {
  // Animation variants for staggered reveal
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

  // Get color scheme based on technology type
  const getTechColor = (tech: Technology): TagProps['color'] => {
    const typeColors: Record<string, TagProps['color']> = {
      framework: 'primary',
      language: 'secondary',
      database: 'info',
      tool: 'success',
      platform: 'warning',
    };
    return typeColors[tech.type?.toLowerCase() || ''] || 'default';
  };

  // Get icon for technology if available
  const getTechIcon = (tech: Technology) => {
    if (!tech.icon) return null;
    return (
      <img
        src={tech.icon}
        alt={`${tech.name} icon`}
        className="w-4 h-4"
        loading="lazy"
      />
    );
  };

  return (
    <motion.div
      className={`flex flex-wrap gap-2 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {technologies.map((tech, index) => (
        <Tag
          key={`${tech.name}-${index}`}
          label={tech.name}
          color={getTechColor(tech)}
          size={featured ? 'md' : 'sm'}
          icon={getTechIcon(tech)}
          tooltip={tech.description}
          onClick={onTechClick ? () => onTechClick(tech) : undefined}
          className="transition-transform hover:-translate-y-0.5"
        />
      ))}
    </motion.div>
  );
};

export default TechStack;
