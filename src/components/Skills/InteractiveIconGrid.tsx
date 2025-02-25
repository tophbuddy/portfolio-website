import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skill } from '../../types/Skill';
import { getSkillIcon } from '../../data/skillIcons';
import Tooltip from '../ui/Tooltip';

interface InteractiveIconGridProps {
  /** List of skills to display */
  skills: Skill[];
  /** Number of columns on mobile (default: 3) */
  mobileColumns?: number;
  /** Number of columns on tablet (default: 4) */
  tabletColumns?: number;
  /** Number of columns on desktop (default: 6) */
  desktopColumns?: number;
  /** Optional CSS classes */
  className?: string;
  /** Whether to show tooltips */
  showTooltips?: boolean;
  /** Whether to animate icons */
  animate?: boolean;
  /** Optional click handler */
  onSkillClick?: (skill: Skill) => void;
  /** Optional hover handler */
  onSkillHover?: (skill: Skill | null) => void;
  /** Whether to show the connection lines */
  showConnections?: boolean;
}

/**
 * InteractiveIconGrid displays a grid of interactive technology icons
 */
const InteractiveIconGrid: React.FC<InteractiveIconGridProps> = ({
  skills,
  mobileColumns = 3,
  tabletColumns = 4,
  desktopColumns = 6,
  className = '',
  showTooltips = true,
  animate = true,
  onSkillClick,
  onSkillHover,
  showConnections = true,
}) => {
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle mouse movement for connection lines
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!showConnections) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  };

  // Calculate related skills
  const getRelatedSkills = (skill: Skill) => {
    return skills.filter(s => 
      s.id !== skill.id && 
      (s.categoryId === skill.categoryId || 
       s.relatedSkillIds?.includes(skill.id) ||
       skill.relatedSkillIds?.includes(s.id))
    );
  };

  return (
    <motion.div
      className={`relative ${className}`}
      variants={containerVariants}
      initial={animate ? 'hidden' : 'visible'}
      animate="visible"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setHoveredSkill(null);
        onSkillHover?.(null);
      }}
    >
      {/* Connection lines */}
      {showConnections && hoveredSkill && (
        <svg
          className="absolute inset-0 pointer-events-none z-0"
          style={{ width: '100%', height: '100%' }}
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          {getRelatedSkills(hoveredSkill).map((relatedSkill) => {
            const hoveredIcon = document.querySelector(`[data-skill-id="${hoveredSkill.id}"]`);
            const relatedIcon = document.querySelector(`[data-skill-id="${relatedSkill.id}"]`);
            
            if (hoveredIcon && relatedIcon) {
              const hoveredRect = hoveredIcon.getBoundingClientRect();
              const relatedRect = relatedIcon.getBoundingClientRect();
              const containerRect = document
                .querySelector('.interactive-icon-grid')
                ?.getBoundingClientRect();

              if (containerRect) {
                const x1 = hoveredRect.left - containerRect.left + hoveredRect.width / 2;
                const y1 = hoveredRect.top - containerRect.top + hoveredRect.height / 2;
                const x2 = relatedRect.left - containerRect.left + relatedRect.width / 2;
                const y2 = relatedRect.top - containerRect.top + relatedRect.height / 2;

                return (
                  <motion.line
                    key={`${hoveredSkill.id}-${relatedSkill.id}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    exit={{ pathLength: 0, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                );
              }
            }
            return null;
          })}
        </svg>
      )}

      {/* Icon grid */}
      <div
        className={`
          interactive-icon-grid grid gap-4
          grid-cols-${mobileColumns}
          sm:grid-cols-${tabletColumns}
          lg:grid-cols-${desktopColumns}
        `}
      >
        {skills.map((skill) => {
          const iconInfo = getSkillIcon(skill.id);
          const Icon = iconInfo?.icon;
          const isHovered = hoveredSkill?.id === skill.id;
          const isRelated = hoveredSkill && getRelatedSkills(hoveredSkill).some(s => s.id === skill.id);

          if (!Icon) return null;

          return (
            <motion.div
              key={skill.id}
              data-skill-id={skill.id}
              className={`
                relative aspect-square rounded-xl
                ${onSkillClick ? 'cursor-pointer' : ''}
                transition-shadow duration-300
                ${isHovered ? 'shadow-lg' : 'shadow-sm hover:shadow-md'}
                ${isRelated ? 'ring-2 ring-primary-500 ring-opacity-50' : ''}
              `}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSkillClick?.(skill)}
              onHoverStart={() => {
                setHoveredSkill(skill);
                onSkillHover?.(skill);
              }}
            >
              <div
                className={`
                  w-full h-full rounded-xl p-4
                  bg-white dark:bg-gray-800
                  flex items-center justify-center
                  overflow-hidden
                  ${isHovered ? 'ring-2 ring-primary-500' : ''}
                `}
              >
                {/* Background glow */}
                <div
                  className={`
                    absolute inset-0 opacity-10 blur-xl transition-opacity duration-300
                    ${isHovered ? 'opacity-20' : ''}
                  `}
                  style={{
                    backgroundColor: iconInfo.color.light,
                  }}
                />

                {/* Icon */}
                <Icon
                  className={`
                    w-8 h-8 md:w-10 md:h-10
                    transition-all duration-300
                    ${isHovered ? 'scale-110' : ''}
                  `}
                  style={{
                    color: iconInfo.color.light,
                  }}
                />
              </div>

              {/* Tooltip */}
              {showTooltips && (
                <Tooltip
                  content={
                    <div className="text-center">
                      <div className="font-medium">{skill.name}</div>
                      {skill.level && (
                        <div className="text-sm text-gray-300">{skill.level}</div>
                      )}
                    </div>
                  }
                  position="top"
                  delay={200}
                  maxWidth="200px"
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default InteractiveIconGrid;
