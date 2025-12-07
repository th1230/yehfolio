'use client';

import { useEffect, useRef } from 'react';

/**
 * 粒子介面定義
 * 每個粒子代表一片飄落的樹葉
 */
interface Particle {
  x: number; // X 座標
  y: number; // Y 座標
  vx: number; // X 軸速度（風速）
  vy: number; // Y 軸速度（下落速度）
  size: number; // 粒子大小
  rotation: number; // 旋轉角度
  rotationSpeed: number; // 旋轉速度
  opacity: number; // 不透明度
  imageIndex: number; // 圖片索引（創建時就固定）
  swayPhase: number; // 擺動相位（讓每片葉子擺動不同步）
  swayAmplitude: number; // 擺動幅度
  windFactor: number; // 風力影響因子（大葉子受風影響大）
  depth: number; // 深度值（用於優化計算）
}

/**
 * 地面粒子介面
 * 用於地面堆積效果
 */
interface GroundParticle {
  x: number;
  y: number;
  size: number;
  rotation: number;
  opacity: number;
  imageIndex: number; // 圖片索引（創建時就固定）
  createdAt: number; // 記錄創建時間
}

/**
 * 秋天落葉動畫背景組件
 * 使用 Canvas 繪製高性能的粒子動畫系統
 */
export default function SeasonalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const groundParticlesRef = useRef<GroundParticle[]>([]);
  const lastTimeRef = useRef<number>(0);
  const leafImagesRef = useRef<HTMLImageElement[]>([]);
  const imagesLoadedRef = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    // 載入樹葉圖片
    const basePath = process.env.NODE_ENV === 'production' ? '/yehfolio' : '';
    const imageFiles = [
      `${basePath}/images/autumn/maple-1.png`,
      `${basePath}/images/autumn/maple-2.png`,
      `${basePath}/images/autumn/maple-3.png`,
      `${basePath}/images/autumn/ginkgo-1.png`,
      `${basePath}/images/autumn/ginkgo-2.png`,
    ];

    let loadedCount = 0;
    leafImagesRef.current = imageFiles.map(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === imageFiles.length) {
          imagesLoadedRef.current = true;
          // 圖片載入完成後啟動動畫
          initParticles();
          animationFrameRef.current = requestAnimationFrame(animate);
        }
      };
      return img;
    });

    // 設定畫布大小為視窗大小
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    /**
     * 根據螢幕大小計算合適的粒子數量
     */
    const getParticleCount = () => {
      const area = window.innerWidth * window.innerHeight;
      const baseCount = Math.floor(area / 25000); // 降低密度
      return Math.min(Math.max(baseCount, 30), 60); // 降低上限到 60
    };

    /**
     * 創建新粒子
     * 從視窗頂部上方開始，落到視窗底部
     */
    const createParticle = (): Particle => {
      const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
      const canvasHeight = canvas.height / (window.devicePixelRatio || 1);

      // 使用隨機深度值來創造立體感 (0-1，越大越近)
      const depth = Math.random();
      const size = depth * 35 + 15; // 15-50px
      const opacity = depth * 0.5 + 0.3; // 0.3-0.8
      const fallSpeed = (1 - depth * 0.5) * 2.5 + 0.5; // 遠處快，近處慢

      // 🎨 新增：更豐富的動態參數
      const swayAmplitude = (depth * 0.6 + 0.4) * 2; // 近處擺動幅度大 (0.8-2)
      const windFactor = size / 50; // 大葉子受風影響更大
      const rotationSpeed = (Math.random() - 0.5) * 0.05 * (1.5 - depth); // 遠處轉更快

      return {
        x: Math.random() * canvasWidth,
        y: -Math.random() * canvasHeight - 50,
        vx: (Math.random() - 0.5) * 1.5, // 降低初始水平速度
        vy: fallSpeed,
        size,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed,
        opacity,
        imageIndex: Math.floor(Math.random() * leafImagesRef.current.length),
        swayPhase: Math.random() * Math.PI * 2, // 隨機相位
        swayAmplitude,
        windFactor,
        depth,
      };
    };

    /**
     * 繪製粒子（使用圖片）- 優化版
     */
    const drawParticle = (particle: Particle) => {
      if (!imagesLoadedRef.current) return;

      const img = leafImagesRef.current[particle.imageIndex];
      if (!img || !img.complete) return;

      const halfSize = particle.size / 2;

      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      // 移除 blur filter 提升性能
      ctx.drawImage(img, -halfSize, -halfSize, particle.size, particle.size);
      ctx.restore();
    };

    /**
     * 繪製秋天背景漸層
     */
    const drawSeasonalBackground = (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number
    ) => {
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'rgba(255, 140, 0, 0.08)');
      gradient.addColorStop(0.5, 'rgba(218, 165, 32, 0.06)');
      gradient.addColorStop(1, 'rgba(160, 82, 45, 0.1)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    /**
     * 添加粒子到地面堆積層
     * 楓葉停止時，在當前位置堆積
     */
    const addGroundParticle = (particle: Particle, currentTime: number, absoluteY: number) => {
      const newGroundParticle: GroundParticle = {
        x: particle.x,
        y: absoluteY, // 使用當前的絕對 y 座標
        size: particle.size,
        rotation: particle.rotation,
        opacity: particle.opacity,
        imageIndex: particle.imageIndex,
        createdAt: currentTime,
      };

      groundParticlesRef.current.push(newGroundParticle);

      const maxGroundParticles = 300;
      if (groundParticlesRef.current.length > maxGroundParticles) {
        groundParticlesRef.current = groundParticlesRef.current.slice(-maxGroundParticles);
      }
    };

    /**
     * 繪製地面堆積層
     * 在頁面底部繪製堆積效果，並移除超過15秒的粒子
     */
    const drawGroundLayer = (ctx: CanvasRenderingContext2D, currentTime: number) => {
      if (!imagesLoadedRef.current) return;

      const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
      const canvasHeight = canvas.height / (window.devicePixelRatio || 1);
      const scrollY = window.scrollY || window.pageYOffset;
      const pageHeight = document.documentElement.scrollHeight;
      const LIFETIME = 15000;

      groundParticlesRef.current = groundParticlesRef.current.filter(
        gp => currentTime - gp.createdAt < LIFETIME
      );

      groundParticlesRef.current.forEach(gp => {
        const img = leafImagesRef.current[gp.imageIndex];
        if (!img || !img.complete) return;

        // 將絕對座標轉換為相對於視窗的座標
        const relativeY = gp.y - scrollY;

        // 只繪製在視窗範圍內或靠近的粒子
        if (relativeY < -100 || relativeY > canvasHeight + 100) return;

        const age = currentTime - gp.createdAt;
        const fadeStartTime = LIFETIME - 2000;
        let opacity = gp.opacity;
        if (age > fadeStartTime) {
          const fadeProgress = (age - fadeStartTime) / 2000;
          opacity = gp.opacity * (1 - fadeProgress);
        }

        const halfSize = gp.size / 2;

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.translate(gp.x, relativeY);
        ctx.rotate(gp.rotation);
        ctx.drawImage(img, -halfSize, -halfSize, gp.size, gp.size);
        ctx.restore();
      });

      // 繪製地面堆積效果的漸層陰影
      if (groundParticlesRef.current.length > 10) {
        const groundRelativeY = pageHeight - scrollY;
        // 只在地面在視窗範圍內時繪製陰影
        if (groundRelativeY > -150 && groundRelativeY < canvasHeight + 150) {
          ctx.save();
          ctx.globalAlpha = 0.35;
          const gradient = ctx.createLinearGradient(0, groundRelativeY - 130, 0, groundRelativeY);
          gradient.addColorStop(0, 'rgba(139, 69, 19, 0)');
          gradient.addColorStop(0.3, 'rgba(139, 69, 19, 0.1)');
          gradient.addColorStop(0.7, 'rgba(139, 69, 19, 0.2)');
          gradient.addColorStop(1, 'rgba(139, 69, 19, 0.3)');

          ctx.fillStyle = gradient;
          ctx.fillRect(0, groundRelativeY - 130, canvasWidth, 130);
          ctx.restore();
        }
      }
    };

    /**
     * 初始化粒子系統
     * 讓粒子均勻分布在視窗中
     */
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = getParticleCount();
      const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
      const canvasHeight = canvas.height / (window.devicePixelRatio || 1);

      for (let i = 0; i < particleCount; i++) {
        const particle = createParticle();
        // 讓初始粒子分散在整個視窗中
        particle.y = Math.random() * canvasHeight;
        particlesRef.current.push(particle);
      }
    };

    /**
     * 主動畫循環
     * 使用 requestAnimationFrame 實現流暢的 60 FPS 動畫
     */
    const animate = (currentTime: number) => {
      if (!imagesLoadedRef.current) return;

      // 🔍 性能監測開始
      const perfStart = performance.now();

      const deltaTime = lastTimeRef.current ? (currentTime - lastTimeRef.current) / 16.67 : 1;
      lastTimeRef.current = currentTime;

      const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
      const canvasHeight = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      drawSeasonalBackground(ctx, canvasWidth, canvasHeight);

      // 🔍 計算邏輯開始
      const calcStart = performance.now();

      // 🌪️ 全局風力（隨時間變化）
      const globalWind = Math.sin(currentTime * 0.0003) * 1.5;
      const windGust = Math.sin(currentTime * 0.002) * 0.8; // 陣風

      particlesRef.current.forEach((particle, index) => {
        // 基礎移動
        particle.y += particle.vy * deltaTime;

        // 🎨 增強：螺旋式擺動（每片葉子有自己的相位）
        const swayFreq = 0.002 + particle.depth * 0.001; // 近處擺動慢，遠處快
        const swayX =
          Math.sin(currentTime * swayFreq + particle.swayPhase) * particle.swayAmplitude;
        const swayY = Math.cos(currentTime * swayFreq * 0.5 + particle.swayPhase) * 0.5; // Y軸微擺動

        particle.x +=
          (particle.vx + swayX + (globalWind + windGust) * particle.windFactor) * deltaTime * 0.3;
        particle.y += swayY * deltaTime * 0.2;

        // 🎨 增強：旋轉速度隨擺動變化（更自然）
        const rotationVariation = Math.sin(currentTime * 0.003 + particle.swayPhase) * 0.02;
        particle.rotation += (particle.rotationSpeed + rotationVariation) * deltaTime;

        // 計算粒子的絕對 y 座標（相對於整個頁面）
        const scrollY = window.scrollY || window.pageYOffset;
        const absoluteY = particle.y + scrollY;
        const pageHeight = document.documentElement.scrollHeight;

        // 定義底部堆積區域（頁面最後 120px）
        const groundZoneStart = pageHeight - 120;

        // 當楓葉進入堆積區域時，每次移動都判斷是否該停下來
        if (absoluteY >= groundZoneStart) {
          // 計算在堆積區域內的深度（0 到 120）
          const depthInZone = absoluteY - groundZoneStart;
          // 越深入堆積區域，停止機率越高（接近底部時接近 100%）
          const stopProbability = Math.pow(depthInZone / 120, 2);

          if (Math.random() < stopProbability) {
            // 停止並加入堆積
            addGroundParticle(particle, currentTime, absoluteY);
            particlesRef.current[index] = createParticle();
          }
        }
        // 如果粒子離開視窗底部但還沒到堆積區域，就重置到頂部
        else if (particle.y > canvasHeight + 50) {
          particlesRef.current[index] = createParticle();
        }

        if (particle.x < -50) {
          particle.x = canvasWidth + 50;
        } else if (particle.x > canvasWidth + 50) {
          particle.x = -50;
        }
      });

      const calcEnd = performance.now();

      // 🔍 繪圖開始
      const drawStart = performance.now();

      particlesRef.current.forEach(particle => {
        drawParticle(particle);
      });

      drawGroundLayer(ctx, currentTime);

      const drawEnd = performance.now();

      // 🔍 性能監測結束 - 每 60 幀印一次
      if (Math.floor(currentTime / 1000) !== Math.floor((lastTimeRef.current || 0) / 1000)) {
        const totalTime = perfStart ? drawEnd - perfStart : 0;
        const calcTime = calcStart && calcEnd ? calcEnd - calcStart : 0;
        const drawTime = drawStart && drawEnd ? drawEnd - drawStart : 0;

        console.log('🎨 性能分析:');
        console.log(`   總耗時: ${totalTime.toFixed(2)}ms`);
        console.log(
          `   計算邏輯: ${calcTime.toFixed(2)}ms (${((calcTime / totalTime) * 100).toFixed(1)}%)`
        );
        console.log(
          `   繪圖渲染: ${drawTime.toFixed(2)}ms (${((drawTime / totalTime) * 100).toFixed(1)}%)`
        );
        console.log(`   粒子數量: ${particlesRef.current.length}`);
        console.log(`   地面粒子: ${groundParticlesRef.current.length}`);
        console.log(`   FPS: ${(1000 / totalTime).toFixed(1)}`);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // 清理函數
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      style={{ mixBlendMode: 'normal' }}
      aria-label="秋天落葉背景動畫"
    />
  );
}
