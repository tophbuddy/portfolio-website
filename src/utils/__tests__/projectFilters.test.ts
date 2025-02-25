import { describe, it, expect } from 'vitest';
import {
  filterProjects,
  getFeaturedProjects,
  getRelatedProjects,
  getUniqueCategories,
  getUniqueTechnologies,
  getProjectsByStatus
} from '../projectFilters';
import { Project } from '../../types/Project';

// Test data
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Project A',
    summary: 'Summary A',
    description: 'Description A',
    category: 'Web Development',
    date: '2024-02-01',
    images: [{ src: 'test.jpg', alt: 'Test' }],
    technologies: [
      { name: 'React' },
      { name: 'TypeScript' }
    ],
    links: [{ type: 'github', url: 'test.com', label: 'Test' }],
    featured: true,
    order: 1,
    status: 'completed'
  },
  {
    id: '2',
    title: 'Project B',
    summary: 'Summary B',
    description: 'Description B',
    category: 'Mobile Development',
    date: '2024-01-01',
    images: [{ src: 'test.jpg', alt: 'Test' }],
    technologies: [
      { name: 'React Native' },
      { name: 'TypeScript' }
    ],
    links: [{ type: 'github', url: 'test.com', label: 'Test' }],
    status: 'in-progress'
  },
  {
    id: '3',
    title: 'Project C',
    summary: 'Summary C',
    description: 'Description C',
    category: 'Web Development',
    date: '2024-03-01',
    images: [{ src: 'test.jpg', alt: 'Test' }],
    technologies: [
      { name: 'Vue' },
      { name: 'JavaScript' }
    ],
    links: [{ type: 'github', url: 'test.com', label: 'Test' }],
    featured: true,
    order: 2
  }
] as const;

describe('Project Filters', () => {
  describe('filterProjects', () => {
    it('should filter by category', () => {
      const result = filterProjects(mockProjects, { category: 'Web Development' });
      expect(result.results).toHaveLength(2);
      expect(result.results.every(p => p.category === 'Web Development')).toBe(true);
    });

    it('should filter by technology', () => {
      const result = filterProjects(mockProjects, { technology: 'TypeScript' });
      expect(result.results).toHaveLength(2);
      expect(result.results.every(p => 
        p.technologies.some(t => t.name === 'TypeScript')
      )).toBe(true);
    });

    it('should filter by status', () => {
      const result = filterProjects(mockProjects, { status: 'completed' });
      expect(result.results).toHaveLength(1);
      expect(result.results[0].status).toBe('completed');
    });

    it('should filter featured projects', () => {
      const result = filterProjects(mockProjects, { featured: true });
      expect(result.results).toHaveLength(2);
      expect(result.results.every(p => p.featured)).toBe(true);
    });

    it('should sort by date', () => {
      const result = filterProjects(mockProjects, { sort: 'date' });
      expect(result.results[0].date).toBe('2024-03-01');
    });

    it('should apply pagination', () => {
      const result = filterProjects(mockProjects, { limit: 2, offset: 1 });
      expect(result.results).toHaveLength(2);
      expect(result.total).toBe(3);
    });
  });

  describe('getFeaturedProjects', () => {
    it('should return featured projects in order', () => {
      const featured = getFeaturedProjects(mockProjects);
      expect(featured).toHaveLength(2);
      expect(featured[0].order).toBe(1);
      expect(featured[1].order).toBe(2);
    });

    it('should respect limit parameter', () => {
      const featured = getFeaturedProjects(mockProjects, 1);
      expect(featured).toHaveLength(1);
      expect(featured[0].order).toBe(1);
    });
  });

  describe('getRelatedProjects', () => {
    it('should find related projects by category and technology', () => {
      const current = mockProjects[0];
      const related = getRelatedProjects(current, mockProjects);
      expect(related).toHaveLength(2);
      expect(related).not.toContain(current);
    });
  });

  describe('getUniqueCategories', () => {
    it('should return unique categories', () => {
      const categories = getUniqueCategories(mockProjects);
      expect(categories).toHaveLength(2);
      expect(categories).toContain('Web Development');
      expect(categories).toContain('Mobile Development');
    });
  });

  describe('getUniqueTechnologies', () => {
    it('should return unique technologies', () => {
      const technologies = getUniqueTechnologies(mockProjects);
      expect(technologies).toHaveLength(4);
      expect(technologies).toContain('React');
      expect(technologies).toContain('TypeScript');
      expect(technologies).toContain('Vue');
      expect(technologies).toContain('JavaScript');
    });
  });

  describe('getProjectsByStatus', () => {
    it('should return projects by status', () => {
      const completed = getProjectsByStatus(mockProjects, 'completed');
      expect(completed).toHaveLength(1);
      expect(completed[0].status).toBe('completed');
    });
  });
});
