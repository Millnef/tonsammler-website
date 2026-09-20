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

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative flex min-h-[450px] w-full scroll-mt-24 flex-col overflow-hidden px-6 pt-32 pb-25 sm:min-h-[850px] sm:scroll-mt-0 sm:px-10 sm:pt-50"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 100% 100% at 100% 100%, #151515 0%, #000000 100%)",
        }}
      />

      <div className="relative z-10">
        <SectionHeading>BOOKING</SectionHeading>

        <p className="mt-1 max-w-xl text-lg font-light text-foreground/70 sm:text-xl">
          Let&apos;s create something together.
        </p>
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-center">
        <a
          href="mailto:tonsammlermusic@gmail.com"
          className="block w-fit whitespace-nowrap text-[clamp(1.5rem,4.5vw,3.5rem)] font-extralight leading-[0.88] tracking-tight text-accent"
        >
          tonsammlermusic@gmail.com
        </a>

        <a
          href="tel:+4915110468852"
          className="mt-6 block text-xl font-medium text-accent sm:mt-8 sm:text-2xl"
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
