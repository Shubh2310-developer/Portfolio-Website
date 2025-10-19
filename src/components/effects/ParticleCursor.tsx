'use client';

import { useEffect, useRef } from 'react';

export default function ParticleCursor() {
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

    const particles: CursorParticle[] = [];
    const mouse = { x: width / 2, y: height / 2 };

    class CursorParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      color: string;
      gravity: number;
      bounce: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 1;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.life = 100;
        this.maxLife = 100;
        this.size = Math.random() * 3 + 2;
        this.color = Math.random() > 0.5 ? '#00ff41' : '#00d9ff';
        this.gravity = 0.15;
        this.bounce = -0.7;
      }

      update() {
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 1;

        // Bounce off bottom
        if (this.y + this.size > height) {
          this.y = height - this.size;
          this.vy *= this.bounce;
          this.vx *= 0.95; // Friction
        }

        // Bounce off sides
        if (this.x + this.size > width || this.x - this.size < 0) {
          this.vx *= -1;
        }

        // Friction
        this.vx *= 0.99;
      }

      draw() {
        const opacity = this.life / this.maxLife;

        // Glow
        const gradient = ctx!.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(0.5, this.color + '80');
        gradient.addColorStop(1, 'transparent');

        ctx!.globalAlpha = opacity;
        ctx!.fillStyle = gradient;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx!.fill();

        // Core
        ctx!.fillStyle = this.color;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.globalAlpha = 1;
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Create particles on mouse move
      for (let i = 0; i < 3; i++) {
        particles.push(new CursorParticle(mouse.x, mouse.y));
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Particle explosion on click
      for (let i = 0; i < 30; i++) {
        particles.push(new CursorParticle(e.clientX, e.clientY));
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    let animationId: number;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].life <= 0) {
          particles.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
