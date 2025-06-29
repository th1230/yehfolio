"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { createGalaxyBands } from "../utils/galaxy-bands";

/**
 * Skill Starfield 2.0
 * -------------------------------------------------------------
 * 全面替換為「星空」視覺：
 *   • 每個技能 → 一顆主星 (亮度、半徑依 level 調整)
 *   • Hover 主星 → 與同類別技能畫連線，並升起光暈
 *   • 僅在 Hover 時透過 CustomEvent 告知父層顯示名稱/描述
 *   • 可拖曳整個視角 (panning)；保留之後加入縮放 (zoom) 的彈性
 *
 * ⚠️ 與舊版多邊形完全不相容，請直接取代檔案。
 */

type SkillNode = {
  name: string;
  level: number; // 70–100
  category: string;
  color: string; // 主色，用於連線與高光
  icon?: string; // 技能圖示
  description?: string; // 技能描述
  applications?: string; // 應用情境
  relatedLinks?: string; // 相關連結
  x: number; // world 座標
  y: number;
  radius: number; // 星星半徑 (依 level 計算)
  selected?: boolean;
  hovered?: boolean;
  twinkle: number; // 閃爍效果 (0-1)
  twinkleSpeed: number; // 閃爍速度
};

type BackgroundStar = {
  x: number;
  y: number;
  radius: number;
  twinkle: number;
  twinkleSpeed: number;
};

type Meteor = {
  x: number;
  y: number;
  endX: number;
  endY: number;
  progress: number; // 0-1
  speed: number;
  tail: { x: number; y: number; opacity: number }[];
  active: boolean;
};

type GalaxyBand = {
  type: 'spiral' | 'bar' | 'irregular' | 'elliptical';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  particles: { x: number; y: number; size: number; opacity: number; distanceFromCenter?: number }[];
};

export const SKILL_SELECTED_EVENT = "skillSelected";

const SkillStarfield = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(null);
  const nodesRef = useRef<SkillNode[]>([]);
  const backgroundStarsRef = useRef<BackgroundStar[]>([]);
  const meteorsRef = useRef<Meteor[]>([]);
  const galaxyBandsRef = useRef<GalaxyBand[]>([]);
  const lastMeteorTime = useRef<number>(0);
  
  // 銀河背景快取
  const galaxyBackgroundRef = useRef<HTMLCanvasElement | null>(null);
  const galaxyRenderedRef = useRef<boolean>(false);

  /* ---- 視角拖曳 ---- */
  const offset = useRef({ x: 0, y: 0 });
  const zoom = useRef(1);
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

/* ---- 基礎資料 ---- */
const skillsData = [
  // 前端框架
  {
    name: "Angular",
    level: 95,
    category: "前端框架",
    color: "#DD0031",
    icon: "🅰️",
    description: "深度掌握 Angular 生態系統，包含 RxJS、NgRx 狀態管理、Angular Material 元件庫，實作過大型企業級應用的模組化架構設計。熟悉 Angular CLI、依賴注入、路由守衛與自訂指令開發。",
    applications: "企業級後台管理系統、電商平台前端",
    relatedLinks: "Angular Universal SSR 實作案例"
  },
  {
    name: "React",
    level: 80,
    category: "前端框架",
    color: "#61DAFB",
    icon: "⚛️",
    description: "熟練使用 React Hooks、Context API 與第三方狀態管理工具（Redux、Zustand），了解 React 18 的 Concurrent Features 與 Suspense。能夠建構可重用的元件庫與高效能的 SPA 應用。",
    applications: "互動式儀表板、即時聊天應用",
    relatedLinks: "React Query + TypeScript 專案範例"
  },
  {
    name: "Vue",
    level: 70,
    category: "前端框架",
    color: "#4FC08D",
    icon: "💚",
    description: "掌握 Vue 3 Composition API、Pinia 狀態管理與 Vue Router，了解響應式系統原理。能夠使用 Vite 建構工具與 Vue CLI 快速開發中小型應用。",
    applications: "活動報名系統、內容管理介面",
    relatedLinks: "Vue 3 + Vite 快速開發實踐"
  },
  {
    name: "Next.js",
    level: 80,
    category: "前端框架",
    color: "#FF6B6B",
    icon: "▲",
    description: "熟悉 Next.js 13+ App Router、Server Components 與 Static Site Generation。實作過 ISR、動態路由與 API Routes，能夠優化 SEO 與網站效能指標。",
    applications: "個人作品集網站、部落格系統",
    relatedLinks: "Next.js + Tailwind CSS 響應式設計"
  },
  {
    name: "Nuxt.js",
    level: 75,
    category: "前端框架",
    color: "#00DC82",
    icon: "💎",
    description: "使用 Nuxt 3 建構 SSR 應用，了解 Nitro 伺服器引擎與自動匯入機制。能夠配置 PWA、模組系統與部署到 Vercel/Netlify 等平台。",
    applications: "多語言官方網站、內容驅動網站",
    relatedLinks: "Nuxt Content + Markdown 部落格實作"
  },
  
  // 程式語言
  {
    name: "JavaScript",
    level: 90,
    category: "程式語言",
    color: "#F7DF1E",
    icon: "🟨",
    description: "精通 ES6+ 語法特性、非同步程式設計（Promise、async/await）、模組系統與原型鏈概念。熟悉 V8 引擎優化原理，能夠撰寫高效能的 JavaScript 程式碼。",
    applications: "全端應用開發、瀏覽器擴充套件",
    relatedLinks: "JavaScript 效能優化實務分享"
  },
  {
    name: "TypeScript",
    level: 85,
    category: "程式語言",
    color: "#3178C6",
    icon: "🔷",
    description: "熟練使用 TypeScript 進行型別安全的開發，掌握泛型、條件型別、映射型別等進階概念。能夠設計可維護的型別系統與建構複雜的型別推導。",
    applications: "大型專案架構設計、API 型別定義",
    relatedLinks: "TypeScript 最佳實踐指南"
  },
  
  // 後端技術
  {
    name: "Node.js",
    level: 80,
    category: "後端技術",
    color: "#339933",
    icon: "🟢",
    description: "熟悉 Node.js 執行環境與事件循環機制，能夠建構 RESTful API 與 GraphQL 服務。了解 Stream、Buffer 與檔案系統操作，實作過高併發的後端服務。",
    applications: "API 伺服器、即時通訊後端",
    relatedLinks: "Node.js + Express 微服務架構"
  },
  {
    name: "Express",
    level: 85,
    category: "後端技術",
    color: "#000000",
    icon: "🚀",
    description: "深度使用 Express.js 框架，熟悉中介軟體設計模式、路由管理與錯誤處理機制。能夠整合身份驗證、資料驗證與 API 文件生成工具。",
    applications: "Web API 開發、後台管理系統",
    relatedLinks: "Express + JWT 身份驗證實作"
  },
  {
    name: "MongoDB",
    level: 75,
    category: "後端技術",
    color: "#47A248",
    icon: "🍃",
    description: "熟悉 MongoDB 文件型資料庫操作，掌握聚合管道、索引優化與複製集配置。使用 Mongoose ODM 進行資料建模與關聯查詢。",
    applications: "內容管理系統、使用者資料儲存",
    relatedLinks: "MongoDB Atlas + Mongoose 實戰"
  },
  {
    name: "PostgreSQL",
    level: 70,
    category: "後端技術",
    color: "#336791",
    icon: "🐘",
    description: "了解關聯式資料庫設計原則，能夠撰寫複雜的 SQL 查詢與預存程序。熟悉資料庫正規化、交易處理與效能調優策略。",
    applications: "電商訂單系統、財務資料管理",
    relatedLinks: "PostgreSQL + Prisma ORM 整合"
  },
  
  // 開發工具
  {
    name: "Git",
    level: 85,
    category: "開發工具",
    color: "#F05032",
    icon: "📝",
    description: "熟練使用 Git 版本控制系統，掌握分支策略（Git Flow、GitHub Flow）與合併衝突解決。能夠設計團隊協作的 Git 工作流程與程式碼審查流程。",
    applications: "團隊協作開發、版本發布管理",
    relatedLinks: "Git 最佳實踐與團隊協作指南"
  },
  {
    name: "Docker",
    level: 75,
    category: "開發工具",
    color: "#2496ED",
    icon: "🐳",
    description: "熟悉 Dockerfile 建構流程、BuildKit、Layer 快取機制，在跨平台部署中實作 multi-arch 映像（AMD64 + ARM64），成功優化 GitHub Actions build 速度。了解 Docker context、volume 掛載與環境變數注入，能獨立處理部署階段錯誤。",
    applications: "CI/CD 自動化部署、票券平台建構",
    relatedLinks: "GitHub Actions + Render 部署案例"
  },
  {
    name: "GitHub Action",
    level: 70,
    category: "開發工具",
    color: "#2088FF",
    icon: "⚙️",
    description: "設計自動化 CI/CD 流程，包含程式碼檢查、測試執行、建構部署與發布流程。能夠建立自訂 Actions 與管理 Secrets，實作多環境部署策略。",
    applications: "自動化測試、部署流程管理",
    relatedLinks: "GitHub Actions 工作流程設計範例"
  },
];
// ...existing code...

  /* ---- 初始化星座佈局 ---- */
  const initNodes = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // 隨機散佈技能星星在畫布中
    nodesRef.current = skillsData.map((s) => {
      const x = (Math.random() - 0.5) * 800; // 隨機x位置
      const y = (Math.random() - 0.5) * 400; // 隨機y位置
      const radius = 2 + ((s.level - 70) / 30) * 3; // 縮小：70 ➜ 2px, 100 ➜ 5px
      return { 
        ...s, 
        x, 
        y, 
        radius,
        twinkle: Math.random(),
        twinkleSpeed: 0.02 + Math.random() * 0.03
      } as SkillNode;
    });

    // 初始化背景星星
    backgroundStarsRef.current = Array.from({ length: 2500 }, () => ({
      x: (Math.random() - 0.5) * 3000,
      y: (Math.random() - 0.5) * 2400,
      radius: 0.5 + Math.random() * 1.5,
      twinkle: Math.random(),
      twinkleSpeed: 0.01 + Math.random() * 0.02
    }));

    // 初始化流星陣列
    meteorsRef.current = [];

    // 初始化隨機銀河群
    galaxyBandsRef.current = createGalaxyBands().map(band => ({
      ...band,
      particles: band.particles.map(star => ({
        x: star.x,
        y: star.y,
        size: star.size,
        opacity: star.opacity,
        distanceFromCenter: star.distance,
        color: star.color
      }))
    }));
    
    // 重置銀河背景渲染標記
    galaxyRenderedRef.current = false;
  }, []);

  /* ---- 繪製 ---- */
  const drawStar = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    r: number,
    twinkle: number,
    isSkillStar = false,
    hovered = false
  ) => {
    ctx.save();
    ctx.translate(x, y);
    
    // 計算星星的亮度 (基於閃爍效果)
    const baseOpacity = isSkillStar ? 0.9 : 0.6;
    const opacity = baseOpacity * (0.5 + 0.5 * twinkle);
    
    // 技能星星更亮，有更大的光暈
    const glowSize = isSkillStar ? (hovered ? r * 3 : r * 2) : r * 1.2;
    
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, glowSize);
    grad.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
    grad.addColorStop(0.4, `rgba(255, 255, 255, ${opacity * 0.8})`);
    grad.addColorStop(0.7, `rgba(200, 220, 255, ${opacity * 0.4})`);
    grad.addColorStop(1, "transparent");
    
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, glowSize, 0, Math.PI * 2);
    ctx.fill();
    
    // 畫星星的核心
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  };

  /* ---- 流星相關函數 ---- */
  const createMeteor = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 隨機選擇流星的起始和結束位置
    const angle = Math.random() * Math.PI * 2;
    const distance = 200 + Math.random() * 400;
    const startX = (Math.random() - 0.5) * 1000 + offset.current.x;
    const startY = (Math.random() - 0.5) * 600 + offset.current.y;
    
    const meteor: Meteor = {
      x: startX,
      y: startY,
      endX: startX + Math.cos(angle) * distance,
      endY: startY + Math.sin(angle) * distance,
      progress: 0,
      speed: 0.01 + Math.random() * 0.02,
      tail: [],
      active: true
    };
    
    meteorsRef.current.push(meteor);
  };

  const updateMeteors = () => {
    meteorsRef.current = meteorsRef.current.filter(meteor => {
      if (!meteor.active) return false;
      
      meteor.progress += meteor.speed;
      
      // 計算當前位置
      const currentX = meteor.x + (meteor.endX - meteor.x) * meteor.progress;
      const currentY = meteor.y + (meteor.endY - meteor.y) * meteor.progress;
      
      // 添加尾巴點
      meteor.tail.unshift({ x: currentX, y: currentY, opacity: 1 });
      
      // 限制尾巴長度並更新透明度
      if (meteor.tail.length > 20) {
        meteor.tail = meteor.tail.slice(0, 20);
      }
      
      meteor.tail.forEach((point, index) => {
        point.opacity = 1 - (index / meteor.tail.length);
      });
      
      // 流星完成時標記為不活躍
      if (meteor.progress >= 1) {
        meteor.active = false;
      }
      
      return meteor.active || meteor.tail.length > 0;
    });
  };

  const drawMeteors = (ctx: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    meteorsRef.current.forEach(meteor => {
      if (meteor.tail.length < 2) return;
      
      ctx.save();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
      ctx.lineWidth = 2;
      ctx.shadowColor = "rgba(255, 255, 255, 0.6)";
      ctx.shadowBlur = 3;
      
      // 畫流星尾巴
      for (let i = 0; i < meteor.tail.length - 1; i++) {
        const current = meteor.tail[i];
        const next = meteor.tail[i + 1];
        
        ctx.globalAlpha = current.opacity * 0.7;
        ctx.beginPath();
        ctx.moveTo(current.x + canvas.width / 2, current.y + canvas.height / 2);
        ctx.lineTo(next.x + canvas.width / 2, next.y + canvas.height / 2);
        ctx.stroke();
      }
      
      // 畫流星頭部
      if (meteor.tail[0]) {
        const head = meteor.tail[0];
        ctx.globalAlpha = 1;
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.beginPath();
        ctx.arc(head.x + canvas.width / 2, head.y + canvas.height / 2, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
    });
  };

  /* ---- 銀河帶相關函數 ---- */
  const createGalaxyBackground = () => {
    const canvas = canvasRef.current;
    if (!canvas || galaxyRenderedRef.current) return;
    
    // 創建一個大的離屏canvas用於銀河背景
    if (!galaxyBackgroundRef.current) {
      galaxyBackgroundRef.current = document.createElement('canvas');
    }
    
    const galaxyCanvas = galaxyBackgroundRef.current;
    // 創建一個足夠大的畫布來容納所有可能的拖曳和縮放範圍
    const size = Math.max(canvas.width, canvas.height) * 4; // 4倍大小確保足夠
    galaxyCanvas.width = size;
    galaxyCanvas.height = size;
    const galaxyCtx = galaxyCanvas.getContext('2d');
    if (!galaxyCtx) return;
    
    // 清空背景
    galaxyCtx.clearRect(0, 0, galaxyCanvas.width, galaxyCanvas.height);
    
    // 繪製銀河帶到背景canvas的中心
    galaxyBandsRef.current.forEach((band) => {
      galaxyCtx.save();
      
      // 移動到銀河中心並旋轉（以大畫布的中心為基準）
      galaxyCtx.translate(
        band.x + galaxyCanvas.width / 2, 
        band.y + galaxyCanvas.height / 2
      );
      galaxyCtx.rotate(band.rotation);
      
      // 畫銀河中的每一顆星星
      band.particles.forEach((particle) => {
        // 星星核心 - 使用粒子自帶的顏色
        const color = (particle as any).color || 'hsl(200, 80%, 70%)';
        const finalOpacity = particle.opacity * band.opacity;
        
        // 轉換 HSL 顏色為 RGBA
        let fillColor;
        if (color.startsWith('hsl')) {
          fillColor = color.replace('hsl(', 'hsla(').replace(')', `, ${finalOpacity})`);
        } else {
          fillColor = `rgba(255, 255, 255, ${finalOpacity})`;
        }
        
        // 畫星星核心
        galaxyCtx.fillStyle = fillColor;
        galaxyCtx.beginPath();
        galaxyCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        galaxyCtx.fill();
        
        // 為較大的星星添加光暈
        if (particle.size > 0.6) {
          const glowSize = particle.size * 2.5;
          const glowGrad = galaxyCtx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, glowSize
          );
          glowGrad.addColorStop(0, fillColor.replace(/[\d.]+\)$/, `${finalOpacity * 0.3})`));
          glowGrad.addColorStop(1, 'transparent');
          galaxyCtx.fillStyle = glowGrad;
          galaxyCtx.beginPath();
          galaxyCtx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
          galaxyCtx.fill();
        }
        
        // 為大星星添加十字星芒
        if (particle.size > 0.8) {
          galaxyCtx.strokeStyle = fillColor.replace(/[\d.]+\)$/, `${finalOpacity * 0.6})`);
          galaxyCtx.lineWidth = 0.3;
          
          const spikeLength = particle.size * 4;
          galaxyCtx.beginPath();
          // 主十字
          galaxyCtx.moveTo(particle.x - spikeLength, particle.y);
          galaxyCtx.lineTo(particle.x + spikeLength, particle.y);
          galaxyCtx.moveTo(particle.x, particle.y - spikeLength);
          galaxyCtx.lineTo(particle.x, particle.y + spikeLength);
          
          // 對角線星芒（為最亮的星星）
          if (particle.size > 1.2) {
            const diagLength = spikeLength * 0.7;
            galaxyCtx.moveTo(particle.x - diagLength, particle.y - diagLength);
            galaxyCtx.lineTo(particle.x + diagLength, particle.y + diagLength);
            galaxyCtx.moveTo(particle.x - diagLength, particle.y + diagLength);
            galaxyCtx.lineTo(particle.x + diagLength, particle.y - diagLength);
          }
          
          galaxyCtx.stroke();
        }
      });
      
      galaxyCtx.restore();
    });
    
    galaxyRenderedRef.current = true;
  };

  const drawGalaxyBands = (ctx: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // 確保銀河背景已經渲染
    if (!galaxyRenderedRef.current) {
      createGalaxyBackground();
    }
    
    // 根據當前的視角偏移和縮放來繪製銀河背景
    if (galaxyBackgroundRef.current && galaxyRenderedRef.current) {
      const galaxyCanvas = galaxyBackgroundRef.current;
      
      // 計算從大背景畫布的哪個位置開始擷取
      const centerOffsetX = (galaxyCanvas.width - canvas.width) / 2;
      const centerOffsetY = (galaxyCanvas.height - canvas.height) / 2;
      
      // 根據用戶的拖曳偏移調整擷取位置
      const sourceX = Math.max(0, Math.min(
        galaxyCanvas.width - canvas.width,
        centerOffsetX + offset.current.x
      ));
      const sourceY = Math.max(0, Math.min(
        galaxyCanvas.height - canvas.height,
        centerOffsetY + offset.current.y
      ));
      
      // 從大背景中擷取對應的區域繪製到主畫布
      ctx.drawImage(
        galaxyCanvas,
        sourceX, sourceY,                    // 從背景畫布的位置
        canvas.width, canvas.height,         // 擷取的大小
        0, 0,                               // 繪製到主畫布的位置
        canvas.width, canvas.height          // 繪製的大小
      );
    }
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ---- 背景 ----
    ctx.fillStyle = "#050b1e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ---- 畫銀河帶 (在變換之前，作為背景) ----
    drawGalaxyBands(ctx);

    // ---- 應用縮放和平移變換 ----
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(zoom.current, zoom.current);
    ctx.translate(-canvas.width / 2 - offset.current.x, -canvas.height / 2 - offset.current.y);

    // ---- 流星邏輯 ---- 
    const now = Date.now();
    if (now - lastMeteorTime.current > 3000 + Math.random() * 7000) { // 3-10秒隨機間隔
      createMeteor();
      lastMeteorTime.current = now;
    }
    updateMeteors();

    // ---- 更新閃爍效果 ----
    nodesRef.current.forEach((n) => {
      n.twinkle += n.twinkleSpeed;
      if (n.twinkle > 1) n.twinkle = 0;
    });
    
    backgroundStarsRef.current.forEach((s) => {
      s.twinkle += s.twinkleSpeed;
      if (s.twinkle > 1) s.twinkle = 0;
    });

    // ---- 畫背景星星 ----
    backgroundStarsRef.current.forEach((s) => {
      const screenX = s.x + canvas.width / 2;
      const screenY = s.y + canvas.height / 2;
      const twinkleValue = Math.sin(s.twinkle * Math.PI * 2) * 0.5 + 0.5;
      drawStar(ctx, screenX, screenY, s.radius, twinkleValue, false, false);
    });

    // ---- 畫流星 ----
    drawMeteors(ctx);

    // ---- 畫連線 (hover 節點與同 category) ----
    const hovered = nodesRef.current.find((n) => n.hovered);
    if (hovered) {
      ctx.strokeStyle = `rgba(255, 255, 255, 0.6)`;
      ctx.lineWidth = 2;
      ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
      ctx.shadowBlur = 5;
      ctx.setLineDash([]);
      ctx.beginPath();
      nodesRef.current.forEach((n) => {
        if (n !== hovered && n.category === hovered.category) {
          ctx.moveTo(
            hovered.x + canvas.width / 2,
            hovered.y + canvas.height / 2
          );
          ctx.lineTo(n.x + canvas.width / 2, n.y + canvas.height / 2);
        }
      });
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // ---- 畫技能星星 ----
    nodesRef.current.forEach((n) => {
      const screenX = n.x + canvas.width / 2;
      const screenY = n.y + canvas.height / 2;
      const twinkleValue = Math.sin(n.twinkle * Math.PI * 2) * 0.5 + 0.5;
      drawStar(ctx, screenX, screenY, n.radius, twinkleValue, true, n.hovered || n.selected);
    });

    ctx.restore();

    // ---- 繪製技術名稱 (在變換之外，使用螢幕座標) ----
    if (hovered) {
      const relatedNodes = nodesRef.current.filter(n => 
        n === hovered || (n.category === hovered.category && n !== hovered)
      );
      
      relatedNodes.forEach(node => {
        const worldX = node.x + canvas.width / 2;
        const worldY = node.y + canvas.height / 2;
        
        // 將世界座標轉換為螢幕座標
        const screenX = (worldX - canvas.width / 2 - offset.current.x) * zoom.current + canvas.width / 2;
        const screenY = (worldY - canvas.height / 2 - offset.current.y) * zoom.current + canvas.height / 2;
        
        // 檢查是否在可視範圍內
        if (screenX >= -100 && screenX <= canvas.width + 100 && 
            screenY >= -50 && screenY <= canvas.height + 50) {
          
          ctx.save();
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
          ctx.font = "12px Arial";
          ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
          ctx.shadowBlur = 3;
          
          const textX = screenX + (node.radius * zoom.current) + 8;
          const textY = screenY - (node.radius * zoom.current) - 5;
          
          ctx.fillText(node.name, textX, textY);
          ctx.restore();
        }
      });
    }
  }, []);

  /* ---- 動畫循環 ---- */
  const loop = useCallback(() => {
    draw();
    animationRef.current = requestAnimationFrame(loop);
  }, [draw]);

  /* ---- Hit Test ---- */
const hitNode = (sx: number, sy: number) => {
  const canvas = canvasRef.current;
  if (!canvas) return null;
  
  // 將螢幕座標轉換為世界座標
  const worldX = (sx - canvas.width / 2) / zoom.current + canvas.width / 2 + offset.current.x;
  const worldY = (sy - canvas.height / 2) / zoom.current + canvas.height / 2 + offset.current.y;
  
  return nodesRef.current.find((n) => {
    // 技能星星的世界座標
    const starWorldX = n.x + canvas.width / 2;
    const starWorldY = n.y + canvas.height / 2;
    
    // 計算距離（不需要再乘以 zoom）
    const distance = Math.hypot(starWorldX - worldX, starWorldY - worldY);
    return distance <= n.radius + 8;
  });
};

  /* ---- Events ---- */
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;

    if (dragging.current) {
      const dx = e.clientX - last.current.x;
      const dy = e.clientY - last.current.y;
      offset.current.x -= dx;
      offset.current.y -= dy;
      last.current = { x: e.clientX, y: e.clientY };
      return;
    }
    nodesRef.current.forEach((n) => (n.hovered = false));
    const node = hitNode(sx, sy);
    if (node) node.hovered = true;
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
  }, []);

  const stopDrag = useCallback(() => {
    dragging.current = false;
  }, []);

  const onWheel = useCallback((e: React.WheelEvent<HTMLCanvasElement>) => {
    e.stopPropagation();
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // 計算縮放前的世界座標
    const worldX = (mouseX - canvas.width / 2) / zoom.current + canvas.width / 2 + offset.current.x;
    const worldY = (mouseY - canvas.height / 2) / zoom.current + canvas.height / 2 + offset.current.y;
    
    // 更新縮放級別
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(0.3, Math.min(3, zoom.current * zoomFactor));
    
    // 計算縮放後需要調整的偏移量
    const newWorldX = (mouseX - canvas.width / 2) / newZoom + canvas.width / 2 + offset.current.x;
    const newWorldY = (mouseY - canvas.height / 2) / newZoom + canvas.height / 2 + offset.current.y;
    
    // 調整偏移量以保持滑鼠位置不變
    offset.current.x += worldX - newWorldX;
    offset.current.y += worldY - newWorldY;
    
    zoom.current = newZoom;
  }, []);

  const onClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;
    nodesRef.current.forEach((n) => (n.selected = false));
    const node = hitNode(sx, sy);
    if (node) {
      node.selected = true;
      window.dispatchEvent(
        new CustomEvent(SKILL_SELECTED_EVENT, {
          detail: {
            name: node.name,
            level: node.level,
            category: node.category,
            color: node.color,
            icon: node.icon,
            description: node.description,
            applications: node.applications,
            relatedLinks: node.relatedLinks,
          },
        })
      );
    }
  }, []);

  /* ---- Resize ---- */
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    canvas.width = parent.clientWidth;
    canvas.height = 600;
    
    // 當畫布大小改變時，需要重新渲染銀河背景
    galaxyRenderedRef.current = false;
  }, []);

  /* ---- Lifecycles ---- */
  useEffect(() => {
    resize();
    initNodes();
    loop();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [resize, initNodes, loop]);

  useEffect(() => {
    const h = () => resize();
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [resize]);

  /* ---- Render ---- */
  return (
    <div
      className="relative rounded-2xl p-4 overflow-hidden"
      style={{ background: "#020817" }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-[600px] cursor-grab active:cursor-grabbing"
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onClick={onClick}
        onWheel={onWheel}
      />
    </div>
  );
});

SkillStarfield.displayName = "SkillStarfield";
export default SkillStarfield;
