import Image from 'next/image';

import { art, type ArtName } from '@/lib/images';

interface DecorProps {
  name: ArtName;
  /** Position and size, set by the page's CSS. */
  className?: string;
  priority?: boolean;
}

/** A decorative piece of artwork (leaves, lights, scenery); hidden from assistive technology. */
export default function Decor({ name, className, priority }: DecorProps) {
  return <Image className={className} {...art(name)} alt="" priority={priority} />;
}
