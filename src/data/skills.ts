import type { Skill } from './types';

export const SKILLS: Skill[] = [
  {
    icon: 'frontend',
    title: 'Frontend',
    titleZh: '前端開發',
    phrases: ['打造產品介面與企業後台，', '重視型別安全與元件重用，', '也顧好載入效能。'],
    tagRows: [
      ['React', 'Next.js'],
      ['Vue', 'Angular'],
    ],
    short: 'React / Next.js',
  },
  {
    icon: 'backend',
    title: 'Backend',
    titleZh: '後端串接',
    phrases: ['建置 API 與資料邏輯，', '處理登入驗證、即時訊息', '與金流串接。'],
    tagRows: [
      ['Node.js', 'Express'],
      ['Prisma', 'PostgreSQL'],
    ],
    short: 'Node.js / Fastify',
  },
  {
    icon: 'ai-tools',
    title: 'AI Tools',
    titleZh: 'AI 協作',
    phrases: ['把 AI 帶進開發流程，', '調整 Prompt 與 Context，', '並以固定案例驗證產出。'],
    tagRows: [
      ['Codex', 'Copilot'],
      ['OpenAI API', 'SDD'],
    ],
    short: 'LLM / Automation',
  },
  {
    icon: 'product',
    title: 'Product',
    titleZh: '產品規劃',
    phrases: ['從需求、規格一路推進到上線，', '規劃專案架構與時程，', '並顧好 SEO 與效能。'],
    tagRows: [
      ['SEO', 'Lighthouse'],
      ['Docker', 'CI/CD'],
    ],
    short: 'Design / Planning',
  },
];
