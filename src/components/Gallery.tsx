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
// horizontal top cut, up to the end of the Sets content, fading out
const Y_ARM_INSET = 0.012;
const HEADING_LINES: HeadlineLineSpec[] = [
  {
    char: 5,
    direction: "angle",
    start: [0.0404, -0.71],
    angle: -122.96,
    width: 0.0327,
    inset: Y_ARM_INSET,
    until: { elementId: "sets", edge: "contentBottom" },
  },
  {
    char: 5,
    direction: "angle",
    start: [0.6031, -0.71],
    angle: -56.96,
    width: 0.0331,
    inset: Y_ARM_INSET,
    until: { elementId: "sets", edge: "contentBottom" },
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

      <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-12 sm:mt-16 sm:grid-cols-2 sm:gap-x-6">
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
                sizes="(min-width: 640px) 50vw, 100vw"
                className={`object-cover ${item.objectPosition}`}
              />
            </div>

            <div className="mt-4 flex items-start justify-between gap-4">
              <h3
                className={`text-xl font-medium sm:text-2xl ${
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

            <div className="mt-2 flex items-start justify-between gap-4">
              <p
                className={`max-w-[70%] text-sm font-light ${
                  item.description ? "text-foreground/60" : "text-foreground/40"
                }`}
              >
                {item.description ?? "Beschreibung folgt."}
              </p>
              <span
                className={`shrink-0 text-right text-xs font-medium uppercase tracking-[0.15em] ${
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
