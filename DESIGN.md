# Design

## Design Read

Premium lokale Immobilienmarke für Eigentümer, Käufer und Bewerber, mit einem vertrauensstarken, modernen und visuell eindrucksvollen Auftritt. Die Richtung ist kein Konzernportal und kein generisches Luxusmakler-Template, sondern eine ruhige, hochwertige Immobilienberatung mit digitaler Vermarktungsstärke. Stilrichtung: Mischung aus Premium Minimal und modern.

## System

- Framework: Next.js 16 App Router mit React Server Components.
- Styling: Tailwind CSS v4, CSS-first Tokens in `src/app/globals.css`.
- Komponenten: shadcn/ui und Magic UI in `src/components/ui/`, projektbezogene Kompositionen in `src/components/site/`.
- Keine neuen Styling-Systeme, keine CSS Modules, kein CSS-in-JS, kein `tailwind.config.ts`.
- Icons: Bestehende Projektabhängigkeit `lucide-react` weiterverwenden, keine handgeschriebenen SVG-Icons für Standardaktionen.

## Arbeitsregel

Der externe Design-Input liegt vor: Das Design System v2 und die Homepage v2 wurden aus dem Claude-Design-Projekt importiert und liegen unter `docs/design/immonation-design-system-v2.dc.html` und `docs/design/immonation-homepage-v2.dc.html`. Diese beiden Dateien sind die visuelle Referenz; die Token sind in `src/app/globals.css` (`@theme`) umgesetzt.

Kernentscheidungen des v2-Systems:

- **Harte Kanten überall**: Radius 0 auf Karten, Buttons, Inputs, Badges. Tiefe durch Hairline-Border und Flächenkontrast, Schatten nur für Overlays.
- **Serif-Stimme**: Source Serif 4 für Display, Sektionstitel, Kartentitel, Zitate und Footer-Zahlen; Jost für UI, Fließtext, Labels.
- **Ein Akzent**: Markenblau aus dem Logo. Blau 600 (`#0e7fb4`) für CTAs/Links auf Weiß (AA), Blau 500 (`#1c9cd7`) für Marke/Akzentkanten und CTAs auf Dunkel.
- **Zwei Strecken**: Verkäufer/Käufer-Schalter im Header wechselt Hero-Inhalt und primären CTA (Bewertung vs. Objektangebote).

## Visuelle Richtung

- Erste Wahrnehmung: stark, hochwertig, selbstbewusst.
- Danach: minimalistisch, ruhig, scanbar und vertrauensbildend.
- Dichte: mittel. Marketingseiten brauchen Luft, lokale SEO-Seiten brauchen klare Textstruktur.
- Motion: moderat. Hero und Prozess dürfen bewusst animiert sein; FAQ, Formulare und SEO-Inhalte bleiben ruhig.
- Bildwelt: echte Immobilien, Team, Büro, Stadt-/Quartiersbezug, 360-Grad- und Video-Vermarktung. Keine generischen Luxusvillen, wenn sie nicht zum regionalen Portfolio passen.

## Farbe

Final aus dem Logo abgeleitet und in `src/app/globals.css` als Token umgesetzt (Design System v2 §02):

- Markenblau-Skala `brand-50…800`: `#eef7fc`, `#d9eefa`, `#a2d9f5` (Logo hell), `#6ec4ec`, `#3dafe2` (Hover auf Dunkel), `#1c9cd7` (Logo · Marke), `#0e7fb4` (CTA · AA), `#0b6a97` (Hover), `#0a516f`.
- Neutrale `neutral-0…900`: `#ffffff`, `#f7f8f9`, `#eceded`, `#e4e5e6` (Border), `#d5d6d7` (Input-Border), `#b8bab9` (Sekundärtext auf Dunkel), `#8a8d8c`, `#737371` (Logo grau), `#565958` (Sekundärtext), `#2b2929` (Logo · Text).
- `--surface-dark: #232020` für Trust-Bänder, Bewertungs-CTA und Footer. `--destructive: #c73a3a`, `--success: #2e8b57`.

Regeln:

- Der Blauton ist der einzige Akzent des Systems — CTAs, Links, aktive Zustände, Akzentkanten. Nirgendwo sonst.
- Für Text auf Weiß und CTA-Flächen gilt Blau 600 oder dunkler (AA-Kontrast). Auf dunklen Flächen trägt Primär Blau 500.
- Maximal zwei dunkle Sektionen pro Seite.
- Keine dekorativen Purple/Blue-AI-Gradienten.

## Typografie

Umgesetzt mit `next/font`: **Source Serif 4** (`--font-serif`, `font-serif`) und **Jost** (`--font-sans`, Standard).

- Display · Serif · 58/1.12 · 600 · `-0.005em` (Hero-Headline)
- H2 · Serif · 38/1.2 · 600 (Sektionstitel)
- H3 · Sans · 22/1.3 · 600 (Kartentitel in Serif 20/600 bei Objekt-/Referenzkarten)
- Eyebrow · 13/1 · 600 · `+0.14em` · uppercase
- Body · Sans · 17/1.6 · 400
- Editorial-Zitat · Serif italic · 23–28/1.45
- Body: gut lesbare Sans mit 65 bis 75 Zeichen Zeilenlänge.
- Der Kontrast der beiden Schriften ist das Premium-Signal — nicht Dekoration.
- Deutsche Texte müssen auf Mobile ohne Überlauf funktionieren, besonders lange Wörter wie "Immobilienbewertung" und "Finanzierungsoptionen".
- Eyebrows sparsam verwenden. Nicht über jedem Abschnitt kleine Uppercase-Labels setzen.

## Layout

- Mobile First, danach Tablet/Desktop ausbauen.
- Startseite: kein reiner Text-Hero. Der erste Viewport braucht ein starkes Immobilien-, Team- oder Vermarktungssignal.
- Page Sections sind volle Bereiche oder klare Layouts, keine Karten in Karten.
- Karten nur für echte wiederholte Objekte: Immobilien, Referenzen, Blogartikel, FAQs, Teammitglieder.
- Prozessdarstellungen dürfen sequenziell sein; andere Abschnitte sollen keine künstlichen Nummern nutzen.
- Verkäufer-CTA bleibt sichtbar, aber Käufer-Abzweig ist klar erreichbar.

## Komponentenregeln

- Header: Verkäufer, Kaufen, Referenzen, Ratgeber, Karriere, Kontakt. Mobile als Sheet/Drawer.
- CTA: Primär "Kostenlose Bewertung starten" oder "Erstgespräch buchen"; sekundär "Immobilie suchen", "Finanzierung prüfen" oder "Rückruf anfordern".
- FAQ: Accordion mit servergerenderten Inhalten und FAQPage JSON-LD auf Service- und lokalen Verkaufsseiten.
- Assistenz: nicht "Chatbot" nennen. Name: "Immonation-Assistent".
- Formulare: Kontakt, Bewertung, Rückruf, Käuferkriterien, Karriere/Partner. Immer klare Fehler-, Lade- und Erfolgszustände.
- Trust: Google, Trustpilot, echte Bewertungen, ausgewählte Referenzobjekte, Verkaufsstories, Video-Testimonials.
- Listings: verkaufte Objekte bekommen einen klaren visuellen Status, bevorzugt als diagonales `Verkauft`-Band/Tag.

## Motion

- Motion unterstützt Hierarchie, Prozessverständnis und Feedback.
- Keine Inhalte nur durch Animation sichtbar machen.
- `prefers-reduced-motion` beachten.
- Gute Einsatzorte: Hero-Einstieg, Prozessfortschritt, Objektgalerie, Suchfilter-Feedback, Bewertungsrechner-Schritte.
- Schlechte Einsatzorte: FAQ-Text, lange SEO-Inhalte, Kontaktpflichtfelder.

## Content & SEO Design

- Jede lokale Seite beginnt mit einer direkt beantwortenden Einleitung.
- Lange SEO-Seiten brauchen Inhaltsanker, FAQ, lokale Trust-Elemente und klare CTAs.
- Objektseiten und Referenzen brauchen strukturierte Fakten, Medien, Lagekontext und Ergebnisstory.
- Ratgeberseiten sind ruhig und editorial, nicht wie Landingpages.

## Offene Design-Abhängigkeiten

- Lokales Logo-/CI-Paket aus dem Attachment im Repository ablegen.
- Entscheidung, ob die neue Website echte Immobilienbilder direkt aus OnOffice beziehen soll.
- Entscheidung, ob der Hero mit realem Foto/Video, generiertem Markenbild oder interaktiver Vermarktungsszene startet.
