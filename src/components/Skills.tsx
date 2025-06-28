"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      category: "前端框架",
      skills: [
        {
          name: "Angular",
          level: 95,
          years: "3年",
          description: "主要開發框架，熟悉 RxJS、路由、狀態管理",
        },
        {
          name: "React/Next.js",
          level: 80,
          years: "2年",
          description: "熟悉 Hooks、SSR、狀態管理",
        },
        {
          name: "Vue/Nuxt.js",
          level: 70,
          years: "1年",
          description: "有實際專案開發經驗",
        },
      ],
    },
    {
      category: "程式語言",
      skills: [
        {
          name: "TypeScript",
          level: 85,
          years: "3年",
          description: "型別系統、介面設計、泛型應用",
        },
        {
          name: "JavaScript",
          level: 90,
          years: "3年",
          description: "ES6+、異步程式設計、DOM 操作",
        },
        {
          name: "HTML/CSS",
          level: 85,
          years: "3年",
          description: "語意化標籤、響應式設計、動畫效果",
        },
      ],
    },
    {
      category: "後端技術",
      skills: [
        {
          name: "Node.js",
          level: 75,
          years: "2年",
          description: "Express 框架、REST API 開發",
        },
        {
          name: "Database",
          level: 70,
          years: "2年",
          description: "MongoDB、PostgreSQL、Prisma ORM",
        },
        {
          name: "Authentication",
          level: 75,
          years: "2年",
          description: "JWT、OAuth、Session 管理",
        },
      ],
    },
    {
      category: "開發工具",
      skills: [
        {
          name: "Git",
          level: 85,
          years: "3年",
          description: "版本控制、分支管理、協作開發",
        },
        {
          name: "Docker",
          level: 75,
          years: "1年",
          description: "容器化部署、映像檔管理",
        },
        {
          name: "CI/CD",
          level: 75,
          years: "1年",
          description: "GitHub Actions、自動化部署",
        },
      ],
    },
  ];

  const highlights = [
    {
      title: "完整全端能力",
      description: "從前端到後端、從開發到部署的完整開發流程經驗",
      icon: "🚀",
    },
    {
      title: "專案管理經驗",
      description: "參與多個團體專案，具備敏捷開發與協作經驗",
      icon: "📋",
    },
    {
      title: "SEO 與效能優化",
      description: "Lighthouse 95% 分數，Google Search Console 優化經驗",
      icon: "⚡",
    },
    {
      title: "新技術學習能力",
      description: "持續學習新技術，快速適應不同技術棧",
      icon: "📚",
    },
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-gray-50 dark:bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-outer-space dark:text-apricot">
            技術能力
          </h2>
          <p className="text-xl text-center mb-16 text-outer-space/80 dark:text-apricot/80 max-w-2xl mx-auto">
            基於實際專案開發經驗的技術技能評估
          </p>

          {/* 亮點展示 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800/50 rounded-xl p-6 shadow-lg text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{
                  duration: 0.6,
                  delay: 0.1 + index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{ y: -5 }}
              >
                <div className="text-3xl mb-3">{highlight.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-outer-space dark:text-apricot">
                  {highlight.title}
                </h3>
                <p className="text-sm text-outer-space/70 dark:text-apricot/70">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* 技能分類 */}
          <div className="space-y-12">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{
                  duration: 0.6,
                  delay: 0.3 + categoryIndex * 0.1,
                  ease: "easeOut",
                }}
              >
                <h3 className="text-2xl font-bold mb-6 text-outer-space dark:text-fawn">
                  {category.category}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      className="bg-white dark:bg-gray-800/50 rounded-xl p-6 shadow-lg"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={
                        isInView
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0, scale: 0.9 }
                      }
                      transition={{
                        duration: 0.5,
                        delay: 0.4 + categoryIndex * 0.1 + skillIndex * 0.05,
                        ease: "easeOut",
                      }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-bold text-outer-space dark:text-apricot">
                          {skill.name}
                        </h4>
                        <span className="text-sm text-fawn font-medium bg-fawn/10 px-2 py-1 rounded">
                          {skill.years}
                        </span>
                      </div>

                      <div className="mb-3">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-outer-space/70 dark:text-apricot/70">
                            熟練度
                          </span>
                          <span className="text-sm font-medium text-sandy-brown">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <motion.div
                            className="bg-sandy-brown h-2 rounded-full"
                            initial={{ width: "0%" }}
                            animate={
                              isInView
                                ? { width: `${skill.level}%` }
                                : { width: "0%" }
                            }
                            transition={{
                              duration: 1,
                              delay:
                                0.6 + categoryIndex * 0.1 + skillIndex * 0.05,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                      </div>

                      <p className="text-sm text-outer-space/70 dark:text-apricot/70">
                        {skill.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
