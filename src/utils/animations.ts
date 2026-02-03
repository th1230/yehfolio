import gsap from 'gsap';
import { useEffect, useState, useRef, RefObject } from 'react';

/**
 * 預定義的 Spring 動畫配置 (GSAP 版本)
 * 針對不同場景優化的緩動參數
 */
export const springConfigs = {
  // 溫和流暢 - 適合大元素移動
  gentle: {
    duration: 0.6,
    ease: 'power2.out',
  },
  // 彈跳活潑 - 適合強調效果
  bouncy: {
    duration: 0.5,
    ease: 'back.out(1.7)',
  },
  // 快速響應 - 適合互動反饋
  snappy: {
    duration: 0.3,
    ease: 'power3.out',
  },
  // 緩慢優雅 - 適合背景動畫
  slow: {
    duration: 0.8,
    ease: 'power1.out',
  },
  // 極快速 - 適合微互動
  instant: {
    duration: 0.2,
    ease: 'power4.out',
  },
} as const;

/**
 * 預定義的緩動曲線
 */
export const easings = {
  smooth: 'power2.inOut',
  easeInOutCubic: 'power2.inOut',
  anticipate: 'back.inOut(1.7)',
  easeOut: 'power2.out',
  easeIn: 'power2.in',
  elastic: 'elastic.out(1, 0.3)',
} as const;

/**
 * 預定義的過渡配置
 */
export const transitions = {
  quickFade: {
    duration: 0.3,
    ease: easings.easeOut,
  },
  fade: {
    duration: 0.5,
    ease: easings.smooth,
  },
  slowFade: {
    duration: 0.8,
    ease: easings.easeInOutCubic,
  },
  bounceIn: {
    ...springConfigs.bouncy,
  },
  slideIn: {
    duration: 0.6,
    ease: easings.smooth,
  },
} as const;

/**
 * 預定義的動畫變體
 */
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

export const fadeInDown = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 30 },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

export const fadeInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

export const slideInUp = {
  initial: { y: '100%', opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: '100%', opacity: 0 },
};

/**
 * Stagger 動畫配置生成器
 */
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  staggerChildren,
  delayChildren,
});

export const staggerItem = (delay = 0) => ({
  ...springConfigs.gentle,
  delay,
});

/**
 * Hover 效果預設配置
 */
export const hoverEffects = {
  lift: {
    y: -4,
  },
  scale: {
    scale: 1.05,
  },
  liftAndScale: {
    y: -4,
    scale: 1.03,
  },
  tilt: {
    rotateX: 5,
    rotateY: 5,
    scale: 1.02,
  },
  glow: {
    scale: 1.02,
  },
};

/**
 * Tap 效果預設配置
 */
export const tapEffects = {
  shrink: {
    scale: 0.95,
  },
  press: {
    scale: 0.9,
  },
  sink: {
    y: 2,
    scale: 0.98,
  },
};

/**
 * 檢測用戶是否偏好減少動畫
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return prefersReducedMotion;
}

/**
 * GSAP 版本的 useInView hook
 */
export function useInView(
  ref: RefObject<HTMLElement | null>,
  options: { once?: boolean; margin?: string; amount?: number } = {}
): boolean {
  const [isInView, setIsInView] = useState(false);
  const { once = false, margin = '0px', amount = 0 } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      {
        rootMargin: margin,
        threshold: amount,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, once, margin, amount]);

  return isInView;
}

/**
 * GSAP 動畫 hook - 進入視口時播放動畫
 */
export function useGsapInView(
  ref: RefObject<HTMLElement | null>,
  animation: gsap.TweenVars,
  options: { once?: boolean; margin?: string; delay?: number } = {}
) {
  const isInView = useInView(ref, {
    once: options.once ?? true,
    margin: options.margin ?? '-100px',
  });
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (isInView && !hasAnimated.current) {
      gsap.to(element, {
        ...animation,
        delay: options.delay ?? 0,
      });
      if (options.once !== false) {
        hasAnimated.current = true;
      }
    }
  }, [isInView, animation, options.delay, options.once, ref]);

  return isInView;
}

/**
 * GSAP hover 效果 hook
 */
export function useGsapHover(
  ref: RefObject<HTMLElement | null>,
  hoverAnimation: gsap.TweenVars,
  options: { disabled?: boolean } = {}
) {
  useEffect(() => {
    const element = ref.current;
    if (!element || options.disabled) return;

    const originalValues: gsap.TweenVars = {};
    Object.keys(hoverAnimation).forEach(key => {
      if (key !== 'duration' && key !== 'ease') {
        originalValues[key] = gsap.getProperty(element, key);
      }
    });

    const handleMouseEnter = () => {
      gsap.to(element, {
        ...hoverAnimation,
        duration: hoverAnimation.duration ?? 0.3,
        ease: hoverAnimation.ease ?? 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        ...originalValues,
        duration: hoverAnimation.duration ?? 0.3,
        ease: hoverAnimation.ease ?? 'power2.out',
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, hoverAnimation, options.disabled]);
}

/**
 * GSAP tap 效果 hook
 */
export function useGsapTap(
  ref: RefObject<HTMLElement | null>,
  tapAnimation: gsap.TweenVars,
  options: { disabled?: boolean } = {}
) {
  useEffect(() => {
    const element = ref.current;
    if (!element || options.disabled) return;

    const handleMouseDown = () => {
      gsap.to(element, {
        ...tapAnimation,
        duration: 0.1,
        ease: 'power2.out',
      });
    };

    const handleMouseUp = () => {
      gsap.to(element, {
        scale: 1,
        y: 0,
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mouseup', handleMouseUp);
    element.addEventListener('mouseleave', handleMouseUp);

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mouseup', handleMouseUp);
      element.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [ref, tapAnimation, options.disabled]);
}

/**
 * GSAP scroll progress hook
 */
export function useScrollProgress(containerRef: RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;

      const total = elementHeight + windowHeight;
      let currentProgress = 1 - (rect.top + elementHeight) / total;
      currentProgress = Math.max(0, Math.min(1, currentProgress));

      setProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [containerRef]);

  return progress;
}

/**
 * 視差滾動計算輔助函數
 */
export const parallaxConfig = {
  subtle: { offset: 30 },
  medium: { offset: 60 },
  strong: { offset: 100 },
};

/**
 * 3D Transform 效果預設
 */
export const transform3D = {
  cardFlip: {
    rotateY: 180,
    duration: 0.6,
    ease: easings.easeInOutCubic,
  },
  perspectiveTilt: (x: number, y: number) => ({
    rotateX: y * 0.1,
    rotateY: x * 0.1,
    scale: 1.02,
    duration: 0.2,
    ease: 'power4.out',
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
    duration: 0.3,
  },
  content: {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 20 },
    ...springConfigs.gentle,
  },
  slideUp: {
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '100%' },
    ...springConfigs.snappy,
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
    ...transitions.fade,
  },
  slideLeft: {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
    ...transitions.slideIn,
  },
  slideRight: {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
    ...transitions.slideIn,
  },
};

/**
 * GSAP 動畫執行函數
 */
export function animateElement(
  element: HTMLElement | null,
  to: gsap.TweenVars,
  from?: gsap.TweenVars
) {
  if (!element) return;
  if (from) {
    gsap.fromTo(element, from, to);
  } else {
    gsap.to(element, to);
  }
}

/**
 * GSAP stagger 動畫
 */
export function animateStagger(
  elements: HTMLElement[] | NodeListOf<Element> | string,
  to: gsap.TweenVars,
  stagger: number = 0.1
) {
  gsap.to(elements, {
    ...to,
    stagger,
  });
}
