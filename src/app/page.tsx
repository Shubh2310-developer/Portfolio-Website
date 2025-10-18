import { TerminalHero } from '@/components/sections/TerminalHero';
import { TerminalAbout } from '@/components/sections/TerminalAbout';
import { NeuralSkills } from '@/components/sections/NeuralSkills';
import { CyberProjects } from '@/components/sections/CyberProjects';
import { TerminalCertificates } from '@/components/sections/TerminalCertificates';
import { CLIContact } from '@/components/sections/CLIContact';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <TerminalHero />
      <TerminalAbout />
      <NeuralSkills />
      <CyberProjects />
      <TerminalCertificates />
      <CLIContact />
    </main>
  );
}