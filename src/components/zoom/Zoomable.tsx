'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

import { CloseIcon } from '../icons';
import styles from './Zoomable.module.css';

interface ZoomableProps {
  /** Full-size image shown in the lightbox. */
  src: string;
  label: string;
  className?: string;
  style?: CSSProperties;
  /** Keeps a hidden slide out of the tab order. */
  disabled?: boolean;
  children: ReactNode;
}

const FADE_MS = 320;

/** A picture that opens full size in a lightbox (zoom-in cursor, Esc or click to close). */
export default function Zoomable({
  src,
  label,
  className = '',
  style,
  disabled,
  children,
}: ZoomableProps) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    trigger.current?.focus({ preventScroll: true });
  }, []);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className={`${styles.trigger} ${className}`}
        style={style}
        aria-label={`放大檢視：${label}`}
        tabIndex={disabled ? -1 : undefined}
        onClick={() => setOpen(true)}
      >
        {children}
      </button>
      {open && <Lightbox src={src} label={label} onClose={close} />}
    </>
  );
}

function Lightbox({ src, label, onClose }: { src: string; label: string; onClose: () => void }) {
  const [shown, setShown] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);
  const timer = useRef(0);

  const dismiss = useCallback(() => {
    setShown(false);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(onClose, FADE_MS);
  }, [onClose]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('is-locked');
    const frame = requestAnimationFrame(() => setShown(true));
    closeButton.current?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dismiss();
      // The close button is the only control inside the dialog.
      if (event.key === 'Tab') {
        event.preventDefault();
        closeButton.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer.current);
      document.removeEventListener('keydown', onKey);
      root.classList.remove('is-locked');
    };
  }, [dismiss]);

  return createPortal(
    <div
      className={`${styles.lightbox} ${shown ? styles.open : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={dismiss}
    >
      {/* Plain img: the full-size file is shown at its own size. */}
      <img src={src} alt={label} />
      <button ref={closeButton} type="button" className={styles.close} aria-label="Close">
        <CloseIcon />
      </button>
    </div>,
    document.body
  );
}
