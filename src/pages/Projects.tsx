import { useState } from 'react';
import { motion } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  liveUrl?: string;
}

const Projects = () => {
  const [filter, setFilter] = useState<string>('all');

  const projects: Project[] = [
    {
      id: 1,
      title: 'Project One',
      description: 'A full-stack web application built with React and Node.js.',
      technologies: ['React', 'Node.js', 'MongoDB'],
      image: '/project1.jpg',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com'
    },
    // Add more projects here
  ];

  const technologies = ['All', 'React', 'Node.js', 'Python', 'TypeScript'];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.technologies.includes(filter));

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center mb-8">My Projects</h1>
        
        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {technologies.map((tech) => (
            <button
              key={tech}
              onClick={() => setFilter(tech.toLowerCase())}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                ${filter === tech.toLowerCase()
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
            >
              {tech}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="card"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-700">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                  >
                    GitHub
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Projects;
