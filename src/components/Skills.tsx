"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import SkillDetailPanel from "./SkillDetailPanel";
import SkillStarfield, { SKILL_SELECTED_EVENT } from "./SkillStarCanvas";

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedSkill, setSelectedSkill] = useState<{
    name: string;
    level: number;
    category: string;
    icon: string;
    description: string;
    applications: string;
    relatedLinks: string;
    color: string;
  } | null>(null);

  // 監聽泡泡選擇事件
  useEffect(() => {
    const handleSkillSelected = (event: CustomEvent) => {
      setSelectedSkill(event.detail);
    };

    window.addEventListener(SKILL_SELECTED_EVENT, handleSkillSelected as EventListener);
    
    return () => {
      window.removeEventListener(SKILL_SELECTED_EVENT, handleSkillSelected as EventListener);
    };
  }, []);

  const highlights = [
    {
      title: "完整全端能力",
      description: "從前端到後端、從開發到部署的完整開發流程經驗",
      icon: "🚀",
    },
    {
      title: "專案管理經驗", 
      description: "參與多個團體專案，具備敏捷開發與協作經驗",
      icon: "📋",
    },
    {
      title: "SEO 與效能優化",
      description: "Lighthouse 95% 分數，Google Search Console 優化經驗",
      icon: "⚡",
    },
    {
      title: "新技術學習能力",
      description: "持續學習新技術，快速適應不同技術棧",
      icon: "📚",
    },
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-gray-50 dark:bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-outer-space dark:text-apricot">
            技術能力
          </h2>
          <p className="text-xl text-center mb-16 text-outer-space/80 dark:text-apricot/80 max-w-2xl mx-auto">
            點擊泡泡查看技術詳情，泡泡大小代表熟練程度
          </p>

          {/* 亮點展示 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800/50 rounded-xl p-6 shadow-lg text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{
                  duration: 0.6,
                  delay: 0.1 + index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{ y: -5 }}
              >
                <div className="text-3xl mb-3">{highlight.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-outer-space dark:text-apricot">
                  {highlight.title}
                </h3>
                <p className="text-sm text-outer-space/70 dark:text-apricot/70">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* 技能泡泡區域 */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Canvas 泡泡容器 */}
            <div className="lg:col-span-2">
              <SkillStarfield />
            </div>

            {/* 技能詳情面板 */}
            <div className="lg:col-span-1">
              <SkillDetailPanel selectedSkill={selectedSkill} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
