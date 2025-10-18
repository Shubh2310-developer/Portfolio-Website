'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, Terminal, Code2 } from 'lucide-react';

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/Shubh2310-developer',
    ariaLabel: 'Visit my GitHub profile',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/shubh-shah-4908a5258/',
    ariaLabel: 'Connect with me on LinkedIn',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    href: 'https://www.instagram.com/shubhnotsopvt/?next=%2F',
    ariaLabel: 'Follow me on Instagram',
  },
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:shubhshahwork@gmail.com',
    ariaLabel: 'Send me an email',
  },
];

const navigation = [
  { name: 'HOME', href: '#home', cmd: 'cd ~/' },
  { name: 'ABOUT', href: '#about', cmd: 'cat about.txt' },
  { name: 'SKILLS', href: '#skills', cmd: 'ls skills/' },
  { name: 'PROJECTS', href: '#projects', cmd: 'git log' },
  { name: 'CERTS', href: '#certificates', cmd: 'ls certs/' },
  { name: 'CONTACT', href: '#contact', cmd: 'mail -s' },
];

export default function CyberFooter() {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative border-t-2 border-[#00ff41]/30 bg-black">
      {/* Scanline overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_50%,rgba(0,255,65,0.03)_50%)] bg-[length:100%_4px] pointer-events-none animate-scanline" />

      <div className="relative mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Terminal-style header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 pb-8 border-b border-[#00ff41]/20"
        >
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="w-5 h-5 text-[#00ff41]" />
            <span className="font-mono text-sm text-[#00ff41]">SYSTEM.FOOTER</span>
          </div>

          {/* Navigation commands */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {navigation.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                whileHover={{ scale: 1.05, x: 2 }}
                whileTap={{ scale: 0.95 }}
                className="group text-left"
              >
                <div className="font-mono text-xs text-gray-500 mb-1">$ {item.cmd}</div>
                <div className="font-mono text-sm text-[#00d9ff] group-hover:text-[#00ff41] transition-colors">
                  {item.name}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="mb-4">
              <h3 className="text-2xl font-heading font-bold text-[#00ff41] mb-2 glitch-text">
                SHUBH.DEV
              </h3>
              <div className="font-mono text-xs text-gray-400 space-y-1">
                <div>{'>'} DATA ANALYST | AI & DS ENGINEER</div>
                <div>{'>'} TRANSFORMING DATA INTO INSIGHTS</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="w-2 h-2 bg-[#00ff41] rounded-full animate-pulse" />
                  <span className="text-[#00ff41]">STATUS: ONLINE</span>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="font-mono text-xs text-gray-500">
              <div>© 2024 SHUBH SHAH</div>
              <div className="flex items-center gap-2 mt-1">
                <Code2 className="w-3 h-3" />
                <span>BUILT WITH PRECISION & INNOVATION</span>
              </div>
            </div>
          </motion.div>

          {/* Right side - Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-start md:items-end"
          >
            <div className="mb-4">
              <div className="font-mono text-xs text-gray-500 mb-3">$ ls /social/*</div>
              <div className="flex gap-3">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.ariaLabel}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="group relative"
                    >
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-[#00ff41] rounded-lg blur-md opacity-0 group-hover:opacity-50 transition-opacity" />

                      {/* Icon container */}
                      <div className="relative w-12 h-12 rounded-lg border-2 border-[#00ff41]/30 bg-black/50 flex items-center justify-center group-hover:border-[#00ff41] group-hover:bg-[#00ff41]/10 transition-all">
                        <Icon className="w-5 h-5 text-[#00d9ff] group-hover:text-[#00ff41] transition-colors" />
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* System info */}
            <div className="font-mono text-xs text-gray-500 text-left md:text-right space-y-1">
              <div>UPTIME: {new Date().getFullYear() - 2023} YEARS</div>
              <div>FRAMEWORK: NEXT.JS 14</div>
              <div>THEME: CYBERPUNK MATRIX</div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 pt-8 border-t border-[#00ff41]/20"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-mono text-xs text-gray-500">
              <span className="text-[#00ff41]">{'>'}</span> INITIALIZED AT {new Date().toISOString().split('T')[0]}
            </div>

            <div className="flex items-center gap-4 font-mono text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-[#00ff41] rounded-full" />
                <span>SYS</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-[#00d9ff] rounded-full" />
                <span>NET</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-[#ff2a6d] rounded-full" />
                <span>AI</span>
              </div>
            </div>

            <div className="font-mono text-xs text-gray-500">
              v2.0.0 | BUILD_20241018
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom glow line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#00ff41] to-transparent opacity-50" />
    </footer>
  );
}
