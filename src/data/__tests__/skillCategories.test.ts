import { describe, it, expect } from 'vitest';
import { skillCategories, getSkillCategory, getSortedSkillCategories } from '../skillCategories';

describe('Skill Categories', () => {
  describe('skillCategories', () => {
    it('should have unique IDs', () => {
      const ids = skillCategories.map(category => category.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it('should have unique orders', () => {
      const orders = skillCategories.map(category => category.order);
      const uniqueOrders = new Set(orders);
      expect(orders.length).toBe(uniqueOrders.size);
    });

    it('should have valid color values', () => {
      const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
      
      skillCategories.forEach(category => {
        expect(hexColorRegex.test(category.color.light)).toBe(true);
        expect(hexColorRegex.test(category.color.dark)).toBe(true);
      });
    });

    it('should have required properties', () => {
      skillCategories.forEach(category => {
        expect(category).toHaveProperty('id');
        expect(category).toHaveProperty('name');
        expect(category).toHaveProperty('icon');
        expect(category).toHaveProperty('color');
        expect(category).toHaveProperty('order');
      });
    });
  });

  describe('getSkillCategory', () => {
    it('should return the correct category by ID', () => {
      const category = getSkillCategory('frontend');
      expect(category).toBeDefined();
      expect(category?.name).toBe('Frontend Development');
    });

    it('should return undefined for non-existent category', () => {
      const category = getSkillCategory('non-existent');
      expect(category).toBeUndefined();
    });
  });

  describe('getSortedSkillCategories', () => {
    it('should return categories sorted by order', () => {
      const sorted = getSortedSkillCategories();
      
      for (let i = 1; i < sorted.length; i++) {
        expect(sorted[i].order).toBeGreaterThan(sorted[i - 1].order);
      }
    });

    it('should return all categories', () => {
      const sorted = getSortedSkillCategories();
      expect(sorted.length).toBe(skillCategories.length);
    });

    it('should not mutate original array', () => {
      const original = [...skillCategories];
      getSortedSkillCategories();
      expect(skillCategories).toEqual(original);
    });
  });
});
