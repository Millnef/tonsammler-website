@AGENTS.md

## Design-System TONSAMMLER

### Farben (als Tailwind-Theme-Variablen definieren, nicht hardcoden)
- Background: #000000
- Text/Primary: #FFFFFF
- Akzent: #FFEBB5

### Typografie
- Font-Familie: Raleway (via next/font/google einbinden)
- Gewichte: ExtraLight (200) für große Headlines, Light (300) für Subheadlines, Medium (500) für Labels/Buttons/Navigation
- Keine anderen Fonts verwenden

### Bewegung/Animation
- Nur ease-out Timing-Funktionen
- Maximale Dauer: 400ms
- Keine bouncy/elastic Animationen, keine Overshoots
- Keine Parallax-Effekte — einzige bewusste Ausnahme: das Bild in der About-Sektion (scroll-gekoppelt via GSAP ScrollTrigger mit `scrub`, dezent ±20–30px). Das ist gewollt und kein Verstoß; nicht auf andere Elemente übertragen.
- Scroll-Trigger perspektivisch über GSAP (ScrollTrigger), UI-Transitions über Framer Motion
- In dieser Phase (Schritt 1) noch KEINE Animationen implementieren

### Spacing/Layout
- Großzügiges Whitespacing, kein Element soll gedrängt wirken
- 8px-Grid-System für alle Abstände

### Referenz-Handschrift
- Typografie ist das dominante Gestaltungselement: große, mehrzeilig gebrochene Headlines, linksbündig
- Minimalistische Nav: Logo/Name oben links, Menüpunkte oben rechts, dieselbe Struktur gespiegelt im Footer
- Reduziert, clean, kein visuelles Rauschen — Vorbild-Ästhetik: Apple-Niveau, aber Personenmarke statt Produktseite

### Tech-Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS für Styling
- Framer Motion (später, nicht in Schritt 1)
- GSAP + ScrollTrigger (später, nicht in Schritt 1)
