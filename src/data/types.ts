export type ProjectCategory = 'commercial' | 'personal';

/** How large the project name is set on its detail page (short Latin names run largest). */
export type TitleStyle = 'latin' | 'latin-long' | 'cjk' | 'cjk-long';

interface Fact {
  label: string;
  value: string;
}

/** A product screenshot; `name` maps to /images/screens/{name}.webp and its -large copy. */
export interface Screen {
  name: string;
  label: string;
  labelEn: string;
}

interface Feature {
  title: string;
  description?: string;
}

interface Challenge {
  text: string;
  /** Case numbers (1-based) in `threads` this challenge is answered by. */
  cases: number[];
}

interface CaseThread {
  title: string;
  finding: string;
  decision: string;
  result: string;
  evidence?: { name: string; ratio: number; caption: string };
}

export interface Project {
  slug: string;
  name: string;
  nameEn: string;
  titleStyle: TitleStyle;
  category: ProjectCategory;
  year: string;
  /** One-line project type shown under the name; omitted when it would repeat the name. */
  type?: string;
  summary: string;
  role: string;
  client: string;
  /** Extra facts after role, client and year. */
  facts: Fact[];
  links: { live?: string; repo?: string };
  /** Three tags on the Projects page card. */
  cardTags: string[];
  /** Width / height of this project's screenshots. */
  screenRatio: number;
  screens: Screen[];
  details: string[];
  tech: string[];
  features: Feature[];
  highlights: string[];
  context?: string;
  challenges: Challenge[];
  threads: CaseThread[];
}

export interface CareerEntry {
  period: string;
  title: string;
  role: string;
  summary: string;
  tags: string[];
}

export interface Skill {
  icon: 'frontend' | 'backend' | 'ai-tools' | 'product';
  title: string;
  titleZh: string;
  /** About page description, kept in phrases so lines break between them. */
  phrases: string[];
  /** About page tags, two per row. */
  tagRows: string[][];
  /** One-line stack on the Home page. */
  short: string;
}
