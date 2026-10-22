// The current release, shown in the homepage's Releases section and on the booking page.
// For a new release only this file changes (plus its cover in public/epk/).
// Embed formats stay the same for every release: Spotify theme=0, SoundCloud classic
// in #242424, Bandcamp with track list and small artwork on bgcol 333333.

export const RELEASE = {
  title: "abrasive",
  type: { de: "Single", en: "Single" },
  date: "19.10.2026",
  cover: { src: "/epk/abrasive-cover.jpg", width: 1200, height: 1200 },
  tracks: [{ title: "abrasive", length: "6:35" }],
  links: {
    spotify: "https://open.spotify.com/album/4TxeTmH3riAHPrdJqTme4C",
    bandcamp: "https://tonsammler.bandcamp.com/track/abrasive",
    soundcloud: "https://soundcloud.com/tonsammlermusic/abrasive",
    youtube: "https://www.youtube.com/watch?v=sl5_omSsVYc",
  },
  embeds: {
    spotify:
      "https://open.spotify.com/embed/album/4TxeTmH3riAHPrdJqTme4C?utm_source=generator&theme=0",
    soundcloud:
      "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2421478929&color=%23242424&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
    bandcamp:
      "https://bandcamp.com/EmbeddedPlayer/track=3770052227/size=large/bgcol=333333/linkcol=ffebb5/tracklist=true/artwork=small/transparent=true/",
    youtube: "https://www.youtube.com/embed/sl5_omSsVYc",
  },
};
