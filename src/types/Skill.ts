/**
 * Represents the proficiency level of a skill
 */
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

/**
 * Represents a category of skills (e.g., "Frontend", "Backend", etc.)
 */
export interface SkillCategory {
  /** Unique identifier for the category */
  id: string;
  /** Display name of the category */
  name: string;
  /** Optional description of the category */
  description?: string;
  /** Icon name from the icon library */
  icon: string;
  /** Color theme for the category */
  color: {
    light: string;
    dark: string;
  };
  /** Order for display (lower numbers appear first) */
  order: number;
}

/**
 * Represents an individual skill
 */
export interface Skill {
  /** Unique identifier for the skill */
  id: string;
  /** Display name of the skill */
  name: string;
  /** Category ID this skill belongs to */
  categoryId: string;
  /** Optional description of the skill */
  description?: string;
  /** URL to the skill's documentation or website */
  url?: string;
  /** Icon name or URL */
  icon: string;
  /** Current proficiency level */
  level: SkillLevel;
  /** Years of experience with this skill */
  yearsOfExperience: number;
  /** Whether this is a featured skill */
  featured: boolean;
  /** Optional list of related skills (by ID) */
  relatedSkills?: string[];
  /** Optional list of projects (by ID) that used this skill */
  projects?: string[];
  /** Optional list of certifications related to this skill */
  certifications?: Array<{
    name: string;
    issuer: string;
    date: string;
    url?: string;
  }>;
}
