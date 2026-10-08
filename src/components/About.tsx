"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";
import {
  LINE_CLASSES,
  useHeadlineLines,
  type HeadlineLineSpec,
} from "@/lib/headline-lines";

// Last "T": top-right corner → right edge
const HEADING_LINES: HeadlineLineSpec[] = [
  { char: 4, anchor: "top-right", direction: "right" },
];

const TEXT_BLOCK_CLASSES = {
  first:
    "mt-4 max-w-2xl whitespace-pre-line text-base font-light leading-relaxed text-foreground/70 sm:text-lg",
  rest:
    "mt-6 max-w-2xl whitespace-pre-line text-base font-light leading-relaxed text-foreground/70 sm:text-lg",
  // first paragraph of the second column: aligned with the first column from sm up
  columnStart:
    "mt-6 max-w-2xl whitespace-pre-line text-base font-light leading-relaxed text-foreground/70 sm:mt-4 sm:text-lg",
};

const EASE_OUT = "easeOut";

type Topic = "tonsammler" | "events";
type Lang = "de" | "en";

const TOPICS: { key: Topic; label: string }[] = [
  { key: "tonsammler", label: "Tonsammler" },
  { key: "events", label: "Event Management" },
];

const STATS = [
  { value: 3, suffix: "", label: "Jahre aktiv" },
  { value: 2, suffix: "", label: "Jahre Mitgründer – IMPEDANZ Kollektiv" },
  { value: 60, suffix: "+", label: "Gigs gespielt" },
  { value: 10, suffix: "", label: "Veranstaltungen" },
];

const TEXT: Record<Topic, Record<Lang, string[]>> = {
  tonsammler: {
    de: [
      "Aufgewachsen zwischen Augsburg und München, zieht sich elektronische Musik seit 10 Jahren durch mein Leben. Angefangen mit Techno zwischen 125 BPM und 130 BPM, viel Bass und so minimalen Veränderungen, dass meine Freunde in der 6. Klasse dachten, ich höre 2 Stunden lang das Gleiche.",
      "Danach wurde es kurzzeitig schnell: Hardtechno und Schranz, bis zu 180 BPM.",
      "Irgendwann kam der Punkt, an dem ich realisierte, dass es nicht um schneller und härter, sondern um tiefer und reduzierter geht.",
      "Sets und Tracks, die sich Zeit nehmen, damit man sich fallen lassen kann.\nBei denen man Gedanken noch wahrnehmen und im gleichen Zug fließen lassen kann. Die Raum für Interpretation lassen.\nMusik, bei der ich mehr fühle, wenn ich meine Augen zumache.",
      "Gleichzeitig geht es weiterhin um Energielevels, die ich erreichen und weitergeben will. Nur eben auf eine andere, natürlichere Art.",
      "Diese Gefühlsmischung versuche ich mit allen meinen Releases, Sets und Veranstaltungen einzufangen.",
      "Mit IMPEDANZ hatte ich unter anderem auf 10 unserer eigenen Veranstaltungen die Ehre, Menschen meinen Sound näherzubringen, ihnen genau diese Gefühlsmischung zu vermitteln und sie vielleicht ein Stück weit nachhaltig positiv zu beeinflussen.",
      "Trotz meiner Erfahrung als DJ und Veranstalter stehe ich mit meinen 23 Jahren als Künstler erst am Anfang und freue mich unglaublich auf das, was noch kommt.",
    ],
    en: [
      "I grew up between Augsburg and Munich, and electronic music has been part of my life for 10 years now. It started with techno between 125 and 130 BPM, a lot of bass, and changes so minimal that my friends in 6th grade thought I was listening to the same thing for two hours straight.",
      "After that, things got fast for a while: hardtechno and Schranz, up to 180 BPM.",
      "At some point I realized that it's not about faster and harder, but about deeper and more reduced.",
      "Sets and tracks that take their time, so you can let yourself fall. Where you can still notice your thoughts while letting them flow at the same time. That leave room for interpretation. Music where I feel more when I close my eyes.",
      "At the same time, it's still about energy levels that I want to reach and pass on, just in a different, more natural way.",
      "I try to capture this mix of emotions in all my releases, sets, and events.",
      "Among other things, with IMPEDANZ I've had the privilege, at 10 of our own events, of bringing people closer to my sound, conveying exactly this mix of emotions to them, and maybe even leaving a lasting positive impact on them.",
      "Despite my experience as a DJ and event organizer, at 23 I'm only at the beginning as an artist, and I'm incredibly excited for what's still to come.",
    ],
  },
  events: {
    de: [
      "Mit IMPEDANZ habe ich als eines von drei Mitgliedern zehn Events in Augsburg organisiert. Dabei hatten wir die Verantwortung für Konzept, Organisation, Booking, Design, Promotion und Social Media.",
      "Jeder Abend folgt dabei einer klaren Linie mit einem roten Faden, der sich durch die Nacht zieht, getragen von Acts, die wir genau dafür auswählen. DJs, die wissen, wann sie auf Play drücken.",
      "Im Mittelpunkt stehen aber weder wir noch das Line-up. Unser Hauptaugenmerk liegt auf den Besuchern selbst. Die Community um IMPEDANZ formt jede Veranstaltung und macht uns zu dem, was wir sind.",
      "Mehr zu allen vergangenen Events findest du auf Instagram unter @impedanz.kollektiv.",
    ],
    en: [
      "As one of three members of IMPEDANZ, I've organized ten events in Augsburg. We were responsible for concept, organization, booking, design, promotion, and social media.",
      "Every night follows a clear line, with a common thread running through it, carried by acts we choose specifically for that. DJs who know when to press play.",
      "At the center, though, are neither us nor the line-up. Our main focus is on the guests themselves. The community around IMPEDANZ shapes every event and makes us who we are.",
      "You can find more about all of our past events on Instagram at @impedanz.kollektiv.",
    ],
  },
};

// Paragraph index where the second column starts (from sm up)
const COLUMN_SPLIT: Partial<Record<Topic, number>> = { tonsammler: 4 };

function Paragraphs({
  paragraphs,
  columnStart = false,
}: {
  paragraphs: string[];
  columnStart?: boolean;
}) {
  return paragraphs.map((text, index) => (
    <p
      key={index}
      className={
        index > 0
          ? TEXT_BLOCK_CLASSES.rest
          : columnStart
            ? TEXT_BLOCK_CLASSES.columnStart
            : TEXT_BLOCK_CLASSES.first
      }
    >
      {text}
    </p>
  ));
}

function TextBlock({ topic, lang }: { topic: Topic; lang: Lang }) {
  const paragraphs = TEXT[topic][lang];
  const split = COLUMN_SPLIT[topic];
  if (split === undefined) return <Paragraphs paragraphs={paragraphs} />;

  return (
    <div className="sm:grid sm:grid-cols-[repeat(2,minmax(0,42rem))] sm:gap-x-16">
      <div>
        <Paragraphs paragraphs={paragraphs.slice(0, split)} />
      </div>
      <div>
        <Paragraphs paragraphs={paragraphs.slice(split)} columnStart />
      </div>
    </div>
  );
}

export default function About() {
  const [lang, setLang] = useState<Lang>("de");
  const [topic, setTopic] = useState<Topic>("tonsammler");
  const [textHeight, setTextHeight] = useState<number>();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const textGridRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statValueRefs = useRef<HTMLDivElement[]>([]);
  const desktopImageRef = useRef<HTMLDivElement>(null);
  const mobileImageRef = useRef<HTMLDivElement>(null);
  const { refs: lineRefs } = useHeadlineLines(headingRef, HEADING_LINES);

  // The grid holds both languages of the current topic, so it is always as tall as the
  // longer one; its height drives the animated wrapper when the topic changes
  useEffect(() => {
    const grid = textGridRef.current;
    if (!grid) return;

    const observer = new ResizeObserver(() => setTextHeight(grid.offsetHeight));
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      const elements = [headingRef.current, textRef.current, statsRef.current];
      const lines = lineRefs.map((ref) => ref.current);
      gsap.set(elements, { opacity: 0, y: 75 });
      gsap.set(lines, { scaleX: 0 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            stagger: 0.09,
          });

          gsap.to(lines, { scaleX: 1, duration: 0.8, ease: "power2.out" });

          STATS.forEach((stat, index) => {
            const el = statValueRefs.current[index];
            if (!el) return;

            const counter = { val: 0 };
            gsap.to(counter, {
              val: stat.value,
              duration: 2.5,
              ease: "none",
              snap: { val: 1 },
              onUpdate: () => {
                const rounded = Math.round(counter.val);
                const suffix = rounded >= stat.value ? stat.suffix : "";
                el.textContent = `${rounded}${suffix}`;
              },
            });
          });
        },
      });

      const parallax = (target: HTMLDivElement | null, distance: number) => {
        gsap.fromTo(
          target,
          { y: -distance },
          {
            y: distance,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      };

      parallax(desktopImageRef.current, 75);
      parallax(mobileImageRef.current, 60);
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-10 w-full overflow-x-clip scroll-mt-24 px-6 pt-[25px] pb-[400px] sm:scroll-mt-20 sm:px-10"
    >
      <div
        aria-hidden="true"
        className="absolute right-0 bottom-0 hidden h-[1377px] w-[70%] overflow-hidden sm:block"
        style={{
          maskImage:
            "radial-gradient(ellipse 62% 24% at 78% 80%, black 15%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 62% 24% at 78% 80%, black 15%, transparent 85%)",
        }}
      >
        <div ref={desktopImageRef} className="absolute inset-0 will-change-transform">
          <Image
            src="/images/about-photo.jpg"
            alt="TONSAMMLER live, CDJ im Vordergrund"
            fill
            sizes="50vw"
            className="origin-[78%_71%] scale-120 object-contain object-right-bottom"
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute right-0 top-[360px] h-[75vh] w-3/4 overflow-hidden sm:hidden"
        style={{
          maskImage:
            "radial-gradient(ellipse 70% 55% at 100% 50%, black 15%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 55% at 100% 50%, black 15%, transparent 85%)",
        }}
      >
        <div ref={mobileImageRef} className="absolute inset-0 will-change-transform">
          <Image
            src="/images/about-photo.jpg"
            alt="TONSAMMLER live, CDJ im Vordergrund"
            fill
            sizes="75vw"
            className="origin-right scale-120 object-cover object-right"
          />
        </div>
      </div>

      <div className="relative z-10">
        <SectionHeading
          ref={headingRef}
          lines={lineRefs.map((ref, i) => (
            <span key={i} ref={ref} aria-hidden="true" className={LINE_CLASSES} />
          ))}
        >
          ABOUT
        </SectionHeading>

        <div className="mt-8 flex w-fit max-w-full overflow-x-auto rounded-full border border-white/10 bg-white/[0.03] p-1">
          {TOPICS.map((item) => {
            const isActive = topic === item.key;

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setTopic(item.key)}
                aria-pressed={isActive}
                className="relative shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium uppercase tracking-[0.15em] max-[375px]:px-2 max-[375px]:text-[11px] max-[375px]:tracking-[0.1em] sm:px-5"
              >
                {isActive && (
                  <motion.span
                    layoutId="about-topic-pill"
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
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setLang((prev) => (prev === "de" ? "en" : "de"))}
          className="mt-8 origin-left text-xs font-medium uppercase tracking-[0.15em] text-accent transition-transform duration-200 ease-out hover:scale-105"
        >
          {lang === "de" ? "EN" : "DE"}
        </button>

        <div ref={textRef}>
          <motion.div
            className="overflow-hidden"
            initial={false}
            animate={textHeight === undefined ? undefined : { height: textHeight }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            onAnimationComplete={() => ScrollTrigger.refresh()}
          >
            <div ref={textGridRef} className="relative grid">
              {(["de", "en"] as const).map((sizerLang) => (
                <div
                  key={sizerLang}
                  aria-hidden="true"
                  className="invisible col-start-1 row-start-1"
                >
                  <TextBlock topic={topic} lang={sizerLang} />
                </div>
              ))}

              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={`${topic}-${lang}`}
                  initial={{ opacity: 0, x: "100%" }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: "-100%" }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                  className="col-start-1 row-start-1"
                >
                  <TextBlock topic={topic} lang={lang} />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <div ref={statsRef} className="mt-16 flex flex-wrap gap-x-16 gap-y-8">
          {STATS.map((stat, index) => (
            <div key={stat.label}>
              <div
                ref={(el) => {
                  if (el) statValueRefs.current[index] = el;
                }}
                className="text-3xl font-medium sm:text-4xl"
              >
                {stat.value}
                {stat.suffix}
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
