// Sound for the wind chime video. Browsers allow sound only after a user gesture:
// the Enter button, or the first click / key / tap on the page.
// WebKit cannot draw VP9 alpha, so it shows the AVIF and plays the same audio from an m4a.

import { pageLeaveEvent } from '../transition/PageTransition';

const CHIME_VIDEO = '/media/wind-chime.webm';
export const CHIME_IMAGE = '/media/wind-chime.avif';
const CHIME_AUDIO = '/media/wind-chime.m4a';
const FADE_MS = 600;

export const entryStartEvent = 'site:entry-start';

let soundOn = false;
let listening = false;
let fallbackAudio: HTMLAudioElement | null = null;
let fadeTimer = 0;
let videoUrl: Promise<string> | null = null;
/** The chime whose sound plays: the Home hero's. */
let main: HTMLVideoElement | null = null;
const videos = new Set<HTMLVideoElement>();

export function isWebKitOnly() {
  const ua = navigator.userAgent;
  const ios = /iP(hone|ad|od)/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  return ios || /^((?!chrome|chromium|android|crios|fxios|edg).)*safari/i.test(ua);
}

/** The whole file in memory, so each loop restart doesn't wait on a range request. */
export function loadChimeVideo() {
  videoUrl ??= fetch(CHIME_VIDEO)
    .then(res => (res.ok ? res.blob() : Promise.reject(new Error(String(res.status)))))
    .then(blob => URL.createObjectURL(blob))
    .catch(() => CHIME_VIDEO);
  return videoUrl;
}

const master = (): HTMLMediaElement | null => {
  if (!isWebKitOnly()) return main;
  if (!main) return null;
  if (!fallbackAudio) {
    fallbackAudio = new Audio(CHIME_AUDIO);
    fallbackAudio.loop = true;
    fallbackAudio.preload = 'auto';
  }
  return fallbackAudio;
};

function startSound() {
  const media = master();
  if (!media || !soundOn || document.hidden) return;
  window.clearInterval(fadeTimer);
  media.muted = false;
  media.volume = 1;
  media.play().catch((error: unknown) => {
    // Not allowed yet: stay silent until the next gesture.
    if (
      error instanceof DOMException &&
      error.name === 'NotAllowedError' &&
      media instanceof HTMLVideoElement
    ) {
      media.muted = true;
    }
  });
}

function fadeOut() {
  const media = master();
  if (!media || media.muted) return;
  const start = media.volume;
  const began = performance.now();
  window.clearInterval(fadeTimer);
  fadeTimer = window.setInterval(() => {
    const t = Math.min(1, (performance.now() - began) / FADE_MS);
    media.volume = start * (1 - t);
    if (t === 1) {
      window.clearInterval(fadeTimer);
      media.pause();
    }
  }, 30);
}

/** Called from a user gesture (the Enter button, or any click / key / tap): sound may play now. */
export function allowSound() {
  soundOn = true;
  startSound();
}

/** Starts listening for the gesture that allows sound; call as soon as a chime is on the page. */
export function listenForGestures() {
  if (listening) return;
  listening = true;
  const onGesture = allowSound;
  const options = { capture: true, passive: true } as const;
  window.addEventListener('pointerdown', onGesture, options);
  window.addEventListener('keydown', onGesture, options);
  window.addEventListener('touchend', onGesture, options);
  document.addEventListener('visibilitychange', () => {
    const media = master();
    if (document.hidden) {
      media?.pause();
      if (media !== main) main?.pause();
      return;
    }
    videos.forEach(video => video.play().catch(() => undefined));
    startSound();
  });
  document.addEventListener(pageLeaveEvent, fadeOut);
}

/** Registers a chime video; `isMain` marks the one that carries the sound. */
export function registerChime(video: HTMLVideoElement, isMain: boolean) {
  listenForGestures();
  videos.add(video);
  if (isMain) {
    main = video;
    if (fallbackAudio && isWebKitOnly()) fallbackAudio.currentTime = 0;
    startSound();
  }
  const onEntryStart = () => {
    if (!isMain && main) video.currentTime = main.currentTime;
  };
  document.addEventListener(entryStartEvent, onEntryStart);
  return () => {
    videos.delete(video);
    document.removeEventListener(entryStartEvent, onEntryStart);
    if (main === video) {
      main = null;
      fallbackAudio?.pause();
    }
  };
}
