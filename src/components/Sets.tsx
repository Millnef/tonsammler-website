"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";

export default function Sets() {
  const sectionRef = useRef<HTMLElement>(null);
  const youtubeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set(youtubeRef.current, { opacity: 0, y: 30 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.to(youtubeRef.current, {
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

      <div className="mt-12 border-y border-white/10 sm:mt-16">
        <a
          href="https://www.youtube.com/@TONSAMMLER"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between py-5 text-sm font-medium uppercase tracking-[0.15em] text-foreground/70 transition-all duration-200 ease-out hover:scale-105 hover:text-accent"
        >
          <span>YouTube</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div ref={youtubeRef} className="mt-12 sm:mt-16">
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
    </section>
  );
}
