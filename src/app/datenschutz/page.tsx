import type { Metadata } from "next";
import { SitePrivacy } from "@/components/legal/SiteLegal";

export const metadata: Metadata = {
  title: "Datenschutz – TONSAMMLER",
  description: "Datenschutzerklärung der Website von Tonsammler.",
};

export default function DatenschutzPage() {
  return <SitePrivacy lang="de" />;
}
