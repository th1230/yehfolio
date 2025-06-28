'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 cursor-pointer dark:border-gray-600 hover:shadow-xl transition-all duration-300"
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      aria-label="切換主題"
    >
      <motion.div
        className="flex items-center justify-center"
        animate={{ 
          rotate: theme === 'dark' ? 180 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          duration: 0.6
        }}
      >
        {theme === 'light' ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-yellow-500"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="m12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-400"
          >
            <path d="m12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313-12.454z" />
          </svg>
        )}
      </motion.div>
    </motion.button>
  );
}
