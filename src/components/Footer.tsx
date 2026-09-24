import { Fragment } from "react";
import Logo from "@/components/Logo";
import { LINKS } from "@/lib/nav-links";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10">
      <div className="flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-10 sm:py-8">
        <Logo />

        {/* Mobile: one row with "|" separators and a smaller size so all links fit */}
        <div className="flex flex-nowrap items-center gap-x-1 max-[375px]:gap-x-[3px] sm:gap-8">
          {LINKS.map((link, index) => (
            <Fragment key={link.href}>
              {index > 0 && (
                <span
                  aria-hidden="true"
                  className="text-[10px] text-foreground/30 max-[375px]:text-[9px] sm:hidden"
                >
                  |
                </span>
              )}
              <a
                href={link.href}
                className="origin-left whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.1em] text-foreground/60 transition-all duration-200 ease-out hover:scale-105 hover:text-accent max-[375px]:text-[9px] max-[375px]:tracking-[0.05em] sm:text-xs sm:tracking-[0.15em]"
              >
                {link.label}
              </a>
            </Fragment>
          ))}
        </div>
      </div>
    </footer>
  );
}
