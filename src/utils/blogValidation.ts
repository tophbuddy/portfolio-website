import { BlogPost, BlogPostMeta, BlogPostStatus, BlogCategory } from '../types/Blog';

/**
 * Validates a blog post slug
 * @param slug The slug to validate
 * @returns True if valid, false otherwise
 */
export function isValidSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}

/**
 * Validates a blog post date
 * @param date The date to validate
 * @returns True if valid, false otherwise
 */
export function isValidDate(date: string): boolean {
  const dateObj = new Date(date);
  return dateObj.toString() !== 'Invalid Date';
}

/**
 * Validates a reading time value
 * @param time Reading time in minutes
 * @returns True if valid, false otherwise
 */
export function isValidReadingTime(time: number): boolean {
  return time > 0 && time < 60; // Assume no post takes more than an hour to read
}

/**
 * Validates a URL string
 * @param url The URL to validate
 * @returns True if valid, false otherwise
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Type guard for BlogCategory
 * @param category The category to check
 * @returns True if valid BlogCategory
 */
export function isBlogCategory(category: any): category is BlogCategory {
  return Object.values(BlogCategory).includes(category);
}

/**
 * Type guard for BlogPostStatus
 * @param status The status to check
 * @returns True if valid BlogPostStatus
 */
export function isBlogPostStatus(status: any): status is BlogPostStatus {
  return Object.values(BlogPostStatus).includes(status);
}

/**
 * Validates blog post metadata
 * @param meta The metadata to validate
 * @returns Array of validation errors, empty if valid
 */
export function validateBlogPostMeta(meta: BlogPostMeta): string[] {
  const errors: string[] = [];

  // Required fields
  if (!meta.title) errors.push('Title is required');
  if (!meta.slug) errors.push('Slug is required');
  if (!meta.description) errors.push('Description is required');
  if (!meta.author?.name) errors.push('Author name is required');
  if (!meta.publishedAt) errors.push('Published date is required');
  if (!meta.category) errors.push('Category is required');
  if (!meta.tags || meta.tags.length === 0) errors.push('At least one tag is required');
  if (meta.readingTime === undefined) errors.push('Reading time is required');

  // Validation checks
  if (meta.slug && !isValidSlug(meta.slug)) {
    errors.push('Invalid slug format');
  }
  if (meta.publishedAt && !isValidDate(meta.publishedAt)) {
    errors.push('Invalid published date');
  }
  if (meta.updatedAt && !isValidDate(meta.updatedAt)) {
    errors.push('Invalid updated date');
  }
  if (meta.readingTime && !isValidReadingTime(meta.readingTime)) {
    errors.push('Invalid reading time');
  }
  if (meta.category && !isBlogCategory(meta.category)) {
    errors.push('Invalid category');
  }
  if (meta.status && !isBlogPostStatus(meta.status)) {
    errors.push('Invalid status');
  }
  if (meta.coverImage?.url && !isValidUrl(meta.coverImage.url)) {
    errors.push('Invalid cover image URL');
  }

  return errors;
}

/**
 * Validates a complete blog post
 * @param post The blog post to validate
 * @returns Array of validation errors, empty if valid
 */
export function validateBlogPost(post: BlogPost): string[] {
  const errors = validateBlogPostMeta(post);

  // Content validation
  if (!post.content || post.content.length === 0) {
    errors.push('Blog post content is required');
  }

  post.content?.forEach((section, index) => {
    if (!section.id) errors.push(`Section ${index} is missing an ID`);
    if (!section.type) errors.push(`Section ${index} is missing a type`);
    if (!section.content) errors.push(`Section ${index} is missing content`);

    // Type-specific validation
    switch (section.type) {
      case 'code':
        if (!section.language || section.language.trim() === '') {
          errors.push(`Code section ${index} is missing a language`);
        }
        break;
      case 'image':
        if (!section.alt) {
          errors.push(`Image section ${index} is missing alt text`);
        }
        if (!isValidUrl(section.content)) {
          errors.push(`Image section ${index} has invalid URL`);
        }
        break;
      case 'list':
        if (!Array.isArray(section.content)) {
          errors.push(`List section ${index} content must be an array`);
        }
        break;
      case 'heading':
        if (!section.level || section.level < 1 || section.level > 6) {
          errors.push(`Heading section ${index} has invalid level`);
        }
        break;
    }
  });

  // Series validation
  if (post.series) {
    if (!post.series.name) errors.push('Series name is required');
    if (!post.series.slug) errors.push('Series slug is required');
    if (!post.series.order || post.series.order < 1) {
      errors.push('Invalid series order');
    }
    if (!post.series.total || post.series.total < post.series.order) {
      errors.push('Invalid series total');
    }
  }

  return errors;
}
