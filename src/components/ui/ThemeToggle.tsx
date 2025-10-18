'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Zap } from 'lucide-react';
import { useTheme } from 'next-themes';

type Theme = 'dark' | 'light' | 'neural-flux';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>('dark');
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (theme) {
      setCurrentTheme(theme as Theme);
    }
  }, [theme]);

  const cycleTheme = () => {
    const themes: Theme[] = ['dark', 'neural-flux', 'light'];
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];

    setCurrentTheme(nextTheme);
    setTheme(nextTheme);

    // Apply neural-flux class to html element
    if (nextTheme === 'neural-flux') {
      document.documentElement.classList.add('neural-flux');
    } else {
      document.documentElement.classList.remove('neural-flux');
    }
  };

  if (!mounted) {
    return (
      <div className="w-12 h-12 rounded-full glass border border-border/50" />
    );
  }

  const themeConfig = {
    dark: {
      icon: Moon,
      label: 'Dark Mode',
      color: 'text-primary',
      gradient: 'from-primary to-accent',
    },
    'neural-flux': {
      icon: Zap,
      label: 'Neural Flux',
      color: 'text-purple-400',
      gradient: 'from-purple-500 to-accent',
    },
    light: {
      icon: Sun,
      label: 'Light Mode',
      color: 'text-yellow-400',
      gradient: 'from-yellow-400 to-orange-400',
    },
  };

  const config = themeConfig[currentTheme];
  const Icon = config.icon;

  return (
    <motion.button
      onClick={cycleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 right-8 z-50 group"
      aria-label="Toggle theme"
    >
      {/* Glow effect */}
      <motion.div
        className={`absolute inset-0 rounded-full bg-gradient-to-r ${config.gradient} opacity-0 group-hover:opacity-50 blur-xl transition-opacity`}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Button container */}
      <div className="relative w-14 h-14 rounded-full glass border border-border/50 flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-20`}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Icon */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTheme}
            initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
            className={`relative z-10 ${config.color}`}
          >
            <Icon className="w-6 h-6" />
          </motion.div>
        </AnimatePresence>

        {/* Pulse rings */}
        {currentTheme === 'neural-flux' && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border-2 border-purple-500"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 1.5 + i * 0.3, opacity: 0 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: 'easeOut',
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="absolute right-full mr-4 top-1/2 -translate-y-1/2 pointer-events-none"
      >
        <div className="glass rounded-lg px-3 py-2 border border-border/50 whitespace-nowrap">
          <span className="text-sm font-medium text-foreground">
            {config.label}
          </span>
        </div>
      </motion.div>
    </motion.button>
  );
}
