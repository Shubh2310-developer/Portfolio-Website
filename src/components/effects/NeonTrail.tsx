'use client';

import { useEffect, useRef } from 'react';

export default function NeonTrail() {
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

    const trail: { x: number; y: number; vx: number; vy: number; life: number }[] = [];
    const maxTrailLength = 50;

    const handleMouseMove = (e: MouseEvent) => {
      const lastPoint = trail[trail.length - 1];
      const vx = lastPoint ? e.clientX - lastPoint.x : 0;
      const vy = lastPoint ? e.clientY - lastPoint.y : 0;

      trail.push({
        x: e.clientX,
        y: e.clientY,
        vx,
        vy,
        life: 100,
      });

      if (trail.length > maxTrailLength) {
        trail.shift();
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    let animationId: number;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Draw neon trail
      for (let i = 0; i < trail.length - 1; i++) {
        const point = trail[i];
        const nextPoint = trail[i + 1];
        const opacity = (i / trail.length) * (point.life / 100);

        // Outer glow
        const gradient = ctx.createLinearGradient(point.x, point.y, nextPoint.x, nextPoint.y);
        gradient.addColorStop(0, `rgba(0, 255, 65, ${opacity * 0.5})`);
        gradient.addColorStop(0.5, `rgba(0, 217, 255, ${opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(255, 42, 109, ${opacity * 0.5})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 15 * opacity;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#00ff41';

        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(nextPoint.x, nextPoint.y);
        ctx.stroke();

        // Inner bright line
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.lineWidth = 3 * opacity;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00d9ff';

        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(nextPoint.x, nextPoint.y);
        ctx.stroke();

        point.life -= 2;
      }

      // Remove dead trail points
      for (let i = trail.length - 1; i >= 0; i--) {
        if (trail[i].life <= 0) {
          trail.splice(i, 1);
        }
      }

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
      className="fixed inset-0 pointer-events-none z-40"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
