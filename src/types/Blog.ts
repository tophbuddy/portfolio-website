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
 * Blog post content section interface
 */
export interface BlogPostSection {
  id: string;
  type: 'text' | 'code' | 'image' | 'quote' | 'list' | 'heading';
  content: string;
  language?: string; // for code blocks
  caption?: string; // for images
  level?: number; // for headings
}

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
