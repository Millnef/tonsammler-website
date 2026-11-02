import LegalPage from "@/components/legal/LegalPage";
import {
  Imprint,
  PrivacyController,
  PrivacyHosting,
  PrivacyIntro,
  PrivacyNoTracking,
  PrivacyRights,
  SitePrivacySections,
  TranslationNote,
  type LegalLang,
} from "@/components/legal/LegalContent";

// Milan took all photos on the website himself
const CREDITS = { de: "Alle Fotos © Milan-Joel Pawlick.", en: "All photos © Milan-Joel Pawlick." };

export function SiteImprint({ lang }: { lang: LegalLang }) {
  return (
    <LegalPage kind="imprint" lang={lang}>
      <Imprint lang={lang} credits={CREDITS[lang]} />
    </LegalPage>
  );
}

export function SitePrivacy({ lang }: { lang: LegalLang }) {
  return (
    <LegalPage kind="privacy" lang={lang}>
      <PrivacyIntro lang={lang} />
      <PrivacyController lang={lang} />
      <PrivacyHosting lang={lang} />
      <PrivacyNoTracking lang={lang} players />
      <SitePrivacySections lang={lang} />
      <PrivacyRights lang={lang} />
      {lang === "en" && <TranslationNote />}
    </LegalPage>
  );
}
