'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import { springConfigs, useReducedMotion } from '@/utils/animations';

export default function About() {
  const ref = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  // 視差滾動效果
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const _opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section id="about" ref={containerRef} className="bg-gray-50 px-4 py-20 dark:bg-gray-900/30">
      <div className="mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={
            prefersReducedMotion ? { duration: 0.01 } : { ...springConfigs.gentle, delay: 0.1 }
          }
        >
          {' '}
          <motion.h2
            className="text-outer-space dark:text-apricot mb-16 text-center text-4xl font-bold md:text-5xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={
              prefersReducedMotion ? { duration: 0.01 } : { ...springConfigs.bouncy, delay: 0.2 }
            }
          >
            關於我
          </motion.h2>
          <div className="grid items-center gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={
                prefersReducedMotion ? { duration: 0.01 } : { ...springConfigs.gentle, delay: 0.3 }
              }
            >
              <motion.h3
                className="text-outer-space dark:text-fawn mb-6 text-2xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.01 }
                    : { ...springConfigs.snappy, delay: 0.4 }
                }
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={
                    prefersReducedMotion ? { duration: 0.01 } : { duration: 0.6, delay: 0.5 }
                  }
                  className="inline-block"
                  whileHover={
                    prefersReducedMotion
                      ? {}
                      : {
                          scale: 1.05,
                          color: '#f5ac72',
                          transition: springConfigs.instant,
                        }
                  }
                >
                  前端工程師
                </motion.span>
              </motion.h3>

              <motion.p
                className="text-outer-space/80 dark:text-apricot/80 mb-6 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.01 }
                    : { ...springConfigs.gentle, delay: 0.5 }
                }
              >
                淡江大學畢業，主力使用
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0.01 }
                      : { ...springConfigs.bouncy, delay: 0.7 }
                  }
                  className="text-fawn px-1 font-semibold"
                  whileHover={
                    prefersReducedMotion
                      ? {}
                      : {
                          scale: 1.1,
                          y: -2,
                          transition: springConfigs.instant,
                        }
                  }
                >
                  Angular
                </motion.span>
                進行專案開發，曾參與多項功能實作與系統前端設計，具備實務開發經驗。
              </motion.p>

              <motion.p
                className="text-outer-space/80 dark:text-apricot/80 mb-6 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.01 }
                    : { ...springConfigs.gentle, delay: 0.6 }
                }
              >
                除了前端，也透過
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0.01 }
                      : { ...springConfigs.snappy, delay: 0.8 }
                  }
                  className="text-fawn px-1 font-semibold"
                  whileHover={
                    prefersReducedMotion
                      ? {}
                      : {
                          scale: 1.1,
                          y: -2,
                          transition: springConfigs.instant,
                        }
                  }
                >
                  side project
                </motion.span>
                接觸後端開發，逐步理解資料處理與 API 設計，並強化對整體架構的理解。
              </motion.p>

              <motion.p
                className="text-outer-space/80 dark:text-apricot/80 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.01 }
                    : { ...springConfigs.gentle, delay: 0.7 }
                }
              >
                開發過程中習慣邊做邊學，對技術更新會有基本的掌握，若遇到能解決問題的新工具，也會評估後嘗試導入。
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={
                prefersReducedMotion ? { duration: 0.01 } : { ...springConfigs.gentle, delay: 0.4 }
              }
              style={{
                y: prefersReducedMotion ? 0 : y,
                perspective: 1000,
              }}
              className="relative flex h-96 items-center justify-center overflow-hidden"
            >
              {/* 脈動背景光暈 */}
              <motion.div
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        scale: [1, 1.3, 1],
                        opacity: [0.15, 0.35, 0.15],
                      }
                }
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="bg-gradient-radial from-apricot/20 via-fawn/10 dark:from-apricot/10 dark:via-fawn/5 absolute h-96 w-96 rounded-full to-transparent"
                style={{ willChange: 'transform, opacity' }}
              />

              {/* 軌道環 */}
              <motion.div
                className="border-apricot/40 dark:border-apricot/20 absolute h-80 w-80 rounded-full border border-dashed"
                animate={prefersReducedMotion ? {} : { rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="border-fawn/30 dark:border-fawn/15 absolute h-64 w-64 rounded-full border border-dotted"
                animate={prefersReducedMotion ? {} : { rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />

              {/* 主要幾何圖形 - 動態變形的多邊形 */}
              <motion.div
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        rotate: 360,
                        scale: [1, 1.15, 0.95, 1],
                      }
                }
                transition={{
                  rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="absolute h-48 w-48"
                style={{ willChange: 'transform' }}
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : {
                        scale: 1.1,
                        rotateZ: 180,
                        transition: springConfigs.bouncy,
                      }
                }
              >
                <motion.div
                  animate={
                    prefersReducedMotion
                      ? {}
                      : {
                          clipPath: [
                            'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                            'polygon(50% 10%, 90% 30%, 90% 70%, 50% 90%, 10% 70%, 10% 30%)',
                            'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                          ],
                        }
                  }
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="from-apricot/30 to-fawn/30 dark:from-apricot/15 dark:to-fawn/15 h-full w-full bg-gradient-to-br shadow-2xl backdrop-blur-sm"
                  style={{ willChange: 'clip-path' }}
                />
              </motion.div>

              {/* 內部螺旋三角形組 */}
              <motion.div
                animate={prefersReducedMotion ? {} : { rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="absolute h-32 w-32"
                style={{ willChange: 'transform' }}
              >
                {[0, 120, 240].map((rotation, index) => (
                  <motion.div
                    key={index}
                    animate={
                      prefersReducedMotion
                        ? {}
                        : {
                            rotate: rotation + 360,
                            scale: [1, 1.3, 1],
                          }
                    }
                    transition={{
                      rotate: {
                        duration: 12 + index * 2,
                        repeat: Infinity,
                        ease: 'linear',
                      },
                      scale: {
                        duration: 2.5 + index * 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                    }}
                    className="absolute top-12 left-12 h-8 w-8"
                    style={{
                      transformOrigin: '4px 4px',
                      willChange: 'transform',
                    }}
                    whileHover={
                      prefersReducedMotion
                        ? {}
                        : {
                            scale: 1.5,
                            transition: springConfigs.bouncy,
                          }
                    }
                  >
                    <div
                      className={`h-full w-full ${(() => {
                        if (index === 0) return 'bg-apricot/60';
                        if (index === 1) return 'bg-fawn/60';
                        return 'from-apricot/40 to-fawn/40 bg-gradient-to-br';
                      })()} dark:opacity-60`}
                      style={{
                        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* 軌道運行的粒子 */}
              <motion.div
                animate={prefersReducedMotion ? {} : { rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="absolute h-72 w-72"
                style={{ willChange: 'transform' }}
              >
                {[0, 60, 120, 180, 240, 300].map((angle, index) => (
                  <motion.div
                    key={index}
                    animate={
                      prefersReducedMotion
                        ? {}
                        : {
                            scale: [0.6, 1.2, 0.6],
                            opacity: [0.4, 1, 0.4],
                          }
                    }
                    transition={{
                      duration: 1.5 + index * 0.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.15,
                    }}
                    className="absolute h-3 w-3 rounded-full"
                    style={{
                      top: '50%',
                      left: '50%',
                      transformOrigin: '6px 6px',
                      transform: `rotate(${angle}deg) translateX(144px) translateY(-6px)`,
                      willChange: 'transform, opacity',
                    }}
                  >
                    <div
                      className={`h-full w-full rounded-full ${index % 2 === 0 ? 'bg-apricot' : 'bg-fawn'} shadow-lg dark:opacity-80`}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* 浮動的幾何裝飾 */}
              <motion.div
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        y: [-12, 12, -12],
                        rotate: [0, 180, 360],
                      }
                }
                transition={{
                  y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                  rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
                }}
                className="bg-apricot/50 dark:bg-apricot/30 absolute top-8 right-8 h-6 w-6"
                style={{
                  clipPath: 'polygon(50% 0%, 0% 50%, 50% 100%, 100% 50%)',
                  willChange: 'transform',
                }}
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : {
                        scale: 1.4,
                        rotate: 90,
                        transition: springConfigs.bouncy,
                      }
                }
              />

              <motion.div
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        y: [12, -12, 12],
                        x: [-6, 6, -6],
                      }
                }
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="bg-fawn/60 dark:bg-fawn/40 absolute bottom-12 left-12 h-4 w-4 rounded-full"
                style={{ willChange: 'transform' }}
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : {
                        scale: 1.5,
                        transition: springConfigs.bouncy,
                      }
                }
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
