import React from 'react';

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
 * - Lazy loading
 * - Blur placeholder
 * - Priority loading for LCP
 * 
 * @component
 * @example
 * ```tsx
 * <OptimizedImage
 *   src="/images/profile.jpg"
 *   alt="Profile"
 *   sizes="(min-width: 1024px) 50vw, 100vw"
 *   priority
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
    <picture className={className} style={{ position: 'relative', display: 'block', width, height }}>
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
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : (lazy ? 'lazy' : 'eager')}
        decoding="async"
        style={{ 
          width: '100%',
          height: '100%',
          objectFit,
        }}
        {...(blurDataUrl && {
          style: {
            ...(!priority && {
              backgroundImage: `url(${blurDataUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }),
            width: '100%',
            height: '100%',
            objectFit,
          }
        })}
      />
    </picture>
  );
};

export default OptimizedImage;
