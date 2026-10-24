import { ARC, ARC_CURVE } from "@/lib/anmeldung-content";

// The afternoon as a curve: time from 15 to 19 Uhr against the tempo. Colour runs from
// Raik's blue into TONSAMMLER's cream, image turning into sound.
const W = 1000;
const H = 220;
const MINUTES = 240;
const BPM_MIN = 110;
const BPM_MAX = 145;

const x = (minute: number) => (minute / MINUTES) * W;
const y = (bpm: number) => H - 20 - ((bpm - BPM_MIN) / (BPM_MAX - BPM_MIN)) * (H - 40);

// Smooth line through the points (Catmull-Rom as cubic Béziers)
function smoothPath(points: readonly (readonly [number, number])[]) {
  const p = points.map(([m, b]) => [x(m), y(b)]);
  let d = `M ${p[0][0]} ${p[0][1]}`;
  for (let i = 0; i < p.length - 1; i++) {
    const [p0, p1, p2, p3] = [p[i - 1] ?? p[i], p[i], p[i + 1], p[i + 2] ?? p[i + 1]];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0]} ${c1[1]}, ${c2[0]} ${c2[1]}, ${p2[0]} ${p2[1]}`;
  }
  return d;
}

const LINE = smoothPath(ARC_CURVE);
const AREA = `${LINE} L ${W} ${H} L 0 ${H} Z`;

export default function TempoArc() {
  return (
    <div>
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full overflow-visible" aria-hidden="true">
          <defs>
            <linearGradient id="arc-line" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="var(--raik-blue)" />
              <stop offset="0.55" stopColor="var(--raik-blue-light)" />
              <stop offset="1" stopColor="var(--accent)" />
            </linearGradient>
            <linearGradient id="arc-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="var(--raik-blue)" stopOpacity="0.35" />
              <stop offset="1" stopColor="var(--raik-blue)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[15, 16, 17, 18, 19].map((hour) => (
            <line
              key={hour}
              x1={x((hour - 15) * 60)}
              x2={x((hour - 15) * 60)}
              y1={0}
              y2={H}
              stroke="white"
              strokeOpacity="0.08"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <path d={AREA} fill="url(#arc-fill)" />
          <path d={LINE} fill="none" stroke="url(#arc-line)" strokeWidth="3" vectorEffect="non-scaling-stroke" />
        </svg>
        {/* Markers as HTML so they keep their size while the curve scales */}
        {ARC.map((phase) => (
          <span
            key={phase.time}
            aria-hidden="true"
            className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent ring-4 ring-black"
            style={{ left: `${(x(phase.minute) / W) * 100}%`, top: `${(y(phase.bpm) / H) * 100}%` }}
          />
        ))}
      </div>
      <div className="mt-3 flex justify-between text-[11px] font-medium tracking-[0.15em] text-foreground/40">
        {[15, 16, 17, 18, 19].map((hour) => (
          <span key={hour}>{hour}:00</span>
        ))}
      </div>
    </div>
  );
}
