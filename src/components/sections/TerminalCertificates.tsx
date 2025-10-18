'use client';

import { motion } from 'framer-motion';
import { certificates } from '@/data/certificates';
import { FileText, ExternalLink, Calendar, Award, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export function TerminalCertificates() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section id="certificates" className="py-32 relative">
      {/* Scanline overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_50%,rgba(0,255,65,0.03)_50%)] bg-[length:100%_4px] pointer-events-none animate-scanline" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          {/* Terminal Header */}
          <div className="mb-12">
            <div className="border-2 border-[#00ff41] rounded-lg overflow-hidden bg-black/90 backdrop-blur-sm">
              {/* Terminal top bar */}
              <div className="flex items-center gap-2 px-4 py-2 bg-[#00ff41]/10 border-b border-[#00ff41]/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff2a6d]" />
                  <div className="w-3 h-3 rounded-full bg-[#00d9ff]" />
                  <div className="w-3 h-3 rounded-full bg-[#00ff41]" />
                </div>
                <span className="text-xs font-mono text-[#00ff41] ml-2">CERTIFICATES.SYS</span>
              </div>

              {/* Terminal content */}
              <div className="p-8">
                <div className="flex items-start gap-2 mb-6">
                  <span className="text-[#00ff41] font-mono text-sm">{'>'}</span>
                  <div className="flex-1">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#00ff41] mb-2 glitch-text">
                      CERTIFICATIONS & INTERNSHIPS
                    </h2>
                    <p className="text-[#00d9ff] font-mono text-sm">
                      $ ls -la /credentials/achievements/*
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Found {certificates.length} verified credentials
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* File tree view */}
          <div className="grid gap-4">
            {certificates.map((cert, index) => {
              const isSelected = selectedId === cert.id;

              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Corner brackets */}
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-[#00ff41] opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-[#00ff41] opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 border-l-2 border-b-2 border-[#00ff41] opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-[#00ff41] opacity-50 group-hover:opacity-100 transition-opacity" />

                  <div
                    className={`
                      relative border-2 rounded-lg p-6 cursor-pointer transition-all duration-300
                      ${isSelected
                        ? 'border-[#00ff41] bg-[#00ff41]/5 shadow-[0_0_20px_rgba(0,255,65,0.3)]'
                        : 'border-[#00ff41]/30 bg-black/50 hover:border-[#00ff41]/60 hover:bg-[#00ff41]/5'
                      }
                    `}
                    onClick={() => setSelectedId(isSelected ? null : cert.id)}
                  >
                    {/* File entry */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Icon and file info */}
                      <div className="flex items-start gap-4 flex-1">
                        {/* Tree structure */}
                        <div className="flex items-start gap-2 pt-1">
                          <span className="text-[#00ff41]/50 font-mono text-sm">
                            {index === certificates.length - 1 ? '└──' : '├──'}
                          </span>
                          <FileText className="w-5 h-5 text-[#00d9ff] mt-0.5" />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="text-xl font-heading font-bold text-[#00ff41] group-hover:text-[#00d9ff] transition-colors">
                              {cert.title}
                            </h3>
                            <span className="text-xs font-mono text-gray-500 shrink-0">
                              {cert.date}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                            <span className="flex items-center gap-1">
                              <Award className="w-4 h-4" />
                              {cert.issuer}
                            </span>
                          </div>

                          {/* Tags */}
                          {cert.tags && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {cert.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 text-xs font-mono bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/30 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Description - shown when selected */}
                          <motion.div
                            initial={false}
                            animate={{ height: isSelected ? 'auto' : 0, opacity: isSelected ? 1 : 0 }}
                            className="overflow-hidden"
                          >
                            {cert.description && (
                              <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                                {cert.description}
                              </p>
                            )}
                          </motion.div>
                        </div>
                      </div>

                      {/* View certificate button */}
                      {cert.pdf && (
                        <motion.a
                          href={cert.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05, x: 3 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-4 py-2 bg-[#00d9ff]/10 text-[#00d9ff] border border-[#00d9ff]/30 rounded hover:bg-[#00d9ff]/20 transition-colors font-mono text-sm group/link shrink-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4 group-hover/link:rotate-12 transition-transform" />
                          <span>VIEW</span>
                        </motion.a>
                      )}
                    </div>

                    {/* Scanline effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_50%,rgba(0,255,65,0.05)_50%)] bg-[length:100%_2px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Terminal footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 border-2 border-[#00ff41]/30 rounded-lg p-4 bg-black/50 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 text-sm font-mono text-gray-400">
              <ChevronRight className="w-4 h-4 text-[#00ff41]" />
              <span>Total credentials verified: <span className="text-[#00ff41]">{certificates.length}</span></span>
              <span className="ml-auto flex items-center gap-1">
                <span className="w-2 h-2 bg-[#00ff41] rounded-full animate-pulse" />
                <span className="text-[#00ff41]">SYSTEM ONLINE</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
