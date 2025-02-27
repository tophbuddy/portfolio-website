import { type ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { SiHashnode } from 'react-icons/si';

interface FooterProps {
  className?: string;
}

export default function Footer({ className = '' }: FooterProps): ReactElement {
  const year = new Date().getFullYear();

  return (
    <footer className={`bg-white dark:bg-gray-800 ${className}`}>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          <div className="px-5 py-2">
            <Link to="/" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              Home
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link to="/blog" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              Blog
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link to="/projects" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              Projects
            </Link>
          </div>
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          <a
            href="https://github.com/yourusername"
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">GitHub</span>
            <FaGithub className="h-6 w-6" />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">LinkedIn</span>
            <FaLinkedin className="h-6 w-6" />
          </a>
          <a
            href="https://twitter.com/yourusername"
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">Twitter</span>
            <FaTwitter className="h-6 w-6" />
          </a>
          <a
            href="https://hashnode.com/@yourusername"
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">Hashnode</span>
            <SiHashnode className="h-6 w-6" />
          </a>
        </div>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; {year} Your Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
