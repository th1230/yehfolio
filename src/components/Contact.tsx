'use client';

import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useEffect, useRef, useState } from 'react';

import { useInView } from '@/utils/animations';

import GradientTitle from './GradientTitle';

gsap.registerPlugin(MotionPathPlugin);

interface ContactItem {
  id: string;
  href: string;
  color: string;
  abstractPath: string;
  concretePaths: string[];
  label: string;
  description: string;
}

const contactItems: ContactItem[] = [
  {
    id: 'email',
    href: 'mailto:thomasyeayea@gmail.com',
    color: '#f5ac72',
    abstractPath: 'M 50 15 A 35 35 0 1 1 49.99 15 Z',
    concretePaths: ['M 15 30 L 85 30 L 85 70 L 15 70 Z', 'M 15 30 L 50 52 L 85 30'],
    label: 'Email',
    description: 'thomasyeayea@gmail.com',
  },
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/in/jtunn-yue-yeh',
    color: '#facfad',
    abstractPath:
      'M 28 20 L 72 20 Q 80 20 80 28 L 80 72 Q 80 80 72 80 L 28 80 Q 20 80 20 72 L 20 28 Q 20 20 28 20 Z',
    concretePaths: [
      'M 23 15 L 77 15 Q 85 15 85 23 L 85 77 Q 85 85 77 85 L 23 85 Q 15 85 15 77 L 15 23 Q 15 15 23 15 Z',
      'M 32 28 A 4 4 0 1 1 31.99 28 Z',
      'M 32 42 L 32 68',
      'M 45 68 L 45 52 Q 45 42 58 42 Q 68 42 68 52 L 68 68',
    ],
    label: 'LinkedIn',
    description: 'linkedin.com/in/jtunn-yue-yeh',
  },
  {
    id: 'github',
    href: 'https://github.com/th1230',
    color: '#f8bd7f',
    abstractPath: 'M 50 15 L 85 80 L 15 80 Z',
    concretePaths: [
      'M 50 8 C 28 8 10 26 10 48 C 10 66 21 81 37 86 Q 40 87 40 84 L 40 77 Q 28 80 25 72 Q 23 67 20 66 Q 16 63 20 63 Q 25 64 27 68 Q 32 75 41 71 Q 41.5 68 44 65 Q 34 64 24 46 Q 24 41 29 34 Q 28.5 33 30 22 Q 34 21 40 25 Q 44 24 52 23.5 Q 60 24 64 25 Q 70 21 74 22 Q 75.5 33 75 34 Q 80 41 80 46 Q 70 64 60 65 Q 64 70 64 75 L 64 84 Q 64 87 67 86 C 83 81 94 66 94 48 C 94 26 76 8 50 8 Z',
    ],
    label: 'GitHub',
    description: 'github.com/th1230',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleLineRef = useRef<HTMLDivElement>(null);
  const abstractPathRefs = useRef<Map<string, SVGPathElement>>(new Map());
  const concreteGroupRefs = useRef<Map<string, SVGGElement>>(new Map());
  const tracerRefs = useRef<Map<string, SVGCircleElement>>(new Map());
  const containerRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const tracerTimelines = useRef<Map<string, gsap.core.Tween>>(new Map());

  const [isClient, setIsClient] = useState(false);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isInView || !isClient) return;

    const timelinesRef = tracerTimelines.current;
    const masterTl = gsap.timeline();

    if (titleLineRef.current) {
      masterTl.fromTo(
        titleLineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power3.out' }
      );
    }

    contactItems.forEach((item, index) => {
      const abstractPath = abstractPathRefs.current.get(item.id);
      const tracer = tracerRefs.current.get(item.id);
      const container = containerRefs.current.get(item.id);
      const concreteGroup = concreteGroupRefs.current.get(item.id);

      if (!abstractPath || !tracer || !container) return;

      const pathLength = abstractPath.getTotalLength();
      gsap.set(abstractPath, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });
      gsap.set(tracer, { opacity: 0 });
      gsap.set(container, { opacity: 1 });
      if (concreteGroup) {
        gsap.set(concreteGroup, { opacity: 0 });
      }

      // 设置光球初始位置在路径起点
      const startPoint = abstractPath.getPointAtLength(0);
      gsap.set(tracer, {
        x: startPoint.x,
        y: startPoint.y,
        xPercent: -50,
        yPercent: -50,
      });

      const itemTl = gsap.timeline();

      itemTl.to(abstractPath, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: 'power2.inOut',
      });

      itemTl.to(tracer, { opacity: 1, duration: 0.2 }, 0.5);

      itemTl.to(
        tracer,
        {
          motionPath: {
            path: abstractPath,
            align: abstractPath,
            alignOrigin: [0.5, 0.5],
            start: 0,
            end: 1,
          },
          duration: 1.5,
          ease: 'power2.inOut',
        },
        0.5
      );

      masterTl.add(itemTl, index * 0.4);
    });

    masterTl.call(() => {
      contactItems.forEach(item => {
        const abstractPath = abstractPathRefs.current.get(item.id);
        const tracer = tracerRefs.current.get(item.id);

        if (!abstractPath || !tracer) return;

        const loopTween = gsap.to(tracer, {
          motionPath: {
            path: abstractPath,
            align: abstractPath,
            alignOrigin: [0.5, 0.5],
            start: 0,
            end: 1,
          },
          duration: 3,
          ease: 'none',
          repeat: -1,
        });
        tracerTimelines.current.set(item.id, loopTween);
      });
    });

    return () => {
      masterTl.kill();
      timelinesRef.forEach(tween => tween.kill());
    };
  }, [isInView, isClient]);

  const handleMouseEnter = (id: string) => {
    const item = contactItems.find(c => c.id === id);
    const abstractPath = abstractPathRefs.current.get(id);
    const concreteGroup = concreteGroupRefs.current.get(id);
    const tracer = tracerRefs.current.get(id);
    const container = containerRefs.current.get(id);

    if (!item || !abstractPath || !concreteGroup || !tracer || !container) return;

    const loopTween = tracerTimelines.current.get(id);
    if (loopTween) {
      loopTween.kill();
      tracerTimelines.current.delete(id);
    }
    gsap.killTweensOf(tracer);

    gsap.to(abstractPath, {
      opacity: 0,
      scale: 0.8,
      duration: 0.4,
      ease: 'power2.in',
      transformOrigin: 'center center',
    });

    const concretePaths = concreteGroup.querySelectorAll('path');
    concretePaths.forEach(p => {
      const len = p.getTotalLength();
      gsap.set(p, {
        strokeDasharray: len,
        strokeDashoffset: len,
      });
    });

    gsap.to(concreteGroup, { opacity: 1, duration: 0.1 });

    const pathDrawTl = gsap.timeline({
      onComplete: () => {
        const mainConcretePath = concretePaths[0];
        if (mainConcretePath) {
          const startPoint = mainConcretePath.getPointAtLength(0);
          gsap.set(tracer, {
            x: startPoint.x,
            y: startPoint.y,
            xPercent: -50,
            yPercent: -50,
          });

          const newTween = gsap.to(tracer, {
            motionPath: {
              path: mainConcretePath,
              align: mainConcretePath,
              alignOrigin: [0.5, 0.5],
              start: 0,
              end: 1,
            },
            duration: 2.5,
            ease: 'none',
            repeat: -1,
          });
          tracerTimelines.current.set(`${id}-concrete`, newTween);
        }
      },
    });

    concretePaths.forEach((p, i) => {
      pathDrawTl.to(
        p,
        {
          strokeDashoffset: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        i * 0.1
      );
    });

    gsap.to(container, {
      scale: 1.1,
      duration: 0.4,
      ease: 'back.out(1.5)',
    });
  };

  const handleMouseLeave = (id: string) => {
    const abstractPath = abstractPathRefs.current.get(id);
    const concreteGroup = concreteGroupRefs.current.get(id);
    const tracer = tracerRefs.current.get(id);
    const container = containerRefs.current.get(id);

    if (!abstractPath || !concreteGroup || !tracer || !container) return;

    const concreteTween = tracerTimelines.current.get(`${id}-concrete`);
    if (concreteTween) {
      concreteTween.kill();
      tracerTimelines.current.delete(`${id}-concrete`);
    }
    gsap.killTweensOf(tracer);

    gsap.to(concreteGroup, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    });

    const transitionTl = gsap.timeline({
      onComplete: () => {
        const startPoint = abstractPath.getPointAtLength(0);
        gsap.set(tracer, {
          x: startPoint.x,
          y: startPoint.y,
          xPercent: -50,
          yPercent: -50,
        });

        const loopTween = gsap.to(tracer, {
          motionPath: {
            path: abstractPath,
            align: abstractPath,
            alignOrigin: [0.5, 0.5],
            start: 0,
            end: 1,
          },
          duration: 3,
          ease: 'none',
          repeat: -1,
        });
        tracerTimelines.current.set(id, loopTween);
      },
    });

    transitionTl.to(abstractPath, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
      transformOrigin: 'center center',
    });

    gsap.to(container, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleClick = (id: string) => {
    const item = contactItems.find(c => c.id === id);
    const container = containerRefs.current.get(id);

    if (!item || !container) return;

    const tl = gsap.timeline({
      onComplete: () => {
        window.open(item.href, item.href.startsWith('mailto') ? '_self' : '_blank');
      },
    });

    tl.to(container, { scale: 1.2, duration: 0.12, ease: 'power2.in' })
      .to(container, { scale: 1.05, duration: 0.12, ease: 'power2.out' })
      .to(container, { scale: 1.15, duration: 0.1 })
      .to(container, { scale: 1.1, duration: 0.1 });
  };

  return (
    <section ref={sectionRef} id="contact" className="relative min-h-screen px-4 py-24 md:py-32">
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 flex items-center gap-6">
          <GradientTitle className="text-4xl font-bold md:text-5xl lg:text-6xl">
            聯絡我
          </GradientTitle>
          <div
            ref={titleLineRef}
            className="from-sandy-brown/50 h-px flex-1 origin-left bg-gradient-to-r to-transparent"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        <div className="mb-20 text-center">
          <p className="mx-auto max-w-2xl text-lg text-gray-600 md:text-xl dark:text-gray-300">
            對我的作品感興趣，或想要一起合作？
            <br />
            歡迎透過以下方式與我聯繫，我會盡快回覆您！
          </p>
        </div>

        {isClient && (
          <div className="grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-12">
            {contactItems.map(item => (
              <div key={item.id} className="flex flex-col items-center">
                <div
                  ref={el => {
                    if (el) containerRefs.current.set(item.id, el);
                  }}
                  className="mb-6 flex cursor-pointer items-center justify-center transition-transform"
                  style={{ opacity: 0 }}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={() => handleMouseLeave(item.id)}
                  onClick={() => handleClick(item.id)}
                >
                  <svg
                    viewBox="0 0 100 100"
                    className="h-40 w-40 md:h-44 md:w-44 lg:h-48 lg:w-48"
                    style={{ overflow: 'visible' }}
                  >
                    <path
                      ref={el => {
                        if (el) abstractPathRefs.current.set(item.id, el);
                      }}
                      d={item.abstractPath}
                      fill="none"
                      stroke={item.color}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <g
                      ref={el => {
                        if (el) concreteGroupRefs.current.set(item.id, el);
                      }}
                      style={{ opacity: 0 }}
                    >
                      {item.concretePaths.map((d, i) => (
                        <path
                          key={i}
                          d={d}
                          fill="none"
                          stroke={item.color}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      ))}
                    </g>

                    <circle
                      ref={el => {
                        if (el) tracerRefs.current.set(item.id, el);
                      }}
                      r="5"
                      fill={item.color}
                      style={{
                        filter: `drop-shadow(0 0 6px ${item.color})`,
                        opacity: 0,
                      }}
                    />
                  </svg>
                </div>

                <div className="text-center">
                  <h3
                    className="text-xl font-semibold transition-colors duration-300 md:text-2xl"
                    style={{ color: item.color }}
                  >
                    {item.label}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
