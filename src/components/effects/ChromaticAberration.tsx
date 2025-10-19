'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ChromaticAberrationProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function ChromaticAberration({
  children,
  className = '',
  intensity = 3,
}: ChromaticAberrationProps) {
  return (
    <motion.div
      className={`relative group ${className}`}
      whileHover="hover"
      initial="initial"
    >
      {/* Red channel */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity"
        variants={{
          initial: { x: 0, y: 0 },
          hover: { x: -intensity, y: -intensity },
        }}
        transition={{ duration: 0.2 }}
        style={{
          filter: 'brightness(1.2)',
          mixBlendMode: 'screen',
          color: '#ff0000',
        }}
      >
        <div className="[&_*]:!text-[#ff2a6d]">{children}</div>
      </motion.div>

      {/* Green channel */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity"
        variants={{
          initial: { x: 0, y: 0 },
          hover: { x: 0, y: intensity },
        }}
        transition={{ duration: 0.2 }}
        style={{
          filter: 'brightness(1.2)',
          mixBlendMode: 'screen',
          color: '#00ff00',
        }}
      >
        <div className="[&_*]:!text-[#00ff41]">{children}</div>
      </motion.div>

      {/* Blue channel */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity"
        variants={{
          initial: { x: 0, y: 0 },
          hover: { x: intensity, y: -intensity },
        }}
        transition={{ duration: 0.2 }}
        style={{
          filter: 'brightness(1.2)',
          mixBlendMode: 'screen',
          color: '#0000ff',
        }}
      >
        <div className="[&_*]:!text-[#00d9ff]">{children}</div>
      </motion.div>

      {/* Original content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
