import { SkillCategory } from '../types/Skill';

/**
 * Predefined skill categories for the portfolio
 */
export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend Development',
    description: 'Building responsive, accessible, and performant user interfaces',
    icon: 'code',
    color: {
      light: '#60A5FA', // blue-400
      dark: '#3B82F6', // blue-500
    },
    order: 1,
  },
  {
    id: 'backend',
    name: 'Backend Development',
    description: 'Designing scalable server-side applications and APIs',
    icon: 'server',
    color: {
      light: '#34D399', // emerald-400
      dark: '#10B981', // emerald-500
    },
    order: 2,
  },
  {
    id: 'devops',
    name: 'DevOps & Cloud',
    description: 'Automating deployment, scaling, and infrastructure management',
    icon: 'cloud',
    color: {
      light: '#F472B6', // pink-400
      dark: '#EC4899', // pink-500
    },
    order: 3,
  },
  {
    id: 'mobile',
    name: 'Mobile Development',
    description: 'Creating native and cross-platform mobile applications',
    icon: 'mobile',
    color: {
      light: '#A78BFA', // violet-400
      dark: '#8B5CF6', // violet-500
    },
    order: 4,
  },
  {
    id: 'database',
    name: 'Database & Storage',
    description: 'Managing data storage, retrieval, and optimization',
    icon: 'database',
    color: {
      light: '#FBBF24', // amber-400
      dark: '#F59E0B', // amber-500
    },
    order: 5,
  },
  {
    id: 'testing',
    name: 'Testing & Quality',
    description: 'Ensuring code quality through testing and automation',
    icon: 'check-circle',
    color: {
      light: '#4ADE80', // green-400
      dark: '#22C55E', // green-500
    },
    order: 6,
  },
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    description: 'Implementing intelligent systems and data analysis',
    icon: 'brain',
    color: {
      light: '#FB7185', // rose-400
      dark: '#F43F5E', // rose-500
    },
    order: 7,
  },
  {
    id: 'tools',
    name: 'Tools & Productivity',
    description: 'Development tools, IDEs, and productivity software',
    icon: 'tools',
    color: {
      light: '#94A3B8', // slate-400
      dark: '#64748B', // slate-500
    },
    order: 8,
  },
];

/**
 * Get a skill category by its ID
 */
export const getSkillCategory = (id: string): SkillCategory | undefined => {
  return skillCategories.find(category => category.id === id);
};

/**
 * Get all skill categories sorted by order
 */
export const getSortedSkillCategories = (): SkillCategory[] => {
  return [...skillCategories].sort((a, b) => a.order - b.order);
};
