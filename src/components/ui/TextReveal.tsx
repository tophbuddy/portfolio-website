import React from 'react';
import { motion } from 'framer-motion';

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  type?: 'words' | 'chars' | 'lines';
}

const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  direction = 'up',
  type = 'words'
}) => {
  // Animation variants for container
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: delay
      }
    }
  };

  // Get direction-based animation values
  const getDirectionOffset = () => {
    switch (direction) {
      case 'up': return { y: 20 };
      case 'down': return { y: -20 };
      case 'left': return { x: 20 };
      case 'right': return { x: -20 };
      default: return { y: 20 };
    }
  };

  // Animation variants for individual elements
  const elementVariants = {
    hidden: {
      opacity: 0,
      ...getDirectionOffset(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: duration,
        ease: [0.2, 0.65, 0.3, 0.9], // Custom ease curve for smooth animation
      }
    }
  };

  // Split text based on type
  const splitText = (text: string) => {
    switch (type) {
      case 'chars':
        return text.split('');
      case 'words':
        return text.split(/\s+/);
      case 'lines':
        return text.split(/\\n/);
      default:
        return [text];
    }
  };

  // Process children to handle both string and React elements
  const processChildren = (children: React.ReactNode): React.ReactNode => {
    if (typeof children === 'string') {
      const elements = splitText(children);
      return elements.map((element, index) => (
        <motion.span
          key={index}
          variants={elementVariants}
          className="inline-block"
          style={{ marginRight: type === 'chars' ? '0' : '0.25em' }}
        >
          {element}
        </motion.span>
      ));
    }

    // Handle React elements
    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...children.props,
        className: `inline-block ${children.props.className || ''}`,
        variants: elementVariants
      });
    }

    return children;
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
    >
      {React.Children.map(children, child => processChildren(child))}
    </motion.div>
  );
};

export default TextReveal;
