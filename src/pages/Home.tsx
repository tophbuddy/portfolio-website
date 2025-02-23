import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';

const Home = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <Hero />

      {/* Skills Section */}
      <section className="py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Frontend */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-4">Frontend Development</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>React.js / Next.js</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>HTML5 / CSS3</li>
              </ul>
            </div>

            {/* Backend */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-4">Backend Development</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>Node.js</li>
                <li>Python</li>
                <li>Java</li>
                <li>RESTful APIs</li>
              </ul>
            </div>

            {/* Tools & Others */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-4">Tools & Technologies</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>Git / GitHub</li>
                <li>Docker</li>
                <li>AWS / Cloud</li>
                <li>CI/CD</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project cards will be added here */}
            <div className="card">
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-700" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Project Name</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Brief description of the project and its key features.
                </p>
                <Link to="/projects" className="text-primary-600 hover:text-primary-700 font-medium">
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
