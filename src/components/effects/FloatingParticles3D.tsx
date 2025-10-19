'use client';

import { useEffect, useRef } from 'react';

export default function FloatingParticles3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = [];
    const particleCount = 100;
    const connectionDistance = 150;
    const mouse = { x: width / 2, y: height / 2, radius: 150 };

    class Particle {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      size: number;
      color: string;
      angle: number;
      angleSpeed: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = Math.random() * 1000;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.vz = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 3 + 1;
        this.color = Math.random() > 0.5 ? '#00ff41' : '#00d9ff';
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = (Math.random() - 0.5) * 0.02;
      }

      update() {
        // Mouse interaction with 3D effect
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.vx -= Math.cos(angle) * force * 0.5;
          this.vy -= Math.sin(angle) * force * 0.5;
          this.vz += force * 5;
        }

        // Update position with 3D rotation
        this.angle += this.angleSpeed;
        this.x += this.vx + Math.cos(this.angle) * 0.5;
        this.y += this.vy + Math.sin(this.angle) * 0.5;
        this.z += this.vz;

        // Gravity and friction
        this.vx *= 0.98;
        this.vy *= 0.98;
        this.vz *= 0.95;

        // Boundary check with wrap-around
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
        if (this.z < 0) this.z = 1000;
        if (this.z > 1000) this.z = 0;
      }

      draw() {
        // 3D perspective calculation
        const scale = 1000 / (1000 + this.z);
        const x2d = this.x * scale + (width / 2) * (1 - scale);
        const y2d = this.y * scale + (height / 2) * (1 - scale);
        const size = this.size * scale;

        // Glow effect
        const gradient = ctx!.createRadialGradient(x2d, y2d, 0, x2d, y2d, size * 3);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(0.5, this.color + '80');
        gradient.addColorStop(1, this.color + '00');

        ctx!.beginPath();
        ctx!.arc(x2d, y2d, size * 3, 0, Math.PI * 2);
        ctx!.fillStyle = gradient;
        ctx!.fill();

        // Core particle
        ctx!.beginPath();
        ctx!.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx!.fillStyle = this.color;
        ctx!.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    let animationId: number;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dz = particles[i].z - particles[j].z;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < connectionDistance) {
            const scale1 = 1000 / (1000 + particles[i].z);
            const scale2 = 1000 / (1000 + particles[j].z);

            const x1 = particles[i].x * scale1 + (width / 2) * (1 - scale1);
            const y1 = particles[i].y * scale1 + (height / 2) * (1 - scale1);
            const x2 = particles[j].x * scale2 + (width / 2) * (1 - scale2);
            const y2 = particles[j].y * scale2 + (height / 2) * (1 - scale2);

            const opacity = (1 - distance / connectionDistance) * 0.3;
            const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
            gradient.addColorStop(0, `rgba(0, 255, 65, ${opacity})`);
            gradient.addColorStop(0.5, `rgba(0, 217, 255, ${opacity})`);
            gradient.addColorStop(1, `rgba(0, 255, 65, ${opacity})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = opacity * 2;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
