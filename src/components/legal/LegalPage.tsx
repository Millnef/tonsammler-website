import type { ReactNode } from "react";
import Link from "next/link";
import { LEGAL_PATHS } from "@/lib/legal";
import type { LegalLang } from "@/components/legal/LegalContent";

type Kind = keyof typeof LEGAL_PATHS;

const TITLES: Record<Kind, Record<LegalLang, string>> = {
  imprint: { de: "Impressum", en: "Legal notice" },
  privacy: { de: "Datenschutz", en: "Privacy policy" },
};

const NAV = "text-[11px] font-medium uppercase tracking-[0.15em] text-foreground/60 transition-colors duration-200 ease-out hover:text-accent";

// Frame of the website's legal pages in the site's own look: name top left, the other
// legal page and the language switch top right
export default function LegalPage({ kind, lang, children }: { kind: Kind; lang: LegalLang; children: ReactNode }) {
  const other: Kind = kind === "imprint" ? "privacy" : "imprint";
  const otherLang: LegalLang = lang === "de" ? "en" : "de";

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between gap-6 border-b border-white/10 px-6 py-6 sm:px-10 sm:py-8">
        <Link href="/" className="text-sm font-medium tracking-[0.08em] transition-colors duration-200 ease-out hover:text-accent sm:text-base">
          TONSAMMLER
        </Link>
        <nav className="flex items-center gap-5 sm:gap-8">
          <Link href={LEGAL_PATHS[other][lang]} className={NAV}>
            {TITLES[other][lang]}
          </Link>
          <Link href={LEGAL_PATHS[kind][otherLang]} className={NAV} aria-label={lang === "de" ? "English version" : "Deutsche Version"}>
            {otherLang.toUpperCase()}
          </Link>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
        <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-extralight tracking-tight">{TITLES[kind][lang]}</h1>
        {children}
      </main>

      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-6 py-8 text-xs text-foreground/40 sm:px-10">
        <span>© 2026 TONSAMMLER</span>
        <Link href="/" className={NAV}>
          {lang === "de" ? "← Zur Website" : "← Back to the website"}
        </Link>
      </footer>
    </div>
  );
}
