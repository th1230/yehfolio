'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FaArrowRight, FaChevronRight, FaExternalLinkAlt } from 'react-icons/fa';

import { PROJECTS, type ProjectRecord } from '@/data/portfolio';

import type { CSSProperties } from 'react';

function SignalTitle({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<number | null>(null);

  const activate = useCallback(() => {
    const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_/#$';
    let frame = 0;

    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      frame += 1;
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === '_' || char === ' ') {
              return char;
            }

            return index < frame ? char : glyphs[(index + frame) % glyphs.length];
          })
          .join('')
      );

      if (frame >= text.length + 4 && intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
        setDisplayText(text);
      }
    }, 24);
  }, [text]);

  useEffect(() => {
    setDisplayText(text);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [text]);

  return (
    <span onFocus={activate} onMouseEnter={activate}>
      {displayText}
    </span>
  );
}

function ProjectRouteRow({
  project,
  isActive,
  onSelect,
}: {
  project: ProjectRecord;
  isActive: boolean;
  onSelect: () => void;
}) {
  const routeSegments = useMemo(
    () => Array.from({ length: 5 }, (_, index) => (index + project.title.length) % 4),
    [project.title.length]
  );
  const commandLabels = ['SCAN', 'LOCK', 'OPEN'];

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group/project-row relative grid w-full overflow-hidden border-b border-white/10 px-2 py-5 text-left transition-colors md:grid-cols-[minmax(0,1.15fr)_minmax(180px,0.58fr)_8rem_8.5rem] md:items-center ${
        isActive ? 'bg-cyber/8' : 'hover:bg-cyber/[0.025]'
      }`}
    >
      <div
        className={`bg-cyber pointer-events-none absolute inset-y-0 left-0 w-px transition-opacity ${
          isActive ? 'opacity-100' : 'opacity-0 group-hover/project-row:opacity-70'
        }`}
      />
      <div className="bg-cyber/50 pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-500 group-hover/project-row:scale-x-100" />
      <div className="bg-cyber/25 pointer-events-none absolute inset-x-0 bottom-0 h-px origin-right scale-x-0 transition-transform duration-500 group-hover/project-row:scale-x-100" />

      <div className="relative min-w-0">
        <div className="text-cyber/70 mb-2 flex items-center gap-2 font-mono text-[10px] tracking-widest">
          <span
            className={`h-1.5 w-1.5 transition-all ${
              isActive
                ? 'bg-cyber shadow-[0_0_10px_rgba(204,255,0,0.8)]'
                : 'bg-cyber/35 group-hover/project-row:bg-cyber'
            }`}
          />
          <span>
            {project.category} / {project.client}
          </span>
        </div>
        <div
          className={`relative inline-block max-w-full truncate pr-3 text-2xl font-black tracking-tight uppercase transition-all sm:text-3xl ${
            isActive
              ? 'text-cyber drop-shadow-[0_0_10px_rgba(204,255,0,0.35)]'
              : 'group-hover/project-row:text-cyber text-white/85 group-hover/project-row:drop-shadow-[0_0_10px_rgba(204,255,0,0.24)]'
          }`}
        >
          <SignalTitle text={project.title} />
          <span
            className={`bg-cyber pointer-events-none absolute right-0 bottom-0 left-0 h-px origin-left transition-transform duration-500 ${
              isActive ? 'scale-x-100' : 'scale-x-0 group-hover/project-row:scale-x-100'
            }`}
          />
        </div>

        <div className="mt-3 hidden max-w-sm items-center gap-2 md:flex">
          <span className="bg-cyber/30 h-px w-8" />
          {routeSegments.map((level, index) => (
            <span
              key={`${project.id}-${index}`}
              className={`h-2 flex-1 border border-white/10 transition-colors ${
                isActive ? 'bg-cyber/45' : 'group-hover/project-row:bg-cyber/18 bg-white/[0.03]'
              }`}
            >
              <span
                className={`bg-cyber block h-full transition-transform duration-300 ${
                  isActive ? 'scale-x-100' : 'scale-x-0 group-hover/project-row:scale-x-100'
                }`}
                style={{ transformOrigin: 'left', opacity: 0.28 + level * 0.14 }}
              />
            </span>
          ))}
          <span className="bg-cyber/30 h-px w-8" />
        </div>
      </div>

      <div className="relative text-sm leading-relaxed text-white/55 transition-colors group-hover/project-row:text-white/75">
        {project.type}
      </div>
      <div className="group-hover/project-row:text-cyber/70 relative font-mono text-xs tracking-widest text-white/40 transition-colors">
        {project.year}
      </div>
      <div
        className={`relative ml-auto hidden w-32 overflow-hidden border font-mono text-[9px] tracking-widest md:block ${
          isActive ? 'border-cyber/70 text-cyber' : 'border-white/10 text-white/30'
        }`}
      >
        {commandLabels.map((label, index) => (
          <span
            key={label}
            className={`flex items-center justify-between border-b border-white/10 px-2 py-1.5 transition-colors last:border-b-0 ${
              isActive || index === 2
                ? 'group-hover/project-row:bg-cyber/12 group-hover/project-row:text-cyber'
                : 'group-hover/project-row:text-white/55'
            }`}
          >
            <span>{label}</span>
            <span
              className={`bg-cyber h-1 w-4 transition-transform duration-300 ${
                isActive || index === 2
                  ? 'scale-x-100'
                  : 'scale-x-0 group-hover/project-row:scale-x-100'
              }`}
              style={{ transformOrigin: 'left' }}
            />
          </span>
        ))}
      </div>

      <div
        className={`relative ml-auto grid h-9 w-9 place-items-center border transition-all md:hidden ${
          isActive
            ? 'border-cyber bg-cyber rotate-90 text-black'
            : 'group-hover/project-row:border-cyber group-hover/project-row:text-cyber border-white/20 text-white/40 group-hover/project-row:-rotate-45'
        }`}
      >
        <FaArrowRight />
      </div>
    </button>
  );
}

function ProjectThreadCard({
  thread,
  index,
}: {
  thread: ProjectRecord['caseStudy']['threads'][number];
  index: number;
}) {
  const steps = [
    ['SIGNAL', thread.finding],
    ['MOVE', thread.decision],
    ['OUTCOME', thread.result],
  ] as const;

  return (
    <section className="border-cyber/18 relative overflow-hidden border bg-[#050505]/82 shadow-[inset_0_0_28px_rgba(204,255,0,0.025)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(204,255,0,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(204,255,0,0.025)_1px,transparent_1px)] bg-[size:22px_22px]" />
      <div className="bg-cyber/45 pointer-events-none absolute top-0 right-0 h-px w-2/5" />

      <div className="relative">
        <div className="border-cyber/16 flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center">
          <div className="border-cyber/40 bg-cyber/8 relative grid h-16 w-16 shrink-0 place-items-center border">
            <div className="border-cyber/16 pointer-events-none absolute inset-1 border" />
            <span className="text-cyber font-mono text-3xl leading-none font-black">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-1 font-mono text-[10px] tracking-widest text-white/34">
              CASE_NODE
            </div>
            <h4 className="text-cyber text-sm leading-tight font-black tracking-widest [overflow-wrap:anywhere] uppercase sm:text-base">
              {thread.title}
            </h4>
          </div>

          <div className="min-w-[7rem] font-mono text-[10px] tracking-widest text-white/30">
            THREAD <span className="text-cyber">{String(index + 1).padStart(2, '0')}</span>
          </div>
        </div>

        <div className="h-1 bg-white/8">
          <div
            className="bg-cyber h-full shadow-[0_0_12px_rgba(204,255,0,0.5)]"
            style={{ width: `${Math.min(100, 46 + index * 22)}%` }}
          />
        </div>

        <div className="grid gap-2 p-4">
          {steps.map(([label, text], stepIndex) => (
            <div
              key={label}
              className="relative grid gap-2 overflow-hidden border border-white/10 bg-black/45 p-3 sm:grid-cols-[6.5rem_minmax(0,1fr)]"
            >
              <span className="bg-cyber/30 pointer-events-none absolute top-0 left-0 h-full w-px" />
              <span className="text-cyber font-mono text-[10px] tracking-widest">
                {String(stepIndex + 1).padStart(2, '0')} / {label}
              </span>
              <p className="text-sm leading-relaxed text-white/72">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StackSignalConsole({ tech }: { tech: string[] }) {
  return (
    <div className="relative overflow-hidden border border-white/10 bg-[#050505]/58 p-3">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(204,255,0,0.026)_1px,transparent_1px),linear-gradient(90deg,rgba(204,255,0,0.018)_1px,transparent_1px)] bg-[size:18px_18px]" />
      <div className="relative mb-3 flex items-center justify-between border-b border-white/10 pb-2 font-mono text-[10px] tracking-widest">
        <span className="text-cyber">STACK_SIGNAL_MATRIX //</span>
        <span className="text-white/32">{String(tech.length).padStart(2, '0')} SIGNALS</span>
      </div>

      <div className="relative flex flex-wrap gap-2">
        {tech.map((item, index) => (
          <button
            key={item}
            type="button"
            className="group/tag hover:border-cyber/80 hover:bg-cyber/10 hover:text-cyber focus-visible:border-cyber relative overflow-hidden border border-white/15 bg-white/[0.03] px-2.5 py-1.5 font-mono text-[10px] tracking-widest text-white/62 transition-all hover:-translate-y-px focus-visible:outline-none"
          >
            <span className="bg-cyber pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-300 group-hover/tag:scale-x-100 group-focus-visible/tag:scale-x-100" />
            <span className="mr-1.5 text-white/25">{String(index + 1).padStart(2, '0')}</span>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function ProjectListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border border-white/10 bg-[#050505]/58 p-3">
      <h4 className="text-cyber mb-2 border-b border-white/10 pb-2 font-mono text-[10px] tracking-widest uppercase">
        {title}
        {' //'}
      </h4>
      <ul className="space-y-1.5">
        {items.slice(0, 3).map(item => (
          <li key={item} className="flex gap-2 text-xs leading-relaxed text-white/62 sm:text-sm">
            <FaChevronRight className="text-cyber mt-1 shrink-0 text-[10px]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectLink({ href, label }: { href: string; label: string }) {
  const [pointer, setPointer] = useState({ x: 50, y: 50, dx: 0, dy: 0, rx: 0, ry: 0 });
  const style = {
    '--cursor-x': `${pointer.x}%`,
    '--cursor-y': `${pointer.y}%`,
    '--cursor-dx': `${pointer.dx}px`,
    '--cursor-dy': `${pointer.dy}px`,
    '--rotate-x': `${pointer.rx}deg`,
    '--rotate-y': `${pointer.ry}deg`,
  } as CSSProperties;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={event => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        setPointer({
          x,
          y,
          dx: (x - 50) * 0.06,
          dy: (y - 50) * 0.045,
          rx: (50 - y) * 0.05,
          ry: (x - 50) * 0.07,
        });
      }}
      onMouseLeave={() => setPointer({ x: 50, y: 50, dx: 0, dy: 0, rx: 0, ry: 0 })}
      style={style}
      className="group/link border-cyber/45 text-cyber hover:border-cyber hover:bg-cyber/10 focus-visible:border-cyber relative grid min-w-[12rem] [transform:perspective(700px)_rotateX(var(--rotate-x))_rotateY(var(--rotate-y))] grid-cols-[1fr_auto] items-center gap-4 overflow-hidden border bg-black/35 px-4 py-3 font-mono text-xs font-bold tracking-widest transition-[border-color,box-shadow,transform,background-color] duration-200 hover:shadow-[0_0_22px_rgba(204,255,0,0.16)] focus-visible:outline-none"
    >
      <span className="border-cyber/70 pointer-events-none absolute top-0 left-0 h-4 w-4 border-t border-l opacity-70" />
      <span className="border-cyber/50 pointer-events-none absolute right-0 bottom-0 h-4 w-4 border-r border-b opacity-70" />
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_var(--cursor-x)_var(--cursor-y),rgba(204,255,0,0.22),transparent_38%)] opacity-0 transition-opacity group-hover/link:opacity-100 group-focus-visible/link:opacity-100" />
      <span className="pointer-events-none absolute inset-0 bg-[conic-gradient(from_160deg_at_var(--cursor-x)_var(--cursor-y),transparent,rgba(204,255,0,0.18),transparent_38%)] opacity-0 mix-blend-screen transition-opacity duration-200 group-hover/link:opacity-100 group-focus-visible/link:opacity-100" />
      <span
        className="pointer-events-none absolute -inset-8 bg-[linear-gradient(115deg,transparent_35%,rgba(204,255,0,0.16)_48%,transparent_62%)] opacity-0 blur-sm transition-opacity group-hover/link:opacity-100 group-focus-visible/link:opacity-100"
        style={{
          transform:
            'translate(calc((var(--cursor-x) - 50%) * 0.12), calc((var(--cursor-y) - 50%) * 0.12))',
        }}
      />
      <span className="pointer-events-none absolute inset-x-4 bottom-2 h-px bg-white/10">
        <span className="bg-cyber block h-full w-full origin-left scale-x-0 transition-transform duration-300 group-hover/link:scale-x-100 group-focus-visible/link:scale-x-100" />
      </span>

      <span
        className="relative flex items-center gap-2 transition-transform duration-100"
        style={{ transform: 'translate(var(--cursor-dx), var(--cursor-dy))' }}
      >
        <span className="border-cyber/40 group-hover/link:bg-cyber group-focus-visible/link:bg-cyber grid h-3 w-3 place-items-center border transition-colors">
          <span className="bg-cyber h-1 w-1 transition-colors group-hover/link:bg-black group-focus-visible/link:bg-black" />
        </span>
        {label}
      </span>
      <FaExternalLinkAlt className="relative transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 group-focus-visible/link:translate-x-1 group-focus-visible/link:-translate-y-1" />
    </a>
  );
}

function ProjectDetail({
  project,
  activeImageIndex,
  onSelectImage,
}: {
  project: ProjectRecord;
  activeImageIndex: number;
  onSelectImage: (index: number) => void;
}) {
  const images = project.images ?? [];
  const activeImage = images[activeImageIndex] ?? images[0];
  const [activeThreadIndex, setActiveThreadIndex] = useState(0);

  useEffect(() => {
    setActiveThreadIndex(0);
  }, [project.id]);

  const activeThread =
    project.caseStudy.threads[activeThreadIndex] ?? project.caseStudy.threads[0] ?? null;

  return (
    <article className="project-detail-reveal border-l-cyber min-w-0 border border-white/10 bg-black/62 p-4 sm:p-6 xl:p-8">
      <header className="group/header relative mb-5 overflow-hidden border border-white/10 bg-[#050505]/78">
        <div className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(204,255,0,0.055),transparent)] transition-transform duration-700 group-hover/header:translate-x-full" />
        <div className="border-cyber/70 pointer-events-none absolute top-0 left-0 h-8 w-8 border-t border-l" />
        <div className="border-cyber/45 pointer-events-none absolute right-0 bottom-0 h-8 w-8 border-r border-b" />

        <div className="relative border-b border-white/10 p-4 sm:p-5">
          <div className="text-cyber flex items-center gap-2 font-mono text-[10px] tracking-widest">
            <span className="bg-cyber h-1.5 w-1.5 shadow-[0_0_10px_rgba(204,255,0,0.8)]" />
            <span>CASE_THREAD // {project.id}</span>
          </div>
          <h3 className="group-hover/header:text-cyber mt-2 max-w-full text-2xl leading-tight font-black tracking-widest [overflow-wrap:anywhere] text-white uppercase transition-colors sm:text-3xl">
            <SignalTitle text={project.title} />
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/52">{project.type}</p>
        </div>

        <div className="relative grid gap-px bg-white/10 font-mono text-[10px] tracking-widest text-white/45 sm:grid-cols-3">
          <div className="group-hover/header:bg-cyber/5 bg-[#050505] px-4 py-3 transition-colors">
            YEAR <b className="text-cyber ml-2">{project.year}</b>
          </div>
          <div className="group-hover/header:bg-cyber/5 bg-[#050505] px-4 py-3 transition-colors">
            TYPE <b className="text-cyber ml-2">{project.category}</b>
          </div>
          <div className="group-hover/header:bg-cyber/5 bg-[#050505] px-4 py-3 transition-colors">
            ROLE <b className="text-cyber ml-2">{project.role}</b>
          </div>
        </div>
      </header>

      <div className="min-w-0 space-y-5">
        {activeImage && (
          <div className="border-cyber/35 border bg-[#050505] p-2 sm:p-3">
            <div className="group/img relative overflow-hidden">
              <div className="border-cyber pointer-events-none absolute top-0 left-0 z-10 h-7 w-7 border-t-2 border-l-2" />
              <div className="border-cyber pointer-events-none absolute top-0 right-0 z-10 h-7 w-7 border-t-2 border-r-2" />
              <div className="border-cyber pointer-events-none absolute bottom-0 left-0 z-10 h-7 w-7 border-b-2 border-l-2" />
              <div className="border-cyber pointer-events-none absolute right-0 bottom-0 z-10 h-7 w-7 border-r-2 border-b-2" />
              <img
                src={activeImage}
                alt={`${project.title} screenshot ${activeImageIndex + 1}`}
                className="aspect-[16/9] w-full bg-white/95 object-contain object-top opacity-82 grayscale transition-all duration-500 group-hover/img:opacity-100 group-hover/img:grayscale-0"
              />
              <div className="border-cyber/35 pointer-events-none absolute inset-4 border" />
              <div className="bg-cyber/55 pointer-events-none absolute inset-x-4 top-1/2 h-[2px] shadow-[0_0_14px_rgba(204,255,0,0.65)]" />
              <div className="bg-cyber absolute top-0 right-0 px-2 py-1 font-mono text-[10px] font-bold tracking-widest text-black">
                CASE_CAM_{String(activeImageIndex + 1).padStart(2, '0')}
                {' // '}
                {images.length}
              </div>
            </div>

            {images.length > 1 && (
              <div className="mt-3 border border-white/10 bg-black/70 p-2">
                <div className="mb-2 flex items-center justify-between border-b border-white/10 pb-2 font-mono text-[10px] tracking-widest">
                  <span className="text-cyber">VISUAL_NODES //</span>
                  <span className="text-white/55">{images.length} SCREENS</span>
                </div>
                <div className="grid grid-cols-3 gap-2 md:grid-cols-[repeat(3,minmax(0,11rem))]">
                  {images.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => onSelectImage(index)}
                      className={`relative overflow-hidden border p-1 transition-colors ${
                        index === activeImageIndex
                          ? 'border-cyber bg-cyber/10'
                          : 'hover:border-cyber/60 border-white/15'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${project.title} thumbnail ${index + 1}`}
                        className={`aspect-[16/9] w-full object-cover object-top transition-all duration-300 ${
                          index === activeImageIndex
                            ? 'opacity-100 grayscale-0'
                            : 'opacity-65 grayscale hover:opacity-100 hover:grayscale-0'
                        }`}
                      />
                      <span className="text-cyber absolute bottom-1 left-1 bg-black/80 px-1.5 py-0.5 font-mono text-[10px]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="border border-white/10 bg-[#050505]/70 p-4 sm:p-5">
          <div className="text-cyber mb-3 font-mono text-[10px] tracking-widest">
            PROJECT_CONTEXT //
          </div>
          <p className="max-w-5xl text-sm leading-relaxed text-white/72 sm:text-base">
            {project.caseStudy.context}
          </p>
        </div>
      </div>

      <section className="border-cyber/18 relative mt-5 min-w-0 overflow-hidden border bg-[#050505]/70">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(204,255,0,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(204,255,0,0.018)_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="bg-cyber/55 pointer-events-none absolute top-0 right-0 h-px w-1/2" />
        <div className="relative mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="p-4 pb-0">
            <div className="text-cyber font-mono text-[10px] tracking-widest">THREAD_ROUTE //</div>
          </div>
          <div className="px-4 pt-4 font-mono text-[10px] tracking-widest text-white/35">
            {project.caseStudy.threads.length} NODES
          </div>
        </div>

        <div className="relative grid gap-0 border-t border-white/10 lg:grid-cols-[minmax(240px,0.32fr)_minmax(0,1fr)]">
          <div className="border-b border-white/10 bg-black/30 lg:border-r lg:border-b-0">
            {project.caseStudy.threads.map((thread, index) => (
              <button
                key={thread.title}
                type="button"
                onClick={() => setActiveThreadIndex(index)}
                className={`group relative grid w-full grid-cols-[2.5rem_minmax(0,1fr)] gap-3 border-b border-white/10 px-4 py-3 text-left transition-colors last:border-b-0 ${
                  index === activeThreadIndex
                    ? 'bg-cyber/12 text-cyber shadow-[inset_3px_0_0_var(--color-cyber)]'
                    : 'text-white/45 hover:bg-white/[0.025] hover:text-white/75'
                }`}
              >
                <span
                  className={`absolute top-1/2 right-3 h-1.5 w-1.5 -translate-y-1/2 ${
                    index === activeThreadIndex ? 'bg-cyber' : 'bg-white/15'
                  }`}
                />
                <span className="font-mono text-sm font-black">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0 pr-5">
                  <span className="block truncate font-mono text-[10px] tracking-widest uppercase">
                    {thread.title}
                  </span>
                  <span className="mt-1 block h-px w-full bg-white/10">
                    <span
                      className={`block h-full transition-all ${
                        index === activeThreadIndex ? 'bg-cyber w-full' : 'w-1/3 bg-white/20'
                      }`}
                    />
                  </span>
                </span>
              </button>
            ))}
          </div>

          <div className="min-w-0 p-4">
            {activeThread && <ProjectThreadCard thread={activeThread} index={activeThreadIndex} />}
          </div>
        </div>
      </section>

      <footer className="mt-5 grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <ProjectListBlock title="SCOPE_SNAPSHOT" items={project.features} />
        <StackSignalConsole tech={project.tech} />

        {(project.liveUrl || project.repo) && (
          <div className="flex flex-wrap gap-3 border border-white/10 bg-black/25 p-3 lg:col-span-2">
            {project.liveUrl && <ProjectLink href={project.liveUrl} label="LIVE_PREVIEW" />}
            {project.repo && <ProjectLink href={project.repo} label="SOURCE_CODE" />}
          </div>
        )}
      </footer>
    </article>
  );
}

export default function ProjectsPanel() {
  const [activeCategory, setActiveCategory] = useState<'ALL' | ProjectRecord['category']>('ALL');
  const [activeProjectId, setActiveProjectId] = useState<string | null>(PROJECTS[0]?.id ?? null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const detailRef = useRef<HTMLDivElement>(null);

  const filteredProjects = useMemo(() => {
    return activeCategory === 'ALL'
      ? PROJECTS
      : PROJECTS.filter(project => project.category === activeCategory);
  }, [activeCategory]);

  const activeProject = filteredProjects.find(project => project.id === activeProjectId) ?? null;
  const categories = useMemo<Array<'ALL' | ProjectRecord['category']>>(
    () => ['ALL', ...Array.from(new Set(PROJECTS.map(project => project.category)))],
    []
  );

  useEffect(() => {
    if (!filteredProjects.some(project => project.id === activeProjectId)) {
      setActiveProjectId(filteredProjects[0]?.id ?? null);
      setActiveImageIndex(0);
    }
  }, [activeProjectId, filteredProjects]);

  const hasMountedRef = useRef(false);
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    if (!activeProjectId) {
      return;
    }

    window.requestAnimationFrame(() => {
      detailRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    });
  }, [activeProjectId]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/10 pb-4">
        <span className="font-mono text-xs tracking-widest text-white/40">FILTER_BY:</span>
        {categories.map(category => (
          <button
            key={category}
            type="button"
            onClick={() => {
              setActiveCategory(category);
              setActiveProjectId(null);
              setActiveImageIndex(0);
            }}
            className={`border px-3 py-1 font-mono text-xs transition-colors ${
              activeCategory === category
                ? 'border-cyber bg-cyber/10 text-cyber'
                : 'border-white/20 text-white/50 hover:border-white/50 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
        <span className="text-cyber ml-auto font-mono text-xs">
          {filteredProjects.length} RECORDS_FOUND
        </span>
      </div>

      <div className="space-y-0 border-t border-white/10">
        {filteredProjects.map(project => {
          const isActive = project.id === activeProjectId;

          return (
            <ProjectRouteRow
              key={project.id}
              project={project}
              isActive={isActive}
              onSelect={() => {
                setActiveProjectId(isActive ? null : project.id);
                setActiveImageIndex(0);
              }}
            />
          );
        })}
      </div>

      <div ref={detailRef}>
        {activeProject && (
          <ProjectDetail
            key={activeProject.id}
            project={activeProject}
            activeImageIndex={activeImageIndex}
            onSelectImage={setActiveImageIndex}
          />
        )}
      </div>
    </div>
  );
}
