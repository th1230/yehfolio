import Image from 'next/image';

import { SITE } from '@/data/site';
import { art } from '@/lib/images';

/** The handwritten "Thomas" signature used as the site logo. */
export default function Signature({
  className,
  priority,
}: {
  className: string;
  priority?: boolean;
}) {
  return <Image className={className} {...art('sign')} alt={SITE.name} priority={priority} />;
}
