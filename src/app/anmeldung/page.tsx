import Image from "next/image";
import EventFooter from "@/components/anmeldung/EventFooter";
import RegistrationForm from "@/components/anmeldung/RegistrationForm";
import { CONTAINER, LABEL, PRIMARY, SECONDARY, SERIF } from "@/components/anmeldung/styles";
import { ARTISTS, ARTWORKS, EVENT, FACTS, HERO_ART, INTRO, VENUE } from "@/lib/anmeldung-content";

const SECTION = "border-t border-white/10 py-24 sm:py-32";
const H2 = `${SERIF} text-4xl leading-tight sm:text-5xl`;

export default function AnmeldungPage() {
  return (
    <>
      <main>
        {/* Hero: Raik's painting, TONSAMMLER's type */}
        <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
          <Image
            src={HERO_ART.src}
            alt="Gemälde von Raik Holetz: ein Strudel in Blau"
            fill
            preload
            sizes="100vw"
            className="-z-20 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-b from-black/60 via-black/25 to-black" />

          <div className={`${CONTAINER} flex items-center justify-between gap-4 pt-6 sm:pt-8`}>
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/80">{EVENT.hosts}</span>
            <a
              href="#anmeldung"
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent transition-colors duration-200 ease-out hover:text-foreground"
            >
              Anmelden
            </a>
          </div>

          <div className={`${CONTAINER} mt-auto pb-16 sm:pb-24`}>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent">{EVENT.subtitle}</p>
            <h1 className={`${SERIF} mt-4 text-[clamp(5rem,24vw,15rem)] leading-[0.8] tracking-[-0.02em]`}>{EVENT.name}</h1>
            <p className="mt-8 text-lg font-light text-foreground/90 sm:text-xl">
              {EVENT.dateShort} · {EVENT.time} · {VENUE.town}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#anmeldung" className={PRIMARY}>
                Platz sichern
              </a>
              {VENUE.maps && (
                <a href={VENUE.maps} target="_blank" rel="noopener noreferrer" className={SECONDARY}>
                  Route ↗
                </a>
              )}
            </div>
          </div>
        </section>

        {/* The facts at a glance: no frame, fine lines only between the blocks */}
        <section className={`${CONTAINER} py-24 sm:py-32`}>
          <dl className="grid grid-cols-1 divide-y divide-white/10 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
            {FACTS.slice(0, 1).map((fact) => (
              <Fact key={fact.label} {...fact} />
            ))}
            <div className={FACT}>
              <dt className={LABEL}>Wo</dt>
              <dd className={`${SERIF} mt-3 text-2xl leading-snug`}>{VENUE.name}</dd>
              <dd className="mt-2 text-sm font-light text-foreground/60">
                {VENUE.street ? `${VENUE.street}, ${VENUE.city}` : VENUE.town}
                {!VENUE.street && (
                  <>
                    <br />
                    Die genaue Adresse kommt mit der Bestätigung.
                  </>
                )}
              </dd>
              {VENUE.maps && (
                <dd className="pt-4">
                  <a
                    href={VENUE.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium uppercase tracking-[0.15em] text-accent transition-colors duration-200 ease-out hover:text-foreground"
                  >
                    Route planen ↗
                  </a>
                </dd>
              )}
            </div>
            {FACTS.slice(1).map((fact) => (
              <Fact key={fact.label} {...fact} />
            ))}
          </dl>
        </section>

        {/* What the afternoon is */}
        <section className={`${CONTAINER} pb-24 sm:pb-32`}>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            <h2 className={`${SERIF} text-4xl italic leading-tight sm:text-5xl`}>{INTRO.lead}</h2>
            <div>
              {INTRO.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={
                    index === 0
                      ? "text-xl font-light leading-relaxed sm:text-2xl"
                      : "mt-6 font-light leading-relaxed text-foreground/70 sm:text-lg"
                  }
                >
                  {paragraph}
                </p>
              ))}
              <p className="mt-10 border-l border-accent/60 pl-4 font-light leading-relaxed">
                <span className="text-accent">{INTRO.closing[0]}</span>
                <br />
                {INTRO.closing[1]}
              </p>
            </div>
          </div>
        </section>

        {/* Raik's work */}
        <section className={SECTION}>
          <div className={CONTAINER}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className={H2}>Die Kunst</h2>
              <a
                href="https://www.raikholetz.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium uppercase tracking-[0.15em] text-accent transition-colors duration-200 ease-out hover:text-foreground"
              >
                Mehr auf raikholetz.com ↗
              </a>
            </div>
            <p className="mt-4 max-w-xl font-light leading-relaxed text-foreground/60">
              Eine Auswahl von Arbeiten von Raik Holetz: von schwarzen, figurativen Bildern bis zu expressiven Farbräumen.
            </p>
            <div className="mt-12 columns-2 gap-3 sm:mt-16 sm:gap-4 lg:columns-3">
              {ARTWORKS.map((art, index) => (
                <Image
                  key={art.src}
                  src={art.src}
                  alt={`Gemälde von Raik Holetz (${index + 1})`}
                  width={art.width}
                  height={art.height}
                  sizes="(min-width: 1024px) 24rem, 50vw"
                  className="mb-3 w-full break-inside-avoid sm:mb-4"
                />
              ))}
            </div>
            <p className="mt-6 text-xs font-light text-foreground/40">Alle Werke © Raik Holetz</p>
          </div>
        </section>

        {/* The two hosts */}
        <section className={SECTION}>
          <div className={CONTAINER}>
            <h2 className={H2}>Die Gastgeber</h2>
            <div className="mt-12 grid grid-cols-1 gap-16 sm:mt-16 md:grid-cols-2 md:gap-12">
              {ARTISTS.map((artist) => (
                <article key={artist.name}>
                  <div className="relative aspect-[4/5] overflow-hidden border border-white/10">
                    <Image
                      src={artist.image.src}
                      alt={artist.image.alt}
                      fill
                      sizes="(min-width: 768px) 36rem, 100vw"
                      className="object-cover object-[center_25%]"
                    />
                  </div>
                  <p className={`${LABEL} mt-8`}>{artist.role}</p>
                  <h3 className={`${SERIF} mt-2 text-3xl sm:text-4xl`}>{artist.name}</h3>
                  <p className="mt-4 font-light leading-relaxed text-foreground/70">{artist.text}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {artist.links.map((link) => (
                      <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={SECONDARY}>
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Registration */}
        <section id="anmeldung" className={`${SECTION} scroll-mt-4`}>
          <div className={`${CONTAINER} grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20`}>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent">Anmeldung</p>
              <h2 className={`${H2} mt-4`}>Platz sichern</h2>
              {/* Date and place are already at the top of the page */}
              <p className="mt-6 font-light leading-relaxed text-foreground/70">
                Melde dich bis {EVENT.deadlineLabel} an, die Bestätigung kommt per E-Mail. Sind alle Plätze vergeben,
                kommst du auf die Warteliste.
              </p>
            </div>
            <RegistrationForm />
          </div>
        </section>
      </main>
      <EventFooter />
    </>
  );
}

// Padding: the lines between the blocks run horizontally on phones and vertically from lg
const FACT = "py-6 lg:px-8 lg:py-2 lg:first:pl-0 lg:last:pr-0";

function Fact({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className={FACT}>
      <dt className={LABEL}>{label}</dt>
      <dd className={`${SERIF} mt-3 text-2xl leading-snug`}>{value}</dd>
      <dd className="mt-2 text-sm font-light text-foreground/60">{note}</dd>
    </div>
  );
}
