import type { ReactNode } from "react";

type IconProps = {
  className?: string;
};

function Icon({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
    >
      {children}
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function SpotifyIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="9.2" />
      <path d="M7 15.2c3-1 7-.6 9.3.9M7.3 12c3.4-1.1 7.6-.7 9.9.8M7.6 8.7c3.9-1.1 8.4-.7 10.8 1" />
    </Icon>
  );
}

export function SoundCloudIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M2 15v3M5 13v5M8 11v7M11 13v5M14 9c1-1 2-1.5 3.5-1.5 3 0 5.5 2.3 5.5 5.5 0 .3 0 .7-.1 1H8V9.2c.6-.4 1.3-.6 2-.6" />
    </Icon>
  );
}

export function YouTubeIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="3" />
      <path d="M10.5 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none" />
    </Icon>
  );
}
