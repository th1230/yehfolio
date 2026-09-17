import Image from 'next/image';

import { art } from '@/lib/images';

import styles from './HeroCopy.module.css';

interface HeroCopyProps {
  /** Extra classes per piece, used by the entrance to stagger their arrival. */
  animate?: { bright?: string; hand?: string; english?: string; scroll?: string };
  /** The Home page renders the real heading; the entrance copy is decorative. */
  heading?: boolean;
}

/** Hero text over the window illustration (Home first screen). */
export default function HeroCopy({ animate = {}, heading = false }: HeroCopyProps) {
  const HandTag = heading ? 'h1' : 'div';
  return (
    <>
      <div className={`${styles.bright} ${animate.bright ?? ''} from-tablet`}>
        <i />
        <p>
          A<br />
          BRIGHTER
          <br />
          TOMORROW.
        </p>
      </div>
      <HandTag className={`${styles.hand} ${animate.hand ?? ''}`}>
        <Image
          className={styles.handImage}
          {...art('hand2')}
          alt="用程式，創造更自由的生活。"
          priority={heading}
        />
      </HandTag>
      <p className={`${styles.english} ${animate.english ?? ''}`}>
        Build things I love,
        <br />
        for a brighter tomorrow.
      </p>
      <div className={`${styles.scroll} ${animate.scroll ?? ''} from-tablet`} aria-hidden="true">
        <span>Scroll</span>
        <svg className="desktop-only" width="10" height="100" viewBox="0 0 10 100" fill="none">
          <path d="M5 0V98M1.5 92 5 98.5 8.5 92" stroke="#2B3A4A" strokeWidth="1" />
        </svg>
        <svg className="tablet-only" width="10" height="80" viewBox="0 0 10 80" fill="none">
          <path d="M5 0V78M1.5 72 5 78.5 8.5 72" stroke="#2B3A4A" strokeWidth="1" />
        </svg>
      </div>
    </>
  );
}
