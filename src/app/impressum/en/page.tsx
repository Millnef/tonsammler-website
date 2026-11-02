import type { Metadata } from "next";
import { SiteImprint } from "@/components/legal/SiteLegal";

export const metadata: Metadata = {
  title: "Legal notice – TONSAMMLER",
  description: "Legal notice of the Tonsammler website.",
};

export default function ImprintPageEn() {
  return <SiteImprint lang="en" />;
}
