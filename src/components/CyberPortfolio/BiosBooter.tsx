'use client';

import { useEffect, useState } from 'react';

import { PANELS } from './constants';

const BOOT_ROWS = [
  ['C1', 'Auto-detecting profile core', 'THOMAS_YEH'],
  ['C3', 'Checking NVRAM checksum', 'PORTFOLIO_PROFILE OK'],
  ['2A', 'Testing base memory', '640K OK'],
  ['34', 'Testing extended memory', '1048576K OK'],
  ['50', 'Initializing web audio controller', 'READY'],
  ['61', 'Detecting project archive', '8 RECORDS'],
  ['75', 'Detecting framework bridge', 'ANGULAR / REACT / VUE'],
  ['7A', 'Initializing static asset channel', 'OK'],
  ['B4', 'Boot device selected', 'YEHFOLIO_INTERFACE'],
  ['FF', 'Starting portfolio kernel', 'READY'],
] as const;

const BIOS_POST_ROWS = [
  ['Memory Count', '1,048,576K OK', 'OK'],
  ['CPU Type', 'Frontend Cortex / Angular Core', 'OK'],
  ['Base Memory', '640K', 'OK'],
  ['Extended Memory', '1048576K', 'OK'],
  ['Primary Display', 'Cyber Portfolio Interface', 'OK'],
  ['Audio Controller', 'Web Audio Loop Controller', 'ARMED'],
] as const;

const BIOS_POST_CODES = ['10', '18', '2A', '34', '50', '61', '75', '7A', 'B4', 'FF'] as const;

const SIGNAL_CELLS = Array.from({ length: 24 });

export default function BiosBooter({
  onEnter,
  shouldPlayAudio,
}: {
  onEnter: () => void;
  shouldPlayAudio: boolean;
}) {
  const [visibleRows, setVisibleRows] = useState(0);
  const [visiblePostRows, setVisiblePostRows] = useState(0);
  const [diagnosticTick, setDiagnosticTick] = useState(0);
  const totalBootSteps = BIOS_POST_ROWS.length + BOOT_ROWS.length;
  const completedBootSteps = visiblePostRows + visibleRows;
  const bootProgress = Math.round((completedBootSteps / totalBootSteps) * 100);
  const activeBootIndex = visibleRows < BOOT_ROWS.length ? visibleRows : -1;
  const isBootComplete = visibleRows === BOOT_ROWS.length;
  let selectedBootIndex = -1;

  if (activeBootIndex >= 0) {
    selectedBootIndex = activeBootIndex;
  } else if (isBootComplete) {
    selectedBootIndex = 8;
  }

  const activeCode =
    visibleRows > 0
      ? BOOT_ROWS[Math.min(visibleRows - 1, BOOT_ROWS.length - 1)][0]
      : BIOS_POST_CODES[Math.min(visiblePostRows, BIOS_POST_CODES.length - 1)];
  const busAddress = ((diagnosticTick * 37) % 4096).toString(16).toUpperCase().padStart(3, '0');
  const irqValue = ((diagnosticTick * 7) % 16).toString().padStart(2, '0');
  const routeProgress = Math.round((visibleRows / BOOT_ROWS.length) * 100);
  const currentBootLabel =
    visibleRows > 0
      ? BOOT_ROWS[Math.min(visibleRows - 1, BOOT_ROWS.length - 1)][1]
      : 'Power signal detected';

  useEffect(() => {
    const timers: number[] = [];
    const postDelay = 240;
    const rowDelay = 280;
    const bootStart = postDelay * BIOS_POST_ROWS.length + 420;

    BIOS_POST_ROWS.forEach((_, index) => {
      timers.push(window.setTimeout(() => setVisiblePostRows(index + 1), 220 + index * postDelay));
    });

    BOOT_ROWS.forEach((_, index) => {
      timers.push(window.setTimeout(() => setVisibleRows(index + 1), bootStart + index * rowDelay));
    });

    return () => timers.forEach(timer => window.clearTimeout(timer));
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setDiagnosticTick(current => (current + 1) % 10000);
    }, 120);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onEnter();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onEnter]);

  return (
    <section
      className="bios-screen notranslate"
      aria-label="YEHFOLIO BIOS boot screen"
      lang="en"
      translate="no"
    >
      <div className="bios-glow bios-glow-left" />
      <div className="bios-glow bios-glow-right" />

      <div className="bios-shell">
        <header className="border-cyber/30 relative shrink-0 border-b bg-black/90">
          <div className="bg-cyber absolute inset-x-0 top-0 h-1 shadow-[0_0_28px_rgba(204,255,0,0.55)]" />
          <div className="grid gap-3 px-4 pt-5 pb-3 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
            <div className="min-w-0">
              <p
                className="notranslate text-cyber/75 text-[10px] font-bold tracking-[0.34em]"
                translate="no"
              >
                POST / CMOS / BOOT SELECTOR
              </p>
              <h1
                className="notranslate mt-1 min-w-0 animate-[bios-title-flicker_5.8s_steps(1,end)_infinite] truncate text-3xl font-black tracking-[0.22em] text-white sm:text-4xl"
                translate="no"
              >
                YEHFOLIO BIOS
              </h1>
            </div>
            <div className="border-cyber/35 bg-cyber/[0.035] hidden min-w-[15rem] border px-4 py-2 text-right text-[10px] tracking-[0.18em] text-white/55 shadow-[inset_0_0_22px_rgba(204,255,0,0.05)] sm:grid">
              <span>BIOS DATE 05/23/26</span>
              <span>BUILD ID YEH-PORT-2026</span>
              <strong className="notranslate text-cyber mt-1" translate="no">
                POST CODE {activeCode}
              </strong>
            </div>
          </div>
          <div className="border-cyber/25 grid grid-cols-4 border-t text-[10px] font-bold tracking-[0.18em] text-white/42">
            {['MAIN', 'ADVANCED', 'BOOT', 'EXIT'].map(item => (
              <div
                key={item}
                className={`border-cyber/20 h-7 border-r px-4 py-1.5 ${
                  item === 'BOOT'
                    ? 'bg-cyber text-black shadow-[0_0_18px_rgba(204,255,0,0.32)]'
                    : ''
                }`}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="border-cyber/25 grid min-h-8 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t px-4 py-1.5 text-[10px] tracking-[0.18em] text-white/45 sm:px-6">
            <span className="min-w-0 truncate">Copyright (C) 2026 Thomas Yeh Portfolio System</span>
            <strong className="notranslate text-cyber/85 flex items-center gap-2" translate="no">
              <span
                className="bg-cyber inline-block h-2 w-2 animate-[bios-led_960ms_steps(2,end)_infinite] shadow-[0_0_10px_rgba(204,255,0,0.85)]"
                aria-hidden="true"
              />
              {isBootComplete ? 'BOOT_DEVICE_READY' : 'POST_RUNNING'}
            </strong>
          </div>
        </header>

        <main className="grid items-start gap-3 p-3 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.58fr)]">
          <section className="bios-panel-frame border-cyber/35 border bg-black/75 shadow-[inset_0_0_42px_rgba(204,255,0,0.04)]">
            <div className="border-cyber/25 text-cyber flex items-center justify-between border-b py-2 pr-4 pl-7 font-mono text-[10px] font-bold tracking-[0.2em]">
              <span className="notranslate" translate="no">
                BOOT_OPTION_PRIORITIES
              </span>
              <strong className="notranslate" translate="no">
                {routeProgress}% SYNC
              </strong>
            </div>

            <div className="grid items-start gap-3 p-3 sm:p-4 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.48fr)]">
              <div className="border-cyber/25 bg-cyber/[0.018] relative min-w-0 overflow-hidden border">
                <div className="border-cyber/20 grid grid-cols-[4.75rem_minmax(0,1fr)_5rem] items-center border-b px-3 py-2 font-mono text-[9px] font-bold tracking-[0.18em] text-white/40 sm:grid-cols-[7rem_minmax(0,1fr)_7rem] sm:text-[10px]">
                  <span>OPTION</span>
                  <span>BOOT TARGET</span>
                  <span className="text-right">STATUS</span>
                </div>

                {[
                  ['Boot #1', 'YEHFOLIO_INTERFACE', 'SELECTED'],
                  ['Boot #2', 'PROJECT_ARCHIVE', 'READY'],
                  ['Boot #3', 'WORK_HISTORY', 'READY'],
                  ['Boot #4', 'CONTACT_CHANNEL', 'READY'],
                ].map(([option, target, route], index) => {
                  const isPrimary = index === 0;
                  const isReady = isPrimary || visibleRows > index + 5;
                  const isActive = visibleRows >= index + 4 && !isReady;
                  let bootOptionStateClass = 'text-white/28';

                  if (isPrimary) {
                    bootOptionStateClass =
                      'bg-cyber/15 text-white shadow-[inset_4px_0_0_var(--color-cyber)]';
                  } else if (isReady) {
                    bootOptionStateClass = 'text-white/62';
                  }

                  return (
                    <div
                      key={target}
                      className={`border-cyber/10 relative grid min-w-0 grid-cols-[4.75rem_minmax(0,1fr)_5rem] items-center gap-2 border-b px-3 py-3 font-mono text-[11px] sm:grid-cols-[7rem_minmax(0,1fr)_7rem] sm:gap-3 sm:text-xs ${bootOptionStateClass}`}
                    >
                      {isActive && (
                        <span
                          className="bg-cyber/80 absolute inset-x-0 top-0 h-px animate-[bios-led_900ms_steps(2,end)_infinite]"
                          aria-hidden="true"
                        />
                      )}
                      <span className={isPrimary ? 'text-cyber' : 'text-white/42'}>{option}</span>
                      <strong
                        className="notranslate min-w-0 truncate text-sm tracking-[0.11em] text-white sm:text-base"
                        translate="no"
                      >
                        {isPrimary && (
                          <span className="text-cyber mr-2" aria-hidden="true">
                            &gt;
                          </span>
                        )}
                        {target}
                      </strong>
                      <span
                        className={`truncate text-right text-[9px] font-bold tracking-[0.14em] sm:text-[10px] sm:tracking-[0.18em] ${
                          isReady || isActive ? 'text-cyber' : 'text-white/30'
                        }`}
                      >
                        {route}
                      </span>
                    </div>
                  );
                })}
              </div>

              <aside className="grid gap-3">
                <div className="border-cyber/25 bg-cyber/[0.025] relative overflow-hidden border p-4">
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(204,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(204,255,0,0.025)_1px,transparent_1px)] bg-[size:28px_28px]" />
                  <div className="relative">
                    <span className="block font-mono text-[10px] font-bold tracking-[0.2em] text-white/38">
                      SELECTED_DEVICE
                    </span>
                    <strong
                      className="notranslate mt-3 block text-2xl leading-tight font-black tracking-[0.1em] text-white"
                      translate="no"
                    >
                      YEHFOLIO_INTERFACE
                    </strong>
                    <p className="mt-3 truncate font-mono text-xs tracking-[0.1em] text-white/48">
                      {currentBootLabel}
                    </p>

                    <div className="mt-5 grid grid-cols-4 gap-1.5">
                      {['CMOS', 'POST', 'KERNEL', 'UI'].map((step, index) => {
                        const isReady = routeProgress >= (index + 1) * 22;

                        return (
                          <div
                            key={step}
                            className={`border px-2 py-2 text-center font-mono text-[9px] font-bold tracking-[0.16em] ${
                              isReady
                                ? 'border-cyber/65 bg-cyber/12 text-cyber'
                                : 'border-cyber/16 text-white/30'
                            }`}
                          >
                            {step}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    ['BOOT_VECTOR', `0x${busAddress}`],
                    ['IRQ', irqValue],
                    ['AUDIO', shouldPlayAudio ? 'ARMED' : 'MUTED'],
                    ['KERNEL', isBootComplete ? 'READY' : 'LINKING'],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="border-cyber/18 min-w-0 border bg-black/45 px-3 py-2"
                    >
                      <span className="block truncate text-[9px] tracking-[0.16em] text-white/36">
                        {label}
                      </span>
                      <strong className="text-cyber mt-1 block truncate text-xs">{value}</strong>
                    </div>
                  ))}
                </div>
              </aside>
            </div>

            <div className="border-cyber/20 bg-cyber/[0.018] mx-3 mb-3 grid gap-2 border p-2 sm:mx-4 sm:mb-4 sm:grid-cols-4">
              {PANELS.map((panel, index) => {
                const isReady = visibleRows > index + 5;

                return (
                  <div key={panel.title} className="border-cyber/12 min-w-0 border px-3 py-2">
                    <div className="flex items-center justify-between gap-2 font-mono text-[9px] font-bold tracking-[0.16em]">
                      <span className={isReady ? 'text-cyber' : 'text-white/32'}>
                        BUS {index + 1}
                      </span>
                      <span className={isReady ? 'text-cyber' : 'text-white/28'}>
                        {isReady ? 'READY' : 'QUEUE'}
                      </span>
                    </div>
                    <strong className="mt-2 block truncate text-xs tracking-[0.14em] text-white/80">
                      {panel.title}_CORE
                    </strong>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="bios-panel-frame border-cyber/35 border bg-black/75 shadow-[inset_0_0_42px_rgba(204,255,0,0.035)]">
            <div className="border-cyber/25 text-cyber flex items-center justify-between border-b py-2 pr-4 pl-7 font-mono text-[10px] font-bold tracking-[0.2em]">
              <span className="notranslate" translate="no">
                POST_TRACE
              </span>
              <strong className="notranslate" translate="no">
                CODE {activeCode}
              </strong>
            </div>

            <div className="p-3">
              <div>
                {BOOT_ROWS.map(([code, label, value], index) => {
                  const isVisible = index < visibleRows;
                  const isActive = index === activeBootIndex;
                  const isSelected = index === selectedBootIndex;
                  let bootValue = 'WAIT';
                  let bootTraceStateClass = 'text-white/22';

                  if (isActive && !isVisible) {
                    bootValue = 'CHECKING';
                  } else if (isVisible) {
                    bootValue = value;
                  }

                  if (isSelected) {
                    bootTraceStateClass =
                      'bg-cyber/14 text-white shadow-[inset_3px_0_0_var(--color-cyber)]';
                  } else if (isVisible) {
                    bootTraceStateClass = 'text-white/60';
                  }

                  return (
                    <div
                      key={code}
                      className={`border-cyber/10 grid min-w-0 grid-cols-[2.4rem_minmax(0,1fr)_minmax(5.75rem,auto)] items-center gap-3 border-b px-2 py-2 font-mono text-[11px] ${bootTraceStateClass}`}
                    >
                      <span className={isSelected ? 'text-cyber' : 'text-white/35'}>{code}</span>
                      <span className="flex min-w-0 items-center gap-2 truncate">
                        {isSelected && (
                          <span className="text-cyber" aria-hidden="true">
                            &gt;
                          </span>
                        )}
                        {label}
                      </span>
                      <strong
                        className={`min-w-0 truncate text-right font-medium ${
                          isSelected || isVisible ? 'text-cyber' : 'text-white/28'
                        }`}
                      >
                        {bootValue}
                      </strong>
                    </div>
                  );
                })}
              </div>

              <div className="border-cyber/20 bg-cyber/[0.025] mt-3 border p-3">
                <div className="text-cyber mb-2 flex items-center justify-between font-mono text-[10px] font-bold tracking-[0.18em]">
                  <span>SIGNAL_MONITOR</span>
                  <span>{isBootComplete ? 'NORMAL' : 'LINKING'}</span>
                </div>
                <div className="grid grid-cols-12 gap-1">
                  {SIGNAL_CELLS.map((_, index) => {
                    const isHot =
                      (index + diagnosticTick) % 7 < 3 || index < Math.ceil(routeProgress / 6);

                    return (
                      <span
                        key={index}
                        className={`border-cyber/10 h-6 border ${
                          isHot ? 'bg-cyber shadow-[0_0_12px_rgba(204,255,0,0.35)]' : 'bg-cyber/18'
                        }`}
                        aria-hidden="true"
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-cyber/30 border-t bg-black/78 p-2 sm:p-3">
          <button
            type="button"
            onClick={onEnter}
            translate="no"
            aria-label="Enter portfolio interface"
            className="notranslate group border-cyber/70 bg-cyber/[0.06] hover:bg-cyber relative grid w-full min-w-0 grid-cols-[auto_minmax(0,1fr)] gap-3 overflow-hidden border p-3 text-left transition hover:text-black sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center"
          >
            <span className="bg-cyber/35 absolute inset-x-0 bottom-0 h-px">
              <span
                className="block h-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.8)] transition-[width] duration-300 group-hover:bg-black"
                style={{ width: `${bootProgress}%` }}
              />
            </span>
            <span className="border-cyber bg-cyber grid h-12 w-16 place-items-center border font-mono text-black shadow-[0_0_16px_rgba(204,255,0,0.22)] group-hover:border-black/25 group-hover:bg-black/10 group-hover:text-black sm:h-14 sm:w-20">
              <small className="text-[10px] font-black tracking-[0.2em]">
                {isBootComplete ? 'READY' : 'POST'}
              </small>
              <strong className="text-xl leading-none sm:text-2xl">{bootProgress}%</strong>
            </span>
            <span className="min-w-0">
              <small
                className="block truncate font-mono text-[10px] font-bold tracking-[0.28em] text-white/48 group-hover:text-black/55"
                translate="no"
              >
                {isBootComplete ? 'POST_COMPLETE / ENTER_CONTINUE' : 'POST_RUNNING / ENTER_READY'}
              </small>
              <strong
                className="mt-1 flex min-w-0 items-center overflow-hidden text-base font-black tracking-[0.1em] whitespace-nowrap text-white group-hover:text-black sm:text-3xl sm:tracking-[0.18em]"
                translate="no"
              >
                YEHFOLIO_INTERFACE
                <span className="bios-caret" />
              </strong>
            </span>
            <span className="border-cyber text-cyber col-span-2 inline-flex items-center justify-center gap-3 border px-4 py-2 font-mono text-xs font-black tracking-[0.18em] group-hover:border-black/30 group-hover:text-black sm:col-span-1 sm:px-7 sm:py-3">
              ENTER
              <span className="transition group-hover:translate-x-1" aria-hidden="true">
                &gt;
              </span>
            </span>
          </button>
        </footer>
      </div>
    </section>
  );
}
