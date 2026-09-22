"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";
import {
  InstagramIcon,
  SpotifyIcon,
  SoundCloudIcon,
  YouTubeIcon,
} from "@/components/icons";

const EMAIL = "tonsammlermusic@gmail.com";
const EASE_OUT = "easeOut";

const SOCIALS = [
  {
    icon: InstagramIcon,
    href: "https://www.instagram.com/ton.sammler/",
    label: "Instagram",
  },
  {
    icon: SpotifyIcon,
    href: null,
    label: "Spotify (coming soon)",
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
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const phoneRef = useRef<HTMLAnchorElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  const handleEmailClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  useGSAP(
    () => {
      gsap.set(emailRef.current, { clipPath: "inset(0 100% 0 0)" });
      gsap.set([phoneRef.current, socialsRef.current], { opacity: 0, y: 75 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();

          tl.to(emailRef.current, {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.55,
            ease: "power2.out",
            clearProps: "clipPath",
          });

          tl.to(
            [phoneRef.current, socialsRef.current],
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power2.out",
              stagger: 0.09,
            },
            0.15
          );
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex min-h-[450px] w-full scroll-mt-24 flex-col overflow-hidden px-6 pt-[25px] pb-[13px] sm:min-h-[850px] sm:scroll-mt-20 sm:px-10"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 100% 100% at 100% 100%, #151515 0%, #000000 100%)",
        }}
      />

      <div className="relative z-10">
        <SectionHeading>BOOKING</SectionHeading>

        <p className="mt-1 max-w-xl text-lg font-light text-foreground/70 sm:text-xl">
          Let&apos;s create something together.
        </p>
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-center">
        <div className="relative w-fit">
          <a
            ref={emailRef}
            href={`mailto:${EMAIL}`}
            onClick={handleEmailClick}
            className="block w-fit origin-center whitespace-nowrap text-[clamp(1.5rem,4.5vw,3.5rem)] font-extralight leading-[1.35] tracking-tight text-accent transition-transform duration-200 ease-out hover:scale-105 pb-[0.25em]"
          >
            {EMAIL}
          </a>

          <AnimatePresence>
            {copied && (
              <motion.span
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
                className="absolute left-0 top-full whitespace-nowrap rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-black sm:left-full sm:top-1/2 sm:-translate-y-1/2 sm:ml-4 sm:px-4 sm:py-1.5 sm:text-xs sm:tracking-[0.15em]"
              >
                Kopiert!
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <a
          ref={phoneRef}
          href="tel:+4915110468852"
          className="mt-6 block w-fit origin-left text-xl font-medium text-accent transition-transform duration-200 ease-out hover:scale-105 sm:mt-8 sm:text-2xl"
        >
          +49 151 10468852
        </a>

        <div ref={socialsRef} className="mt-16 flex flex-wrap gap-6">
          {SOCIALS.map((social) => {
            const Icon = social.icon;

            if (!social.href) {
              return (
                <span
                  key={social.label}
                  aria-label={social.label}
                  className="flex h-13 w-13 items-center justify-center text-foreground/25 sm:h-16 sm:w-16"
                >
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                </span>
              );
            }

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
    </section>
  );
}
