'use client';

import { useEffect, useRef } from 'react';

export default function MorphingBlobs() {
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

    class Blob {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      targetRadius: number;
      color: string;
      points: { x: number; y: number; angle: number; distance: number }[];

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 100 + 150;
        this.targetRadius = this.radius;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.color = Math.random() > 0.5 ? '#00ff41' : '#00d9ff';
        this.points = [];

        // Create random points for organic shape
        const numPoints = 8;
        for (let i = 0; i < numPoints; i++) {
          this.points.push({
            x: 0,
            y: 0,
            angle: (i / numPoints) * Math.PI * 2,
            distance: this.radius + (Math.random() - 0.5) * 40,
          });
        }
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < -this.radius || this.x > width + this.radius) this.vx *= -1;
        if (this.y < -this.radius || this.y > height + this.radius) this.vy *= -1;

        // Morph the blob
        this.points.forEach((point) => {
          point.angle += 0.01;
          point.distance += Math.sin(point.angle) * 0.5;
          point.x = this.x + Math.cos(point.angle) * point.distance;
          point.y = this.y + Math.sin(point.angle) * point.distance;
        });
      }

      draw() {
        ctx!.save();

        // Create gradient
        const gradient = ctx!.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius * 2
        );
        gradient.addColorStop(0, this.color + '40');
        gradient.addColorStop(0.5, this.color + '20');
        gradient.addColorStop(1, 'transparent');

        ctx!.fillStyle = gradient;
        ctx!.filter = 'blur(40px)';

        // Draw organic shape
        ctx!.beginPath();
        this.points.forEach((point, i) => {
          if (i === 0) {
            ctx!.moveTo(point.x, point.y);
          } else {
            const prevPoint = this.points[i - 1];
            const cpx = (prevPoint.x + point.x) / 2;
            const cpy = (prevPoint.y + point.y) / 2;
            ctx!.quadraticCurveTo(prevPoint.x, prevPoint.y, cpx, cpy);
          }
        });

        // Close the path
        const firstPoint = this.points[0];
        const lastPoint = this.points[this.points.length - 1];
        const cpx = (lastPoint.x + firstPoint.x) / 2;
        const cpy = (lastPoint.y + firstPoint.y) / 2;
        ctx!.quadraticCurveTo(lastPoint.x, lastPoint.y, cpx, cpy);
        ctx!.closePath();

        ctx!.fill();
        ctx!.restore();
      }
    }

    const blobs: Blob[] = [];
    for (let i = 0; i < 5; i++) {
      blobs.push(new Blob());
    }

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      blobs.forEach((blob) => {
        blob.update();
        blob.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 pointer-events-none"
      style={{ mixBlendMode: 'screen', opacity: 0.3 }}
    />
  );
}
