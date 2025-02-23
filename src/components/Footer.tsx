import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 tracking-wider uppercase">
              About
            </h3>
            <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
              A showcase of my software engineering projects and technical writing.
              Built with modern web technologies.
            </p>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 tracking-wider uppercase">
              Connect
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 tracking-wider uppercase">
              Contact
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href="mailto:your.email@example.com"
                  className="text-base text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500"
                >
                  your.email@example.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            {/* Add social icons here if needed */}
          </div>
          <p className="mt-8 text-base text-gray-500 dark:text-gray-400 md:mt-0 md:order-1">
            {currentYear} Your Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
