import Button from '@/components/Button';
import ContactBand from '@/components/ContactBand';
import Decor from '@/components/decor/Decor';
import HandNote from '@/components/decor/HandNote';
import Polaroid from '@/components/decor/Polaroid';
import { SkillIcon } from '@/components/icons';
import Artboard from '@/components/layout/Artboard';
import SectionHeading from '@/components/SectionHeading';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { CAREER } from '@/data/career';
import { SITE } from '@/data/site';
import { SKILLS } from '@/data/skills';
import { pageMetadata } from '@/lib/metadata';

import styles from './about.module.css';

import type { Metadata } from 'next';

export const metadata: Metadata = pageMetadata({
  title: 'About Me',
  description: 'A developer, a creator, and a traveler. 一個喜歡把想法變成作品的前端工程師。',
  path: '/about/',
});

export default function AboutPage() {
  return (
    <main id="main-content">
      <Artboard>
        <SiteHeader current="about" />

        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1>About Me</h1>
            <p className={styles.en}>A developer, a creator, and a traveler.</p>
            <p className={styles.lead}>一個喜歡把想法變成作品的前端工程師。</p>
            <p className={styles.body}>
              我叫
              Thomas，喜歡透過程式解決問題，也喜歡旅行、動畫、遊戲與各種有趣的創作。希望能做出真正有價值、讓人覺得「好用」的產品。
            </p>
            <div className={styles.actions}>
              <Button href="/work/">View My Work</Button>
              <Button href={`mailto:${SITE.email}`} variant="secondary">
                Get in Touch
              </Button>
            </div>
          </div>
          <div className={styles.heroArt}>
            <Decor name="a-boy" priority />
          </div>
          <HandNote
            className={styles.heroNote}
            lines={['Good Ideas', 'Good Days.']}
            indents={[0, 18]}
          />
        </section>

        <section className={styles.skills} aria-label="Skills">
          {SKILLS.map(skill => (
            <div key={skill.title} className={styles.skill}>
              <span className={styles.skillIcon}>
                <SkillIcon name={skill.icon} strokeWidth={1.4} />
              </span>
              <h2 className={styles.skillTitle}>
                {skill.title}
                <small>{skill.titleZh}</small>
              </h2>
              <p className={styles.skillText}>
                {skill.phrases.map(phrase => (
                  <span key={phrase}>{phrase}</span>
                ))}
              </p>
              <div className={styles.skillTags}>
                {skill.tagRows.map(row => (
                  <span key={row.join()} className={styles.tagRow}>
                    {row.map(tag => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className={styles.experience} aria-labelledby="experience-title">
          <SectionHeading id="experience-title" title="Experience" zh="工作經歷" />
          <ol className={styles.timeline}>
            {CAREER.map(job => (
              <li key={job.title} className={styles.job}>
                <p className={styles.when}>{job.period}</p>
                <i className={styles.dot} />
                <div className={styles.jobBody}>
                  <h3>{job.title}</h3>
                  <p className={styles.role}>{job.role}</p>
                  <p className={styles.summary}>{job.summary}</p>
                  <ul className={styles.tags}>
                    {job.tags.map(tag => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
          <Polaroid
            image="t-hero2"
            focus="18% 62%"
            className={styles.polaroidOne}
            tapeClassName={styles.tape}
          />
          <Polaroid image="k-rail" focus="40% 60%" className={styles.polaroidTwo} />
        </section>

        <ContactBand wideButtonOnMobile />
        <SiteFooter variant="page" />
      </Artboard>
    </main>
  );
}
