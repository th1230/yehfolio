'use client';

import gsap from 'gsap';
import { useRef, useEffect } from 'react';

import { useTheme } from '@/contexts/ThemeContext';
import { useReducedMotion, tapEffects } from '@/utils/animations';

const ICON_SIZE = 28;
const TRACK_PADDING = 4;

export default function ThemeToggle() {
  const { themeMode, cycleTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const getModeLabel = () => {
    switch (themeMode) {
      case 'light':
        return '亮色模式';
      case 'dark':
        return '暗色模式';
      case 'auto':
        return '自動模式';
    }
  };

  const getSliderIndex = () => {
    if (themeMode === 'light') return 0;
    if (themeMode === 'auto') return 1;
    return 2;
  };

  const sliderIndex = getSliderIndex();

  const getSliderBackground = () => {
    if (themeMode === 'light') {
      return 'linear-gradient(135deg, #fbbf24, #f59e0b)';
    }
    if (themeMode === 'dark') {
      return 'linear-gradient(135deg, #818cf8, #6366f1)';
    }
    return 'linear-gradient(135deg, #f5ac72, #f8bd7f)';
  };

  useEffect(() => {
    if (sliderRef.current && !prefersReducedMotion) {
      gsap.to(sliderRef.current, {
        x: sliderIndex * ICON_SIZE,
        duration: 0.3,
        ease: 'back.out(1.5)',
      });
    } else if (sliderRef.current) {
      gsap.set(sliderRef.current, { x: sliderIndex * ICON_SIZE });
    }
  }, [sliderIndex, prefersReducedMotion]);

  const handleTap = () => {
    if (!buttonRef.current || prefersReducedMotion) return;
    gsap.to(buttonRef.current, {
      scale: tapEffects.shrink.scale,
      duration: 0.1,
      ease: 'power2.out',
      onComplete: () => {
        gsap.to(buttonRef.current, { scale: 1, duration: 0.2 });
      },
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={() => {
        handleTap();
        cycleTheme();
      }}
      className="group hover:border-sandy-brown/50 dark:hover:border-fawn/50 relative flex cursor-pointer items-center rounded-full border border-gray-200/80 bg-white/95 p-1 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md dark:border-gray-600/80 dark:bg-gray-800/95"
      aria-label={`切換主題 - 目前: ${getModeLabel()}`}
      style={{ willChange: 'transform' }}
    >
      <div
        className="relative flex items-center rounded-full bg-gray-100/80 dark:bg-gray-700/80"
        style={{
          padding: TRACK_PADDING,
          width: ICON_SIZE * 3 + TRACK_PADDING * 2,
          height: ICON_SIZE + TRACK_PADDING * 2,
        }}
      >
        <div
          ref={sliderRef}
          className="absolute rounded-full shadow-md"
          style={{
            width: ICON_SIZE,
            height: ICON_SIZE,
            left: TRACK_PADDING,
            background: getSliderBackground(),
          }}
        />

        <div className="relative z-10 flex">
          <div
            className="flex items-center justify-center"
            style={{ width: ICON_SIZE, height: ICON_SIZE }}
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              className={`transition-colors duration-200 ${
                themeMode === 'light' ? 'text-white' : 'text-amber-500 dark:text-amber-400'
              }`}
            >
              <circle cx="12" cy="12" r="4" fill="currentColor" />
              <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="12" y1="2" x2="12" y2="5" />
                <line x1="12" y1="19" x2="12" y2="22" />
                <line x1="2" y1="12" x2="5" y2="12" />
                <line x1="19" y1="12" x2="22" y2="12" />
                <line x1="4.93" y1="4.93" x2="7.05" y2="7.05" />
                <line x1="16.95" y1="16.95" x2="19.07" y2="19.07" />
                <line x1="4.93" y1="19.07" x2="7.05" y2="16.95" />
                <line x1="16.95" y1="7.05" x2="19.07" y2="4.93" />
              </g>
            </svg>
          </div>

          <div
            className="flex items-center justify-center"
            style={{ width: ICON_SIZE, height: ICON_SIZE }}
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              className={`transition-colors duration-200 ${
                themeMode === 'auto' ? 'text-white' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
              <polyline
                points="12,6 12,12 16,14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div
            className="flex items-center justify-center"
            style={{ width: ICON_SIZE, height: ICON_SIZE }}
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              className={`transition-colors duration-200 ${
                themeMode === 'dark' ? 'text-white' : 'text-indigo-500 dark:text-indigo-400'
              }`}
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" />
              <circle cx="19" cy="5" r="1.5" fill="currentColor" />
              <circle cx="22" cy="9" r="1" fill="currentColor" opacity="0.7" />
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
}
