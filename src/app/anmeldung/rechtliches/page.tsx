import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import EventFooter from "@/components/anmeldung/EventFooter";
import { CONTAINER, SERIF } from "@/components/anmeldung/styles";
import { EVENT, OPERATOR, VENUE } from "@/lib/anmeldung-content";

export const metadata: Metadata = {
  title: `Impressum & Datenschutz · ${EVENT.name}`,
};

const H2 = `${SERIF} text-4xl leading-tight sm:text-5xl`;
const H3 = "mt-10 text-sm font-medium uppercase tracking-[0.15em] text-accent";
const P = "mt-3 font-light leading-relaxed text-foreground/75";

export default function RechtlichesPage() {
  const address = (
    <>
      {OPERATOR.name}
      <br />
      {OPERATOR.street}
      <br />
      {OPERATOR.city}
    </>
  );

  return (
    <>
      <main className={`${CONTAINER} max-w-3xl py-16 sm:py-24`}>
        <Link
          href="/anmeldung"
          className="text-xs font-medium uppercase tracking-[0.15em] text-foreground/60 transition-colors duration-200 ease-out hover:text-accent"
        >
          ← Zurück zu {EVENT.name}
        </Link>

        <section className="mt-16">
          <h1 className={H2}>Impressum</h1>
          <h3 className={H3}>Angaben gemäß § 5 DDG</h3>
          <p className={P}>{address}</p>
          <h3 className={H3}>Kontakt</h3>
          <p className={P}>
            Telefon: {OPERATOR.phone}
            <br />
            E-Mail: <Mail />
          </p>
          <h3 className={H3}>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h3>
          <p className={P}>{address}</p>
          <h3 className={H3}>Bildrechte</h3>
          <p className={P}>Alle Gemälde © Raik Holetz. Porträt TONSAMMLER © Milan-Joel Pawlick.</p>
        </section>

        <section id="datenschutz" className="mt-24 scroll-mt-8 border-t border-white/10 pt-16">
          <h2 className={H2}>Datenschutz</h2>
          <p className={P}>
            Hier steht, welche Daten diese Seite verarbeitet, wofür und welche Rechte du hast. Stand: Oktober 2026.
          </p>

          <Block title="1. Verantwortlich">
            {address}
            <br />
            E-Mail: <Mail />
          </Block>

          <Block title="2. Aufruf der Seite und Hosting">
            Die Seite wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA, gehostet. Beim Aufruf
            verarbeitet Vercel technisch notwendige Daten wie IP-Adresse, Datum und Uhrzeit, aufgerufene Seite und
            Browser in Server-Logfiles, um die Seite auszuliefern und abzusichern (Art. 6 Abs. 1 lit. f DSGVO). Die
            Übermittlung in die USA stützt sich auf das EU-US Data Privacy Framework bzw. die
            EU-Standardvertragsklauseln.
          </Block>

          <Block title="3. Keine Cookies, kein Tracking">
            Diese Seite setzt keine Cookies und nutzt keine Analyse- oder Tracking-Dienste. Die Schriften werden vom
            eigenen Server geladen, es besteht keine Verbindung zu Google Fonts.
          </Block>

          <Block title="4. Anmeldung zum Event">
            Bei der Anmeldung verarbeiten wir deinen Namen, deine E-Mail-Adresse, freiwillig deinen Instagram-Namen
            und wie du vom Event erfahren hast, deine Einwilligungen sowie den Zeitpunkt der Anmeldung. Wir nutzen
            die Daten, um das Event am {EVENT.dateShort} zu organisieren: Gästeliste und Einlass, Bestätigung,
            Warteliste sowie Infos und Erinnerung zu diesem Event (Art. 6 Abs. 1 lit. b DSGVO). Die Daten werden in
            einer Google-Tabelle im Konto des Verantwortlichen gespeichert, die Bestätigung wird über Gmail
            verschickt. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland; eine
            Übermittlung an Google LLC in die USA ist möglich und stützt sich auf das EU-US Data Privacy Framework.
            Die Gästeliste nutzen nur die Veranstalter Milan-Joel Pawlick und Raik Holetz. Wir löschen die Daten
            spätestens drei Monate nach dem Event. Wenn du zugestimmt hast, über künftige Events informiert zu
            werden, behalten wir Name und E-Mail-Adresse dafür, bis du widersprichst (Art. 6 Abs. 1 lit. a DSGVO).
          </Block>

          <Block title="5. Foto- und Videoaufnahmen">
            Beim Event wird fotografiert und gefilmt. Mit deiner Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) dürfen
            Raik Holetz und TONSAMMLER Aufnahmen, auf denen du zu sehen bist, veröffentlichen, z. B. auf Instagram
            und auf raikholetz.com und tonsammler.com. Du kannst die Einwilligung jederzeit für die Zukunft
            widerrufen, eine E-Mail an <Mail /> genügt. Bereits veröffentlichte Beiträge mit dir nehmen wir dann auf
            Wunsch herunter, soweit uns das möglich ist.
          </Block>

          <Block title="6. Links zu anderen Seiten">
            Die Seite verlinkt auf Google Maps (Route zum {VENUE.name}), Instagram und die Websites von Raik Holetz
            und TONSAMMLER. Erst wenn du einen Link anklickst, werden Daten an den jeweiligen Anbieter übertragen;
            dort gelten dessen Datenschutzbestimmungen.
          </Block>

          <Block title="7. Deine Rechte">
            Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
            Datenübertragbarkeit und Widerspruch (Art. 15–21 DSGVO) sowie das Recht, Einwilligungen jederzeit für die
            Zukunft zu widerrufen (Art. 7 Abs. 3 DSGVO). Eine E-Mail an <Mail /> genügt. Außerdem kannst du dich bei
            einer Datenschutz-Aufsichtsbehörde beschweren, z. B. beim Bayerischen Landesamt für
            Datenschutzaufsicht, Promenade 18, 91522 Ansbach.
          </Block>
        </section>
      </main>
      <EventFooter />
    </>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className={H3}>{title}</h3>
      <p className={P}>{children}</p>
    </div>
  );
}

function Mail() {
  return (
    <a href={`mailto:${OPERATOR.email}`} className="underline underline-offset-4 hover:text-accent">
      {OPERATOR.email}
    </a>
  );
}

