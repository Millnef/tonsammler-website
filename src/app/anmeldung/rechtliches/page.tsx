import type { Metadata } from "next";
import Link from "next/link";
import EventFooter from "@/components/anmeldung/EventFooter";
import { CONTAINER, SERIF } from "@/components/anmeldung/styles";
import {
  Block,
  Imprint,
  Mail,
  PrivacyController,
  PrivacyHosting,
  PrivacyIntro,
  PrivacyNoTracking,
  PrivacyRights,
} from "@/components/legal/LegalContent";
import { EVENT, VENUE } from "@/lib/anmeldung-content";

export const metadata: Metadata = {
  title: `Impressum & Datenschutz · ${EVENT.name}`,
};

const H2 = `${SERIF} text-4xl leading-tight sm:text-5xl`;

// Same imprint and general privacy texts as the website (components/legal), plus the
// sections about the registration and the photos at the event
export default function RechtlichesPage() {
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
          <Imprint lang="de" credits="Alle Gemälde © Raik Holetz. Porträt Tonsammler © Milan-Joel Pawlick." />
        </section>

        <section id="datenschutz" className="mt-24 scroll-mt-8 border-t border-white/10 pt-16">
          <h2 className={H2}>Datenschutz</h2>
          <PrivacyIntro lang="de" />
          <PrivacyController lang="de" />
          <PrivacyHosting lang="de" />
          <PrivacyNoTracking lang="de" players={false} />

          <Block title="Anmeldung zum Event">
            <p>
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
            </p>
          </Block>

          <Block title="Foto- und Videoaufnahmen">
            <p>
              Beim Event wird fotografiert und gefilmt. Mit deiner Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) dürfen
              Raik Holetz und Tonsammler Aufnahmen, auf denen du zu sehen bist, veröffentlichen, z. B. auf Instagram
              und auf raikholetz.com und tonsammler.com. Du kannst die Einwilligung jederzeit für die Zukunft
              widerrufen, eine E-Mail an <Mail /> genügt. Bereits veröffentlichte Beiträge mit dir nehmen wir dann auf
              Wunsch herunter, soweit uns das möglich ist.
            </p>
          </Block>

          <Block title="Links zu anderen Seiten">
            <p>
              Die Seite verlinkt auf {VENUE.maps ? `Google Maps (Route zum ${VENUE.name}), ` : ""}Instagram und die
              Websites von Raik Holetz und Tonsammler. Erst wenn du einen Link anklickst, werden Daten an den
              jeweiligen Anbieter übertragen; dort gelten dessen Datenschutzbestimmungen.
            </p>
          </Block>

          <PrivacyRights lang="de" />
        </section>
      </main>
      <EventFooter />
    </>
  );
}
