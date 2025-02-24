import React, { useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

interface ButtonHoverEffectProps {
  children: React.ReactNode;
  className?: string;
  effect?: 'shine' | 'glow' | 'magnetic' | 'spotlight';
  intensity?: number;
  glowColor?: string;
  disabled?: boolean;
}

const ButtonHoverEffect: React.FC<ButtonHoverEffectProps> = ({
  children,
  className = '',
  effect = 'glow',
  intensity = 1,
  glowColor = 'rgba(var(--color-primary-500), 0.3)',
  disabled = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position values for magnetic effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for magnetic effect
  const springConfig = { damping: 15, stiffness: 150 };
  const moveX = useSpring(mouseX, springConfig);
  const moveY = useSpring(mouseY, springConfig);

  // Shine effect position
  const [shinePosition, setShinePosition] = useState({ x: 0, y: 0 });

  // Handle mouse move for different effects
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate relative mouse position
    const relativeX = event.clientX - centerX;
    const relativeY = event.clientY - centerY;

    if (effect === 'magnetic') {
      // Magnetic effect - move button towards mouse
      mouseX.set(relativeX * 0.1 * intensity);
      mouseY.set(relativeY * 0.1 * intensity);
    } else if (effect === 'spotlight' || effect === 'shine') {
      // Calculate position for shine/spotlight effect
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      setShinePosition({ x, y });
    }
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    
    setIsHovered(false);
    if (effect === 'magnetic') {
      // Reset position when mouse leaves
      mouseX.set(0);
      mouseY.set(0);
    }
  };

  // Generate styles based on effect type
  const getEffectStyles = () => {
    switch (effect) {
      case 'shine':
        return {
          background: isHovered
            ? `radial-gradient(circle at ${shinePosition.x}% ${shinePosition.y}%, rgba(255,255,255,0.2) 0%, transparent 50%)`
            : 'none',
          transition: 'background 0.3s ease',
        };
      case 'glow':
        return {
          boxShadow: isHovered
            ? `0 0 ${20 * intensity}px ${glowColor}`
            : 'none',
          transition: 'box-shadow 0.3s ease',
        };
      case 'spotlight':
        return {
          background: isHovered
            ? `radial-gradient(circle at ${shinePosition.x}% ${shinePosition.y}%, ${glowColor} 0%, transparent 100%)`
            : 'none',
          transition: 'background 0.3s ease',
        };
      default:
        return {};
    }
  };

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        x: effect === 'magnetic' ? moveX : 0,
        y: effect === 'magnetic' ? moveY : 0,
        ...getEffectStyles(),
      }}
    >
      {/* Main content */}
      {children}

      {/* Shine overlay */}
      {effect === 'shine' && isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            background: `linear-gradient(90deg, transparent, rgba(255,255,255,${0.1 * intensity}), transparent)`,
            transform: `translateX(${shinePosition.x}%)`,
          }}
        />
      )}
    </motion.div>
  );
};

export default ButtonHoverEffect;
