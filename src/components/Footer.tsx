import Logo from "@/components/Logo";
import { LINKS } from "@/lib/nav-links";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10">
      <div className="flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-10 sm:py-8">
        <Logo />

        <div className="flex gap-4 sm:gap-8">
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
      </div>
    </footer>
  );
}
