'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

import styles from './Handwriting.module.css';

/** One handwritten character with its own nudge, tilt and scale (Motion board: 手寫標題逐字出現). */
export type HandChar = { c: string; y?: number; r?: number; s?: number };

interface HandwritingProps {
  lines: HandChar[][];
  className?: string;
  lineClassName?: string;
  /** One class per line, for layouts that place every line on its own; wraps the first line too. */
  lineClassNames?: string[];
  /** Index of the first character, when one headline is split across elements. */
  delayOffset?: number;
}

export default function Handwriting({
  lines,
  className = '',
  lineClassName = '',
  lineClassNames,
  delayOffset = 0,
}: HandwritingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Measured on scroll: IntersectionObserver misplaces targets inside zoomed artboards.
    let frame = 0;
    const check = () => {
      frame = 0;
      if (el.getClientRects().length && el.getBoundingClientRect().top < window.innerHeight - 24) {
        setShown(true);
        stop();
      }
    };
    const queue = () => {
      frame ||= requestAnimationFrame(check);
    };
    const stop = () => {
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
    };
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    queue();
    return () => {
      stop();
      cancelAnimationFrame(frame);
    };
  }, []);

  let index = delayOffset;
  const label = lines.map(line => line.map(ch => ch.c).join('')).join('');
  return (
    <div
      ref={ref}
      className={`${styles.hand} ${shown ? styles.shown : ''} ${className}`}
      aria-label={label}
      role="heading"
      aria-level={2}
    >
      {lines.map((line, n) => {
        const chars = line.map(ch => {
          const style = {
            '--y': ch.y ? `${ch.y}px` : undefined,
            '--r': ch.r ? `${ch.r}deg` : undefined,
            '--s': ch.s,
            '--k': index++,
          } as CSSProperties;
          return (
            <span key={`${n}-${index}`} className={styles.char} style={style} aria-hidden="true">
              {ch.c}
            </span>
          );
        });
        if (lineClassNames) {
          return (
            <span key={n} className={lineClassNames[n]}>
              {chars}
            </span>
          );
        }
        return n === 0 ? (
          chars
        ) : (
          <span key={n} className={`${styles.line} ${lineClassName}`}>
            {chars}
          </span>
        );
      })}
    </div>
  );
}

/** 有想法？一起聊聊吧。 */
export const TALK_LINES: HandChar[][] = [
  [
    { c: '有', r: -2, y: 2 },
    { c: '想', r: 3, s: 0.95 },
    { c: '法', r: -3, y: -3, s: 1.04 },
    { c: '？', y: -7 },
  ],
  [
    { c: '一', y: 5, s: 1.1 },
    { c: '起', r: -3, y: 1 },
    { c: '聊', r: 2, y: -2, s: 0.96 },
    { c: '聊', r: -2, y: -4, s: 1.03 },
    { c: '吧', r: 3, y: -6, s: 0.95 },
    { c: '。', y: -8 },
  ],
];
