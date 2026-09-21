"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";
import { SoundCloudIcon, YouTubeIcon } from "@/components/icons";

const PLATFORMS = [
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

export default function Sets() {
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
            duration: 0.4,
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
      id="sets"
      className="w-full scroll-mt-24 px-6 py-32 sm:scroll-mt-0 sm:px-10 sm:py-100"
    >
      <SectionHeading>SETS</SectionHeading>

      <div ref={contentRef}>
        <div className="mt-12 divide-y divide-white/10 border-y border-white/10 sm:mt-16">
          {PLATFORMS.map((platform) => {
            const Icon = platform.icon;

            return (
              <a
                key={platform.key}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-5 text-sm font-medium uppercase tracking-[0.15em] text-foreground/70 transition-all duration-200 ease-out hover:scale-105 hover:text-accent"
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

        <div className="mt-12 sm:mx-auto sm:mt-16 sm:w-3/4">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-6">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-foreground/50">
                SoundCloud
              </span>

              <div className="mt-4 w-full">
                <iframe
                  title="TONSAMMLER auf SoundCloud"
                  width="100%"
                  height="300"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay; encrypted-media"
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A1800748860&color=%23ffebb5&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                />
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
              </div>
            </div>

            <div>
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-foreground/50">
                YouTube
              </span>

              <div className="mt-4 aspect-video w-full overflow-hidden border border-white/10">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
