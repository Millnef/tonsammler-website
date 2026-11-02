// Operator details for the imprint and privacy notices of every page (website, booking
// page, registration page)

export const OPERATOR = {
  name: "Milan-Joel Pawlick",
  street: "Floriansmühlstraße 11",
  city: "80939 München",
  country: { de: "Deutschland", en: "Germany" },
  email: "tonsammlermusic@gmail.com",
  phone: "+49 151 10468852",
};

export const LEGAL_UPDATED = { de: "November 2026", en: "November 2026" };

export const LEGAL_PATHS = {
  imprint: { de: "/impressum", en: "/impressum/en" },
  privacy: { de: "/datenschutz", en: "/datenschutz/en" },
} as const;
