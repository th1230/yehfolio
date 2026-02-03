'use client';

import gsap from 'gsap';
import { useState, useEffect, useRef } from 'react';

import { springConfigs, useReducedMotion, tapEffects, staggerContainer } from '@/utils/animations';

import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: prefersReducedMotion ? 0.01 : springConfigs.gentle.duration,
          ease: prefersReducedMotion ? 'none' : springConfigs.gentle.ease,
          delay: 0.1,
        }
      );
    }

    const stagger = staggerContainer(0.08, 0.2);
    navItemRefs.current.forEach((item, index) => {
      if (item) {
        gsap.fromTo(
          item,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: prefersReducedMotion ? 0.01 : springConfigs.snappy.duration,
            ease: prefersReducedMotion ? 'none' : springConfigs.snappy.ease,
            delay: stagger.delayChildren + index * stagger.staggerChildren,
          }
        );
      }
    });
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isMobileMenuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, height: 0, y: -20 },
        {
          opacity: 1,
          height: 'auto',
          y: 0,
          duration: prefersReducedMotion ? 0.01 : 0.4,
          ease: springConfigs.gentle.ease,
        }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        height: 0,
        y: -20,
        duration: prefersReducedMotion ? 0.01 : 0.3,
        ease: springConfigs.gentle.ease,
      });
    }
  }, [isMobileMenuOpen, prefersReducedMotion]);

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

  const handleLogoHover = (isEnter: boolean) => {
    if (!logoRef.current || prefersReducedMotion) return;
    gsap.to(logoRef.current, {
      scale: isEnter ? 1.05 : 1,
      rotation: isEnter ? 3 : 0,
      duration: springConfigs.snappy.duration,
      ease: springConfigs.snappy.ease,
    });
  };

  const handleItemTap = (el: HTMLElement) => {
    if (prefersReducedMotion) return;
    gsap.to(el, {
      scale: tapEffects.shrink.scale,
      duration: 0.1,
      ease: 'power2.out',
      onComplete: () => {
        gsap.to(el, { scale: 1, duration: 0.2 });
      },
    });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 shadow-lg backdrop-blur-md dark:bg-gray-900/90' : 'bg-transparent'
      }`}
      style={{ opacity: 0, willChange: 'transform, opacity' }}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <a
              ref={logoRef}
              href="#"
              onClick={e => {
                e.preventDefault();
                scrollToSection('#');
              }}
              onMouseEnter={() => handleLogoHover(true)}
              onMouseLeave={() => handleLogoHover(false)}
              onMouseDown={e => handleItemTap(e.currentTarget)}
              className="text-outer-space dark:text-apricot flex items-center gap-x-2 text-2xl font-bold"
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
            </a>
          </div>

          <div className="hidden items-center space-x-8 md:flex">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                ref={el => {
                  navItemRefs.current[index] = el;
                }}
                href={item.href}
                onClick={e => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="text-outer-space hover:text-sandy-brown dark:text-apricot relative font-medium transition-colors duration-200"
                style={{ opacity: 0 }}
              >
                <span className="relative inline-block">
                  {item.name}
                  <span className="bg-sandy-brown absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 ease-out hover:w-full" />
                </span>
              </a>
            ))}
          </div>

          <div className="hidden items-center space-x-4 md:flex">
            <ThemeToggle />
          </div>

          <div className="flex items-center space-x-3 md:hidden">
            <ThemeToggle />
            <button
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
            >
              <div
                className="bg-outer-space dark:bg-apricot h-0.5 w-6 transition-all duration-300"
                style={{
                  transform: isMobileMenuOpen ? 'rotate(45deg) translateY(4px)' : 'none',
                }}
              />
              <div
                className="bg-outer-space dark:bg-apricot h-0.5 w-6 transition-all duration-300"
                style={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                }}
              />
              <div
                className="bg-outer-space dark:bg-apricot h-0.5 w-6 transition-all duration-300"
                style={{
                  transform: isMobileMenuOpen ? 'rotate(-45deg) translateY(-4px)' : 'none',
                }}
              />
            </button>
          </div>
        </div>

        <div
          ref={mobileMenuRef}
          className="absolute top-full right-0 left-0 overflow-hidden border-t border-gray-200 bg-white shadow-2xl backdrop-blur-lg md:hidden dark:border-gray-700 dark:bg-gray-900/95"
          style={{ opacity: 0, height: 0 }}
        >
          <div className="space-y-2 px-4 py-6">
            {navItems.map((item, index) => (
              <a
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
                onMouseDown={e => handleItemTap(e.currentTarget)}
                className="text-outer-space hover:bg-sandy-brown/10 dark:text-apricot block rounded-lg px-4 py-3 font-medium transition-colors duration-200"
                style={{
                  animationDelay: `${index * 0.06}s`,
                }}
              >
                <span className="flex items-center gap-2">
                  <span className="bg-sandy-brown inline-block h-1.5 w-1.5 rounded-full" />
                  {item.name}
                </span>
              </a>
            ))}
            <button
              className="bg-sandy-brown hover:bg-fawn mt-4 w-full rounded-lg py-3 font-medium text-white shadow-lg transition-all duration-300"
              onClick={() => scrollToSection('#contact')}
              onMouseDown={e => handleItemTap(e.currentTarget)}
              style={{ willChange: 'transform' }}
            >
              開始合作
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
