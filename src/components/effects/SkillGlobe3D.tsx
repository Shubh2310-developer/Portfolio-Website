'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  x: number;
  y: number;
  z: number;
  scale: number;
  alpha: number;
}

export function SkillGlobe3D({ skills }: { skills: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [skillPositions, setSkillPositions] = useState<Skill[]>([]);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Position skills on a sphere
    const radius = 200;
    const positions: Skill[] = skills.map((name, i) => {
      const phi = Math.acos(-1 + (2 * i) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;

      return {
        name,
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        scale: 1,
        alpha: 1,
      };
    });

    setSkillPositions(positions);
  }, [skills]);

  useEffect(() => {
    // Auto-rotate
    const interval = setInterval(() => {
      if (!isDragging) {
        setRotation((prev) => ({ x: prev.x, y: prev.y + 0.5 }));
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isDragging]);

  const rotatePoint = (skill: Skill) => {
    const cosX = Math.cos((rotation.x * Math.PI) / 180);
    const sinX = Math.sin((rotation.x * Math.PI) / 180);
    const cosY = Math.cos((rotation.y * Math.PI) / 180);
    const sinY = Math.sin((rotation.y * Math.PI) / 180);

    // Rotate around Y axis
    let x = skill.x * cosY + skill.z * sinY;
    let z = -skill.x * sinY + skill.z * cosY;
    const y1 = skill.y;

    // Rotate around X axis
    const y2 = y1 * cosX - z * sinX;
    const z2 = y1 * sinX + z * cosX;

    // Calculate perspective
    const perspective = 400;
    const scale = perspective / (perspective + z2);
    const alpha = (z2 + 200) / 400; // Fade based on depth

    return { x, y: y2, z: z2, scale, alpha: Math.max(0.3, alpha) };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const dx = e.clientX - lastMouse.x;
      const dy = e.clientY - lastMouse.y;

      setRotation((prev) => ({
        x: prev.x + dy * 0.5,
        y: prev.y + dx * 0.5,
      }));

      setLastMouse({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600px] flex items-center justify-center cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Globe wireframe */}
      <svg className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(8)].map((_, i) => {
          const radius = 200;
          const angle = (i / 8) * Math.PI;
          return (
            <ellipse
              key={`lat-${i}`}
              cx="50%"
              cy="50%"
              rx={radius * Math.sin(angle)}
              ry={radius}
              fill="none"
              stroke="#00ff41"
              strokeWidth="1"
            />
          );
        })}
        {[...Array(8)].map((_, i) => {
          const radius = 200;
          return (
            <ellipse
              key={`long-${i}`}
              cx="50%"
              cy="50%"
              rx={radius}
              ry={radius}
              fill="none"
              stroke="#00ff41"
              strokeWidth="1"
              transform={`rotate(${(i / 8) * 180}, 50%, 50%)`}
            />
          );
        })}
      </svg>

      {/* Skills */}
      {skillPositions
        .map((skill) => ({ ...skill, ...rotatePoint(skill) }))
        .sort((a, b) => a.z - b.z) // Sort by depth
        .map((skill, i) => (
          <motion.div
            key={skill.name}
            className="absolute px-4 py-2 rounded-lg border border-[#00ff41] bg-black/80 backdrop-blur-sm font-mono text-sm whitespace-nowrap"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) translate(${skill.x * skill.scale}px, ${skill.y * skill.scale}px) scale(${skill.scale})`,
              opacity: skill.alpha,
              zIndex: Math.floor(skill.z),
              color: skill.z > 0 ? '#00ff41' : '#00d9ff',
              borderColor: skill.z > 0 ? '#00ff41' : '#00d9ff',
              boxShadow: skill.z > 0 ? `0 0 20px rgba(0, 255, 65, ${skill.alpha * 0.5})` : 'none',
            }}
            whileHover={{
              scale: 1.2,
              boxShadow: '0 0 30px rgba(0, 255, 65, 0.8)',
            }}
          >
            {skill.name}
          </motion.div>
        ))}

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-mono text-[#00ff41]/60">
        Drag to rotate • Auto-rotating sphere
      </div>
    </div>
  );
}
