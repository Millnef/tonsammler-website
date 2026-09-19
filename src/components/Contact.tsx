type IconProps = {
  className?: string;
};

function InstagramIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SpotifyIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <circle cx="12" cy="12" r="9.2" />
      <path d="M7 15.2c3-1 7-.6 9.3.9M7.3 12c3.4-1.1 7.6-.7 9.9.8M7.6 8.7c3.9-1.1 8.4-.7 10.8 1" />
    </svg>
  );
}

function SoundCloudIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <path d="M2 15v3M5 13v5M8 11v7M11 13v5M14 9c1-1 2-1.5 3.5-1.5 3 0 5.5 2.3 5.5 5.5 0 .3 0 .7-.1 1H8V9.2c.6-.4 1.3-.6 2-.6" />
    </svg>
  );
}

function YouTubeIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="3" />
      <path d="M10.5 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

const SOCIALS = [
  {
    icon: InstagramIcon,
    href: "https://www.instagram.com/ton.sammler/",
    label: "Instagram",
  },
  {
    icon: SpotifyIcon,
    href: null,
    label: "Spotify (coming soon)",
  },
  {
    icon: SoundCloudIcon,
    href: "https://soundcloud.com/tonsammlermusic",
    label: "SoundCloud",
  },
  {
    icon: YouTubeIcon,
    href: "https://www.youtube.com/@TONSAMMLER",
    label: "YouTube",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="w-full scroll-mt-24 px-6 pb-32 pt-48 sm:scroll-mt-0 sm:px-10 sm:pb-40 sm:pt-64"
    >
      <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-extralight tracking-tight">
        BOOKING
      </h2>

      <p className="mt-1 max-w-xl text-lg font-light text-foreground/70 sm:text-xl">
        Let&apos;s create something together.
      </p>

      <a
        href="mailto:tonsammlermusic@gmail.com"
        className="mt-20 inline-block text-xl font-medium text-accent sm:text-2xl"
      >
        tonsammlermusic@gmail.com
      </a>

      <a
        href="tel:+4915110468852"
        className="mt-2 block text-xl font-medium text-accent sm:text-2xl"
      >
        +49 151 10468852
      </a>

      <div className="mt-16 flex flex-wrap gap-6">
        {SOCIALS.map((social) => {
          const Icon = social.icon;

          if (!social.href) {
            return (
              <span
                key={social.label}
                aria-label={social.label}
                className="flex h-13 w-13 items-center justify-center text-foreground/25 sm:h-16 sm:w-16"
              >
                <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
              </span>
            );
          }

          return (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="flex h-13 w-13 items-center justify-center text-foreground/70 sm:h-16 sm:w-16"
            >
              <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
            </a>
          );
        })}
      </div>
    </section>
  );
}
