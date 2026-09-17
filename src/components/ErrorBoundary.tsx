'use client';

import { Component, type ReactNode } from 'react';

import { SITE } from '@/data/site';

import styles from './ErrorBoundary.module.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <main id="main-content" className={styles.page}>
        <h1>這一頁暫時無法載入。</h1>
        <p>請重新整理再試一次，也可以直接寫信給我。</p>
        <button type="button" className={styles.button} onClick={() => window.location.reload()}>
          重新整理
        </button>
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </main>
    );
  }
}
