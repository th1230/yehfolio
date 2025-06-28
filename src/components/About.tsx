"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    {
      name: "Angular",
      experience: "3年",
      description: "主要工作框架，完成多個大型商業專案",
      category: "前端框架",
    },
    {
      name: "React/Next.js",
      experience: "1年",
      description: "完成2-3個專案，包含 SSR 和狀態管理",
      category: "前端框架",
    },
    {
      name: "Vue/Nuxt.js",
      experience: "6個月",
      description: "客製化 GPT 平台開發經驗",
      category: "前端框架",
    },
    {
      name: "TypeScript",
      experience: "2年",
      description: "大型專案開發，型別安全與程式碼品質控制",
      category: "程式語言",
    },
    {
      name: "RxJS",
      experience: "2年",
      description: "響應式程式設計，自動刷新與資料流管理",
      category: "函式庫",
    },
    {
      name: "Node.js/Express",
      experience: "Side Project",
      description: "團體專案後端開發，RESTful API 設計",
      category: "後端技術",
    },
    {
      name: "資料庫",
      experience: "Side Project",
      description: "MongoDB、PostgreSQL 基礎操作與設計",
      category: "後端技術",
    },
    {
      name: "DevOps",
      experience: "Side Project",
      description: "Docker、GitHub Actions 自動化部署",
      category: "開發工具",
    },
  ];

  return (
    <section id="about" className="py-20 px-4 bg-gray-50 dark:bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-outer-space dark:text-apricot">
            關於我
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <h3 className="text-2xl font-bold mb-6 text-outer-space dark:text-fawn">
                三年前端開發經驗
              </h3>
              <p className="text-lg mb-6 text-outer-space/80 dark:text-apricot/80 leading-relaxed">
                我是一位擁有三年工作經驗的前端工程師，畢業於淡江大學。在工作中主要使用
                Angular 作為主要框架，
                具備完整的前後端開發能力，能夠獨立完成專案從零到上線的全部流程。
              </p>
              <p className="text-lg text-outer-space/80 dark:text-apricot/80 leading-relaxed">
                擅長與團隊協作，具備敏捷開發經驗，熟悉專案管理流程。透過參與多個
                Side Project 和商業專案，
                不斷精進技術能力，並積極學習新技術來解決實際問題。
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <h3 className="text-2xl font-bold mb-6 text-outer-space dark:text-fawn">
                技能專長
              </h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{
                      duration: 0.6,
                      delay: 0.6 + index * 0.1,
                      ease: "easeOut",
                    }}
                    className="bg-white dark:bg-gray-800/50 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-outer-space dark:text-apricot">
                          {skill.name}
                        </h4>
                        <span className="text-xs text-sandy-brown font-medium">
                          {skill.category}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-outer-space/70 dark:text-apricot/70 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {skill.experience}
                      </span>
                    </div>
                    <p className="text-sm text-outer-space/80 dark:text-apricot/80">
                      {skill.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
