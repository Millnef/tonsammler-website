"use client";

import { createRef, useCallback, useEffect, useState, type RefObject } from "react";

// Stroke widths of Raleway ExtraLight (200), measured from the rendered glyphs:
// horizontal bars (T, E) 0.032em, vertical stems (L, I) 0.034em. Being em-based,
// the lines follow the heading's responsive font size on every breakpoint.
const HORIZONTAL_STROKE = 0.032;
const VERTICAL_STROKE = 0.034;

// Every line is a 1px box: browsers snap a box's position and size to whole pixels
// before transforming it, which would shift and thin a 2.4px line by up to ~0.8px.
// Position, thickness and direction are therefore applied as (unsnapped) transforms.
export const LINE_CLASSES = "pointer-events-none absolute block h-px bg-foreground";
// Same, fading out towards the far end
export const FADING_LINE_CLASSES =
  "pointer-events-none absolute block h-px bg-linear-to-r from-foreground to-transparent";

/** A horizontal boundary: the top/bottom (or bottom minus padding) of an element */
type Boundary = { elementId: string; edge: "top" | "bottom" | "contentBottom"; offset?: number };

export type HeadlineLineSpec =
  | {
      /** index of the letter in the heading text */
      char: number;
      /** which ink corner of that letter the line starts from */
      anchor: "top-left" | "top-right" | "bottom-left" | "bottom-right";
      direction: "left" | "right" | "up";
      /** "up" only: the line reaches this far above the top of the element with this id */
      reachAbove?: { elementId: string; offset: number };
      /** px the line reaches past the screen edge (e.g. while its heading slides in) */
      overshoot?: number;
    }
  | {
      char: number;
      /** continues a diagonal stroke of the glyph */
      direction: "angle";
      /** stroke end point in em, relative to the glyph origin and baseline */
      start: [number, number];
      /** stroke direction in degrees, screen coordinates (y down) */
      angle: number;
      /** stroke width in em */
      width: number;
      /** em the line starts inside the stroke, so its square end stays hidden */
      inset: number;
      /** the line runs until this boundary or the screen edge, whichever comes first */
      until: Boundary;
      /** fraction of that run the line covers (default 1) */
      reach?: number;
    };

let measureCanvas: HTMLCanvasElement | undefined;

// Lines start this far inside the letter so sub-pixel differences in horizontal glyph
// rasterisation never leave a hairline gap; same colour and height, so it is invisible
const OVERLAP = 1;

// Geometry of one letter in viewport coordinates: its origin, the baseline it is
// painted on and its painted ink bounds. Browsers paint text on a baseline snapped to
// device pixels and hint stroke edges to the pixel grid, so outline metrics can be off
// by up to ~1.5px. The letter is therefore rasterised once on a canvas at its real
// size, the same sub-pixel phase and the same snapped baseline, and the edges are read
// back with sub-pixel precision from the edge pixels' coverage.
function letterGeometry(heading: HTMLElement, index: number) {
  const text = [...heading.childNodes].find(
    (node): node is Text => node.nodeType === Node.TEXT_NODE
  );
  if (!text || index >= text.data.length) return null;

  const range = document.createRange();
  range.setStart(text, index);
  range.setEnd(text, index + 1);
  const glyph = range.getBoundingClientRect();

  const style = getComputedStyle(heading);
  const fontSize = parseFloat(style.fontSize);
  const dpr = window.devicePixelRatio || 1;
  measureCanvas ??= document.createElement("canvas");
  const ctx = measureCanvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.font = `${style.fontWeight} ${fontSize}px ${style.fontFamily}`;

  // Layout rounds the font ascent. Chrome paints the baseline snapped to whole CSS
  // pixels (measured against painted text at device pixel ratios 1, 2 and 3)
  const ascent = Math.round(ctx.measureText(text.data[index]).fontBoundingBoxAscent);
  let glyphLeft = glyph.left;
  let baseline = Math.round(glyph.top + ascent);

  if (navigator.vendor?.startsWith("Apple")) {
    // WebKit (Safari and every browser on iOS) snaps the baseline to device pixels
    // instead, and floors the left edge of character rects to whole CSS pixels. There the
    // letter's origin follows from the heading box plus the advance of the text before it
    // (kerning and letter spacing included).
    const scroll = window.scrollY;
    baseline = Math.round((glyph.top + ascent + scroll) * dpr) / dpr - scroll;

    const box = heading.getBoundingClientRect();
    const spacing = parseFloat(style.letterSpacing) || 0;
    glyphLeft =
      box.left +
      parseFloat(style.borderLeftWidth) +
      parseFloat(style.paddingLeft) +
      ctx.measureText(text.data.slice(0, index + 1)).width -
      ctx.measureText(text.data[index]).width +
      index * spacing;
  }

  const pad = Math.ceil(fontSize * 0.3);
  const width = Math.ceil((glyph.width + pad * 2) * dpr);
  const height = Math.ceil(fontSize * 1.6 * dpr);
  measureCanvas.width = width;
  measureCanvas.height = height;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.font = `${style.fontWeight} ${fontSize}px ${style.fontFamily}`;
  const phase = glyphLeft * dpr - Math.floor(glyphLeft * dpr);
  const originX = pad + phase / dpr;
  const originY = Math.round(fontSize * 1.2 * dpr) / dpr;
  ctx.fillText(text.data[index], originX, originY);

  const { data } = ctx.getImageData(0, 0, width, height);
  const rowMax = new Float32Array(height);
  const colMax = new Float32Array(width);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const a = data[(y * width + x) * 4 + 3];
      if (a > rowMax[y]) rowMax[y] = a;
      if (a > colMax[x]) colMax[x] = a;
    }
  }

  // First/last row or column with coverage, refined by how much of that pixel is covered
  const MIN = 8;
  const first = (arr: Float32Array) => {
    const i = arr.findIndex((a) => a > MIN);
    return i < 0 ? null : i + 1 - arr[i] / 255;
  };
  const last = (arr: Float32Array) => {
    for (let i = arr.length - 1; i >= 0; i--) if (arr[i] > MIN) return i + arr[i] / 255;
    return null;
  };
  const [top, bottom, left, right] = [first(rowMax), last(rowMax), first(colMax), last(colMax)];
  if (top === null || bottom === null || left === null || right === null) return null;

  // Painted coverage (0–1) at a point relative to the glyph origin and baseline, in CSS px
  const coverage = (lx: number, ly: number) => {
    const fx = (originX + lx) * dpr - 0.5;
    const fy = (originY + ly) * dpr - 0.5;
    const x0 = Math.floor(fx);
    const y0 = Math.floor(fy);
    const at = (x: number, y: number) =>
      x < 0 || y < 0 || x >= width || y >= height ? 0 : data[(y * width + x) * 4 + 3] / 255;
    const ax = fx - x0;
    const ay = fy - y0;
    return (
      (at(x0, y0) * (1 - ax) + at(x0 + 1, y0) * ax) * (1 - ay) +
      (at(x0, y0 + 1) * (1 - ax) + at(x0 + 1, y0 + 1) * ax) * ay
    );
  };

  return {
    fontSize,
    coverage,
    originX: glyphLeft,
    baseline,
    ink: {
      left: glyphLeft + (left / dpr - originX),
      right: glyphLeft + (right / dpr - originX),
      top: baseline + (top / dpr - originY),
      bottom: baseline + (bottom / dpr - originY),
    },
  };
}

function boundaryY({ elementId, edge, offset = 0 }: Boundary) {
  const el = document.getElementById(elementId);
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  if (edge === "top") return rect.top + offset;
  if (edge === "bottom") return rect.bottom + offset;
  return rect.bottom - parseFloat(getComputedStyle(el).paddingBottom) + offset;
}

// Places a line starting at (x, y) (centre of its start, layout coordinates) running
// at `angle` degrees for `length` px with the given thickness. The 1px layout box sits
// on whole CSS pixels (where browsers snap boxes); the sub-pixel rest, the direction and
// the thickness are transforms, which are not snapped. GSAP's scaleX grows it from its start.
function placeLine(
  line: HTMLElement,
  box: { left: number; top: number },
  x: number,
  y: number,
  angle: number,
  length: number,
  thickness: number
) {
  const snapX = Math.floor(x);
  const snapY = Math.floor(y - 0.5);
  const s = line.style;
  s.left = `${snapX - box.left}px`;
  s.top = `${snapY - box.top}px`;
  s.width = `${Math.max(0, length)}px`;
  s.transformOrigin = "0 0.5px";
  s.translate = `${x - snapX}px ${y - 0.5 - snapY}px`;
  s.rotate = `${angle}deg`;
  s.scale = `1 ${thickness}`;
}

type Geometry = NonNullable<ReturnType<typeof letterGeometry>>;

// Sideways offset of the painted stroke behind a line start (glyph-local coordinates,
// line running along (dx, dy)): coverage-weighted centre of cross-sections between
// `from` and `to` px behind the start, measured along the normal
function strokeOffset(
  geo: Geometry,
  sx: number,
  sy: number,
  dx: number,
  dy: number,
  stroke: number,
  from: number,
  to: number
) {
  const nx = -dy;
  const ny = dx;
  let offset = 0;
  let count = 0;
  for (let back = from; back <= to; back += 0.25) {
    const cx = sx - dx * back;
    const cy = sy - dy * back;
    let mass = 0;
    let moment = 0;
    for (let t = -2 * stroke - 1; t <= 2 * stroke + 1; t += 0.1) {
      const a = geo.coverage(cx + nx * t, cy + ny * t);
      mass += a;
      moment += a * t;
    }
    if (mass > 0) {
      offset += moment / mass;
      count++;
    }
  }
  return { x: count ? nx * (offset / count) : 0, y: count ? ny * (offset / count) : 0 };
}

function positionLines(
  heading: HTMLElement,
  specs: HeadlineLineSpec[],
  refs: RefObject<HTMLSpanElement | null>[]
) {
  // Work in layout coordinates: undo any translation an animation currently applies,
  // so measuring mid-animation gives the same result as at rest
  const transform = getComputedStyle(heading).transform;
  const matrix = transform && transform !== "none" ? new DOMMatrixReadOnly(transform) : null;
  const tx = matrix?.e ?? 0;
  const ty = matrix?.f ?? 0;
  const rect = heading.getBoundingClientRect();
  const box = { left: rect.left - tx, top: rect.top - ty };
  const viewportRight = document.documentElement.clientWidth;

  specs.forEach((spec, i) => {
    const line = refs[i].current;
    const geo = letterGeometry(heading, spec.char);
    if (!line || !geo) return;
    const ink = {
      left: geo.ink.left - tx,
      right: geo.ink.right - tx,
      top: geo.ink.top - ty,
      bottom: geo.ink.bottom - ty,
    };

    // Glyph-local coordinates (relative to the glyph origin and its baseline)
    const local = {
      left: geo.ink.left - geo.originX,
      right: geo.ink.right - geo.originX,
      top: geo.ink.top - geo.baseline,
      bottom: geo.ink.bottom - geo.baseline,
    };
    const toLayout = (lx: number, ly: number) => [geo.originX - tx + lx, geo.baseline - ty + ly];

    // Straight continuation of a stroke ending at (sx, sy): centre the line on the stroke
    // as painted (sampled just behind its end, short enough not to be biased by curves),
    // then start it `inset` px inside the letter
    const continueStroke = (sx: number, sy: number, angle: number, stroke: number, inset: number) => {
      const rad = (angle * Math.PI) / 180;
      const dx = Math.cos(rad);
      const dy = Math.sin(rad);
      const shift = strokeOffset(geo, sx, sy, dx, dy, stroke, inset + 0.5, inset + 2.5);
      const [x, y] = toLayout(sx + shift.x - dx * inset, sy + shift.y - dy * inset);
      return { x, y, dx, dy };
    };

    if (spec.direction === "angle") {
      const stroke = spec.width * geo.fontSize;
      const inset = spec.inset * geo.fontSize + OVERLAP;
      const c = continueStroke(spec.start[0] * geo.fontSize, spec.start[1] * geo.fontSize, spec.angle, stroke, inset);

      // Run to the boundary or the screen edge, whichever comes first (+1px at the edge
      // so rounding never leaves a sliver; horizontal overflow is clipped by the section)
      const limits: number[] = [];
      if (c.dx > 0) limits.push((viewportRight - c.x) / c.dx + 1);
      if (c.dx < 0) limits.push(-c.x / c.dx + 1);
      const stopY = boundaryY(spec.until);
      if (stopY !== null && c.dy !== 0 && (stopY - c.y) / c.dy > 0) limits.push((stopY - c.y) / c.dy);

      placeLine(line, box, c.x, c.y, spec.angle, Math.min(...limits) * (spec.reach ?? 1), stroke);
      return;
    }

    if (spec.direction === "up") {
      // Continues the stem upwards from the top of the letter
      const stroke = VERTICAL_STROKE * geo.fontSize;
      const target = spec.reachAbove
        ? (boundaryY({ elementId: spec.reachAbove.elementId, edge: "top" }) ?? ink.top) -
          spec.reachAbove.offset
        : ink.top;
      const c = continueStroke(local.left + stroke / 2, local.top, -90, stroke, OVERLAP);
      placeLine(line, box, c.x, c.y, -90, c.y - target, stroke);
      return;
    }

    const stroke = HORIZONTAL_STROKE * geo.fontSize;
    const overshoot = (spec.overshoot ?? 0) + 1;
    const right = spec.direction === "right";
    const angle = right ? 0 : 180;
    const startX = right ? local.right : local.left;

    let x: number;
    let y: number;
    if (spec.anchor.startsWith("top")) {
      // Top corner (T crossbar): continue the bar itself
      ({ x, y } = continueStroke(startX, local.top + stroke / 2, angle, stroke, OVERLAP));
    } else {
      // Bottom corner (R): no stroke to continue, the line's bottom edge sits on the letter's.
      // It starts at the letter's edge where the line's top edge meets it, so a slanted leg
      // leaves no gap above the line
      const edgeY = local.bottom - stroke + 0.25;
      let edgeX = startX;
      while (Math.abs(edgeX - startX) < geo.fontSize * 0.2 && geo.coverage(edgeX, edgeY) < 0.5) {
        edgeX += right ? -0.05 : 0.05;
      }
      [x, y] = toLayout(right ? edgeX - OVERLAP : edgeX + OVERLAP, local.bottom - stroke / 2);
    }

    placeLine(line, box, x, y, angle, right ? viewportRight - x + overshoot : x + overshoot, stroke);
  });
}

/**
 * Positions decorative lines that grow out of a letter of a heading. Measures on mount
 * (after the web font is ready) and on every size change of the document, never on
 * scroll. `measure` can also be called manually.
 */
export function useHeadlineLines(
  headingRef: RefObject<HTMLElement | null>,
  specs: HeadlineLineSpec[]
) {
  const [refs] = useState(() => specs.map(() => createRef<HTMLSpanElement>()));

  const measure = useCallback(() => {
    if (headingRef.current) positionLines(headingRef.current, specs, refs);
  }, [headingRef, specs, refs]);

  useEffect(() => {
    let active = true;
    document.fonts.ready.then(() => {
      if (active) measure();
    });

    const observer = new ResizeObserver(measure);
    observer.observe(document.documentElement);
    return () => {
      active = false;
      observer.disconnect();
    };
  }, [measure]);

  return { refs, measure };
}
