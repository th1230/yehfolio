'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    { name: "UI/UX 設計", level: 90 },
    { name: "React/Next.js", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "Tailwind CSS", level: 95 },
    { name: "Figma", level: 90 },
    { name: "Adobe Creative Suite", level: 85 }
  ];

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
                設計與開發的完美結合
              </h3>
              <p className="text-lg mb-6 text-outer-space/80 dark:text-apricot/80 leading-relaxed">
                我是一位充滿熱忱的設計師與前端開發者，專注於創造直覺且美觀的使用者體驗。
                擁有豐富的網頁設計與開發經驗，致力於將創意轉化為實用的數位解決方案。
              </p>
              <p className="text-lg text-outer-space/80 dark:text-apricot/80 leading-relaxed">
                我相信好的設計不僅要美觀，更要解決實際問題。透過深入了解使用者需求，
                我創造出既有視覺衝擊力又具備優秀可用性的產品。
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <h3 className="text-2xl font-bold mb-6 text-outer-space dark:text-fawn">
                技能專長
              </h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-outer-space dark:text-apricot">
                        {skill.name}
                      </span>
                      <span className="text-sm text-outer-space/70 dark:text-apricot/70">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-sandy-brown h-2 rounded-full"
                        initial={{ width: "0%" }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: "0%" }}
                        transition={{ duration: 1, delay: 0.8 + index * 0.1, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
