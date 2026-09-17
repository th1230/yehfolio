'use client';

import { useEffect, useRef, useState } from 'react';

import {
  CHIME_IMAGE,
  isWebKitOnly,
  listenForGestures,
  loadChimeVideo,
  registerChime,
} from './chimeSound';
import styles from './WindChime.module.css';

interface WindChimeProps {
  /** Positions the chime area on the artboard. */
  className: string;
  /** The Home hero chime carries the sound; the entrance copy stays silent. */
  withSound?: boolean;
}

/**
 * The hanging wind chime: the original 720×1280 transparent video, shown whole and placed so its
 * chime area (x226 y0 394×1114) fills the box. Safari shows the animated AVIF of the same video.
 */
export default function WindChime({ className, withSound = false }: WindChimeProps) {
  const video = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string>();
  const [playing, setPlaying] = useState(false);
  const [useVideo, setUseVideo] = useState(false);

  useEffect(() => {
    listenForGestures();
    if (isWebKitOnly()) return registerSilent(withSound);
    setUseVideo(true);
    let alive = true;
    loadChimeVideo().then(url => alive && setSrc(url));
    return () => {
      alive = false;
    };
  }, [withSound]);

  useEffect(() => {
    const el = video.current;
    if (!el || !src) return;
    el.muted = true;
    el.play().catch(() => undefined);
    return registerChime(el, withSound);
  }, [src, withSound]);

  return (
    <div className={`${styles.box} ${className}`} aria-hidden="true">
      {/* Plain img: the animated AVIF is served as is, never re-encoded. */}
      <img
        className={`${styles.frame} ${playing ? styles.hidden : ''}`}
        src={CHIME_IMAGE}
        alt=""
        decoding="async"
      />
      {useVideo && (
        <video
          ref={video}
          className={`${styles.frame} ${playing ? '' : styles.waiting}`}
          src={src}
          loop
          muted
          playsInline
          autoPlay
          preload="auto"
          disablePictureInPicture
          onPlaying={() => setPlaying(true)}
        />
      )}
    </div>
  );
}

/** Safari: no alpha video, but the sound still follows the Home chime. */
function registerSilent(withSound: boolean) {
  if (!withSound) return undefined;
  const placeholder = document.createElement('video');
  return registerChime(placeholder, true);
}
