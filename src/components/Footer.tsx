import { Fragment } from "react";
import Logo from "@/components/Logo";
import { LINKS } from "@/lib/nav-links";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10">
      <div className="flex flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between md:gap-6 sm:px-10 sm:py-8">
        <Logo />

        {/* Below md: one row with "|" separators, even smaller below 400px, so all links fit */}
        <div className="flex flex-nowrap items-center gap-x-1 max-[400px]:gap-x-[3px] md:gap-6 lg:gap-8">
          {LINKS.map((link, index) => (
            <Fragment key={link.href}>
              {index > 0 && (
                <span
                  aria-hidden="true"
                  className="text-[10px] text-foreground/30 max-[400px]:text-[9px] md:hidden"
                >
                  |
                </span>
              )}
              <a
                href={link.href}
                className="origin-left whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.1em] text-foreground/60 transition-all duration-200 ease-out hover:scale-105 hover:text-accent max-[400px]:text-[9px] max-[400px]:tracking-[0.05em] md:text-xs md:tracking-[0.15em]"
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
