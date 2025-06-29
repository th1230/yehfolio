"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useMemo, useState, useEffect } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa6";

// 創建一個簡單的偽隨機數生成器，確保服務器端和客戶端一致
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 預先生成藝術元素的位置和屬性
  const artElements = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: seededRandom(i * 1.1) * 80 + 10,
      top: seededRandom(i * 1.2) * 70 + 15,
      size: seededRandom(i * 1.3) * 60 + 40,
      rotation: seededRandom(i * 1.4) * 360,
      duration: 6 + seededRandom(i * 1.5) * 8,
      delay: seededRandom(i * 1.6) * 4,
      type: ['morphing', 'spiral', 'wave', 'bloom'][Math.floor(seededRandom(i * 1.7) * 4)],
      color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'][Math.floor(seededRandom(i * 1.8) * 6)],
    })), []
  );

  const particles = useMemo(() => 
    Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: seededRandom(i * 2.1) * 100,
      y: seededRandom(i * 2.2) * 100,
      size: seededRandom(i * 2.3) * 6 + 2,
      duration: 3 + seededRandom(i * 2.4) * 8,
      delay: seededRandom(i * 2.5) * 6,
      opacity: seededRandom(i * 2.6) * 0.8 + 0.2,
      color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#8b5cf6', '#f59e0b', '#ef4444', '#10b981'][Math.floor(seededRandom(i * 2.7) * 7)],
      moveX: (seededRandom(i * 2.8) - 0.5) * 40,
      moveY: (seededRandom(i * 2.9) - 0.5) * 40,
    })), []
  );

  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      value: "thomasyeayea@gmail.com",
      link: "mailto:thomasyeayea@gmail.com",
    },
    {
      icon: <FaLinkedin className="text-xl" />,
      title: "LinkedIn",
      value: "LinkedIn Profile",
      link: "https://www.linkedin.com/in/jtunn-yue-yeh",
    },
    {
      icon: <FaGithub className="text-xl" />,
      title: "GitHub",
      value: "GitHub Profile",
      link: "https://github.com/th1230",
    },
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
                    target={info.link.startsWith("http") ? "_blank" : undefined}
                    className="flex items-center space-x-4 p-4 rounded-lg bg-white dark:bg-gray-800/50 
                             shadow-md hover:shadow-lg transition-all duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{
                      duration: 0.6,
                      delay: 0.4 + index * 0.1,
                      ease: "easeOut",
                    }}
                    whileHover={{ y: -2 }}
                  >
                    <span className="text-2xl flex items-center justify-center">
                      {typeof info.icon === "string" ? info.icon : info.icon}
                    </span>
                    <div>
                      <h4 className="font-medium text-outer-space dark:text-apricot">
                        {info.title}
                      </h4>
                      <p
                        className="text-outer-space/80 dark:text-apricot/80 group-hover:text-sandy-brown 
                                   transition-colors duration-300"
                      >
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* 創意互動藝術區塊 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl"
              style={{ 
                background: 'radial-gradient(ellipse at center, #2a1b4f 0%, #1a0b2e 50%, #0d0418 100%)',
                boxShadow: '0 20px 40px rgba(106, 17, 203, 0.3), 0 0 60px rgba(139, 69, 19, 0.2), inset 0 0 40px rgba(255, 255, 255, 0.05)',
                transform: 'perspective(1000px) rotateX(2deg)',
              }}
            >
              {!isClient ? (
                // 服務器端和初始客戶端渲染時顯示的靜態背景
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white/30 text-2xl">載入中...</div>
                </div>
              ) : (
                <>
                  {/* 動態波浪背景 */}
                  <div className="absolute inset-0">
                    <svg className="w-full h-full" viewBox="0 0 400 400">
                      <defs>
                        <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ff6b6b" stopOpacity="0.4" />
                          <stop offset="50%" stopColor="#4ecdc4" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#45b7d1" stopOpacity="0.1" />
                        </linearGradient>
                        <linearGradient id="wave2" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
                          <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
                        </linearGradient>
                        <linearGradient id="wave3" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1" />
                        </linearGradient>
                      </defs>
                      
                      {/* 多層流動的波浪 */}
                      <path
                        d="M0,200 Q100,120 200,200 T400,200 L400,400 L0,400 Z"
                        fill="url(#wave1)"
                        className="animate-pulse"
                        style={{ 
                          animationDuration: '4s',
                          transform: 'translateZ(10px)',
                        }}
                      />
                      <path
                        d="M0,250 Q150,180 300,250 T600,250 L600,400 L0,400 Z"
                        fill="url(#wave2)"
                        className="animate-pulse"
                        style={{ 
                          animationDuration: '6s', 
                          animationDelay: '1s',
                          transform: 'translateZ(20px)',
                        }}
                      />
                      <path
                        d="M0,300 Q200,220 400,300 T800,300 L800,400 L0,400 Z"
                        fill="url(#wave3)"
                        className="animate-pulse"
                        style={{ 
                          animationDuration: '8s', 
                          animationDelay: '2s',
                          transform: 'translateZ(5px)',
                        }}
                      />
                    </svg>
                  </div>
                  {/* 動態藝術元素 */}
                  <div className="absolute inset-0">
                    {artElements.map((element) => (
                      <div
                        key={element.id}
                        className="absolute"
                        style={{
                          left: `${element.left}%`,
                          top: `${element.top}%`,
                          width: `${element.size}px`,
                          height: `${element.size}px`,
                          animation: `spin ${element.duration}s linear infinite`,
                          animationDelay: `${element.delay}s`,
                        }}
                      >
                        {element.type === 'morphing' && (
                          <div
                            className="w-full h-full rounded-full animate-bounce"
                            style={{
                              background: `radial-gradient(circle, ${element.color}80, ${element.color}20)`,
                              transform: 'scale(0.8)',
                              animationDuration: `${element.duration * 0.7}s`,
                            }}
                          />
                        )}
                        
                        {element.type === 'spiral' && (
                          <div className="w-full h-full relative">
                            <div
                              className="absolute inset-0 rounded-full"
                              style={{
                                background: `conic-gradient(from 0deg, ${element.color}00, ${element.color}ff, ${element.color}00)`,
                                animation: `spin ${element.duration * 0.5}s linear infinite reverse`,
                              }}
                            />
                          </div>
                        )}
                        
                        {element.type === 'wave' && (
                          <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle
                              cx="50"
                              cy="50"
                              r="20"
                              fill="none"
                              stroke={element.color}
                              strokeWidth="3"
                              className="animate-ping"
                              style={{
                                animationDuration: `${element.duration}s`,
                              }}
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="35"
                              fill="none"
                              stroke={`${element.color}60`}
                              strokeWidth="2"
                              className="animate-ping"
                              style={{
                                animationDuration: `${element.duration * 1.5}s`,
                                animationDelay: '0.5s',
                              }}
                            />
                          </svg>
                        )}
                        
                        {element.type === 'bloom' && (
                          <div className="w-full h-full relative">
                            {Array.from({ length: 6 }, (_, i) => (
                              <div
                                key={i}
                                className="absolute w-2 h-6 rounded-full animate-pulse"
                                style={{
                                  background: element.color,
                                  left: '50%',
                                  top: '50%',
                                  transformOrigin: '1px 24px',
                                  transform: `rotate(${i * 60}deg) translateX(-1px)`,
                                  animationDelay: `${i * 0.2}s`,
                                  animationDuration: `${element.duration}s`,
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* 漂浮粒子 */}
                  <div className="absolute inset-0">
                    {particles.map((particle) => (
                      <div
                        key={particle.id}
                        className="absolute rounded-full animate-bounce"
                        style={{
                          left: `${particle.x}%`,
                          top: `${particle.y}%`,
                          width: `${particle.size}px`,
                          height: `${particle.size}px`,
                          background: `radial-gradient(circle, ${particle.color}dd, ${particle.color}66, ${particle.color}22)`,
                          opacity: particle.opacity,
                          animationDelay: `${particle.delay}s`,
                          animationDuration: `${particle.duration}s`,
                          boxShadow: `0 0 ${particle.size * 2}px ${particle.color}66`,
                          transform: `translate(${particle.moveX}px, ${particle.moveY}px) perspective(500px) rotateX(${particle.moveX * 0.5}deg)`,
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* 中央發光圓形 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* 外層光暈 */}
                    <div
                      className="w-48 h-48 rounded-full animate-spin"
                      style={{
                        background: 'conic-gradient(from 0deg, #ff6b6b, #4ecdc4, #45b7d1, #8b5cf6, #f59e0b, #ef4444, #ff6b6b)',
                        animationDuration: '12s',
                        filter: 'blur(8px)',
                        opacity: 0.4,
                        transform: 'perspective(800px) rotateX(15deg)',
                      }}
                    />
                    {/* 中層彩虹環 */}
                    <div
                      className="absolute w-36 h-36 rounded-full animate-spin"
                      style={{
                        background: 'conic-gradient(from 180deg, #8b5cf6, #06b6d4, #10b981, #f59e0b, #ef4444, #ec4899, #8b5cf6)',
                        animationDuration: '8s',
                        animationDirection: 'reverse',
                        filter: 'blur(2px)',
                        opacity: 0.7,
                        transform: 'perspective(600px) rotateX(10deg) rotateY(5deg)',
                      }}
                    />
                    {/* 內層核心 */}
                    <div
                      className="absolute w-24 h-24 rounded-full animate-pulse"
                      style={{
                        background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(139,92,246,0.6) 40%, rgba(59,130,246,0.3) 70%, rgba(255,255,255,0.1) 100%)',
                        animationDuration: '3s',
                        boxShadow: '0 0 30px rgba(255,255,255,0.5), inset 0 0 20px rgba(139,92,246,0.3)',
                        transform: 'perspective(400px) rotateX(5deg)',
                      }}
                    />
                    {/* 中心光點 */}
                    <div
                      className="absolute w-8 h-8 rounded-full animate-ping"
                      style={{
                        background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)',
                        animationDuration: '2s',
                        boxShadow: '0 0 15px rgba(255,255,255,0.8)',
                      }}
                    />
                  </div>
                  
                  {/* 微妙的網格裝飾 */}
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: '30px 30px',
                      animation: 'pulse 8s ease-in-out infinite',
                      transform: 'perspective(1000px) rotateX(1deg)',
                    }}
                  />
                </>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
