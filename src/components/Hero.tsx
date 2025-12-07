'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

import { springConfigs, useReducedMotion, hoverEffects, tapEffects } from '@/utils/animations';

// 動畫常數 - 魔法效果優化
const ANIMATION_CONFIG = {
  SEED_MULTIPLIER: 12345,
  RANDOM_RANGE: 1000,
  X_RANGE: 1500,
  Y_RANGE: 1000,
  ROTATE_RANGE: 1080,
  LETTER_DELAY_INCREMENT: 0.06,
  SUBTITLE_DELAY_INCREMENT: 0.04,
  DESCRIPTION_DELAY_INCREMENT: 0.035,
  BASE_DELAY: 0.15,
  SUBTITLE_BASE_DELAY: 1.2,
  DESCRIPTION_BASE_DELAY: 2.0,
} as const;

const SPRING_CONFIG = {
  TITLE: { damping: 15, stiffness: 120, mass: 0.8 },
  SUBTITLE: { damping: 18, stiffness: 140, mass: 0.7 },
  DESCRIPTION: { damping: 20, stiffness: 160, mass: 0.6 },
} as const;

export default function Hero() {
  const [isClient, setIsClient] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 預設的固定位置，避免 hydration mismatch
  const getRandomPosition = (index: number) => {
    // 使用 index 作為 seed 來產生一致的"隨機"位置
    const seed = index * ANIMATION_CONFIG.SEED_MULTIPLIER;
    const pseudoRandom1 = (seed % ANIMATION_CONFIG.RANDOM_RANGE) / ANIMATION_CONFIG.RANDOM_RANGE;
    const pseudoRandom2 =
      ((seed * 7) % ANIMATION_CONFIG.RANDOM_RANGE) / ANIMATION_CONFIG.RANDOM_RANGE;
    const pseudoRandom3 =
      ((seed * 13) % ANIMATION_CONFIG.RANDOM_RANGE) / ANIMATION_CONFIG.RANDOM_RANGE;

    return {
      x: (pseudoRandom1 - 0.5) * ANIMATION_CONFIG.X_RANGE,
      y: (pseudoRandom2 - 0.5) * ANIMATION_CONFIG.Y_RANGE,
      rotate: (pseudoRandom3 - 0.5) * ANIMATION_CONFIG.ROTATE_RANGE,
    };
  };

  const titleText = '前端工程師 / 葉濬宇';
  const subtitleText = '習慣邊做邊學，持續磨練開發能力';
  const descriptionText = '以前端為核心，持續拓展跨領域技術與實作經驗';

  // 字符動畫變體 - 魔法效果
  const letterVariants = {
    initial: (custom: { x: number; y: number; rotate: number }) => ({
      x: prefersReducedMotion ? 0 : custom.x,
      y: prefersReducedMotion ? 0 : custom.y,
      rotate: prefersReducedMotion ? 0 : custom.rotate,
      opacity: 0,
      scale: 0.3,
      filter: 'blur(15px) brightness(1.5)',
    }),
    animate: {
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px) brightness(1)',
    },
  };
  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-20 dark:bg-gray-900/30">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h1
            className="text-outer-space dark:text-apricot mb-6 text-5xl font-bold md:text-7xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {isClient &&
              titleText.split('').map((char, index) => (
                <motion.span
                  key={index}
                  custom={getRandomPosition(index)}
                  variants={letterVariants}
                  initial="initial"
                  animate="animate"
                  transition={{
                    type: 'spring',
                    damping: SPRING_CONFIG.TITLE.damping,
                    stiffness: SPRING_CONFIG.TITLE.stiffness,
                    mass: SPRING_CONFIG.TITLE.mass,
                    delay:
                      index * ANIMATION_CONFIG.LETTER_DELAY_INCREMENT + ANIMATION_CONFIG.BASE_DELAY,
                  }}
                  style={{
                    display: 'inline-block',
                    textShadow: prefersReducedMotion ? 'none' : '0 0 20px rgba(245, 172, 114, 0.3)',
                  }}
                  whileHover={
                    prefersReducedMotion
                      ? {}
                      : {
                          scale: 1.1,
                          textShadow: '0 0 30px rgba(245, 172, 114, 0.6)',
                          transition: { duration: 0.2 },
                        }
                  }
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            {!isClient && titleText}
          </motion.h1>

          <motion.p
            className="text-outer-space/80 dark:text-fawn mx-auto mb-8 max-w-2xl text-xl leading-relaxed md:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <span style={{ display: 'block', marginBottom: '0.5rem' }}>
              {isClient &&
                subtitleText.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    custom={getRandomPosition(index + titleText.length)}
                    variants={letterVariants}
                    initial="initial"
                    animate="animate"
                    transition={{
                      type: 'spring',
                      damping: SPRING_CONFIG.SUBTITLE.damping,
                      stiffness: SPRING_CONFIG.SUBTITLE.stiffness,
                      mass: SPRING_CONFIG.SUBTITLE.mass,
                      delay:
                        index * ANIMATION_CONFIG.SUBTITLE_DELAY_INCREMENT +
                        ANIMATION_CONFIG.SUBTITLE_BASE_DELAY,
                    }}
                    style={{
                      display: 'inline-block',
                      textShadow: prefersReducedMotion
                        ? 'none'
                        : '0 0 15px rgba(234, 211, 174, 0.2)',
                    }}
                    whileHover={
                      prefersReducedMotion
                        ? {}
                        : {
                            scale: 1.05,
                            textShadow: '0 0 25px rgba(234, 211, 174, 0.5)',
                            transition: { duration: 0.2 },
                          }
                    }
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              {!isClient && subtitleText}
            </span>
            <span style={{ display: 'block' }}>
              {isClient &&
                descriptionText.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    custom={getRandomPosition(index + titleText.length + subtitleText.length)}
                    variants={letterVariants}
                    initial="initial"
                    animate="animate"
                    transition={{
                      type: 'spring',
                      damping: SPRING_CONFIG.DESCRIPTION.damping,
                      stiffness: SPRING_CONFIG.DESCRIPTION.stiffness,
                      mass: SPRING_CONFIG.DESCRIPTION.mass,
                      delay:
                        index * ANIMATION_CONFIG.DESCRIPTION_DELAY_INCREMENT +
                        ANIMATION_CONFIG.DESCRIPTION_BASE_DELAY,
                    }}
                    style={{
                      display: 'inline-block',
                      textShadow: prefersReducedMotion
                        ? 'none'
                        : '0 0 15px rgba(234, 211, 174, 0.2)',
                    }}
                    whileHover={
                      prefersReducedMotion
                        ? {}
                        : {
                            scale: 1.05,
                            textShadow: '0 0 25px rgba(234, 211, 174, 0.5)',
                            transition: { duration: 0.2 },
                          }
                    }
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              {!isClient && descriptionText}
            </span>
          </motion.p>

          <motion.div
            className="flex flex-col justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          >
            <a href="#projects">
              <motion.button
                className="bg-sandy-brown cursor-pointer rounded-lg px-8 py-3 font-medium text-white shadow-lg transition-all duration-300"
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : {
                        ...hoverEffects.liftAndScale,
                        boxShadow: '0 10px 30px rgba(245, 172, 114, 0.4)',
                      }
                }
                whileTap={prefersReducedMotion ? {} : tapEffects.shrink}
              >
                查看作品
              </motion.button>
            </a>
            <a href="#contact">
              <motion.button
                className="border-outer-space dark:border-apricot text-outer-space dark:text-apricot cursor-pointer rounded-lg border-2 px-8 py-[10px] font-medium shadow-lg transition-all duration-300"
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : {
                        ...hoverEffects.liftAndScale,
                        borderColor: '#f5ac72',
                        boxShadow: '0 10px 30px rgba(245, 172, 114, 0.3)',
                      }
                }
                whileTap={prefersReducedMotion ? {} : tapEffects.shrink}
              >
                聯絡我
              </motion.button>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 transform cursor-pointer"
          animate={prefersReducedMotion ? {} : { y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={
            prefersReducedMotion
              ? {}
              : {
                  scale: 1.1,
                  transition: springConfigs.snappy,
                }
          }
          onClick={() => {
            const aboutSection = document.querySelector('#about');
            aboutSection?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <div className="border-outer-space/30 dark:border-apricot/30 hover:border-sandy-brown flex h-10 w-6 justify-center rounded-full border-2 transition-colors">
            <motion.div
              className="bg-outer-space/50 dark:bg-apricot/50 mt-2 h-3 w-1 rounded-full"
              animate={prefersReducedMotion ? {} : { y: [0, 18, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
