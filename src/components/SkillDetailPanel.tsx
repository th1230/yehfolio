'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { memo } from 'react';

import { springConfigs, useReducedMotion, scaleIn } from '@/utils/animations';

import type { SkillDetail } from '@/types';

interface SkillDetailPanelProps {
  selectedSkill: SkillDetail | null;
}

const SkillDetailPanel = memo(({ selectedSkill }: SkillDetailPanelProps) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="rounded-2xl bg-white p-4 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800/50">
      <AnimatePresence mode="popLayout" initial={false}>
        {selectedSkill ? (
          <motion.div
            key={selectedSkill.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.15 }}
            className="space-y-4"
          >
            {/* 技能標題 */}
            <div className="mb-4 flex items-center">
              <div className="mr-3 flex h-8 w-8 items-center justify-center">
                <img
                  src={selectedSkill.icon}
                  alt={`${selectedSkill.name} icon`}
                  className="h-full w-full object-contain"
                  width={32}
                  height={32}
                  loading="lazy"
                />
              </div>
              <div>
                <h3 className="text-outer-space dark:text-apricot text-lg font-bold">
                  {selectedSkill.name}
                </h3>
                <p className="text-outer-space/70 dark:text-apricot/70 text-xs">
                  {selectedSkill.category}
                </p>
              </div>
            </div>

            {/* 技能描述 */}
            <div className="space-y-3">
              <p className="text-outer-space/80 dark:text-apricot/80 text-sm leading-relaxed">
                {selectedSkill.description}
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.15 }}
            className="flex flex-col items-center justify-center py-8 text-center"
          >
            <motion.div
              className="mb-3 text-3xl"
              animate={prefersReducedMotion ? {} : { rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              ⭐
            </motion.div>
            <h3 className="text-outer-space dark:text-apricot mb-2 text-lg font-bold">
              選擇技能星星
            </h3>
            <p className="text-outer-space/70 dark:text-apricot/70 text-sm">
              點擊左側的技能星星查看詳細資訊
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

SkillDetailPanel.displayName = 'SkillDetailPanel';

export default SkillDetailPanel;
