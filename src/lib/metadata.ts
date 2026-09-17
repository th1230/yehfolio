import { SITE } from '@/data/site';

import type { Metadata } from 'next';

interface PageMetadataOptions {
  /** Page name; the home page leaves it out and uses the site title. */
  title?: string;
  description: string;
  /** Path with trailing slash, e.g. `/work/`. */
  path: string;
}

/** Title, description, canonical URL and share preview for one page. */
export function pageMetadata({ title, description, path }: PageMetadataOptions): Metadata {
  const shareTitle = title ? `${title} · ${SITE.name}` : SITE.title;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'zh_TW',
      siteName: SITE.name,
      url: path,
      title: shareTitle,
      description,
      images: [{ url: SITE.socialImage, width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description,
      images: [SITE.socialImage],
    },
  };
}
