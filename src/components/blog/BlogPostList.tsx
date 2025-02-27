import { type ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '@/utils/date';
import { BlogPost } from '@/types/Blog';
import { motion, Variants } from 'framer-motion';

interface BlogPostListProps {
  posts: BlogPost[];
  showFeatured?: boolean;
  className?: string;
}

const fadeInUp: Variants = {
  initial: {
    y: 20,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const stagger: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function BlogPostList({ 
  posts, 
  showFeatured = false,
  className = ''
}: BlogPostListProps): ReactElement {
  const displayPosts = showFeatured ? posts.filter(post => post.featured) : posts;

  if (displayPosts.length === 0) {
    return (
      <div className={`text-center py-10 ${className}`}>
        <p className="text-gray-600 dark:text-gray-400">No posts found</p>
      </div>
    );
  }

  return (
    <motion.div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
      initial="initial"
      animate="animate"
      variants={stagger}
    >
      {displayPosts.map((post) => (
        <motion.article
          key={post.slug}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          variants={fadeInUp}
        >
          <Link to={`/blog/${post.slug}`} className="block">
            {post.coverImage && (
              <div className="relative h-48">
                <img
                  src={post.coverImage.url}
                  alt={post.coverImage.alt}
                  className="w-full h-full object-cover"
                />
                {post.coverImage.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                    {post.coverImage.caption}
                  </div>
                )}
              </div>
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {post.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {post.author?.avatar && (
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {post.author?.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(post.publishedAt)}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {post.readingTime} min read
                </div>
              </div>
            </div>
          </Link>
        </motion.article>
      ))}
    </motion.div>
  );
}
