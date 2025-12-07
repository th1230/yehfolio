import { useEffect, useState } from 'react';

import type { Transition, Variant } from 'framer-motion';

/**
 * 預定義的 Spring 動畫配置
 * 針對不同場景優化的彈簧動畫參數
 */
export const springConfigs = {
  // 溫和流暢 - 適合大元素移動
  gentle: {
    type: 'spring' as const,
    damping: 20,
    stiffness: 150,
    mass: 0.8,
  },
  // 彈跳活潑 - 適合強調效果
  bouncy: {
    type: 'spring' as const,
    damping: 10,
    stiffness: 200,
    mass: 0.5,
  },
  // 快速響應 - 適合互動反饋
  snappy: {
    type: 'spring' as const,
    damping: 15,
    stiffness: 300,
    mass: 0.6,
  },
  // 緩慢優雅 - 適合背景動畫
  slow: {
    type: 'spring' as const,
    damping: 25,
    stiffness: 100,
    mass: 1,
  },
  // 極快速 - 適合微互動
  instant: {
    type: 'spring' as const,
    damping: 12,
    stiffness: 400,
    mass: 0.4,
  },
} as const;

/**
 * 預定義的緩動曲線
 * 基於常見的動畫曲線優化
 */
export const easings = {
  // 平滑過渡
  smooth: [0.43, 0.13, 0.23, 0.96] as const,
  // 標準 easeInOutCubic
  easeInOutCubic: [0.65, 0, 0.35, 1] as const,
  // 預期效果（先後退再前進）
  anticipate: [0.36, 0, 0.66, -0.56] as const,
  // 快速開始，緩慢結束
  easeOut: [0.16, 1, 0.3, 1] as const,
  // 緩慢開始，快速結束
  easeIn: [0.4, 0, 1, 1] as const,
  // 彈性效果
  elastic: [0.68, -0.55, 0.265, 1.55] as const,
} as const;

/**
 * 預定義的過渡配置
 * 常用的動畫時長和緩動組合
 */
export const transitions = {
  // 快速淡入
  quickFade: {
    duration: 0.3,
    ease: easings.easeOut,
  },
  // 標準淡入
  fade: {
    duration: 0.5,
    ease: easings.smooth,
  },
  // 慢速淡入
  slowFade: {
    duration: 0.8,
    ease: easings.easeInOutCubic,
  },
  // 彈跳進入
  bounceIn: {
    ...springConfigs.bouncy,
  },
  // 平滑滑入
  slideIn: {
    duration: 0.6,
    ease: easings.smooth,
  },
} as const;

/**
 * 預定義的動畫變體
 * 可重用的進入/退出動畫模式
 */
export const fadeInUp: { initial: Variant; animate: Variant; exit?: Variant } = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

export const fadeInDown: { initial: Variant; animate: Variant; exit?: Variant } = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 30 },
};

export const fadeInLeft: { initial: Variant; animate: Variant; exit?: Variant } = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

export const fadeInRight: { initial: Variant; animate: Variant; exit?: Variant } = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

export const scaleIn: { initial: Variant; animate: Variant; exit?: Variant } = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

export const slideInUp: { initial: Variant; animate: Variant; exit?: Variant } = {
  initial: { y: '100%', opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: '100%', opacity: 0 },
};

/**
 * Stagger 動畫配置生成器
 * 為列表項目創建依序出現的效果
 */
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  animate: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const staggerItem = (delay = 0): Transition => ({
  ...springConfigs.gentle,
  delay,
});

/**
 * Hover 效果預設配置
 */
export const hoverEffects = {
  // 輕微上浮
  lift: {
    y: -4,
    transition: springConfigs.snappy,
  },
  // 輕微放大
  scale: {
    scale: 1.05,
    transition: springConfigs.snappy,
  },
  // 組合效果：上浮 + 放大
  liftAndScale: {
    y: -4,
    scale: 1.03,
    transition: springConfigs.snappy,
  },
  // 3D 傾斜效果
  tilt: {
    rotateX: 5,
    rotateY: 5,
    scale: 1.02,
    transition: springConfigs.snappy,
  },
  // 發光效果（需配合 CSS）
  glow: {
    scale: 1.02,
    transition: springConfigs.snappy,
  },
};

/**
 * Tap 效果預設配置
 */
export const tapEffects = {
  // 輕微縮小
  shrink: {
    scale: 0.95,
  },
  // 明顯縮小
  press: {
    scale: 0.9,
  },
  // 輕微下沉
  sink: {
    y: 2,
    scale: 0.98,
  },
};

/**
 * 檢測用戶是否偏好減少動畫
 * 遵循無障礙設計原則
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // 現代瀏覽器使用 addEventListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    // 舊版瀏覽器回退
    else {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return prefersReducedMotion;
}

/**
 * 獲取條件化的過渡配置
 * 根據 reducedMotion 偏好返回簡化或完整動畫
 */
export function getTransition(transition: Transition, reducedMotion: boolean): Transition {
  if (reducedMotion) {
    return {
      duration: 0.01,
    };
  }
  return transition;
}

/**
 * 視差滾動計算輔助函數
 */
export const parallaxConfig = {
  // 輕微視差
  subtle: { offset: 30 },
  // 中等視差
  medium: { offset: 60 },
  // 強烈視差
  strong: { offset: 100 },
};

/**
 * 3D Transform 效果預設
 */
export const transform3D = {
  // 卡片翻轉效果
  cardFlip: {
    rotateY: 180,
    transition: {
      duration: 0.6,
      ease: easings.easeInOutCubic,
    },
  },
  // 透視傾斜
  perspectiveTilt: (x: number, y: number) => ({
    rotateX: y * 0.1,
    rotateY: x * 0.1,
    transition: springConfigs.instant,
  }),
};

/**
 * Modal/Overlay 動畫預設
 */
export const modalAnimations = {
  backdrop: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
  },
  content: {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 20 },
    transition: springConfigs.gentle,
  },
  slideUp: {
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '100%' },
    transition: springConfigs.snappy,
  },
};

/**
 * 頁面過渡動畫
 */
export const pageTransitions = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: transitions.fade,
  },
  slideLeft: {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
    transition: transitions.slideIn,
  },
  slideRight: {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
    transition: transitions.slideIn,
  },
};
