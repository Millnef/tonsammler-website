import type { Metadata } from "next";
import Epk from "@/components/epk/Epk";
import { EPK } from "@/lib/epk-content";

export const metadata: Metadata = {
  title: EPK.de.meta.title,
  description: EPK.de.meta.description,
  openGraph: {
    title: EPK.de.meta.title,
    description: EPK.de.meta.description,
    locale: "de_DE",
    type: "website",
  },
};

export default function EpkPage() {
  return <Epk lang="de" />;
}
