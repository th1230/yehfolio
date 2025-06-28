"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-gray-50 dark:bg-gray-900/30">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 text-outer-space dark:text-apricot"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            前端工程師
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 text-outer-space/80 dark:text-fawn max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            三年開發經驗 • Angular 專家 • 全端開發能力
            <br />
            專注於創造高品質的 Web 應用程式
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <motion.button
              className="px-8 py-3 bg-sandy-brown text-white rounded-lg font-medium cursor-pointer transition-all duration-300"
              whileHover={{ y: -2, backgroundColor: "#f09b5f" }}
              whileTap={{ y: 0 }}
            >
              查看作品
            </motion.button>
            <motion.button
              className="px-8 py-3 border-2 border-outer-space dark:border-apricot text-outer-space dark:text-apricot rounded-lg font-medium cursor-pointer transition-all duration-300"
              whileHover={{ y: -2, borderColor: "#f5ac72" }}
              whileTap={{ y: 0 }}
            >
              聯絡我
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-outer-space/30 dark:border-apricot/30 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-outer-space/50 dark:bg-apricot/50 rounded-full mt-2"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
