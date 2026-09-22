"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/Logo";
import { LINKS } from "@/lib/nav-links";

const EASE_OUT = "easeOut";
const SCROLL_THRESHOLD = 64;

function HamburgerIcon({
  open,
  onClick,
  className,
}: {
  open: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Menü schließen" : "Menü öffnen"}
      aria-expanded={open}
      className={`relative z-50 h-6 w-6 ${className ?? ""}`}
    >
      <motion.span
        className="absolute inset-x-0 top-[7px] h-[1.5px] bg-current"
        animate={open ? { y: 5, rotate: 45 } : { y: 0, rotate: 0 }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
      />
      <motion.span
        className="absolute inset-x-0 top-[12px] h-[1.5px] bg-current"
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.25, ease: EASE_OUT }}
      />
      <motion.span
        className="absolute inset-x-0 top-[17px] h-[1.5px] bg-current"
        animate={open ? { y: -5, rotate: -45 } : { y: 0, rotate: 0 }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
      />
    </button>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="invisible flex items-center gap-6 px-6 py-6 sm:px-10 sm:py-8"
      >
        <Logo />
      </div>

      <nav className="fixed inset-x-0 top-0 z-50 w-full">
        <div className="relative z-50 flex items-center justify-between gap-6 px-6 py-6 sm:px-10 sm:py-8">
          <Logo />

          <div className="relative hidden h-6 sm:block">
            <div aria-hidden="true" className="invisible flex items-center gap-8">
              {LINKS.map((link) => (
                <span
                  key={link.href}
                  className="text-xs font-medium uppercase tracking-[0.15em]"
                >
                  {link.label}
                </span>
              ))}
            </div>

            <AnimatePresence initial={false}>
              {!scrolled && (
                <motion.div
                  key="links"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE_OUT }}
                  className="absolute inset-0 flex items-center gap-8"
                >
                  {LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="origin-left text-xs font-medium uppercase tracking-[0.15em] text-foreground/60 transition-all duration-200 ease-out hover:scale-105 hover:text-accent"
                    >
                      {link.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence initial={false}>
              {scrolled && (
                <motion.div
                  key="hamburger-desktop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE_OUT }}
                  className="absolute inset-0 flex items-center justify-end"
                >
                  <HamburgerIcon open={open} onClick={() => setOpen((v) => !v)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <HamburgerIcon
            open={open}
            onClick={() => setOpen((v) => !v)}
            className="sm:hidden"
          />
        </div>

        <AnimatePresence>
          {open && (
            <>
              <motion.div
                key="nav-overlay"
                aria-hidden="true"
                className="fixed inset-0 z-40 bg-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
              />

              <motion.div
                key="nav-menu"
                className="fixed inset-0 z-40 flex flex-col items-end justify-center gap-2 px-6"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
              >
                {LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="py-3 text-xs font-medium uppercase tracking-[0.15em] text-foreground/60 transition-colors duration-200 ease-out hover:text-accent active:text-accent"
                  >
                    {link.label}
                  </a>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
