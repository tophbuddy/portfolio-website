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
 * 
 * @component
 * @example
 * ```tsx
 * <Hero className="my-custom-class" />
 * ```
 * 
 * @param props - Component props
 * @param props.className - Optional CSS classes to apply to the container
 * 
 * @returns The Hero section component with animations and responsive layout
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
    <header className={`relative min-h-[90vh] w-full ${className}`}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[90vh]">
          {/* Left Column - Text Content */}
          <div className="space-y-8 text-center lg:text-left">
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
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                  <AnimatedText 
                    words={introWords}
                    className="text-primary-600 dark:text-primary-400"
                    typingSpeed={100}
                    deletingSpeed={50}
                    delayBetweenWords={2000}
                  />
                  <TextReveal 
                    delay={0.5}
                    direction="up"
                    type="words"
                    className="block mt-2"
                  >
                    Building the Future
                  </TextReveal>
                </h1>
                <TextReveal
                  delay={0.7}
                  direction="up"
                  type="lines"
                  className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0"
                >
                  Building innovative solutions with modern technologies. Passionate about
                  creating efficient, scalable, and user-friendly applications.
                </TextReveal>
              </div>

              {/* CTA Buttons Container */}
              <TextReveal
                delay={0.9}
                direction="up"
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <CTAButton
                  to="/projects"
                  variant="primary"
                  size="lg"
                  icon={<FaArrowRight />}
                  hoverEffect="glow"
                >
                  View Projects
                </CTAButton>
                <CTAButton
                  to="/contact"
                  variant="outline"
                  size="lg"
                  icon={<FaEnvelope />}
                  hoverEffect="shine"
                >
                  Contact Me
                </CTAButton>
              </TextReveal>
            </ScrollReveal>
          </div>

          {/* Right Column - Profile Image */}
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
            className="hidden lg:block"
          >
            <ProfileImage
              src="/profile-placeholder.jpg"
              alt="Your Name - Software Engineer"
              className="w-full max-w-lg mx-auto aspect-square"
            />
          </ScrollReveal>
        </div>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
      
      {/* Scroll Indicator */}
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
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-600 dark:border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-600 dark:bg-gray-400 rounded-full mt-2" />
        </div>
      </ScrollReveal>
    </header>
  );
};

export default Hero;
