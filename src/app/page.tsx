import Image from 'next/image';

import { featureShape } from '@/components/BlobShapes';
import WindChime from '@/components/chime/WindChime';
import ContactBand from '@/components/ContactBand';
import Decor from '@/components/decor/Decor';
import HandNote from '@/components/decor/HandNote';
import Polaroid from '@/components/decor/Polaroid';
import EntryGate from '@/components/entry/EntryGate';
import HeroCopy from '@/components/home/HeroCopy';
import { LinkArrow, SkillIcon } from '@/components/icons';
import Artboard from '@/components/layout/Artboard';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { Link } from '@/components/transition/PageTransition';
import { SITE } from '@/data/site';
import { SKILLS } from '@/data/skills';
import { art } from '@/lib/images';
import { pageMetadata } from '@/lib/metadata';
import { coverImage, getFeaturedProjects } from '@/lib/projects';

import styles from './home.module.css';

import type { Metadata } from 'next';

export const metadata: Metadata = pageMetadata({ description: SITE.description, path: '/' });

function Petal({ className, opacity }: { className: string; opacity: number }) {
  return (
    <svg
      className={`${styles.petal} ${className} drift drift-near`}
      viewBox="0 0 34 16"
      aria-hidden="true"
    >
      <path d="M1 9 C8 1 22 -1 33 5 C25 13 12 16 1 9Z" fill="#70BCE0" opacity={opacity} />
    </svg>
  );
}

const CARD_CLASS = [styles.card1, styles.card2, styles.card3];

function Featured() {
  return (
    <section className={styles.featured} aria-labelledby="featured-title">
      <div className={`${styles.rail} desktop-only`} aria-hidden="true">
        <b />
        <i />
      </div>
      <HandNote
        className={`${styles.goodIdeas} desktop-only`}
        lines={['Good', 'Ideas', 'Good', 'Days.']}
        indents={[0, 2, 0, 3]}
      />
      <HandNote
        className={`${styles.goodIdeas} below-desktop`}
        lines={['Good Ideas', 'Good Days.']}
        indents={[0, 8]}
        phoneIndents={[0, 10]}
      />

      <h2 id="featured-title" className={styles.featuredTitle}>
        Featured Projects
      </h2>
      <i className={`${styles.titleLine} desktop-only`} aria-hidden="true" />
      <p className={styles.featuredText}>
        一些我做過的東西，
        <br />
        也在持續探索更多可能。
      </p>
      <Link className={styles.viewAll} href="/work/">
        View All <LinkArrow className="desktop-only" />
        <LinkArrow className="below-desktop" short />
      </Link>
      <p className={`${styles.kind} desktop-only`}>
        Keep building
        <br />a kinder internet.
      </p>

      <ul>
        {getFeaturedProjects().map((project, i) => (
          <li key={project.slug} className={CARD_CLASS[i]}>
            <Link className={styles.card} href={`/work/${project.slug}/`}>
              <span className={styles.blob}>
                <Image
                  src={coverImage(project)}
                  alt=""
                  fill
                  sizes="(max-width: 767px) 85vw, 260px"
                  style={{ clipPath: featureShape(i + 1) }}
                />
              </span>
              <span className={styles.cardTitle}>
                <span className={styles.cardName}>{project.name}</span>
                <span className={styles.cardEn}>{project.nameEn}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <HandNote
        className={`${styles.smallAgents} not-tablet`}
        lines={['Small', 'Agents', 'Big', 'Possibilities.']}
        indents={[0, 14, 28, 26]}
        phoneIndents={[0, 10, 20, 16]}
      />
      <div className={`${styles.based} desktop-only`} aria-hidden="true">
        <div>
          <b />
          <i />
        </div>
        <p>
          BASED
          <br />
          IN
          <br />
          TAIWAN
          <br />( ･ω･ )
        </p>
      </div>
      <svg
        className={`${styles.sweep} desktop-only`}
        width="460"
        height="240"
        viewBox="0 0 460 240"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M444 6 C410 88 330 150 190 196 C120 219 60 232 2 238"
          stroke="#B6D0D9"
          strokeWidth=".9"
        />
      </svg>

      <Petal className={styles.petal1} opacity={0.85} />
      <Petal className={`${styles.petal2} desktop-only`} opacity={0.8} />
      <Petal className={`${styles.petal3} desktop-only`} opacity={0.7} />
      <Decor name="lf9" className={`${styles.leafRail} not-tablet drift`} />
      <Decor name="lf5" className={`${styles.leafCards} from-tablet drift`} />
      <Decor name="lf2" className={`${styles.leafFar} desktop-only drift drift-far`} />
    </section>
  );
}

function AboutIntro() {
  return (
    <section className={styles.about} aria-labelledby="about-title">
      <h2 id="about-title" className={styles.aboutTitle}>
        About
        <br />
        Me
        <em />
      </h2>
      <div className={styles.dotline} aria-hidden="true">
        <i />
        <b />
      </div>
      <p className={styles.aboutLead}>
        一個喜歡把想法變成作品的
        <br />
        前端工程師。
      </p>
      <p className={`${styles.aboutBody} from-tablet`}>
        我叫 Thomas，
        <br />
        喜歡透過程式解決問題，
        <br />
        也喜歡旅行、動畫、遊戲與各種有趣的創作。
        <br />
        希望能做出真正有價值、讓人覺得「好用」的產品。
      </p>
      <p className={`${styles.aboutBody} mobile-only`}>
        我叫 Thomas，喜歡透過程式解決問題，
        <br />
        也喜歡旅行、動畫、遊戲與各種有趣的創作。
        <br />
        希望能做出真正有價值、
        <br />
        讓人覺得「好用」的產品。
      </p>
      <Link className={styles.moreAbout} href="/about/">
        More About Me <LinkArrow className="desktop-only" />
        <LinkArrow className="below-desktop" short />
      </Link>

      <div className={styles.panel}>
        <Decor name="a-boy" />
      </div>
      <Polaroid
        image="t-hero2"
        focus="18% 62%"
        className={styles.polaroid}
        tapeClassName={styles.tape}
      />
      <p className={styles.stillNote} aria-hidden="true">
        <span>まだ、</span>
        <span>やれることがある。</span>
      </p>

      <ul className={styles.skills} aria-label="Skills">
        {SKILLS.map(skill => (
          <li key={skill.title}>
            <SkillIcon name={skill.icon} />
            <h3>{skill.title}</h3>
            <p>{skill.short}</p>
          </li>
        ))}
      </ul>

      <Decor name="lf6" className={`${styles.leafAbout} desktop-only drift drift-far`} />
      <Decor name="lf12" className={`${styles.leafSmall} desktop-only drift`} />
      <Decor name="lf7" className={`${styles.leafPanel} desktop-only drift drift-far`} />
    </section>
  );
}

export default function Home() {
  return (
    <>
      <main id="main-content">
        <Artboard>
          <SiteHeader current="home" variant="overlay" />
          <div className={styles.canvas}>
            {/* Drawn 1440×1640 on the artboard, cropped from the 1440×1799 artwork. */}
            <Image
              className={styles.heroArt}
              src={art('hero-bg').src}
              width={1440}
              height={1640}
              alt=""
              priority
            />
            <WindChime className={styles.chime} withSound />
            <Decor name="shade" className={`${styles.light} ${styles.lightLeft} from-tablet`} />
            <Decor name="shade" className={`${styles.light} ${styles.lightRight} desktop-only`} />
            <HeroCopy heading />
            <Featured />
            <AboutIntro />
          </div>
          <ContactBand className={styles.contact} />
          <SiteFooter variant="home" />
        </Artboard>
      </main>
      <EntryGate />
    </>
  );
}
