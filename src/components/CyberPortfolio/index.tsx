'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import {
  DEFAULT_AUDIO_VOLUME,
  clampAudioVolume,
  readAudioPreferences,
  writeAudioPreferences,
} from '@/lib/audioPreferences';

import BiosBooter from './BiosBooter';
import { AUDIO_SOURCE, PANELS } from './constants';
import ContactPanel from './ContactPanel';
import ExperiencePanel from './ExperiencePanel';
import NetworkCanvas from './NetworkCanvas';
import ProfilePanel from './ProfilePanel';
import ProjectsPanel from './ProjectsPanel';
import { shouldReduceMotion } from './utils';

import type { BrowserAudioContext } from './types';
import type { RefObject } from 'react';

const INTERACTIVE_CURSOR_SELECTOR = [
  'a',
  'button',
  'label',
  'summary',
  'select',
  'input[type="button"]',
  'input[type="checkbox"]',
  'input[type="file"]',
  'input[type="radio"]',
  'input[type="range"]',
  'input[type="reset"]',
  'input[type="submit"]',
  '[role="button"]',
  '[role="tab"]',
  '[tabindex]:not([tabindex="-1"])',
].join(',');
const TEXT_CURSOR_SELECTOR =
  'input:not([type]), input[type="email"], input[type="search"], input[type="text"], input[type="url"], textarea, [contenteditable="true"]';
const DISABLED_CURSOR_SELECTOR =
  'button:disabled, input:disabled, textarea:disabled, select:disabled, [aria-disabled="true"]';

type CursorMode = 'default' | 'interactive' | 'text';

function CustomCursor({ mouseRef }: { mouseRef: RefObject<{ x: number; y: number }> }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<CursorMode>('default');
  const [isPressed, setIsPressed] = useState(false);
  const modeRef = useRef<CursorMode>('default');

  const getCursorMode = useCallback((target: EventTarget | null): CursorMode => {
    if (!(target instanceof Element) || target.closest(DISABLED_CURSOR_SELECTOR)) {
      return 'default';
    }

    if (target.closest(TEXT_CURSOR_SELECTOR)) {
      return 'text';
    }

    if (target.closest(INTERACTIVE_CURSOR_SELECTOR)) {
      return 'interactive';
    }

    return 'default';
  }, []);

  useEffect(() => {
    if (shouldReduceMotion()) {
      return;
    }

    let frameId = 0;
    const trail = { x: mouseRef.current.x, y: mouseRef.current.y };

    const render = () => {
      trail.x += (mouseRef.current.x - trail.x) * 0.18;
      trail.y += (mouseRef.current.y - trail.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseRef.current.x}px, ${mouseRef.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0) translate(-50%, -50%)`;
      }

      frameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(frameId);
  }, [mouseRef]);

  useEffect(() => {
    const syncCursorMode = (event: PointerEvent) => {
      const nextMode = getCursorMode(event.target);

      if (modeRef.current !== nextMode) {
        modeRef.current = nextMode;
        setMode(nextMode);
      }
    };
    const pressCursor = () => setIsPressed(true);
    const releaseCursor = () => setIsPressed(false);
    const resetCursorMode = () => {
      modeRef.current = 'default';
      setMode('default');
      setIsPressed(false);
    };

    window.addEventListener('pointermove', syncCursorMode);
    window.addEventListener('pointerover', syncCursorMode);
    window.addEventListener('pointerdown', pressCursor);
    window.addEventListener('pointerup', releaseCursor);
    window.addEventListener('blur', resetCursorMode);
    document.addEventListener('mouseleave', resetCursorMode);

    return () => {
      window.removeEventListener('pointermove', syncCursorMode);
      window.removeEventListener('pointerover', syncCursorMode);
      window.removeEventListener('pointerdown', pressCursor);
      window.removeEventListener('pointerup', releaseCursor);
      window.removeEventListener('blur', resetCursorMode);
      document.removeEventListener('mouseleave', resetCursorMode);
    };
  }, [getCursorMode]);

  const cursorStateClass = [
    mode !== 'default' ? `cyber-cursor--${mode}` : '',
    isPressed ? 'cyber-cursor--pressed' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <div ref={dotRef} className={`cyber-cursor cyber-cursor-dot ${cursorStateClass}`} />
      <div ref={ringRef} className={`cyber-cursor cyber-cursor-ring ${cursorStateClass}`} />
    </>
  );
}

function SectionHeader({ panelIndex }: { panelIndex: number }) {
  const panel = PANELS[panelIndex];

  return (
    <div className="mb-6 border-b border-white/10 pb-5 sm:mb-8 sm:pb-6">
      <span className="bg-cyber mb-4 inline-block px-3 py-1 font-mono text-xs font-bold text-black">
        {String(panelIndex + 1).padStart(2, '0')}
        {' // '}
        {panel.title}
      </span>
      <h2
        className="glitch-text text-4xl leading-none font-black tracking-tight text-white uppercase sm:text-5xl lg:text-6xl"
        data-text={panel.title}
      >
        {panel.title}
      </h2>
      <p className="mt-2 font-mono text-xs tracking-widest text-white/35">{panel.label}</p>
    </div>
  );
}

function SystemStatusBar({ volume, isPlaying }: { volume: number; isPlaying: boolean }) {
  const [time, setTime] = useState('');
  const [metrics, setMetrics] = useState({ cpu: 18.4, mem: 46.2, ping: 14 });

  useEffect(() => {
    const sync = () => {
      const now = new Date();
      setTime(
        `${now.getHours().toString().padStart(2, '0')}:${now
          .getMinutes()
          .toString()
          .padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
      );
    };
    const timeId = window.setInterval(sync, 1000);
    const metricId = window.setInterval(() => {
      setMetrics({
        cpu: Number((Math.random() * 18 + 12).toFixed(1)),
        mem: Number((Math.random() * 11 + 42).toFixed(1)),
        ping: Math.floor(Math.random() * 8 + 12),
      });
    }, 1800);

    sync();

    return () => {
      window.clearInterval(timeId);
      window.clearInterval(metricId);
    };
  }, []);

  return (
    <div className="relative z-40 flex h-9 shrink-0 items-center justify-between border-t border-white/10 bg-[#050505] px-3 font-mono text-[10px] text-white/40 sm:px-6 sm:text-xs">
      <div className="flex items-center gap-4 sm:gap-6">
        <span className="flex items-center gap-2">
          <span className="bg-cyber h-2 w-2 rounded-full shadow-[0_0_8px_var(--color-cyber)]" />
          SYS_ONLINE
        </span>
        <span className="text-cyber hidden sm:inline">{time}</span>
        <span className="hidden md:inline">AUDIO: {isPlaying ? 'PLAY' : 'IDLE'}</span>
      </div>
      <div className="flex items-center gap-3 sm:gap-6">
        <span>
          VOL: <span className="text-cyber">{Math.round(volume * 100)}%</span>
        </span>
        <span>
          CPU: <span className="text-cyber">{metrics.cpu}%</span>
        </span>
        <span>
          MEM: <span className="text-cyber">{metrics.mem}%</span>
        </span>
        <span className="hidden sm:inline">
          PING: <span className="text-cyber">{metrics.ping}ms</span>
        </span>
      </div>
    </div>
  );
}

export default function CyberPortfolio() {
  const [activePanel, setActivePanel] = useState(0);
  const [isBooting, setIsBooting] = useState(true);
  const [volume, setVolume] = useState(DEFAULT_AUDIO_VOLUME);
  const [shouldPlayAudio, setShouldPlayAudio] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isAudioBlocked, setIsAudioBlocked] = useState(false);
  const [trackSrc, setTrackSrc] = useState(AUDIO_SOURCE);
  const [trackName, setTrackName] = useState('BACKGROUND_LOOP');
  const mouseRef = useRef({ x: -100, y: -100 });
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<BrowserAudioContext | null>(null);
  const audioSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const playAudioRef = useRef<(() => Promise<void>) | undefined>(undefined);
  const currentTrackRef = useRef(trackSrc);

  useEffect(() => {
    const preferences = readAudioPreferences();
    setVolume(preferences.volume);
    setShouldPlayAudio(preferences.shouldPlay);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || currentTrackRef.current === trackSrc) {
      return;
    }

    currentTrackRef.current = trackSrc;
    audio.src = trackSrc;
    audio.load();

    if (!isBooting && shouldPlayAudio) {
      void playAudioRef.current?.();
    }
  }, [trackSrc, isBooting, shouldPlayAudio]);

  useEffect(() => {
    const updateMouse = (event: MouseEvent) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };
    };

    window.addEventListener('mousemove', updateMouse);

    return () => window.removeEventListener('mousemove', updateMouse);
  }, []);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  const ensureAudioGraph = useCallback(() => {
    const audio = audioRef.current;

    if (!audio || analyserRef.current) {
      return;
    }

    const AudioContextConstructor =
      window.AudioContext ??
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextConstructor) {
      return;
    }

    const audioContext = new AudioContextConstructor() as BrowserAudioContext;
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 0.82;

    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    audioContextRef.current = audioContext;
    audioSourceRef.current = source;
    analyserRef.current = analyser;
  }, []);

  const playAudio = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    try {
      ensureAudioGraph();

      if (audioContextRef.current?.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      audio.volume = volume;
      await audio.play();
      setIsAudioPlaying(true);
      setIsAudioBlocked(false);
    } catch {
      setIsAudioPlaying(false);
      setIsAudioBlocked(true);
    }
  }, [ensureAudioGraph, volume]);

  playAudioRef.current = playAudio;

  const pauseAudio = useCallback(() => {
    audioRef.current?.pause();
    setIsAudioPlaying(false);
    setIsAudioBlocked(false);
  }, []);

  const updateAudioPreference = useCallback((nextVolume: number, nextShouldPlay: boolean) => {
    const safeVolume = clampAudioVolume(nextVolume);
    setVolume(safeVolume);
    setShouldPlayAudio(nextShouldPlay);
    writeAudioPreferences({ volume: safeVolume, shouldPlay: nextShouldPlay });
  }, []);

  const handleEnterInterface = useCallback(() => {
    setIsBooting(false);

    if (shouldPlayAudio) {
      void playAudio();
    }
  }, [playAudio, shouldPlayAudio]);

  const handleAudioToggle = useCallback(() => {
    if (isAudioPlaying) {
      pauseAudio();
      updateAudioPreference(volume, false);
      return;
    }

    updateAudioPreference(volume, true);
    void playAudio();
  }, [isAudioPlaying, pauseAudio, playAudio, updateAudioPreference, volume]);

  const handleVolumeChange = useCallback(
    (nextVolume: number) => {
      updateAudioPreference(nextVolume, shouldPlayAudio);
    },
    [shouldPlayAudio, updateAudioPreference]
  );

  const handleAudioUpload = useCallback(
    (file: File) => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }

      const url = URL.createObjectURL(file);
      objectUrlRef.current = url;
      setTrackSrc(url);
      setTrackName(file.name);
      updateAudioPreference(volume, true);
    },
    [updateAudioPreference, volume]
  );

  const switchPanel = useCallback((nextPanel: number) => {
    setActivePanel(current => (current === nextPanel ? current : nextPanel));
  }, []);

  const renderPanel = (index: number) => {
    if (index === 0) {
      return (
        <ProfilePanel
          audioRef={audioRef}
          analyserRef={analyserRef}
          isAudioPlaying={isAudioPlaying}
          isAudioBlocked={isAudioBlocked}
          volume={volume}
          trackName={trackName}
          onAudioToggle={handleAudioToggle}
          onVolumeChange={handleVolumeChange}
          onAudioUpload={handleAudioUpload}
          onContact={() => switchPanel(3)}
        />
      );
    }

    if (index === 1) {
      return <ExperiencePanel />;
    }

    if (index === 2) {
      return <ProjectsPanel />;
    }

    return <ContactPanel />;
  };

  return (
    <div className="cyber-root selection:bg-cyber relative flex h-dvh w-screen flex-col overflow-hidden bg-[#050505] text-white selection:text-black">
      <a
        href="#main-content"
        className="focus:bg-cyber sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[10001] focus:px-4 focus:py-2 focus:font-bold focus:text-black"
      >
        Skip to main content
      </a>

      {isBooting && <BiosBooter onEnter={handleEnterInterface} shouldPlayAudio={shouldPlayAudio} />}

      {!isBooting && <NetworkCanvas mouseRef={mouseRef} />}
      <CustomCursor mouseRef={mouseRef} />

      <div
        className="pointer-events-none fixed inset-0 z-30 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.9)_50%)] bg-[length:100%_4px] opacity-[0.04]"
        aria-hidden="true"
      />

      <nav
        id="main-content"
        aria-label="Portfolio sections"
        className={`relative z-20 flex shrink-0 border-b border-white/10 bg-[#050505]/95 xl:hidden ${isBooting ? 'opacity-0' : 'opacity-100'}`}
        role="tablist"
      >
        {PANELS.map((panel, index) => {
          const isActive = activePanel === index;

          return (
            <button
              key={panel.title}
              type="button"
              role="tab"
              onClick={() => switchPanel(index)}
              aria-selected={isActive}
              aria-controls={`panel-${panel.title.toLowerCase()}`}
              className={`flex flex-1 flex-col items-center gap-1 px-2 py-3 font-mono text-[10px] tracking-widest transition-colors sm:flex-row sm:justify-center sm:gap-2 sm:text-xs ${
                isActive
                  ? 'border-cyber bg-cyber/8 text-cyber border-b-2'
                  : 'border-b-2 border-transparent text-white/40 hover:text-white/70'
              }`}
            >
              <span className="text-sm font-bold sm:text-base">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="hidden sm:inline">{panel.title}</span>
            </button>
          );
        })}
      </nav>

      <main
        className={`relative z-10 flex min-h-0 flex-1 flex-col transition-opacity duration-700 xl:flex-row ${
          isBooting ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {PANELS.map((panel, index) => {
          const isActive = activePanel === index;

          return (
            <section
              key={panel.title}
              id={`panel-${panel.title.toLowerCase()}`}
              role="tabpanel"
              aria-label={panel.title}
              className={`group relative min-h-0 overflow-clip border-b border-white/10 bg-[#050505]/88 transition-[flex,background-color] duration-700 xl:border-r xl:border-b-0 ${
                isActive ? 'flex-[7]' : 'hidden flex-[0.7] hover:bg-[#101010]/92 xl:block'
              }`}
            >
              <button
                type="button"
                onClick={() => switchPanel(index)}
                className={`relative z-20 hidden w-full items-center gap-4 px-5 py-4 text-left transition-opacity xl:absolute xl:inset-y-0 xl:left-0 xl:w-20 xl:justify-center xl:px-0 ${
                  isActive ? 'xl:pointer-events-none xl:opacity-0' : 'xl:flex xl:opacity-100'
                }`}
              >
                <span className="min-w-0 xl:absolute xl:top-1/2 xl:left-1/2 xl:w-max xl:-translate-x-1/2 xl:-translate-y-1/2 xl:-rotate-90">
                  <span className="block text-2xl font-black tracking-widest text-white/50 uppercase transition-colors group-hover:text-white">
                    {panel.title}
                  </span>
                  <span className="mt-1 block font-mono text-[10px] tracking-widest text-white/25">
                    {panel.label}
                  </span>
                </span>
              </button>

              <div
                aria-hidden={!isActive}
                className={`cyber-scrollbar h-full min-h-0 overflow-y-auto px-4 py-5 transition-opacity duration-150 sm:px-7 sm:py-8 lg:px-10 xl:absolute xl:inset-y-0 xl:left-0 xl:w-[76.9vw] xl:px-14 xl:py-12 xl:transition-none ${
                  isActive ? 'opacity-100' : 'pointer-events-none h-0 opacity-0 xl:h-full'
                }`}
              >
                <SectionHeader panelIndex={index} />
                {renderPanel(index)}
              </div>
            </section>
          );
        })}
      </main>

      <SystemStatusBar volume={volume} isPlaying={isAudioPlaying} />
    </div>
  );
}
