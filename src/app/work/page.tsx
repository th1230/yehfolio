import Image from 'next/image';

import Decor from '@/components/decor/Decor';
import HandNote from '@/components/decor/HandNote';
import Polaroid from '@/components/decor/Polaroid';
import Handwriting, { type HandChar } from '@/components/Handwriting';
import { ButtonArrow } from '@/components/icons';
import Artboard from '@/components/layout/Artboard';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import SocialLinks from '@/components/SocialLinks';
import ProjectBrowser from '@/components/work/ProjectBrowser';
import { SITE } from '@/data/site';
import { art } from '@/lib/images';
import { pageMetadata } from '@/lib/metadata';
import { getProjects } from '@/lib/projects';

import styles from './work.module.css';

import type { Metadata } from 'next';

export const metadata: Metadata = pageMetadata({
  title: 'Projects',
  description: 'Building products and ideas for a brighter tomorrow. 用程式，創造更自由的生活。',
  path: '/work/',
});

/** 有想法？一起聊聊吧。 — each Projects board nudges the letters a little differently. */
const TALK: Record<'desktop' | 'tablet' | 'phone', HandChar[][]> = {
  desktop: [
    [
      { c: '有', r: -2, y: 2 },
      { c: '想', r: 3, s: 0.95 },
      { c: '法', r: -3, y: -3, s: 1.04 },
      { c: '？', y: -8 },
    ],
    [
      { c: '一', y: 6, s: 1.1 },
      { c: '起', r: -3, y: 1 },
      { c: '聊', r: 2, y: -2, s: 0.96 },
      { c: '聊', r: -2, y: -5, s: 1.03 },
      { c: '吧', r: 3, y: -7, s: 0.95 },
      { c: '。', y: -9 },
    ],
  ],
  tablet: [
    [
      { c: '有', r: -2, y: 1.4 },
      { c: '想', r: 3, s: 0.95 },
      { c: '法', r: -3, y: -2.1, s: 1.04 },
      { c: '？', y: -5.7 },
    ],
    [
      { c: '一', y: 4.3, s: 1.1 },
      { c: '起', r: -3, y: 0.7 },
      { c: '聊', r: 2, y: -1.4, s: 0.96 },
      { c: '聊', r: -2, y: -3.6, s: 1.03 },
      { c: '吧', r: 3, y: -5, s: 0.95 },
      { c: '。', y: -6.4 },
    ],
  ],
  phone: [
    [
      { c: '有', r: -2, y: 2 },
      { c: '想', r: 3, s: 0.95 },
      { c: '法', r: -3, y: -3, s: 1.04 },
      { c: '？', y: -6 },
    ],
    [
      { c: '一', y: 4, s: 1.1 },
      { c: '起', r: -3, y: 1 },
      { c: '聊', r: 2, y: -2, s: 0.96 },
      { c: '聊', r: -2, y: -3, s: 1.03 },
      { c: '吧', r: 3, y: -5, s: 0.95 },
      { c: '。', y: -7 },
    ],
  ],
};

function Hero() {
  return (
    <>
      {/* Drawn 1440×860 on the artboard, cropped from the 1440×960 artwork. */}
      <Image
        className={styles.heroArt}
        src={art('p-hero').src}
        width={1440}
        height={860}
        alt=""
        priority
      />
      <svg
        className={`${styles.wave} from-tablet`}
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 120 C120 96 250 52 380 54 C560 58 690 110 840 104 C1000 98 1120 70 1262 74 C1350 78 1400 92 1440 100 L1440 300 L0 300 Z"
          fill="#FFFDF4"
        />
      </svg>
      <svg
        className={`${styles.wave} mobile-only`}
        viewBox="0 0 390 150"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 62 C40 50 80 30 124 32 C180 34 214 60 262 58 C312 56 352 42 390 46 L390 150 L0 150 Z"
          fill="#FFFDF4"
        />
      </svg>

      <h1 className={styles.title}>Projects</h1>
      <p className={styles.titleZh}>用程式，創造更自由的生活。</p>
      <p className={styles.titleEn}>
        Building products and ideas
        <br />
        for a brighter tomorrow.
      </p>
      <p className={`${styles.scroll} from-tablet`} aria-hidden="true">
        <i />
        <span>
          Scroll Down
          <svg width="10" height="22" viewBox="0 0 10 22" fill="none">
            <path d="M5 0v20M1 16l4 4 4-4" stroke="#2B3A4A" strokeWidth="1.2" />
          </svg>
        </span>
      </p>

      {/* Written on the paper tag hanging from the wind chime in the artwork. */}
      <p className={`${styles.tagNote} from-tablet`} aria-hidden="true">
        よい夏を。
      </p>
      <HandNote
        className={styles.ideas}
        lines={['Some ideas', 'can change', 'your tomorrow.']}
        indents={[0, 12, 24]}
        tabletIndents={[0, 8.5, 17.1]}
        phoneIndents={[0, 10, 20]}
      />
      <svg
        className={`${styles.sweep} from-tablet`}
        width="170"
        height="70"
        viewBox="0 0 170 70"
        fill="none"
        aria-hidden="true"
      >
        <path d="M2 66 C50 60 110 40 168 4" stroke="#70BCE0" strokeWidth="1" />
      </svg>
    </>
  );
}

function Contact() {
  return (
    <section className={styles.contact} aria-label="Contact">
      <span id="contact" className={styles.anchor} />
      <Handwriting
        lines={TALK.desktop}
        className={`${styles.hand} desktop-only`}
        lineClassNames={[styles.handFirst, styles.handSecond]}
      />
      <Handwriting
        lines={TALK.tablet}
        className={`${styles.hand} tablet-only`}
        lineClassNames={[styles.handFirst, styles.handSecond]}
      />
      <Handwriting
        lines={TALK.phone}
        className={`${styles.hand} mobile-only`}
        lineClassNames={[styles.handFirst, styles.handSecond]}
      />
      <p className={styles.lead}>
        Open to opportunities,
        <br />
        collaborations, or just a friendly hello.
      </p>
      <div className={styles.links}>
        <a className={styles.mail} href={`mailto:${SITE.email}`}>
          Get in Touch <ButtonArrow strokeWidth={1.3} />
        </a>
        <SocialLinks
          order={['email', 'github', 'linkedin']}
          classNames={{
            email: styles.iconMail,
            github: styles.iconGitHub,
            linkedin: styles.iconLinkedIn,
          }}
        />
      </div>

      <Polaroid image="sea" className={styles.polaroid} tapeClassName={styles.tape} />
      <HandNote
        className={`${styles.stories} from-tablet`}
        lines={['Same', 'Sky', 'Different', 'Stories.']}
        indents={[0, 8, 14, 24]}
        tabletIndents={[0, 5.7, 10, 17.1]}
      />
      <p className={`${styles.keep} from-tablet`}>
        <i aria-hidden="true" />
        Keep
        <br />
        Creating
        <br />
        Keep
        <br />
        Exploring.
      </p>
    </section>
  );
}

export default function WorkPage() {
  return (
    <main id="main-content">
      <Artboard>
        <SiteHeader current="projects" variant="overlay" />
        <div className={styles.canvas}>
          <Hero />
          <ProjectBrowser projects={getProjects()} />
          <HandNote
            className={styles.exploring}
            lines={['Still', 'Exploring...']}
            indents={[0, 10]}
            tabletIndents={[0, 7.1]}
            phoneIndents={[0, 8]}
          />
          <Contact />

          <Decor name="lf5" className={`${styles.leafContact} drift`} />
          <Decor name="lf13" className={`${styles.leafTitle} from-tablet drift drift-far`} />
          <Decor name="lf2" className={`${styles.leafLeft} from-tablet drift drift-far`} />
          <Decor name="lf6" className={`${styles.leafRight} from-tablet drift drift-far`} />
          <Decor name="leaf" className={`${styles.blurTop} from-tablet drift drift-far`} />
          <Decor name="leaf" className={`${styles.blurBottom} from-tablet drift drift-far`} />
        </div>
        <SiteFooter variant="projects" />
      </Artboard>
    </main>
  );
}
