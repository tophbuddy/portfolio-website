import { Project, ProjectFilter, ProjectSort } from '../types/Project';
import { validateProjectFilter } from '../schemas/ProjectSchema';

/**
 * Type for the filter function result
 */
export type FilterResult<T> = {
  results: T[];
  total: number;
  appliedFilters: ProjectFilter;
};

/**
 * Options for filtering and sorting projects
 */
export interface ProjectFilterOptions extends ProjectFilter {
  sort?: ProjectSort;
  limit?: number;
  offset?: number;
}

/**
 * Checks if a project matches the given filter criteria
 */
const matchesFilter = (project: Project, filter: ProjectFilter): boolean => {
  // Validate filter using schema
  const validFilter = validateProjectFilter(filter);

  // Check each filter criterion
  const categoryMatch = !validFilter.category || 
    project.category.toLowerCase() === validFilter.category.toLowerCase();

  const technologyMatch = !validFilter.technology || 
    project.technologies.some(tech => 
      tech.name.toLowerCase() === validFilter.technology?.toLowerCase()
    );

  const statusMatch = !validFilter.status || project.status === validFilter.status;
  
  const featuredMatch = validFilter.featured === undefined || 
    project.featured === validFilter.featured;

  return categoryMatch && technologyMatch && statusMatch && featuredMatch;
};

/**
 * Sorts projects based on the specified sort criteria
 */
const sortProjects = (projects: Project[], sort: ProjectSort = 'date'): Project[] => {
  return [...projects].sort((a, b) => {
    switch (sort) {
      case 'date':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      case 'category':
        return a.category.localeCompare(b.category);
      case 'order':
        // Sort by order if available, otherwise put non-ordered items last
        const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
        const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
        return orderA - orderB;
      default:
        return 0;
    }
  });
};

/**
 * Gets unique categories from a list of projects
 */
export const getUniqueCategories = (projects: Project[]): string[] => {
  return [...new Set(projects.map(project => project.category))].sort();
};

/**
 * Gets unique technologies from a list of projects
 */
export const getUniqueTechnologies = (projects: Project[]): string[] => {
  const technologies = projects.flatMap(project => 
    project.technologies.map(tech => tech.name)
  );
  return [...new Set(technologies)].sort();
};

/**
 * Filters and sorts projects based on provided options
 */
export const filterProjects = (
  projects: Project[],
  options: ProjectFilterOptions = {}
): FilterResult<Project> => {
  const {
    sort = 'date',
    limit,
    offset = 0,
    ...filterOptions
  } = options;

  // Apply filters
  const filteredProjects = projects.filter(project => 
    matchesFilter(project, filterOptions)
  );

  // Apply sorting
  const sortedProjects = sortProjects(filteredProjects, sort);

  // Apply pagination if limit is specified
  const paginatedProjects = limit
    ? sortedProjects.slice(offset, offset + limit)
    : sortedProjects;

  return {
    results: paginatedProjects,
    total: filteredProjects.length,
    appliedFilters: filterOptions
  };
};

/**
 * Gets featured projects, optionally limited to a specific count
 */
export const getFeaturedProjects = (
  projects: Project[],
  limit?: number
): Project[] => {
  const featured = projects
    .filter(project => project.featured)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return limit ? featured.slice(0, limit) : featured;
};

/**
 * Gets related projects based on category and technologies
 */
export const getRelatedProjects = (
  currentProject: Project,
  allProjects: Project[],
  limit: number = 3
): Project[] => {
  // Exclude current project
  const otherProjects = allProjects.filter(p => p.id !== currentProject.id);

  // Calculate relevance score for each project
  const projectsWithScore = otherProjects.map(project => {
    let score = 0;

    // Same category
    if (project.category === currentProject.category) {
      score += 3;
    }

    // Shared technologies
    const sharedTechs = project.technologies.filter(tech =>
      currentProject.technologies.some(t => t.name === tech.name)
    );
    score += sharedTechs.length;

    return { project, score };
  });

  // Sort by score and get top N projects
  return projectsWithScore
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ project }) => project);
};

/**
 * Gets projects by status
 */
export const getProjectsByStatus = (
  projects: Project[],
  status: Project['status']
): Project[] => {
  return projects.filter(project => project.status === status);
};
