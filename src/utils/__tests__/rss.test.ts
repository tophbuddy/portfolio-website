import { describe, it, expect } from '@jest/globals';
import { generateRSSFeed } from '../rss';
import { BlogPost, BlogCategory, BlogPostStatus } from '../../types/Blog';

describe('RSS Feed Generation', () => {
  const samplePosts: BlogPost[] = [
    {
      title: 'Test Post',
      slug: 'test-post',
      description: 'A test blog post',
      author: {
        name: 'Test Author',
        avatar: 'https://example.com/avatar.jpg',
      },
      publishedAt: '2024-02-26',
      category: BlogCategory.TECHNOLOGY,
      tags: [
        {
          id: '1',
          name: 'Test',
          slug: 'test',
        },
      ],
      content: [
        {
          id: 'section-1',
          type: 'heading',
          content: 'Test Heading',
          level: 1,
        },
        {
          id: 'section-2',
          type: 'text',
          content: 'Test content with <strong>bold</strong> text.',
        },
        {
          id: 'section-3',
          type: 'code',
          content: 'console.log("Hello World");',
          language: 'javascript',
        },
        {
          id: 'section-4',
          type: 'quote',
          content: 'Test quote',
          author: 'Test Author',
        },
        {
          id: 'section-5',
          type: 'list',
          content: ['Item 1', 'Item 2', 'Item 3'],
          ordered: false,
        },
        {
          id: 'section-6',
          type: 'image',
          content: 'https://example.com/image.jpg',
          alt: 'Test Image',
          caption: 'Test Caption',
        },
      ],
      status: BlogPostStatus.PUBLISHED,
      readingTime: 5,
    },
  ];

  it('generates RSS feed with correct formats', () => {
    const feed = generateRSSFeed(samplePosts);

    // Check if all feed formats are generated
    expect(feed.rss).toBeDefined();
    expect(feed.atom).toBeDefined();
    expect(feed.json).toBeDefined();

    // Check RSS content (using case-insensitive matching and normalizing whitespace)
    const normalizeText = (text: string) => text.toLowerCase().replace(/\s+/g, ' ').trim();
    const rss = normalizeText(feed.rss);

    // Basic structure
    expect(rss).toContain('<?xml');
    expect(rss).toContain('<rss');
    expect(rss).toContain('</rss>');

    // Content checks
    expect(rss).toContain(normalizeText('Test Post')); // Title
    expect(rss).toContain(normalizeText('Test content with <strong>bold</strong> text')); // Text with HTML
    expect(rss).toContain(normalizeText('console.log("Hello World")')); // Code content
    expect(rss).toContain(normalizeText('class="language-javascript"')); // Code language
    expect(rss).toContain(normalizeText('Test quote')); // Quote content
    expect(rss).toContain(normalizeText('Test Author')); // Author
    expect(rss).toContain(normalizeText('Item 1')); // List items
    expect(rss).toContain(normalizeText('Item 2'));
    expect(rss).toContain(normalizeText('Item 3'));
    expect(rss).toContain(normalizeText('https://example.com/image.jpg')); // Image URL
    expect(rss).toContain(normalizeText('alt="Test Image"')); // Image alt
    expect(rss).toContain(normalizeText('title="Test Caption"')); // Image caption

    // Check Atom content
    const atom = normalizeText(feed.atom);
    expect(atom).toContain('<?xml');
    expect(atom).toContain('<feed');
    expect(atom).toContain('</feed>');
    expect(atom).toContain(normalizeText('Test Post'));
    expect(atom).toContain(normalizeText('A test blog post'));

    // Check JSON content
    const jsonFeed = JSON.parse(feed.json);
    expect(jsonFeed).toEqual(
      expect.objectContaining({
        version: expect.any(String),
        items: expect.arrayContaining([
          expect.objectContaining({
            title: 'Test Post',
            content_html: expect.stringContaining('Test content'),
          }),
        ]),
      })
    );
  });

  it('handles empty posts array', () => {
    const feed = generateRSSFeed([]);

    // Check if all feed formats are generated
    expect(feed.rss).toBeDefined();
    expect(feed.atom).toBeDefined();
    expect(feed.json).toBeDefined();

    // Verify basic feed structure
    expect(feed.rss).toContain('<?xml');
    expect(feed.rss).toContain('<rss');
    expect(feed.atom).toContain('<?xml');
    expect(feed.atom).toContain('<feed');
    expect(JSON.parse(feed.json)).toEqual(
      expect.objectContaining({
        version: expect.any(String),
        items: expect.any(Array),
      })
    );
  });
});
