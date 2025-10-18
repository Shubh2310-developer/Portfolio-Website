'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X, Terminal, Zap } from 'lucide-react';

const navigation = [
  { name: 'HOME', href: '#home', icon: '>' },
  { name: 'SYSTEM', href: '#about', icon: '//' },
  { name: 'SKILLS', href: '#skills', icon: '$' },
  { name: 'PROJECTS', href: '#projects', icon: '[]' },
  { name: 'CERTS', href: '#certificates', icon: '{}' },
  { name: 'CONTACT', href: '#contact', icon: '>_' },
];

export default function CyberHeader() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Random glitch effect
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 100);
    }, 5000);

    return () => clearInterval(glitchInterval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation.map((item) => item.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) {
    return (
      <header className="fixed top-0 z-50 w-full bg-black/90 backdrop-blur-sm border-b border-[#00ff41]/30">
        <nav className="container mx-auto px-4 h-16" />
      </header>
    );
  }

  return (
    <>
      {/* Glitch overlay */}
      {glitch && (
        <div className="fixed inset-0 z-[60] pointer-events-none bg-[#00ff41]/10 mix-blend-screen" />
      )}

      <header className="fixed top-0 z-50 w-full bg-black/90 backdrop-blur-sm border-b border-[#00ff41]/30">
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/">
              <motion.div
                className="flex items-center gap-2 group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Terminal className="w-6 h-6 text-[#00ff41]" />
                <span className={`text-xl font-heading font-bold text-[#00ff41] ${glitch ? 'animate-glitch' : ''}`}>
                  SHUBH<span className="text-[#00d9ff]">.DEV</span>
                </span>
                <span className="text-[#00ff41] text-xs animate-terminal-blink">_</span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <Link key={item.name} href={item.href}>
                    <motion.div
                      className="relative px-4 py-2 font-mono text-sm transition-colors group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-[#00ff41]/40 mr-2">{item.icon}</span>
                      <span className={`${isActive ? 'text-[#00ff41]' : 'text-[#00ff41]/60 group-hover:text-[#00ff41]'}`}>
                        {item.name}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00ff41]"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}

              {/* System Status */}
              <div className="ml-4 px-3 py-1 border border-[#00ff41]/30 rounded font-mono text-xs text-[#00ff41] flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-[#00ff41]"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                ONLINE
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-[#00ff41] border border-[#00ff41]/30 rounded"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-[#00ff41]/30"
            >
              <div className="py-4 space-y-2">
                {navigation.map((item) => {
                  const isActive = activeSection === item.href.replace('#', '');
                  return (
                    <Link key={item.name} href={item.href}>
                      <motion.div
                        className={`block px-4 py-3 font-mono text-sm ${
                          isActive
                            ? 'bg-[#00ff41]/10 text-[#00ff41] border-l-2 border-[#00ff41]'
                            : 'text-[#00ff41]/60 hover:text-[#00ff41] hover:bg-[#00ff41]/5'
                        }`}
                        onClick={() => setIsOpen(false)}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="mr-2">{item.icon}</span>
                        {item.name}
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </nav>

        {/* Scanline effect */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#00ff41]/5 via-transparent to-transparent animate-scanline" />
      </header>
    </>
  );
}
