import { GoogleAnalytics } from '@next/third-parties/google';

import BlobShapes from '@/components/BlobShapes';
import ErrorBoundary from '@/components/ErrorBoundary';
import { MenuProvider } from '@/components/menu/MenuContext';
import MobileMenu from '@/components/menu/MobileMenu';
import { PageTransitionProvider } from '@/components/transition/PageTransition';
import { SITE } from '@/data/site';

import { fontVariables } from './fonts';

import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import './globals.css';

const baseUrl = process.env.NODE_ENV === 'production' ? SITE.url : 'http://localhost:3000';

// Runs before first paint:
// - each breakpoint is drawn on a fixed artboard (1440 / 1024 / 390) and zoomed to the page width;
// - the entrance artboard is zoomed to cover the viewport (its artwork is 1050 / 895 / 982px tall);
// - visitors who already entered this session (or open /?home) skip the entrance.
const BOOT_SCRIPT = `(function(){var d=document.documentElement,s=d.style,B={desktop:[1440,1050],tablet:[1024,895],mobile:[390,982]};
try{if(sessionStorage.getItem('yehfolio-entered')||/[?&]home(=|&|$)/.test(location.search))d.classList.add('entered')}catch(e){}
function fit(){var w=d.clientWidth,h=window.innerHeight;for(var k in B){var z=Math.max(w/B[k][0],h/B[k][1]);
s.setProperty('--zoom-'+k,w/B[k][0]);s.setProperty('--entry-zoom-'+k,z);s.setProperty('--entry-height-'+k,h/z+'px')}}
fit();addEventListener('resize',fit);})();`;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFDF4',
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: { default: SITE.title, template: `%s · ${SITE.name}` },
  description: SITE.description,
  keywords: [
    'Frontend Engineer',
    'AI SDLC',
    'React',
    'Next.js',
    'Angular',
    'TypeScript',
    'Portfolio',
    '前端工程師',
    'Thomas Yeh',
  ],
  authors: [{ name: SITE.fullName }],
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.fullName,
    jobTitle: 'Frontend Engineer',
    url: baseUrl,
    sameAs: [SITE.linkedin, SITE.github],
    email: SITE.email,
  };

  // The boot script adds classes and variables to <html> before hydration.
  return (
    <html lang="zh-TW" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
        {/* Iansui (handwritten headlines) is not in next/font's catalogue yet. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Iansui&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          跳到主要內容
        </a>
        <BlobShapes />
        <PageTransitionProvider>
          <MenuProvider>
            <ErrorBoundary>{children}</ErrorBoundary>
            <MobileMenu />
          </MenuProvider>
        </PageTransitionProvider>
      </body>
      <GoogleAnalytics gaId="G-7VG0ZEBLL9" />
    </html>
  );
}
