'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import SkillDetailPanel from './SkillDetailPanel';
import SkillStarfield, { SKILL_SELECTED_EVENT } from './SkillStarCanvas';

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
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

    window.addEventListener(
      SKILL_SELECTED_EVENT,
      handleSkillSelected as EventListener,
    );

    return () => {
      window.removeEventListener(
        SKILL_SELECTED_EVENT,
        handleSkillSelected as EventListener,
      );
    };
  }, []);

  return (
    <section id="skills" className="bg-gray-50 px-4 py-20 dark:bg-gray-900/30">
      <div className="mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-outer-space dark:text-apricot mb-8 text-center text-4xl font-bold md:text-5xl">
            技術能力
          </h2>
          <p className="text-outer-space/80 dark:text-apricot/80 mx-auto mb-16 max-w-2xl text-center text-xl">
            探索我的技術星空，點擊任意技能星星了解更多詳情。
          </p>

          {/* 技能星星區域 */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Canvas 星星容器 */}
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
