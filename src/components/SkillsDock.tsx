'use client';

import gsap from 'gsap';
import Image from 'next/image';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

interface Skill {
  name: string;
  experience: string;
  category: string;
  icon: string;
  description: string;
}

const SKILLS_DATA: Skill[] = [
  {
    name: 'Angular',
    experience: '3+ 年實務經驗',
    category: '前端框架',
    icon: '/images/skills/Angular-Dark.svg',
    description:
      '具備多年 Angular 開發經驗，能以模組化架構建構企業級前後台系統，熟悉 RxJS 流程設計與表單驗證、依賴注入、狀態管理等核心功能。',
  },
  {
    name: 'React',
    experience: '1+ 年實務經驗',
    category: '前端框架',
    icon: '/images/skills/React-Dark.svg',
    description:
      '具備 React 開發經驗，能使用 Hooks 實作元件邏輯、處理狀態與表單交互，並結合路由與第三方套件完成中小型應用。',
  },
  {
    name: 'Vue',
    experience: '專案開發經驗',
    category: '前端框架',
    icon: '/images/skills/VueJS-Dark.svg',
    description:
      '能使用 Vue 3 Composition API 撰寫元件邏輯，搭配 Pinia 與 Vue Router 完成基本資料操作與畫面切換。',
  },
  {
    name: 'Next.js',
    experience: '專案開發經驗',
    category: '前端框架',
    icon: '/images/skills/NextJS-Dark.svg',
    description:
      '具備使用 Next.js App Router 架構開發前台應用的經驗，能處理動態路由、頁面資料載入與登入流程。',
  },
  {
    name: 'Nuxt.js',
    experience: '學習中',
    category: '前端框架',
    icon: '/images/skills/NuxtJS-Dark.svg',
    description:
      '具備 Nuxt 3 開發經驗，能透過頁面元件、AsyncData 與 Pinia 建構資料流程，處理使用者互動與簡易畫面更新。',
  },
  {
    name: 'JavaScript',
    experience: '3+ 年實務經驗',
    category: '程式語言',
    icon: '/images/skills/JavaScript.svg',
    description:
      '擅長使用 JavaScript 撰寫功能模組與邏輯結構，具備 ES6+ 語法應用、非同步處理與資料結構操作等實務經驗。',
  },
  {
    name: 'TypeScript',
    experience: '2+ 年實務經驗',
    category: '程式語言',
    icon: '/images/skills/TypeScript.svg',
    description:
      '在實務開發中使用 TypeScript 編寫模組與業務邏輯，習慣在設計階段建立明確的介面與資料型別。',
  },
  {
    name: 'Node.js',
    experience: '1+ 年實務經驗',
    category: '後端技術',
    icon: '/images/skills/NodeJS-Dark.svg',
    description:
      '具備 Node.js 實務開發經驗，能以模組化方式撰寫中小型應用的後端邏輯，處理非同步控制流程與錯誤攔截。',
  },
  {
    name: 'Express',
    experience: '1+ 年實務經驗',
    category: '後端技術',
    icon: '/images/skills/ExpressJS-Dark.svg',
    description:
      '能以 Express 架構撰寫後端服務，設計路由結構、實作中介層控制流程，整合驗證邏輯與錯誤處理。',
  },
  {
    name: 'MongoDB',
    experience: '專案開發經驗',
    category: '後端技術',
    icon: '/images/skills/MongoDB.svg',
    description: '可透過 Mongoose 操作 MongoDB 資料庫，建立資料模型與進行基本查詢與更新操作。',
  },
  {
    name: 'PostgreSQL',
    experience: '學習中',
    category: '後端技術',
    icon: '/images/skills/PostgreSQL-Dark.svg',
    description:
      '具備 PostgreSQL 操作經驗，能使用 Prisma 進行資料表建模與 CRUD 操作，理解資料關聯設計與基本查詢應用。',
  },
  {
    name: 'Git',
    experience: '3+ 年實務經驗',
    category: '開發工具',
    icon: '/images/skills/Git.svg',
    description:
      '熟練使用 Git 管理版本與分支，能進行合併、衝突處理與協作開發，並支援基本的 code review 流程。',
  },
  {
    name: 'Docker',
    experience: '1+ 年實務經驗',
    category: '開發工具',
    icon: '/images/skills/Docker.svg',
    description:
      '具備容器化實作經驗，能撰寫 Dockerfile 並封裝應用映像，完成前後端專案的打包與本地運行環境建置。',
  },
  {
    name: 'GitHub Actions',
    experience: '專案開發經驗',
    category: '開發工具',
    icon: '/images/skills/GithubActions-Dark.svg',
    description:
      '可使用 GitHub Actions 撰寫基本 CI/CD 工作流程，實現自動化測試、部署與格式檢查任務。',
  },
];

const DOCK_CONFIG = {
  min: 48,
  max: 96,
  baseSize: 48,
};

const SkillsDock = memo(() => {
  const dockRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const updateIcons = useCallback((pointer: number) => {
    const { min, max } = DOCK_CONFIG;
    const bound = min * Math.PI;

    itemRefs.current.forEach((item, i) => {
      if (!item) return;

      const distance = i * min + min / 2 - pointer;

      let x = 0;
      let scale = 1;

      if (-bound < distance && distance < bound) {
        const rad = (distance / min) * 0.5;
        scale = 1 + (max / min - 1) * Math.cos(rad);
        x = 2 * (max - min) * Math.sin(rad);
      } else {
        x = (distance > 0 ? 2 : -2) * (max - min);
      }

      gsap.to(item, {
        duration: 0.2,
        x,
        scale,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    });
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dockRef.current) return;

      const firstItem = itemRefs.current[0];
      if (!firstItem) return;

      const offset = dockRef.current.getBoundingClientRect().left + firstItem.offsetLeft;
      updateIcons(e.clientX - offset);
    },
    [updateIcons]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setActiveSkill(null);

    itemRefs.current.forEach(item => {
      if (!item) return;
      gsap.to(item, {
        duration: 0.3,
        scale: 1,
        x: 0,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    });
  }, []);

  const handleSkillHover = useCallback((skill: Skill) => {
    setActiveSkill(skill);
    setIsHovering(true);
  }, []);

  useEffect(() => {
    if (!dockRef.current) return;

    const items = itemRefs.current.filter(Boolean);
    gsap.fromTo(
      items,
      { scale: 0, y: 30, opacity: 0 },
      {
        scale: 1,
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.04,
        ease: 'back.out(1.7)',
      }
    );
  }, []);

  return (
    <div className="relative w-full">
      <div
        className={`mx-auto mb-10 min-h-[140px] max-w-xl transition-all duration-300 ${
          activeSkill ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {activeSkill && (
          <div className="border-sandy-brown/20 dark:border-apricot/20 dark:bg-outer-space/50 overflow-hidden rounded-2xl border bg-white/80 p-5 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="bg-sandy-brown/10 dark:bg-apricot/10 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl">
                <Image src={activeSkill.icon} alt={activeSkill.name} width={36} height={36} />
              </div>

              <div className="flex-1">
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <h3 className="text-outer-space dark:text-apricot text-lg font-bold">
                      {activeSkill.name}
                    </h3>
                    <span className="text-outer-space/60 dark:text-apricot/60 text-sm">
                      {activeSkill.category}
                    </span>
                  </div>
                  <span className="bg-sandy-brown/20 text-sandy-brown dark:bg-apricot/20 dark:text-apricot rounded-full px-3 py-1 text-sm font-medium">
                    {activeSkill.experience}
                  </span>
                </div>

                <p className="text-outer-space/70 dark:text-apricot/70 text-sm leading-relaxed">
                  {activeSkill.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {!activeSkill && (
          <div className="flex h-[140px] items-center justify-center">
            <p className="text-outer-space/40 dark:text-apricot/40">懸停技能圖標以查看詳情</p>
          </div>
        )}
      </div>

      <div className="relative mx-auto pt-12 pb-4">
        <div
          ref={dockRef}
          className="border-sandy-brown/10 dark:border-apricot/10 dark:bg-outer-space/40 relative mx-auto flex items-end justify-center gap-1.5 overflow-visible rounded-2xl border bg-white/60 px-5 backdrop-blur-md"
          style={{
            maxWidth: 'fit-content',
            height: DOCK_CONFIG.baseSize + 24,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/30 to-transparent dark:from-white/5" />

          {SKILLS_DATA.map((skill, index) => (
            <div
              key={skill.name}
              ref={el => {
                itemRefs.current[index] = el;
              }}
              className="group relative mb-3 flex cursor-pointer items-center justify-center"
              style={{
                width: DOCK_CONFIG.baseSize,
                height: DOCK_CONFIG.baseSize,
                transformOrigin: '50% 120%',
              }}
              onMouseEnter={() => handleSkillHover(skill)}
            >
              <div
                className={`flex h-full w-full items-center justify-center rounded-xl transition-colors duration-200 ${
                  isHovering && activeSkill?.name === skill.name
                    ? 'bg-sandy-brown/20 dark:bg-apricot/20'
                    : 'bg-outer-space/5 dark:bg-white/5'
                }`}
              >
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  width={28}
                  height={28}
                  className="pointer-events-none"
                />
              </div>

              <div
                className={`bg-outer-space dark:bg-apricot dark:text-outer-space absolute -top-8 left-1/2 z-50 -translate-x-1/2 rounded-lg px-2.5 py-1 text-xs font-medium whitespace-nowrap text-white transition-all duration-200 ${
                  isHovering && activeSkill?.name === skill.name
                    ? 'translate-y-0 opacity-100'
                    : 'pointer-events-none translate-y-2 opacity-0'
                }`}
              >
                {skill.name}
                <div className="bg-outer-space dark:bg-apricot absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45" />
              </div>

              <div
                className={`bg-sandy-brown dark:bg-apricot absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full transition-all duration-300 ${
                  isHovering && activeSkill?.name === skill.name ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className="pointer-events-none mx-auto h-4 rounded-b-2xl opacity-15"
        style={{
          width: 'calc(100% - 40px)',
          maxWidth: `${SKILLS_DATA.length * (DOCK_CONFIG.baseSize + 6) + 40}px`,
          background: 'linear-gradient(180deg, rgba(62, 78, 80, 0.15) 0%, transparent 100%)',
          transform: 'scaleY(-0.3)',
          filter: 'blur(2px)',
        }}
      />
    </div>
  );
});

SkillsDock.displayName = 'SkillsDock';
export default SkillsDock;
