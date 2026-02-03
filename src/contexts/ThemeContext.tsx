'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';

// 主題類型：亮色、暗色或自適應
type ThemeMode = 'light' | 'dark' | 'auto';
type ResolvedTheme = 'light' | 'dark';

// 主題上下文的介面定義
interface ThemeContextType {
  themeMode: ThemeMode; // 用戶選擇的模式
  resolvedTheme: ResolvedTheme; // 實際顯示的主題
  currentHour: number; // 當前小時 (0-23)
  setThemeMode: (mode: ThemeMode) => void; // 設定主題模式
  cycleTheme: () => void; // 循環切換主題
}

// 創建主題上下文
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * 根據小時獲取時間相關的主題
 * 6:00 - 18:00 為亮色模式
 * 18:00 - 6:00 為暗色模式
 */
function getTimeBasedTheme(hour: number): ResolvedTheme {
  if (hour >= 6 && hour < 18) {
    return 'light';
  }
  return 'dark';
}

/**
 * 獲取時間相關的背景色調強度 (0-1)
 * 用於 CSS 變數控制漸變
 */
export function getTimeBrightness(hour: number): number {
  // 正午 12 點最亮 (1)，午夜 0 點最暗 (0)
  // 使用餘弦函數創造平滑過渡
  const normalized = Math.cos(((hour - 12) / 12) * Math.PI);
  return (normalized + 1) / 2; // 轉換到 0-1 範圍
}

/**
 * 主題提供者組件
 * 管理整個應用的主題（亮/暗/自適應）
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('light');
  const [currentHour, setCurrentHour] = useState<number>(12);
  const [mounted, setMounted] = useState(false);

  // 計算實際主題
  const resolvedTheme = useMemo<ResolvedTheme>(() => {
    if (themeMode === 'auto') {
      return getTimeBasedTheme(currentHour);
    }
    return themeMode;
  }, [themeMode, currentHour]);

  // 初始化：從 localStorage 載入主題設定，並獲取當前時間
  useEffect(() => {
    setMounted(true);

    // 獲取當前小時
    const now = new Date();
    setCurrentHour(now.getHours());

    // 載入保存的主題模式
    const savedMode = localStorage.getItem('themeMode') as ThemeMode | null;

    if (savedMode && ['light', 'dark', 'auto'].includes(savedMode)) {
      setThemeModeState(savedMode);
    } else {
      // 如果沒有保存的設定，檢查系統偏好
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setThemeModeState(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // 每分鐘更新一次當前時間（用於自適應模式）
  useEffect(() => {
    if (themeMode !== 'auto') return;

    const updateTime = () => {
      const now = new Date();
      setCurrentHour(now.getHours());
    };

    // 立即更新一次
    updateTime();

    // 每分鐘檢查一次
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, [themeMode]);

  // 監聽主題變化，同步更新 DOM 和 localStorage
  useEffect(() => {
    if (!mounted) return;

    const isDark = resolvedTheme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);

    // 保存用戶選擇的模式
    localStorage.setItem('themeMode', themeMode);

    // 設定時間亮度 CSS 變數（用於自適應模式的漸變效果）
    const brightness = getTimeBrightness(currentHour);
    document.documentElement.style.setProperty('--time-brightness', brightness.toString());
    document.documentElement.style.setProperty('--current-hour', currentHour.toString());
  }, [resolvedTheme, themeMode, currentHour, mounted]);

  /**
   * 設定主題模式
   */
  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
  }, []);

  /**
   * 循環切換主題（light → dark → auto → light）
   */
  const cycleTheme = useCallback(() => {
    setThemeModeState(prev => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'auto';
      return 'light';
    });
  }, []);

  const value = useMemo(
    () => ({ themeMode, resolvedTheme, currentHour, setThemeMode, cycleTheme }),
    [themeMode, resolvedTheme, currentHour, setThemeMode, cycleTheme]
  );

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
