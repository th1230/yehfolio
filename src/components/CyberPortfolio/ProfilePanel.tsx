'use client';

import { useEffect, useMemo, useRef } from 'react';
import {
  FaArrowRight,
  FaExternalLinkAlt,
  FaPause,
  FaPlay,
  FaUpload,
  FaVolumeUp,
} from 'react-icons/fa';

import { AUDIO_SOURCE } from './constants';
import { shouldReduceMotion } from './utils';

import type { RefObject } from 'react';

const CANVAS_GRID_STROKE = 'rgba(204, 255, 0, 0.08)';
const CANVAS_IDLE_BAR_FILL = 'rgba(204, 255, 0, 0.35)';

function AudioDeck({
  audioRef,
  analyserRef,
  isPlaying,
  isBlocked,
  volume,
  trackName,
  onToggle,
  onVolumeChange,
  onUpload,
}: {
  audioRef: RefObject<HTMLAudioElement | null>;
  analyserRef: RefObject<AnalyserNode | null>;
  isPlaying: boolean;
  isBlocked: boolean;
  volume: number;
  trackName: string;
  onToggle: () => void;
  onVolumeChange: (volume: number) => void;
  onUpload: (file: File) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewBars = useMemo(
    () => [18, 34, 28, 52, 43, 67, 32, 56, 41, 74, 51, 36, 61, 24, 46, 33],
    []
  );
  let playbackStatus = 'STANDBY';

  if (isBlocked) {
    playbackStatus = 'CLICK_TO_SYNC';
  } else if (isPlaying) {
    playbackStatus = 'PLAYING';
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context || shouldReduceMotion()) {
      return;
    }

    let frameId = 0;
    let isPageVisible = true;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      if (!isPageVisible) {
        frameId = requestAnimationFrame(draw);
        return;
      }

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const analyser = analyserRef.current;

      context.clearRect(0, 0, width, height);
      context.fillStyle = 'rgba(5, 5, 5, 0.96)';
      context.fillRect(0, 0, width, height);

      context.strokeStyle = CANVAS_GRID_STROKE;
      context.lineWidth = 1;
      for (let x = 0; x < width; x += 28) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }
      for (let y = 0; y < height; y += 24) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }

      if (analyser && isPlaying) {
        const timeData = new Uint8Array(
          new ArrayBuffer(analyser.fftSize)
        ) as Uint8Array<ArrayBuffer>;
        const frequencyData = new Uint8Array(
          new ArrayBuffer(analyser.frequencyBinCount)
        ) as Uint8Array<ArrayBuffer>;

        analyser.getByteTimeDomainData(timeData);
        analyser.getByteFrequencyData(frequencyData);

        context.beginPath();
        context.strokeStyle = 'rgba(204, 255, 0, 0.95)';
        context.lineWidth = 2;

        for (let index = 0; index < timeData.length; index += 1) {
          const x = (index / (timeData.length - 1)) * width;
          const y = (timeData[index] / 255) * height;

          if (index === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        }
        context.stroke();

        const barCount = 32;
        const step = Math.floor(frequencyData.length / barCount);
        const barWidth = width / barCount;
        for (let index = 0; index < barCount; index += 1) {
          const value = frequencyData[index * step] / 255;
          const barHeight = Math.max(4, value * height * 0.5);
          context.fillStyle = `rgba(204, 255, 0, ${0.2 + value * 0.7})`;
          context.fillRect(index * barWidth + 2, height - barHeight, barWidth - 4, barHeight);
        }
      } else {
        const bars = 34;
        const time = performance.now() / 700;
        for (let index = 0; index < bars; index += 1) {
          const wave = Math.sin(index * 0.55 + time) * 0.5 + 0.5;
          const barHeight = 18 + wave * height * 0.42;
          const barWidth = width / bars;
          context.fillStyle = CANVAS_IDLE_BAR_FILL;
          context.fillRect(
            index * barWidth + 3,
            height / 2 - barHeight / 2,
            barWidth - 6,
            barHeight
          );
        }
      }

      frameId = requestAnimationFrame(draw);
    };

    const onVisibilityChange = () => {
      isPageVisible = !document.hidden;
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    resize();
    window.addEventListener('resize', resize);
    draw();

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
    };
  }, [analyserRef, isPlaying]);

  return (
    <div className="space-y-4">
      <div className="border-cyber/35 relative overflow-hidden border bg-black/70 p-4 shadow-[inset_0_0_40px_rgba(204,255,0,0.05)] sm:p-5">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(204,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(204,255,0,0.04)_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="relative z-10 mb-3 flex items-center justify-between gap-4 font-mono text-xs tracking-widest">
          <span className="text-cyber">{isPlaying ? 'LIVE_WAVEFORM' : 'IDLE_WAVEFORM'}</span>
          <span className={isBlocked ? 'text-amber-300' : 'text-white/35'}>{playbackStatus}</span>
        </div>

        <div className="relative">
          <canvas
            ref={canvasRef}
            className="border-cyber/20 relative h-64 w-full border sm:h-80 xl:h-[24rem]"
          />
          <div className="pointer-events-none absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
            <div className="min-w-0">
              <div className="text-cyber font-mono text-lg font-black tracking-widest">
                WAVEFORM_CORE
              </div>
              <div className="mt-1 truncate font-mono text-xs tracking-widest text-white/38">
                {trackName}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onToggle}
            className="border-cyber text-cyber hover:bg-cyber absolute right-5 bottom-5 grid h-12 w-12 place-items-center rounded-full border bg-black/70 shadow-[0_0_18px_rgba(204,255,0,0.18)] transition-colors hover:text-black"
            aria-label={isPlaying ? 'Pause background audio' : 'Play background audio'}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden border border-white/10 bg-black/45 p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs tracking-widest">
          <span className="text-cyber">PREVIEW_SPECTRUM</span>
          <span className="text-white/35">{Math.round(volume * 100)}%</span>
        </div>
        <label className="mb-5 flex items-center gap-3">
          <FaVolumeUp className="text-cyber shrink-0" />
          <input
            type="range"
            min="0"
            max="100"
            value={Math.round(volume * 100)}
            onChange={event => onVolumeChange(Number(event.target.value) / 100)}
            className="audio-range"
            style={{ '--range-fill': `${Math.round(volume * 100)}%` } as React.CSSProperties}
            aria-label="Background audio volume"
          />
        </label>
        <div className="flex h-28 items-end gap-1.5">
          {previewBars.map((height, index) => (
            <span
              key={`${height}-${index}`}
              className="bg-cyber/55 flex-1 shadow-[0_0_16px_rgba(204,255,0,0.22)]"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="hover:border-cyber hover:text-cyber flex items-center gap-2 border border-white/15 px-3 py-2 font-mono text-[10px] tracking-widest text-white/55 transition-colors"
          >
            <FaUpload />
            CHANGE_AUDIO
          </button>
          <span className="border-cyber/25 bg-cyber/5 text-cyber border px-3 py-2 font-mono text-[10px] tracking-widest">
            DEFAULT_LOOP
          </span>
          <span className="border border-white/10 px-3 py-2 font-mono text-[10px] tracking-widest text-white/35">
            USER_PREF_SYNC
          </span>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        className="hidden"
        onChange={event => {
          const file = event.target.files?.[0];
          event.currentTarget.value = '';

          if (file) {
            onUpload(file);
          }
        }}
      />
      <audio ref={audioRef} src={AUDIO_SOURCE} loop preload="auto" />
    </div>
  );
}

export default function ProfilePanel({
  audioRef,
  analyserRef,
  isAudioPlaying,
  isAudioBlocked,
  volume,
  trackName,
  onAudioToggle,
  onVolumeChange,
  onAudioUpload,
  onContact,
}: {
  audioRef: RefObject<HTMLAudioElement | null>;
  analyserRef: RefObject<AnalyserNode | null>;
  isAudioPlaying: boolean;
  isAudioBlocked: boolean;
  volume: number;
  trackName: string;
  onAudioToggle: () => void;
  onVolumeChange: (volume: number) => void;
  onAudioUpload: (file: File) => void;
  onContact: () => void;
}) {
  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] xl:items-center xl:gap-12">
      <div>
        <div className="mb-6 inline-flex items-center gap-3 border border-red-500/35 bg-red-500/10 px-4 py-2 font-mono text-xs tracking-widest text-red-300">
          <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
          PORTFOLIO_INTERFACE_LIVE
        </div>

        <h1 className="text-5xl leading-[0.9] font-black tracking-tight uppercase sm:text-6xl lg:text-7xl">
          <span>Thomas Yeh</span>
          <br />
          <span className="text-transparent" style={{ WebkitTextStroke: '2px var(--color-cyber)' }}>
            Frontend
          </span>
          <br />
          Engineer.
        </h1>

        <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-white/70 sm:text-lg">
          <p>
            我是葉濬宇，主力是 <strong className="text-white">Angular / TypeScript</strong>{' '}
            的前端工程師，做過金融資訊、人事系統、EIP、企業官網、內容平台與 LINE LIFF
            等實務專案，也能用 React、Vue、Next.js、Nuxt.js 完成跨框架產品開發。
          </p>
          <p>
            我擅長把需求拆成可落地的介面、資料流與元件邊界；在既有系統中處理功能擴充、版本升級、表格與列印流程、後台管理、SEO
            細節與上線前收斂。
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {[
            'Angular',
            'TypeScript',
            'RxJS',
            'React / Vue',
            'Next.js / Nuxt.js',
            'SEO',
            'CI/CD',
          ].map(tag => (
            <span
              key={tag}
              className="border-cyber/25 bg-cyber/5 text-cyber border px-3 py-2 font-mono text-xs tracking-widest"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={onContact}
            className="bg-cyber flex items-center gap-3 px-7 py-4 font-bold tracking-widest text-black uppercase transition-colors hover:bg-white"
          >
            Contact Route
            <FaArrowRight />
          </button>
          <a
            href="https://github.com/th1230"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:border-cyber hover:text-cyber flex items-center gap-3 border border-white/15 px-7 py-4 font-bold tracking-widest text-white uppercase transition-colors"
          >
            GitHub
            <FaExternalLinkAlt />
          </a>
        </div>
      </div>

      <AudioDeck
        audioRef={audioRef}
        analyserRef={analyserRef}
        isPlaying={isAudioPlaying}
        isBlocked={isAudioBlocked}
        volume={volume}
        trackName={trackName}
        onToggle={onAudioToggle}
        onVolumeChange={onVolumeChange}
        onUpload={onAudioUpload}
      />
    </div>
  );
}
