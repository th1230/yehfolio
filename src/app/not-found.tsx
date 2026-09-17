import Button from '@/components/Button';

import styles from './not-found.module.css';

import type { Metadata } from 'next';

export const metadata: Metadata = { title: '找不到頁面' };

export default function NotFound() {
  return (
    <main id="main-content" className={styles.page}>
      <span className={styles.code}>404</span>
      <h1>這一頁不在這裡。</h1>
      <p className={styles.note}>Same sky, different page.</p>
      <Button href="/">Back to Home</Button>
    </main>
  );
}
