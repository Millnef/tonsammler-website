import type { Metadata } from "next";
import Epk from "@/components/epk/Epk";
import { EPK } from "@/lib/epk-content";

export const metadata: Metadata = {
  title: EPK.en.meta.title,
  description: EPK.en.meta.description,
  openGraph: {
    title: EPK.en.meta.title,
    description: EPK.en.meta.description,
    locale: "en_US",
    type: "website",
  },
};

export default function EpkPageEnglish() {
  return <Epk lang="en" />;
}
