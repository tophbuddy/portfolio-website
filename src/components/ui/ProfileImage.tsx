import React from 'react';
import OptimizedImage from './OptimizedImage';

interface ProfileImageProps {
  /** Source URL for the profile image */
  src: string;
  /** Alternative text for accessibility */
  alt: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * ProfileImage component that displays an optimized profile image with proper responsive sizing.
 * Uses modern image optimization techniques for optimal performance.
 * 
 * @component
 * @example
 * ```tsx
 * <ProfileImage
 *   src="/images/profile.jpg"
 *   alt="John Doe - Software Engineer"
 *   className="rounded-full"
 * />
 * ```
 */
const ProfileImage: React.FC<ProfileImageProps> = ({
  src,
  alt,
  className = '',
}) => {
  // Generate responsive sizes based on viewport
  const sizes = `
    (min-width: 1536px) 384px,
    (min-width: 1280px) 320px,
    (min-width: 1024px) 256px,
    (min-width: 768px) 192px,
    (min-width: 640px) 160px,
    128px
  `.trim();

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={className}
      sizes={sizes}
      priority // Profile image is usually above the fold
      objectFit="cover"
      blurDataUrl="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/2wBDAR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=" // Placeholder blur
    />
  );
};

export default ProfileImage;
