import {
  groupExperiencesByCategory,
  getCategoryMetadata,
  getSortedCategories,
  filterExperiencesByCategory,
  getCategoryDuration,
  getMostCommonCategory,
  isCategoryActive,
} from '../categoryUtils';
import { ExperienceCategory } from '../../types/ExperienceCategory';
import { ExperienceEntry } from '../../types/Experience';

describe('Category Utils', () => {
  const mockExperiences: ExperienceEntry[] = [
    {
      id: '1',
      company: 'Tech Corp',
      title: 'Software Engineer',
      startDate: '2022-01-01',
      endDate: 'Present',
      location: 'San Francisco, CA',
      category: ExperienceCategory.FULL_TIME,
      summary: 'Full-time position',
      achievements: [],
      technologies: [],
    },
    {
      id: '2',
      company: 'Freelance',
      title: 'Developer',
      startDate: '2021-01-01',
      endDate: '2021-12-31',
      location: 'Remote',
      category: ExperienceCategory.FREELANCE,
      summary: 'Freelance work',
      achievements: [],
      technologies: [],
    },
    {
      id: '3',
      company: 'University',
      title: 'Student',
      startDate: '2018-01-01',
      endDate: '2021-12-31',
      location: 'University City',
      category: ExperienceCategory.EDUCATION,
      summary: 'Education',
      achievements: [],
      technologies: [],
    },
  ];

  describe('groupExperiencesByCategory', () => {
    it('should group experiences by category', () => {
      const grouped = groupExperiencesByCategory(mockExperiences);
      expect(grouped[ExperienceCategory.FULL_TIME]).toHaveLength(1);
      expect(grouped[ExperienceCategory.FREELANCE]).toHaveLength(1);
      expect(grouped[ExperienceCategory.EDUCATION]).toHaveLength(1);
    });

    it('should sort experiences by date within categories', () => {
      const grouped = groupExperiencesByCategory(mockExperiences);
      expect(grouped[ExperienceCategory.FULL_TIME][0].id).toBe('1');
    });
  });

  describe('getCategoryMetadata', () => {
    it('should return correct metadata for category', () => {
      const metadata = getCategoryMetadata(ExperienceCategory.FULL_TIME);
      expect(metadata.label).toBe('Full-time');
      expect(metadata.icon).toBe('briefcase');
    });
  });

  describe('getSortedCategories', () => {
    it('should return categories sorted by priority', () => {
      const sorted = getSortedCategories();
      expect(sorted[0]).toBe(ExperienceCategory.FULL_TIME);
    });
  });

  describe('filterExperiencesByCategory', () => {
    it('should filter experiences by categories', () => {
      const filtered = filterExperiencesByCategory(
        mockExperiences,
        [ExperienceCategory.FULL_TIME]
      );
      expect(filtered).toHaveLength(1);
      expect(filtered[0].category).toBe(ExperienceCategory.FULL_TIME);
    });
  });

  describe('getCategoryDuration', () => {
    it('should calculate correct duration for category', () => {
      const duration = getCategoryDuration(
        mockExperiences,
        ExperienceCategory.EDUCATION
      );
      expect(duration).toBe(48); // 4 years = 48 months
    });
  });

  describe('getMostCommonCategory', () => {
    it('should return most common category', () => {
      const mostCommon = getMostCommonCategory(mockExperiences);
      expect(mostCommon).toBeDefined();
    });

    it('should return null for empty experiences', () => {
      const mostCommon = getMostCommonCategory([]);
      expect(mostCommon).toBeNull();
    });
  });

  describe('isCategoryActive', () => {
    it('should identify active categories', () => {
      expect(isCategoryActive(mockExperiences, ExperienceCategory.FULL_TIME)).toBe(true);
      expect(isCategoryActive(mockExperiences, ExperienceCategory.FREELANCE)).toBe(false);
    });
  });
});
