"use client";

import { motion } from "framer-motion";
import { memo } from "react";

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
    <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-4 shadow-lg">
      {selectedSkill ? (
        <motion.div
          key={selectedSkill.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {/* 技能標題 */}
          <div className="flex items-center mb-4">
            <div className="text-2xl mr-3">{selectedSkill.icon}</div>
            <div>
              <h3 className="text-lg font-bold text-outer-space dark:text-apricot">
                {selectedSkill.name}
              </h3>
              <p className="text-xs text-outer-space/70 dark:text-apricot/70">
                {selectedSkill.category}
              </p>
            </div>
          </div>

          {/* 技能描述 */}
          <div className="space-y-3">
            <p className="text-sm text-outer-space/80 dark:text-apricot/80 leading-relaxed">
              {selectedSkill.description}
            </p>
            
            {/* 應用情境 */}
            <div className="space-y-1">
              <p className="text-sm font-medium text-outer-space dark:text-apricot">
                👉 應用情境
              </p>
              <p className="text-sm text-outer-space/80 dark:text-apricot/80 ml-4">
                {selectedSkill.applications}
              </p>
            </div>

            {/* 相關連結 */}
            <div className="space-y-1">
              <p className="text-sm font-medium text-outer-space dark:text-apricot">
                🔗 相關應用見
              </p>
              <p className="text-sm text-outer-space/80 dark:text-apricot/80 ml-4">
                {selectedSkill.relatedLinks}
              </p>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="text-3xl mb-3">⭐</div>
          <h3 className="text-lg font-bold mb-2 text-outer-space dark:text-apricot">
            選擇技能星星
          </h3>
          <p className="text-sm text-outer-space/70 dark:text-apricot/70">
            點擊左側的技能星星查看詳細資訊
          </p>
        </div>
      )}
    </div>
  );
});

SkillDetailPanel.displayName = 'SkillDetailPanel';

export default SkillDetailPanel;
