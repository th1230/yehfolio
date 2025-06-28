'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      id: 1,
      title: "電商平台設計",
      description: "現代化的電商平台界面設計，注重使用者體驗與轉換率優化",
      category: "UI/UX 設計",
      image: "/api/placeholder/400/300",
      tags: ["Figma", "使用者研究", "原型設計"],
      link: "#"
    },
    {
      id: 2,
      title: "企業網站開發",
      description: "響應式企業網站，使用 Next.js 與 TypeScript 開發",
      category: "前端開發",
      image: "/api/placeholder/400/300",
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
      link: "#"
    },
    {
      id: 3,
      title: "行動應用程式設計",
      description: "健康管理應用程式的完整 UI/UX 設計與原型製作",
      category: "UI/UX 設計",
      image: "/api/placeholder/400/300",
      tags: ["移動端設計", "原型製作", "使用者測試"],
      link: "#"
    },
    {
      id: 4,
      title: "設計系統建立",
      description: "為大型專案建立一致性的設計系統與組件庫",
      category: "設計系統",
      image: "/api/placeholder/400/300",
      tags: ["設計系統", "組件庫", "品牌一致性"],
      link: "#"
    },
    {
      id: 5,
      title: "資料視覺化平台",
      description: "互動式資料視覺化儀表板，結合美觀與功能性",
      category: "前端開發",
      image: "/api/placeholder/400/300",
      tags: ["React", "D3.js", "資料視覺化"],
      link: "#"
    },
    {
      id: 6,
      title: "品牌識別設計",
      description: "完整的品牌識別系統設計，從 Logo 到應用規範",
      category: "品牌設計",
      image: "/api/placeholder/400/300",
      tags: ["品牌設計", "Logo 設計", "視覺識別"],
      link: "#"
    }
  ];

  const categories = ["全部", "UI/UX 設計", "前端開發", "設計系統", "品牌設計"];

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-outer-space dark:text-apricot">
            精選作品
          </h2>
          <p className="text-xl text-center mb-12 text-outer-space/80 dark:text-apricot/80 max-w-2xl mx-auto">
            探索我的設計與開發作品，每個專案都體現了對細節的追求與創新思維
          </p>

          {/* 分類篩選 */}
          <motion.div
            className="flex flex-wrap justify-center mb-12 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className="px-6 py-2 rounded-full border-2 border-outer-space/20 dark:border-apricot/20 
                         text-outer-space dark:text-apricot transition-all duration-300
                         hover:border-sandy-brown hover:text-sandy-brown"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1, ease: "easeOut" }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* 作品網格 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group bg-white dark:bg-gray-800/50 rounded-xl overflow-hidden shadow-lg 
                         hover:shadow-xl transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1, ease: "easeOut" }}
                whileHover={{ y: -8 }}
              >
                <div className="relative overflow-hidden">
                  <div className="w-full h-48 bg-gradient-to-br from-apricot to-sandy-brown"></div>
                  <motion.div
                    className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"
                    whileHover={{ opacity: 1 }}
                  />
                </div>
                
                <div className="p-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                  >
                    <span className="text-sm font-medium text-sandy-brown mb-2 block">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold mb-3 text-outer-space dark:text-apricot">
                      {project.title}
                    </h3>
                    <p className="text-outer-space/80 dark:text-apricot/80 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm 
                                   text-outer-space dark:text-apricot rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <motion.button
                      className="flex items-center text-sandy-brown font-medium group-hover:text-fawn 
                               transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      查看詳情
                      <motion.span
                        className="ml-2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        →
                      </motion.span>
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
