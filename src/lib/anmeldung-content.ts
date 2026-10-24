// Registration page for the listening in Raik Holetz' studio (/anmeldung).
// A page of its own: not linked from the website, not indexed, only reachable by link.

export const EVENT = {
  // Working title, the final name is still open
  name: "Farbton",
  subtitle: "Listening im Atelier",
  hosts: "Raik Holetz × TONSAMMLER",
  date: "Samstag, 28. November 2026",
  dateShort: "Sa 28.11.2026",
  time: "15–19 Uhr",
  // Registration closes at the end of this day (German time)
  deadline: "2026-11-22T23:59:59+01:00",
  deadlineLabel: "Sonntag, 22. November",
  capacity: 80,
};

// Street and route link stay empty until the exact address is known; the page then
// shows the town only and says the address follows with the confirmation
export const VENUE = {
  name: "Kunstraum Raik Holetz",
  town: "Friedberg",
  region: "bei Augsburg",
  street: "",
  maps: "",
};

// Google Apps Script web app that writes into the guest list (Google Sheet) and sends
// the confirmation e-mail. Empty until it is deployed: the form then runs in test mode.
export const ENDPOINT = "";

// Milan's text (2026-10-24): the lead sentence, the paragraphs, the closing lines
export const INTRO = {
  lead: "Ein Nachmittag, an dem Bild und Klang denselben Raum teilen.",
  paragraphs: [
    "Raik Holetz öffnet sein Atelier: Gemälde, die draußen in der Landschaft beginnen und im Studio weiterwachsen.",
    "Währenddessen legt TONSAMMLER auf – ein Bogen von Ambient über House bis in hypnotischen Techno.",
    "Musik auf Augenhöhe und Zeit zum Hinsehen.",
    "Während des vierstündigen Sets von TONSAMMLER malt Raik in einer Live-Session von 18–19 Uhr ein Bild.",
  ],
  closing: ["Sa 28.11. · 15–19 Uhr · Friedberg", "Begrenzte Plätze, nur mit Anmeldung."],
};

export const FACTS = [
  { label: "Wann", value: EVENT.date, note: `${EVENT.time}, Einlass ab 15 Uhr` },
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
    name: "TONSAMMLER",
    role: "DJ & Producer · München",
    text: "TONSAMMLER bringt Techno mit tiefen, treibenden, repetitiven Loops, gebaut für die Tanzfläche, um Leute zu bewegen, physisch wie emotional. Mitgründer des Kollektivs IMPEDANZ.",
    image: { src: "/epk/photos/TONSAMMLER-Portrait-sw-1.jpg", width: 3287, height: 5120, alt: "Porträt TONSAMMLER" },
    links: [
      { label: "tonsammler.com", href: "https://www.tonsammler.com" },
      { label: "Instagram", href: "https://www.instagram.com/ton.sammler/" },
    ],
  },
];

export const HEARD_FROM = ["Instagram", "Freunde", "Raik Holetz", "TONSAMMLER / IMPEDANZ", "Sonstiges"];

export const CONSENT_MEDIA =
  "Ich bin einverstanden, dass beim Event fotografiert und gefilmt wird und Aufnahmen, auf denen ich zu sehen bin, von Raik Holetz und TONSAMMLER veröffentlicht werden dürfen, z. B. auf Instagram und ihren Websites. Diese Einwilligung kann ich jederzeit für die Zukunft widerrufen.";

// Optional, separate consent: lets the guest list be used for future invitations
export const CONSENT_NEWS = "Ja, informiert mich per E-Mail über künftige Events von Raik Holetz und TONSAMMLER. (optional)";

// Responsible person for the page (imprint and privacy notice)
export const OPERATOR = {
  name: "Milan-Joel Pawlick",
  street: "Floriansmühlstraße 11",
  city: "80939 München",
  email: "tonsammlermusic@gmail.com",
  phone: "+49 151 10468852",
};
