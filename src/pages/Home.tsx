import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
            Software Engineer & Developer
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Building innovative solutions with modern technologies. Passionate about creating
            efficient, scalable, and user-friendly applications.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/projects" className="btn">
              View Projects
            </Link>
            <Link to="/contact" className="btn-outline">
              Contact Me
            </Link>
          </div>
        </motion.div>
      </section>

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
