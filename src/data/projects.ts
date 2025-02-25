import { Project } from '../types/Project';
import { validateProjects } from '../schemas/ProjectSchema';

const projectsData = [
  {
    id: 'portfolio-website',
    title: 'Modern Portfolio Website',
    summary: 'A responsive portfolio website built with React, TypeScript, and Tailwind CSS, featuring dark mode, animations, and modern design principles.',
    description: `
      # Modern Portfolio Website

      A fully responsive portfolio website that showcases my projects and skills. Built with modern web technologies
      and best practices in mind.

      ## Key Features
      - Responsive design with mobile-first approach
      - Dark mode support with system preference detection
      - Smooth animations and transitions
      - SEO optimized with meta tags
      - Performance optimized with lazy loading
      - Accessible following WCAG guidelines

      ## Technical Details
      The website is built using React and TypeScript, styled with Tailwind CSS, and features custom animations
      using Framer Motion. It follows modern development practices including component-based architecture,
      type safety, and responsive design principles.
    `,
    images: [
      {
        src: '/images/projects/portfolio/hero.webp',
        alt: 'Portfolio website hero section',
        featured: true,
        blurDataUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/2wBDAR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
      },
      {
        src: '/images/projects/portfolio/projects.webp',
        alt: 'Portfolio projects section',
        caption: 'Projects showcase with filtering and sorting'
      },
      {
        src: '/images/projects/portfolio/contact.webp',
        alt: 'Portfolio contact section',
        caption: 'Contact form with validation'
      }
    ],
    technologies: [
      {
        name: 'React',
        icon: 'react',
        url: 'https://reactjs.org',
        color: '#61DAFB'
      },
      {
        name: 'TypeScript',
        icon: 'typescript',
        url: 'https://www.typescriptlang.org',
        color: '#3178C6'
      },
      {
        name: 'Tailwind CSS',
        icon: 'tailwindcss',
        url: 'https://tailwindcss.com',
        color: '#06B6D4'
      },
      {
        name: 'Framer Motion',
        icon: 'framer',
        url: 'https://www.framer.com/motion',
        color: '#0055FF'
      }
    ],
    links: [
      {
        type: 'github',
        url: 'https://github.com/yourusername/portfolio',
        label: 'View Source',
        icon: 'github'
      },
      {
        type: 'demo',
        url: 'https://your-portfolio.com',
        label: 'Live Demo',
        icon: 'external-link'
      }
    ],
    date: '2024-02-25',
    category: 'Web Development',
    featured: true,
    status: 'completed',
    role: 'Full Stack Developer',
    duration: '2 months',
    highlights: [
      'Implemented responsive design with mobile-first approach',
      'Added dark mode with system preference detection',
      'Created custom animations for enhanced UX',
      'Optimized performance with lazy loading and code splitting',
      'Achieved 100% lighthouse scores'
    ],
    challenges: [
      {
        challenge: 'Implementing smooth dark mode transitions',
        solution: 'Used CSS variables and Tailwind CSS for seamless theme switching with proper color management'
      },
      {
        challenge: 'Optimizing image loading performance',
        solution: 'Implemented lazy loading with blur placeholders and WebP format for optimal loading times'
      }
    ],
    seo: {
      title: 'Modern Portfolio Website | Your Name',
      description: 'Showcase of web development projects and skills, built with React and TypeScript',
      keywords: ['portfolio', 'web development', 'react', 'typescript', 'tailwind']
    },
    order: 1
  },
  {
    id: 'ai-image-generator',
    title: 'AI Image Generator',
    summary: 'A web application that generates unique images using artificial intelligence, built with Next.js and OpenAI API.',
    description: `
      # AI Image Generator

      An innovative web application that leverages artificial intelligence to generate unique images
      based on text descriptions. Built with Next.js and integrated with OpenAI's DALL-E API.

      ## Features
      - Text-to-image generation
      - Image history and favorites
      - Customizable generation parameters
      - Image download and sharing
      - User authentication
    `,
    images: [
      {
        src: '/images/projects/ai-generator/main.webp',
        alt: 'AI Image Generator interface',
        featured: true
      },
      {
        src: '/images/projects/ai-generator/gallery.webp',
        alt: 'Generated images gallery',
        caption: 'Gallery of AI-generated images'
      }
    ],
    technologies: [
      {
        name: 'Next.js',
        icon: 'nextjs',
        url: 'https://nextjs.org',
        color: '#000000'
      },
      {
        name: 'OpenAI API',
        icon: 'openai',
        url: 'https://openai.com',
        color: '#412991'
      }
    ],
    links: [
      {
        type: 'github',
        url: 'https://github.com/yourusername/ai-image-generator',
        label: 'Source Code',
        icon: 'github'
      }
    ],
    date: '2024-01-15',
    category: 'AI/ML',
    featured: true,
    status: 'in-progress',
    highlights: [
      'Integrated with OpenAI DALL-E API',
      'Implemented user authentication',
      'Added image history and favorites'
    ],
    seo: {
      title: 'AI Image Generator | Your Name',
      description: 'Generate unique images using artificial intelligence',
      keywords: ['AI', 'image generation', 'DALL-E', 'Next.js']
    },
    order: 2
  }
] as const;

// Validate projects data
const projects = validateProjects(projectsData);

export default projects;
