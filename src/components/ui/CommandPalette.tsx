'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from 'cmdk';
import {
  Home,
  User,
  Code2,
  Briefcase,
  Award,
  Mail,
  Github,
  Linkedin,
  FileText,
} from 'lucide-react';

interface CommandAction {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  action: () => void;
  keywords?: string[];
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setOpen(false);
    }
  };

  const commands: CommandAction[] = [
    {
      id: 'home',
      label: '/ HOME',
      icon: Home,
      action: () => scrollToSection('home'),
      keywords: ['hero', 'top', 'start'],
    },
    {
      id: 'about',
      label: '/ ABOUT',
      icon: User,
      action: () => scrollToSection('about'),
      keywords: ['profile', 'bio', 'me'],
    },
    {
      id: 'skills',
      label: '/ SKILLS',
      icon: Code2,
      action: () => scrollToSection('skills'),
      keywords: ['expertise', 'technologies', 'abilities'],
    },
    {
      id: 'projects',
      label: '/ PROJECTS',
      icon: Briefcase,
      action: () => scrollToSection('projects'),
      keywords: ['work', 'portfolio', 'showcase'],
    },
    {
      id: 'certificates',
      label: '/ CERTIFICATES',
      icon: Award,
      action: () => scrollToSection('certificates'),
      keywords: ['credentials', 'certifications', 'internships'],
    },
    {
      id: 'contact',
      label: '/ CONTACT',
      icon: Mail,
      action: () => scrollToSection('contact'),
      keywords: ['email', 'message', 'reach'],
    },
    {
      id: 'github',
      label: '>> GITHUB',
      icon: Github,
      action: () => window.open('https://github.com/Shubh2310-developer', '_blank'),
      keywords: ['code', 'repositories', 'projects'],
    },
    {
      id: 'linkedin',
      label: '>> LINKEDIN',
      icon: Linkedin,
      action: () => window.open('https://www.linkedin.com/in/shubh-shah-91a0702b6/', '_blank'),
      keywords: ['professional', 'network', 'connect'],
    },
    {
      id: 'resume',
      label: '>> DOWNLOAD RESUME',
      icon: FileText,
      action: () => window.open('/ShubhShahRes.pdf', '_blank'),
      keywords: ['cv', 'download', 'pdf'],
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed left-[50%] top-[30%] z-[101] w-full max-w-2xl translate-x-[-50%] translate-y-[-50%]"
          >
            <div className="rounded-2xl border-2 border-[#00ff41]/50 shadow-[0_0_30px_rgba(0,255,65,0.3)] overflow-hidden bg-black/95 backdrop-blur-sm">
              {/* Scanline effect */}
              <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_50%,rgba(0,255,65,0.05)_50%)] bg-[length:100%_2px] pointer-events-none animate-scanline" />

              <Command className="relative bg-transparent">
                <div className="flex items-center border-b-2 border-[#00ff41]/30 px-4 bg-[#00ff41]/5">
                  <span className="text-[#00ff41] font-mono mr-2">{'>'}</span>
                  <CommandInput
                    placeholder="Enter command..."
                    className="flex h-14 w-full rounded-md bg-transparent py-3 text-base outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50 border-0 focus:ring-0 font-mono text-[#00ff41]"
                  />
                </div>

                <CommandList className="max-h-[400px] overflow-y-auto p-2">
                  <CommandEmpty className="py-6 text-center text-sm font-mono text-gray-500">
                    ERROR: No results found
                  </CommandEmpty>

                  <CommandGroup heading="NAVIGATION" className="mb-2">
                    {commands.slice(0, 6).map((command) => {
                      const Icon = command.icon;
                      return (
                        <CommandItem
                          key={command.id}
                          onSelect={command.action}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors hover:bg-[#00ff41]/10 aria-selected:bg-[#00ff41]/10 border border-transparent hover:border-[#00ff41]/30"
                        >
                          <Icon className="w-4 h-4 text-[#00d9ff]" />
                          <span className="font-mono text-[#00ff41]">{command.label}</span>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>

                  <CommandGroup heading="EXTERNAL LINKS" className="mb-2">
                    {commands.slice(6).map((command) => {
                      const Icon = command.icon;
                      return (
                        <CommandItem
                          key={command.id}
                          onSelect={command.action}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors hover:bg-[#00d9ff]/10 aria-selected:bg-[#00d9ff]/10 border border-transparent hover:border-[#00d9ff]/30"
                        >
                          <Icon className="w-4 h-4 text-[#ff2a6d]" />
                          <span className="font-mono text-[#00d9ff]">{command.label}</span>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>

                {/* Footer hint */}
                <div className="border-t-2 border-[#00ff41]/30 px-4 py-3 text-xs font-mono text-gray-500 flex items-center gap-4 bg-[#00ff41]/5">
                  <div className="flex items-center gap-1">
                    <kbd className="px-2 py-1 rounded border border-[#00ff41]/30 text-[#00ff41] font-mono text-xs bg-black/50">
                      ↑↓
                    </kbd>
                    <span>navigate</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-2 py-1 rounded border border-[#00ff41]/30 text-[#00ff41] font-mono text-xs bg-black/50">
                      ↵
                    </kbd>
                    <span>select</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-2 py-1 rounded border border-[#00ff41]/30 text-[#00ff41] font-mono text-xs bg-black/50">
                      esc
                    </kbd>
                    <span>close</span>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <span className="w-2 h-2 bg-[#00ff41] rounded-full animate-pulse" />
                    <span className="text-[#00ff41]">ONLINE</span>
                  </div>
                </div>
              </Command>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
