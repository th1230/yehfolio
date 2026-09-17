'use client';

import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react';

import { coverImage } from '@/lib/projects';

import { cardShape } from '../BlobShapes';
import { CircleArrow } from '../icons';
import styles from './ProjectBrowser.module.css';
import { Link } from '../transition/PageTransition';

import type { Project, ProjectCategory } from '@/data/types';

type Filter = 'all' | ProjectCategory;

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'commercial', label: 'Commercial' },
  { key: 'personal', label: 'Personal' },
];

/** Blob shape of each card, in site order (Projects board). */
const SHAPES = [1, 2, 3, 4, 5, 6, 2, 3, 1];

const FADE_OUT_MS = 120;

const isFilter = (value: string | null): value is Filter => FILTERS.some(f => f.key === value);

/** Filter row and project cards: three columns on the artboard, one column on phones. */
export default function ProjectBrowser({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>('all');
  // Cards briefly fade out before the new selection fades in (States board: 120ms, then 40ms stagger).
  const [shown, setShown] = useState<Filter>('all');
  const [switching, setSwitching] = useState(false);
  const [animated, setAnimated] = useState(false);
  const timer = useRef(0);

  const bar = useRef<HTMLDivElement>(null);
  const buttons = useRef<Partial<Record<Filter, HTMLButtonElement | null>>>({});
  const [pill, setPill] = useState<CSSProperties | null>(null);

  const apply = useCallback((next: Filter, animate: boolean) => {
    setFilter(next);
    window.clearTimeout(timer.current);
    if (!animate) {
      setShown(next);
      return;
    }
    setSwitching(true);
    setAnimated(true);
    timer.current = window.setTimeout(() => {
      setShown(next);
      setSwitching(false);
    }, FADE_OUT_MS);
  }, []);

  useEffect(() => {
    const category = new URLSearchParams(window.location.search).get('category');
    if (isFilter(category)) apply(category, false);
    return () => window.clearTimeout(timer.current);
  }, [apply]);

  const choose = (next: Filter) => {
    if (next === filter) return;
    apply(next, true);
    const url = new URL(window.location.href);
    if (next === 'all') url.searchParams.delete('category');
    else url.searchParams.set('category', next);
    window.history.replaceState(window.history.state, '', url);
  };

  // The pill covers the All button as drawn. Around the other labels it leaves half the gap to
  // the divider on each side, so it never touches a divider. Measured again when the row changes
  // size (web fonts arriving, another breakpoint).
  useLayoutEffect(() => {
    const row = bar.current;
    const all = buttons.current.all;
    const active = buttons.current[filter];
    if (!row || !all || !active) return;
    const measure = () => {
      // Boxes are in zoomed pixels; the pill is positioned in artboard pixels.
      const scale = all.getBoundingClientRect().width / parseFloat(getComputedStyle(all).width);
      const divider = active.previousElementSibling;
      const pad =
        active === all || !divider ? 0 : parseFloat(getComputedStyle(divider).marginRight) / 2;
      const box = active.getBoundingClientRect();
      setPill({
        left: (box.left - row.getBoundingClientRect().left) / scale - pad,
        width: box.width / scale + pad * 2,
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    return () => observer.disconnect();
  }, [filter]);

  let order = 0;
  return (
    <>
      <div ref={bar} className={styles.filter} role="group" aria-label="Filter projects">
        {pill && <span className={styles.pill} style={pill} aria-hidden="true" />}
        {FILTERS.map(({ key, label }, k) => (
          <FilterButton
            key={key}
            ref={el => {
              buttons.current[key] = el;
            }}
            label={label}
            pressed={filter === key}
            isAll={key === 'all'}
            hasPill={!!pill}
            divider={k > 0}
            onClick={() => choose(key)}
          />
        ))}
      </div>

      <ul className={styles.cards}>
        {projects.map((project, i) => {
          const match = shown === 'all' || project.category === shown;
          const out = switching || !match;
          let state = '';
          if (out) state = styles.out;
          else if (animated) state = styles.in;
          const style = {
            '--n': i,
            '--row': Math.floor(i / 3),
            '--i': match ? order++ : 0,
          } as CSSProperties;
          return (
            <li
              key={`${project.slug}-${shown}`}
              className={`${styles.card} ${styles[`col${i % 3}`]} ${state}`}
              style={style}
            >
              <Link
                className={styles.link}
                href={`/work/${project.slug}/`}
                tabIndex={out ? -1 : undefined}
              >
                <span className={styles.picture}>
                  <Image
                    src={coverImage(project)}
                    alt=""
                    fill
                    sizes="(max-width: 767px) 90vw, 420px"
                    style={{ clipPath: cardShape(SHAPES[i % SHAPES.length]) }}
                  />
                </span>
                <span className={styles.title}>
                  <span className={styles.name}>{project.name}</span>
                  <span className={styles.nameEn}>{project.nameEn}</span>
                </span>
                <span className={styles.row}>
                  <span className={styles.tags}>
                    {project.cardTags.map(tag => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </span>
                  <span className={styles.arrow}>
                    <CircleArrow />
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

interface FilterButtonProps {
  ref: (el: HTMLButtonElement | null) => void;
  label: string;
  pressed: boolean;
  isAll: boolean;
  hasPill: boolean;
  divider: boolean;
  onClick: () => void;
}

function FilterButton({
  ref,
  label,
  pressed,
  isAll,
  hasPill,
  divider,
  onClick,
}: FilterButtonProps) {
  const cls = [
    styles.option,
    isAll && styles.all,
    pressed && styles.pressed,
    hasPill && styles.withPill,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <>
      {divider && <i className={styles.divider} aria-hidden="true" />}
      <button ref={ref} type="button" className={cls} aria-pressed={pressed} onClick={onClick}>
        <span>{label}</span>
      </button>
    </>
  );
}
