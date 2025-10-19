'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { skillsData } from '@/data/skills';

interface Node {
  id: string;
  x: number;
  y: number;
  category: string;
  label: string;
  level: number;
}

export function NeuralSkills() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);

  useEffect(() => {
    // Create node positions
    const allNodes: Node[] = [];
    const categories = Object.keys(skillsData);
    const centerX = 400;
    const centerY = 300;
    const radius = 200;

    categories.forEach((category, catIndex) => {
      const angle = (catIndex / categories.length) * Math.PI * 2;
      const skills = skillsData[category as keyof typeof skillsData];

      skills.forEach((skill, skillIndex) => {
        const subAngle = angle + ((skillIndex - skills.length / 2) * 0.3);
        const subRadius = radius + (skillIndex % 2) * 50;

        allNodes.push({
          id: `${category}-${skill.name}`,
          x: centerX + Math.cos(subAngle) * subRadius,
          y: centerY + Math.sin(subAngle) * subRadius,
          category,
          label: skill.name,
          level: skill.level,
        });
      });
    });

    setNodes(allNodes);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || nodes.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 600;

    let animationId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections with enhanced visibility
      nodes.forEach((node, i) => {
        nodes.slice(i + 1).forEach((otherNode) => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Increased connection distance for more visible network
          if (distance < 280) {
            const opacity = (1 - distance / 280) * 0.7;

            // Draw connection line with gradient
            const gradient = ctx.createLinearGradient(node.x, node.y, otherNode.x, otherNode.y);
            gradient.addColorStop(0, `rgba(0, 255, 65, ${opacity})`);
            gradient.addColorStop(0.5, `rgba(0, 217, 255, ${opacity * 0.8})`);
            gradient.addColorStop(1, `rgba(0, 255, 65, ${opacity})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = opacity * 2.5;
            ctx.globalAlpha = 1;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();

            // Add outer glow for stronger connections
            if (distance < 180) {
              ctx.strokeStyle = `rgba(0, 255, 65, ${opacity * 0.2})`;
              ctx.lineWidth = opacity * 5;
              ctx.globalAlpha = 0.5;
              ctx.stroke();
            }
          }
        });
      });

      // Draw nodes
      nodes.forEach((node) => {
        const isHovered = hoveredNode === node.id;
        const radius = 6 + (node.level / 100) * 4;

        // Glow effect
        if (isHovered) {
          ctx.globalAlpha = 0.6;
          ctx.fillStyle = '#00ff41';
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius + 10, 0, Math.PI * 2);
          ctx.fill();
        }

        // Node circle
        ctx.globalAlpha = 1;
        ctx.fillStyle = isHovered ? '#00d9ff' : '#00ff41';
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Node border
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [nodes, hoveredNode]);

  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#00ff41 1px, transparent 1px), linear-gradient(90deg, #00ff41 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block">
              <div className="font-mono text-[#00ff41]/60 text-sm mb-2">
                <span className="text-[#00d9ff]">$</span> analyze --skills --network
              </div>
              <h2 className="text-5xl font-heading font-bold text-[#00ff41] mb-4">
                NEURAL NETWORK
                <span className="text-[#00d9ff] ml-3">&lt;SKILLS/&gt;</span>
              </h2>
              <div className="h-px bg-gradient-to-r from-transparent via-[#00ff41] to-transparent" />
            </div>
            <p className="text-[#00ff41]/70 mt-6 font-mono">
              Interactive skill graph • Hover nodes to explore connections
            </p>
          </div>

          {/* Neural Network Canvas */}
          <div className="relative">
            <div className="border-2 border-[#00ff41]/30 rounded-lg overflow-hidden bg-black/50 backdrop-blur-sm">
              <div className="relative" style={{ paddingBottom: '75%' }}>
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full"
                  style={{ imageRendering: 'crisp-edges' }}
                />

                {/* Interactive overlay */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 800 600"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {nodes.map((node) => (
                    <g key={node.id}>
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={15}
                        fill="transparent"
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                      />
                      {hoveredNode === node.id && (
                        <g>
                          <rect
                            x={node.x + 20}
                            y={node.y - 15}
                            width={node.label.length * 8 + 20}
                            height={30}
                            fill="#000"
                            stroke="#00ff41"
                            strokeWidth="1"
                            rx="4"
                          />
                          <text
                            x={node.x + 30}
                            y={node.y + 5}
                            fill="#00ff41"
                            fontSize="12"
                            fontFamily="JetBrains Mono, monospace"
                          >
                            {node.label}
                          </text>
                        </g>
                      )}
                    </g>
                  ))}
                </svg>
              </div>

              {/* Stats bar */}
              <div className="border-t border-[#00ff41]/30 p-4 flex justify-between font-mono text-xs text-[#00ff41]/60">
                <div>NODES: {nodes.length}</div>
                <div>CONNECTIONS: ACTIVE</div>
                <div>STATUS: <span className="text-[#00ff41]">OPTIMIZED</span></div>
              </div>
            </div>

            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00d9ff]" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#00d9ff]" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#00d9ff]" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00d9ff]" />
          </div>

          {/* Legend */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 font-mono text-sm">
            {Object.keys(skillsData).map((category) => (
              <div key={category} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border-2 border-[#00ff41] bg-[#00ff41]/50" />
                <span className="text-[#00ff41]/70 uppercase">{category}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
