"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";

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
  const imageRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      const elements = imageRefs.current.filter(Boolean);
      gsap.set(elements, { opacity: 0, y: 40 });

      ScrollTrigger.batch(elements, {
        start: "top 80%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.6,
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
      className="w-full scroll-mt-24 px-6 py-32 sm:scroll-mt-20 sm:px-10 sm:py-50"
    >
      <SectionHeading>GALERY</SectionHeading>

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
