'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

import { springConfigs, useReducedMotion, staggerContainer } from '@/utils/animations';

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  const timelineEvents = [
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

  return (
    <section id="experience" className="bg-gray-50 px-4 py-20 dark:bg-gray-900/30">
      <div className="mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={
            prefersReducedMotion ? { duration: 0.01 } : { ...springConfigs.gentle, delay: 0.1 }
          }
        >
          <motion.h2
            className="text-outer-space dark:text-apricot mb-16 text-center text-4xl font-bold md:text-5xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={
              prefersReducedMotion ? { duration: 0.01 } : { ...springConfigs.bouncy, delay: 0.2 }
            }
          >
            工作經驗
          </motion.h2>

          {/* 工作經驗 - 幾何藝術時間線 */}
          <div className="mb-16">
            <motion.h3
              className="text-outer-space dark:text-fawn mb-12 text-center text-2xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={
                prefersReducedMotion ? { duration: 0.01 } : { ...springConfigs.gentle, delay: 0.3 }
              }
            >
              專業經驗軌跡
            </motion.h3>

            <div className="relative mx-auto max-w-5xl px-4 md:px-8">
              {/* 主要時間軸 - 桌面版垂直居中，手機版左側 */}
              <motion.div
                className="from-sandy-brown via-fawn to-sandy-brown absolute top-0 left-[34px] w-1 rounded-full bg-gradient-to-b shadow-lg md:left-1/2 md:-translate-x-1/2 md:transform"
                initial={{ height: 0, opacity: 0 }}
                animate={isInView ? { height: '100%', opacity: 1 } : { height: 0, opacity: 0 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.01 }
                    : {
                        height: { duration: 1.2, delay: 0.4, ease: [0.43, 0.13, 0.23, 0.96] },
                        opacity: { duration: 0.3, delay: 0.4 },
                      }
                }
                style={{ willChange: 'height, opacity' }}
              />

              {/* 背景幾何裝飾 - 手機版隱藏 */}
              <div className="pointer-events-none absolute inset-0 hidden overflow-hidden opacity-30 md:block">
                {/* 圓環裝飾 */}
                <div className="border-sandy-brown/30 absolute top-32 left-8 h-16 w-16 rounded-full border" />
                <div className="border-fawn/30 absolute top-64 right-12 h-12 w-12 rounded-full border" />
                <div className="border-sandy-brown/20 absolute bottom-32 left-16 h-20 w-20 rounded-full border" />

                {/* 方形裝飾 */}
                <div className="border-fawn/40 absolute top-96 right-8 h-8 w-8 rotate-45 transform border" />
                <div className="bg-sandy-brown/20 absolute right-20 bottom-64 h-6 w-6 rotate-45 transform" />
              </div>

              {timelineEvents.map((event, index) => {
                const isLeft = index % 2 === 0;
                const colorSchemes = [
                  {
                    bg: 'bg-emerald-400',
                    text: 'text-emerald-700',
                    border: 'border-emerald-200',
                    bgLight: 'bg-emerald-50',
                    bgDark: 'bg-emerald-900/30',
                    textDark: 'text-emerald-300',
                  },
                  {
                    bg: 'bg-orange-400',
                    text: 'text-orange-700',
                    border: 'border-orange-200',
                    bgLight: 'bg-orange-50',
                    bgDark: 'bg-orange-900/30',
                    textDark: 'text-orange-300',
                  },
                  {
                    bg: 'bg-purple-400',
                    text: 'text-purple-700',
                    border: 'border-purple-200',
                    bgLight: 'bg-purple-50',
                    bgDark: 'bg-purple-900/30',
                    textDark: 'text-purple-300',
                  },
                  {
                    bg: 'bg-blue-400',
                    text: 'text-blue-700',
                    border: 'border-blue-200',
                    bgLight: 'bg-blue-50',
                    bgDark: 'bg-blue-900/30',
                    textDark: 'text-blue-300',
                  },
                ];
                const colorScheme = colorSchemes[index % colorSchemes.length];

                return (
                  <motion.div
                    key={index}
                    className="relative mb-16 md:mb-20"
                    initial={{ opacity: 0, y: 60 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0.01 }
                        : {
                            ...springConfigs.gentle,
                            delay: 0.6 + index * 0.15,
                          }
                    }
                  >
                    {/* 時間節點 - 手機版左側對齊，桌面版居中 */}
                    <motion.div
                      className="absolute top-8 left-5 z-20 -translate-x-1/2 transform md:left-1/2"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0.01 }
                          : {
                              ...springConfigs.bouncy,
                              delay: 0.7 + index * 0.15,
                            }
                      }
                      whileHover={
                        prefersReducedMotion
                          ? {}
                          : {
                              scale: 1.1,
                              transition: springConfigs.instant,
                            }
                      }
                      style={{ willChange: 'transform' }}
                    >
                      {/* 外層圓形 */}
                      <div
                        className={`relative h-10 w-10 md:h-12 md:w-12 ${colorScheme.bg} rounded-full border-3 border-white shadow-xl md:border-4 dark:border-gray-800`}
                      >
                        {/* 內層圓點 */}
                        <div className="absolute inset-2 flex items-center justify-center rounded-full bg-white md:inset-3 dark:bg-gray-800">
                          <div
                            className={`h-1.5 w-1.5 md:h-2 md:w-2 ${colorScheme.bg} rounded-full`}
                          />
                        </div>
                      </div>

                      {/* 時間標籤 - 手機版調整位置 */}
                      <div
                        className={`absolute -top-8 left-1/2 -translate-x-1/2 transform md:-top-10 ${colorScheme.bg} rounded-full px-2 py-1 text-xs font-bold whitespace-nowrap text-white shadow-lg md:px-3`}
                      >
                        {event.period}
                      </div>
                    </motion.div>

                    {/* 連接線 - 手機版簡化，桌面版雙向 */}
                    <motion.div
                      className={`absolute top-13 h-0.5 md:top-14 md:h-1 ${
                        colorScheme.bg
                      } ${'left-10'} ${isLeft ? 'md:left-[45%]' : 'md:left-1/2'}`}
                      initial={{ width: 0, opacity: 0 }}
                      animate={isInView ? { width: '3rem', opacity: 1 } : { width: 0, opacity: 0 }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0.01 }
                          : {
                              width: { duration: 0.4, delay: 0.85 + index * 0.15 },
                              opacity: { duration: 0.2, delay: 0.85 + index * 0.15 },
                            }
                      }
                      style={{ willChange: 'width, opacity' }}
                    />

                    {/* 內容卡片 - 手機版統一左對齊，桌面版左右交替 */}
                    <motion.div
                      className={`pl-16 md:pl-0 ${
                        isLeft ? 'md:mr-auto' : 'md:mr-0 md:ml-auto'
                      } max-w-sm md:max-w-md`}
                      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                      animate={
                        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -30 : 30 }
                      }
                      transition={
                        prefersReducedMotion
                          ? { duration: 0.01 }
                          : {
                              ...springConfigs.gentle,
                              delay: 0.9 + index * 0.15,
                            }
                      }
                      whileHover={
                        prefersReducedMotion
                          ? {}
                          : {
                              scale: 1.03,
                              y: -5,
                              transition: springConfigs.instant,
                            }
                      }
                      style={{ willChange: 'transform' }}
                    >
                      {/* 卡片主體 */}
                      <div className="relative w-full overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-xl md:p-6 dark:border-gray-700 dark:bg-gray-800/90">
                        {/* 頂部色彩條 */}
                        <div className={`absolute top-0 right-0 left-0 h-1 ${colorScheme.bg}`} />

                        {/* 角落裝飾 - 手機版固定右上角 */}
                        <div
                          className={`absolute top-3 right-3 md:top-4 md:right-4 ${
                            // 桌面版根據位置調整
                            `md:${isLeft ? 'right-4' : 'left-4'}`
                          } h-2 w-2 md:h-3 md:w-3 ${colorScheme.bg} rounded-full opacity-60`}
                        />

                        <div className="relative z-10">
                          {/* 專案標題 - 手機版左對齊 */}
                          <h4
                            className={`text-outer-space dark:text-apricot mb-2 text-left text-lg font-bold md:text-xl ${
                              // 桌面版根據位置調整
                              `md:${isLeft ? 'text-left' : 'text-right'}`
                            }`}
                          >
                            {event.title}
                          </h4>

                          {/* 專案描述 - 手機版左對齊 */}
                          <p
                            className={`text-outer-space/70 dark:text-apricot/70 mb-4 text-left text-sm leading-relaxed ${
                              // 桌面版根據位置調整
                              `md:${isLeft ? 'text-left' : 'text-right'}`
                            }`}
                          >
                            {event.description}
                          </p>

                          {/* 成就列表 - 手機版左對齊 */}
                          <div className="mb-4">
                            <h5
                              className={`text-outer-space dark:text-apricot mb-3 flex items-center justify-start text-sm font-semibold ${
                                // 桌面版根據位置調整
                                `md:${isLeft ? 'justify-start' : 'justify-end'}`
                              }`}
                            >
                              <span className="mr-2 md:mr-2">🎯</span>
                              <span className={`md:${isLeft ? 'block' : 'hidden'}`}>核心成就</span>
                              <span className={`hidden md:${isLeft ? 'hidden' : 'block'} md:ml-2`}>
                                核心成就
                              </span>
                            </h5>
                            <div className="space-y-2">
                              {event.achievements.map((achievement, idx) => (
                                <motion.div
                                  key={idx}
                                  className={`flex items-start ${
                                    // 桌面版根據位置調整
                                    `md:${isLeft ? '' : 'flex-row-reverse'}`
                                  }`}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                  transition={{
                                    delay: index * 0.2 + idx * 0.1 + 1,
                                  }}
                                >
                                  <div
                                    className={`h-1.5 w-1.5 flex-shrink-0 ${
                                      colorScheme.bg
                                    } mt-2 mr-3 rounded-full ${
                                      // 桌面版根據位置調整
                                      `md:${isLeft ? 'mr-3' : 'ml-3'}`
                                    }`}
                                  />
                                  <p
                                    className={`text-outer-space/70 dark:text-apricot/70 text-left text-xs leading-relaxed ${
                                      // 桌面版根據位置調整
                                      `md:${isLeft ? 'text-left' : 'text-right'}`
                                    }`}
                                  >
                                    {achievement}
                                  </p>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* 技術標籤 - 手機版左對齊 */}
                          <div
                            className={`flex flex-wrap justify-start gap-2 ${
                              // 桌面版根據位置調整
                              `md:${isLeft ? 'justify-start' : 'justify-end'}`
                            }`}
                          >
                            {event.technologies.map((tech, techIndex) => (
                              <motion.span
                                key={tech}
                                className={`rounded-full px-2 py-1 text-xs font-medium md:px-3 ${colorScheme.bgLight} ${colorScheme.text} ${colorScheme.border} border dark:${colorScheme.bgDark} dark:${colorScheme.textDark}`}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={
                                  isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
                                }
                                transition={{
                                  delay: index * 0.2 + techIndex * 0.05 + 1.2,
                                }}
                                whileHover={{ scale: 1.05, y: -1 }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* 卡片投影 */}
                      <div className="absolute inset-0 -z-10 translate-x-1 translate-y-1 transform rounded-2xl bg-gray-200/20 dark:bg-gray-600/20" />
                    </motion.div>
                  </motion.div>
                );
              })}

              {/* 時間軸結束裝飾 */}
              <motion.div
                className="absolute bottom-0 left-9 flex -translate-x-1/2 transform items-center justify-center md:left-1/2"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
              >
                <div className="from-sandy-brown to-fawn relative h-6 w-6 rounded-full border-2 border-white bg-gradient-to-br shadow-lg md:h-8 md:w-8 dark:border-gray-800">
                  <div className="absolute inset-1 rounded-full bg-white md:inset-2 dark:bg-gray-800" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
