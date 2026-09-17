import styles from './Button.module.css';
import { ButtonArrow } from './icons';
import { Link } from './transition/PageTransition';

import type { ReactNode } from 'react';

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  /** Opens in a new tab (external sites). */
  external?: boolean;
}

/** Pill button with a trailing arrow (States board: Primary / Secondary). */
export default function Button({
  href,
  children,
  variant = 'primary',
  className = '',
  external,
}: ButtonProps) {
  const cls = `${styles.button} ${styles[variant]} ${className}`;
  const content = (
    <>
      {children} <ButtonArrow />
    </>
  );
  if (href.startsWith('/')) {
    return (
      <Link href={href} className={cls}>
        {content}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={cls}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {content}
    </a>
  );
}
