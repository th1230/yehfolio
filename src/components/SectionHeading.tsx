import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  title: string;
  zh: string;
  id?: string;
}

/** Serif section title with an ocean dot, and its Chinese name below (About and project pages). */
export default function SectionHeading({ title, zh, id }: SectionHeadingProps) {
  return (
    <h2 id={id} className={styles.heading}>
      <span className={styles.title}>
        {title}
        <em />
      </span>
      <span className={styles.zh}>{zh}</span>
    </h2>
  );
}
