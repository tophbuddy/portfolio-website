import { type ReactElement } from 'react';
import { BlogPostList } from '@/components/blog/BlogPostList';
import { samplePost } from '@/data/blog/sample-post';
import { BlogCategory, BlogPostStatus } from '@/types/Blog';
import { motion } from 'framer-motion';

export default function BlogPage(): ReactElement {
  // For now, we'll use the sample post duplicated a few times
  const posts = [
    samplePost,
    {
      ...samplePost,
      slug: 'building-responsive-layouts',
      title: 'Building Responsive Layouts with Tailwind CSS',
      description: 'Learn how to create beautiful, responsive layouts using Tailwind CSS',
      category: BlogCategory.WEB_DEVELOPMENT,
      featured: false,
      publishedAt: '2024-02-25',
      readingTime: 8,
    },
    {
      ...samplePost,
      slug: 'mastering-typescript',
      title: 'Mastering TypeScript: Advanced Tips and Tricks',
      description: 'Advanced TypeScript features and patterns for better type safety',
      category: BlogCategory.PROGRAMMING,
      featured: false,
      publishedAt: '2024-02-24',
      readingTime: 12,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Blog
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Thoughts, tutorials, and insights about web development, programming, and technology.
        </p>
      </motion.div>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Featured Posts
        </h2>
        <BlogPostList posts={posts} showFeatured={true} />
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          All Posts
        </h2>
        <BlogPostList posts={posts} />
      </section>
    </div>
  );
}
