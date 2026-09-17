import { SITE } from '@/data/site';

import { GitHubIcon, LinkedInIcon, MailIcon } from './icons';
import styles from './SocialLinks.module.css';

import type { ReactNode } from 'react';

type Kind = 'github' | 'linkedin' | 'email';

const LINKS: Record<Kind, { label: string; href: string; icon: ReactNode; external: boolean }> = {
  github: { label: 'GitHub', href: SITE.github, icon: <GitHubIcon />, external: true },
  linkedin: { label: 'LinkedIn', href: SITE.linkedin, icon: <LinkedInIcon />, external: true },
  email: { label: 'Email', href: `mailto:${SITE.email}`, icon: <MailIcon />, external: false },
};

interface SocialLinksProps {
  /** The boards list the links in different orders. */
  order?: Kind[];
  className?: string;
  /** Per-link classes, for boards that place each icon on its own. */
  classNames?: Partial<Record<Kind, string>>;
}

/** GitHub, LinkedIn and email icon links (deep blue, coral on hover). */
export default function SocialLinks({
  order = ['github', 'linkedin', 'email'],
  className = '',
  classNames = {},
}: SocialLinksProps) {
  return order.map(kind => {
    const { label, href, icon, external } = LINKS[kind];
    return (
      <a
        key={kind}
        className={`${styles.link} ${className} ${classNames[kind] ?? ''}`}
        href={href}
        aria-label={label}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {icon}
      </a>
    );
  });
}
