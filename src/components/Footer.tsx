'use client';

import gsap from 'gsap';
import { useRef, useEffect } from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa6';

import { useInView } from '@/utils/animations';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const containerRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const linksRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const backToTopRef = useRef<HTMLButtonElement>(null);

  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const footerLinks = [
    {
      title: '導航',
      links: [
        { name: '首頁', href: '#' },
        { name: '關於', href: '#about' },
        { name: '作品', href: '#projects' },
        { name: '聯絡', href: '#contact' },
      ],
    },
    {
      title: '社群',
      links: [
        {
          name: 'LinkedIn',
          href: 'https://www.linkedin.com/in/jtunn-yue-yeh',
          icon: FaLinkedin,
        },
        { name: 'GitHub', href: 'https://github.com/th1230', icon: FaGithub },
      ],
    },
  ];

  useEffect(() => {
    if (!isInView) return;

    if (brandRef.current) {
      gsap.fromTo(
        brandRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }

    linksRefs.current.forEach((el, sectionIndex) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, delay: 0.2 + sectionIndex * 0.1, ease: 'power2.out' }
        );

        const links = el.querySelectorAll('li');
        links.forEach((link, linkIndex) => {
          gsap.fromTo(
            link,
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.4,
              delay: 0.4 + sectionIndex * 0.1 + linkIndex * 0.05,
              ease: 'power2.out',
            }
          );
        });
      }
    });

    if (bottomRef.current) {
      gsap.fromTo(
        bottomRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 0.8, ease: 'power2.out' }
      );
    }

    if (backToTopRef.current) {
      gsap.fromTo(
        backToTopRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.4, delay: 1.2, ease: 'power2.out' }
      );

      gsap.to(backToTopRef.current.querySelector('span'), {
        y: 2,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }
  }, [isInView]);

  const handleLinkHover = (el: HTMLAnchorElement, isEnter: boolean) => {
    gsap.to(el, {
      x: isEnter ? 5 : 0,
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  const handleBackToTopHover = (isEnter: boolean) => {
    if (!backToTopRef.current) return;
    gsap.to(backToTopRef.current, {
      y: isEnter ? -3 : 0,
      scale: isEnter ? 1.1 : 1,
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  return (
    <footer className="bg-outer-space relative z-10 py-16 text-white dark:bg-gray-900">
      <div ref={containerRef} className="mx-auto max-w-7xl px-4">
        <div className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div ref={brandRef} className="lg:col-span-2" style={{ opacity: 0 }}>
            <h3 className="dark:text-apricot mb-4 text-2xl font-bold text-white">YehFolio</h3>
            <p className="dark:text-apricot mb-6 leading-relaxed text-white">
              打造兼具美感與實用性的數位體驗，把創意做成真正能用的東西。
            </p>
          </div>

          {footerLinks.map((section, sectionIndex) => (
            <div
              key={section.title}
              ref={el => {
                linksRefs.current[sectionIndex] = el;
              }}
              style={{ opacity: 0 }}
            >
              <h4 className="text-apricot mb-4 text-lg font-semibold">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map(link => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="dark:text-apricot/70 hover:text-apricot inline-block text-white transition-colors duration-300"
                      onMouseEnter={e => handleLinkHover(e.currentTarget, true)}
                      onMouseLeave={e => handleLinkHover(e.currentTarget, false)}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div ref={bottomRef} className="border-apricot/20 border-t pt-8" style={{ opacity: 0 }}>
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="dark:text-apricot mb-4 text-sm text-white md:mb-0">
              © {currentYear} YehFolio. 保留所有權利。
            </p>
          </div>
        </div>

        <button
          ref={backToTopRef}
          className="bg-sandy-brown hover:bg-fawn fixed right-8 bottom-8 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-white shadow-lg transition-all duration-300"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onMouseEnter={() => handleBackToTopHover(true)}
          onMouseLeave={() => handleBackToTopHover(false)}
          onMouseDown={e => {
            gsap.to(e.currentTarget, { scale: 0.9, duration: 0.1 });
          }}
          onMouseUp={e => {
            gsap.to(e.currentTarget, { scale: 1.1, duration: 0.2 });
          }}
          style={{ opacity: 0 }}
        >
          <span>↑</span>
        </button>
      </div>
    </footer>
  );
}
