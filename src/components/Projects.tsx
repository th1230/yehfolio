'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiExternalLink, FiGithub, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface Project {
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

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("全部");

  const projects: Project[] = [
    {
      id: "internal-transfer-system",
      title: "內部中轉系統",
      description: "企業內部資料轉換與管理系統，使用 Angular + RxJS 實現自動刷新功能",
      detailedDescription: "為公司開發的內部資料轉換系統，提供前台使用者介面和後台管理功能。使用 Angular 框架搭配 RxJS 實現自動刷新功能，大幅提升了資料處理效率。",
      technologies: ["Angular", "RxJS", "TypeScript", "Bootstrap"],
      category: "商業專案",
      duration: "3個月",
      role: "前端開發工程師",
      achievements: [
        "獨立完成前後台系統開發",
        "實現自動刷新功能，提升使用者體驗",
        "建立完整的資料轉換流程"
      ],
      challenges: [
        "複雜的資料轉換邏輯處理",
        "即時資料同步機制設計",
        "前後台權限管理系統"
      ],
      features: [
        "自動資料刷新",
        "權限管理系統",
        "資料轉換介面",
        "後台管理功能"
      ],
      images: []
    },
    {
      id: "digital-nomad-platform",
      title: "數位游牧平台",
      description: "數位游牧生活資訊平台，Lighthouse 效能分數達 95%",
      detailedDescription: "使用 Razor 進行前台切版，搭配 JavaScript 實現功能邏輯。後台使用 Angular 開發管理平台，通過 Lighthouse 檢測達到 95% 的效能分數，實現完整的 SEO 優化。",
      technologies: ["Razor", "JavaScript", "Angular", "Lighthouse優化", "SEO"],
      category: "商業專案",
      duration: "4個月",
      role: "全端開發工程師",
      achievements: [
        "Lighthouse 效能分數達 95%",
        "Google Search Console 索引優化",
        "響應式圖片與懶加載實現",
        "CSP 安全性設置完成"
      ],
      challenges: [
        "效能優化至 95% Lighthouse 分數",
        "SEO 優化與 Structured Data 設置",
        "圖片優化與懶加載實現"
      ],
      features: [
        "響應式設計",
        "圖片懶加載",
        "SEO 優化",
        "內容管理系統",
        "文章分類管理"
      ],
      images: [],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/yourusername/project"
    },
    {
      id: "financial-reporting-platform",
      title: "期信申報平台",
      description: "金融期貨信託申報系統，實現複雜的多頁面通用列印功能",
      detailedDescription: "使用 Angular 開發的金融申報系統，主要負責頁面內容管理與開發。實現了複雜的多頁面通用列印功能，確保符合金融法規要求。",
      technologies: ["Angular", "TypeScript", "RxJS"],
      category: "金融專案",
      duration: "6個月",
      role: "前端開發工程師",
      achievements: [
        "完成多頁面通用列印功能",
        "頁面內容管理系統開發",
        "共用元件優化與調整"
      ],
      challenges: [
        "複雜的列印格式處理",
        "多頁面資料整合",
        "金融法規遵循要求"
      ],
      features: [
        "多頁面列印",
        "資料管理",
        "表單驗證",
        "報表生成"
      ],
      images: []
    },
    {
      id: "fund-observatory",
      title: "基金觀測站",
      description: "第三期金融專案，包含期信子分類與境外境內基金功能開發",
      detailedDescription: "金融相關的基金資訊平台，包含期信子分類頁面開發以及境外境內基金內容開發。同樣實現了多頁面通用列印功能。",
      technologies: ["Angular", "TypeScript", "Chart.js"],
      category: "金融專案",
      duration: "5個月",
      role: "前端開發工程師",
      achievements: [
        "期信子分類頁面開發",
        "境外境內基金功能實現",
        "資料視覺化圖表整合"
      ],
      challenges: [
        "複雜的基金資料結構",
        "多層級分類系統",
        "即時資料更新機制"
      ],
      features: [
        "基金資訊查詢",
        "資料視覺化",
        "分類管理",
        "報表列印"
      ],
      images: []
    },
    {
      id: "talent-matching-platform",
      title: "才藝媒合平台",
      description: "全端開發的才藝媒合網站，整合 WebSocket、Google OAuth、JWT 等技術",
      detailedDescription: "團體 Side Project，使用 Node.js + Express + MongoDB 後端，Angular 前端。整合 WebSocket、Google OAuth、JWT 等技術，實現完整的媒合平台功能。",
      technologies: ["Angular", "Node.js", "Express", "MongoDB", "WebSocket", "Google OAuth"],
      category: "Side Project",
      duration: "4個月",
      role: "全端開發工程師",
      achievements: [
        "完整全端開發經驗",
        "即時通訊功能實現",
        "第三方登入整合",
        "團隊協作經驗"
      ],
      challenges: [
        "即時通訊系統設計",
        "用戶認證與授權",
        "媒合演算法實現"
      ],
      features: [
        "即時聊天",
        "才藝媒合",
        "Google 登入",
        "個人檔案管理"
      ],
      images: [],
      githubUrl: "https://github.com/yourusername/talent-matching"
    },
    {
      id: "ai-ticketing-platform",
      title: "AI 票務平台",
      description: "整合 AI 機器人的票務平台，使用 Next.js SSR + Docker + GitHub Actions 自動部署",
      detailedDescription: "使用 Next.js SSR + Zustand + SWR 前端，Node.js + PostgreSQL + Prisma 後端。通過 Docker 容器化部署，GitHub Actions 自動化 CI/CD。",
      technologies: ["Next.js", "Zustand", "SWR", "Node.js", "PostgreSQL", "Prisma", "Docker"],
      category: "Side Project",
      duration: "3個月",
      role: "全端開發工程師",
      achievements: [
        "AI 機器人整合",
        "Docker 容器化部署",
        "GitHub Actions CI/CD",
        "現代化狀態管理"
      ],
      challenges: [
        "AI 機器人 API 整合",
        "容器化部署配置",
        "自動化部署流程"
      ],
      features: [
        "AI 客服機器人",
        "票務管理",
        "自動化部署",
        "狀態管理"
      ],
      images: [],
      liveUrl: "https://your-ticketing-app.render.com",
      githubUrl: "https://github.com/yourusername/ai-ticketing"
    },
    {
      id: "custom-gpt-platform",
      title: "客製化 GPT 平台",
      description: "基於 Nuxt.js 的 GPT 對話平台，使用 SSE 串接 OpenAI API",
      detailedDescription: "與外部後端工程師協作，使用 Nuxt.js 開發客製化 GPT 平台。實現對話功能、自動顯示、歷史資料管理等功能，使用 SSE 串接 OpenAI API。",
      technologies: ["Nuxt.js", "Vue.js", "SSE", "OpenAI API"],
      category: "協作專案",
      duration: "2個月",
      role: "前端開發工程師",
      achievements: [
        "SSE 即時通訊實現",
        "對話歷史管理",
        "OpenAI API 整合",
        "Vue 生態系統掌握"
      ],
      challenges: [
        "SSE 串流資料處理",
        "對話狀態管理",
        "API 串接優化"
      ],
      features: [
        "即時對話",
        "歷史紀錄",
        "對話分享",
        "自動化顯示"
      ],
      images: []
    },
    {
      id: "line-liff-management",
      title: "LINE LIFF 管理系統",
      description: "LINE LIFF 前台 + React 後台管理系統，包含模板設定與發送功能",
      detailedDescription: "前台使用 LINE LIFF + Next.js 實現客製化網站，後台使用 React 開發內部管理系統，包含模板設定與發送功能。",
      technologies: ["Next.js", "React", "LINE LIFF", "LINE API"],
      category: "協作專案",
      duration: "3個月",
      role: "前端開發工程師",
      achievements: [
        "LINE LIFF 平台整合",
        "模板管理系統",
        "訊息發送功能",
        "雙平台開發經驗"
      ],
      challenges: [
        "LINE LIFF 限制處理",
        "模板系統設計",
        "跨平台整合"
      ],
      features: [
        "LINE 整合",
        "模板管理",
        "訊息發送",
        "內部管理系統"
      ],
      images: []
    }
  ];

  const categories = ["全部", "商業專案", "金融專案", "Side Project", "協作專案"];

  const filteredProjects = selectedCategory === "全部" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const nextImage = () => {
    if (selectedProject?.images) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images!.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject?.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images!.length - 1 : prev - 1
      );
    }
  };

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'unset';
  };

  // 鍵盤支援
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!selectedProject) return;
    
    if (event.key === 'Escape') {
      closeModal();
    } else if (event.key === 'ArrowLeft' && selectedProject.images && selectedProject.images.length > 1) {
      prevImage();
    } else if (event.key === 'ArrowRight' && selectedProject.images && selectedProject.images.length > 1) {
      nextImage();
    }
  };

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
            探索我的開發專案，從商業系統到創新應用，每個專案都體現了技術深度與實務經驗
          </p>

          {/* 分類篩選 */}
          <motion.div
            className="flex flex-wrap justify-center mb-12 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full border-2 transition-all duration-300 ${
                  selectedCategory === category
                    ? 'border-sandy-brown bg-sandy-brown text-white'
                    : 'border-outer-space/20 dark:border-apricot/20 text-outer-space dark:text-apricot hover:border-sandy-brown hover:text-sandy-brown'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* 專案網格 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-white dark:bg-gray-800/50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl 
                         transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.1 * index, ease: "easeOut" }}
                whileHover={{ y: -5 }}
                onClick={() => openModal(project)}
              >
                <div className="h-48 bg-gradient-to-br from-sandy-brown/10 to-fawn/10 flex items-center justify-center relative overflow-hidden">
                  {project.images && project.images.length > 0 ? (
                    <>
                      <img
                        src={project.images[0]}
                        alt={`${project.title} 預覽`}
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className="absolute bottom-2 right-2">
                        <span className="bg-black/50 text-white text-xs px-2 py-1 rounded">
                          {project.images.length} 張圖片
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-sandy-brown/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-2xl font-bold text-sandy-brown">
                          {project.title.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm text-outer-space/60 dark:text-apricot/60">
                        {project.category}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-outer-space dark:text-apricot">
                    {project.title}
                  </h3>
                  <p className="text-outer-space/80 dark:text-apricot/80 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-sandy-brown/10 text-sandy-brown text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-outer-space/60 dark:text-apricot/60 text-xs rounded-full">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-outer-space/60 dark:text-apricot/60">
                      {project.duration}
                    </span>
                    <span className="text-sandy-brown text-sm font-medium">
                      點擊查看詳情 →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 專案詳情彈窗 */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-outer-space dark:text-apricot">
                {selectedProject.title}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <FiX className="w-6 h-6 text-outer-space dark:text-apricot" />
              </button>
            </div>

            <div className="p-6">
              {/* 圖片輪播區域 */}
              {selectedProject.images && selectedProject.images.length > 0 && (
                <div className="relative mb-6">
                  <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <img
                      src={selectedProject.images[currentImageIndex]}
                      alt={`${selectedProject.title} - 圖片 ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {selectedProject.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      >
                        <FiChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      >
                        <FiChevronRight className="w-6 h-6" />
                      </button>
                      
                      <div className="flex justify-center mt-4 space-x-2">
                        {selectedProject.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${
                              index === currentImageIndex ? 'bg-sandy-brown' : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      
                      <div className="text-center mt-2">
                        <span className="text-sm text-outer-space/60 dark:text-apricot/60">
                          {currentImageIndex + 1} / {selectedProject.images.length}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* 專案基本資訊 */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-outer-space dark:text-apricot">專案概述</h3>
                  <p className="text-outer-space/80 dark:text-apricot/80 mb-4">
                    {selectedProject.detailedDescription}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex">
                      <span className="font-medium text-outer-space dark:text-apricot w-20">類型：</span>
                      <span className="text-outer-space/80 dark:text-apricot/80">{selectedProject.category}</span>
                    </div>
                    <div className="flex">
                      <span className="font-medium text-outer-space dark:text-apricot w-20">期間：</span>
                      <span className="text-outer-space/80 dark:text-apricot/80">{selectedProject.duration}</span>
                    </div>
                    <div className="flex">
                      <span className="font-medium text-outer-space dark:text-apricot w-20">角色：</span>
                      <span className="text-outer-space/80 dark:text-apricot/80">{selectedProject.role}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-outer-space dark:text-apricot">使用技術</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-sandy-brown/10 text-sandy-brown text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-lg font-semibold mb-2 text-outer-space dark:text-apricot">主要功能</h3>
                  <ul className="space-y-1">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} className="text-outer-space/80 dark:text-apricot/80 text-sm">
                        • {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 成就與挑戰 */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-outer-space dark:text-apricot">主要成就</h3>
                  <ul className="space-y-2">
                    {selectedProject.achievements.map((achievement, index) => (
                      <li key={index} className="text-outer-space/80 dark:text-apricot/80 text-sm flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-outer-space dark:text-apricot">技術挑戰</h3>
                  <ul className="space-y-2">
                    {selectedProject.challenges.map((challenge, index) => (
                      <li key={index} className="text-outer-space/80 dark:text-apricot/80 text-sm flex items-start">
                        <span className="text-sandy-brown mr-2">⚡</span>
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 連結區域 */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                {selectedProject.liveUrl ? (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-sandy-brown text-white rounded-lg hover:bg-sandy-brown/90 transition-colors"
                  >
                    <FiExternalLink className="w-4 h-4" />
                    <span>查看網站</span>
                  </a>
                ) : (
                  <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <FiExternalLink className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-outer-space/60 dark:text-apricot/60">內部系統無法公開訪問</span>
                  </div>
                )}
                
                {selectedProject.githubUrl ? (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-outer-space dark:text-apricot rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FiGithub className="w-4 h-4" />
                    <span>查看程式碼</span>
                  </a>
                ) : (
                  <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <FiGithub className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-outer-space/60 dark:text-apricot/60">商業專案代碼不公開</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="text-sm text-blue-600 dark:text-blue-400">
                    💡 如需了解更多技術細節，歡迎聯絡討論
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
