'use client';

import { useState } from 'react';

import { CAREER_STAGES, type CareerStage } from '@/data/portfolio';

function CareerStageCard({ stage }: { stage: CareerStage }) {
  return (
    <article className="border-cyber/30 relative overflow-hidden border bg-black/55 p-4 shadow-[inset_0_0_36px_rgba(204,255,0,0.035)] sm:p-5 lg:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(204,255,0,0.11),transparent_26%),linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:auto,24px_24px,24px_24px]" />
      <div className="border-cyber pointer-events-none absolute top-0 right-0 h-16 w-16 border-t border-r" />
      <div className="border-cyber pointer-events-none absolute bottom-0 left-0 h-16 w-16 border-b border-l" />

      <div className="relative mb-5 flex flex-col justify-between gap-4 border-b border-white/10 pb-4 md:flex-row md:items-start">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2 font-mono">
            <span className="border-cyber/40 bg-cyber/10 text-cyber border px-2.5 py-1 text-[10px] tracking-widest">
              ACTIVE_RECORD
            </span>
            <span className="text-[10px] tracking-widest text-white/35">{stage.stage}</span>
          </div>
          <h3 className="max-w-4xl text-2xl leading-tight font-black tracking-tight text-white uppercase sm:text-3xl">
            {stage.title}
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-2 font-mono text-[10px] tracking-widest md:min-w-36 md:grid-cols-1">
          <div className="border border-white/10 bg-white/[0.03] p-2">
            <div className="text-white/30">PERIOD</div>
            <div className="text-cyber mt-1">{stage.period}</div>
          </div>
          <div className="border border-white/10 bg-white/[0.03] p-2">
            <div className="text-white/30">ROLE</div>
            <div className="mt-1 text-white/70">{stage.role}</div>
          </div>
        </div>
      </div>

      <div className="relative border border-white/10 bg-[#050505]/65 p-4 sm:p-5">
        <div className="text-cyber mb-3 font-mono text-[10px] tracking-widest">WORK_CONTEXT //</div>
        <p className="border-cyber/45 border-l pl-4 text-sm leading-relaxed text-white/72 md:text-base">
          {stage.summary}
        </p>
      </div>

      <div className="relative mt-5 border border-white/10 bg-black/35 p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/10 pb-3 font-mono">
          <span className="text-cyber text-[10px] tracking-widest">WORK_DELIVERED //</span>
          <span className="text-[9px] tracking-widest text-white/30">
            {stage.items.length} RECORDS
          </span>
        </div>
        <div className="space-y-3">
          {stage.items.map(item => (
            <div
              key={item.label}
              className="hover:border-cyber/45 grid gap-3 border border-white/10 bg-[#050505]/75 p-3 transition-colors sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:p-4"
            >
              <div className="text-cyber font-mono text-[10px] tracking-widest">{item.label}</div>
              <p className="text-sm leading-relaxed text-white/70">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-5 flex flex-wrap gap-2">
        {stage.tags.map(tag => (
          <span
            key={tag}
            className="border-cyber/20 bg-cyber/5 text-cyber border px-2.5 py-1 font-mono text-[10px] tracking-widest"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function ExperiencePanel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStage = CAREER_STAGES[activeIndex];

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(260px,360px)_minmax(0,1fr)] xl:gap-6">
      <div className="relative overflow-hidden border border-white/10 bg-black/45 p-3 sm:p-4">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(204,255,0,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(204,255,0,0.035)_1px,transparent_1px)] bg-[size:18px_18px]" />
        <div className="relative mb-3 flex items-center justify-between border-b border-white/10 pb-3 font-mono">
          <span className="text-cyber text-xs tracking-widest">TIME_AXIS</span>
          <span className="text-[10px] tracking-widest text-white/35">MAIN_WORK_ONLY</span>
        </div>
        <div className="cyber-scrollbar relative flex gap-2 overflow-x-auto pb-1 xl:block xl:overflow-visible xl:pb-0">
          {CAREER_STAGES.map((stage, index) => {
            const isActive = index === activeIndex;
            const shortStage = stage.stage.split('//')[1]?.trim() ?? stage.stage;

            return (
              <button
                key={stage.stage}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-current={isActive ? 'step' : undefined}
                className={`group grid min-w-[14rem] grid-cols-[2rem_minmax(0,1fr)] gap-3 text-left transition-all duration-300 xl:mb-3 xl:w-full xl:min-w-0 ${
                  isActive ? 'text-cyber' : 'hover:text-cyber text-white/45'
                }`}
              >
                <span
                  className={`grid h-8 w-8 place-items-center rounded-full border font-mono text-[10px] transition-all ${
                    isActive
                      ? 'border-cyber bg-cyber text-black shadow-[0_0_16px_rgba(204,255,0,0.45)]'
                      : 'group-hover:border-cyber/60 group-hover:text-cyber border-white/20 bg-[#050505] text-white/35'
                  }`}
                >
                  {CAREER_STAGES.length - index}
                </span>
                <span
                  className={`min-h-24 border p-3 transition-all xl:min-h-0 ${
                    isActive
                      ? 'border-cyber bg-cyber/10'
                      : 'group-hover:border-cyber/45 border-white/10 bg-[#050505]/70'
                  }`}
                >
                  <span className="font-mono text-[10px] tracking-widest text-white/35">
                    {stage.period}
                  </span>
                  <span className="mt-1 block font-mono text-[9px] tracking-widest">
                    {shortStage}
                  </span>
                  <span className="mt-2 block text-sm font-black tracking-tight text-white uppercase">
                    {stage.title}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <CareerStageCard stage={activeStage} />
    </div>
  );
}
