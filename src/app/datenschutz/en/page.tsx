import type { Metadata } from "next";
import { SitePrivacy } from "@/components/legal/SiteLegal";

export const metadata: Metadata = {
  title: "Privacy policy – TONSAMMLER",
  description: "Privacy policy of the Tonsammler website.",
};

export default function PrivacyPageEn() {
  return <SitePrivacy lang="en" />;
}
