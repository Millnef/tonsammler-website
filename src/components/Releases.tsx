"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";
import { LINE_CLASSES, useHeadlineLines, type HeadlineLineSpec } from "@/lib/headline-lines";
import {
  BandcampIcon,
  SpotifyIcon,
  SoundCloudIcon,
  YouTubeIcon,
} from "@/components/icons";

type PlatformKey = "spotify" | "soundcloud" | "bandcamp" | "youtube";

const PLATFORMS: {
  key: PlatformKey;
  label: string;
  href: string;
  icon: typeof SpotifyIcon;
}[] = [
  {
    key: "spotify",
    label: "Spotify",
    href: "https://open.spotify.com/artist/1duyw9D875T8M1v7VaoPep",
    icon: SpotifyIcon,
  },
  {
    key: "soundcloud",
    label: "SoundCloud",
    href: "https://soundcloud.com/tonsammlermusic",
    icon: SoundCloudIcon,
  },
  {
    key: "bandcamp",
    label: "Bandcamp",
    href: "https://tonsammler.bandcamp.com/album/i",
    icon: BandcampIcon,
  },
  {
    key: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@TONSAMMLER",
    icon: YouTubeIcon,
  },
];

// Players for the EP "I"; YouTube shows its main track
const EMBEDS: Record<PlatformKey, { title: string; src: string; allow?: string }> = {
  spotify: {
    title: "I von TONSAMMLER auf Spotify",
    src: "https://open.spotify.com/embed/album/4DRPNg4D5uykjGoGmWhm0o?utm_source=generator&theme=0&si=4ed2d71ae6c54168",
    allow: "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",
  },
  soundcloud: {
    title: "I von TONSAMMLER auf SoundCloud",
    src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A2308592472&color=%23242424&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
    allow: "autoplay; encrypted-media",
  },
  bandcamp: {
    title: "I von TONSAMMLER auf Bandcamp",
    src: "https://bandcamp.com/EmbeddedPlayer/album=1577328459/size=large/bgcol=333333/linkcol=ffebb5/tracklist=true/artwork=small/transparent=true/",
  },
  youtube: {
    title: "TONSAMMLER auf YouTube",
    src: "https://www.youtube.com/embed/bCHRygiNuaI?si=AFty3pYyuIYx_3jC&start=345",
    allow:
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
  },
};

const EASE_OUT = "easeOut";

// First "R": bottom-left corner → left edge. "L": from the top of its stem upwards,
// reaching 300px into About's 400px bottom whitespace.
const HEADING_LINES: HeadlineLineSpec[] = [
  { char: 0, anchor: "bottom-left", direction: "left" },
  {
    char: 2,
    anchor: "top-left",
    direction: "up",
    reachAbove: { elementId: "releases", offset: 300 },
  },
];

export default function Releases() {
  const [active, setActive] = useState<PlatformKey>("spotify");
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { refs: lineRefs } = useHeadlineLines(headingRef, HEADING_LINES);

  useGSAP(
    () => {
      const [leftLine, upLine] = lineRefs.map((ref) => ref.current);
      gsap.set(contentRef.current, { opacity: 0, y: 75 });
      gsap.set(leftLine, { scaleX: 0 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.to(contentRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
          });

          gsap.to(leftLine, { scaleX: 1, duration: 0.8, ease: "power2.out" });
        },
      });

      // Coupled to the scroll position over the whole section: grows during the
      // first half, fades out during the second
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
        .fromTo(upLine, { scaleX: 0, opacity: 1 }, { scaleX: 1, ease: "none", duration: 0.5 })
        .to(upLine, { opacity: 0, ease: "none", duration: 0.5 });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="releases"
      className="w-full overflow-x-clip scroll-mt-24 px-6 pt-[25px] pb-[400px] sm:scroll-mt-20 sm:px-10"
    >
      <SectionHeading
        ref={headingRef}
        lines={lineRefs.map((ref, i) => (
          <span
            key={i}
            ref={ref}
            aria-hidden="true"
            className={LINE_CLASSES}
          />
        ))}
      >
        RELEASES
      </SectionHeading>

      <div ref={contentRef} className="lg:grid lg:grid-cols-[280px_1fr] lg:items-start lg:gap-16">
        <div className="mt-12 divide-y divide-white/10 border-y border-white/10 overflow-hidden sm:mt-16 lg:mt-0">
          {PLATFORMS.map((platform) => {
            const Icon = platform.icon;

            return (
              <a
                key={platform.key}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
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
          <div className="mx-auto flex w-fit max-w-full overflow-x-auto rounded-full border border-white/10 bg-white/[0.03] p-1 lg:mx-0">
            {/* Icons instead of labels so four options stay narrow enough for any screen */}
            {PLATFORMS.map((platform) => {
              const Icon = platform.icon;
              const isActive = active === platform.key;

              return (
                <button
                  key={platform.key}
                  type="button"
                  onClick={() => setActive(platform.key)}
                  aria-pressed={isActive}
                  aria-label={platform.label}
                  title={platform.label}
                  className="relative rounded-full px-4 py-2 sm:px-5"
                >
                  {isActive && (
                    <motion.span
                      layoutId="releases-active-pill"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={{ duration: 0.3, ease: EASE_OUT }}
                    />
                  )}
                  <span
                    className={`relative z-10 block transition-colors duration-200 ease-out ${
                      isActive
                        ? "text-black"
                        : "text-foreground/60 hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* One box size for every player: 352px is Spotify's full layout, and at most
            628px wide the YouTube video fills it at 16:9 (+1px border each side) */}
        <div className="mt-12 w-full sm:mx-auto sm:mt-16 sm:w-1/2 lg:mx-0 lg:mt-8 lg:w-3/4 lg:max-w-[628px]">
          <div className="relative h-[354px] w-full overflow-hidden border border-white/10">
            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
              >
                <iframe
                  title={EMBEDS[active].title}
                  src={EMBEDS[active].src}
                  allow={EMBEDS[active].allow}
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="h-full w-full"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* SoundCloud's credit line keeps its space for every player, so switching never
              moves the content below (and the scroll animations stay in place) */}
          <div
            aria-hidden={active !== "soundcloud"}
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
            className={`mt-2 ${active === "soundcloud" ? "" : "invisible"}`}
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
              href="https://soundcloud.com/tonsammlermusic/sets/i"
              title="I"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#cccccc", textDecoration: "none" }}
            >
              I
            </a>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
