'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { NAV, SITE, type NavKey } from '@/data/site';
import { twoDigits } from '@/lib/format';

import Button from '../Button';
import Decor from '../decor/Decor';
import { CloseIcon } from '../icons';
import Signature from '../Signature';
import SocialLinks from '../SocialLinks';
import { useMenu } from './MenuContext';
import styles from './MobileMenu.module.css';
import { Link } from '../transition/PageTransition';

function currentKey(pathname: string): NavKey {
  if (pathname.startsWith('/work')) return 'projects';
  if (pathname.startsWith('/about')) return 'about';
  return 'home';
}

/** Full-screen frosted menu for tablet and phone (canvas "Menu" boards). */
export default function MobileMenu() {
  const { open, setOpen } = useMenu();
  const pathname = usePathname();
  const dialog = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const current = currentKey(pathname);

  useEffect(() => setOpen(false), [pathname, setOpen]);

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    root.classList.add('is-locked');
    closeButton.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
      if (event.key !== 'Tab' || !dialog.current) return;
      const items = [...dialog.current.querySelectorAll<HTMLElement>('a[href], button')];
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia('(min-width: 1280px)').matches) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      root.classList.remove('is-locked');
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      opener?.focus({ preventScroll: true });
    };
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      ref={dialog}
    >
      <div className={styles.board}>
        <Decor name="hero-window" className={styles.backdrop} />
        <div className={styles.veil} />

        <Link href="/" aria-label="Thomas — Home" className={styles.logoLink}>
          <Signature className={styles.logo} />
        </Link>
        <button
          type="button"
          ref={closeButton}
          className={styles.close}
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        >
          <CloseIcon />
        </button>

        <nav aria-label="Menu">
          <ul className={styles.links}>
            {NAV.map((item, index) => {
              const on = item.key === current;
              const content = (
                <>
                  <span className={styles.no}>{twoDigits(index + 1)}</span>
                  <span className={styles.title}>
                    {item.label}
                    {on && (
                      <svg
                        className={styles.swash}
                        viewBox="0 0 160 16"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 11 C30 6 70 5 104 7 S146 10 157 5"
                          fill="none"
                          stroke="#70BCE0"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    )}
                  </span>
                  <span className={styles.zh}>{item.labelZh}</span>
                </>
              );
              return (
                <li key={item.key} className={on ? styles.on : undefined}>
                  {item.href.startsWith('#') ? (
                    <a href={item.href} className={styles.link} onClick={() => setOpen(false)}>
                      {content}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className={styles.link}
                      aria-current={on ? 'page' : undefined}
                    >
                      {content}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.window} aria-hidden="true">
          <Decor name="hero-window" className={styles.windowImage} />
          <div className={styles.windowTag}>
            <Decor name="tag-sky" />
          </div>
        </div>
        <p className={styles.hand}>Where to next?</p>
        <Decor name="lf5" className={`${styles.leaf} drift`} />

        <div className={styles.foot}>
          <Button href={`mailto:${SITE.email}`} className={styles.button}>
            Get in Touch
          </Button>
          <div className={styles.icons}>
            <SocialLinks />
          </div>
        </div>
        <p className={styles.tag}>
          <i />A BRIGHTER TOMORROW.
        </p>
      </div>
    </div>
  );
}
