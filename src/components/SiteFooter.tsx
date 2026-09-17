import Signature from './Signature';
import styles from './SiteFooter.module.css';

interface SiteFooterProps {
  /** `home` and `page` sit on the pale band; `projects` floats on the Projects page paper. */
  variant: 'home' | 'page' | 'projects';
}

const year = 2026;

export default function SiteFooter({ variant }: SiteFooterProps) {
  const signature = <Signature className={styles.signature} />;

  if (variant === 'projects') {
    return (
      <footer className={`${styles.footer} ${styles.projects}`}>
        <span className={styles.sig}>{signature}</span>
        <span className={styles.divider} aria-hidden="true" />
        <small className={`${styles.role} from-tablet`}>
          Front-end Developer &nbsp;·&nbsp; A Brighter Tomorrow
        </small>
        <small className={`${styles.role} mobile-only`}>
          Front-end Developer · A Brighter Tomorrow
        </small>
        <small className={`${styles.copy} from-tablet`}>
          © {year} Thomas. All rights reserved. <i aria-hidden="true" />
        </small>
        <small className={`${styles.copy} mobile-only`}>
          © {year} Thomas. All rights reserved.
        </small>
      </footer>
    );
  }

  return (
    <footer className={`${styles.footer} ${styles.band} ${styles[variant]}`}>
      <span className={styles.sig}>{signature}</span>
      <small className={styles.copy}>© {year} Thomas. All rights reserved.</small>
      <p className={styles.keep}>
        {variant === 'home' ? (
          <>
            <span className="from-tablet">
              Keep creating. Keep exploring. <i aria-hidden="true" />
            </span>
            <span className="mobile-only">
              Keep creating.
              <br />
              Keep exploring.
            </span>
          </>
        ) : (
          <>
            Keep creating. Keep exploring. <i aria-hidden="true" />
          </>
        )}
      </p>
    </footer>
  );
}
