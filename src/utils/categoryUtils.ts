import { ExperienceCategory, CategoryMetadata } from '../types/ExperienceCategory';
import { ExperienceEntry } from '../types/Experience';

/**
 * Groups experience entries by their category
 * @param experiences Array of experience entries
 * @returns Record of categories to their experience entries
 */
export function groupExperiencesByCategory(
  experiences: ExperienceEntry[]
): Record<ExperienceCategory, ExperienceEntry[]> {
  const grouped: Partial<Record<ExperienceCategory, ExperienceEntry[]>> = {};

  // Initialize empty arrays for each category
  Object.values(ExperienceCategory).forEach(category => {
    grouped[category] = [];
  });

  // Group experiences by category
  experiences.forEach(experience => {
    if (experience.category) {
      grouped[experience.category]?.push(experience);
    }
  });

  // Sort experiences within each category by start date (most recent first)
  Object.values(ExperienceCategory).forEach(category => {
    grouped[category]?.sort((a, b) => {
      if (a.endDate === 'Present') return -1;
      if (b.endDate === 'Present') return 1;
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });
  });

  return grouped as Record<ExperienceCategory, ExperienceEntry[]>;
}

/**
 * Gets metadata for a specific category
 * @param category Experience category
 * @returns Category metadata
 */
export function getCategoryMetadata(category: ExperienceCategory) {
  return CategoryMetadata[category];
}

/**
 * Gets all categories sorted by priority
 * @returns Array of categories
 */
export function getSortedCategories(): ExperienceCategory[] {
  return Object.values(ExperienceCategory).sort(
    (a, b) => CategoryMetadata[a].priority - CategoryMetadata[b].priority
  );
}

/**
 * Filters experiences by category
 * @param experiences Array of experience entries
 * @param categories Categories to filter by
 * @returns Filtered array of experience entries
 */
export function filterExperiencesByCategory(
  experiences: ExperienceEntry[],
  categories: ExperienceCategory[]
): ExperienceEntry[] {
  return experiences.filter(experience => 
    experience.category && categories.includes(experience.category)
  );
}

/**
 * Gets the total duration of experiences in a category
 * @param experiences Array of experience entries
 * @param category Category to calculate duration for
 * @returns Total duration in months
 */
export function getCategoryDuration(
  experiences: ExperienceEntry[],
  category: ExperienceCategory
): number {
  const categoryExperiences = experiences.filter(exp => exp.category === category);
  
  return categoryExperiences.reduce((total, exp) => {
    const start = new Date(exp.startDate);
    const end = exp.endDate === 'Present' ? new Date() : new Date(exp.endDate);
    
    const months = (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
    
    return total + Math.max(0, months);
  }, 0);
}

/**
 * Gets the most common category among experiences
 * @param experiences Array of experience entries
 * @returns Most common category
 */
export function getMostCommonCategory(
  experiences: ExperienceEntry[]
): ExperienceCategory | null {
  const categoryCounts = experiences.reduce((counts, exp) => {
    if (exp.category) {
      counts[exp.category] = (counts[exp.category] || 0) + 1;
    }
    return counts;
  }, {} as Record<ExperienceCategory, number>);

  return Object.entries(categoryCounts).reduce(
    (max, [category, count]) => 
      count > (max.count || 0) 
        ? { category: category as ExperienceCategory, count } 
        : max,
    { category: null, count: 0 }
  ).category;
}

/**
 * Checks if a category is active (has current experiences)
 * @param experiences Array of experience entries
 * @param category Category to check
 * @returns Whether the category has current experiences
 */
export function isCategoryActive(
  experiences: ExperienceEntry[],
  category: ExperienceCategory
): boolean {
  return experiences
    .filter(exp => exp.category === category)
    .some(exp => exp.endDate === 'Present');
}
