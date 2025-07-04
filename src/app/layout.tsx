import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';

export const metadata: Metadata = {
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
    title: 'Yeh Portfolio - Angular Frontend Developer',
    description:
      'Thomas Yeh 的個人作品集，專精於 Angular 開發，展示技術專案和學習成果。',
    siteName: 'Yeh Portfolio',
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
  const isExportMode = process.env.EXPORT_MODE === 'true';

  return (
    <html lang="zh-TW">
      <head>
        <base href={isExportMode ? '/yehfolio' : '/'} />
      </head>
      <body className="text-outer-space dark:bg-outer-space dark:text-fawn !overflow-x-hidden bg-gray-50">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
