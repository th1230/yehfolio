'use client';

import gsap from 'gsap';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

import { useReducedMotion } from '@/utils/animations';

const CONFIG = {
  WAVE_AMPLITUDE: 6,
  WAVE_FREQUENCY: 0.12,
  WAVE_SPEED: 0.06,
  MAGNETIC_STRENGTH: 0.25,
  MAGNETIC_RADIUS: 120,
  ENTRANCE_STAGGER: 0.03,
  ENTRANCE_DURATION: 0.7,
  MOUSE_THROTTLE_MS: 16,
  MAGNETIC_THROTTLE_MS: 50,
} as const;

function throttle<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  let frameId: number | null = null;

  return (...args: Parameters<T>) => {
    const now = performance.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    } else if (!frameId) {
      frameId = requestAnimationFrame(() => {
        lastCall = performance.now();
        fn(...args);
        frameId = null;
      });
    }
  };
}

function useMousePositionRef() {
  const positionRef = useRef({ x: 0, y: 0 });
  const callbacksRef = useRef<Set<() => void>>(new Set());

  useEffect(() => {
    const handleMouseMove = throttle((e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
      callbacksRef.current.forEach(cb => cb());
    }, CONFIG.MOUSE_THROTTLE_MS);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const subscribe = useCallback((callback: () => void) => {
    callbacksRef.current.add(callback);
    return () => {
      callbacksRef.current.delete(callback);
    };
  }, []);

  return { positionRef, subscribe };
}

interface WaveTextProps {
  text: string;
  className?: string;
  delay?: number;
  enableWave?: boolean;
  enableMagnetic?: boolean;
  staggerMultiplier?: number;
}

function WaveText({
  text,
  className = '',
  delay = 0,
  enableWave = true,
  enableMagnetic = true,
  staggerMultiplier = 1,
}: WaveTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const letterRectsRef = useRef<DOMRect[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const animationFrameRef = useRef<number | null>(null);
  const timeRef = useRef(0);
  const { positionRef: mousePos, subscribe: subscribeMouseMove } = useMousePositionRef();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const updateRects = () => {
      letterRectsRef.current = lettersRef.current.map(
        letter => letter?.getBoundingClientRect() ?? new DOMRect()
      );
    };

    updateRects();
    window.addEventListener('resize', updateRects, { passive: true });

    const handleScroll = throttle(updateRects, 100);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', updateRects);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isClient, text.length]);

  useEffect(() => {
    if (!isClient) return;

    lettersRef.current.forEach((letter, index) => {
      if (!letter) return;

      if (prefersReducedMotion) {
        gsap.set(letter, { opacity: 1 });
        return;
      }

      const angle = (index / text.length) * Math.PI * 2.5;
      const distance = 80 + Math.sin(index * 0.5) * 60;
      const startX = Math.cos(angle) * distance;
      const startY = Math.sin(angle) * distance;

      gsap.fromTo(
        letter,
        {
          x: startX,
          y: startY,
          opacity: 0,
          scale: 0.3,
          rotation: (index % 2 === 0 ? 1 : -1) * (90 + index * 10),
          filter: 'blur(8px)',
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          filter: 'blur(0px)',
          duration: CONFIG.ENTRANCE_DURATION,
          ease: 'elastic.out(1, 0.6)',
          delay: delay + index * CONFIG.ENTRANCE_STAGGER * staggerMultiplier,
          onComplete: () => {
            if (letter) {
              letterRectsRef.current[index] = letter.getBoundingClientRect();
            }
          },
        }
      );
    });
  }, [isClient, prefersReducedMotion, delay, text.length, staggerMultiplier]);

  useEffect(() => {
    if (!isClient || prefersReducedMotion || !enableWave || !isHovering) return;

    const animate = () => {
      timeRef.current += CONFIG.WAVE_SPEED;

      lettersRef.current.forEach((letter, index) => {
        if (!letter) return;
        const wave =
          Math.sin(timeRef.current + index * CONFIG.WAVE_FREQUENCY) * CONFIG.WAVE_AMPLITUDE;
        const secondaryWave = Math.cos(timeRef.current * 0.7 + index * 0.2) * 2;
        gsap.set(letter, { y: wave + secondaryWave });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isClient, prefersReducedMotion, enableWave, isHovering]);

  useEffect(() => {
    if (!isClient || prefersReducedMotion || !enableMagnetic || !containerRef.current) return;

    let lastUpdate = 0;

    const updateMagnetic = () => {
      const now = performance.now();
      if (now - lastUpdate < CONFIG.MAGNETIC_THROTTLE_MS) return;
      lastUpdate = now;

      const mouse = mousePos.current;

      lettersRef.current.forEach((letter, index) => {
        if (!letter) return;

        const rect = letterRectsRef.current[index];
        if (!rect || rect.width === 0) return;

        const letterCenterX = rect.left + rect.width / 2;
        const letterCenterY = rect.top + rect.height / 2;

        const distX = mouse.x - letterCenterX;
        const distY = mouse.y - letterCenterY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        if (distance < CONFIG.MAGNETIC_RADIUS) {
          const force = (1 - distance / CONFIG.MAGNETIC_RADIUS) * CONFIG.MAGNETIC_STRENGTH;
          gsap.to(letter, {
            x: distX * force,
            y: distY * force * 0.5,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        } else {
          gsap.to(letter, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.4)',
            overwrite: 'auto',
          });
        }
      });
    };

    const unsubscribe = subscribeMouseMove(updateMagnetic);
    return unsubscribe;
  }, [isClient, prefersReducedMotion, enableMagnetic, mousePos, subscribeMouseMove]);

  useEffect(() => {
    if (!isHovering && isClient && !prefersReducedMotion) {
      lettersRef.current.forEach(letter => {
        if (letter) {
          gsap.to(letter, { y: 0, x: 0, duration: 0.4, ease: 'power2.out' });
        }
      });
    }
  }, [isHovering, isClient, prefersReducedMotion]);

  const handleLetterHover = useCallback(
    (el: HTMLSpanElement | null, isEnter: boolean) => {
      if (!el || prefersReducedMotion) return;

      gsap.to(el, {
        scale: isEnter ? 1.2 : 1,
        y: isEnter ? -3 : 0,
        color: isEnter ? '#f5ac72' : '',
        textShadow: isEnter ? '0 4px 12px rgba(62, 78, 80, 0.3)' : 'none',
        duration: 0.25,
        ease: 'back.out(2)',
        overwrite: 'auto',
      });
    },
    [prefersReducedMotion]
  );

  const characters = useMemo(() => text.split(''), [text]);

  if (!isClient) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span
      ref={containerRef}
      className={`inline-block ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {characters.map((char, index) => (
        <span
          key={index}
          ref={el => {
            lettersRef.current[index] = el;
          }}
          className="inline-block cursor-pointer will-change-transform"
          style={{ opacity: 0 }}
          onMouseEnter={e => handleLetterHover(e.currentTarget, true)}
          onMouseLeave={e => handleLetterHover(e.currentTarget, false)}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

function FluidParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const particlesRef = useRef<
    Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      hue: number;
      gridCell: number;
    }>
  >([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const dimensionsRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
      dimensionsRef.current = { width: rect.width, height: rect.height };
    };
    resize();

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 150);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const handleMouseMove = throttle((e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }, 32);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const particleCount = 30;
    const { width, height } = dimensionsRef.current;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2.5 + 0.8,
      alpha: Math.random() * 0.25 + 0.08,
      hue: Math.random() * 35 + 20,
      gridCell: 0,
    }));

    let animationId: number;
    const CONNECTION_DIST = 100;
    const CONNECTION_DIST_SQ = CONNECTION_DIST * CONNECTION_DIST;

    const animate = () => {
      const { width, height } = dimensionsRef.current;
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < 40000) {
          const force = (1 - Math.sqrt(distSq) / 200) * 0.0002;
          particle.vx += dx * force;
          particle.vy += dy * force;
        }

        particle.vx *= 0.99;
        particle.vy *= 0.99;

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = width;
        else if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        else if (particle.y > height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 65%, 68%, ${particle.alpha})`;
        ctx.fill();
      }

      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length - 1; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < CONNECTION_DIST_SQ) {
            const dist = Math.sqrt(distSq);
            const opacity = 0.08 * (1 - dist / CONNECTION_DIST);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `hsla(32, 55%, 68%, ${opacity})`;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 opacity-50 dark:opacity-25"
      style={{ zIndex: 0 }}
    />
  );
}

function ScrollIndicator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    if (pulseRef.current) {
      gsap.to(pulseRef.current, {
        scale: 1.8,
        opacity: 0,
        duration: 1.5,
        repeat: -1,
        ease: 'power2.out',
      });
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion) return;

    gsap.to(containerRef.current, {
      y: isHovered ? -5 : 0,
      scale: isHovered ? 1.1 : 1,
      duration: 0.3,
      ease: 'back.out(2)',
    });
  }, [isHovered, prefersReducedMotion]);

  const handleClick = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      ref={containerRef}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex flex-col items-center gap-3">
        <div
          ref={pulseRef}
          className="bg-sandy-brown/30 dark:bg-apricot/30 absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full"
        />

        <div className="border-outer-space/40 hover:border-sandy-brown dark:border-apricot/40 dark:hover:border-fawn relative flex h-10 w-6 items-start justify-center rounded-full border-2 bg-white/50 p-2 backdrop-blur-sm transition-colors dark:bg-gray-900/50">
          <div
            className="bg-outer-space/60 dark:bg-apricot/60 h-3 w-1.5 rounded-full"
            style={{
              animation: prefersReducedMotion ? 'none' : 'scrollDot 1.8s ease-in-out infinite',
            }}
          />
        </div>

        <span className="text-outer-space/50 dark:text-apricot/50 text-[10px] font-medium tracking-[0.2em] uppercase">
          scroll
        </span>
      </div>

      <style jsx>{`
        @keyframes scrollDot {
          0%,
          100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(16px);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}

export default function Hero() {
  const [isClient, setIsClient] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  const titleText = '前端工程師 / 葉濬宇';
  const subtitleText = '習慣邊做邊學，持續磨練開發能力';
  const descriptionText = '以前端為核心，持續拓展跨領域技術與實作經驗';

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' }
    );
  }, [isClient]);

  useEffect(() => {
    if (!isClient || !buttonsRef.current) return;

    gsap.fromTo(
      buttonsRef.current,
      { opacity: 0, y: 25, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, delay: 1.6, ease: 'back.out(1.5)' }
    );
  }, [isClient]);

  useEffect(() => {
    if (!isClient || !decorRef.current || prefersReducedMotion) return;

    gsap.fromTo(
      decorRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.2, delay: 0.3, ease: 'power2.out' }
    );
  }, [isClient, prefersReducedMotion]);

  const handleButtonInteraction = useCallback(
    (el: HTMLAnchorElement | null, type: 'enter' | 'leave' | 'down' | 'up') => {
      if (!el || prefersReducedMotion) return;

      const animations: Record<string, gsap.TweenVars> = {
        enter: { scale: 1.03, y: -2, duration: 0.25, ease: 'back.out(2)' },
        leave: { scale: 1, y: 0, duration: 0.3, ease: 'power2.out' },
        down: { scale: 0.97, duration: 0.1, ease: 'power2.out' },
        up: { scale: 1.03, duration: 0.15, ease: 'back.out(2)' },
      };

      gsap.to(el, animations[type]);
    },
    [prefersReducedMotion]
  );

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-50 px-4 py-20 dark:bg-gray-900/30">
      <FluidParticles />

      <div
        ref={decorRef}
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ opacity: 0 }}
      >
        <div
          className="from-apricot/15 via-fawn/8 dark:from-apricot/8 dark:via-fawn/4 absolute -top-1/3 -right-1/4 h-[550px] w-[550px] rounded-full bg-gradient-to-br to-transparent blur-3xl"
          style={{
            animation: prefersReducedMotion ? 'none' : 'floatSlow 25s ease-in-out infinite',
          }}
        />
        <div
          className="from-sandy-brown/12 via-apricot/8 dark:from-sandy-brown/6 dark:via-apricot/4 absolute -bottom-1/3 -left-1/4 h-[450px] w-[450px] rounded-full bg-gradient-to-tr to-transparent blur-3xl"
          style={{
            animation: prefersReducedMotion ? 'none' : 'floatSlow 30s ease-in-out infinite reverse',
          }}
        />
        <div
          className="from-fawn/10 dark:from-fawn/5 absolute top-1/4 left-1/3 h-[300px] w-[300px] rounded-full bg-gradient-to-r to-transparent blur-2xl"
          style={{
            animation: prefersReducedMotion ? 'none' : 'floatSlow 20s ease-in-out infinite 5s',
          }}
        />
      </div>

      <div
        ref={containerRef}
        className="relative z-10 mx-auto max-w-4xl text-center"
        style={{ opacity: 0 }}
      >
        <div className="absolute inset-0 -mx-8 -my-4 rounded-3xl backdrop-blur-sm" />

        <h1 className="relative mb-8 text-5xl font-bold md:text-7xl">
          <span
            className="pointer-events-none absolute inset-0 text-transparent select-none"
            style={{
              WebkitTextStroke: '2px rgba(62,78,80,0.15)',
              transform: 'translate(2px, 2px)',
            }}
            aria-hidden="true"
          >
            {titleText}
          </span>

          <WaveText
            text={titleText}
            className="text-outer-space dark:text-apricot relative drop-shadow-sm"
            delay={0.2}
            enableMagnetic={true}
            enableWave={true}
          />
        </h1>

        <div className="text-outer-space dark:text-fawn relative mb-5 text-xl font-medium md:text-2xl">
          <WaveText
            text={subtitleText}
            delay={0.7}
            enableWave={true}
            enableMagnetic={false}
            staggerMultiplier={0.8}
          />
        </div>

        <div className="text-outer-space/80 dark:text-apricot/80 relative mx-auto mb-10 max-w-2xl text-lg md:text-xl">
          <WaveText
            text={descriptionText}
            delay={1.1}
            enableWave={true}
            enableMagnetic={false}
            staggerMultiplier={0.6}
          />
        </div>

        <div
          ref={buttonsRef}
          className="flex flex-col justify-center gap-4 sm:flex-row"
          style={{ opacity: 0 }}
        >
          <a
            href="#projects"
            className="group bg-sandy-brown relative inline-flex items-center justify-center overflow-hidden rounded-xl px-8 py-3.5 font-medium text-white transition-all"
            onMouseEnter={e => handleButtonInteraction(e.currentTarget, 'enter')}
            onMouseLeave={e => handleButtonInteraction(e.currentTarget, 'leave')}
            onMouseDown={e => handleButtonInteraction(e.currentTarget, 'down')}
            onMouseUp={e => handleButtonInteraction(e.currentTarget, 'up')}
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            <span className="relative flex items-center gap-2">
              查看作品
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </a>

          <a
            href="#contact"
            className="group border-outer-space/80 text-outer-space dark:border-apricot/80 dark:text-apricot relative inline-flex items-center justify-center overflow-hidden rounded-xl border-2 px-8 py-3 font-medium transition-all"
            onMouseEnter={e => handleButtonInteraction(e.currentTarget, 'enter')}
            onMouseLeave={e => handleButtonInteraction(e.currentTarget, 'leave')}
            onMouseDown={e => handleButtonInteraction(e.currentTarget, 'down')}
            onMouseUp={e => handleButtonInteraction(e.currentTarget, 'up')}
          >
            <span className="bg-outer-space/5 dark:bg-apricot/5 absolute inset-0 origin-center scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            <span className="relative">聯絡我</span>
          </a>
        </div>
      </div>

      <ScrollIndicator />

      <style jsx>{`
        @keyframes floatSlow {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(20px, -20px) rotate(2deg);
          }
          50% {
            transform: translate(-15px, 15px) rotate(-2deg);
          }
          75% {
            transform: translate(10px, -10px) rotate(1deg);
          }
        }
      `}</style>
    </section>
  );
}
