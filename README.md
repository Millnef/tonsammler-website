# Tonsammler

Website für Milan-Joel Pawlick aka **Tonsammler** (Techno / Minimal DJ &amp; Producer).

Gebaut mit Next.js (App Router), TypeScript und Tailwind CSS. Framer Motion und GSAP ScrollTrigger sind als Dependencies vorbereitet, werden aber erst in einer späteren Phase eingesetzt.

## Entwicklung

```bash
npm run dev
```

Seite läuft dann unter [http://localhost:3000](http://localhost:3000).

## Produktions-Build

```bash
npm run build
npm start
```

## Struktur

- `src/components/Nav.tsx` – Nav mit Platzhalter-Links (Home, About, Music, Contact)
- `src/components/Footer.tsx` – Footer, spiegelt die Nav-Struktur
- `src/components/Hero.tsx` – leere Hero-Sektion als Platzhalter

Die alte statische HTML-Version (Vorgänger-Design) ist zur Referenz unter `legacy-static-site/` archiviert.

## Farben & Typografie

- Hintergrund `#000000`, Text `#FFFFFF`, Akzent `#FFEBB5`
- Schrift: Raleway (ExtraLight/Light/Medium)

Design-Regeln siehe [CLAUDE.md](./CLAUDE.md) / [AGENTS.md](./AGENTS.md).
