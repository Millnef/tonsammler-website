// Shared classes of the registration page: Raik's serif for the big words,
// TONSAMMLER's Raleway for labels and running text
export const SERIF = "font-[family-name:var(--font-garamond)]";
export const LABEL = "text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/50";
export const CONTAINER = "mx-auto w-full max-w-6xl px-6 sm:px-10";
export const BUTTON =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-200 ease-out";
export const PRIMARY = `${BUTTON} bg-accent text-black hover:bg-foreground`;
export const SECONDARY = `${BUTTON} border border-white/25 text-foreground hover:border-accent hover:text-accent`;
