import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  /** Content to display in the tooltip */
  content: React.ReactNode;
  /** Position of the tooltip */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Delay before showing tooltip (ms) */
  delay?: number;
  /** Whether to show an arrow */
  showArrow?: boolean;
  /** Custom classes for the tooltip */
  className?: string;
  /** Whether the tooltip is disabled */
  disabled?: boolean;
  /** Children to wrap with tooltip */
  children: React.ReactNode;
  /** Optional maximum width for the tooltip */
  maxWidth?: string;
  /** Optional offset from the trigger element */
  offset?: number;
}

/**
 * Tooltip component that shows additional information on hover
 */
const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'top',
  delay = 200,
  showArrow = true,
  className = '',
  disabled = false,
  children,
  maxWidth = '200px',
  offset = 8,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Calculate position based on trigger element
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = triggerRect.top + scrollY - tooltipRect.height - offset;
        left = triggerRect.left + scrollX + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + scrollY + offset;
        left = triggerRect.left + scrollX + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.left + scrollX - tooltipRect.width - offset;
        break;
      case 'right':
        top = triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.right + scrollX + offset;
        break;
    }

    // Keep tooltip within viewport
    const viewport = {
      left: scrollX,
      right: scrollX + window.innerWidth,
      top: scrollY,
      bottom: scrollY + window.innerHeight,
    };

    if (left < viewport.left) left = viewport.left + 4;
    if (left + tooltipRect.width > viewport.right) {
      left = viewport.right - tooltipRect.width - 4;
    }
    if (top < viewport.top) top = viewport.top + 4;
    if (top + tooltipRect.height > viewport.bottom) {
      top = viewport.bottom - tooltipRect.height - 4;
    }

    setTooltipStyle({
      position: 'absolute',
      top: `${top}px`,
      left: `${left}px`,
      maxWidth,
    });
  }, [position, maxWidth, offset]);

  // Show/hide handlers
  const handleMouseEnter = useCallback(() => {
    if (disabled) return;
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  }, [delay, disabled]);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  }, []);

  // Update position when tooltip becomes visible
  useEffect(() => {
    if (isVisible) {
      updatePosition();
      const handleScroll = () => {
        updatePosition();
      };
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    }
  }, [isVisible, updatePosition]);

  // Animation variants
  const variants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.1,
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  };

  // Arrow position classes
  const arrowClass = {
    top: 'bottom-[-4px] left-1/2 -translate-x-1/2 border-t-gray-800 border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'top-[-4px] left-1/2 -translate-x-1/2 border-b-gray-800 border-l-transparent border-r-transparent border-t-transparent',
    left: 'right-[-4px] top-1/2 -translate-y-1/2 border-l-gray-800 border-t-transparent border-b-transparent border-r-transparent',
    right: 'left-[-4px] top-1/2 -translate-y-1/2 border-r-gray-800 border-t-transparent border-b-transparent border-l-transparent',
  }[position];

  return (
    <div
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            className={`
              fixed z-50 px-3 py-2 text-sm text-white
              bg-gray-800 dark:bg-gray-900 rounded-lg shadow-lg
              pointer-events-none
              ${className}
            `}
            style={tooltipStyle}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {content}
            {showArrow && (
              <div
                className={`
                  absolute w-0 h-0
                  border-4
                  ${arrowClass}
                `}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
