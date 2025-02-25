/**
 * Defines the possible categories for experience entries
 */
export enum ExperienceCategory {
  FULL_TIME = 'FULL_TIME',
  CONTRACT = 'CONTRACT',
  FREELANCE = 'FREELANCE',
  INTERNSHIP = 'INTERNSHIP',
  EDUCATION = 'EDUCATION',
  VOLUNTEER = 'VOLUNTEER',
  PROJECT = 'PROJECT',
  CERTIFICATION = 'CERTIFICATION',
}

/**
 * Metadata for experience categories
 */
export const CategoryMetadata: Record<ExperienceCategory, {
  label: string;
  description: string;
  color: string;
  icon: string;
  priority: number;
}> = {
  [ExperienceCategory.FULL_TIME]: {
    label: 'Full-time',
    description: 'Full-time professional positions',
    color: '#2563eb', // Blue
    icon: 'briefcase',
    priority: 1,
  },
  [ExperienceCategory.CONTRACT]: {
    label: 'Contract',
    description: 'Contract-based positions',
    color: '#7c3aed', // Purple
    icon: 'document-text',
    priority: 2,
  },
  [ExperienceCategory.FREELANCE]: {
    label: 'Freelance',
    description: 'Independent freelance work',
    color: '#059669', // Green
    icon: 'code',
    priority: 3,
  },
  [ExperienceCategory.INTERNSHIP]: {
    label: 'Internship',
    description: 'Professional internships',
    color: '#0891b2', // Cyan
    icon: 'academic-cap',
    priority: 4,
  },
  [ExperienceCategory.EDUCATION]: {
    label: 'Education',
    description: 'Academic education and training',
    color: '#db2777', // Pink
    icon: 'book-open',
    priority: 5,
  },
  [ExperienceCategory.VOLUNTEER]: {
    label: 'Volunteer',
    description: 'Volunteer work and contributions',
    color: '#ea580c', // Orange
    icon: 'heart',
    priority: 6,
  },
  [ExperienceCategory.PROJECT]: {
    label: 'Project',
    description: 'Personal or team projects',
    color: '#4f46e5', // Indigo
    icon: 'puzzle',
    priority: 7,
  },
  [ExperienceCategory.CERTIFICATION]: {
    label: 'Certification',
    description: 'Professional certifications',
    color: '#0d9488', // Teal
    icon: 'badge-check',
    priority: 8,
  },
};
