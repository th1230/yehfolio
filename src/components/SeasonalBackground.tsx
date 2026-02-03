'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  imageIndex: number;
  swayPhase: number;
  swayAmplitude: number;
  windFactor: number;
  depth: number;
}

interface GroundParticle {
  x: number;
  y: number;
  size: number;
  rotation: number;
  opacity: number;
  imageIndex: number;
  createdAt: number;
}

export default function SeasonalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const groundParticlesRef = useRef<GroundParticle[]>([]);
  const lastTimeRef = useRef<number>(0);
  const leafImagesRef = useRef<HTMLImageElement[]>([]);
  const imagesLoadedRef = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    const imageFiles = [
      `/images/autumn/maple-1.png`,
      `/images/autumn/maple-2.png`,
      `/images/autumn/maple-3.png`,
      `/images/autumn/ginkgo-1.png`,
      `/images/autumn/ginkgo-2.png`,
    ];

    let loadedCount = 0;
    leafImagesRef.current = imageFiles.map(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === imageFiles.length) {
          imagesLoadedRef.current = true;
          initParticles();
          animationFrameRef.current = requestAnimationFrame(animate);
        }
      };
      return img;
    });

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const getParticleCount = () => {
      const area = window.innerWidth * window.innerHeight;
      const baseCount = Math.floor(area / 25000);
      return Math.min(Math.max(baseCount, 30), 60);
    };

    const createParticle = (): Particle => {
      const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
      const canvasHeight = canvas.height / (window.devicePixelRatio || 1);

      const depth = Math.random();
      const size = depth * 35 + 15;
      const opacity = depth * 0.5 + 0.3;
      const fallSpeed = (1 - depth * 0.5) * 2.5 + 0.5;

      const swayAmplitude = (depth * 0.6 + 0.4) * 2;
      const windFactor = size / 50;
      const rotationSpeed = (Math.random() - 0.5) * 0.05 * (1.5 - depth);

      return {
        x: Math.random() * canvasWidth,
        y: -Math.random() * canvasHeight - 50,
        vx: (Math.random() - 0.5) * 1.5,
        vy: fallSpeed,
        size,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed,
        opacity,
        imageIndex: Math.floor(Math.random() * leafImagesRef.current.length),
        swayPhase: Math.random() * Math.PI * 2,
        swayAmplitude,
        windFactor,
        depth,
      };
    };

    const drawParticle = (particle: Particle) => {
      if (!imagesLoadedRef.current) return;

      const img = leafImagesRef.current[particle.imageIndex];
      if (!img || !img.complete) return;

      const halfSize = particle.size / 2;

      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      ctx.drawImage(img, -halfSize, -halfSize, particle.size, particle.size);
      ctx.restore();
    };

    const drawSeasonalBackground = (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number
    ) => {
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'rgba(255, 140, 0, 0.08)');
      gradient.addColorStop(0.5, 'rgba(218, 165, 32, 0.06)');
      gradient.addColorStop(1, 'rgba(160, 82, 45, 0.1)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    const addGroundParticle = (particle: Particle, currentTime: number, absoluteY: number) => {
      const newGroundParticle: GroundParticle = {
        x: particle.x,
        y: absoluteY,
        size: particle.size,
        rotation: particle.rotation,
        opacity: particle.opacity,
        imageIndex: particle.imageIndex,
        createdAt: currentTime,
      };

      groundParticlesRef.current.push(newGroundParticle);

      const maxGroundParticles = 300;
      if (groundParticlesRef.current.length > maxGroundParticles) {
        groundParticlesRef.current = groundParticlesRef.current.slice(-maxGroundParticles);
      }
    };

    const drawGroundLayer = (ctx: CanvasRenderingContext2D, currentTime: number) => {
      if (!imagesLoadedRef.current) return;

      const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
      const canvasHeight = canvas.height / (window.devicePixelRatio || 1);
      const scrollY = window.scrollY || window.pageYOffset;
      const pageHeight = document.documentElement.scrollHeight;
      const LIFETIME = 15000;

      groundParticlesRef.current = groundParticlesRef.current.filter(
        gp => currentTime - gp.createdAt < LIFETIME
      );

      groundParticlesRef.current.forEach(gp => {
        const img = leafImagesRef.current[gp.imageIndex];
        if (!img || !img.complete) return;

        const relativeY = gp.y - scrollY;

        if (relativeY < -100 || relativeY > canvasHeight + 100) return;

        const age = currentTime - gp.createdAt;
        const fadeStartTime = LIFETIME - 2000;
        let opacity = gp.opacity;
        if (age > fadeStartTime) {
          const fadeProgress = (age - fadeStartTime) / 2000;
          opacity = gp.opacity * (1 - fadeProgress);
        }

        const halfSize = gp.size / 2;

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.translate(gp.x, relativeY);
        ctx.rotate(gp.rotation);
        ctx.drawImage(img, -halfSize, -halfSize, gp.size, gp.size);
        ctx.restore();
      });

      if (groundParticlesRef.current.length > 10) {
        const groundRelativeY = pageHeight - scrollY;
        if (groundRelativeY > -150 && groundRelativeY < canvasHeight + 150) {
          ctx.save();
          ctx.globalAlpha = 0.35;
          const gradient = ctx.createLinearGradient(0, groundRelativeY - 130, 0, groundRelativeY);
          gradient.addColorStop(0, 'rgba(139, 69, 19, 0)');
          gradient.addColorStop(0.3, 'rgba(139, 69, 19, 0.1)');
          gradient.addColorStop(0.7, 'rgba(139, 69, 19, 0.2)');
          gradient.addColorStop(1, 'rgba(139, 69, 19, 0.3)');

          ctx.fillStyle = gradient;
          ctx.fillRect(0, groundRelativeY - 130, canvasWidth, 130);
          ctx.restore();
        }
      }
    };

    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = getParticleCount();
      const canvasHeight = canvas.height / (window.devicePixelRatio || 1);

      for (let i = 0; i < particleCount; i++) {
        const particle = createParticle();
        particle.y = Math.random() * canvasHeight;
        particlesRef.current.push(particle);
      }
    };

    const animate = (currentTime: number) => {
      if (!imagesLoadedRef.current) return;

      const deltaTime = lastTimeRef.current ? (currentTime - lastTimeRef.current) / 16.67 : 1;
      lastTimeRef.current = currentTime;

      const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
      const canvasHeight = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      drawSeasonalBackground(ctx, canvasWidth, canvasHeight);

      const globalWind = Math.sin(currentTime * 0.0003) * 1.5;
      const windGust = Math.sin(currentTime * 0.002) * 0.8;

      particlesRef.current.forEach((particle, index) => {
        particle.y += particle.vy * deltaTime;

        const swayFreq = 0.002 + particle.depth * 0.001;
        const swayX =
          Math.sin(currentTime * swayFreq + particle.swayPhase) * particle.swayAmplitude;
        const swayY = Math.cos(currentTime * swayFreq * 0.5 + particle.swayPhase) * 0.5;

        particle.x +=
          (particle.vx + swayX + (globalWind + windGust) * particle.windFactor) * deltaTime * 0.3;
        particle.y += swayY * deltaTime * 0.2;

        const rotationVariation = Math.sin(currentTime * 0.003 + particle.swayPhase) * 0.02;
        particle.rotation += (particle.rotationSpeed + rotationVariation) * deltaTime;

        const scrollY = window.scrollY || window.pageYOffset;
        const absoluteY = particle.y + scrollY;
        const pageHeight = document.documentElement.scrollHeight;

        const groundZoneStart = pageHeight - 120;

        if (absoluteY >= groundZoneStart) {
          const depthInZone = absoluteY - groundZoneStart;
          const stopProbability = Math.pow(depthInZone / 120, 2);

          if (Math.random() < stopProbability) {
            addGroundParticle(particle, currentTime, absoluteY);
            particlesRef.current[index] = createParticle();
          }
        } else if (particle.y > canvasHeight + 50) {
          particlesRef.current[index] = createParticle();
        }

        if (particle.x < -50) {
          particle.x = canvasWidth + 50;
        } else if (particle.x > canvasWidth + 50) {
          particle.x = -50;
        }
      });

      particlesRef.current.forEach(particle => {
        drawParticle(particle);
      });

      drawGroundLayer(ctx, currentTime);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      style={{ mixBlendMode: 'normal' }}
      aria-label="秋天落葉背景動畫"
    />
  );
}
