"use client";

import { useState } from "react";
import Logo from "@/components/Logo";
import { LINKS } from "@/lib/nav-links";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 w-full sm:static">
      <div className="flex items-center justify-between gap-6 px-6 py-6 sm:px-10 sm:py-8">
        <Logo />

        <div className="hidden gap-8 sm:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-medium uppercase tracking-[0.15em] text-foreground/60"
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
          className="sm:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="flex flex-col items-end gap-1 bg-black px-6 pb-6 sm:hidden">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 text-xs font-medium uppercase tracking-[0.15em] text-foreground/60"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
