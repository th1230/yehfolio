import Image from 'next/image';

import { art, type ArtName } from '@/lib/images';

import styles from './Polaroid.module.css';

interface PolaroidProps {
  image: ArtName;
  /** object-position of the photo inside the frame. */
  focus?: string;
  /** Position, size, padding and tilt on the artboard. */
  className: string;
  /** Position of the strip of tape; no tape when omitted. */
  tapeClassName?: string;
}

/** A pasted photo that straightens and lifts on hover (States board). */
export default function Polaroid({ image, focus, className, tapeClassName }: PolaroidProps) {
  return (
    <div className={`${styles.polaroid} ${className}`} aria-hidden="true">
      <Image {...art(image)} alt="" style={focus ? { objectPosition: focus } : undefined} />
      {tapeClassName && <span className={`${styles.tape} ${tapeClassName}`} />}
    </div>
  );
}
