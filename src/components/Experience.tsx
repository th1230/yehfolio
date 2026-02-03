'use client';

import gsap from 'gsap';
import { useRef, useState, useEffect } from 'react';

import { useReducedMotion, useInView } from '@/utils/animations';

import GradientTitle from './GradientTitle';

interface TimelineEvent {
  period: string;
  title: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgCard1Ref = useRef<HTMLDivElement>(null);
  const bgCard2Ref = useRef<HTMLDivElement>(null);

  const getTimelineDotClassName = (isActive: boolean, isPast: boolean) => {
    if (isActive) {
      return 'border-sandy-brown bg-sandy-brown shadow-md shadow-sandy-brown/30 dark:border-fawn dark:bg-fawn dark:shadow-fawn/30';
    }
    if (isPast) {
      return 'border-fawn bg-fawn dark:border-apricot dark:bg-apricot';
    }
    return 'border-outer-space/20 bg-white dark:border-apricot/30 dark:bg-outer-space';
  };

  const timelineEvents: TimelineEvent[] = [
    {
      period: '2025',
      title: '人事系統功能擴充與架構升級',
      description: '負責企業內部人資平台的功能擴充與架構升級，提升整體系統維護性與可擴展性',
      technologies: [
        'Angular 11 → 19',
        'TypeScript',
        'RxJS',
        'Angular Material',
        'Kendo UI',
        'Angular Signal',
      ],
      achievements: [
        '開發客製化考試模組與擴充型共用元件',
        '完成從 Angular 11 升級至 Angular 19 的架構調整與套件更新',
        '重構多處舊有程式結構，提升開發一致性與效能',
      ],
    },
    {
      period: '2024 – 2025',
      title: '智慧投資資訊平台（第三階段開發）',
      description:
        '擴充金融投資平台功能，負責多個分類模組的整合與錯誤修正，提升整體產品品質與使用體驗',
      technologies: [
        'Angular',
        'TypeScript',
        'RxJS',
        'Highcharts',
        'Angular Material',
        'Tailwind CSS',
      ],
      achievements: [
        '獨立開發完整分類頁模組，實現數據視覺化與互動設計',
        '重構與擴充共用元件功能，提升模組重用率',
        '進行跨模組錯誤排查與整體錯誤修正，穩定專案品質',
      ],
    },
    {
      period: '2024',
      title: '金融資訊申報平台',
      description: '參與金融申報系統開發與整合，提升報表列印與資料展示功能的穩定性與一致性',
      technologies: ['Angular', 'TypeScript', 'RxJS', 'Angular Material', 'Tailwind CSS'],
      achievements: [
        '開發多頁共用列印功能，支援不同報表格式',
        '參與頁面切板、資料串接與錯誤排查',
        '優化共用元件邏輯與整體互動效能',
      ],
    },
    {
      period: '2023 – 2024',
      title: '企業內容平台開發',
      description:
        '打造企業官方內容展示與管理平台，結合高效 SEO 與效能優化技術，支援行銷曝光與內容管理',
      technologies: ['Razor', 'Angular', 'TypeScript', 'RxJS', 'GA', 'Lighthouse'],
      achievements: [
        '建構後台文章、標籤、廣告等多模組管理功能',
        '前台實作 Lazy Loading、RWD 與 SEO 優化，Lighthouse SEO 分數 95+',
        '實作 Facebook / Twitter / LINE 分享 meta 設定與測試驗證',
      ],
    },
    {
      period: '2023',
      title: '企業資訊入口系統（EIP 中央平台）',
      description:
        '開發公司內部資訊管理中樞，整合多系統導覽、公告與頁面嵌入機制，提升企業資訊協作效率',
      technologies: ['Angular', 'TypeScript', 'RxJS'],
      achievements: [
        '設計多層級導覽結構與 iframe 嵌入展示機制',
        '實現公告管理、自動刷新與多語系切換功能',
        '優化使用者操作體驗與管理維護效率',
      ],
    },
  ];

  const activeEvent = timelineEvents[activeIndex];

  useEffect(() => {
    if (!isInView) return;
    const duration = prefersReducedMotion ? 0.01 : 0.6;

    if (ref.current) {
      gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration });
    }

    if (leftColumnRef.current) {
      gsap.fromTo(
        leftColumnRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: prefersReducedMotion ? 0.01 : 0.5, delay: 0.2 }
      );
    }

    if (rightColumnRef.current) {
      gsap.fromTo(
        rightColumnRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: prefersReducedMotion ? 0.01 : 0.5, delay: 0.4 }
      );
    }
  }, [isInView, prefersReducedMotion]);

  useEffect(() => {
    if (progressRef.current && !prefersReducedMotion) {
      const height = `calc(${((activeIndex + 1) / timelineEvents.length) * 100}% - 32px)`;
      gsap.to(progressRef.current, {
        height,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [activeIndex, prefersReducedMotion, timelineEvents.length]);

  useEffect(() => {
    if (cardRef.current && !prefersReducedMotion) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.3, ease: 'power2.inOut' }
      );
    }
  }, [activeIndex, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    if (bgCard1Ref.current) {
      bgCard1Ref.current.style.transform = isHovering
        ? 'translate3d(8px, 8px, 0)'
        : 'translate3d(4px, 4px, 0)';
    }

    if (bgCard2Ref.current) {
      bgCard2Ref.current.style.transform = isHovering
        ? 'translate3d(4px, 4px, 0)'
        : 'translate3d(2px, 2px, 0)';
    }
  }, [isHovering, prefersReducedMotion]);

  const handleButtonHover = (el: HTMLButtonElement, isEnter: boolean) => {
    if (prefersReducedMotion) return;
    gsap.to(el, {
      x: isEnter ? 4 : 0,
      duration: 0.2,
    });
  };

  return (
    <section id="experience" className="relative overflow-hidden px-4 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 bottom-0 left-0 w-12 opacity-[0.03] md:w-16 dark:opacity-[0.05]">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="text-outer-space dark:text-apricot h-6 pr-2 text-right font-mono text-xs"
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div ref={ref} style={{ opacity: 0 }}>
          <div className="mb-16 text-center md:mb-20">
            <GradientTitle className="text-4xl font-bold md:text-5xl lg:text-6xl">
              工作經驗
            </GradientTitle>
          </div>

          <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-12 xl:grid-cols-[320px_1fr]">
            <div ref={leftColumnRef} className="relative" style={{ opacity: 0 }}>
              <div className="from-sandy-brown/20 via-fawn/40 to-sandy-brown/20 dark:from-fawn/20 dark:via-apricot/40 dark:to-fawn/20 absolute top-4 bottom-4 left-[11px] w-0.5 bg-gradient-to-b md:left-[13px]" />

              <div
                ref={progressRef}
                className="from-sandy-brown to-fawn dark:from-fawn dark:to-apricot absolute left-[11px] w-0.5 bg-gradient-to-b md:left-[13px]"
                style={{ top: 16, height: 0 }}
              />

              <div className="space-y-4">
                {timelineEvents.map((event, index) => {
                  const isActive = index === activeIndex;
                  const isPast = index < activeIndex;

                  return (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      onMouseEnter={e => handleButtonHover(e.currentTarget, true)}
                      onMouseLeave={e => handleButtonHover(e.currentTarget, false)}
                      className={`group relative flex w-full items-center gap-4 rounded-xl py-3 pr-4 pl-10 text-left transition-all duration-300 md:gap-5 md:py-4 md:pr-5 md:pl-12 ${
                        isActive
                          ? 'bg-sandy-brown/10 dark:bg-fawn/10'
                          : 'hover:bg-outer-space/5 dark:hover:bg-apricot/5'
                      }`}
                    >
                      <div
                        className={`absolute top-1/2 left-0 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border-2 transition-all duration-300 md:h-7 md:w-7 ${getTimelineDotClassName(
                          isActive,
                          isPast
                        )}`}
                      >
                        {(isActive || isPast) && (
                          <div className="dark:bg-outer-space h-1.5 w-1.5 rounded-full bg-white md:h-2 md:w-2" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div
                          className={`font-mono text-xs transition-colors duration-300 ${
                            isActive
                              ? 'text-sandy-brown dark:text-fawn'
                              : 'text-outer-space/40 dark:text-apricot/40'
                          }`}
                        >
                          {event.period}
                        </div>
                        <div
                          className={`mt-1 text-sm leading-snug font-medium transition-colors duration-300 md:text-base ${
                            isActive
                              ? 'text-outer-space dark:text-apricot'
                              : 'text-outer-space/60 dark:text-apricot/60'
                          }`}
                        >
                          {event.title}
                        </div>
                      </div>

                      <div
                        className={`ml-2 flex-shrink-0 transition-all duration-300 ${
                          isActive
                            ? 'translate-x-1 opacity-100'
                            : 'opacity-0 group-hover:opacity-50'
                        }`}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-sandy-brown dark:text-fawn"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              ref={rightColumnRef}
              className="relative"
              style={{ opacity: 0 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="relative">
                <div
                  ref={bgCard1Ref}
                  className="border-sandy-brown/10 bg-sandy-brown/5 dark:border-fawn/10 dark:bg-fawn/5 absolute -right-2 -bottom-2 h-full w-full rounded-2xl border transition-transform duration-300 will-change-transform"
                  style={{ transform: 'translate3d(4px, 4px, 0)' }}
                />
                <div
                  ref={bgCard2Ref}
                  className="border-fawn/10 bg-fawn/5 dark:border-apricot/10 dark:bg-apricot/5 absolute -right-1 -bottom-1 h-full w-full rounded-2xl border transition-transform duration-300 will-change-transform"
                  style={{ transform: 'translate3d(2px, 2px, 0)' }}
                />

                <div
                  ref={cardRef}
                  key={activeIndex}
                  className="border-outer-space/10 dark:border-apricot/10 dark:bg-outer-space/95 relative overflow-hidden rounded-2xl border bg-white/95 shadow-lg backdrop-blur-sm"
                >
                  <div className="border-outer-space/5 bg-outer-space/[0.02] dark:border-apricot/5 dark:bg-apricot/[0.02] flex items-center gap-2 border-b px-4 py-3">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                      <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
                      <div className="h-3 w-3 rounded-full bg-[#28c840]" />
                    </div>
                    <div className="text-outer-space/40 dark:text-apricot/40 flex-1 text-center font-mono text-xs">
                      experience_{activeIndex + 1}.tsx
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="mb-6">
                      <div className="bg-sandy-brown/10 text-sandy-brown dark:bg-fawn/10 dark:text-fawn mb-2 inline-block rounded-full px-3 py-1 font-mono text-xs">
                        {activeEvent.period}
                      </div>
                      <h3 className="text-outer-space dark:text-apricot text-xl font-bold md:text-2xl">
                        {activeEvent.title}
                      </h3>
                      <p className="text-outer-space/70 dark:text-apricot/70 mt-3 leading-relaxed">
                        {activeEvent.description}
                      </p>
                    </div>

                    <div className="mb-6">
                      <div className="mb-3 flex items-center gap-2">
                        <div className="bg-sandy-brown dark:bg-fawn h-4 w-1 rounded-full" />
                        <span className="text-outer-space dark:text-apricot text-sm font-semibold">
                          技術棧
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {activeEvent.technologies.map((tech, idx) => (
                          <span
                            key={tech}
                            className="border-outer-space/10 bg-outer-space/[0.03] text-outer-space/80 hover:border-sandy-brown/30 hover:bg-sandy-brown/5 dark:border-apricot/10 dark:bg-apricot/[0.03] dark:text-apricot/80 dark:hover:border-fawn/30 dark:hover:bg-fawn/5 rounded-lg border px-3 py-1.5 font-mono text-xs transition-all hover:-translate-y-0.5"
                            style={{
                              animationDelay: `${idx * 0.03}s`,
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="mb-3 flex items-center gap-2">
                        <div className="bg-fawn dark:bg-apricot h-4 w-1 rounded-full" />
                        <span className="text-outer-space dark:text-apricot text-sm font-semibold">
                          核心成就
                        </span>
                      </div>
                      <ul className="space-y-3">
                        {activeEvent.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="bg-sandy-brown dark:bg-fawn mt-2 flex h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                            <span className="text-outer-space/70 dark:text-apricot/70 text-sm leading-relaxed">
                              {achievement}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-outer-space/5 dark:border-apricot/5 flex items-center justify-between border-t px-6 py-4">
                    <button
                      onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
                      disabled={activeIndex === 0}
                      className="text-outer-space/50 hover:text-sandy-brown dark:text-apricot/50 dark:hover:text-fawn flex items-center gap-2 text-sm transition-colors disabled:opacity-30"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                      上一個
                    </button>
                    <div className="flex gap-1.5">
                      {timelineEvents.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveIndex(idx)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            idx === activeIndex
                              ? 'bg-sandy-brown dark:bg-fawn w-6'
                              : 'bg-outer-space/20 hover:bg-sandy-brown/50 dark:bg-apricot/20 dark:hover:bg-fawn/50 w-1.5'
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() =>
                        setActiveIndex(Math.min(timelineEvents.length - 1, activeIndex + 1))
                      }
                      disabled={activeIndex === timelineEvents.length - 1}
                      className="text-outer-space/50 hover:text-sandy-brown dark:text-apricot/50 dark:hover:text-fawn flex items-center gap-2 text-sm transition-colors disabled:opacity-30"
                    >
                      下一個
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
