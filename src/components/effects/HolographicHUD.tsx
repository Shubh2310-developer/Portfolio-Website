'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function HolographicHUD() {
  const [time, setTime] = useState(new Date());
  const [stats, setStats] = useState({
    visitors: 0,
    projects: 10,
    skills: 25,
    commits: 1000,
  });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);

    // Animate visitor count
    let count = 0;
    const visitorInterval = setInterval(() => {
      count += Math.floor(Math.random() * 10);
      setStats((prev) => ({ ...prev, visitors: Math.min(count, 1234) }));
    }, 100);

    return () => {
      clearInterval(timer);
      clearInterval(visitorInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {/* Top HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-black/60 backdrop-blur-sm border border-[#00ff41]/30 rounded-lg p-3 font-mono text-xs"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse" />
            <span className="text-[#00ff41]">SYSTEM ONLINE</span>
          </div>
          <div className="text-[#00ff41]/60 space-y-1">
            <div>STATUS: OPERATIONAL</div>
            <div>UPTIME: {time.toLocaleTimeString()}</div>
            <div>MODE: INTERACTIVE</div>
          </div>
        </motion.div>

        {/* Live Stats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-black/60 backdrop-blur-sm border border-[#00d9ff]/30 rounded-lg p-3 font-mono text-xs"
        >
          <div className="text-[#00d9ff] mb-2">LIVE STATS</div>
          <div className="text-[#00d9ff]/60 space-y-1">
            <div className="flex justify-between gap-4">
              <span>VISITORS:</span>
              <span className="text-[#00ff41]">{stats.visitors.toString().padStart(4, '0')}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>PROJECTS:</span>
              <span className="text-[#00ff41]">{stats.projects}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>SKILLS:</span>
              <span className="text-[#00ff41]">{stats.skills}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Corner Brackets */}
      <svg className="absolute inset-0 w-full h-full">
        {/* Top Left */}
        <motion.path
          d="M 20 100 L 20 20 L 100 20"
          stroke="#00ff41"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Top Right */}
        <motion.path
          d="M -20 20 L -100 20 L -100 100"
          stroke="#00ff41"
          strokeWidth="2"
          fill="none"
          transform="translate(100%, 0)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        />

        {/* Bottom Left */}
        <motion.path
          d="M 20 -100 L 20 -20 L 100 -20"
          stroke="#00d9ff"
          strokeWidth="2"
          fill="none"
          transform="translate(0, 100%)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        />

        {/* Bottom Right */}
        <motion.path
          d="M -20 -20 L -100 -20 L -100 -100"
          stroke="#00d9ff"
          strokeWidth="2"
          fill="none"
          transform="translate(100%, 100%)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />

        {/* Scanning line */}
        <motion.line
          x1="0"
          y1="0"
          x2="100%"
          y2="0"
          stroke="#00ff41"
          strokeWidth="1"
          opacity="0.3"
          animate={{ y1: [0, '100%'], y2: [0, '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </svg>

      {/* Bottom HUD */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
        {/* Coordinates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/60 backdrop-blur-sm border border-[#ff2a6d]/30 rounded-lg p-3 font-mono text-xs"
        >
          <div className="text-[#ff2a6d]/60 space-y-1">
            <div>LAT: 19.0760° N</div>
            <div>LON: 72.8777° E</div>
            <div>ALT: CLASSIFIED</div>
          </div>
        </motion.div>

        {/* Network Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/60 backdrop-blur-sm border border-[#00ff41]/30 rounded-lg p-3 font-mono text-xs flex items-center gap-3"
        >
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="w-1 bg-[#00ff41]"
                style={{ height: `${i * 4}px` }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </div>
          <span className="text-[#00ff41]">SIGNAL: STRONG</span>
        </motion.div>
      </div>
    </div>
  );
}
