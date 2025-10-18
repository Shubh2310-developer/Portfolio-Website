'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Wifi, Power } from 'lucide-react';

export function TerminalHero() {
  const [displayedText, setDisplayedText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const terminalLines = [
    { command: '$ ssh shubh@data-analyst.dev', delay: 0 },
    { command: 'Connecting to remote host...', delay: 800 },
    { command: '█████████████████████ 100%', delay: 1600 },
    { command: 'Connection established.', delay: 2200 },
    { command: '', delay: 2600 },
    { command: '$ whoami', delay: 3000 },
    { command: '> DATA ANALYST | AI & DS ENGINEER | ML SPECIALIST', delay: 3800 },
    { command: '', delay: 4200 },
    { command: '$ cat profile.txt', delay: 4600 },
    { command: '> Detail-oriented Data Analyst with B.Tech in AI & Data Science', delay: 5200 },
    { command: '> Skilled in Python, ML, and data-driven solutions', delay: 5600 },
    { command: '> Google certified | Building intelligent systems', delay: 6000 },
    { command: '', delay: 6400 },
    { command: '$ ls skills/', delay: 6800 },
    { command: 'python/  sql/  machine-learning/  nlp/', delay: 7400 },
    { command: 'aws/  postgresql/  mongodb/  data-viz/', delay: 7600 },
    { command: '', delay: 8000 },
    { command: '$ █', delay: 8200 },
  ];

  useEffect(() => {
    if (currentLineIndex >= terminalLines.length) return;

    const currentLine = terminalLines[currentLineIndex];
    let charIndex = 0;

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (charIndex < currentLine.command.length) {
          setDisplayedText((prev) => prev + currentLine.command[charIndex]);
          charIndex++;
        } else {
          clearInterval(interval);
          setDisplayedText((prev) => prev + '\n');
          setCurrentLineIndex((prev) => prev + 1);
        }
      }, 30);

      return () => clearInterval(interval);
    }, currentLineIndex === 0 ? 0 : 100);

    return () => clearTimeout(timeout);
  }, [currentLineIndex]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative px-4 py-20">
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff41]/5 to-transparent animate-scanline" />
      </div>

      {/* Terminal Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl relative"
      >
        {/* Terminal Header */}
        <div className="bg-[#1a1a1a] border border-[#00ff41]/30 rounded-t-lg p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff2a6d]" />
              <div className="w-3 h-3 rounded-full bg-[#ffaa00]" />
              <div className="w-3 h-3 rounded-full bg-[#00ff41]" />
            </div>
            <div className="flex items-center gap-2 text-[#00ff41] text-sm font-mono">
              <Terminal className="w-4 h-4" />
              <span>shubh@data-analyst: ~</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Wifi className="w-4 h-4 text-[#00ff41]" />
            <Power className="w-4 h-4 text-[#00ff41]" />
          </div>
        </div>

        {/* Terminal Body */}
        <div className="bg-black/95 border-x border-b border-[#00ff41]/30 rounded-b-lg p-6 min-h-[500px] font-mono text-sm overflow-hidden relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-[#00ff41]/5 blur-xl pointer-events-none" />

          {/* Terminal Output */}
          <div className="relative z-10">
            <pre className="text-[#00ff41] whitespace-pre-wrap leading-relaxed">
              {displayedText}
              {showCursor && <span className="inline-block w-2 h-4 bg-[#00ff41] ml-1 animate-terminal-blink" />}
            </pre>
          </div>

          {/* Glitch overlay */}
          <motion.div
            className="absolute inset-0 bg-[#00ff41]/10 pointer-events-none"
            animate={{
              opacity: [0, 0.1, 0],
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              repeatDelay: 5,
            }}
          />
        </div>

        {/* Bottom status bar */}
        <div className="mt-4 flex justify-between items-center text-xs font-mono text-[#00ff41]/60">
          <div className="flex gap-4">
            <span>STATUS: ONLINE</span>
            <span>|</span>
            <span>SYSTEM: DATA_ANALYST_V2.0</span>
          </div>
          <div>
            <span className="animate-pulse">●</span> LIVE
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 8 }}
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center"
        >
          <div className="text-[#00ff41] text-xs font-mono mb-2">SCROLL TO EXPLORE</div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[#00ff41] text-2xl"
          >
            ▼
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
