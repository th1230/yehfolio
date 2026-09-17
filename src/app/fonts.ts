// The canvas font stacks have no metric-adjusted fallbacks: without them, characters a font lacks
// (such as → in EB Garamond) fall through to the next family in the stack, as in the design.
import {
  Cormorant_Garamond,
  EB_Garamond,
  Klee_One,
  Noto_Serif_JP,
  Noto_Serif_TC,
  Nothing_You_Could_Do,
  Zen_Kaku_Gothic_New,
} from 'next/font/google';

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-eb',
  adjustFontFallback: false,
});
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: '500',
  variable: '--font-cormorant',
  adjustFontFallback: false,
});
const notoSerifTC = Noto_Serif_TC({
  weight: ['400', '500', '600'],
  variable: '--font-tc',
  adjustFontFallback: false,
  preload: false,
});
const notoSerifJP = Noto_Serif_JP({
  weight: '400',
  variable: '--font-jp',
  adjustFontFallback: false,
  preload: false,
});
const zenKaku = Zen_Kaku_Gothic_New({
  weight: '500',
  variable: '--font-zen',
  adjustFontFallback: false,
  preload: false,
});
const kleeOne = Klee_One({
  weight: '400',
  variable: '--font-klee',
  adjustFontFallback: false,
  preload: false,
});
const nothingYouCouldDo = Nothing_You_Could_Do({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-note',
  adjustFontFallback: false,
});

export const fontVariables = [
  ebGaramond,
  cormorant,
  notoSerifTC,
  notoSerifJP,
  zenKaku,
  kleeOne,
  nothingYouCouldDo,
]
  .map(font => font.variable)
  .join(' ');
