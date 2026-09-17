import { SITE } from '@/data/site';

import Button from './Button';
import styles from './ContactBand.module.css';
import Decor from './decor/Decor';
import Handwriting, { TALK_LINES } from './Handwriting';
import SocialLinks from './SocialLinks';

interface ContactBandProps {
  /** Page-specific spacing above the band. */
  className?: string;
  /** About and project pages stretch the button on phones. */
  wideButtonOnMobile?: boolean;
}

/** Shared contact band: handwritten line and links on the left, the railway scene fading in on the right. */
export default function ContactBand({
  className = '',
  wideButtonOnMobile = false,
}: ContactBandProps) {
  return (
    <section id="contact" className={`${styles.band} ${className}`} aria-label="Contact">
      <div className={styles.art} aria-hidden="true">
        <Decor name="ct-scene" className={styles.scene} />
        <Decor name="ct-flowers" className={styles.flowers} />
        <Decor name="ct-flowers" className={styles.leaf} />
      </div>
      <div className={styles.text}>
        <Handwriting
          lines={TALK_LINES}
          className={styles.headline}
          lineClassName={styles.secondLine}
        />
        <p className={styles.lead}>
          Open to opportunities,
          <br />
          collaborations, or just a friendly hello.
        </p>
        <div className={styles.actions}>
          <Button
            href={`mailto:${SITE.email}`}
            className={`${styles.button} ${wideButtonOnMobile ? styles.wide : ''}`}
          >
            Get in Touch
          </Button>
          <SocialLinks className={styles.icon} />
        </div>
      </div>
    </section>
  );
}
