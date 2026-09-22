"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export default function Hero() {
  const photoRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      photoRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" },
      0
    );

    tl.fromTo(
      kickerRef.current,
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.9, ease: "power2.out" },
      0
    );

    tl.fromTo(
      headlineRef.current,
      { opacity: 0, x: -60 },
      { opacity: 1, x: 0, duration: 1.5, ease: "power2.out" },
      0.18
    );

    tl.fromTo(
      subRef.current,
      { opacity: 0, y: 75 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
      0.35
    );
  });

  return (
    <section
      id="top"
      className="relative flex min-h-[92svh] items-end pt-[464px] pb-[136px] sm:pt-[400px] sm:pb-[200px]"
    >
      <div
        ref={photoRef}
        aria-hidden="true"
        className="absolute right-0 top-0 -bottom-25 w-[calc(50%+50px)] sm:w-1/2 sm:max-w-3xl"
        style={{
          maskImage:
            "radial-gradient(ellipse 65% 58% at 68% 40%, black 25%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 65% 58% at 68% 40%, black 25%, transparent 85%)",
        }}
      >
        <Image
          src="/images/hero-portrait.jpg"
          alt="Portrait von TONSAMMLER"
          fill
          preload
          sizes="50vw"
          className="object-cover object-[center_22%] grayscale"
        />
      </div>

      <div className="relative z-10 w-full px-6 sm:px-10">
        <p
          ref={kickerRef}
          className="mb-2 whitespace-nowrap text-[clamp(0.9rem,4.19vw,4.99rem)] font-light leading-none text-foreground/60"
        >
          Milan-Joel Pawlick aka
        </p>

        <h1
          ref={headlineRef}
          className="whitespace-nowrap text-[clamp(2.25rem,10.5vw,12.5rem)] font-extralight leading-[0.88] tracking-tight"
        >
          TONSAMMLER
        </h1>

        <p
          ref={subRef}
          className="mt-8 max-w-md text-base font-light text-foreground/60 sm:text-lg"
        >
          „collecting feelings through sound"
        </p>
      </div>
    </section>
  );
}
