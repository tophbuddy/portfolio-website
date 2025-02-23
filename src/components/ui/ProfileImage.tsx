import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProfileImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ src, alt, className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    // Create an observer for lazy loading
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    // Get the container element
    const container = document.getElementById('profile-image-container');
    if (container) {
      observer.observe(container);
    }

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, []);

  // Preload the image
  useEffect(() => {
    if (isInView) {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
    }
  }, [isInView, src]);

  return (
    <div
      id="profile-image-container"
      className={`relative overflow-hidden ${className}`}
    >
      {/* Placeholder/Skeleton */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse rounded-full" />

      {/* Actual image */}
      {isInView && (
        <motion.img
          src={src}
          alt={alt}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: isLoaded ? 1 : 0,
            scale: isLoaded ? 1 : 0.9,
          }}
          transition={{
            opacity: { duration: 0.5 },
            scale: { duration: 0.7, ease: 'easeOut' },
          }}
          className="relative w-full h-full object-cover rounded-full"
          style={{ opacity: isLoaded ? 1 : 0 }}
        />
      )}

      {/* Decorative elements */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-500/20 to-transparent pointer-events-none" />
      
      {/* Loading indicator */}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
