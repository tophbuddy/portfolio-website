import { describe, it, expect } from 'vitest';
import {
  skillLevelInfo,
  getSkillLevelFromYears,
  getSkillLevelProgress,
  formatYearsOfExperience,
  getRelativeLevelProgress,
} from '../skillLevels';

describe('Skill Levels', () => {
  describe('skillLevelInfo', () => {
    it('should have all required levels', () => {
      expect(Object.keys(skillLevelInfo)).toEqual([
        'beginner',
        'intermediate',
        'advanced',
        'expert',
      ]);
    });

    it('should have increasing values', () => {
      const values = Object.values(skillLevelInfo).map(level => level.value);
      for (let i = 1; i < values.length; i++) {
        expect(values[i]).toBeGreaterThan(values[i - 1]);
      }
    });

    it('should have increasing typical years', () => {
      const years = Object.values(skillLevelInfo).map(level => level.typicalYears);
      for (let i = 1; i < years.length; i++) {
        expect(years[i]).toBeGreaterThan(years[i - 1]);
      }
    });

    it('should have valid color values', () => {
      const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
      
      Object.values(skillLevelInfo).forEach(level => {
        expect(hexColorRegex.test(level.color.light)).toBe(true);
        expect(hexColorRegex.test(level.color.dark)).toBe(true);
      });
    });
  });

  describe('getSkillLevelFromYears', () => {
    it('should return beginner for minimal experience', () => {
      expect(getSkillLevelFromYears(0.2)).toBe('beginner');
    });

    it('should return intermediate for moderate experience', () => {
      expect(getSkillLevelFromYears(2.5)).toBe('intermediate');
    });

    it('should return advanced for significant experience', () => {
      expect(getSkillLevelFromYears(4.5)).toBe('advanced');
    });

    it('should return expert for extensive experience', () => {
      expect(getSkillLevelFromYears(7)).toBe('expert');
    });
  });

  describe('getSkillLevelProgress', () => {
    it('should return correct progress values', () => {
      expect(getSkillLevelProgress('beginner')).toBe(25);
      expect(getSkillLevelProgress('intermediate')).toBe(50);
      expect(getSkillLevelProgress('advanced')).toBe(75);
      expect(getSkillLevelProgress('expert')).toBe(100);
    });
  });

  describe('formatYearsOfExperience', () => {
    it('should format months correctly', () => {
      expect(formatYearsOfExperience(0.5)).toBe('6 months');
      expect(formatYearsOfExperience(0.08333)).toBe('1 month');
    });

    it('should format years correctly', () => {
      expect(formatYearsOfExperience(1)).toBe('1 year');
      expect(formatYearsOfExperience(2.5)).toBe('2.5 years');
    });
  });

  describe('getRelativeLevelProgress', () => {
    it('should return progress within beginner level', () => {
      const progress = getRelativeLevelProgress(1, 'beginner');
      expect(progress).toBeGreaterThan(0);
      expect(progress).toBeLessThanOrEqual(1);
    });

    it('should return 1 for expert level', () => {
      expect(getRelativeLevelProgress(10, 'expert')).toBe(1);
    });

    it('should handle edge cases', () => {
      expect(getRelativeLevelProgress(0, 'beginner')).toBe(0);
      expect(getRelativeLevelProgress(-1, 'beginner')).toBe(0);
    });

    it('should show progression between levels', () => {
      const beginnerProgress = getRelativeLevelProgress(1, 'beginner');
      const intermediateProgress = getRelativeLevelProgress(3, 'intermediate');
      const advancedProgress = getRelativeLevelProgress(5, 'advanced');

      expect(intermediateProgress).toBeGreaterThan(beginnerProgress);
      expect(advancedProgress).toBeGreaterThan(intermediateProgress);
    });
  });
});
