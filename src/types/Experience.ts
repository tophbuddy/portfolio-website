/**
 * Represents a technology or tool used in a professional experience
 */
export interface TechnologyUsed {
  /** Unique identifier of the technology */
  id: string;
  /** Name of the technology */
  name: string;
  /** Optional URL for more information about the technology */
  url?: string;
}

/**
 * Represents a key achievement or responsibility in a professional experience
 */
export interface Achievement {
  /** Description of the achievement */
  description: string;
  /** Optional metrics or quantifiable results */
  metrics?: string[];
  /** Optional technologies used specifically for this achievement */
  technologies?: TechnologyUsed[];
}

/**
 * Represents a professional experience entry in the timeline
 */
export interface ExperienceEntry {
  /** Unique identifier for the experience */
  id: string;
  /** Company or organization name */
  company: string;
  /** Job title or role */
  title: string;
  /** Start date of the experience */
  startDate: string;
  /** End date of the experience, 'Present' for current positions */
  endDate: string;
  /** Company location (city, country) */
  location: string;
  /** Company logo URL */
  logoUrl?: string;
  /** Company website URL */
  companyUrl?: string;
  /** Brief description of the role */
  summary: string;
  /** List of key achievements and responsibilities */
  achievements: Achievement[];
  /** List of primary technologies used throughout the experience */
  technologies: TechnologyUsed[];
  /** Optional highlight flag for featured experiences */
  featured?: boolean;
  /** Optional color theme for the timeline entry */
  theme?: {
    primary: string;
    secondary: string;
  };
}
