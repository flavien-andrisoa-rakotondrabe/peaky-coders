"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
};

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 🌿 soft brand color (NOT aggressive red)
  const particleColorRef = useRef("34, 197, 94"); 
  // green-500 softened base

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrame = 0;
    const particles: Particle[] = [];
    const particleCount = 60; // slightly reduced for softness

    const syncParticleColor = () => {
      // 🎯 soft mix red + green (more neutral, less aggressive)
      const color = "120, 220, 160"; 
      particleColorRef.current = color;
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles.length = 0;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.4, // slower movement
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 1.8 + 0.6,
        });
      }
    };

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      // 🌫️ softer opacity
      context.fillStyle = `rgba(${particleColorRef.current}, 0.25)`;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        context.beginPath();
        context.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        context.fill();
      });

      // connections (softer too)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            context.strokeStyle = `rgba(${particleColorRef.current}, ${
              (100 - distance) / 1200
            })`;

            context.lineWidth = 0.8;

            context.beginPath();
            context.moveTo(particles[i].x, particles[i].y);
            context.lineTo(particles[j].x, particles[j].y);
            context.stroke();
          }
        }
      }

      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    syncParticleColor();
    initParticles();
    draw();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 opacity-60 pointer-events-none"
    />
  );
}

export default ParticleBackground;