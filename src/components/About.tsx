"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 px-4 bg-gray-50 dark:bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-outer-space dark:text-apricot">
            關於我
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <h3 className="text-2xl font-bold mb-6 text-outer-space dark:text-fawn">
                前端工程師
              </h3>
              <p className="text-lg mb-6 text-outer-space/80 dark:text-apricot/80 leading-relaxed">
                淡江大學畢業，目前專精於前端開發，主要使用 Angular 進行專案開發。
                具備從需求分析到產品上線的完整開發流程經驗。
              </p>
              <p className="text-lg mb-6 text-outer-space/80 dark:text-apricot/80 leading-relaxed">
                除了前端技術外，也在學習後端開發，希望能更完整地理解整個系統架構。
                持續透過實作專案來驗證和應用新學到的技術。
              </p>
              <p className="text-lg text-outer-space/80 dark:text-apricot/80 leading-relaxed">
                對於新技術保持好奇心，相信每個專案都是學習成長的機會。
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="relative h-96 flex items-center justify-center overflow-hidden"
            >
              {/* 脈動背景光暈 */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute w-96 h-96 rounded-full bg-gradient-radial from-apricot/20 via-fawn/10 to-transparent dark:from-apricot/10 dark:via-fawn/5"
              ></motion.div>

              {/* 軌道環 */}
              <div className="absolute w-80 h-80 rounded-full border border-dashed border-apricot/40 dark:border-apricot/20"></div>
              <div className="absolute w-64 h-64 rounded-full border border-dotted border-fawn/30 dark:border-fawn/15"></div>
              
              {/* 主要幾何圖形 - 動態變形的多邊形 */}
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 0.9, 1]
                }}
                transition={{ 
                  rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                  scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute w-48 h-48"
              >
                <motion.div 
                  animate={{
                    clipPath: [
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                      "polygon(50% 10%, 90% 30%, 90% 70%, 50% 90%, 10% 70%, 10% 30%)",
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
                    ]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full bg-gradient-to-br from-apricot/30 to-fawn/30 dark:from-apricot/15 dark:to-fawn/15 backdrop-blur-sm shadow-lg"
                ></motion.div>
              </motion.div>

              {/* 內部螺旋三角形組 */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-32 h-32"
              >
                {[0, 120, 240].map((rotation, index) => (
                  <motion.div
                    key={index}
                    animate={{ 
                      rotate: rotation + 360,
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                      scale: { duration: 3 + index, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute w-8 h-8 top-12 left-12"
                    style={{
                      transformOrigin: "4px 4px"
                    }}
                  >
                    <div 
                      className={`w-full h-full ${index === 0 ? 'bg-apricot/60' : index === 1 ? 'bg-fawn/60' : 'bg-gradient-to-br from-apricot/40 to-fawn/40'} dark:opacity-60`}
                      style={{
                        clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)"
                      }}
                    ></div>
                  </motion.div>
                ))}
              </motion.div>

              {/* 軌道運行的粒子 */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute w-72 h-72"
              >
                {[0, 60, 120, 180, 240, 300].map((angle, index) => (
                  <motion.div
                    key={index}
                    animate={{
                      scale: [0.5, 1, 0.5],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                      duration: 2 + index * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2
                    }}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      top: "50%",
                      left: "50%",
                      transformOrigin: "6px 6px",
                      transform: `rotate(${angle}deg) translateX(144px) translateY(-6px)`
                    }}
                  >
                    <div className={`w-full h-full rounded-full ${index % 2 === 0 ? 'bg-apricot' : 'bg-fawn'} dark:opacity-80 shadow-lg`}></div>
                  </motion.div>
                ))}
              </motion.div>

              {/* 浮動的幾何裝飾 */}
              <motion.div
                animate={{ 
                  y: [-10, 10, -10],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 18, repeat: Infinity, ease: "linear" }
                }}
                className="absolute top-8 right-8 w-6 h-6 bg-apricot/50 dark:bg-apricot/30"
                style={{
                  clipPath: "polygon(50% 0%, 0% 50%, 50% 100%, 100% 50%)"
                }}
              ></motion.div>

              <motion.div
                animate={{ 
                  y: [10, -10, 10],
                  x: [-5, 5, -5]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute bottom-12 left-12 w-4 h-4 bg-fawn/60 dark:bg-fawn/40 rounded-full"
              ></motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
