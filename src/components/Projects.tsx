'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  FiExternalLink,
  FiGithub,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';

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
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const projects: Project[] = [
    {
      id: 'corporate-content-platform',
      title: '企業內容平台',
      description: '公司對外內容展示與 SEO 優化網站，Lighthouse 效能分數達 95%',
      detailedDescription:
        '協助公司開發對外公開的內容展示平台，使用 Razor 進行前台切版，搭配 JavaScript 實現互動邏輯。後台採用 Angular 架構開發管理介面，專注於效能優化與 SEO 實作，成功通過 Lighthouse 效能評測並達成 Google 索引最佳化。',
      technologies: [
        'Razor',
        'JavaScript',
        'Angular',
        'Lighthouse 優化',
        'SEO',
        'CSP',
      ],
      category: '實務專案',
      duration: '4 個月',
      role: '前端開發工程師',
      achievements: [
        'Lighthouse 效能分數達 95%',
        '實作 Google Search Console 與 Meta Tag 優化',
        '實現響應式圖片與圖片懶加載',
        '完成 CSP 安全性標頭設置',
      ],
      challenges: [
        '頁面效能優化至 95% 以上',
        'SEO 設定與 Structured Data 整合',
        '圖片最佳化與懶加載邏輯',
      ],
      features: [
        '響應式設計',
        'SEO 優化',
        '圖片延遲載入',
        '內容模組管理',
        '文章分類展示',
      ],
      images: [],
    },
    {
      id: 'financial-platform-phase3',
      title: '金融資訊平台（第三階段）',
      category: '實務專案',
      role: '前端開發工程師',
      duration: '5 個月',
      description:
        '參與大型平台第三階段開發，負責分類模組、頁面實作與收尾優化。',
      detailedDescription: `本專案為一項多階段開發的大型金融平台，內容涵蓋多種基金資料查詢與呈現。本人在第三階段開發中，負責其中一個主要分類模組，包含多個子頁面的實作，也協助其他模組部分頁面的開發與調整。

    後期參與專案收尾工作，包括修正功能細節、優化共用元件（如查詢列、列印模組、表格等），並依照實際需求調整元件邏輯與畫面行為。開發過程中針對前期既有元件結構進行理解與延伸，確保新需求能順利整合進現有架構。
  `,
      technologies: ['Angular', 'TypeScript', 'SCSS', 'Highcharts', 'RxJS'],
      achievements: [
        '實作分類模組與多個子頁面',
        '支援其他模組的部分功能開發與調整',
        '收尾階段進行功能修正與需求整合',
        '調整共用元件以符合多模組使用場景',
      ],
      challenges: [
        '處理元件重用情境下的邏輯差異',
        '針對前期既有元件進行延伸與維護',
        '確保多頁面功能整合後的一致性與穩定性',
      ],
      features: [
        '分類型基金資訊查詢模組',
        '查詢列、表格、列印元件共用設計',
        '跨模組錯誤修正與邊緣情境處理',
      ],
      images: [],
    },
    {
      id: 'talent-matching-platform',
      title: '才藝媒合平台',
      description:
        '全端開發的才藝媒合網站，整合 WebSocket、Google OAuth、JWT 等技術',
      detailedDescription:
        '團體 Side Project，使用 Node.js + Express + MongoDB 後端，Angular 前端。整合 WebSocket、Google OAuth、JWT 等技術，實現完整的媒合平台功能。',
      technologies: [
        'Angular',
        'Node.js',
        'Express',
        'MongoDB',
        'WebSocket',
        'Google OAuth',
      ],
      category: 'Side Project',
      duration: '4個月',
      role: '全端開發工程師',
      achievements: [
        '完整全端開發經驗',
        '即時通訊功能實現',
        '第三方登入整合',
        '團隊協作經驗',
      ],
      challenges: ['即時通訊系統設計', '用戶認證與授權', '綠界金流串接'],
      features: ['即時聊天', '才藝媒合', 'Google 登入', '個人檔案管理'],
      images: [
        '/images/projects/TalentMatch-Home.png',
        '/images/projects/TalentMatch-Course-Detail.png',
        '/images/projects/TalentMatch-Teacher-Course.png',
      ],
      liveUrl: 'https://talent-match-frontend.onrender.com/home',
      githubUrl: 'https://github.com/TalentMatchNorth10',
    },
    {
      id: 'ai-ticketing-platform',
      title: 'AI 票務平台',
      description:
        '整合 AI 機器人的票務平台，使用 Next.js SSR + Docker + GitHub Actions 自動部署',
      detailedDescription:
        '使用 Next.js SSR + Zustand + SWR 前端，Node.js + PostgreSQL + Prisma 後端。通過 Docker 容器化部署，GitHub Actions 自動化 CI/CD。',
      technologies: [
        'Next.js',
        'Zustand',
        'SWR',
        'Node.js',
        'PostgreSQL',
        'Prisma',
        'Docker',
      ],
      category: 'Side Project',
      duration: '4個月',
      role: '全端開發工程師',
      achievements: [
        'AI 機器人整合',
        'Docker 容器化部署',
        'GitHub Actions CI/CD',
        '現代化狀態管理',
      ],
      challenges: ['AI 機器人 API 整合', '容器化部署配置', '自動化部署流程'],
      features: ['AI 客服機器人', '票務管理', '自動化部署', '狀態管理'],
      images: [
        '/images/projects/Eventa-Home.png',
        '/images/projects/Eventa-Event-Overview.png',
        '/images/projects/Eventa-AI-Chat.png',
      ],
      liveUrl: 'https://eventa-frontend-prod.onrender.com',
      githubUrl: 'https://github.com/Eventa5',
    },
    {
      id: 'custom-gpt-platform',
      title: '客製化 GPT 平台',
      description: '基於 Nuxt.js 的 GPT 對話平台，使用 SSE 串接 OpenAI API',
      detailedDescription:
        '與外部後端工程師協作，使用 Nuxt.js 開發客製化 GPT 平台。實現對話功能、自動顯示、歷史資料管理等功能，使用 SSE 串接 OpenAI API。',
      technologies: ['Nuxt.js', 'Vue.js', 'SSE', 'OpenAI API'],
      category: '實務專案',
      duration: '2個月',
      role: '前端開發工程師',
      achievements: [
        'SSE 即時通訊實現',
        '對話歷史管理',
        'OpenAI API 整合',
        'Vue 生態系統掌握',
      ],
      challenges: ['SSE 串流資料處理', '對話狀態管理', 'API 串接優化'],
      features: ['即時對話', '歷史紀錄', '對話分享', '自動化顯示'],
      images: [
        '/images/projects/MyGPT-Login.png',
        '/images/projects/MyGPT-Home.png',
        '/images/projects/MyGPT-Share-Conversation.png',
        '/images/projects/MyGPT-Template.png',
      ],
    },
    {
      id: 'line-liff-management',
      title: 'LINE LIFF 管理系統',
      description:
        'LINE LIFF 前台 + React 後台管理系統，包含模板設定與發送功能',
      detailedDescription:
        '前台使用 LINE LIFF + Next.js 實現客製化網站，後台使用 React 開發內部管理系統，包含模板設定與發送功能。',
      technologies: ['Next.js', 'React', 'LINE LIFF'],
      category: '實務專案',
      duration: '3個月',
      role: '前端開發工程師',
      achievements: [
        'LINE LIFF 平台整合',
        '模板管理系統',
        '訊息發送功能',
        '雙平台開發經驗',
      ],
      challenges: ['LINE LIFF 限制處理', '模板系統設計', '跨平台整合'],
      features: ['LINE 整合', '模板管理', '訊息發送', '內部管理系統'],
      images: [],
    },
  ];

  const categories = ['全部', 'Side Project', '實務專案'];

  const filteredProjects =
    selectedCategory === '全部'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const nextImage = () => {
    if (selectedProject?.images) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images!.length - 1 ? 0 : prev + 1,
      );
    }
  };

  const prevImage = () => {
    if (selectedProject?.images) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images!.length - 1 : prev - 1,
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
    } else if (
      event.key === 'ArrowLeft' &&
      selectedProject.images &&
      selectedProject.images.length > 1
    ) {
      prevImage();
    } else if (
      event.key === 'ArrowRight' &&
      selectedProject.images &&
      selectedProject.images.length > 1
    ) {
      nextImage();
    }
  };

  return (
    <section
      id="projects"
      className="bg-gray-50 px-4 py-20 dark:bg-gray-900/30"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-outer-space dark:text-apricot mb-8 text-center text-4xl font-bold md:text-5xl">
            精選作品
          </h2>
          <p className="text-outer-space/80 dark:text-apricot/80 mx-auto mb-12 max-w-2xl text-center text-xl">
            探索我的開發專案，從商業系統到創新應用，每個專案都體現了技術深度與實務經驗
          </p>

          {/* 分類篩選 */}
          <motion.div
            className="mb-12 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`cursor-pointer rounded-full border-2 px-6 py-2 transition-all duration-300 ${
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
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800/50"
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{
                  duration: 0.6,
                  delay: 0.1 * index,
                  ease: 'easeOut',
                }}
                whileHover={{ y: -5 }}
                onClick={() => openModal(project)}
              >
                <div className="from-sandy-brown/10 to-fawn/10 relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br">
                  {project.images && project.images.length > 0 ? (
                    <>
                      <img
                        src={project.images[0]}
                        alt={`${project.title} 預覽`}
                        className="h-full w-full object-cover opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className="absolute right-2 bottom-2">
                        <span className="rounded bg-black/50 px-2 py-1 text-xs text-white">
                          {project.images.length} 張圖片
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <div className="bg-sandy-brown/20 mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full">
                        <span className="text-sandy-brown text-2xl font-bold">
                          {project.title.charAt(0)}
                        </span>
                      </div>
                      <span className="text-outer-space/60 dark:text-apricot/60 text-sm">
                        {project.category}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-outer-space dark:text-apricot mb-3 text-xl font-bold">
                    {project.title}
                  </h3>
                  <p className="text-outer-space/80 dark:text-apricot/80 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="bg-sandy-brown/10 text-sandy-brown rounded-full px-2 py-1 text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-outer-space/60 dark:text-apricot/60 rounded-full bg-gray-100 px-2 py-1 text-xs dark:bg-gray-700">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-outer-space/60 dark:text-apricot/60 text-sm">
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <motion.div
            className="max-h-[90vh] w-full max-w-4xl rounded-xl bg-white p-6 dark:bg-gray-800"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white pb-6 dark:border-gray-700 dark:bg-gray-800">
              <h2 className="text-outer-space dark:text-apricot text-2xl font-bold">
                {selectedProject.title}
              </h2>
              <button
                onClick={closeModal}
                className="cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FiX className="text-outer-space dark:text-apricot h-6 w-6" />
              </button>
            </div>

            <div className="max-h-[400px] overflow-y-auto pt-6">
              {/* 圖片輪播區域 */}
              {selectedProject.images && selectedProject.images.length > 0 && (
                <div className="relative mb-[84px]">
                  <div className="aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                    <img
                      src={selectedProject.images[currentImageIndex]}
                      alt={`${selectedProject.title} - 圖片 ${
                        currentImageIndex + 1
                      }`}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  {selectedProject.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute top-1/2 left-2 -translate-y-1/2 transform cursor-pointer rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
                      >
                        <FiChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute top-1/2 right-2 -translate-y-1/2 transform cursor-pointer rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
                      >
                        <FiChevronRight className="h-6 w-6" />
                      </button>

                      <div className="absolute right-0 -bottom-[60px] left-0">
                        <div className="mt-4 flex justify-center space-x-2">
                          {selectedProject.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`h-3 w-3 cursor-pointer rounded-full transition-colors ${
                                index === currentImageIndex
                                  ? 'bg-sandy-brown'
                                  : 'bg-gray-300 dark:bg-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="mt-2 text-center">
                          <span className="text-outer-space/60 dark:text-apricot/60 text-sm">
                            {currentImageIndex + 1} /{' '}
                            {selectedProject.images.length}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* 專案基本資訊 */}
              <div className="mb-6 grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-outer-space dark:text-apricot mb-2 text-lg font-semibold">
                    專案概述
                  </h3>
                  <p className="text-outer-space/80 dark:text-apricot/80 mb-4 whitespace-pre-line">
                    {selectedProject.detailedDescription}
                  </p>

                  <div className="space-y-2">
                    <div className="flex">
                      <span className="text-outer-space dark:text-apricot w-20 font-medium">
                        類型：
                      </span>
                      <span className="text-outer-space/80 dark:text-apricot/80">
                        {selectedProject.category}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-outer-space dark:text-apricot w-20 font-medium">
                        期間：
                      </span>
                      <span className="text-outer-space/80 dark:text-apricot/80">
                        {selectedProject.duration}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-outer-space dark:text-apricot w-20 font-medium">
                        角色：
                      </span>
                      <span className="text-outer-space/80 dark:text-apricot/80">
                        {selectedProject.role}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-outer-space dark:text-apricot mb-2 text-lg font-semibold">
                    使用技術
                  </h3>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-sandy-brown/10 text-sandy-brown rounded-full px-3 py-1 text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-outer-space dark:text-apricot mb-2 text-lg font-semibold">
                    主要功能
                  </h3>
                  <ul className="space-y-1">
                    {selectedProject.features.map((feature, index) => (
                      <li
                        key={index}
                        className="text-outer-space/80 dark:text-apricot/80 text-sm"
                      >
                        • {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 成就與挑戰 */}
              <div className="mb-6 grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-outer-space dark:text-apricot mb-2 text-lg font-semibold">
                    主要成就
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.achievements.map((achievement, index) => (
                      <li
                        key={index}
                        className="text-outer-space/80 dark:text-apricot/80 flex items-start text-sm"
                      >
                        <span className="mr-2 text-green-500">✓</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-outer-space dark:text-apricot mb-2 text-lg font-semibold">
                    技術挑戰
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.challenges.map((challenge, index) => (
                      <li
                        key={index}
                        className="text-outer-space/80 dark:text-apricot/80 flex items-start text-sm"
                      >
                        <span className="text-sandy-brown mr-2">⚡</span>
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 連結區域 */}
              <div className="flex flex-wrap gap-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                {selectedProject.liveUrl ? (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-sandy-brown hover:bg-sandy-brown/90 flex items-center space-x-2 rounded-lg px-4 py-2 text-white transition-colors"
                  >
                    <FiExternalLink className="h-4 w-4" />
                    <span>查看網站</span>
                  </a>
                ) : (
                  <div className="flex items-center space-x-2 rounded-lg bg-gray-100 px-4 py-2 dark:bg-gray-700">
                    <FiExternalLink className="h-4 w-4 text-gray-400" />
                    <span className="text-outer-space/60 dark:text-apricot/60 text-sm">
                      內部系統無法公開訪問
                    </span>
                  </div>
                )}

                {selectedProject.githubUrl ? (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-outer-space dark:text-apricot flex items-center space-x-2 rounded-lg border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                  >
                    <FiGithub className="h-4 w-4" />
                    <span>查看程式碼</span>
                  </a>
                ) : (
                  <div className="flex items-center space-x-2 rounded-lg bg-gray-100 px-4 py-2 dark:bg-gray-700">
                    <FiGithub className="h-4 w-4 text-gray-400" />
                    <span className="text-outer-space/60 dark:text-apricot/60 text-sm">
                      商業專案代碼不公開
                    </span>
                  </div>
                )}

                <div className="flex items-center space-x-2 rounded-lg bg-blue-50 px-4 py-2 dark:bg-blue-900/20">
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
