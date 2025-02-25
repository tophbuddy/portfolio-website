import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Project } from '../../types/Project';
import ProjectImage from './ProjectImage';
import ProjectContent from './ProjectContent';
import TechStack from './TechStack';
import ProjectLinks from './ProjectLinks';

interface ProjectCardProps {
  /** Project data */
  project: Project;
  /** Whether this is a featured card */
  featured?: boolean;
  /** Optional click handler */
  onClick?: () => void;
  /** Optional CSS classes */
  className?: string;
}

/**
 * ProjectCard component combines all project elements with smooth animations
 * and interactive hover effects.
 */
const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  featured = false,
  onClick,
  className = '',
}) => {
  // Mouse position for gradient effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Handle mouse move for gradient effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  // Dynamic gradient based on mouse position
  const background = useMotionTemplate`
    radial-gradient(
      circle at ${mouseX}% ${mouseY}%,
      var(--gradient-start) 0%,
      var(--gradient-end) 50%,
      transparent 100%
    )
  `;

  return (
    <motion.article
      className={`
        group relative overflow-hidden rounded-2xl
        bg-white dark:bg-gray-900
        border border-gray-200 dark:border-gray-800
        ${featured ? 'lg:col-span-2' : ''}
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      style={{
        '--gradient-start': 'rgba(255, 255, 255, 0.075)',
        '--gradient-end': 'transparent',
      } as React.CSSProperties}
    >
      {/* Hover gradient overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background }}
      />

      {/* Card content */}
      <div className="flex flex-col h-full">
        {/* Image section */}
        <div className="relative">
          <ProjectImage
            images={project.images}
            title={project.title}
            featured={featured}
            onClick={onClick}
          />
        </div>

        {/* Content section */}
        <div className="flex flex-col flex-grow p-6 space-y-4">
          <ProjectContent
            project={project}
            featured={featured}
          />

          {/* Tech stack */}
          <TechStack
            technologies={project.technologies}
            featured={featured}
            className="mt-auto pt-4"
          />

          {/* Links */}
          <ProjectLinks
            links={project.links}
            featured={featured}
            className="pt-2"
          />
        </div>
      </div>

      {/* Focus outline */}
      {onClick && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={false}
          animate={{ 
            boxShadow: 'none',
          }}
          whileHover={{ 
            boxShadow: '0 0 0 2px var(--tw-shadow-color)',
          }}
          style={{
            '--tw-shadow-color': 'rgb(var(--color-primary-500) / 0.5)',
          } as React.CSSProperties}
        />
      )}
    </motion.article>
  );
};

export default ProjectCard;
