'use client';

import { useEffect, useRef } from 'react';

import { shouldReduceMotion } from './utils';

import type { RefObject } from 'react';

const CANVAS_PARTICLE_FILL = 'rgba(204, 255, 0, 0.35)';

export default function NetworkCanvas({
  mouseRef,
}: {
  mouseRef: RefObject<{ x: number; y: number }>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (shouldReduceMotion()) {
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) {
      return;
    }

    let frameId = 0;
    let isPageVisible = true;
    let particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number }> = [];

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const isMobile = window.innerWidth < 768;
      const count = isMobile
        ? Math.min(28, Math.max(16, Math.floor(window.innerWidth / 28)))
        : Math.min(90, Math.max(34, Math.floor(window.innerWidth / 22)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.42,
        vy: (Math.random() - 0.5) * 0.42,
        radius: Math.random() * 1.6 + 0.35,
      }));
    };

    const draw = () => {
      if (!isPageVisible) {
        frameId = requestAnimationFrame(draw);
        return;
      }

      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > window.innerWidth) {
          particle.vx *= -1;
        }

        if (particle.y < 0 || particle.y > window.innerHeight) {
          particle.vy *= -1;
        }

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = CANVAS_PARTICLE_FILL;
        context.fill();
      }

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index];
        const mouseDistance = Math.hypot(
          mouseRef.current.x - particle.x,
          mouseRef.current.y - particle.y
        );

        if (mouseDistance < 150) {
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(mouseRef.current.x, mouseRef.current.y);
          context.strokeStyle = `rgba(204, 255, 0, ${0.42 - mouseDistance / 360})`;
          context.lineWidth = 0.8;
          context.stroke();
        }

        for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex += 1) {
          const nextParticle = particles[nextIndex];
          const distance = Math.hypot(particle.x - nextParticle.x, particle.y - nextParticle.y);

          if (distance < 95) {
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(nextParticle.x, nextParticle.y);
            context.strokeStyle = `rgba(255, 255, 255, ${0.12 - distance / 900})`;
            context.lineWidth = 0.5;
            context.stroke();
          }
        }
      }

      frameId = requestAnimationFrame(draw);
    };

    const onVisibilityChange = () => {
      isPageVisible = !document.hidden;
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    resize();
    window.addEventListener('resize', resize);
    draw();

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
    };
  }, [mouseRef]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-35" aria-hidden="true" />;
}
