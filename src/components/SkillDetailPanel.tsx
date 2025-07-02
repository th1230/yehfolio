'use client';

import { motion } from 'framer-motion';
import { memo } from 'react';

type SkillDetail = {
  name: string;
  level: number;
  category: string;
  icon: string;
  description: string;
  applications: string;
  relatedLinks: string;
  color: string;
} | null;

interface SkillDetailPanelProps {
  selectedSkill: SkillDetail;
}

const SkillDetailPanel = memo(({ selectedSkill }: SkillDetailPanelProps) => {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800/50">
      {selectedSkill ? (
        <motion.div
          key={selectedSkill.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {/* 技能標題 */}
          <div className="mb-4 flex items-center">
            <div className="mr-3 flex h-8 w-8 items-center justify-center">
              <img
                src={selectedSkill.icon}
                alt={selectedSkill.name}
                className="h-full w-full object-contain"
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
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="mb-3 text-3xl">⭐</div>
          <h3 className="text-outer-space dark:text-apricot mb-2 text-lg font-bold">
            選擇技能星星
          </h3>
          <p className="text-outer-space/70 dark:text-apricot/70 text-sm">
            點擊左側的技能星星查看詳細資訊
          </p>
        </div>
      )}
    </div>
  );
});

SkillDetailPanel.displayName = 'SkillDetailPanel';

export default SkillDetailPanel;
