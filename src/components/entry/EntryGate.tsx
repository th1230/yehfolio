'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { art, COVER_SIZE } from '@/lib/images';
import { coverImage, getFeaturedProjects } from '@/lib/projects';

import { featureShape } from '../BlobShapes';
import { allowSound, entryStartEvent } from '../chime/chimeSound';
import WindChime from '../chime/WindChime';
import Decor from '../decor/Decor';
import HandNote from '../decor/HandNote';
import HeroCopy from '../home/HeroCopy';
import { LinkArrow } from '../icons';
import SiteHeader from '../SiteHeader';
import styles from './EntryGate.module.css';

const STORAGE_KEY = 'yehfolio-entered';
const LEAVE_MS = 500;
type Phase = 'idle' | 'going' | 'home';

/**
 * Glass-door entrance over Home, once per session: Enter pushes the camera through the door
 * into the window view, which becomes the Home hero, then the Home text arrives.
 */
export default function EntryGate() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);
  const enterButton = useRef<HTMLButtonElement>(null);

  // The page behind stays locked and inert until the entrance is gone.
  useEffect(() => {
    if (done) return;
    const root = document.documentElement;
    if (root.classList.contains('entered')) {
      setDone(true);
      return;
    }
    root.classList.add('is-locked');
    window.scrollTo(0, 0);
    const behind = [...document.querySelectorAll<HTMLElement>('main, .skip-link')];
    behind.forEach(el => (el.inert = true));
    enterButton.current?.focus({ preventScroll: true });
    return () => {
      root.classList.remove('is-locked');
      behind.forEach(el => (el.inert = false));
    };
  }, [done]);

  useEffect(() => {
    if (phase !== 'going') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const narrow = window.matchMedia('(max-width: 767.98px)').matches;
    let arrive = narrow ? 3050 : 2800;
    if (reduced) arrive = 700;
    const timer = window.setTimeout(() => {
      setPhase('home');
      setLeaving(true);
    }, arrive);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (!leaving) return;
    const timer = window.setTimeout(() => {
      try {
        sessionStorage.setItem(STORAGE_KEY, '1');
      } catch {
        /* private mode: the entrance shows again next visit */
      }
      document.documentElement.classList.add('entered');
      setDone(true);
    }, LEAVE_MS);
    return () => window.clearTimeout(timer);
  }, [leaving]);

  if (done) return null;

  const enter = () => {
    if (phase !== 'idle') return;
    allowSound();
    document.dispatchEvent(new Event(entryStartEvent));
    setPhase('going');
  };
  const [first] = getFeaturedProjects();

  return (
    <div
      className={`${styles.gate} ${leaving ? styles.leaving : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome"
    >
      <div className={styles.fit}>
        <div
          className={`${styles.stage} ${phase === 'going' ? styles.phaseGoing : ''} ${phase === 'home' ? styles.phaseHome : ''}`}
        >
          <div className={styles.camera}>
            <Decor name="entry-bg" className={styles.entryImage} priority />
            <div className={styles.sweep} aria-hidden="true" />
            <div className={styles.homeLayer} aria-hidden="true">
              <div className={`${styles.homePaper} mobile-only`} />
              <div className={styles.homeBox}>
                <Decor name="hero-bg" className={styles.homeArt} priority />
                <WindChime className={styles.homeChime} />
              </div>
            </div>
          </div>
          <div className={styles.depth} aria-hidden="true" />
          <div className={styles.bloom} aria-hidden="true" />
          <div className={styles.glow} aria-hidden="true" />

          <div className={styles.arrival} aria-hidden="true" inert>
            <div className={styles.u1}>
              <SiteHeader current="home" variant="overlay" />
            </div>
            <HeroCopy
              animate={{
                bright: styles.u2,
                hand: styles.write,
                english: styles.u3,
                scroll: styles.u4,
              }}
            />
            <div className={`${styles.featured} ${styles.u4} mobile-only`}>
              <p className={styles.featuredTitle}>Featured Projects</p>
              <p className={styles.featuredText}>
                一些我做過的東西，
                <br />
                也在持續探索更多可能。
              </p>
              <p className={styles.featuredMore}>
                View All <LinkArrow short />
              </p>
              <div className={styles.featuredBlob}>
                <Image
                  src={coverImage(first)}
                  {...COVER_SIZE}
                  alt=""
                  style={{ clipPath: featureShape(1) }}
                />
              </div>
              <HandNote
                className={styles.featuredNote}
                lines={['Good Ideas', 'Good Days.']}
                indents={[0, 10]}
              />
            </div>
          </div>

          <div className={styles.cta}>
            <button
              ref={enterButton}
              type="button"
              className={styles.badge}
              aria-label="Enter the site"
              onClick={enter}
            >
              <span className={styles.softFocus} />
              <span className={`${styles.glowRing} ${styles.glowA}`}>
                <Decor name="e-glow1" />
              </span>
              <span className={`${styles.glowRing} ${styles.glowB}`}>
                <Decor name="e-glow2" />
              </span>
              <span className={styles.frost} />
              <span className={styles.burst} />
              <Decor name="e-ring" className={styles.ring} />
              <Image className={styles.label} {...art('e-enter')} alt="Enter" priority />
              <span className={styles.arrow}>
                <Decor name="e-arrow" />
              </span>
            </button>
            <Image
              className={styles.tagline}
              {...art('e-tagline')}
              alt="Step into a kinder tomorrow."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
