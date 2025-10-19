'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className = '' }: GlitchTextProps) {
  const [glitching, setGlitching] = useState(false);
  const [displayText, setDisplayText] = useState(text);

  const glitchChars = '!<>-_\\/[]{}—=+*^?#________';

  const glitchEffect = () => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split('')
          .map((char, index) => {
            if (index < iterations) {
              return text[index];
            }
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          })
          .join('')
      );

      iterations += 1 / 3;

      if (iterations >= text.length) {
        clearInterval(interval);
        setGlitching(false);
        setDisplayText(text);
      }
    }, 30);
  };

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitching(true);
      glitchEffect();
    }, 5000);

    return () => clearInterval(glitchInterval);
  }, [text]);

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => {
        setGlitching(true);
        glitchEffect();
      }}
    >
      <span className="relative z-10">{displayText}</span>

      {/* Glitch layers */}
      {glitching && (
        <>
          <motion.span
            className="absolute top-0 left-0 text-[#00d9ff]"
            animate={{
              x: [0, -2, 2, -2, 0],
              opacity: [0.8, 0.5, 0.8, 0.5, 0],
            }}
            transition={{ duration: 0.2, repeat: 3 }}
          >
            {displayText}
          </motion.span>
          <motion.span
            className="absolute top-0 left-0 text-[#ff2a6d]"
            animate={{
              x: [0, 2, -2, 2, 0],
              opacity: [0.8, 0.5, 0.8, 0.5, 0],
            }}
            transition={{ duration: 0.2, repeat: 3 }}
          >
            {displayText}
          </motion.span>
        </>
      )}
    </motion.span>
  );
}
