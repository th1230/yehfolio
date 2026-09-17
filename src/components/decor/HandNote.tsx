import styles from './HandNote.module.css';

import type { CSSProperties } from 'react';

interface HandNoteProps {
  lines: string[];
  /** Left indent of each line in px; tablets and phones may use their own. */
  indents: number[];
  tabletIndents?: number[];
  phoneIndents?: number[];
  /** Position, size and tilt on the artboard. */
  className: string;
}

/** A handwritten margin note; each line after the first is indented a little more. */
export default function HandNote({
  lines,
  indents,
  tabletIndents = indents,
  phoneIndents = indents,
  className,
}: HandNoteProps) {
  return (
    <p className={`${styles.note} ${className}`} aria-hidden="true">
      {lines.map((line, k) => {
        const style = {
          '--indent': `${indents[k]}px`,
          '--indent-tablet': `${tabletIndents[k]}px`,
          '--indent-phone': `${phoneIndents[k]}px`,
        } as CSSProperties;
        return (
          <span key={`${k}-${line}`} style={style}>
            {line}
          </span>
        );
      })}
    </p>
  );
}
