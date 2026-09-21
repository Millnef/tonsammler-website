"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";

const STATS = [
  { value: "3", label: "Jahre aktiv" },
  { value: "2", label: "Jahre Mitgründer – IMPEDANZ Kollektiv" },
  { value: "60+", label: "Gigs gespielt" },
  { value: "8", label: "Veranstaltungen" },
];

const TEXT = {
  de: [
    "Aufgewachsen zwischen München und Augsburg zieht sich elektronische Musik seit 10 Jahren unverändert durchs Leben — lange bevor daraus ein eigener Sound wurde. Heute steht der Name für Techno mit minimalistischen Strukturen, gebaut auf Repetition. Jeder Track und jedes Set ist der Versuch, Menschen zu bewegen, physisch wie emotional — „collecting feelings through sound\" ist dabei mehr Haltung als Slogan.",
    "Als Mitgründer des IMPEDANZ Kollektivs gilt die gleiche Aufmerksamkeit, Menschen den Raum, den Musik öffnen kann, zu zeigen.",
  ],
  en: [
    "Growing up between Munich and Augsburg, electronic music has run through life unchanged for 10 years — long before it became a sound of its own. Today the name stands for techno built on minimalist structures and repetition. Every track and every set is an attempt to move people, physically and emotionally — \"collecting feelings through sound\" is more an attitude than a slogan.",
    "As a co-founder of the IMPEDANZ Kollektiv, the same attention goes into showing people the space that music can open up.",
  ],
};

export default function About() {
  const [lang, setLang] = useState<"de" | "en">("de");
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const elements = [headingRef.current, textRef.current, statsRef.current];
      gsap.set(elements, { opacity: 0, y: 30 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.4,
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
      id="about"
      className="relative z-10 w-full scroll-mt-24 overflow-hidden px-6 py-32 sm:scroll-mt-0 sm:px-10 sm:py-100"
    >
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 bottom-0 hidden w-[70%] sm:block"
        style={{
          maskImage:
            "radial-gradient(ellipse 62% 24% at 78% 80%, black 15%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 62% 24% at 78% 80%, black 15%, transparent 85%)",
        }}
      >
        <Image
          src="/images/about-photo.jpg"
          alt="TONSAMMLER live, CDJ im Vordergrund"
          fill
          sizes="50vw"
          className="object-contain object-right-bottom"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute right-0 top-[360px] h-[75vh] w-3/4 sm:hidden"
        style={{
          maskImage:
            "radial-gradient(ellipse 70% 55% at 100% 50%, black 15%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 55% at 100% 50%, black 15%, transparent 85%)",
        }}
      >
        <Image
          src="/images/about-photo.jpg"
          alt="TONSAMMLER live, CDJ im Vordergrund"
          fill
          sizes="75vw"
          className="object-cover object-right"
        />
      </div>

      <div className="relative z-10">
        <SectionHeading ref={headingRef}>ABOUT</SectionHeading>

        <button
          type="button"
          onClick={() => setLang((prev) => (prev === "de" ? "en" : "de"))}
          className="mt-8 text-xs font-medium uppercase tracking-[0.15em] text-accent transition-transform duration-200 ease-out hover:scale-105"
        >
          {lang === "de" ? "EN" : "DE"}
        </button>

        <div ref={textRef}>
          <p className="mt-4 max-w-2xl text-base font-light leading-relaxed text-foreground/70 sm:text-lg">
            {TEXT[lang][0]}
          </p>

          <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-foreground/70 sm:text-lg">
            {TEXT[lang][1]}
          </p>
        </div>

        <div ref={statsRef} className="mt-16 flex flex-wrap gap-x-16 gap-y-8">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-medium sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-2 max-w-[12rem] text-xs font-medium uppercase tracking-[0.15em] text-foreground/60">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
