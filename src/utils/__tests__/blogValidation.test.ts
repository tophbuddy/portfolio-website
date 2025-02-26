import { describe, it, expect } from '@jest/globals';
import {
  isValidSlug,
  isValidDate,
  isValidReadingTime,
  isValidUrl,
  isBlogCategory,
  isBlogPostStatus,
  validateBlogPostMeta,
  validateBlogPost,
} from '../blogValidation';
import { BlogCategory, BlogPostStatus, type BlogPost, type BlogPostMeta, type BlogPostSection } from '../../types/Blog';

describe('Blog Validation Utils', () => {
  describe('isValidSlug', () => {
    it('accepts valid slugs', () => {
      expect(isValidSlug('hello-world')).toBe(true);
      expect(isValidSlug('my-first-post-2024')).toBe(true);
    });

    it('rejects invalid slugs', () => {
      expect(isValidSlug('Hello World')).toBe(false);
      expect(isValidSlug('post!')).toBe(false);
      expect(isValidSlug('-invalid-')).toBe(false);
    });
  });

  describe('isValidDate', () => {
    it('accepts valid dates', () => {
      expect(isValidDate('2024-02-26')).toBe(true);
      expect(isValidDate('2024-02-26T12:00:00Z')).toBe(true);
    });

    it('rejects invalid dates', () => {
      expect(isValidDate('invalid')).toBe(false);
      expect(isValidDate('2024-13-01')).toBe(false);
    });
  });

  describe('isValidReadingTime', () => {
    it('accepts valid reading times', () => {
      expect(isValidReadingTime(5)).toBe(true);
      expect(isValidReadingTime(30)).toBe(true);
    });

    it('rejects invalid reading times', () => {
      expect(isValidReadingTime(0)).toBe(false);
      expect(isValidReadingTime(61)).toBe(false);
      expect(isValidReadingTime(-1)).toBe(false);
    });
  });

  describe('isValidUrl', () => {
    it('accepts valid URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://localhost:3000')).toBe(true);
    });

    it('rejects invalid URLs', () => {
      expect(isValidUrl('not-a-url')).toBe(false);
      expect(isValidUrl('http://')).toBe(false);
    });
  });

  describe('isBlogCategory', () => {
    it('accepts valid categories', () => {
      expect(isBlogCategory(BlogCategory.TECHNOLOGY)).toBe(true);
      expect(isBlogCategory(BlogCategory.PROGRAMMING)).toBe(true);
    });

    it('rejects invalid categories', () => {
      expect(isBlogCategory('invalid')).toBe(false);
      expect(isBlogCategory(undefined)).toBe(false);
    });
  });

  describe('isBlogPostStatus', () => {
    it('accepts valid statuses', () => {
      expect(isBlogPostStatus(BlogPostStatus.DRAFT)).toBe(true);
      expect(isBlogPostStatus(BlogPostStatus.PUBLISHED)).toBe(true);
    });

    it('rejects invalid statuses', () => {
      expect(isBlogPostStatus('invalid')).toBe(false);
      expect(isBlogPostStatus(undefined)).toBe(false);
    });
  });

  describe('validateBlogPostMeta', () => {
    const validMeta: BlogPostMeta = {
      title: 'Test Post',
      slug: 'test-post',
      description: 'A test post',
      author: { name: 'Test Author' },
      publishedAt: '2024-02-26',
      category: BlogCategory.TECHNOLOGY,
      tags: [{ id: '1', name: 'Test', slug: 'test' }],
      readingTime: 5,
      status: BlogPostStatus.PUBLISHED,
    };

    it('accepts valid metadata', () => {
      expect(validateBlogPostMeta(validMeta)).toHaveLength(0);
    });

    it('catches missing required fields', () => {
      const invalidMeta = { ...validMeta, title: '' };
      const errors = validateBlogPostMeta(invalidMeta);
      expect(errors).toContain('Title is required');
    });

    it('validates cover image URL', () => {
      const metaWithInvalidImage = {
        ...validMeta,
        coverImage: { url: 'invalid', alt: 'test' },
      };
      const errors = validateBlogPostMeta(metaWithInvalidImage);
      expect(errors).toContain('Invalid cover image URL');
    });
  });

  describe('validateBlogPost', () => {
    const textSection: BlogPostSection = {
      id: '1',
      type: 'text',
      content: 'Test content',
    };

    const validPost: BlogPost = {
      title: 'Test Post',
      slug: 'test-post',
      description: 'A test post',
      author: { name: 'Test Author' },
      publishedAt: '2024-02-26',
      category: BlogCategory.TECHNOLOGY,
      tags: [{ id: '1', name: 'Test', slug: 'test' }],
      readingTime: 5,
      status: BlogPostStatus.PUBLISHED,
      content: [textSection],
    };

    it('accepts valid blog post', () => {
      expect(validateBlogPost(validPost)).toHaveLength(0);
    });

    it('validates content sections', () => {
      const codeSection: BlogPostSection = {
        id: '1',
        type: 'code',
        content: 'const test = true;',
        language: '', // empty language
      };

      const postWithInvalidContent = {
        ...validPost,
        content: [codeSection],
      };
      const errors = validateBlogPost(postWithInvalidContent);
      expect(errors).toContain('Code section 0 is missing a language');
    });

    it('validates series information', () => {
      const postWithInvalidSeries = {
        ...validPost,
        series: {
          name: 'Test Series',
          slug: 'test-series',
          order: 0, // invalid order
          total: 3,
        },
      };
      const errors = validateBlogPost(postWithInvalidSeries);
      expect(errors).toContain('Invalid series order');
    });
  });
});
