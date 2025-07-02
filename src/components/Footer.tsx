'use client';

import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub } from 'react-icons/fa6';

export default function Footer() {
  const currentYear = new Date().getFullYear();

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

  return (
    <footer className="bg-outer-space py-16 text-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <h3 className="dark:text-apricot mb-4 text-2xl font-bold text-white">
              YehFolio
            </h3>
            <p className="dark:text-apricot mb-6 leading-relaxed text-white">
              專注於創造美麗與功能並存的數位體驗，將創意轉化為實用的解決方案。
            </p>
          </motion.div>

          {/* Links Sections */}
          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2 + sectionIndex * 0.1,
                ease: 'easeOut',
              }}
              viewport={{ once: true }}
            >
              <h4 className="text-apricot mb-4 text-lg font-semibold">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.4 + sectionIndex * 0.1 + linkIndex * 0.05,
                      ease: 'easeOut',
                    }}
                    viewport={{ once: true }}
                  >
                    <motion.a
                      href={link.href}
                      className="dark:text-apricot/70 hover:text-apricot inline-block text-white transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          className="border-apricot/20 border-t pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center justify-between md:flex-row">
            <motion.p
              className="dark:text-apricot mb-4 text-sm text-white md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              © {currentYear} YehFolio. 保留所有權利。
            </motion.p>
          </div>
        </motion.div>

        {/* Back to Top */}
        <motion.button
          className="bg-sandy-brown hover:bg-fawn fixed right-8 bottom-8 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-white shadow-lg transition-all duration-300"
          whileHover={{ y: -3, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 1.2, ease: 'easeOut' }}
          viewport={{ once: true }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <motion.span
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↑
          </motion.span>
        </motion.button>
      </div>
    </footer>
  );
}
