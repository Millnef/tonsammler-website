"use client";

import { createRef, useCallback, useEffect, useState, type RefObject } from "react";

// Stroke widths of Raleway ExtraLight (200), measured from the rendered glyphs:
// horizontal bars (T, E) 0.032em, vertical stems (L, I) 0.034em. Being em-based,
// the lines follow the heading's responsive font size on every breakpoint.
export const HORIZONTAL_LINE_CLASSES =
  "pointer-events-none absolute block h-[0.032em] bg-foreground";
export const VERTICAL_LINE_CLASSES =
  "pointer-events-none absolute block w-[0.034em] bg-foreground";

export type HeadlineLineSpec = {
  /** index of the letter in the heading text */
  char: number;
  /** which ink corner of that letter the line starts from */
  anchor: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  direction: "left" | "right" | "up";
  /** "up" only: the line reaches this far above the top of the element with this id */
  reachAbove?: { elementId: string; offset: number };
};

let measureCanvas: HTMLCanvasElement | undefined;

// Painted ink bounds of one letter in viewport coordinates. Browsers paint text on a
// baseline snapped to device pixels and hint stroke edges to the pixel grid, so the
// outline metrics can be off by up to ~1.5px. Instead the letter is rasterised once on
// a canvas at its real size, the same sub-pixel phase and the same snapped baseline,
// and the edges are read back with sub-pixel precision from the edge pixels' coverage.
function letterInk(heading: HTMLElement, index: number) {
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

  // Layout rounds the font ascent; painting snaps the baseline to device pixels
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.font = `${style.fontWeight} ${fontSize}px ${style.fontFamily}`;
  const ascent = Math.round(ctx.measureText(text.data[index]).fontBoundingBoxAscent);
  const baseline = Math.round((glyph.top + ascent) * dpr) / dpr;

  const pad = Math.ceil(fontSize * 0.3);
  const width = Math.ceil((glyph.width + pad * 2) * dpr);
  const height = Math.ceil(fontSize * 1.6 * dpr);
  measureCanvas.width = width;
  measureCanvas.height = height;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.font = `${style.fontWeight} ${fontSize}px ${style.fontFamily}`;
  const phase = glyph.left * dpr - Math.floor(glyph.left * dpr);
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

  return {
    left: glyph.left + (left / dpr - originX),
    right: glyph.left + (right / dpr - originX),
    top: baseline + (top / dpr - originY),
    bottom: baseline + (bottom / dpr - originY),
  };
}

// Lines start this far inside the letter so sub-pixel differences in horizontal glyph
// rasterisation never leave a hairline gap; same colour and height, so it is invisible
const OVERLAP = 1;

function positionLines(
  heading: HTMLElement,
  specs: HeadlineLineSpec[],
  refs: RefObject<HTMLSpanElement | null>[]
) {
  const box = heading.getBoundingClientRect();
  const viewportRight = document.documentElement.clientWidth;

  specs.forEach((spec, i) => {
    const line = refs[i].current;
    const ink = letterInk(heading, spec.char);
    if (!line || !ink) return;
    const s = line.style;

    if (spec.direction === "up") {
      const target = spec.reachAbove
        ? (document.getElementById(spec.reachAbove.elementId)?.getBoundingClientRect().top ?? ink.top) -
          spec.reachAbove.offset
        : ink.top;
      s.left = `${ink.left - box.left}px`;
      s.top = "";
      s.bottom = `${box.bottom - ink.top - OVERLAP}px`;
      s.height = `${Math.max(0, ink.top - target + OVERLAP)}px`;
      s.transformOrigin = "50% 100%";
      return;
    }

    if (spec.anchor.startsWith("top")) {
      s.top = `${ink.top - box.top}px`;
      s.bottom = "";
    } else {
      s.top = "";
      s.bottom = `${box.bottom - ink.bottom}px`;
    }

    if (spec.direction === "right") {
      s.left = `${ink.right - box.left - OVERLAP}px`;
      s.width = `${Math.max(0, viewportRight - ink.right + OVERLAP)}px`;
      s.transformOrigin = "0% 50%";
    } else {
      s.left = `${-box.left}px`;
      s.width = `${Math.max(0, ink.left + OVERLAP)}px`;
      s.transformOrigin = "100% 50%";
    }
  });
}

/**
 * Positions decorative lines that grow out of a letter corner of a heading to the
 * screen edge. Measures on mount (after the web font is ready) and on every size
 * change of the document, never on scroll. `measure` can be called manually, e.g.
 * after an intro animation has moved the heading.
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
