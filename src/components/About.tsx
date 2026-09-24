"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";

const TEXT_BLOCK_CLASSES = {
  first:
    "mt-4 max-w-2xl whitespace-pre-line text-base font-light leading-relaxed text-foreground/70 sm:text-lg",
  rest:
    "mt-6 max-w-2xl whitespace-pre-line text-base font-light leading-relaxed text-foreground/70 sm:text-lg",
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
      "Aufgewachsen zwischen Augsburg und München, zieht sich elektronische Musik seit 10 Jahren durch mein Leben, angefangen mit Techno zwischen 125 BPM und 130 BPM, extrem tiefen Bässen und so minimalistischen Veränderungen, dass meine Mitschüler in der 6. Klasse dachten, ich höre 2 Stunden lang das Gleiche.",
      "Danach wurde es schnell, Hardtechno und Schranz mit bis zu 180 BPM.",
      "Bei mir kam irgendwann die Realisation, dass es nicht um schneller und härter, sondern um tiefer und breiter geht, mehr Raum für Interpretation, Space zum sich fallen lassen, Gedanken noch wahrnehmen können und im gleichen Zug fließen lassen, meine Augen schließen können.\nGleichzeitig geht es natürlich weiterhin um Energielevels, die ich erreichen und geben will.",
      "Diese Gefühlsmischung versuche ich mit allen meinen Releases, Sets und Veranstaltungen einzufangen.",
      "Ich habe in meinem Leben schon viele Leute von der Musik überzeugt, auch die, die Techno für „zu monoton“ gehalten haben. Jeder von ihnen ist heute, auch ein bisschen wegen der Musik, ein anderer Mensch.",
      "Unter anderem hatte ich mit IMPEDANZ auf 10 unserer eigenen Veranstaltungen die Ehre, Menschen meinen Sound näher zu bringen, ihnen genau diese Gefühlsmischung zu vermitteln und sie vielleicht ein Stück weit nachhaltig positiv zu beeinflussen.",
      "Ich höre zwar schon lange diese Musik, stehe aber dennoch erst am Anfang dieses Abschnitts. Ich freue mich auf das, was noch kommt.",
    ],
    en: [
      "Growing up between Augsburg and Munich, electronic music has run through my life for 10 years now — starting with techno between 125 and 130 BPM, extremely deep basslines, and changes so minimal that my classmates in 6th grade thought I was listening to the same track for two hours straight.",
      "After that it got fast — hardtechno and Schranz, up to 180 BPM.",
      "At some point I realized it's not about faster and harder, but about deeper and wider — more room for interpretation, space to let go, to still be aware of your thoughts while letting them flow at the same time, to be able to close your eyes.",
      "At the same time, it's of course still about the energy levels I want to reach — and to give.",
      "I try to capture this mix of emotions in every one of my releases, sets, and events.",
      "Over the years, I've won a lot of people over to this music — even those who thought techno was \"too monotonous.\" Every one of them is, at least partly because of the music, a different person today.",
      "With IMPEDANZ, I've had the privilege of introducing people to my sound at 10 of our own events — passing on this exact mix of emotions, and maybe leaving a lasting, positive mark on some of them along the way.",
      "I've been listening to this music for a long time, but I'm still only at the beginning of this chapter. I'm looking forward to what's still to come.",
    ],
  },
  events: {
    de: [
      "Ich habe mit IMPEDANZ, als eines von drei Mitgliedern, über 10 Events organisiert. Wir haben dabei die Verantwortung für Management, Designs, Bookings und Gestaltung übernommen. Nähere Infos zu allen unseren vergangenen Events findest du auf Instagram @impedanz.kollektiv.",
    ],
    en: [
      "As one of three members of IMPEDANZ, I've organized over 10 events. Together, we took on the responsibility for management, design, bookings, and overall creative direction. For more details on all our past events, check out Instagram @impedanz.kollektiv.",
    ],
  },
};

function Paragraphs({ paragraphs }: { paragraphs: string[] }) {
  return paragraphs.map((text, index) => (
    <p
      key={index}
      className={index === 0 ? TEXT_BLOCK_CLASSES.first : TEXT_BLOCK_CLASSES.rest}
    >
      {text}
    </p>
  ));
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
      gsap.set(elements, { opacity: 0, y: 75 });

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
      className="relative z-10 w-full scroll-mt-24 px-6 pt-[25px] pb-[400px] sm:scroll-mt-20 sm:px-10"
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
        <SectionHeading ref={headingRef}>ABOUT</SectionHeading>

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
                  <Paragraphs paragraphs={TEXT[topic][sizerLang]} />
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
                  <Paragraphs paragraphs={TEXT[topic][lang]} />
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
