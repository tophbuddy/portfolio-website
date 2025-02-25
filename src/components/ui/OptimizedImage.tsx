import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageSource {
  src: string;
  width: number;
  format?: 'jpg' | 'webp' | 'avif';
}

interface OptimizedImageProps {
  /** Base source URL for the image */
  src: string;
  /** Alternative text for accessibility */
  alt: string;
  /** CSS classes to apply */
  className?: string;
  /** Array of image sources for different sizes */
  sizes?: string;
  /** Whether to lazy load the image */
  lazy?: boolean;
  /** Priority loading for LCP images */
  priority?: boolean;
  /** Optional blur data URL for placeholder */
  blurDataUrl?: string;
  /** Optional width for the container */
  width?: number | string;
  /** Optional height for the container */
  height?: number | string;
  /** Optional object-fit style */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

/**
 * OptimizedImage component that provides responsive images with modern optimization techniques.
 * Features include:
 * - Responsive image loading
 * - Modern format support (WebP, AVIF)
 * - Lazy loading with blur-up effect
 * - Priority loading for LCP
 * - Smooth transitions
 * 
 * @component
 * @example
 * ```tsx
 * <OptimizedImage
 *   src="/images/profile.jpg"
 *   alt="Profile"
 *   sizes="(min-width: 1024px) 50vw, 100vw"
 *   priority
 *   blurDataUrl="data:image/jpeg;base64,..."
 * />
 * ```
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  sizes = '100vw',
  lazy = true,
  priority = false,
  blurDataUrl,
  width,
  height,
  objectFit = 'cover',
}) => {
  // State for image loading
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Reset loading state when src changes
  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
  }, [src]);

  // Generate image sources for different formats and sizes
  const generateSrcSet = (format?: 'webp' | 'avif'): string => {
    const widths = [320, 640, 768, 1024, 1280, 1536];
    const extension = format || src.split('.').pop() || 'jpg';
    
    return widths
      .map(w => {
        const formattedSrc = src.replace(/\.[^.]+$/, '');
        return `${formattedSrc}-${w}.${extension} ${w}w`;
      })
      .join(', ');
  };

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Blur placeholder */}
      {blurDataUrl && isLoading && (
        <motion.div
          className="absolute inset-0 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={blurDataUrl}
            alt=""
            className="w-full h-full"
            style={{ objectFit }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 backdrop-blur-xl" />
        </motion.div>
      )}

      {/* Loading spinner */}
      {isLoading && !blurDataUrl && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <svg
            className="w-8 h-8 animate-spin text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-center">
            <svg
              className="w-8 h-8 mx-auto text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Failed to load image
            </p>
          </div>
        </div>
      )}

      <picture className="relative z-20">
        {/* AVIF format */}
        <source
          type="image/avif"
          srcSet={generateSrcSet('avif')}
          sizes={sizes}
        />
        {/* WebP format */}
        <source
          type="image/webp"
          srcSet={generateSrcSet('webp')}
          sizes={sizes}
        />
        {/* Fallback format */}
        <source
          srcSet={generateSrcSet()}
          sizes={sizes}
        />
        <motion.img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : (lazy ? 'lazy' : 'eager')}
          decoding="async"
          className="w-full h-full"
          style={{ objectFit }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setIsError(true);
          }}
        />
      </picture>
    </div>
  );
};

export default OptimizedImage;
