import SectionHeading from "@/components/SectionHeading";
import {
  InstagramIcon,
  SpotifyIcon,
  SoundCloudIcon,
  YouTubeIcon,
} from "@/components/icons";

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

function buildWaveform(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const h =
      0.3 +
      0.35 * Math.abs(Math.sin(i * 0.4)) +
      0.2 * Math.abs(Math.sin(i * 1.9 + 0.6));
    return Math.min(h, 1);
  });
}

const WAVEFORM_BARS = buildWaveform(56);

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full scroll-mt-24 overflow-hidden px-6 py-32 sm:scroll-mt-0 sm:px-10 sm:py-100"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 100% 100% at 100% 100%, #151515 0%, #000000 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-0 w-1/2 opacity-[0.07] sm:w-2/5"
      >
        <svg
          viewBox="0 0 560 240"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          {WAVEFORM_BARS.map((h, i) => {
            const barSlot = 560 / WAVEFORM_BARS.length;
            const barWidth = barSlot * 0.45;
            const x = i * barSlot + (barSlot - barWidth) / 2;
            const barHeight = h * 220;
            const y = (240 - barHeight) / 2;
            return (
              <rect
                key={i}
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill="currentColor"
              />
            );
          })}
        </svg>
      </div>

      <div className="relative z-10">
        <SectionHeading>BOOKING</SectionHeading>

        <p className="mt-1 max-w-xl text-lg font-light text-foreground/70 sm:text-xl">
          Let&apos;s create something together.
        </p>

        <a
          href="mailto:tonsammlermusic@gmail.com"
          className="mt-8 block w-full break-words text-[clamp(2rem,9vw,9rem)] font-extralight leading-[0.88] tracking-tight text-accent sm:mt-12"
        >
          tonsammlermusic
          <br />
          @gmail.com
        </a>

        <a
          href="tel:+4915110468852"
          className="mt-8 block text-xl font-medium text-accent sm:mt-10 sm:text-2xl"
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
      </div>
    </section>
  );
}
