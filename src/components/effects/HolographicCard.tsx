'use client';

import { useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface HolographicCardProps {
  children: ReactNode;
  className?: string;
}

export function HolographicCard({ children, className = '' }: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setMousePosition({ x, y });
  };

  const rotateX = isHovered ? (mousePosition.y - 0.5) * 20 : 0;
  const rotateY = isHovered ? (mousePosition.x - 0.5) * -20 : 0;

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0.5, y: 0.5 });
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      animate={{
        rotateX,
        rotateY,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    >
      {/* Holographic overlay */}
      <div
        className="absolute inset-0 pointer-events-none rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(
            circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%,
            rgba(0, 255, 65, 0.3) 0%,
            rgba(0, 217, 255, 0.2) 50%,
            transparent 100%
          )`,
          mixBlendMode: 'screen',
        }}
      />

      {/* Rainbow reflection effect */}
      <div
        className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden"
        style={{
          background: `linear-gradient(
            ${mousePosition.x * 360}deg,
            rgba(255, 0, 255, 0.1),
            rgba(0, 255, 255, 0.1),
            rgba(255, 255, 0, 0.1)
          )`,
          opacity: isHovered ? 0.6 : 0,
          transition: 'opacity 0.3s',
        }}
      />

      {/* Glow effect */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-lg"
          style={{
            boxShadow: `
              0 0 20px rgba(0, 255, 65, 0.3),
              0 0 40px rgba(0, 217, 255, 0.2),
              inset 0 0 20px rgba(0, 255, 65, 0.1)
            `,
          }}
        />
      )}

      {/* Content */}
      <div style={{ transform: 'translateZ(20px)' }}>{children}</div>
    </motion.div>
  );
}
