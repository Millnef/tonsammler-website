"use client";

import { useRef, useState, type Ref } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";
import {
  LINE_CLASSES,
  useHeadlineLines,
  type HeadlineLineSpec,
} from "@/lib/headline-lines";
import {
  BandcampIcon,
  InstagramIcon,
  SpotifyIcon,
  SoundCloudIcon,
  YouTubeIcon,
} from "@/components/icons";

const EMAIL = "tonsammlermusic@gmail.com";
const PHONE = "+49 151 10468852";
const PHONE_HREF = "tel:+4915110468852";
const EASE_OUT = "easeOut";

const VIDEO_SRC = "/videos/contact-background.mp4";

// Mobile: right edge, vertically centred, gone within 50% of the width.
// Desktop: bottom-right corner (90% wide), fading out towards the middle of the screen.
const VIDEO_LAYER_CLASSES =
  "pointer-events-none absolute inset-0 z-0 [mask-image:radial-gradient(ellipse_50%_45%_at_100%_50%,black_20%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_50%_45%_at_100%_50%,black_20%,transparent_100%)] sm:left-auto sm:w-[90%] sm:[mask-image:radial-gradient(ellipse_100%_100%_at_100%_100%,black_25%,transparent_80%)] sm:[-webkit-mask-image:radial-gradient(ellipse_100%_100%_at_100%_100%,black_25%,transparent_80%)]";

const LABEL_CLASSES = "text-sm font-light text-foreground sm:text-base";

// leading + bottom padding keep descenders visible, also at hover scale;
// below 375px the size follows the viewport so the e-mail never gets cut off
const VALUE_CLASSES =
  "block w-fit origin-center whitespace-nowrap pb-[0.25em] text-[clamp(1.5rem,4.5vw,3.5rem)] font-extralight leading-[1.35] tracking-tight text-accent transition-transform duration-200 ease-out hover:scale-105 max-[375px]:text-[6.4vw]";

const SOCIALS = [
  {
    icon: InstagramIcon,
    href: "https://www.instagram.com/ton.sammler/",
    label: "Instagram",
  },
  {
    icon: SoundCloudIcon,
    href: "https://soundcloud.com/tonsammlermusic",
    label: "SoundCloud",
  },
  {
    icon: YouTubeIcon,
    href: "https://www.youtube.com/@TONSAMMLER",
    label: "YouTube",
  },
  {
    icon: SpotifyIcon,
    href: "https://open.spotify.com/artist/1duyw9D875T8M1v7VaoPep",
    label: "Spotify",
  },
  {
    icon: BandcampIcon,
    href: "https://tonsammler.bandcamp.com",
    label: "Bandcamp",
  },
];

function CopyValue({
  value,
  href,
  valueRef,
}: {
  value: string;
  href: string;
  valueRef?: Ref<HTMLAnchorElement>;
}) {
  const [copied, setCopied] = useState(false);

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      window.location.href = href;
    }
  };

  return (
    <div className="relative mt-2 w-fit">
      <a ref={valueRef} href={href} onClick={handleClick} className={VALUE_CLASSES}>
        {value}
      </a>

      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="absolute left-0 top-full whitespace-nowrap rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-black sm:left-full sm:top-1/2 sm:-translate-y-1/2 sm:ml-8 sm:px-4 sm:py-1.5 sm:text-xs sm:tracking-[0.15em]"
          >
            Kopiert!
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

// Last "T": top-right corner → right edge
const HEADING_LINES: HeadlineLineSpec[] = [
  { char: 6, anchor: "top-right", direction: "right" },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const blocksRef = useRef<HTMLDivElement>(null);
  const { refs: lineRefs } = useHeadlineLines(headingRef, HEADING_LINES);

  useGSAP(
    () => {
      const blocks = blocksRef.current ? [...blocksRef.current.children] : [];
      const lines = lineRefs.map((ref) => ref.current);
      gsap.set(emailRef.current, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(blocks, { opacity: 0, y: 75 });
      gsap.set(lines, { scaleX: 0 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();

          tl.to(blocks, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            stagger: 0.09,
          });

          tl.to(
            emailRef.current,
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 0.55,
              ease: "power2.out",
              clearProps: "clipPath",
            },
            0.15
          );

          tl.to(lines, { scaleX: 1, duration: 0.8, ease: "power2.out" }, 0);
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex min-h-[450px] w-full scroll-mt-24 flex-col overflow-hidden px-6 pt-[25px] pb-[63px] sm:min-h-[650px] sm:scroll-mt-20 sm:px-10 sm:pt-[72px] sm:pb-[60px]"
    >
      <div aria-hidden="true" className={VIDEO_LAYER_CLASSES}>
        <video
          src={VIDEO_SRC}
          poster="/videos/contact-background-poster.jpg"
          muted
          loop
          autoPlay
          playsInline
          preload="auto"
          className="h-full w-full object-cover object-right sm:object-right-bottom"
        />
      </div>

      <div className="relative z-10">
        <SectionHeading
          ref={headingRef}
          lines={lineRefs.map((ref, i) => (
            <span key={i} ref={ref} aria-hidden="true" className={LINE_CLASSES} />
          ))}
        >
          CONTACT
        </SectionHeading>

        <p className="mt-1 max-w-xl text-lg font-light text-foreground/70 sm:text-xl">
          Let&apos;s create something together.
        </p>
      </div>

      <div
        ref={blocksRef}
        className="relative z-10 mt-12 flex flex-1 flex-col justify-center gap-10 sm:mt-16 sm:justify-end sm:gap-12"
      >
        <div>
          <h3 className={LABEL_CLASSES}>E-Mail</h3>
          <CopyValue value={EMAIL} href={`mailto:${EMAIL}`} valueRef={emailRef} />
        </div>

        <div>
          <h3 className={LABEL_CLASSES}>Mobil</h3>
          <CopyValue value={PHONE} href={PHONE_HREF} />
        </div>

        <div>
          <h3 className={LABEL_CLASSES}>Social Media</h3>

          {/* negative margin aligns the first glyph (centred in its hit area) with the label;
              the tighter mobile gap keeps all five icons in one row down to 360px */}
          <div className="mt-2 -ml-3.5 flex flex-wrap gap-4 sm:-ml-4.5 sm:gap-6">
            {SOCIALS.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-13 w-13 origin-left items-center justify-center text-foreground/70 transition-all duration-200 ease-out hover:scale-105 hover:text-accent sm:h-16 sm:w-16"
                >
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
