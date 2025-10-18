'use client';

import { motion } from 'framer-motion';
import { Download, Database, Cpu, Zap, Code2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const stats = [
  { label: 'PROJECTS_COMPLETED', value: '10+', icon: Database },
  { label: 'ML_MODELS_BUILT', value: '15+', icon: Cpu },
  { label: 'CODE_COMMITS', value: '1000+', icon: Code2 },
  { label: 'CGPA', value: '7.5', icon: Zap },
];

// Static binary pattern to avoid hydration mismatch
const BINARY_PATTERN = '01010101110010011101010011010101110010011101';

export function TerminalAbout() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Binary background */}
      {mounted && (
        <div className="absolute inset-0 opacity-5 font-mono text-[10px] text-[#00ff41] overflow-hidden select-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i}>
              {Array.from({ length: 200 }).map(() => (Math.random() > 0.5 ? '1' : '0')).join('')}
            </div>
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Terminal Command */}
          <div className="mb-12">
            <div className="font-mono text-[#00ff41]/60 text-sm mb-4">
              <span className="text-[#00d9ff]">$</span> cat /home/ghost/about.sys
            </div>
            <h2 className="text-5xl font-heading font-bold text-[#00ff41]">
              SYSTEM_INFO
              <span className="text-[#00d9ff] ml-3">&lt;/&gt;</span>
            </h2>
            <div className="mt-2 h-px bg-gradient-to-r from-[#00ff41] via-[#00d9ff] to-transparent" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Main terminal */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="border-2 border-[#00ff41]/30 rounded-lg overflow-hidden bg-black/80 backdrop-blur-sm"
            >
              {/* Terminal header */}
              <div className="bg-[#00ff41]/10 border-b border-[#00ff41]/30 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff2a6d]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffaa00]" />
                  <div className="w-3 h-3 rounded-full bg-[#00ff41]" />
                </div>
                <span className="font-mono text-xs text-[#00ff41]/60">~/about.txt</span>
              </div>

              {/* Terminal content */}
              <div className="p-6 font-mono text-sm space-y-4">
                <div>
                  <span className="text-[#00d9ff]">NAME:</span>
                  <span className="text-[#00ff41] ml-2">Shubh Shah</span>
                </div>

                <div>
                  <span className="text-[#00d9ff]">ROLE:</span>
                  <span className="text-[#00ff41] ml-2">Data Analyst | AI & DS Engineer</span>
                </div>

                <div>
                  <span className="text-[#00d9ff]">PROFILE:</span>
                  <div className="text-[#00ff41]/80 ml-2 mt-1 leading-relaxed">
                    Detail-oriented Data Analyst with a B.Tech in AI & Data Science and Google
                    certification, skilled in Python, ML, and data-driven solutions.
                  </div>
                </div>

                <div>
                  <span className="text-[#00d9ff]">EDUCATION:</span>
                  <div className="text-[#00ff41]/80 ml-2 mt-1">
                    <div>B.E. in AI & Data Science</div>
                    <div className="text-[#00ff41]/60 text-xs">Shah And Anchor Kutcchi Engineering College</div>
                    <div className="text-[#00ff41]/60 text-xs">2022 - 2026 | CGPA: 7.5</div>
                  </div>
                </div>

                <div>
                  <span className="text-[#00d9ff]">TECH_STACK:</span>
                  <div className="text-[#00ff41]/80 ml-2 mt-1">
                    Python • SQL • ML • NLP • AWS • PostgreSQL • MongoDB
                  </div>
                </div>

                <div className="pt-4 border-t border-[#00ff41]/20">
                  <motion.a
                    href="/ShubhShahRes.pdf"
                    target="_blank"
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-[#00ff41] text-[#00ff41] rounded hover:bg-[#00ff41]/10 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span className="text-sm">DOWNLOAD_RESUME.PDF</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Stats panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="border-2 border-[#00ff41]/30 rounded-lg p-4 bg-black/60 backdrop-blur-sm relative overflow-hidden group cursor-pointer"
                  >
                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00ff41]/0 via-[#00ff41]/10 to-[#00ff41]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                    <div className="relative flex items-center justify-between">
                      <div>
                        <div className="font-mono text-xs text-[#00ff41]/60 mb-1">
                          {stat.label}
                        </div>
                        <div className="text-3xl font-heading font-bold text-[#00ff41]">
                          {stat.value}
                        </div>
                      </div>
                      <Icon className="w-10 h-10 text-[#00ff41]/30" />
                    </div>

                    {/* Corner accents */}
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00d9ff]" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00d9ff]" />
                  </motion.div>
                );
              })}

              {/* System status */}
              <div className="border-2 border-[#00d9ff]/30 rounded-lg p-4 bg-black/60 backdrop-blur-sm">
                <div className="font-mono text-xs text-[#00d9ff]/60 mb-3">SYSTEM_STATUS</div>
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#00ff41]/60">AVAILABILITY:</span>
                    <span className="text-[#00ff41]">ONLINE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#00ff41]/60">RESPONSE_TIME:</span>
                    <span className="text-[#00ff41]">&lt;24H</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#00ff41]/60">COLLABORATION:</span>
                    <span className="text-[#00ff41]">OPEN</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#00ff41]/60">STATUS:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse" />
                      <span className="text-[#00ff41]">READY</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
