'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        isScrolled
          ? 'bg-white/90 shadow-lg backdrop-blur-md dark:bg-gray-900/90'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#');
              }}
              className="text-outer-space dark:text-apricot flex items-center gap-x-2 text-2xl font-bold"
              whileHover={{ rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="./images/logo.png"
                className="h-8"
                alt="YehFolio Logo"
              />
              YehFolio
            </motion.a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="text-outer-space dark:text-apricot hover:text-sandy-brown relative font-medium transition-colors duration-300"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.1 + index * 0.1,
                  ease: 'easeOut',
                }}
                whileHover={{ y: -2 }}
              >
                {item.name}
                <motion.div
                  className="bg-sandy-brown absolute bottom-0 left-0 h-0.5 w-full origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

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
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="bg-outer-space dark:bg-apricot h-0.5 w-6 transition-all duration-300"
                animate={
                  isMobileMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }
                }
              />
              <motion.div
                className="bg-outer-space dark:bg-apricot h-0.5 w-6 transition-all duration-300"
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              />
              <motion.div
                className="bg-outer-space dark:bg-apricot h-0.5 w-6 transition-all duration-300"
                animate={
                  isMobileMenuOpen
                    ? { rotate: -45, y: -4 }
                    : { rotate: 0, y: 0 }
                }
              />
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="absolute top-full right-0 left-0 border-t border-gray-200 bg-white shadow-lg md:hidden dark:border-gray-700 dark:bg-gray-900"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className="space-y-4 px-4 py-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                    className="text-outer-space dark:text-apricot hover:text-sandy-brown block py-2 font-medium transition-colors duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      ease: 'easeOut',
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                  </motion.a>
                ))}
                <motion.button
                  className="bg-sandy-brown hover:bg-fawn mt-4 w-full rounded-lg py-3 font-medium text-white transition-all duration-300"
                  onClick={() => scrollToSection('#contact')}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4, ease: 'easeOut' }}
                  whileTap={{ scale: 0.95 }}
                >
                  開始合作
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
