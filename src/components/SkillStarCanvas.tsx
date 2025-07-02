'use client';

import { memo, useCallback, useEffect, useRef } from 'react';
import { createGalaxyBands } from '../utils/galaxy-bands';

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
  particles: {
    x: number;
    y: number;
    size: number;
    opacity: number;
    distanceFromCenter?: number;
  }[];
};

export const SKILL_SELECTED_EVENT = 'skillSelected';

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
      name: 'Angular',
      level: 95,
      category: '前端框架',
      color: '#DD0031',
      icon: '/images/skills/Angular-Dark.svg',
      description:
        '三年 Angular 開發經驗，主要負責大型企業級前後台系統建構。具備模組化架構設計能力，並能運用 RxJS 與 NgRx 進行複雜數據流與狀態管理。擅長運用 Angular CLI、依賴注入等核心特性，確保應用程式穩定性與可維護性。',
    },
    {
      name: 'React',
      level: 80,
      category: '前端框架',
      color: '#61DAFB',
      icon: '/images/skills/React-Dark.svg',
      description:
        '累積多個小型專案 React 開發經驗，能夠運用 React Hooks、Context API 及第三方狀態管理工具構建元件。曾參與 Line LIFF 後台管理系統開發，具備 SPA 實作與問題排除經驗。',
    },
    {
      name: 'Vue',
      level: 70,
      category: '前端框架',
      color: '#4FC08D',
      icon: '/images/skills/VueJS-Dark.svg',
      description:
        '具備中小型專案 Vue 開發經驗，能運用 Vue 3 Composition API、Pinia 狀態管理與 Vue Router。曾參與 AI 客製化 GPT 後台系統開發，高效運用 Vite 進行專案建構。',
    },
    {
      name: 'Next.js',
      level: 80,
      category: '前端框架',
      color: '#FF6B6B',
      icon: '/images/skills/NextJS-Dark.svg',
      description:
        '具備 Next.js 13+ App Router、Server Components、SSR/SSG 實作經驗。曾負責 AI 票務平台前端與數位游牧前台優化，具備網站效能與 SEO 相關經驗。',
    },
    {
      name: 'Nuxt.js',
      level: 75,
      category: '前端框架',
      color: '#00DC82',
      icon: '/images/skills/NuxtJS-Dark.svg',
      description:
        '曾與團隊協作，負責使用 Nuxt 3 建構客製化 AI 聊天機器人前台。此專案仿照 ChatGPT 介面，透過 SSE (Server-Sent Events) 串接後端與 AI 模型，實現對話、自動顯示、歷史數據管理、對話分享等功能。我能夠理解 Nuxt 應用程式的運作流程並規劃專案結構。',
    },

    // 程式語言
    {
      name: 'JavaScript',
      level: 90,
      category: '程式語言',
      color: '#F7DF1E',
      icon: '/images/skills/JavaScript.svg',
      description:
        '能夠高效運用 ES6+ 語法特性及 Promise、async/await 處理非同步。對模組系統與原型鏈有一定理解。具備分析與優化 JavaScript 程式碼效能的實務經驗，如提升 Lighthouse 檢測分數。',
    },
    {
      name: 'TypeScript',
      level: 85,
      category: '程式語言',
      color: '#3178C6',
      icon: '/images/skills/TypeScript.svg',
      description:
        '能夠有效利用 TypeScript 進行型別安全開發，曾應用泛型、條件型別提升大型專案程式碼品質與可維護性，支援團隊協作順暢。',
    },

    // 後端技術
    {
      name: 'Node.js',
      level: 80,
      category: '後端技術',
      color: '#339933',
      icon: '/images/skills/NodeJS-Dark.svg',
      description:
        '具備使用 Node.js 建構 RESTful API/GraphQL 服務經驗。曾參與才藝媒合與 AI 票務平台後端開發，對事件循環機制有一定的了解。',
    },
    {
      name: 'Express',
      level: 85,
      category: '後端技術',
      color: '#000000',
      icon: '/images/skills/ExpressJS-Dark.svg',
      description:
        '具備 Express.js 框架開發後端應用經驗，熟悉中介軟體設計與路由管理。曾整合身份驗證與 API 文件生成工具，建立 Web API 服務。',
    },
    {
      name: 'MongoDB',
      level: 75,
      category: '後端技術',
      color: '#47A248',
      icon: '/images/skills/MongoDB.svg',
      description:
        '具備 MongoDB 文件型資料庫的實務操作經驗，主要透過 ORM (如 Mongoose) 進行資料操作。曾應用於才藝媒合平台等專案，進行使用者數據和內容的儲存與查詢。能夠理解 NoSQL 資料庫的基本概念與設計原則，並完成所需資料庫任務。',
    },
    {
      name: 'PostgreSQL',
      level: 70,
      category: '後端技術',
      color: '#336791',
      icon: '/images/skills/PostgreSQL-Dark.svg',
      description:
        '在 AI 票務平台專案中應用 PostgreSQL 搭配 Prisma ORM。具備透過 ORM 實現資料操作的能力，並能執行資料庫的基本查詢。對關聯式資料庫的基礎概念有所了解，能參與資料庫相關的開發任務。',
    },

    // 開發工具
    {
      name: 'Git',
      level: 85,
      category: '開發工具',
      color: '#F05032',
      icon: '/images/skills/Git.svg',
      description:
        '熟練運用 Git 進行版本控制，掌握分支策略與合併衝突解決。具備參與團隊協作 Git 工作流程與程式碼審查的經驗。',
    },
    {
      name: 'Docker',
      level: 75,
      category: '開發工具',
      color: '#2496ED',
      icon: '/images/skills/Docker.svg',
      description:
        '具備 Docker 容器化實務經驗，能建構 Dockerfile。曾負責 AI 票務平台前後端容器化，並協助優化 CI/CD 映像建構速度。',
    },
    {
      name: 'GitHub Actions',
      level: 70,
      category: '開發工具',
      color: '#2088FF',
      icon: '/images/skills/GithubActions-Dark.svg',
      description:
        '參與自動化 CI/CD 流程設計與實作，透過 GitHub Actions 實現自動化部署。熟悉程式碼檢查、測試執行與多環境部署策略。',
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
        twinkleSpeed: 0.02 + Math.random() * 0.03,
      } as SkillNode;
    });

    // 初始化背景星星
    backgroundStarsRef.current = Array.from({ length: 2500 }, () => ({
      x: (Math.random() - 0.5) * 3000,
      y: (Math.random() - 0.5) * 2400,
      radius: 0.5 + Math.random() * 1.5,
      twinkle: Math.random(),
      twinkleSpeed: 0.01 + Math.random() * 0.02,
    }));

    // 初始化流星陣列
    meteorsRef.current = [];

    // 初始化隨機銀河群
    galaxyBandsRef.current = createGalaxyBands().map((band) => ({
      ...band,
      particles: band.particles.map((star) => ({
        x: star.x,
        y: star.y,
        size: star.size,
        opacity: star.opacity,
        distanceFromCenter: star.distance,
        color: star.color,
      })),
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
    hovered = false,
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
    grad.addColorStop(1, 'transparent');

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
      active: true,
    };

    meteorsRef.current.push(meteor);
  };

  const updateMeteors = () => {
    meteorsRef.current = meteorsRef.current.filter((meteor) => {
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
        point.opacity = 1 - index / meteor.tail.length;
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

    meteorsRef.current.forEach((meteor) => {
      if (meteor.tail.length < 2) return;

      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 2;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
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
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(
          head.x + canvas.width / 2,
          head.y + canvas.height / 2,
          2,
          0,
          Math.PI * 2,
        );
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
        band.y + galaxyCanvas.height / 2,
      );
      galaxyCtx.rotate(band.rotation);

      // 畫銀河中的每一顆星星
      band.particles.forEach((particle) => {
        // 星星核心 - 使用粒子自帶的顏色
        const color = (particle as any).color || 'hsl(200, 80%, 70%)';
        const finalOpacity = Math.max(
          0,
          Math.min(1, particle.opacity * band.opacity),
        );

        // 轉換 HSL 顏色為 RGBA
        let fillColor;
        if (color.startsWith('hsl')) {
          // 確保透明度值是有效的數字
          const clampedOpacity = isNaN(finalOpacity) ? 0.5 : finalOpacity;
          fillColor = color
            .replace('hsl(', 'hsla(')
            .replace(')', `, ${clampedOpacity})`);
        } else {
          const clampedOpacity = isNaN(finalOpacity) ? 0.5 : finalOpacity;
          fillColor = `rgba(255, 255, 255, ${clampedOpacity})`;
        }

        // 畫星星核心
        galaxyCtx.fillStyle = fillColor;
        galaxyCtx.beginPath();
        galaxyCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        galaxyCtx.fill();

        // 為較大的星星添加光暈
        if (particle.size > 0.6) {
          const glowSize = particle.size * 2.5;
          const glowOpacity = Math.max(0, Math.min(1, finalOpacity * 0.3));
          const glowGrad = galaxyCtx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            glowSize,
          );
          const safeGlowOpacity = isNaN(glowOpacity) ? 0.1 : glowOpacity;
          glowGrad.addColorStop(
            0,
            fillColor.replace(/[\d.]+\)$/, `${safeGlowOpacity})`),
          );
          glowGrad.addColorStop(1, 'transparent');
          galaxyCtx.fillStyle = glowGrad;
          galaxyCtx.beginPath();
          galaxyCtx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
          galaxyCtx.fill();
        }

        // 為大星星添加十字星芒
        if (particle.size > 0.8) {
          const strokeOpacity = Math.max(0, Math.min(1, finalOpacity * 0.6));
          const safeStrokeOpacity = isNaN(strokeOpacity) ? 0.3 : strokeOpacity;
          galaxyCtx.strokeStyle = fillColor.replace(
            /[\d.]+\)$/,
            `${safeStrokeOpacity})`,
          );
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
      const sourceX = Math.max(
        0,
        Math.min(
          galaxyCanvas.width - canvas.width,
          centerOffsetX + offset.current.x,
        ),
      );
      const sourceY = Math.max(
        0,
        Math.min(
          galaxyCanvas.height - canvas.height,
          centerOffsetY + offset.current.y,
        ),
      );

      // 從大背景中擷取對應的區域繪製到主畫布
      ctx.drawImage(
        galaxyCanvas,
        sourceX,
        sourceY, // 從背景畫布的位置
        canvas.width,
        canvas.height, // 擷取的大小
        0,
        0, // 繪製到主畫布的位置
        canvas.width,
        canvas.height, // 繪製的大小
      );
    }
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ---- 背景 ----
    ctx.fillStyle = '#050b1e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ---- 畫銀河帶 (在變換之前，作為背景) ----
    drawGalaxyBands(ctx);

    // ---- 應用縮放和平移變換 ----
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(zoom.current, zoom.current);
    ctx.translate(
      -canvas.width / 2 - offset.current.x,
      -canvas.height / 2 - offset.current.y,
    );

    // ---- 流星邏輯 ----
    const now = Date.now();
    if (now - lastMeteorTime.current > 3000 + Math.random() * 7000) {
      // 3-10秒隨機間隔
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
      ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
      ctx.shadowBlur = 5;
      ctx.setLineDash([]);
      ctx.beginPath();
      nodesRef.current.forEach((n) => {
        if (n !== hovered && n.category === hovered.category) {
          ctx.moveTo(
            hovered.x + canvas.width / 2,
            hovered.y + canvas.height / 2,
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
      drawStar(
        ctx,
        screenX,
        screenY,
        n.radius,
        twinkleValue,
        true,
        n.hovered || n.selected,
      );
    });

    ctx.restore();

    // ---- 繪製技術名稱 (在變換之外，使用螢幕座標) ----
    if (hovered) {
      const relatedNodes = nodesRef.current.filter(
        (n) =>
          n === hovered || (n.category === hovered.category && n !== hovered),
      );

      relatedNodes.forEach((node) => {
        const worldX = node.x + canvas.width / 2;
        const worldY = node.y + canvas.height / 2;

        // 將世界座標轉換為螢幕座標
        const screenX =
          (worldX - canvas.width / 2 - offset.current.x) * zoom.current +
          canvas.width / 2;
        const screenY =
          (worldY - canvas.height / 2 - offset.current.y) * zoom.current +
          canvas.height / 2;

        // 檢查是否在可視範圍內
        if (
          screenX >= -100 &&
          screenX <= canvas.width + 100 &&
          screenY >= -50 &&
          screenY <= canvas.height + 50
        ) {
          ctx.save();
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.font = '12px Arial';
          ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
          ctx.shadowBlur = 3;

          const textX = screenX + node.radius * zoom.current + 8;
          const textY = screenY - node.radius * zoom.current - 5;

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
    const worldX =
      (sx - canvas.width / 2) / zoom.current +
      canvas.width / 2 +
      offset.current.x;
    const worldY =
      (sy - canvas.height / 2) / zoom.current +
      canvas.height / 2 +
      offset.current.y;

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

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // 計算縮放前的世界座標
    const worldX =
      (mouseX - canvas.width / 2) / zoom.current +
      canvas.width / 2 +
      offset.current.x;
    const worldY =
      (mouseY - canvas.height / 2) / zoom.current +
      canvas.height / 2 +
      offset.current.y;

    // 更新縮放級別
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(0.3, Math.min(3, zoom.current * zoomFactor));

    // 計算縮放後需要調整的偏移量
    const newWorldX =
      (mouseX - canvas.width / 2) / newZoom +
      canvas.width / 2 +
      offset.current.x;
    const newWorldY =
      (mouseY - canvas.height / 2) / newZoom +
      canvas.height / 2 +
      offset.current.y;

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
        }),
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
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, [resize]);

  // 添加滾輪事件的非被動事件監聽器
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      canvas.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);

  /* ---- Render ---- */
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-4"
      style={{ background: '#020817' }}
    >
      <canvas
        ref={canvasRef}
        className="h-[600px] w-full cursor-grab active:cursor-grabbing"
        onMouseMove={onMouseMove}
        onMouseDown={onMouseDown}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onClick={onClick}
      />
    </div>
  );
});

SkillStarfield.displayName = 'SkillStarfield';
export default SkillStarfield;
