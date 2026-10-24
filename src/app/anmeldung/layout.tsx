import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import { EVENT } from "@/lib/anmeldung-content";

// Raik Holetz' serif next to TONSAMMLER's Raleway: the page mixes both handwritings
const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const title = `${EVENT.name} – ${EVENT.subtitle} · ${EVENT.hosts}`;
const description = `${EVENT.dateShort}, ${EVENT.time}. Kunst und Klang im Kunstraum Raik Holetz. Eintritt frei, nur mit Anmeldung.`;

export const metadata: Metadata = {
  title,
  description,
  // Only reachable by link
  robots: { index: false, follow: false },
  openGraph: { title, description, locale: "de_DE", type: "website" },
};

export default function AnmeldungLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${garamond.variable} min-h-screen`}
      style={{ "--raik-blue": "#3156c4", "--raik-blue-light": "#a9c3f0" } as CSSProperties}
    >
      {children}
    </div>
  );
}
