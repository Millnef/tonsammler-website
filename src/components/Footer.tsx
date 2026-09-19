const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#music", label: "Music" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10">
      <div className="flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-10 sm:py-8">
        <a href="#top" className="text-sm font-medium tracking-[0.08em] sm:text-base">
          TONSAMMLER
        </a>

        <div className="flex gap-4 sm:gap-8">
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
      </div>
    </footer>
  );
}
