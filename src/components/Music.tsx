import SectionHeading from "@/components/SectionHeading";

const LINK_FIELDS = [
  { label: "Spotify", href: null },
  { label: "SoundCloud", href: "https://soundcloud.com/tonsammlermusic" },
  { label: "YouTube", href: "https://www.youtube.com/@TONSAMMLER" },
];

export default function Music() {
  return (
    <section
      id="music"
      className="w-full scroll-mt-24 px-6 py-32 sm:scroll-mt-0 sm:px-10 sm:py-40"
    >
      <SectionHeading>MUSIC</SectionHeading>

      <div className="mt-12 divide-y divide-white/10 border-y border-white/10 sm:mt-16">
        {LINK_FIELDS.map((field) =>
          field.href ? (
            <a
              key={field.label}
              href={field.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-5 text-sm font-medium uppercase tracking-[0.15em] text-foreground/70"
            >
              <span>{field.label}</span>
              <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <div
              key={field.label}
              className="flex items-center justify-between py-5 text-sm font-medium uppercase tracking-[0.15em] text-foreground/30"
            >
              <span>{field.label}</span>
              <span className="text-xs normal-case tracking-normal text-foreground/30">
                Coming soon
              </span>
            </div>
          )
        )}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 sm:mt-16 sm:grid-cols-3 sm:gap-6">
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.15em] text-foreground/50">
            Spotify
          </span>

          <div className="mt-4 flex h-[300px] w-full flex-col items-center justify-center gap-2 border border-white/10 bg-white/[0.03] text-center">
            <span className="text-sm font-medium uppercase tracking-[0.15em] text-foreground/50">
              Spotify
            </span>
            <span className="text-xs font-light text-foreground/40">Embed folgt</span>
            <span className="mt-2 text-xs font-medium uppercase tracking-[0.1em] text-accent">
              Coming soon — 05.10.
            </span>
          </div>
        </div>

        <div>
          <span className="text-xs font-medium uppercase tracking-[0.15em] text-foreground/50">
            SoundCloud
          </span>

          <div className="mt-4 w-full">
            <iframe
              title="TONSAMMLER auf SoundCloud"
              width="100%"
              height="300"
              scrolling="no"
              frameBorder="no"
              allow="autoplay; encrypted-media"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A1800748860&color=%23ffebb5&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
            />
            <div
              style={{
                fontSize: "10px",
                color: "#cccccc",
                lineBreak: "anywhere",
                wordBreak: "normal",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                fontFamily:
                  "Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif",
                fontWeight: 100,
              }}
            >
              <a
                href="https://soundcloud.com/tonsammlermusic"
                title="tonsammler"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#cccccc", textDecoration: "none" }}
              >
                tonsammler
              </a>{" "}
              ·{" "}
              <a
                href="https://soundcloud.com/tonsammlermusic/carla"
                title="CARLA"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#cccccc", textDecoration: "none" }}
              >
                CARLA
              </a>
            </div>
          </div>
        </div>

        <div>
          <span className="text-xs font-medium uppercase tracking-[0.15em] text-foreground/50">
            YouTube
          </span>

          <div className="mt-4 aspect-video w-full overflow-hidden border border-white/10">
            <iframe
              width="100%"
              height="100%"
              className="h-full w-full"
              src="https://www.youtube.com/embed/qBRBy3EUuRc?si=_VsD10EOSAUlNOHY&start=900"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
