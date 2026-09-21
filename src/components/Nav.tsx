"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/Logo";
import { LINKS } from "@/lib/nav-links";

const EASE_OUT = "easeOut";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 w-full sm:static">
      <div className="relative z-50 flex items-center justify-between gap-6 px-6 py-6 sm:px-10 sm:py-8">
        <Logo />

        <div className="hidden gap-8 sm:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="origin-left text-xs font-medium uppercase tracking-[0.15em] text-foreground/60 transition-all duration-200 ease-out hover:scale-105 hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          className="relative z-50 block h-6 w-6 sm:hidden"
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
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="nav-overlay"
              aria-hidden="true"
              className="fixed inset-0 z-40 bg-black sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
            />

            <motion.div
              key="nav-menu"
              className="fixed inset-0 z-40 flex flex-col items-end justify-center gap-2 px-6 sm:hidden"
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
  );
}
