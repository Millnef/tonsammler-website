import type { Metadata } from "next";
import { SiteImprint } from "@/components/legal/SiteLegal";

export const metadata: Metadata = {
  title: "Impressum – TONSAMMLER",
  description: "Impressum der Website von Tonsammler.",
};

export default function ImpressumPage() {
  return <SiteImprint lang="de" />;
}
