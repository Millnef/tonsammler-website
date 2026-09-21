"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      headlineRef.current,
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 0.55, ease: "power2.out" }
    );

    tl.fromTo(
      subRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      0.15
    );
  });

  return (
    <section
      id="top"
      className="relative flex min-h-[92svh] items-end pb-24 sm:pb-36"
    >
      <div
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
        <p className="mb-2 whitespace-nowrap text-[clamp(0.9rem,4.19vw,4.99rem)] font-light leading-none text-foreground/60">
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
