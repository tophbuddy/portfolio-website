import { marked } from 'marked';
import matter from 'gray-matter';
import { BlogPost, BlogPostMeta, BlogPostSection, BlogCategory, BlogPostStatus } from '../types/Blog';

/**
 * Process markdown content with frontmatter
 * @param content Raw markdown content
 * @returns Processed HTML content and metadata
 */
export function processMarkdown(content: string): {
  html: string;
  meta: BlogPostMeta;
} {
  // Extract frontmatter
  const { data, content: markdownContent } = matter(content);

  // Process markdown to HTML using synchronous parsing
  const html = marked.parse(markdownContent, { async: false }) as string;

  // Convert frontmatter to BlogPostMeta
  const meta: BlogPostMeta = {
    title: data.title,
    slug: data.slug,
    description: data.description,
    author: {
      name: data.author.name,
      avatar: data.author.avatar,
    },
    publishedAt: data.publishedAt,
    updatedAt: data.updatedAt,
    category: data.category as BlogCategory,
    tags: data.tags.map((tag: any) => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
    })),
    readingTime: calculateReadingTime(markdownContent),
    coverImage: data.coverImage,
    status: data.status as BlogPostStatus,
    featured: data.featured,
    seo: data.seo,
  };

  return {
    html,
    meta,
  };
}

/**
 * Convert markdown content directly to BlogPostSections
 * @param content Raw markdown content
 * @returns Array of blog post sections
 */
export function markdownToBlogSections(content: string): BlogPostSection[] {
  const sections: BlogPostSection[] = [];
  const tokens = marked.lexer(content);
  let sectionId = 0;

  tokens.forEach((token: any) => {
    switch (token.type) {
      case 'heading': {
        sections.push({
          id: `section-${sectionId++}`,
          type: 'heading',
          content: token.text,
          level: token.depth,
        });
        break;
      }

      case 'code': {
        sections.push({
          id: `section-${sectionId++}`,
          type: 'code',
          content: token.text,
          language: token.lang || 'plaintext',
        });
        break;
      }

      case 'paragraph': {
        if (token.tokens?.[0]?.type === 'image') {
          const image = token.tokens[0];
          sections.push({
            id: `section-${sectionId++}`,
            type: 'image',
            content: image.href,
            alt: image.text,
            caption: image.title,
          });
        } else {
          sections.push({
            id: `section-${sectionId++}`,
            type: 'text',
            content: marked.parser([token]),
          });
        }
        break;
      }

      case 'blockquote': {
        sections.push({
          id: `section-${sectionId++}`,
          type: 'quote',
          content: marked.parser(token.tokens),
          author: undefined,
        });
        break;
      }

      case 'list': {
        sections.push({
          id: `section-${sectionId++}`,
          type: 'list',
          content: token.items.map((item: any) => item.text),
          ordered: token.ordered,
        });
        break;
      }

      default: {
        if (token.type !== 'space') {
          sections.push({
            id: `section-${sectionId++}`,
            type: 'text',
            content: marked.parser([token]),
          });
        }
      }
    }
  });

  return sections;
}

/**
 * Calculate reading time in minutes
 * @param content Text content
 * @returns Reading time in minutes
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Convert a markdown file to a BlogPost
 * @param content Raw markdown content
 * @returns Processed blog post
 */
export function markdownToBlogPost(content: string): BlogPost {
  const { meta } = processMarkdown(content);
  const { content: markdownContent } = matter(content);
  const sections = markdownToBlogSections(markdownContent);

  return {
    ...meta,
    content: sections,
  };
}
