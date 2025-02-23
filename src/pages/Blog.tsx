import { useState } from 'react';
import { motion } from 'framer-motion';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
}

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Getting Started with React and TypeScript',
      excerpt: 'Learn how to set up a new React project with TypeScript and best practices for type safety.',
      date: '2024-02-22',
      readTime: '5 min read',
      category: 'React',
      image: '/blog1.jpg'
    },
    // Add more blog posts here
  ];

  const categories = ['All', 'React', 'TypeScript', 'Web Development', 'DevOps'];

  const filteredPosts = selectedCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center mb-8">Blog</h1>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category.toLowerCase())}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                ${selectedCategory === category.toLowerCase()
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="card"
            >
              {post.image && (
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-700">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-xl font-semibold mb-2 hover:text-primary-600 dark:hover:text-primary-500 transition-colors duration-200">
                  <a href={`/blog/${post.id}`}>{post.title}</a>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full">
                    {post.category}
                  </span>
                  <a
                    href={`/blog/${post.id}`}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Blog;
