import Image from 'next/image';
import { notFound } from 'next/navigation';

import { cardShape } from '@/components/BlobShapes';
import Button from '@/components/Button';
import ContactBand from '@/components/ContactBand';
import Decor from '@/components/decor/Decor';
import HandNote from '@/components/decor/HandNote';
import { BackArrow, CircleArrow } from '@/components/icons';
import Artboard from '@/components/layout/Artboard';
import ScreensCarousel from '@/components/project/ScreensCarousel';
import SectionHeading from '@/components/SectionHeading';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { Link } from '@/components/transition/PageTransition';
import Zoomable from '@/components/zoom/Zoomable';
import { twoDigits } from '@/lib/format';
import { pageMetadata } from '@/lib/metadata';
import {
  categoryLabel,
  coverImage,
  getNextProject,
  getProject,
  getProjects,
  screenImage,
  screenImageLarge,
} from '@/lib/projects';

import styles from './project.module.css';

import type { Project, TitleStyle } from '@/data/types';
import type { Metadata } from 'next';
import type { CSSProperties, ReactNode } from 'react';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProjects().map(project => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.name,
    description: project.summary,
    path: `/work/${slug}/`,
  });
}

const TITLE_CLASS: Record<TitleStyle, string> = {
  latin: '',
  'latin-long': styles.latinLong,
  cjk: styles.cjk,
  'cjk-long': styles.cjkLong,
};

function Label({ en, zh }: { en: string; zh: string }) {
  return (
    <span className={styles.label}>
      {en}
      <b>{zh}</b>
    </span>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <ul className={styles.tags}>
      {items.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function Numbered({ n }: { n: number }) {
  return <span className={styles.no}>{twoDigits(n)}</span>;
}

function Section({ children }: { children: ReactNode }) {
  return <section className={styles.section}>{children}</section>;
}

function Intro({ project }: { project: Project }) {
  const { live, repo } = project.links;
  return (
    <section className={styles.intro}>
      <div>
        <Link className={styles.back} href="/work/">
          <BackArrow />
          Back to Projects
        </Link>
        <p className={styles.kicker}>
          {categoryLabel(project)} · {project.year}
        </p>
        <h1 className={`${styles.name} ${TITLE_CLASS[project.titleStyle]}`}>{project.name}</h1>
        <p className={styles.nameEn}>{project.nameEn}</p>
        {project.type && <p className={styles.lead}>{project.type}</p>}
      </div>
      <div className={styles.introRight}>
        <HandNote
          className={styles.note}
          lines={['Small details,', 'big differences.']}
          indents={[0, 22]}
        />
        <Decor name="lf5" className={`${styles.leaf} drift`} />
        <p className={styles.body}>{project.summary}</p>
        {(live || repo) && (
          <div className={styles.cta}>
            {live && (
              <Button href={live} external>
                Live Site
              </Button>
            )}
            {repo && (
              <Button href={repo} variant="secondary" external>
                Repository
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function Facts({ project }: { project: Project }) {
  const facts = [
    { label: 'ROLE', value: project.role },
    { label: 'CLIENT', value: project.client },
    { label: 'YEAR', value: project.year },
    ...project.facts,
  ];
  return (
    <dl
      className={`${styles.facts} ${facts.length > 4 ? styles.factsWrap : ''}`}
      style={{ '--columns': facts.length } as CSSProperties}
    >
      {facts.map(fact => (
        <div key={fact.label}>
          <dt>{fact.label}</dt>
          <dd>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Overview({ project }: { project: Project }) {
  const wideFeatures = [3, 5, 6].includes(project.features.length);
  return (
    <Section>
      <SectionHeading title="Overview" zh="專案概述" />
      <div className={styles.overview}>
        <div className={styles.details}>
          {project.details.map(text => (
            <p key={text}>{text}</p>
          ))}
        </div>
        <div className={styles.side}>
          <Label en="TECH STACK" zh="使用技術" />
          <Tags items={project.tech} />
        </div>
      </div>
      <div className={styles.features}>
        <Label en="FEATURES" zh="產品功能" />
        <ul className={`${styles.featureList} ${wideFeatures ? styles.threeUp : styles.fourUp}`}>
          {project.features.map(feature => (
            <li key={feature.title}>
              <h3>{feature.title}</h3>
              {feature.description && <p>{feature.description}</p>}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function Contribution({ project }: { project: Project }) {
  return (
    <Section>
      <SectionHeading title="My Contribution" zh="我負責的事" />
      <ol
        className={`${styles.highlights} ${project.highlights.length === 3 ? styles.oneColumn : ''}`}
      >
        {project.highlights.map((text, k) => (
          <li key={text}>
            <Numbered n={k + 1} />
            <span>{text}</span>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Decisions({ project }: { project: Project }) {
  return (
    <Section>
      <SectionHeading title="Problems & Decisions" zh="問題與決策" />
      {project.context && <p className={styles.context}>{project.context}</p>}
      <div className={styles.challenges}>
        <Label en="CHALLENGES" zh="過程中處理的問題" />
        <ol className={styles.challengeList}>
          {project.challenges.map((challenge, k) => (
            <li key={challenge.text}>
              <Numbered n={k + 1} />
              <p>
                {challenge.text}
                {challenge.cases.map(n => (
                  <em key={n}>Case {twoDigits(n)}</em>
                ))}
              </p>
            </li>
          ))}
        </ol>
      </div>
      <ol className={styles.timeline}>
        {project.threads.map((thread, k) => (
          <li key={thread.title} className={styles.thread}>
            <p className={styles.when}>CASE {twoDigits(k + 1)}</p>
            <i className={styles.dot} />
            <div className={styles.threadBody}>
              <h3>{thread.title}</h3>
              <div className={thread.evidence ? styles.withEvidence : undefined}>
                <dl className={styles.fdr}>
                  <dt>Finding</dt>
                  <dd>{thread.finding}</dd>
                  <dt>Decision</dt>
                  <dd>{thread.decision}</dd>
                  <dt>Result</dt>
                  <dd className={styles.result}>{thread.result}</dd>
                </dl>
                {thread.evidence && (
                  <figure className={styles.evidence}>
                    <div className={styles.frame}>
                      <Zoomable
                        src={screenImageLarge(thread.evidence.name)}
                        label={thread.evidence.caption}
                        className={styles.picture}
                        style={{ aspectRatio: thread.evidence.ratio }}
                      >
                        <Image src={screenImage(thread.evidence.name)} alt="" fill sizes="340px" />
                      </Zoomable>
                    </div>
                    <figcaption>{thread.evidence.caption}</figcaption>
                  </figure>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function NextProject({ project }: { project: Project }) {
  return (
    <Link className={styles.next} href={`/work/${project.slug}/`}>
      <div className={styles.nextPicture} style={{ clipPath: cardShape(1) }}>
        <Image src={coverImage(project)} alt="" fill sizes="(max-width: 767px) 100vw, 440px" />
      </div>
      <div>
        <p className={styles.label}>
          NEXT PROJECT<b>下一個專案</b>
        </p>
        <p className={styles.nextName}>{project.name}</p>
        <p className={styles.nextEn}>{project.nameEn}</p>
        <p className={styles.nextSummary}>{project.summary}</p>
        <div className={styles.nextRow}>
          <Tags items={project.tech.slice(0, 3)} />
          <span className={styles.round}>
            <CircleArrow />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main id="main-content">
      <Artboard>
        <SiteHeader current="projects" />
        <Intro project={project} />
        <Facts project={project} />

        <div className={styles.hero}>
          <div className={styles.frame}>
            <Zoomable
              src={coverImage(project)}
              label={project.name}
              className={styles.picture}
              style={{ aspectRatio: 1.5 }}
            >
              <Image
                src={coverImage(project)}
                alt={project.name}
                fill
                sizes="(max-width: 767px) 100vw, 1100px"
                priority
              />
            </Zoomable>
            <span className={styles.tape} />
          </div>
        </div>

        <Overview project={project} />
        {project.screens.length > 0 && (
          <ScreensCarousel
            className={styles.section}
            screens={project.screens}
            ratio={project.screenRatio}
          />
        )}
        <Contribution project={project} />
        <Decisions project={project} />
        <NextProject project={getNextProject(slug)} />

        <ContactBand className={styles.contact} wideButtonOnMobile />
        <SiteFooter variant="page" />
      </Artboard>
    </main>
  );
}
