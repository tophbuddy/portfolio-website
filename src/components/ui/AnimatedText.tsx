import React, { useState, useEffect, useCallback } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

interface AnimatedTextProps {
  words: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
  cursorColor?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  words,
  className = '',
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenWords = 2000,
  cursorColor = 'currentColor'
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const controls = useAnimationControls();

  const animateCursor = useCallback(async () => {
    while (true) {
      await controls.start({ opacity: 1 });
      await controls.start({ opacity: 0 });
    }
  }, [controls]);

  useEffect(() => {
    animateCursor();
  }, [animateCursor]);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          // Wait before starting to delete
          setTimeout(() => setIsDeleting(true), delayBetweenWords);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delayBetweenWords]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {currentText}
      </motion.span>
      <motion.span
        animate={controls}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="ml-1 inline-block w-[2px] h-[1.2em]"
        style={{ 
          backgroundColor: cursorColor,
          verticalAlign: 'middle'
        }}
      />
    </span>
  );
};

export default AnimatedText;
