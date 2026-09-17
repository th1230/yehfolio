// Intrinsic sizes of the artwork in public/images/art (used by next/image).
const SIZES = {
  'a-boy': [1280, 853],
  'ct-flowers': [1280, 436],
  'ct-scene': [1600, 547],
  'e-arrow': [220, 158],
  'e-enter': [660, 242],
  'e-glow1': [440, 440],
  'e-glow2': [440, 440],
  'e-ring': [460, 445],
  'e-tagline': [900, 282],
  'entry-bg': [1536, 1024],
  hand2: [1400, 474],
  'hero-bg': [1440, 1799],
  'hero-window': [1440, 1799],
  'k-rail': [1200, 800],
  leaf: [620, 620],
  lf12: [113, 85],
  lf13: [113, 81],
  lf2: [376, 266],
  lf5: [251, 156],
  lf6: [258, 116],
  lf7: [213, 169],
  lf9: [140, 154],
  'p-hero': [1440, 960],
  sea: [1400, 788],
  shade: [780, 520],
  sign: [520, 245],
  't-hero2': [1280, 1024],
  'tag-sky': [200, 310],
} as const;

export type ArtName = keyof typeof SIZES;

export function art(name: ArtName) {
  const [width, height] = SIZES[name];
  return { src: `/images/art/${name}.webp`, width, height };
}

export const COVER_SIZE = { width: 1200, height: 800 } as const;
