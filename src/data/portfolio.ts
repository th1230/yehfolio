export interface CaseStudyThread {
  title: string;
  finding: string;
  decision: string;
  result: string;
}

export interface ProjectRecord {
  id: string;
  title: string;
  category: 'ENTERPRISE' | 'SIDE_PROJECT';
  type: string;
  year: string;
  client: string;
  role: string;
  desc: string;
  details: string[];
  highlights: string[];
  challenges: string[];
  features: string[];
  caseStudy: {
    context: string;
    threads: CaseStudyThread[];
  };
  tech: string[];
  metrics: Record<string, string>;
  repo?: string;
  liveUrl?: string;
  images?: string[];
}

export interface CareerStage {
  period: string;
  stage: string;
  title: string;
  role: string;
  summary: string;
  items: Array<{
    label: string;
    text: string;
  }>;
  tags: string[];
}

export const PROJECTS: ProjectRecord[] = [
  {
    id: 'CMS-01',
    title: 'CORPORATE_CONTENT_PLATFORM',
    category: 'ENTERPRISE',
    type: '企業內容展示與管理平台',
    year: '2023-2024',
    client: 'CONTENT_PLATFORM',
    role: '前端開發工程師',
    desc: '官網翻新重做案。前台以 Razor 作為 SSR 方案並搭配 .NET，重點放在 SEO、UI/UX 與品牌呈現細節；後台以 Angular 管理內容上下架、文章、廣告、預覽與排序等動態資料。',
    details: [
      '前台以 Razor 作為 SSR 呈現方案，搭配 .NET 與 JavaScript 完成官網內容展示、互動效果與 RWD，並針對 SEO、字體、間距、顏色、ARIA、Meta Tag、分享預覽與載入策略做細節調整。',
      '後台採 Angular 架構，負責內容上下架、文章新增/編輯/刪除/查詢、預覽、排序、廣告等管理模組，處理動態切換與資料狀態一致性。',
    ],
    highlights: [
      '調整圖片延遲載入、ARIA 標籤、RWD 與字體載入策略，Lighthouse SEO / 效能分數平均達 95+。',
      '實作 Facebook、Twitter、LINE 分享用 Open Graph / Meta Tag，並通過外部檢測工具驗證。',
      '完成後台文章模組的狀態切換、草稿回復、分頁與預覽流程，提升內容管理效率。',
    ],
    challenges: [
      '圖片與字體載入策略優化，降低初始渲染負擔。',
      '跨平台分享 Meta Tag 設定與外部檢測工具驗證。',
      '文章狀態、分頁與預覽流程之間的資料一致性處理。',
    ],
    features: [
      'RWD 響應式設計',
      'SEO / Lighthouse 最佳化',
      'Open Graph 分享設定',
      '文章 / 標籤 / 廣告後台管理',
    ],
    caseStudy: {
      context:
        '官網翻新完全重做案。前台以 Razor + .NET 做 SSR 呈現，確保公開網站在 SEO、載入、社群分享與品牌視覺上穩定；後台以 Angular 承接內容管理、上下架與多模組動態操作。',
      threads: [
        {
          title: '前台 SSR 與 SEO 呈現',
          finding:
            '公開官網需要被搜尋引擎、社群爬蟲與外部驗證工具正確讀取，HTML 結構、Meta、分享預覽與載入策略都會影響最終呈現。',
          decision:
            '以前端切版與互動配合 Razor + .NET SSR，讓主要內容與 Meta 資訊在伺服器端輸出，JavaScript 只承接互動、RWD 與細部體驗。',
          result:
            '完成官網前台翻新，並針對 SEO、Meta Tag、Open Graph、ARIA、圖片與載入策略細修，Lighthouse SEO / 效能平均達 95+，分享預覽也通過外部工具驗證。',
        },
        {
          title: '內容生命週期一致性',
          finding:
            '後台同時處理文章、廣告、排序、預覽、上下架與草稿回復；狀態若分散在頁面流程中，預覽內容與正式內容容易出現落差。',
          decision:
            '以 Angular 模組化管理內容流程，把編輯、預覽、排序、上下架與草稿回復收斂到一致的資料狀態與元件邊界。',
          result:
            '內容管理者能在同一套流程中完成新增、編輯、預覽、排序與上下架，降低正式內容與後台狀態不一致的風險。',
        },
      ],
    },
    tech: ['Razor', 'JavaScript', 'Angular', 'SEO', 'Meta Tag', 'Lighthouse'],
    metrics: {
      seo: '95+',
      scope: '前後台',
      share: 'OG_VALIDATED',
    },
    images: [
      '/images/projects/Digital-Nomad-Home.png',
      '/images/projects/Digital-Nomad-Articles.png',
      '/images/projects/Digital-Nomad-Lighthouse.png',
    ],
  },
  {
    id: 'FIN-03',
    title: 'FINANCIAL_INFO_PLATFORM',
    category: 'ENTERPRISE',
    type: '金融資訊平台第三階段',
    year: '2024-2025',
    client: 'FINANCE_PLATFORM',
    role: '前端開發工程師',
    desc: '金融前台第三階段擴充案。主要負責期信功能模組核心開發，完成後續也接手全專案維護、優化、調整與收尾，直到第三階段上線。',
    details: [
      '主要負責期信功能模組核心開發，包含前台子頁面、資料串接、互動邏輯、查詢列、表格、資料呈現與相關頁面流程。',
      '後續接手全專案維護、優化與調整，處理跨模組問題、共用元件彈性、頁面邏輯與上線前收尾，直到第三階段正式上線。',
    ],
    highlights: [
      '負責期信功能模組核心開發，整合查詢、表格、資料呈現與前台互動需求。',
      '實作共用列印功能並整合至既有元件架構，支援多模組差異化使用情境。',
      '後續負責全專案維護、優化與調整，協助第三階段穩定上線。',
    ],
    challenges: [
      '擴充既有共用元件邏輯，處理多模組差異化需求。',
      '處理 Nx Monorepo 架構下的模組管理與依賴設定。',
      '列印功能在不同資料與版型下的顯示一致性。',
    ],
    features: ['期信功能模組開發', '共用查詢列與表格整合', '共用列印流程', '全專案維護與上線調整'],
    caseStudy: {
      context:
        '金融前台第三階段擴充案。主要負責期信功能模組核心開發，後續接手全專案維護、優化、調整與上線前收尾，讓第三階段功能完整上線。',
      threads: [
        {
          title: '共用列印與跨模組整合',
          finding:
            '金融資訊頁面需要共用列印能力，但各模組資料結構、表格版型與輸出格式不同，若各自實作會讓後續調整成本快速放大。',
          decision:
            '將列印流程接回既有共用元件架構，透過模組差異設定與版型調整保留彈性，避免在每個頁面複製列印邏輯。',
          result: '共用列印能力能被多個金融模組使用，後續版型與資料調整集中在共用邊界內處理。',
        },
        {
          title: '全專案維護到上線',
          finding:
            '第三階段上線前仍有跨模組錯誤、資料呈現落差、共用元件調整與頁面細節需要收斂，單點功能完成不代表整體可上線。',
          decision:
            '後續接手全專案維護與收尾，優先處理會影響上線穩定性的跨模組問題、資料顯示差異與共用元件調整。',
          result: '協助金融資訊平台第三階段完成上線前穩定化，直到第三階段正式上線。',
        },
      ],
    },
    tech: ['Angular', 'TypeScript', 'RxJS', 'Highcharts', 'SCSS', 'Nx'],
    metrics: {
      module: '期信核心',
      print: 'COMMON_PRINT',
      stage: 'PHASE_3',
    },
  },
  {
    id: 'HR-19',
    title: 'HR_SYSTEM_UPGRADE',
    category: 'ENTERPRISE',
    type: '人事系統功能擴充與架構升級',
    year: '2025',
    client: 'INTERNAL_HR',
    role: '前端開發工程師',
    desc: '企業內部人資系統的功能擴充與架構升級。除了 Angular 版本升級，也包含架構優化調整、核心套件如 Kendo UI 升級，以及客製化考試模組與共用元件擴充。',
    details: [
      '針對既有人事系統進行功能擴充，開發客製化考試模組、共用元件與管理流程，讓內部作業可以支援更多情境。',
      '參與 Angular 11 至 Angular 19 升級，包含架構優化調整、核心套件如 Kendo UI 升級、舊有程式結構調整與元件使用方式收斂。',
    ],
    highlights: [
      '開發客製化考試模組與可擴充共用元件，提升內部流程彈性。',
      '參與 Angular 11 至 Angular 19 升級，處理架構優化、Kendo UI 等核心套件升級與舊有架構調整。',
      '重構多處舊程式結構，讓後續功能開發更一致且易維護。',
    ],
    challenges: [
      '在既有大型系統中維持相容性，同時逐步清理舊結構。',
      '跨版本升級時處理套件、元件 API 與樣式差異。',
      '以可擴充元件承接客製化考試流程需求。',
    ],
    features: ['客製化考試模組', '擴充型共用元件', 'Angular 版本升級', 'Kendo / Material UI 整合'],
    caseStudy: {
      context:
        '長期維護中的企業內部人資系統。工作範圍包含功能擴充、架構優化、Angular 版本升級、Kendo UI 等核心套件升級、舊結構整理與共用元件調整，並保持既有 HR 流程可用。',
      threads: [
        {
          title: 'Angular 與核心套件升級',
          finding:
            '系統需要從 Angular 11 升級到 Angular 19，並處理 Kendo UI 等核心套件升級，牽涉元件 API、樣式、相依套件與既有寫法調整。',
          decision:
            '分段處理 Angular、Kendo UI 與相關套件升級，逐步修正 API 差異、樣式差異與相依問題，避免一次性大改造成既有流程不穩。',
          result:
            '參與完成版本升級與核心套件調整，讓系統能往新版架構前進，同時維持既有功能可運作。',
        },
        {
          title: '架構優化與舊結構整理',
          finding:
            '長期維護系統累積了舊結構與不一致寫法；若只做版本升級，後續新功能仍會被舊邏輯與元件邊界拖住。',
          decision:
            '在升級與功能開發過程中同步整理舊有程式結構、元件使用方式與共用邏輯，將能收斂的流程逐步統一。',
          result: '降低後續功能擴充與版本調整的摩擦，讓人事系統在維護與開發上更一致。',
        },
      ],
    },
    tech: ['Angular 11-19', 'TypeScript', 'RxJS', 'Angular Material', 'Kendo UI', 'Signal'],
    metrics: {
      upgrade: '11_TO_19',
      ui: 'KENDO_MATERIAL',
      status: 'MAINTAINED',
    },
  },
  {
    id: 'EVT-04',
    title: 'AI_TICKETING_PLATFORM',
    category: 'SIDE_PROJECT',
    type: 'AI 票務平台',
    year: '2024',
    client: 'EVENTA',
    role: '全端開發工程師',
    desc: '日常中小型活動票務平台，結合活動報名、主辦管理、AI 推薦、QR 驗票與自動化部署。',
    details: [
      'AI 票務平台針對日常中小型活動（如聚會、市集、工作坊）打造，強調直覺報名流程與「認票不認人」的管理模式，讓主辦方能快速建構活動、管理票券，使用者則可透過 AI 聊天機制獲得個人化活動推薦，提升報名效率與參與體驗。',
      '技術上採用 Next.js App Router 架構，整合 SWR 與 Zustand 管理前端狀態與快取，後端以 Node.js、PostgreSQL、Prisma 建構交易與資料邏輯。整合 AI 機器人 API、票券 QR 驗票、金流、主辦後台等功能，並透過 Docker 與 GitHub Actions 實現自動化部署流程。',
    ],
    highlights: [
      '整合 AI 對話機器人，實現活動推薦與互動式搜尋。',
      '以 Next.js 實作 SSR 架構。',
      '實現活動建立流程以及後台管理系統。',
      '使用 Docker 實作容器化部署並導入 GitHub Actions 建立自動化 CI/CD。',
      '規劃及調整前後端專案架構並負責團隊進度確認與時程安排，協調任務分工並確保開發節奏穩定推進。',
      '規劃與建立活動建立流程 UI 流程與表單邏輯。',
    ],
    challenges: [
      '整合 AI 機器人 API，實作公開資料查詢與回應流程，並透過流量控制機制（節流套件）限制過高頻率觸發，避免資源濫用。',
      '設計活動建立流程的狀態共用邏輯，並處理多入口（編輯/新建）進入流程時的資料載入與狀態初始化。',
      '實作跨 SSR 與 Client 的登入狀態一致性機制，結合 Cookie、Storage 與 Middleware，並透過 Next.js API 設定 HttpOnly Cookie，避免於 client 端直接操作，強化安全性。',
      '整合 Docker 與 GitHub Actions 實現前後端自動化部署，過程中解決多架構設定問題。',
      '優化 Next.js 在 Ubuntu 環境下的建置流程，將建置時間從 10 分鐘縮短至約 3 分鐘。',
    ],
    features: [
      'AI 客服聊天推薦活動',
      '主辦單位活動建立與後台管理',
      '即時訂單與票券查詢',
      'ECPay 金流與 QR 驗票',
      '自動化部署流程（Docker + GitHub Actions）',
      '多主辦單位支援與活動分群管理',
    ],
    caseStudy: {
      context:
        'AI 票務平台針對日常中小型活動（如聚會、市集、工作坊）打造，強調直覺報名流程與「認票不認人」的管理模式，讓主辦方能快速建構活動、管理票券，使用者則可透過 AI 聊天機制獲得個人化活動推薦，提升報名效率與參與體驗。',
      threads: [
        {
          title: '認票不認人的票務模型',
          finding:
            '日常中小型活動的驗票情境重視入場效率與票券有效性，若把所有流程綁死在會員身份上，會增加轉讓、查票與現場驗證的摩擦。',
          decision:
            '以訂單、票券與 QR 驗票作為主流程，會員身份主要承接購買紀錄與管理操作，避免讓驗票流程被帳號狀態卡住。',
          result: '報名、付款、查票與 QR 驗票流程能以票券為核心運作，主辦端處理現場入場時更直接。',
        },
        {
          title: 'SSR / Client 登入狀態一致性',
          finding:
            'Next.js 在 SSR / Client 邊界切換時，身份狀態若只存在前端儲存，容易出現首屏判斷與互動狀態不一致，也會增加 token 暴露風險。',
          decision: '結合 Cookie、Storage、Middleware 與 HttpOnly Cookie。',
          result: '登入狀態更穩定，身份資料也更安全。',
        },
        {
          title: '部署流程與 Ubuntu 建置時間優化',
          finding: 'Docker / GitHub Actions 多架構設定與 build 時間影響迭代。',
          decision: '整理 CI/CD 流程並優化 Ubuntu 上的 Next.js build。',
          result: '建置時間由約 10 分鐘降到約 3 分鐘。',
        },
      ],
    },
    tech: ['Next.js', 'Zustand', 'SWR', 'Node.js', 'PostgreSQL', 'Prisma', 'Docker'],
    metrics: {
      deploy: 'CI_CD',
      build: '10M_TO_3M',
      ai: 'CHATBOT',
    },
    repo: 'https://github.com/Eventa5',
    liveUrl: 'https://eventa-frontend.onrender.com',
    images: [
      '/images/projects/Eventa-Home.png',
      '/images/projects/Eventa-Event-Overview.png',
      '/images/projects/Eventa-AI-Chat.png',
    ],
  },
  {
    id: 'TAL-04',
    title: 'TALENT_MATCH_PLATFORM',
    category: 'SIDE_PROJECT',
    type: '才藝媒合平台',
    year: '2024',
    client: 'TALENT_MATCH',
    role: '全端開發工程師',
    desc: '以課程為導向的才藝媒合平台，實作即時聊天、課程預約、Google 登入與 ECPay 付款。',
    details: [
      '才藝媒合平台聚焦於音樂、藝術、舞蹈等多元才藝領域，強調課程自由度與內容多樣性，讓老師可彈性設計課程、學生能依興趣媒合合適內容。本平台參考語言教學平台設計，並強化課程彈性與自由度，提升整體使用體驗。',
      '前端採用 Angular standalone component 與 lazy-loaded routes，以學生、老師、課程搜尋、購物車等 domain 拆分功能邊界。後端以 Node.js + Express 搭配 MongoDB 實作，支援 Google OAuth、JWT / refresh token、ECPay 金流與 Socket.IO 即時聊天公告。',
    ],
    highlights: [
      '以 domain-based lazy routes 拆分學生後台、教師後台、課程搜尋與購物車流程。',
      '整合 JWT access token、refresh token 與 Angular interceptor，集中處理登入續期流程。',
      '以 Socket.IO personal room / chat room 建構即時聊天與公告推播。',
      '串接 ECPay 金流完成付款流程。',
      '主導團隊技術整合與開發節奏協調。',
    ],
    challenges: [
      '大型 Angular SPA 需拆分學生、老師、課程、購物車等 domain，避免功能邊界混在同一套路由中。',
      'JWT refresh flow 需在安全性、登入體驗與前端狀態複雜度之間取捨。',
      'Socket.IO 即時訊息需處理連線生命週期、授權與 room 狀態。',
      '規劃團隊功能分工與開發時程，協調進度與人力配置，並因應時程調整進行功能優先順序的取捨與調整。',
    ],
    features: [
      '多元課程查詢與預約',
      '教師自由上架與管理課程',
      '學生課程購買與預約時段管理',
      '即時聊天與公告（Socket.IO）',
      'Google 第三方登入',
      'JWT / Refresh Token 續期',
      'ECPay 金流付款流程',
      'Email 預約通知',
    ],
    caseStudy: {
      context:
        '才藝媒合平台聚焦於音樂、藝術、舞蹈等多元才藝領域，讓老師可彈性設計課程、學生能依興趣媒合合適內容。系統涵蓋學生後台、教師後台、課程搜尋、購物車、預約、付款、即時聊天與公告，因此前端重點不只是頁面完成，而是要讓大型 Angular SPA 在功能邊界、登入續期與即時互動上能維持清楚結構。',
      threads: [
        {
          title: 'Angular Lazy Loading + Domain-based Pages',
          finding:
            '學生後台、教師後台、課程搜尋、購物車等功能若集中在同一套路由與模組中，初期看似簡單，但後續會讓 feature ownership、路由層級與 bundle 壓力變得難維護。',
          decision:
            '採用 Angular standalone component 與 lazy-loaded routes，依學生、老師、課程、購物車等 domain 拆分頁面；犧牲部分初期檔案結構簡潔度，換取更清楚的功能邊界與擴充性。',
          result:
            '大型 SPA 的功能邊界更清楚，路由層級更容易管理，也降低後續擴充與維護時牽動整個前端結構的風險。',
        },
        {
          title: 'JWT + Refresh Token 登入體驗',
          finding:
            '單純 access token 實作最簡單，但到期後使用者容易被迫重新登入；加入 refresh token 與 interceptor 會增加前端狀態與併發處理複雜度。',
          decision:
            '實作 JWT access token 與 refresh token 機制，並在 Angular interceptor 集中處理 401 refresh flow；透過 single-flight refresh 避免多個 API 同時失效時重複刷新 token。',
          result:
            '在安全性、登入體驗與前端複雜度之間取得平衡，讓使用者能維持較順的登入狀態，也避免 refresh 流程造成重複請求。',
        },
        {
          title: 'Socket.IO 即時訊息與公告',
          finding:
            'Polling 實作簡單且部署成本低，但聊天與公告會產生不必要的 API 輪詢，也無法提供足夠即時的互動感。',
          decision:
            '為聊天與公告導入 Socket.IO，使用 personal room 與 chat room 管理即時推播；相對增加連線生命週期、授權與房間狀態處理成本。',
          result: '降低不必要的 API 輪詢，並讓老師、學生之間的聊天與公告推播具備更即時的互動體驗。',
        },
      ],
    },
    tech: [
      'Angular',
      'Standalone Components',
      'Lazy Routes',
      'Node.js',
      'Express',
      'MongoDB',
      'Tailwind CSS',
      'Socket.IO',
      'Google OAuth',
      'JWT',
      'Refresh Token',
      'ECPay',
      'Fullcalendar',
      'Nodemailer',
      'Swagger Autogen',
    ],
    metrics: {
      routes: 'LAZY_DOMAIN',
      auth: 'JWT_REFRESH',
      chat: 'SOCKET_IO',
    },
    repo: 'https://github.com/TalentMatchNorth10',
    liveUrl: 'https://talent-match-frontend.onrender.com/home',
    images: [
      '/images/projects/TalentMatch-Home.png',
      '/images/projects/TalentMatch-Course-Detail.png',
      '/images/projects/TalentMatch-Teacher-Course.png',
    ],
  },
  {
    id: 'GPT-02',
    title: 'CUSTOM_GPT_PLATFORM',
    category: 'ENTERPRISE',
    type: '客製化 GPT 對話平台',
    year: '2024',
    client: 'AI_CLIENT',
    role: '前端開發工程師',
    desc: '基於 Nuxt.js 開發的 GPT 對話平台，支援 SSE 串接、逐字輸出、歷史紀錄與對話分享。',
    details: [
      '客戶需要一個方便使用自行 fine-tune AI 模型的平台，因此以前端互動與對話體驗為核心，規劃輸入框、逐字輸出、自動滾動與響應式版面。',
      '前端採 Nuxt.js 與 Vue，與後端協作串接 OpenAI API，以 SSE 流式傳輸處理逐字回應，並加入對話儲存、歷史查詢、分享與評論流程。',
    ],
    highlights: [
      '完成整體 UI 規劃與互動邏輯設計，支援響應式與打字效果。',
      '整合 SSE 串流機制，實現逐字回應輸出與自動滾動。',
      '設計對話分享流程，實作複製連結與公開檢視邏輯。',
      '建立對話儲存與查詢 API 串接邏輯，支援歷史紀錄功能。',
      '與後端溝通 API 架構並協調 SSE 資料格式。',
    ],
    challenges: [
      '處理對話過程中逐字回應與自動滾動的同步邏輯。',
      '處理 SSE 串流資料格式、部分回應、完成狀態與打字動畫同步顯示。',
      '處理連續對話過程中的狀態同步與捲動行為。',
      '設計可分享的對話內容結構，並處理前端路由與檢視邏輯。',
      '與後端溝通資料格式、API 回傳規格與錯誤處理方式。',
    ],
    features: ['SSE 即時對話', '歷史紀錄查詢', '對話分享與評論', '自動滾動與響應式介面'],
    caseStudy: {
      context:
        '客戶希望能方便使用其自行 fine-tune 的 AI 模型，因此建立一個具備對話、儲存、分享功能的平台。我以 ChatGPT 為參考規劃版面，實作對話輸入框、逐字輸出、自動滾動與響應式設計。應客戶需求加入對話分享與評論功能，簡化操作流程。',
      threads: [
        {
          title: 'SSE 對話串流狀態',
          finding: '逐字輸出需要同時處理部分回應、完成狀態、錯誤狀態、連續對話與自動滾動。',
          decision:
            '以前端串流狀態管理承接 SSE 事件，並和後端對齊資料格式、結束條件與錯誤回傳，讓 UI 能穩定反映對話進度。',
          result: '完成更接近真實對話節奏的輸出體驗，降低串流格式不一致造成的前端處理問題。',
        },
      ],
    },
    tech: ['Nuxt.js', 'Vue.js', 'SSE', 'OpenAI API'],
    metrics: {
      stream: 'SSE',
      share: 'PUBLIC_VIEW',
      ux: 'CHAT_FLOW',
    },
    images: [
      '/images/projects/MyGPT-Login.png',
      '/images/projects/MyGPT-Home.png',
      '/images/projects/MyGPT-Share-Conversation.png',
      '/images/projects/MyGPT-Template.png',
    ],
  },
  {
    id: 'LIFF-03',
    title: 'LINE_LIFF_MANAGEMENT',
    category: 'ENTERPRISE',
    type: 'LINE LIFF 前台與後台管理系統',
    year: '2024',
    client: 'INTERNAL_SYSTEM',
    role: '前端開發工程師',
    desc: 'LINE LIFF 前台與 React 後台管理系統。核心處理多群編 / 多公司登入選擇與切換流程，並整合 LIFF 登入、登出跳轉、資料刷新與 React 頁面狀態管理。',
    details: [
      '前台以 LINE LIFF + Next.js 開發，處理 LINE 內嵌環境中的登入驗證、登入時公司 / 群編選擇、切換時重新登出登入、跳轉與資料重新取得。',
      '後台以 React 建置模板管理與訊息發送流程，並配合登入身份切換處理頁面狀態重置、資料刷新與錯誤跳轉情境。',
    ],
    highlights: [
      '規劃多群編 / 多公司登入選擇與切換流程，讓不同市區對應的公司資料能正確載入。',
      '整合 LIFF 登入、登出、重新登入與跳轉流程，優化切換身份時的使用體驗。',
      '處理 React 頁面狀態、資料刷新與錯誤跳轉情境，避免舊身份資料殘留。',
      '建置後台模板管理與訊息發送流程，支援資料維護、條件篩選與動態模板內容。',
    ],
    challenges: [
      '多群編 / 多公司身份切換時，需重新建立登入狀態並刷新對應資料。',
      'LIFF 登出登入、跳轉流程與 React 頁面狀態管理需要同步處理。',
      '處理使用者錯誤跳轉、舊資料殘留與切換過程中的 UX 中斷。',
    ],
    features: [
      'LINE LIFF 登入與身份切換',
      '多群編 / 多公司選擇流程',
      '訊息模板設定與管理',
      '條件式訊息發送',
      '前後台雙平台分離架構',
    ],
    caseStudy: {
      context:
        '本專案為企業內部系統的新版改造，前台採用 LINE LIFF + Next.js，後台使用 React。該公司有多個群編，不同市區會對應不同公司，因此登入時需要選擇身份，切換時也必須重新登出登入、跳轉並重新取得資料；後台同時要維持模板管理、訊息發送與 React 頁面狀態的一致性。',
      threads: [
        {
          title: '多群編登入與身份切換',
          finding:
            '同一套系統需要支援多個群編 / 公司身份。切換不是前端改一個選項而已，會牽涉 LIFF 登出登入、跳轉、資料重新取得與 React 頁面狀態重置。',
          decision:
            '將身份切換視為重新建立 session，重新梳理登入選擇、登出、重新登入、資料刷新與頁面導向流程，並處理使用者錯誤跳轉情境。',
          result:
            '降低舊身份資料殘留與錯誤導頁風險，讓使用者在不同群編 / 公司之間切換時能取得正確資料，維持較順的使用體驗與品質。',
        },
      ],
    },
    tech: ['Next.js', 'React', 'LINE LIFF'],
    metrics: {
      channel: 'LINE_LIFF',
      identity: 'MULTI_GROUP',
      state: 'SESSION_SYNC',
    },
  },
  {
    id: 'ECM-03',
    title: 'JAPANESE_STYLE_ECOMMERCE',
    category: 'ENTERPRISE',
    type: '日系風電商平台',
    year: '2025',
    client: 'ECOMMERCE',
    role: '前端開發工程師',
    desc: 'Nuxt 3 SSR 日系電商平台，整合 Orval 自動生成型別安全 API Client 與完整前後台系統。',
    details: [
      '前台使用 Nuxt 3、Vue 3、TypeScript 與 Composition API，透過 Orval 從 OpenAPI Specification 自動生成型別安全 API Client，整合商品、會員、購物車、收藏與訂單流程。',
      '後台管理系統涵蓋商品管理（商品資訊、款式、庫存）、分類管理、品牌管理、訂單管理、優惠券管理、輪播圖管理、評論管理等模組。整合 Google OAuth 2.0 第三方登入，並實作 API 快取機制（useApiCache）減少重複請求。SEO 優化方面設定完整的 Meta Tag、Schema.org 結構化資料、useSeoMeta 動態生成等。',
    ],
    highlights: [
      '採用 Orval 自動生成 API Client，實現 28+ 個端點的型別安全整合。',
      '使用 Composables 模式建立可重用狀態管理邏輯，確保 SSR/CSR 狀態一致性。',
      '整合 Google OAuth 2.0 第三方登入與 Token 持久化機制。',
      '實作 API 快取與去重機制（useApiCache），優化請求效能。',
      '設定 SEO Meta Tag、Schema.org 結構化資料與 useSeoMeta 動態優化。',
      '建立完整後台管理系統：商品、分類、訂單、優惠券、輪播圖等模組。',
    ],
    challenges: [
      'SSR/CSR 狀態一致性：透過 useState 確保伺服器端與客戶端狀態同步。',
      'API 自動化生成：設定 Orval 配置，將 OpenAPI Spec 轉換為 TypeScript Client。',
      '認證狀態管理：整合 Cookie、Token、Google OAuth，處理登入/登出/自動登入邏輯。',
      'API 快取機制：設計 TTL 快取、請求去重、自動失效邏輯減少重複請求。',
      'SEO 動態生成：針對商品詳情頁、分類頁等動態路由設定個別 Meta Tag。',
    ],
    features: [
      '商品瀏覽與搜尋：支援多維度篩選、排序、分頁功能',
      '購物車系統：即時新增、刪除、數量調整與總價計算',
      '收藏清單：收藏商品、批次管理',
      '訂單管理：建立訂單、訂單追蹤、歷史查詢',
      '優惠券功能：套用折扣碼、驗證優惠條件',
      '會員系統：Email 登入、Google OAuth 2.0 第三方登入',
      '後台管理：商品、款式、分類、品牌、訂單、優惠券、輪播圖管理',
    ],
    caseStudy: {
      context:
        '採用 Nuxt 3 框架開發的現代化電商平台，提供完整的前後台系統。前台使用 Vue 3 Composition API 搭配 TypeScript 開發，透過 Orval 自動從 OpenAPI Specification 生成型別安全的 API Client，實現 28+ 個端點的自動化整合。架構設計採用 Composables 模式管理狀態（useAuth、useCart、useFavorites、useOrders 等），確保跨元件狀態共享與 SSR/CSR 一致性。',
      threads: [
        {
          title: 'Orval API Client 自動化生成',
          finding:
            '電商前後台 API 端點多，若手寫 request 與型別，規格更新後容易出現型別漂移與重複維護。',
          decision:
            '用 Orval 從 OpenAPI 生成 TypeScript Client，讓 API 規格變更能反映到前端型別與呼叫方法。',
          result: '完成 28+ 個端點的型別安全串接，降低手寫 API wrapper 的維護成本。',
        },
        {
          title: 'SSR / CSR 狀態一致性與 Composables',
          finding:
            '登入、購物車、收藏與訂單狀態同時出現在 SSR 首屏與 Client 互動流程，狀態來源分散會導致 hydration 與跨頁行為不穩。',
          decision:
            '以 Composables 與 useState 收斂狀態來源，讓共享狀態在頁面、元件與 SSR / CSR 邊界間有一致的更新方式。',
          result: '跨元件狀態共享更穩定，降低前後端渲染切換造成的狀態落差。',
        },
        {
          title: '請求快取與失效邊界',
          finding:
            '商品、會員、購物車與收藏資料會被多個頁面重複讀取，若沒有快取與失效邊界，容易造成重複請求或顯示舊資料。',
          decision:
            '建立 useApiCache 的 TTL、請求去重與失效邏輯，並和登入 / Token 狀態一起整理資料更新時機。',
          result: '減少重複請求，並讓購物流程中的資料更新時機更可控。',
        },
      ],
    },
    tech: [
      'Nuxt 3',
      'Vue 3',
      'TypeScript',
      'Tailwind CSS',
      'Pinia',
      'Orval',
      'Swiper',
      'Docker',
      'ESLint',
      'Prettier',
      'Husky',
      'Google OAuth 2.0',
      'OpenAPI',
      'useSeoMeta',
      'Composables',
    ],
    metrics: {
      api: '28+ ENDPOINTS',
      auth: 'GOOGLE_OAUTH',
      mode: 'SSR_CSR',
    },
    images: [
      '/images/projects/E-commerce-Home.png',
      '/images/projects/E-commerce-List.png',
      '/images/projects/E-commerce-Detail.png',
    ],
  },
];

export const CAREER_STAGES: CareerStage[] = [
  {
    period: '2026',
    stage: '08 // LOBSTER_PLATFORM',
    title: '小龍蝦開發案',
    role: 'Frontend Engineer',
    summary:
      '參與公司內部發起的自研小龍蝦開發案，系統以 GitHub Issue、Telegram、GitHub Actions、Cloudflare Worker 等服務組成微服務式架構。我負責把安裝流程設計成整套系統的入口，將外部服務設定、流程引導與後續自動化串接收斂成可操作的介面。',
    items: [
      {
        label: '安裝介面',
        text: '主要負責安裝介面的設計、開發與串接整合，將原本分散在不同服務與設定流程中的操作整理成清楚的初始化路徑。',
      },
      {
        label: '服務串接',
        text: '梳理 GitHub Issue、Telegram、GitHub Actions、Cloudflare Worker 在系統中的角色，並配合整體流程處理服務之間的資料傳遞、觸發點與狀態銜接。',
      },
      {
        label: '架構視角',
        text: '從前端安裝體驗切入微服務與事件驅動架構，將使用者操作、外部服務觸發與自動化流程收斂成同一條可追蹤的系統路徑。',
      },
    ],
    tags: ['GitHub Issue', 'Telegram', 'GitHub Actions', 'Cloudflare Worker', 'Microservices'],
  },
  {
    period: '2025 — 2026',
    stage: '07 // REALTIME_QUERY_PLATFORM',
    title: '客戶即時查詢平台',
    role: 'Frontend Engineer',
    summary:
      '參與客戶即時查詢平台開發，需求邊界清楚、UI 結構明確，且有 HTML prototype 可直接對照，因此適合用 spec-driven 的方式推進。我把需求、prototype、共用元件與 AI 開發流程整理成可執行節奏，讓實作能依據明確規格穩定落地。',
    items: [
      {
        label: '規格拆解',
        text: '先整理 spec，將需求與 prototype 對齊，再拆成 plan、task、implementation，讓每個開發步驟都有明確輸入與完成條件。',
      },
      {
        label: 'AI 協作',
        text: '搭配共用元件與 sandbox 驗證畫面、狀態與互動，讓 AI 依照規格與既有元件開發，減少零散描述造成的反覆修正。',
      },
      {
        label: '流程定義',
        text: '將 SDD 拆分方式轉成可執行流程，依情境調整規格、工具與資源定義；前期資訊越清楚，後續實作與驗收越穩定。',
      },
    ],
    tags: ['Spec Driven', 'Prototype', 'Plan / Task', 'Sandbox', 'Shared Components'],
  },
  {
    period: '2025 年末',
    stage: '06 // TOTO_MAINTENANCE',
    title: 'TOTO 官網維護',
    role: 'Frontend Engineer',
    summary:
      '參與 TOTO 官網維護，面對 .NET 舊專案、非標準編譯與設定流程，以及由 jQuery 動態組出的後台畫面。我先反推出舊系統的欄位來源、驗證規則與共用邏輯，再補齊前後台文章管理流程與編輯器內容貼上的相容性問題。',
    items: [
      {
        label: '舊系統追查',
        text: '處理 .NET 舊專案系統結構不易追查、編譯與設定方式非標準流程等問題，透過 AI 輔助快速定位檔案、入口與判斷點。',
      },
      {
        label: '欄位與流程',
        text: '後台畫面由 jQuery 動態組出，欄位結構需先從 DB 反查；搭配 DB 比對欄位與驗證規則，補齊前後台欄位、文章管理與資料保存流程。',
      },
      {
        label: '相容性處理',
        text: '在多頁共用邏輯與大量 if / else 疊加的維護情境中，額外處理編輯器貼上 Google Doc / docx 內容時的格式與相容性問題。',
      },
    ],
    tags: ['.NET Legacy', 'jQuery', 'DB Trace', 'CMS Flow', 'AI Debugging', 'Editor Compatibility'],
  },
  {
    period: '2025',
    stage: '05 // HR_UPGRADE',
    title: '人事系統功能擴充與 Angular 版本升級',
    role: 'Frontend Engineer',
    summary:
      '負責企業內部人資平台的功能擴充與架構升級，工作範圍包含客製化考試模組、共用元件擴充、既有後台流程調整，以及 Angular 版本升級過程中的套件與舊結構整理。',
    items: [
      {
        label: '功能與模組',
        text: '開發客製化考試模組與擴充型共用元件，並依照既有後台流程調整管理頁面、表單狀態與操作互動。',
      },
      {
        label: '升級與整理',
        text: '參與 Angular 11 到 19 的升級調整，處理套件更新、舊程式結構整理、Angular Material / Kendo UI 使用差異與元件 API 變動。',
      },
      {
        label: '維護與交付',
        text: '在不破壞既有流程的前提下接入新需求，並重構多處舊有結構，讓後續功能擴充、版本調整與維護更一致。',
      },
    ],
    tags: ['Angular 11-19', 'TypeScript', 'RxJS', 'Kendo UI', 'Angular Material', 'Signal'],
  },
  {
    period: '2024 — 2025',
    stage: '04 // FINANCE_PLATFORM',
    title: '智慧投資資訊平台第三階段開發',
    role: 'Frontend Engineer',
    summary:
      '參與金融前台第三階段擴充案，主要負責期信功能模組核心開發；後續也負責全專案維護、優化、調整與上線前收尾，直到第三階段正式上線。',
    items: [
      {
        label: '期信模組',
        text: '負責期信功能模組核心開發，包含前台子頁面、資料串接、查詢、表格呈現與頁面互動狀態。',
      },
      {
        label: '共用元件',
        text: '實作共用列印功能並整合至通用元件架構，處理 Nx Monorepo 下模組管理、共用元件依賴與跨模組差異化需求。',
      },
      {
        label: '維護到上線',
        text: '後續負責全專案維護、優化、頁面調整、跨模組錯誤修正與上線前收尾，讓第三階段穩定上線。',
      },
    ],
    tags: ['Angular', 'TypeScript', 'RxJS', 'Highcharts', 'Nx', 'Print Flow'],
  },
  {
    period: '2024',
    stage: '03 // REPORTING_PLATFORM',
    title: '金融資訊申報平台',
    role: 'Frontend Engineer',
    summary:
      '參與金融申報系統開發與整合，主要處理報表列印、資料展示、頁面切版、資料串接與錯誤排查，讓不同報表格式與資料流程在前端呈現上維持一致。',
    items: [
      {
        label: '列印流程',
        text: '開發多頁共用列印功能，支援不同報表格式，並參與頁面切版、資料串接與互動流程調整。',
      },
      {
        label: '資料與畫面',
        text: '使用 Angular、TypeScript、RxJS、Angular Material 與 Tailwind CSS 處理表單、資料顯示、頁面狀態與報表輸出情境。',
      },
      {
        label: '錯誤排查',
        text: '參與頁面功能錯誤排查，優化共用元件邏輯與互動效能，協助申報流程在多頁面與多格式條件下保持穩定。',
      },
    ],
    tags: ['Angular', 'TypeScript', 'RxJS', 'Angular Material', 'Tailwind CSS'],
  },
  {
    period: '2023 — 2024',
    stage: '02 // CONTENT_PLATFORM',
    title: '企業內容平台前後台開發',
    role: 'Frontend Engineer',
    summary:
      '打造企業對外內容展示與後台管理平台。前台使用 Razor 與 JavaScript 完成切版、互動、RWD 與 SEO 優化；後台採 Angular 建置文章、標籤、廣告等內容管理模組。',
    items: [
      {
        label: '後台管理',
        text: '建構後台文章、標籤、廣告等多模組管理功能，包含 Tab 切換、分頁、狀態切換、草稿回復與畫面預覽流程。',
      },
      {
        label: '前台體驗',
        text: '前台實作 RWD、互動效果、圖片延遲載入、ARIA、字體與版面細節調整，並針對 Lighthouse 與 PageSpeed 指標做優化。',
      },
      {
        label: 'SEO 與分享',
        text: '設定 SEO、Meta Tag 與 Open Graph 分享資訊，並通過 Facebook 分享偵錯、Twitter Card Validator、LINE 分享檢測等外部驗證。',
      },
    ],
    tags: ['Razor', 'JavaScript', 'Angular', 'SEO', 'Meta Tag', 'Lighthouse'],
  },
  {
    period: '2023',
    stage: '01 // EIP_PLATFORM',
    title: '企業資訊入口系統 EIP 中央平台',
    role: 'Frontend Engineer',
    summary:
      '開發公司內部資訊管理中樞，整合多系統導覽、公告管理、頁面嵌入、自動刷新與多語系切換，讓內部資訊入口能支援日常協作與集中管理。',
    items: [
      {
        label: '入口架構',
        text: '設計多層級導覽結構與 iframe 嵌入展示機制，讓不同內部系統能集中於入口平台存取。',
      },
      {
        label: '管理功能',
        text: '實作公告管理、自動刷新與多語系切換功能，並使用 Angular、TypeScript 與 RxJS 處理頁面狀態與資料流。',
      },
      {
        label: '使用維護',
        text: '優化使用者操作體驗與管理維護效率，讓公告、導覽與嵌入頁面能更穩定地被日常使用與維護。',
      },
    ],
    tags: ['Angular', 'TypeScript', 'RxJS', 'EIP', 'iFrame', 'i18n'],
  },
];
