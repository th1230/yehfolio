'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    {
      period: "2021 - 現在",
      title: "前端工程師",
      company: "公司",
      description: "主要使用 Angular 框架進行前端開發，完成多個大型專案",
      achievements: [
        "獨立完成內部中轉系統前後台開發，使用 RxJS 實現自動 refresh 功能",
        "開發數位遊牧平台，Lighthouse 檢測達到 95% 分數，實現完整 SEO 優化",
        "負責金融相關平台開發，包含期信申報平台與基金觀測站",
        "實現多頁面通用列印功能，優化使用者體驗",
        "負責共用元件開發與系統維護優化"
      ],
      technologies: ["Angular", "TypeScript", "RxJS", "HTML/CSS", "JavaScript"]
    }
  ];

  const sideProjects = [
    {
      year: "2023",
      title: "AI 票務平台",
      description: "團體專案 - 整合 AI 機器人的票務系統",
      technologies: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Docker", "GitHub Actions"],
      achievements: [
        "前端使用 Next.js SSR + Zustand + SWR",
        "後端使用 Node.js + Express + PostgreSQL",
        "Docker 容器化部署，GitHub Actions 自動化 CI/CD",
        "部署至 Render 平台"
      ]
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
        "JWT 身份驗證系統"
      ]
    }
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
        "SSE 串接 OpenAI API"
      ]
    },
    {
      title: "LINE LIFF 管理系統",
      description: "內部管理系統開發協作",
      technologies: ["Next.js", "React", "LINE LIFF"],
      features: [
        "LINE LIFF 客製化網站開發",
        "React 後台管理系統",
        "模板設定與發送功能"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 px-4 bg-gray-50 dark:bg-gray-900/30">
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

          {/* 工作經驗 */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-outer-space dark:text-fawn">
              專業經驗
            </h3>
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800/50 rounded-xl p-6 shadow-lg mb-6"
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: "easeOut" }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-outer-space dark:text-apricot mb-1">
                      {exp.title}
                    </h4>
                    <p className="text-sandy-brown font-medium mb-2">{exp.company}</p>
                    <p className="text-outer-space/80 dark:text-apricot/80 mb-4">
                      {exp.description}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-fawn bg-fawn/10 px-3 py-1 rounded-full whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>
                
                <div className="mb-4">
                  <h5 className="font-semibold text-outer-space dark:text-apricot mb-2">主要成就：</h5>
                  <ul className="space-y-1">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-outer-space/80 dark:text-apricot/80 flex items-start">
                        <span className="text-sandy-brown mr-2">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-sandy-brown/10 text-sandy-brown text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
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
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1, ease: "easeOut" }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-bold text-outer-space dark:text-apricot">
                      {project.title}
                    </h4>
                    <span className="text-sm text-fawn font-medium">{project.year}</span>
                  </div>
                  <p className="text-outer-space/80 dark:text-apricot/80 mb-4">
                    {project.description}
                  </p>
                  <ul className="space-y-1 mb-4">
                    {project.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-sm text-outer-space/70 dark:text-apricot/70 flex items-start">
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
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                >
                  <h4 className="text-lg font-bold text-outer-space dark:text-apricot mb-2">
                    {collab.title}
                  </h4>
                  <p className="text-outer-space/80 dark:text-apricot/80 mb-4">
                    {collab.description}
                  </p>
                  <ul className="space-y-1 mb-4">
                    {collab.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-outer-space/70 dark:text-apricot/70 flex items-start">
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
