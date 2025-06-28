'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "導航",
      links: [
        { name: "首頁", href: "#" },
        { name: "關於", href: "#about" },
        { name: "作品", href: "#projects" },
        { name: "聯絡", href: "#contact" }
      ]
    },
    {
      title: "服務",
      links: [
        { name: "UI/UX 設計", href: "#" },
        { name: "前端開發", href: "#" },
        { name: "品牌設計", href: "#" },
        { name: "顧問諮詢", href: "#" }
      ]
    },
    {
      title: "社群",
      links: [
        { name: "LinkedIn", href: "#" },
        { name: "GitHub", href: "#" },
        { name: "Dribbble", href: "#" },
        { name: "Behance", href: "#" }
      ]
    }
  ];

  return (
    <footer className="bg-outer-space dark:bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4 text-apricot">
              YehFolio
            </h3>
            <p className="text-apricot/80 mb-6 leading-relaxed">
              專注於創造美麗與功能並存的數位體驗，
              將創意轉化為實用的解決方案。
            </p>
            <div className="flex space-x-4">
              {["📧", "📱", "💼", "🎨"].map((icon, index) => (
                <motion.div
                  key={index}
                  className="w-10 h-10 bg-apricot/10 rounded-lg flex items-center justify-center 
                           hover:bg-apricot/20 transition-all duration-300 cursor-pointer"
                  whileHover={{ y: -2, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <span>{icon}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + sectionIndex * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4 text-apricot">
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
                      ease: "easeOut" 
                    }}
                    viewport={{ once: true }}
                  >
                    <motion.a
                      href={link.href}
                      className="text-apricot/70 hover:text-apricot transition-colors duration-300 
                               inline-block"
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

        {/* Newsletter Section */}
        <motion.div
          className="border-t border-apricot/20 pt-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold mb-2 text-apricot">
              訂閱最新消息
            </h4>
            <p className="text-apricot/70 mb-4">
              獲取設計靈感與開發技巧的最新分享
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="輸入您的 Email"
                className="flex-1 px-4 py-2 rounded-l-lg bg-apricot/10 border border-apricot/20 
                         text-apricot placeholder-apricot/50 focus:outline-none focus:ring-2 
                         focus:ring-sandy-brown focus:border-transparent transition-all duration-300"
              />
              <motion.button
                className="px-6 py-2 bg-sandy-brown text-white rounded-r-lg font-medium 
                         hover:bg-fawn transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                訂閱
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-apricot/20 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              className="text-apricot/60 text-sm mb-4 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              © {currentYear} YehFolio. 保留所有權利。
            </motion.p>
            
            <motion.div
              className="flex space-x-6 text-apricot/60 text-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.a
                href="#"
                className="hover:text-apricot transition-colors duration-300"
                whileHover={{ y: -1 }}
              >
                隱私政策
              </motion.a>
              <motion.a
                href="#"
                className="hover:text-apricot transition-colors duration-300"
                whileHover={{ y: -1 }}
              >
                服務條款
              </motion.a>
              <motion.a
                href="#"
                className="hover:text-apricot transition-colors duration-300"
                whileHover={{ y: -1 }}
              >
                Cookie 政策
              </motion.a>
            </motion.div>
          </div>
        </motion.div>

        {/* Back to Top */}
        <motion.button
          className="fixed bottom-8 right-8 w-12 h-12 bg-sandy-brown text-white rounded-full 
                   shadow-lg hover:bg-fawn transition-all duration-300 flex items-center justify-center"
          whileHover={{ y: -3, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <motion.span
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            ↑
          </motion.span>
        </motion.button>
      </div>
    </footer>
  );
}
