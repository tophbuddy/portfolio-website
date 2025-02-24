import { z } from 'zod';

/**
 * Schema for technology stack validation
 */
export const TechnologySchema = z.object({
  name: z.string().min(1, 'Technology name is required'),
  icon: z.string().url('Invalid icon URL').optional(),
  url: z.string().url('Invalid documentation URL').optional(),
  color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid color hex code').optional(),
});

/**
 * Schema for project link validation
 */
export const ProjectLinkSchema = z.object({
  type: z.enum(['github', 'demo', 'docs', 'other'], {
    errorMap: () => ({ message: 'Invalid link type. Must be one of: github, demo, docs, other' }),
  }),
  url: z.string().url('Invalid URL format'),
  label: z.string().min(1, 'Link label is required'),
  icon: z.string().optional(),
});

/**
 * Schema for project image validation
 */
export const ProjectImageSchema = z.object({
  src: z.string().url('Invalid image URL'),
  alt: z.string().min(1, 'Alt text is required for accessibility'),
  caption: z.string().optional(),
  featured: z.boolean().optional(),
  blurDataUrl: z.string().optional(),
}).refine(
  (data) => {
    if (data.blurDataUrl) {
      return data.blurDataUrl.startsWith('data:image/');
    }
    return true;
  },
  {
    message: 'Blur data URL must be a valid image data URL',
    path: ['blurDataUrl'],
  }
);

/**
 * Schema for project SEO metadata validation
 */
const SEOSchema = z.object({
  title: z.string().max(60, 'SEO title should be under 60 characters').optional(),
  description: z.string().max(160, 'SEO description should be under 160 characters').optional(),
  keywords: z.array(z.string()).max(10, 'Maximum 10 keywords allowed').optional(),
});

/**
 * Schema for project challenge validation
 */
const ChallengeSchema = z.object({
  challenge: z.string().min(1, 'Challenge description is required'),
  solution: z.string().min(1, 'Solution description is required'),
});

/**
 * Main project schema for validation
 */
export const ProjectSchema = z.object({
  id: z.string().min(1, 'Project ID is required'),
  title: z.string().min(1, 'Project title is required').max(100, 'Project title too long'),
  summary: z.string()
    .min(10, 'Summary too short')
    .max(200, 'Summary too long'),
  description: z.string()
    .min(50, 'Description too short')
    .max(5000, 'Description too long'),
  images: z.array(ProjectImageSchema)
    .min(1, 'At least one project image is required')
    .max(10, 'Maximum 10 images allowed'),
  technologies: z.array(TechnologySchema)
    .min(1, 'At least one technology is required'),
  links: z.array(ProjectLinkSchema)
    .min(1, 'At least one project link is required'),
  date: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  category: z.string().min(1, 'Project category is required'),
  featured: z.boolean().optional(),
  status: z.enum(['completed', 'in-progress', 'planned'], {
    errorMap: () => ({ message: 'Invalid status. Must be: completed, in-progress, or planned' }),
  }).optional(),
  client: z.string().optional(),
  role: z.string().optional(),
  duration: z.string().optional(),
  highlights: z.array(z.string())
    .max(10, 'Maximum 10 highlights allowed')
    .optional(),
  challenges: z.array(ChallengeSchema)
    .max(5, 'Maximum 5 challenges allowed')
    .optional(),
  seo: SEOSchema.optional(),
  order: z.number().int().min(0).optional(),
}).refine(
  (data) => {
    if (data.featured && data.order === undefined) {
      return false;
    }
    return true;
  },
  {
    message: 'Featured projects must have an order number',
    path: ['order'],
  }
);

/**
 * Schema for project filter validation
 */
export const ProjectFilterSchema = z.object({
  category: z.string().optional(),
  technology: z.string().optional(),
  status: z.enum(['completed', 'in-progress', 'planned']).optional(),
  featured: z.boolean().optional(),
});

/**
 * Schema for project sort validation
 */
export const ProjectSortSchema = z.enum(['date', 'title', 'order', 'category']);

/**
 * Schema for project view mode validation
 */
export const ProjectViewModeSchema = z.enum(['grid', 'list', 'detailed']);

/**
 * Type inference helpers
 */
export type ValidatedProject = z.infer<typeof ProjectSchema>;
export type ValidatedProjectFilter = z.infer<typeof ProjectFilterSchema>;
export type ValidatedProjectSort = z.infer<typeof ProjectSortSchema>;
export type ValidatedProjectViewMode = z.infer<typeof ProjectViewModeSchema>;

/**
 * Utility function to validate project data
 */
export const validateProject = (data: unknown): ValidatedProject => {
  return ProjectSchema.parse(data);
};

/**
 * Utility function to validate project data array
 */
export const validateProjects = (data: unknown[]): ValidatedProject[] => {
  return z.array(ProjectSchema).parse(data);
};

/**
 * Utility function to validate project filter
 */
export const validateProjectFilter = (data: unknown): ValidatedProjectFilter => {
  return ProjectFilterSchema.parse(data);
};

/**
 * Error handler type for project validation
 */
export type ProjectValidationError = z.ZodError;
