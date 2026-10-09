// Content of the Electronic Press Kit (/epk German, /epk/en English)

export type EpkLang = "de" | "en";

export const EPK_PATHS: Record<EpkLang, string> = { de: "/epk", en: "/epk/en" };

export const EMAIL = "tonsammlermusic@gmail.com";
export const PHONE = "+49 151 10468852";
export const PHONE_HREF = "tel:+4915110468852";

export const LINKS = {
  spotifyArtist: "https://open.spotify.com/artist/1duyw9D875T8M1v7VaoPep",
  spotifyEp: "https://open.spotify.com/album/4DRPNg4D5uykjGoGmWhm0o",
  bandcampEp: "https://tonsammler.bandcamp.com/album/i",
  bandcamp: "https://tonsammler.bandcamp.com",
  soundcloud: "https://soundcloud.com/tonsammlermusic",
  soundcloudEp: "https://soundcloud.com/tonsammlermusic/sets/i",
  soundcloudLilo: "https://soundcloud.com/tonsammlermusic/laut-in-love-tonsammler",
  youtube: "https://www.youtube.com/@TONSAMMLER",
  youtubeThoughts2: "https://www.youtube.com/watch?v=bCHRygiNuaI",
  youtubeSet: "https://www.youtube.com/watch?v=qBRBy3EUuRc",
  instagram: "https://www.instagram.com/ton.sammler/",
  impedanz: "https://www.instagram.com/impedanz.kollektiv/",
};

export const EMBEDS = {
  spotifyEp:
    "https://open.spotify.com/embed/album/4DRPNg4D5uykjGoGmWhm0o?utm_source=generator&theme=0",
  soundcloudLilo:
    "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2415263193&color=%234c2c4c&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
  youtubeSet: "https://www.youtube.com/embed/qBRBy3EUuRc?start=900",
};

export const PDF: Record<EpkLang, string> = {
  de: "/epk/TONSAMMLER-EPK-DE.pdf",
  en: "/epk/TONSAMMLER-EPK-EN.pdf",
};
export const PRESS_ZIP = "/epk/TONSAMMLER-Pressefotos.zip";

export const LOGOS = [
  { src: "/epk/TONSAMMLER-Logo-weiss.png", on: "dark" },
  { src: "/epk/TONSAMMLER-Logo-schwarz.png", on: "light" },
] as const;

export const PHOTOS = [
  { src: "/images/hero-portrait.jpg", file: "TONSAMMLER-Portrait-sw.jpg", size: "1284 × 2000", position: "object-[center_22%]" },
  { src: "/images/gallery/gallery-portrait.jpg", file: "TONSAMMLER-Portrait-Farbe.jpg", size: "1334 × 2000", position: "object-[center_30%]" },
  { src: "/images/gallery/gallery-event-scopez.jpg", file: "TONSAMMLER-Live-Scopez-Events.jpg", size: "1333 × 2000", position: "object-top" },
  { src: "/images/gallery/gallery-event-3.jpg", file: "TONSAMMLER-Live-OH-BOI.jpg", size: "1204 × 1600", position: "object-center" },
  { src: "/images/gallery/gallery-event-1.jpg", file: "TONSAMMLER-Live-YOU-LOFT.jpg", size: "1069 × 1600", position: "object-top" },
  { src: "/images/gallery/gallery-event-karo10.jpg", file: "TONSAMMLER-Live-KARO10.jpg", size: "2000 × 1333", position: "object-center" },
] as const;

const TRACKS = [
  { title: "first", length: "8:30" },
  { title: "thoughts2", length: "7:42" },
];

// `when` is a date or, without one, a short tag
type Gig = { when: string; venue: string; place?: Record<EpkLang, string>; note: Record<EpkLang, string> };

const GIGS: Gig[] = [
  { when: "Festival", venue: "Laut In Love Festival", note: { de: "Bei Berlin · Bunker, 03:00–04:30", en: "Near Berlin · bunker, 3–4:30 am" } },
  { when: "02.05.2026", venue: "Scopez Events", note: { de: "Private Summer Outdoor", en: "Private summer outdoor" } },
  { when: "20.12.2025", venue: "KARO10", note: { de: "IMPEDANZ Kollektiv", en: "IMPEDANZ collective" } },
  { when: "05.12.2025", venue: "OH BOI", note: { de: "8 Stunden All Night Long", en: "8-hour all night long" } },
  { when: "19.04.2024", venue: "YOU LOFT", place: { de: "München", en: "Munich" }, note: { de: "Sinister Basslines Kollektiv", en: "Sinister Basslines collective" } },
];

const MORE_VENUES = ["Gruam", "Katchin im Feierwerk"];

export const EPK = {
  de: {
    meta: {
      title: "TONSAMMLER – Electronic Press Kit",
      description:
        "DJ & Producer aus München: Minimal, Deep House, Techno. Bio, Musik, Referenzen, Pressefotos, Technical Rider und Booking.",
    },
    nav: [
      ["bio", "Bio"],
      ["musik", "Musik"],
      ["referenzen", "Referenzen"],
      ["presse", "Presse"],
      ["rider", "Rider"],
      ["kontakt", "Kontakt"],
    ],
    switchLabel: "EN",
    switchAria: "English version",
    booking: "Booking anfragen",
    pdf: "EPK als PDF",
    copy: "Kopieren",
    copied: "Kopiert!",
    hero: {
      kicker: "Electronic Press Kit",
      role: "Milan-Joel Pawlick · DJ & Producer · München",
      tagline: "„collecting feelings through sound“",
      genres: ["Minimal", "Deep House", "Techno"],
    },
    facts: [
      { value: "60+", label: "Gigs" },
      { value: "10", label: "Eigene Events mit IMPEDANZ" },
      { value: "8 h", label: "Längstes Set, All Night Long" },
      { value: "3", label: "Jahre aktiv" },
    ],
    bio: {
      title: "Bio",
      shortLabel: "Kurzbio",
      short:
        "TONSAMMLER bringt in den Genres von Minimal bis Techno tiefe, treibende, repetitive Loops mit Energie. Sein Sound ist für die Tanzfläche gebaut, um Leute zu bewegen, physisch wie emotional.",
      longLabel: "Pressetext",
      long: [
        "Hinter TONSAMMLER steht Milan-Joel Pawlick, aufgewachsen zwischen Augsburg und München. Elektronische Musik begleitet ihn seit zehn Jahren: angefangen mit Techno um 125 BPM, über eine kurze, schnelle Phase mit Hardtechno und Schranz, bis zu der Erkenntnis, dass es nicht um schneller und härter geht, sondern um tiefer und reduzierter.",
        "Heute steht der Name für Minimal, Deep House und Techno, die sich Zeit nehmen: tiefe, treibende, repetitive Loops, die Raum für Interpretation lassen und trotzdem Energie aufbauen. „Collecting feelings through sound“ ist dabei mehr Haltung als Slogan. Seine Stärke sind lange Sets, bis hin zu acht Stunden All Night Long.",
        "Über 60 Gigs, unter anderem in der Gruam, im YOU LOFT und bei Katchin im Feierwerk in München, dazu Festival-Auftritte wie auf dem Laut In Love Festival bei Berlin. Als Mitgründer des IMPEDANZ Kollektivs hat er zehn eigene Events in Augsburg verantwortet, von Konzept und Booking bis Design und Promotion. Im Oktober 2026 erschien seine Debüt-EP „I“.",
      ],
      details: [
        ["Genre", "Minimal, Deep House, Techno"],
        ["Sound", "Tief, treibend, repetitiv"],
        ["Sets", "90 Minuten bis All Night Long"],
        ["Base", "München"],
      ],
    },
    music: {
      title: "Musik",
      releaseKicker: "Debüt-EP · 05.10.2026",
      releaseTitle: "I · TONSAMMLER",
      tracks: TRACKS,
      buy: "Kaufen",
      setsLabel: "Sets",
      sets: [
        { title: "Laut In Love Festival", meta: "Bunker · 03:00–04:30 · 90 min", platform: "SoundCloud" },
        { title: "Minimal / Deep House Set", meta: "Scopez Events · Outdoor", platform: "YouTube" },
      ],
      allSets: "Alle Sets auf SoundCloud",
    },
    references: {
      title: "Referenzen",
      gigs: GIGS,
      moreLabel: "Außerdem in München",
      more: MORE_VENUES,
      impedanz: {
        kicker: "Mitgründer",
        name: "IMPEDANZ Kollektiv",
        text: "Drei Mitglieder, zehn eigene Events in Augsburg. Verantwortung für Konzept, Organisation, Booking, Design, Promotion und Social Media. Jeder Abend folgt einer klaren Linie, getragen von Acts, die genau dafür ausgewählt werden.",
      },
    },
    press: {
      title: "Presse",
      photosLabel: "Pressefotos",
      download: "Download",
      zip: "Alle Fotos & Logos (ZIP)",
      logoLabel: "Logo",
      logoNames: { dark: "Weiß, transparent (PNG)", light: "Schwarz, transparent (PNG)" },
      note: "Frei zur Verwendung für die Promotion von TONSAMMLER-Auftritten.",
    },
    rider: {
      title: "Technical Rider",
      items: [
        ["Player", "2× Pioneer CDJ-3000 (alternativ CDJ-2000NXS2)"],
        ["Mixer", "Allen & Heath Xone:96 oder Pioneer DJM-900NXS2 / DJM-V10"],
        ["Medium", "USB-Stick, laptopfrei"],
        ["Monitoring", "2 Booth-Monitore, separat regelbar"],
        ["Set-Länge", "90 Minuten bis All Night Long"],
      ],
    },
    contact: {
      title: "Kontakt",
      lead: "Booking, Anfragen und Kollaborationen",
      email: "E-Mail",
      phone: "Mobil",
      social: "Social Media & Musik",
      website: "Website",
      mailSubject: "Booking TONSAMMLER",
      mailBody: "Hallo Milan,\n\nDatum:\nLocation / Reihe:\nSlot & Spielzeit:\nGage:\n\n",
    },
    footer: "Electronic Press Kit",
  },
  en: {
    meta: {
      title: "TONSAMMLER – Electronic Press Kit",
      description:
        "DJ & producer from Munich: minimal, deep house, techno. Bio, music, references, press photos, technical rider and booking.",
    },
    nav: [
      ["bio", "Bio"],
      ["musik", "Music"],
      ["referenzen", "References"],
      ["presse", "Press"],
      ["rider", "Rider"],
      ["kontakt", "Contact"],
    ],
    switchLabel: "DE",
    switchAria: "Deutsche Version",
    booking: "Booking request",
    pdf: "EPK as PDF",
    copy: "Copy",
    copied: "Copied!",
    hero: {
      kicker: "Electronic Press Kit",
      role: "Milan-Joel Pawlick · DJ & producer · Munich",
      tagline: "“collecting feelings through sound”",
      genres: ["Minimal", "Deep House", "Techno"],
    },
    facts: [
      { value: "60+", label: "Gigs" },
      { value: "10", label: "Own events with IMPEDANZ" },
      { value: "8 h", label: "Longest set, all night long" },
      { value: "3", label: "Years active" },
    ],
    bio: {
      title: "Bio",
      shortLabel: "Short bio",
      short:
        "TONSAMMLER brings deep, driving, repetitive loops with energy to genres ranging from minimal to techno. His sound is made for the dance floor, built to move people, both physically and emotionally.",
      longLabel: "Press text",
      long: [
        "TONSAMMLER is Milan-Joel Pawlick, who grew up between Augsburg and Munich. Electronic music has been part of his life for ten years: from techno around 125 BPM, through a short, fast phase of hardtechno and Schranz, to the realisation that it's not about faster and harder, but about deeper and more reduced.",
        "Today the name stands for minimal, deep house and techno that take their time: deep, driving, repetitive loops that leave room for interpretation while still building energy. “Collecting feelings through sound” is more of an attitude than a slogan. Long sets are his strength, up to eight hours all night long.",
        "More than 60 gigs, among them Gruam, YOU LOFT and Katchin at Feierwerk in Munich, plus festival slots such as Laut In Love Festival near Berlin. As co-founder of the IMPEDANZ collective he has run ten events of his own in Augsburg, from concept and booking to design and promotion. His debut EP “I” came out in October 2026.",
      ],
      details: [
        ["Genre", "Minimal, deep house, techno"],
        ["Sound", "Deep, driving, repetitive"],
        ["Sets", "90 minutes to all night long"],
        ["Base", "Munich, Germany"],
      ],
    },
    music: {
      title: "Music",
      releaseKicker: "Debut EP · 05.10.2026",
      releaseTitle: "I · TONSAMMLER",
      tracks: TRACKS,
      buy: "Buy",
      setsLabel: "Sets",
      sets: [
        { title: "Laut In Love Festival", meta: "Bunker · 3–4:30 am · 90 min", platform: "SoundCloud" },
        { title: "Minimal / Deep House Set", meta: "Scopez Events · outdoor", platform: "YouTube" },
      ],
      allSets: "All sets on SoundCloud",
    },
    references: {
      title: "References",
      gigs: GIGS,
      moreLabel: "Also in Munich",
      more: MORE_VENUES,
      impedanz: {
        kicker: "Co-founder",
        name: "IMPEDANZ collective",
        text: "Three members, ten events of their own in Augsburg. Responsible for concept, organisation, booking, design, promotion and social media. Every night follows a clear line, carried by acts chosen for exactly that.",
      },
    },
    press: {
      title: "Press",
      photosLabel: "Press photos",
      download: "Download",
      zip: "All photos & logos (ZIP)",
      logoLabel: "Logo",
      logoNames: { dark: "White, transparent (PNG)", light: "Black, transparent (PNG)" },
      note: "Free to use for promoting TONSAMMLER performances.",
    },
    rider: {
      title: "Technical rider",
      items: [
        ["Players", "2× Pioneer CDJ-3000 (alternatively CDJ-2000NXS2)"],
        ["Mixer", "Allen & Heath Xone:96 or Pioneer DJM-900NXS2 / DJM-V10"],
        ["Media", "USB stick, no laptop"],
        ["Monitoring", "2 booth monitors, separately adjustable"],
        ["Set length", "90 minutes to all night long"],
      ],
    },
    contact: {
      title: "Contact",
      lead: "Booking, enquiries and collaborations",
      email: "Email",
      phone: "Phone",
      social: "Social media & music",
      website: "Website",
      mailSubject: "Booking TONSAMMLER",
      mailBody: "Hi Milan,\n\nDate:\nVenue / series:\nSlot & set length:\nFee:\n\n",
    },
    footer: "Electronic press kit",
  },
} satisfies Record<EpkLang, unknown>;

export type EpkText = (typeof EPK)[EpkLang];
