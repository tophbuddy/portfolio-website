export const siteConfig = {
  title: 'Chris Holzheu - Software Engineer',
  description: 'Personal website and blog of Chris Holzheu, a software engineer passionate about web development, AI, and technology.',
  siteUrl: 'https://chrisholzheu.com', // Replace with your actual domain
  author: {
    name: 'Chris Holzheu',
    email: 'contact@chrisholzheu.com', // Replace with your actual email
    url: 'https://chrisholzheu.com', // Replace with your actual URL
  },
  social: {
    github: 'https://github.com/tophbuddy',
    linkedin: 'https://linkedin.com/in/chris-holzheu',
    // Add other social links as needed
  },
  nav: [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
  ],
} as const;
