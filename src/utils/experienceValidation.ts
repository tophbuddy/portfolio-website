import { ExperienceEntry, Achievement, TechnologyUsed } from '../types/Experience';

/**
 * Validates a technology entry
 * @param tech Technology to validate
 * @returns Array of validation errors, empty if valid
 */
export function validateTechnology(tech: TechnologyUsed): string[] {
  const errors: string[] = [];

  if (!tech.id?.trim()) {
    errors.push('Technology ID is required');
  }
  if (!tech.name?.trim()) {
    errors.push('Technology name is required');
  }
  if (tech.url && !isValidUrl(tech.url)) {
    errors.push('Technology URL must be a valid URL');
  }

  return errors;
}

/**
 * Validates an achievement entry
 * @param achievement Achievement to validate
 * @returns Array of validation errors, empty if valid
 */
export function validateAchievement(achievement: Achievement): string[] {
  const errors: string[] = [];

  if (!achievement.description?.trim()) {
    errors.push('Achievement description is required');
  }

  if (achievement.metrics) {
    if (!Array.isArray(achievement.metrics)) {
      errors.push('Metrics must be an array');
    } else if (achievement.metrics.some(metric => !metric?.trim())) {
      errors.push('All metrics must have content');
    }
  }

  if (achievement.technologies) {
    if (!Array.isArray(achievement.technologies)) {
      errors.push('Technologies must be an array');
    } else {
      achievement.technologies.forEach((tech, index) => {
        const techErrors = validateTechnology(tech);
        errors.push(...techErrors.map(err => `Technology ${index + 1}: ${err}`));
      });
    }
  }

  return errors;
}

/**
 * Validates a complete experience entry
 * @param experience Experience entry to validate
 * @returns Array of validation errors, empty if valid
 */
export function validateExperience(experience: ExperienceEntry): string[] {
  const errors: string[] = [];

  // Required fields
  if (!experience.id?.trim()) errors.push('Experience ID is required');
  if (!experience.company?.trim()) errors.push('Company name is required');
  if (!experience.title?.trim()) errors.push('Job title is required');
  if (!experience.startDate?.trim()) errors.push('Start date is required');
  if (!experience.endDate?.trim()) errors.push('End date is required');
  if (!experience.location?.trim()) errors.push('Location is required');
  if (!experience.summary?.trim()) errors.push('Summary is required');

  // Date validation
  if (!isValidDate(experience.startDate)) {
    errors.push('Start date must be a valid date');
  }
  if (experience.endDate !== 'Present' && !isValidDate(experience.endDate)) {
    errors.push('End date must be a valid date or "Present"');
  }
  if (isValidDate(experience.startDate) && 
      experience.endDate !== 'Present' && 
      isValidDate(experience.endDate) &&
      new Date(experience.startDate) > new Date(experience.endDate)) {
    errors.push('Start date cannot be after end date');
  }

  // URL validations
  if (experience.logoUrl && !isValidUrl(experience.logoUrl)) {
    errors.push('Logo URL must be a valid URL');
  }
  if (experience.companyUrl && !isValidUrl(experience.companyUrl)) {
    errors.push('Company URL must be a valid URL');
  }

  // Arrays validation
  if (!Array.isArray(experience.achievements)) {
    errors.push('Achievements must be an array');
  } else {
    experience.achievements.forEach((achievement, index) => {
      const achievementErrors = validateAchievement(achievement);
      errors.push(...achievementErrors.map(err => `Achievement ${index + 1}: ${err}`));
    });
  }

  if (!Array.isArray(experience.technologies)) {
    errors.push('Technologies must be an array');
  } else {
    experience.technologies.forEach((tech, index) => {
      const techErrors = validateTechnology(tech);
      errors.push(...techErrors.map(err => `Technology ${index + 1}: ${err}`));
    });
  }

  // Theme validation
  if (experience.theme) {
    if (!experience.theme.primary?.trim()) {
      errors.push('Theme primary color is required when theme is provided');
    }
    if (!experience.theme.secondary?.trim()) {
      errors.push('Theme secondary color is required when theme is provided');
    }
    if (!isValidColor(experience.theme.primary)) {
      errors.push('Theme primary must be a valid color value');
    }
    if (!isValidColor(experience.theme.secondary)) {
      errors.push('Theme secondary must be a valid color value');
    }
  }

  return errors;
}

/**
 * Utility function to check if a string is a valid URL
 */
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Utility function to check if a string is a valid date
 */
function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Utility function to check if a string is a valid color value
 */
function isValidColor(color: string): boolean {
  // Basic validation for hex colors, rgb/rgba, hsl/hsla, and named colors
  const colorRegex = /^(#[0-9A-Fa-f]{3}|#[0-9A-Fa-f]{6}|rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)|hsl\(\s*\d+\s*,\s*[\d.]+%?\s*,\s*[\d.]+%?\s*\)|hsla\(\s*\d+\s*,\s*[\d.]+%?\s*,\s*[\d.]+%?\s*,\s*[\d.]+\s*\))$/;
  return colorRegex.test(color) || isValidNamedColor(color);
}

/**
 * Utility function to check if a string is a valid named color
 */
function isValidNamedColor(color: string): boolean {
  const tempElement = document.createElement('div');
  tempElement.style.color = color;
  return tempElement.style.color !== '';
}

/**
 * Formats a date string into a consistent format
 * @param dateString Date string to format
 * @returns Formatted date string (MM/YYYY)
 */
export function formatExperienceDate(dateString: string): string {
  if (dateString === 'Present') return dateString;
  const date = new Date(dateString);
  return `${date.getMonth() + 1}/${date.getFullYear()}`;
}

/**
 * Calculates the duration of an experience
 * @param startDate Start date string
 * @param endDate End date string or 'Present'
 * @returns Duration string (e.g., "2 years 3 months")
 */
export function calculateDuration(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = endDate === 'Present' ? new Date() : new Date(endDate);
  
  const years = end.getFullYear() - start.getFullYear();
  const months = end.getMonth() - start.getMonth();
  
  let totalMonths = years * 12 + months;
  if (totalMonths < 0) return 'Invalid duration';
  
  const finalYears = Math.floor(totalMonths / 12);
  const finalMonths = totalMonths % 12;
  
  const parts = [];
  if (finalYears > 0) parts.push(`${finalYears} year${finalYears !== 1 ? 's' : ''}`);
  if (finalMonths > 0) parts.push(`${finalMonths} month${finalMonths !== 1 ? 's' : ''}`);
  
  return parts.join(' ');
}
