// Content of the booking page / press kit (/booking German, /booking/en English).
// Its downloads (photos, logos, PDFs) live under /epk/*.

export type EpkLang = "de" | "en";

export const EPK_PATHS: Record<EpkLang, string> = { de: "/booking", en: "/booking/en" };

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
  instagram: "https://www.instagram.com/ton.sammler/",
  impedanz: "https://www.instagram.com/impedanz.kollektiv/",
};

export const EMBEDS = {
  spotifyEp:
    "https://open.spotify.com/embed/album/4DRPNg4D5uykjGoGmWhm0o?utm_source=generator&theme=0",
  soundcloudLilo:
    "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2415263193&color=%234c2c4c&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
};

export const PDF: Record<EpkLang, string> = {
  de: "/epk/TONSAMMLER-EPK-DE.pdf",
  en: "/epk/TONSAMMLER-EPK-EN.pdf",
};
export const PRESS_ZIP = "/epk/TONSAMMLER-Pressefotos.zip";
export const LOGOS = {
  white: "/epk/TONSAMMLER-Logo-weiss.png",
  black: "/epk/TONSAMMLER-Logo-schwarz.png",
};

// Full-resolution originals; the colour portrait sits in the middle
export const PHOTOS = [
  { src: "/epk/photos/TONSAMMLER-Portrait-sw-1.jpg", size: "3287 × 5120" },
  { src: "/epk/photos/TONSAMMLER-Portrait-Farbe.jpg", size: "3415 × 5120" },
  { src: "/epk/photos/TONSAMMLER-Portrait-sw-2.jpg", size: "3415 × 5120" },
] as const;

const TRACKS = [
  { title: "first", length: "8:30" },
  { title: "thoughts2", length: "7:42" },
];

type Venue = { name: string; city: Record<EpkLang, string> };
const MUNICH = { de: "München", en: "Munich" };

const VENUES: Venue[] = [
  { name: "CityClub", city: { de: "Augsburg", en: "Augsburg" } },
  { name: "Laut In Love", city: { de: "Berlin", en: "Berlin" } },
  { name: "Katchin im Feierwerk", city: MUNICH },
  { name: "YOU LOFT", city: MUNICH },
  { name: "Allach", city: MUNICH },
];

export const EPK = {
  de: {
    meta: {
      title: "TONSAMMLER – Booking",
      description:
        "Techno & Groove aus München: repetitiv, treibend. Set und EP zum Reinhören, Referenzen, Bio, Pressefotos und Booking-Anfrage.",
    },
    nav: [
      ["musik", "Musik"],
      ["referenzen", "Referenzen"],
      ["bio", "Bio"],
      ["downloads", "Downloads"],
      ["anfrage", "Anfrage"],
    ],
    switchLabel: "EN",
    switchAria: "English version",
    booking: "Booking anfragen",
    copy: "Kopieren",
    copied: "Kopiert!",
    hero: {
      kicker: "Booking · Electronic Press Kit",
      role: "Milan-Joel Pawlick · DJ & Producer · München",
      sound: "Treibender, repetitiver Groove-Techno.",
      facts: [
        ["Genre", "Techno, Groove"],
        ["Sound", "Repetitiv, treibend"],
        ["Set", "min. 90 min"],
      ],
    },
    listen: {
      title: "Musik",
      set: { title: "Laut In Love Festival", meta: "Bunker, 03:00–04:30 · 90 min · SoundCloud" },
      setFallback: "Set anhören auf SoundCloud",
      releaseKicker: "Debüt-EP · 05.10.2026",
      releaseTitle: "I · TONSAMMLER",
      tracks: TRACKS,
      buy: "Kaufen",
    },
    references: {
      title: "Referenzen",
      facts: [
        { value: "60+", label: "Gigs" },
        { value: "10", label: "Eigene Events" },
        { value: "Festivals", label: "u. a. Laut In Love" },
      ],
      venuesLabel: "Gespielt u. a.",
      venues: VENUES,
      impedanz: {
        kicker: "Mitgründer",
        name: "IMPEDANZ Kollektiv",
        text: "Drei Mitglieder, zehn eigene Events in Augsburg. Verantwortung für Konzept, Organisation, Booking, Design, Promotion und Social Media. Jeder Abend folgt einer klaren Linie, getragen von Acts, die genau dafür ausgewählt werden.",
      },
    },
    bio: {
      title: "Bio",
      shortLabel: "Kurzbio",
      short:
        "Aufgewachsen zwischen Augsburg und München, begleitet mich elektronische Musik seit zehn Jahren – von Hardtechno und Schranz bis zu der Erkenntnis, dass es nicht um schneller und härter geht, sondern um tiefer und reduzierter. Heute spiele ich Sets, die sich Zeit nehmen und Energie auf eine natürlichere Art weitergeben.",
      more: "Mehr über mich auf der Website",
      pressLabel: "Pressetext",
      press:
        "TONSAMMLER bringt Techno mit tiefen, treibenden, repetitiven Loops, gebaut für die Tanzfläche, um Leute zu bewegen, physisch wie emotional.",
    },
    downloads: {
      title: "Downloads",
      photosLabel: "Pressefotos in voller Auflösung",
      download: "Download",
      zip: "Alle Fotos & Logo (ZIP)",
      logoWhite: "Logo weiß (PNG)",
      logoBlack: "Logo schwarz (PNG)",
      pdf: "EPK als PDF",
      techLabel: "Technik",
      tech: "Ich spiele auf jedem gängigen Setup – am wichtigsten ist mir gutes Booth-Monitoring.",
    },
    contact: {
      title: "Anfrage",
      email: "E-Mail",
      phone: "Mobil",
      formLabel: "Kurze Anfrage",
      fields: {
        name: "Name",
        event: "Veranstaltung / Location",
        date: "Datum",
        slot: "Slot & Spielzeit",
        fee: "Gage / Budget",
        message: "Nachricht",
      },
      submit: "Anfrage senden",
      formNote: "Öffnet dein E-Mail-Programm mit der fertigen Anfrage.",
      formOnline: "Anfrage online senden",
      mailSubject: "Booking-Anfrage TONSAMMLER",
      greeting: "Hallo Milan,",
    },
    footer: "Booking & Electronic Press Kit",
  },
  en: {
    meta: {
      title: "TONSAMMLER – Booking",
      description:
        "Techno & groove from Munich: repetitive, driving. A set and an EP to listen to, references, bio, press photos and booking request.",
    },
    nav: [
      ["musik", "Music"],
      ["referenzen", "References"],
      ["bio", "Bio"],
      ["downloads", "Downloads"],
      ["anfrage", "Request"],
    ],
    switchLabel: "DE",
    switchAria: "Deutsche Version",
    booking: "Booking request",
    copy: "Copy",
    copied: "Copied!",
    hero: {
      kicker: "Booking · Electronic press kit",
      role: "Milan-Joel Pawlick · DJ & producer · Munich",
      sound: "Driving, repetitive groove techno.",
      facts: [
        ["Genre", "Techno, groove"],
        ["Sound", "Repetitive, driving"],
        ["Set", "min. 90 min"],
      ],
    },
    listen: {
      title: "Music",
      set: { title: "Laut In Love Festival", meta: "Bunker, 3–4:30 am · 90 min · SoundCloud" },
      setFallback: "Listen to the set on SoundCloud",
      releaseKicker: "Debut EP · 05.10.2026",
      releaseTitle: "I · TONSAMMLER",
      tracks: TRACKS,
      buy: "Buy",
    },
    references: {
      title: "References",
      facts: [
        { value: "60+", label: "Gigs" },
        { value: "10", label: "Own events" },
        { value: "Festivals", label: "incl. Laut In Love" },
      ],
      venuesLabel: "Played at",
      venues: VENUES,
      impedanz: {
        kicker: "Co-founder",
        name: "IMPEDANZ collective",
        text: "Three members, ten events of their own in Augsburg. Responsible for concept, organisation, booking, design, promotion and social media. Every night follows a clear line, carried by acts chosen for exactly that.",
      },
    },
    bio: {
      title: "Bio",
      shortLabel: "Short bio",
      short:
        "I grew up between Augsburg and Munich, and electronic music has been part of my life for ten years – from hardtechno and Schranz to the realisation that it's not about faster and harder, but about deeper and more reduced. Today I play sets that take their time and pass on energy in a more natural way.",
      more: "More about me on the website",
      pressLabel: "Press text",
      press:
        "TONSAMMLER brings techno with deep, driving, repetitive loops, built for the dance floor to move people, both physically and emotionally.",
    },
    downloads: {
      title: "Downloads",
      photosLabel: "Press photos in full resolution",
      download: "Download",
      zip: "All photos & logo (ZIP)",
      logoWhite: "Logo white (PNG)",
      logoBlack: "Logo black (PNG)",
      pdf: "EPK as PDF",
      techLabel: "Tech",
      tech: "I play on any standard setup – good booth monitoring matters most to me.",
    },
    contact: {
      title: "Request",
      email: "Email",
      phone: "Phone",
      formLabel: "Quick request",
      fields: {
        name: "Name",
        event: "Event / venue",
        date: "Date",
        slot: "Slot & set length",
        fee: "Fee / budget",
        message: "Message",
      },
      submit: "Send request",
      formNote: "Opens your email app with the request ready to send.",
      formOnline: "Send the request online",
      mailSubject: "Booking request TONSAMMLER",
      greeting: "Hi Milan,",
    },
    footer: "Booking & electronic press kit",
  },
} satisfies Record<EpkLang, unknown>;

export type EpkText = (typeof EPK)[EpkLang];
