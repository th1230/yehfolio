'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

import { springConfigs, useReducedMotion, tapEffects, staggerContainer } from '@/utils/animations';

import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: '首頁', href: '#' },
    { name: '關於', href: '#about' },
    { name: '技能', href: '#skills' },
    { name: '經驗', href: '#experience' },
    { name: '作品', href: '#projects' },
    { name: '聯絡', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 shadow-lg backdrop-blur-md dark:bg-gray-900/90' : 'bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={
        prefersReducedMotion
          ? { duration: 0.01 }
          : {
              ...springConfigs.gentle,
              delay: 0.1,
            }
      }
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div className="flex items-center">
            <motion.a
              href="#"
              onClick={e => {
                e.preventDefault();
                scrollToSection('#');
              }}
              className="text-outer-space dark:text-apricot flex items-center gap-x-2 text-2xl font-bold"
              whileHover={
                prefersReducedMotion
                  ? {}
                  : {
                      scale: 1.05,
                      rotate: 3,
                      transition: springConfigs.snappy,
                    }
              }
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              style={{ willChange: 'transform' }}
            >
              <img
                src="./images/logo.png"
                className="h-8 w-8"
                alt="YehFolio Logo"
                width={32}
                height={32}
                loading="eager"
              />
              YehFolio
            </motion.a>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden items-center space-x-8 md:flex"
            variants={staggerContainer(0.08, 0.2)}
            initial="initial"
            animate="animate"
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={e => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="text-outer-space dark:text-apricot hover:text-sandy-brown relative font-medium transition-colors duration-200"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.01 }
                    : {
                        ...springConfigs.snappy,
                        delay: 0.15 + index * 0.08,
                      }
                }
              >
                <span className="relative inline-block">
                  {item.name}
                  <span className="bg-sandy-brown absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 ease-out hover:w-full" />
                </span>
              </motion.a>
            ))}
          </motion.div>

          {/* Desktop Actions */}
          <div className="hidden items-center space-x-4 md:flex">
            {/* Theme Toggle */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            >
              <ThemeToggle />
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 md:hidden">
            <ThemeToggle />
            <motion.button
              className="flex h-8 w-8 flex-col items-center justify-center space-y-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }
                if (e.key === 'Escape' && isMobileMenuOpen) {
                  setIsMobileMenuOpen(false);
                }
              }}
              aria-label={isMobileMenuOpen ? '關閉選單' : '開啟選單'}
              aria-expanded={isMobileMenuOpen}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="bg-outer-space dark:bg-apricot h-0.5 w-6 transition-all duration-300"
                animate={isMobileMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              />
              <motion.div
                className="bg-outer-space dark:bg-apricot h-0.5 w-6 transition-all duration-300"
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              />
              <motion.div
                className="bg-outer-space dark:bg-apricot h-0.5 w-6 transition-all duration-300"
                animate={isMobileMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              />
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence mode="wait">
          {isMobileMenuOpen && (
            <motion.div
              className="absolute top-full right-0 left-0 overflow-hidden border-t border-gray-200 bg-white shadow-2xl backdrop-blur-lg md:hidden dark:border-gray-700 dark:bg-gray-900/95"
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.01 }
                  : {
                      ...springConfigs.gentle,
                      height: { duration: 0.4 },
                    }
              }
            >
              <motion.div
                className="space-y-2 px-4 py-6"
                variants={staggerContainer(0.05, 0.1)}
                initial="initial"
                animate="animate"
              >
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={e => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        scrollToSection(item.href);
                      }
                    }}
                    className="text-outer-space dark:text-apricot hover:bg-sandy-brown/10 block rounded-lg px-4 py-3 font-medium transition-colors duration-200"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0.01 }
                        : {
                            ...springConfigs.snappy,
                            delay: index * 0.06,
                          }
                    }
                    whileTap={prefersReducedMotion ? {} : tapEffects.shrink}
                  >
                    <span className="flex items-center gap-2">
                      <motion.span
                        className="bg-sandy-brown inline-block h-1.5 w-1.5 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: index * 0.06 + 0.15,
                          ...springConfigs.bouncy,
                        }}
                      />
                      {item.name}
                    </span>
                  </motion.a>
                ))}
                <motion.button
                  className="bg-sandy-brown hover:bg-fawn mt-4 w-full rounded-lg py-3 font-medium text-white shadow-lg transition-all duration-300"
                  onClick={() => scrollToSection('#contact')}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0.01 }
                      : {
                          ...springConfigs.gentle,
                          delay: navItems.length * 0.06 + 0.1,
                        }
                  }
                  whileTap={prefersReducedMotion ? {} : tapEffects.press}
                  whileHover={
                    prefersReducedMotion
                      ? {}
                      : {
                          scale: 1.02,
                          boxShadow: '0 10px 30px rgba(245, 172, 114, 0.4)',
                          transition: springConfigs.snappy,
                        }
                  }
                  style={{ willChange: 'transform' }}
                >
                  開始合作
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
