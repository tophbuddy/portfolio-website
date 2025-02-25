import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../../types/Skill';
import SkillProgress from './SkillProgress';

interface MasonryGridProps {
  /** Skills to display in the grid */
  skills: Skill[];
  /** Number of columns at different breakpoints */
  columns: {
    default: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  /** Optional CSS classes */
  className?: string;
  /** Whether to animate items */
  animate?: boolean;
}

/**
 * MasonryGrid displays skills in a responsive masonry layout
 */
const MasonryGrid: React.FC<MasonryGridProps> = ({
  skills,
  columns,
  className = '',
  animate = true,
}) => {
  // Calculate column classes based on breakpoints
  const getColumnClass = () => {
    const classes = [`grid-cols-${columns.default}`];
    if (columns.sm) classes.push(`sm:grid-cols-${columns.sm}`);
    if (columns.md) classes.push(`md:grid-cols-${columns.md}`);
    if (columns.lg) classes.push(`lg:grid-cols-${columns.lg}`);
    if (columns.xl) classes.push(`xl:grid-cols-${columns.xl}`);
    return classes.join(' ');
  };

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      className={`grid ${getColumnClass()} ${className}`}
      variants={animate ? containerVariants : undefined}
      initial={animate ? 'hidden' : undefined}
      animate={animate ? 'visible' : undefined}
    >
      {skills.map((skill) => (
        <motion.div
          key={skill.id}
          variants={animate ? itemVariants : undefined}
        >
          <SkillProgress
            skill={skill}
            showLevel
            showYears
            animateOnScroll={false}
            className="h-full"
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MasonryGrid;
