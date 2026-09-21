"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";
import { SpotifyIcon, SoundCloudIcon, YouTubeIcon } from "@/components/icons";

type PlatformKey = "spotify" | "soundcloud" | "youtube";

const PLATFORMS: {
  key: PlatformKey;
  label: string;
  href: string;
  icon: typeof SpotifyIcon;
}[] = [
  { key: "spotify", label: "Spotify", href: "#", icon: SpotifyIcon },
  {
    key: "soundcloud",
    label: "SoundCloud",
    href: "https://soundcloud.com/tonsammlermusic",
    icon: SoundCloudIcon,
  },
  {
    key: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@TONSAMMLER",
    icon: YouTubeIcon,
  },
];

const EASE_OUT = "easeOut";

export default function Releases() {
  const [active, setActive] = useState<PlatformKey>("spotify");
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set(contentRef.current, { opacity: 0, y: 30 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.to(contentRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          });
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="releases"
      className="w-full scroll-mt-24 px-6 py-32 sm:scroll-mt-20 sm:px-10 sm:py-100"
    >
      <SectionHeading>RELEASES</SectionHeading>

      <div ref={contentRef} className="lg:grid lg:grid-cols-[280px_1fr] lg:items-start lg:gap-16">
        <div className="mt-12 divide-y divide-white/10 border-y border-white/10 overflow-hidden sm:mt-16 lg:mt-0">
          {PLATFORMS.map((platform) => {
            const Icon = platform.icon;
            const isPlaceholder = platform.href === "#";

            return (
              <a
                key={platform.key}
                href={platform.href}
                target={isPlaceholder ? undefined : "_blank"}
                rel={isPlaceholder ? undefined : "noopener noreferrer"}
                className="flex origin-left items-center justify-between py-5 text-sm font-medium uppercase tracking-[0.15em] text-foreground/70 transition-all duration-200 ease-out hover:scale-105 hover:text-accent"
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  {platform.label}
                </span>
                <span aria-hidden="true">↗</span>
              </a>
            );
          })}
        </div>

        <div>
          <div className="mt-12 sm:mt-16 lg:mt-0">
          <div className="inline-flex max-w-full overflow-x-auto rounded-full border border-white/10 bg-white/[0.03] p-1">
            {PLATFORMS.map((platform) => {
              const isActive = active === platform.key;

              return (
                <button
                  key={platform.key}
                  type="button"
                  onClick={() => setActive(platform.key)}
                  aria-pressed={isActive}
                  className="relative rounded-full px-3 py-2 text-xs font-medium uppercase tracking-[0.15em] sm:px-5"
                >
                  {isActive && (
                    <motion.span
                      layoutId="releases-active-pill"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={{ duration: 0.3, ease: EASE_OUT }}
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors duration-200 ease-out ${
                      isActive
                        ? "text-black"
                        : "text-foreground/60 hover:text-foreground"
                    }`}
                  >
                    {platform.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 w-full sm:mx-auto sm:mt-16 sm:w-1/2 lg:mx-0 lg:mt-8 lg:w-full">
          <div className="relative aspect-video w-full overflow-hidden border border-white/10">
            <AnimatePresence initial={false}>
              {active === "spotify" && (
                <motion.div
                  key="spotify"
                  className="absolute inset-0"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                >
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-white/[0.03] text-center">
                    <span className="text-sm font-medium uppercase tracking-[0.15em] text-foreground/50">
                      Spotify
                    </span>
                    <span className="text-xs font-light text-foreground/40">
                      Embed folgt
                    </span>
                    <span className="mt-2 text-xs font-medium uppercase tracking-[0.1em] text-accent">
                      Coming soon — 05.10.
                    </span>
                  </div>
                </motion.div>
              )}

              {active === "soundcloud" && (
                <motion.div
                  key="soundcloud"
                  className="absolute inset-0"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                >
                  <iframe
                    title="TONSAMMLER auf SoundCloud"
                    width="100%"
                    height="100%"
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay; encrypted-media"
                    src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A1800748860&color=%23ffebb5&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                    className="h-full w-full"
                  />
                </motion.div>
              )}

              {active === "youtube" && (
                <motion.div
                  key="youtube"
                  className="absolute inset-0"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                >
                  <iframe
                    width="100%"
                    height="100%"
                    className="h-full w-full"
                    src="https://www.youtube.com/embed/qBRBy3EUuRc?si=_VsD10EOSAUlNOHY&start=900"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {active === "soundcloud" && (
            <div
              style={{
                fontSize: "10px",
                color: "#cccccc",
                lineBreak: "anywhere",
                wordBreak: "normal",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                fontFamily:
                  "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif",
                fontWeight: 100,
              }}
              className="mt-2"
            >
              <a
                href="https://soundcloud.com/tonsammlermusic"
                title="tonsammler"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#cccccc", textDecoration: "none" }}
              >
                tonsammler
              </a>{" "}
              ·{" "}
              <a
                href="https://soundcloud.com/tonsammlermusic/carla"
                title="CARLA"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#cccccc", textDecoration: "none" }}
              >
                CARLA
              </a>
            </div>
          )}
        </div>
        </div>
      </div>
    </section>
  );
}
