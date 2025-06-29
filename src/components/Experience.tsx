"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const timelineEvents = [
    {
      period: "2024 - 現在",
      title: "智慧投資資訊平台",
      description: "開發金融數據分析與基金追蹤系統，提供用戶完整的投資決策資訊",
      technologies: ["Angular", "TypeScript", "RxJS", "Chart.js"],
      achievements: [
        "實現即時數據更新與圖表視覺化",
        "建立完整的基金篩選與比較功能",
        "優化資料載入效能，提升 40% 響應速度",
      ],
    },
    {
      period: "2023 - 2024",
      title: "金融申報管理系統",
      description: "建構期貨信託業者申報平台，簡化監管流程並確保合規性",
      technologies: ["Angular", "TypeScript", "Angular Material", "PDF.js"],
      achievements: [
        "開發多層級表單驗證機制",
        "實現批量資料匯入匯出功能",
        "建立自動化報表產生系統",
      ],
    },
    {
      period: "2022 - 2023",
      title: "遠距工作媒合平台",
      description: "打造數位人才與企業媒合的專業平台，支援全球化遠端工作模式",
      technologies: ["Angular", "TypeScript", "RxJS", "PWA"],
      achievements: [
        "實現 Lighthouse 95+ 高效能優化",
        "建立完整的 SEO 策略與實作",
        "開發響應式設計，支援多設備使用",
      ],
    },
    {
      period: "2021 - 2022",
      title: "企業內部管理系統",
      description: "開發公司內部中轉與資料管理系統，整合多個業務流程",
      technologies: ["Angular", "TypeScript", "RxJS", "NgRx"],
      achievements: [
        "實現自動資料同步與更新機制",
        "建立模組化架構設計",
        "開發通用列印與報表功能",
      ],
    },
  ];

  const sideProjects = [
    {
      year: "2023",
      title: "AI 票務平台",
      description: "團體專案 - 整合 AI 機器人的票務系統",
      technologies: [
        "Next.js",
        "Node.js",
        "PostgreSQL",
        "Prisma",
        "Docker",
        "GitHub Actions",
      ],
      achievements: [
        "前端使用 Next.js SSR + Zustand + SWR",
        "後端使用 Node.js + Express + PostgreSQL",
        "Docker 容器化部署，GitHub Actions 自動化 CI/CD",
        "部署至 Render 平台",
      ],
    },
    {
      year: "2022",
      title: "才藝媒合網站",
      description: "團體專案 - 全端才藝媒合平台",
      technologies: ["Angular", "Node.js", "MongoDB", "WebSocket", "JWT"],
      achievements: [
        "後端使用 Node.js + Express + MongoDB + Mongoose",
        "整合 WebSocket 即時通訊功能",
        "實現 Google OAuth 與 Google Mail 服務",
        "JWT 身份驗證系統",
      ],
    },
  ];

  const collaborations = [
    {
      title: "客製化 GPT 平台",
      description: "與外部後端工程師協作開發",
      technologies: ["Nuxt.js", "Vue", "OpenAI API", "SSE"],
      features: [
        "對話功能與自動化顯示",
        "歷史數據管理與重載",
        "對話分享功能",
        "SSE 串接 OpenAI API",
      ],
    },
    {
      title: "LINE LIFF 管理系統",
      description: "內部管理系統開發協作",
      technologies: ["Next.js", "React", "LINE LIFF"],
      features: [
        "LINE LIFF 客製化網站開發",
        "React 後台管理系統",
        "模板設定與發送功能",
      ],
    },
  ];

  return (
    <section
      id="experience"
      className="py-20 px-4 bg-gray-50 dark:bg-gray-900/30"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-outer-space dark:text-apricot">
            工作經驗
          </h2>

          {/* 工作經驗 - 幾何藝術時間線 */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-12 text-center text-outer-space dark:text-fawn">
              專業經驗軌跡
            </h3>

            <div className="relative max-w-5xl mx-auto px-4 md:px-8">
              {/* 主要時間軸 - 桌面版垂直居中，手機版左側 */}
              <motion.div
                className="absolute left-[34px] md:left-1/2 top-0 w-1 bg-gradient-to-b from-sandy-brown via-fawn to-sandy-brown md:transform md:-translate-x-1/2 rounded-full shadow-lg"
                initial={{ height: 0 }}
                animate={isInView ? { height: "100%" } : { height: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />

              {/* 背景幾何裝飾 - 手機版隱藏 */}
              <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none opacity-30">
                {/* 圓環裝飾 */}
                <div className="absolute top-32 left-8 w-16 h-16 border border-sandy-brown/30 rounded-full" />
                <div className="absolute top-64 right-12 w-12 h-12 border border-fawn/30 rounded-full" />
                <div className="absolute bottom-32 left-16 w-20 h-20 border border-sandy-brown/20 rounded-full" />

                {/* 方形裝飾 */}
                <div className="absolute top-96 right-8 w-8 h-8 border border-fawn/40 transform rotate-45" />
                <div className="absolute bottom-64 right-20 w-6 h-6 bg-sandy-brown/20 transform rotate-45" />
              </div>

              {timelineEvents.map((event, index) => {
                const isLeft = index % 2 === 0;
                const colorSchemes = [
                  {
                    bg: "bg-emerald-400",
                    text: "text-emerald-700",
                    border: "border-emerald-200",
                    bgLight: "bg-emerald-50",
                    bgDark: "bg-emerald-900/30",
                    textDark: "text-emerald-300",
                  },
                  {
                    bg: "bg-orange-400",
                    text: "text-orange-700",
                    border: "border-orange-200",
                    bgLight: "bg-orange-50",
                    bgDark: "bg-orange-900/30",
                    textDark: "text-orange-300",
                  },
                  {
                    bg: "bg-purple-400",
                    text: "text-purple-700",
                    border: "border-purple-200",
                    bgLight: "bg-purple-50",
                    bgDark: "bg-purple-900/30",
                    textDark: "text-purple-300",
                  },
                  {
                    bg: "bg-blue-400",
                    text: "text-blue-700",
                    border: "border-blue-200",
                    bgLight: "bg-blue-50",
                    bgDark: "bg-blue-900/30",
                    textDark: "text-blue-300",
                  },
                ];
                const colorScheme = colorSchemes[index];

                return (
                  <motion.div
                    key={index}
                    className="relative mb-16 md:mb-20"
                    initial={{ opacity: 0, y: 50 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                    }
                    transition={{
                      duration: 0.8,
                      delay: index * 0.2,
                      ease: "easeOut",
                    }}
                  >
                    {/* 時間節點 - 手機版左側對齊，桌面版居中 */}
                    <motion.div
                      className="absolute left-5 md:left-1/2 top-8 transform -translate-x-1/2 z-20"
                      initial={{ scale: 0, rotate: -90 }}
                      animate={
                        isInView
                          ? { scale: 1, rotate: 0 }
                          : { scale: 0, rotate: -90 }
                      }
                      transition={{
                        duration: 0.6,
                        delay: index * 0.2 + 0.5,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      {/* 外層圓形 */}
                      <div
                        className={`relative w-10 h-10 md:w-12 md:h-12 ${colorScheme.bg} rounded-full shadow-xl border-3 md:border-4 border-white dark:border-gray-800`}
                      >
                        {/* 內層圓點 */}
                        <div className="absolute inset-2 md:inset-3 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                          <div
                            className={`w-1.5 h-1.5 md:w-2 md:h-2 ${colorScheme.bg} rounded-full`}
                          />
                        </div>
                      </div>

                      {/* 時間標籤 - 手機版調整位置 */}
                      <div
                        className={`absolute -top-8 md:-top-10 left-1/2 transform -translate-x-1/2 ${colorScheme.bg} text-white px-2 md:px-3 py-1 rounded-full text-xs font-bold shadow-lg whitespace-nowrap`}
                      >
                        {event.period}
                      </div>
                    </motion.div>

                    {/* 連接線 - 手機版簡化，桌面版雙向 */}
                    <motion.div
                      className={`absolute top-13 md:top-14 w-8 md:w-12 h-0.5 ${
                        colorScheme.bg
                      } ${"left-10"} ${
                        isLeft ? "md:left-[45%]" : "md:left-1/2"
                      }`}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: 32 } : { width: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.8 }}
                    />

                    {/* 內容卡片 - 手機版統一左對齊，桌面版左右交替 */}
                    <motion.div
                      className={`pl-16 md:pl-0 ${
                        // 手機版統一左對齊
                        isLeft
                          ? "md:ml-0 md:mr-auto md:pl-20"
                          : "md:mr-0 md:ml-auto md:pr-20"
                      } max-w-sm md:max-w-md`}
                      initial={{ opacity: 0, x: -50 }}
                      animate={
                        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
                      }
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                      whileHover={{ scale: 1.02, y: -3 }}
                    >
                      {/* 卡片主體 */}
                      <div className="relative w-full bg-white dark:bg-gray-800/90 rounded-2xl p-4 md:p-6 shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                        {/* 頂部色彩條 */}
                        <div
                          className={`absolute top-0 left-0 right-0 h-1 ${colorScheme.bg}`}
                        />

                        {/* 角落裝飾 - 手機版固定右上角 */}
                        <div
                          className={`absolute top-3 md:top-4 right-3 md:right-4 ${
                            // 桌面版根據位置調整
                            "md:" + (isLeft ? "right-4" : "left-4")
                          } w-2 h-2 md:w-3 md:h-3 ${
                            colorScheme.bg
                          } rounded-full opacity-60`}
                        />

                        <div className="relative z-10">
                          {/* 專案標題 - 手機版左對齊 */}
                          <h4
                            className={`text-lg md:text-xl font-bold text-outer-space dark:text-apricot mb-2 text-left ${
                              // 桌面版根據位置調整
                              "md:" + (isLeft ? "text-left" : "text-right")
                            }`}
                          >
                            {event.title}
                          </h4>

                          {/* 專案描述 - 手機版左對齊 */}
                          <p
                            className={`text-outer-space/70 dark:text-apricot/70 mb-4 text-sm leading-relaxed text-left ${
                              // 桌面版根據位置調整
                              "md:" + (isLeft ? "text-left" : "text-right")
                            }`}
                          >
                            {event.description}
                          </p>

                          {/* 成就列表 - 手機版左對齊 */}
                          <div className="mb-4">
                            <h5
                              className={`text-sm font-semibold text-outer-space dark:text-apricot mb-3 flex items-center justify-start ${
                                // 桌面版根據位置調整
                                "md:" +
                                (isLeft ? "justify-start" : "justify-end")
                              }`}
                            >
                              <span className="mr-2 md:mr-2">🎯</span>
                              <span
                                className={`md:${isLeft ? "block" : "hidden"}`}
                              >
                                核心成就
                              </span>
                              <span
                                className={`hidden md:${
                                  isLeft ? "hidden" : "block"
                                } md:ml-2`}
                              >
                                核心成就
                              </span>
                            </h5>
                            <div className="space-y-2">
                              {event.achievements.map((achievement, idx) => (
                                <motion.div
                                  key={idx}
                                  className={`flex items-start ${
                                    // 桌面版根據位置調整
                                    "md:" + (isLeft ? "" : "flex-row-reverse")
                                  }`}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={
                                    isInView
                                      ? { opacity: 1, x: 0 }
                                      : { opacity: 0, x: -20 }
                                  }
                                  transition={{
                                    delay: index * 0.2 + idx * 0.1 + 1,
                                  }}
                                >
                                  <div
                                    className={`flex-shrink-0 w-1.5 h-1.5 ${
                                      colorScheme.bg
                                    } rounded-full mt-2 mr-3 ${
                                      // 桌面版根據位置調整
                                      "md:" + (isLeft ? "mr-3" : "ml-3")
                                    }`}
                                  />
                                  <p
                                    className={`text-xs text-outer-space/70 dark:text-apricot/70 leading-relaxed text-left ${
                                      // 桌面版根據位置調整
                                      "md:" +
                                      (isLeft ? "text-left" : "text-right")
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
                            className={`flex flex-wrap gap-2 justify-start ${
                              // 桌面版根據位置調整
                              "md:" + (isLeft ? "justify-start" : "justify-end")
                            }`}
                          >
                            {event.technologies.map((tech, techIndex) => (
                              <motion.span
                                key={tech}
                                className={`px-2 md:px-3 py-1 text-xs font-medium rounded-full ${colorScheme.bgLight} ${colorScheme.text} ${colorScheme.border} border dark:${colorScheme.bgDark} dark:${colorScheme.textDark}`}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={
                                  isInView
                                    ? { opacity: 1, scale: 1 }
                                    : { opacity: 0, scale: 0.8 }
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
                      <div className="absolute inset-0 bg-gray-200/20 dark:bg-gray-600/20 rounded-2xl transform translate-x-1 translate-y-1 -z-10" />
                    </motion.div>
                  </motion.div>
                );
              })}

              {/* 時間軸結束裝飾 */}
              <motion.div
                className="absolute bottom-0 left-9 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
                }
                transition={{ delay: 1.5, duration: 0.6 }}
              >
                <div className="relative w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-sandy-brown to-fawn rounded-full shadow-lg border-2 border-white dark:border-gray-800">
                  <div className="absolute inset-1 md:inset-2 bg-white dark:bg-gray-800 rounded-full" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Side Projects */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-outer-space dark:text-fawn">
              Side Projects
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {sideProjects.map((project, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800/50 rounded-xl p-6 shadow-lg"
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: 0.4 + index * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-bold text-outer-space dark:text-apricot">
                      {project.title}
                    </h4>
                    <span className="text-sm text-fawn font-medium">
                      {project.year}
                    </span>
                  </div>
                  <p className="text-outer-space/80 dark:text-apricot/80 mb-4">
                    {project.description}
                  </p>
                  <ul className="space-y-1 mb-4">
                    {project.achievements.map((achievement, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-outer-space/70 dark:text-apricot/70 flex items-start"
                      >
                        <span className="text-sandy-brown mr-2">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-outer-space dark:text-apricot rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 協作專案 */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-outer-space dark:text-fawn">
              協作專案
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {collaborations.map((collab, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800/50 rounded-xl p-6 shadow-lg"
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: 0.6 + index * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <h4 className="text-lg font-bold text-outer-space dark:text-apricot mb-2">
                    {collab.title}
                  </h4>
                  <p className="text-outer-space/80 dark:text-apricot/80 mb-4">
                    {collab.description}
                  </p>
                  <ul className="space-y-1 mb-4">
                    {collab.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-outer-space/70 dark:text-apricot/70 flex items-start"
                      >
                        <span className="text-sandy-brown mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {collab.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-fawn/10 text-fawn text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 學歷 */}
          <motion.div
            className="mt-16 bg-white dark:bg-gray-800/50 rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          >
            <h3 className="text-2xl font-bold mb-4 text-outer-space dark:text-fawn">
              學歷背景
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-outer-space dark:text-apricot">
                  淡江大學
                </h4>
                <p className="text-outer-space/80 dark:text-apricot/80">
                  學士學位
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
