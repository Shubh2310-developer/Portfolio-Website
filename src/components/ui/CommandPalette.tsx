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
      label: 'Home',
      icon: Home,
      action: () => scrollToSection('home'),
      keywords: ['hero', 'top', 'start'],
    },
    {
      id: 'about',
      label: 'About',
      icon: User,
      action: () => scrollToSection('about'),
      keywords: ['profile', 'bio', 'me'],
    },
    {
      id: 'skills',
      label: 'Skills',
      icon: Code2,
      action: () => scrollToSection('skills'),
      keywords: ['expertise', 'technologies', 'abilities'],
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: Briefcase,
      action: () => scrollToSection('projects'),
      keywords: ['work', 'portfolio', 'showcase'],
    },
    {
      id: 'certificates',
      label: 'Certificates',
      icon: Award,
      action: () => scrollToSection('certificates'),
      keywords: ['credentials', 'certifications', 'internships'],
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: Mail,
      action: () => scrollToSection('contact'),
      keywords: ['email', 'message', 'reach'],
    },
    {
      id: 'github',
      label: 'GitHub Profile',
      icon: Github,
      action: () => window.open('https://github.com/Shubh2310-developer', '_blank'),
      keywords: ['code', 'repositories', 'projects'],
    },
    {
      id: 'linkedin',
      label: 'LinkedIn Profile',
      icon: Linkedin,
      action: () => window.open('https://www.linkedin.com/in/shubh-shah-91a0702b6/', '_blank'),
      keywords: ['professional', 'network', 'connect'],
    },
    {
      id: 'resume',
      label: 'Download Resume',
      icon: FileText,
      action: () => window.open('/resume/ShubhShahResume (1).pdf', '_blank'),
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
            <div className="glass rounded-2xl border border-border/50 shadow-2xl overflow-hidden">
              {/* Holographic glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 pointer-events-none" />

              <Command className="relative bg-transparent">
                <div className="flex items-center border-b border-border/50 px-4">
                  <Command className="w-5 h-5 text-muted-foreground mr-2" />
                  <CommandInput
                    placeholder="Type a command or search..."
                    className="flex h-14 w-full rounded-md bg-transparent py-3 text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-0 focus:ring-0"
                  />
                </div>

                <CommandList className="max-h-[400px] overflow-y-auto p-2">
                  <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
                    No results found.
                  </CommandEmpty>

                  <CommandGroup heading="Navigation" className="mb-2">
                    {commands.slice(0, 6).map((command) => {
                      const Icon = command.icon;
                      return (
                        <CommandItem
                          key={command.id}
                          onSelect={command.action}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors hover:bg-accent/10 aria-selected:bg-accent/10"
                        >
                          <Icon className="w-4 h-4 text-primary" />
                          <span className="font-medium">{command.label}</span>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>

                  <CommandGroup heading="Links" className="mb-2">
                    {commands.slice(6).map((command) => {
                      const Icon = command.icon;
                      return (
                        <CommandItem
                          key={command.id}
                          onSelect={command.action}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors hover:bg-accent/10 aria-selected:bg-accent/10"
                        >
                          <Icon className="w-4 h-4 text-accent" />
                          <span className="font-medium">{command.label}</span>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>

                {/* Footer hint */}
                <div className="border-t border-border/50 px-4 py-3 text-xs text-muted-foreground flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <kbd className="px-2 py-1 rounded bg-muted text-muted-foreground font-mono text-xs">
                      ↑↓
                    </kbd>
                    <span>navigate</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-2 py-1 rounded bg-muted text-muted-foreground font-mono text-xs">
                      ↵
                    </kbd>
                    <span>select</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-2 py-1 rounded bg-muted text-muted-foreground font-mono text-xs">
                      esc
                    </kbd>
                    <span>close</span>
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
