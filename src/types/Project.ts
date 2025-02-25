/**
 * Represents the technology stack used in a project
 */
export interface Technology {
  /** Name of the technology (e.g., "React", "TypeScript") */
  name: string;
  /** Optional icon component or URL */
  icon?: string;
  /** Optional URL to the technology's documentation */
  url?: string;
  /** Optional color for the technology tag */
  color?: string;
  /** Optional type of technology (e.g., "framework", "language", "database") */
  type?: 'framework' | 'language' | 'database' | 'tool' | 'platform' | 'other';
  /** Optional description for tooltips */
  description?: string;
}

/**
 * Represents a project link (e.g., GitHub, Live Demo)
 */
export interface ProjectLink {
  /** Type of link (e.g., "github", "demo", "docs") */
  type: 'github' | 'demo' | 'docs' | 'other';
  /** URL of the link */
  url: string;
  /** Display text for the link */
  label: string;
  /** Optional icon for the link */
  icon?: string;
}

/**
 * Represents a project image or screenshot
 */
export interface ProjectImage {
  /** Source URL of the image */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Optional caption for the image */
  caption?: string;
  /** Whether this is the featured/main image */
  featured?: boolean;
  /** Optional blur data URL for image loading */
  blurDataUrl?: string;
}

/**
 * Represents a project in the portfolio
 */
export interface Project {
  /** Unique identifier for the project */
  id: string;
  /** Project title */
  title: string;
  /** Short description (1-2 sentences) */
  summary: string;
  /** Detailed project description (markdown supported) */
  description: string;
  /** Array of project images/screenshots */
  images: ProjectImage[];
  /** Array of technologies used */
  technologies: Technology[];
  /** Array of project links */
  links: ProjectLink[];
  /** Project completion date */
  date: string;
  /** Project category (e.g., "Web", "Mobile", "API") */
  category: string;
  /** Whether the project is featured */
  featured?: boolean;
  /** Project status (e.g., "completed", "in-progress") */
  status?: 'completed' | 'in-progress' | 'planned';
  /** Optional client or company name */
  client?: string;
  /** Optional role in the project */
  role?: string;
  /** Optional project duration */
  duration?: string;
  /** Optional project highlights/key features */
  highlights?: string[];
  /** Optional project challenges and solutions */
  challenges?: Array<{
    challenge: string;
    solution: string;
  }>;
  /** Optional SEO metadata */
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  /** Optional sorting order for featured projects */
  order?: number;
}

/** Type for project filter options */
export type ProjectFilter = {
  category?: string;
  technology?: string;
  status?: Project['status'];
  featured?: boolean;
};

/** Type for project sort options */
export type ProjectSort = 'date' | 'title' | 'order' | 'category';

/** Type for project view mode */
export type ProjectViewMode = 'grid' | 'list' | 'detailed';
