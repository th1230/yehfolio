import ErrorBoundary from '@/components/ErrorBoundary';
import SeasonalBackground from '@/components/SeasonalBackground';
import { ThemeProvider } from '@/contexts/ThemeContext';

import type { Metadata } from 'next';

import './globals.css';

const baseUrl =
  process.env.NODE_ENV === 'production' ? 'https://portfolio.yehnext.com' : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Thomas Yeh Portfolio - Angular Frontend Developer',
  description:
    'Thomas Yeh 的個人作品集，專精於 Angular 開發，同時熟悉 React、Next.js、TypeScript 等前端技術。',
  keywords: [
    'Angular Developer',
    'Frontend Developer',
    'Angular',
    'TypeScript',
    'React',
    'Next.js',
    'JavaScript',
    'Web Development',
    'Portfolio',
    '前端工程師',
    'Angular 開發',
    '前端開發',
    'Thomas Yeh',
  ],
  authors: [{ name: 'Thomas Yeh' }],
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    url: baseUrl,
    title: 'Thomas Yeh Portfolio - Angular Frontend Developer',
    description: 'Thomas Yeh 的個人作品集，專精於 Angular 開發，展示技術專案和學習成果。',
    siteName: 'Yeh Portfolio',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Thomas Yeh Portfolio Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thomas Yeh Portfolio - Angular Frontend Developer',
    description: 'Thomas Yeh 的個人作品集，專精於 Angular 開發，展示技術專案和學習成果。',
    images: ['/images/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Thomas Yeh',
    jobTitle: 'Frontend Developer',
    description: '專精於 Angular 開發的前端工程師',
    url: baseUrl,
    sameAs: ['https://www.linkedin.com/in/jtunn-yue-yeh', 'https://github.com/th1230'],
    knowsAbout: ['Angular', 'TypeScript', 'React', 'Next.js', 'JavaScript', 'Web Development'],
    email: 'thomasyeayea@gmail.com',
  };

  return (
    <html lang="zh-TW">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="text-outer-space dark:bg-outer-space dark:text-fawn !overflow-x-hidden bg-gray-50">
        <ErrorBoundary>
          <ThemeProvider>
            <SeasonalBackground />
            {children}
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
