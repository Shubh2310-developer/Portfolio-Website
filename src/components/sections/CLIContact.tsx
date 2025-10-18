'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

export function CLIContact() {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState<string[]>([
    'ghost@ai-engineer:~$ contact --help',
    '',
    'CONTACT FORM - Command Line Interface',
    '====================================',
    '',
    'Available commands:',
    '  set name <your-name>       Set your name',
    '  set email <your-email>     Set your email',
    '  set message <your-msg>     Set your message',
    '  send                       Send the message',
    '  clear                      Clear terminal',
    '',
    'Example:',
    '  $ set name John Doe',
    '  $ set email john@example.com',
    '  $ set message "Hello, I would like to collaborate"',
    '  $ send',
    '',
  ]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSending, setIsSending] = useState(false);

  const handleCommand = async (cmd: string) => {
    const parts = cmd.trim().split(' ');
    const action = parts[0];
    const key = parts[1];
    const value = parts.slice(2).join(' ').replace(/['"]/g, '');

    setOutput((prev) => [...prev, `$ ${cmd}`]);

    if (action === 'set') {
      if (key === 'name') {
        setFormData((prev) => ({ ...prev, name: value }));
        setOutput((prev) => [...prev, `✓ Name set to: ${value}`, '']);
      } else if (key === 'email') {
        setFormData((prev) => ({ ...prev, email: value }));
        setOutput((prev) => [...prev, `✓ Email set to: ${value}`, '']);
      } else if (key === 'message') {
        setFormData((prev) => ({ ...prev, message: value }));
        setOutput((prev) => [...prev, `✓ Message set to: ${value}`, '']);
      } else {
        setOutput((prev) => [...prev, `✗ Unknown key: ${key}`, '']);
      }
    } else if (action === 'send') {
      if (!formData.name || !formData.email || !formData.message) {
        setOutput((prev) => [...prev, '✗ Error: Please set all fields (name, email, message)', '']);
        return;
      }

      setIsSending(true);
      setOutput((prev) => [...prev, 'Sending message...', '']);

      try {
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          formData,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        );

        setOutput((prev) => [
          ...prev,
          '✓ Message sent successfully!',
          '✓ Response time: <24 hours',
          '',
        ]);
        setFormData({ name: '', email: '', message: '' });
      } catch (error) {
        setOutput((prev) => [...prev, '✗ Error sending message. Please try again.', '']);
      } finally {
        setIsSending(false);
      }
    } else if (action === 'clear') {
      setOutput(['ghost@ai-engineer:~$']);
    } else if (action === 'help' || cmd === '') {
      // Already shown in initial state
    } else {
      setOutput((prev) => [...prev, `✗ Command not found: ${action}`, 'Type "contact --help" for available commands', '']);
    }

    setCommand('');
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Binary background */}
      <div className="absolute inset-0 opacity-5 font-mono text-[10px] text-[#00ff41] overflow-hidden select-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i}>
            {Array.from({ length: 200 }).map(() => (Math.random() > 0.5 ? '1' : '0')).join('')}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block">
              <div className="font-mono text-[#00ff41]/60 text-sm mb-2">
                <span className="text-[#00d9ff]">$</span> init --contact-protocol
              </div>
              <h2 className="text-5xl font-heading font-bold text-[#00ff41] mb-4">
                CONTACT_INTERFACE
                <span className="text-[#00d9ff] ml-3">&gt;_</span>
              </h2>
              <div className="h-px bg-gradient-to-r from-transparent via-[#00ff41] to-transparent" />
            </div>
            <p className="text-[#00ff41]/70 mt-6 font-mono">
              Command-line message system • Type commands below
            </p>
          </div>

          {/* Terminal Window */}
          <div className="border-2 border-[#00ff41]/30 rounded-lg overflow-hidden bg-black/90 backdrop-blur-sm">
            {/* Terminal Header */}
            <div className="bg-[#00ff41]/10 border-b border-[#00ff41]/30 px-4 py-2 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff2a6d]" />
                <div className="w-3 h-3 rounded-full bg-[#ffaa00]" />
                <div className="w-3 h-3 rounded-full bg-[#00ff41]" />
              </div>
              <span className="font-mono text-xs text-[#00ff41]/60">contact@ghost.terminal</span>
            </div>

            {/* Terminal Output */}
            <div className="p-6 font-mono text-sm h-96 overflow-y-auto custom-scrollbar">
              {output.map((line, index) => (
                <div key={index} className="text-[#00ff41]/90 whitespace-pre-wrap">
                  {line}
                </div>
              ))}

              {/* Current values display */}
              {(formData.name || formData.email || formData.message) && (
                <div className="mt-4 text-[#00ff41]/60">
                  <div>Current values:</div>
                  {formData.name && <div>  name: {formData.name}</div>}
                  {formData.email && <div>  email: {formData.email}</div>}
                  {formData.message && <div>  message: {formData.message}</div>}
                  <div className="mt-2" />
                </div>
              )}
            </div>

            {/* Command Input */}
            <div className="border-t border-[#00ff41]/30 p-4 bg-black/50">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (command.trim() && !isSending) {
                    handleCommand(command);
                  }
                }}
                className="flex items-center gap-2"
              >
                <span className="text-[#00d9ff] font-mono">$</span>
                <input
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  disabled={isSending}
                  className="flex-1 bg-transparent border-none outline-none text-[#00ff41] font-mono text-sm placeholder:text-[#00ff41]/30"
                  placeholder="Type command here (e.g., set name John Doe)"
                  autoFocus
                />
                <span className="w-2 h-4 bg-[#00ff41] animate-terminal-blink" />
              </form>
            </div>
          </div>

          {/* Quick links */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 font-mono text-sm">
            <motion.button
              onClick={() => handleCommand('set name ')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 border border-[#00ff41]/30 text-[#00ff41]/60 rounded hover:text-[#00ff41] hover:bg-[#00ff41]/5 transition-colors"
            >
              Quick: Set Name
            </motion.button>
            <motion.button
              onClick={() => handleCommand('set email ')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 border border-[#00ff41]/30 text-[#00ff41]/60 rounded hover:text-[#00ff41] hover:bg-[#00ff41]/5 transition-colors"
            >
              Quick: Set Email
            </motion.button>
            <motion.button
              onClick={() => handleCommand('send')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 border border-[#00d9ff]/50 text-[#00d9ff] rounded hover:bg-[#00d9ff]/10 transition-colors"
            >
              Send Message
            </motion.button>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #000;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #00ff41;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #00d9ff;
        }
      `}</style>
    </section>
  );
}
