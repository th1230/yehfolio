import styles from './Artboard.module.css';

import type { ReactNode } from 'react';

/**
 * A page drawn on the design's artboard (1440 / 1024 / 390 wide) and zoomed to the viewport width,
 * so the art-directed layouts keep their exact proportions on every screen.
 */
export default function Artboard({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={styles.frame}>
      <div className={`${styles.board} ${className}`}>{children}</div>
    </div>
  );
}
