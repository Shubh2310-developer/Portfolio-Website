'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface CursorPosition {
  x: number;
  y: number;
}

interface TrailDot {
  x: number;
  y: number;
  id: number;
}

export default function AICursor() {
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const trailIdRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });

      // Add trail dot
      setTrail((prev) => {
        const newTrail = [
          ...prev,
          { x: e.clientX, y: e.clientY, id: trailIdRef.current++ },
        ];
        return newTrail.slice(-8); // Keep last 8 dots
      });

      // Check if hovering over interactive element
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.classList.contains('cursor-pointer');

      setIsHovering(isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Main cursor - Neural orb */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
        animate={{
          x: cursorPosition.x - 12,
          y: cursorPosition.y - 12,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        {/* Outer glow */}
        <div className="relative w-6 h-6">
          <div className="absolute inset-0 rounded-full bg-accent/30 blur-md animate-pulse-glow" />
          {/* Core orb */}
          <div className="absolute inset-2 rounded-full bg-accent animate-neuron-pulse" />
          {/* Center dot */}
          <div className="absolute inset-[10px] rounded-full bg-white" />
        </div>
      </motion.div>

      {/* Trailing dots */}
      {trail.map((dot, index) => (
        <motion.div
          key={dot.id}
          className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-screen"
          initial={{
            x: dot.x - 2,
            y: dot.y - 2,
            opacity: 0.6,
            scale: 1,
          }}
          animate={{
            opacity: 0,
            scale: 0.5,
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
          }}
        >
          <div
            className="w-1 h-1 rounded-full bg-accent"
            style={{
              opacity: 1 - index / trail.length,
            }}
          />
        </motion.div>
      ))}

      {/* Outer ring on hover */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9997] mix-blend-screen"
          animate={{
            x: cursorPosition.x - 20,
            y: cursorPosition.y - 20,
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
        >
          <div className="w-10 h-10 rounded-full border-2 border-primary/50 animate-pulse" />
        </motion.div>
      )}
    </>
  );
}
