'use client';

import Image from 'next/image';
import { useRef, useState, type CSSProperties, type KeyboardEvent, type TouchEvent } from 'react';

import { twoDigits } from '@/lib/format';
import { screenImage, screenImageLarge } from '@/lib/projects';

import styles from './ScreensCarousel.module.css';
import SectionHeading from '../SectionHeading';
import Zoomable from '../zoom/Zoomable';

import type { Screen } from '@/data/types';

interface ScreensCarouselProps {
  screens: Screen[];
  /** Width / height of the screenshots. */
  ratio: number;
  className?: string;
}

function Arrow({ direction, small }: { direction: 'prev' | 'next'; small?: boolean }) {
  const d = direction === 'prev' ? 'M15 6H2M6.5 1.5 2 6l4.5 4.5' : 'M1 6h13M9.5 1.5 14 6l-4.5 4.5';
  return (
    <svg
      width={small ? 14 : 16}
      height={small ? 11 : 12}
      viewBox="0 0 16 12"
      fill="none"
      aria-hidden="true"
    >
      <path d={d} strokeWidth="1.4" />
    </svg>
  );
}

/** The red, yellow and green window buttons. */
function WindowDots() {
  return (
    <>
      <i />
      <i />
      <i />
    </>
  );
}

/** Product screenshots in a browser window: arrows and thumbnails on larger screens, swipe and dots on phones. */
export default function ScreensCarousel({ screens, ratio, className = '' }: ScreensCarouselProps) {
  const [index, setIndex] = useState(0);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const count = screens.length;
  const current = screens[index];

  const go = (wanted: number) => setIndex(Math.max(0, Math.min(count - 1, wanted)));

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    go(index + (event.key === 'ArrowLeft' ? -1 : 1));
  };
  const onTouchStart = (event: TouchEvent) => {
    const t = event.touches[0];
    touch.current = t ? { x: t.clientX, y: t.clientY } : null;
  };
  const onTouchEnd = (event: TouchEvent) => {
    const t = event.changedTouches[0];
    const start = touch.current;
    touch.current = null;
    if (!t || !start) return;
    const dx = t.clientX - start.x;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(t.clientY - start.y))
      go(index + (dx < 0 ? 1 : -1));
  };

  const arrows = (small?: boolean) =>
    (['prev', 'next'] as const).map(direction => {
      const off = direction === 'prev' ? index <= 0 : index >= count - 1;
      return (
        <button
          key={direction}
          type="button"
          className={`${styles.arrow} ${styles[direction]} ${off ? styles.off : ''}`}
          aria-label={direction === 'prev' ? '上一張' : '下一張'}
          aria-disabled={off}
          onClick={() => go(index + (direction === 'prev' ? -1 : 1))}
        >
          <Arrow direction={direction} small={small} />
        </button>
      );
    });

  return (
    <section
      className={`${styles.carousel} ${count === 1 ? styles.single : ''} ${className}`}
      style={{ '--ar': ratio } as CSSProperties}
      aria-roledescription="carousel"
      onKeyDown={onKeyDown}
    >
      <div className={styles.head}>
        <SectionHeading title="Screens" zh="產品畫面" />
        <p className={styles.count} aria-live="polite">
          <b>{twoDigits(index + 1)}</b>
          <span>/ {twoDigits(count)}</span>
        </p>
      </div>

      <div className={styles.mat}>
        <div className={styles.stage}>
          <span className={styles.tape} aria-hidden="true" />
          <div className={styles.window}>
            <div className={styles.bar} aria-hidden="true">
              <WindowDots />
              <div className={styles.url}>
                <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
                  <rect
                    x=".6"
                    y="4.2"
                    width="6.8"
                    height="5.2"
                    rx="1.2"
                    stroke="#8AA9B8"
                    strokeWidth="1.1"
                  />
                  <path d="M2 4.2V3a2 2 0 0 1 4 0v1.2" stroke="#8AA9B8" strokeWidth="1.1" />
                </svg>
                <span />
              </div>
            </div>
            <div className={styles.view} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
              {screens.map((screen, k) => (
                <Zoomable
                  key={screen.name}
                  src={screenImageLarge(screen.name)}
                  label={screen.label}
                  disabled={k !== index}
                  className={`${styles.shot} ${k === index ? styles.on : ''} ${k < index ? styles.before : ''}`}
                >
                  <Image
                    src={screenImage(screen.name)}
                    alt={screen.label}
                    fill
                    sizes="(max-width: 767px) 90vw, 70vw"
                    priority={k === 0}
                  />
                </Zoomable>
              ))}
            </div>
          </div>
          {arrows()}
        </div>

        <div className={styles.thumbs}>
          {screens.map((screen, k) => (
            <button
              key={screen.name}
              type="button"
              className={`${styles.thumb} ${k === index ? styles.on : ''}`}
              aria-pressed={k === index}
              aria-label={screen.label}
              onClick={() => go(k)}
            >
              <span className={styles.thumbWindow}>
                <span className={styles.thumbBar} aria-hidden="true">
                  <WindowDots />
                </span>
                <span className={styles.thumbImage}>
                  <Image src={screenImage(screen.name)} alt="" fill sizes="150px" />
                </span>
              </span>
              <span className={styles.label}>{screen.label}</span>
              <span className={styles.labelEn}>{screen.labelEn}</span>
            </button>
          ))}
        </div>

        <div className={styles.mobileNav}>
          <p className={styles.caption}>
            <b>{current.label}</b>
            <span>{current.labelEn}</span>
          </p>
          <div className={styles.mobileButtons}>{arrows(true)}</div>
        </div>
        <div className={styles.dots} aria-hidden="true">
          {screens.map((screen, k) => (
            <i key={screen.name} className={k === index ? styles.on : ''} />
          ))}
        </div>
      </div>
    </section>
  );
}
