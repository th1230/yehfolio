'use client';

import NextLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from 'react';

import styles from './PageTransition.module.css';

const WAVE_MS = 700;

type TransitionApi = { navigate: (href: string) => void };
const TransitionContext = createContext<TransitionApi>({ navigate: () => undefined });

export const pageLeaveEvent = 'site:leave';

/** Leaving a page: the white wave from the Projects hero sweeps up, then the next page fades in. */
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [going, setGoing] = useState(false);
  const timer = useRef(0);

  useEffect(() => {
    setGoing(false);
    window.clearTimeout(timer.current);
  }, [pathname]);

  const navigate = useCallback(
    (href: string) => {
      const path = href.split(/[?#]/)[0];
      if (path === pathname) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      document.dispatchEvent(new Event(pageLeaveEvent));
      setGoing(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(
        () => {
          router.push(href);
          window.scrollTo(0, 0);
        },
        reduced ? 0 : WAVE_MS
      );
    },
    [pathname, router]
  );

  const api = useMemo(() => ({ navigate }), [navigate]);

  return (
    <TransitionContext.Provider value={api}>
      {children}
      <div className={`${styles.wave} ${going ? styles.going : ''}`} aria-hidden="true">
        <svg viewBox="0 0 1440 160" preserveAspectRatio="none">
          <path
            d="M0 120 C120 96 250 52 380 54 C560 58 690 110 840 104 C1000 98 1120 70 1262 74 C1350 78 1400 92 1440 100 L1440 160 L0 160 Z"
            fill="#FFFDF4"
          />
        </svg>
        <div />
      </div>
    </TransitionContext.Provider>
  );
}

const usePageTransition = () => useContext(TransitionContext);

/**
 * next/link that plays the page-change wave for internal pages. The next page is fetched when the
 * visitor points at, focuses or touches the link rather than as soon as it is visible, so the
 * browser doesn't preload stylesheets the visitor may never use.
 */
export function Link({ onClick, href, ...props }: ComponentProps<typeof NextLink>) {
  const { navigate } = usePageTransition();
  const router = useRouter();
  const url = typeof href === 'string' ? href : (href.pathname ?? '/');
  const prefetch = () => router.prefetch(url);
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0)
      return;
    event.preventDefault();
    navigate(url);
  };
  return (
    <NextLink
      href={href}
      prefetch={false}
      onClick={handleClick}
      onMouseEnter={prefetch}
      onFocus={prefetch}
      onTouchStart={prefetch}
      {...props}
    />
  );
}
