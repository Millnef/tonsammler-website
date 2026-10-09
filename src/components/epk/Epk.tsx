import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import BookingForm from "@/components/epk/BookingForm";
import CopyButton from "@/components/epk/CopyButton";
import {
  BandcampIcon,
  InstagramIcon,
  SoundCloudIcon,
  SpotifyIcon,
  YouTubeIcon,
} from "@/components/icons";
import {
  EMAIL,
  EMBEDS,
  EPK,
  EPK_PATHS,
  LINKS,
  LOGOS,
  PDF,
  PHONE,
  PHONE_HREF,
  PHOTOS,
  PRESS_ZIP,
  type EpkLang,
} from "@/lib/epk-content";

const CONTAINER = "mx-auto w-full max-w-6xl px-6 sm:px-10";
const LABEL = "text-xs font-medium uppercase tracking-[0.15em] text-foreground/50";
const BUTTON =
  "items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-200 ease-out";
const PRIMARY = `${BUTTON} bg-accent text-black hover:bg-foreground`;
const SECONDARY = `${BUTTON} border border-white/25 text-foreground hover:border-accent hover:text-accent`;

type Icon = ComponentType<{ className?: string }>;

function Section({
  id,
  index,
  title,
  printBreak = false,
  children,
}: {
  id: string;
  index: string;
  title: string;
  /** PDF: start this section on the second page */
  printBreak?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 border-t border-white/10 py-12 sm:py-16 print:py-8 ${
        printBreak ? "print:break-before-page print:border-t-0 print:pt-12" : ""
      }`}
    >
      <div className="flex items-baseline gap-4">
        <span className="text-xs font-medium tracking-[0.2em] text-accent">{index}</span>
        <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-extralight leading-none tracking-tight">
          {title}
        </h2>
      </div>
      <div className="mt-8 sm:mt-10">{children}</div>
    </section>
  );
}

function PlatformLink({ href, icon: Icon, label }: { href: string; icon: Icon; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-foreground/80 transition-colors duration-200 ease-out hover:border-accent hover:text-accent"
    >
      <Icon className="h-4 w-4" />
      {label}
    </a>
  );
}

function CardHeading({ label, copy }: { label: string; copy?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h3 className={LABEL}>{label}</h3>
      {copy}
    </div>
  );
}

export default function Epk({ lang }: { lang: EpkLang }) {
  const t = EPK[lang];
  const other: EpkLang = lang === "de" ? "en" : "de";

  const socials: { href: string; icon: Icon; label: string }[] = [
    { href: LINKS.instagram, icon: InstagramIcon, label: "Instagram" },
    { href: LINKS.soundcloud, icon: SoundCloudIcon, label: "SoundCloud" },
    { href: LINKS.youtube, icon: YouTubeIcon, label: "YouTube" },
    { href: LINKS.spotifyArtist, icon: SpotifyIcon, label: "Spotify" },
    { href: LINKS.bandcamp, icon: BandcampIcon, label: "Bandcamp" },
  ];

  return (
    <div lang={lang} className="min-h-screen lining-nums">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/85 backdrop-blur-sm print:hidden">
        <div className={`${CONTAINER} flex h-16 items-center justify-between gap-6`}>
          <Link href="/" className="whitespace-nowrap text-sm font-medium tracking-[0.1em]">
            TONSAMMLER <span className="text-foreground/40">· Booking</span>
          </Link>
          <nav className="hidden items-center gap-6 lg:flex">
            {t.nav.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className="text-xs font-medium uppercase tracking-[0.15em] text-foreground/60 transition-colors duration-200 ease-out hover:text-accent"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-5">
            <Link
              href={EPK_PATHS[other]}
              aria-label={t.switchAria}
              className="text-xs font-medium uppercase tracking-[0.15em] text-accent transition-colors duration-200 ease-out hover:text-foreground"
            >
              {t.switchLabel}
            </Link>
            <a href="#anfrage" className={`hidden sm:inline-flex ${PRIMARY}`}>
              {t.booking}
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* 1 – Who and how it sounds, at a glance */}
        <section
          className={`${CONTAINER} grid grid-cols-1 items-center gap-8 pb-12 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,21rem)] lg:gap-12 lg:pt-10 print:pb-8 print:pt-12`}
        >
          {/* The fade into the black is baked into the image (a CSS mask leaves a hairline
              in the PDF export) */}
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[15rem] sm:max-w-xs lg:order-last lg:max-w-none">
            <Image
              src="/epk/portrait-hero.jpg"
              alt="Portrait von TONSAMMLER"
              fill
              preload
              sizes="(min-width: 1024px) 21rem, 20rem"
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">{t.hero.kicker}</p>
            <h1 className="mt-4 whitespace-nowrap text-[clamp(2.5rem,12vw,7rem)] font-extralight leading-[0.9] tracking-tight lg:text-[clamp(4.5rem,7.4vw,6.75rem)]">
              TONSAMMLER
            </h1>
            <p className="mt-4 text-sm font-light text-foreground/60 sm:text-base">{t.hero.role}</p>
            <p className="mt-5 max-w-xl text-lg font-light leading-snug text-foreground/90 sm:text-2xl">
              {t.hero.sound}
            </p>
            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {t.hero.facts.map(([term, value]) => (
                <div key={term}>
                  <dt className="text-[10px] font-medium uppercase tracking-[0.15em] text-foreground/50">{term}</dt>
                  <dd className="mt-1 text-sm font-medium text-foreground/90">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3 print:hidden">
              <a href="#anfrage" className={`inline-flex ${PRIMARY}`}>
                {t.booking}
              </a>
              <a href={PDF[lang]} download className={`inline-flex ${SECONDARY}`}>
                {t.downloads.pdf} ↓
              </a>
            </div>
            {/* PDF only, where the buttons above are left out */}
            <p className="mt-6 hidden text-sm font-light text-foreground/80 print:block">
              Booking:{" "}
              <a href={`mailto:${EMAIL}`} className="text-accent">
                {EMAIL}
              </a>{" "}
              · <a href={PHONE_HREF}>{PHONE}</a>
            </p>
          </div>
        </section>

        <div className={CONTAINER}>
          {/* 2 – Listen: one set and the EP */}
          <Section id="hoeren" index="01" title={t.listen.title}>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-10">
              <div>
                <div className="relative aspect-video w-full overflow-hidden border border-white/10">
                  <iframe
                    title={`${t.listen.set.title} – TONSAMMLER`}
                    src={EMBEDS.soundcloudLilo}
                    loading="lazy"
                    allow="autoplay; encrypted-media"
                    className="h-full w-full print:hidden"
                  />
                  {/* PDF: the set's artwork instead of the player */}
                  <a href={LINKS.soundcloudLilo} className="absolute inset-0 hidden print:block">
                    <Image
                      src="/epk/lilo-artwork.jpg"
                      alt="Laut In Love Festival – TONSAMMLER"
                      fill
                      loading="eager"
                      sizes="36rem"
                      className="object-cover"
                    />
                  </a>
                </div>
                <a
                  href={LINKS.soundcloudLilo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-4 flex items-start justify-between gap-4"
                >
                  <span>
                    <span className="block text-lg font-medium transition-colors duration-200 ease-out group-hover:text-accent">
                      {t.listen.set.title}
                    </span>
                    <span className="mt-1 block text-sm font-light text-foreground/60">{t.listen.set.meta}</span>
                    <span className="mt-2 hidden text-xs font-medium uppercase tracking-[0.15em] text-accent print:block">
                      ▶ {t.listen.setFallback}
                    </span>
                  </span>
                  <span aria-hidden="true" className="text-foreground/50">
                    ↗
                  </span>
                </a>
              </div>

              <div className="min-w-0">
                <div className="grid grid-cols-[6rem_minmax(0,1fr)] gap-5 sm:grid-cols-[7.5rem_minmax(0,1fr)]">
                  <a href={LINKS.bandcampEp} target="_blank" rel="noopener noreferrer" className="block">
                    <Image
                      src="/epk/ep-i-cover.jpg"
                      alt="Cover der EP „I“"
                      width={817}
                      height={1200}
                      sizes="7.5rem"
                      className="w-full border border-white/10"
                    />
                  </a>
                  <div className="min-w-0">
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
                      {t.listen.releaseKicker}
                    </p>
                    <h3 className="mt-2 text-2xl font-extralight leading-tight sm:text-3xl">
                      {t.listen.releaseTitle}
                    </h3>
                    <ol className="mt-3 text-sm">
                      {t.listen.tracks.map((track, index) => (
                        <li key={track.title} className="flex items-baseline gap-3 py-1">
                          <span className="text-foreground/40">0{index + 1}</span>
                          <span className="flex-1 font-light">{track.title}</span>
                          <span className="text-foreground/50">{track.length}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <PlatformLink href={LINKS.spotifyEp} icon={SpotifyIcon} label="Spotify" />
                  <PlatformLink href={LINKS.bandcampEp} icon={BandcampIcon} label={`Bandcamp · ${t.listen.buy}`} />
                  <PlatformLink href={LINKS.soundcloudEp} icon={SoundCloudIcon} label="SoundCloud" />
                  <PlatformLink href={LINKS.youtubeThoughts2} icon={YouTubeIcon} label="YouTube" />
                </div>
                <iframe
                  title="I von TONSAMMLER auf Spotify"
                  src={EMBEDS.spotifyEp}
                  height={152}
                  loading="lazy"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  className="mt-5 w-full rounded-xl print:hidden"
                />
              </div>
            </div>
          </Section>

          {/* 3 – Proof */}
          <Section id="referenzen" index="02" title={t.references.title}>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-12">
              <div>
                <dl className="grid grid-cols-3 gap-6">
                  {t.references.facts.map((fact) => (
                    <div key={fact.label} className="flex flex-col-reverse justify-end">
                      <dt className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-foreground/60">
                        {fact.label}
                      </dt>
                      <dd className="text-2xl font-medium sm:text-4xl">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
                <h3 className={`${LABEL} mt-10`}>{t.references.venuesLabel}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {t.references.venues.map((venue) => (
                    <li
                      key={venue}
                      className="rounded-full border border-white/15 px-4 py-2 text-sm font-light text-foreground/90"
                    >
                      {venue}
                    </li>
                  ))}
                </ul>
              </div>

              <aside className="border border-white/10 p-6 sm:p-7">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                  {t.references.impedanz.kicker}
                </p>
                <h3 className="mt-2 text-2xl font-extralight">{t.references.impedanz.name}</h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-foreground/70">
                  {t.references.impedanz.text}
                </p>
                <a
                  href={LINKS.impedanz}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-accent hover:text-foreground"
                >
                  <InstagramIcon className="h-4 w-4" />
                  @impedanz.kollektiv ↗
                </a>
              </aside>
            </div>
          </Section>

          {/* 4 – Bio (second PDF page starts here) */}
          <Section id="bio" index="03" title={t.bio.title} printBreak>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-12">
              <div>
                <CardHeading
                  label={t.bio.shortLabel}
                  copy={<CopyButton text={t.bio.short} label={t.copy} copiedLabel={t.copied} />}
                />
                <p className="mt-4 text-base font-light leading-relaxed text-foreground/80 sm:text-lg">
                  {t.bio.short}
                </p>
              </div>
              <div>
                <CardHeading
                  label={t.bio.pressLabel}
                  copy={<CopyButton text={t.bio.press} label={t.copy} copiedLabel={t.copied} />}
                />
                <p className="mt-4 text-lg font-light leading-relaxed text-foreground/90 sm:text-xl">
                  {t.bio.press}
                </p>
              </div>
            </div>
          </Section>

          {/* 5 – Downloads */}
          <Section id="downloads" index="04" title={t.downloads.title}>
            <h3 className={LABEL}>{t.downloads.photosLabel}</h3>
            <ul className="mt-4 grid grid-cols-3 gap-3 sm:gap-6">
              {PHOTOS.map((photo) => (
                <li key={photo.src}>
                  <a href={photo.src} download className="group block">
                    <span className="relative block aspect-[2/3] overflow-hidden border border-white/10 print:aspect-[4/5]">
                      <Image
                        src={photo.src}
                        alt="Pressefoto TONSAMMLER"
                        fill
                        sizes="(min-width: 1024px) 22rem, 33vw"
                        className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                      />
                    </span>
                    <span className="mt-2 flex flex-wrap items-baseline justify-between gap-x-2 text-xs">
                      <span className="hidden text-foreground/50 sm:inline">{photo.size}</span>
                      <span className="whitespace-nowrap font-medium uppercase tracking-[0.15em] text-accent">
                        {t.downloads.download} ↓
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={PRESS_ZIP} download className={`inline-flex ${SECONDARY}`}>
                {t.downloads.zip} ↓
              </a>
              <a href={LOGOS.white} download className={`inline-flex ${SECONDARY}`}>
                {t.downloads.logoWhite} ↓
              </a>
              <a href={LOGOS.black} download className={`inline-flex ${SECONDARY}`}>
                {t.downloads.logoBlack} ↓
              </a>
              <a href={PDF[lang]} download className={`inline-flex ${SECONDARY} print:hidden`}>
                {t.downloads.pdf} ↓
              </a>
            </div>
            <p className="mt-8 text-sm font-light text-foreground/70">
              <span className={`${LABEL} mr-3`}>{t.downloads.techLabel}</span>
              {t.downloads.tech}
            </p>
          </Section>

          {/* 6 – Contact and request */}
          <Section id="anfrage" index="05" title={t.contact.title}>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16 print:block">
              <div>
                <CardHeading
                  label={t.contact.email}
                  copy={<CopyButton text={EMAIL} label={t.copy} copiedLabel={t.copied} />}
                />
                <a
                  href={`mailto:${EMAIL}`}
                  className="mt-2 block whitespace-nowrap text-[clamp(1.125rem,5vw,1.875rem)] font-extralight text-accent transition-colors duration-200 ease-out hover:text-foreground"
                >
                  {EMAIL}
                </a>
                <h3 className={`${LABEL} mt-6`}>{t.contact.phone}</h3>
                <a
                  href={PHONE_HREF}
                  className="mt-2 block text-[clamp(1.125rem,5vw,1.875rem)] font-extralight transition-colors duration-200 ease-out hover:text-accent"
                >
                  {PHONE}
                </a>
                <div className="mt-8 flex flex-wrap gap-2">
                  {socials.map((social) => (
                    <PlatformLink key={social.label} {...social} />
                  ))}
                </div>
              </div>

              <div className="print:hidden">
                <h3 className={LABEL}>{t.contact.formLabel}</h3>
                <div className="mt-5">
                  <BookingForm t={t.contact} />
                </div>
              </div>
            </div>
          </Section>
        </div>
      </main>

      <footer
        className={`${CONTAINER} flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-8 text-xs text-foreground/40 print:hidden`}
      >
        <span>© 2026 TONSAMMLER · {t.footer}</span>
        <Link href="/" className="uppercase tracking-[0.15em] hover:text-accent">
          tonsammler-website.vercel.app
        </Link>
      </footer>
    </div>
  );
}
