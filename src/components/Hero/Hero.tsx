import React from 'react';
import { 
  ProfileImage, 
  AnimatedText, 
  CTAButton, 
  TextReveal,
  ScrollReveal 
} from '../ui';
import { FaArrowRight, FaEnvelope } from 'react-icons/fa';

interface HeroProps {
  /** Custom CSS classes to apply to the container */
  className?: string;
}

/**
 * Hero component that displays the main landing section of the portfolio.
 * Features animated text, profile image, and call-to-action buttons.
 * Implements responsive design with optimized breakpoints:
 * - Mobile: < 640px (default)
 * - Tablet: 640px - 1024px
 * - Desktop: > 1024px
 * 
 * @component
 * @example
 * ```tsx
 * <Hero className="my-custom-class" />
 * ```
 */
const Hero: React.FC<HeroProps> = ({ className = '' }) => {
  const introWords = [
    'Software Engineer',
    'Full Stack Developer',
    'UI/UX Enthusiast',
    'Problem Solver',
    'Tech Innovator'
  ];

  return (
    <header className={`relative min-h-[100svh] w-full ${className}`}>
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800" />
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-[0.015] dark:opacity-[0.03]" />
      </div>
      
      <div className="relative h-full">
        {/* Main content container with responsive padding */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
          {/* Flex container with responsive layout */}
          <div className="flex flex-col lg:flex-row h-full items-center justify-center lg:justify-between py-8 lg:py-0 gap-8 lg:gap-12">
            {/* Left content column */}
            <div className="w-full lg:w-1/2 max-w-2xl lg:max-w-none order-2 lg:order-1">
              {/* Mobile/Tablet profile image */}
              <ScrollReveal
                threshold={0.3}
                delay={0.2}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 0.8,
                      ease: [0.2, 0.65, 0.3, 0.9],
                    },
                  },
                }}
                className="block lg:hidden mb-8 mx-auto"
              >
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64">
                  <ProfileImage
                    src="/images/profile.jpg"
                    alt="Your Name - Software Engineer"
                    className="rounded-full shadow-xl ring-2 ring-primary-100 dark:ring-primary-900"
                  />
                  {/* Decorative background circle */}
                  <div className="absolute -inset-4 border-2 border-primary-200 dark:border-primary-800 rounded-full animate-spin-slow" />
                </div>
              </ScrollReveal>

              {/* Text content */}
              <div className="text-center lg:text-left space-y-6 md:space-y-8">
                <ScrollReveal
                  threshold={0.3}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.8,
                        ease: [0.2, 0.65, 0.3, 0.9],
                      },
                    },
                  }}
                >
                  {/* Heading with responsive typography */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white tracking-tight">
                    <AnimatedText 
                      words={introWords}
                      className="text-primary-600 dark:text-primary-400 font-extrabold"
                      typingSpeed={100}
                      deletingSpeed={50}
                      delayBetweenWords={2000}
                    />
                    <TextReveal 
                      delay={0.5}
                      direction="up"
                      type="words"
                      className="block mt-2 md:mt-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                    >
                      Building the Future
                    </TextReveal>
                  </h1>

                  {/* Description text */}
                  <TextReveal
                    delay={0.7}
                    direction="up"
                    type="lines"
                    className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                  >
                    Building innovative solutions with modern technologies. Passionate about
                    creating efficient, scalable, and user-friendly applications.
                  </TextReveal>

                  {/* CTA Buttons */}
                  <div className="mt-8 md:mt-12">
                    <TextReveal
                      delay={0.9}
                      direction="up"
                      className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start"
                    >
                      <CTAButton
                        to="/projects"
                        variant="primary"
                        size="lg"
                        icon={<FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />}
                        hoverEffect="glow"
                        className="w-full sm:w-auto text-base md:text-lg font-medium"
                      >
                        View Projects
                      </CTAButton>
                      <CTAButton
                        to="/contact"
                        variant="outline"
                        size="lg"
                        icon={<FaEnvelope className="ml-2 group-hover:scale-110 transition-transform" />}
                        hoverEffect="shine"
                        className="w-full sm:w-auto text-base md:text-lg font-medium"
                      >
                        Contact Me
                      </CTAButton>
                    </TextReveal>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* Desktop profile image column */}
            <div className="hidden lg:block w-5/12 xl:w-4/12 order-1 lg:order-2">
              <ScrollReveal
                threshold={0.3}
                delay={0.2}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 0.8,
                      ease: [0.2, 0.65, 0.3, 0.9],
                    },
                  },
                }}
              >
                <div className="relative">
                  <ProfileImage
                    src="/images/profile.jpg"
                    alt="Your Name - Software Engineer"
                    className="w-full rounded-2xl shadow-2xl ring-4 ring-primary-100 dark:ring-primary-900"
                  />
                  {/* Decorative elements for desktop */}
                  <div className="absolute -inset-4 border-2 border-primary-200 dark:border-primary-800 rounded-2xl -z-10 transform rotate-3" />
                  <div className="absolute -inset-4 border-2 border-primary-200 dark:border-primary-800 rounded-2xl -z-20 transform -rotate-3" />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary-500/20 to-transparent pointer-events-none" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent pointer-events-none" />
      
      {/* Scroll Indicator - Visible on tablet and up */}
      <ScrollReveal
        threshold={0.1}
        delay={1}
        variants={{
          hidden: { opacity: 0, y: -10 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.5,
              y: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }
          }
        }}
        once={false}
        className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-bounce" />
        </div>
      </ScrollReveal>
    </header>
  );
};

export default Hero;
