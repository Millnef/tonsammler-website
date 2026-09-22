"use client";

import { useEffect, useState } from "react";

type Geometry = {
  top: number;
  width: number;
  height: number;
  fadeInEnd: number;
  fadeOutStart: number;
};

type Point = [number, number];

const FALLOFF_STOPS: [number, number][] = [
  [0, 1],
  [0.2, 0.88],
  [0.4, 0.6],
  [0.6, 0.3],
  [0.8, 0.1],
  [1, 0],
];

const FADE_STEPS = [0, 0.25, 0.5, 0.75, 1];

const smoothstep = (t: number) => t * t * (3 - 2 * t);

function buildMask({ height, fadeInEnd, fadeOutStart }: Geometry) {
  const fadeIn = FADE_STEPS.map(
    (t) => `rgba(0,0,0,${smoothstep(t).toFixed(3)}) ${Math.round(fadeInEnd * t)}px`
  );
  const fadeOut = FADE_STEPS.map(
    (t) =>
      `rgba(0,0,0,${smoothstep(1 - t).toFixed(3)}) ${Math.round(
        fadeOutStart + (height - fadeOutStart) * t
      )}px`
  );

  return `linear-gradient(to bottom, ${[...fadeIn, ...fadeOut].join(", ")})`;
}

const STROKE_SAMPLES = 9;
const CORE_T = 0.45;

// Quadratic Bézier point and derivative for the curved streak path
function bezier(p0: Point, c: Point, p2: Point, t: number): Point {
  const u = 1 - t;
  return [
    u * u * p0[0] + 2 * u * t * c[0] + t * t * p2[0],
    u * u * p0[1] + 2 * u * t * c[1] + t * t * p2[1],
  ];
}

function bezierTangent(p0: Point, c: Point, p2: Point, t: number): Point {
  return [
    2 * (1 - t) * (c[0] - p0[0]) + 2 * t * (p2[0] - c[0]),
    2 * (1 - t) * (c[1] - p0[1]) + 2 * t * (p2[1] - c[1]),
  ];
}

function buildEllipses({ width, height }: Geometry) {
  const start: Point = [width * -0.1, height * -0.02];
  const control: Point = [width * 1.05, height * 0.47];
  const end: Point = [width * 0.34, height * 0.95];
  const core = bezier(start, control, end, CORE_T);

  const stroke = Array.from({ length: STROKE_SAMPLES }, (_, i) => {
    const t = (i + 0.5) / STROKE_SAMPLES;
    const [cx, cy] = bezier(start, control, end, t);
    const [tx, ty] = bezierTangent(start, control, end, t);
    const intensity = Math.exp(-(((t - CORE_T) / 0.22) ** 2));

    return {
      cx,
      cy,
      rx: (Math.hypot(tx, ty) / STROKE_SAMPLES) * 1.25,
      ry: width * (0.2 + 0.1 * intensity) * (1 + 0.1 * Math.sin(i * 2.3)),
      angle: (Math.atan2(ty, tx) * 180) / Math.PI,
      opacity: 0.042 + 0.092 * intensity,
    };
  });

  return [
    {
      cx: core[0],
      cy: core[1],
      rx: width * 0.7,
      ry: height * 0.3,
      angle: 0,
      opacity: 0.04,
    },
    ...stroke,
  ];
}

export default function AccentGlow() {
  const [geometry, setGeometry] = useState<Geometry>();

  useEffect(() => {
    const measure = () => {
      const about = document.getElementById("about");
      const releases = document.getElementById("releases");
      const sets = document.getElementById("sets");
      const gallery = document.getElementById("gallery");
      if (!about || !releases || !sets || !gallery) return;

      const docTop = (el: HTMLElement) =>
        el.getBoundingClientRect().top + window.scrollY;

      const top = docTop(about) + (about.offsetHeight * 2) / 3;
      const bottom = docTop(gallery) + gallery.offsetHeight / 3;

      setGeometry({
        top,
        width: document.documentElement.clientWidth,
        height: bottom - top,
        fadeInEnd: docTop(releases) + releases.offsetHeight * 0.25 - top,
        fadeOutStart: docTop(sets) + sets.offsetHeight - top,
      });
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  if (!geometry) return null;

  const mask = buildMask(geometry);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -z-10 overflow-hidden"
      style={{
        top: geometry.top,
        height: geometry.height,
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${geometry.width} ${geometry.height}`}
        preserveAspectRatio="none"
      >
        <defs>
          <radialGradient id="accent-glow-falloff">
            {FALLOFF_STOPS.map(([offset, opacity]) => (
              <stop
                key={offset}
                offset={offset}
                style={{ stopColor: "var(--accent)", stopOpacity: opacity }}
              />
            ))}
          </radialGradient>
        </defs>

        {buildEllipses(geometry).map((ellipse, index) => (
          <ellipse
            key={index}
            cx={ellipse.cx}
            cy={ellipse.cy}
            rx={ellipse.rx}
            ry={ellipse.ry}
            transform={`rotate(${ellipse.angle} ${ellipse.cx} ${ellipse.cy})`}
            fill="url(#accent-glow-falloff)"
            fillOpacity={ellipse.opacity}
          />
        ))}
      </svg>
    </div>
  );
}
