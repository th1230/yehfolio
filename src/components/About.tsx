'use client';

import gsap from 'gsap';
import { useRef, useEffect, useState } from 'react';

import { springConfigs, useReducedMotion, useInView, useScrollProgress } from '@/utils/animations';

import GradientTitle from './GradientTitle';

interface HighlightTextProps {
  children: string;
}

function HighlightText({ children }: HighlightTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!textRef.current || prefersReducedMotion) return;

    gsap.to(textRef.current, {
      backgroundSize: isHovered ? '100% 100%' : '0% 100%',
      color: isHovered ? '#fff' : '',
      scale: isHovered ? 1.05 : 1,
      y: isHovered ? -2 : 0,
      duration: 0.3,
      ease: 'back.out(1.5)',
    });
  }, [isHovered, prefersReducedMotion]);

  return (
    <span
      ref={textRef}
      className="text-fawn relative inline-block cursor-pointer px-1 font-semibold transition-colors"
      style={{
        background: 'linear-gradient(90deg, #f5ac72 0%, #f8bd7f 100%)',
        backgroundSize: '0% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        borderRadius: '4px',
        padding: '0 6px',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </span>
  );
}

function ElegantDecoration() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const orbsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMousePos({
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      });
    };

    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    orbsRef.current.forEach((orb, index) => {
      if (!orb) return;
      const depth = (index + 1) * 15;
      gsap.to(orb, {
        x: mousePos.x * depth,
        y: mousePos.y * depth,
        duration: 0.8,
        ease: 'power2.out',
      });
    });
  }, [mousePos, prefersReducedMotion]);

  const techLabels = ['React', 'Vue', 'Angular', 'TypeScript'];
  const positions = [
    { top: '10%', left: '15%' },
    { top: '15%', right: '10%' },
    { bottom: '20%', left: '10%' },
    { bottom: '10%', right: '15%' },
  ];

  return (
    <div ref={containerRef} className="relative flex h-80 w-full items-center justify-center">
      <div className="relative h-56 w-56">
        <div
          ref={el => {
            orbsRef.current[0] = el;
          }}
          className="border-apricot/30 dark:border-apricot/20 absolute inset-0 rounded-full border-2 border-dashed"
          style={{
            animation: prefersReducedMotion ? 'none' : 'spin 30s linear infinite',
          }}
        />

        <div
          ref={el => {
            orbsRef.current[1] = el;
          }}
          className="border-fawn/25 dark:border-fawn/15 absolute inset-4 rounded-full border"
          style={{
            animation: prefersReducedMotion ? 'none' : 'spin 25s linear infinite reverse',
          }}
        />

        <div
          ref={el => {
            orbsRef.current[2] = el;
          }}
          className="from-apricot/10 via-fawn/5 dark:from-apricot/8 dark:via-fawn/3 absolute inset-10 rounded-full bg-gradient-to-br to-transparent"
          style={{
            animation: prefersReducedMotion ? 'none' : 'breathe 4s ease-in-out infinite',
          }}
        />

        <div
          ref={el => {
            orbsRef.current[3] = el;
          }}
          className="from-sandy-brown/60 via-apricot/40 to-fawn/30 dark:from-sandy-brown/40 dark:via-apricot/25 dark:to-fawn/15 absolute top-1/2 left-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br"
          style={{
            animation: prefersReducedMotion ? 'none' : 'pulse-glow 3s ease-in-out infinite',
          }}
        />

        {[0, 90, 180, 270].map((angle, i) => (
          <div
            key={i}
            className="bg-apricot/70 dark:bg-apricot/50 absolute top-1/2 left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              transform: `rotate(${angle}deg) translateX(112px)`,
              animation: prefersReducedMotion ? 'none' : `orbit 20s linear infinite`,
              animationDelay: `${i * -5}s`,
            }}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0">
        {techLabels.map((tech, i) => (
          <span
            key={tech}
            className="text-outer-space/40 dark:text-apricot/30 hover:text-sandy-brown dark:hover:text-fawn pointer-events-auto absolute cursor-default text-sm font-medium transition-all duration-500"
            style={{
              ...positions[i],
              animation: prefersReducedMotion
                ? 'none'
                : `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes breathe {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.9;
          }
        }
        @keyframes pulse-glow {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
            box-shadow: 0 0 20px rgba(245, 172, 114, 0.3);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
            box-shadow: 0 0 40px rgba(245, 172, 114, 0.5);
          }
        }
        @keyframes orbit {
          to {
            transform: rotate(calc(var(--start-angle, 0deg) + 360deg)) translateX(112px);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </div>
  );
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  const titleLineRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const scrollProgress = useScrollProgress(containerRef);

  useEffect(() => {
    if (prefersReducedMotion || !rightContentRef.current) return;
    const y = 50 - scrollProgress * 100;
    gsap.set(rightContentRef.current, { y });
  }, [scrollProgress, prefersReducedMotion]);

  useEffect(() => {
    if (!isInView) return;
    const duration = prefersReducedMotion ? 0.01 : springConfigs.gentle.duration;
    const ease = prefersReducedMotion ? 'none' : springConfigs.gentle.ease;

    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration, ease, delay: 0.1 }
      );
    }

    if (titleLineRef.current) {
      gsap.fromTo(
        titleLineRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: prefersReducedMotion ? 0.01 : 0.8,
          delay: 0.4,
          ease: 'power3.out',
        }
      );
    }

    if (leftContentRef.current) {
      gsap.fromTo(
        leftContentRef.current,
        { opacity: 0, x: -40, filter: 'blur(10px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration, ease, delay: 0.3 }
      );
    }

    if (rightContentRef.current) {
      gsap.fromTo(
        rightContentRef.current,
        { opacity: 0, x: 40, filter: 'blur(10px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration, ease, delay: 0.4 }
      );
    }

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration, ease: springConfigs.snappy.ease, delay: 0.4 }
      );
    }

    paragraphRefs.current.forEach((p, i) => {
      if (p) {
        gsap.fromTo(
          p,
          { opacity: 0, y: 20, filter: 'blur(5px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration, ease, delay: 0.5 + i * 0.15 }
        );
      }
    });
  }, [isInView, prefersReducedMotion]);

  const handleTitleHover = (isEnter: boolean) => {
    if (!titleRef.current || prefersReducedMotion) return;

    gsap.to(titleRef.current, {
      scale: isEnter ? 1.02 : 1,
      color: isEnter ? '#f5ac72' : '',
      duration: 0.3,
      ease: 'back.out(2)',
    });
  };

  return (
    <section id="about" ref={containerRef} className="bg-gray-50 px-4 py-20 dark:bg-gray-900/30">
      <div className="mx-auto max-w-6xl">
        <div ref={ref} style={{ opacity: 0 }}>
          <div className="mb-16 text-center">
            <GradientTitle className="text-4xl font-bold md:text-5xl lg:text-6xl">
              關於我
            </GradientTitle>
            <div
              ref={titleLineRef}
              className="via-sandy-brown mx-auto mt-4 h-1 w-32 origin-center rounded-full bg-gradient-to-r from-transparent to-transparent"
              style={{ opacity: 0, transform: 'scaleX(0)' }}
            />
          </div>

          <div className="grid items-center gap-12 md:grid-cols-2">
            <div ref={leftContentRef} style={{ opacity: 0 }}>
              <h3
                ref={titleRef}
                className="text-outer-space dark:text-fawn mb-6 inline-block cursor-pointer text-2xl font-bold transition-all"
                style={{ opacity: 0 }}
                onMouseEnter={() => handleTitleHover(true)}
                onMouseLeave={() => handleTitleHover(false)}
              >
                前端工程師
              </h3>

              <p
                ref={el => {
                  paragraphRefs.current[0] = el;
                }}
                className="text-outer-space/80 dark:text-apricot/80 mb-6 text-lg leading-relaxed"
                style={{ opacity: 0 }}
              >
                淡江大學畢業，具備
                <HighlightText>Angular、Vue 與 React</HighlightText>
                的完整專案開發經驗，曾參與多項功能實作與系統前端設計，能靈活運用主流框架解決問題。
              </p>

              <p
                ref={el => {
                  paragraphRefs.current[1] = el;
                }}
                className="text-outer-space/80 dark:text-apricot/80 mb-6 text-lg leading-relaxed"
                style={{ opacity: 0 }}
              >
                除了前端，也透過
                <HighlightText>side project</HighlightText>
                接觸後端開發，逐步理解資料處理與 API 設計，並強化對整體架構的理解。
              </p>

              <p
                ref={el => {
                  paragraphRefs.current[2] = el;
                }}
                className="text-outer-space/80 dark:text-apricot/80 text-lg leading-relaxed"
                style={{ opacity: 0 }}
              >
                開發過程中習慣邊做邊學，對技術更新會有基本的掌握，若遇到能解決問題的新工具，也會評估後嘗試導入。
              </p>
            </div>

            <div ref={rightContentRef} style={{ opacity: 0 }} className="relative overflow-visible">
              <ElegantDecoration />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
