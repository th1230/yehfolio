'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';

// 主題類型：亮色或暗色
type Theme = 'light' | 'dark';

// 主題上下文的介面定義
interface ThemeContextType {
  theme: Theme; // 當前主題
  toggleTheme: () => void; // 切換主題函數
}

// 創建主題上下文
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * 主題提供者組件
 * 管理整個應用的主題（亮/暗）和季節狀態
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  // 初始化：從 localStorage 載入主題和季節設定
  useEffect(() => {
    // 檢查是否使用深色模式
    const isDark =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

    setTheme(isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  // 監聽主題變化，同步更新 DOM 和 localStorage
  useEffect(() => {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);

    // 根據用戶選擇保存到 localStorage
    localStorage.theme = theme;
  }, [theme]);

  /**
   * 切換主題（亮色 ↔ 暗色）
   */
  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * 使用主題的 Hook
 * @returns 主題上下文物件
 * @throws 如果在 ThemeProvider 外使用會拋出錯誤
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme 必須在 ThemeProvider 內使用');
  }
  return context;
}
