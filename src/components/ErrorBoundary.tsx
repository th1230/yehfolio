'use client';

import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
          <div className="max-w-md text-center">
            <div className="mb-8 text-6xl">😕</div>
            <h1 className="text-outer-space dark:text-apricot mb-4 text-3xl font-bold">
              哎呀！出現錯誤了
            </h1>
            <p className="text-outer-space/80 dark:text-apricot/80 mb-8 text-lg">
              很抱歉，頁面載入時發生了問題。請重新整理頁面或稍後再試。
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-8 rounded-lg bg-red-50 p-4 text-left dark:bg-red-900/20">
                <summary className="cursor-pointer font-semibold text-red-600 dark:text-red-400">
                  錯誤詳情（開發模式）
                </summary>
                <pre className="mt-4 overflow-auto text-xs text-red-700 dark:text-red-300">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className="bg-sandy-brown hover:bg-sandy-brown/90 cursor-pointer rounded-lg px-8 py-3 font-medium text-white transition-colors"
            >
              重新整理頁面
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
