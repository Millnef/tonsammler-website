"use client";

import { useSyncExternalStore, type CSSProperties } from "react";
import Link from "next/link";
import { BandcampIcon, SoundCloudIcon, SpotifyIcon, YouTubeIcon } from "@/components/icons";
import { LEGAL_PATHS } from "@/lib/legal";

// Two-click embeds: a player from Spotify, SoundCloud, Bandcamp or YouTube only loads
// after a click, so no data reaches the provider before the visitor agrees. The click
// counts for that provider until the tab is closed (sessionStorage), on every page.

export type EmbedProvider = "spotify" | "soundcloud" | "bandcamp" | "youtube";

const PROVIDERS: Record<EmbedProvider, { name: string; icon: typeof SpotifyIcon }> = {
  spotify: { name: "Spotify", icon: SpotifyIcon },
  soundcloud: { name: "SoundCloud", icon: SoundCloudIcon },
  bandcamp: { name: "Bandcamp", icon: BandcampIcon },
  youtube: { name: "YouTube", icon: YouTubeIcon },
};

const TEXT = {
  de: {
    load: (name: string) => `${name} laden`,
    note: (name: string) => `Erst beim Laden werden Daten an ${name} übertragen.`,
    privacy: "Datenschutz",
  },
  en: {
    load: (name: string) => `Load ${name}`,
    note: (name: string) => `Data is only sent to ${name} once you load it.`,
    privacy: "Privacy",
  },
};

const STORAGE_KEY = "tonsammler-embeds";
const listeners = new Set<() => void>();
// Kept in memory as well, for browsers that block storage
let granted = "";

function readGranted() {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) ?? granted;
  } catch {
    return granted;
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function grant(provider: EmbedProvider) {
  const providers = new Set(readGranted().split(",").filter(Boolean));
  providers.add(provider);
  granted = [...providers].sort().join(",");
  try {
    window.sessionStorage.setItem(STORAGE_KEY, granted);
  } catch {
    // Storage blocked: the in-memory value still counts for this page
  }
  listeners.forEach((listener) => listener());
}

type Props = {
  provider: EmbedProvider;
  src: string;
  title: string;
  allow?: string;
  // Applies to the player and to its placeholder alike, so both fill the same box
  className?: string;
  height?: number;
  lang?: "de" | "en";
};

export default function ConsentEmbed({ provider, src, title, allow, className = "", height, lang = "de" }: Props) {
  const allowed = useSyncExternalStore(subscribe, readGranted, () => "").split(",").includes(provider);
  const { name, icon: Icon } = PROVIDERS[provider];
  const t = TEXT[lang];

  if (allowed) {
    return (
      <iframe
        title={title}
        src={src}
        allow={allow}
        height={height}
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className={className}
      />
    );
  }

  const style: CSSProperties | undefined = height ? { height } : undefined;
  return (
    <div
      style={style}
      className={`${className} flex flex-col items-center justify-center gap-3 bg-white/[0.03] px-6 py-4 text-center`}
    >
      <Icon className="h-5 w-5 text-foreground/50" />
      <button
        type="button"
        onClick={() => grant(provider)}
        className="rounded-full border border-white/25 px-5 py-2 text-[11px] font-medium uppercase tracking-[0.15em] text-foreground transition-colors duration-200 ease-out hover:border-accent hover:text-accent"
      >
        {t.load(name)}
      </button>
      <p className="max-w-xs text-[11px] font-light leading-snug text-foreground/45">
        {t.note(name)}{" "}
        <Link href={LEGAL_PATHS.privacy[lang]} className="underline underline-offset-2 hover:text-accent">
          {t.privacy}
        </Link>
      </p>
    </div>
  );
}
