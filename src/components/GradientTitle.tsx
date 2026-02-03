'use client';

import gsap from 'gsap';
import { useRef, useState, useEffect } from 'react';

import { useReducedMotion } from '@/utils/animations';

interface GradientTitleProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

export default function GradientTitle({ children, className = '' }: GradientTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const textFillRef = useRef<SVGTextElement>(null);
  const glowRef = useRef<SVGTextElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [isDark, setIsDark] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [textLength, setTextLength] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMounted || !textRef.current) return;

    const length = textRef.current.getComputedTextLength();
    const bbox = textRef.current.getBBox();
    setTextLength(length);
    setDimensions({ width: bbox.width, height: bbox.height });
  }, [isMounted, children]);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.3, rootMargin: '-30px' }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isInView]);

  useEffect(() => {
    if (!isInView || !isMounted || !textRef.current || textLength === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });

      if (!prefersReducedMotion) {
        tl.fromTo(
          textRef.current,
          {
            strokeDasharray: textLength,
            strokeDashoffset: textLength,
          },
          {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: 'power2.inOut',
          },
          '-=0.1'
        );

        if (textFillRef.current) {
          tl.fromTo(
            textFillRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.6, ease: 'power2.in' },
            '-=0.5'
          );
        }

        if (glowRef.current) {
          tl.fromTo(glowRef.current, { opacity: 0 }, { opacity: 0.2, duration: 0.5 }, '-=0.3');
        }

        tl.to(textRef.current, { opacity: 0.3, duration: 0.4 }, '-=0.2');
      }
    });

    return () => ctx.revert();
  }, [isInView, isMounted, textLength, prefersReducedMotion]);

  useEffect(() => {
    if (!isInView || !isMounted || prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const handleEnter = () => {
      if (glowRef.current) {
        gsap.to(glowRef.current, { opacity: 0.35, duration: 0.3 });
      }
      if (textRef.current) {
        gsap.to(textRef.current, { opacity: 0.6, strokeWidth: 1.2, duration: 0.3 });
      }
    };

    const handleLeave = () => {
      if (glowRef.current) {
        gsap.to(glowRef.current, { opacity: 0.2, duration: 0.3 });
      }
      if (textRef.current) {
        gsap.to(textRef.current, { opacity: 0.3, strokeWidth: 0.8, duration: 0.3 });
      }
    };

    container.addEventListener('mouseenter', handleEnter);
    container.addEventListener('mouseleave', handleLeave);

    return () => {
      container.removeEventListener('mouseenter', handleEnter);
      container.removeEventListener('mouseleave', handleLeave);
    };
  }, [isInView, isMounted, prefersReducedMotion]);

  const strokeColor = isDark ? '#facfad' : '#3e4e50';
  const fillColor = isDark ? '#facfad' : '#3e4e50';
  const glowColor = isDark ? '#f8bd7f' : '#f5ac72';

  const fontSize = 48;
  const viewBoxHeight = fontSize * 1.4;
  const viewBoxWidth =
    dimensions.width > 0 ? dimensions.width + 20 : children.length * fontSize * 0.6;

  const uniqueId = `title-${children.replace(/\s/g, '-').slice(0, 8)}`;

  if (prefersReducedMotion) {
    return (
      <div ref={containerRef} className={`relative inline-block ${className}`}>
        <span className="font-bold" style={{ color: fillColor }}>
          {children}
        </span>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`} style={{ opacity: 0 }}>
      <svg
        ref={svgRef}
        className="block overflow-visible"
        style={{ height: '1.2em', width: 'auto' }}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        preserveAspectRatio="xMinYMid meet"
        aria-label={children}
        role="heading"
      >
        <defs>
          <filter id={`glow-${uniqueId}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
          </filter>
        </defs>

        {isMounted && (
          <text
            ref={glowRef}
            x="10"
            y={fontSize}
            fontSize={fontSize}
            fontWeight="700"
            fill={glowColor}
            opacity="0"
            filter={`url(#glow-${uniqueId})`}
            aria-hidden="true"
          >
            {children}
          </text>
        )}

        {isMounted && (
          <text
            ref={textFillRef}
            x="10"
            y={fontSize}
            fontSize={fontSize}
            fontWeight="700"
            fill={fillColor}
            opacity="0"
            aria-hidden="true"
          >
            {children}
          </text>
        )}

        {isMounted && (
          <text
            ref={textRef}
            x="10"
            y={fontSize}
            fontSize={fontSize}
            fontWeight="700"
            fill="none"
            stroke={strokeColor}
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="1"
            style={{
              strokeDasharray: textLength || 2000,
              strokeDashoffset: textLength || 2000,
            }}
            aria-hidden="true"
          >
            {children}
          </text>
        )}
      </svg>
    </div>
  );
}
