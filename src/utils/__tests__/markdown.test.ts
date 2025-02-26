import { describe, it, expect } from '@jest/globals';
import matter from 'gray-matter';
import { processMarkdown, markdownToBlogSections, markdownToBlogPost } from '../markdown';
import { BlogCategory, BlogPostStatus } from '../../types/Blog';

describe('Markdown Processing', () => {
  const sampleMarkdown = `---
title: Test Post
slug: test-post
description: A test blog post
author:
  name: Test Author
  avatar: https://example.com/avatar.jpg
publishedAt: '2024-02-26'
category: technology
tags:
  - id: '1'
    name: Test
    slug: test
status: published
---

# Heading 1

This is a paragraph with some **bold** and *italic* text.

\`\`\`typescript
const test = "Hello World";
console.log(test);
\`\`\`

> This is a quote
> By Someone Famous

- List item 1
- List item 2
- List item 3

![Test Image](https://example.com/image.jpg "Image Caption")
`;

  it('processes markdown with frontmatter', () => {
    const { html, meta } = processMarkdown(sampleMarkdown);

    expect(meta).toEqual(expect.objectContaining({
      title: 'Test Post',
      slug: 'test-post',
      description: 'A test blog post',
      author: {
        name: 'Test Author',
        avatar: 'https://example.com/avatar.jpg',
      },
      category: BlogCategory.TECHNOLOGY,
      status: BlogPostStatus.PUBLISHED,
    }));

    expect(html).toContain('<h1');
    expect(html).toContain('<pre');
    expect(html).toContain('<code');
    expect(html).toContain('<blockquote');
    expect(html).toContain('<ul');
    expect(html).toContain('<img');
  });

  it('converts markdown to blog sections', () => {
    const { content: markdownContent } = matter(sampleMarkdown);
    const sections = markdownToBlogSections(markdownContent);

    expect(sections).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'heading',
          content: 'Heading 1',
          level: 1,
        }),
        expect.objectContaining({
          type: 'text',
          content: expect.stringContaining('bold'),
        }),
        expect.objectContaining({
          type: 'code',
          content: expect.stringContaining('Hello World'),
          language: 'typescript',
        }),
        expect.objectContaining({
          type: 'quote',
          content: expect.stringContaining('This is a quote'),
        }),
        expect.objectContaining({
          type: 'list',
          content: ['List item 1', 'List item 2', 'List item 3'],
          ordered: false,
        }),
        expect.objectContaining({
          type: 'image',
          content: 'https://example.com/image.jpg',
          alt: 'Test Image',
          caption: 'Image Caption',
        }),
      ])
    );
  });

  it('converts markdown to blog post', () => {
    const post = markdownToBlogPost(sampleMarkdown);

    expect(post).toEqual(expect.objectContaining({
      title: 'Test Post',
      slug: 'test-post',
      description: 'A test blog post',
      content: expect.arrayContaining([
        expect.objectContaining({
          type: 'heading',
          content: 'Heading 1',
        }),
      ]),
    }));
  });
});
