// Registration page for the listening in Raik Holetz' studio (/anmeldung).
// A page of its own: not linked from the website, not indexed, only reachable by link.

// Milan's name is written "Tonsammler" on this page, in headings too (2026-11-02)
export const EVENT = {
  // Working title, the final name is still open
  name: "Farbton",
  subtitle: "Listening im Atelier",
  hosts: "Raik Holetz × Tonsammler",
  date: "Samstag, 28. November 2026",
  dateShort: "Sa 28.11.2026",
  time: "16–20 Uhr",
  // Registration closes at the end of this day (German time)
  deadline: "2026-11-22T23:59:59+01:00",
  deadlineLabel: "Sonntag, 22. November",
  capacity: 80,
};

// Raik's studio as listed on Google Maps ("Kunstraum - Raik Holetz"). Without a street
// the page shows the town only and says the address follows with the confirmation.
export const VENUE = {
  name: "Kunstraum Raik Holetz",
  town: "Landsberg am Lech",
  street: "Am Seelberg 55",
  city: "86899 Landsberg am Lech",
  maps: "https://www.google.com/maps/search/?api=1&query=Kunstraum%20Raik%20Holetz%2C%20Am%20Seelberg%2055%2C%2086899%20Landsberg%20am%20Lech",
};

// Google Apps Script web app that writes into the guest list (Google Sheet) and sends
// the confirmation e-mail. Empty until it is deployed: the form then runs in test mode.
export const ENDPOINT = "";

// Heading and description from Raik's flyer (2026-11-02)
export const INTRO = {
  formats: ["Ausstellung", "Live Painting", "DJ Set"],
  paragraphs: [
    "Im KUNSTRAUM treffen großformatige Gemälde, intime Skizzen auf warmes Licht, elektronische Musik und eine offene Atelieratmosphäre.",
    "Während Raik Holetz live ein neues Gemälde entstehen lässt, nimmt euch Tonsammler aus München mit auf ein vierstündiges DJ-Set, von entspanntem Ambient / House bis hin zu treibenden elektronischen Beats.",
    "Die Musik verändert den Raum, das Bild wächst mit jedem Pinselstrich.",
    "Dazwischen gibt es Drinks, Gespräche, Interaktives und die Möglichkeit, Kunst einmal aus einer anderen Perspektive zu erleben.",
  ],
};

export const FACTS = [
  { label: "Wann", value: EVENT.date, note: `${EVENT.time}, Einlass ab 16 Uhr` },
  { label: "Eintritt", value: "Frei, nur mit Anmeldung", note: `Begrenzte Plätze · Anmeldeschluss ${EVENT.deadlineLabel}` },
  { label: "Getränke", value: "Gegen Spende", note: "Bier, Wein, Softdrinks" },
];

export const ARTWORKS = [
  { src: "/anmeldung/raik-21.jpg", width: 1600, height: 1325 },
  { src: "/anmeldung/raik-02.jpg", width: 1597, height: 1600 },
  { src: "/anmeldung/raik-20.jpg", width: 1070, height: 1600 },
  { src: "/anmeldung/raik-07.jpg", width: 1538, height: 1362 },
  { src: "/anmeldung/raik-27.jpg", width: 1113, height: 1366 },
  { src: "/anmeldung/raik-03.jpg", width: 1600, height: 1178 },
];

export const HERO_ART = { src: "/anmeldung/raik-18.jpg", width: 1538, height: 1600 };

export const ARTISTS = [
  {
    name: "Raik Holetz",
    role: "Malerei & Skulptur",
    text: "Seine Bilder beginnen draußen am Lech, mitten in der Landschaft, und wachsen im Atelier weiter: Horizonte, Licht und Gesichter, die den Geist eines Ortes zeigen.",
    image: { src: "/anmeldung/raik-holetz-atelier.jpg", width: 1066, height: 1600, alt: "Raik Holetz in seinem Atelier vor seinen Bildern" },
    links: [
      { label: "raikholetz.com", href: "https://www.raikholetz.com" },
      { label: "Instagram", href: "https://www.instagram.com/raikholetz/" },
    ],
  },
  {
    name: "Tonsammler",
    role: "DJ & Producer · München",
    text: "Tonsammler bringt tiefe, treibende Sounds, um Leute zu bewegen, physisch wie emotional.",
    image: { src: "/epk/photos/TONSAMMLER-Portrait-sw-1.jpg", width: 3287, height: 5120, alt: "Porträt Tonsammler" },
    links: [
      { label: "tonsammler.com", href: "https://www.tonsammler.com" },
      { label: "Instagram", href: "https://www.instagram.com/ton.sammler/" },
    ],
  },
];

export const HEARD_FROM = ["Instagram", "Freunde", "Raik Holetz", "Tonsammler", "Sonstiges"];

export const CONSENT_MEDIA =
  "Ich bin einverstanden, dass beim Event fotografiert und gefilmt wird und Aufnahmen, auf denen ich zu sehen bin, von Raik Holetz und Tonsammler veröffentlicht werden dürfen, z. B. auf Instagram und ihren Websites. Diese Einwilligung kann ich jederzeit für die Zukunft widerrufen.";

// Optional, separate consent: lets the guest list be used for future invitations
export const CONSENT_NEWS = "Ja, informiert mich per E-Mail über künftige Events von Raik Holetz und Tonsammler. (optional)";

// Responsible person for the page (imprint and privacy notice), shared with the website
export { OPERATOR } from "@/lib/legal";
