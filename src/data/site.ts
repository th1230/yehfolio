export const SITE = {
  url: 'https://portfolio.yehnext.com',
  name: 'Thomas',
  fullName: 'Thomas Yeh',
  title: 'Thomas｜Build things I love, for a brighter tomorrow.',
  description:
    '一個喜歡把想法變成作品的前端工程師。我叫 Thomas，喜歡透過程式解決問題，也喜歡旅行、動畫、遊戲與各種有趣的創作。',
  email: 'thomasyeayea@gmail.com',
  github: 'https://github.com/th1230',
  linkedin: 'https://www.linkedin.com/in/jtunn-yue-yeh',
  socialImage: '/images/social-card.jpg',
};

export type NavKey = 'home' | 'about' | 'projects' | 'contact';

export const NAV: { key: NavKey; label: string; labelZh: string; href: string }[] = [
  { key: 'home', label: 'Home', labelZh: '首頁', href: '/' },
  { key: 'about', label: 'About', labelZh: '關於我', href: '/about/' },
  { key: 'projects', label: 'Projects', labelZh: '作品', href: '/work/' },
  { key: 'contact', label: 'Contact', labelZh: '聯絡', href: '#contact' },
];
