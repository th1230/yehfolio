import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export function GitHubIcon(props: IconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 17 17"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M8.5 0a8.5 8.5 0 0 0-2.7 16.6c.4.1.6-.2.6-.4v-1.5c-2.4.5-2.9-1.1-2.9-1.1-.4-1-1-1.3-1-1.3-.8-.5.1-.5.1-.5.9.1 1.3.9 1.3.9.8 1.3 2 .9 2.5.7.1-.6.3-1 .6-1.2-1.9-.2-3.9-1-3.9-4.2 0-.9.3-1.7.9-2.3-.1-.2-.4-1 .1-2.2 0 0 .7-.2 2.3.9.7-.2 1.4-.3 2.1-.3.7 0 1.4.1 2.1.3 1.6-1.1 2.3-.9 2.3-.9.5 1.2.2 2 .1 2.2.6.6.9 1.4.9 2.3 0 3.2-2 4-3.9 4.2.3.3.6.8.6 1.6v2.4c0 .2.2.5.6.4A8.5 8.5 0 0 0 8.5 0z" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M17 0H3a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3zM6 17H3V8h3v9zM4.5 6.3a1.7 1.7 0 1 1 0-3.5 1.7 1.7 0 0 1 0 3.5zM17 17h-3v-4.6c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4V17h-3V8h2.9v1.2c.4-.8 1.4-1.5 2.8-1.5 3 0 3.6 2 3.6 4.6V17z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg
      width="21"
      height="16"
      viewBox="0 0 21 16"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M19 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h17a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-.4 2.5-8.1 5.7L2.4 2.5h16.2zM2 14V4.4l8.5 6 8.5-6V14H2z" />
    </svg>
  );
}

/** Short arrow used inside pill buttons. */
export function ButtonArrow({ strokeWidth = 1.5, ...props }: IconProps) {
  return (
    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true" {...props}>
      <path d="M0 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  );
}

/** Long thin arrow after text links (View All, More About Me); `short` is the 20px tablet/phone one. */
export function LinkArrow({ short = false, ...props }: IconProps & { short?: boolean }) {
  return short ? (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" aria-hidden="true" {...props}>
      <path d="M0 5h18M14 1l4 4-4 4" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  ) : (
    <svg width="22" height="10" viewBox="0 0 22 10" fill="none" aria-hidden="true" {...props}>
      <path d="M0 5h20M16 1l4 4-4 4" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

/** Arrow inside the round card buttons. */
export function CircleArrow(props: IconProps) {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true" {...props}>
      <path d="M1 6h13M9.5 1.5 14 6l-4.5 4.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function BackArrow(props: IconProps) {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" aria-hidden="true" {...props}>
      <path d="M20 5H2M6 1 2 5l4 4" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M3 3l10 10M13 3 3 13"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

const skillPaths = {
  frontend: (
    <>
      <path d="M8 28 C10 18 16 9 27 5 C27 16 21 24 11 26" />
      <path d="M8 28 L19 15" />
      <path d="M13 22 L17 23 M16 18 L21 19 M19 13 L24 14" />
    </>
  ),
  backend: (
    <>
      <path d="M9 23 C4 23 4 16 9 15.5 C9.5 10 16 8 19 12 C21 9.5 27 10.5 26.5 16 C31 16.5 30.5 23 26 23 Z" />
      <path d="M17 27 V18 M14 21 L17 18 L20 21" />
    </>
  ),
  'ai-tools': (
    <>
      <path d="M17 2 V7" />
      <circle cx="17" cy="12" r="5" />
      <circle cx="17" cy="12" r="1.6" />
      <path d="M17 17 V21" />
      <path d="M14.5 21 H19.5 V31 L17 29 L14.5 31 Z" />
    </>
  ),
  product: (
    <>
      <path d="M4 16 L30 6 L23 29 L16 20 Z" />
      <path d="M16 20 L30 6" />
      <path d="M16 20 V27 L19.5 23.5" />
    </>
  ),
};

export function SkillIcon({
  name,
  strokeWidth = 1.3,
  ...props
}: IconProps & { name: keyof typeof skillPaths }) {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      stroke="#2E7CA6"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {skillPaths[name]}
    </svg>
  );
}
