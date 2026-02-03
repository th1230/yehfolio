'use client';

import gsap from 'gsap';
import { useRef, useEffect } from 'react';

import { useInView } from '@/utils/animations';

import GradientTitle from './GradientTitle';
import SkillsDock from './SkillsDock';

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView || !containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    );
  }, [isInView]);

  return (
    <section id="skills" className="bg-gray-50 px-4 py-24 dark:bg-gray-900/30">
      <div className="mx-auto max-w-6xl">
        <div ref={ref}>
          <div ref={containerRef} style={{ opacity: 0 }}>
            <div className="mb-12 text-center">
              <GradientTitle className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                技術能力
              </GradientTitle>
              <p className="text-outer-space/70 dark:text-apricot/70 mx-auto max-w-2xl text-lg md:text-xl">
                懸停探索我的技能工具列
              </p>
              <div className="via-sandy-brown mx-auto mt-6 h-1 w-[120px] rounded-full bg-gradient-to-r from-transparent to-transparent" />
            </div>

            <SkillsDock />
          </div>
        </div>
      </div>
    </section>
  );
}
