/**
 * 共用型別定義
 */

// 專案相關型別
export interface Project {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  technologies: string[];
  category: string;
  duration: string;
  role: string;
  achievements: string[];
  challenges: string[];
  images?: string[];
  liveUrl?: string;
  githubUrl?: string;
  features: string[];
}

// 技能相關型別
export interface SkillDetail {
  name: string;
  level: number;
  category: string;
  icon: string;
  description: string;
  applications: string;
  relatedLinks: string;
  color: string;
}

// 聯絡資訊型別
export interface ContactInfo {
  icon: string | React.ReactNode;
  title: string;
  value: string;
  link: string;
}

// 導航項目型別
export interface NavItem {
  name: string;
  href: string;
}

// 藝術元素型別（用於 Contact 頁面）
export interface ArtElement {
  id: number;
  left: number;
  top: number;
  size: number;
  rotation: number;
  duration: number;
  delay: number;
  type: string;
  color: string;
}

// 粒子型別
export interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
  moveX: number;
  moveY: number;
}
