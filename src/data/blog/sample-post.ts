import { BlogPost, BlogCategory, BlogPostStatus } from '@/types/Blog';

export const samplePost: BlogPost = {
  title: 'Getting Started with Next.js and TypeScript',
  slug: 'getting-started-with-nextjs-and-typescript',
  description: 'A comprehensive guide to building modern web applications with Next.js and TypeScript',
  author: {
    name: 'Chris Holzheu',
    avatar: '/images/avatar.jpg',
  },
  publishedAt: '2024-02-26',
  category: BlogCategory.WEB_DEVELOPMENT,
  tags: [
    {
      id: '1',
      name: 'Next.js',
      slug: 'nextjs',
    },
    {
      id: '2',
      name: 'TypeScript',
      slug: 'typescript',
    },
    {
      id: '3',
      name: 'React',
      slug: 'react',
    },
  ],
  content: [
    {
      id: 'intro',
      type: 'heading',
      content: 'Introduction',
      level: 1,
    },
    {
      id: 'intro-text',
      type: 'text',
      content: 'Next.js has become one of the most popular frameworks for building React applications. When combined with TypeScript, it provides an excellent developer experience with strong type safety.',
    },
    {
      id: 'code-example',
      type: 'code',
      content: `import { GetStaticProps } from 'next';
import { Post } from '@/types';

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts();
  return {
    props: { posts },
  };
};`,
      language: 'typescript',
    },
  ],
  status: BlogPostStatus.PUBLISHED,
  readingTime: 5,
  featured: true,
  coverImage: {
    url: '/images/blog/nextjs-typescript.jpg',
    alt: 'Next.js and TypeScript logos',
    caption: 'Next.js and TypeScript - A powerful combination',
  },
};
