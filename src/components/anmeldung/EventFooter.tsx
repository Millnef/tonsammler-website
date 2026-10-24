import Link from "next/link";
import { EVENT } from "@/lib/anmeldung-content";
import { CONTAINER, SERIF } from "@/components/anmeldung/styles";

const LINK = "transition-colors duration-200 ease-out hover:text-accent";

export default function EventFooter() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div
        className={`${CONTAINER} flex flex-col gap-6 text-xs font-light text-foreground/50 sm:flex-row sm:items-center sm:justify-between`}
      >
        <Link href="/anmeldung" className={`${SERIF} text-xl text-foreground ${LINK}`}>
          {EVENT.name} <span className="text-foreground/40">· {EVENT.hosts}</span>
        </Link>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a href="https://www.raikholetz.com" target="_blank" rel="noopener noreferrer" className={LINK}>
            raikholetz.com
          </a>
          <a href="https://www.tonsammler.com" target="_blank" rel="noopener noreferrer" className={LINK}>
            tonsammler.com
          </a>
          <Link href="/anmeldung/rechtliches" className={LINK}>
            Impressum & Datenschutz
          </Link>
        </div>
      </div>
    </footer>
  );
}
