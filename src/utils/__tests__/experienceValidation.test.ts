import {
  validateTechnology,
  validateAchievement,
  validateExperience,
  formatExperienceDate,
  calculateDuration,
} from '../experienceValidation';
import { ExperienceEntry, Achievement, TechnologyUsed } from '../../types/Experience';

describe('Experience Validation', () => {
  describe('validateTechnology', () => {
    it('should validate a valid technology', () => {
      const tech: TechnologyUsed = {
        id: 'react',
        name: 'React',
        url: 'https://reactjs.org',
      };
      expect(validateTechnology(tech)).toHaveLength(0);
    });

    it('should return errors for invalid technology', () => {
      const tech: TechnologyUsed = {
        id: '',
        name: '',
        url: 'invalid-url',
      };
      const errors = validateTechnology(tech);
      expect(errors).toContain('Technology ID is required');
      expect(errors).toContain('Technology name is required');
      expect(errors).toContain('Technology URL must be a valid URL');
    });
  });

  describe('validateAchievement', () => {
    it('should validate a valid achievement', () => {
      const achievement: Achievement = {
        description: 'Led team of 5 developers',
        metrics: ['Increased performance by 50%'],
        technologies: [{ id: 'react', name: 'React' }],
      };
      expect(validateAchievement(achievement)).toHaveLength(0);
    });

    it('should return errors for invalid achievement', () => {
      const achievement: Achievement = {
        description: '',
        metrics: [''],
        technologies: [{ id: '', name: '' }],
      };
      const errors = validateAchievement(achievement);
      expect(errors).toContain('Achievement description is required');
      expect(errors).toContain('All metrics must have content');
      expect(errors).toContain('Technology 1: Technology ID is required');
    });
  });

  describe('validateExperience', () => {
    const validExperience: ExperienceEntry = {
      id: 'exp1',
      company: 'Tech Corp',
      title: 'Senior Developer',
      startDate: '2020-01-01',
      endDate: '2022-01-01',
      location: 'San Francisco, CA',
      summary: 'Led development team',
      achievements: [{ description: 'Led team of 5 developers' }],
      technologies: [{ id: 'react', name: 'React' }],
    };

    it('should validate a valid experience', () => {
      expect(validateExperience(validExperience)).toHaveLength(0);
    });

    it('should validate experience with Present end date', () => {
      const experience = { ...validExperience, endDate: 'Present' };
      expect(validateExperience(experience)).toHaveLength(0);
    });

    it('should return errors for invalid experience', () => {
      const invalidExperience: ExperienceEntry = {
        id: '',
        company: '',
        title: '',
        startDate: 'invalid-date',
        endDate: '2020-01-01',
        location: '',
        summary: '',
        achievements: [],
        technologies: [],
      };
      const errors = validateExperience(invalidExperience);
      expect(errors).toContain('Experience ID is required');
      expect(errors).toContain('Company name is required');
      expect(errors).toContain('Start date must be a valid date');
    });

    it('should validate dates are in correct order', () => {
      const experience = {
        ...validExperience,
        startDate: '2022-01-01',
        endDate: '2020-01-01',
      };
      const errors = validateExperience(experience);
      expect(errors).toContain('Start date cannot be after end date');
    });
  });

  describe('formatExperienceDate', () => {
    it('should format date correctly', () => {
      expect(formatExperienceDate('2020-01-15')).toBe('1/2020');
    });

    it('should return Present for Present', () => {
      expect(formatExperienceDate('Present')).toBe('Present');
    });
  });

  describe('calculateDuration', () => {
    it('should calculate duration correctly', () => {
      expect(calculateDuration('2020-01-01', '2022-06-01')).toBe('2 years 5 months');
    });

    it('should handle single year/month correctly', () => {
      expect(calculateDuration('2020-01-01', '2021-02-01')).toBe('1 year 1 month');
    });

    it('should handle Present end date', () => {
      const result = calculateDuration('2020-01-01', 'Present');
      expect(result).toMatch(/\d+ years? \d+ months?/);
    });
  });
});
