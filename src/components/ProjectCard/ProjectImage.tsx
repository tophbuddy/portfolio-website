import React from 'react';
import { motion } from 'framer-motion';
import { OptimizedImage } from '../ui';
import { ProjectImage as ProjectImageType } from '../../types/Project';

interface ProjectImageProps {
  /** Project images data */
  images: ProjectImageType[];
  /** Project title for accessibility */
  title: string;
  /** Optional CSS classes */
  className?: string;
  /** Whether to show caption */
  showCaption?: boolean;
  /** Whether this is a featured card */
  featured?: boolean;
  /** Optional click handler */
  onClick?: () => void;
}

/**
 * ProjectImage component displays the main image for a project card
 * with optimized loading, hover effects, and optional captions.
 */
const ProjectImage: React.FC<ProjectImageProps> = ({
  images,
  title,
  className = '',
  showCaption = false,
  featured = false,
  onClick
}) => {
  // Get the featured image or first image
  const mainImage = images.find(img => img.featured) || images[0];
  
  if (!mainImage) return null;

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-xl ${
        featured ? 'aspect-[16/9]' : 'aspect-[4/3]'
      } ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
    >
      {/* Main Image */}
      <OptimizedImage
        src={mainImage.src}
        alt={mainImage.alt || `${title} project screenshot`}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        sizes={`
          (min-width: 1536px) ${featured ? '1024px' : '384px'},
          (min-width: 1280px) ${featured ? '896px' : '320px'},
          (min-width: 1024px) ${featured ? '768px' : '256px'},
          (min-width: 768px) ${featured ? '640px' : '192px'},
          (min-width: 640px) ${featured ? '512px' : '160px'},
          100vw
        `}
        priority={featured}
        blurDataUrl={mainImage.blurDataUrl}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Caption */}
      {showCaption && mainImage.caption && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <p className="text-sm md:text-base font-medium drop-shadow-lg">
            {mainImage.caption}
          </p>
        </motion.div>
      )}

      {/* Image count badge */}
      {images.length > 1 && (
        <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-gray-900/70 text-white text-xs font-medium backdrop-blur-sm">
          {images.length} images
        </div>
      )}

      {/* Hover overlay for interaction hint */}
      {onClick && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProjectImage;
