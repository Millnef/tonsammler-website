import type { ReactNode } from "react";
import { LEGAL_UPDATED, OPERATOR } from "@/lib/legal";

// Building blocks of the imprint and the privacy notices. The website uses all of
// them (/impressum, /datenschutz); the registration page adds its own event sections.

export type LegalLang = "de" | "en";

const H3 = "mt-10 text-sm font-medium uppercase tracking-[0.15em] text-accent";
const BODY = "mt-3 space-y-3 font-light leading-relaxed text-foreground/75";
const LINK = "underline underline-offset-4 transition-colors duration-200 ease-out hover:text-accent";

export function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className={H3}>{title}</h3>
      <div className={BODY}>{children}</div>
    </div>
  );
}

export function Mail() {
  return (
    <a href={`mailto:${OPERATOR.email}`} className={LINK}>
      {OPERATOR.email}
    </a>
  );
}

function External({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={LINK}>
      {children}
    </a>
  );
}

function Address({ lang }: { lang: LegalLang }) {
  return (
    <p>
      {OPERATOR.name}
      <br />
      {OPERATOR.street}
      <br />
      {OPERATOR.city}
      {lang === "en" && (
        <>
          <br />
          {OPERATOR.country.en}
        </>
      )}
    </p>
  );
}

export function Imprint({ lang, credits }: { lang: LegalLang; credits: ReactNode }) {
  const de = lang === "de";
  return (
    <>
      <Block title={de ? "Angaben gemäß § 5 DDG" : "Information pursuant to § 5 DDG (German Digital Services Act)"}>
        <Address lang={lang} />
      </Block>
      <Block title={de ? "Kontakt" : "Contact"}>
        <p>
          {de ? "Telefon" : "Phone"}: {OPERATOR.phone}
          <br />
          {de ? "E-Mail" : "Email"}: <Mail />
        </p>
      </Block>
      <Block title={de ? "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV" : "Responsible for the content pursuant to § 18 (2) MStV"}>
        <Address lang={lang} />
      </Block>
      <Block title={de ? "Bildnachweise" : "Image credits"}>
        <p>{credits}</p>
      </Block>
      {!de && <TranslationNote />}
    </>
  );
}

export function TranslationNote() {
  return (
    <p className="mt-10 text-sm font-light text-foreground/50">
      This English version is a courtesy translation; the German version is legally binding.
    </p>
  );
}

export function PrivacyIntro({ lang }: { lang: LegalLang }) {
  return (
    <p className="mt-6 font-light leading-relaxed text-foreground/75">
      {lang === "de"
        ? `Hier steht, welche Daten diese Seite verarbeitet, wofür und welche Rechte du hast. Stand: ${LEGAL_UPDATED.de}.`
        : `This page explains which data this site processes, for what purpose, and what your rights are. Last updated: ${LEGAL_UPDATED.en}.`}
    </p>
  );
}

export function PrivacyController({ lang }: { lang: LegalLang }) {
  const de = lang === "de";
  return (
    <Block title={de ? "Verantwortlich" : "Controller"}>
      <Address lang={lang} />
      <p>
        {de ? "E-Mail" : "Email"}: <Mail />
        <br />
        {de ? "Telefon" : "Phone"}: {OPERATOR.phone}
      </p>
    </Block>
  );
}

export function PrivacyHosting({ lang }: { lang: LegalLang }) {
  return lang === "de" ? (
    <Block title="Aufruf der Seite und Hosting">
      <p>
        Die Seite wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA, gehostet. Beim Aufruf
        verarbeitet Vercel technisch notwendige Daten wie IP-Adresse, Datum und Uhrzeit, aufgerufene Seite und Browser
        in Server-Logfiles, um die Seite auszuliefern und abzusichern (Art. 6 Abs. 1 lit. f DSGVO). Die Übermittlung
        in die USA stützt sich auf das EU-US Data Privacy Framework bzw. die EU-Standardvertragsklauseln.
      </p>
    </Block>
  ) : (
    <Block title="Visiting the site and hosting">
      <p>
        The site is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA. When you visit it, Vercel
        processes technically necessary data such as your IP address, date and time, the page requested and your
        browser in server log files in order to deliver and secure the site (Art. 6 (1) (f) GDPR). The transfer to the
        USA is based on the EU-US Data Privacy Framework or the EU Standard Contractual Clauses.
      </p>
    </Block>
  );
}

export function PrivacyNoTracking({ lang, players }: { lang: LegalLang; players: boolean }) {
  return lang === "de" ? (
    <Block title="Keine Cookies, kein Tracking">
      <p>
        Diese Seite setzt keine Cookies und nutzt keine Analyse- oder Tracking-Dienste. Die Schriften werden vom
        eigenen Server geladen, es besteht keine Verbindung zu Google Fonts.
        {players &&
          " Wenn du einen Player lädst, merkt sich dein Browser das nur bis zum Schließen des Tabs (Session Storage), damit du nicht bei jedem Wechsel erneut klicken musst. Dabei wird nichts an mich übertragen (§ 25 Abs. 2 Nr. 2 TDDDG)."}
      </p>
    </Block>
  ) : (
    <Block title="No cookies, no tracking">
      <p>
        This site sets no cookies and uses no analytics or tracking services. The fonts are served from the site&apos;s
        own server; there is no connection to Google Fonts.
        {players &&
          " When you load a player, your browser remembers that only until you close the tab (session storage), so you do not have to click again each time. Nothing is sent to me in the process (§ 25 (2) no. 2 TDDDG)."}
      </p>
    </Block>
  );
}

export function PrivacyRights({ lang }: { lang: LegalLang }) {
  return lang === "de" ? (
    <Block title="Deine Rechte">
      <p>
        Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit
        und Widerspruch (Art. 15–21 DSGVO) sowie das Recht, Einwilligungen jederzeit für die Zukunft zu widerrufen
        (Art. 7 Abs. 3 DSGVO). Eine E-Mail an <Mail /> genügt. Außerdem kannst du dich bei einer
        Datenschutz-Aufsichtsbehörde beschweren, z. B. beim Bayerischen Landesamt für Datenschutzaufsicht, Promenade
        18, 91522 Ansbach.
      </p>
    </Block>
  ) : (
    <Block title="Your rights">
      <p>
        You have the right to access, rectification, erasure, restriction of processing, data portability and to
        object (Art. 15–21 GDPR), and the right to withdraw any consent at any time with effect for the future (Art. 7
        (3) GDPR). An email to <Mail /> is enough. You can also lodge a complaint with a data protection supervisory
        authority, e.g. the Bavarian Data Protection Authority (BayLDA), Promenade 18, 91522 Ansbach, Germany.
      </p>
    </Block>
  );
}

const PLAYERS = [
  {
    name: "Spotify",
    provider: "Spotify AB, Regeringsgatan 19, 111 53 Stockholm, Schweden",
    providerEn: "Spotify AB, Regeringsgatan 19, 111 53 Stockholm, Sweden",
    policy: "https://www.spotify.com/de/legal/privacy-policy/",
  },
  {
    name: "SoundCloud",
    provider: "SoundCloud Global Limited & Co. KG, Rheinsberger Str. 76/77, 10115 Berlin",
    providerEn: "SoundCloud Global Limited & Co. KG, Rheinsberger Str. 76/77, 10115 Berlin, Germany",
    policy: "https://soundcloud.com/pages/privacy",
  },
  {
    name: "Bandcamp",
    provider: "Bandcamp, Inc., USA",
    providerEn: "Bandcamp, Inc., USA",
    policy: "https://bandcamp.com/privacy",
  },
  {
    name: "YouTube",
    provider: "Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland – im erweiterten Datenschutzmodus (youtube-nocookie.com)",
    providerEn: "Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland – in privacy-enhanced mode (youtube-nocookie.com)",
    policy: "https://policies.google.com/privacy",
  },
];

// The website's own sections: contact, the music and video players, links
export function SitePrivacySections({ lang }: { lang: LegalLang }) {
  const de = lang === "de";
  return (
    <>
      {de ? (
        <Block title="Kontakt und Booking-Anfragen">
          <p>
            Wenn du mir per E-Mail schreibst oder mich anrufst, verarbeite ich deine Angaben, um deine Anfrage zu
            beantworten (bei Booking-Anfragen Art. 6 Abs. 1 lit. b DSGVO, sonst Art. 6 Abs. 1 lit. f DSGVO). Das
            Anfrageformular auf der Booking-Seite speichert nichts: Es öffnet dein E-Mail-Programm mit einer
            vorbereiteten Nachricht, die erst beim Absenden an mich geht. Mein Postfach liegt bei Gmail (Google
            Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland). Ich lösche Anfragen, sobald sie erledigt
            sind, soweit keine gesetzlichen Aufbewahrungspflichten bestehen.
          </p>
        </Block>
      ) : (
        <Block title="Contact and booking requests">
          <p>
            If you email or call me, I process your details in order to answer your request (for booking requests
            Art. 6 (1) (b) GDPR, otherwise Art. 6 (1) (f) GDPR). The request form on the booking page stores nothing:
            it opens your email app with a prepared message that only reaches me once you send it. My mailbox is
            hosted by Gmail (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland). I delete requests
            once they are dealt with, unless statutory retention periods apply.
          </p>
        </Block>
      )}

      <Block title={de ? "Musik- und Videoplayer" : "Music and video players"}>
        {de ? (
          <p>
            Auf dieser Seite kannst du Musik und Videos über Player von Spotify, SoundCloud, Bandcamp und YouTube
            abspielen. Sie werden erst geladen, wenn du auf „… laden“ klickst; vorher baut dein Browser keine
            Verbindung zum Anbieter auf. Mit dem Klick willigst du ein (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1
            TDDDG). Der Anbieter erhält dann u. a. deine IP-Adresse, Browser-Informationen und die aufgerufene Seite
            und kann Cookies oder ähnliche Technologien einsetzen, auch zu eigenen Zwecken. Eine Übermittlung in die
            USA ist möglich und stützt sich auf das EU-US Data Privacy Framework bzw. die EU-Standardvertragsklauseln.
            Die Einwilligung gilt, bis du den Tab schließt.
          </p>
        ) : (
          <p>
            On this site you can play music and videos through players from Spotify, SoundCloud, Bandcamp and
            YouTube. They only load once you click “Load …”; before that your browser does not connect to the
            provider. By clicking you consent (Art. 6 (1) (a) GDPR, § 25 (1) TDDDG). The provider then receives, among
            other things, your IP address, browser information and the page you are on, and may use cookies or
            similar technologies, also for its own purposes. A transfer to the USA is possible and is based on the
            EU-US Data Privacy Framework or the EU Standard Contractual Clauses. Your consent lasts until you close the
            tab.
          </p>
        )}
        <ul className="space-y-2">
          {PLAYERS.map((player) => (
            <li key={player.name}>
              <span className="text-foreground">{player.name}:</span> {de ? player.provider : player.providerEn} ·{" "}
              <External href={player.policy}>{de ? "Datenschutz" : "Privacy policy"}</External>
            </li>
          ))}
        </ul>
      </Block>

      <Block title={de ? "Links zu Plattformen" : "Links to platforms"}>
        <p>
          {de
            ? "Die Seite verlinkt auf Instagram, Spotify, SoundCloud, Bandcamp und YouTube. Erst wenn du einen Link anklickst, werden Daten an den jeweiligen Anbieter übertragen; dort gelten dessen Datenschutzbestimmungen."
            : "The site links to Instagram, Spotify, SoundCloud, Bandcamp and YouTube. Data is only sent to a provider once you click a link; their privacy policy applies there."}
        </p>
      </Block>
    </>
  );
}
