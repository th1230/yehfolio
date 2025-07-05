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
      description:
        '公司對外內容展示與 SEO 優化網站，Lighthouse 效能分數平均達 95%',
      detailedDescription: `此內容展示平台，包含前台與後台系統。前台使用 Razor 切版並搭配 JavaScript 完成功能效果，針對 SEO 與使用者體驗進行深入優化。為提升搜尋引擎收錄率與效能表現，整體系統通過 Google Lighthouse 與 PageSpeed Insights 的檢測，並針對圖片、字體、ARIA 標籤、Meta Tag 等多處細節進行微調，效能分數平均達 95 分以上，並成功通過 Facebook 分享偵錯工具、Twitter Card Validator、LINE 分享檢測等外部平台驗證。
      
      後台採 Angular 架構，實作文章、標籤、廣告等模組的管理功能。文章管理頁面支援 Tab 切換、分頁、狀態切換與草稿回復，並加入畫面預覽功能，提升操作便利性。同時也針對多狀態間邏輯關係進行驗證，確保切換邏輯與資料一致性。整體專案亦精確控制字體、間距與版面呈現進行精細調整，以滿足企業級的品牌呈現標準。`,
      technologies: [
        'Razor',
        'JavaScript',
        'Angular',
        'Lighthouse',
        'SEO',
        'Meta Tag',
        'CSP',
        'Google Search Console',
        'PageSpeed Insights',
      ],
      category: '實務專案',
      duration: '4個月',
      role: '前端開發工程師',
      achievements: [
        'Lighthouse 檢測並調整圖片延遲載入、ARIA 標籤、RWD 優化等細節優化效能分數平均達 95%',
        '實作 Facebook / Twitter / LINE 分享 meta 設定與測試驗證',
        '完成後台文章模組功能，包含狀態切換、預覽與回復',
        '調整前台 CSS 樣式，精確控制字體、間距與版面呈現',
      ],
      challenges: [
        '圖片與字體載入策略優化，提升初始渲染效能',
        '設定 SEO 與 Meta Tag，支援跨平台分享與檢測工具通過',
        '文章模組狀態邏輯與分頁切換的資料一致性處理',
        'CSS 呈現細節優化，符合企業品牌要求',
      ],
      features: [
        'RWD 響應式設計',
        'SEO 與 Lighthouse 最佳化',
        '內容分享（Open Graph / Meta Tag）',
        '內容管理：文章、標籤、廣告模組',
        '文章預覽與狀態切換功能',
      ],
      images: [],
    },
    {
      id: 'financial-platform-phase3',
      title: '金融資訊平台（第三階段）',
      description:
        '參與金融平台第三階段開發，負責分類模組、共用元件整合與專案收尾優化',
      detailedDescription: `本次參與金融資訊平台的第三階段開發，主要提供多類型基金查詢與資訊展示功能。我負責其中一個分類模組，包含各子頁面版面規劃、資料串接與互動邏輯實作，並支援其他分類模組的功能整合與樣式調整。該模組也實作了通用列印功能，並整合進既有的表格與查詢列元件中。
      
      開發過程中理解Nx Monorepo 架構使用方式與元件整合邏輯。在專案後期負責與後端協作，處理跨模組功能錯誤修正與共用元件調整，並協助優化頁面邏輯與元件彈性，確保平台上線品質與擴充性。`,
      technologies: [
        'Angular',
        'TypeScript',
        'SCSS',
        'Highcharts',
        'RxJS',
        'Nx',
      ],
      category: '實務專案',
      duration: '5個月',
      role: '前端開發工程師',
      achievements: [
        '獨立負責分類模組及子頁面切版與功能串接',
        '實作共用列印功能並整合至通用元件架構',
        '支援其他分類模組開發與邏輯整合',
        '參與專案後期錯誤修正、元件優化與穩定性調整',
        '針對功能擴充與版型調整提出具體優化建議',
      ],
      challenges: [
        '理解並擴充前期共用元件邏輯，處理多模組差異化需求',
        '了解 NX monorepo 架構下模組管理與依賴設定',
        '確保複數頁面與分類模組功能整合後的穩定性',
        '處理列印功能在各模組下的顯示與樣式一致性',
      ],
      features: [
        '基金分類查詢與資訊呈現模組',
        '共用查詢列、表格、列印元件整合',
        '跨模組錯誤修正與共用元件彈性優化',
      ],
      images: [],
    },
    {
      id: 'talent-matching-platform',
      title: '才藝媒合平台',
      description:
        '以課程為導向的才藝媒合平台，實作即時聊天、課程預約與 Google 登入功能，提升教學自由度與學習多樣性',
      detailedDescription: `才藝媒合平台聚焦於音樂、藝術、舞蹈等多元才藝領域，強調課程自由度與內容多樣性，讓老師可彈性設計課程、學生能依興趣媒合合適內容。本平台參考語言學習平台設計，並強化課程彈性與自由度，提升整體學習體驗。
      
      前端採用 Angular 並整合 Tailwind CSS，後端以 Node.js + Express 搭配 MongoDB 實作。支援 Google OAuth + JWT 驗證機制、ECPay 金流串接與 WebSocket 即時聊天功能，並透過 Fullcalendar 呈現課程排程。API 文件由 Swagger 自動產出，完整涵蓋從登入、媒合、預約到支付的整體流程。
      `,
      technologies: [
        'Angular',
        'Node.js',
        'Express',
        'MongoDB',
        'Tailwind CSS',
        'WebSocket',
        'Google OAuth',
        'JWT',
        'ECPay',
        'Fullcalendar',
        'Nodemailer',
        'Swagger Autogen',
      ],
      category: 'Side Project',
      duration: '4個月',
      role: '全端開發工程師',
      achievements: [
        '整合 Google OAuth 與 JWT 實作登入與權限管理',
        '以 WebSocket 建構聊天室，支援即時通訊與預約洽談',
        '串接 ECPay 金流完成付款流程',
        '規劃 Swagger 開發流程，實現 API 文件自動生成',
        '主導團隊技術整合與開發節奏協調',
      ],
      challenges: [
        '學習並整合 Google OAuth，掌握其驗證流程與設定細節，實現登入與 JWT 權限控管',
        '實作即時聊天功能，理解 WebSocket 群組通訊原理，規劃後端 Socket 架構與事件流程，並整合進既有 API 系統中',
        '串接綠界金流服務，理解付款流程與通知機制，並設計符合實務需求的交易處理架構',
        '規劃團隊功能分工與開發時程，協調進度與人力配置，並因應時程調整進行功能優先順序的取捨與調整',
      ],
      features: [
        '多元課程查詢與預約',
        '教師自由上架與管理課程',
        '學生課程購買與預約時段管理',
        '即時聊天功能（WebSocket）',
        'Google 第三方登入',
        'ECPay 金流付款流程',
        'Email 預約通知',
      ],
      images: [
        './images/projects/TalentMatch-Home.png',
        './images/projects/TalentMatch-Course-Detail.png',
        './images/projects/TalentMatch-Teacher-Course.png',
      ],
      liveUrl: 'https://talent-match-frontend.onrender.com/home',
      githubUrl: 'https://github.com/TalentMatchNorth10',
    },
    {
      id: 'ai-ticketing-platform',
      title: 'AI 票務平台',
      description:
        '打造簡潔高效的 AI 票務平台，結合活動報名、主辦管理與 AI 推薦，支援 Next.js SSR 與自動化部署',
      detailedDescription: `AI 票務平台針對日常中小型活動（如聚會、市集、工作坊）打造，強調直覺報名流程與「認票不認人」的管理模式，讓主辦方能快速建構活動、管理票券，使用者則可透過 AI 聊天機制獲得個人化活動推薦，提升報名效率與參與體驗。
      
      技術上採用 Next.js App Router 架構，整合 SWR 與 Zustand 管理前端狀態與快取，後端以 Node.js + PostgreSQL + Prisma 建構交易與資料邏輯。整合 AI 機器人 API、票券 QR 驗票、金流、主辦後台等功能，並透過 Docker 與 GitHub Actions 實現自動化部署流程，兼具擴展性與實用性。`,
      technologies: [
        'Next.js',
        'Zustand',
        'SWR',
        'Node.js',
        'PostgreSQL',
        'Prisma',
        'Docker',
        'GitHub Actions',
      ],
      category: 'Side Project',
      duration: '4個月',
      role: '全端開發工程師',
      achievements: [
        '整合 AI 對話機器人，實現活動推薦與互動式搜尋',
        '以 Next.js 實作 SSR 架構',
        '實現活動建立流程以及後台管理系統',
        '使用 Docker 實作容器化部署並導入 GitHub Actions 建立自動化 CI/CD',
        '規劃及調整前後端專案架構並負責團隊進度確認與時程安排，協調任務分工並確保開發節奏穩定推進',
        '規劃與建立活動建立流程 UI 流程與表單邏輯',
      ],
      challenges: [
        '整合 AI 機器人 API，實作公開資料查詢與回應流程，並透過流量控制機制（節流套件）限制過高頻率觸發，避免資源濫用',
        '設計活動建立流程的狀態共用邏輯，並處理多入口（編輯/新建）進入流程時的資料載入與狀態初始化',
        '實作跨 SSR 與 Client 的登入狀態一致性機制，結合 Cookie、Storage 與 Middleware，並透過 Next.js API 設定 HttpOnly Cookie，避免於 client 端直接操作，強化安全性',
        '整合 Docker 與 GitHub Actions 實現前後端自動化部署，過程中解決多架構設定問題',
        '優化 Next.js 在 Ubuntu 環境下的建置流程，將建置時間從 10 分鐘縮短至約 3 分鐘',
      ],
      features: [
        'AI 客服聊天推薦活動',
        '主辦單位活動建立與後台管理',
        '即時訂單與票券查詢',
        'ECPay 金流串接與 QR Code 驗票',
        '自動化部署流程（Docker + GitHub Actions）',
        '多主辦單位支援與活動分群管理',
      ],
      images: [
        './images/projects/Eventa-Home.png',
        './images/projects/Eventa-Event-Overview.png',
        './images/projects/Eventa-AI-Chat.png',
      ],
      liveUrl: 'https://eventa-frontend-prod.onrender.com',
      githubUrl: 'https://github.com/Eventa5',
    },
    {
      id: 'custom-gpt-platform',
      title: '客製化 GPT 平台',
      description:
        '基於 Nuxt.js 開發的 GPT 對話平台，支援 SSE 串接與對話分享功能',
      detailedDescription: `客戶希望能方便使用其自行 fine-tune 的 AI 模型，因此建立一個具備對話、儲存、分享功能的平台。我以 ChatGPT 為參考規劃版面，實作對話輸入框、逐字輸出、自動滾動與響應式設計。應客戶需求加入對話分享與評論功能，簡化操作流程。
    
    前端採 Nuxt.js + Vue 開發，與後端協作串接 OpenAI API，使用 SSE 流式傳輸處理逐字顯示。實作對話歷史記錄管理與狀態控制，讓使用者能查詢與回顧過往對話，整體聚焦於前端互動流程的建構與 UX 細節處理。`,
      technologies: ['Nuxt.js', 'Vue.js', 'SSE', 'OpenAI API'],
      category: '實務專案',
      duration: '2個月',
      role: '前端開發工程師',
      achievements: [
        '完成整體 UI 規劃與互動邏輯設計，支援響應式與打字效果',
        '整合 SSE 串流機制，實現逐字回應輸出與自動滾動',
        '設計對話分享流程，實作複製連結與公開檢視邏輯',
        '建立對話儲存與查詢 API 串接邏輯，支援歷史紀錄功能',
        '與後端溝通 API 架構並協調 SSE 資料格式',
      ],
      challenges: [
        '處理對話過程中逐字回應與自動滾動的同步邏輯',
        '理解與實作 SSE 串流資料處理流程，並搭配打字動畫同步顯示',
        '處理連續對話過程中的狀態同步與捲動行為',
        '設計可分享的對話內容結構，並處理前端路由與檢視邏輯',
        '與後端溝通資料格式、API 回傳規格與錯誤處理方式',
      ],
      features: [
        '即時對話（SSE + 打字效果）',
        '歷史紀錄查詢',
        '對話分享與評論',
        '自動滾動與響應式介面',
      ],
      images: [
        './images/projects/MyGPT-Login.png',
        './images/projects/MyGPT-Home.png',
        './images/projects/MyGPT-Share-Conversation.png',
        './images/projects/MyGPT-Template.png',
      ],
    },
    {
      id: 'line-liff-management',
      title: 'LINE LIFF 管理系統',
      description:
        'LINE LIFF 前台 + React 後台管理系統，支援模板管理與訊息發送',
      detailedDescription:
        '本專案為企業內部系統的新版改造，後台使用 React 開發，負責管理訊息模板、設定發送條件與處理資料維護等功能。前台採用 LINE LIFF + Next.js 技術，讓使用者可透過 LINE 選單進入對應頁面，並串接 LIFF API 搭配後端進行登入驗證。前台介面以簡潔直覺為目標，支援不同模板內容的動態呈現與響應式設計。',
      technologies: ['Next.js', 'React', 'LINE LIFF'],
      category: '實務專案',
      duration: '3個月',
      role: '前端開發工程師',
      achievements: [
        '建置後台模板管理與訊息發送流程，支援 CRUD 與條件篩選',
        '串接 LINE LIFF API，實作用戶登入與權限驗證流程',
        '實作 LIFF 互動頁面，整合 Next.js 並支援 LINE 內嵌操作',
        '設計簡潔易用的前後台畫面，支援動態模板內容與版面切換',
      ],
      challenges: [
        '處理 LINE LIFF 於內嵌環境的限制與登入流程整合',
        '設計模板系統，支援不同訊息類型與結構動態呈現',
      ],
      features: [
        'LINE 登入與 LIFF 整合',
        '訊息模板設定與管理',
        '條件式訊息發送',
        '前後台雙平台分離架構',
      ],
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
                            {currentImageIndex + 1} /
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
