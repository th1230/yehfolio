'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 預設的固定位置，避免 hydration mismatch
  const getRandomPosition = (index: number) => {
    // 使用 index 作為 seed 來產生一致的"隨機"位置
    const seed = index * 12345;
    const pseudoRandom1 = (seed % 1000) / 1000;
    const pseudoRandom2 = ((seed * 7) % 1000) / 1000;
    const pseudoRandom3 = ((seed * 13) % 1000) / 1000;

    return {
      x: (pseudoRandom1 - 0.5) * 1000, // -500 到 500
      y: (pseudoRandom2 - 0.5) * 600, // -300 到 300
      rotate: (pseudoRandom3 - 0.5) * 720, // -360 到 360 度
    };
  };

const titleText = '前端工程師 / 葉濬宇';
const subtitleText = '習慣邊做邊學，持續磨練開發能力';
const descriptionText = '以前端為核心，持續拓展跨領域技術與實作經驗';

  // 字符動畫變體
  const letterVariants = {
    initial: (custom: any) => ({
      x: custom.x,
      y: custom.y,
      rotate: custom.rotate,
      opacity: 0,
      scale: 0.3,
    }),
    animate: {
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 1,
      scale: 1,
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
                    damping: 12,
                    stiffness: 100,
                    delay: index * 0.05 + 0.2,
                  }}
                  style={{ display: 'inline-block' }}
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
                      damping: 15,
                      stiffness: 120,
                      delay: index * 0.03 + 1.2,
                    }}
                    style={{ display: 'inline-block' }}
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
                    custom={getRandomPosition(
                      index + titleText.length + subtitleText.length,
                    )}
                    variants={letterVariants}
                    initial="initial"
                    animate="animate"
                    transition={{
                      type: 'spring',
                      damping: 18,
                      stiffness: 140,
                      delay: index * 0.025 + 1.8,
                    }}
                    style={{ display: 'inline-block' }}
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
                className="bg-sandy-brown cursor-pointer rounded-lg px-8 py-3 font-medium text-white transition-all duration-300"
                whileHover={{ y: -2, backgroundColor: '#f09b5f' }}
                whileTap={{ y: 0 }}
              >
                查看作品
              </motion.button>
            </a>
            <a href="#contact">
              <motion.button
                className="border-outer-space dark:border-apricot text-outer-space dark:text-apricot cursor-pointer rounded-lg border-2 px-8 py-3 font-medium transition-all duration-300"
                whileHover={{ y: -2, borderColor: '#f5ac72' }}
                whileTap={{ y: 0 }}
              >
                聯絡我
              </motion.button>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 transform"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="border-outer-space/30 dark:border-apricot/30 flex h-10 w-6 justify-center rounded-full border-2">
            <motion.div
              className="bg-outer-space/50 dark:bg-apricot/50 mt-2 h-3 w-1 rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
