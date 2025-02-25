import { describe, it, expect } from 'vitest';
import { skillIcons, getSkillIcon, getCategoryIcon } from '../skillIcons';

describe('Skill Icons', () => {
  describe('skillIcons', () => {
    it('should have icons for all major categories', () => {
      const categories = [
        'category_frontend',
        'category_backend',
        'category_devops',
        'category_mobile',
        'category_database',
        'category_testing',
        'category_ai',
        'category_tools',
      ];

      categories.forEach(category => {
        expect(skillIcons[category]).toBeDefined();
      });
    });

    it('should have icons for common programming languages', () => {
      const languages = [
        'javascript',
        'typescript',
        'python',
        'java',
        'go',
        'rust',
      ];

      languages.forEach(lang => {
        expect(skillIcons[lang]).toBeDefined();
      });
    });

    it('should have valid color values', () => {
      const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
      
      Object.values(skillIcons).forEach(iconInfo => {
        expect(hexColorRegex.test(iconInfo.color.light)).toBe(true);
        expect(hexColorRegex.test(iconInfo.color.dark)).toBe(true);

        if (iconInfo.background) {
          expect(hexColorRegex.test(iconInfo.background.light)).toBe(true);
          expect(hexColorRegex.test(iconInfo.background.dark)).toBe(true);
        }
      });
    });

    it('should have icon components', () => {
      Object.values(skillIcons).forEach(iconInfo => {
        expect(typeof iconInfo.icon).toBe('function');
      });
    });
  });

  describe('getSkillIcon', () => {
    it('should return icon info for valid skill ID', () => {
      const reactIcon = getSkillIcon('react');
      expect(reactIcon).toBeDefined();
      expect(reactIcon?.color).toBeDefined();
      expect(typeof reactIcon?.icon).toBe('function');
    });

    it('should return undefined for invalid skill ID', () => {
      expect(getSkillIcon('invalid-skill')).toBeUndefined();
    });
  });

  describe('getCategoryIcon', () => {
    it('should return icon info for valid category ID', () => {
      const frontendIcon = getCategoryIcon('frontend');
      expect(frontendIcon).toBeDefined();
      expect(frontendIcon?.color).toBeDefined();
      expect(typeof frontendIcon?.icon).toBe('function');
    });

    it('should return undefined for invalid category ID', () => {
      expect(getCategoryIcon('invalid-category')).toBeUndefined();
    });
  });
});
