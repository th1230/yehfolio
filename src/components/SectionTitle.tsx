'use client';

import gsap from 'gsap';
import { useRef, useEffect } from 'react';

import { useInView, useReducedMotion } from '@/utils/animations';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const alignmentClasses = {
  left: 'items-start text-left',
  center: 'items-center text-center',
  right: 'items-end text-right',
};

export default function SectionTitle({
  title,
  subtitle,
  align = 'center',
  className = '',
}: SectionTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3, once: true });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView || prefersReducedMotion) {
      if (titleRef.current) titleRef.current.style.opacity = '1';
      if (lineRef.current) lineRef.current.style.transform = 'scaleX(1)';
      if (subtitleRef.current) subtitleRef.current.style.opacity = '1';
      return;
    }

    const tl = gsap.timeline();

    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    })
      .to(
        lineRef.current,
        {
          scaleX: 1,
          duration: 0.4,
          ease: 'power2.out',
        },
        '-=0.3'
      )
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.2'
      );
  }, [isInView, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`mb-16 flex flex-col ${alignmentClasses[align]} ${className}`}
    >
      <h2
        ref={titleRef}
        className="dark:text-apricot relative mb-4 text-4xl font-bold text-gray-900 md:text-5xl"
        style={{ opacity: 0 }}
      >
        <span className="relative z-10">{title}</span>
        <span className="bg-sandy-brown/20 absolute -inset-2 -z-10 hidden -skew-y-2 dark:block" />
      </h2>

      <div
        ref={lineRef}
        className="from-sandy-brown via-fawn to-apricot mb-6 h-1 w-24 origin-left bg-gradient-to-r"
        style={{ transform: 'scaleX(0)' }}
      />

      {subtitle && (
        <p
          ref={subtitleRef}
          className="dark:text-apricot/80 max-w-2xl text-lg text-gray-600"
          style={{ opacity: 0 }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
