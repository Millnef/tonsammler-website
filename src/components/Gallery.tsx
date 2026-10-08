"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";
import {
  FADING_LINE_CLASSES,
  useHeadlineLines,
  type HeadlineLineSpec,
} from "@/lib/headline-lines";

// "Y": both arms continue upwards at their own angle (±57°, measured from the glyph),
// starting just inside the arm so the square line end stays hidden behind its
// horizontal top cut, fading out halfway to the end of the Sets content (or the screen edge)
const Y_ARM_INSET = 0.012;
const Y_ARM_REACH = 0.5;
const HEADING_LINES: HeadlineLineSpec[] = [
  {
    char: 5,
    direction: "angle",
    start: [0.0404, -0.71],
    angle: -122.96,
    width: 0.0327,
    inset: Y_ARM_INSET,
    until: { elementId: "sets", edge: "contentBottom" },
    reach: Y_ARM_REACH,
  },
  {
    char: 5,
    direction: "angle",
    start: [0.6031, -0.71],
    angle: -56.96,
    width: 0.0331,
    inset: Y_ARM_INSET,
    until: { elementId: "sets", edge: "contentBottom" },
    reach: Y_ARM_REACH,
  },
];

const ITEMS = [
  {
    src: "/images/gallery/gallery-event-1.jpg",
    alt: "TONSAMMLER live im YOU LOFT München",
    objectPosition: "object-top",
    title: "YOU LOFT MÜNCHEN",
    description: "Sinister Basslines Kollektiv",
    date: "19.04.2024",
  },
  {
    src: "/images/gallery/gallery-event-karo10.jpg",
    alt: "TONSAMMLER live im KARO10",
    objectPosition: "object-center",
    title: "KARO10",
    description: "Impedanz Kollektiv",
    date: "20.12.2025",
  },
  {
    src: "/images/gallery/gallery-event-3.jpg",
    alt: "TONSAMMLER live, OH BOI",
    objectPosition: "object-center",
    title: "OH BOI",
    description: "8 hour ANL",
    date: "05.12.2025",
  },
  {
    src: "/images/gallery/gallery-event-scopez.jpg",
    alt: "TONSAMMLER live bei Scopez Events",
    objectPosition: "object-top",
    title: "SCOPEZ EVENTS",
    description: "Privat Summer Outdoor",
    date: "02.05.2026",
  },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRefs = useRef<HTMLDivElement[]>([]);
  const { refs: lineRefs } = useHeadlineLines(headingRef, HEADING_LINES);

  useGSAP(
    () => {
      const elements = imageRefs.current.filter(Boolean);
      gsap.set(elements, { opacity: 0, y: 75 });

      // Coupled to the scroll position: the arms grow while the heading moves up
      // from the bottom of the screen to 40% of its height
      gsap.fromTo(
        lineRefs.map((ref) => ref.current),
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top 40%",
            scrub: true,
          },
        }
      );

      ScrollTrigger.batch(elements, {
        start: "top 80%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            stagger: 0.09,
          });
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="w-full overflow-x-clip scroll-mt-24 px-6 pt-[25px] pb-[400px] sm:scroll-mt-20 sm:px-10"
    >
      <SectionHeading
        ref={headingRef}
        lines={lineRefs.map((ref, i) => (
          <span key={i} ref={ref} aria-hidden="true" className={FADING_LINE_CLASSES} />
        ))}
      >
        GALERY
      </SectionHeading>

      {/* Mobile: two cards per row across the full width. From sm: cards at 75% of a
          two-column layout inside the section padding (5rem) with a 1.5rem gap, the grid
          spans the full screen width and spreads the space evenly: screen edge, between
          the cards and screen edge are the same */}
      <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 sm:-mx-10 sm:mt-16 sm:grid-cols-[repeat(2,calc((100%_-_6.5rem)_*_0.375))] sm:justify-evenly sm:gap-x-0">
        {ITEMS.map((item, index) => (
          <div key={item.src}>
            <div
              ref={(el) => {
                if (el) imageRefs.current[index] = el;
              }}
              className="relative aspect-[3/4] overflow-hidden border border-white/10 bg-white/[0.03]"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 640px) 38vw, 50vw"
                className={`object-cover ${item.objectPosition}`}
              />
            </div>

            <div className="mt-3 flex items-start justify-between gap-2 sm:mt-4 sm:gap-4">
              <h3
                className={`text-base font-medium sm:text-2xl ${
                  item.title ? "text-foreground" : "text-foreground/40"
                }`}
              >
                {item.title ?? "Titel folgt"}
              </h3>
              <span
                aria-hidden="true"
                className={item.title ? "text-foreground/50" : "text-foreground/30"}
              >
                ↗
              </span>
            </div>

            {/* Mobile: the date sits under the description, the half-width card is too narrow
                for both side by side */}
            <div className="mt-1 flex flex-col gap-1 sm:mt-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <p
                className={`text-xs font-light sm:max-w-[70%] sm:text-sm ${
                  item.description ? "text-foreground/60" : "text-foreground/40"
                }`}
              >
                {item.description ?? "Beschreibung folgt."}
              </p>
              <span
                className={`shrink-0 text-[10px] font-medium uppercase tracking-[0.15em] sm:text-right sm:text-xs ${
                  item.date ? "text-foreground/40" : "text-foreground/30"
                }`}
              >
                {item.date ?? "Datum folgt"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
