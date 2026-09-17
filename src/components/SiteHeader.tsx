import { NAV, type NavKey } from '@/data/site';

import MenuButton from './menu/MenuButton';
import Signature from './Signature';
import styles from './SiteHeader.module.css';
import { Link } from './transition/PageTransition';

interface SiteHeaderProps {
  current: NavKey;
  /** `overlay` sits on top of a hero image; `bar` reserves its own height above the page. */
  variant?: 'overlay' | 'bar';
}

export default function SiteHeader({ current, variant = 'bar' }: SiteHeaderProps) {
  return (
    <header className={`${styles.header} ${styles[variant]}`}>
      <Link href="/" className={styles.logoLink} aria-label="Thomas — Home">
        <Signature className={styles.logo} priority />
      </Link>
      <nav className={styles.nav} aria-label="Main">
        {NAV.map(item => {
          const on = item.key === current;
          const cls = on ? `${styles.navLink} ${styles.on}` : styles.navLink;
          return item.href.startsWith('#') ? (
            <a key={item.key} href={item.href} className={cls}>
              {item.label}
            </a>
          ) : (
            <Link
              key={item.key}
              href={item.href}
              className={cls}
              aria-current={on ? 'page' : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <p className={styles.tagline} lang="ja">
        <span>どこかで、</span>
        <span>きっと、また。</span>
      </p>
      <MenuButton className={styles.menuButton} />
    </header>
  );
}
