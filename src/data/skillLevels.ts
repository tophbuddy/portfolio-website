import { SkillLevel } from '../types/Skill';

/**
 * Interface for skill level metadata
 */
interface SkillLevelInfo {
  /** Display name of the level */
  name: string;
  /** Short description of what this level means */
  description: string;
  /** Numerical value for progress calculations (0-100) */
  value: number;
  /** Color theme for visual representation */
  color: {
    light: string;
    dark: string;
  };
  /** Icon name for the level */
  icon: string;
  /** Years of experience typically needed */
  typicalYears: number;
}

/**
 * Detailed information about each skill level
 */
export const skillLevelInfo: Record<SkillLevel, SkillLevelInfo> = {
  beginner: {
    name: 'Beginner',
    description: 'Basic understanding and limited practical experience',
    value: 25,
    color: {
      light: '#94A3B8', // slate-400
      dark: '#64748B', // slate-500
    },
    icon: 'seedling',
    typicalYears: 0.5,
  },
  intermediate: {
    name: 'Intermediate',
    description: 'Good working knowledge and regular practical application',
    value: 50,
    color: {
      light: '#60A5FA', // blue-400
      dark: '#3B82F6', // blue-500
    },
    icon: 'tree',
    typicalYears: 2,
  },
  advanced: {
    name: 'Advanced',
    description: 'Deep understanding and extensive practical experience',
    value: 75,
    color: {
      light: '#34D399', // emerald-400
      dark: '#10B981', // emerald-500
    },
    icon: 'tree-large',
    typicalYears: 4,
  },
  expert: {
    name: 'Expert',
    description: 'Mastery level with proven track record and ability to innovate',
    value: 100,
    color: {
      light: '#FBBF24', // amber-400
      dark: '#F59E0B', // amber-500
    },
    icon: 'crown',
    typicalYears: 6,
  },
};

/**
 * Get the appropriate skill level based on years of experience
 */
export const getSkillLevelFromYears = (years: number): SkillLevel => {
  if (years >= skillLevelInfo.expert.typicalYears) return 'expert';
  if (years >= skillLevelInfo.advanced.typicalYears) return 'advanced';
  if (years >= skillLevelInfo.intermediate.typicalYears) return 'intermediate';
  return 'beginner';
};

/**
 * Get the progress percentage (0-100) for a given skill level
 */
export const getSkillLevelProgress = (level: SkillLevel): number => {
  return skillLevelInfo[level].value;
};

/**
 * Get a human-readable description of years of experience
 */
export const formatYearsOfExperience = (years: number): string => {
  if (years < 1) {
    const months = Math.round(years * 12);
    return `${months} month${months === 1 ? '' : 's'}`;
  }
  return `${years} year${years === 1 ? '' : 's'}`;
};

/**
 * Calculate the relative progress within a skill level
 * Returns a value between 0-1 representing progress to next level
 */
export const getRelativeLevelProgress = (years: number, currentLevel: SkillLevel): number => {
  const currentLevelInfo = skillLevelInfo[currentLevel];
  const nextLevel = Object.values(skillLevelInfo).find(level => level.typicalYears > currentLevelInfo.typicalYears);
  
  if (!nextLevel) return 1; // Already at max level
  
  const yearsInCurrentLevel = years - currentLevelInfo.typicalYears;
  const yearsToNextLevel = nextLevel.typicalYears - currentLevelInfo.typicalYears;
  
  return Math.min(1, Math.max(0, yearsInCurrentLevel / yearsToNextLevel));
};
