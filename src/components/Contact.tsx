'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 處理表單提交
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      value: "hello@example.com",
      link: "mailto:hello@example.com"
    },
    {
      icon: "📱",
      title: "電話",
      value: "+886 912 345 678",
      link: "tel:+886912345678"
    },
    {
      icon: "📍",
      title: "地點",
      value: "台北市，台灣",
      link: "#"
    }
  ];

  const socialLinks = [
    { name: "LinkedIn", url: "#", icon: "🔗" },
    { name: "GitHub", url: "#", icon: "💻" },
    { name: "Dribbble", url: "#", icon: "🎨" },
    { name: "Behance", url: "#", icon: "🎭" }
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-gray-50 dark:bg-gray-900/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-outer-space dark:text-apricot">
            聯絡我
          </h2>
          <p className="text-xl text-center mb-16 text-outer-space/80 dark:text-apricot/80 max-w-2xl mx-auto">
            有想法想要實現？讓我們一起創造出色的數位體驗！
          </p>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* 聯絡資訊 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <h3 className="text-2xl font-bold mb-8 text-outer-space dark:text-fawn">
                聯絡資訊
              </h3>
              
              <div className="space-y-6 mb-12">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.title}
                    href={info.link}
                    className="flex items-center space-x-4 p-4 rounded-lg bg-white dark:bg-gray-800/50 
                             shadow-md hover:shadow-lg transition-all duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1, ease: "easeOut" }}
                    whileHover={{ y: -2 }}
                  >
                    <span className="text-2xl">{info.icon}</span>
                    <div>
                      <h4 className="font-medium text-outer-space dark:text-apricot">
                        {info.title}
                      </h4>
                      <p className="text-outer-space/80 dark:text-apricot/80 group-hover:text-sandy-brown 
                                   transition-colors duration-300">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* 社群媒體 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
              >
                <h4 className="text-lg font-medium mb-4 text-outer-space dark:text-fawn">
                  社群媒體
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      className="w-12 h-12 bg-white dark:bg-gray-800/50 rounded-lg flex items-center 
                               justify-center shadow-md hover:shadow-lg transition-all duration-300"
                      whileHover={{ y: -3, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                      transition={{ duration: 0.4, delay: 1 + index * 0.1, ease: "easeOut" }}
                    >
                      <span className="text-lg">{social.icon}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* 聯絡表單 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                  >
                    <label htmlFor="name" className="block text-sm font-medium mb-2 
                                                  text-outer-space dark:text-apricot">
                      姓名
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                               bg-white dark:bg-gray-800/50 text-outer-space dark:text-apricot
                               focus:outline-none focus:ring-2 focus:ring-sandy-brown focus:border-transparent
                               transition-all duration-300"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                  >
                    <label htmlFor="email" className="block text-sm font-medium mb-2 
                                                   text-outer-space dark:text-apricot">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                               bg-white dark:bg-gray-800/50 text-outer-space dark:text-apricot
                               focus:outline-none focus:ring-2 focus:ring-sandy-brown focus:border-transparent
                               transition-all duration-300"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                >
                  <label htmlFor="subject" className="block text-sm font-medium mb-2 
                                                   text-outer-space dark:text-apricot">
                    主題
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                             bg-white dark:bg-gray-800/50 text-outer-space dark:text-apricot
                             focus:outline-none focus:ring-2 focus:ring-sandy-brown focus:border-transparent
                             transition-all duration-300"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
                >
                  <label htmlFor="message" className="block text-sm font-medium mb-2 
                                                    text-outer-space dark:text-apricot">
                    訊息
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                             bg-white dark:bg-gray-800/50 text-outer-space dark:text-apricot
                             focus:outline-none focus:ring-2 focus:ring-sandy-brown focus:border-transparent
                             transition-all duration-300 resize-none"
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  className="w-full py-3 bg-sandy-brown text-white rounded-lg font-medium 
                           transition-all duration-300 hover:bg-fawn"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
                >
                  發送訊息
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
