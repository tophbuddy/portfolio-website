/**
 * Blog post status
 */
export enum BlogPostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

/**
 * Blog post category
 */
export enum BlogCategory {
  TECHNOLOGY = 'technology',
  PROGRAMMING = 'programming',
  WEB_DEVELOPMENT = 'web-development',
  ARTIFICIAL_INTELLIGENCE = 'artificial-intelligence',
  CAREER = 'career',
  TUTORIALS = 'tutorials',
  THOUGHTS = 'thoughts',
}

/**
 * Blog post tag interface
 */
export interface BlogTag {
  id: string;
  name: string;
  slug: string;
}

/**
 * Blog post metadata interface
 */
export interface BlogPostMeta {
  title: string;
  slug: string;
  description: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  updatedAt?: string;
  category: BlogCategory;
  tags: BlogTag[];
  readingTime: number; // in minutes
  coverImage?: {
    url: string;
    alt: string;
    caption?: string;
  };
  status: BlogPostStatus;
  featured?: boolean;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
  };
}

/**
 * Base interface for blog post sections
 */
interface BaseBlogPostSection {
  id: string;
}

/**
 * Text section
 */
interface TextSection extends BaseBlogPostSection {
  type: 'text';
  content: string;
}

/**
 * Code section
 */
interface CodeSection extends BaseBlogPostSection {
  type: 'code';
  content: string;
  language: string;
}

/**
 * Image section
 */
interface ImageSection extends BaseBlogPostSection {
  type: 'image';
  content: string; // URL
  caption?: string;
  alt: string;
}

/**
 * Quote section
 */
interface QuoteSection extends BaseBlogPostSection {
  type: 'quote';
  content: string;
  author?: string;
}

/**
 * List section
 */
interface ListSection extends BaseBlogPostSection {
  type: 'list';
  content: string[];
  ordered?: boolean;
}

/**
 * Heading section
 */
interface HeadingSection extends BaseBlogPostSection {
  type: 'heading';
  content: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 * Union type for all blog post sections
 */
export type BlogPostSection =
  | TextSection
  | CodeSection
  | ImageSection
  | QuoteSection
  | ListSection
  | HeadingSection;

/**
 * Complete blog post interface
 */
export interface BlogPost extends BlogPostMeta {
  content: BlogPostSection[];
  relatedPosts?: string[]; // Array of related post slugs
  series?: {
    name: string;
    slug: string;
    order: number;
    total: number;
  };
}

/**
 * Blog post preview interface (used in listings)
 */
export interface BlogPostPreview extends Pick<BlogPostMeta, 
  'title' | 'slug' | 'description' | 'publishedAt' | 'category' | 
  'tags' | 'readingTime' | 'coverImage' | 'featured'
> {
  excerpt: string;
}
