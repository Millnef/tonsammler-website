import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
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
  /** PDF: start this section on a new page */
  printBreak?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 border-t border-white/10 py-16 sm:py-24 print:py-12 ${
        printBreak ? "print:break-before-page print:border-t-0" : ""
      }`}
    >
      <div className="flex items-baseline gap-4">
        <span className="text-xs font-medium tracking-[0.2em] text-accent">{index}</span>
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-extralight leading-none tracking-tight">
          {title}
        </h2>
      </div>
      <div className="mt-10 sm:mt-12">{children}</div>
    </section>
  );
}

function PlatformLink({ href, icon: Icon, label }: { href: string; icon: Icon; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] text-foreground/80 transition-colors duration-200 ease-out hover:border-accent hover:text-accent"
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
  const booking = `mailto:${EMAIL}?subject=${encodeURIComponent(t.contact.mailSubject)}&body=${encodeURIComponent(t.contact.mailBody)}`;

  const socials: { href: string; icon: Icon; label: string; handle: string }[] = [
    { href: LINKS.instagram, icon: InstagramIcon, label: "Instagram", handle: "@ton.sammler" },
    { href: LINKS.soundcloud, icon: SoundCloudIcon, label: "SoundCloud", handle: "tonsammlermusic" },
    { href: LINKS.youtube, icon: YouTubeIcon, label: "YouTube", handle: "@TONSAMMLER" },
    { href: LINKS.spotifyArtist, icon: SpotifyIcon, label: "Spotify", handle: "TONSAMMLER" },
    { href: LINKS.bandcamp, icon: BandcampIcon, label: "Bandcamp", handle: "tonsammler.bandcamp.com" },
  ];

  return (
    <div lang={lang} className="min-h-screen lining-nums">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/85 backdrop-blur-sm print:hidden">
        <div className={`${CONTAINER} flex h-16 items-center justify-between gap-6`}>
          <Link href="/" className="whitespace-nowrap text-sm font-medium tracking-[0.1em]">
            TONSAMMLER <span className="text-foreground/40">· EPK</span>
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
            <a href={booking} className={`hidden sm:inline-flex ${PRIMARY}`}>
              {t.booking}
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section
          className={`${CONTAINER} grid grid-cols-1 items-center gap-8 pb-14 pt-8 sm:pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] lg:gap-12 lg:pt-12`}
        >
          {/* The fade into the black is baked into the image (a CSS mask leaves a hairline
              in the PDF export) */}
          <div className="relative mx-auto aspect-[4/5] w-full max-w-xs sm:max-w-sm lg:order-last lg:max-w-none">
            <Image
              src="/epk/portrait-hero.jpg"
              alt="Portrait von TONSAMMLER"
              fill
              preload
              sizes="(min-width: 1024px) 25rem, 24rem"
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
              {t.hero.kicker}
            </p>
            <h1 className="mt-4 whitespace-nowrap text-[clamp(2.5rem,12vw,7.5rem)] font-extralight leading-[0.9] tracking-tight lg:text-[clamp(4.5rem,7.2vw,6.5rem)]">
              TONSAMMLER
            </h1>
            <p className="mt-6 text-base font-light text-foreground/70 sm:text-lg">{t.hero.role}</p>
            <p className="mt-1 text-base font-light text-foreground/70 sm:text-lg">{t.hero.tagline}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {t.hero.genres.map((genre) => (
                <li
                  key={genre}
                  className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-foreground/80"
                >
                  {genre}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3 print:hidden">
              <a href={booking} className={`inline-flex ${PRIMARY}`}>
                {t.booking}
              </a>
              <a href={PDF[lang]} download className={`inline-flex ${SECONDARY}`}>
                {t.pdf} ↓
              </a>
            </div>
            {/* PDF only, where the buttons above are left out */}
            <p className="mt-8 hidden text-sm font-light text-foreground/80 print:block">
              Booking:{" "}
              <a href={booking} className="text-accent">
                {EMAIL}
              </a>{" "}
              · <a href={PHONE_HREF}>{PHONE}</a>
            </p>
          </div>
        </section>

        <div className={CONTAINER}>
          {/* Key facts */}
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 py-10 sm:grid-cols-4 sm:py-12">
            {t.facts.map((fact) => (
              <div key={fact.label} className="flex flex-col-reverse justify-end">
                <dt className="mt-2 max-w-[12rem] text-xs font-medium uppercase tracking-[0.15em] text-foreground/60">
                  {fact.label}
                </dt>
                <dd className="text-3xl font-medium sm:text-4xl">{fact.value}</dd>
              </div>
            ))}
          </dl>

          {/* Bio */}
          <Section id="bio" index="01" title={t.bio.title}>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)] lg:gap-16">
              <div>
                <CardHeading
                  label={t.bio.shortLabel}
                  copy={<CopyButton text={t.bio.short} label={t.copy} copiedLabel={t.copied} />}
                />
                <p className="mt-4 text-lg font-light leading-relaxed text-foreground/90 sm:text-xl">
                  {t.bio.short}
                </p>
                <dl className="mt-10 divide-y divide-white/10 border-y border-white/10">
                  {[...t.bio.details, ["Booking", EMAIL]].map(([term, value]) => (
                    <div key={term} className="flex items-baseline justify-between gap-6 py-3 text-sm">
                      <dt className="text-foreground/50">{term}</dt>
                      <dd className="text-right font-light text-foreground/90">
                        {value === EMAIL ? (
                          <a href={booking} className="text-accent hover:underline">
                            {EMAIL}
                          </a>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <CardHeading
                  label={t.bio.longLabel}
                  copy={
                    <CopyButton text={t.bio.long.join("\n\n")} label={t.copy} copiedLabel={t.copied} />
                  }
                />
                {t.bio.long.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 24)}
                    className="mt-4 text-base font-light leading-relaxed text-foreground/70 sm:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </Section>

          {/* Music */}
          <Section id="musik" index="02" title={t.music.title} printBreak>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] sm:gap-10 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
              <a
                href={LINKS.bandcampEp}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-40 sm:w-full"
              >
                <Image
                  src="/epk/ep-i-cover.jpg"
                  alt="Cover der EP „I“"
                  width={817}
                  height={1200}
                  sizes="(min-width: 1024px) 15rem, 12rem"
                  className="w-full border border-white/10"
                />
              </a>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                  {t.music.releaseKicker}
                </p>
                <h3 className="mt-3 text-3xl font-extralight leading-tight sm:text-4xl">{t.music.releaseTitle}</h3>
                <ol className="mt-6 divide-y divide-white/10 border-y border-white/10">
                  {t.music.tracks.map((track, index) => (
                    <li key={track.title} className="flex items-baseline gap-4 py-3 text-sm">
                      <span className="text-foreground/40">0{index + 1}</span>
                      <span className="flex-1 font-light">{track.title}</span>
                      <span className="text-foreground/50">{track.length}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-6 flex flex-wrap gap-2">
                  <PlatformLink href={LINKS.spotifyEp} icon={SpotifyIcon} label="Spotify" />
                  <PlatformLink
                    href={LINKS.bandcampEp}
                    icon={BandcampIcon}
                    label={`Bandcamp · ${t.music.buy}`}
                  />
                  <PlatformLink href={LINKS.soundcloudEp} icon={SoundCloudIcon} label="SoundCloud" />
                  <PlatformLink href={LINKS.youtubeThoughts2} icon={YouTubeIcon} label="YouTube" />
                </div>
                <iframe
                  title="I von TONSAMMLER auf Spotify"
                  src={EMBEDS.spotifyEp}
                  height={152}
                  loading="lazy"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  className="mt-6 w-full rounded-xl print:hidden"
                />
              </div>
            </div>

            <h3 className={`${LABEL} mt-16`}>{t.music.setsLabel}</h3>
            <div className="mt-6 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-6">
              {[
                { set: t.music.sets[0], src: EMBEDS.soundcloudLilo, href: LINKS.soundcloudLilo, allow: "autoplay; encrypted-media" },
                {
                  set: t.music.sets[1],
                  src: EMBEDS.youtubeSet,
                  href: LINKS.youtubeSet,
                  allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
                },
              ].map(({ set, src, href, allow }) => (
                <div key={set.title}>
                  <div className="aspect-video w-full overflow-hidden border border-white/10 print:hidden">
                    <iframe
                      title={`${set.title} – TONSAMMLER`}
                      src={src}
                      loading="lazy"
                      allow={allow}
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  </div>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-4 flex items-start justify-between gap-4"
                  >
                    <span>
                      <span className="block text-lg font-medium transition-colors duration-200 ease-out group-hover:text-accent">
                        {set.title}
                      </span>
                      <span className="mt-1 block text-sm font-light text-foreground/60">
                        {set.meta} · {set.platform}
                      </span>
                    </span>
                    <span aria-hidden="true" className="text-foreground/50">
                      ↗
                    </span>
                  </a>
                </div>
              ))}
            </div>
            <a
              href={LINKS.soundcloud}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-accent hover:text-foreground"
            >
              {t.music.allSets} ↗
            </a>
          </Section>

          {/* References */}
          <Section id="referenzen" index="03" title={t.references.title}>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-16">
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {t.references.gigs.map((gig) => (
                  <li
                    key={gig.venue}
                    className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-x-4 gap-y-1 py-4 sm:grid-cols-[7.5rem_minmax(0,1fr)_auto]"
                  >
                    <span className="pt-1.5 text-xs font-medium uppercase tracking-[0.15em] text-foreground/40">
                      {gig.when}
                    </span>
                    <span className="text-lg font-medium">
                      {gig.venue}
                      {gig.place && <span className="font-light text-foreground/50"> · {gig.place[lang]}</span>}
                    </span>
                    <span className="col-start-2 text-sm font-light text-foreground/60 sm:col-start-auto sm:pt-1 sm:text-right">
                      {gig.note[lang]}
                    </span>
                  </li>
                ))}
                <li className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-x-4 py-4 sm:grid-cols-[7.5rem_minmax(0,1fr)]">
                  <span className="pt-1.5 text-xs font-medium uppercase tracking-[0.15em] text-foreground/40">
                    {t.references.moreLabel}
                  </span>
                  <span className="text-lg font-medium">{t.references.more.join(" · ")}</span>
                </li>
              </ul>

              <aside className="border border-white/10 p-6 sm:p-8 print:break-inside-avoid">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                  {t.references.impedanz.kicker}
                </p>
                <h3 className="mt-3 text-2xl font-extralight sm:text-3xl">{t.references.impedanz.name}</h3>
                <p className="mt-6 text-3xl font-medium sm:text-4xl">10</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-foreground/60">
                  Events · Augsburg
                </p>
                <p className="mt-6 text-sm font-light leading-relaxed text-foreground/70">
                  {t.references.impedanz.text}
                </p>
                <a
                  href={LINKS.impedanz}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-accent hover:text-foreground"
                >
                  <InstagramIcon className="h-4 w-4" />
                  @impedanz.kollektiv ↗
                </a>
              </aside>
            </div>
          </Section>

          {/* Press */}
          <Section id="presse" index="04" title={t.press.title} printBreak>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className={LABEL}>{t.press.photosLabel}</h3>
              <a href={PRESS_ZIP} download className={`inline-flex ${SECONDARY} print:hidden`}>
                {t.press.zip} ↓
              </a>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
              {PHOTOS.map((photo) => (
                <li key={photo.src} className="print:break-inside-avoid">
                  <a href={photo.src} download={photo.file} className="group block">
                    <div className="relative aspect-[4/5] overflow-hidden border border-white/10">
                      <Image
                        src={photo.src}
                        alt={photo.file.replace(".jpg", "").replaceAll("-", " ")}
                        fill
                        sizes="(min-width: 640px) 30vw, 50vw"
                        className={`object-cover ${photo.position} transition-transform duration-300 ease-out group-hover:scale-[1.03]`}
                      />
                    </div>
                    <span className="mt-2 flex items-baseline justify-between gap-2 text-xs">
                      <span className="hidden text-foreground/50 sm:inline">{photo.size}</span>
                      <span className="whitespace-nowrap font-medium uppercase tracking-[0.15em] text-accent print:hidden">
                        {t.press.download} ↓
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm font-light text-foreground/50">{t.press.note}</p>

            <h3 className={`${LABEL} mt-14`}>{t.press.logoLabel}</h3>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2">
              {LOGOS.map((logo) => (
                <li key={logo.src} className="print:break-inside-avoid">
                  <a href={logo.src} download className="group block">
                    <span
                      className={`flex aspect-[3/1] items-center justify-center border border-white/10 ${
                        logo.on === "light" ? "bg-foreground" : "bg-black"
                      }`}
                    >
                      <Image
                        src={logo.src}
                        alt="TONSAMMLER Logo"
                        width={2849}
                        height={520}
                        sizes="(min-width: 640px) 30vw, 70vw"
                        className="w-3/4"
                      />
                    </span>
                    <span className="mt-2 flex items-baseline justify-between gap-2 text-xs">
                      <span className="text-foreground/50">{t.press.logoNames[logo.on]}</span>
                      <span className="whitespace-nowrap font-medium uppercase tracking-[0.15em] text-accent print:hidden">
                        {t.press.download} ↓
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Section>

          {/* Technical rider */}
          <Section id="rider" index="05" title={t.rider.title} printBreak>
            <dl className="divide-y divide-white/10 border-y border-white/10">
              {t.rider.items.map(([term, value]) => (
                <div key={term} className="grid gap-1 py-4 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6">
                  <dt className={`${LABEL} sm:pt-1`}>{term}</dt>
                  <dd className="font-light text-foreground/85 sm:text-lg">{value}</dd>
                </div>
              ))}
            </dl>
          </Section>

          {/* Contact */}
          <Section id="kontakt" index="06" title={t.contact.title}>
            <p className="text-lg font-light text-foreground/70">{t.contact.lead}</p>
            <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <CardHeading
                  label={t.contact.email}
                  copy={<CopyButton text={EMAIL} label={t.copy} copiedLabel={t.copied} />}
                />
                <a
                  href={booking}
                  className="mt-2 block whitespace-nowrap text-[clamp(1.125rem,5vw,2.25rem)] font-extralight text-accent transition-colors duration-200 ease-out hover:text-foreground"
                >
                  {EMAIL}
                </a>
                <h3 className={`${LABEL} mt-8`}>{t.contact.phone}</h3>
                <a
                  href={PHONE_HREF}
                  className="mt-2 block text-[clamp(1.125rem,5vw,2.25rem)] font-extralight transition-colors duration-200 ease-out hover:text-accent"
                >
                  {PHONE}
                </a>
                <a href={booking} className={`mt-10 inline-flex ${PRIMARY} print:hidden`}>
                  {t.booking}
                </a>
              </div>

              <div>
                <h3 className={LABEL}>{t.contact.social}</h3>
                <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
                  {socials.map(({ href, icon: SocialIcon, label, handle }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 py-3.5"
                      >
                        <SocialIcon className="h-5 w-5 text-foreground/70 transition-colors duration-200 ease-out group-hover:text-accent" />
                        <span className="w-28 text-xs font-medium uppercase tracking-[0.15em] text-foreground/70 group-hover:text-accent">
                          {label}
                        </span>
                        <span className="min-w-0 flex-1 truncate text-sm font-light text-foreground/50">
                          {handle}
                        </span>
                        <span aria-hidden="true" className="text-foreground/40">
                          ↗
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/"
                  className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-accent hover:text-foreground"
                >
                  {t.contact.website} ↗
                </Link>
              </div>
            </div>
          </Section>
        </div>
      </main>

      <footer
        className={`${CONTAINER} flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-8 text-xs text-foreground/40`}
      >
        <span>© 2026 TONSAMMLER · {t.footer}</span>
        <Link href={EPK_PATHS[other]} className="uppercase tracking-[0.15em] hover:text-accent print:hidden">
          {t.switchLabel}
        </Link>
      </footer>
    </div>
  );
}
