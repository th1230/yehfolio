'use client';

import { useMenu } from './MenuContext';

/** Round hamburger button; only shown below 1280px. */
export default function MenuButton({ className }: { className: string }) {
  const { open, setOpen } = useMenu();
  return (
    <button
      type="button"
      className={className}
      aria-label="Open menu"
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls="site-menu"
      onClick={() => setOpen(true)}
    >
      <i />
      <i />
    </button>
  );
}
