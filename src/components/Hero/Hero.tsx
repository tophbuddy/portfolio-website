import React from 'react';
import { motion } from 'framer-motion';
import ProfileImage from '../ui/ProfileImage';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className = '' }) => {
  return (
    <header className={`relative min-h-[90vh] w-full ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[90vh]">
          {/* Left Column - Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                Software Engineer
                <span className="block text-primary-600 dark:text-primary-400">
                  & Developer
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
                Building innovative solutions with modern technologies. Passionate about
                creating efficient, scalable, and user-friendly applications.
              </p>
            </motion.div>

            {/* CTA Buttons Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button className="btn">
                View Projects
              </button>
              <button className="btn-outline">
                Contact Me
              </button>
            </motion.div>
          </div>

          {/* Right Column - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden lg:block"
          >
            <ProfileImage
              src="/profile-placeholder.jpg"
              alt="Your Name - Software Engineer"
              className="w-full max-w-lg mx-auto aspect-square"
            />
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5,
          delay: 0.5,
          y: {
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-600 dark:border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-600 dark:bg-gray-400 rounded-full mt-2" />
        </div>
      </motion.div>
    </header>
  );
};

export default Hero;
